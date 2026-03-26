'use client';

import type { ChangeEventHandler } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newLocale = event.target.value;

    if (newLocale === locale) {
      return;
    }

    const { search } = window.location;
    router.push(`${pathname}${search}`, { locale: newLocale, scroll: false });
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        defaultValue={locale}
        onChange={handleChange}
        className="appearance-none bg-transparent border border-gray-200 text-gray-700 font-semibold text-sm rounded-full px-4 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:bg-gray-50"
        aria-label="Change language"
      >
        {routing.locales.map((elt) => (
          <option key={elt} value={elt} className="text-gray-900 font-medium">
            {elt === 'en' ? 'EN' : elt === 'hi' ? 'HI' : elt.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 flex items-center text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
