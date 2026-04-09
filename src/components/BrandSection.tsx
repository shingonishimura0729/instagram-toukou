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
              「庭は残り予算で」
              <br />
              <span className="text-primary">本当にそれでいい？</span>
            </h2>
            <p className="text-text-sub text-lg leading-relaxed mb-6">
              家を建てた多くの人が、庭に後悔しています。
              建物に予算を使い切り、理想の庭を諦めてしまう。
              でも毎日の暮らしを豊かにするのは、窓の向こうの緑ではないでしょうか。
            </p>
            <p className="text-text-sub text-lg leading-relaxed mb-8">
              私たちは「庭の予算を最初に決める」という
              新しい家づくりのカタチを模索しています。
              2026年始動のプロジェクトです。
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
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    😔
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">今の家づくり</h3>
                    <p className="text-sm text-text-sub">
                      建物 → 土地 → 残りで庭。理想の庭が実現しにくい
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center py-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    🌿
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1">庭ファーストの家づくり</h3>
                    <p className="text-sm text-text-sub">
                      庭 → 土地 → 建物。暮らしの豊かさから逆算する新しいカタチ
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
