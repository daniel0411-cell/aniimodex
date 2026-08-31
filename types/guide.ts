import type { Element } from '@/components/ui/Badge';

/**
 * 攻略文章元数据结构。
 * 标题、副标题、标签和正文都通过 slug 读取 messages/guide.posts[slug]。
 */
export interface GuidePost {
  /** 文章 slug，作为 URL 与 messages key 的唯一标识 */
  slug: string;
  /** 关联元素（用于 Badge 配色） */
  element?: Element;
  /** 发布日期（ISO 字符串） */
  date: string;
  /** 明确设为 false 时不在指南中心公开展示 */
  published?: boolean;
  /** 预估阅读时长（分钟） */
  readMinutes: number;
  /** 相关工具 href 列表（增强站内互链） */
  relatedToolHrefs?: string[];
  /** 相关文章 slug 列表（站内互链） */
  relatedSlugs?: string[];
  /** 文章横幅图路径（相对于 public） */
  image?: string;
  /** 图片 alt 文本 */
  imageAlt?: string;
  /** 支撑页面结论的官方来源 ID */
  sourceIds?: string[];
  dataTopic?: 'elements' | 'roles' | 'evolution' | 'mobility' | 'habitats';
}
