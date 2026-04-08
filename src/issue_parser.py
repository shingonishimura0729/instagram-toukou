"""Issueパーサー - GitHub IssueのボディからYAML投稿設定を生成"""

import logging
import re

logger = logging.getLogger(__name__)

# Issue テンプレートのセクションヘッダー
SECTION_PATTERNS = {
    "cover_text": r"### 表紙テキスト（画像上のテキスト）\s*\n(.*?)(?=###|\Z)",
    "background_style": r"### 背景スタイル\s*\n(.*?)(?=###|\Z)",
    "background_image": r"### 背景画像ファイル名\s*\n(.*?)(?=###|\Z)",
    "text_style": r"### テキストスタイル\s*\n(.*?)(?=###|\Z)",
    "caption": r"### キャプション（投稿文）\s*\n(.*?)(?=###|\Z)",
    "concept": r"### 投稿コンセプト\s*\n(.*?)(?=###|\Z)",
}


def parse_issue_body(body: str) -> dict:
    """​Issue本文を解析して投稿設定の辞書を返す。"""
    sections = {}
    for key, pattern in SECTION_PATTERNS.items():
        match = re.search(pattern, body, re.DOTALL)
        if match:
            value = match.group(1).strip()
            if value and value != "_No response_":
                sections[key] = value

    return sections


def build_post_config_from_issue(sections: dict) -> dict:
    """パースしたセクションから投稿設定を構築する。"""
    text_lines = _parse_cover_text(sections.get("cover_text", ""))

    if sections.get("text_style"):
        text_lines = _apply_text_style(text_lines, sections["text_style"])

    background = None
    if sections.get("background_style", "").startswith("カスタム"):
        background = sections.get("background_image", "").strip() or None

    template = {
        "text_lines": text_lines,
        "output_size": [1080, 1080],
    }
    if background:
        template["background"] = background

    config = {
        "template": template,
        "caption": sections.get("caption", ""),
        "hashtags_append": True,
    }

    return config


def _parse_cover_text(cover_text: str) -> list[dict]:
    """表紙テキストを解析してテキスト行のリストを返す。"""
    lines = []
    y_position = 400

    for raw_line in cover_text.split("\n"):
        raw_line = raw_line.strip()
        if not raw_line:
            continue

        match = re.match(r"^(?:メイン|サブ)?テキスト\s*[:：]\s*(.+)", raw_line)
        if match:
            text = match.group(1).strip()
        else:
            text = raw_line

        is_main = len(lines) == 0
        line_config = {
            "text": text,
            "font": "NotoSansJP-Bold.ttf",
            "size": 72 if is_main else 48,
            "color": "#FFFFFF" if is_main else "#CCCCCC",
            "position": [540, y_position],
        }
        lines.append(line_config)
        y_position += 120

    return lines


def _apply_text_style(text_lines: list[dict], style_text: str) -> list[dict]:
    """テキストスタイルの指定を各行に適用する。"""
    for raw_line in style_text.split("\n"):
        raw_line = raw_line.strip()
        if not raw_line:
            continue

        is_main = "メイン" in raw_line
        is_sub = "サブ" in raw_line

        target_idx = 0 if is_main else (1 if is_sub else None)
        if target_idx is None or target_idx >= len(text_lines):
            continue

        size_match = re.search(r"サイズ\s*(\d+)", raw_line)
        if size_match:
            text_lines[target_idx]["size"] = int(size_match.group(1))

        color_map = {
            "白": "#FFFFFF", "黒": "#000000", "赤": "#FF0000",
            "青": "#0000FF", "緑": "#00FF00", "黄": "#FFFF00",
            "薄灰": "#CCCCCC", "灰": "#999999", "金": "#FFD700",
        }
        for color_name, color_hex in color_map.items():
            if color_name in raw_line:
                text_lines[target_idx]["color"] = color_hex
                break

    return text_lines


def config_to_yaml(config: dict) -> str:
    """投稿設定辞書をYAML文字列に変換する。"""
    import yaml

    return yaml.dump(config, allow_unicode=True, default_flow_style=False, sort_keys=False)
