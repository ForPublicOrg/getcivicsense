// Locale routing at the edge - copied in spirit from the sibling site. Every
// page lives under app/[lang]/, but public URLs stay clean (/roads,
// /roads/wear-a-helmet). This middleware rewrites the request to /{locale}/...
// based on the `lang` cookie. Doing locale via the URL param - instead of
// reading cookies() during render - is what keeps every page statically
// generated and CDN-served.
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_MAP, DEFAULT_LOCALE } from './lib/i18n/locales';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already locale-prefixed (RSC prefetch of a rewritten URL, or a direct
  // /hi/... link) - let it through untouched.
  const first = pathname.split('/')[1];
  if (LOCALE_MAP[first]) return NextResponse.next();

  const cookie = req.cookies.get('lang')?.value?.toLowerCase();
  const locale = cookie && LOCALE_MAP[cookie] ? cookie : DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any file with an extension (search-index.json,
  // content/*.json, images, fonts...).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
