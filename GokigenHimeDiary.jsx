import { useState } from "react";
import {
  Home as HomeIcon,
  BookOpen,
  Sparkles,
  Heart,
  Dumbbell,
  Moon,
  Droplet,
  Scale,
  ChevronRight,
  Star,
  Flower2,
  Check,
  Calendar,
  Target,
  Cloud,
  Sun,
  Crown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* =====================================================
 *   ごきげん姫ダイアリー  ·  Princess Edition
 *   添付画像を直接参照するバージョン
 *
 *   【重要】同じフォルダに以下のファイルを配置してください:
 *     - princess.png  （添付1：ごきげん姫のイラスト）
 *     - butler.png    （添付2：執事ルシアン＝グレイのイラスト）
 * ===================================================== */

/* 添付画像のパス — outputs フォルダに保存された画像を参照 */
const PRINCESS_IMG = "./princess.png";
const BUTLER_IMG = "./butler.png";

/* ------------------------------------------------------
 *  小さな装飾パーツ（SVG）
 * ------------------------------------------------------ */
const Petal = ({ className = "", style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style}>
    <defs>
      <radialGradient id="pg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.8" />
      </radialGradient>
    </defs>
    <path
      d="M16 4 C20 10 22 14 28 16 C22 18 20 22 16 28 C12 22 10 18 4 16 C10 14 12 10 16 4 Z"
      fill="url(#pg)"
    />
  </svg>
);

const TinyRibbon = ({ className = "" }) => (
  <svg viewBox="0 0 40 24" className={className}>
    <path d="M20 12 L10 4 L6 10 L12 12 L6 14 L10 20 Z" fill="#f9a8d4" opacity="0.8" />
    <path d="M20 12 L30 4 L34 10 L28 12 L34 14 L30 20 Z" fill="#f9a8d4" opacity="0.8" />
    <circle cx="20" cy="12" r="2.5" fill="#ec4899" opacity="0.7" />
  </svg>
);

const Lace = ({ className = "", flip = false }) => (
  <svg
    viewBox="0 0 300 20"
    className={className}
    style={{ transform: flip ? "scaleY(-1)" : "" }}
    preserveAspectRatio="none"
  >
    <path
      d="M0 0 Q15 14 30 0 Q45 14 60 0 Q75 14 90 0 Q105 14 120 0 Q135 14 150 0 Q165 14 180 0 Q195 14 210 0 Q225 14 240 0 Q255 14 270 0 Q285 14 300 0 L300 20 L0 20 Z"
      fill="#fdf2f8"
      opacity="0.55"
    />
  </svg>
);

/* ------------------------------------------------------
 *  プリンセス画像（添付1を使用）
 *  失敗時は透明になるだけで、世界観を邪魔しない
 * ------------------------------------------------------ */
const PrincessImage = ({ className = "" }) => (
  <img
    src={PRINCESS_IMG}
    alt=""
    aria-hidden
    className={className}
    onError={(e) => {
      e.currentTarget.style.visibility = "hidden";
    }}
    style={{
      mixBlendMode: "multiply",
      filter: "drop-shadow(0 3px 8px rgba(244,114,182,0.18))",
    }}
  />
);

/* ------------------------------------------------------
 *  執事アバター（添付2を使用）
 * ------------------------------------------------------ */
const ButlerAvatar = ({ size = 56 }) => (
  <div
    className="relative rounded-full overflow-hidden ring-[3px] ring-white/90 shadow-[0_4px_10px_rgba(139,92,246,0.15)]"
    style={{ width: size, height: size }}
  >
    {/* ほんのり下地（画像が読み込めないときもUIが崩れない） */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100" />
    <img
      src={BUTLER_IMG}
      alt=""
      aria-hidden
      className="relative w-full h-full object-cover"
      style={{
        objectPosition: "center 18%",
        filter: "saturate(0.95) brightness(1.02)",
      }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </div>
);

/* ------------------------------------------------------
 *  背景（固定・透け感のある桜と光）
 * ------------------------------------------------------ */
const FixedBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* ピンク→ラベンダーのベース */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#fdf2f8] via-[#fdf4fb] to-[#f5f0fb]" />
    {/* ほわっとした光の塊 */}
    <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-pink-200/30 blur-3xl" />
    <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl" />
    <div className="absolute bottom-10 -left-16 w-64 h-64 rounded-full bg-rose-100/40 blur-3xl" />
    {/* レース装飾 */}
    <Lace className="absolute top-0 left-0 w-full h-5" />
    <Lace className="absolute bottom-[80px] left-0 w-full h-5" flip />
    {/* 桜の花びら（さりげなく） */}
    <Petal
      className="absolute"
      style={{ top: "10%", left: "6%", width: 30, height: 30, opacity: 0.25, transform: "rotate(18deg)" }}
    />
    <Petal
      className="absolute"
      style={{ top: "22%", right: "5%", width: 22, height: 22, opacity: 0.2, transform: "rotate(-20deg)" }}
    />
    <Petal
      className="absolute"
      style={{ top: "48%", left: "10%", width: 28, height: 28, opacity: 0.18, transform: "rotate(40deg)" }}
    />
    <Petal
      className="absolute"
      style={{ top: "68%", right: "8%", width: 20, height: 20, opacity: 0.22, transform: "rotate(-10deg)" }}
    />
    <Petal
      className="absolute"
      style={{ bottom: "18%", left: "7%", width: 24, height: 24, opacity: 0.2, transform: "rotate(15deg)" }}
    />
    {/* 小さなリボン */}
    <TinyRibbon
      className="absolute"
      style={{ top: "14%", right: "18%", width: 28, height: 18, opacity: 0.25 }}
    />
    <TinyRibbon
      className="absolute"
      style={{ bottom: "30%", left: "14%", width: 22, height: 14, opacity: 0.22 }}
    />
    {/* キラキラ */}
    <Sparkles className="absolute top-[20%] right-[28%] w-3 h-3 text-pink-300 opacity-50" />
    <Sparkles className="absolute top-[42%] left-[22%] w-3 h-3 text-purple-300 opacity-50" />
    <Sparkles className="absolute top-[60%] right-[12%] w-3 h-3 text-rose-300 opacity-50" />
    <Sparkles className="absolute bottom-[26%] left-[30%] w-3 h-3 text-pink-300 opacity-50" />
  </div>
);

/* ------------------------------------------------------
 *  ヘッダー（リボン風フレーム + プリンセス添付画像）
 * ------------------------------------------------------ */
const AppHeader = ({ subtitle }) => (
  <div className="relative pt-9 pb-3 px-5">
    <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-white/70 via-pink-50/60 to-purple-50/60 backdrop-blur-sm border border-white/70 shadow-[0_6px_20px_rgba(249,168,212,0.14)]">
      {/* 内側の光 */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/50 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-100/40 rounded-full blur-2xl" />
      {/* 控えめなキラキラ */}
      <Sparkles className="absolute top-3 left-4 w-3 h-3 text-pink-300 opacity-60" />
      <Sparkles className="absolute top-4 right-4 w-2.5 h-2.5 text-purple-300 opacity-60" />
      {/* 小さなリボン */}
      <TinyRibbon className="absolute top-2 right-14 w-6 h-4 opacity-70" />

      <div className="relative flex items-center px-5 py-5">
        {/* タイトル */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[17px] tracking-[0.18em] text-rose-700 leading-none"
            style={{
              fontFamily:
                '"Shippori Mincho","Noto Serif JP","Hiragino Mincho ProN",serif',
              fontWeight: 600,
            }}
          >
            ごきげん姫
          </p>
          <p
            className="mt-1.5 text-[13px] tracking-[0.35em] text-rose-500"
            style={{
              fontFamily:
                '"Shippori Mincho","Noto Serif JP",serif',
              fontWeight: 500,
            }}
          >
            ダイアリー
          </p>
          <p
            className="mt-3 text-[9px] text-purple-500 tracking-[0.3em] italic"
            style={{ fontFamily: '"Shippori Mincho",serif' }}
          >
            ─ Gokigen Hime Diary ─
          </p>
          {subtitle && (
            <p className="mt-1 text-[10px] text-rose-400/90 tracking-[0.2em]">
              {subtitle}
            </p>
          )}
        </div>

        {/* プリンセスの添付画像 */}
        <div className="relative w-[96px] h-[120px] flex-shrink-0 -mr-1">
          {/* 背景になじむうっすらした光 */}
          <div className="absolute inset-0 bg-gradient-radial from-pink-100/60 via-transparent to-transparent blur-md" />
          <PrincessImage className="relative w-full h-full object-contain" />
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------
 *  執事カード（添付画像を左に配置）
 * ------------------------------------------------------ */
const ButlerCard = ({ message }) => (
  <div className="relative">
    {/* うっすらした光のオーラ */}
    <div className="absolute -inset-1 bg-gradient-to-r from-pink-100/50 via-purple-100/50 to-pink-100/50 rounded-[32px] blur-xl opacity-60" />

    <div className="relative rounded-[26px] overflow-hidden bg-gradient-to-br from-white/80 via-pink-50/50 to-purple-50/50 backdrop-blur-sm border border-white/80 shadow-[0_4px_16px_rgba(196,181,253,0.14)]">
      {/* 内部の光 */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/50 rounded-full blur-2xl" />
      {/* 控えめなキラキラ */}
      <Sparkles className="absolute top-3 right-4 w-2.5 h-2.5 text-pink-300 opacity-50" />
      <Sparkles className="absolute bottom-3 right-10 w-2 h-2 text-purple-300 opacity-60" />

      <div className="relative flex items-start gap-4 p-5">
        {/* 執事アバター（添付2を使用） */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 rounded-full bg-pink-100/40 blur-md" />
          <div className="relative">
            <ButlerAvatar size={56} />
          </div>
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-1.5 mb-2">
            <p
              className="text-[11px] text-purple-500 tracking-[0.2em]"
              style={{ fontFamily: '"Shippori Mincho","Noto Serif JP",serif' }}
            >
              執事 · ルシアン=グレイ
            </p>
            <Sparkles className="w-3 h-3 text-pink-300" />
          </div>
          <p
            className="text-[13px] text-gray-700 leading-[2]"
            style={{ letterSpacing: "0.04em" }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------
 *  セクションタイトル
 * ------------------------------------------------------ */
const SectionTitle = ({ children, icon }) => (
  <div className="flex items-center gap-2 mb-3 pl-1">
    {icon}
    <h2
      className="text-[13px] text-rose-600 tracking-[0.18em]"
      style={{
        fontFamily: '"Shippori Mincho","Noto Serif JP",serif',
        fontWeight: 500,
      }}
    >
      {children}
    </h2>
    <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent" />
  </div>
);

/* ------------------------------------------------------
 *  セクションカード（ピンクグラデ & ガラス感）
 * ------------------------------------------------------ */
const SectionCard = ({ children, className = "" }) => (
  <div
    className={`relative rounded-[24px] p-5 border border-white/70 shadow-[0_4px_14px_rgba(249,168,212,0.09)] bg-gradient-to-br from-white/75 via-pink-50/50 to-white/70 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

/* =========================
 *  HOME SCREEN
 * ========================= */
const moods = [
  { emoji: "🌸", label: "しあわせ" },
  { emoji: "☀️", label: "ごきげん" },
  { emoji: "🌿", label: "おだやか" },
  { emoji: "☁️", label: "ぼんやり" },
  { emoji: "💧", label: "しずか" },
];

const weightData = [
  { day: "月", w: 52.4 },
  { day: "火", w: 52.2 },
  { day: "水", w: 52.3 },
  { day: "木", w: 52.0 },
  { day: "金", w: 51.9 },
  { day: "土", w: 51.8 },
  { day: "日", w: 51.8 },
];

const HomeScreen = ({ selectedMood, setSelectedMood, openAnalysis }) => {
  const [yoga, setYoga] = useState(1);
  const [body, setBody] = useState(0);
  const [sleep, setSleep] = useState(2);
  const [water, setWater] = useState(1);

  return (
    <div className="relative pb-28 animate-[fadeIn_0.5s_ease]">
      <AppHeader subtitle="〜 今日もあなたらしく 〜" />

      {/* 今日のごきげん */}
      <section className="px-5 mt-4">
        <SectionTitle icon={<Heart className="w-4 h-4 fill-pink-300 text-pink-300" />}>
          今日のごきげん
        </SectionTitle>
        <SectionCard>
          <div className="flex justify-between gap-1">
            {moods.map((m, idx) => {
              const active = selectedMood === m.label;
              return (
                <button
                  key={m.label}
                  onClick={() => setSelectedMood(m.label)}
                  className="relative flex-1 flex flex-col items-center py-3 rounded-2xl transition active:scale-95"
                >
                  {active && (
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-100 via-rose-100 to-purple-100 shadow-[inset_0_0_12px_rgba(249,168,212,0.35)]" />
                  )}
                  {active && (
                    <span className="absolute -top-1 w-12 h-12 rounded-full bg-pink-200/40 blur-xl" />
                  )}
                  <span
                    className={`relative text-[26px] mb-1 ${
                      active ? "animate-[floatEmoji_2.5s_ease-in-out_infinite]" : ""
                    }`}
                    style={{ animationDelay: `${idx * 0.12}s` }}
                  >
                    {m.emoji}
                  </span>
                  <span
                    className={`relative text-[10px] tracking-wider ${
                      active ? "text-rose-500 font-medium" : "text-gray-400"
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionCard>
      </section>

      {/* 執事コメント */}
      <section className="px-5 mt-7">
        <ButlerCard message="本日もお美しいですね、お嬢様。今日も、ご自身のペースで参りましょう。" />
      </section>

      {/* 本日のプリンセスの歩み */}
      <section className="px-5 mt-7">
        <SectionTitle icon={<Crown className="w-4 h-4 text-pink-400" />}>
          本日のプリンセスの歩み
        </SectionTitle>
        <SectionCard className="space-y-6">
          <PillSelect
            label="ヨガ"
            icon={<Flower2 className="w-4 h-4 text-pink-400" />}
            options={["軽め", "ほどよく", "しっかり"]}
            value={yoga}
            onChange={setYoga}
          />
          <PillSelect
            label="ボディメイク"
            icon={<Dumbbell className="w-4 h-4 text-purple-400" />}
            options={["少し", "ほどよく", "しっかり"]}
            value={body}
            onChange={setBody}
          />
          <PillSelect
            label="睡眠"
            icon={<Moon className="w-4 h-4 text-purple-400" />}
            options={["浅め", "ふつう", "ぐっすり"]}
            value={sleep}
            onChange={setSleep}
          />
          <PillSelect
            label="水分"
            icon={<Droplet className="w-4 h-4 text-blue-300" />}
            options={["1杯", "3杯", "たっぷり"]}
            value={water}
            onChange={setWater}
          />
        </SectionCard>
      </section>

      {/* 画像アップロードボタン */}
      <section className="px-5 mt-7 grid grid-cols-2 gap-3">
        <PrincessActionButton
          emoji="🍓"
          label="お食事を記録"
          from="from-pink-100"
          to="to-rose-200"
          text="text-rose-600"
          onClick={() => openAnalysis("meal")}
        />
        <PrincessActionButton
          emoji="🏋️‍♀️"
          label="ボディメイクを記録"
          from="from-purple-100"
          to="to-pink-100"
          text="text-purple-600"
          onClick={() => openAnalysis("body")}
        />
      </section>

      {/* 体重グラフ */}
      <section className="px-5 mt-8">
        <div className="flex items-center justify-between mb-2 pl-1">
          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-pink-300" />
            <h3 className="text-[11px] text-gray-400 tracking-[0.2em]">
              体重のゆるやかな記録
            </h3>
          </div>
          <span className="text-[10px] text-gray-300">今週</span>
        </div>
        <div className="bg-white/55 rounded-[22px] p-3 border border-white/70 shadow-sm backdrop-blur-sm">
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid
                  strokeDasharray="2 4"
                  stroke="#fce7f3"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: "#c4a6b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={["dataMin - 0.3", "dataMax + 0.3"]} />
                <Tooltip
                  contentStyle={{
                    background: "#fff5f8",
                    border: "1px solid #fbcfe8",
                    borderRadius: 12,
                    fontSize: 11,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="w"
                  stroke="#f9a8d4"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#f472b6", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#ec4899" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ----- ピル型セレクト（くすみピンク） ----- */
const PillSelect = ({ label, icon, options, value, onChange }) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2.5">
      {icon}
      <span className="text-[11px] text-gray-500 tracking-[0.18em]">{label}</span>
    </div>
    <div className="flex gap-2.5">
      {options.map((opt, i) => {
        const active = value === i;
        return (
          <button
            key={opt}
            onClick={() => onChange(i)}
            className={`relative flex-1 py-2.5 rounded-full text-[11px] tracking-[0.15em] transition-all duration-300 active:scale-[0.96] ${
              active
                ? "bg-gradient-to-r from-[#eaa3b6] to-[#d98aa3] text-white shadow-[0_4px_10px_rgba(217,138,163,0.25)] scale-[1.02]"
                : "bg-white/60 text-gray-500 border border-pink-100/80"
            }`}
          >
            {active && (
              <span className="absolute inset-0 rounded-full bg-white/20" />
            )}
            <span className="relative">{opt}</span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ----- プリンセス・アクションボタン ----- */
const PrincessActionButton = ({ emoji, label, from, to, text, onClick }) => (
  <button
    onClick={onClick}
    className={`relative bg-gradient-to-br ${from} ${to} rounded-[22px] py-5 px-3 shadow-[0_4px_14px_rgba(249,168,212,0.2)] border border-white/70 active:scale-95 transition-all duration-300 overflow-hidden`}
  >
    <div className="absolute -top-4 -right-4 w-10 h-10 bg-white/50 rounded-full blur-xl" />
    <Sparkles className="absolute top-2.5 right-3 w-3 h-3 text-white opacity-75" />
    <div className="relative text-[28px] mb-0.5">{emoji}</div>
    <div className={`relative text-[11px] ${text} font-medium tracking-[0.15em]`}>
      {label}
    </div>
  </button>
);

/* =========================
 *  RECORD SCREEN
 * ========================= */
const RecordScreen = () => {
  const [weight, setWeight] = useState("51.8");
  const [sleep, setSleep] = useState(2);
  const [yoga, setYoga] = useState(1);
  const [body, setBody] = useState(0);
  const [water, setWater] = useState(2);
  const [mood, setMood] = useState("ごきげん");
  const [memo, setMemo] = useState("");

  return (
    <div className="relative pb-28 animate-[fadeIn_0.5s_ease]">
      <AppHeader subtitle="〜 本日の歩みを綴る 〜" />

      <div className="px-5 mt-4">
        <ButlerCard message="無理をなさらなくても、お嬢様の価値は変わりません。" />
      </div>

      <div className="px-5 mt-7 space-y-5">
        <RecordCard label="体重" icon={<Scale className="w-4 h-4 text-pink-400" />}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 bg-white/70 border border-pink-100 rounded-2xl px-4 py-3 text-center text-lg text-rose-600 focus:outline-none focus:border-pink-300"
            />
            <span className="text-xs text-gray-400 tracking-wider">kg</span>
          </div>
        </RecordCard>

        <RecordCard label="睡眠" icon={<Moon className="w-4 h-4 text-purple-400" />}>
          <TapPills
            options={["浅め", "ふつう", "ぐっすり", "たっぷり"]}
            value={sleep}
            onChange={setSleep}
          />
        </RecordCard>

        <RecordCard label="ヨガ" icon={<Flower2 className="w-4 h-4 text-pink-400" />}>
          <TapPills
            options={["軽め", "ほどよく", "しっかり"]}
            value={yoga}
            onChange={setYoga}
          />
        </RecordCard>

        <RecordCard label="ボディメイク" icon={<Dumbbell className="w-4 h-4 text-purple-400" />}>
          <TapPills
            options={["少し", "ほどよく", "しっかり"]}
            value={body}
            onChange={setBody}
          />
        </RecordCard>

        <RecordCard label="水分" icon={<Droplet className="w-4 h-4 text-blue-300" />}>
          <TapPills
            options={["1杯", "3杯", "5杯", "たっぷり"]}
            value={water}
            onChange={setWater}
          />
        </RecordCard>

        <RecordCard label="ごきげん" icon={<Heart className="w-4 h-4 fill-pink-300 text-pink-300" />}>
          <div className="flex justify-between gap-1">
            {moods.map((m) => {
              const active = mood === m.label;
              return (
                <button
                  key={m.label}
                  onClick={() => setMood(m.label)}
                  className="relative flex-1 flex flex-col items-center py-2 rounded-2xl transition active:scale-95"
                >
                  {active && (
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-100 to-rose-100 shadow-inner" />
                  )}
                  <span
                    className={`relative text-xl ${
                      active ? "animate-[floatEmoji_2.5s_ease-in-out_infinite]" : ""
                    }`}
                  >
                    {m.emoji}
                  </span>
                  <span
                    className={`relative text-[10px] mt-0.5 ${
                      active ? "text-rose-500 font-medium" : "text-gray-400"
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </RecordCard>

        <RecordCard label="一言メモ" icon={<Sparkles className="w-4 h-4 text-pink-400" />}>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="今日の小さなときめきを…"
            rows={3}
            className="w-full bg-white/70 border border-pink-100 rounded-2xl px-4 py-3 text-sm text-gray-600 placeholder:text-pink-200 focus:outline-none focus:border-pink-300 resize-none leading-relaxed"
          />
        </RecordCard>

        <PrincessButton>✨ この内容で記録する ✨</PrincessButton>
      </div>
    </div>
  );
};

const RecordCard = ({ label, icon, children }) => (
  <SectionCard>
    <div className="flex items-center gap-1.5 mb-3">
      {icon}
      <span className="text-[11px] text-gray-500 font-medium tracking-[0.18em]">
        {label}
      </span>
    </div>
    {children}
  </SectionCard>
);

const TapPills = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt, i) => {
      const active = value === i;
      return (
        <button
          key={opt}
          onClick={() => onChange(i)}
          className={`px-4 py-2 rounded-full text-[11px] tracking-[0.15em] transition-all duration-300 active:scale-[0.96] ${
            active
              ? "bg-gradient-to-r from-[#eaa3b6] to-[#d98aa3] text-white shadow-[0_3px_8px_rgba(217,138,163,0.25)]"
              : "bg-white/60 text-gray-500 border border-pink-100/80"
          }`}
        >
          {opt}
        </button>
      );
    })}
  </div>
);

const PrincessButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="relative w-full bg-gradient-to-r from-[#f4b4c6] via-[#eaa3b6] to-[#f4b4c6] text-white py-4 rounded-full shadow-[0_8px_20px_rgba(234,163,182,0.3)] font-medium tracking-[0.18em] active:scale-[0.97] transition-all duration-300 overflow-hidden"
  >
    <span className="absolute inset-0 bg-white/10 rounded-full" />
    <span className="absolute top-1 left-4 w-12 h-3 bg-white/40 rounded-full blur-md" />
    <span className="relative text-[13px]">{children}</span>
  </button>
);

/* =========================
 *  IDEAL SCREEN
 * ========================= */
const IdealScreen = () => {
  const [wantToBe, setWantToBe] = useState("ゆるふわで、いつもきげんのよい自分");
  const [idealDay, setIdealDay] = useState("朝はヨガ、昼は読書、夜はお花を飾ってゆっくり");
  const [lifestyle, setLifestyle] = useState("心に余白のある暮らし");
  const [goalDate, setGoalDate] = useState("2026-10-01");
  const [goalWeight, setGoalWeight] = useState("50.0");

  return (
    <div className="relative pb-28 animate-[fadeIn_0.5s_ease]">
      <AppHeader subtitle="〜 なりたい自分を描こう 〜" />

      <div className="px-5 mt-4">
        <ButlerCard message="お嬢様の描く未来は、すでにお嬢様の中にございます。" />
      </div>

      <div className="px-5 mt-7 space-y-5">
        <IdealField
          icon={<Star className="w-4 h-4 text-pink-400" />}
          label="なりたい自分"
          hint="たとえば：穏やかで、しあわせな自分"
          value={wantToBe}
          onChange={setWantToBe}
          multiline
        />
        <IdealField
          icon={<Sun className="w-4 h-4 text-rose-300" />}
          label="理想の1日"
          hint="朝・昼・夜の過ごしかた"
          value={idealDay}
          onChange={setIdealDay}
          multiline
        />
        <IdealField
          icon={<Cloud className="w-4 h-4 text-purple-300" />}
          label="理想のライフスタイル"
          hint="暮らしの雰囲気やペース"
          value={lifestyle}
          onChange={setLifestyle}
          multiline
        />

        <div className="grid grid-cols-2 gap-3">
          <SectionCard>
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span className="text-[11px] text-gray-500 tracking-[0.15em]">目標日</span>
            </div>
            <input
              type="date"
              value={goalDate}
              onChange={(e) => setGoalDate(e.target.value)}
              className="w-full bg-white/70 border border-pink-100 rounded-xl px-3 py-2 text-sm text-rose-600 focus:outline-none focus:border-pink-300"
            />
          </SectionCard>

          <SectionCard>
            <div className="flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4 text-pink-400" />
              <span className="text-[11px] text-gray-500 tracking-[0.15em]">目標体重</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                step="0.1"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full bg-white/70 border border-pink-100 rounded-xl px-3 py-2 text-sm text-rose-600 text-center focus:outline-none focus:border-pink-300"
              />
              <span className="text-xs text-gray-400">kg</span>
            </div>
          </SectionCard>
        </div>

        {/* プレビューカード */}
        <div className="relative rounded-[26px] p-6 shadow-[0_6px_20px_rgba(249,168,212,0.16)] overflow-hidden border border-white/70 bg-gradient-to-br from-pink-100/70 via-rose-50/70 to-purple-100/70 backdrop-blur-sm">
          <Sparkles className="absolute top-3 right-3 w-4 h-4 text-pink-300" />
          <Sparkles className="absolute bottom-3 left-4 w-3 h-3 text-purple-300 opacity-80" />
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/50 rounded-full blur-2xl" />
          <TinyRibbon className="absolute top-3 left-4 w-6 h-4 opacity-70" />

          <p
            className="relative text-[10px] text-purple-500 tracking-[0.3em] text-center mb-3 italic"
            style={{ fontFamily: '"Shippori Mincho",serif' }}
          >
            ─── My Ideal Self ───
          </p>
          <p
            className="relative text-center text-sm text-rose-600 leading-[2.1]"
            style={{ letterSpacing: "0.05em" }}
          >
            {wantToBe}
          </p>
          <div className="relative mt-4 flex items-center justify-center gap-2">
            <Heart className="w-3 h-3 fill-pink-300 text-pink-300" />
            <span className="text-[10px] text-gray-500 tracking-[0.15em]">
              {goalDate} までに {goalWeight}kg
            </span>
            <Heart className="w-3 h-3 fill-pink-300 text-pink-300" />
          </div>
        </div>

        <PrincessButton>✨ この理想を保存する ✨</PrincessButton>
      </div>
    </div>
  );
};

const IdealField = ({ icon, label, hint, value, onChange, multiline }) => (
  <SectionCard>
    <div className="flex items-center gap-1.5 mb-3">
      {icon}
      <span className="text-[11px] text-gray-500 font-medium tracking-[0.18em]">
        {label}
      </span>
    </div>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hint}
        rows={2}
        className="w-full bg-white/70 border border-pink-100 rounded-2xl px-4 py-3 text-sm text-gray-600 placeholder:text-pink-200 focus:outline-none focus:border-pink-300 resize-none leading-relaxed"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hint}
        className="w-full bg-white/70 border border-pink-100 rounded-2xl px-4 py-3 text-sm text-gray-600 placeholder:text-pink-200 focus:outline-none focus:border-pink-300"
      />
    )}
  </SectionCard>
);

/* =========================
 *  REFLECTION SCREEN
 * ========================= */
const pastRecords = [
  { date: "4/17", mood: "🌸", note: "朝ヨガ気持ちよかった", highlight: "早起きできた" },
  { date: "4/16", mood: "☀️", note: "お花を飾った", highlight: "おうち時間を大切にできた" },
  { date: "4/15", mood: "🌿", note: "ゆっくり読書", highlight: "自分をいたわれた" },
  { date: "4/14", mood: "🌸", note: "お散歩10分", highlight: "外の空気を感じられた" },
  { date: "4/13", mood: "☁️", note: "何もしない日", highlight: "休むことを選べた" },
];

const achievements = [
  { icon: "🌸", label: "7日連続でヨガ" },
  { icon: "💧", label: "水分を意識できた" },
  { icon: "📖", label: "本を1冊読み終えた" },
  { icon: "🌙", label: "睡眠リズムが整ってきた" },
];

const ReflectionScreen = () => (
  <div className="relative pb-28 animate-[fadeIn_0.5s_ease]">
    <AppHeader subtitle="〜 小さなできたを集めて 〜" />

    <div className="px-5 mt-4">
      <ButlerCard message="本当によくやっていらっしゃいますね。" />
    </div>

    <section className="px-5 mt-7">
      <SectionTitle icon={<Sparkles className="w-4 h-4 text-pink-400" />}>
        今週のできたこと
      </SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => (
          <div
            key={a.label}
            className="relative rounded-[22px] p-4 border border-white/70 shadow-sm text-center overflow-hidden bg-gradient-to-br from-white/80 via-pink-50/60 to-white/70 backdrop-blur-sm"
          >
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-pink-100/50 rounded-full blur-xl" />
            <div className="relative text-2xl mb-1 animate-[floatEmoji_3s_ease-in-out_infinite]">
              {a.icon}
            </div>
            <p className="relative text-[11px] text-gray-600 leading-relaxed tracking-[0.1em]">
              {a.label}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="px-5 mt-8">
      <div className="relative rounded-[26px] p-6 shadow-[0_4px_16px_rgba(249,168,212,0.1)] overflow-hidden border border-white/70 bg-gradient-to-br from-pink-50/70 via-rose-50/60 to-purple-50/70 backdrop-blur-sm">
        <Sparkles className="absolute top-4 right-4 w-4 h-4 text-pink-300" />
        <TinyRibbon className="absolute top-4 left-4 w-5 h-4 opacity-70" />
        <p
          className="text-[10px] text-purple-500 tracking-[0.3em] text-center mb-4 italic"
          style={{ fontFamily: '"Shippori Mincho",serif' }}
        >
          ─── Growth Garden ───
        </p>
        <div className="flex justify-center items-end gap-2 h-24">
          {[0.3, 0.55, 0.7, 0.65, 0.85, 0.9, 1].map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1"
              style={{ height: "100%" }}
            >
              <div
                className="w-6 rounded-t-full bg-gradient-to-t from-pink-200 to-rose-300 shadow-sm"
                style={{ height: `${h * 100}%` }}
              />
              <span className="text-[9px] text-gray-400">
                {["月","火","水","木","金","土","日"][i]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-rose-500 mt-4 tracking-[0.15em]">
          少しずつ、お嬢様の花が咲いています 🌸
        </p>
      </div>
    </section>

    <section className="px-5 mt-8">
      <SectionTitle icon={<BookOpen className="w-4 h-4 text-pink-400" />}>
        過去のきろく
      </SectionTitle>
      <div className="space-y-3">
        {pastRecords.map((r) => (
          <div
            key={r.date}
            className="rounded-[22px] p-4 border border-white/70 shadow-sm flex items-center gap-3 bg-gradient-to-br from-white/80 via-pink-50/50 to-white/70 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-pink-50 shadow-inner">
              <span className="text-xl">{r.mood}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-[11px] text-purple-400 font-medium tracking-[0.12em]">
                  {r.date}
                </span>
                <span className="text-[10px] text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                  ✨ {r.highlight}
                </span>
              </div>
              <p className="text-[13px] text-gray-600 truncate leading-relaxed">{r.note}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-pink-300 flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  </div>
);

/* =========================
 *  ANALYSIS MODAL
 * ========================= */
const AnalysisModal = ({ type, onClose }) => {
  if (!type) return null;
  const isMeal = type === "meal";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-center z-50 animate-[fadeIn_0.3s_ease]">
      <div className="w-full max-w-md bg-gradient-to-b from-pink-50 to-white rounded-t-[32px] p-6 shadow-2xl border-t border-pink-200 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 bg-pink-200 rounded-full" />
        </div>
        <div className="text-center mb-4">
          <div className="text-4xl mb-2 animate-[floatEmoji_2.5s_ease-in-out_infinite]">
            {isMeal ? "🍓" : "🏋️‍♀️"}
          </div>
          <h3
            className="text-[13px] text-rose-600 tracking-[0.18em]"
            style={{ fontFamily: '"Shippori Mincho",serif', fontWeight: 500 }}
          >
            {isMeal ? "お食事の解析結果" : "ボディメイクの解析結果"}
          </h3>
          <p className="text-[10px] text-gray-400 mt-1 tracking-wider">
            ルシアンが静かに拝見いたしました
          </p>
        </div>

        <div className="bg-white/80 rounded-[22px] p-5 border border-pink-100 space-y-3 shadow-sm">
          {isMeal ? (
            <>
              <ResultRow label="食事" value="しっかりめ" />
              <ResultRow label="バランス" value="良い" />
              <ResultRow label="彩り" value="お花のよう 🌸" />
            </>
          ) : (
            <>
              <ResultRow label="運動量" value="ほどよく" />
              <ResultRow label="姿勢" value="美しい" />
              <ResultRow label="印象" value="凛としたしなやかさ ✨" />
            </>
          )}
        </div>

        <div className="mt-4 bg-purple-50/60 rounded-2xl p-3 border border-purple-100 flex items-start gap-3">
          <div className="flex-shrink-0">
            <ButlerAvatar size={40} />
          </div>
          <p className="text-[11px] text-gray-600 leading-[1.9] pt-1">
            {isMeal
              ? "丁寧に召し上がる時間は、お嬢様を内側から輝かせますね。"
              : "今日のお嬢様の姿勢、とても美しゅうございます。"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-white text-gray-400 py-3 rounded-full border border-pink-100 text-[12px] tracking-wider active:scale-95 transition"
          >
            閉じる
          </button>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#f4b4c6] to-[#eaa3b6] text-white py-3 rounded-full shadow-[0_4px_12px_rgba(234,163,182,0.25)] text-[12px] font-medium tracking-wider active:scale-95 transition"
          >
            この内容で記録
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-[11px] text-gray-400 tracking-wider">{label}</span>
    <span className="text-[13px] text-rose-600 font-medium flex items-center gap-1">
      <Check className="w-3.5 h-3.5 text-pink-400" />
      {value}
    </span>
  </div>
);

/* =========================
 *  ローディング
 * ========================= */
const SparkleLoader = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-[60] animate-[fadeIn_0.3s_ease]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-pink-200/50 blur-2xl" />
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-pink-400 animate-[spin_3s_linear_infinite]" />
          <Sparkles className="absolute w-6 h-6 text-purple-300 animate-[spin_2s_linear_infinite_reverse]" />
        </div>
      </div>
    </div>
  );
};

/* =========================
 *  BOTTOM NAVIGATION（ガラス風）
 * ========================= */
const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "home", label: "ホーム", icon: HomeIcon },
    { key: "record", label: "記録", icon: BookOpen },
    { key: "ideal", label: "理想", icon: Star },
    { key: "reflection", label: "振り返り", icon: Heart },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4 z-40">
      <div className="relative bg-white/55 backdrop-blur-xl rounded-full shadow-[0_8px_24px_rgba(249,168,212,0.22)] border border-white/80 px-2 py-2 flex justify-around overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/40 via-white/30 to-purple-50/40 rounded-full" />
        {tabs.map((t) => {
          const active = activeTab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="relative flex-1 flex flex-col items-center justify-center py-1.5 rounded-full transition-all duration-300 active:scale-95"
            >
              {active && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-pink-100/80 to-rose-100/80 shadow-[inset_0_0_10px_rgba(249,168,212,0.3)]" />
              )}
              {active && (
                <span className="absolute -top-1 w-10 h-10 bg-pink-300/40 rounded-full blur-xl" />
              )}
              <Icon
                className={`relative w-4 h-4 transition ${
                  active ? "text-rose-500" : "text-pink-300"
                }`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className={`relative text-[10px] mt-0.5 tracking-wider ${
                  active ? "text-rose-500 font-medium" : "text-gray-400"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* =========================
 *  ROOT
 * ========================= */
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMood, setSelectedMood] = useState("ごきげん");
  const [analysisType, setAnalysisType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [screenKey, setScreenKey] = useState(0);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setScreenKey((k) => k + 1);
      setLoading(false);
    }, 450);
  };

  const handleOpenAnalysis = (type) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalysisType(type);
    }, 700);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        fontFamily:
          '"Zen Maru Gothic","Hiragino Maru Gothic ProN","M PLUS Rounded 1c",system-ui,sans-serif',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>

      <FixedBackground />

      <div className="relative z-10 max-w-md mx-auto min-h-screen">
        <div key={screenKey}>
          {activeTab === "home" && (
            <HomeScreen
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              openAnalysis={handleOpenAnalysis}
            />
          )}
          {activeTab === "record" && <RecordScreen />}
          {activeTab === "ideal" && <IdealScreen />}
          {activeTab === "reflection" && <ReflectionScreen />}
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

        <AnalysisModal
          type={analysisType}
          onClose={() => setAnalysisType(null)}
        />
        <SparkleLoader visible={loading} />
      </div>
    </div>
  );
}
