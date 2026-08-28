import { locales, defaultLocale } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';

/**
 * 生成某一路径的 locale 前缀 URL。
 * 例：buildUrl('en', '/dex/') → https://aniimodex.com/en/dex/
 */
export function buildUrl(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}

/**
 * 生成某一路径的 hreflang 语言版本映射（含 x-default → defaultLocale）。
 * 用于 generateMetadata 的 alternates.languages。
 */
export function localizedLanguages(path: string): Record<string, string> & { 'x-default': string } {
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = buildUrl(l, path);
  });
  languages['x-default'] = buildUrl(defaultLocale, path);
  return languages as Record<string, string> & { 'x-default': string };
}
