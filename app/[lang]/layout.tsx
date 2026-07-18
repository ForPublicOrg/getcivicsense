import '../globals.css';
import type { Metadata } from 'next';
import { getI18n, type LangParams } from '@/lib/i18n/server';
import { I18nProvider } from '@/lib/i18n/provider';
import { LOCALE_CODES } from '@/lib/i18n/locales';
import { SITE_URL } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Get Civic Sense - the small stuff we all do',
    template: '%s · Get Civic Sense',
  },
  description:
    'A free, non-partisan, all-ages civic-sense project for India. See how everyday behaviour touches everyone around you - with the real science one tap behind every card. No logins, nothing collected about you.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Get Civic Sense',
    description: "Civic sense isn't about them. It's about all of us.",
    url: SITE_URL,
    siteName: 'Get Civic Sense',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

// Prerender each locale. Child pages add their own (lang, ...) combos.
export function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const { locale, dict, dir } = await getI18n(lang);
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/* Theme bootstrap: runs before paint so there's no flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <div className="aurora" aria-hidden="true" />
        <I18nProvider locale={locale} dict={dict} dir={dir}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
