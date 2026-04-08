"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "anchor";
  content: string;
}

const quickActions = [
  { label: "予算について相談", message: "予算の配分について相談したいです" },
  { label: "土地の選び方", message: "庭に合った土地の選び方を教えてください" },
  { label: "庭のデザイン", message: "おすすめの庭のデザインはありますか？" },
  { label: "家づくりの流れ", message: "家づくり全体の流れを教えてください" },
];

function getMockResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("予算") || msg.includes("お金") || msg.includes("費用")) {
    return "予算についてのご相談ですね！当社では、まずお庭にかけたい予算を決めてから、土地と建物の予算を逆算して配分します。\n\n一般的な目安として：\n・シンプルな庭園：総予算の5〜10%\n・本格的な庭園：総予算の10〜20%\n・こだわりの庭園：総予算の20〜30%\n\n予算シミュレーターで具体的な数字を確認することもできますよ。ぜひお試しください！";
  }

  if (msg.includes("土地") || msg.includes("場所") || msg.includes("立地")) {
    return "お庭に最適な土地選びは、とても大切なポイントです！\n\n庭づくりの観点から土地を選ぶ際のポイント：\n・日当たり：南向きの庭スペースが確保できるか\n・地形：水はけの良い平坦な土地が理想的\n・広さ：建物面積＋お庭の面積を確保できるか\n・周辺環境：隣家との距離、眺望\n\nAIアンカーとして、お客様の庭のご希望に合った土地をご一緒に探します。お気軽にご相談ください！";
  }

  if (msg.includes("庭") || msg.includes("ガーデン") || msg.includes("デザイン")) {
    return "庭のデザインについてですね！人気のスタイルをご紹介します：\n\n🌿 ナチュラルガーデン\n自然な雰囲気を活かした、手入れしやすい庭\n\n🎋 和モダン\n日本庭園の要素を取り入れた、落ち着きのある庭\n\n🌳 ファミリーガーデン\nお子様が遊べるスペース＋BBQエリア\n\n🌹 イングリッシュガーデン\n四季折々の花が楽しめる、華やかな庭\n\nお客様のライフスタイルに合わせて、最適なプランをご提案します！";
  }

  if (msg.includes("流れ") || msg.includes("プロセス") || msg.includes("ステップ")) {
    return "家づくりの流れをご説明しますね！\n\n①【庭の予算決定】\nまず理想のお庭のイメージと予算を決めます\n\n②【総予算配分】\n庭・土地・建物の予算バランスを最適化\n\n③【土地探し】\nお庭に最適な土地をAIがご提案\n\n④【建物設計】\n庭との調和を考えた住まいを設計\n\n⑤【庭づくり完成】\n理想のお庭と住まいが完成！\n\n各ステップで専属のアンカーがサポートしますので、安心して進められますよ。";
  }

  return "ご質問ありがとうございます！家づくりのアンカーとして、お庭の予算を起点にした家づくりをサポートしています。\n\n何でもお気軽にご相談ください：\n・予算の配分について\n・土地選びのポイント\n・庭のデザイン提案\n・家づくり全体の流れ\n\n具体的なご質問をいただければ、より詳しくお答えできます！";
}

export default function AnchorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "anchor",
      content:
        "こんにちは！家づくりのアンカー、ガーデンAIです 🌿\n\nお庭の予算から、理想の住まいづくりをお手伝いします。予算のこと、土地のこと、庭のデザインのこと、何でもお気軽にご相談ください！",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getMockResponse(text);
      const anchorMsg: Message = {
        id: Date.now() + 1,
        role: "anchor",
        content: response,
      };
      setMessages((prev) => [...prev, anchorMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-2xl mx-auto">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "anchor" && (
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm mr-3 flex-shrink-0 mt-1">
                🌿
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
                  ガーデンAI
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
              🌿
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

      {/* Quick Actions */}
      {messages.length <= 1 && (
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
            placeholder="メッセージを入力..."
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
