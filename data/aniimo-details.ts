import snapshot from '@/data/official-wiki-details.json';
import currentSnapshot from '@/data/current-wiki-details.json';

export interface OfficialSkill {
  group?: string;
  name: string;
  description?: string;
  iconUrl?: string;
  parameters?: { label: string; value: string }[];
}

export interface OfficialEvolutionNode {
  name: string;
  stage: number;
  children: OfficialEvolutionNode[];
}

export interface OfficialAniimoDetail {
  number: string;
  wikiId: string;
  checkedAt?: string;
  evolutionPublished?: boolean;
  attributes?: { name: string; value: number }[];
  habitats: string[];
  evolution: OfficialEvolutionNode;
  mobility: OfficialSkill[];
  traits: OfficialSkill[];
  skills: OfficialSkill[];
  morphologyList: { wikiId: string; name: string; url?: string }[];
}

export function isSuspiciousOfficialDescription(description?: string): boolean {
  if (!description) return false;
  return /\b(?:every|for)\s+[3-9]\d{2,}\s*s\b/i.test(description) || /\b(?:total of|costs?|gains?)\s+(?:EP|HP)\b/i.test(description) || /\{\d+\}/.test(description) || /\bby\s+0(?:%|\.(?!\d)|(?=\s|$))/i.test(description);
}

export const currentDetails = currentSnapshot.details as OfficialAniimoDetail[];
const detailByNumber = new Map([...snapshot.details as OfficialAniimoDetail[], ...currentDetails].map((detail) => [detail.number, detail]));

export function getOfficialAniimoDetail(number: string) {
  return detailByNumber.get(number);
}
