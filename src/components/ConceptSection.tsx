const concepts = [
  {
    icon: "🌿",
    title: "庭の予算ファースト",
    description:
      "従来の「残り予算で庭」ではなく、理想のお庭の予算を最初に決めます。暮らしの豊かさは庭から始まります。",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "🤝",
    title: "専属アドバイザーの伴走",
    description:
      "あなた専属のアドバイザー「アンカー」が、土地探しから建物設計、庭づくりまで一貫してサポート。いつでも相談できる安心感。",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: "🏡",
    title: "土地から導く安心設計",
    description:
      "お庭の要望に最適な土地を、パートナー不動産会社と連携して提案。日当たり、広さ、地形を考慮した、庭ありきの土地選びを実現します。",
    color: "bg-secondary/10 text-secondary",
  },
];

export default function ConceptSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            私たちの<span className="text-primary">3つの約束</span>
          </h2>
          <p className="text-text-sub text-lg max-w-xl mx-auto">
            庭から始まる家づくりで、本当に豊かな暮らしを実現します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="bg-bg rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-xl ${concept.color} flex items-center justify-center text-2xl mb-5`}
              >
                {concept.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-3">
                {concept.title}
              </h3>
              <p className="text-text-sub leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
