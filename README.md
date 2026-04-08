# Instagram 自動投稿ツール

GitHub Actions を使って、画像の自動生成から Instagram への投稿までを自動化するツールです。

## 機能

- **画像自動生成**: テンプレート（背景・フォント・テキスト）から投稿用画像を自動作成
- **Instagram 自動投稿**: Instagram Graph API を使用して画像とキャプションを自動投稿
- **Issue で壁打ち**: GitHub Issue で投稿内容をブレスト → プレビュー確認 → 承認して投稿

## 全体の流れ

```
┌──────────────────────────────────────────┐
│  STEP 1: Issue で投稿を企画（壁打ち）      │
│  テンプレートに沿って内容を記入            │
└──────────────┬───────────────────────────┘
               ▼
┌──────────────────────────────────────────┐
│  STEP 2: プレビュー画像が自動生成          │
│  Issue のコメントに画像が表示される        │
└──────────────┬───────────────────────────┘
               ▼
┌──────────────────────────────────────────┐
│  STEP 3: 内容を確認・修正                 │
│  Issue を編集 → プレビュー自動再生成       │
│  コメント欄でディスカッション              │
└──────────────┬───────────────────────────┘
               ▼
┌──────────────────────────────────────────┐
│  STEP 4: approved ラベルを追加            │
│  → Instagram に自動投稿！                 │
│  → Issue が自動でクローズ                 │
└──────────────────────────────────────────┘
```

---

## セットアップ手順（初回のみ）

### STEP 1: Instagram ビジネスアカウントの準備

Instagram Graph API を使うには、**ビジネスアカウント**が必要です。

```
通常アカウント → 設定 → 「プロアカウントに切り替える」
                       → 「ビジネス」を選択
```

さらに **Facebook ページ**と連携が必要です：

1. [Facebook](https://www.facebook.com/) でビジネスページを作成
2. Instagram の設定 → 「リンク済みアカウント」 → Facebook ページと連携

### STEP 2: Facebook アプリの作成とトークン取得

1. [Facebook Developers](https://developers.facebook.com/) にアクセスしてログイン
2. 「マイアプリ」→「アプリを作成」をクリック
3. 「Instagram Graph API」プロダクトを追加
4. 以下の権限でアクセストークンを生成：
   - `instagram_content_publish`
   - `pages_read_engagement`

**短期トークンを長期トークンに交換（有効期限: 60日）：**

```bash
curl -s "https://graph.facebook.com/v21.0/oauth/access_token?\
grant_type=fb_exchange_token&\
client_id={あなたのAPP_ID}&\
client_secret={あなたのAPP_SECRET}&\
fb_exchange_token={短期トークン}"
```

**Instagram ビジネスアカウント ID を取得：**

```bash
# まず Facebook ページ ID を取得
curl -s "https://graph.facebook.com/v21.0/me/accounts?access_token={トークン}"

# ページ ID から Instagram アカウント ID を取得
curl -s "https://graph.facebook.com/v21.0/{ページID}?fields=instagram_business_account&access_token={トークン}"
# → "instagram_business_account": { "id": "ここの数字をメモ" }
```

### STEP 3: GitHub Secrets の設定

リポジトリの **Settings** → **Secrets and variables** → **Actions** で以下を登録：

| シークレット名 | 設定する値 |
|---|---|
| `INSTAGRAM_USER_ID` | STEP 2 で取得した Instagram ビジネスアカウント ID |
| `INSTAGRAM_ACCESS_TOKEN` | STEP 2 で取得した長期アクセストークン |

### STEP 4: テンプレート素材の準備

| フォルダ | 配置するもの | 必須？ |
|---|---|---|
| `templates/backgrounds/` | 背景画像（PNG/JPG） | 任意（なければグラデーション自動生成） |
| `templates/fonts/` | フォントファイル（TTF/OTF） | 推奨 |
| `templates/overlays/` | ロゴなどのオーバーレイ画像 | 任意 |

推奨フォント: [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)（無料・日本語対応）

---

## 使い方

### 方法 1: Issue で投稿を企画する（推奨）

**1. Issue を作成する**

- リポジトリの **Issues** タブを開く
- 「**New issue**」→「**Instagram 投稿企画**」テンプレートを選択
- 各項目を記入して Issue を作成

**2. プレビューを確認する**

- Issue を作成すると、数分後にコメントで**プレビュー画像**が表示されます
- 修正したい場合は Issue を**編集**してください → プレビューが自動再生成されます

**3. 投稿する**

- 内容がOKなら Issue に **`approved` ラベル** を追加
- 自動的に Instagram へ投稿され、Issue もクローズされます

### 方法 2: 手動で実行する

1. リポジトリの **Actions** タブを開く
2. 「**Post to Instagram**」ワークフローを選択
3. 「**Run workflow**」をクリック
4. 投稿設定ファイル名を入力（例: `example-post.yaml`）

### 方法 3: ローカルで画像だけ確認する

```bash
pip install -r requirements.txt
python -m src.main generate config/posts/example-post.yaml
# → output/example-post.png が生成されます
```

---

## 投稿設定ファイル（YAML）の書き方

```yaml
template:
  background: "default-bg.png"       # 背景画像ファイル名（任意）
  overlay: "logo.png"                # ロゴ画像ファイル名（任意）
  text_lines:
    - text: "今日の一言"              # 画像に表示するテキスト
      font: "NotoSansJP-Bold.ttf"    # フォントファイル名
      size: 72                       # フォントサイズ
      color: "#FFFFFF"               # 文字色
      position: [540, 400]           # 表示位置 [x, y]
    - text: "前に進み続けよう"
      font: "NotoSansJP-Bold.ttf"
      size: 48
      color: "#CCCCCC"
      position: [540, 520]
  output_size: [1080, 1080]          # 画像サイズ（Instagram正方形推奨）

caption: |                           # 投稿文
  今日のモチベーション
  #motivation #daily

hashtags_append: true                # settings.yaml のハッシュタグを追加
```

---

## プロジェクト構成

```
instagram-toukou/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── instagram-post.yml     ← 投稿企画テンプレート
│   └── workflows/
│       ├── preview-draft.yml      ← プレビュー生成（Issue作成時）
│       └── post-to-instagram.yml  ← 投稿実行（approvedラベル時）
├── src/
│   ├── image_generator.py         ← 画像生成モジュール
│   ├── instagram_client.py        ← Instagram API クライアント
│   ├── issue_parser.py            ← Issue → 投稿設定パーサー
│   └── main.py                    ← メインCLI
├── config/
│   ├── settings.yaml              ← グローバル設定
│   └── posts/                     ← 投稿設定ファイル
├── templates/
│   ├── backgrounds/               ← 背景画像
│   ├── fonts/                     ← フォントファイル
│   └── overlays/                  ← オーバーレイ画像
├── output/                        ← 生成画像の出力先
└── requirements.txt
```

## 注意事項

- Instagram Graph API の投稿制限: **24時間あたり最大25件**
- アクセストークンの有効期限は **60日** です。定期的に更新してください
- 画像は **JPEG形式**、**最大8MB**、アスペクト比 **4:5〜1.91:1** が推奨です
