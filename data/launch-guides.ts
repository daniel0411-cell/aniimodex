export type LaunchGuideBlock =
  | { t: 'p' | 'h' | 'li' | 'quote'; c: string }
  | { t: 'table'; head: string[]; rows: string[][] };

type LaunchGuide = { title: string; subtitle: string; tag: string; lead: string; body: LaunchGuideBlock[] };

const commonWatchlist = [
  ['#003', 'Emberpup', 'Hustle, skills, forms and evolution'], ['#009', 'Chirpi', 'Take Off, branches and skills'],
  ['#019', 'Nimbi', 'Cloudwalk, forms, skills and branches'], ['#012', 'Iris', 'Blooming and multiple forms'],
  ['#029', 'Flutternym', 'Habitats, skills and forms'], ['#043', 'Wisptis', 'Cloak, skills, forms and branches'],
  ['#001', 'Emberpup', 'Habitats, Hustle and family data'], ['#007', 'Chirpi', 'Habitats and branching evolution'],
  ['#022', 'Hummin', 'Luminous Seed, skills and forms'], ['#024', 'Budclaw', 'Tunnel, habitats, forms and branches'],
  ['#035', 'Budsquire', 'Skills, forms and evolution'], ['#080', 'Bulbly', 'Glow, skills and forms'],
];

const english: Record<string, LaunchGuide> = {
  'aniimo-launch-checklist-known-issues': { title: 'Aniimo Launch Checklist and Known-Issue Verification', subtitle: 'A fact-checked checklist for downloads, PC requirements, accounts, controls and launch reports.', tag: 'Launch checklist', lead: 'Use this checklist before starting Aniimo. Official requirements and community reports that still need verification are kept separate.', body: [{t:'h',c:'Before you launch Aniimo'},{t:'li',c:'Download only from the official website, Steam, PlayStation Store or Xbox Store'},{t:'li',c:'Confirm region, account and server before creating a character'},{t:'li',c:'On PC, allow 30 GB and compare your hardware with the official requirements'},{t:'li',c:'Check language, audio, display and controller settings before progressing'},{t:'h',c:'Current verified platform status'},{t:'table',head:['Platform','Status'],rows:[['Official PC launcher','Download available'],['Steam','Released and free to play'],['Xbox','Free base game available'],['PS5','Check the regional store'],['iOS','App Store lists September 23'],['Android','Timing unconfirmed']]},{t:'h',c:'How are launch problems handled?'},{t:'p',c:'Login, progress, update, controller and crash reports remain community reports until an official notice or reproducible test establishes their scope.'},{t:'quote',c:'A useful report includes platform, region, server, version, time, exact error and reproduction steps.'}] },
  'aniimo-choose-by-mobility-role': { title: 'How to Choose Aniimo by Mobility Ability and Combat Role', subtitle: 'Use official mobility and role fields to shortlist Aniimo for exploration and team functions.', tag: 'Selection guide', lead: 'Mobility describes field interaction and role describes combat function. Neither field is a strength ranking.', body: [{t:'h',c:'Choose by exploration ability'},{t:'table',head:['Mobility','Example family','Utility'],rows:[['Hustle','Emberpup','Movement'],['Take Off','Chirpi','Aerial mobility'],['Cloudwalk','Nimbi','Cloud traversal'],['Cloak','Wisptis','Stealth'],['Tunnel','Budclaw','Underground interaction'],['Glow','Bulbly','Light utility']]},{t:'h',c:'Choose by combat role'},{t:'table',head:['Role','Classification'],rows:[['DPS','Damage'],['Heal','Healing'],['Support','Support'],['Break','Break'],['Regen','Regeneration']]},{t:'p',c:'Compare evolution, habitats, traits and skills in each Dex entry, then verify performance in the live version.'},{t:'quote',c:'This is a functional selection guide, not a launch tier list.'}] },
  'aniimo-launch-watchlist': { title: 'Aniimo Launch Watchlist: 12 Creatures with Rich Official Data', subtitle: 'A transparent shortlist based on mobility, habitats, forms, evolution, traits and skills.', tag: 'Watchlist', lead: 'These entries contain rich official functional data. Inclusion does not mean stronger, rarer or harder to obtain.', body: [{t:'h',c:'How this watchlist is selected'},{t:'p',c:'AniimoDex counts published habitats, mobility, traits, skills, forms and evolution branches. It does not use hidden combat scores or community tier claims.'},{t:'h',c:'Launch watchlist'},{t:'table',head:['Dex','Family','Published reason'],rows:commonWatchlist},{t:'quote',c:'Watchlist means rich official information, not S-tier, rare or mandatory to build.'}] },
};

function localized(locale: string, guide: LaunchGuide): LaunchGuide {
  if (locale === 'en') return guide;
  const traditional = locale === 'zh-Hant';
  const map: Record<string, [string, string, string]> = {
    'aniimo-launch-checklist-known-issues': [traditional ? 'Aniimo 伊莫首發檢查與已知問題核驗指南' : 'Aniimo 伊莫首发检查与已知问题核验指南', traditional ? '核對下載、PC 配置、帳號、手把和首發問題報告。' : '核对下载、PC 配置、账号、手柄和首发问题报告。', traditional ? '首發檢查' : '首发检查'],
    'aniimo-choose-by-mobility-role': [traditional ? '如何按移動能力和戰鬥定位選擇伊莫' : '如何按移动能力和战斗定位选择伊莫', traditional ? '使用官方移動能力與定位欄位篩選探索和隊伍功能。' : '使用官方移动能力与定位字段筛选探索和队伍功能。', traditional ? '選擇指南' : '选择指南'],
    'aniimo-launch-watchlist': [traditional ? 'Aniimo 首發值得關注的 12 隻伊莫' : 'Aniimo 首发值得关注的 12 只伊莫', traditional ? '根據官方功能資料建立的透明清單。' : '根据官方功能资料建立的透明清单。', traditional ? '關注清單' : '关注清单'],
  };
  const [title, subtitle, tag] = map[Object.keys(english).find((key) => english[key] === guide)!];
  return { ...guide, title, subtitle, tag };
}

export function getLaunchGuide(locale: string, slug: string): LaunchGuide | undefined {
  const guide = english[slug];
  return guide ? localized(locale, guide) : undefined;
}

export const launchGuideSlugs = Object.keys(english);
