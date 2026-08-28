import { redirect } from '@/i18n/navigation';
import { defaultLocale } from '@/i18n/routing';

// 根路径：重定向到默认 locale（如 / → /en）
// 在 output: 'export' 静态导出下 middleware 不生效，故用页面级 redirect。
export default function RootPage() {
  redirect({ href: '/', locale: defaultLocale });
}
