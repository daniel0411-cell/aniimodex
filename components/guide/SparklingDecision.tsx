'use client';

import { useState } from 'react';
import { sparklingDecision, sparklingDecisionCopy, sparklingDecisionDetail, type SparklingGoal, type Confirmation, type PodSpecies } from '@/data/sparkling-decision';

export default function SparklingDecision({ locale, sourceUrl }: { locale: string; sourceUrl: string }) {
  const language = locale === 'en' ? 0 : locale === 'zh-Hant' ? 2 : 1;
  const t = (en: string, hans: string, hant: string) => [en, hans, hant][language];
  const [goal, setGoal] = useState<SparklingGoal>('');
  const [sparkling, setSparkling] = useState<Confirmation>('unknown');
  const [hue, setHue] = useState<Confirmation>('unknown');
  const [species, setSpecies] = useState<PodSpecies>('unknown');
  const result = sparklingDecision(goal, sparkling, hue, species);
  const selectClass = 'mt-2 block min-h-11 w-full min-w-0 rounded border border-ink-border bg-white px-2 py-2 text-sm';
  return <section aria-labelledby="sparkling-decision-title" className="my-5 space-y-4 rounded border border-ink-border p-4 sm:p-5" data-testid="sparkling-decision">
    <h3 id="sparkling-decision-title" className="text-lg font-semibold">{t('Before spending: check the operation', '消耗道具前：核对操作', '消耗道具前：核對操作')}</h3>
    <label className="block text-sm font-semibold">
      {t('Desired result', '目标结果', '目標結果')}
      <select value={goal} onChange={event => setGoal(event.target.value as SparklingGoal)} className={selectClass}>
        <option value="">{t('Choose a result', '请选择目标', '請選擇目標')}</option>
        <option value="swap">{t('Use a specific unlocked hue', '切换指定已解锁色彩', '切換指定已解鎖色彩')}</option>
        <option value="original">{t('Return to the initial Sparkling color', '换回初始闪光配色', '換回初始閃光配色')}</option>
        <option value="reroll">{t('Try for a new random hue', '尝试随机新色彩', '嘗試隨機新色彩')}</option>
        <option value="pod">{t('Apply an exclusive Legendary pod effect', '使用传奇球专属效果', '使用傳說球專屬效果')}</option>
        <option value="potential">{t('Improve Acquired Potential', '提升 Acquired Potential', '提升 Acquired Potential')}</option>
      </select>
    </label>
    {goal && goal !== 'potential' && <label className="block text-sm font-semibold">
      {t('Is this target Sparkling?', '这个目标是否为 Sparkling？', '這個目標是否為 Sparkling？')}
      <select value={sparkling} onChange={event => setSparkling(event.target.value as Confirmation)} className={selectClass}>
        <option value="unknown">{t('Not confirmed', '未确认', '未確認')}</option><option value="yes">{t('Yes', '是', '是')}</option><option value="no">{t('No', '否', '否')}</option>
      </select>
    </label>}
    {goal === 'swap' && <label className="block text-sm font-semibold">
      {t('Is the desired hue unlocked on this exact individual?', '目标色彩是否已在这个体上解锁？', '目標色彩是否已在這個體上解鎖？')}
      <select value={hue} onChange={event => setHue(event.target.value as Confirmation)} className={selectClass}>
        <option value="unknown">{t('Not confirmed', '未确认', '未確認')}</option><option value="yes">{t('Unlocked on this individual', '这个体已解锁', '這個體已解鎖')}</option><option value="no">{t('Locked on this individual', '这个体未解锁', '這個體未解鎖')}</option>
      </select>
    </label>}
    {goal === 'pod' && <label className="block text-sm font-semibold">
      {t('Target species', '目标物种', '目標物種')}
      <select value={species} onChange={event => setSpecies(event.target.value as PodSpecies)} className={selectClass}>
        <option value="unknown">{t('Not confirmed', '未确认', '未確認')}</option>
        {['Irisalis', 'Helion', 'Lunara'].map(name => <option key={name} value={name}>{name}</option>)}
        <option value="other">{t('Another confirmed species', '已确认是其他物种', '已確認是其他物種')}</option>
      </select>
    </label>}
    <div role="status" aria-live="polite" aria-atomic="true" className="min-h-36 border-l-4 border-primary bg-ink-card px-4 py-3" data-result={result}>
      <p className="font-semibold">{sparklingDecisionCopy[result][language]}</p>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{sparklingDecisionDetail[result][language]}</p>
    </div>
    <p className="text-xs leading-5 text-text-secondary">{t('Based on the October 29 update announcement, rechecked November 3, 2026. Your inputs are not read from a game account; confirm the current client’s item and target before spending.', '依据10月29日更新公告，2026年11月3日重新核对。输入不来自游戏账号读取；消耗前以当前客户端的道具和目标确认信息核对。', '依據10月29日更新公告，2026年11月3日重新核對。輸入不來自遊戲帳號讀取；消耗前以目前用戶端的道具和目標確認資訊核對。')}</p>
    <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-primary-light underline underline-offset-4">{t('Official rules: Sparkling Hue and Growth System', '官方依据：Sparkling Hue 与成长系统', '官方依據：Sparkling Hue 與成長系統')}</a>
  </section>;
}
