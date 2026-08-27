import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Badge, { type Element } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: '攻略',
};

const guideArticles: { title: string; tag: string; element: Element }[] = [
  { title: '快速上手：认识 Aniimo 的基础玩法', tag: '入门', element: '风' },
  { title: '元素克制详解：如何搭配阵容', tag: '进阶', element: '雷' },
  { title: 'Twine 反查的使用技巧', tag: '工具', element: '光' },
];

export default function GuidePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">攻略</h1>
        <p className="text-sm text-text-secondary">新手教程与进阶攻略</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guideArticles.map((article) => (
          <Card key={article.title} className="h-full" interactive>
            <div className="flex items-center gap-2">
              <Badge label={article.tag} />
              <Badge label={article.element} element={article.element} />
            </div>
            <h3 className="mt-3 font-semibold text-text-primary">{article.title}</h3>
          </Card>
        ))}
      </section>
    </div>
  );
}
