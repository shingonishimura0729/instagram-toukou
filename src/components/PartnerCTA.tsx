import Link from "next/link";

export default function PartnerCTA() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-border">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-4">
              For Partners
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-text mb-3">
              住宅業界のプロの方へ
            </h3>
            <p className="text-text-sub leading-relaxed">
              「庭から家づくりを始める」という新しい取り組みに興味はありませんか？
              工務店・不動産会社・造園家の方と一緒に、この仕組みを作りたいと考えています。
            </p>
          </div>
          <Link
            href="/partner"
            className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-colors whitespace-nowrap shadow-lg shadow-primary/20"
          >
            詳しく見る
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
      </div>
    </section>
  );
}
