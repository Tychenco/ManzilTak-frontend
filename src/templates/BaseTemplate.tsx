import { AppConfig } from '@/utils/AppConfig';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full text-gray-700 antialiased min-h-screen bg-gray-50/30">
      {/* Premium Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold pb-0.5">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              {AppConfig.name}
            </span>
          </div>

          {/* Left Navigation (if any) */}
          <nav aria-label="Main" className="hidden md:flex flex-1 ml-8">
            <ul className="flex gap-x-6 text-sm font-medium text-gray-600">
              {props.leftNav}
            </ul>
          </nav>

          {/* Right Navigation (Auth & i18n) */}
          <nav aria-label="Secondary">
            <ul className="flex items-center gap-x-4 text-sm font-medium">
              {props.rightNav}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {props.children}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl border-t border-gray-200 px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {AppConfig.name}. All rights reserved.
      </footer>
    </div>
  );
};
