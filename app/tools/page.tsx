import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

const tools = [
  {
    href: '/tools/twine',
    icon: '🔗',
    title: 'Twine 能力反查器',
    description: '选择机动能力，反查具备对应能力的伊莫精灵。',
    tags: ['反查', '机动能力'],
  },
  {
    href: '/tools/type-chart',
    icon: '⚔',
    title: '元素克制矩阵',
    description: '9×9 元素相克倍率表，快速查看攻击与防御的克制关系。',
    tags: ['矩阵', '克制'],
  },
  {
    href: '/tools/catch',
    icon: '📡',
    title: '捕获条件工具',
    description: '根据等级、陷阱、时段等条件估算伊莫捕获率并给出策略。',
    tags: ['捕获', '策略'],
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Breadcrumb items={[{ label: '工具' }]} />

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">工具中心</h1>
        <p className="text-sm text-text-secondary sm:text-base">
          实用工具合集：反查、克制矩阵、捕获估算，助力你的 Aniimo 冒险。
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border border-ink-border bg-ink-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary-light hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-2xl">
                {tool.icon}
              </span>
              <span className="text-text-muted transition-all group-hover:translate-x-1 group-hover:text-primary-light">
                →
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-text-primary transition-colors group-hover:text-primary-light">
              {tool.title}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{tool.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-border bg-ink-soft px-2 py-0.5 text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
