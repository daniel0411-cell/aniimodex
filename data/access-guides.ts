import type { LaunchGuide } from './launch-guides';

export function getAccessGuide(locale: string, slug: string): LaunchGuide | undefined {
  const t = (en: string, hans: string, hant: string) =>
    locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const checked = t(
    'Official website routes and Steam listing checked October 23, 2026. A listed route is not a completed installation or a live server test. Regional store availability must be checked with your own account.',
    '官网入口与 Steam 商店于 2026 年 10 月 23 日核对。列出入口不代表已完成安装或实测服务器；地区商店可用性请用自己的账号确认。',
    '官網入口與 Steam 商店於 2026 年 10 月 23 日核對。列出入口不代表已完成安裝或實測伺服器；地區商店可用性請用自己的帳號確認。'
  );
  if (slug === 'aniimo-platforms')
    return {
      title: t(
        'Aniimo Platforms: PC, PS5, Xbox, Mobile & Switch Status',
        '伊莫支持哪些平台：PC、PS5、Xbox、手机与 Switch',
        '伊莫支援哪些平台：PC、PS5、Xbox、手機與 Switch'
      ),
      subtitle: t(
        'Choose a supported platform using official routes, then check your region and device before installing.',
        '按官方入口选择平台，再确认所在地区与设备能否安装。',
        '依官方入口選擇平台，再確認所在地區與裝置能否安裝。'
      ),
      tag: t('Platforms', '平台', '平台'),
      lead: t(
        'The official website links its PC launcher, Steam, Epic, PS5, Xbox, App Store and Google Play. Steam currently offers the free base game. These routes identify where to check access; they do not establish identical availability or shared saves across all platforms.',
        '官网列出 PC 启动器、Steam、Epic、PS5、Xbox、App Store 和 Google Play。Steam 当前提供免费本体。这些入口能帮助确认下载渠道，但不能证明所有地区同步开放或所有平台共享存档。',
        '官網列出 PC 啟動器、Steam、Epic、PS5、Xbox、App Store 和 Google Play。Steam 目前提供免費本體。這些入口能協助確認下載管道，但不能證明所有地區同步開放或所有平台共用存檔。'
      ),
      body: [
        {
          t: 'h',
          c: t(
            'Which route matches my device?',
            '我的设备应该选哪个入口？',
            '我的裝置應該選哪個入口？'
          ),
        },
        {
          t: 'table',
          head: [
            t('Device', '设备', '裝置'),
            t('Route checked October 23', '10 月 23 日核对的入口', '10 月 23 日核對的入口'),
            t('Before installing', '安装前确认', '安裝前確認'),
          ],
          rows: [
            [
              'Windows PC',
              t(
                'Official PC Launcher / Steam / Epic',
                '官网 PC 启动器 / Steam / Epic',
                '官網 PC 啟動器 / Steam / Epic'
              ),
              t(
                'Steam lists Windows 10 minimum and 40 GB free space; compare the full requirements before choosing a client.',
                'Steam 最低要求列出 Windows 10 和 40 GB 可用空间；选择客户端前请核对完整配置。',
                'Steam 最低需求列出 Windows 10 和 40 GB 可用空間；選擇用戶端前請核對完整規格。'
              ),
            ],
            [
              'PS5',
              t(
                'Official PlayStation Store concept 10018491',
                '官方 PlayStation 商店 concept 10018491',
                '官方 PlayStation 商店 concept 10018491'
              ),
              t(
                'Check the regional store action and online-play requirements. No PS4 support is established by this route.',
                '确认地区商店按钮与联网要求；此入口不能证明支持 PS4。',
                '確認地區商店按鈕與連線需求；此入口不能證明支援 PS4。'
              ),
            ],
            [
              'Xbox Series X|S',
              'Xbox Store 9pk8phlcqdf6',
              t(
                'Confirm the supported-device list in your store; do not infer Xbox One support.',
                '核对所在商店的支持设备，不要据此推断支持 Xbox One。',
                '核對所在商店的支援裝置，不要據此推斷支援 Xbox One。'
              ),
            ],
            [
              'iPhone / iPad',
              'App Store 6759098797',
              t(
                'The international link can redirect by region. If it opens the App Store home page, it has not confirmed game availability.',
                '国际版链接可能按地区跳转。若进入 App Store 首页，不能据此认定游戏可下载。',
                '國際版連結可能依地區跳轉。若進入 App Store 首頁，不能據此認定遊戲可下載。'
              ),
            ],
            [
              'Android',
              'Google Play: com.x.aniimos',
              t(
                'Check compatibility and account region on the listing; the official website link alone does not confirm an Install button.',
                '在商店页确认兼容性与账号地区；官网链接本身不等于存在安装按钮。',
                '在商店頁確認相容性與帳號地區；官網連結本身不等於存在安裝按鈕。'
              ),
            ],
          ],
        },
        {
          t: 'h',
          c: t(
            'Nintendo Switch and Switch 2',
            'Nintendo Switch 与 Switch 2',
            'Nintendo Switch 與 Switch 2'
          ),
        },
        {
          t: 'p',
          c: t(
            'Neither appears among the official website download routes checked October 23. This check does not establish a Nintendo release date or prove that a version can never be announced. Do not choose a download claiming to be a Switch build without an official Nintendo or Aniimo listing.',
            '10 月 23 日核对的官网下载入口中没有这两款主机。这不能得出任天堂版本的发售日期，也不能证明未来永远不会推出。没有官方任天堂或伊莫商店页时，不要使用自称 Switch 版的下载。',
            '10 月 23 日核對的官網下載入口中沒有這兩款主機。這不能得出任天堂版本的發售日期，也不能證明未來永遠不會推出。沒有官方任天堂或伊莫商店頁時，不要使用自稱 Switch 版的下載。'
          ),
        },
        { t: 'h', c: t('Choosing a second platform', '准备换平台时', '準備換平台時') },
        {
          t: 'p',
          c: t(
            'Steam lists cross-platform multiplayer, but that feature is not a complete save or purchase-transfer policy. Before starting on a second device, record your UID, region and server and check the account-linking guidance. Use the crossplay guide for the evidence boundary and the account recovery guide if the expected character is missing.',
            'Steam 列出跨平台多人功能，但这不是完整的存档或付费内容转移规则。换设备前先记录 UID、地区与服务器并核对绑定说明。跨平台指南说明证据范围；找不到原角色时请使用账号恢复指南。',
            'Steam 列出跨平台多人功能，但這不是完整的存檔或付費內容轉移規則。換裝置前先記錄 UID、地區與伺服器並核對綁定說明。跨平台指南說明證據範圍；找不到原角色時請使用帳號恢復指南。'
          ),
        },
        { t: 'quote', c: checked },
      ],
    };
  if (slug === 'how-to-download-aniimo')
    return {
      title: t(
        'How to Download Aniimo: Official Routes & Installation Checks',
        '伊莫怎么下载：官方入口与安装排查',
        '伊莫怎麼下載：官方入口與安裝排查'
      ),
      subtitle: t(
        'Find the right client, verify the storefront, and distinguish an installation problem from a login problem.',
        '选择正确客户端，核对商店身份，并区分安装问题与登录问题。',
        '選擇正確用戶端，核對商店身分，並區分安裝問題與登入問題。'
      ),
      tag: t('Download', '下载', '下載'),
      lead: t(
        'Start with the official links below. Choose the store and account you intend to keep using, check the requirements, then install through that platform. AniimoDex does not host installers or APK files.',
        '从下方官方入口开始。先选定准备长期使用的商店与账号，确认设备要求，再通过该平台安装。AniimoDex 不托管安装包或 APK。',
        '從下方官方入口開始。先選定準備長期使用的商店與帳號，確認裝置需求，再透過該平台安裝。AniimoDex 不託管安裝包或 APK。'
      ),
      body: [
        { t: 'h', c: t('Before the first download', '首次下载前', '首次下載前') },
        {
          t: 'li',
          c: t(
            'On PC, compare the system requirements with your CPU, GPU, RAM and available storage. Steam listed 40 GB free space on October 23; the older requirements guide quotes 30 GB from Epic. Check the current listing for your chosen client. Neither figure measures the network download or final patched size.',
            'PC 先核对处理器、显卡、内存与可用空间。10 月 23 日 Steam 列出 40 GB，旧配置指南引用的 Epic 要求为 30 GB，请以所选客户端的当前商店页为准。这些数值不是网络下载量或更新后体积的实测值。',
            'PC 先核對處理器、顯示卡、記憶體與可用空間。10 月 23 日 Steam 列出 40 GB，舊配置指南引用的 Epic 需求為 30 GB，請以所選用戶端的目前商店頁為準。這些數值不是網路下載量或更新後體積的實測值。'
          ),
        },
        {
          t: 'li',
          c: t(
            'On a console or phone, open the official store link on the target device. Confirm that the product is Aniimo and that the store supports your region and device before installing.',
            '主机或手机请在目标设备上打开官方商店链接，确认产品是伊莫，且商店支持所在地区与设备后再安装。',
            '主機或手機請在目標裝置上開啟官方商店連結，確認產品是伊莫，且商店支援所在地區與裝置後再安裝。'
          ),
        },
        {
          t: 'li',
          c: t(
            'Keep the existing store account and server details if you have played before. Downloading another client does not itself transfer an existing character.',
            '玩过游戏的用户请保留原商店账号与服务器信息。下载另一客户端本身不会自动转移已有角色。',
            '玩過遊戲的使用者請保留原商店帳號與伺服器資訊。下載另一用戶端本身不會自動轉移既有角色。'
          ),
        },
        { t: 'h', c: t('What went wrong?', '卡在哪一步？', '卡在哪一步？') },
        {
          t: 'table',
          head: [t('What you see', '现象', '現象'), t('Next check', '下一步', '下一步')],
          rows: [
            [
              t('Store home page instead of the game', '链接进入商店首页', '連結進入商店首頁'),
              t(
                'The international App Store link redirected to the China home page in our October 23 check. Return to the official website for your region; this redirect does not confirm installation access.',
                '10 月 23 日核对时，国际 App Store 链接跳转到了中国区首页。回到所属地区官网核对入口；这种跳转不能证明可以安装。',
                '10 月 23 日核對時，國際 App Store 連結跳轉到了中國區首頁。回到所屬地區官網核對入口；這種跳轉不能證明可以安裝。'
              ),
            ],
            [
              t('Unavailable or incompatible', '不可用或设备不兼容', '無法使用或裝置不相容'),
              t(
                'Read the regional store compatibility message. Do not substitute an unofficial APK or assume another country has the same listing.',
                '先读取地区商店的兼容性提示，不要改用非官方 APK，也不要假定其他国家商店的状态适用于自己。',
                '先閱讀地區商店的相容性提示，不要改用非官方 APK，也不要假定其他國家商店的狀態適用於自己。'
              ),
            ],
            [
              t('Download or update fails', '下载或更新失败', '下載或更新失敗'),
              t(
                "Record the store/client name, free space and exact error. Use that platform's support route; a reinstall is not evidence that a server or account issue is fixed.",
                '记录商店或客户端名称、可用空间和完整报错，使用对应平台支持渠道；重装并不能证明服务器或账号问题已解决。',
                '記錄商店或用戶端名稱、可用空間和完整錯誤，使用對應平台支援管道；重裝並不能證明伺服器或帳號問題已解決。'
              ),
            ],
            [
              t(
                'Installed, but cannot log in or find a character',
                '安装成功但无法登录或找不到角色',
                '安裝成功但無法登入或找不到角色'
              ),
              t(
                'Move to login/account troubleshooting. Record UID, region, server and version before changing bindings or creating another character.',
                '转到登录或账号排查。改变绑定或创建其他角色前，先记录 UID、地区、服务器与版本。',
                '轉到登入或帳號排查。改變綁定或建立其他角色前，先記錄 UID、地區、伺服器與版本。'
              ),
            ],
          ],
        },
        { t: 'quote', c: checked },
      ],
    };
  if (slug === 'aniimo-release-date')
    return {
      title: t(
        'Aniimo Release Date & Historical Preload Times',
        '伊莫发售日期与历史预载时间',
        '伊莫發售日期與歷史預載時間'
      ),
      subtitle: t(
        'Understand the September PC/console launch, the separate mobile launch, and the date difference between time zones.',
        '区分九月 PC／主机首发、后续手机上线，以及时区造成的日期差异。',
        '區分九月 PC／主機首發、後續手機上線，以及時區造成的日期差異。'
      ),
      tag: t('Release history', '发售记录', '發售記錄'),
      lead: t(
        'Aniimo is already released. The announced PC/console launch was September 16, 2026 at 10:00 UTC+8; the official September 23 version 1.1 notice separately announced the global mobile launch. Historical launch times are not a live server-status check.',
        '伊莫已经上线。PC／主机公布的首发时间为 2026 年 9 月 16 日 10:00（UTC+8）；9 月 23 日官方 1.1 公告另行宣布了全球手机端上线。历史开服时间不能作为当前服务器状态。',
        '伊莫已經上線。PC／主機公布的首發時間為 2026 年 9 月 16 日 10:00（UTC+8）；9 月 23 日官方 1.1 公告另行宣布了全球手機版上線。歷史開服時間不能作為目前伺服器狀態。'
      ),
      body: [
        {
          t: 'h',
          c: t(
            'One launch moment, different calendar dates',
            '同一首发时刻，不同日历日期',
            '同一首發時刻，不同行事曆日期'
          ),
        },
        {
          t: 'table',
          head: [
            t('Time zone', '时区', '時區'),
            t('Announced PC/console launch', '公布的 PC／主机首发时刻', '公布的 PC／主機首發時刻'),
          ],
          rows: [
            ['UTC+8', '2026-09-16 10:00'],
            ['UTC', '2026-09-16 02:00'],
            ['EDT (UTC-4)', '2026-09-15 22:00'],
            ['PDT (UTC-7)', '2026-09-15 19:00'],
          ],
        },
        {
          t: 'p',
          c: t(
            'The explicit launch time comes from the historical PlayStation listing checked September 14. Steam still displays September 15 in the listing checked October 23. The conversion above explains why those dates can describe the same launch moment; it is not a new release announcement.',
            '具体首发时刻来自 9 月 14 日核对的历史 PlayStation 商店记录；10 月 23 日核对时 Steam 仍显示 9 月 15 日。上表的时区换算解释了两种日期可以对应同一时刻，不是新的发售公告。',
            '具體首發時刻來自 9 月 14 日核對的歷史 PlayStation 商店記錄；10 月 23 日核對時 Steam 仍顯示 9 月 15 日。上表的時區換算解釋了兩種日期可以對應同一時刻，不是新的發售公告。'
          ),
        },
        { t: 'h', c: t('Mobile launched separately', '手机端单独上线', '手機版單獨上線') },
        {
          t: 'p',
          c: t(
            'The September 23 version 1.1 announcement states that mobile launched after maintenance. It does not mean every country, account and device exposes the same store action. Use the mobile guide for compatibility questions and the download guide for official routes.',
            '9 月 23 日 1.1 公告说明手机端在维护后上线。这不等于所有国家、账号与设备都会显示相同商店按钮。兼容性问题请看手机端指南，官方入口请看下载指南。',
            '9 月 23 日 1.1 公告說明手機版在維護後上線。這不等於所有國家、帳號與裝置都會顯示相同商店按鈕。相容性問題請看手機版指南，官方入口請看下載指南。'
          ),
        },
        {
          t: 'h',
          c: t(
            'Do old preload times still matter?',
            '现在还需要等预载吗？',
            '現在還需要等預載嗎？'
          ),
        },
        {
          t: 'p',
          c: t(
            'Preload was a pre-launch step and no longer determines access. Use the current official client or store. If an installed client cannot connect, check the current official notice and your server region; the historical statement that servers reopened after September maintenance does not prove current uptime.',
            '预载是首发前的步骤，现在不再决定能否进入游戏，请使用当前官方客户端或商店。已安装却无法连接时，应核对最新公告与服务器地区；九月维护后恢复开服的历史记录不能证明当前在线。',
            '預載是首發前的步驟，現在不再決定能否進入遊戲，請使用目前官方用戶端或商店。已安裝卻無法連線時，應核對最新公告與伺服器地區；九月維護後恢復開服的歷史記錄不能證明目前在線。'
          ),
        },
        { t: 'quote', c: checked },
      ],
    };
  return undefined;
}
