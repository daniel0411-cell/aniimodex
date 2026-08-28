/**
 * 原创 SVG 元素图标组件
 * 替代 emoji，风格统一、跨平台一致、不依赖系统字体
 */

import { cn } from '@/lib/utils';
import type { Element } from '@/types/aniimo';

interface ElementIconProps {
  element: Element;
  className?: string;
  size?: number;
}

const ICONS: Record<Element, React.FC<{ className?: string; size?: number }>> = {
  Fire: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C12 2 8 6 8 10C8 12.5 9.5 14.5 12 15.5C14.5 14.5 16 12.5 16 10C16 6 12 2 12 2Z" fill="currentColor" opacity="0.3"/>
      <path d="M12 6C12 6 9.5 9 9.5 11.5C9.5 13.2 10.5 14.5 12 15.2C13.5 14.5 14.5 13.2 14.5 11.5C14.5 9 12 6 12 6Z" fill="currentColor"/>
      <circle cx="12" cy="17" r="1.5" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  Water: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3C12 3 6 9 6 14C6 17.5 8.5 20 12 20C15.5 20 18 17.5 18 14C18 9 12 3 12 3Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      <path d="M12 8C12 8 9 11.5 9 14C9 15.5 10 17 12 17C14 17 15 15.5 15 14C15 11.5 12 8 12 8Z" fill="currentColor"/>
      <circle cx="10" cy="13" r="1" fill="white" opacity="0.6"/>
    </svg>
  ),
  Grass: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 20C12 20 8 16 8 11C8 7 10 4 12 2C14 4 16 7 16 11C16 16 12 20 12 20Z" fill="currentColor"/>
      <path d="M12 20V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12C8 12 6 10 6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 12C16 12 18 10 18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="1.5" fill="white" opacity="0.5"/>
    </svg>
  ),
  Earth: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 16L12 4L20 16H4Z" fill="currentColor" opacity="0.3"/>
      <path d="M7 16L12 8L17 16H7Z" fill="currentColor"/>
      <circle cx="12" cy="14" r="1.5" fill="white" opacity="0.4"/>
      <path d="M4 16H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Wind: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 10H15C17 10 18 9 18 7.5C18 6 17 5 15.5 5C14.5 5 13.5 5.5 13 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 14H12C14 14 15 13 15 11.5C15 10 14 9 12.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 18H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 7L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 11L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Lightning: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L6 12H11L10 22L18 11H12L13 2Z" fill="currentColor"/>
      <circle cx="14" cy="8" r="1" fill="white" opacity="0.5"/>
    </svg>
  ),
  Ice: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="5" r="1" fill="white" opacity="0.6"/>
    </svg>
  ),
  Light: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
      <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4.93 4.93L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.95 16.95L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4.93 19.07L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="white" opacity="0.5"/>
    </svg>
  ),
  Dark: ({ className, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C12.5 21 13 21 13.5 20.9C10 19.5 8 16 8 12C8 8 10 4.5 13.5 3.1C13 3 12.5 3 12 3Z" fill="currentColor"/>
      <circle cx="15" cy="9" r="1" fill="white" opacity="0.3"/>
      <path d="M16 14C16 14 15 15 14 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
};

export default function ElementIcon({ element, className, size = 20 }: ElementIconProps) {
  const Icon = ICONS[element];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}

/** 小型版本（用于徽章/标签） */
export function ElementIconSmall({ element, className }: { element: Element; className?: string }) {
  return <ElementIcon element={element} size={14} className={className} />;
}
