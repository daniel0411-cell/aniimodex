/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出：将站点预渲染为纯静态文件（out/），适配 Cloudflare Pages
  output: 'export',
  // 静态导出下 Next.js 图片优化器不可用，必须关闭图片优化
  images: {
    unoptimized: true,
  },
  // 生成 /pokedex/ 形式的路径，配合 Cloudflare Pages 的目录路由更稳定
  trailingSlash: true,
};

module.exports = nextConfig;
