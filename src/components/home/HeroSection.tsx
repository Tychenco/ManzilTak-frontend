import { Link } from '@/libs/I18nNavigation';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-cyan-50" />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-8">
        <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
          AI-Driven Career Discovery
        </span>

        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Discover Your Perfect Career Path.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Gamified AI assessments designed to evaluate your true potential after Class 10.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/counter/"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Start Assessment
          </Link>

          <Link
            href="/about/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
          >
            View Demo
          </Link>
        </div>
      </div>
    </section>
  );
}