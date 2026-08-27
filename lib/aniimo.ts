// ============================================================================
// Aniimo 数据访问工具函数
// ============================================================================

import aniimos from '@/data/aniimos';
import type { AniimoEntry, Element, TwineAbility } from '@/types/aniimo';

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
  return aniimos.filter(
    (a) => a.element === element || a.forms.some((f) => f.element === element)
  );
}

/** 按 Twine 能力筛选（单选：精确匹配该能力） */
export function filterByTwineAbility(ability: TwineAbility): AniimoEntry[] {
  return aniimos.filter(
    (a) => a.twineAbility === ability || a.forms.some((f) => f.twineAbility === ability)
  );
}

/**
 * 收集一只伊莫具备的全部 Twine 能力（主能力 + 各形态能力去重）。
 * 用于反查器，返回该伊莫能力集合是否包含任一选中能力。
 */
function twineAbilitySet(a: AniimoEntry): Set<TwineAbility> {
  const set = new Set<TwineAbility>([a.twineAbility]);
  for (const form of a.forms) set.add(form.twineAbility);
  return set;
}

/**
 * 按 Twine 能力列表筛选（并集：匹配任一选中能力的伊莫）。
 * 传入空数组时返回全部伊莫。
 */
export function filterByTwineAbilities(abilities: TwineAbility[]): AniimoEntry[] {
  const list = abilities.filter((ab) => ab !== '无');
  if (list.length === 0) return aniimos;
  const wanted = new Set(list);
  return aniimos.filter((a) => {
    const owned = twineAbilitySet(a);
    for (const w of wanted) if (owned.has(w)) return true;
    return false;
  });
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
