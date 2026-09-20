// ============================================================================
// 元素克制倍率表
// ----------------------------------------------------------------------------
// ⚠️ 来源状态：COMMUNITY（社区整理，官方未公布战斗克制表）
//
// 官方从未公布任何战斗克制倍率表（官方《機率公示》只覆盖捕获概率；
// 官方 Wiki 快照只提供每只伊莫的元素标签）。因此本表不是官方数据。
//
// 本表数值为社区共识（2026-09-18 交叉核对三个社区来源）：
//   · 超克制   1.6x
//   · 中性     1x
//   · 抵抗     0.625x  （0.625 = 1 / 1.6，为对称体系）
//   · 免疫     无（任何元素对任何元素至少造成 0.625x）
//   · 自身克制：除 Dark → Dark 为 1x 中性外，其余元素对自己均为 0.625x
//
// 交叉核对的社区来源：
//   1. The Aniimo Book  https://aniimobook.app/type-chart/   （以此为主体）
//   2. Aniimo Tools     https://aniimotools.dev/type-chart/
//   3. games.gg         https://games.gg/aniimo/guides/aniimo-type-chart/
//
// 【已知争议】三家社区来源在个别单元格上不一致：
//   · Ice → Wind：三家分别为 1x / 0.625x / 1.6x，无法形成多数 → 本表按中性 1x
//     处理，并在 UI 免责声明中如实标注「个别单元格仍存在社区争议」。
//   · 其余个别差异已按「三取二多数」取值。
//
// 【维护约定】
// UI 免责声明必须从 data/verification.ts 的 element-matchups 记录读取状态
// （见 lib/evidence.ts），不得把「社区整理 / 未证实」写死在 i18n 文案里。
// 若官方日后公布战斗倍率，请整体替换本表并更新 verification 状态与来源。
// ============================================================================

import type { Element } from '@/types/aniimo';

/** 与 data/verification.ts 中核验记录的关联 id */
export const ELEMENT_MATCHUPS_CLAIM_ID = 'element-matchups';

/** 社区来源三取二多数得出的数值（与 0.625 = 1/1.6 一致） */
export const SUPER_EFFECTIVE = 1.6;
export const RESISTED = 0.625;

/** 行 = 攻击方元素，列 = 防守方元素；未列出的组合为 1（中性）。 */
export const ELEMENT_MATCHUPS: Record<Element, Partial<Record<Element, number>>> = {
  Light: { Dark: 1.6, Wind: 1.6, Light: 0.625, Lightning: 0.625 },
  Fire: { Ice: 1.6, Grass: 1.6, Light: 0.625, Fire: 0.625, Water: 0.625, Earth: 0.625 },
  Ice: { Lightning: 1.6, Water: 1.6, Fire: 0.625, Ice: 0.625, Earth: 0.625 },
  Dark: { Light: 1.6, Fire: 1.6, Grass: 1.6, Water: 0.625, Wind: 0.625 },
  Lightning: { Water: 1.6, Wind: 1.6, Ice: 0.625, Lightning: 0.625, Earth: 0.625 },
  Grass: { Water: 1.6, Earth: 1.6, Light: 0.625, Fire: 0.625, Grass: 0.625 },
  Water: { Fire: 1.6, Earth: 1.6, Light: 0.625, Ice: 0.625, Grass: 0.625, Water: 0.625 },
  Earth: { Ice: 1.6, Lightning: 1.6, Dark: 0.625, Grass: 0.625, Water: 0.625, Earth: 0.625 },
  Wind: { Dark: 1.6, Grass: 1.6, Lightning: 0.625, Wind: 0.625 },
};
