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
            AIアンカーが土地探しから庭づくりまで、あなたの理想の住まいづくりを一貫してサポートします。
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
              AIアンカーに相談
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
            <div className="text-sm text-text-sub mt-1">お客様満足度</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-text-sub mt-1">実績件数</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">24h</div>
            <div className="text-sm text-text-sub mt-1">AI対応</div>
          </div>
        </div>
      </div>
    </section>
  );
}
