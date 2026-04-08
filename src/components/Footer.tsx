import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="text-lg font-bold">庭から作れる不動産</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              お庭の予算を最初に決める、
              <br />
              新しい家づくりのカタチ。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-3 text-sm">サービス</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/simulator" className="hover:text-white transition-colors">
                  予算シミュレーター
                </Link>
              </li>
              <li>
                <Link href="/anchor" className="hover:text-white transition-colors">
                  AIアンカー相談
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold mb-3 text-sm">会社情報</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>庭から作れる不動産株式会社</li>
              <li>〒000-0000 東京都渋谷区</li>
              <li>TEL: 03-0000-0000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/50">
          © 2026 庭から作れる不動産株式会社 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
