import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "パートナー募集 | 庭から作れる不動産会社",
  description:
    "工務店・不動産会社・造園家の皆様へ。「庭から始まる家づくり」で差別化しませんか。AIアンカーと予算シミュレーターで、御社の集客と成約率を高めます。",
};

const partnerTypes = [
  {
    icon: "🏠",
    role: "工務店・ハウスメーカー",
    pain: "「庭の予算が取れない」と言われ、外構が後回しにされがち",
    solution:
      "庭の予算を最初に確保する独自フローで、お客様満足度と追加受注率が向上。庭込みのトータルプランを自然に提案できます。",
    benefit: "客単価UP & 差別化",
  },
  {
    icon: "🏢",
    role: "不動産会社",
    pain: "物件の差別化が難しく、価格競争に陥りやすい",
    solution:
      "「庭に最適な土地」という新しい切り口で物件を提案。AIアンカーが日当たり・地形・広さを分析し、庭視点の土地レコメンドを提供します。",
    benefit: "新しい集客チャネル",
  },
  {
    icon: "🌳",
    role: "造園家・ランドスケープデザイナー",
    pain: "家の完成後に呼ばれ、限られた予算と敷地で制約が多い",
    solution:
      "設計の最上流から参画。お客様の庭の理想像が予算と土地に反映されるので、本来の腕を存分に振るえます。",
    benefit: "上流参画 & 適正予算",
  },
];

const features = [
  {
    title: "予算シミュレーター",
    description:
      "御社のWebサイトやLPに埋め込み可能。庭の予算を起点にした独自の体験で、お客様の関心を引きつけます。",
    tag: "集客ツール",
  },
  {
    title: "AIアンカー",
    description:
      "24時間対応のAIアドバイザーがお客様の初期相談を受け付け。温度の高いリードを御社に送客します。",
    tag: "リード獲得",
  },
  {
    title: "ブランド共創",
    description:
      "「庭から作れる不動産」認定パートナーとしてブランドを共有。差別化された集客と信頼の証を御社の武器に。",
    tag: "ブランド価値",
  },
  {
    title: "専属サポート",
    description:
      "導入から運用まで、専属の担当者がサポート。御社の強みを活かした共同プランニングで、成果を最大化します。",
    tag: "伴走支援",
  },
];

const steps = [
  { step: "1", title: "お問い合わせ", description: "まずはお気軽にご連絡ください" },
  { step: "2", title: "ヒアリング", description: "御社の課題と強みを伺います" },
  { step: "3", title: "プラン提案", description: "最適な連携モデルをご提案" },
  { step: "4", title: "パートナー契約", description: "合意の上で正式にスタート" },
];

export default function PartnerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary/5 via-bg to-primary/5 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>Partner Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
            「庭から作る家」を、
            <br />
            <span className="text-primary">一緒に届けませんか。</span>
          </h1>
          <p className="text-lg text-text-sub leading-relaxed max-w-2xl mx-auto mb-8">
            工務店・不動産会社・造園家の皆様へ。
            <br />
            庭を起点にした新しい家づくりのバリューチェーンで、
            <br className="hidden md:block" />
            お客様にも御社にも価値のある関係を創ります。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-colors text-lg shadow-lg shadow-primary/20"
          >
            パートナー相談をする
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Partner Types — Pain & Solution */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              <span className="text-primary">業種別</span>のメリット
            </h2>
            <p className="text-text-sub text-lg">
              それぞれの課題に合わせた連携モデルをご用意しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTypes.map((partner) => (
              <div
                key={partner.role}
                className="bg-bg rounded-2xl p-8 flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{partner.icon}</div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {partner.role}
                </h3>
                <div className="bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
                  <span className="font-medium">課題：</span>
                  {partner.pain}
                </div>
                <p className="text-text-sub text-sm leading-relaxed flex-1 mb-4">
                  {partner.solution}
                </p>
                <div className="inline-flex self-start bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {partner.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provided Tools & Services */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              パートナーに<span className="text-primary">提供するもの</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {feature.tag}
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-sub leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Flow */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              パートナーシップの<span className="text-primary">流れ</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-text mb-1">{s.title}</h3>
                <p className="text-sm text-text-sub">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            まずは気軽にお話しませんか？
          </h2>
          <p className="text-white/80 text-lg mb-8">
            パートナー契約前のご相談・情報交換だけでも歓迎です。
            <br />
            「庭から作る家」に共感いただける方、ぜひご連絡ください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors text-lg"
          >
            パートナー相談フォームへ
          </Link>
        </div>
      </section>
    </>
  );
}
