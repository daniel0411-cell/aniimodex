import type { Config } from 'tailwindcss';

// 浅色清新方案：所有色板均引用 globals.css 中 :root 定义的 CSS 变量（RGB 三元组），
// 支持透明度语法（如 bg-primary/20），便于整体换肤。
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 背景系（晨雾白 + 白色卡片 + 浅边框）
        ink: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)', // 页面背景 #F7F9FC
          soft: 'rgb(var(--color-bg-soft) / <alpha-value>)', // 次级背景 #EEF2F7
          card: 'rgb(var(--color-card) / <alpha-value>)', // 卡片背景 #FFFFFF
          border: 'rgb(var(--color-border) / <alpha-value>)', // 边框 #E5E9F2
        },
        // 文字系（深色，保证浅底对比度）
        text: {
          primary: 'rgb(var(--color-text) / <alpha-value>)', // 主文字 #1F2937
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)', // 次文字 #4B5563
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)', // 弱化文字 #6B7280
        },
        // 品牌主色：天空蓝
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)', // #4A9DEC
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)', // 加深
          light: 'rgb(var(--color-primary-light) / <alpha-value>)', // 浅蓝
        },
        // 辅色：草原绿
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)', // #3FB950
          hover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
        },
        // 强调色：琥珀橙
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)', // #F5A623
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          light: 'rgb(var(--color-accent-light) / <alpha-value>)', // 浅琥珀
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Noto Sans SC',
          'sans-serif',
        ],
      },
      boxShadow: {
        // 柔和浅色阴影（适配白色卡片）
        glow: '0 4px 20px rgba(74, 157, 236, 0.18)',
        'glow-accent': '0 4px 20px rgba(245, 166, 35, 0.18)',
        card: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'card-hover':
          '0 4px 6px rgba(15, 23, 42, 0.06), 0 10px 20px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
