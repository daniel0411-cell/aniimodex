import type { Element } from '@/types/aniimo';

export const TYPE_CHART: Record<Element, Partial<Record<Element, number>>> = {
  Fire: { Grass: 2, Ice: 2, Fire: 0.5, Water: 0.5, Earth: 0.5 },
  Water: { Fire: 2, Earth: 2, Grass: 0.5, Water: 0.5, Lightning: 0.5 },
  Grass: { Water: 2, Earth: 2, Fire: 0.5, Grass: 0.5, Wind: 0.5, Ice: 0.5 },
  Lightning: { Water: 2, Wind: 2, Earth: 0, Grass: 0.5, Lightning: 0.5 },
  Ice: { Grass: 2, Wind: 2, Earth: 2, Fire: 0.5, Water: 0.5, Ice: 0.5 },
  Earth: { Fire: 2, Lightning: 2, Wind: 0, Water: 0.5, Ice: 0.5, Grass: 0.5 },
  Wind: { Earth: 2, Grass: 2, Lightning: 0.5, Ice: 0.5, Water: 0.5 },
  Light: { Dark: 2, Light: 0.5 },
  Dark: { Light: 2, Dark: 0.5 },
};

export function effectiveness(attacker: Element, defender: Element): number {
  return TYPE_CHART[attacker][defender] ?? 1;
}

export function bestAttackers(defenders: Element[]): { element: Element; value: number }[] {
  return (Object.keys(TYPE_CHART) as Element[])
    .map((element) => ({
      element,
      value: defenders.reduce((total, defender) => total * effectiveness(element, defender), 1),
    }))
    .sort((a, b) => b.value - a.value);
}
