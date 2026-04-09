import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "パートナー募集 | 庭から作れる不動産会社",
  description:
    "工務店・不動産会社・造園家の皆様へ。「庭から始まる家づくり」という新しい取り組みに興味をお持ちの方、まずは情報交換しませんか。",
};

const partnerTypes = [
  {
    icon: "🏠",
    role: "工務店・ハウスメーカー",
    pain: "「庭の予算が取れない」と言われ、外構が後回しにされがち",
    idea:
      "庭の予算を最初に確保するフローを一緒に試してみませんか。お客様に庭込みのトータルプランを提案する方法を模索中です。",
  },
  {
    icon: "🏢",
    role: "不動産会社",
    pain: "物件の差別化が難しく、価格競争に陥りやすい",
    idea:
      "「庭に最適な土地」という切り口に可能性を感じています。庭視点の土地紹介という新しいアプローチについて、意見交換させてください。",
  },
  {
    icon: "🌳",
    role: "造園家・ランドスケープデザイナー",
    pain: "家の完成後に呼ばれ、限られた予算と敷地で制約が多い",
    idea:
      "設計の最上流から造園家が参画できる仕組みを作りたいと考えています。現場のリアルなお声を聞かせてください。",
  },
];

const whatWeHave = [
  {
    title: "予算シミュレーター",
    description:
      "庭の予算を起点にした家づくり予算の体験ツール。現在テスト運用中です。",
    tag: "開発中",
  },
  {
    title: "庭ファーストの考え方",
    description:
      "「庭の予算を最初に決める」という新しいアプローチ。消費者にどう届くか、一緒に検証したいと考えています。",
    tag: "検証中",
  },
];

const steps = [
  { step: "1", title: "お問い合わせ", description: "まずはお気軽にご連絡ください" },
  { step: "2", title: "情報交換", description: "お互いの考えと課題を共有" },
  { step: "3", title: "一緒に検証", description: "小さく試して手応えを確認" },
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
            2026年始動の新しい取り組みです。
            <br className="hidden md:block" />
            まずは情報交換から始めませんか。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-colors text-lg shadow-lg shadow-primary/20"
          >
            まずは話してみる
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
              こんな<span className="text-primary">課題感</span>をお持ちの方へ
            </h2>
            <p className="text-text-sub text-lg">
              私たちも手探りの段階です。一緒に考えてくれる方を探しています
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
                  <span className="font-medium">よくある課題：</span>
                  {partner.pain}
                </div>
                <p className="text-text-sub text-sm leading-relaxed flex-1">
                  {partner.idea}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Have Now */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              今<span className="text-primary">私たちにあるもの</span>
            </h2>
            <p className="text-text-sub text-lg">
              まだ始まったばかりですが、一緒に育てていただける方を探しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeHave.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {item.tag}
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  {item.title}
                </h3>
                <p className="text-text-sub leading-relaxed">
                  {item.description}
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
              はじめ方は<span className="text-primary">シンプル</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
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
            情報交換のお問い合わせへ
          </Link>
        </div>
      </section>
    </>
  );
}
