"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "anchor";
  content: string;
}

type OnboardingStep = "idle" | "name" | "interest" | "done";

const quickActions = [
  { label: "予算の組み方を知りたい", message: "予算の配分について相談したいです" },
  { label: "庭に合う土地の選び方", message: "庭に合った土地の選び方を教えてください" },
  { label: "人気の庭デザイン", message: "おすすめの庭のデザインはありますか？" },
  { label: "家づくりの全体像", message: "家づくり全体の流れを教えてください" },
  { label: "パートナー企業として相談", message: "工務店としてパートナー連携を検討しています" },
];

function getMockResponse(userMessage: string, userName: string): string {
  const msg = userMessage.toLowerCase();
  const namePrefix = userName ? `${userName}さん、` : "";

  if (msg.includes("パートナー") || msg.includes("工務店") || msg.includes("不動産会社") || msg.includes("造園")) {
    return `${namePrefix}パートナーとしてのご関心、ありがとうございます！\n\n私たちは3つの業種とパートナーシップを結んでいます：\n\n🏠 **工務店・ハウスメーカー**\n→ 庭の予算を最初に確保する独自フローで、お客様満足度と追加受注を向上\n\n🏢 **不動産会社**\n→「庭に最適な土地」という新しい切り口で物件の差別化を実現\n\n🌳 **造園家・デザイナー**\n→ 設計の最上流から参画し、適正予算で理想の庭づくりを実現\n\n御社の業種と課題をお聞かせいただければ、最適な連携モデルをご提案します。まずはお気軽に /partner ページもご覧ください！`;
  }

  if (msg.includes("予算") || msg.includes("お金") || msg.includes("費用")) {
    return `${namePrefix}予算についてのご相談ですね！\n\n当社の特徴は**「庭の予算を最初に決める」**こと。従来の「残り予算で庭」という発想を逆転させます。\n\n一般的な目安：\n・シンプルな庭園：総予算の5〜10%\n・本格的な庭園：総予算の10〜20%\n・こだわりの庭園：総予算の20〜30%\n\n専属アンカーとして、${userName || "お客様"}の理想の暮らしに合った予算バランスを一緒に考えます。\n\n予算シミュレーターで具体的な数字を体験することもできますよ。試してみますか？`;
  }

  if (msg.includes("土地") || msg.includes("場所") || msg.includes("立地")) {
    return `${namePrefix}庭に最適な土地選び、とても大切なポイントです！\n\n私が土地を評価するときの視点：\n\n☀️ **日当たり** — 南向きの庭スペースが確保できるか\n💧 **地形** — 水はけの良い平坦な土地が理想的\n📐 **広さ** — 建物面積＋お庭の面積を十分に確保\n🌳 **周辺環境** — 隣家との距離、借景が活かせるか\n\n専属アンカーとして、${userName || "お客様"}の庭の理想像から逆算して、最適な土地を一緒に探します。不動産パートナー企業と連携し、庭視点の物件情報もお届けできますよ。`;
  }

  if (msg.includes("庭") || msg.includes("ガーデン") || msg.includes("デザイン")) {
    return `${namePrefix}庭のデザイン、わくわくしますね！\n\n人気のスタイルをご紹介します：\n\n🌿 **ナチュラルガーデン** — 自然な雰囲気で手入れしやすい\n🎋 **和モダン** — 日本庭園の落ち着きを現代風に\n🌳 **ファミリーガーデン** — 子どもの遊び場＋BBQエリア\n🌹 **イングリッシュガーデン** — 四季の花が彩る華やかな庭\n\n大切なのは「どんな時間を庭で過ごしたいか」。ライフスタイルに合ったプランを、パートナーの造園家と一緒にご提案します。\n\nどんな庭時間を想像されていますか？`;
  }

  if (msg.includes("流れ") || msg.includes("プロセス") || msg.includes("ステップ")) {
    return `${namePrefix}家づくりの全体像をご説明しますね！\n\n**庭から作る家づくり 5ステップ：**\n\n① **庭の予算決定**\n理想のお庭のイメージと予算を最初に決めます\n\n② **総予算配分**\n庭・土地・建物の予算バランスをAIが最適化\n\n③ **土地探し**\nお庭に最適な土地をパートナー不動産会社と連携して提案\n\n④ **建物設計**\n庭との調和を考えた住まいをパートナー工務店が設計\n\n⑤ **庭づくり完成**\nパートナー造園家が理想のお庭を実現！\n\n各ステップで私が専属アンカーとして伴走します。一人で悩む必要はありませんよ。`;
  }

  return `${namePrefix}ご質問ありがとうございます！\n\n家づくりの専属アンカーとして、庭の予算を起点にした家づくりをサポートしています。\n\n私にご相談いただけること：\n・予算の配分と最適化\n・庭に合った土地選び\n・庭デザインのご提案\n・家づくり全体の進め方\n・パートナー企業のご紹介\n\n何でもお気軽にどうぞ。${userName || "お客様"}の理想の暮らしを、一緒に具体化しましょう！`;
}

export default function AnchorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "anchor",
      content:
        "はじめまして。「庭から作れる不動産」の専属アンカーです。\n\nAIと人間のチームで、庭の予算を起点にした家づくりを最初から最後までサポートします。\n\nまず、お名前をお聞かせいただけますか？（ニックネームでも構いません）",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("name");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addAnchorMessage = (content: string, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "anchor", content },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Onboarding flow
    if (onboardingStep === "name") {
      const name = text.trim().replace(/です$|と申します$|といいます$/g, "");
      setUserName(name);
      setOnboardingStep("interest");
      addAnchorMessage(
        `${name}さん、よろしくお願いします！\n\nこれから${name}さんの専属アンカーとして、家づくりをサポートさせていただきます。\n\nまず教えてください。今日はどんなことが気になっていますか？\n\n① 予算の組み方を知りたい\n② 庭に合う土地を探したい\n③ 庭のデザインを相談したい\n④ 家づくりの全体像を知りたい\n⑤ パートナー企業として連携を相談したい\n\n番号でも、自由にお話しいただいてもOKです！`
      );
      return;
    }

    if (onboardingStep === "interest") {
      setOnboardingStep("done");
      // Map numbered answers to topics
      let mappedMessage = text;
      if (text.includes("1") || text.includes("①")) mappedMessage = "予算の配分について相談したいです";
      if (text.includes("2") || text.includes("②")) mappedMessage = "庭に合った土地の選び方を教えてください";
      if (text.includes("3") || text.includes("③")) mappedMessage = "おすすめの庭のデザインはありますか？";
      if (text.includes("4") || text.includes("④")) mappedMessage = "家づくり全体の流れを教えてください";
      if (text.includes("5") || text.includes("⑤")) mappedMessage = "工務店としてパートナー連携を検討しています";

      const response = getMockResponse(mappedMessage, userName);
      addAnchorMessage(response, 1200);
      return;
    }

    // Normal conversation
    const response = getMockResponse(text, userName);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "anchor", content: response },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-2xl mx-auto">
      {/* Agent Badge */}
      <div className="px-4 py-3 bg-primary/5 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg">
          ⚓
        </div>
        <div>
          <div className="text-sm font-bold text-text">
            専属アンカー
            {userName && (
              <span className="text-primary ml-2">
                — {userName}さん担当
              </span>
            )}
          </div>
          <div className="text-xs text-text-sub flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
            オンライン — AI＋人間チームで対応中
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "anchor" && (
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm mr-3 flex-shrink-0 mt-1">
                ⚓
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white border border-border text-text rounded-bl-sm"
              }`}
            >
              {msg.role === "anchor" && (
                <div className="text-xs font-medium text-primary mb-1">
                  専属アンカー
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm mr-3 flex-shrink-0">
              ⚓
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-5 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-sub/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-text-sub/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-text-sub/40 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions — shown after onboarding is complete */}
      {onboardingStep === "done" && messages.length <= 5 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => sendMessage(action.message)}
                className="text-sm bg-primary/5 text-primary font-medium px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              onboardingStep === "name"
                ? "お名前を入力してください..."
                : "メッセージを入力..."
            }
            className="flex-1 bg-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-primary text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
