// ============================================================================
// Aniimo 数据访问工具函数
// ============================================================================

import aniimos from '@/data/aniimos';
import { ELEMENTS } from '@/lib/aniimo-ui';
import type { AniimoEntry, Element } from '@/types/aniimo';

/** 获取全部伊莫（按编号升序） */
export function getAllAniimos(): AniimoEntry[] {
  return [...aniimos].sort((a, b) => Number(a.number) - Number(b.number));
}

/** 按编号查询（支持 '001'、'1' 等格式，不区分前导零） */
export function getAniimoByNumber(num: string): AniimoEntry | undefined {
  const normalized = Number(num);
  if (Number.isNaN(normalized)) return undefined;
  return aniimos.find((a) => Number(a.number) === normalized);
}

/** 按名称查询（支持中文名 / 英文名，不区分大小写） */
export function getAniimoByName(name: string): AniimoEntry | undefined {
  const target = name.trim().toLowerCase();
  if (!target) return undefined;
  return aniimos.find(
    (a) => a.name.toLowerCase() === target || a.enName.toLowerCase() === target
  );
}

/** 按元素筛选（返回与元素匹配的全部伊莫） */
export function filterByElement(element: Element): AniimoEntry[] {
  return aniimos.filter((a) => a.officialElements?.includes(element));
}

/**
 * 官方索引中暂时没有任何条目的元素。
 *
 * 例：Light 存在于 Aniimo 的元素体系中，但 2026-08-30 的官方 Wiki 快照里
 * 92 条记录无一携带该元素。此时应如实标注「官方索引暂缺数据」，
 * 而不是把该元素从类型定义或克制表里删掉。
 */
export function getElementsWithoutPublishedEntries(): Element[] {
  const published = new Set<string>();
  for (const aniimo of aniimos) {
    for (const element of aniimo.officialElements ?? []) published.add(element);
  }
  return ELEMENTS.filter((element) => !published.has(element));
}

/** 模糊搜索：按编号 / 中文名 / 英文名 子串匹配 */
export function searchAniimos(query: string): AniimoEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const isNumberQuery = /^\d+$/.test(q);

  return aniimos.filter((a) => {
    // 编号精确 / 前缀匹配（同时兼容去前导零：输入 "1" 可命中 001、010、011…）
    const num = a.number;
    if (isNumberQuery) {
      const stripped = num.replace(/^0+/, '');
      if (num === q || num.startsWith(q) || stripped === q || stripped.startsWith(q)) return true;
    }
    // 中文名子串
    if (a.name.toLowerCase().includes(q)) return true;
    // 英文名子串
    if (a.enName.toLowerCase().includes(q)) return true;
    return false;
  });
}
