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
    title: 'Is Aniimo Crossplay? Platforms & Cross-Save Status',
    subtitle:
      'Aniimo lists cross-platform multiplayer, but official sources do not yet publish every platform pairing or a cross-save policy.',
    tag: 'Cross-platform',
    lead: 'Aniimo is live on the official PC launcher, Steam, PS5, Xbox, Epic and mobile storefronts linked by its official website. Steam lists cross-platform multiplayer, but that does not confirm every pairing or that saves, purchases and progression move between platforms.',
    body: [
      { t: 'h', c: 'Current platform and crossplay status' },
      {
        t: 'table',
        head: ['Platform', 'Current status', 'Crossplay / account status'],
        rows: [
          ['PC launcher and Steam', 'Available from official routes', 'Cross-platform multiplayer listed; exact pairings not documented'],
          ['PlayStation 5', 'Official store route listed', 'Specific pairing and cross-save status not documented'],
          ['Xbox Series X|S', 'Official store route listed', 'Specific pairing and cross-save status not documented'],
          ['iOS and Android', 'Official mobile download route listed', 'Specific pairing and cross-save status not documented'],
          ['Nintendo Switch', 'Not announced by the official sources checked', 'No crossplay or account policy announced'],
        ],
      },
      { t: 'h', c: 'Does Aniimo support crossplay?' },
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
      { t: 'h', c: 'Does progress transfer between PC, PS5, Xbox and mobile?' },
      {
        t: 'p',
        c: 'No complete official transfer matrix is published in the registered sources. Do not assume that saves, paid currency, achievements or rewards move between stores simply because multiplayer is cross-platform.',
      },
      { t: 'h', c: 'What should players do now?' },
      {
        t: 'p',
        c: 'Use one primary platform until Pawprint Studio publishes account-linking details. Verify any linking prompt inside the official game or support documentation before moving progress or making purchases.',
      },
      {
        t: 'quote',
        c: 'Last official-source check: September 26, 2026. Status labels describe the linked official routes, not a promise that every country, account or device can access the same store listing.',
      },
    ],
  },
  'aniimo-progress-account-safety': {
    title: 'Aniimo Progress & Account Safety: What to Do Before You Switch Devices',
    subtitle:
      'A source-checked checklist for missing progress, device changes, reward claims and account recovery without assuming cross-save exists.',
    tag: 'Account safety',
    lead: 'Aniimo has official reports about lost progress, reward claims and switching from PC to mobile, while a complete cross-save and account-transfer policy is still not published. Preserve evidence and verify the exact account, server and character before changing devices, reinstalling or making another purchase.',
    body: [
      { t: 'h', c: 'What should I do if Aniimo progress looks missing?' },
      {
        t: 'p',
        c: 'Do not create over the existing character, unlink an account, reinstall repeatedly or make a replacement purchase first. Record the platform, region, server, character name, approximate last successful login, game version and any error. Keep platform receipts and screenshots, then use the official support route for account-specific recovery.',
      },
      { t: 'h', c: 'Before switching from PC, console or mobile' },
      {
        t: 'table',
        head: ['Check', 'Why it matters'],
        rows: [
          ['Account identity', 'Use the same official account and confirm the sign-in prompt before proceeding'],
          ['Region and server', 'A different region or server can make a character appear absent without proving deletion'],
          ['Character selection', 'Confirm the expected character before starting new-game or tutorial flows'],
          ['Current client version', 'Update through the official launcher or storefront before diagnosing a sync issue'],
          ['Purchase records', 'Keep the storefront receipt; do not repeat a purchase while its delivery state is unclear'],
        ],
      },
      { t: 'h', c: 'Does Aniimo officially confirm cross-save?' },
      {
        t: 'p',
        c: 'No complete official cross-save, cross-progression or paid-currency transfer matrix is registered for this site. Cross-platform multiplayer does not prove that saves, rewards, achievements or purchases move between PC, console and mobile.',
      },
      { t: 'h', c: 'What is officially documented for a PC-to-mobile reward problem?' },
      {
        t: 'p',
        c: 'The September 23 official update says that players unable to claim a Link Without Borders reward after logging in on PC and then immediately on mobile should log in again once. This is a reward-claim workaround, not confirmation of universal cross-save or account transfer.',
      },
      { t: 'h', c: 'What if I am disconnected or see a black or red screen?' },
      {
        t: 'p',
        c: 'Official patch notes acknowledge frequent disconnects and reconnections, plus black-screen and red-screen reports. For a black screen, update the graphics driver, try switching between DX11 and DX12, and disable DLSS and Frame Generation on the login screen. For a red screen, the official temporary workaround is to set graphics quality to Performance mode. These steps address display and connection reports, not missing-account recovery.',
      },
      { t: 'h', c: 'What should a useful support report include?' },
      {
        t: 'li',
        c: 'Platform, storefront account, region, server, character name and game version',
      },
      {
        t: 'li',
        c: 'The time the problem began, exact error text and steps that reproduce it',
      },
      {
        t: 'li',
        c: 'Screenshots or video, plus original purchase receipts when a reward or purchase is involved',
      },
      {
        t: 'quote',
        c: 'Last official-source check: September 28, 2026. This guide avoids claiming that a particular action restores progress, because recovery depends on the affected account and official support verification.',
      },
    ],
  },
  'aniimo-pre-registration': {
    title: 'Aniimo Pre-Registration Rewards: Post-Launch Eligibility & Status',
    subtitle:
      'Aniimo is live. Check current reward eligibility and claim conditions instead of treating old pre-registration information as a new-player download route.',
    tag: 'Launch rewards',
    lead: 'Aniimo has launched, and its official site still displays global-launch rewards and completed pre-registration milestones. That display does not establish a universal claim deadline, account entitlement or regional availability, so use the official game and storefront for your own account.',
    body: [
      { t: 'h', c: 'Is pre-registration still open?' },
      {
        t: 'p',
        c: 'Aniimo is already live. New players should use the official download or store pages rather than treat pre-registration as the route to access the game. The official website still presents launch rewards and milestone rewards, but it does not publish one universal post-launch eligibility or claim deadline.',
      },
      { t: 'h', c: 'What rewards are still visible on the official site?' },
      {
        t: 'p',
        c: 'The official website currently shows four completed global pre-registration milestones and launch-reward categories such as a selected rare Shiny Aniimo, capture items, a limited Aniimo egg, milestone items and four free outfits. The site also says in-game events control the specific content, so these labels do not guarantee delivery to every account.',
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
      {
        t: 'quote',
        c: 'Last official-source check: September 26, 2026. Rewards and availability can vary by game version, region, platform and account; only the current official in-game notice or campaign terms can confirm a claim.',
      },
    ],
  },
  'aniimo-mobile': {
    title: 'Aniimo Mobile Is Live: iOS and Android Download Status',
    subtitle:
      'Version 1.1 launched Aniimo globally on mobile on September 23; local store, account and device availability can still differ.',
    tag: 'Mobile',
    lead: 'Aniimo officially launched globally on mobile after the September 23 version 1.1 update. Use the official App Store or Google Play listing for your country and device, because a global launch announcement does not guarantee identical storefront buttons or compatibility everywhere.',
    body: [
      { t: 'h', c: 'Is Aniimo available on mobile now?' },
      {
        t: 'p',
        c: 'Yes. The official version 1.1 announcement says Aniimo launched globally on mobile platforms after the September 23 maintenance. The China App Store and US Google Play listings were also directly available when checked.',
      },
      { t: 'h', c: 'Mobile status at a glance' },
      {
        t: 'table',
        head: ['Item', 'Verified status'],
        rows: [
          [
            'Global mobile launch',
            'Officially announced for September 23 after version 1.1 maintenance',
          ],
          ['iPhone and iPad', 'China App Store listing verified; check your local storefront'],
          [
            'Android',
            'US Google Play Install action verified; check your local account and device',
          ],
          ['In-game mail', 'Compensation is scheduled for delivery through in-game mail; check its current in-game status'],
          ['Cross-save and progression', 'No complete official policy in the registered sources'],
        ],
      },
      { t: 'h', c: 'Why might the download button still be missing?' },
      {
        t: 'p',
        c: 'Store rollout, country, account region, age settings and device compatibility can still affect what you see. Open the official listing with the account and device you intend to use; do not install a third-party APK or modified client.',
      },
      { t: 'h', c: 'What are the verified iOS requirements?' },
      {
        t: 'p',
        c: 'The China App Store listing shows iOS 15.0 or later, a 3.7 GB listing size and support for iPhone and iPad. Those listing details do not prove every device will deliver the same performance.',
      },
      { t: 'h', c: 'Does mobile share progress with PC and console?' },
      {
        t: 'p',
        c: 'The registered official sources still do not publish a complete cross-save, cross-progression, purchase or paid-currency transfer policy. Treat community reports as unconfirmed until an official account policy is available.',
      },
      {
        t: 'quote',
        c: 'Last official-source check: September 26, 2026. Mobile is officially launched; storefront and device availability must still be checked locally.',
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
    title: 'Aniimo Known Issues & Fixes: Login, Rewards, Android and Progress',
    subtitle:
      'Official September 23 issue status and workarounds for reward claims, Android quest freezes, platform switching and connection problems.',
    tag: 'Known issues',
    lead: 'Aniimo servers are live after the September 23 version 1.1 maintenance. This page lists only the issues and workarounds published in the official notice; other launch reports stay unconfirmed until an official update or reproducible test supports them.',
    body: [
      { t: 'h', c: 'September 23 official service status' },
      {
        t: 'table',
        head: ['Item', 'Official status'],
        rows: [
          ['Servers', 'Live after version 1.1 maintenance'],
          ['Mobile launch', 'Officially launched globally after the update'],
          ['Opening delay', 'Server opening delayed by five minutes, then opened'],
          ['Compensation', '500 Glimmers maintenance + 500 Glimmers delay + 1 Sparkling Cube known issues'],
          ['Delivery route', 'Sent through in-game mail; check current mail availability in-game'],
        ],
      },
      { t: 'h', c: 'Officially listed issues and workarounds' },
      {
        t: 'table',
        head: ['Issue', 'Affected scope', 'Official workaround or status'],
        rows: [
          ['Reward mail claim error', 'Some players', 'Official notice lists the issue; check in-game mail and current notices'],
          ['"Stars and Knight" side quest freeze', 'Some Android devices', 'Use Performance mode or disable shadows; the upper-right option can skip the scene'],
          ['Moonlit Fox ground-effect display', 'Some situations', 'Officially acknowledged; no player workaround published'],
          ['Link Without Borders reward cannot be clicked', 'Event reward screen', 'Click the blank area on the left to claim'],
          ['Link Without Borders reward after PC-to-mobile switch', 'PC then immediate mobile login', 'Log in again once to restore reward claiming'],
          ['Home visual blocks or outlines on mobile', 'Mobile Home entry', 'Official notice marks this as fixed'],
        ],
      },
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
          [
            'iPhone and iPad',
            'Available in the China App Store; other regions may differ',
            'September 23',
          ],
          [
            'Android',
            'Install shown in the US Google Play listing; availability may vary',
            'September 22',
          ],
        ],
      },
      { t: 'h', c: 'Login, server or connection problems' },
      {
        t: 'p',
        c: 'The official announcement says all servers are live after maintenance, while earlier official patch notes acknowledge frequent disconnects and reconnections. Restart the official client to obtain the latest build, confirm the correct region and server, and record the exact error before reinstalling. A reconnect issue alone does not prove that progress was deleted.',
      },
      { t: 'h', c: 'Game will not launch, crashes or runs poorly' },
      {
        t: 'p',
        c: 'Official patch notes list black-screen and red-screen reports. For a black screen, update the graphics driver, try switching between DX11 and DX12, and disable DLSS and Frame Generation on the login screen. For a red screen, the official temporary workaround is Performance mode. Compare your hardware and free storage with the official requirements before changing files or using third-party tools.',
      },
      { t: 'h', c: 'Quest or progression appears stuck' },
      {
        t: 'p',
        c: 'For the Android "Stars and Knight" side quest, the official notice advises Performance mode, disabling shadows, or using the upper-right option to skip the scene. For every other quest, AniimoDex has no official universal safe skip: do not delete a character or overwrite a save based on an isolated report.',
      },
      { t: 'h', c: 'Multiplayer or cross-platform play does not work' },
      {
        t: 'p',
        c: 'Steam lists cross-platform multiplayer, but the official sources checked here do not document every platform pairing, activity, account-linking step or cross-save rule. Confirm that both players use the same game version and compatible activity before treating a failed invite as a confirmed global bug.',
      },
      { t: 'h', c: 'Save, account or purchase progress looks wrong' },
      {
        t: 'p',
        c: 'Cross-save, cross-progression and purchase transfer are not fully documented in the registered official sources. Avoid unlinking accounts or repeating a purchase until the platform receipt, server, account and character are confirmed. See the Progress & Account Safety guide for an evidence-preserving checklist before contacting official support.',
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
        c: 'Last official-source review: September 28, 2026. A useful report includes platform, region, server, version, time, exact error and reproduction steps.',
      },
    ],
  },
  'aniimo-version-1-1-update': {
    title: 'Aniimo 1.1 Patch Notes: S1 Events, Compensation & New Modes',
    subtitle:
      'Official September 23 update details: maintenance compensation, mobile launch, Irisalis, Egg Heist Chaos Mode and S1 events.',
    tag: 'Version 1.1',
    lead: 'Aniimo version 1.1 completed maintenance on September 23, 2026. The official notice says servers are live after a five-minute opening delay, lists compensation, and introduces mobile access, S1 activities and new modes.',
    body: [
      { t: 'h', c: 'Current server and compensation status' },
      {
        t: 'table',
        head: ['Status', 'Official detail'],
        rows: [
          ['Servers', 'Live after September 23 maintenance'],
          ['Mobile platforms', 'Global launch followed the version 1.1 update'],
          ['Opening', 'Five-minute delay, then servers opened'],
          ['Maintenance compensation', '500 Glimmers; players registered before 1.1'],
          ['Opening-delay compensation', '500 Glimmers'],
          ['Known-issue compensation', '1 Sparkling Cube'],
        ],
      },
      { t: 'h', c: "Windchaser's Departure and Irisalis" },
      {
        t: 'p',
        c: "The Irisalis Legendary Journey runs from September 25 at 10:00 to December 10 at 07:59 (UTC+8) and unlocks at Student I. Players collect weekly-limited Iris Petals to craft the Legendary Aniipod: Irisalis. The seasonal Windchaser's Departure Aniipod is described as guaranteeing capture, Perfect Innate Potential, Sparkling Form and exclusive seasonal perks.",
      },
      { t: 'h', c: 'New gameplay modes' },
      {
        t: 'table',
        head: ['Mode', 'Schedule and requirement'],
        rows: [
          [
            'Holo-Battle Interlink',
            'Thursday 04:00 to Monday 03:59 weekly; Trailblazer I; four-player or AI teammates',
          ],
          [
            'Egg Heist Chaos Mode',
            'Unlocks September 24 at 04:00; requires Elite Egg Seeker Tier IV and a Chaos Ticket',
          ],
        ],
      },
      { t: 'h', c: 'Time-limited event calendar' },
      {
        t: 'table',
        head: ['Event', 'Official period (UTC+8)'],
        rows: [
          ['Glamour Star', 'Sep 25 04:00 - Oct 2 03:59'],
          ['Aniimo Discovery', 'Sep 25 04:00 - Oct 9 03:59'],
          ['Vein Abundance: Rosetower Woods', 'Sep 28 04:00 - Oct 5 03:59'],
          ['Vein Abundance: Berylline Vale', 'Oct 5 04:00 - Oct 12 03:59'],
          ['Journey Chronicles', 'Oct 1 04:00 - Oct 29 03:59'],
        ],
      },
      { t: 'h', c: 'Quality-of-life changes worth knowing' },
      { t: 'li', c: 'A Pathfinder voiceover toggle was added under Settings > Audio > Balance.' },
      { t: 'li', c: 'Unobtained Sparkling Forms are temporarily hidden in Aniilog.' },
      {
        t: 'li',
        c: 'Companion Mode no longer requires friends to stand face-to-face before an invite.',
      },
      {
        t: 'li',
        c: 'Home interfaces received new shortcuts, controller navigation and build-snapping improvements.',
      },
      { t: 'h', c: 'Official issue workarounds introduced with 1.1' },
      {
        t: 'p',
        c: 'The update notice documents an Android workaround for the "Stars and Knight" side quest freeze: use Performance mode, disable shadows, or skip the scene from the upper-right option. It also says players who cannot claim Link Without Borders rewards after moving from PC to mobile should log in again once.',
      },
      {
        t: 'quote',
        c: 'Last official-source check: September 26, 2026. All times above come from the official announcement and use UTC+8. Event availability still depends on meeting the listed in-game unlock requirement.',
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
                ['iPhone / iPad', '中國區 App Store 已上線；其他地區可能不同', '9 月 23 日'],
                ['Android', '美國區 Google Play 已顯示安裝；可用性可能不同', '9 月 22 日'],
              ],
            },
            { t: 'h', c: '官方列出的問題與處理方式' },
            {
              t: 'table',
              head: ['問題', '影響範圍', '官方處理方式或狀態'],
              rows: [
                ['郵件領取獎勵異常', '部分玩家', '官方已列出問題；請查看遊戲內郵箱和最新公告'],
                ['「星星與騎士」支線卡死', '部分 Android 裝置', '切換效能模式或關閉陰影，也可用右上角選項跳過劇情'],
                ['「月輝狐」地面特效異常', '部分情況', '官方已確認；未公布玩家處理方式'],
                ['「聯結無界」獎勵無法點擊', '活動獎勵畫面', '點擊左側空白區域領取'],
                ['PC 轉手機後無法領取「聯結無界」獎勵', 'PC 後立即手機登入', '重新登入一次即可恢復領取'],
                ['手機進入家園出現方塊或描邊', '手機家園入口', '官方標示已修正'],
              ],
            },
            { t: 'h', c: '登入、伺服器或連線問題' },
            {
              t: 'p',
              c: '官方 1.1 公告稱維護後伺服器已開放，較早的官方補丁也確認過頻繁斷線與重新連線。請先確認地區與伺服器、重啟官方客戶端並記錄完整錯誤訊息，再考慮重新安裝。單純重新連線不代表進度已被刪除。',
            },
            { t: 'h', c: '遊戲無法啟動、閃退或效能不佳' },
            {
              t: 'p',
              c: '官方補丁列出黑屏與紅屏問題。黑屏時，更新顯示卡驅動、在 DX11 和 DX12 間切換，並在登入畫面關閉 DLSS 和畫格生成；紅屏暫可切換到效能模式。請先對照官方配置與可用空間，不要修改遊戲檔案或使用第三方工具。',
            },
            { t: 'h', c: '任務或進度疑似卡住' },
            {
              t: 'p',
              c: '針對 Android「星星與騎士」支線，官方建議切換效能模式、關閉陰影，或以右上角選項跳過劇情。其他任務目前沒有官方通用安全跳過方式；不要因單一報告刪除角色或覆蓋存檔。',
            },
            { t: 'h', c: '多人或跨平台無法使用' },
            {
              t: 'p',
              c: 'Steam 列出跨平台多人，但目前的官方來源沒有說明每一種平台組合、活動、帳號連結步驟或跨平台存檔規則。請先確認雙方遊戲版本與活動相容，不要立即將邀請失敗寫成全域 Bug。',
            },
            { t: 'h', c: '存檔、帳號或購買進度不正確' },
            {
              t: 'p',
              c: '跨平台存檔、進度共享與付費轉移尚未在已登記官方來源中完整說明。在確認平台收據、伺服器、帳號與角色前，請勿解除帳號連結或重複購買；請參考「進度與帳號安全」頁先保留證據，再聯絡官方支援。',
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
              c: '內容最後檢查：2026 年 9 月 28 日。有效的問題報告應包含平台、地區、伺服器、版本、時間、完整錯誤與重現步驟。',
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
                ['iPhone / iPad', '中国区 App Store 已上线；其他地区可能不同', '9 月 23 日'],
                ['Android', '美国区 Google Play 已显示安装；可用性可能不同', '9 月 22 日'],
              ],
            },
            { t: 'h', c: '官方列出的问题与处理方式' },
            {
              t: 'table',
              head: ['问题', '影响范围', '官方处理方式或状态'],
              rows: [
                ['邮件领取奖励异常', '部分玩家', '官方已列出问题；请查看游戏内邮箱和最新公告'],
                ['“星星与骑士”支线卡死', '部分 Android 设备', '切换性能模式或关闭阴影，也可用右上角选项跳过剧情'],
                ['“月辉狐”地面特效异常', '部分情况', '官方已确认；未公布玩家处理方式'],
                ['“联结无界”奖励无法点击', '活动奖励界面', '点击左侧空白区域领取'],
                ['PC 转手机后无法领取“联结无界”奖励', 'PC 后立即手机登录', '重新登录一次即可恢复领取'],
                ['手机进入家园出现方块或描边', '手机家园入口', '官方标示已修复'],
              ],
            },
            { t: 'h', c: '登录、服务器或连接问题' },
            {
              t: 'p',
              c: '官方 1.1 公告称维护后服务器已开放，较早的官方补丁也确认过频繁断线与重新连接。请先确认地区与服务器、重启官方客户端并记录完整错误信息，再考虑重新安装。单纯重新连接不代表进度已被删除。',
            },
            { t: 'h', c: '游戏无法启动、闪退或性能不佳' },
            {
              t: 'p',
              c: '官方补丁列出黑屏与红屏问题。黑屏时，更新显卡驱动、在 DX11 和 DX12 间切换，并在登录画面关闭 DLSS 和帧生成；红屏暂可切换到性能模式。请先对照官方配置与可用空间，不要修改游戏文件或使用第三方工具。',
            },
            { t: 'h', c: '任务或进度疑似卡住' },
            {
              t: 'p',
              c: '针对 Android“星星与骑士”支线，官方建议切换性能模式、关闭阴影，或以右上角选项跳过剧情。其他任务目前没有官方通用安全跳过方式；不要因单一报告删除角色或覆盖存档。',
            },
            { t: 'h', c: '多人或跨平台无法使用' },
            {
              t: 'p',
              c: 'Steam 列出跨平台多人，但目前的官方来源没有说明每一种平台组合、活动、账号绑定步骤或跨平台存档规则。请先确认双方游戏版本与活动相容，不要立即将邀请失败写成全局 Bug。',
            },
            { t: 'h', c: '存档、账号或购买进度不正确' },
            {
              t: 'p',
              c: '跨平台存档、进度共享与付费转移尚未在已登记官方来源中完整说明。在确认平台收据、服务器、账号与角色前，请勿解除账号绑定或重复购买；请参考“进度与账号安全”页先保留证据，再联系官方支持。',
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
              c: '内容最后检查：2026 年 9 月 28 日。有效的问题报告应包含平台、地区、服务器、版本、时间、完整错误与重现步骤。',
            },
          ],
        };
  }
  if (guide === english['aniimo-version-1-1-update']) {
    return traditional
      ? {
          title: 'Aniimo 1.1 版本更新：S1 活動、補償與新模式',
          subtitle: '整理 9 月 23 日官方更新：維護補償、行動端上線、Irisalis、Egg Heist 混沌模式與 S1 活動。',
          tag: '1.1 版本',
          lead: 'Aniimo 1.1 版本已於 2026 年 9 月 23 日完成維護。官方公告表示，伺服器在延遲 5 分鐘後已開放，並列出補償、行動端入口、S1 活動與新模式。',
          body: [
            { t: 'h', c: '目前伺服器與補償狀態' },
            {
              t: 'table',
              head: ['項目', '官方狀態'],
              rows: [
                ['伺服器', '9 月 23 日維護後已開放'],
                ['行動端', '1.1 更新後全球上線'],
                ['開服', '延遲 5 分鐘後開放'],
                ['維護補償', '輝石 ×500；1.1 前完成註冊的玩家'],
                ['延遲開服補償', '輝石 ×500'],
                ['已知問題補償', '閃耀立方 ×1'],
              ],
            },
            { t: 'h', c: "Windchaser's Departure 與 Irisalis" },
            {
              t: 'p',
              c: 'Irisalis 傳說旅程於 9 月 25 日 10:00 至 12 月 10 日 07:59（UTC+8）開放，需達 Student I。玩家可收集每週有限的 Iris Petals 製作對應 Legendary Aniipod。',
            },
            { t: 'h', c: '新玩法模式' },
            {
              t: 'table',
              head: ['模式', '時間與條件'],
              rows: [
                [
                  'Holo-Battle Interlink',
                  '每週四 04:00 至週一 03:59；Trailblazer I；4 人或 AI 隊友',
                ],
                [
                  'Egg Heist Chaos Mode',
                  '9 月 24 日 04:00 開放；需 Elite Egg Seeker Tier IV 及 Chaos Ticket',
                ],
              ],
            },
            { t: 'h', c: '限時活動時間表' },
            {
              t: 'table',
              head: ['活動', '官方時間（UTC+8）'],
              rows: [
                ['Glamour Star', '9/25 04:00 - 10/2 03:59'],
                ['Aniimo Discovery', '9/25 04:00 - 10/9 03:59'],
                ['Vein Abundance: Rosetower Woods', '9/28 04:00 - 10/5 03:59'],
                ['Vein Abundance: Berylline Vale', '10/5 04:00 - 10/12 03:59'],
                ['Journey Chronicles', '10/1 04:00 - 10/29 03:59'],
              ],
            },
            { t: 'h', c: '值得注意的便利性更新' },
            { t: 'li', c: '設定 > 音效 > 平衡新增主角語音開關。' },
            { t: 'li', c: 'Aniilog 暫時隱藏尚未取得的 Sparkling Forms。' },
            { t: 'li', c: 'Companion Mode 邀請不再需要與朋友面對面站立。' },
            { t: 'li', c: '家園介面新增快捷入口，並改善控制器導覽與建造吸附顯示。' },
            { t: 'h', c: '1.1 同步公告的問題處理方式' },
            { t: 'p', c: 'Android「星星與騎士」支線卡死時，可切換效能模式、關閉陰影，或以右上角選項跳過劇情。PC 轉手機後無法領取「聯結無界」獎勵時，官方建議重新登入一次。' },
            { t: 'quote', c: '官方來源最後核驗：2026 年 9 月 26 日。上述時間均使用 UTC+8；參與活動仍需滿足對應解鎖條件。' },
          ],
        }
      : {
          title: 'Aniimo 1.1 版本更新：S1 活动、补偿与新模式',
          subtitle: '整理 9 月 23 日官方更新：维护补偿、移动端上线、Irisalis、Egg Heist 混沌模式与 S1 活动。',
          tag: '1.1 版本',
          lead: 'Aniimo 1.1 版本已于 2026 年 9 月 23 日完成维护。官方公告表示，服务器在延迟 5 分钟后已开放，并列出补偿、移动端入口、S1 活动与新模式。',
          body: [
            { t: 'h', c: '当前服务器与补偿状态' },
            {
              t: 'table',
              head: ['项目', '官方状态'],
              rows: [
                ['服务器', '9 月 23 日维护后已开放'],
                ['移动端', '1.1 更新后全球上线'],
                ['开服', '延迟 5 分钟后开放'],
                ['维护补偿', '辉石 ×500；1.1 前完成注册的玩家'],
                ['延迟开服补偿', '辉石 ×500'],
                ['已知问题补偿', '闪耀立方 ×1'],
              ],
            },
            { t: 'h', c: "Windchaser's Departure 与 Irisalis" },
            {
              t: 'p',
              c: 'Irisalis 传说旅程于 9 月 25 日 10:00 至 12 月 10 日 07:59（UTC+8）开放，需达 Student I。玩家可收集每周有限的 Iris Petals 制作对应 Legendary Aniipod。',
            },
            { t: 'h', c: '新玩法模式' },
            {
              t: 'table',
              head: ['模式', '时间与条件'],
              rows: [
                [
                  'Holo-Battle Interlink',
                  '每周四 04:00 至周一 03:59；Trailblazer I；4 人或 AI 队友',
                ],
                [
                  'Egg Heist Chaos Mode',
                  '9 月 24 日 04:00 开放；需 Elite Egg Seeker Tier IV 及 Chaos Ticket',
                ],
              ],
            },
            { t: 'h', c: '限时活动时间表' },
            {
              t: 'table',
              head: ['活动', '官方时间（UTC+8）'],
              rows: [
                ['Glamour Star', '9/25 04:00 - 10/2 03:59'],
                ['Aniimo Discovery', '9/25 04:00 - 10/9 03:59'],
                ['Vein Abundance: Rosetower Woods', '9/28 04:00 - 10/5 03:59'],
                ['Vein Abundance: Berylline Vale', '10/5 04:00 - 10/12 03:59'],
                ['Journey Chronicles', '10/1 04:00 - 10/29 03:59'],
              ],
            },
            { t: 'h', c: '值得注意的便利性更新' },
            { t: 'li', c: '设置 > 音频 > 平衡新增主角语音开关。' },
            { t: 'li', c: 'Aniilog 暂时隐藏尚未获得的 Sparkling Forms。' },
            { t: 'li', c: 'Companion Mode 邀请不再需要与朋友面对面站立。' },
            { t: 'li', c: '家园界面新增快捷入口，并改善手柄导航与建造吸附显示。' },
            { t: 'h', c: '1.1 同步公告的问题处理方式' },
            { t: 'p', c: 'Android“星星与骑士”支线卡死时，可切换性能模式、关闭阴影，或以右上角选项跳过剧情。PC 转手机后无法领取“联结无界”奖励时，官方建议重新登录一次。' },
            { t: 'quote', c: '官方来源最后核验：2026 年 9 月 26 日。上述时间均使用 UTC+8；参与活动仍需满足对应解锁条件。' },
          ],
        };
  }
  if (guide === english['aniimo-progress-account-safety']) {
    return traditional
      ? {
          title: 'Aniimo 進度與帳號安全：切換裝置前先做什麼',
          subtitle: '針對進度異常、換裝置與獎勵領取的可核驗檢查表，不假定跨平台存檔已支援。',
          tag: '帳號安全',
          lead: '官方曾處理進度遺失、獎勵領取和 PC 轉手機問題，但完整跨平台存檔與帳號轉移政策尚未公開。在換裝置、重裝或再次購買前，先保留證據並確認帳號、伺服器與角色。',
          body: [
            { t: 'h', c: 'Aniimo 進度看起來遺失時該怎麼做？' },
            { t: 'p', c: '先不要覆蓋原有角色、解除帳號連結、反覆重裝或補買。記錄平台、地區、伺服器、角色名稱、最後正常登入時間、遊戲版本與錯誤訊息，保留商店收據和截圖，再透過官方支援處理帳號個案。' },
            { t: 'h', c: '從 PC、主機或手機切換前' },
            { t: 'table', head: ['檢查項目', '原因'], rows: [['帳號身分', '使用同一官方帳號，並先確認登入提示'], ['地區與伺服器', '不同地區或伺服器可能讓角色看起來不存在，不代表已被刪除'], ['角色選擇', '進入新手流程或建立新角色前，先確認原角色'], ['客戶端版本', '先透過官方啟動器或商店更新，再判斷同步問題'], ['購買紀錄', '保留商店收據；交付狀態不明時不要重複購買']] },
            { t: 'h', c: 'Aniimo 已官方確認跨平台存檔嗎？' },
            { t: 'p', c: '尚未。本站已登記官方來源沒有完整的跨平台存檔、進度共享或付費貨幣轉移矩陣。跨平台多人不代表存檔、獎勵、成就或購買一定能在 PC、主機與手機間轉移。' },
            { t: 'h', c: 'PC 轉手機後無法領獎，官方有什麼說明？' },
            { t: 'p', c: '9 月 23 日官方更新表示，先在 PC 登入又立刻在手機登入而無法領取「聯結無界」獎勵時，可重新登入一次。這只是獎勵領取處理方式，不等於已確認所有跨平台存檔或帳號轉移。' },
            { t: 'h', c: '遇到斷線、黑屏或紅屏怎麼辦？' },
            { t: 'p', c: '官方補丁確認過頻繁斷線與重新連線，以及黑屏、紅屏報告。黑屏時，更新顯示卡驅動、在 DX11 和 DX12 間切換，並在登入畫面關閉 DLSS 和畫格生成；紅屏暫時可切換到效能模式。這些步驟處理畫面與連線問題，不是帳號或進度復原保證。' },
            { t: 'h', c: '有效的支援回報應包含什麼？' },
            { t: 'li', c: '平台、商店帳號、地區、伺服器、角色名稱與遊戲版本' },
            { t: 'li', c: '問題開始時間、完整錯誤文字與可重現步驟' },
            { t: 'li', c: '截圖或影片；涉及獎勵或購買時附原始收據' },
            { t: 'quote', c: '官方來源最後核驗：2026 年 9 月 28 日。此頁不會宣稱某個操作必定恢復進度，因為處理結果取決於帳號個案與官方核驗。' },
          ],
        }
      : {
          title: 'Aniimo 进度与账号安全：切换设备前先做什么',
          subtitle: '针对进度异常、换设备与奖励领取的可核验检查表，不假定跨平台存档已支持。',
          tag: '账号安全',
          lead: '官方曾处理进度丢失、奖励领取和 PC 转手机问题，但完整跨平台存档与账号转移政策尚未公开。在换设备、重装或再次购买前，先保留证据并确认账号、服务器与角色。',
          body: [
            { t: 'h', c: 'Aniimo 进度看起来丢失时该怎么做？' },
            { t: 'p', c: '先不要覆盖原有角色、解除账号绑定、反复重装或补买。记录平台、地区、服务器、角色名称、最后正常登录时间、游戏版本与错误信息，保留商店收据和截图，再通过官方支持处理账号个案。' },
            { t: 'h', c: '从 PC、主机或手机切换前' },
            { t: 'table', head: ['检查项目', '原因'], rows: [['账号身份', '使用同一官方账号，并先确认登录提示'], ['地区与服务器', '不同地区或服务器可能让角色看起来不存在，不代表已被删除'], ['角色选择', '进入新手流程或创建新角色前，先确认原角色'], ['客户端版本', '先通过官方启动器或商店更新，再判断同步问题'], ['购买记录', '保留商店收据；交付状态不明时不要重复购买']] },
            { t: 'h', c: 'Aniimo 已官方确认跨平台存档吗？' },
            { t: 'p', c: '尚未。本站已登记官方来源没有完整的跨平台存档、进度共享或付费货币转移矩阵。跨平台多人不代表存档、奖励、成就或购买一定能在 PC、主机与手机间转移。' },
            { t: 'h', c: 'PC 转手机后无法领奖，官方有什么说明？' },
            { t: 'p', c: '9 月 23 日官方更新表示，先在 PC 登录又立刻在手机登录而无法领取“联结无界”奖励时，可重新登录一次。这只是奖励领取处理方式，不等于已确认所有跨平台存档或账号转移。' },
            { t: 'h', c: '遇到断线、黑屏或红屏怎么办？' },
            { t: 'p', c: '官方补丁确认过频繁断线与重新连接，以及黑屏、红屏报告。黑屏时，更新显卡驱动、在 DX11 和 DX12 间切换，并在登录画面关闭 DLSS 和帧生成；红屏暂时可切换到性能模式。这些步骤处理画面与连接问题，不是账号或进度恢复保证。' },
            { t: 'h', c: '有效的支持回报应包含什么？' },
            { t: 'li', c: '平台、商店账号、地区、服务器、角色名称与游戏版本' },
            { t: 'li', c: '问题开始时间、完整错误文字与可重现步骤' },
            { t: 'li', c: '截图或视频；涉及奖励或购买时附原始收据' },
            { t: 'quote', c: '官方来源最后核验：2026 年 9 月 28 日。此页不会宣称某个操作必定恢复进度，因为处理结果取决于账号个案与官方核验。' },
          ],
        };
  }
  if (guide === english['aniimo-mobile']) {
    return traditional
      ? {
          title: 'Aniimo 手機版已上線：iOS 與 Android 下載狀態',
          subtitle:
            '1.1 版本已於 9 月 23 日推動 Aniimo 行動端全球上線；商店、帳號與裝置可用性仍可能不同。',
          tag: '手機版',
          lead: 'Aniimo 已在 9 月 23 日 1.1 版本更新後官方宣布行動端全球上線。請使用當地官方 App Store 或 Google Play 條目；全球上線不代表每個地區、帳號和裝置會顯示相同按鈕。',
          body: [
            { t: 'h', c: 'Aniimo 手機版現在可以玩嗎？' },
            {
              t: 'p',
              c: '可以。官方 1.1 版本公告表示，Aniimo 在 9 月 23 日維護後正式於行動端全球上線。中國區 App Store 與美國區 Google Play 條目也已分別實際核驗。',
            },
            { t: 'h', c: '手機版狀態一覽' },
            {
              t: 'table',
              head: ['項目', '已核驗狀態'],
              rows: [
                ['行動端全球上線', '官方宣布 9 月 23 日 1.1 維護後上線'],
                ['iPhone / iPad', '中國區 App Store 已核驗；請查看當地商店'],
                ['Android', '美國區 Google Play 已核驗安裝按鈕；請查看當地帳號與裝置'],
                ['遊戲內郵件', '補償將透過遊戲內郵件發送；請以遊戲內目前狀態為準'],
                ['跨端存檔與進度', '已登記官方來源仍無完整政策'],
              ],
            },
            { t: 'h', c: '為什麼仍可能看不到下載按鈕？' },
            {
              t: 'p',
              c: '商店推送、國家、帳號地區、年齡設定與裝置相容性仍可能影響顯示。請使用實際遊玩帳號和裝置開啟官方條目，不要安裝第三方 APK 或修改版客戶端。',
            },
            { t: 'h', c: 'iOS 已核驗的要求是什麼？' },
            {
              t: 'p',
              c: '中國區 App Store 列出 iOS 15.0 或更高版本、3.7 GB 商店大小，並支援 iPhone 與 iPad。這些商店資料不能保證每台裝置都有相同效能。',
            },
            { t: 'h', c: '手機版與 PC / 主機進度互通嗎？' },
            {
              t: 'p',
              c: '已登記的官方來源仍未公開完整的跨存檔、跨進度、購買與付費貨幣轉移政策。在官方公開帳號政策前，社群說法仍視為未證實。',
            },
            {
              t: 'quote',
              c: '官方來源最後核驗：2026 年 9 月 26 日。行動端已官方上線，但仍需在當地商店確認裝置可用性。',
            },
          ],
        }
      : {
          title: 'Aniimo 手游已上线：iOS 与 Android 下载状态',
          subtitle:
            '1.1 版本已于 9 月 23 日推动 Aniimo 移动端全球上线；商店、账号与设备可用性仍可能不同。',
          tag: '手游',
          lead: 'Aniimo 已在 9 月 23 日 1.1 版本更新后官方宣布移动端全球上线。请使用当地官方 App Store 或 Google Play 条目；全球上线不代表每个地区、账号和设备会显示相同按钮。',
          body: [
            { t: 'h', c: 'Aniimo 手游现在可以玩吗？' },
            {
              t: 'p',
              c: '可以。官方 1.1 版本公告表示，Aniimo 在 9 月 23 日维护后正式于移动端全球上线。中国区 App Store 与美国区 Google Play 条目也已分别实际核验。',
            },
            { t: 'h', c: '移动端状态一览' },
            {
              t: 'table',
              head: ['项目', '已核验状态'],
              rows: [
                ['移动端全球上线', '官方宣布 9 月 23 日 1.1 维护后上线'],
                ['iPhone / iPad', '中国区 App Store 已核验；请查看当地商店'],
                ['Android', '美国区 Google Play 已核验安装按钮；请查看当地账号与设备'],
                ['游戏内邮件', '补偿将通过游戏内邮件发送；请以游戏内当前状态为准'],
                ['跨端存档与进度', '已登记官方来源仍无完整政策'],
              ],
            },
            { t: 'h', c: '为什么仍可能看不到下载按钮？' },
            {
              t: 'p',
              c: '商店推送、国家、账号地区、年龄设置与设备兼容性仍可能影响显示。请使用实际游玩账号和设备打开官方条目，不要安装第三方 APK 或修改版客户端。',
            },
            { t: 'h', c: 'iOS 已核验的要求是什么？' },
            {
              t: 'p',
              c: '中国区 App Store 列出 iOS 15.0 或更高版本、3.7 GB 商店大小，并支持 iPhone 与 iPad。这些商店资料不能保证每台设备都有相同性能。',
            },
            { t: 'h', c: '手游与 PC / 主机进度互通吗？' },
            {
              t: 'p',
              c: '已登记的官方来源仍未公布完整的跨存档、跨进度、购买与付费货币转移政策。在官方公布账号政策前，社区说法仍视为未证实。',
            },
            {
              t: 'quote',
              c: '官方来源最后核验：2026 年 9 月 26 日。移动端已官方上线，但仍需在当地商店确认设备可用性。',
            },
          ],
        };
  }
  const map: Record<string, [string, string, string]> = {
    'aniimo-crossplay-cross-save': [
      traditional
        ? 'Aniimo 支援跨平台連線嗎？平台組合、跨平台存檔與進度互通'
        : 'Aniimo 支持跨平台联机吗？平台组合、跨平台存档与进度互通',
      traditional
        ? '官方列出跨平台多人；PC、PS5、Xbox、手機版的具體組合、跨平台存檔與進度轉移仍未公開。'
        : '官方列出跨平台多人；PC、PS5、Xbox、手游的具体组合、跨平台存档与进度转移仍未公开。',
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
