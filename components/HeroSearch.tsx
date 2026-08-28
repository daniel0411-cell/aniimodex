'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import SearchInput from '@/components/ui/SearchInput';

export default function HeroSearch() {
  const t = useTranslations('home');
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (value) router.push(`/dex?q=${encodeURIComponent(value)}`);
  };

  return <SearchInput placeholder={t('searchPlaceholder')} onSearch={handleSearch} />;
}
