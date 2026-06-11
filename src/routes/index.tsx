import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "..." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

function formatDate(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join("/");
}

function Index() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === "31/01/2023") {
      navigate({ to: "/nos" });
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <label
          htmlFor="data"
          className="mb-4 block text-center text-xs uppercase tracking-[0.25em] text-neutral-400 sm:text-sm"
        >
          decifre: que dia selou, com um beijo,
          <br />
          o início de tudo entre nós?
        </label>
        <input
          id="data"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="dd/mm/aaaa"
          value={value}
          onChange={(e) => setValue(formatDate(e.target.value))}
          className={`w-full border-b bg-transparent py-2 text-center text-lg tracking-widest text-neutral-200 outline-none transition-colors ${
            error ? "border-red-500 animate-pulse" : "border-neutral-700 focus:border-neutral-300"
          }`}
        />
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHint((s) => !s)}
            className="text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-300"
          >
            {showHint ? "esconder dica" : "preciso de uma dica"}
          </button>
          {showHint && (
            <p className="max-w-xs text-center text-sm italic text-neutral-400">
              a data da primeira vez que tive a honra de te beijar
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
