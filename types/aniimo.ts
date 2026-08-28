// ============================================================================
// Aniimo 工具站 · 核心数据架构类型定义
// ============================================================================

/** 9 种元素 */
export type Element = 'Light' | 'Fire' | 'Ice' | 'Dark' | 'Lightning' | 'Grass' | 'Water' | 'Earth' | 'Wind';

/** 5 种角色定位 */
export type Role = 'DPS' | 'Heal' | 'Support' | 'Break' | 'Regen';

/** Twine 能力：场地移动/互动能力 */
export type TwineAbility = '飞行' | '游泳' | '遁地' | '攀岩' | '冲撞' | '无';

/** 个体潜力等级（决定成长上限） */
export type Potential = 'Common' | 'Good' | 'Elite' | 'Perfect';

/** 进化阶段 */
export type EvolutionStage = 'Lumin' | 'Gamma' | 'Nova';

/** 内容证据等级：仅有可追溯的一手资料时才能标为 official。 */
export type EvidenceStatus = 'official' | 'community' | 'unknown';

/** MBTI 式性格：影响属性加成。数值占位，具体效果待定。 */
export type Personality =
  | 'Analyst' // 分析家
  | 'Diplomat' // 外交家
  | 'Sentinel' // 守卫者
  | 'Explorer' // 探索家
  | 'Sage' // 贤者
  | 'Trickster'; // 戏法师

/** 性格对应的属性加成（占位，具体数值待定） */
export interface PersonalityBonus {
  /** 受影响的基础属性名 */
  stat: 'atk' | 'def' | 'spd' | 'hp' | 'heal' | 'break';
  /** 加成倍率（占位，待定） */
  multiplier: number;
  /** 备注 */
  note?: string;
}

/** 前置条件：可组合的条件表达式（简化：每个条件独立） */
export interface EvolutionPrerequisite {
  /** 等级要求（可选） */
  level?: number;
  /** 道具要求（可选，名称占位） */
  item?: string;
  /** 时段要求（可选） */
  timeOfDay?: 'day' | 'night';
  /** 天气要求（可选） */
  weather?: string;
  /** 描述性文字（当条件无法结构化时使用） */
  raw?: string;
}

/** 单条进化分支 */
export interface EvolutionBranch {
  /** 目标伊莫编号 */
  target: string;
  /** 目标进化阶段 */
  stage: EvolutionStage;
  /** 触发条件（可多个，需同时满足） */
  prerequisites: EvolutionPrerequisite[];
  /** 分支说明 */
  note?: string;
}

/** 完整进化路线：可能有多条分支 */
export interface EvolutionPath {
  /** 起始阶段 */
  startStage: EvolutionStage;
  /** 进化分支列表（可为空，表示该形态无后续进化） */
  branches: EvolutionBranch[];
}

/** 栖息地 */
export interface Habitat {
  /** 地形/区域 */
  region: string;
  /** 具体描述 */
  detail?: string;
}

/** 天气条件 */
export type WeatherCondition = '晴' | '雨' | '雪' | '雷暴' | '大雾' | '夜晚' | '晴转多云' | '任何';

/** 时段 */
export type TimeWindow = '昼' | '夜' | '全天' | '黄昏' | '黎明';

/** 出现现象（稀有触发） */
export interface Phenomenon {
  name: string;
  description: string;
}

/** 出现条件 */
export interface SpawnCondition {
  /** 栖息地（可多个） */
  habitats: Habitat[];
  /** 天气 */
  weather: WeatherCondition;
  /** 时段 */
  time: TimeWindow;
  /** 稀有触发现象（可选） */
  phenomenon?: Phenomenon;
}

/** 基础属性值 */
export interface BaseStats {
  /** 生命 */
  hp: number;
  /** 攻击 */
  atk: number;
  /** 防御 */
  def: number;
  /** 速度 */
  spd: number;
  /** 治疗/辅助强度 */
  heal?: number;
  /** 破防/削弱强度 */
  break?: number;
}

/** 单只伊莫的某一形态 */
export interface AniimoForm {
  /** 形态名（如普通/区域/闪亮） */
  name: string;
  /** 元素（形态可改变元素） */
  element: Element;
  /** 角色（形态可改变角色） */
  role: Role;
  /** 基础属性 */
  stats: BaseStats;
  /** 该形态可用 Twine 能力 */
  twineAbility: TwineAbility;
  /** 形态说明 */
  description?: string;
}

/** 完整伊莫数据结构 */
export interface AniimoEntry {
  /** 图鉴编号（3 位字符串，如 '001'） */
  number: string;
  /** 中文名 */
  name: string;
  /** 英文名 */
  enName: string;
  /** 描述 */
  description: string;
  /** 英文图鉴简介（flavor text，承接 'aniimo dex' 等英文搜索） */
  flavorText: string;
  /** 是否拥有闪亮形态（承接 'aniimo shiny' 搜索） */
  shiny: boolean;
  /** 基础元素（第一形态） */
  element: Element;
  /** 基础角色 */
  role: Role;
  /** Twine 能力（第一形态） */
  twineAbility: TwineAbility;
  /** 基础属性 */
  stats: BaseStats;
  /** 个体潜力分布（各等级对应概率/可解锁性） */
  potential: Record<Potential, number | 'unavailable'>;
  /** 进化路线 */
  evolution: EvolutionPath;
  /** 出现条件 */
  spawn: SpawnCondition;
  /** 性格加成（占位） */
  personality: Record<Personality, PersonalityBonus>;
  /** 形态列表（至少包含第一形态） */
  forms: AniimoForm[];
  /** 整条记录的最低证据等级；具体结论在 data/verification.ts 中逐项核验。 */
  dataSource: EvidenceStatus;
  /** 支撑本条记录的来源 ID；official 状态至少需要一个来源。 */
  sourceIds?: string[];
  /** 备注（占位项说明） */
  note?: string;
}
