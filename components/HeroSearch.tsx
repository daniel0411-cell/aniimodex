'use client';

import { useRouter } from 'next/navigation';
import SearchInput from '@/components/ui/SearchInput';

export default function HeroSearch() {
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (value) router.push(`/dex?q=${encodeURIComponent(value)}`);
  };

  return (
    <SearchInput
      placeholder="搜索 Aniimo 精灵、名称或关键词…"
      onSearch={handleSearch}
    />
  );
}
