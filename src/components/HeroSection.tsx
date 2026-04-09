import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-bg to-primary-light/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🌱</span>
            <span>新しい家づくりのカタチ</span>
          </div>

          {/* Main Copy */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
            庭から始まる、
            <br />
            <span className="text-primary">あなたの家づくり</span>
          </h1>

          <p className="text-lg md:text-xl text-text-sub leading-relaxed mb-8 max-w-lg">
            お庭の予算を最初に決める、新しい家づくりのカタチ。
            <br className="hidden md:block" />
            専属アドバイザーが土地探しから庭づくりまで、あなたの理想の住まいづくりを一貫してサポートします。
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-colors text-lg shadow-lg shadow-primary/20"
            >
              予算シミュレーションを始める
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
            <Link
              href="/anchor"
              className="inline-flex items-center justify-center border-2 border-primary text-primary font-bold px-8 py-4 rounded-xl hover:bg-primary/5 transition-colors text-lg"
            >
              アドバイザーに相談
            </Link>
          </div>
        </div>

        {/* Project Status — honest startup messaging */}
        <div className="mt-16 max-w-lg">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-text">2026年始動プロジェクト</span>
            </div>
            <p className="text-sm text-text-sub leading-relaxed">
              「庭から作る家づくり」を本気で実現するために、
              造園家・工務店・住宅購入検討者の皆さまと一緒に仕組みを作っています。
            </p>
            <Link
              href="/story"
              className="inline-flex items-center text-sm text-primary font-medium mt-3 hover:text-primary-light transition-colors"
            >
              私たちの想いを読む →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
