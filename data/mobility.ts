// ============================================================================
// Aniimo 移动能力（mobility）派生层
// ----------------------------------------------------------------------------
// 唯一数据源：data/official-wiki-details.json 的 detail.mobility（OfficialSkill[]）。
//
// 重要说明：
// 官方只公布英文能力名（Hustle / Take Off / Cloudwalk …），92 条详情里实际出现
// 19 个不同取值，且只有 48 条带有该字段。因此本站原样保留英文专名，
// 不在数据层做任何中文硬编码映射；中文短名与说明统一放在 messages 的
// mobilityNames.* / mobilityDescriptions.*，由 UI 按语言取用。
//
// 本文件只依赖 JSON，不依赖 data/aniimos.ts，避免与 lib/aniimo 形成循环引用。
// ============================================================================

import detailsSnapshot from '@/data/official-wiki-details.json';
import type { OfficialAniimoDetail, OfficialSkill } from '@/data/aniimo-details';

const details = detailsSnapshot.details as OfficialAniimoDetail[];

/** 去重并保持官方返回顺序 */
function uniqueMobilityNames(mobility: OfficialSkill[] | undefined): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const skill of mobility ?? []) {
    if (seen.has(skill.name)) continue;
    seen.add(skill.name);
    names.push(skill.name);
  }
  return names;
}

/** 编号 → 该伊莫的 mobility 名称列表 */
export const mobilityByNumber: ReadonlyMap<string, string[]> = new Map(
  details.map((detail) => [detail.number, uniqueMobilityNames(detail.mobility)])
);

/** mobility 名称 → 官方描述 / 图标（同名能力取首个非空值） */
export const mobilityMeta: ReadonlyMap<string, { description?: string; iconUrl?: string }> =
  (() => {
    const meta = new Map<string, { description?: string; iconUrl?: string }>();
    for (const detail of details) {
      for (const skill of detail.mobility ?? []) {
        const current = meta.get(skill.name) ?? {};
        meta.set(skill.name, {
          description: current.description ?? skill.description,
          iconUrl: current.iconUrl ?? skill.iconUrl,
        });
      }
    }
    return meta;
  })();

/** 官方数据中出现过的全部 mobility 名称（按首次出现顺序） */
export const allMobilityNames: string[] = Array.from(mobilityMeta.keys());
