import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ブランドストーリー | 庭から作れる不動産会社",
  description:
    "なぜ庭から家づくりを始めるのか。「庭から作れる不動産」が生まれた想いと、私たちが届けたい暮らしのカタチ。",
};

const values = [
  {
    number: "01",
    title: "暮らしは「庭」から始まる",
    description:
      "家は器。暮らしを豊かにするのは、毎日目にする緑であり、土の匂いであり、季節の移ろいです。私たちは「庭こそ暮らしの起点」と信じ、庭の予算を最初に決めるという逆転の発想で家づくりを設計しています。",
    icon: "🌱",
  },
  {
    number: "02",
    title: "一人ひとりに、専属アドバイザーを",
    description:
      "家づくりは人生で最大の買い物の一つ。だからこそ、あなた専属のアドバイザー「アンカー」が最初から最後まで伴走します。いつでも相談でき、何度でも寄り添う。それが私たちのスタイルです。",
    icon: "⚓",
  },
  {
    number: "03",
    title: "業界の常識を、やさしく壊す",
    description:
      "「残り予算で庭」「建物が先、庭は後」という業界の常識。それは本当にお客様のためでしょうか。私たちは工務店・造園家・不動産会社と手を組み、庭を起点にした新しいバリューチェーンを創ります。",
    icon: "🔄",
  },
];

const questions = [
  {
    question: "家を建てた後、庭にかけるお金が足りなかった",
    description: "多くの方が経験する「庭は残り予算で」の現実。建物に予算を使い切り、理想の庭を諦めた方はいませんか？",
  },
  {
    question: "庭のことを相談できる相手が、家づくりの初期段階にいなかった",
    description: "工務店は建物のプロ。不動産会社は土地のプロ。でも庭のプロが最初からいたら、家づくりは変わるのではないでしょうか。",
  },
  {
    question: "完成した庭に、もう少しこだわりたかった",
    description: "予算も敷地も決まった後の庭づくりには限界があります。最初から庭を考えていたら、どんな暮らしが実現できたでしょうか。",
  },
];

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/5 to-bg py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary-light/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>Brand Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
            なぜ、
            <span className="text-primary">庭から</span>
            なのか。
          </h1>
          <p className="text-lg md:text-xl text-text-sub leading-relaxed max-w-2xl mx-auto">
            家は建てたら終わりではない。
            <br />
            毎日の暮らしを豊かにするのは、窓の向こうの緑。
            <br />
            だから私たちは、庭から家づくりを始めます。
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-bg rounded-3xl p-8 md:p-14 border border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-6 text-center">
              私たちの信念
            </h2>
            <div className="text-text-sub text-lg leading-loose space-y-4 text-center">
              <p>
                家づくりにおいて、庭は「あとで考えるもの」になりがちです。
              </p>
              <p>
                建物の予算が決まり、土地が決まり、残ったお金で庭を考える。
                <br />
                結果として、理想の暮らしから一番遠い場所になってしまう。
              </p>
              <p className="text-text font-medium text-xl">
                私たちはその順番を、ひっくり返します。
              </p>
              <p>
                庭の予算を「最初に」決める。
                <br />
                その予算を軸に、最適な土地を探し、建物を設計する。
                <br />
                庭から逆算する家づくりは、暮らしから逆算する家づくりです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Values */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              <span className="text-primary">3つの価値観</span>
            </h2>
          </div>

          <div className="space-y-8">
            {values.map((value) => (
              <div
                key={value.number}
                className="bg-white rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 md:min-w-[200px]">
                  <span className="text-4xl">{value.icon}</span>
                  <span className="text-5xl font-bold text-primary/15">
                    {value.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-sub leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions — demand validation */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              あなたも<span className="text-primary">庭で後悔</span>しましたか？
            </h2>
            <p className="text-text-sub text-lg">
              もしひとつでも心当たりがあれば、私たちに話を聞かせてください
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((item, i) => (
              <div
                key={i}
                className="bg-bg rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-text mb-3 flex items-start gap-3">
                  <span className="text-primary text-xl flex-shrink-0">?</span>
                  「{item.question}」
                </h3>
                <p className="text-text-sub leading-relaxed pl-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-text-sub mb-4">
              こうした声が本当にあるのか、私たちはまだ確信を持てていません。
              <br />
              だからこそ、あなたのリアルな体験を聞かせてほしいのです。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-colors text-lg"
            >
              あなたの体験を聞かせてください
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            一緒に「庭から」を試してみませんか？
          </h2>
          <p className="text-white/80 text-lg mb-8">
            家づくりを検討中の方は予算シミュレーションを、
            <br className="hidden md:block" />
            住宅業界の方はパートナー情報をご覧ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors text-lg"
            >
              予算シミュレーションを試す
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              プロの方へ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
