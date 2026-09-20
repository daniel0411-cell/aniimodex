// ============================================================================
// 官方形态（morphology）派生层
// ----------------------------------------------------------------------------
// 唯一数据源：data/official-wiki-details.json 的 detail.morphologyList（{ wikiId, name }[]）。
//
// 官方索引里实际出现 19 个形态名，可归为三类：
//   · Basic Form            基础形态（92 条全部拥有）
//   · Prismana Form         虹彩形态（21 条拥有）
//   · 其余 17 个             区域形态（以地貌/天气命名，如 Highland Form / Snowfield Form）
//
// ⚠️ 官方形态名是专有名词，本层不做任何中文硬编码映射；
//    需要本地化时由 UI 只翻译「分类名」，形态名保持官方原文。
// ⚠️ 官方 morphologyList 中没有任何 Sparkling（闪耀）条目。
//    闪耀样式的唯一官方依据是《機率公示》的「闪耀样式概率」表，
//    与形态（morphology）不是同一套字段，不要混用。
// ============================================================================

import detailsSnapshot from '@/data/official-wiki-details.json';
import type { OfficialAniimoDetail } from '@/data/aniimo-details';

const details = detailsSnapshot.details as OfficialAniimoDetail[];

/** 官方形态名中的基础形态 */
export const BASIC_FORM_NAME = 'Basic Form';

/** 官方形态名中的虹彩形态（官网亦以「虹彩」指称 Prismana） */
export const PRISMANA_FORM_NAME = 'Prismana Form';

export type FormKind = 'basic' | 'prismana' | 'region';

export interface OfficialFormEntry {
  wikiId: string;
  name: string;
}

/** 编号 → 该伊莫的官方形态列表 */
export const formsByNumber: ReadonlyMap<string, OfficialFormEntry[]> = new Map(
  details.map((detail) => [detail.number, detail.morphologyList ?? []])
);

/** 形态名 → 分类 */
export function formKind(name: string): FormKind {
  if (name === BASIC_FORM_NAME) return 'basic';
  if (name === PRISMANA_FORM_NAME) return 'prismana';
  return 'region';
}

export interface FormGroup {
  name: string;
  kind: FormKind;
  /** 拥有该形态的伊莫编号（按编号升序） */
  numbers: string[];
}

/** 形态聚合：按拥有者数量降序，其次按名称升序 */
export const formIndex: FormGroup[] = (() => {
  const map = new Map<string, string[]>();
  for (const detail of details) {
    for (const form of detail.morphologyList ?? []) {
      const list = map.get(form.name) ?? [];
      list.push(detail.number);
      map.set(form.name, list);
    }
  }
  return [...map.entries()]
    .map(([name, numbers]) => ({
      name,
      kind: formKind(name),
      numbers: [...numbers].sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => b.numbers.length - a.numbers.length || a.name.localeCompare(b.name));
})();

/** 区域形态名称（不含基础形态与虹彩形态） */
export const regionFormNames: string[] = formIndex
  .filter((group) => group.kind === 'region')
  .map((group) => group.name);

/** 官方索引中拥有虹彩形态的伊莫数量 */
export const prismanaMemberCount: number =
  formIndex.find((group) => group.kind === 'prismana')?.numbers.length ?? 0;

/** 统计各分类的形态条目数（用于如实说明覆盖范围） */
export function formKindCounts(): Record<FormKind, number> {
  const counts: Record<FormKind, number> = { basic: 0, prismana: 0, region: 0 };
  for (const detail of details) {
    for (const form of detail.morphologyList ?? []) counts[formKind(form.name)] += 1;
  }
  return counts;
}
