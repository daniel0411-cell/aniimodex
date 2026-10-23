export default function OfficialDownloadLinks({ locale }: { locale: string }) {
  const t = (en: string, hans: string, hant: string) =>
    locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const links = [
    [
      t('Official website / PC launcher', '官网／PC 启动器', '官網／PC 啟動器'),
      'https://www.aniimo.com/',
    ],
    ['Steam', 'https://store.steampowered.com/app/4126040/Aniimo/'],
    ['PlayStation Store', 'https://store.playstation.com/concept/10018491'],
    ['Xbox Store', 'https://www.xbox.com/games/store/aniimo/9pk8phlcqdf6'],
    ['Epic Games Store', 'https://store.epicgames.com/p/aniimo-759396'],
    ['App Store', 'https://apps.apple.com/app/aniimo/id6759098797'],
    ['Google Play', 'https://play.google.com/store/apps/details?id=com.x.aniimos'],
  ];
  return (
    <nav
      aria-label={t('Official download routes', '官方下载入口', '官方下載入口')}
      className="mt-5 border-y border-ink-border py-4"
    >
      <h2 className="text-base font-semibold text-text-primary">
        {t('Official download routes', '官方下载入口', '官方下載入口')}
      </h2>
      <ul className="mt-3 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-primary-light underline underline-offset-4"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-text-muted">
        {t(
          'Routes observed on the official website on October 23, 2026. Check the destination store for your region and device; no installer is hosted here.',
          '入口于 2026 年 10 月 23 日在官网核对。地区与设备可用性以目标商店为准；本站不托管安装包。',
          '入口於 2026 年 10 月 23 日在官網核對。地區與裝置可用性以目標商店為準；本站不託管安裝包。'
        )}
      </p>
    </nav>
  );
}
