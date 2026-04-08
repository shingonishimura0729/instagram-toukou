import Link from "next/link";

export default function BrandSection() {
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Brand Message */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span>Our Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text leading-tight mb-6">
              庭は「残り」じゃない。
              <br />
              <span className="text-primary">暮らしの起点</span>だ。
            </h2>
            <p className="text-text-sub text-lg leading-relaxed mb-6">
              家づくりの常識は「建物が先、庭は残り予算で」。
              でも暮らしを本当に豊かにするのは、毎朝窓から見える緑や、
              家族が集う庭の時間ではないでしょうか。
            </p>
            <p className="text-text-sub text-lg leading-relaxed mb-8">
              私たちは庭の予算を最初に決め、AI＋人間の専属アンカーが
              土地探しから建物設計まで一貫して伴走する、
              新しい家づくりのカタチを提案します。
            </p>
            <Link
              href="/story"
              className="inline-flex items-center text-primary font-bold hover:text-primary-light transition-colors group"
            >
              ブランドストーリーを読む
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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

          {/* Right — Visual */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-border">
              {/* Illustration with text blocks */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    ⚓
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">専属アンカー</h3>
                    <p className="text-sm text-text-sub">
                      AI＋人間のハイブリッドで、最初から最後まで一人の担当が伴走
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🏠
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">BtoB × BtoC</h3>
                    <p className="text-sm text-text-sub">
                      工務店・不動産会社にツール提供しつつ、エンドユーザーにも直接届ける
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🌿
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">庭ファースト</h3>
                    <p className="text-sm text-text-sub">
                      庭の予算を起点に逆算。暮らしの豊かさを最優先にした設計思想
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary/5 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
