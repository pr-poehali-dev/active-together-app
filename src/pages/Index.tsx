import { useState } from "react";
import Icon from "@/components/ui/icon";

type TabId = "home" | "rating" | "tasks" | "profile";

const feedItems = [
  {
    id: 1,
    icon: "🏆",
    text: '7 «А» вышел на 1-е место! Обогнал 7 «Б» на 12 баллов',
    time: "2 мин назад",
    type: "achievement",
  },
  {
    id: 2,
    icon: "✅",
    text: '7 «Б» выполнил челлендж «50 приседаний» — +15 баллов',
    time: "15 мин назад",
    type: "challenge",
  },
  {
    id: 3,
    icon: "🌟",
    text: 'Маша Иванова (8 «А») провела зарядку в 5 «Б» — +20 баллов',
    time: "1 час назад",
    type: "mentor",
  },
  {
    id: 4,
    icon: "🥗",
    text: "Завтра Ярмарка здорового питания! Готовьте полезности",
    time: "3 часа назад",
    type: "event",
  },
  {
    id: 5,
    icon: "🔥",
    text: '5 «В» поднялся на 3-е место за одну неделю — новый рекорд!',
    time: "5 часов назад",
    type: "achievement",
  },
];

const top3 = [
  { place: 1, cls: '7 «А»', points: 1245, trend: "up", medal: "🥇" },
  { place: 2, cls: '7 «Б»', points: 1180, trend: "down", medal: "🥈" },
  { place: 3, cls: '5 «В»', points: 1102, trend: "up", medal: "🥉", hot: true },
];

const allClasses = [
  { place: 1, cls: '7 «А»', points: 1245, avg: 44.5, trend: "+12%", up: true, medal: "🥇" },
  { place: 2, cls: '7 «Б»', points: 1180, avg: 42.1, trend: "-3%", up: false, medal: "🥈" },
  { place: 3, cls: '5 «В»', points: 1102, avg: 40.8, trend: "+18%", up: true, medal: "🥉" },
  { place: 4, cls: '6 «Г»', points: 987, avg: 35.2, trend: "+5%", up: true, medal: "" },
  { place: 5, cls: '9 «А»', points: 854, avg: 30.5, trend: "-8%", up: false, medal: "" },
  { place: 6, cls: '8 «Б»', points: 801, avg: 28.6, trend: "+2%", up: true, medal: "" },
];

type Task = {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  daysLeft: number | null;
  done: number | null;
  total: number | null;
  points: number;
  action: string;
  category: "challenge" | "sport" | "family" | "nutrition" | "city" | "course";
};

const taskCategories = [
  { id: "all", label: "Все" },
  { id: "challenge", label: "💪 Челленджи" },
  { id: "sport", label: "🏃 Спорт" },
  { id: "family", label: "👨‍👩‍👧 Семья" },
  { id: "nutrition", label: "🥗 Питание" },
  { id: "city", label: "🏙 Город" },
  { id: "course", label: "📚 Курсы" },
];

const tasks: Task[] = [
  {
    id: 1,
    icon: "🔥",
    title: "Планка на 2 минуты",
    subtitle: "Челлендж недели • До конца: 4 дня",
    daysLeft: 4,
    done: 12,
    total: 28,
    points: 15,
    action: "Загрузить видео",
    category: "challenge",
  },
  {
    id: 2,
    icon: "🦘",
    title: "100 прыжков на скакалке",
    subtitle: "Челлендж • За 1 подход",
    daysLeft: null,
    done: null,
    total: null,
    points: 12,
    action: "Загрузить видео",
    category: "challenge",
  },
  {
    id: 3,
    icon: "💪",
    title: "50 приседаний",
    subtitle: "Челлендж • Можно за несколько подходов",
    daysLeft: null,
    done: null,
    total: null,
    points: 10,
    action: "Загрузить видео",
    category: "challenge",
  },
  {
    id: 4,
    icon: "🚶‍♂️",
    title: "Отправить шаги",
    subtitle: "Ежедневно • Скриншот из Health/Samsung Health",
    daysLeft: null,
    done: null,
    total: null,
    points: 5,
    action: "Загрузить скриншот",
    category: "sport",
  },
  {
    id: 5,
    icon: "🌅",
    title: "Утренняя зарядка",
    subtitle: "Сегодня в 8:00 • У школы",
    daysLeft: null,
    done: null,
    total: null,
    points: 10,
    action: "Я на зарядке",
    category: "sport",
  },
  {
    id: 6,
    icon: "⚽",
    title: "Посещение секции",
    subtitle: "Любая спортивная секция",
    daysLeft: null,
    done: null,
    total: null,
    points: 8,
    action: "Загрузить подтверждение",
    category: "sport",
  },
  {
    id: 7,
    icon: "👨‍👩‍👧",
    title: "Семейный забег",
    subtitle: "Семья • Пробеги 1 км вместе с родителями",
    daysLeft: 10,
    done: null,
    total: null,
    points: 30,
    action: "Загрузить фото",
    category: "family",
  },
  {
    id: 8,
    icon: "🚴",
    title: "Велопрогулка с семьёй",
    subtitle: "Семья • Минимум 5 км вместе",
    daysLeft: null,
    done: null,
    total: null,
    points: 20,
    action: "Загрузить фото",
    category: "family",
  },
  {
    id: 9,
    icon: "🥗",
    title: "Покажи свой завтрак",
    subtitle: "Питание • Фото полезного завтрака",
    daysLeft: null,
    done: null,
    total: null,
    points: 8,
    action: "Загрузить фото",
    category: "nutrition",
  },
  {
    id: 10,
    icon: "🍎",
    title: "День без сладкого",
    subtitle: "Питание • Без конфет и газировки",
    daysLeft: null,
    done: null,
    total: null,
    points: 10,
    action: "Отметить выполнение",
    category: "nutrition",
  },
  {
    id: 11,
    icon: "👨‍🍳",
    title: "Приготовь здоровое блюдо",
    subtitle: "Питание • Салат или смузи своими руками",
    daysLeft: null,
    done: null,
    total: null,
    points: 15,
    action: "Загрузить фото",
    category: "nutrition",
  },
  {
    id: 12,
    icon: "🏙",
    title: "Городской забег",
    subtitle: 'Город • Марафон «Здоровый город» • 7 дней',
    daysLeft: 7,
    done: null,
    total: null,
    points: 25,
    action: "Загрузить фото",
    category: "city",
  },
  {
    id: 13,
    icon: "🎪",
    title: "Ярмарка здорового питания",
    subtitle: "Город • Участие в школьной ярмарке",
    daysLeft: 1,
    done: null,
    total: null,
    points: 20,
    action: "Я участвую",
    category: "city",
  },
  {
    id: 14,
    icon: "📚",
    title: "Курс «Здоровое питание»",
    subtitle: "Онлайн • 5 уроков • 30 минут",
    daysLeft: null,
    done: null,
    total: null,
    points: 20,
    action: "Начать курс",
    category: "course",
  },
  {
    id: 15,
    icon: "🧘",
    title: "Курс «Стресс и здоровье»",
    subtitle: "Онлайн • 4 урока • Как справляться со стрессом",
    daysLeft: null,
    done: null,
    total: null,
    points: 15,
    action: "Начать курс",
    category: "course",
  },
  {
    id: 16,
    icon: "💤",
    title: "Курс «Сон и режим дня»",
    subtitle: "Онлайн • 3 урока • Почему важен режим",
    daysLeft: null,
    done: null,
    total: null,
    points: 15,
    action: "Начать курс",
    category: "course",
  },
];

const achievements = [
  { icon: "🏅", title: "Лидер недели", count: 2, color: "#f6d365" },
  { icon: "🔥", title: "На подъёме", count: 1, color: "#FF6B2B" },
  { icon: "💪", title: "Челлендж-мастер", count: 1, color: "#2ECC71" },
  { icon: "🌟", title: "Наставник", count: 1, color: "#a78bfa" },
];

const weekDays = [
  { day: "Пн", steps: 7200, active: false },
  { day: "Вт", steps: 9800, active: false },
  { day: "Ср", steps: 6400, active: false },
  { day: "Чт", steps: 11200, active: false },
  { day: "Пт", steps: 8900, active: false },
  { day: "Сб", steps: 12400, active: false },
  { day: "Вс", steps: 5100, active: true },
];

const maxSteps = Math.max(...weekDays.map((d) => d.steps));

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [filterClass, setFilterClass] = useState("all");

  return (
    <div className="phone-frame bg-background font-golos">
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <span className="text-xs text-muted-foreground font-medium">9:41</span>
        <div className="flex items-center gap-1.5">
          <Icon name="Signal" size={14} className="text-muted-foreground" />
          <Icon name="Wifi" size={14} className="text-muted-foreground" />
          <Icon name="Battery" size={14} className="text-muted-foreground" />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto pb-24" style={{ height: "calc(100dvh - 100px)" }}>
        {activeTab === "home" && <HomeTab />}
        {activeTab === "rating" && (
          <RatingTab filterClass={filterClass} setFilterClass={setFilterClass} />
        )}
        {activeTab === "tasks" && <TasksTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>

      {/* Bottom navigation */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] border-t border-border/50"
        style={{ background: "hsl(220 18% 10% / 0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex justify-around items-center py-2 pb-4 px-2">
          {(
            [
              { id: "home", icon: "Home", label: "Главная" },
              { id: "rating", icon: "Trophy", label: "Рейтинг" },
              { id: "tasks", icon: "Target", label: "Задания" },
              { id: "profile", icon: "User", label: "Профиль" },
            ] as { id: TabId; icon: string; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200"
              style={{
                color:
                  activeTab === tab.id
                    ? "var(--green)"
                    : "hsl(var(--muted-foreground))",
              }}
            >
              <div
                className="p-2 rounded-xl transition-all duration-200"
                style={{
                  background:
                    activeTab === tab.id ? "var(--green-dim)" : "transparent",
                }}
              >
                <Icon name={tab.icon} size={22} />
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CITY EVENT BANNER ─── */
function CityEventBanner() {
  const [joined, setJoined] = useState(false);
  return (
    <div
      className="rounded-2xl p-4 mb-5 animate-slide-up delay-200"
      style={{
        background: "linear-gradient(135deg, hsl(220 70% 55% / 0.18), hsl(270 60% 50% / 0.1))",
        border: "1px solid hsl(220 70% 60% / 0.35)",
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "hsl(220 70% 55% / 0.2)", color: "#60a5fa" }}
          >
            🏙 Городское мероприятие
          </span>
          <h3 className="font-bold text-sm mt-1.5">Марафон «Здоровый город»</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Суббота, 14 июня • Парк Победы • 10:00</p>
        </div>
        <span className="font-oswald font-bold text-xl" style={{ color: "#60a5fa" }}>+25б</span>
      </div>
      <button
        onClick={() => setJoined((j) => !j)}
        className="w-full py-2.5 rounded-xl font-bold text-sm mt-2 transition-all duration-200 active:scale-95"
        style={{
          background: joined ? "hsl(142 72% 50% / 0.15)" : "hsl(220 70% 55% / 0.85)",
          color: joined ? "var(--green)" : "#fff",
          border: joined ? "1px solid var(--green)" : "none",
        }}
      >
        {joined ? "✅ Ты участвуешь!" : "🏃 Я участвую"}
      </button>
    </div>
  );
}

/* ─── HOME TAB ─── */
function HomeTab() {
  return (
    <div className="px-4 pt-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 animate-slide-up">
        <div>
          <h1 className="font-oswald text-2xl font-bold tracking-wide text-gradient-green">
            АКТИВ.ВМЕСТЕ
          </h1>
          <p className="text-xs text-muted-foreground">Пятница, 13 июня 2026</p>
        </div>
        <button
          className="relative p-2.5 rounded-2xl"
          style={{ background: "hsl(var(--muted))" }}
        >
          <Icon name="Bell" size={20} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--orange)" }}
          />
        </button>
      </div>

      {/* Top-3 widget */}
      <div
        className="rounded-2xl p-4 mb-5 animate-slide-up delay-100"
        style={{
          background:
            "linear-gradient(135deg, hsl(142 72% 50% / 0.12), hsl(28 95% 55% / 0.08))",
          border: "1px solid hsl(142 72% 50% / 0.2)",
        }}
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          🏆 Топ классов сегодня
        </p>
        <div className="space-y-2">
          {top3.map((item, i) => (
            <div
              key={item.place}
              className="flex items-center justify-between animate-slide-up"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg w-7">{item.medal}</span>
                <span className="font-semibold text-sm">{item.cls}</span>
                {item.hot && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "var(--orange-dim)",
                      color: "var(--orange)",
                    }}
                  >
                    🔥 ТОП
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="font-oswald font-bold text-sm"
                  style={{ color: "var(--green)" }}
                >
                  {item.points.toLocaleString("ru")}
                </span>
                <Icon
                  name={item.trend === "up" ? "TrendingUp" : "TrendingDown"}
                  size={14}
                  style={{
                    color:
                      item.trend === "up" ? "var(--green)" : "var(--orange)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City event banner */}
      <CityEventBanner />

      {/* Feed */}
      <div className="mb-4 animate-slide-up delay-300">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          📡 Лента событий
        </p>
        <div className="space-y-2.5">
          {feedItems.map((item, i) => (
            <div
              key={item.id}
              className="flex gap-3 p-3.5 rounded-2xl card-hover animate-slide-up"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                animationDelay: `${0.25 + i * 0.08}s`,
              }}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-foreground">
                  {item.text}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── RATING TAB ─── */
function RatingTab({
  filterClass,
  setFilterClass,
}: {
  filterClass: string;
  setFilterClass: (v: string) => void;
}) {
  const filters = [
    { id: "all", label: "Все" },
    { id: "5", label: "5-е" },
    { id: "6", label: "6-е" },
    { id: "7", label: "7-е" },
    { id: "8", label: "8-е" },
    { id: "9", label: "9-е" },
  ];

  const filtered =
    filterClass === "all"
      ? allClasses
      : allClasses.filter((c) => c.cls.startsWith(filterClass));

  return (
    <div className="px-4 pt-2">
      <div className="mb-5 animate-slide-up">
        <h2 className="font-oswald text-2xl font-bold tracking-wide">РЕЙТИНГ</h2>
        <p className="text-xs text-muted-foreground">Классы-участники проекта</p>
      </div>

      {/* Filter chips */}
      <div
        className="flex gap-2 mb-5 overflow-x-auto pb-1 animate-slide-up delay-100"
        style={{ scrollbarWidth: "none" }}
      >
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterClass(f.id)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background:
                filterClass === f.id ? "var(--green)" : "hsl(var(--muted))",
              color:
                filterClass === f.id
                  ? "hsl(var(--background))"
                  : "hsl(var(--muted-foreground))",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-2.5 animate-slide-up delay-200">
        {filtered.map((cls, i) => (
          <div
            key={cls.place}
            className="p-4 rounded-2xl card-hover animate-slide-up"
            style={{
              background:
                cls.place <= 3
                  ? "linear-gradient(135deg, hsl(142 72% 50% / 0.1), hsl(220 18% 12%))"
                  : "hsl(var(--card))",
              border:
                cls.place <= 3
                  ? "1px solid hsl(142 72% 50% / 0.25)"
                  : "1px solid hsl(var(--border))",
              animationDelay: `${0.1 + i * 0.05}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background:
                    cls.place === 1
                      ? "rgba(246,211,101,0.2)"
                      : cls.place === 2
                      ? "rgba(189,195,199,0.2)"
                      : cls.place === 3
                      ? "rgba(212,162,116,0.2)"
                      : "hsl(var(--muted))",
                }}
              >
                {cls.medal || cls.place}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">{cls.cls}</span>
                  <span
                    className="font-oswald font-bold text-lg"
                    style={{ color: "var(--green)" }}
                  >
                    {cls.points.toLocaleString("ru")}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    Среднее: {cls.avg} б/уч
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: cls.up ? "var(--green)" : "var(--orange)",
                    }}
                  >
                    {cls.up ? "📈" : "📉"} {cls.trend}
                  </span>
                </div>
              </div>
            </div>

            {cls.place <= 3 && (
              <div className="mt-3">
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: "hsl(var(--border))" }}
                >
                  <div
                    className="h-full rounded-full progress-bar"
                    style={
                      {
                        "--progress-width": `${(cls.points / 1400) * 100}%`,
                        background:
                          "linear-gradient(90deg, var(--green), #00d4aa)",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TASKS TAB ─── */
function TasksTab() {
  const [done, setDone] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const markDone = (id: number) => {
    setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const challenge = tasks[0];
  const filtered =
    activeCategory === "all"
      ? tasks.slice(1)
      : tasks.slice(1).filter((t) => t.category === activeCategory);

  return (
    <div className="px-4 pt-2">
      <div className="mb-4 animate-slide-up">
        <h2 className="font-oswald text-2xl font-bold tracking-wide">ЗАДАНИЯ</h2>
        <p className="text-xs text-muted-foreground">Выполняй и зарабатывай баллы</p>
      </div>

      {/* Challenge of the week */}
      <div
        className="rounded-2xl p-4 mb-4 animate-slide-up delay-100"
        style={{
          background: "linear-gradient(135deg, hsl(28 95% 55% / 0.15), hsl(28 95% 55% / 0.05))",
          border: "1px solid hsl(28 95% 55% / 0.35)",
        }}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: "var(--orange-dim)", color: "var(--orange)" }}
            >
              🔥 Челлендж недели
            </span>
            <h3 className="font-bold text-base mt-2">{challenge.title}</h3>
          </div>
          <span className="font-oswald font-bold text-2xl" style={{ color: "var(--orange)" }}>
            +{challenge.points}б
          </span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Выполнил класс: {challenge.done} из {challenge.total}</span>
          <span>До конца: {challenge.daysLeft} дн</span>
        </div>
        <div className="h-2 rounded-full mb-3" style={{ background: "hsl(var(--border))" }}>
          <div
            className="h-full rounded-full progress-bar"
            style={{
              "--progress-width": `${((challenge.done ?? 0) / (challenge.total ?? 1)) * 100}%`,
              background: "linear-gradient(90deg, var(--orange), #ff9a44)",
            } as React.CSSProperties}
          />
        </div>
        <button
          onClick={() => markDone(challenge.id)}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: done.includes(challenge.id) ? "var(--green-dim)" : "var(--orange)",
            color: done.includes(challenge.id) ? "var(--green)" : "hsl(var(--background))",
            border: done.includes(challenge.id) ? "1px solid var(--green)" : "none",
          }}
        >
          {done.includes(challenge.id) ? "✅ Отправлено на проверку" : `📸 ${challenge.action}`}
        </button>
      </div>

      {/* Category filter */}
      <div
        className="flex gap-2 mb-4 overflow-x-auto pb-1 animate-slide-up delay-200"
        style={{ scrollbarWidth: "none" }}
      >
        {taskCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: activeCategory === cat.id ? "var(--green)" : "hsl(var(--muted))",
              color: activeCategory === cat.id ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-2.5 pb-2">
        {filtered.map((task, i) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3.5 rounded-2xl card-hover animate-slide-up"
            style={{
              background: done.includes(task.id) ? "hsl(142 72% 50% / 0.08)" : "hsl(var(--card))",
              border: done.includes(task.id)
                ? "1px solid hsl(142 72% 50% / 0.3)"
                : "1px solid hsl(var(--border))",
              animationDelay: `${0.05 + i * 0.05}s`,
            }}
          >
            <span className="text-2xl flex-shrink-0">{task.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <p className="font-semibold text-sm leading-tight">{task.title}</p>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--green)" }}>
                  +{task.points}б
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{task.subtitle}</p>
              {task.daysLeft && !done.includes(task.id) && (
                <span
                  className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-1"
                  style={{ background: "var(--orange-dim)", color: "var(--orange)" }}
                >
                  ⏰ {task.daysLeft} дн
                </span>
              )}
            </div>
            <button
              onClick={() => markDone(task.id)}
              className="flex-shrink-0 p-2 rounded-xl transition-all duration-200 active:scale-90"
              style={{
                background: done.includes(task.id) ? "var(--green-dim)" : "hsl(var(--muted))",
                color: done.includes(task.id) ? "var(--green)" : "hsl(var(--muted-foreground))",
              }}
            >
              <Icon name={done.includes(task.id) ? "Check" : "Plus"} size={16} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            Нет заданий в этой категории
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PROFILE TAB ─── */
function ProfileTab() {
  return (
    <div className="px-4 pt-2">
      {/* Header card */}
      <div
        className="rounded-2xl p-5 mb-5 animate-slide-up"
        style={{
          background:
            "linear-gradient(135deg, hsl(142 72% 50% / 0.12), hsl(220 18% 12%))",
          border: "1px solid hsl(142 72% 50% / 0.2)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, var(--green), #00d4aa)",
            }}
          >
            👤
          </div>
          <div>
            <h2 className="font-bold text-lg">Иван Петров</h2>
            <p className="text-sm text-muted-foreground">7 «А» класс</p>
            <span
              className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1.5"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}
            >
              🏅 Лидер класса
            </span>
          </div>
        </div>

        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Мой вклад в класс
            </span>
            <span className="font-oswald font-bold text-2xl text-gradient-green">
              312 баллов
            </span>
          </div>
          <div
            className="h-2 rounded-full mt-2"
            style={{ background: "hsl(var(--border))" }}
          >
            <div
              className="h-full rounded-full progress-bar"
              style={
                {
                  "--progress-width": "71%",
                  background: "linear-gradient(90deg, var(--green), #00d4aa)",
                } as React.CSSProperties
              }
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            71% от максимума в классе (440 б)
          </p>
        </div>
      </div>

      {/* Achievements */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 animate-slide-up delay-100">
        Мои достижения
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-5 animate-slide-up delay-200">
        {achievements.map((ach, i) => (
          <div
            key={i}
            className="p-3.5 rounded-2xl animate-slide-up"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              animationDelay: `${0.15 + i * 0.08}s`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{ach.icon}</span>
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: `${ach.color}22`, color: ach.color }}
              >
                ×{ach.count}
              </span>
            </div>
            <p className="text-xs font-semibold leading-tight">{ach.title}</p>
          </div>
        ))}
      </div>

      {/* Activity chart */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 animate-slide-up delay-300">
        Активность за неделю
      </p>
      <div
        className="rounded-2xl p-4 mb-5 animate-slide-up delay-400"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
        }}
      >
        <div className="flex items-end justify-between gap-1.5" style={{ height: 80 }}>
          {weekDays.map((day) => {
            const heightPct = (day.steps / maxSteps) * 100;
            return (
              <div
                key={day.day}
                className="flex flex-col items-center gap-1.5 flex-1 h-full"
              >
                <div
                  className="w-full rounded-lg flex-1 flex items-end"
                  style={{ background: "hsl(var(--muted))" }}
                >
                  <div
                    className="w-full rounded-lg"
                    style={{
                      height: `${heightPct}%`,
                      minHeight: 4,
                      background: day.active
                        ? "linear-gradient(180deg, var(--orange), #ff9a44)"
                        : "linear-gradient(180deg, var(--green), #00d4aa)",
                      opacity: day.active ? 1 : 0.75,
                    }}
                  />
                </div>
                <span
                  className="text-[9px] font-medium"
                  style={{
                    color: day.active
                      ? "var(--orange)"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="mt-3 pt-3 grid grid-cols-4 text-center"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          {[
            { val: "8 450", label: "Ср. шагов" },
            { val: "12", label: "Зарядок" },
            { val: "3", label: "Челленджей" },
            { val: "2", label: "Дня здоровья" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="font-oswald font-bold text-lg"
                style={{ color: "var(--green)" }}
              >
                {s.val}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Share button */}
      <button
        className="w-full py-3.5 rounded-2xl font-bold text-sm mb-6 transition-all active:scale-95 animate-slide-up delay-500"
        style={{
          background: "linear-gradient(135deg, var(--green), #00d4aa)",
          color: "hsl(var(--background))",
        }}
      >
        🌟 Поделиться достижениями
      </button>
    </div>
  );
}