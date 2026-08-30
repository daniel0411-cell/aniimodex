import snapshot from '@/data/official-wiki-details.json';

export interface OfficialSkill {
  group?: string;
  name: string;
  description?: string;
  iconUrl?: string;
}

export interface OfficialEvolutionNode {
  name: string;
  stage: number;
  children: OfficialEvolutionNode[];
}

export interface OfficialAniimoDetail {
  number: string;
  wikiId: string;
  habitats: string[];
  evolution: OfficialEvolutionNode;
  mobility: OfficialSkill[];
  traits: OfficialSkill[];
  skills: OfficialSkill[];
  morphologyList: { wikiId: string; name: string }[];
}

const details = snapshot.details as OfficialAniimoDetail[];
const detailByNumber = new Map(details.map((detail) => [detail.number, detail]));

export function getOfficialAniimoDetail(number: string) {
  return detailByNumber.get(number);
}
