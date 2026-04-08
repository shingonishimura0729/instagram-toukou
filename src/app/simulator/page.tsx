import type { Metadata } from "next";
import BudgetSimulator from "@/components/BudgetSimulator";

export const metadata: Metadata = {
  title: "予算シミュレーター | 庭から作れる不動産会社",
  description:
    "お庭の予算を起点に、土地・建物の予算配分を最適化。無料で使える家づくり予算シミュレーター。",
};

export default function SimulatorPage() {
  return (
    <div className="py-12 md:py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
          予算シミュレーター
        </h1>
        <p className="text-text-sub text-lg">
          庭の予算を起点に、理想の予算配分を見つけましょう
        </p>
      </div>
      <BudgetSimulator />
    </div>
  );
}
