import { useState, useEffect, useRef } from "react";

const FOOD_DB = [
  { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice (100g)", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { name: "Egg (1 large)", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  { name: "Banana (1 medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: "Greek Yogurt (170g)", calories: 100, protein: 17, carbs: 6, fat: 0.7 },
  { name: "Oatmeal (100g)", calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: "Salmon (100g)", calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "Broccoli (100g)", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: "Sweet Potato (100g)", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { name: "Almonds (30g)", calories: 173, protein: 6, carbs: 6, fat: 15 },
  { name: "Whey Protein Shake", calories: 120, protein: 25, carbs: 3, fat: 1.5 },
  { name: "Apple (1 medium)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: "White Rice (100g)", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: "Avocado (100g)", calories: 160, protein: 2, carbs: 9, fat: 15 },
  { name: "Tuna (100g)", calories: 132, protein: 29, carbs: 0, fat: 1 },
];

const EXERCISE_DB = [
  { name: "Bench Press", muscle: "Chest", type: "Strength" },
  { name: "Squat", muscle: "Legs", type: "Strength" },
  { name: "Deadlift", muscle: "Back", type: "Strength" },
  { name: "Pull-ups", muscle: "Back", type: "Bodyweight" },
  { name: "Shoulder Press", muscle: "Shoulders", type: "Strength" },
  { name: "Bicep Curl", muscle: "Arms", type: "Strength" },
  { name: "Tricep Dip", muscle: "Arms", type: "Bodyweight" },
  { name: "Leg Press", muscle: "Legs", type: "Strength" },
  { name: "Running", muscle: "Cardio", type: "Cardio" },
  { name: "Cycling", muscle: "Cardio", type: "Cardio" },
  { name: "Jump Rope", muscle: "Cardio", type: "Cardio" },
  { name: "Plank", muscle: "Core", type: "Bodyweight" },
  { name: "Lunges", muscle: "Legs", type: "Bodyweight" },
  { name: "Push-ups", muscle: "Chest", type: "Bodyweight" },
  { name: "Lat Pulldown", muscle: "Back", type: "Strength" },
];

const DAILY_GOALS = { calories: 2200, protein: 150, carbs: 250, fat: 70 };

const today = () => new Date().toISOString().split("T")[0];

const muscleColors = {
  Chest: "#f97316", Legs: "#3b82f6", Back: "#8b5cf6",
  Shoulders: "#10b981", Arms: "#ec4899", Core: "#f59e0b",
  Cardio: "#ef4444",
};


// ─── Animated SVG Exercise Diagrams ───────────────────────────────────────────

const ExerciseFigure = ({ name, animate }) => {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const t = setInterval(() => setFrame(f => (f + 1) % 2), 700);
    return () => clearInterval(t);
  }, [animate]);

  const figures = {
    // Bench Press: lying flat, arms push up
    "Bench Press": [
      <g key="a">
        {/* body lying */}
        <rect x="30" y="62" width="60" height="8" rx="4" fill="#334155"/>
        <rect x="35" y="54" width="50" height="10" rx="5" fill="#38bdf8" opacity="0.8"/>
        {/* head */}
        <circle cx="88" cy="50" r="8" fill="#f8fafc"/>
        {/* arms down holding bar */}
        <line x1="45" y1="56" x2="35" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="75" y1="56" x2="85" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="25" y1="40" x2="95" y2="40" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="22" cy="40" r="5" fill="#f59e0b"/>
        <circle cx="98" cy="40" r="5" fill="#f59e0b"/>
      </g>,
      <g key="b">
        <rect x="30" y="62" width="60" height="8" rx="4" fill="#334155"/>
        <rect x="35" y="54" width="50" height="10" rx="5" fill="#38bdf8" opacity="0.8"/>
        <circle cx="88" cy="50" r="8" fill="#f8fafc"/>
        {/* arms extended up */}
        <line x1="45" y1="56" x2="38" y2="28" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="75" y1="56" x2="82" y2="28" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="28" y1="28" x2="92" y2="28" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="25" cy="28" r="5" fill="#f59e0b"/>
        <circle cx="95" cy="28" r="5" fill="#f59e0b"/>
      </g>
    ],
    "Squat": [
      <g key="a">
        {/* Standing */}
        <circle cx="60" cy="18" r="9" fill="#f8fafc"/>
        <line x1="60" y1="27" x2="60" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="38" x2="42" y2="50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="38" x2="78" y2="50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="50" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="70" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="50" y1="78" x2="45" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="70" y1="78" x2="75" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Squat down */}
        <circle cx="60" cy="30" r="9" fill="#f8fafc"/>
        <line x1="60" y1="39" x2="60" y2="58" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="46" x2="38" y2="42" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="46" x2="82" y2="42" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="58" x2="44" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="58" x2="76" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="44" y1="72" x2="40" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="76" y1="72" x2="80" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ],
    "Deadlift": [
      <g key="a">
        {/* Bent over reaching bar */}
        <circle cx="60" cy="20" r="9" fill="#f8fafc"/>
        <line x1="60" y1="29" x2="55" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="55" y1="40" x2="38" y2="52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="40" x2="68" y2="52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="38" y1="52" x2="32" y2="68" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="52" x2="74" y2="68" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="55" y1="55" x2="48" y2="75" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="55" x2="62" y2="75" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="25" y1="80" x2="95" y2="80" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="22" cy="80" r="6" fill="#f59e0b"/>
        <circle cx="98" cy="80" r="6" fill="#f59e0b"/>
      </g>,
      <g key="b">
        {/* Standing upright */}
        <circle cx="60" cy="14" r="9" fill="#f8fafc"/>
        <line x1="60" y1="23" x2="60" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="35" x2="44" y2="58" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="35" x2="76" y2="58" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="44" y1="58" x2="38" y2="72" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="76" y1="58" x2="82" y2="72" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="52" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="68" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="25" y1="78" x2="95" y2="78" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="22" cy="78" r="6" fill="#f59e0b"/>
        <circle cx="98" cy="78" r="6" fill="#f59e0b"/>
      </g>
    ],
    "Pull-ups": [
      <g key="a">
        {/* Arms slightly bent, hanging */}
        <line x1="20" y1="8" x2="100" y2="8" stroke="#475569" strokeWidth="6" strokeLinecap="round"/>
        <line x1="42" y1="8" x2="42" y2="16" stroke="#94a3b8" strokeWidth="3"/>
        <line x1="78" y1="8" x2="78" y2="16" stroke="#94a3b8" strokeWidth="3"/>
        <circle cx="60" cy="38" r="9" fill="#f8fafc"/>
        <line x1="60" y1="47" x2="60" y2="72" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="44" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="76" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="42" y1="16" x2="50" y2="30" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="78" y1="16" x2="70" y2="30" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="72" x2="54" y2="88" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="72" x2="66" y2="88" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Pulled up - chin above bar */}
        <line x1="20" y1="18" x2="100" y2="18" stroke="#475569" strokeWidth="6" strokeLinecap="round"/>
        <line x1="42" y1="18" x2="42" y2="26" stroke="#94a3b8" strokeWidth="3"/>
        <line x1="78" y1="18" x2="78" y2="26" stroke="#94a3b8" strokeWidth="3"/>
        <circle cx="60" cy="16" r="9" fill="#f8fafc"/>
        <line x1="60" y1="25" x2="60" y2="52" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="36" x2="44" y2="52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="36" x2="76" y2="52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="42" y1="26" x2="50" y2="26" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="78" y1="26" x2="70" y2="26" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="52" x2="54" y2="68" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="52" x2="66" y2="68" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ],
    "Push-ups": [
      <g key="a">
        {/* Up position */}
        <circle cx="75" cy="22" r="8" fill="#f8fafc"/>
        <line x1="75" y1="30" x2="55" y2="50" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="68" y1="42" x2="80" y2="32" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="80" y1="32" x2="90" y2="42" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="50" x2="30" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="30" y1="55" x2="22" y2="66" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="90" y1="42" x2="96" y2="55" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Down position */}
        <circle cx="72" cy="32" r="8" fill="#f8fafc"/>
        <line x1="72" y1="40" x2="50" y2="54" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="64" y1="48" x2="74" y2="38" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="74" y1="38" x2="84" y2="50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="50" y1="54" x2="26" y2="62" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="26" y1="62" x2="18" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="84" y1="50" x2="92" y2="62" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      </g>
    ],
    "Plank": [
      <g key="a">
        {/* Plank hold */}
        <circle cx="80" cy="28" r="8" fill="#f8fafc"/>
        <line x1="80" y1="36" x2="30" y2="50" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round"/>
        <line x1="70" y1="38" x2="78" y2="52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="78" y1="52" x2="72" y2="65" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="46" x2="32" y2="60" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="60" x2="28" y2="72" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Slight core engagement pulse */}
        <circle cx="80" cy="27" r="8" fill="#f8fafc"/>
        <line x1="80" y1="35" x2="30" y2="48" stroke="#6ee7f7" strokeWidth="6" strokeLinecap="round"/>
        <line x1="70" y1="37" x2="78" y2="51" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="78" y1="51" x2="72" y2="64" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="40" y1="45" x2="32" y2="59" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="59" x2="28" y2="71" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ],
    "Bicep Curl": [
      <g key="a">
        {/* Arms down */}
        <circle cx="60" cy="16" r="9" fill="#f8fafc"/>
        <line x1="60" y1="25" x2="60" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="35" x2="42" y2="55" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="35" x2="78" y2="55" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="40" cy="58" r="4" fill="#f59e0b"/>
        <circle cx="80" cy="58" r="4" fill="#f59e0b"/>
        <line x1="60" y1="55" x2="52" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="68" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Arms curled up */}
        <circle cx="60" cy="16" r="9" fill="#f8fafc"/>
        <line x1="60" y1="25" x2="60" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="35" x2="36" y2="38" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="35" x2="84" y2="38" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="33" cy="36" r="4" fill="#f59e0b"/>
        <circle cx="87" cy="36" r="4" fill="#f59e0b"/>
        <line x1="60" y1="55" x2="52" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="68" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      </g>
    ],
    "Shoulder Press": [
      <g key="a">
        {/* Bar at shoulder */}
        <circle cx="60" cy="18" r="9" fill="#f8fafc"/>
        <line x1="60" y1="27" x2="60" y2="57" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="37" x2="38" y2="46" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="37" x2="82" y2="46" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="28" y1="44" x2="92" y2="44" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="25" cy="44" r="5" fill="#f59e0b"/>
        <circle cx="95" cy="44" r="5" fill="#f59e0b"/>
        <line x1="60" y1="57" x2="52" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="57" x2="68" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Bar overhead */}
        <circle cx="60" cy="18" r="9" fill="#f8fafc"/>
        <line x1="60" y1="27" x2="60" y2="57" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="37" x2="40" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="37" x2="80" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="30" y1="16" x2="90" y2="16" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="27" cy="16" r="5" fill="#f59e0b"/>
        <circle cx="93" cy="16" r="5" fill="#f59e0b"/>
        <line x1="60" y1="57" x2="52" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="57" x2="68" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      </g>
    ],
    "Lunges": [
      <g key="a">
        {/* Standing */}
        <circle cx="60" cy="16" r="9" fill="#f8fafc"/>
        <line x1="60" y1="25" x2="60" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="60" y1="38" x2="44" y2="50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="38" x2="76" y2="50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="52" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="68" y2="76" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="52" y1="76" x2="48" y2="86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="76" x2="72" y2="86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>,
      <g key="b">
        {/* Lunge position */}
        <circle cx="58" cy="20" r="9" fill="#f8fafc"/>
        <line x1="58" y1="29" x2="55" y2="55" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="55" y1="40" x2="40" y2="48" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="40" x2="70" y2="48" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="55" x2="38" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="55" y1="55" x2="72" y2="65" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="38" y1="72" x2="30" y2="86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="72" y1="65" x2="80" y2="78" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="25" y1="86" x2="45" y2="86" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ],
    "Running": [
      <g key="a">
        <circle cx="65" cy="16" r="9" fill="#f8fafc"/>
        <line x1="65" y1="25" x2="60" y2="52" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="62" y1="36" x2="44" y2="28" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="62" y1="36" x2="78" y2="46" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="52" x2="46" y2="70" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="60" y1="52" x2="74" y2="65" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="46" y1="70" x2="38" y2="82" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="74" y1="65" x2="82" y2="75" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>,
      <g key="b">
        <circle cx="60" cy="18" r="9" fill="#f8fafc"/>
        <line x1="60" y1="27" x2="58" y2="54" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
        <line x1="58" y1="38" x2="76" y2="28" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="58" y1="38" x2="42" y2="50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="58" y1="54" x2="70" y2="72" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="58" y1="54" x2="46" y2="66" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
        <line x1="70" y1="72" x2="78" y2="84" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="46" y1="66" x2="36" y2="74" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ],
  };

  const defaultFigure = (f) => (
    <g key={f}>
      <circle cx="60" cy="18" r="9" fill="#f8fafc"/>
      <line x1="60" y1="27" x2="60" y2="57" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"/>
      <line x1="60" y1="38" x2={f === 0 ? "42" : "40"} y2={f === 0 ? "52" : "48"} stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="38" x2={f === 0 ? "78" : "80"} y2={f === 0 ? "52" : "48"} stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="57" x2="52" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="57" x2="68" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
    </g>
  );

  const frames = figures[name] || [defaultFigure(0), defaultFigure(1)];

  return (
    <svg viewBox="0 0 120 96" width="100%" height="100%" style={{ display: "block" }}>
      <rect width="120" height="96" fill="transparent"/>
      {frames[frame]}
    </svg>
  );
};

// Exercise instructions database
const EXERCISE_INFO = {
  "Bench Press": {
    steps: ["Lie flat on bench, feet on floor", "Grip bar slightly wider than shoulder-width", "Lower bar to mid-chest with control", "Press explosively back to start"],
    breathe: "Inhale on the way down, exhale as you press up",
    avoid: "Don't bounce the bar off your chest",
    difficulty: "Intermediate",
  },
  "Squat": {
    steps: ["Stand with feet shoulder-width apart", "Brace core and push hips back", "Lower until thighs are parallel to floor", "Drive through heels to stand back up"],
    breathe: "Deep breath in at top, exhale as you rise",
    avoid: "Don't let knees cave inward",
    difficulty: "Beginner",
  },
  "Deadlift": {
    steps: ["Stand with bar over mid-foot, hip-width stance", "Hinge at hips, grip bar just outside legs", "Flatten back, brace core hard", "Push floor away — don't pull with arms"],
    breathe: "Big breath and brace before each rep",
    avoid: "Never round the lower back",
    difficulty: "Advanced",
  },
  "Pull-ups": {
    steps: ["Hang with arms fully extended, palms facing away", "Retract shoulder blades and pull elbows to ribs", "Drive chin above the bar", "Lower with control — don't just drop"],
    breathe: "Exhale as you pull up, inhale on the way down",
    avoid: "Avoid kipping or swinging for momentum",
    difficulty: "Intermediate",
  },
  "Push-ups": {
    steps: ["Hands slightly wider than shoulders, body in plank", "Keep core tight and glutes squeezed", "Lower chest to an inch from the floor", "Press back up with elbows at 45°"],
    breathe: "Inhale down, exhale up",
    avoid: "Don't let your hips sag or pike",
    difficulty: "Beginner",
  },
  "Plank": {
    steps: ["Forearms on floor, elbows under shoulders", "Engage core, glutes, and quads simultaneously", "Keep body in a straight line head to heel", "Hold position — breathe slowly and steadily"],
    breathe: "Slow, controlled breathing throughout",
    avoid: "Don't let hips drop or rise",
    difficulty: "Beginner",
  },
  "Bicep Curl": {
    steps: ["Stand holding dumbbells at your sides", "Keep upper arms pinned against your body", "Curl weight up by contracting the bicep", "Slowly lower back to full extension"],
    breathe: "Exhale on the curl up, inhale lowering",
    avoid: "Don't swing your torso for momentum",
    difficulty: "Beginner",
  },
  "Shoulder Press": {
    steps: ["Hold bar at shoulder height, grip just outside shoulders", "Brace core and press straight overhead", "Fully lock out arms at the top", "Lower back to collar bone with control"],
    breathe: "Exhale on the push, inhale on the way down",
    avoid: "Don't arch the lower back excessively",
    difficulty: "Intermediate",
  },
  "Lunges": {
    steps: ["Stand tall, step one foot forward", "Lower your back knee toward the floor", "Front thigh should be parallel to floor", "Push through front heel to return to start"],
    breathe: "Inhale as you lunge down, exhale as you return",
    avoid: "Don't let front knee track past toes",
    difficulty: "Beginner",
  },
  "Running": {
    steps: ["Maintain upright posture, slight forward lean", "Land mid-foot, not on heel", "Arms swing forward — not across body", "Keep breathing rhythm consistent"],
    breathe: "Breathe in for 2 steps, out for 2 steps",
    avoid: "Avoid overstriding — keep steps under your hips",
    difficulty: "Beginner",
  },
};

const difficultyColor = { Beginner: "#34d399", Intermediate: "#f59e0b", Advanced: "#f87171" };

const ExerciseCard = ({ ex, color }) => {
  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const info = EXERCISE_INFO[ex.name] || {
    steps: [ex.tip || "Focus on controlled movement throughout the exercise", "Maintain proper posture", "Breathe consistently", "Stop if you feel sharp pain"],
    breathe: "Breathe steadily throughout",
    avoid: "Avoid rushing the movement",
    difficulty: "Intermediate",
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, marginBottom: 12, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
      {/* Header row */}
      <div onClick={() => { setExpanded(e => !e); setAnimating(true); }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", cursor: "pointer" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ex.name}</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ background: color + "15", color: color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, border: `1px solid ${color}30` }}>{ex.muscle}</span>
            <span style={{ fontSize: 12, color: "#475569" }}>{ex.sets} × {ex.reps}</span>
            <span style={{ fontSize: 11, color: "#334155" }}>Rest {ex.rest}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#6ee7f7" }}>{ex.sets}×{ex.reps}</div>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#475569", transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
        </div>
      </div>

      {/* Expanded guide */}
      {expanded && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "0 16px 16px" }}>
          {/* Animated figure */}
          <div style={{ display: "flex", gap: 14, marginTop: 14, marginBottom: 14 }}>
            <div
              style={{ width: 110, height: 90, background: "rgba(0,0,0,0.4)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, overflow: "hidden", cursor: "pointer" }}
              onMouseEnter={() => setAnimating(true)}
              onClick={() => setAnimating(a => !a)}
            >
              <ExerciseFigure name={ex.name} animate={animating} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ background: (difficultyColor[info.difficulty] || "#f59e0b") + "20", color: difficultyColor[info.difficulty] || "#f59e0b", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>{info.difficulty}</span>
              </div>
              <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
                <span style={{ color: "#6ee7f7", fontWeight: 600 }}>Breathing: </span>{info.breathe}
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 4, lineHeight: 1.5 }}>
                <span style={{ color: "#f87171", fontWeight: 600 }}>Avoid: </span>{info.avoid}
              </div>
            </div>
          </div>

          {/* Step by step */}
          <div style={{ fontSize: 11, color: "#334155", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>Step-by-Step</div>
          {info.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${color}20`, border: `1px solid ${color}40`, color: color, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
            </div>
          ))}

          {ex.tip && (
            <div style={{ background: "rgba(56,189,248,0.06)", borderRadius: 10, padding: "10px 12px", marginTop: 8, borderLeft: "3px solid rgba(56,189,248,0.4)", fontSize: 12, color: "#64748b" }}>
              💡 <strong style={{ color: "#6ee7f7" }}>Coach tip:</strong> {ex.tip}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function FitnessApp() {
  const [tab, setTab] = useState("dashboard");
  const [foodLog, setFoodLog] = useState([]);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [weight, setWeight] = useState([{ date: today(), value: 175 }]);
  const [foodSearch, setFoodSearch] = useState("");
  const [foodModal, setFoodModal] = useState(false);
  const [workoutModal, setWorkoutModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodServings, setFoodServings] = useState(1);
  const [foodMeal, setFoodMeal] = useState("Breakfast");
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);
  const [cardioTime, setCardioTime] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [customFood, setCustomFood] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  const [customFoodMode, setCustomFoodMode] = useState(false);

  // AI Workout Generator state
  const [aiWorkout, setAiWorkout] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiPrefs, setAiPrefs] = useState({
    style: "Strength Training",
    level: "Intermediate",
    duration: "45",
    focus: "Full Body",
    equipment: "Full Gym",
  });
  const [savedPlans, setSavedPlans] = useState([]);
  const [viewingPlan, setViewingPlan] = useState(null);

  const todayFood = foodLog.filter(f => f.date === today());
  const todayWorkouts = workoutLog.filter(w => w.date === today());

  const totals = todayFood.reduce((acc, f) => ({
    calories: acc.calories + f.calories,
    protein: acc.protein + f.protein,
    carbs: acc.carbs + f.carbs,
    fat: acc.fat + f.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const ring = (val, max, color) => {
    const pct = Math.min(val / max, 1);
    const r = 28; const circ = 2 * Math.PI * r;
    return (
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle cx="35" cy="35" r={r} fill="none" stroke={color}
          strokeWidth="6" strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
          transform="rotate(-90 35 35)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }} />
        <text x="35" y="39" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="'Sora', sans-serif">
          {Math.round(pct * 100)}%
        </text>
      </svg>
    );
  };

  const addFood = () => {
    if (!selectedFood) return;
    const entry = {
      id: Date.now(),
      date: today(),
      meal: foodMeal,
      name: selectedFood.name,
      calories: Math.round(selectedFood.calories * foodServings),
      protein: Math.round(selectedFood.protein * foodServings * 10) / 10,
      carbs: Math.round(selectedFood.carbs * foodServings * 10) / 10,
      fat: Math.round(selectedFood.fat * foodServings * 10) / 10,
    };
    setFoodLog(prev => [...prev, entry]);
    setFoodModal(false);
    setSelectedFood(null);
    setFoodServings(1);
    setFoodSearch("");
    setCustomFoodMode(false);
  };

  const addCustomFood = () => {
    const cf = customFood;
    if (!cf.name || !cf.calories) return;
    const f = { name: cf.name, calories: +cf.calories, protein: +cf.protein || 0, carbs: +cf.carbs || 0, fat: +cf.fat || 0 };
    const entry = { id: Date.now(), date: today(), meal: foodMeal, ...f };
    setFoodLog(prev => [...prev, entry]);
    setFoodModal(false);
    setCustomFood({ name: "", calories: "", protein: "", carbs: "", fat: "" });
    setCustomFoodMode(false);
  };

  const addWorkout = () => {
    if (!selectedExercise) return;
    const isCardio = selectedExercise.type === "Cardio";
    const entry = {
      id: Date.now(),
      date: today(),
      name: selectedExercise.name,
      muscle: selectedExercise.muscle,
      type: selectedExercise.type,
      sets: isCardio ? null : sets.filter(s => s.reps),
      duration: isCardio ? cardioTime : null,
    };
    setWorkoutLog(prev => [...prev, entry]);
    setWorkoutModal(false);
    setSelectedExercise(null);
    setSets([{ reps: "", weight: "" }]);
    setCardioTime("");
    setExerciseSearch("");
  };

  const generateAiWorkout = async () => {
    setAiLoading(true);
    setAiError("");
    setAiWorkout(null);
    try {
      const prompt = `You are an expert personal trainer. Generate a detailed ${aiPrefs.style} workout plan with these parameters:
- Fitness Level: ${aiPrefs.level}
- Duration: ${aiPrefs.duration} minutes
- Focus: ${aiPrefs.focus}
- Equipment: ${aiPrefs.equipment}

Respond ONLY with a valid JSON object (no markdown, no backticks, no preamble) in this exact structure:
{
  "title": "Workout name",
  "style": "${aiPrefs.style}",
  "duration": "${aiPrefs.duration} min",
  "level": "${aiPrefs.level}",
  "focus": "${aiPrefs.focus}",
  "warmup": ["exercise 1 (duration/reps)", "exercise 2 (duration/reps)"],
  "exercises": [
    {
      "name": "Exercise Name",
      "muscle": "Muscle Group",
      "sets": 4,
      "reps": "8-10",
      "rest": "90s",
      "tip": "Form tip or coaching cue"
    }
  ],
  "cooldown": ["stretch 1 (duration)", "stretch 2 (duration)"],
  "notes": "Brief overall coaching note about this workout"
}`;

      // Calls our secure Vercel serverless function — API key stays on the server
      const response = await fetch("/api/generate-workout.cjs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "API error");
      const text = data.result;
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiWorkout(parsed);
    } catch (err) {
      setAiError("Failed to generate workout. Please try again.");
    }
    setAiLoading(false);
  };

  const savePlan = () => {
    if (!aiWorkout) return;
    setSavedPlans(prev => [...prev, { ...aiWorkout, id: Date.now(), savedAt: today() }]);
  };

  const logPlanToToday = (plan) => {
    const entries = plan.exercises.map(ex => ({
      id: Date.now() + Math.random(),
      date: today(),
      name: ex.name,
      muscle: ex.muscle,
      type: plan.style.includes("Cardio") || plan.style.includes("HIIT") ? "Cardio" : "Strength",
      sets: Array.from({ length: ex.sets }, () => ({ reps: ex.reps, weight: "" })),
      duration: null,
    }));
    setWorkoutLog(prev => [...prev, ...entries]);
    setViewingPlan(null);
    setTab("workout");
  };

  const logWeight = () => {
    if (!weightInput) return;
    setWeight(prev => [...prev.filter(w => w.date !== today()), { date: today(), value: +weightInput }]);
    setWeightInput("");
  };

  const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const filteredFoods = FOOD_DB.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));
  const filteredExercises = EXERCISE_DB.filter(e =>
    e.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
    e.muscle.toLowerCase().includes(exerciseSearch.toLowerCase())
  );

  const macroBar = (val, max, color, label) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: "white" }}>{Math.round(val)}g / {max}g</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(val / max * 100, 100)}%`, background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );

  const s = {
    app: { fontFamily: "'Sora', sans-serif", background: "#080b14", minHeight: "100%", color: "white", maxWidth: 480, margin: "0 auto", position: "relative", paddingBottom: "calc(env(safe-area-inset-bottom) + 90px)" },
    header: { padding: "28px 20px 16px", background: "linear-gradient(180deg, #0d1220 0%, transparent 100%)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)" },
    title: { fontSize: 24, fontWeight: 800, letterSpacing: -1, margin: 0, background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtitle: { fontSize: 12, color: "#475569", marginTop: 3, fontWeight: 500, letterSpacing: 0.3 },
    nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(8,11,20,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", zIndex: 100, paddingBottom: "calc(env(safe-area-inset-bottom) + 4px)" },
    navBtn: (active) => ({ flex: 1, padding: "10px 4px 6px", background: "none", border: "none", color: active ? "#6ee7f7" : "#334155", cursor: "pointer", fontSize: 10, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.2s", fontFamily: "'Sora', sans-serif", letterSpacing: 0.3 }),
    card: { background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: 20, margin: "10px 16px", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" },
    btn: (color = "#38bdf8") => ({ background: color, color: (color === "#38bdf8" || color === "#10b981") ? "#080b14" : "white", border: "none", borderRadius: 12, padding: "12px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Sora', sans-serif", transition: "all 0.2s", letterSpacing: -0.2 }),
    input: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "white", fontSize: 14, fontFamily: "'Sora', sans-serif", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" },
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" },
    modalBox: { background: "#0f1623", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480, maxHeight: "88vh", overflowY: "auto", padding: "24px 20px 32px", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" },
    tag: (color) => ({ background: color + "15", color: color, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, display: "inline-block", letterSpacing: 0.3, border: `1px solid ${color}30` }),
    sectionTitle: { fontSize: 11, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: 1.5, padding: "20px 20px 6px" },
  };

  const icons = {
    dashboard: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3zm0 10h8v8H3zm10-10h8v8h-8zm0 10h8v8h-8z"/></svg>
    ),
    food: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
    ),
    workout: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>
    ),
    progress: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    ai: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a4 4 0 014 4v1h1a3 3 0 013 3v2a3 3 0 01-3 3h-1v1a4 4 0 01-8 0v-1H7a3 3 0 01-3-3v-2a3 3 0 013-3h1V6a4 4 0 014-4z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>
    ),
  };

  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={s.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={s.title}>FitTrack</h1>
            <p style={s.subtitle}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(129,140,248,0.15))", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 14, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#6ee7f7" }}>
            {Math.round(totals.calories)} <span style={{ color: "#334155", fontWeight: 500, fontSize: 11 }}>kcal</span>
          </div>
        </div>
      </div>

      {/* DASHBOARD */}
      {tab === "dashboard" && (
        <div>
          {/* Calorie card */}
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 2 }}>Calories Today</div>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -2, background: "linear-gradient(135deg, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {Math.round(totals.calories)}
                  <span style={{ fontSize: 15, color: "#334155", fontWeight: 500, WebkitTextFillColor: "#334155" }}> / {DAILY_GOALS.calories}</span>
                </div>
                <div style={{ fontSize: 13, color: DAILY_GOALS.calories - totals.calories > 0 ? "#34d399" : "#f87171", fontWeight: 600 }}>
                  {DAILY_GOALS.calories - totals.calories > 0
                    ? `${DAILY_GOALS.calories - Math.round(totals.calories)} remaining`
                    : `${Math.round(totals.calories) - DAILY_GOALS.calories} over goal`}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {ring(totals.protein, DAILY_GOALS.protein, "#f97316")}
                {ring(totals.carbs, DAILY_GOALS.carbs, "#3b82f6")}
                {ring(totals.fat, DAILY_GOALS.fat, "#a855f7")}
              </div>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(totals.calories / DAILY_GOALS.calories * 100, 100)}%`, background: "linear-gradient(90deg, #38bdf8, #a78bfa, #f472b6)", borderRadius: 4, transition: "width 0.6s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: 14 }}>
              {[["Protein", "#f97316"], ["Carbs", "#3b82f6"], ["Fat", "#a855f7"]].map(([m, c]) => (
                <div key={m} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{m}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c }}>{Math.round(totals[m.toLowerCase()])}g</div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's workouts */}
          <div style={s.sectionTitle}>Today's Activity</div>
          <div style={s.card}>
            {todayWorkouts.length === 0 ? (
              <div style={{ color: "#475569", textAlign: "center", padding: "8px 0", fontSize: 14 }}>No workouts logged yet</div>
            ) : (
              todayWorkouts.map(w => (
                <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: muscleColors[w.muscle] || "#38bdf8", flexShrink: 0, boxShadow: `0 0 8px ${muscleColors[w.muscle] || "#38bdf8"}` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{w.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {w.type === "Cardio" ? `${w.duration} mins` : `${w.sets?.length} sets`} · {w.muscle}
                    </div>
                  </div>
                  <span style={s.tag(muscleColors[w.muscle] || "#38bdf8")}>{w.type}</span>
                </div>
              ))
            )}
            <button style={{ ...s.btn(), width: "100%", marginTop: 8 }} onClick={() => setWorkoutModal(true)}>
              + Log Exercise
            </button>
          </div>

          {/* Quick add food */}
          <div style={s.sectionTitle}>Today's Meals</div>
          <div style={s.card}>
            {meals.map(meal => {
              const items = todayFood.filter(f => f.meal === meal);
              return (
                <div key={meal} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{meal}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{items.reduce((a, f) => a + f.calories, 0)} kcal</div>
                  </div>
                  {items.map(f => (
                    <div key={f.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 }}>
                      <span style={{ color: "#94a3b8" }}>{f.name}</span>
                      <span style={{ color: "#38bdf8", fontWeight: 600 }}>{f.calories} kcal</span>
                    </div>
                  ))}
                </div>
              );
            })}
            <button style={{ ...s.btn("#10b981"), width: "100%", marginTop: 8 }} onClick={() => setFoodModal(true)}>
              + Log Food
            </button>
          </div>
        </div>
      )}

      {/* FOOD LOG */}
      {tab === "food" && (
        <div>
          <div style={s.sectionTitle}>Nutrition Summary</div>
          <div style={s.card}>
            {macroBar(totals.calories, DAILY_GOALS.calories, "#38bdf8", "Calories")}
            {macroBar(totals.protein, DAILY_GOALS.protein, "#f97316", "Protein")}
            {macroBar(totals.carbs, DAILY_GOALS.carbs, "#3b82f6", "Carbs")}
            {macroBar(totals.fat, DAILY_GOALS.fat, "#a855f7", "Fat")}
          </div>
          {meals.map(meal => {
            const items = todayFood.filter(f => f.meal === meal);
            const mealCals = items.reduce((a, f) => a + f.calories, 0);
            return (
              <div key={meal}>
                <div style={{ ...s.sectionTitle, display: "flex", justifyContent: "space-between", padding: "20px 20px 6px" }}>
                  <span>{meal}</span>
                  <span style={{ color: "#38bdf8" }}>{mealCals} kcal</span>
                </div>
                <div style={s.card}>
                  {items.length === 0 && <div style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>Nothing logged</div>}
                  {items.map(f => (
                    <div key={f.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>P: {f.protein}g · C: {f.carbs}g · F: {f.fat}g</div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ color: "#38bdf8", fontWeight: 700 }}>{f.calories}</span>
                        <button onClick={() => setFoodLog(prev => prev.filter(x => x.id !== f.id))}
                          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>
                      </div>
                    </div>
                  ))}
                  <button style={{ ...s.btn("#10b981"), width: "100%", marginTop: 10 }} onClick={() => { setFoodMeal(meal); setFoodModal(true); }}>
                    + Add to {meal}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* WORKOUT LOG */}
      {tab === "workout" && (
        <div>
          <div style={{ padding: "16px 16px 0" }}>
            <button style={{ ...s.btn(), width: "100%" }} onClick={() => setWorkoutModal(true)}>+ Log Exercise</button>
          </div>
          <div style={s.sectionTitle}>Today's Workout</div>
          <div style={s.card}>
            {todayWorkouts.length === 0 ? (
              <div style={{ color: "#475569", textAlign: "center", padding: 16, fontSize: 14 }}>No exercises logged today. Let's get moving! 💪</div>
            ) : todayWorkouts.map(w => (
              <div key={w.id} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{w.name}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      <span style={s.tag(muscleColors[w.muscle] || "#38bdf8")}>{w.muscle}</span>
                      <span style={s.tag("#64748b")}>{w.type}</span>
                    </div>
                  </div>
                  <button onClick={() => setWorkoutLog(prev => prev.filter(x => x.id !== w.id))}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 18 }}>×</button>
                </div>
                {w.type === "Cardio" ? (
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>⏱ {w.duration} minutes</div>
                ) : w.sets && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {w.sets.map((set, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                        Set {i + 1}: {set.weight ? `${set.weight}lb × ` : ""}{set.reps} reps
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={s.sectionTitle}>Exercise History</div>
          <div style={s.card}>
            {workoutLog.length === 0 ? (
              <div style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>No history yet</div>
            ) : [...new Set(workoutLog.map(w => w.date))].slice(0, 7).map(date => (
              <div key={date} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
                {workoutLog.filter(w => w.date === date).map(w => (
                  <div key={w.id} style={{ fontSize: 13, color: "#94a3b8", padding: "3px 0" }}>
                    · {w.name} {w.type === "Cardio" ? `(${w.duration}min)` : w.sets ? `(${w.sets.length} sets)` : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROGRESS */}
      {tab === "progress" && (
        <div>
          <div style={s.sectionTitle}>Weight Tracker</div>
          <div style={s.card}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input style={{ ...s.input, flex: 1 }} type="number" placeholder="Enter weight (lbs)" value={weightInput}
                onChange={e => setWeightInput(e.target.value)} />
              <button style={s.btn()} onClick={logWeight}>Log</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <svg width="100%" height="120" viewBox={`0 0 ${Math.max(weight.length * 50, 300)} 120`} style={{ minWidth: 300 }}>
                {weight.length > 1 && weight.map((w, i) => {
                  if (i === 0) return null;
                  const allVals = weight.map(x => x.value);
                  const minV = Math.min(...allVals) - 5;
                  const maxV = Math.max(...allVals) + 5;
                  const x1 = (i - 1) * 50 + 25; const x2 = i * 50 + 25;
                  const y1 = 100 - ((weight[i - 1].value - minV) / (maxV - minV)) * 80;
                  const y2 = 100 - ((w.value - minV) / (maxV - minV)) * 80;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />;
                })}
                {weight.map((w, i) => {
                  const allVals = weight.map(x => x.value);
                  const minV = Math.min(...allVals) - 5;
                  const maxV = Math.max(...allVals) + 5;
                  const x = i * 50 + 25;
                  const y = 100 - ((w.value - minV) / (maxV - minV)) * 80;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="5" fill="#38bdf8" />
                      <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fill="#94a3b8">{w.value}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {weight.slice(-5).map((w, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "6px 10px", fontSize: 12, textAlign: "center" }}>
                  <div style={{ color: "#64748b" }}>{new Date(w.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                  <div style={{ fontWeight: 700, color: "#38bdf8" }}>{w.value} lbs</div>
                </div>
              ))}
            </div>
          </div>

          <div style={s.sectionTitle}>Weekly Nutrition</div>
          <div style={s.card}>
            {[...new Set(foodLog.map(f => f.date))].slice(0, 7).map(date => {
              const dayCals = foodLog.filter(f => f.date === date).reduce((a, f) => a + f.calories, 0);
              return (
                <div key={date} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 60, fontSize: 12, color: "#64748b", flexShrink: 0 }}>
                    {new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </div>
                  <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(dayCals / DAILY_GOALS.calories * 100, 100)}%`, background: dayCals > DAILY_GOALS.calories ? "#f87171" : "#34d399", borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", width: 55, textAlign: "right" }}>{dayCals} cal</div>
                </div>
              );
            })}
            {foodLog.length === 0 && <div style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>Start logging food to see history</div>}
          </div>

          <div style={s.sectionTitle}>Muscle Groups Trained</div>
          <div style={s.card}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(
                workoutLog.reduce((acc, w) => { acc[w.muscle] = (acc[w.muscle] || 0) + 1; return acc; }, {})
              ).map(([muscle, count]) => (
                <div key={muscle} style={{ background: (muscleColors[muscle] || "#38bdf8") + "20", border: `1px solid ${muscleColors[muscle] || "#38bdf8"}`, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: muscleColors[muscle] || "#38bdf8", fontWeight: 700 }}>{muscle}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{count}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>sessions</div>
                </div>
              ))}
              {workoutLog.length === 0 && <div style={{ color: "#475569", fontSize: 13 }}>No workouts yet</div>}
            </div>
          </div>
        </div>
      )}

      {/* AI WORKOUT GENERATOR */}
      {tab === "ai" && (
        <div>
          {viewingPlan ? (
            <div>
              <div style={{ padding: "16px 16px 0", display: "flex", gap: 8 }}>
                <button onClick={() => setViewingPlan(null)} style={{ ...s.btn("rgba(255,255,255,0.08)"), fontSize: 13 }}>← Back</button>
                <button onClick={() => logPlanToToday(viewingPlan)} style={{ ...s.btn("#10b981"), flex: 1, fontSize: 13 }}>📋 Log to Today's Workout</button>
              </div>
              <div style={s.card}>
                <div style={{ marginBottom: 12 }}>
                  <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>{viewingPlan.title}</h2>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {[viewingPlan.style, viewingPlan.duration, viewingPlan.level, viewingPlan.focus].map(t => (
                      <span key={t} style={s.tag("#38bdf8")}>{t}</span>
                    ))}
                  </div>
                </div>
                {viewingPlan.notes && (
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, borderLeft: "3px solid rgba(56,189,248,0.7)" }}>
                    <div style={{ fontSize: 12, color: "#64748b", marginBottom: 2 }}>Coach's Note</div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{viewingPlan.notes}</div>
                  </div>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🔥 Warm-up</div>
                {viewingPlan.warmup?.map((w, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#94a3b8", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>· {w}</div>
                ))}
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, margin: "14px 0 8px" }}>💪 Main Workout</div>
                {viewingPlan.exercises?.map((ex, i) => (
                  <ExerciseCard key={i} ex={ex} color={muscleColors[ex.muscle] || "#38bdf8"} />
                ))}
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, margin: "14px 0 8px" }}>🧘 Cool-down</div>
                {viewingPlan.cooldown?.map((c, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#94a3b8", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>· {c}</div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={s.sectionTitle}>AI Workout Generator</div>
              <div style={s.card}>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 14, lineHeight: 1.5 }}>
                  Tell the AI your preferences and get a fully personalized workout plan in seconds.
                </div>

                {/* Workout Style */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Workout Style</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Strength Training", "HIIT", "Functional Lifting", "Bodybuilding", "Cardio & Endurance", "Calisthenics", "Powerlifting", "Yoga & Mobility"].map(style => (
                      <button key={style} onClick={() => setAiPrefs(p => ({ ...p, style }))}
                        style={{ ...s.btn(aiPrefs.style === style ? "#38bdf8" : "#1e293b"), fontSize: 12, padding: "7px 12px" }}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fitness Level */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Fitness Level</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["Beginner", "Intermediate", "Advanced"].map(level => (
                      <button key={level} onClick={() => setAiPrefs(p => ({ ...p, level }))}
                        style={{ ...s.btn(aiPrefs.level === level ? "#f97316" : "#1e293b"), flex: 1, fontSize: 12, padding: "8px 6px" }}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Duration</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["20", "30", "45", "60", "75", "90"].map(d => (
                      <button key={d} onClick={() => setAiPrefs(p => ({ ...p, duration: d }))}
                        style={{ ...s.btn(aiPrefs.duration === d ? "#10b981" : "#1e293b"), flex: 1, fontSize: 12, padding: "8px 4px" }}>
                        {d}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Muscle Focus */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Muscle Focus</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Full Body", "Upper Body", "Lower Body", "Push", "Pull", "Legs", "Core", "Arms", "Back & Chest"].map(focus => (
                      <button key={focus} onClick={() => setAiPrefs(p => ({ ...p, focus }))}
                        style={{ ...s.btn(aiPrefs.focus === focus ? "#8b5cf6" : "#1e293b"), fontSize: 12, padding: "7px 12px" }}>
                        {focus}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Equipment</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Full Gym", "Dumbbells Only", "Barbell & Rack", "Bodyweight Only", "Resistance Bands", "Kettlebells"].map(eq => (
                      <button key={eq} onClick={() => setAiPrefs(p => ({ ...p, equipment: eq }))}
                        style={{ ...s.btn(aiPrefs.equipment === eq ? "#ec4899" : "#1e293b"), fontSize: 12, padding: "7px 12px" }}>
                        {eq}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={generateAiWorkout} disabled={aiLoading}
                  style={{ ...s.btn("linear-gradient(135deg, #38bdf8, #818cf8)"), width: "100%", fontSize: 15, padding: "14px", opacity: aiLoading ? 0.7 : 1, background: "linear-gradient(135deg, #38bdf8, #818cf8)" }}>
                  {aiLoading ? "⚡ Generating your workout..." : "✨ Generate Workout Plan"}
                </button>

                {aiError && <div style={{ color: "#ef4444", fontSize: 13, marginTop: 10, textAlign: "center" }}>{aiError}</div>}
              </div>

              {/* Generated workout preview */}
              {aiWorkout && (
                <>
                  <div style={s.sectionTitle}>Your Generated Plan</div>
                  <div style={s.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 800 }}>{aiWorkout.title}</h3>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {[aiWorkout.style, aiWorkout.duration, aiWorkout.level].map(t => (
                            <span key={t} style={s.tag("#38bdf8")}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <button onClick={savePlan} style={{ ...s.btn("#f59e0b"), fontSize: 12, padding: "6px 12px" }}>💾 Save</button>
                        <button onClick={() => setViewingPlan(aiWorkout)} style={{ ...s.btn("#38bdf8"), fontSize: 12, padding: "6px 12px" }}>View Full</button>
                      </div>
                    </div>
                    {aiWorkout.notes && (
                      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, borderLeft: "3px solid rgba(56,189,248,0.7)" }}>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>{aiWorkout.notes}</div>
                      </div>
                    )}
                    <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 700, textTransform: "uppercase" }}>Exercises ({aiWorkout.exercises?.length})</div>
                    {aiWorkout.exercises?.slice(0, 4).map((ex, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.name}</div>
                          <span style={s.tag(muscleColors[ex.muscle] || "#38bdf8")}>{ex.muscle}</span>
                        </div>
                        <div style={{ color: "#38bdf8", fontWeight: 700, fontSize: 14 }}>{ex.sets}×{ex.reps}</div>
                      </div>
                    ))}
                    {aiWorkout.exercises?.length > 4 && (
                      <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", padding: "8px 0" }}>
                        +{aiWorkout.exercises.length - 4} more exercises
                      </div>
                    )}
                    <button onClick={() => logPlanToToday(aiWorkout)} style={{ ...s.btn("#10b981"), width: "100%", marginTop: 12 }}>
                      📋 Log to Today's Workout
                    </button>
                  </div>
                </>
              )}

              {/* Saved plans */}
              {savedPlans.length > 0 && (
                <>
                  <div style={s.sectionTitle}>Saved Plans</div>
                  {savedPlans.map(plan => (
                    <div key={plan.id} style={s.card}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{plan.title}</div>
                          <div style={{ display: "flex", gap: 6 }}>
                            <span style={s.tag("#38bdf8")}>{plan.style}</span>
                            <span style={s.tag("#64748b")}>{plan.duration}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => setViewingPlan(plan)} style={{ ...s.btn("rgba(255,255,255,0.08)"), fontSize: 12, padding: "7px 12px" }}>View</button>
                          <button onClick={() => logPlanToToday(plan)} style={{ ...s.btn("#10b981"), fontSize: 12, padding: "7px 12px" }}>Log</button>
                          <button onClick={() => setSavedPlans(prev => prev.filter(p => p.id !== plan.id))} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 18 }}>×</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* FOOD MODAL */}
      {foodModal && (
        <div style={s.modal} onClick={e => e.target === e.currentTarget && setFoodModal(false)}>
          <div style={s.modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Log Food</h3>
              <button onClick={() => setFoodModal(false)} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {meals.map(m => (
                <button key={m} onClick={() => setFoodMeal(m)}
                  style={{ ...s.btn(foodMeal === m ? "#38bdf8" : "#1e293b"), flex: 1, padding: "8px 4px", fontSize: 11 }}>
                  {m}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button onClick={() => setCustomFoodMode(false)}
                style={{ ...s.btn(!customFoodMode ? "#38bdf8" : "#1e293b"), flex: 1, fontSize: 13 }}>Search</button>
              <button onClick={() => setCustomFoodMode(true)}
                style={{ ...s.btn(customFoodMode ? "#38bdf8" : "#1e293b"), flex: 1, fontSize: 13 }}>Custom</button>
            </div>
            {!customFoodMode ? (
              <>
                <input style={{ ...s.input, marginBottom: 12 }} placeholder="Search food..." value={foodSearch}
                  onChange={e => setFoodSearch(e.target.value)} />
                <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 14 }}>
                  {filteredFoods.map(f => (
                    <div key={f.name} onClick={() => setSelectedFood(f)}
                      style={{ padding: "10px 12px", borderRadius: 10, marginBottom: 6, cursor: "pointer", background: selectedFood?.name === f.name ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)", border: selectedFood?.name === f.name ? "1px solid rgba(56,189,248,0.5)" : "1px solid rgba(255,255,255,0.06)", transition: "all 0.15s" }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>
                        {f.calories} kcal · P:{f.protein}g · C:{f.carbs}g · F:{f.fat}g
                      </div>
                    </div>
                  ))}
                </div>
                {selectedFood && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, color: "#94a3b8" }}>Servings</label>
                    <input style={{ ...s.input, marginTop: 6 }} type="number" min="0.25" step="0.25" value={foodServings}
                      onChange={e => setFoodServings(+e.target.value)} />
                    <div style={{ fontSize: 13, color: "#38bdf8", marginTop: 8, fontWeight: 700 }}>
                      → {Math.round(selectedFood.calories * foodServings)} kcal · P:{Math.round(selectedFood.protein * foodServings)}g · C:{Math.round(selectedFood.carbs * foodServings)}g
                    </div>
                  </div>
                )}
                <button style={{ ...s.btn("#10b981"), width: "100%" }} onClick={addFood} disabled={!selectedFood}>
                  Add to {foodMeal}
                </button>
              </>
            ) : (
              <>
                {[["Food name", "name", "text"], ["Calories", "calories", "number"], ["Protein (g)", "protein", "number"], ["Carbs (g)", "carbs", "number"], ["Fat (g)", "fat", "number"]].map(([label, key, type]) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 4 }}>{label}</label>
                    <input style={s.input} type={type} value={customFood[key]}
                      onChange={e => setCustomFood(prev => ({ ...prev, [key]: e.target.value }))} />
                  </div>
                ))}
                <button style={{ ...s.btn("#10b981"), width: "100%", marginTop: 6 }} onClick={addCustomFood}>
                  Add Custom Food
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* WORKOUT MODAL */}
      {workoutModal && (
        <div style={s.modal} onClick={e => e.target === e.currentTarget && setWorkoutModal(false)}>
          <div style={s.modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Log Exercise</h3>
              <button onClick={() => setWorkoutModal(false)} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer" }}>×</button>
            </div>
            <input style={{ ...s.input, marginBottom: 12 }} placeholder="Search exercise..." value={exerciseSearch}
              onChange={e => setExerciseSearch(e.target.value)} />
            <div style={{ maxHeight: 180, overflowY: "auto", marginBottom: 14 }}>
              {filteredExercises.map(e => (
                <div key={e.name} onClick={() => setSelectedExercise(e)}
                  style={{ padding: "10px 12px", borderRadius: 10, marginBottom: 6, cursor: "pointer", background: selectedExercise?.name === e.name ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)", border: selectedExercise?.name === e.name ? "1px solid rgba(56,189,248,0.5)" : "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{e.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{e.muscle}</div>
                  </div>
                  <span style={s.tag(muscleColors[e.muscle] || "#38bdf8")}>{e.type}</span>
                </div>
              ))}
            </div>
            {selectedExercise && (
              <>
                {selectedExercise.type === "Cardio" ? (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Duration (minutes)</label>
                    <input style={s.input} type="number" placeholder="e.g. 30" value={cardioTime}
                      onChange={e => setCardioTime(e.target.value)} />
                  </div>
                ) : (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>Sets</div>
                    {sets.map((set, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "#64748b", alignSelf: "center", minWidth: 40 }}>Set {i + 1}</span>
                        <input style={{ ...s.input, flex: 1 }} type="number" placeholder="Weight (lb)" value={set.weight}
                          onChange={e => setSets(prev => prev.map((s, j) => j === i ? { ...s, weight: e.target.value } : s))} />
                        <input style={{ ...s.input, flex: 1 }} type="number" placeholder="Reps" value={set.reps}
                          onChange={e => setSets(prev => prev.map((s, j) => j === i ? { ...s, reps: e.target.value } : s))} />
                      </div>
                    ))}
                    <button onClick={() => setSets(prev => [...prev, { reps: "", weight: "" }])}
                      style={{ ...s.btn("rgba(255,255,255,0.08)"), width: "100%", fontSize: 13 }}>+ Add Set</button>
                  </div>
                )}
              </>
            )}
            <button style={{ ...s.btn(), width: "100%" }} onClick={addWorkout} disabled={!selectedExercise}>
              Save Exercise
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav style={s.nav}>
        {[["dashboard", "Dashboard"], ["food", "Nutrition"], ["workout", "Workout"], ["ai", "AI Plan"], ["progress", "Progress"]].map(([id, label]) => (
          <button key={id} style={s.navBtn(tab === id)} onClick={() => setTab(id)}>
            {icons[id]}
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
