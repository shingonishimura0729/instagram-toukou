import HeroSection from "@/components/HeroSection";
import ConceptSection from "@/components/ConceptSection";
import ProcessFlow from "@/components/ProcessFlow";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <ProcessFlow />

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            理想の庭から、家づくりを始めませんか？
          </h2>
          <p className="text-white/80 text-lg mb-8">
            まずは無料の予算シミュレーションで、あなたの理想の暮らしを具体化しましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors text-lg"
            >
              無料シミュレーションを試す
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              無料相談を予約する
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
