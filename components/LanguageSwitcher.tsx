'use client';
// Sets the `lang` cookie (read at the edge by middleware, never during render)
// and reloads so the same clean URL renders in the chosen language. No PII.
import { useI18n } from '@/lib/i18n/provider';
import { LOCALES } from '@/lib/i18n/locales';

export default function LanguageSwitcher() {
  const { locale } = useI18n();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    document.cookie = `lang=${code};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  }

  return (
    <label className="relative">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={onChange}
        className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink-soft outline-none focus:border-brand"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
      </select>
    </label>
  );
}
