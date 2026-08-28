import type { Element } from '@/components/ui/Badge';

/**
 * 攻略文章元数据结构。
 * 标题、副标题、标签、正文等文案通过 titleKey 等 key 指向 messages/guide.posts[slug]。
 */
export interface GuidePost {
  /** 文章 slug，作为 URL 与 messages key 的唯一标识 */
  slug: string;
  /** 对应 messages 中 guide.posts[slug].title */
  titleKey: string;
  /** 对应 messages 中 guide.posts[slug].subtitle */
  subtitleKey: string;
  /** 标签 key，指向 messages.guide.posts[slug].tag */
  tagKey: string;
  /** 关联元素（用于 Badge 配色） */
  element?: Element;
  /** 发布日期（ISO 字符串） */
  date: string;
  /** 预估阅读时长（分钟） */
  readMinutes: number;
  /** 相关工具 href 列表（增强站内互链） */
  relatedToolHrefs?: string[];
  /** 相关文章 slug 列表（站内互链） */
  relatedSlugs?: string[];
}
