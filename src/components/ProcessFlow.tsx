const steps = [
  {
    number: "01",
    icon: "🌿",
    title: "庭の予算決定",
    description: "理想のお庭にかける予算を最初に決めます",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    number: "02",
    icon: "💰",
    title: "総予算配分",
    description: "庭・土地・建物の予算バランスを最適化",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    number: "03",
    icon: "📍",
    title: "土地探し",
    description: "お庭に最適な土地をAIがご提案",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    number: "04",
    icon: "🏠",
    title: "建物設計",
    description: "庭との調和を考えた住まいの設計",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    number: "05",
    icon: "✨",
    title: "庭づくり完成",
    description: "理想のお庭と住まいが完成します",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function ProcessFlow() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            家づくりの<span className="text-primary">プロセス</span>
          </h2>
          <p className="text-text-sub text-lg max-w-xl mx-auto">
            庭の予算を起点に、5つのステップで理想の住まいを実現します
          </p>
        </div>

        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Mobile connector */}
                {index > 0 && (
                  <div className="md:hidden w-0.5 h-8 bg-border -mt-4 mb-4" />
                )}

                {/* Icon circle */}
                <div
                  className={`relative z-10 w-24 h-24 rounded-full ${step.bgColor} flex items-center justify-center text-3xl mb-4 shadow-sm`}
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <span className={`text-xs font-bold ${step.color} mb-1`}>
                  STEP {step.number}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-text-sub leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
