export const prismanaServers = [
  { id: 'apac', name: 'Aniimo-Apac', offset: 8, zone: 'UTC+8' },
  { id: 'europe', name: 'Aniimo-Europe', offset: 0, zone: 'UTC+0' },
  { id: 'americas', name: 'Aniimo-Americas', offset: -4, zone: 'UTC-4' },
] as const;

export const prismanaWindows = [
  { start: '2026-11-02', end: '2026-11-09', name: 'Pouchwisp', region: 'Rosy Mirelands / Tideblossom Coast' },
  { start: '2026-11-09', end: '2026-11-16', name: 'Royalby', region: 'Wildwater Gorge / Sea of Flowers' },
  { start: '2026-11-16', end: '2026-11-23', name: 'Jeburst', region: 'Cloudreach Falls / Russet Highlands' },
  { start: '2026-11-23', end: '2026-11-30', name: 'Glameep', region: 'Crescent Bay / Echoback Landing' },
  { start: '2026-11-30', end: '2026-12-07', name: 'Pouchwisp / Royalby / Jeburst / Glameep', region: 'Rosy Mirelands / Tideblossom Coast; Wildwater Gorge / Sea of Flowers; Cloudreach Falls / Russet Highlands; Crescent Bay / Echoback Landing' },
] as const;

// Official windows end at 03:59; the next 04:00 is an exclusive boundary.
export function prismanaWindowStatus(start: string, end: string, offset: number, now: number) {
  const instant = (day: string) => Date.parse(`${day}T04:00:00Z`) - offset * 3600000;
  if (!Number.isFinite(now)) return 'unknown';
  return now < instant(start) ? 'upcoming' : now < instant(end) ? 'active' : 'ended';
}
