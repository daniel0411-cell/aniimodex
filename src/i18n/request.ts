import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { defaultLocale, routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 解析请求的 locale；无效或缺失时回退到 defaultLocale
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
