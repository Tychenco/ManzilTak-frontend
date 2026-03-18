import { Link } from '@/libs/I18nNavigation';

const navigationItems: Array<{ href: string; label: string }> = [
  { href: '/counter/', label: 'Assessments' },
  { href: '/portfolio/', label: 'Career Paths' },
  { href: '/about/', label: 'How It Works' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="inline-flex items-center text-xl font-semibold tracking-tight text-slate-900"
        >
          <span className="mr-2 inline-flex size-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            M
          </span>
          ManzilTak
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
          {navigationItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/sign-up/"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
