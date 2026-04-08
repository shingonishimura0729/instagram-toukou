"use client";

interface BudgetChartProps {
  garden: number;
  land: number;
  building: number;
  total: number;
}

export default function BudgetChart({ garden, land, building, total }: BudgetChartProps) {
  const gardenPct = total > 0 ? (garden / total) * 100 : 0;
  const landPct = total > 0 ? (land / total) * 100 : 0;
  const buildingPct = total > 0 ? (building / total) * 100 : 0;

  // SVG donut chart calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const gardenDash = (gardenPct / 100) * circumference;
  const landDash = (landPct / 100) * circumference;
  const buildingDash = (buildingPct / 100) * circumference;

  const gardenOffset = 0;
  const landOffset = -gardenDash;
  const buildingOffset = -(gardenDash + landDash);

  const formatMoney = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}億円`;
    }
    return `${value.toLocaleString()}万円`;
  };

  const items = [
    { label: "庭", value: garden, pct: gardenPct, color: "#2D5A27", colorClass: "bg-primary" },
    { label: "土地", value: land, pct: landPct, color: "#8B6914", colorClass: "bg-secondary" },
    { label: "建物", value: building, pct: buildingPct, color: "#3B82B6", colorClass: "bg-accent" },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Donut Chart */}
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#E5E0D5"
            strokeWidth="24"
          />
          {/* Building (bottom layer) */}
          {buildingPct > 0 && (
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#3B82B6"
              strokeWidth="24"
              strokeDasharray={`${buildingDash} ${circumference - buildingDash}`}
              strokeDashoffset={buildingOffset}
              transform="rotate(-90 100 100)"
              className="transition-all duration-500"
            />
          )}
          {/* Land (middle layer) */}
          {landPct > 0 && (
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#8B6914"
              strokeWidth="24"
              strokeDasharray={`${landDash} ${circumference - landDash}`}
              strokeDashoffset={landOffset}
              transform="rotate(-90 100 100)"
              className="transition-all duration-500"
            />
          )}
          {/* Garden (top layer) */}
          {gardenPct > 0 && (
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#2D5A27"
              strokeWidth="24"
              strokeDasharray={`${gardenDash} ${circumference - gardenDash}`}
              strokeDashoffset={gardenOffset}
              transform="rotate(-90 100 100)"
              className="transition-all duration-500"
            />
          )}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-text-sub">総予算</span>
          <span className="text-lg font-bold text-text">{formatMoney(total)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.colorClass}`} />
              <span className="text-sm font-medium text-text">{item.label}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-text">
                {formatMoney(item.value)}
              </span>
              <span className="text-xs text-text-sub ml-1">
                ({item.pct.toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
