import { setRequestLocale } from 'next-intl/server';

/**
 * Minimal layout for the sandbox route group.
 * No navigation, no footer — full-bleed dark canvas for the game.
 */
export default async function SandboxLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="min-h-dvh bg-slate-950 text-white antialiased">
      {props.children}
    </div>
  );
}
