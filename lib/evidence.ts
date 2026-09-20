// ============================================================================
// 证据等级展示的唯一入口
// ----------------------------------------------------------------------------
// 站点上任何「这条结论有多可信」的呈现，都必须经过本文件，
// 以便改了 data/verification.ts 之后 UI 自动跟随。
// 目前使用方：guide/how-we-verify、tools/type-chart。
// ============================================================================

import type { EvidenceStatus } from '@/types/aniimo';
import { verifiedClaims, type VerifiedClaim } from '@/data/verification';
import { sourceById, type SourceReference } from '@/data/sources';

/** 展示顺序：先官方结论，再社区反馈，最后如实呈现仍未证实项 */
export const EVIDENCE_STATUS_ORDER: EvidenceStatus[] = ['official', 'community', 'unknown'];

/** 徽章配色（浅色背景 + 深色文字） */
export const EVIDENCE_BADGE_CLASSES: Record<EvidenceStatus, string> = {
  official: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  community: 'border-amber-300 bg-amber-50 text-amber-800',
  unknown: 'border-slate-300 bg-slate-100 text-text-secondary',
};

/** 面板配色（免责声明 / 状态区块） */
export const EVIDENCE_PANEL_CLASSES: Record<EvidenceStatus, string> = {
  official: 'border-emerald-500 bg-emerald-50 text-emerald-950',
  community: 'border-amber-500 bg-amber-50 text-amber-900',
  unknown: 'border-slate-400 bg-slate-50 text-text-primary',
};

/** 按 id 取核验记录 */
export function getClaim(id: string): VerifiedClaim | undefined {
  return verifiedClaims.find((claim) => claim.id === id);
}

/** 取核验状态；找不到记录时按最保守的 unknown 处理 */
export function getClaimStatus(id: string): EvidenceStatus {
  return getClaim(id)?.status ?? 'unknown';
}

/** 取某个核验记录关联的来源对象（已过滤掉未登记的 id） */
export function getClaimSources(id: string): SourceReference[] {
  return (getClaim(id)?.sourceIds ?? []).flatMap((sourceId) => {
    const source = sourceById.get(sourceId);
    return source ? [source] : [];
  });
}
