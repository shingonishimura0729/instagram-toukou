"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  userType: string;
  date: string;
  budgetRange: string;
  gardenWishes: string;
}

const userTypeOptions = [
  "家を建てたい個人",
  "工務店・ハウスメーカー",
  "不動産会社",
  "造園家・ランドスケープデザイナー",
  "その他",
];

const budgetOptions = [
  "2,000万円以下",
  "2,000万〜3,000万円",
  "3,000万〜4,000万円",
  "4,000万〜5,000万円",
  "5,000万〜7,000万円",
  "7,000万〜1億円",
  "1億円以上",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    userType: "",
    date: "",
    budgetRange: "",
    gardenWishes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) newErrors.name = "お名前を入力してください";
    if (!form.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }
    if (!form.phone.trim()) newErrors.phone = "電話番号を入力してください";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-text mb-3">
          お問い合わせありがとうございます
        </h2>
        <p className="text-text-sub leading-relaxed mb-8">
          内容を確認の上、2営業日以内にご連絡いたします。
          <br />
          専属のアンカーが、あなたの庭づくり・家づくりをサポートします。
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              userType: "",
              date: "",
              budgetRange: "",
              gardenWishes: "",
            });
          }}
          className="text-primary font-medium hover:underline"
        >
          新しいお問い合わせを送る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="山田 太郎"
          className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.name ? "border-red-400" : "border-border"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="example@email.com"
          className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.email ? "border-red-400" : "border-border"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          電話番号 <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="090-1234-5678"
          className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.phone ? "border-red-400" : "border-border"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* User Type */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          あなたについて
        </label>
        <select
          value={form.userType}
          onChange={(e) => updateField("userType", e.target.value)}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">選択してください</option>
          {userTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Date */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          ご希望日時
        </label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => updateField("date", e.target.value)}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          ご予算帯
        </label>
        <select
          value={form.budgetRange}
          onChange={(e) => updateField("budgetRange", e.target.value)}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">選択してください</option>
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Garden Wishes */}
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          お庭のご希望
        </label>
        <textarea
          value={form.gardenWishes}
          onChange={(e) => updateField("gardenWishes", e.target.value)}
          placeholder="例：子供が遊べる芝生の庭がほしい、ウッドデッキでBBQがしたい、和風の庭園に憧れている..."
          rows={4}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-colors text-lg"
      >
        無料相談を予約する
      </button>

      <p className="text-xs text-text-sub text-center">
        ※ ご入力いただいた個人情報は、お問い合わせ対応にのみ利用いたします
      </p>
    </form>
  );
}
