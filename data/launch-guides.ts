export type LaunchGuideBlock =
  { t: 'p' | 'h' | 'li' | 'quote'; c: string } | { t: 'table'; head: string[]; rows: string[][] };

type LaunchGuide = {
  title: string;
  subtitle: string;
  tag: string;
  lead: string;
  body: LaunchGuideBlock[];
};

const commonWatchlist = [
  ['#003', 'Emberpup', 'Hustle, skills, forms and evolution'],
  ['#009', 'Chirpi', 'Take Off, branches and skills'],
  ['#019', 'Nimbi', 'Cloudwalk, forms, skills and branches'],
  ['#012', 'Iris', 'Blooming and multiple forms'],
  ['#029', 'Flutternym', 'Habitats, skills and forms'],
  ['#043', 'Wisptis', 'Cloak, skills, forms and branches'],
  ['#001', 'Emberpup', 'Habitats, Hustle and family data'],
  ['#007', 'Chirpi', 'Habitats and branching evolution'],
  ['#022', 'Hummin', 'Luminous Seed, skills and forms'],
  ['#024', 'Budclaw', 'Tunnel, habitats, forms and branches'],
  ['#035', 'Budsquire', 'Skills, forms and evolution'],
  ['#080', 'Bulbly', 'Glow, skills and forms'],
];

const english: Record<string, LaunchGuide> = {
  'aniimo-crossplay-cross-save': {
    title: 'Is Aniimo Crossplay? Cross-Platform and Cross-Save Status',
    subtitle:
      'Aniimo lists cross-platform multiplayer; exact platform pairings, cross-save and cross-progression remain unconfirmed.',
    tag: 'Cross-platform',
    lead: 'Yes, Aniimo lists cross-platform multiplayer on Steam. Cross-save and cross-progression are different features, and the official sources checked on September 16 do not publish a complete account-linking or transfer policy.',
    body: [
      { t: 'h', c: 'Is Aniimo cross-platform?' },
      {
        t: 'p',
        c: 'Yes. Steam lists cross-platform multiplayer as an Aniimo feature. The listing does not document every supported platform pairing or activity.',
      },
      { t: 'h', c: 'Which platform combinations are confirmed?' },
      {
        t: 'table',
        head: ['Combination', 'Verified status'],
        rows: [
          [
            'PC with other platforms',
            'Cross-platform multiplayer listed; exact pairings not documented',
          ],
          ['PS5 with Xbox', 'Not specifically documented'],
          ['PC or console with mobile', 'Not specifically documented'],
          ['Shared saves and progression', 'Not confirmed'],
          ['Purchases and paid currency transfer', 'Not confirmed'],
        ],
      },
      { t: 'h', c: 'Does Aniimo have cross-save or cross-progression?' },
      {
        t: 'p',
        c: 'No complete official policy is available in the sources used here. Crossplay allows players on different platforms to play together; it does not automatically transfer saves, achievements, purchases or premium currency.',
      },
      { t: 'h', c: 'What should players do now?' },
      {
        t: 'p',
        c: 'Use one primary platform until Pawprint Studio publishes account-linking details. Verify any linking prompt inside the official game or support documentation before moving progress or making purchases.',
      },
      {
        t: 'quote',
        c: 'Last source check: September 16, 2026. This page will change only when an official account or cross-progression policy is available.',
      },
    ],
  },
  'aniimo-pre-registration': {
    title: 'Aniimo Pre-Registration Rewards and Eligibility After Launch',
    subtitle:
      'Check the post-launch status of Aniimo pre-registration links, rewards and eligibility without relying on expired campaign claims.',
    tag: 'Launch rewards',
    lead: 'Aniimo has launched on verified PC and Xbox routes. The old pre-registration URL remains useful for players checking reward eligibility, but campaign buttons and terms may differ by platform and region.',
    body: [
      { t: 'h', c: 'Can I still pre-register for Aniimo?' },
      {
        t: 'p',
        c: 'The global launch has passed for the verified PC and Xbox routes, so new players should use the official download or store pages. Mobile timing remains platform-specific.',
      },
      { t: 'h', c: 'How do I check pre-registration reward eligibility?' },
      {
        t: 'li',
        c: 'Open the same official platform account used during pre-registration or wishlisting',
      },
      {
        t: 'li',
        c: 'Check the in-game mail, event or rewards interface after completing any required opening steps',
      },
      {
        t: 'li',
        c: 'Read the current official campaign terms for region, platform and claim-window restrictions',
      },
      { t: 'h', c: 'Are rewards guaranteed for every player?' },
      {
        t: 'p',
        c: 'No universal entitlement is confirmed by the sources registered for this page. Do not rely on third-party reward lists or codes unless the official campaign terms match your account, region and platform.',
      },
      { t: 'h', c: 'Where should new players download Aniimo?' },
      {
        t: 'p',
        c: 'Use the official Aniimo website or its linked Steam, PlayStation, Xbox, App Store, Google Play and Epic storefronts. Avoid third-party APK and launcher downloads.',
      },
    ],
  },
  'aniimo-face-data-import': {
    title: 'Aniimo Face Data Import: Current Verification and Safety Guide',
    subtitle:
      'What is currently verified about Aniimo face-data imports, plus a safe checklist while official instructions remain unavailable.',
    tag: 'Character creator',
    lead: 'Players are searching for an Aniimo face-data import workflow, but the official sources registered by AniimoDex do not yet document a transferable code, file path or cross-platform import process. This page separates that search demand from verified instructions.',
    body: [
      { t: 'h', c: 'Can you import face data in Aniimo?' },
      {
        t: 'p',
        c: 'AniimoDex cannot yet confirm a complete official import workflow. No transferable face code, local file location or supported platform matrix is documented in the official sources used for this page.',
      },
      { t: 'h', c: 'What should you check in the game?' },
      {
        t: 'li',
        c: 'Look for Import, Share, Preset or Face Data inside the official character-creation interface',
      },
      {
        t: 'li',
        c: 'Confirm whether the source and destination use the same region, server, platform and game version',
      },
      { t: 'li', c: 'Use only codes or files generated by the official client' },
      { t: 'li', c: 'Keep a screenshot of your current appearance before replacing a preset' },
      { t: 'h', c: 'What should you avoid?' },
      {
        t: 'p',
        c: 'Do not download executable tools, modified clients or unknown preset files. Search results and community posts do not prove that a code is compatible, current or safe.',
      },
      { t: 'h', c: 'What information is still needed?' },
      {
        t: 'table',
        head: ['Field', 'Current status'],
        rows: [
          ['Official import steps', 'Not documented in registered sources'],
          ['Face-code format', 'Unconfirmed'],
          ['PC and console compatibility', 'Unconfirmed'],
          ['Cross-region or cross-server transfer', 'Unconfirmed'],
          ['Mobile compatibility', 'Unconfirmed'],
        ],
      },
      {
        t: 'quote',
        c: 'This page will be converted into a step-by-step guide only after official documentation or a reproducible in-game workflow can be verified.',
      },
    ],
  },
  'aniimo-launch-checklist-known-issues': {
    title: 'Aniimo Known Issues: Login, Crashes, Progress and Multiplayer',
    subtitle:
      'A source-checked troubleshooting hub that separates confirmed platform facts from unverified launch reports.',
    tag: 'Known issues',
    lead: 'Start here when Aniimo will not launch, connect or save as expected. AniimoDex does not turn isolated posts into confirmed bugs: each category below states what can be verified now, what you can safely check, and what evidence is still missing.',
    body: [
      { t: 'h', c: 'Current playable status' },
      {
        t: 'table',
        head: ['Platform', 'Verified status', 'Checked'],
        rows: [
          ['Official PC launcher', 'Download available from the official site', 'September 18'],
          ['Steam', 'Released and free to play on Windows', 'September 16'],
          ['Xbox Series X|S', 'Free base game and acquisition action available', 'September 16'],
          [
            'PS5',
            'Published launch time has passed; availability can vary by regional store',
            'September 14',
          ],
          ['iPhone and iPad', 'App Store lists September 23', 'September 15'],
          ['Android', 'Official listing exists; no release date confirmed', 'September 18'],
        ],
      },
      { t: 'h', c: 'Login, server or connection problems' },
      {
        t: 'p',
        c: 'No registered official source currently publishes a complete outage list or a universal login fix. First confirm the correct region and server, restart the official client, check the storefront or official site for a maintenance notice, and record the exact error before reinstalling.',
      },
      { t: 'h', c: 'Game will not launch, crashes or runs poorly' },
      {
        t: 'p',
        c: 'The official PC requirements are published, but the sources registered here do not confirm a single crash or performance issue affecting every PC. Compare your hardware and free storage with the official requirements, update the game through its official launcher or store, and test default display settings before changing files or using third-party tools.',
      },
      { t: 'h', c: 'Quest or progression appears stuck' },
      {
        t: 'p',
        c: 'AniimoDex has no official source confirming a universal blocked quest or safe skip. Do not delete a character or overwrite a save based on an isolated report. Capture the quest name, objective, platform, server, version and reproduction steps, then check official support or a current maintenance notice.',
      },
      { t: 'h', c: 'Multiplayer or cross-platform play does not work' },
      {
        t: 'p',
        c: 'Steam lists cross-platform multiplayer, but the official sources checked here do not document every platform pairing, activity, account-linking step or cross-save rule. Confirm that both players use the same game version and compatible activity before treating a failed invite as a confirmed global bug.',
      },
      { t: 'h', c: 'Save, account or purchase progress looks wrong' },
      {
        t: 'p',
        c: 'Cross-save, cross-progression and purchase transfer are not fully documented in the registered official sources. Avoid unlinking accounts or repeating a purchase until the platform receipt, server, account and character are confirmed. Contact official support for account-specific recovery.',
      },
      { t: 'h', c: 'What counts as a confirmed known issue?' },
      {
        t: 'table',
        head: ['Evidence', 'How AniimoDex labels it'],
        rows: [
          ['Official notice or patch note', 'Officially confirmed'],
          ['Repeatable test with version, platform and steps', 'Reproduced test'],
          ['Multiple community posts without reproducible evidence', 'Community report only'],
          ['One post, screenshot or search snippet', 'Not listed as a confirmed issue'],
        ],
      },
      {
        t: 'quote',
        c: 'Last content review: September 20, 2026. A useful report includes platform, region, server, version, time, exact error and reproduction steps.',
      },
    ],
  },
  'aniimo-choose-by-mobility-role': {
    title: 'How to Choose Aniimo by Mobility Ability and Combat Role',
    subtitle:
      'Use official mobility and role fields to shortlist Aniimo for exploration and team functions.',
    tag: 'Selection guide',
    lead: 'Mobility describes field interaction and role describes combat function. Neither field is a strength ranking.',
    body: [
      { t: 'h', c: 'Choose by exploration ability' },
      {
        t: 'table',
        head: ['Mobility', 'Example family', 'Utility'],
        rows: [
          ['Hustle', 'Emberpup', 'Movement'],
          ['Take Off', 'Chirpi', 'Aerial mobility'],
          ['Cloudwalk', 'Nimbi', 'Cloud traversal'],
          ['Cloak', 'Wisptis', 'Stealth'],
          ['Tunnel', 'Budclaw', 'Underground interaction'],
          ['Glow', 'Bulbly', 'Light utility'],
        ],
      },
      { t: 'h', c: 'Choose by combat role' },
      {
        t: 'table',
        head: ['Role', 'Classification'],
        rows: [
          ['DPS', 'Damage'],
          ['Heal', 'Healing'],
          ['Support', 'Support'],
          ['Break', 'Break'],
          ['Regen', 'Regeneration'],
        ],
      },
      {
        t: 'p',
        c: 'Compare evolution, habitats, traits and skills in each Dex entry, then verify performance in the live version.',
      },
      { t: 'quote', c: 'This is a functional selection guide, not a launch tier list.' },
    ],
  },
  'aniimo-launch-watchlist': {
    title: 'Aniimo Launch Watchlist: 12 Creatures with Rich Official Data',
    subtitle:
      'A transparent shortlist based on mobility, habitats, forms, evolution, traits and skills.',
    tag: 'Watchlist',
    lead: 'These entries contain rich official functional data. Inclusion does not mean stronger, rarer or harder to obtain.',
    body: [
      { t: 'h', c: 'How this watchlist is selected' },
      {
        t: 'p',
        c: 'AniimoDex counts published habitats, mobility, traits, skills, forms and evolution branches. It does not use hidden combat scores or community tier claims.',
      },
      { t: 'h', c: 'Launch watchlist' },
      { t: 'table', head: ['Dex', 'Family', 'Published reason'], rows: commonWatchlist },
      {
        t: 'quote',
        c: 'Watchlist means rich official information, not S-tier, rare or mandatory to build.',
      },
    ],
  },
};

function localized(locale: string, guide: LaunchGuide): LaunchGuide {
  if (locale === 'en') return guide;
  const traditional = locale === 'zh-Hant';
  if (guide === english['aniimo-launch-checklist-known-issues']) {
    return traditional
      ? {
          title: 'Aniimo 伊莫已知問題：登入、閃退、進度與連線',
          subtitle: '區分已核驗平台資訊、安全排查步驟與尚未證實的問題報告。',
          tag: '已知問題',
          lead: '當 Aniimo 無法啟動、連線或正確保存進度時，請從這裡開始。AniimoDex 不會把單一貼文寫成已確認 Bug；下列每個分類都說明目前可核驗的資訊、安全排查方式與仍缺少的證據。',
          body: [
            { t: 'h', c: '目前可玩狀態' },
            {
              t: 'table',
              head: ['平台', '已核驗狀態', '核驗日期'],
              rows: [
                ['官方 PC 啟動器', '官網可下載', '9 月 18 日'],
                ['Steam', 'Windows 版已發行並免費遊玩', '9 月 16 日'],
                ['Xbox Series X|S', '免費本體與取得操作已開放', '9 月 16 日'],
                ['PS5', '公布的發行時間已過；可用性可能因地區商店而異', '9 月 14 日'],
                ['iPhone / iPad', 'App Store 標示 9 月 23 日', '9 月 15 日'],
                ['Android', '已有官方條目；尚未確認發行日期', '9 月 18 日'],
              ],
            },
            { t: 'h', c: '登入、伺服器或連線問題' },
            {
              t: 'p',
              c: '已登記的官方來源目前沒有公開完整的中斷清單或通用登入修復方法。請先確認地區與伺服器、重啟官方客戶端、查看商店或官網維護通知，並在重新安裝前記錄完整錯誤訊息。',
            },
            { t: 'h', c: '遊戲無法啟動、閃退或效能不佳' },
            {
              t: 'p',
              c: '官方已公開 PC 配置需求，但已登記來源沒有確認一個影響所有 PC 的單一閃退或效能問題。請對照官方配置與可用空間、由官方啟動器或商店更新，並先用預設顯示設定測試。',
            },
            { t: 'h', c: '任務或進度疑似卡住' },
            {
              t: 'p',
              c: 'AniimoDex 目前沒有官方來源確認通用的任務卡關或安全跳過方法。不要因單一報告刪除角色或覆蓋存檔。記錄任務名稱、目標、平台、伺服器、版本與重現步驟，再查看官方支援或維護通知。',
            },
            { t: 'h', c: '多人或跨平台無法使用' },
            {
              t: 'p',
              c: 'Steam 列出跨平台多人，但目前的官方來源沒有說明每一種平台組合、活動、帳號連結步驟或跨平台存檔規則。請先確認雙方遊戲版本與活動相容，不要立即將邀請失敗寫成全域 Bug。',
            },
            { t: 'h', c: '存檔、帳號或購買進度不正確' },
            {
              t: 'p',
              c: '跨平台存檔、進度共享與付費轉移尚未在已登記官方來源中完整說明。在確認平台收據、伺服器、帳號與角色前，請勿解除帳號連結或重複購買；帳號復原應聯絡官方支援。',
            },
            { t: 'h', c: '什麼才算已確認的問題？' },
            {
              t: 'table',
              head: ['證據', 'AniimoDex 標記'],
              rows: [
                ['官方公告或補丁說明', '官方確認'],
                ['附版本、平台與步驟的可重複測試', '已重現測試'],
                ['多篇社群報告但無可重現證據', '僅社群報告'],
                ['單一貼文、截圖或搜尋摘要', '不列為已確認問題'],
              ],
            },
            {
              t: 'quote',
              c: '內容最後檢查：2026 年 9 月 20 日。有效的問題報告應包含平台、地區、伺服器、版本、時間、完整錯誤與重現步驟。',
            },
          ],
        }
      : {
          title: 'Aniimo 伊莫已知问题：登录、闪退、进度与联机',
          subtitle: '区分已核验平台信息、安全排查步骤与尚未证实的问题报告。',
          tag: '已知问题',
          lead: '当 Aniimo 无法启动、联机或正确保存进度时，请从这里开始。AniimoDex 不会把单一帖子写成已确认 Bug；下列每个分类都说明目前可核验的信息、安全排查方式与仍缺少的证据。',
          body: [
            { t: 'h', c: '当前可玩状态' },
            {
              t: 'table',
              head: ['平台', '已核验状态', '核验日期'],
              rows: [
                ['官方 PC 启动器', '官网可下载', '9 月 18 日'],
                ['Steam', 'Windows 版已发行并免费游玩', '9 月 16 日'],
                ['Xbox Series X|S', '免费本体与获取操作已开放', '9 月 16 日'],
                ['PS5', '公布的发行时间已过；可用性可能因地区商店而异', '9 月 14 日'],
                ['iPhone / iPad', 'App Store 标注 9 月 23 日', '9 月 15 日'],
                ['Android', '已有官方条目；尚未确认发行日期', '9 月 18 日'],
              ],
            },
            { t: 'h', c: '登录、服务器或连接问题' },
            {
              t: 'p',
              c: '已登记的官方来源目前没有公布完整的中断清单或通用登录修复方法。请先确认地区与服务器、重启官方客户端、查看商店或官网维护通知，并在重新安装前记录完整错误信息。',
            },
            { t: 'h', c: '游戏无法启动、闪退或性能不佳' },
            {
              t: 'p',
              c: '官方已公布 PC 配置要求，但已登记来源没有确认一个影响所有 PC 的单一闪退或性能问题。请对照官方配置与可用空间、由官方启动器或商店更新，并先用默认显示设置测试。',
            },
            { t: 'h', c: '任务或进度疑似卡住' },
            {
              t: 'p',
              c: 'AniimoDex 目前没有官方来源确认通用的任务卡关或安全跳过方法。不要因单一报告删除角色或覆盖存档。记录任务名称、目标、平台、服务器、版本与重现步骤，再查看官方支持或维护通知。',
            },
            { t: 'h', c: '多人或跨平台无法使用' },
            {
              t: 'p',
              c: 'Steam 列出跨平台多人，但目前的官方来源没有说明每一种平台组合、活动、账号绑定步骤或跨平台存档规则。请先确认双方游戏版本与活动相容，不要立即将邀请失败写成全局 Bug。',
            },
            { t: 'h', c: '存档、账号或购买进度不正确' },
            {
              t: 'p',
              c: '跨平台存档、进度共享与付费转移尚未在已登记官方来源中完整说明。在确认平台收据、服务器、账号与角色前，请勿解除账号绑定或重复购买；账号恢复应联系官方支持。',
            },
            { t: 'h', c: '什么才算已确认的问题？' },
            {
              t: 'table',
              head: ['证据', 'AniimoDex 标记'],
              rows: [
                ['官方公告或补丁说明', '官方确认'],
                ['附版本、平台与步骤的可重复测试', '已重现测试'],
                ['多条社区报告但无可重现证据', '仅社区报告'],
                ['单一帖子、截图或搜索摘要', '不列为已确认问题'],
              ],
            },
            {
              t: 'quote',
              c: '内容最后检查：2026 年 9 月 20 日。有效的问题报告应包含平台、地区、服务器、版本、时间、完整错误与重现步骤。',
            },
          ],
        };
  }
  const map: Record<string, [string, string, string]> = {
    'aniimo-crossplay-cross-save': [
      traditional
        ? 'Aniimo 支援跨平台連線和跨平台存檔嗎？'
        : 'Aniimo 支持跨平台联机和跨平台存档吗？',
      traditional
        ? '官方列出跨平台多人；具體平台組合、跨平台存檔與進度互通仍待確認。'
        : '官方列出跨平台多人；具体平台组合、跨平台存档与进度互通仍待确认。',
      traditional ? '跨平台' : '跨平台',
    ],
    'aniimo-pre-registration': [
      traditional ? 'Aniimo 上線後預約獎勵與資格查詢' : 'Aniimo 上线后预约奖励与资格查询',
      traditional
        ? '查詢上線後的預約入口、獎勵資格和領取狀態，避免依賴過期活動說法。'
        : '查询上线后的预约入口、奖励资格和领取状态，避免依赖过期活动说法。',
      traditional ? '首發獎勵' : '首发奖励',
    ],
    'aniimo-face-data-import': [
      traditional
        ? 'Aniimo 捏臉資料匯入：目前核驗狀態與安全檢查'
        : 'Aniimo 捏脸数据导入：当前核验状态与安全检查',
      traditional
        ? '官方步驟尚未公開時，先確認可核驗資訊並避免不安全的第三方檔案。'
        : '官方步骤尚未公开时，先确认可核验信息并避免不安全的第三方文件。',
      traditional ? '角色建立' : '角色创建',
    ],
    'aniimo-launch-checklist-known-issues': [
      traditional
        ? 'Aniimo 伊莫已知問題：登入、閃退、進度與連線'
        : 'Aniimo 伊莫已知问题：登录、闪退、进度与联机',
      traditional
        ? '區分已核驗平台資訊、安全排查步驟與尚未證實的問題報告。'
        : '区分已核验平台信息、安全排查步骤与尚未证实的问题报告。',
      traditional ? '已知問題' : '已知问题',
    ],
    'aniimo-choose-by-mobility-role': [
      traditional ? '如何按移動能力和戰鬥定位選擇伊莫' : '如何按移动能力和战斗定位选择伊莫',
      traditional
        ? '使用官方移動能力與定位欄位篩選探索和隊伍功能。'
        : '使用官方移动能力与定位字段筛选探索和队伍功能。',
      traditional ? '選擇指南' : '选择指南',
    ],
    'aniimo-launch-watchlist': [
      traditional ? 'Aniimo 首發值得關注的 12 隻伊莫' : 'Aniimo 首发值得关注的 12 只伊莫',
      traditional ? '根據官方功能資料建立的透明清單。' : '根据官方功能资料建立的透明清单。',
      traditional ? '關注清單' : '关注清单',
    ],
  };
  const [title, subtitle, tag] = map[Object.keys(english).find((key) => english[key] === guide)!];
  return { ...guide, title, subtitle, tag };
}

export function getLaunchGuide(locale: string, slug: string): LaunchGuide | undefined {
  const guide = english[slug];
  return guide ? localized(locale, guide) : undefined;
}

export const launchGuideSlugs = Object.keys(english);
