import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/nos")({
  head: () => ({
    meta: [
      { title: "Feliz dia dos namorados 💗" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NosPage,
});

const BG_COUNT = 30;
// Data de início: 12/01/2024 21:00
const START = new Date(2024, 0, 12, 21, 0, 0);

function useElapsed() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let years = now.getFullYear() - START.getFullYear();
  let months = now.getMonth() - START.getMonth();
  let days = now.getDate() - START.getDate();
  let hours = now.getHours() - START.getHours();
  let minutes = now.getMinutes() - START.getMinutes();
  let seconds = now.getSeconds() - START.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds };
}

function SidePhotos({ direction, side }: { direction: "up" | "down"; side: "left" | "right" }) {
  const items = Array.from({ length: BG_COUNT }, (_, i) => i + 1);
  const loop = [...items, ...items];
  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-0 w-[22vw] overflow-hidden sm:w-[20vw]"
      style={{ [side]: 0 } as React.CSSProperties}
    >
      <div
        className={`flex flex-col gap-3 px-1 sm:gap-4 sm:px-2 ${
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        }`}
      >
        {loop.map((n, i) => (
          <img
            key={`${n}-${i}`}
            src={`/images/bg/${n}.jpg`}
            alt=""
            loading="lazy"
            className="w-full object-cover opacity-20 shadow-2xl sm:opacity-30"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
          />
        ))}
      </div>
    </div>
  );
}

function NosPage() {
  const t = useElapsed();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#1a0a10] text-neutral-100">
      <SidePhotos direction="up" side="left" />
      <SidePhotos direction="down" side="right" />

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        {/* Hero */}
        <section className="grid items-center gap-6 sm:gap-8 md:grid-cols-[1fr_180px]">
          <div className="text-center md:text-left animate-fade-in">
            <h1 className="font-serif text-2xl leading-tight sm:text-4xl md:text-5xl">
              Feliz dia dos namorados,
              <br />
              <span className="italic">Meu bombomzinho!</span>{" "}
              <span aria-label="coração marrom">🤎</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:mt-8 sm:text-lg">
              Fazem exatamente{" "}
              <span className="font-semibold text-white">
                {t.years} {t.years === 1 ? "ano" : "anos"}, {t.months} {t.months === 1 ? "mês" : "meses"}, {t.days} {t.days === 1 ? "dia" : "dias"}, {t.hours}h {t.minutes}m {t.seconds}s
              </span>{" "}
              que eu tenho o prazer de dividir a vida com você!
            </p>
          </div>
          <img
            src="/images/hero/feliz.jpeg"
            alt="Nós"
            className="mx-auto aspect-[3/4] w-32 rounded-2xl object-cover shadow-2xl sm:w-44"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
          />
        </section>

        {/* Tópicos */}
        <section className="mt-20 space-y-20 sm:mt-32 sm:space-y-32">
          <Topico img="companhia" text="Você é minha melhor companhia" />
          <Topico img="esportes" text="Minha dupla em todos os esportes" reverse />
          <Topico img="loucura" text="Um pedacinho da minha loucura" />
          <Topico img="orgulho" text="Meu maior orgulho em todas suas conquistas" reverse />
        </section>

        {/* Outro */}
        <section className="mt-20 grid items-center gap-6 sm:mt-32 sm:gap-8 md:grid-cols-[180px_1fr]">
          <img
            src="/images/hero/obrigado.jpeg"
            alt="Nós"
            className="mx-auto aspect-[3/4] w-32 rounded-2xl object-cover shadow-2xl sm:w-44"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
          />
          <p className="text-center text-base leading-relaxed text-neutral-300 sm:text-lg md:text-right">
            Obrigado por todos os momentos, por embarcar em todas as minhas loucuras e por permitir que eu esteja contigo em todas as suas.
          </p>
        </section>

        <p className="mt-20 text-center font-serif text-xl leading-relaxed sm:mt-24 sm:text-2xl md:text-3xl">
          Você sempre será a melhor parte da minha vida, agora e pra sempre.
          <br />
          Eu te amo! <span aria-label="coração roxo">💜</span>
        </p>

        <div className="h-16 sm:h-24" />
      </main>
    </div>
  );
}

function Topico({ img, text, reverse }: { img: string; text: string; reverse?: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById(`t-${img}`);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [img]);

  return (
    <div
      id={`t-${img}`}
      className={`grid items-center gap-6 sm:grid-cols-2 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${reverse ? "sm:[&>img]:order-2" : ""}`}
    >
      <img
        src={`/images/topicos/${img}.jpeg`}
        alt={text}
        className="mx-auto aspect-square w-full max-w-xs rounded-2xl object-cover shadow-2xl"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
      />
      <p className="text-center font-serif text-xl leading-snug sm:text-left sm:text-2xl md:text-3xl">
        {text}
      </p>
    </div>
  );
}
