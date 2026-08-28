import Link from 'next/link';

// 注意：not-found.tsx 不接收 params，无法感知 locale，
// 因此这里使用静态文案与普通链接。
export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="text-2xl font-bold text-text-primary">Not Found</h1>
      <Link
        href="/"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Home
      </Link>
    </div>
  );
}
