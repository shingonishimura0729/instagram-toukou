import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ | 庭から作れる不動産会社",
  description:
    "無料相談のご予約はこちらから。専属のアンカーが、お庭から始まる家づくりをサポートします。",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
          無料相談・お問い合わせ
        </h1>
        <p className="text-text-sub text-lg max-w-md mx-auto">
          専属のアンカーが、お庭の予算から始まる家づくりをご一緒にサポートします
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
