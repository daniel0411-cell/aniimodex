import type { ReactNode } from 'react';

// 根布局：纯 passthrough。
// 真正的 <html>/<body>、全局样式、i18n Provider 与语言切换都在
// app/[locale]/layout.tsx 中完成（见 next-intl 官方 App Router 结构）。
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
