import Image from 'next/image';

export default function SparklingIllustrations({ locale }: { locale: string }) {
  const t = (en: string, hans: string, hant: string) => locale === 'en' ? en : locale === 'zh-Hant' ? hant : hans;
  const figures = [
    {
      image: 'hue-swap-editorial',
      title: 'Hue Swap',
      alt: t('A selected color swatch points to another color option.', '已选中色卡通过箭头指向另一种配色。', '已選中色卡透過箭頭指向另一種配色。'),
      description: t('Choose a hue already unlocked on this same individual. Switching uses Credits, not another random Pigment roll.', '选择这个体已解锁的色彩。切换消耗 Credits，不需要再次用 Pigment 随机重洗。', '選擇這個體已解鎖的色彩。切換消耗 Credits，不需要再次用 Pigment 隨機重洗。'),
    },
    {
      image: 'hue-reroll-editorial',
      title: 'Hue Reroll',
      alt: t('A brush, die and question mark above two identical color swatches illustrate a possible duplicate result.', '画笔、骰子和问号下方是两张相同色卡，表示随机结果可能重复。', '畫筆、骰子和問號下方是兩張相同色卡，表示隨機結果可能重複。'),
      description: t('Pigment gives a random result and may repeat an unlocked hue. A duplicate returns 2 Sparkling Sigil, not a Pigment refund or a guaranteed new hue.', 'Pigment 结果随机，可能重复已解锁色。重复返还2枚 Sparkling Sigil，不是返还 Pigment，也不保证下次出新色。', 'Pigment 結果隨機，可能重複已解鎖色。重複返還2枚 Sparkling Sigil，不是返還 Pigment，也不保證下次出新色。'),
    },
    {
      image: 'legendary-pod-editorial',
      title: 'Use Legendary Aniipod',
      alt: t('Two abstract pods with a one-way replacement arrow and a sparkle beside the second pod.', '两个抽象球体之间是单向替换箭头，后一个球旁带闪光符号。', '兩個抽象球體之間是單向替換箭頭，後一個球旁帶閃光符號。'),
      description: t('Replace the bound pod for its corresponding exclusive Sparkling effect. Acquired Potential stays unchanged. This function excludes Irisalis, Helion and Lunara.', '替换绑定球，获得对应专属闪光效果；Acquired Potential 不变。此功能排除 Irisalis、Helion、Lunara。', '替換綁定球，獲得對應專屬閃光效果；Acquired Potential 不變。此功能排除 Irisalis、Helion、Lunara。'),
    },
  ];
  return <section aria-labelledby="sparkling-illustrations-title" className="my-8 border-y border-ink-border py-6" data-testid="sparkling-illustrations">
    <h3 id="sparkling-illustrations-title" className="text-lg font-semibold">{t('Three operations, different outcomes', '三种操作，三种不同结果', '三種操作，三種不同結果')}</h3>
    <p className="mt-2 text-xs leading-5 text-text-secondary">{t('AI-assisted editorial illustrations, adapted by AniimoDex. Symbols are abstract, not game screenshots or actual item appearances; colors and dice do not specify available hues or probabilities.', 'AI 辅助编辑示意图，由 AniimoDex 裁切排版。符号不代表游戏截图或真实道具外观；配色与骰子不表示可选色彩数量或概率。', 'AI 輔助編輯示意圖，由 AniimoDex 裁切排版。符號不代表遊戲截圖或真實道具外觀；配色與骰子不表示可選色彩數量或機率。')}</p>
    <div className="mt-4 grid gap-6 md:grid-cols-3">
      {figures.map(figure => <figure key={figure.image} className="min-w-0">
        <Image src={`/images/guides/${figure.image}.webp`} alt={figure.alt} width={768} height={512} sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 30vw, 304px" className="aspect-[3/2] h-auto w-full rounded object-contain" />
        <figcaption className="mt-3 text-sm leading-6">
          <p className="font-semibold text-text-primary">{figure.title}</p>
          <p className="mt-1 text-text-secondary">{figure.description}</p>
        </figcaption>
      </figure>)}
    </div>
  </section>;
}
