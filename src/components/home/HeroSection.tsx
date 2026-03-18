

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-cyan-50" />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-8">
        <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-700 uppercase">
          AI-Driven Career Discovery
        </span>

        <div className="space-y-4">
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl">
            Discover Your Perfect Career Path.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Gamified AI assessments designed to evaluate your true potential after Class 10.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        </div>
      </div>
    </section>
  );
}
