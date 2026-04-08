import type { Metadata } from "next";
import AnchorChat from "@/components/AnchorChat";

export const metadata: Metadata = {
  title: "AIアンカー相談 | 庭から作れる不動産会社",
  description:
    "専属のAIアンカーが、お庭の予算から家づくりまで一貫してサポート。24時間いつでもご相談いただけます。",
};

export default function AnchorPage() {
  return (
    <div className="py-6 md:py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
          AIアンカー相談
        </h1>
        <p className="text-text-sub text-sm">
          家づくりの専属アドバイザーに何でもご相談ください
        </p>
      </div>
      <AnchorChat />
    </div>
  );
}
