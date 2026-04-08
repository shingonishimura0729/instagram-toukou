"use client";

import { useReducer } from "react";
import Link from "next/link";
import BudgetChart from "./BudgetChart";

interface State {
  step: number;
  totalBudget: number;
  gardenBudget: number;
  landRatio: number; // land share of remaining budget (0-100)
}

type Action =
  | { type: "SET_TOTAL"; value: number }
  | { type: "SET_GARDEN"; value: number }
  | { type: "SET_LAND_RATIO"; value: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };

const initialState: State = {
  step: 1,
  totalBudget: 4000,
  gardenBudget: 500,
  landRatio: 45,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TOTAL":
      return {
        ...state,
        totalBudget: action.value,
        gardenBudget: Math.min(state.gardenBudget, action.value * 0.3),
      };
    case "SET_GARDEN":
      return { ...state, gardenBudget: action.value };
    case "SET_LAND_RATIO":
      return { ...state, landRatio: action.value };
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, 4) };
    case "PREV_STEP":
      return { ...state, step: Math.max(state.step - 1, 1) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const gardenPresets = [
  { label: "シンプル庭園", description: "芝生＋植栽の基本的なお庭", ratio: 0.08 },
  { label: "本格庭園", description: "ウッドデッキ＋庭木＋花壇", ratio: 0.15 },
  { label: "こだわり庭園", description: "造園設計＋水場＋照明", ratio: 0.25 },
];

function formatMoney(value: number) {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}億円`;
  }
  return `${value.toLocaleString()}万円`;
}

export default function BudgetSimulator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const remaining = state.totalBudget - state.gardenBudget;
  const landBudget = Math.round(remaining * (state.landRatio / 100));
  const buildingBudget = remaining - landBudget;

  const stepLabels = ["総予算", "庭の予算", "配分調整", "結果"];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isActive = state.step >= stepNum;
          const isCurrent = state.step === stepNum;
          return (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-border text-text-sub"
                  } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                >
                  {stepNum}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    isActive ? "text-primary font-medium" : "text-text-sub"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 -mt-5 ${
                    state.step > stepNum ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
        {/* Step 1: Total Budget */}
        {state.step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-text mb-2">
              総予算を設定しましょう
            </h2>
            <p className="text-text-sub mb-8">
              家づくり全体（庭・土地・建物）の総予算をお選びください
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm text-text-sub">総予算</span>
                <span className="text-3xl font-bold text-primary">
                  {formatMoney(state.totalBudget)}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={15000}
                step={100}
                value={state.totalBudget}
                onChange={(e) =>
                  dispatch({ type: "SET_TOTAL", value: Number(e.target.value) })
                }
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-sub mt-1">
                <span>1,000万円</span>
                <span>1.5億円</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Garden Budget */}
        {state.step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-text mb-2">
              お庭の予算を決めましょう
            </h2>
            <p className="text-text-sub mb-8">
              ここがスタート地点です。理想のお庭にいくらかけたいですか？
            </p>

            {/* Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {gardenPresets.map((preset) => {
                const presetValue = Math.round(state.totalBudget * preset.ratio);
                const isSelected =
                  Math.abs(state.gardenBudget - presetValue) < 50;
                return (
                  <button
                    key={preset.label}
                    onClick={() =>
                      dispatch({ type: "SET_GARDEN", value: presetValue })
                    }
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="text-sm font-bold text-text">
                      {preset.label}
                    </div>
                    <div className="text-xs text-text-sub mt-1">
                      {preset.description}
                    </div>
                    <div className="text-lg font-bold text-primary mt-2">
                      {formatMoney(presetValue)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom slider */}
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm text-text-sub">庭の予算</span>
                <span className="text-3xl font-bold text-primary">
                  {formatMoney(state.gardenBudget)}
                </span>
              </div>
              <input
                type="range"
                min={Math.round(state.totalBudget * 0.03)}
                max={Math.round(state.totalBudget * 0.35)}
                step={10}
                value={state.gardenBudget}
                onChange={(e) =>
                  dispatch({
                    type: "SET_GARDEN",
                    value: Number(e.target.value),
                  })
                }
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-sub mt-1">
                <span>
                  {formatMoney(Math.round(state.totalBudget * 0.03))}（3%）
                </span>
                <span>
                  {formatMoney(Math.round(state.totalBudget * 0.35))}（35%）
                </span>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-bg rounded-xl p-4">
              <div className="text-sm text-text-sub mb-1">残りの予算（土地＋建物）</div>
              <div className="text-xl font-bold text-text">
                {formatMoney(remaining)}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Land/Building Ratio */}
        {state.step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-text mb-2">
              土地と建物の配分を調整
            </h2>
            <p className="text-text-sub mb-8">
              残りの予算{formatMoney(remaining)}
              を、土地と建物にどう分けますか？
            </p>

            <div className="mb-8">
              <input
                type="range"
                min={20}
                max={80}
                step={1}
                value={state.landRatio}
                onChange={(e) =>
                  dispatch({
                    type: "SET_LAND_RATIO",
                    value: Number(e.target.value),
                  })
                }
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-secondary"
              />
              <div className="flex justify-between text-xs text-text-sub mt-1">
                <span>建物重視</span>
                <span>土地重視</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-secondary/5 rounded-xl p-5 text-center">
                <div className="text-sm text-secondary font-medium mb-1">
                  📍 土地
                </div>
                <div className="text-2xl font-bold text-text">
                  {formatMoney(landBudget)}
                </div>
                <div className="text-xs text-text-sub mt-1">
                  {state.landRatio}%
                </div>
              </div>
              <div className="bg-accent/5 rounded-xl p-5 text-center">
                <div className="text-sm text-accent font-medium mb-1">
                  🏠 建物
                </div>
                <div className="text-2xl font-bold text-text">
                  {formatMoney(buildingBudget)}
                </div>
                <div className="text-xs text-text-sub mt-1">
                  {100 - state.landRatio}%
                </div>
              </div>
            </div>

            <BudgetChart
              garden={state.gardenBudget}
              land={landBudget}
              building={buildingBudget}
              total={state.totalBudget}
            />
          </div>
        )}

        {/* Step 4: Result Summary */}
        {state.step === 4 && (
          <div>
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-text mb-2">
                あなたの予算プラン
              </h2>
              <p className="text-text-sub">
                庭の予算を起点にした、理想の予算配分が完成しました
              </p>
            </div>

            <BudgetChart
              garden={state.gardenBudget}
              land={landBudget}
              building={buildingBudget}
              total={state.totalBudget}
            />

            {/* Detail cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-primary/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🌿</div>
                <div className="text-sm text-text-sub">庭</div>
                <div className="text-xl font-bold text-primary">
                  {formatMoney(state.gardenBudget)}
                </div>
              </div>
              <div className="bg-secondary/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">📍</div>
                <div className="text-sm text-text-sub">土地</div>
                <div className="text-xl font-bold text-secondary">
                  {formatMoney(landBudget)}
                </div>
              </div>
              <div className="bg-accent/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🏠</div>
                <div className="text-sm text-text-sub">建物</div>
                <div className="text-xl font-bold text-accent">
                  {formatMoney(buildingBudget)}
                </div>
              </div>
            </div>

            {/* Next actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/anchor"
                className="flex-1 inline-flex items-center justify-center bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
              >
                AIアンカーに相談する
              </Link>
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center border-2 border-primary text-primary font-bold px-6 py-3 rounded-xl hover:bg-primary/5 transition-colors"
              >
                無料相談を予約する
              </Link>
            </div>

            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="mt-4 w-full text-sm text-text-sub hover:text-text transition-colors py-2"
            >
              最初からやり直す
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {state.step < 4 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {state.step > 1 ? (
              <button
                onClick={() => dispatch({ type: "PREV_STEP" })}
                className="text-text-sub hover:text-text font-medium px-6 py-3 rounded-xl transition-colors"
              >
                ← 戻る
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => dispatch({ type: "NEXT_STEP" })}
              className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-light transition-colors"
            >
              次へ →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
