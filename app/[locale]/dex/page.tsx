import DexBrowser from '@/components/dex/DexBrowser';
import { habitatGroups } from '@/data/aniimo-collections';

export default function DexPage() {
  return <DexBrowser habitats={habitatGroups.map(([name, members]) => [name, members.map((member) => member.number)])} />;
}
