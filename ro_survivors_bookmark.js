(() => {
  if (!/^(?:www\.)?ro-survivors\.com$/i.test(location.hostname) || window.top !== window) {
    console.warn('[RO Survivors zh-TW] 請在 RO Survivors 遊戲頁使用此書籤。');
    return;
  }

  // 書籤載入時遊戲已啟動；此鉤子只會套用到之後建立的 Pixi 物件。
  const existing = document.getElementById('ro-zh-tw-tools');
  if (existing) {
    existing.shadowRoot?.getElementById('enabled')?.click();
    return;
  }

  const watchedFontObjects = new WeakSet();
  function addChineseFontFallback(object) {
    if (!object || typeof object !== 'object' || watchedFontObjects.has(object)) return;
    watchedFontObjects.add(object);

    const style = object.style;
    if (style && 'fontFamily' in style) {
      const families = Array.isArray(style.fontFamily)
        ? style.fontFamily
        : [style.fontFamily || 'Arial'];
      if (!families.includes('Microsoft JhengHei')) {
        style.fontFamily = [...families, 'Microsoft JhengHei', 'Noto Sans TC', 'sans-serif'];
      }
    }

    if (Array.isArray(object.children)) {
      for (const child of object.children) addChineseFontFallback(child);
      if (typeof object.on === 'function') {
        object.on('childAdded', child => addChineseFontFallback(child));
      }
    }
  }

  // Preserve the game's app-init hook for objects created after injection.
  const oldPixiAppHook = globalThis.__PIXI_APP_INIT__;
  globalThis.__PIXI_APP_INIT__ = function (app, ...args) {
    oldPixiAppHook?.call(this, app, ...args);
    addChineseFontFallback(app?.stage);
  };

  const boot = () => {
  if (!document.getElementById('stage') || !document.getElementById('splash')) {
    alert('請回到 RO Survivors 遊戲主頁後，再點擊此書籤。');
    return;
  }
  // Bookmarklets have no GM_* storage APIs, so persist settings on this game origin.
  const storageKey = key => 'ro-survivors-zh-tw:bookmark:' + key;
  const GM_getValue = (key, fallback = {}) => {
    const stored = JSON.parse(localStorage.getItem(storageKey(key)) || '{}');
    return {
      ...fallback,
      ...(stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {}),
      enabled: true,
      open: !/^(?:en(?:-[a-z0-9]+)*|zh-TW)$/i.test(document.documentElement.lang)
    };
  };
  const GM_setValue = (key, value) => localStorage.setItem(storageKey(key), JSON.stringify(value));
  (() => {
  'use strict';

  // 同步維護 translations.json。內建詞庫讓腳本可以單檔離線安裝。
  const BUILTIN = {"Cast":"施放","Damage per hit":"每次命中的傷害","Magic":"魔法","Total damage":"總傷害","Damage: MATK ×{1} · overall ×{2}":"傷害：MATK ×{1} · 整體 ×{2}","Common":"普通","+{1}% damage":"+{1}% 傷害","Ranged strike":"遠距離攻擊","Upgrades":"強化","+{1} Haste":"+{1} 冷卻加速","Pick a card ({1}–{2})":"選擇一張卡片（{1}–{2}）","NEW!":"新！","Area · Lv {1}":"範圍 · Lv {1}","Flurry":"連擊","Multi target":"多目標","Multi target · Lv {1}":"多目標 · Lv {1}","+{1} targets":"+{1} 個目標","Fire":"火","Free slot":"空欄位","Ground zone":"地面區域","Not upgraded":"尚未強化","Upgrade":"強化","Thunderstorm":"雷爆術","Wind":"風","Dish":"料理","Damage: upgrades +{1}% · MATK ×{2} · overall ×{3}":"傷害：強化 +{1}% · MATK ×{2} · 整體 ×{3}","Level Up!":"升級！","Lv {1}: +{2}% damage · +{3}% HP":"Lv {1}：+{2}% 傷害 · +{3}% HP","Skills {1}/{2}":"技能 {1}/{2}","Amount":"數量","Ghost":"念","Uncommon":"罕見","+{1}% area":"+{1}% 作用範圍","Electric storm over a group of enemies.":"在一群敵人上方引發雷暴。","INT: your Mage deals damage with it.":"INT：魔法師的傷害由此能力值決定。","Slots full: you can only upgrade these now.":"欄位已滿，現在只能強化這些技能。","Upgrade a skill":"強化一項技能","Ghostly blow on the nearest enemy and those around it.":"以念力打擊最近的敵人及其周圍的敵人。","Sight":"火狩","Elixir":"靈藥","+{1} impact":"+{1} 次衝擊","+{1} cell":"+{1} 格","Fireballs fall from the sky onto the nearest enemy. Each level adds one more bolt.":"火箭從空中落下，擊中最近的敵人。每升一級就多一發。","Rank {1}":"階級 {1}","Rank {1}/{2}":"階級 {1}/{2}","Potion":"藥水","Black Guard — Unlocked in the Endless Tower (coming soon)":"Black Guard：在無限塔解鎖（即將推出）","Blood Savage — Unlocked in the Endless Tower (coming soon)":"Blood Savage：在無限塔解鎖（即將推出）","Bronze Sentry — Unlocked in the Endless Tower (coming soon)":"Bronze Sentry：在無限塔解鎖（即將推出）","Shadow — Unlocked by beating Shadow Niff (coming soon)":"Shadow：擊敗 Shadow Niff 後解鎖（即將推出）","Raises a wall of fire between you and the enemies.":"在你與敵人之間升起一道火牆。","Choose a piece · −{1} zeny":"選擇一件裝備 · −{1} Zeny","Deity":"神格","Fire Bolt: Fireballs fall from the sky onto the nearest enemy. Each level adds one more bolt.":"火箭術：火箭從空中落下，擊中最近的敵人。每升一級就多一發。","Items {1}/{2}":"道具 {1}/{2}","Lightning on random enemies. Each level adds one more bolt.":"以雷電攻擊隨機敵人。每升一級就多一道雷電。","New":"新","Rare":"稀有","Treasure chest":"寶箱","Connecting…":"連線中…","Persistent":"持續型","Two flames that orbit around you.":"兩團火焰環繞著你旋轉。","Zone · Lv {1}":"區域 · Lv {1}","+{1}% duration":"+{1}% 持續時間","Change your hairstyle, hair color and clothes color whenever you like, free of charge. The clothes color stays when you change job.":"可隨時免費更換髮型、髮色和服裝顏色。轉職時會保留服裝顏色。","Orbital":"環繞型","Souls curve towards the enemy (x2 vs undead). Each level adds one more soul.":"靈魂沿弧線飛向敵人（對不死系為 x2）。每升一級就多一個靈魂。","Tidal Shoes of Dexterity":"靈巧防水長靴","Can drop":"可能掉落","Kill {1} monsters in total.":"累計擊殺 {1} 隻魔物。","Upgrade · {1}":"強化 · {1}","Active":"主動","AGI Dish +{1}":"AGI 料理 +{1}","Devastating but slow zeny strikes.":"以 Zeny 發動緩慢但威力強大的攻擊。","Gunslinger is unlocked by a secret":"完成隱藏條件可解鎖神槍手","Ninja is unlocked by a secret":"完成隱藏條件可解鎖忍者","Taekwon":"跆拳少年","Taekwon is unlocked by a secret":"完成隱藏條件可解鎖跆拳少年","Very fast. Poisonous stabs.":"速度極快，擅長帶毒的突刺。","{1} (-{2}% cooldown)":"{1}（冷卻時間 -{2}%）","{1}/{2} uses per run":"每場可使用 {1}/{2} 次","+{1}% zeny · +{2}% discovery":"+{1}% Zeny · +{2}% 發現率","Choose a skill":"選擇一項技能","Cold Bolt: Ice bolts fall from the sky and slow (they can learn to freeze). Each level adds one more bolt.":"冰箭術：冰箭從空中落下並使敵人減速，可習得凍結效果。每升一級就多一發。","Epic":"史詩","Fire Wall: Raises a wall of fire between you and the enemies.":"火焰之壁：在你與敵人之間升起一道火牆。","Frost Diver: Trail of ice along the ground that freezes the enemy. Deals no damage: crowd control only.":"冰凍術：冰霜沿地面蔓延，使敵人凍結。只提供控場效果。","Lightning Bolt: Lightning on random enemies. Each level adds one more bolt.":"雷擊術：以雷電攻擊隨機敵人。每升一級就多一道雷電。","Lv {1} · Monster":"Lv {1} · 魔物","Multi target · Cast {1} s":"多目標 · 詠唱 {1} 秒","Napalm Beat: Ghostly blow on the nearest enemy and those around it.":"心靈爆破：以念力打擊最近的敵人及其周圍的敵人。","Sight: Two flames that orbit around you.":"火狩：兩團火焰環繞著你旋轉。","Size: Small":"體型：小型","Soul Strike: Souls curve towards the enemy (x2 vs undead). Each level adds one more soul.":"聖靈召喚：靈魂沿弧線飛向敵人（對不死系為 x2）。每升一級就多一個靈魂。","Thunderstorm: Electric storm over a group of enemies.":"雷爆術：在一群敵人上方引發雷暴。","Channel {1} · {2} players":"分流 {1} · {2} 位玩家","Deity of Avarice +{1}":"貪婪神格 +{1}","Discard":"捨棄","Dish · this run only":"料理 · 僅限本場","Feats":"事蹟","Hunting":"狩獵","Jobs & levels":"職業與等級","No card slots.":"沒有卡片插槽。","Orbital · Lv {1}":"環繞型 · Lv {1}","Stages":"關卡","{1} free points":"{1} 點可分配點數","{1} of {2} chosen":"已選 {1}/{2}","Basic attack":"普通攻擊","Basic attack · Projectile · Lv {1}":"普通攻擊 · 投射物 · Lv {1}","Byalan Island":"柏伊亞嵐島","Element: Wind {1}":"屬性：風 {1}","Endless floors":"無盡樓層","Floors {1}–{2}":"第 {1}–{2} 層","Get {1} different pets.":"取得 {1} 種不同的寵物。","Ladder":"排行榜","Magic projectile at the nearest enemy.":"向最近的敵人發射魔法投射物。","Monthly ranking":"每月排名","Neutral":"無屬性","Projectile":"投射物","Race: Insect":"種族：昆蟲","Reach Base Lv {1} with any character.":"任一角色達到基本等級 {1}。","Single target":"單一目標","A horde surrounds you!":"一大群魔物包圍了你！","Clip":"髮夾","Dragon Fly":"龍蠅","Dragonfly Card":"龍蠅卡片","Eclipse":"藍瘋兔","Sweet Gent":"紳士帽","Toad":"蛙王","{1} (-{2}% damage)":"{1}（傷害 -{2}%）","+{1} target":"+{1} 個目標","Agility: +{1} Haste per point ({2}% lower cooldown on all skills at {3}), and +{4}% Flee per point (gear AGI counts too).":"敏捷：每點 +{1} 冷卻加速（達 {3} 點時，所有技能的冷卻時間縮短 {2}%），並 +{4}% 迴避率（裝備的 AGI 也計入）。","Angelic Guard":"天使之保護","Area · Cast {1} s":"範圍 · 詠唱 {1} 秒","Area Potion +{1}":"範圍藥水 +{1}","Boss":"首領","Defeat Drake {1} times.":"擊敗海盜之王 {1} 次。","Defeat Eddga {1} times.":"擊敗虎王 {1} 次。","Defeat Golden Thief Bug {1} times.":"擊敗黃金蟲 {1} 次。","Defeat Kraken {1} times.":"擊敗魔鬼大烏賊 {1} 次。","Defeat Mastering {1} times.":"擊敗波利之王 {1} 次。","Defeat Moonlight Flower {1} times.":"擊敗月夜貓 {1} 次。","Dexterity: shorter casts (instant at {1} DEX for single target, {2} DEX for area). +{3}% double cast per point; on ranged jobs, also +{4} ATK per point.":"靈巧：縮短詠唱時間（單體技能在 {1} DEX 時瞬發，範圍技能在 {2} DEX 時瞬發）。每點 +{3}% 雙重詠唱機率，遠距離職業每點另 +{4} ATK。","Drake ×{1}":"海盜之王 ×{1}","Eddga ×{1}":"虎王 ×{1}","Get {1} different 2nd jobs.":"取得 {1} 種不同的二轉職業。","Golden Thief Bug ×{1}":"黃金蟲 ×{1}","Hollgrehenn the Blacksmith":"鐵匠 忽克連","Intelligence: +{1} MATK per point (damage and healing of magic jobs).":"智力：每點 +{1} MATK，提高魔法職業的傷害及治療量。","Kraken ×{1}":"魔鬼大烏賊 ×{1}","Luck: +{1}% crit, +{2}% Flee and +{3}% double cast per point.":"幸運：每點 +{1}% 暴擊率、+{2}% 迴避率及 +{3}% 雙重詠唱機率。","Mastering ×{1}":"波利之王 ×{1}","Mastering Card":"波利之王卡片","Moonlight Flower ×{1}":"月夜貓 ×{1}","Play {1} runs.":"遊玩 {1} 場。","Poring Hat":"波利帽","Strength: +{1} ATK per point on melee jobs, +{2} ATK on ranged jobs.":"力量：近戰職業每點 +{1} ATK，遠距離職業每點 +{2} ATK。","Unicorn Horn":"獸角頭飾","Vitality: +{1}% max HP, +{2} HP/s regeneration and +{3}% potion healing per point.":"體質：每點 +{1}% 最大 HP、每秒 +{2} HP 自然恢復，並 +{3}% 藥水恢復量。","Win {1} runs.":"贏得 {1} 場。","You can see it in the preview, but you cannot apply it yet.":"可在預覽中查看，目前尚未解鎖套用。","you have {1}":"持有 {1}",": Unlocked in the Endless Tower (coming soon).":"：在無限塔解鎖（即將推出）。","+{1} orb":"+{1} 顆環繞物","+{1} projectile":"+{1} 個投射物","+{1}% area · +{2}% damage":"+{1}% 作用範圍 · +{2}% 傷害","+{1}% critical damage":"+{1}% 暴擊傷害","+{1}% lifesteal":"+{1}% 生命偷取","Angel's Reincarnation":"天使之降臨","Angelic Protection":"天使之守護","Big Ribbon":"紅蝶髮帶","Click what you want to sell to mark it. On cards, each click marks one more copy. Anything a character is wearing can't be sold.":"點選要出售的物品以標記。卡片每點一次就多選一張。角色身上已裝備的物品無法出售。","Cooldown Potion +{1}":"冷卻藥水 +{1}","Creamy":"克瑞米","Creamy Card":"克瑞米卡片","Cute Ribbon":"粉紗髮圈","Dusk · Cloudy":"黃昏 · 多雲","Eclipse Card":"藍瘋兔卡片","Equipped in Weapon":"已鑲嵌於武器","Fancy Flower":"花朵頭飾","Ice bolts fall from the sky and slow (they can learn to freeze). Each level adds one more bolt.":"冰箭從空中落下並使敵人減速，可習得凍結效果。每升一級就多一發。","Mage, Acolyte":"魔法師、服事","Midday · Clear":"正午 · 晴朗","Morning · Clear":"早晨 · 晴朗","MVP High Orc":"MVP 獸人戰士長","MVP Kraken":"MVP 魔鬼大烏賊","Race: Brute":"種族：動物","Romantic Gent":"回憶帽","Rotate the camera":"旋轉視角","Silk Robe":"絲質外袍","Size: Medium":"體型：中型","South of Prontera · MVP Mastering":"普隆德拉南方 · MVP 波利之王","Tidal Shoes":"防水長靴","Toad Card":"蛙王卡片","Tower points":"高塔點數","Vampiric Blessing":"吸血祝福","Vocal":"蝗蟲之王","Vocal Card":"蝗蟲之王卡片","Your gearscore:":"你的裝備評分：","{1}. Attack: Rod":"{1}. 攻擊：手杖","{1}. Fire Bolt":"{1}. 火箭術","→ -{1},{2}% damage taken":"→ 受到的傷害 -{1},{2}%","→ +{1} cast speed":"→ +{1} 詠唱速度","→ +{1} Haste":"→ +{1} 冷卻加速","→ +{1} projectiles":"→ +{1} 個投射物","→ +{1} repeats":"→ +{1} 次重複施放","→ +{1} targets":"→ +{1} 個目標","→ +{1},{2}% lifesteal":"→ +{1},{2}% 生命偷取","→ +{1}% area":"→ +{1}% 作用範圍","→ +{1}% critical chance":"→ +{1}% 暴擊率","→ +{1}% critical damage":"→ +{1}% 暴擊傷害","→ +{1}% damage":"→ +{1}% 傷害","→ +{1}% damage over time":"→ +{1}% 持續傷害","→ +{1}% damage to bosses and elites":"→ 對首領及菁英的傷害 +{1}%","→ +{1}% dodge":"→ +{1}% 迴避率","→ +{1}% double cast chance":"→ +{1}% 雙重詠唱機率","→ +{1}% max HP":"→ +{1}% 最大 HP","→ +{1}% melee reach":"→ +{1}% 近戰攻擊距離","→ +{1}% pierce":"→ +{1}% 貫穿","→ +{1}% speed":"→ +{1}% 速度","+{1} cast speed":"+{1} 詠唱速度","+{1}% Flee":"+{1}% 迴避率","+{1}% pierce chance":"+{1}% 貫穿機率","★ +{1}% projectile speed":"★ +{1}% 投射物速度","A skill or item shows up with priority in the rolls (×{1}) for the rest of the run.":"本場剩餘時間內，某項技能或道具會更容易在抽選時出現（×{1}）。","Adventurer":"冒險家","Afternoon · Clear":"午後 · 晴朗","Afternoon · Cloudy":"午後 · 多雲","AGI Dish":"AGI 料理","All upgrades go back to rank {1} and you get the spent points back":"所有強化重置為階級 {1}，並退還已消耗的點數","Apprentice of all":"全職見習生","Area Potion":"範圍藥水","Banish":"放逐","Base EXP:":"基本 EXP：","Blessing of Damage":"傷害祝福","Blessing of Wisdom":"智慧祝福","Boss hunter: Byalan Island":"首領獵人：柏伊亞嵐島","Boss hunter: Payon Cave":"首領獵人：斐揚洞穴","Boss hunter: Payon Forest":"首領獵人：斐揚森林","Boss hunter: Prontera Culverts":"首領獵人：普隆德拉地下水道","Boss hunter: Prontera Fields":"首領獵人：普隆德拉原野","Breeder":"培育家","Cast speed":"詠唱速度","Clear Byalan Island for the first time.":"首次通關柏伊亞嵐島。","Clear Payon Cave for the first time.":"首次通關斐揚洞穴。","Clear Payon Forest for the first time.":"首次通關斐揚森林。","Clear Prontera Castle for the first time.":"首次通關普隆德拉城堡。","Clear Prontera Culverts for the first time.":"首次通關普隆德拉地下水道。","Clear Prontera Fields for the first time.":"首次通關普隆德拉原野。","Clear Sunken Ship for the first time.":"首次通關沉沒之船。","Clear Sunken Ship story for the first time.":"首次通關沉沒之船的劇情。","Critical Damage Elixir +{1}":"暴擊傷害靈藥 +{1}","Curious":"好奇心","Damage over time":"持續傷害","Damage to bosses and elites":"對首領及菁英的傷害","Deed points:":"事蹟點數：","Defeat Drake":"擊敗海盜之王","Defeat Drake for the first time.":"首次擊敗海盜之王。","Defeat Eddga":"擊敗虎王","Defeat Eddga for the first time.":"首次擊敗虎王。","Defeat every mini-boss of Byalan Island (Deviace, Strouf, King Dramoh).":"擊敗柏伊亞嵐島的所有小首領（狄奧斯、海神、大腳龍蝦）。","Defeat every mini-boss of Payon Cave (Skeleton General, Cat O' Nine Tails, Hyegun).":"擊敗斐揚洞穴的所有小首領（邪骸戰士長、狂暴月夜貓、Hyegun）。","Defeat every mini-boss of Payon Forest (Angeling, Deviling, Vagabond Wolf).":"擊敗斐揚森林的所有小首領（天使波利、惡魔波利、流浪之狼）。","Defeat every mini-boss of Prontera Culverts (Biting Tarou, Plague Tarou, Burrowing Tarou).":"擊敗普隆德拉地下水道的所有小首領（Biting Tarou、Plague Tarou、Burrowing Tarou）。","Defeat every mini-boss of Prontera Fields (Eclipse, Toad, Dragon Fly, Vocal).":"擊敗普隆德拉原野的所有小首領（藍瘋兔、蛙王、龍蠅、蝗蟲之王）。","Defeat Golden Thief Bug":"擊敗黃金蟲","Defeat Golden Thief Bug for the first time.":"首次擊敗黃金蟲。","Defeat High Orc":"擊敗獸人戰士長","Defeat High Orc {1} times.":"擊敗獸人戰士長 {1} 次。","Defeat High Orc for the first time.":"首次擊敗獸人戰士長。","Defeat Kraken":"擊敗魔鬼大烏賊","Defeat Kraken for the first time.":"首次擊敗魔鬼大烏賊。","Defeat Mastering":"擊敗波利之王","Defeat Mastering for the first time.":"首次擊敗波利之王。","Defeat Moonlight Flower":"擊敗月夜貓","Defeat Moonlight Flower for the first time.":"首次擊敗月夜貓。","Deities of other skills keep showing up after you take the first one: you can switch Deity mid-run (its refines are lost).":"取得第一個神格後，其他技能的神格仍會出現。可在本場中途更換神格，更換後會失去原神格的精鍊。","Deity · this run only":"神格 · 僅限本場","Deity of Binding +{1}":"束縛神格 +{1}","Each rank is one more use per run. Uses show up as buttons on the level-up cards.":"每提高一個階級，本場就能多使用一次。可從升級卡片上的按鈕使用。","Eclipse has appeared!":"藍瘋兔出現了！","Element: Earth {1}":"屬性：地 {1}","Element: Fire {1}":"屬性：火 {1}","End of days":"末日","Enemy damage":"敵人傷害","Enemy health":"敵人生命值","Enemy speed":"敵人速度","Entering Prontera Fields…":"正在進入普隆德拉原野…","Every floor cleared gives tower points (more on boss floors and on higher ones). Upgrades are permanent and each rank costs more than the last (the strongest ones have a cap); they only count in the tower.":"每通關一層可獲得高塔點數，首領樓層與較高樓層給得更多。強化永久保留，階級越高消耗越多點數，最強的項目設有上限。這些強化只在塔內生效。","Evolution":"進化","Evolve a pet.":"讓一隻寵物進化。","Experience":"經驗值","Exterminator":"殲滅者","Faithful friend":"忠實夥伴","First blood":"首殺","First companion":"第一位夥伴","Flee Elixir":"迴避靈藥","Focus":"專注","Full lineage":"完整傳承","Get":"取得","Get a pet.":"取得一隻寵物。","Get all {1} 2nd jobs.":"取得全部 {1} 種二轉職業。","Get all {1} evolved pets.":"取得全部 {1} 種進化寵物。","Have {1} Loyal pets.":"擁有 {1} 隻親密度達「忠誠」的寵物。","High Orc ×{1}":"獸人戰士長 ×{1}","Hydra hunter":"海葵獵人","Jack of many trades":"多才多藝","Job EXP:":"職業 EXP：","Kill {1} Hydra.":"擊殺 {1} 隻海葵。","Kill {1} Merman.":"擊殺 {1} 隻人魚士兵。","Kill {1} Orc Warrior.":"擊殺 {1} 隻獸人戰士。","Kill {1} Poring.":"擊殺 {1} 隻波利。","Kill {1} Skeleton.":"擊殺 {1} 隻邪骸戰士。","Kill {1} Smokie.":"擊殺 {1} 隻狸貓。","Kill {1} Sohee.":"擊殺 {1} 隻鬼女。","Kill {1} Tarou.":"擊殺 {1} 隻白鼠。","Kill {1} Thief Bug.":"擊殺 {1} 隻盜蟲。","Kill {1} Whisper.":"擊殺 {1} 隻白幽靈。","Kill {1} Wolf.":"擊殺 {1} 隻狼。","KP":"KP（卡普拉點數）","Legend":"傳奇","Lifesteal":"生命偷取","Loyal pack":"忠誠夥伴群","LUK Dish":"LUK 料理","Lv {1} · Mini":"Lv {1} · 小首領","Master of trades":"全職大師","Maxed job":"職業滿級","Melee reach":"近戰攻擊距離","Merman hunter":"人魚士兵獵人","Move":"移動","Night · Cloudy":"夜晚 · 多雲","Number of enemies":"敵人數量","Number of events":"事件數量","Obsession":"執著","of {1} earned":"共 {1} 項","Orc Warrior hunter":"獸人戰士獵人","Picky":"小雞","Picky Card":"小雞卡片","Plague of Rune-Midgard":"盧恩米德加茲之災","Play runs with {1} different 1st jobs.":"用 {1} 種不同的一轉職業遊玩。","Play runs with all {1} classic 1st jobs.":"用全部 {1} 種經典一轉職業遊玩。","Poring hunter":"波利獵人","Projectiles":"投射物","Promote any character to a 2nd job.":"將任一角色升為二轉職業。","Race: Plant":"種族：植物","Raise a pet to Loyal.":"將一隻寵物的親密度提升至「忠誠」。","Reach and targets":"攻擊距離與目標數","Reach Job Lv {1} with any character.":"任一角色達到職業等級 {1}。","Refines any item from +{1} to +{2}":"可將任何道具從 +{1} 精鍊至 +{2}","Removes a skill or item from the rolls for the rest of the run; if you already have it, it stops showing up for upgrades.":"將某項技能或道具從本場剩餘的抽選中移除。已持有的項目也會從強化選項中移除。","Repeats":"重複施放次數","Reroll card":"重抽卡片","Reroll deck":"重抽整組卡片","Rerolls one card: same skill with a different upgrade, or the same chest slot with a different piece.":"重抽一張卡片：同一技能會換一項強化，寶箱則會在同一裝備部位換一件裝備。","Reset upgrades":"重置強化","Run":"本場","Run level":"本場等級","Rune-Midgard Zoo":"盧恩米德加茲動物園","Scourge of monsters":"魔物剋星","Second job":"二轉職業","Shifting Deity":"更換神格","Skeleton hunter":"邪骸戰士獵人","Smokie hunter":"狸貓獵人","Sohee hunter":"鬼女獵人","Sunken Ship story":"沉沒之船劇情","Survival":"生存","Survivor":"倖存者","Swaps the cards of a level-up or a chest for new ones.":"將升級或寶箱的所有卡片換成新卡片。","Switch character (in Prontera)":"切換角色（在普隆德拉）","Tamer":"馴獸師","Targets":"目標數","Tarou hunter":"白鼠獵人","The ladder is made of runs verified by the server: you need a registered account.":"排行榜只收錄伺服器驗證的場次，需要註冊帳號才能上榜。","Thief Bug hunter":"盜蟲獵人","Time":"時間","Tireless":"不知疲倦","Toad has appeared!":"蛙王出現了！","Toughness":"堅韌","Trail of ice along the ground that freezes the enemy. Deals no damage: crowd control only.":"冰霜沿地面蔓延，使敵人凍結。只提供控場效果。","Uncommon · Tier {1} · Footgear":"罕見 · 階級 {1} · 鞋子","Undefeated":"未嘗敗績","Versatile":"多面手","Veteran":"老手","VIT Dish":"VIT 料理","Whisper hunter":"白幽靈獵人","Wolf hunter":"狼獵人","You reached Base Lv {1}! +{2} stat points":"你達到基本等級 {1}！獲得 {2} 點能力值點數","Zoom the camera in or out":"拉近或拉遠視角",": Unlocked by beating Shadow Niff (coming soon).":"：擊敗 Shadow Niff 後解鎖（即將推出）。","{1}-minute floors":"每層 {1} 分鐘","{1}. Fire Wall":"{1}. 火焰之壁","{1}. Lightning Bolt":"{1}. 雷擊術","{1}. Napalm Beat":"{1}. 心靈爆破","{1}. Sight":"{1}. 火狩","{1}. Soul Strike":"{1}. 聖靈召喚","{1}. Thunderstorm":"{1}. 雷爆術","+: raise · Right click on +: raise {1} · −: lower":"+：提升 · 在 + 上按滑鼠右鍵：提升 {1} · −：降低","+{1} STR · +{2}% damage":"+{1} STR · +{2}% 傷害","+{1}% critical":"+{1}% 暴擊率","+{1}% double cast":"+{1}% 雙重詠唱","+{1}% max HP":"+{1}% 最大 HP","Archer, Thief":"弓箭手、盜賊","Auto":"自動","Back to character":"返回角色選擇","Best floor":"最高樓層","Best score":"最高分","Blessing of Casting":"詠唱祝福","Blessing of Double Cast":"雙重詠唱祝福","Blessing of Wisdom +{1}":"智慧祝福 +{1}","Bow (Common)":"弓（普通）","Casting Elixir":"詠唱靈藥","Character (in Prontera)":"角色（在普隆德拉）","Character (in Prontera); add cards to a slot's piece":"角色（在普隆德拉）；將卡片鑲嵌到裝備的插槽","Chat / emotes and quick phrases (in Prontera)":"聊天、表情與快捷短語（在普隆德拉）","Choose or talk to an NPC":"選擇或與 NPC 交談","Choose the item you want to refine.":"選擇要精鍊的道具。","Clear Byalan Island":"通關柏伊亞嵐島","Clear Payon Cave":"通關斐揚洞穴","Clear Payon Forest":"通關斐揚森林","Clear Prontera Culverts":"通關普隆德拉地下水道","Clear Prontera Fields":"通關普隆德拉原野","Clear Sunken Ship":"通關沉沒之船","Club":"木錘","Common · Tier {1}":"普通 · 階級 {1}","Controller":"控制器","Cooldown Potion":"冷卻藥水","Critical Damage Elixir":"暴擊傷害靈藥","Critical Elixir":"暴擊靈藥","Damage dealt and taken, shown over characters":"在角色上方顯示造成與受到的傷害","Dawn · Clear":"黎明 · 晴朗","Dawn · Fog":"黎明 · 有霧","Deity of Avarice":"貪婪神格","Deity of Binding":"束縛神格","Deity of Might":"力量神格","Demoralizing Shout: A shout that demoralizes nearby enemies: they deal {1}% less damage for {2} s. It also deals a little damage to them.":"震懾吶喊：震懾附近的敵人，使其在 {2} 秒內造成的傷害降低 {1}%，並對其造成少量傷害。","Does not move":"原地不動","Dusk · Clear":"黃昏 · 晴朗","Effect opacity":"特效不透明度","Effect quality":"特效品質","Element: Water {1}":"屬性：水 {1}","Emveretarcon":"強化武器金屬-級數二","Endure: You weather the blows: -{1}% damage taken for {2} s.":"霸體：抵禦打擊，在 {2} 秒內受到的傷害降低 {1}%。","Enter the party panel (in Prontera); B leaves it":"開啟隊伍面板（在普隆德拉），按 B 離開","Equipped in Armor":"已鑲嵌於防具","Exit to menu":"返回主選單","Friends (in Prontera)":"好友（在普隆德拉）","Go back":"返回","Hides swear words and insults in the chat; the worst is always hidden":"隱藏聊天中的髒話和侮辱詞語，最嚴重的詞語一律隱藏","Install":"安裝","INT Dish":"INT 料理","Interface size":"介面大小","Kill nonstop, chain combos and climb floor by floor with your Deity and your cards":"持續擊殺魔物、累積連擊，靠神格和卡片逐層向上挑戰","Legendary":"傳奇","Life Potion":"生命藥水","Loot obtained":"獲得的戰利品","Magnum Break, meteors and other heavy hits":"怒爆、隕石和其他重擊","Mandragora":"曼陀蘿魔花","Mandragora Card":"曼陀蘿魔花卡片","Medium and low show fewer hit sparks, crit effects, smoke and damage numbers at once":"中、低畫質會減少同時顯示的命中特效、暴擊特效、煙霧及傷害數字","Midday · Cloudy":"正午 · 多雲","Morning · Fog":"早晨 · 有霧","Move around menus":"瀏覽選單","Mute":"靜音","Night · Clear":"夜晚 · 晴朗","Night · Fog":"夜晚 · 有霧","No cards. Every monster can drop its own.":"目前沒有卡片。每種魔物都有機會掉落自己的卡片。","Options, pause or go back":"開啟選項、暫停或返回","Ores to refine your equipment. To refine, talk to Hollgrehenn the blacksmith in the square.":"用來精鍊裝備的礦石。要精鍊請找廣場上的鐵匠 忽克連。","Pauses the run when you switch tabs or apps":"切換分頁或應用程式時暫停本場遊戲","Phracon":"強化武器金屬-級數一","Pick a nearby player (in Prontera); A, their menu":"選擇附近的玩家（在普隆德拉），按 A 開啟對方的選單","Play (in character select)":"開始遊戲（在角色選擇畫面）","Profanity filter":"髒話過濾","Provoke: Provokes nearby enemies: they take +{1}% damage for {2} s.":"挑釁：挑釁附近的敵人，使其在 {2} 秒內受到的傷害增加 {1}%。","Ranged":"遠距離","Refine":"精鍊","Refines armor, shields, garments, footgear and headgear from +{1} to +{2}":"可將防具、盾牌、披肩、鞋子和頭飾從 +{1} 精鍊至 +{2}","Refines weapons from +{1} to +{2}":"可將武器從 +{1} 精鍊至 +{2}","Right click: remove a talent point or a slot's piece, +{1} to a stat":"滑鼠右鍵：移除 一點天賦或卸下該欄位的裝備，或讓能力值 +{1}","Select a card to see what it gives.":"選擇一張卡片，查看它提供的效果。","Shield Bash: You project a shield of light at the nearest enemy: it hits everything it passes through. Requires a shield. (requires a shield)":"Shield Bash：朝最近的敵人投射光盾，擊中路徑上的所有敵人。需要裝備盾牌。","Single target · Cast {1} s":"單一目標 · 詠唱 {1} 秒","Skills and hits; boss warnings and loot always stay fully visible":"影響技能和命中特效，首領警示和戰利品會維持完整顯示","Skills for the tower":"高塔技能","Spear":"長矛","STR Dish":"STR 料理","STR: your Swordsman deals damage with it.":"STR：劍士的傷害由此能力值決定。","Straight damage numbers":"傷害數字直線上升","Switch filter or talent branch":"切換篩選條件或天賦分支","Switch tabs in windows":"切換視窗中的分頁","Sword Dance: Sword dance: grows out from you and opens in three pulses of slashes, each one reaching further. Whatever is close to you takes all of them.":"Sword Dance：以自身為中心連續斬擊三波，每波範圍逐漸擴大，靠近你的敵人會吃到全部斬擊。","The tower only opens its doors to those who have advanced to a 2nd job. Clear the Prontera Castle story with this character and come back to talk to me.":"高塔只對已二轉的角色開放。用這個角色通關普隆德拉城堡劇情，再回來找我。","The world and effects are drawn with fewer pixels: smoother on phones and modest machines":"降低場景及特效的渲染解析度，讓手機及效能較低的裝置運行更順暢","They rise straight up and fade, instead of the RO arc":"數字會直線上升並淡出。","Tidal Shoes of Dexterity (Uncommon)":"靈巧防水長靴（罕見）","Tier {1} · Weapon":"第 {1} 階 · 武器","Tower floors":"高塔樓層","Uncommon · Tier {1}":"罕見 · 階級 {1}","Undo":"復原","Windows, HUD and text":"視窗、HUD 和文字","You have nothing that can be refined.":"你沒有可精鍊的道具。","You reached Job Lv {1}! +{2} talent points":"你達到職業等級 {1}！獲得 {2} 點天賦點數","You start with these skills at rank {1}. There is no EXP, no chests and no loot in the tower: before each floor you pick a card that improves one of them. The rest of your power comes from your gear, your Deity and your tower upgrades.":"你會帶著這些階級 {1} 的技能入塔。塔內沒有 EXP、寶箱和戰利品。進入每層前可選一張卡片，強化其中一項技能。其餘戰力來自裝備、神格及高塔強化。","Your job can't use this item.":"目前職業無法使用此道具。","Zone · Cast {1} s":"區域 · 詠唱 {1} 秒","Floor {1}":"第 {1} 層","{1} selected ·":"已選 {1} 項 ·","Element: Neutral {1}":"屬性：無 {1}","Race: Fish":"種族：魚貝","✗ Gearscore {1} (you have {2})":"✗ 需要裝備評分 {1}（目前 {2}）","Requirements":"需求","Element: Shadow {1}":"屬性：暗 {1}","Blessing of Cooldown +{1}":"冷卻祝福 +{1}","Freeze":"凍結","Refine to +{1}":"精鍊至 +{1}","Refined to +{1}":"已精鍊至 +{1}","Safe up to +{1}: it cannot fail.":"安全精鍊上限為 +{1}，必定成功。","Single target · Lv {1}":"單一目標 · Lv {1}","Water":"水","Mini":"小首領","Uncommon · Armor · Tier {1} · Safe up to +{2}":"罕見 · 防具 · 階級 {1} · 安全精鍊至 +{2}","+{1} armor · +{2}% max HP":"+{1} 防禦 · +{2}% 最大 HP","+{1}% projectile speed":"+{1}% 投射物速度","Area Elixir +{1}":"範圍靈藥 +{1}","Blessing · this run only":"祝福 · 僅限本場","Deity of the Bulwark":"壁壘神格","Freeze: {1} s":"凍結：{1} 秒","Weapon · Tier {1} · Safe up to +{2}":"武器 · 階級 {1} · 安全精鍊至 +{2}","✗ Defeat High Orc":"✗ 擊敗獸人戰士長","✗ Defeat Mastering":"✗ 擊敗波利之王","✗ Defeat Orc Hero":"✗ 擊敗獸人英雄","Beneath the streets of Prontera · MVP Golden Thief Bug":"普隆德拉街道下方 · MVP 黃金蟲","Blessing of Cooldown":"冷卻祝福","Element: Poison {1}":"屬性：毒 {1}","Geffen Fields · MVP Orc Hero":"吉芬原野 · MVP 獸人英雄","General":"綜合","Morroc Desert · MVP Osiris":"夢羅克沙漠 · MVP 俄塞里斯","Race: Demi-Human":"種族：人形","Sign out and go back to the title screen":"登出並返回標題畫面","Story":"劇情","+{1} orbs":"+{1} 顆環繞物","★ +{1}% stun on hit":"★ 命中時 +{1}% 暈眩機率","✗ Clear the story":"✗ 通關劇情","✗ Defeat Drake":"✗ 擊敗海盜之王","✗ Defeat Eddga":"✗ 擊敗虎王","✗ Defeat Golden Thief Bug":"✗ 擊敗黃金蟲","✗ Defeat Kraken":"✗ 擊敗魔鬼大烏賊","✗ Defeat Moonlight Flower":"✗ 擊敗月夜貓","✗ Job Lv {1} (you have {2})":"✗ 需要職業等級 {1}（目前 {2}）","Afternoon · Fog":"午後 · 有霧","ago":"前","Alberta Coast · MVP Drake":"艾爾貝塔海岸 · MVP 海盜之王","Alphanumeric":"英文字母與數字","Area Elixir":"範圍靈藥","Beneath the Payon mountains · MVP Moonlight Flower":"斐揚山區下方 · MVP 月夜貓","Casting Potion":"詠唱藥水","Casting Potion +{1}":"詠唱藥水 +{1}","Checking the tower on the server…":"正在向伺服器查詢高塔資料…","Clear the story first":"請先通關劇情","Club of Dexterity":"靈巧木錘","Club of Dexterity (Uncommon)":"靈巧木錘（罕見）","Deity of Trickery":"詭計神格","Deity of War":"戰爭神格","Dusk · Fog":"黃昏 · 有霧","Each character's best run counts: the highest score and, on a tie, the highest floor cleared. Only runs verified by the server (it checks them throughout the day). Seasons are monthly (UTC).":"每個角色只計最佳場次，優先比較分數，同分時比較通關樓層。只收錄經伺服器確認的場次，伺服器會在一天內陸續檢查。賽季以 UTC 時間按月劃分。","Elixir · this run only":"靈藥 · 僅限本場","High Orc":"獸人戰士長","Morning · Storm":"早晨 · 暴風雨","New!":"新！","No equipment or card.":"沒有裝備或卡片。","Outskirts of Payon · MVP Eddga":"斐揚郊外 · MVP 虎王","Size: Large":"體型：大型","The Izlude dungeon · MVP Kraken":"依斯魯得地下城 · MVP 魔鬼大烏賊","Throne room · MVP High Orc":"王座大廳 · MVP 獸人戰士長","Yet to be discovered":"尚未發現","Freeze chance":"凍結機率","Plague Tarou":"瘟疫白鼠","Slow":"緩速","+{1}% orbit speed":"+{1}% 環繞速度","Burrowing Tarou":"掘地白鼠","Freeze chance: {1}%":"凍結機率：{1}%","Uncommon · Weapon · Tier {1} · Safe up to +{2}":"罕見 · 武器 · 階級 {1} · 安全精鍊至 +{2}","+{1} armor":"+{1} 防禦","+{1} impacts":"+{1} 次衝擊","+{1}% movement speed":"移動速度 +{1}%","Armor Potion":"防禦藥水","Biting Tarou":"噬咬白鼠","-{1}% damage taken":"受到的傷害 -{1}%","{1}. Cold Bolt":"{1}. 冰箭術","+{1} m pickup radius":"拾取半徑 +{1} 公尺","Armor Elixir":"防禦靈藥","Boa":"青蛇","Casting Elixir +{1}":"詠唱靈藥 +{1}","Damage Elixir":"傷害靈藥","Damage Potion":"傷害藥水","Dawn · Drizzle":"黎明 · 細雨","Dawn · Heavy rain":"黎明 · 大雨","DEX Dish":"DEX 料理","Dusk · Heavy rain":"黃昏 · 大雨","Gathering Potion":"採集藥水","Hyegun":"妖君","Midday · Drizzle":"正午 · 細雨","Morning · Drizzle":"早晨 · 細雨","Night · Heavy rain":"夜晚 · 大雨","You reached Job Lv {1}! +{2} talent point":"你達到職業等級 {1}！獲得 {2} 點天賦點數","Brandish Spear":"騎乘攻擊","Beast Strafing":"動物猛擊","Safety Wall":"暗之障壁","Rush Quake":"衝擊撼動","Chemical Protection":"化學保護","Sword Dance":"劍舞","Demoralizing Shout":"挫志怒吼","Shield Bash":"盾擊","Arrow Rain":"箭矢風暴","Retreat":"後撤射擊","Arcane Shot":"秘法射擊","Fire Arrow":"火焰箭","Holy Smite":"神聖重擊","Poison Bomb":"毒霧炸彈","Shadowstep":"暗影步","Fan of Knives":"飛刀扇擊","Caltrops":"鐵蒺藜","Zeny Rain":"金幣雨","Cart Rush":"手推車突進","Peco Peco":"大嘴鳥","Arcane Shot Mastery":"秘法射擊精通","You project a shield of light at the nearest enemy: it hits everything it passes through. Requires a shield.":"向最近的敵人投射光盾，擊中沿途所有敵人。需裝備盾牌。","A shout that demoralizes nearby enemies: they deal {1}% less damage for {2} s. It also deals a little damage to them.":"怒吼對周圍敵人造成少量傷害，並使其造成的傷害降低 {1}%，持續 {2} 秒。","You leap back, away from the nearest enemy, and on landing fire a powerful arrow at it that pierces everything in line. You are immune to damage for {1} s.":"向後跳離最近的敵人，落地時朝該敵人射出強力箭矢，貫穿沿途敵人。你在 {1} 秒內免疫傷害。","An arcane shot at the center of the biggest group in range: on impact it releases a pulse that yanks nearby monsters (except bosses) toward it.":"朝射程內最大的敵群中心射擊。命中時釋放脈衝，將周圍敵人拉向落點，首領除外。","A fire arrow lobbed at the nearest enemy: it bursts like a fireball that damages and burns everything in the impact, and splashes fire further out that burns the enemies around it.":"向最近的敵人拋射火焰箭。爆炸會傷害並灼燒命中範圍內的敵人，飛濺的火焰也會灼燒更外圍的敵人。","You fire a volley of arrows into the sky that soon rains down on the marked group.":"向空中齊射，箭矢稍後落在標記的敵群上。","+{1} arrows and +{2}% damage.":"箭矢 +{1}，傷害 +{2}%。","A blessed mace blow to the nearest enemy: a brutal physical hit that stuns it briefly. It blesses your weapon for each enemy it hits: your next basic attacks deal +{1}% damage and release a holy wave that hits those around. Requires a mace, knuckles or a book.":"對最近的敵人施以強力物理重擊並使其短暫暈眩。每命中一名敵人就會祝福你的武器。接下來的普通攻擊傷害 +{1}%，並釋放攻擊周圍敵人的聖光波。需裝備鈍器、拳套或書本。","You throw a poison flask at a group of enemies: it bursts, damaging all of them and badly poisoning them for {1} s.":"朝敵群投擲毒藥瓶，爆裂時對所有命中的敵人造成傷害，並使其深度中毒 {1} 秒。","+{1}% damage, -{2} max HP.":"傷害 +{1}%，最大 HP -{2}。","Sword dance: grows out from you and opens in three pulses of slashes, each one reaching further. Whatever is close to you takes all of them.":"從自身向外斬出三波逐漸擴大的劍氣。近處敵人會被三波全數命中。","You make zeny rain over an area: {1} pulses that stun for {2} s and, for {3} s, make Mammonite hit those caught for +{4}%. Bosses aren't stunned: for that time they take {5}% more damage from everything.":"在指定範圍降下金幣雨，共 {1} 波，每波使敵人暈眩 {2} 秒。命中的敵人在 {3} 秒內受到金錢攻擊的傷害 +{4}%。首領免疫暈眩，但在同一期間受到的所有傷害增加 {5}%。","You charge with your cart where you are heading: you run over whoever you catch and shove them aside to clear the way.":"推著手推車向前突進，撞擊沿途的敵人並將其推向兩側。","You appear behind the strongest nearby enemy and stun it; for {1} s you have {2}% more Flee and move {3}% faster. After each jump you are immune to damage for {4} s.":"瞬移到附近最強的敵人身後，使其暈眩。接下來 {1} 秒內，迴避增加 {2}%，移動速度增加 {3}%。每次瞬移後免疫傷害 {4} 秒。","You throw two fans of knives in a row around you that hit every nearby enemy.":"連續向周圍擲出兩波扇形飛刀，命中附近所有敵人。","You scatter a line of caltrops between you and the enemies: those who step on it take damage and slow down.":"在你與敵人之間撒下一排鐵蒺藜，踩到的敵人會受到傷害並減速。","You sweep everything in front of you from your Peco: damages and pushes away enemies in the fan.":"騎著大嘴鳥揮掃前方，對扇形範圍內的敵人造成傷害並擊退。","Two heavy arrows at the strongest enemy in range: +{1}% damage to bosses and elites.":"向射程內最強的敵人射出兩支重箭，對首領與菁英的傷害 +{1}%。","A barrier of light surrounds you and absorbs the next {1} hits you take.":"光之屏障環繞自身，抵銷接下來受到的 {1} 次攻擊。","You strike the ground with all your might: the shockwave damages and may stun every enemy around.":"用力猛擊地面，衝擊波對周圍敵人造成傷害，並可能使其暈眩。","For {1} s you take {2}% less damage and have +{3} armor.":"在 {1} 秒內，受到的傷害減少 {2}%，防禦 +{3}。","Great cross of light around you: heavy holy damage (x2 vs undead), but it costs {1}% of your current HP.":"在周圍施放巨大的光之十字，造成大量聖屬性傷害（對不死系 x2），但會消耗當前 HP 的 {1}%。","+{1}% discovery":"+{1}% 發現率","Elixir of Surprise +{1}":"驚喜靈藥 +{1}","+{1}% EXP · +{2}% discovery":"EXP +{1}% · 發現率 +{2}%","Deity of Wisdom +{1}":"智慧神格 +{1}","+{1} pulse":"脈衝 +{1} 次","Damage Potion +{1}":"傷害藥水 +{1}","STR Dish +{1}":"STR 料理 +{1}","Control":"控場","HP regenerated: {1}":"HP 已恢復：{1}","+{1} max HP":"最大 HP +{1}","+{1}% melee reach":"近戰攻擊距離 +{1}%","Blessing of Area +{1}":"範圍祝福 +{1}","Life Elixir +{1}":"生命靈藥 +{1}","Physical":"物理","{1} in your album":"圖鑑已收錄 {1} 張","Buff":"增益","Slots into: Accessory":"可插入：飾品","Socket them from Equipment, with \"Add cards\".":"請到「裝備」，使用「加入卡片」功能插卡。","★ -{1}% damage taken":"★ 受到的傷害 -{1}%","Afternoon · Rain":"下午 · 雨","Damage: Melee ATK ×{1} · overall ×{2}":"傷害：近戰 ATK ×{1} · 總倍率 ×{2}","Dusk · Rain":"黃昏 · 雨","Melee":"近戰","Morning · Cloudy":"早晨 · 多雲","Piercing":"貫穿","Potion · this run only":"藥水 · 僅限本場","Projectile · Lv {1}":"投射物 · Lv {1}","Stun chance: {1}%":"暈眩機率：{1}%","{1}. Attack: Sword":"{1}. 攻擊：劍","{1}. Magnum Break":"{1}. 怒爆","{1}. Shield Bash":"{1}. 盾擊","+{1}% zeny":"Zeny 收益 +{1}%","Aura":"光環","Damage: upgrades +{1}% · Ranged ATK ×{2} · overall ×{3}":"傷害：升級加成 +{1}% · 遠程 ATK ×{2} · 總倍率 ×{3}","Elixir of Surprise":"驚喜靈藥","Extra damage taken: {1}%":"額外受到的傷害：{1}%","Night · Drizzle":"夜晚 · 細雨","Night · Rain":"夜晚 · 雨","Potion of Greed":"貪婪藥水","{1}. Bash":"{1}. 狂擊","{1}. Sword Dance":"{1}. 劍舞","+{1} ATK · ★ +{2}% stun on hit · +{3} DEX":"+{1} ATK · ★ 命中時的暈眩機率 +{2}% · +{3} DEX","+{1} HP every {2} s":"每 {2} 秒恢復 {1} HP","+{1}% Shield Bash damage":"盾擊傷害 +{1}%","★ +{1}% movement speed":"★ 移動速度 +{1}%","Adventurer's Suit (Common)":"冒險衣（普通）","Afternoon · Heavy rain":"下午 · 大雨","Angelic Protection of Dexterity":"靈巧的天使之守護","Angelic Protection of Dexterity (Legendary)":"靈巧的天使之守護（傳奇）","Big Ribbon of Agility":"敏捷的紅蝶髮帶","Big Ribbon of Agility (Uncommon)":"敏捷的紅蝶髮帶（罕見）","Black Guard":"黑甲衛士","Blessing of Area":"範圍祝福","Blood Savage":"嗜血蠻兵","Bronze Sentry":"青銅哨兵","Buff · Lv {1}":"增益 · Lv {1}","Cards obtained":"已獲得的卡片","Damage: Ranged ATK ×{1} · overall ×{2}":"傷害：遠程 ATK ×{1} · 總倍率 ×{2}","Deity of Wisdom":"智慧神格","Dragon Fly has appeared!":"龍蠅出現了！","Dusk · Drizzle":"黃昏 · 細雨","Epic · Tier {1}":"史詩 · 階級 {1}","Fancy Flower of Strength":"力量的花朵頭飾","Fancy Flower of Strength (Epic)":"力量的花朵頭飾（史詩）","Hits":"命中次數","Hover over (or tap) an item in the list to see what you gain and lose.":"將游標移到清單中的物品上，或輕點物品，即可查看屬性的增減。","HP regenerated":"HP 已恢復","HP regenerated: +{1}":"HP 已恢復：+{1}","Legendary · Tier {1}":"傳奇 · 階級 {1}","Life Elixir":"生命靈藥","Midday · Fog":"正午 · 霧","Midday · Heavy rain":"正午 · 大雨","Midday · Rain":"正午 · 雨","Morning · Rain":"早晨 · 雨","MVP Mastering has appeared!":"MVP 波利之王出現了！","Regeneration Potion":"再生藥水","Time's up! Meteor shower":"時間到！流星雨來襲","Scorched Earth: the explosion leaves a ring of fire on its edge for {1} s that burns {2}% of its damage per second to anyone standing on it":"焦土：爆炸在範圍邊緣留下持續 {1} 秒的火環。站在火環上的目標每秒受到相當於爆炸傷害 {2}% 的灼燒傷害","Buff damage reduction: {1}%":"增益減傷：{1}%","Magnum Break Deity +{1}":"怒爆神格 +{1}","★ +{1} Haste":"★ 冷卻加速 +{1}","★ +{1} max HP":"★ 最大 HP +{1}","Afternoon · Drizzle":"下午 · 細雨","Cotton Shirt (Common)":"棉襯衫（普通）","Cute Ribbon of Agility":"敏捷的粉紗髮圈","Cute Ribbon of Agility (Rare)":"敏捷的粉紗髮圈（稀有）","Dawn · Cloudy":"黎明 · 多雲","Deity of the Executioner":"處刑者神格","Magnum Break Deity":"怒爆神格","Rare · Tier {1}":"稀有 · 階級 {1}","Talk to the merchant":"與礦石商人交談","Talk to the blacksmith":"與鐵匠交談","Talk to the guardian":"與高塔守衛交談","Talk to the stylist":"與造型師交談","Talk to the librarian":"與圖書管理員交談","Talk to the chronicler":"與事蹟紀錄員交談","Talk to the pet keeper":"與寵物管理員交談","Talk to the Kafra":"與卡普拉職員交談","Talk to the master":"與導師交談","Space":"空白鍵","Evolutions":"進化","Evolve":"進化","Bought":"已購買","Obtained":"已取得","Ready to evolve!":"可以進化了！","You already have it.":"你已擁有這隻寵物。","Worn: bonus ×{1}":"已裝備：加成 ×{1}","Pet bonus ×{1}":"寵物加成 ×{1}","Each pet can wear its RO accessory once it reaches Cordial. Kafra Points are earned by selling gear and cards.":"寵物親密度達到「親密」後，就能裝備專屬飾品。出售裝備和卡片可獲得卡普拉點數。","Boss pets are born by evolving the previous one: with it Loyal and the boss defeated several times. You keep the previous one.":"前一階寵物的親密度達到「忠誠」，並擊敗對應首領指定次數後，即可進化取得首領寵物。進化後仍會保留原本的寵物。","You need Poring.":"你需要先取得波利。","You need Lunatic.":"你需要先取得瘋兔。","You need Drops.":"你需要先取得土波利。","You need Picky.":"你需要先取得小雞。","You need Savage Babe.":"你需要先取得小野豬。","You need Baby Desert Wolf.":"你需要先取得沙漠幼狼。","You need Rocker.":"你需要先取得搖滾蝗蟲。","You need Familiar.":"你需要先取得吸血蝙蝠。","You need Whisper.":"你需要先取得白幽靈。","You need Spore.":"你需要先取得魔菇。","You need Poison Spore.":"你需要先取得毒魔菇。","You need Poporing.":"你需要先取得波波利。","You need Smokie.":"你需要先取得狸貓。","You need Dokebi.":"你需要先取得土人。","You need Nine Tail.":"你需要先取得九尾狐。","You need Willow.":"你需要先取得樹精。","You need Munak.":"你需要先取得殭屍。","You need Bongun.":"你需要先取得妖道。","You need Sohee.":"你需要先取得鬼女。","You need Mastering.":"你需要先取得波利之王。","Poring must be Cordial ({1}/{2}).":"波利的親密度須達到「親密」（{1}/{2}）。","Lunatic must be Cordial ({1}/{2}).":"瘋兔的親密度須達到「親密」（{1}/{2}）。","Drops must be Cordial ({1}/{2}).":"土波利的親密度須達到「親密」（{1}/{2}）。","Picky must be Cordial ({1}/{2}).":"小雞的親密度須達到「親密」（{1}/{2}）。","Savage Babe must be Cordial ({1}/{2}).":"小野豬的親密度須達到「親密」（{1}/{2}）。","Baby Desert Wolf must be Cordial ({1}/{2}).":"沙漠幼狼的親密度須達到「親密」（{1}/{2}）。","Rocker must be Cordial ({1}/{2}).":"搖滾蝗蟲的親密度須達到「親密」（{1}/{2}）。","Familiar must be Cordial ({1}/{2}).":"吸血蝙蝠的親密度須達到「親密」（{1}/{2}）。","Whisper must be Cordial ({1}/{2}).":"白幽靈的親密度須達到「親密」（{1}/{2}）。","Spore must be Cordial ({1}/{2}).":"魔菇的親密度須達到「親密」（{1}/{2}）。","Poison Spore must be Cordial ({1}/{2}).":"毒魔菇的親密度須達到「親密」（{1}/{2}）。","Poporing must be Cordial ({1}/{2}).":"波波利的親密度須達到「親密」（{1}/{2}）。","Smokie must be Cordial ({1}/{2}).":"狸貓的親密度須達到「親密」（{1}/{2}）。","Dokebi must be Cordial ({1}/{2}).":"土人的親密度須達到「親密」（{1}/{2}）。","Nine Tail must be Cordial ({1}/{2}).":"九尾狐的親密度須達到「親密」（{1}/{2}）。","Willow must be Cordial ({1}/{2}).":"樹精的親密度須達到「親密」（{1}/{2}）。","Munak must be Cordial ({1}/{2}).":"殭屍的親密度須達到「親密」（{1}/{2}）。","Bongun must be Cordial ({1}/{2}).":"妖道的親密度須達到「親密」（{1}/{2}）。","Sohee must be Cordial ({1}/{2}).":"鬼女的親密度須達到「親密」（{1}/{2}）。","Poring → Mastering":"波利 → 波利之王","Poring must be Loyal.":"波利的親密度須達到「忠誠」。","Defeat Mastering {1} times ({2}/{3}).":"擊敗波利之王 {1} 次（{2}/{3}）。","Mastering → Angeling":"波利之王 → 天使波利","Mastering must be Loyal.":"波利之王的親密度須達到「忠誠」。","Defeat Angeling {1} times ({2}/{3}).":"擊敗天使波利 {1} 次（{2}/{3}）。","Bongun → Hyegun":"妖道 → 妖君","Bongun must be Loyal.":"妖道的親密度須達到「忠誠」。","Defeat Hyegun {1} times ({2}/{3}).":"擊敗妖君 {1} 次（{2}/{3}）。","Nine Tail → Cat O' Nine Tails":"九尾狐 → 狂暴月夜貓","Nine Tail must be Loyal.":"九尾狐的親密度須達到「忠誠」。","Defeat Cat O' Nine Tails {1} times ({2}/{3}).":"擊敗狂暴月夜貓 {1} 次（{2}/{3}）。","Cosméticos":"外觀","Cosmetics":"外觀","Aspecto":"外觀預覽","Appearance":"外觀預覽","Tu equipo":"你的裝備","Your gear":"你的裝備","Ocultar":"隱藏","Hide":"隱藏","No se ve llevando un arma en cada mano.":"雙手各持一把武器時不會顯示。","Doesn't show while wielding a weapon in each hand.":"雙手各持一把武器時不會顯示。","Se ve con un escudo equipado.":"裝備盾牌時才會顯示。","Shows when a shield is equipped.":"裝備盾牌時才會顯示。","No tiene aspecto para tu job.":"你的職業沒有這個外觀。","It has no look for your job.":"你的職業沒有這個外觀。","Nada equipado":"未裝備","Nothing equipped":"未裝備","No se dibuja la pieza que lleves en esa ranura.":"不會顯示該欄位的裝備。","Whatever you wear in that slot isn't drawn.":"不會顯示該欄位的裝備。","Aún no tienes cosméticos.":"你還沒有任何外觀道具。","You don't have any cosmetics yet.":"你還沒有任何外觀道具。","Puesto":"已穿戴","Worn":"已穿戴","Ponérselo":"穿戴","Wear":"穿戴","Los cosméticos solo cambian cómo se ve: las estadísticas son las de tu equipo. Son de la cuenta y no se comercian.":"外觀道具只會改變外表：屬性仍是你裝備的屬性。屬於帳號，無法交易。","Cosmetics only change how you look: your stats are still those of your gear. They belong to the account and cannot be traded.":"外觀道具只會改變外表：屬性仍是你裝備的屬性。屬於帳號，無法交易。","Cosmético para todos tus personajes. Póntelo en la pestaña Cosméticos del personaje.":"所有角色都能使用的外觀。到角色的「外觀」分頁換上。","Cosmetic for all your characters. Put it on from the Cosmetics tab of the character.":"所有角色都能使用的外觀。到角色的「外觀」分頁換上。","Se consigue al superar el piso {1} de la Endless Tower.":"通過無盡之塔第 {1} 層即可獲得。","Earned by clearing floor {1} of the Endless Tower.":"通過無盡之塔第 {1} 層即可獲得。","Cabeza (arriba)":"頭部（上）","Cabeza (medio)":"頭部（中）","Cabeza (abajo)":"頭部（下）","Lunatic Hat":"瘋兔帽","Frog Prince Hat":"青蛙王子帽","Dragonfly Monocle":"蜻蜓單眼鏡","Musical Note Headband":"音符髮箍","Triple Poring Hat":"三重波利帽","Mouse Hat":"老鼠帽","Queen Scaraba Crown":"女王甲蟲王冠","Ghostring Tall Hat":"幽靈波利高帽","Octopus Leg In Mouth":"叼著章魚腳","Ghost Ship Captain's Hat":"幽靈船長帽","Shark Hat":"鯊魚帽","Fish Head Hat":"魚頭帽","Crab Nipper Hat":"蟹螯帽","Octopus Hat":"章魚帽","Angelring Hat":"天使波利帽","Devilring Hat":"惡魔波利帽","Wandering Wolf King Helmet":"流浪狼王頭盔","Tiger Mask":"老虎面具","Dragon General Helm":"龍將軍頭盔","Drooping Ninetail":"垂耳九尾狐","Yao Jun Hat":"妖君帽","Moonlight Flower Hat":"月夜貓帽","Festival de los Faroles":"燈籠節","Lantern Festival":"燈籠節","Louyang":"洛陽","Pareja del festival":"節慶二人組","Festival duo":"節慶二人組","Bola del Festival":"節慶扭蛋","Festival Ball":"節慶扭蛋","Bola de White Lady":"白素貞扭蛋","White Lady Ball":"白素貞扭蛋","Bola de Evil Snake Lord":"蛇王扭蛋","Evil Snake Lord Ball":"蛇王扭蛋","White Lady":"白素貞","Abrir":"打開","Colección {1}/{2}":"收藏 {1}/{2}","Collection {1}/{2}":"收藏 {1}/{2}","Sale en la Bola del Festival: ábrela con la Anfitriona del Festival de la plaza.":"來自節慶扭蛋：到廣場找節慶主持人打開。","Comes from the Festival Ball: open it with the Festival Host in the plaza.":"來自節慶扭蛋：到廣場找節慶主持人打開。","Sale en la Bola de White Lady: ábrela con la Anfitriona del Festival de la plaza.":"來自白素貞扭蛋：到廣場找節慶主持人打開。","Comes from the White Lady Ball: open it with the Festival Host in the plaza.":"來自白素貞扭蛋：到廣場找節慶主持人打開。","Sale en la Bola de Evil Snake Lord: ábrela con la Anfitriona del Festival de la plaza.":"來自蛇王扭蛋：到廣場找節慶主持人打開。","Comes from the Evil Snake Lord Ball: open it with the Festival Host in the plaza.":"來自蛇王扭蛋：到廣場找節慶主持人打開。","Danza del dragón":"龍舞","Dragon Dance":"龍舞","Petardos":"鞭炮","Firecrackers":"鞭炮","Red de petardos":"鞭炮陣","Firecracker Grid":"鞭炮陣","Aliento de fuego":"火焰吐息","Fire Breath":"火焰吐息","Lluvia de melocotones":"桃子雨","Peach Shower":"桃子雨","Raíces en estrella":"星形樹根","Root Star":"星形樹根","Espiral de melocotones":"桃子螺旋","Peach Spiral":"桃子螺旋","Mil cortes":"千刃斬","Thousand Cuts":"千刃斬","Sombras errantes":"流浪之影","Wandering Shadows":"流浪之影","Desenvaine":"拔刀術","Iaido":"拔刀術","Cruz giratoria":"迴旋十字斬","Spinning Cross":"迴旋十字斬","Espíritu errante":"流浪之魂","Wandering Spirit":"流浪之魂","Raíces que te siguen":"追蹤樹根","Stalking Roots":"追蹤樹根","Terremoto por cuadrantes":"四象地震","Quartered Quake":"四象地震","Tronco rodante":"滾木","Rolling Log":"滾木","Corteza espinosa":"荊棘樹皮","Thorned Bark":"荊棘樹皮","Bosque caído":"倒落之林","Falling Forest":"倒落之林","Mochitsuki":"搗麻糬","Mochi pegajoso":"黏黏麻糬","Sticky Mochi":"黏黏麻糬","Pase de mochi":"麻糬傳球","Mochi Pass":"麻糬傳球","Patada giratoria":"迴旋踢","Spinning Kick":"迴旋踢","¡Furia!":"狂怒！","Fury!":"狂怒！","Grullas de papel":"紙鶴","Paper Cranes":"紙鶴","Reflejo del lago":"湖面倒影","Lake Mirror":"湖面倒影","Flor de loto":"蓮花綻放","Lotus Bloom":"蓮花綻放","Crecida del lago":"湖水氾濫","Lake Flood":"湖水氾濫","¡El lago se desborda!":"湖水氾濫了！","The lake overflows!":"湖水氾濫了！","Serpiente de veneno":"毒蛇","Venom Serpent":"毒蛇","Enroscarse":"盤繞","Coil":"盤繞","Lluvia de escamas":"鱗片之雨","Scale Rain":"鱗片之雨","Ira de la serpiente":"蛇之怒","Serpent's Wrath":"蛇之怒","¡Súbete a una piedra!":"快站上石頭！","Get on a stone!":"快站上石頭！","Trazos venenosos":"劇毒筆觸","Venom Strokes":"劇毒筆觸","Caligrafía de la serpiente":"蛇之書法","Serpent Calligraphy":"蛇之書法","Pinceladas serpenteantes":"蜿蜒筆觸","Serpentine Strokes":"蜿蜒筆觸","Pintura viviente":"活之畫","Living Paint":"活之畫","Sellos de tinta":"墨印","Ink Seals":"墨印","Tinta en los ojos":"墨染雙眼","Ink in the Eyes":"墨染雙眼","Marco de tinta":"墨框","Ink Frame":"墨框","Último trazo":"最後一筆","Final Stroke":"最後一筆","¡Borra los sellos!":"擦掉墨印！","Erase the seals!":"擦掉墨印！","¡El lienzo se cierra!":"畫布正在收縮！","The canvas is closing in!":"畫布正在收縮！","¡Sigue el trazo limpio!":"沿著乾淨的筆跡走！","Follow the clean stroke!":"沿著乾淨的筆跡走！","¡Lávate la tinta en el agua!":"到清水裡洗掉墨汁！","Wash the ink off in the water!":"到清水裡洗掉墨汁！","Algo despierta bajo el lago…":"湖底有什麼正在甦醒……","Something stirs beneath the lake…":"湖底有什麼正在甦醒……","¡El Evil Snake Lord ha despertado!":"蛇王甦醒了！","The Evil Snake Lord has awakened!":"蛇王甦醒了！","Bombardeo de melocotones":"桃子轟炸","Peach Barrage":"桃子轟炸","Sombra del melocotonero":"桃樹之蔭","Peach Tree Shade":"桃樹之蔭","Floración":"盛開","Full Bloom":"盛開","Raíces":"樹根","Roots":"樹根","Pétalos al viento":"風中花瓣","Petals on the Wind":"風中花瓣","¡Brotad!":"發芽吧！","Sprout!":"發芽吧！","Corte errante":"流浪之斬","Wandering Cut":"流浪之斬","Paso fantasma":"幽影步","Ghost Step":"幽影步","Cruz de espadas":"十字劍","Crossed Blades":"十字劍","Estocada":"突刺","Thrust":"突刺","Puñetazo de roble":"橡木重拳","Oak Punch":"橡木重拳","Salto del tronco":"樹幹跳","Log Leap":"樹幹跳","Lluvia de pasteles":"年糕雨","Rice Cake Shower":"年糕雨","Rodillo":"擀麵棍","Rolling Pin":"擀麵棍","Panzazo":"肚子撞擊","Belly Flop":"肚子撞擊","Saltos de primavera":"春之跳躍","Spring Hops":"春之跳躍","Patada de conejo":"兔子踢","Rabbit Kick":"兔子踢","¡A brincar!":"跳起來！","Hop to it!":"跳起來！","Abanico de jade":"玉扇","Jade Fan":"玉扇","Danza de las grullas":"仙鶴之舞","Crane Dance":"仙鶴之舞","Lluvia de pétalos":"花瓣雨","Petal Shower":"花瓣雨","Ondas del lago":"湖之漣漪","Lake Ripples":"湖之漣漪","¡Guardias!":"侍衛！","Guards!":"侍衛！","Remolino del lago":"湖之漩渦","Lake Whirlpool":"湖之漩渦","Colmillos del rey":"蛇王之牙","King's Fangs":"蛇王之牙","Latigazo de cola":"尾鞭","Tail Lash":"尾鞭","Veneno real":"王者之毒","Royal Venom":"王者之毒","Anillos de la serpiente":"蛇之纏繞","Serpent Coils":"蛇之纏繞","Embestida de escamas":"鱗甲衝撞","Scale Charge":"鱗甲衝撞","¡Hijos de la serpiente!":"蛇之子嗣！","Children of the serpent!":"蛇之子嗣！","Despertar del rey":"蛇王覺醒","The King Awakens":"蛇王覺醒","Furia de la serpiente":"蛇之怒","Serpent's Fury":"蛇之怒","Temporada · hasta Navidad":"季節活動 · 至聖誕節","Season · until Christmas":"季節活動 · 至聖誕節","Gacha":"扭蛋","Colección":"收藏","Collection":"收藏","Anfitriona del Festival":"節慶主持人","Festival Host":"節慶主持人","Hablar con la anfitriona":"與主持人交談","Talk to the host":"與主持人交談","Fragmentos: con {1} tiras otra vez":"碎片：集滿 {1} 個可以再抽一次","Fragments: {1} buy another roll":"碎片：集滿 {1} 個可以再抽一次","Cada bola da un cosmético de su colección o una pieza de equipo. Un cosmético repetido da un fragmento de esa bola; con {1} fragmentos tiras otra vez.":"每顆扭蛋會給一件收藏中的造型或一件裝備。重複的造型會給該扭蛋的一個碎片；集滿 {1} 個碎片可以再抽一次。","Each ball gives a cosmetic from its collection or a piece of gear. A duplicate cosmetic gives a fragment of that ball; with {1} fragments you roll again.":"每顆扭蛋會給一件收藏中的造型或一件裝備。重複的造型會給該扭蛋的一個碎片；集滿 {1} 個碎片可以再抽一次。","Fragmento de la Bola del Festival":"節慶扭蛋的碎片","Fragment of the Festival Ball":"節慶扭蛋的碎片","Fragmento de la Bola de White Lady":"白素貞扭蛋的碎片","Fragment of the White Lady Ball":"白素貞扭蛋的碎片","Fragmento de la Bola de Evil Snake Lord":"蛇王扭蛋的碎片","Fragment of the Evil Snake Lord Ball":"蛇王扭蛋的碎片","Sale al repetir un cosmético de su bola. Con {1} fragmentos haces una tirada más con la Anfitriona del Festival.":"從該扭蛋抽到重複的造型時獲得。集滿 {1} 個碎片可以找節慶主持人再抽一次。","You get it when a cosmetic from its ball is a duplicate. With {1} fragments you get one more roll from the Festival Host.":"從該扭蛋抽到重複的造型時獲得。集滿 {1} 個碎片可以找節慶主持人再抽一次。","Repetido: +1 fragmento":"重複：碎片 +1","Duplicate: +1 fragment":"重複：碎片 +1","¡Cosmético nuevo!":"新造型！","New cosmetic!":"新造型！","¡Carta!":"卡片！","Card!":"卡片！","Subidas":"升級","Level-ups":"升級","Acumular":"累積","Save up":"累積","Al momento":"立即","Right away":"立即","La partida se para en cada nivel y cada cofre, como siempre.":"每次升級和每個寶箱都會暫停，和以前一樣。","The run stops at every level and every chest, as usual.":"每次升級和每個寶箱都會暫停，和以前一樣。","Los niveles y los cofres se guardan y los eliges todos de una vez con el botón Subidas (B).":"等級和寶箱會累積起來，用「升級」按鈕（B）一次選完。","Levels and chests are saved up and you pick them all at once with the Level-ups button (B).":"等級和寶箱會累積起來，用「升級」按鈕（B）一次選完。","Los niveles y los cofres se guardan y el líder los abre para todo el grupo con el botón Subidas.":"等級和寶箱會累積起來，由隊長用「升級」按鈕替全隊打開。","Levels and chests are saved up and the leader opens them for the whole party with the Level-ups button.":"等級和寶箱會累積起來，由隊長用「升級」按鈕替全隊打開。","Subidas acumuladas":"累積升級","Saved-up level-ups":"累積升級","Cofre guardado en Subidas":"寶箱已存入「升級」","Chest saved in Level-ups":"寶箱已存入「升級」","¡Cofre gratis! Guardado en Subidas":"免費寶箱！已存入「升級」","Free chest! Saved in Level-ups":"免費寶箱！已存入「升級」","{1} niveles y {2} cofres guardados":"已累積 {1} 個等級和 {2} 個寶箱","{1} levels and {2} chests saved":"已累積 {1} 個等級和 {2} 個寶箱","Las abre el líder del grupo":"由隊長打開","The party leader opens them":"由隊長打開","Los niveles y los cofres se guardan y los eliges todos de una vez con el botón Subidas.":"等級和寶箱會累積起來，用「升級」按鈕一次選完。","Levels and chests are saved up and you pick them all at once with the Level-ups button.":"等級和寶箱會累積起來，用「升級」按鈕一次選完。","Festival":"燈籠節","¡Bola del Festival! Entra en tu cuenta al acabar la partida":"節慶扭蛋！關卡結束時會存入你的帳號","Festival Ball! It goes to your account when the run ends":"節慶扭蛋！關卡結束時會存入你的帳號","¡Bola de White Lady! Entra en tu cuenta al acabar la partida":"白素貞扭蛋！關卡結束時會存入你的帳號","White Lady Ball! It goes to your account when the run ends":"白素貞扭蛋！關卡結束時會存入你的帳號","¡Bola de Evil Snake Lord! Entra en tu cuenta al acabar la partida":"蛇王扭蛋！關卡結束時會存入你的帳號","Evil Snake Lord Ball! It goes to your account when the run ends":"蛇王扭蛋！關卡結束時會存入你的帳號","Takes you to the Lantern Festival, the seasonal stage: its bosses only drop gacha balls. From her panel you can also open your balls and see your collection.":"帶你前往季節關卡燈籠節：那裡的頭目只會掉扭蛋。從她的面板也可以打開扭蛋、查看收藏。","Dancing Dragon":"舞龍","Live Peach Tree":"桃妖樹","Wanderer":"浪人","Wooden Golem":"木魔像","Rice Cake Boy":"年糕童子","Spring Rabbit":"新春兔","Evil Snake Lord":"蛇王","Ink Serpent":"墨蛇","Leaf Cat":"葉貓","The Paper":"紙妖","Kapha":"河童","Chung E":"青娥","Stone Shooter":"石砲妖","Iron Fist":"鐵拳","Gold Dragon Helm":"金龍頭盔","Silver Dragon Helm":"銀龍頭盔","Copper Dragon Helm":"銅龍頭盔","Baby Dragon Hat":"幼龍帽","Ascension Black Dragon":"昇天黑龍","Costume Dragon Turtle Hat":"服飾 龍龜帽","Costume Metal Dragon Helm":"服飾 鋼鐵龍盔","Costume Dragon Warrior Hat":"服飾 龍武士帽","Costume Little Abyss Dragon":"服飾 深淵小龍","Orchid Hairband":"蘭花髮箍","Maneater Flower Hat":"食人花帽","Rose Hairband":"玫瑰髮箍","Yellow Cherry Blossom Hat":"黃櫻花帽","Costume Gram Peony":"服飾 牡丹花飾","Costume Peony Hair Ornament":"服飾 牡丹髮飾","Costume Chic Peony":"服飾 雅緻牡丹","Costume Petal Hood":"服飾 花瓣兜帽","Straw Hat":"草帽","Morpheus's Bandana":"摩菲斯頭巾","Costume Monk Crown":"服飾 僧侶冠","Mythical Lion Mask":"神獅面具","Romantic Leaf":"浪漫葉子","Stem in Mouth":"叼著花梗","Smokie Leaf":"狸貓樹葉","Bamboo Leaf Hat":"竹葉帽","Black Bunny Band":"黑兔耳髮箍","Wickebine's Black Cat Ears":"薇姬貝恩的黑貓耳","Sleeping Cat":"瞌睡貓","Bunny Egg Shell":"兔耳蛋殼","Costume Pretty White Bear Ears":"服飾 可愛白熊耳朵","Costume Baby Panda":"服飾 熊貓寶寶","Wedding Veil":"新娘頭紗","Silver Tiara":"銀冠","Vane Hairpin":"風向標髮夾","Bacsojin Doll Hat":"白素貞娃娃帽","Costume Full Blossom Sakura Hairpin (Blue)":"服飾 盛開櫻花髮簪（藍）","Costume Holy Veil":"服飾 神聖頭紗","Coif":"軟帽","RO 5th Wedding Anniversary":"RO 五週年婚禮紀念頭飾","Costume Signon Princess Wave (Purple)":"服飾 公主波浪髮（紫）","Ayothaya King's Hat":"哎喲泰雅國王帽","Evil Snake Lord Hat":"蛇王帽","King's Hat":"國王帽","White Snake Hat":"白蛇帽","Ancient King's Crown":"古代王冠","Costume Coiledup Snake Hat":"服飾 盤蛇帽","Crown of Good and Evil(Dragon Knight)":"善惡之冠（盧恩龍爵）","Costume Imperial Feather":"服飾 皇家羽飾","Costume Snake God's Crystal":"服飾 蛇神水晶","Leaf Cat Card":"葉貓卡片","The Paper Card":"紙妖卡片","Kapha Card":"河童卡片","Stone Shooter Card":"石砲妖卡片","Iron Fist Card":"鋼鐵拳卡片","Wanderer Card":"浪人卡片","Wooden Golem Card":"木魔像卡片","Spring Rabbit Card":"新春兔卡片","Enchanted Peach Tree Card":"人參果樹卡片","White Lady Card":"白素貞卡片","Dark Snake Lord Card":"蛇王卡片","Red Dragon Orb":"節慶扭蛋","Silver Dragon Orb":"白素貞扭蛋","Green Dragon Orb":"蛇王扭蛋","Red Crystal Fragment":"節慶扭蛋碎片","Sacred Rock Shard":"白素貞扭蛋碎片","Piece of Green Crystal":"蛇王扭蛋碎片","Red Lotus Sword":"紅蓮劍","Dragon Slayer":"屠龍劍","Dragon Wing":"龍翼弓","Dragon Vest":"龍之背心","Coat of Dragon Scale":"龍鱗披肩","Dragon Breath":"龍之吐息","Dragon Manteau":"龍之斗篷","Red Silk Seal":"紅綢印","Chinese Handicraft":"中式工藝品","Lantern of Hope":"希望燈籠","Snake Ring":"蛇戒","Yin Yang Talisman":"陰陽符","Monkey Fur Hat":"猴毛帽","Rice Dumpling Hat":"粽子帽","Dragon Claw Helm":"龍爪頭盔","Rabbit Knit Hat":"兔耳針織帽","Cherry Twig in Mouth":"叼著櫻花枝","If you switch to":"換裝後","Channel":"頻道","Party":"隊伍","Emotes":"表情","Press Enter to chat":"按 Enter 開始聊天","Tap to chat":"點一下開始聊天","Create an account to write in the chat":"建立帳號後即可聊天","Switch channel (Tab)":"切換頻道（Tab）","Connected to channel {1}.":"已連線至頻道 {1}。","You moved to channel {1}.":"已切換至頻道 {1}。","Connection lost. Reconnecting…":"連線中斷，正在重新連線…","Hi!":"嗨！","Party?":"要組隊嗎？","Trade?":"要交易嗎？","Thanks!":"謝謝！","Let's go!":"出發吧！","One moment":"請稍等","Good game!":"打得漂亮！","Bye!":"再見！","Balance":"平衡調整","Fixes":"修正","Fix":"修正","Change":"調整","Improvement":"改進","November {1}, {2}":"{2} 年十一月 {1} 日","Piercing gets stronger, the Endless Tower loads your account's gear and cards, and several fixes.":"這次強化了貫穿效果，讓無限塔讀取帳號的裝備和卡片，並修正數個問題。","Pierce: every enemy pierced is now a new roll, so one shot can pass through several in a row (it used to be one extra at most), capped at 75% with everything added up. Pierce cards give 2% (common) to 10% (legendary), double what they did.":"貫穿：每穿過一名敵人就重新判定一次，因此一發攻擊可連續穿過多名敵人。以前最多只能多穿過一名，現在總貫穿機率上限為 75%。貫穿卡片的效果翻倍，從普通的 2% 到傳奇的 10%。","Archer (and its 2nd jobs) with a bow: 20% base pierce on their shots.":"弓箭手及其二轉職業使用弓時，射擊有 20% 基礎貫穿機率。","Armor and ranged weapons (bows, guns, shuriken, rods and instruments) can roll pierce among their bonuses, in the same slot as crit: +1% per tier of the map they drop on.":"防具與遠程武器（弓、槍械、手裏劍、法杖和樂器）現在可洗出貫穿詞綴，與暴擊共用同一欄位。掉落地圖每高一階，貫穿機率增加 1%。","The Fan of Knives from Out of the Shadows (when leaving Hiding) only fired one pulse. It now fires the same as the skill: its 2 starting pulses plus those from cards, Deity and the tower.":"「現身突襲」在解除隱匿時觸發的飛刀扇擊原本只發動一波。現在會和技能本身一樣發動 2 波，並計入卡片、神格和無限塔提供的額外波數。","The maintenance notice appeared hidden behind the Endless Tower score panel. It is now placed below it.":"維護通知原本會被無限塔計分面板擋住，現在會顯示在面板下方。","In the Endless Tower, your character sometimes went in without part of its gear or with fewer cards than it wears. The tower now counts every card on your account and the pieces you are wearing, including those from your local save from before you created the account and story rewards.":"角色進入無限塔時有時會少帶部分裝備或卡片。現在無限塔會計入帳號中的所有卡片和角色身上穿戴的裝備，包括建立帳號前的本機存檔內容與劇情獎勵。","Endless Tower runs from November 8 that had not counted because of the game's version change have been recovered: they add to your tower points and appear on the ladder.":"十一月 8 日因遊戲更新而未計入的無限塔場次已恢復。這些場次會計入無限塔點數並顯示在排行榜。","With the browser's automatic translation turned on, some texts came out mistranslated (the VIT Dish read \"+1 years\"). The game already has Spanish and English in its options, so the browser no longer translates it.":"瀏覽器自動翻譯曾誤譯遊戲文字，例如把 VIT 料理的效果顯示成「+1 年」。遊戲設定已內建西班牙文和英文，因此現在會阻止瀏覽器自動翻譯。","With the character panel open in the square, what you received in a trade could vanish when you equipped something, moved stats or touched anything else in the panel. The panel now updates as soon as the trade is done.":"在廣場開著角色面板時，變更裝備、調整屬性或操作面板，可能會讓剛交易收到的物品消失。現在交易完成後，角色面板會立即更新。","Some players leaving the Endless Tower came back to Prontera with a black screen and the tower frozen behind it. Leaving a run has been reworked so the tower closes completely before you enter the square, and Deity or floor cards that were open no longer carry over into the square.":"部分玩家離開無限塔返回普隆德拉時會遇到黑畫面，無限塔仍停在背景。現在會先完全關閉無限塔再回到廣場，開著的神格或樓層卡片也會一起關閉。","Maximize Power (the Merchant's final Blacksmithing talent) did nothing in the Endless Tower, since there is no zeny to spend there. In the tower, Mammonite now always gets its boosted hit without spending zeny.":"商人鍛造系的最終天賦「武器值最大化」原本在無限塔無法生效，因為塔內無法花費 Zeny。現在無限塔中的金錢攻擊一律套用強化傷害，且無須消耗 Zeny。","The 2-slot Main Gauche, Stiletto and Gladius (dropped by Poporing, Soldier Skeleton and Skeleton General) could only be worn by Thief and Ninja. They can now be worn by the same jobs as their 3-slot versions: Swordsman, Mage, Archer, Merchant, Thief and Ninja.":"波波利、邪骸士兵與邪骸戰士長掉落的 2 洞笨拙短劍、雙刃短劍和長柄短劍，原本只有盜賊及忍者能裝備。現在可裝備的職業與 3 洞版相同，包括劍士、魔法師、弓箭手、商人、盜賊和忍者。","Some hits (like the charged weapon's lightning) could kill a monster again while it was already dying: a boss dropped two pieces, its EXP counted twice and in the Endless Tower the monster scored double. Each monster now counts only once when it dies.":"部分攻擊（例如充能武器的落雷）曾在魔物死亡過程中再次判定擊殺，導致首領掉落兩件裝備、EXP 重複計算，無限塔分數也算了兩次。現在每隻魔物死亡時只會計算一次。","In browsers with anti-tracking protection (such as Helium or Brave), player characters could show stray coloured pixels while monsters and NPCs looked fine. Character colours are now read straight from their images, without going through the canvas those browsers alter.":"在 Helium 或 Brave 等開啟防追蹤功能的瀏覽器裡，玩家角色有時會出現零星的異色像素，魔物和 NPC 則正常。現在會直接從原始圖檔讀取角色顏色。","When a «?» drops, the game tells the server within a few seconds instead of at the next run update: if the run cannot be claimed at the end (busy server or no connection), that item already counts for what arrives through the Mailman. Runs the game could not claim reach the Mailman sooner.":"掉落「?」物品時，遊戲會在幾秒內回報伺服器，不再等到下次遠征進度更新。即使結束時因伺服器忙碌或斷線而無法結算，該物品也已列入郵差補發的獎勵。未能完成結算的遠征獎勵，也會更快送到郵差處。","If your account shows up empty when you log in because the server did not answer in time, the game now asks for it again every few seconds on its own, and reloading the page fetches it from the server (before, you had to use another address).":"登入時若因伺服器未及時回應，導致帳號資料顯示為空白，遊戲現在會每隔幾秒自動重試。重新整理頁面也會從伺服器重新載入資料，以前則必須改用其他網址。","Deity by job":"各職業神格","What each skill’s Deity does":"各技能的神格效果","The fifth chest slot: it transforms a skill":"寶箱的第五個欄位，可改變技能效果","Stat Deity":"屬性神格","Rank":"階級","They work for any job. Each refine adds another roll.":"所有職業皆可使用。每次精鍊會再擲一次加成數值。","In a chest, the Deity slot offers the Deity of a skill you carry this run. It is always legendary and each time it shows up again it is refined and goes up a rank: the numbers below grow with it. Until you have a skill Deity, the slot can hold a stat Deity. In the Endless Tower you pick one at the start and it goes up a rank every 10 floors.":"寶箱的神格欄位會提供本場遠征所攜帶技能的神格。技能神格必為傳奇品質，每次再次出現時都會精鍊並提升一階，下方的數值也會提高。取得技能神格前，這個欄位可以放置屬性神格。挑戰無限塔時，開局可選一項神格，每 10 層會提升一階。","+{1}% poison, burn and bleed damage":"中毒、灼傷與流血傷害 +{1}%","+{1}% speed":"+{1}% 速度","Gear by slot":"各部位裝備","Its ★ and where it drops":"★ 屬性與掉落地點","Everything that drops in the stages":"各關卡的裝備掉落清單","Each piece’s ★":"裝備專屬 ★ 屬性","Stories are solo":"劇情限單人遊玩","Daggers":"短劍","Swords":"單手劍","Two-handed swords":"雙手劍","Spears":"單手矛","Two-handed spears":"雙手矛","Axes":"單手斧","Two-handed axes":"雙手斧","Maces":"鈍器","Knuckles":"拳套","Rods":"法杖","Books":"書籍","Bows":"弓","Instruments":"樂器","Whips":"鞭子","Pistols":"手槍","Rifles":"步槍","Shotguns":"霰彈槍","Qualities":"品質","Diminishing returns":"效益遞減","{1} companions with bonuses":"{1} 種附帶加成的寵物","{1} jobs: 1st and 2nd":"{1} 種一轉與二轉職業","Achievements & story":"成就與劇情","Base Lv, Job Lv and trees":"Base Lv、Job Lv 與天賦樹","Caps and curves of every bonus":"各項加成的上限與曲線","Chronicler and story mode":"事蹟紀錄員與劇情模式","Damage taken, healing, statuses":"承受傷害、治療與狀態","Damage: ATK & MATK":"傷害：ATK 與 MATK","Defense & statuses":"防禦與狀態","Elites, hordes, chests and difficulty":"菁英、怪群、寶箱與難度","Endless waves and ladder":"無盡波次與排行榜","From common to legendary":"從普通到傳奇","Gear & refine":"裝備與精鍊","How every hit is computed":"每次命中的傷害如何計算","How to play":"遊玩方式","Jobs":"職業","Levels & talents":"等級與天賦","Maps, bosses and requirements":"地圖、首領與解鎖條件","Party, trade, chat and friends":"組隊、交易、聊天與好友","Playing with others":"多人遊玩","Prontera plaza":"普隆德拉廣場","The loop of a run":"一場冒險的流程","The run":"冒險場次","Tiers, affixes, cards, smith":"階級、詞綴、卡片與鐵匠","Types, upgrades and every skill":"技能類型、升級與完整列表","Who is who":"NPC 介紹","Chance":"機率","Skill upgrade":"技能升級","Weapon ATK/MATK":"武器 ATK／MATK","base {1} s":"基礎 {1} 秒","+{1} cast speed → +{2} cast speed":"詠唱速度 +{1} → +{2}","+{1}% area → +{2}% area":"範圍 +{1}% → +{2}%","+{1}% damage → +{2}% damage":"傷害 +{1}% → +{2}%","Chests":"寶箱","Level up":"升級","{1}% + {2}% per LUK":"{1}% ＋每點 LUK 增加 {2}%","+{1} Haste → +{2} Haste":"冷卻加速 +{1} → +{2}","+{1}% melee reach → +{2}% melee reach":"近戰攻擊距離 +{1}% → +{2}%","⏱️ Tempo":"⏱️ 節奏","⚔️ Attack":"⚔️ 攻擊","🛡️ Survival":"🛡️ 生存","1st job":"一轉","2nd job":"二轉","Action":"操作","Area cast":"範圍詠唱","Bosses and MVP":"首領與 MVP","cap {1}%":"上限 {1}%","Cards to choose":"可選卡片數","click":"點擊","Cost":"費用","Damage meter":"傷害統計","Elites drop chests. Opening them costs zeny and grants run items (potions, elixirs, blessings, dishes and Deity).":"菁英魔物會掉落寶箱。花費 Zeny 開啟後，可取得本場道具，包括藥水、靈藥、祝福、料理和神格。","Esc":"Esc 鍵","Every run level":"每次場內升級","Everything you need to survive the horde":"在魔物群中活下來所需的知識","floor(level / {1}) + {2}":"⌊等級 ÷ {1}⌋ + {2}","gear + {1}×INT":"裝備 ＋ {1} × INT","gear + {1}×STR":"裝備 ＋ {1} × STR","gear + STR + {1}×DEX":"裝備 ＋ STR ＋ {1} × DEX","Gear ATK":"裝備 ATK","Gear MATK":"裝備 MATK","Heal on level up":"升級時恢復生命","in total at level {1}. Raising a stat costs more the higher it is, just like RO:":"點（等級 {1} 時）。和 RO 一樣，能力值越高，再提升所需點數就越多：","Keyboard & mouse":"鍵盤與滑鼠","Magic skill power":"魔法技能威力","Meat healing":"肉塊的治療量","Mechanics":"遊戲機制","Melee basic attack":"近戰普攻","Melee builds only":"僅適用近戰流派","Melee skill power":"近戰技能威力","Mini bosses arrive on schedule and the MVP at the end. Beating the MVP unlocks the next stage for that character.":"小首領會在指定時間出現，MVP 則在最後登場。擊敗 MVP 後，該角色就會解鎖下一個關卡。","minimap button":"小地圖按鈕","Mobile / gamepad":"手機／手把","Monsters drop EXP gems. Every run level you pick one of {1} cards: a new skill (up to {2} slots as a 1st job, {3} as a 2nd job) or an upgrade to one you own.":"魔物會掉落 EXP 寶石。場內每升一級，可從 {1} 張卡片中選一張，學習新技能（一轉最多 {2} 格，二轉最多 {3} 格）或升級已學會的技能。","more:":"更多：","Pause / close windows":"暫停／關閉視窗","Pick a card":"選擇一張卡片","points at character creation and every Base Lv grants":"點能力值。每升一級 Base Lv 可獲得","Progress":"角色進度","Prontera is your base. Talk to the NPCs, spend stats and talents, equip your loot and meet other players.":"普隆德拉是你的據點。你可以和 NPC 交談、分配能力值與天賦、穿戴戰利品，也能在這裡遇見其他玩家。","Raise":"提升","Ranged skill power":"遠程技能威力","RO stats":"RO 能力值","Single-target cast":"單體詠唱","Skill cooldowns":"技能冷卻","Spent outside runs, they apply to every run":"在場外分配，每一場都會生效","square root of power":"威力的平方根","Start · B":"Start 鍵 · B 鍵","Stat calculator":"能力值計算器","Status points":"能力值點數","status points: it needs":"點能力值，所需點數為","Survive":"生存","tap · A":"輕點 · A 鍵","The expedition":"展開遠征","The Expedition Captain sends you to a stage. Every run starts at run level {1} with only your basic attack.":"遠征隊長會送你前往關卡。每場都從場內等級 {1} 開始，起初只能使用普通攻擊。","The game loop":"遊戲流程","The plaza":"城鎮廣場","These bonuses multiply on top of everything else: at run level {1} you hit {2}% harder than at level {3} with the same cards.":"這些加成會與其他加成相乘。使用相同卡片時，場內等級 {1} 造成的傷害會比等級 {3} 高 {2}%。","This build spends":"此配點共花費","Tip: every run starts with a {1}-second soft opening with fewer, slower monsters. Use it to grab your first skill.":"提示：開場的 {1} 秒內，魔物較少、移動也較慢。趁這段時間取得第一個技能。","Total spent":"總花費","touch joystick · left stick":"觸控搖桿 · 左類比搖桿","WASD · arrows · click":"WASD · 方向鍵 · 滑鼠點擊","Welcome to the Library":"歡迎來到圖書館","What each one does":"各能力值的用途","When the run ends you keep character EXP (Base Lv and Job Lv), gear and cards. That is what makes you stronger for the next attempt.":"冒險結束後會保留角色 EXP（Base Lv 與 Job Lv）、裝備及卡片，讓你在下一場更強。","Wiki":"遊戲百科","You can reset your stats from the character panel at any time.":"可隨時在角色面板重置能力值。","You only move: your basic attack and skills fire on their own as soon as they are ready and have a target in range.":"你只需要控制移動。普通攻擊和技能準備好，且射程內有目標時，就會自動施放。","You start with":"創建角色時有","{1}% more":"增加 {1}%","Bosses never drop common pieces.":"首領不會掉落普通品質的裝備。","Chest items":"寶箱道具","Combat":"戰鬥","Gear":"裝備","More affixes (see Gear) and slightly more ATK/MATK on weapons.":"詞綴更多（見「裝備」），武器的 ATK／MATK 也會略高。","Multiplies how much the upgrade adds. Legendary ones are two upgrades at once (one epic and one rare). For whole numbers (targets, projectiles): +{1}, +{2} for epic and +{3} for legendary, except capped +projectiles, which always come one at a time as a common card. Pierce chance goes from {4}% at common to {5}% at legendary.":"品質會放大升級幅度。傳奇等同同時獲得一次史詩和一次稀有升級。目標數、投射物數等整數效果，普通為 +{1}、史詩為 +{2}、傳奇為 +{3}。有上限的投射物升級只會以普通卡出現，每次增加一個。貫穿機率從普通的 {4}% 到傳奇的 {5}%。","Skill upgrades":"技能升級","The five qualities":"五種品質","The same five colours for everything you find":"所有掉落物都使用這五種顏色","What":"項目","What quality changes":"品質的影響","Where they apply":"適用範圍","Within each item’s range, common gives the minimum and legendary the maximum.":"在同一物品的數值範圍內，普通品質給最低值，傳奇品質給最高值。","-{1}% damage taken → -{2}% damage taken":"承受傷害 -{1}% → -{2}%",", one at a time and always as a common card. The Mage’s infused attack has no +projectile cards. Deity, talents and gear are separate, and +targets have no cap.":"，每次增加一個，且只以普通卡出現。魔法師的附魔攻擊沒有增加投射物的卡片。神格、天賦及裝備分開計算，額外目標數也沒有上限。","(−{1}%) · equals":"（−{1}%）· 相當於","{1} Haste → cooldown at":"冷卻加速 {1} → 冷卻時間剩","{1} HP/s per VIT point, plus gear and chests (some only while standing still or moving)":"每點 VIT 每秒恢復 {1} HP，裝備和寶箱還會提供額外恢復（有些只在靜止或移動時生效）","{1} slots":"{1} 格","{1}% ({2} extra enemies)":"{1}%（額外命中 {2} 名敵人）","{1}% counting temporary buffs":"{1}%（含暫時增益）","{1}% of max HP/s":"每秒恢復最大 HP 的 {1}%","+{1} armor → +{2} armor":"防禦 +{1} → +{2}","+{1} HP every {2} s → +{3} HP every {4} s":"每 {2} 秒恢復 {1} HP → 每 {4} 秒恢復 {3} HP","+{1} m pickup radius → +{2} m pickup radius":"拾取半徑 +{1} 公尺 → +{2} 公尺","+{1} max HP → +{2} max HP":"最大 HP +{1} → +{2}","+{1} projectiles from cards":"卡片提供 +{1} 個投射物","+{1}% critical → +{2}% critical":"暴擊機率 +{1}% → +{2}%","+{1}% critical damage → +{2}% critical damage":"暴擊傷害 +{1}% → +{2}%","+{1}% discovery → +{2}% discovery":"發現率 +{1}% → +{2}%","+{1}% double cast → +{2}% double cast":"雙重詠唱 +{1}% → +{2}%","+{1}% Flee → +{2}% Flee":"迴避 +{1}% → +{2}%","+{1}% lifesteal → +{2}% lifesteal":"吸血 +{1}% → +{2}%","+{1}% max HP → +{2}% max HP":"最大 HP +{1}% → +{2}%","+{1}% movement speed → +{2}% movement speed":"移動速度 +{1}% → +{2}%","+{1}% of max HP every {2} s → +{3}% of max HP every {4} s":"每 {2} 秒恢復最大 HP 的 {1}% → 每 {4} 秒恢復 {3}%","+{1}% poison, burn and bleed damage → +{2}% poison, burn and bleed damage":"中毒、灼燒及流血傷害 +{1}% → +{2}%","+{1}% zeny → +{2}% zeny":"Zeny 收益 +{1}% → +{2}%","+{1}% zeny and +{2}% discovery → +{3}% zeny and +{4}% discovery":"Zeny 收益 +{1}%、發現率 +{2}% → Zeny 收益 +{3}%、發現率 +{4}%","+Projectiles from cards":"卡片提供的額外投射物","a chance per enemy: {1}–{2}% per card, {3}% from Deity, {4}% for Archer with a bow":"每名敵人各自判定：每張卡 {1}–{2}%，神格提供 {3}%，持弓的弓箭手有 {4}%","A ring of monsters surrounds you and closes in slowly: break out before it catches you.":"魔物會從四周圍成一圈，慢慢收攏。趁包圍圈合上前突圍。","A skill or item shows up with priority in the rolls (×{1}) for the rest of the run. Up to {2} uses per run.":"讓指定技能或物品在本場剩餘時間優先出現（機率 ×{1}），每場最多使用 {2} 次。","added":"相加","AGI {1}% and LUK {2}% per point":"每點 AGI 提供 {1}%，每點 LUK 提供 {2}%","anything above heals nothing":"超出上限的部分不會治療","are full ({1} as a 2nd job); after that, cards upgrade the ones you have. Skills have no max level: each upgrade card you take improves one aspect of the skill (damage, cooldown, area…) according to the card’s quality, and since damage has no cap, there is always something to improve. Your job’s signature skill appears in the first pick.":"填滿後（二轉為 {1} 格），卡片只會升級已學技能。技能沒有等級上限，每張升級卡依品質強化一個面向，例如傷害、冷卻或範圍。傷害沒有上限，可以持續強化。第一次選卡會出現職業招牌技能。","Area · reach · speed":"範圍 · 距離 · 速度","Area, reach and speed":"範圍、距離與速度","armor":"防禦","Armor · Tier {1} · Safe up to +{2}":"防具 · 階級 {1} · 安全精鍊至 +{2}","Average with Flee":"與迴避取平均","Before leaving you can raise the difficulty. Each slider toughens one aspect of the monsters and gives an equal share of the reward: with everything maxed, loot is doubled.":"出發前可提高難度。每個滑桿會強化魔物的一項能力，並提供等比例獎勵。全部調到最高時，戰利品會翻倍。","Bigger, tougher monsters. They always drop a chest and meat.":"體型更大也更耐打的魔物，一定會掉落寶箱和肉塊。","Bleed":"流血","Blessing of Plenty":"豐收祝福","Blessing of Reach":"距離祝福","Blessing of Regeneration":"再生祝福","Blind":"黑暗","Bosses telegraph":"首領的攻擊預警","Burn":"灼燒","Caps":"上限","Chest discount":"寶箱折扣","Chests don’t offer what you can’t use: reach only shows up if your basic attack or a skill hits in melee, and damage over time only once you have poisoned, burned or bled something this run.":"寶箱只會提供角色能用的效果。普通攻擊或技能能近戰命中時才會出現距離加成，本場曾造成中毒、灼燒或流血時才會出現持續傷害加成。","Chests don’t offer what you can’t use: reach only shows up if your basic attack or a skill hits in melee, damage over time only once you have poisoned, burned or bled something this run, cast speed only if one of your skills has a cast time, STR only with physical damage and INT only with magic or healing.":"寶箱只會提供角色能用的加成。普通攻擊或技能能近戰命中時，才會出現近戰觸及距離加成。本場曾使敵人中毒、灼燒或流血時，才會出現持續傷害加成。至少有一項技能需要詠唱時，才會出現詠唱速度加成。能造成物理傷害時才會出現 STR 加成，有魔法傷害或治療能力時才會出現 INT 加成。","cooldown · area":"冷卻 · 範圍","cooldown · duration":"冷卻 · 持續時間","cooldown = base × {1} / ({2} + Haste / {3})":"冷卻時間 ＝ 基礎時間 × {1} ÷（{2} ＋冷卻加速 ÷ {3}）","cost = {1} + {2}·n + {3}·n² zeny (n = chests already opened)":"費用 ＝ {1} ＋ {2}·n ＋ {3}·n² Zeny（n 為已開啟的寶箱數）","damage · cooldown · area · count":"傷害 · 冷卻 · 範圍 · 數量","damage · cooldown · count":"傷害 · 冷卻 · 數量","damage · cooldown · count · area · duration":"傷害 · 冷卻 · 數量 · 範圍 · 持續時間","damage · cooldown · count · area · speed · duration":"傷害 · 冷卻 · 數量 · 範圍 · 速度 · 持續時間","damage · cooldown · count · reach":"傷害 · 冷卻 · 數量 · 距離","damage · cooldown · count · targets · pierce chance · speed · area":"傷害 · 冷卻 · 數量 · 目標數 · 貫穿機率 · 速度 · 範圍","damage = max({1}, (hit − armor) × ({2} − reduction) × ({3} − DEF%))":"傷害 ＝ max（{1}，（命中傷害 − 防禦）×（{2} − 減傷）×（{3} − DEF%））","Damage over Time Elixir":"持續傷害靈藥","Damage over time. Poisons from different skills don’t stack: only the strongest ticks, unless a talent says otherwise.":"造成持續傷害。不同技能的中毒效果不會疊加，除非天賦另有說明，否則只套用最強的效果。","Damage reduction":"減傷","Damage you take":"承受傷害","Damage, crit, HP or area bonuses from different sources are":"來自不同來源的傷害、暴擊、HP 或範圍加成","Deities of other skills keep showing up after you take the first one: you can switch Deity mid-run (its refines are lost). Up to {1} use per run.":"選了第一個神格後，其他技能的神格仍會出現。場內可以更換神格，原神格的精鍊進度會消失。每場可用 {1} 次。","Deity transform a skill you have learned this run: they change how it works and are always legendary. Each time it shows up again it gets refined and improves. They only appear for skills you have.":"神格會改變本場已學技能的運作方式，品質一律為傳奇。再次出現時可精鍊並強化。只有已學技能才會出現對應神格。","Discovery":"發現率","Dropped by monsters and only used inside the run: to open chests.":"由魔物掉落，只能在本場用來開寶箱。","each point is worth less":"每點帶來的效益逐漸降低","Each run level heals {1}% of max HP.":"每次場內升級會恢復最大 HP 的 {1}%。","Each run you start with just your weapon’s basic attack. Leveling up offers your job’s skills until":"每場開始時只能使用武器普攻。升級後會提供職業技能，直到技能欄位","Earned and upgraded by leveling up during the run":"在場內升級時取得並強化","Elites always drop a chest and normal monsters very rarely do ({1}%).":"菁英必定掉落寶箱，普通魔物只有 {1}% 機率掉落。","Elites every {1} s":"每 {1} 秒出現菁英","Every skill":"完整技能列表","Extra loot at max":"最高難度的額外戰利品","Fire damage over {1} s.":"在 {1} 秒內造成火屬性傷害。","First":"首先","Flee (%)":"迴避（%）","Frozen solid in place. Bosses can’t be frozen. Some skills deal extra damage to frozen targets.":"凍結在原地。首領免疫凍結。部分技能對凍結目標會造成額外傷害。","Gets disoriented and can’t chase you properly.":"方向感混亂，無法正常追擊你。","Haste points":"冷卻加速點數","Healing":"治療","Heals {1}% of max HP (min {2}). Dropped by {3}% of monsters, always by elites and doubled by bosses. After {4} s without meat at low HP, the next kill is guaranteed to drop one.":"恢復最大 HP 的 {1}%（至少 {2}）。一般魔物有 {3}% 機率掉落，菁英必定掉落，首領的掉落量翻倍。低 HP 時若 {4} 秒沒掉肉塊，下次擊殺必定掉落。","Heals part of the damage you deal, up to {1}% of your HP per second.":"將部分造成的傷害轉為治療，每秒最多恢復最大 HP 的 {1}%。","Holding the horde":"抵擋怪群","Hordes every {1} min":"每 {1} 分鐘出現怪群","How":"方式","How incoming damage is reduced":"承受傷害如何降低","How they work":"運作方式","Inside a run":"場內","Interactive curves":"互動曲線圖","is rolled: if you dodge, the hit does nothing (you’ll see “Miss”). Then":"會先判定。成功迴避就不會受到傷害（畫面會顯示「Miss」）。接著","It comes from AGI ({1} per point), each skill’s cooldown upgrades (+{2} per common upgrade), potions, blessings, gear and buffs. {3} points halve cooldowns; {4} leave a quarter. Cast speed works the same way, after DEX has trimmed the cast (instant at {5} DEX for single target and {6} DEX for area skills).":"來源包括 AGI（每點 {1}）、技能冷卻升級（每次普通升級 +{2}）、藥水、祝福、裝備及增益。{3} 點會將冷卻縮短至一半，{4} 點則縮至四分之一。詠唱速度的曲線相同，但會先套用 DEX 的縮短效果。單體技能達 {5} DEX、範圍技能達 {6} DEX 時可瞬發。","it is a chance. Each card gives {1}% (common) to {2}% (legendary) and Archer with a bow has {3}% base. Every enemy pierced is a new roll, so one shot can pass through several in a row. With everything added up, the chance is capped at {4}%. Skills that already pass through everything are unchanged.":"貫穿會判定機率。每張卡從普通的 {1}% 到傳奇的 {2}%，持弓的弓箭手有 {3}% 基礎機率。每穿過一名敵人便重新判定，因此一發可連續穿過多名敵人。總機率上限為 {4}%。原本可穿透所有敵人的技能照常運作。","Knockback":"擊退","Magnet":"磁鐵","Many skills also improve their own effects: Bash’s stun chance, Cold Bolt’s slow, a buff’s strength…":"許多技能也可強化自身效果，例如狂擊的暈眩機率、冰箭術的緩速或增益強度。","Many stats don’t add up linearly: the first points are worth a lot and the next ones less and less. No build can break the game by stacking one thing, so spreading out usually pays off.":"許多能力值的效果並非等比例成長。前幾點效果明顯，後續每點的收益逐漸降低，因此分散投資通常更划算。","Meat":"肉塊","Mini boss and MVP skills mark the red area they will hit and fill it from the inside: when it’s full, it hits anyone still inside. Ranged monsters do the same with a circle at your feet, and arrows can be dodged by stepping out of their line.":"小首領與 MVP 會先標示紅色攻擊範圍，紅色由內向外填滿時仍在其中就會受擊。遠程魔物也會在你腳下標示圓形範圍，箭矢則可走離射線躲開。","Mini bosses on schedule and the MVP at the end. They drop gear, cards and pet eggs.":"小首領在指定時間出現，MVP 最後登場。會掉落裝備、卡片和寵物蛋。","Monster hit":"魔物命中傷害","More HP over time":"HP 隨時間增加","Moves slower. Works on bosses too.":"降低移動速度，對首領也有效。","never {1}":"永遠不會達到 {1}","Normal monsters double their HP every few minutes: your build has to grow at the same pace.":"一般魔物的 HP 每隔幾分鐘就會翻倍，角色也得跟上成長速度。","Notes":"備註","Only after poisoning, burning or bleeding":"本場造成過中毒、灼燒或流血後才會出現","Opening a chest offers three options from different slots. An empty slot can offer any of its items; a filled slot only offers that item again, to refine it (no cap). Each chest costs more than the last:":"開啟寶箱會提供三個不同欄位的選項。空欄位可能出現該類任一道具，已填入的欄位只會再次提供相同道具用於精鍊，精鍊無上限。每個寶箱都比上一個更貴：","Per landed hit":"每次命中","Petrify":"石化","Poison":"中毒","Pulls every gem on the map. Very rare from normal monsters; elites drop it {1}% of the time.":"吸取地圖上所有寶石。一般魔物極少掉落，菁英有 {1}% 機率掉落。","Pushes it away. Bosses can’t be pushed.":"將目標推開。首領免疫擊退。","ranged basic attacks (bow, rod, instrument…) and Arrow Repel get at most":"遠程普攻（弓、法杖、樂器等）及衝鋒箭最多可獲得","ranged basic attacks and Arrow Repel; Deity, talents and gear are separate":"適用遠程普攻及衝鋒箭。神格、天賦和裝備分開計算","Reach Potion":"距離藥水","reduction":"減傷","Reduction (%)":"減傷（%）","Remaining cooldown":"剩餘冷卻時間","removes a percentage ({1}% cap) and gear":"按比例減傷（上限 {1}%），裝備則","Removes a skill or item from the rolls for the rest of the run; if you already have it, it stops showing up for upgrades. Up to {1} uses per run.":"讓指定技能或物品在本場剩餘時間不再出現。若已取得，也不會再出現升級選項。每場最多使用 {1} 次。","removes another percentage on top.":"再按比例減少剩餘傷害。","Rerolls one card: same skill with a different upgrade, or the same chest slot with a different piece. Up to {1} uses per run.":"重抽一張卡片。技能卡保留技能、改抽升級項目，寶箱卡保留欄位、改抽另一件道具。每場最多使用 {1} 次。","Revive":"復活","Roll perks (Chronicler)":"重抽相關特權（事蹟紀錄員）","Skills fire on their own when off cooldown and a target is available. Skills with a cast lock onto their target (or show a ground circle for area skills) while charging. Elites and bosses take priority: skills go for them first when in range.":"技能冷卻完畢且有可用目標時會自動施放。需詠唱的技能在準備期間會鎖定目標，範圍技能則顯示地面圓圈。射程內有菁英或首領時會優先攻擊。","Slider":"滑桿","soft curve, see above":"效益遞減曲線，見上方說明","Some items and talents bring you back at full HP once per run.":"部分道具和天賦可讓你每場以滿 HP 復活一次。","Source":"來源","Spreads part of the hit’s damage over {1} s.":"將部分命中傷害分攤至 {1} 秒內。","Stacking a single bonus gets less and less effective":"同一項加成疊得越高，每點收益就越低","Stat":"能力值","Status effects":"異常狀態","Stun":"暈眩","subtracts a flat amount from every hit (great against weak monsters),":"會從每次命中扣除固定傷害，對弱小魔物特別有效，","Swaps the cards of a level-up or a chest for new ones. Up to {1} uses per run.":"將升級或寶箱提供的卡片換成新選項。每場最多使用 {1} 次。","The monster stands still without attacking. Bosses can’t be stunned.":"魔物停在原地，無法攻擊。首領免疫暈眩。","The rhythm":"場內節奏","together before being applied. Haste and cast speed also add up, but then go through their curve. Cooldown chest items chain: −{1}% and −{2}% leave cooldown at {3}%, not {4}%.":"相加後再套用。冷卻加速和詠唱速度也會先相加，再套用各自的曲線。寶箱的冷卻縮減逐項相乘：−{1}% 和 −{2}% 疊加後，冷卻為原本的 {3}%，而非 {4}%。","Turns it to stone; with talents, petrified targets take extra damage.":"使目標變成石頭。特定天賦可對石化目標造成額外傷害。","Upgrades by skill type":"各類技能的升級項目","VIT also increases meat healing by {1}% per point.":"每點 VIT 也會增加肉塊 {1}% 的治療量。","What adds and what chains":"哪些效果相加，哪些效果相乘","What can improve":"可強化的項目","What happens during each stage’s minutes":"關卡內會隨時間發生的事件","You avoid {1}% of the damage":"你減免 {1}% 的傷害","Zone":"區域",": 1st job":"：一轉",". On top of that, the area skills of all three deal":"。此外，三個職業的範圍技能都會造成",". The first points barely show and the last ones are huge. 2nd jobs use an even steeper (cubic) curve and never yield less than ×{1} what the 1st job would with the same stats.":"。初期每點的效果不明顯，越往後成長越快。二轉使用更陡的三次方曲線，相同能力值時至少是一轉的 ×{1}。","· 2nd job":"· 二轉","· basic":"· 普攻","{1}% more to bosses":"對首領增加 {1}%","× ({1} + upgrades)":"×（{1} ＋升級幅度）","× {1},{2}, {3},{4} × 1st job)":"× {1},{2}，一轉的 {3},{4} 倍）","× Critical":"× 暴擊","× Damage":"× 傷害加成","× Power":"× 威力","× Target":"× 目標修正","⚔️ Melee":"⚔️ 近戰","🏹 Ranged":"🏹 遠程","🔮 Magic":"🔮 魔法","1st job basic":"一轉普攻","1st job skills":"一轉技能","1st job: power = {1} + (ATK / {2},{3})":"一轉：威力 ＝ {1} ＋（ATK ÷ {2},{3}）","2nd job skills":"二轉技能","2nd job: power = max({1} + (ATK / {2},{3})":"二轉：威力 ＝ max（{1} ＋（ATK ÷ {2},{3}）","Accounts":"帳號","ATK does not add flat damage: it becomes a":"ATK 不直接加到傷害，而是轉換為","ATK, MATK and power":"ATK、MATK 與威力","Base {1} · scales with melee ATK (×{2})":"基礎 {1} · 依近戰 ATK 調整（×{2}）","Base crit":"基礎暴擊機率","Base crit damage":"基礎暴擊傷害","Base damage":"基礎傷害","Bash, Mammonite, Envenom, weapon strikes…":"狂擊、金錢攻擊、施毒、武器打擊等","Basic 1st":"一轉普攻","Bolts, Soul Strike, Heal, Holy Light…":"元素箭、聖靈召喚、治癒術、神聖之光等","bosses, elites, undead, marked, poisoned, petrified targets…":"首領、菁英、不死、被標記、中毒或石化的目標等","Critical and double cast":"暴擊與雙重詠唱","Damage bonus (+%)":"傷害加成（+%）","damage bonuses from gear, chests and talents, × run level, × buffs":"裝備、寶箱與天賦的傷害加成 × 場內等級 × 增益","Damage upgrades (+%)":"傷害升級（+%）","damage upgrades from cards and the skill’s talents (additive)":"卡片和該技能天賦提供的傷害升級（相加）","Double cast makes a skill or attack fire twice in a row without spending another cooldown.":"雙重詠唱會讓技能或攻擊連續施放兩次，無須再等一次冷卻。","Double cast per DEX":"每點 DEX 的雙重詠唱機率","Double cast per LUK":"每點 LUK 的雙重詠唱機率","Double Strafe, arrows, shuriken, bullets…":"二連矢、箭矢、手裏劍、子彈等","Gear ATK + {1} × STR":"裝備 ATK ＋ {1} × STR","Gear ATK + STR + {1} × DEX":"裝備 ATK ＋ STR ＋ {1} × DEX","Gear MATK + {1} × INT":"裝備 MATK ＋ {1} × INT","Hit calculator":"命中傷害計算器","melee ATK, ranged ATK or MATK, depending on the skill":"依技能使用近戰 ATK、遠程 ATK 或 MATK","Normal hit":"普通命中","on a crit: ×{1} base, plus any critical damage you add":"暴擊時以 ×{1} 為基礎，再加上額外暴擊傷害","One number scales every skill":"所有技能都以威力作為倍率","Per LUK point":"每點 LUK","power multiplier":"威力倍率","Power: an accelerating curve":"威力的加速成長曲線","Prontera Librarian":"普隆德拉圖書管理員","random variance of every hit":"每次命中的隨機浮動","Rare · Armor · Tier {1} · Safe up to +{2}":"稀有 · 防具 · 階級 {1} · 安全精鍊至 +{2}","Skill 1st":"一轉技能","Skill 2nd":"二轉技能","square root":"平方根","The basic attack":"普通攻擊","The basic attack hits very often, so it scales with the":"普通攻擊命中頻繁，因此會隨","The damage chain":"傷害計算流程","the skill’s own value: it never changes during the run":"技能本身的數值，場內不會變動","Uses the stats from the Stats calculator. It is an estimate: it ignores marks, buffs, talents with special effects and target vulnerability.":"使用能力值計算器的數據估算，未計入標記、增益、特殊天賦及目標受到傷害增加的效果。","What each skill uses is decided by its tags, not your job: an Acolyte with STR hits just as hard with a mace if the skill is physical. Hybrid skills (Arcane Shot, Fire Arrow) add ranged ATK and MATK together.":"技能使用哪種攻擊力取決於技能標籤。只要技能屬於物理類型，投資 STR 的服事用鈍器也能打出同等傷害。秘法射擊、火焰箭等混合技能會把遠程 ATK 與 MATK 相加。","Where ATK and MATK come from":"ATK 和 MATK 的來源","With":"使用","with a melee basic attack using a one-handed weapon and":"持單手武器進行近戰普攻時，以及","with a two-handed one; the Thief,":"持雙手武器時的加成。盜賊則為","{1} sections":"{1} 個章節","Nothing found. Try another word: “critical”, “refine”, “AGI”…":"找不到結果。試試其他英文關鍵字，例如 critical、refine 或 AGI。","Egg":"寵物蛋","Nv {1}–{2}":"等級 {1}–{2}","📜 Story":"📜 劇情","{1} points":"{1} 點","⚡ Run level":"⚡ 遠征等級","🌳 Browse every talent tree":"🌳 瀏覽所有天賦樹","🎓 Job Lv":"🎓 職業等級","🧍 Base Lv":"🧍 基本等級","🛠️ In development":"🛠️ 開發中","1st jobs":"一轉職業","2nd jobs":"二轉職業","2nd jobs are in development: their skills, talents and values may change before release.":"二轉職業仍在開發中：技能、天賦與數值在正式推出前可能變動。","Achievements are account-wide milestones: stages cleared, 2nd jobs, MVPs defeated, monsters hunted… Each grants Deed Points the first time, and the Chronicler trades them for card-roll perk ranks: each rank is one more use per run.":"成就是帳號共用的里程碑：通關關卡、二轉、擊敗 MVP、狩獵怪物… 每個成就首次達成時給予事蹟點數，事蹟紀錄員可用點數兌換抽卡特權等級：每一級為每局多一次使用次數。","Advances to":"晉升為","As a 2nd job, only one of its three branches can receive points: your specialization. Your 1st job points stay as you spent them when you advanced.":"二轉時，三個分支中只有一個能投入點數：你的專精。一轉的點數維持轉職時的分配。","At":"在","Base Lv EXP":"基本等級經驗","Category":"分類","Deeds and stories":"事蹟與故事","Each job has three permanent talent trees. Each row needs":"每個職業有三棵永久的天賦樹。每一列需要在該樹中每前一列投入","EXP to next level (log scale)":"升到下一級所需經驗（對數刻度）","From 1st job to 2nd job at Prontera Castle":"在普隆德拉城堡從一轉晉升二轉","Growing your character":"培養你的角色","How far Job Lv rises in each stage":"各關卡能把職業等級練到多高","Knight / Crusader":"騎士／十字軍","Monsters below your Base Lv give less and less EXP (half per level of difference): to keep leveling you have to move to higher stages.":"等級低於你基本等級的怪物給的經驗越來越少（每差一級減半）：想繼續升級就得前往更高的關卡。","Oridecon (weapons) · Elunium (others)":"神之金屬（武器）· 鋁（其他）","Past that Job Lv, the stage barely gives job EXP: move on to the next one. The last stretch to {1} means repeating Payon Cave.":"超過該職業等級後，關卡幾乎不再給職業經驗：請前往下一個關卡。最後衝到 {1} 需要反覆刷斐揚洞穴。","Points":"點數","Rises well until":"順利成長至","Scales with":"成長依據","Some stages have a story version with dialogue and cutscenes. They have no difficulty settings or loot: the reward is chosen from cards at the end. The story is played before the stage’s normal version, which only opens after beating its MVP in the story.":"部分關卡有包含對話與過場動畫的劇情版本。劇情版沒有難度設定也沒有戰利品：結束時從卡片中選擇獎勵。劇情要先於關卡的一般版本遊玩，一般版本要在劇情中擊敗其 MVP 後才會開啟。","spent in that tree per previous row, and some talents need another one maxed first (the tree’s arrow). Talents improve specific skills (more damage, more targets, cones, new effects) or your stats, and the ones in the last rows transform how a skill plays.":"，有些天賦需要先把另一個點滿（樹上的箭頭）。天賦會強化特定技能（更多傷害、更多目標、錐形、新效果）或你的數值，最後幾列的天賦會改變技能的玩法。","Stage":"關卡","Starting skill":"初始技能","Starts at {1} every run and is lost at the end. Grants skill and upgrade cards.":"每局從 {1} 開始，結束時歸零。提供技能與強化卡片。","Story mode":"劇情模式","the Prontera Castle story opens, where you advance to a 2nd job. Each 1st job chooses between two. Bard and Dancer are the same job: Bard for male characters and Dancer for female ones. The 2nd job keeps its 1st job’s tree and skills, adds its own trees with {1} more points, has ×{2} to ×{3} the HP and one more skill slot, and its ATK/MATK is worth much more.":"時會開放普隆德拉城堡的劇情，在那裡完成二轉。每個一轉職業可以在兩個之間選擇。吟遊詩人與舞孃是同一個職業：男性角色為吟遊詩人，女性角色為舞孃。二轉保留一轉的天賦樹與技能，加入自己的天賦樹並多 {1} 點，HP 為 ×{2} 到 ×{3}，多一個技能欄位，ATK/MATK 的價值也高很多。","The royal wedding, the orc assault and your 2nd job advancement.":"皇家婚禮、獸人襲擊與你的二轉晉升。","Two different levels":"兩種不同的等級","Up to {1}. Each level grants one talent point. It rises more than twice as fast as Base Lv.":"最高 {1}。每一級給一點天賦點數。升級速度是基本 Lv 的兩倍以上。","Up to {1}. Grants status points for STR, AGI, VIT, INT, DEX and LUK. Its EXP grows exponentially, like RO.":"最高 {1}。提供 STR、AGI、VIT、INT、DEX 與 LUK 的素質點數。所需經驗呈指數成長，與 RO 相同。","What counts for the whole account":"整個帳號共用的紀錄","What stays between runs":"局與局之間保留的東西","World":"世界","You can reset talents from the character panel.":"你可以在角色面板重置天賦。","Your first official mission with siblings Lain and Haru, under Selene’s command.":"你和萊恩、哈魯兄妹在瑟蕾娜指揮下的第一個正式任務。","👑 Drake":"👑 海盜之王","👑 Eddga":"👑 虎王","👑 Golden Thief Bug":"👑 黃金蟲","👑 High Orc":"👑 獸人戰士長","👑 Kraken":"👑 魔鬼大烏賊","👑 Mastering":"👑 波利之王","👑 Moonlight Flower":"👑 月夜貓","👑 Orc Hero":"👑 獸人英雄","👑 Osiris":"👑 俄塞里斯","Alberta Coast · {1} min":"艾爾貝塔海岸 · {1} 分鐘","and":"與","and meet its minimum gearscore with what you wear. Prontera Castle also needs Job Lv {1}: it’s the 2nd job advancement story and is played only once.":"擊敗前一關的 MVP，且身上的裝備評分須達到該關卡門檻。普隆德拉城堡還要求職業等級 {1}，這段二轉劇情只能遊玩一次。","Beneath the Payon mountains · {1} min":"斐揚山區地下 · {1} 分鐘","Beneath the streets of Prontera · {1} min":"普隆德拉街道下方 · {1} 分鐘","Byalan Island MVP":"柏伊亞嵐島 MVP","Chat and emotes":"聊天與表情","Each one opens by beating the previous MVP":"擊敗前一個 MVP 即可開啟","Endgame":"後期內容","Everyone picks":"每個人都要選","EXP, run level and zeny are shared. Meat goes to whoever picks it up.":"經驗、遠征等級與金幣共享。肉歸撿到的人。","Gear and cards are rolled for: the highest Need roll wins; if nobody needs it, the highest Greed.":"裝備與卡片以擲骰分配：需求骰最高者獲得；若沒人需要，則貪婪骰最高者獲得。","Gear, cards, ores and Kafra Points, with a private chat. Both players must OK and confirm.":"裝備、卡片、礦石與卡普拉點數，附私人聊天。雙方都必須按 OK 並確認。","In the plaza":"在廣場","Keep killing and climb the ladder":"不停擊殺，爬上排行榜","List showing where each friend is (channel, in a run or offline). Registered accounts only.":"顯示每位好友所在位置的清單（頻道、遊戲中或離線）。僅限註冊帳號。","Need / Greed":"需求／貪婪","of power so it doesn’t overshadow skills. 2nd jobs scale it a bit better (exponent {1}) and get the full job jump. Bows scale more than other weapons. Swordsman and Merchant (and their 2nd jobs) deal":"計算，以免普攻蓋過技能。二轉職業的成長略高（指數 {1}），也會獲得完整的轉職加成。弓的成長高於其他武器。劍士與商人（及其二轉職業）的近戰普攻傷害會增加","On level up or chest opening, the run waits for everyone to choose ({1} s each; the leader can raise it to {2} s when proposing the trip).":"升級或開寶箱時，遊戲會等所有人選完（每人 {1} 秒；隊長提議出發時可提高到 {2} 秒）。","Online":"線上","Open from the start":"一開始就開放","Orc Village MVP":"獸人村落 MVP","Outskirts of Payon · {1} min":"斐揚郊外 · {1} 分鐘","Payon Cave MVP":"斐揚洞穴 MVP","Payon Forest MVP":"斐揚森林 MVP","Player menu":"玩家選單","Prontera Castle MVP":"普隆德拉城堡 MVP","Prontera Culverts MVP":"普隆德拉地下水道 MVP","Prontera Fields MVP":"普隆德拉原野 MVP","Runs always start at run level {1}, so in higher stages monsters start weakened and reach full strength over the first minutes. Bosses always come at full strength.":"每局都從遠征等級 {1} 開始，因此在高等關卡中，怪物一開始較弱，前幾分鐘內才達到完整強度。頭目永遠以完整強度登場。","Shared EXP":"共享經驗","South of Prontera · {1} min":"普隆德拉南方 · {1} 分鐘","Stories in party":"組隊劇情","Sunken Ship MVP":"沉沒之船 MVP","Tap them to whisper, inspect their gear, trade, invite to party or add as a friend.":"點擊玩家即可密語、查看裝備、交易、邀請組隊或加為好友。","The Izlude dungeon · {1} min":"伊斯魯得地城 · {1} 分鐘","The leader drives them; anyone can trigger mechanisms and progress.":"由隊長主導；任何人都能觸發機關並推進進度。","The leader is the host: picks the stage and runs the monsters.":"隊長是主機：選擇關卡並負責運算怪物。","The plaza has several channels; you can jump to a friend’s from their menu.":"廣場有多個頻道；可從好友的選單直接跳到其頻道。","The plaza is full of adventurers":"廣場上滿是冒險者","The tower":"塔","They target the nearest player.":"牠們會攻擊最近的玩家。","To enter a stage you need to have beaten the previous MVP":"進入關卡前，你必須用","Type in chat. RO emotes work with their commands (/lv, /$, /thx…) or from the emote button.":"在聊天框輸入。RO 表情可用指令（/lv、/$、/thx…）或表情按鈕使用。","Up to {1}":"最多 {1} 人","with that character":"同一個角色",": +STR is great for a Swordsman and poor for a Mage. Each piece also adds by tier and quality. Stages require a minimum gearscore from what you wear (your pet counts too).":"的價值：+STR 對劍士很棒，對魔法師則很差。每件裝備也會依階級與品質加分。關卡要求你身上裝備的最低裝備評分（寵物也算）。","✨ Evolves from Bongun":"✨ 由妖道進化","✨ Evolves from Mastering":"✨ 由波利之王進化","✨ Evolves from Nine Tail":"✨ 由九尾狐進化","✨ Evolves from Poring":"✨ 由波利進化","A number to compare at a glance what a piece or card is worth":"裝備評分能讓你一眼看出裝備或卡片","A piece’s power doesn’t depend on its RO name but on the":"一件裝備的威力不取決於它在 RO 中的名稱，而是取決於掉落關卡的","Affixes":"詞綴","Affixes by quality":"依品質的詞綴","Bonus":"加成","Buys your gear and cards for Kafra Points and sells refining ores.":"用卡普拉點數收購你的裝備與卡片，並販售精鍊礦石。","Changes hairstyle, hair colour and clothing dye for free.":"免費更換髮型、髮色與服裝染色。","Companions":"夥伴","Equipment slots":"裝備欄位","Every monster can drop its RO card (very rare; more likely from bosses). Socket them into gear slots from the character panel; they grant their bonuses while you wear the piece.":"每種怪物都可能掉落其 RO 卡片（非常稀有；頭目機率較高）。在角色面板將卡片插入裝備的插槽；穿著該裝備時即可獲得卡片加成。","Every pet (Loyal bonus, no accessory)":"所有寵物（忠誠加成、無配件）","Everything from epic and +{1}–{2}% damage to one of your job’s skills":"史詩的全部效果，再加上對你職業某一技能 +{1}–{2}% 傷害","for your job":"對你的職業","From":"來源","Head (upper, middle, lower)":"頭部（上、中、下）","How to get them":"取得方式","If a refine fails, the piece breaks and is lost with its cards. Up to +{1} is safe. Ores are bought from the Ore Merchant with Kafra Points. Accessories, middle/lower headgear and starter gear can’t be refined.":"精鍊失敗時，裝備會連同卡片一起損毀消失。+{1} 以內安全。礦石可用卡普拉點數向礦石商人購買。飾品、中／下頭飾與初始裝備無法精鍊。","Intimacy rises by playing runs with the pet (about {1} long runs to Loyal). At Cordial, the Pet Keeper sells its accessory for {2} Kafra Points: the bonus goes ×{3}. Evolving needs the pet at Loyal and its boss beaten {4} times (by any character on the account).":"和寵物一起遊玩就會提升親密度（大約 {1} 場長時間的遊戲達到忠誠）。達到親密時，寵物管理員會以 {2} 卡普拉點數販賣牠的配件：加成變為 ×{3}。進化需要寵物達到忠誠，並擊敗其首領 {4} 次（帳號中任何角色都可以）。","Me: this wiki.":"我：就是這個 Wiki。","Nothing":"無","NPCs":"NPC 一覽","of the stage where it dropped. A tier {1} weapon has {2}–{3} ATK (or MATK for rods and books), and each tier adds {4}%. Within that, the weapon type places it like RO: daggers, knuckles and whips at the bottom; swords and maces in the middle; axes and spears a bit higher; two-handers at the top. Armor DEF and affix values are multiplied by the tier (tier {5} = ×{6}).":"。第 {1} 階級的武器有 {2}–{3} ATK（法杖與書為 MATK），每一階級多 {4}%。在這個範圍內，武器類型的定位和 RO 一樣：短劍、拳套與鞭子在最下面；劍與鈍器在中間；斧與矛稍高；雙手武器在最上面。防具 DEF 與詞綴數值會乘以階級（第 {5} 階級 = ×{6}）。","One primary stat":"一項主要素質","One primary stat + crit, Haste or area (or pierce on armor and ranged weapons)":"一項主要素質 + 暴擊、冷卻加速或範圍（防具與遠程武器則可能是貫穿）","Pick a stage and difficulty and head out. A “!” marks a newly unlocked stage.":"選擇關卡與難度後出發。「!」表示新解鎖的關卡。","Quality":"品質","Records account achievements and, with their points, sells card-roll perks (Reroll, Banish, Focus…).":"記錄帳號成就，並用其點數販售抽卡特權（重抽、放逐、專注…）。","Refine (Hollgrehenn the Blacksmith)":"精鍊（鐵匠 忽克連）","Refines gear up to +{1} with ores. Careful: from +{2} it can break.":"用礦石將裝備精鍊到 +{1}。小心：+{2} 起可能會損毀。","Sells your pets’ accessories and evolves them.":"販售寵物配件並讓寵物進化。","Success":"成功率","The account currency. Earn them by selling gear and cards to the Ore Merchant and spend them on ores, pet accessories and more. They can also be traded with other players.":"帳號共用的貨幣。把裝備與卡片賣給礦石商人即可賺取，可用來購買礦石、寵物配件等。也能與其他玩家交易。","The Endless Tower gate: endless waves with a monthly ladder.":"無限塔入口。挑戰無盡的魔物攻勢，角逐每月排行榜。","The fountain plaza":"噴泉廣場","The piece is named after its highest primary stat: “Knife of Strength”.":"裝備以其最高的主要素質命名：「力量之短劍」。","Their egg drops from their monster, like cards: {1}% from normal monsters and {2}% from the MVP. A pet you already own won’t drop again. Boss pets don’t hatch from eggs: you get them by evolving the previous pet.":"寵物蛋和卡片一樣，由對應的魔物掉落：一般魔物掉落率為 {1}%，MVP 為 {2}%。已擁有的寵物不會再掉蛋。首領寵物需由前一隻寵物進化取得。","They follow you in runs and grant their bonus":"在遊戲中跟著你並提供加成","tier":"階級","Tiers and base power":"階級與基礎強度","Total power":"總強度","Two primary stats + crit/Haste/area + HP/armor/speed/Flee":"兩項主要素質 + 暴擊／冷卻加速／範圍 + HP／護甲／速度／迴避","What bosses drop and what the smith does":"頭目會掉落什麼，以及鐵匠能做什麼","Where every journey begins and ends":"每段旅程的起點與終點","Your character":"你的角色","Protection":"防護","Bash, Magnum Break and mastery of the sword.":"強化狂擊、怒爆與劍術。","Fast basic attacks, criticals and more danger at low HP.":"加快普通攻擊、提升暴擊，並在低 HP 時發揮更強戰力。","HP, armor and recovery. Provoke and Endure.":"強化 HP、防禦與恢復，並提升挑釁和霸體。","Click: add point · Right click: remove":"左鍵加點 · 右鍵退點","Tap a talent to see it and raise or lower it":"點一下天賦即可查看說明、加點或退點。","Reset talents":"重置天賦","Reset all talents? You get all points back.":"要重置所有天賦嗎？已分配的點數會全部退回。","Next rank":"下一級","At max rank":"已達滿級","Tempered Edge":"淬鍊鋒刃","Improved Bash":"強化狂擊","Deep Cut":"深斬","Fatal Blow":"攻擊弱點","Empowered Magnum":"強化怒爆","Weapon Mastery":"武器精通","Giant Killer":"巨人殺手","Quick Magnum":"迅捷怒爆","Coup de Grâce":"終結一擊","Magnum Flames":"怒爆烈焰","Lethal Precision":"致命精準","Warrior's Reach":"戰士的攻擊距離","Infernal Magnum":"煉獄怒爆","Commanding Voice":"號令","Dread":"恐懼","Crushing Bash":"粉碎狂擊","Brutality":"兇猛","Charge":"衝鋒","Double Slash":"二連斬","Frenzy":"狂熱","Two-Hand Quicken":"雙手劍攻擊速度增加","Bloodlust":"嗜血","Relentless Edge":"無情鋒刃","Chained Slashes":"連鎖斬擊","Adrenaline":"腎上腺素","Roar":"怒吼","Steel Fury":"鋼鐵怒火","Berserk":"狂怒之槍","Dance Step":"舞步","Swift Dance":"迅捷劍舞","Whirlwind":"旋風","Dance of Death":"死亡之舞","Tough Skin":"硬化皮膚","Firm Stance":"穩固姿態","Recovery":"恢復","Shield Mastery":"盾牌精通","War Cry":"戰吼","Resilience":"韌性","Moving HP Recovery":"移動時恢復 HP","Raised Guard":"舉盾戒備","Brutal Provocation":"強力挑釁","Conviction":"信念","Grit":"堅毅","Shield Strike":"盾牌打擊","Vanguard":"先鋒","Steamroller":"碾壓","Presence":"威勢","Immovable":"不動如山","Wall":"壁壘","Last Breath":"最後一息","basic attacks":"普通攻擊","+{1}% critical.":"暴擊機率 +{1}%。","+{1}% critical damage.":"暴擊傷害 +{1}%。","+{1}% critical chance.":"暴擊機率 +{1}%。","+{1}% damage.":"傷害 +{1}%。","+{1} Haste.":"冷卻加速 +{1}。","+{1}% area.":"範圍 +{1}%。","+{1}% melee reach.":"近戰攻擊距離 +{1}%。","+{1}% melee ATK.":"近戰 ATK +{1}%。","+{1}% max HP.":"最大 HP +{1}%。","+{1} max HP.":"最大 HP +{1}。","+{1} HP/s.":"每秒恢復 {1} HP。","+{1} HP/s while moving.":"移動時每秒恢復 {1} HP。","+{1} HP/s while standing still.":"靜止時每秒恢復 {1} HP。","+{1} armor.":"防禦 +{1}。","-{1}% damage taken.":"承受傷害 -{1}%。","+{1}% speed.":"移動速度 +{1}%。","+{1}% movement speed.":"移動速度 +{1}%。","+{1}% double cast.":"雙重詠唱機率 +{1}%。","+{1}% damage to bosses and elites.":"對首領與菁英的傷害 +{1}%。","+{1}% chance to stun on hit.":"命中時的暈眩機率 +{1}%。","+{1}% critical, +{2}% critical damage.":"暴擊機率 +{1}%，暴擊傷害 +{2}%。","+{1}% melee reach, +{2}% damage.":"近戰攻擊距離 +{1}%，傷害 +{2}%。","+{1}% damage, +{2}% movement speed.":"傷害 +{1}%，移動速度 +{2}%。","Bash has a {1}% chance to stun.":"狂擊有 {1}% 機率使目標暈眩。","Bash deals +{1}% damage and reaches {2}% farther. It slams the ground: enemies around the target take {3}% of the damage.":"狂擊傷害 +{1}%，攻擊距離增加 {2}%。猛擊地面時，目標周圍的敵人會受到該次傷害的 {3}%。","Enemies hit by Magnum Break take +{1}% damage for {2} s.":"被怒爆命中的敵人承受傷害 +{1}%，持續 {2} 秒。","Magnum Break deals {1}% less damage on hit, but burns for {2}% of its normal damage over {3} s and has {4}% more area.":"怒爆的命中傷害降低 {1}%，但在 {3} 秒內造成相當於原傷害 {2}% 的灼燒傷害，範圍也增加 {4}%。","Demoralizing Shout lowers enemy damage by a further {1}%.":"挫志怒吼使敵人造成的傷害再降低 {1}%。","Demoralizing Shout slows enemies for {1} s.":"挫志怒吼使敵人緩速 {1} 秒。","+{1}% damage at low HP.":"低 HP 時傷害 +{1}%。","+{1}% damage at low HP. With a two-handed sword, another +{2}% and +{3}% melee reach.":"低 HP 時傷害 +{1}%。使用雙手劍時，傷害再增加 {2}%，近戰攻擊距離 +{3}%。","Your area skills deal {1}% more damage":"範圍技能傷害增加 {1}%","Your area skills deal {1}% more damage.":"範圍技能傷害增加 {1}%。","+{1}% damage and +{2} Haste on basic attacks.":"普通攻擊的傷害 +{1}%，冷卻加速 +{2}。","+{1}% damage, +{2}% melee reach and +{3} Haste on basic attacks. Your max HP drops to {4}% and you always count as being at low HP. You heal {5}% of the damage your bleeds deal.":"傷害 +{1}%，近戰攻擊距離 +{2}%，普通攻擊冷卻加速 +{3}。最大 HP 降至 {4}%，且始終視為低 HP。流血造成的傷害有 {5}% 會轉為自身治療。","Sword Dance makes one more pass and deals +{1}% damage.":"劍舞多斬擊一波，傷害 +{1}%。","Endure lasts {1} s longer.":"霸體持續時間延長 {1} 秒。","If you have not been hit for {1} s, the next hit is reduced by {2}%.":"若 {1} 秒內未受擊，下次受到的傷害減少 {2}%。","Provoke increases damage taken by a further +{1}%.":"挑釁使目標承受的傷害再增加 {1}%。","When you activate Endure, you recover {1}% of your missing HP.":"發動霸體時，恢復已損失 HP 的 {1}%。","Shield Bash reaches +{1}% farther and its shield is +{2}% larger.":"盾擊的攻擊距離 +{1}%，盾牌尺寸 +{2}%。","Shield Bash drags the enemies it passes through (except bosses) to the end of its path and crushes them there: {1}% of its damage, +{2}% per enemy dragged.":"盾擊會將沿途敵人拖到終點並碾壓，首領除外。碾壓傷害為盾擊傷害的 {1}%，每拖行一名敵人再增加 {2}%。","Each hit you take grants +{1}% damage for {2} s (stacks up to {3} times).":"每次受擊時傷害 +{1}%，持續 {2} 秒，最多疊加 {3} 次。","The hit that would kill you is negated: you heal to full health and deal +{1}% damage for {2} s. It can trigger again after {3} s.":"抵銷致命一擊，將生命恢復至全滿，並使傷害 +{1}%，持續 {2} 秒。經過 {3} 秒可再次觸發。","Only with a shield":"僅裝備盾牌時生效","Only with a one-handed sword":"僅裝備單手劍時生效","Only with one-handed sword":"僅裝備單手劍時生效","Only with two-handed sword or two-handed spear":"僅裝備雙手劍或雙手矛時生效","Only with one-handed sword or one-handed spear":"僅裝備單手劍或單手矛時生效","Active with your current weapon.":"目前裝備的武器符合條件，效果已生效。","Active with your current gear.":"目前的裝備符合條件，效果已生效。","Not active right now: no weapon equipped.":"目前未裝備武器，效果未生效。","Not active right now: no shield equipped.":"目前未裝備盾牌，效果未生效。","Arcane":"秘法","Marksman":"神射","Siege":"箭陣","Exorcism":"驅魔","Retribución":"制裁","Assassination":"暗殺","Shadows":"暗影","Smithing":"鍛造","Throwing":"投擲","Ninjutsu":"忍術","Stealth":"潛行","Pistoleer":"手槍","Shotgun":"霰彈槍","Falcon":"獵鷹","Traps":"陷阱","Big Game":"獵殺巨獸","Fire Bolt, Fire Wall and orbiting flames.":"強化火箭術、火焰之壁與環繞火焰。","Freezes and controls the horde.":"以冰凍限制大群魔物的行動。","Souls, bolts and storms. Cooldowns and casting.":"強化靈魂、元素箭與風暴，並加快冷卻與詠唱。","Basic attack, crits, Double Strafe and Retreat.":"強化普攻、暴擊、二連矢與後撤射擊。","Haste, area, Arcane Shot and Fire Arrow.":"提升冷卻加速與範圍，強化秘法射擊和火焰箭。","Arrow Shower, Arrow Rain and Arrow Repel: hold your ground and cover the field in arrows.":"用箭雨、箭矢風暴與衝鋒箭守住陣地，以箭矢覆蓋戰場。","Heal, Aqua Benedicta and Blessing: hold out by healing yourself in the middle of the horde.":"以治癒術、製作聖水與天使之賜福，在魔物群中持續治療並撐下去。","Holy Light, Signum Crucis and Decrease AGI: the light that purges, marks and slows.":"以神聖之光、天使之怒與緩速術（降低 AGI）驅邪、標記並緩速敵人。","Holy Smite, mace, knuckle or book attacks and Ruwach: the build that leads to the Monk.":"強化神聖重擊、鈍器／拳套／書本攻擊與光獵，為轉職武僧做準備。","Envenom, Poison Bomb and poisons that rot the horde.":"以施毒、毒霧炸彈和各種毒素削弱怪群。","Double hits, knives, sand, stones and loot.":"強化二刀連擊、飛刀、砂、石塊與戰利品收益。","Hiding, Shadowstep and Caltrops: escape and never fall.":"以隱匿、暗影步和鐵蒺藜脫離險境。","Zeny Rain, Vending and zeny: money as a weapon.":"用金幣雨、露天商店與 Zeny，把錢變成武器。","Cart Revolution and Cart Rush: the cart as weapon and shield.":"以手推車攻擊和手推車突進攻守兼備。","Mammonite, shouts and weapon strikes.":"強化金錢攻擊、吶喊與武器打擊。","Shuriken and Huuma: a rain of steel.":"以手裏劍和風魔手裏劍造成密集攻擊。","Flaming Petals and Lightning Strike: ninja fire and lightning.":"運用火炎花與雷擊術，以火與雷攻擊敵人。","Kunai, Flee and criticals.":"強化苦無、迴避與暴擊。","Triple Action and Rapid Shower: revolver bursts.":"用三連擊與快速射擊打出左輪連發。","Spread Attack and Desperado: close-range destruction.":"以擴散攻擊與亡命之徒壓制近身敵人。","Tracking and Ground Drift: precise shots and grenades.":"以精準射擊和地面榴彈攻擊敵人。","Blitz Beat and Detecting: your falcon hunts with you and marks the prey.":"以閃電衝擊和尋敵，讓獵鷹協助狩獵並標記目標。","Claymore Trap and Sandman: the ground they walk on is yours.":"利用暴散陷阱與睡魔陷阱控制敵人的行進路線。","Beast Strafing and Phantasmic Arrow: arrows for big prey.":"以動物猛擊和幻影箭對付大型獵物。","+{1}% stun on hit.":"命中時的暈眩機率 +{1}%。","At low HP, your hits make enemies bleed for {1}% of their damage over {2} s.":"低 HP 時，命中會使敵人在 {2} 秒內受到相當於本次傷害 {1}% 的流血傷害。","Ice":"冰","Living Flame":"躍動之焰","Scorching Wall":"灼熱火牆","Inner Heat":"內在熱能","Fiery Barrage":"烈焰連發","Fire Infusion":"火焰灌注","Multiple Fire":"多重火焰","Quick Wall":"迅捷火牆","Combustion":"燃燒","More Flames":"增幅火焰","Pyrotechnics":"爆炎技巧","Comforting Warmth":"暖意","Eternal Fire":"永恆之火","Fire Conduit":"火焰導流","Heat Wave":"熱浪","Orbiting Flames":"環繞火焰","Pyromaniac":"縱火狂","Firestorm":"火焰風暴","Twin Fire":"雙重火焰","Piercing Cold":"刺骨寒冰","Frozen Barrage":"冰霜連發","Ice Infusion":"冰霜灌注","Shatter":"碎冰","Glaciation":"冰結","Frost Armor":"冰霜護甲","Ice Rain":"冰雨","Chain Frost":"連鎖冰霜","Ice Conduit":"冰霜導流","Winter Skin":"寒冬之膚","Lingering Frost":"持續冰霜","Blizzard":"暴風雪","Deep Freeze":"深度冰凍","Mighty Soul":"強化靈魂","High Voltage":"高電壓","Voltaic Barrage":"閃電連發","Swift Casting":"迅捷詠唱","Lightning Infusion":"雷電灌注","Soul Legion":"靈魂軍團","Raging Storm":"狂暴風暴","Storm Front":"風暴前鋒","Quick Storm":"迅捷風暴","Empowered Napalm":"強化心靈爆破","Voltaic Conduit":"雷電導流","Arcane Power":"秘法之力","Clearcast":"清晰施法","Split Soul":"靈魂分裂","Soul Shield":"靈魂護盾","Electrical Mayhem":"電能漩渦","Your fire spells burn the target: it takes {1}% of the hit's damage as fire over {2} s (stacks if it was already burning).":"火屬性法術會灼燒目標，在 {2} 秒內造成相當於本次命中傷害 {1}% 的火屬性傷害。灼燒可以疊加。","Your targeted fire spells (Fire Bolt, the fire-infused attack...) hit {1} more enemy at once (Fire Bolt, {2}).":"需要選定目標的火屬性法術（例如火箭術與火焰灌注普攻）會同時多命中 {1} 名敵人。火箭術則可命中 {2} 名。","+{1} Haste on your fire spells (also the fire-infused attack).":"火屬性法術與火焰灌注普攻的冷卻加速 +{1}。","Sight deals +{1}% damage and spins {2}% faster.":"火狩傷害 +{1}%，旋轉速度增加 {2}%。","Combustion's burn can also crit: each tick rolls its own critical.":"燃燒造成的灼燒也能暴擊，每次灼燒傷害都會獨立判定。","Thunderstorm becomes a firestorm: tornadoes of flame instead of lightning. It is a fire spell: it gets the fire talents (Combustion, Multi Fire, Eternal Fire...) instead of the lightning ones.":"雷爆術變為火焰風暴，以火焰龍捲攻擊。它會成為火屬性法術，套用燃燒、多重火焰、永恆之火等火系天賦。","Every fire spell you cast repeats instantly on another target (or, if it's an area spell, on another group) with {1}% of its damage: the same bolts and effects. If there's no other enemy, it's lost.":"每次施放火屬性法術時，會立即對另一個目標再施放一次。範圍法術會改打另一群敵人。額外施放保留原本的箭矢與效果，傷害為原本的 {1}%。沒有其他敵人時不會觸發。","Your ice spells have +{1}% chance to freeze.":"冰屬性法術的凍結機率 +{1}%。","Enemies hit by your ice spells take +{1}% damage for {2} s.":"被冰屬性法術命中的敵人承受傷害 +{1}%，持續 {2} 秒。","Frost Diver freezes {1} s longer.":"冰凍術的凍結時間延長 {1} 秒。","+{1}% double cast on your ice spells (also the ice-infused attack).":"冰屬性法術與冰霜灌注普攻的雙重詠唱機率 +{1}%。","Fire Bolt and Lightning Bolt become Cold Bolt: they are still separate skills, but all three share the run upgrades (each one casts the bolts of all of them), the talents and the Cold Bolt Deity.":"火箭術和雷擊術會改為發射冰箭。三者仍是獨立技能，但共享場內升級（各自發射三者的冰箭）、天賦與冰箭術神格。","Frost Diver releases an ice nova on impact that freezes every enemy within {1} m (grows with area).":"冰凍術命中時會放出冰霜新星，凍結 {1} 公尺內的所有敵人。此距離會隨範圍加成提高。","Your ice spells deal {1}% damage to enemies that were already frozen.":"冰屬性法術對已凍結的敵人造成 {1}% 傷害。","Napalm Beat deals +{1}% damage and has +{2}% area.":"心靈爆破傷害 +{1}%，範圍 +{2}%。","When you cast Soul Strike, {1}% chance to reset Napalm Beat's cooldown.":"施放聖靈召喚時，有 {1}% 機率重置心靈爆破的冷卻時間。","You start the run with Soul Strike. Each Soul Strike soul that hits releases another soul toward another nearby monster, with {1}% of its damage.":"開場時就會取得聖靈召喚。每個靈魂命中後，會朝附近另一隻魔物釋放新靈魂，造成相當於原傷害 {1}% 的傷害。","Each monster you kill with Soul Strike gives you {1}% damage reduction for {2} s, stacking up to {3}%.":"每用聖靈召喚擊殺一隻魔物，就獲得 {1}% 減傷，持續 {2} 秒，最高可疊至 {3}%。","Thunderstorm has +{1}% area, drags monsters toward its center and slows them for {2} s.":"雷爆術的範圍 +{1}%，會把魔物拉向中心並使其緩速 {2} 秒。","+{1}% damage, +{2} Haste.":"傷害 +{1}%，冷卻加速 +{2}。","+{1} cast speed.":"詠唱速度 +{1}。","+{1}% petrify on hit, petrified enemies take +{2}% damage from any source.":"命中時的石化機率 +{1}%，石化目標承受所有來源的傷害 +{2}%。","+{1} casting speed on Thunderstorm.":"雷爆術的詠唱速度 +{1}。","Double Casting":"雙倍投擲","+{1} flame":"火焰數量 +{1}","+{1} flames":"火焰數量 +{1}","Sword Dance: +{1} pulse, +{2}% damage.":"劍舞的斬擊波 +{1}，傷害 +{2}%。","Your basic attack, whatever your weapon, becomes a magic fire projectile that scales with MATK, deals {1}% more damage than the rod attack, hits {2} more enemy at once and gains the effects your talents give to fire spells. With several infusions, the shot combines them, takes the effects and extras of all of them and deals even more damage: +{3}% with two and +{4}% with three.":"無論裝備哪種武器，普通攻擊都會變為依 MATK 計算的火焰魔法投射物。相較於法杖普攻，傷害提高 {1}%，同時多命中 {2} 名敵人，並套用天賦賦予火焰法術的效果。多種灌注會合併成一次射擊，保留各自的效果與額外能力。兩種灌注時傷害 +{3}%，三種時 +{4}%。","Your basic attack, whatever your weapon, becomes a magic ice projectile that scales with MATK, deals {1}% more damage than the rod attack, has a {2}% chance to pierce another enemy and gains the effects your talents give to ice spells. With several infusions, the shot combines them, takes the effects and extras of all of them and deals even more damage: +{3}% with two and +{4}% with three.":"無論裝備哪種武器，普通攻擊都會變為依 MATK 計算的冰霜魔法投射物。相較於法杖普攻，傷害提高 {1}%，有 {2}% 機率額外貫穿一名敵人，並套用天賦賦予冰霜法術的效果。多種灌注會合併成一次射擊，保留各自的效果與額外能力。兩種灌注時傷害 +{3}%，三種時 +{4}%。","Your basic attack, whatever your weapon, becomes a magic lightning projectile that scales with MATK, deals {1}% more damage than the rod attack, fires {2} more projectiles and gains the effects your talents give to lightning spells. With several infusions, the shot combines them, takes the effects and extras of all of them and deals even more damage: +{3}% with two and +{4}% with three.":"無論裝備哪種武器，普通攻擊都會變為依 MATK 計算的雷電魔法投射物。相較於法杖普攻，傷害提高 {1}%，額外發射 {2} 個投射物，並套用天賦賦予雷電法術的效果。多種灌注會合併成一次射擊，保留各自的效果與額外能力。兩種灌注時傷害 +{3}%，三種時 +{4}%。","+{1} Fire Bolt bolt on each target.":"火箭術對每個目標多發射 {1} 發元素箭。","+{1} Fire Bolt bolts on each target.":"火箭術對每個目標多發射 {1} 發元素箭。","You start the run with Fire Bolt. Fire Bolt also gets the upgrades of Cold Bolt and Lightning Bolt: the ones gained during the run (damage, targets, bolts, cooldown...), their talents and their Deity.":"開場時取得火箭術。火箭術也會套用冰箭術與雷擊術的場內升級（傷害、目標數、元素箭數、冷卻等）、天賦和神格。","+{1} Cold Bolt bolt on each target.":"冰箭術對每個目標多發射 {1} 發元素箭。","+{1} Cold Bolt bolts on each target.":"冰箭術對每個目標多發射 {1} 發元素箭。","You start the run with Cold Bolt. Cold Bolt also gets the upgrades of Fire Bolt and Lightning Bolt: the ones gained during the run (damage, targets, bolts, cooldown...), their talents and their Deity.":"開場時取得冰箭術。冰箭術也會套用火箭術與雷擊術的場內升級（傷害、目標數、元素箭數、冷卻等）、天賦和神格。","+{1} Lightning Bolt bolt on each target.":"雷擊術對每個目標多發射 {1} 發元素箭。","+{1} Lightning Bolt bolts on each target.":"雷擊術對每個目標多發射 {1} 發元素箭。","You start the run with Lightning Bolt. Lightning Bolt also gets the upgrades of Fire Bolt and Cold Bolt: the ones gained during the run (damage, targets, bolts, cooldown...), their talents and their Deity.":"開場時取得雷擊術。雷擊術也會套用火箭術與冰箭術的場內升級（傷害、目標數、元素箭數、冷卻等）、天賦和神格。","+{1} Soul Strike soul on each target.":"聖靈召喚對每個目標多發射 {1} 個靈魂。","+{1} Soul Strike souls on each target.":"聖靈召喚對每個目標多發射 {1} 個靈魂。","Sharpened Arrows":"銳利箭矢","Bow Mastery":"弓術精通","Archer's Stride":"弓手步伐","Quick Draw":"迅捷拉弓","Extended Salvo":"延伸齊射","Piercing Arrow":"貫穿箭","Quick Retreat":"迅捷後撤","Hunter's Instinct":"獵人直覺","Covering Fire":"掩護射擊","Serrated Tips":"鋸齒箭頭","Marked Prey":"獵物標記","Twin Arrows":"雙生箭","Weak Spot":"弱點","Salvo Storm":"齊射風暴","Agile Mind":"敏銳思緒","Wide Pulse":"擴散脈衝","Spreading Fire":"火勢蔓延","Insight":"洞察","Fire Arrows":"烈焰箭群","Arcane Flurry":"秘法連發","Gravity":"重力","Elemental Focus":"元素專注","Embers":"餘燼","Double Shot":"雙重射擊","Arcane Reach":"秘法範圍","Arcane Flow":"秘法流動","Elemental Convergence":"元素匯聚","Firing Range":"射擊陣地","Lasting Concentration":"持久專注","Siege Stance":"攻城姿態","Camouflage":"偽裝","Lethal Fan":"致命箭扇","Extra Volley":"追加齊射","Mark Prey":"標記獵物","Deadly Rain":"致命箭雨","More Arrows":"追加箭矢","Weighted Arrows":"加重箭矢","Charged Arrow":"蓄力箭","Quick Reload":"迅捷裝填","Stunning Bolt":"暈眩箭","Total Siege":"全面攻城","DEX: your Archer deals damage with it.":"DEX：弓箭手的傷害取決於這項能力值。","Double Strafe shoots at {1} more enemy at once.":"二連矢可同時多射擊 {1} 名敵人。","Your basic attacks have +{1}% critical chance.":"普攻的暴擊機率 +{1}%。","Your basic attacks shoot {1} more enemy at once.":"普攻可同時多射擊 {1} 名敵人。","Enemies hit by Double Strafe are marked for {1} s: your basic attacks deal {2}% more damage to them.":"被二連矢命中的敵人會被標記 {1} 秒，受到你的普攻傷害增加 {2}%。","You start the run with Double Strafe. Each basic attack crit has a {1}% chance to fire a free Double Strafe salvo at that enemy with {2}% of its damage, without using its cooldown.":"開場時取得二連矢。普攻暴擊時有 {1}% 機率對該敵人額外施放二連矢，造成相當於原技能 {2}% 的傷害，且無須等待或消耗冷卻。","Fire Arrow's burn deals +{1}% of the hit's damage (without talents, {2}%).":"火焰箭的灼燒傷害額外增加本次命中傷害的 {1}%（未點天賦時為 {2}%）。","Fire Arrow's burn deals {1}% more of the hit.":"火焰箭的灼燒傷害額外增加本次命中傷害的 {1}%。","Each Arcane Shot or Fire Arrow you cast takes {1} s off the other one's cooldown.":"每次施放秘法射擊或火焰箭，都會使另一項技能的剩餘冷卻時間縮短 {1} 秒。","Arcane Shot slows those it hits for {1} s.":"秘法射擊使命中的敵人緩速 {1} 秒。","+{1}% damage with your elemental arrows (Arcane Shot and Fire Arrow).":"秘法射擊與火焰箭的傷害 +{1}%。","If the Arcane Shot pulse pulls in any burning monster, a {1} m fire explosion bursts when it closes, dealing damage based on your ATK and INT and setting everything it hits on fire.":"秘法射擊的脈衝若拉入任何灼燒中的魔物，脈衝收束時會引發 {1} 公尺的火焰爆炸。爆炸傷害依 ATK 和 INT 計算，並灼燒命中的敵人。","Improve Concentration lasts {1}% longer and has {2}% less cooldown.":"心神凝聚的持續時間增加 {1}%，冷卻時間縮短 {2}%。","While standing still, you deal +{1}% damage.":"靜止時傷害 +{1}%。","Enemies hit by Arrow Shower take {1}% more damage from everything for {2} s.":"被箭雨命中的敵人在 {2} 秒內承受的所有傷害增加 {1}%。","Arrow Rain slows those it hits for {1} s.":"箭矢風暴使命中的敵人緩速 {1} 秒。","Arrow Repel has +{1}% area and a {2}% chance to stun.":"衝鋒箭的範圍 +{1}%，並有 {2}% 機率使敵人暈眩。","+{1}% damage with area skills.":"範圍技能傷害 +{1}%。","When you cast Arrow Shower, Arrow Rain or Arrow Repel, you cast another of the three for free, at random, on a different target (without using its cooldown, even if you do not have it).":"施放箭雨、箭矢風暴或衝鋒箭時，會隨機對另一目標額外施放其餘兩項技能之一。額外施放不影響冷卻，即使尚未學會該技能也會觸發。","+{1}% projectile speed.":"投射物速度 +{1}%。","+{1}% pierce chance.":"貫穿機率 +{1}%。","+{1} arrow":"箭矢數 +{1}","+{1} arrows":"箭矢數 +{1}","+{1} volley":"齊射次數 +{1}","+{1} volleys":"齊射次數 +{1}","+{1} projectiles":"投射物數 +{1}","Double Strafe: A very fast salvo of arrows that curve into the nearest enemy, alternating sides.":"二連矢：高速從左右交替射出弧形箭矢，攻擊最近的敵人。","Arcane Shot: An arcane shot at the center of the biggest group in range: on impact it releases a pulse that yanks nearby monsters (except bosses) toward it.":"秘法射擊：朝射程內最大的敵群中心射擊，命中時產生脈衝，把附近魔物拉向命中點。首領不受拉扯。","Arrow Repel: Huge arrow that pierces everyone and pushes them far away.":"衝鋒箭：射出巨箭，貫穿沿途所有敵人並將其遠遠擊退。","Arrow Shower: A fan of arrows at the group: hits everyone in front of you and knocks them back. Fires {1} volleys.":"箭雨：朝敵群射出扇形箭矢，命中並擊退前方所有敵人。共齊射 {1} 波。","Fire Arrow: A fire arrow lobbed at the nearest enemy: it bursts like a fireball that damages and burns everything in the impact, and splashes fire further out that burns the enemies around it.":"火焰箭：向最近的敵人拋射火箭，落地時爆炸，對命中範圍內的敵人造成傷害與灼燒。飛濺的火焰也會灼燒外圍的敵人。","Improve Concentration: For {1} s: +{2}% AGI and DEX.":"心神凝聚：{1} 秒內，AGI 與 DEX 各提高 {2}%。","Tap a stat to see what it does.":"點一下能力值即可查看效果。","Acolyte damage: INT on the way to Priest, STR on the way to Monk.":"服事的傷害取決於轉職路線。祭司看 INT，武僧看 STR。","★ Acolyte damage: INT on the way to Priest, STR on the way to Monk.":"★ 服事的傷害取決於轉職路線。祭司看 INT，武僧看 STR。","★ The Swordsman's damage stat.":"★ 劍士的主要傷害屬性。","★ The Mage's damage stat.":"★ 魔法師的主要傷害屬性。","★ The Archer's damage stat.":"★ 弓箭手的主要傷害屬性。","STR: your Thief deals damage with it.":"STR：盜賊的主要傷害屬性。","★ The Thief's damage stat.":"★ 盜賊的主要傷害屬性。","STR: your Merchant deals damage with it.":"STR：商人的主要傷害屬性。","★ The Merchant's damage stat.":"★ 商人的主要傷害屬性。","STR: your Taekwon deals damage with it.":"STR：跆拳少年的主要傷害屬性。","★ The Taekwon's damage stat.":"★ 跆拳少年的主要傷害屬性。","DEX: your Ninja deals damage with it.":"DEX：忍者的主要傷害屬性。","★ The Ninja's damage stat.":"★ 忍者的主要傷害屬性。","DEX: your Gunslinger deals damage with it.":"DEX：神槍手的主要傷害屬性。","★ The Gunslinger's damage stat.":"★ 神槍手的主要傷害屬性。","Holy":"神聖","Retribution":"制裁","Divine Healing":"神聖治療","Holy Water":"聖水","Lasting Blessing":"持久祝福","Overflowing Grace":"滿溢恩典","Wide Puddle":"廣域聖水","Meditatio":"冥想","Quick Heal":"迅捷治癒","Living Water":"活水","Shared Blessing":"共享祝福","Assumptio":"聖母之祈福","Holy Puddle":"神聖水域","Basilica":"神聖殿堂","Mana Recharge":"魔力減免","Fountain of Life":"生命之泉","Blinding Light":"眩目聖光","Burning Cross":"燃燒十字","Quick Prayer":"迅捷祈禱","Wide Cross":"廣域十字","Divine Slowness":"神聖緩速","Lex Divina":"沉默之術","Double Light":"雙重聖光","Weight of Sin":"罪孽之重","Lex Aeterna":"天使之怒","Condemnation":"定罪","Judgment":"審判","Faith":"信仰","Consecrated Ground":"祝聖之地","Suffragium":"犧牲祈福","Purification":"淨化","Zeal":"虔誠","Divine Judgment":"神聖審判","Mace Mastery":"權杖使用熟練度","Mace Blow":"鈍器重擊","Burning Orbs":"燃燒光球","Fervor":"熱忱","More Orbs":"額外光球","Iron Hand":"鐵沙掌","Sure Punishment":"精準懲戒","Triple Attack":"六合拳","Swift Orbs":"迅捷光球","Blessed Hand":"祝福之手","Investigate":"浸透勁","Holy Rhythm":"神聖節奏","Holy Sweep":"神聖橫掃","Strength of Faith":"信仰之力","Fleeting Blessing":"瞬發祝福","Light Strike":"聖光打擊","Only with mace or knuckle or book":"僅限裝備鈍器、拳套或書本","+{1}% critical damage on basic attacks and Holy Smite.":"普通攻擊與神聖重擊的暴擊傷害 +{1}%。","+{1} Haste on basic attacks and Holy Smite.":"普通攻擊與神聖重擊的冷卻加速 +{1}。","Blessing lasts {1}% longer.":"天使之賜福的持續時間延長 {1}%。","Heal's Grace deals {1}% more damage":"治癒術的恩典傷害提高 {1}%","Aqua Benedicta heals {1}% more.":"天使之淚的治療量提高 {1}%。","Blessing also grants +{1} Haste while it lasts.":"天使之賜福生效期間，額外提供 +{1} 冷卻加速。","Aqua Benedicta slows those standing in it for {1} s.":"站在天使之淚水域內的敵人會緩速 {1} 秒。","Each Heal that heals you grants +{1} max HP for {2} s.":"每次治癒術恢復自身生命時，最大 HP +{1}，持續 {2} 秒。","You start the run with Heal. At full health, Heal lands on the biggest group of enemies in range instead of on you, and it gains +target upgrades: each one is an extra pulse on another group. Each Heal leaves an Aqua Benedicta puddle where it lands, just like yours (with its talents and its upgrades from the run), even without it.":"開場時取得治癒術。自身滿血時，治癒術會落在射程內最大的敵群上。每次增加目標數的升級，都會對另一群敵人多發動一次脈衝。每次治癒術也會在落點留下天使之淚的水域，套用相同的天賦與場內升級，即使還沒學會天使之淚也有效。","Holy Light has a {1}% chance to stun for {2} s.":"神聖之光有 {1}% 機率使目標暈眩 {2} 秒。","Decrease AGI slows {1} s longer.":"緩速術（降低 AGI）的緩速時間延長 {1} 秒。","Holy Light deals {1}% more damage to enemies marked by Signum Crucis.":"神聖之光對被天使之光標記的敵人造成的傷害提高 {1}%。","Enemies hit by Signum Crucis also take {1}% more damage from everything for {2} s.":"被天使之光命中的敵人承受所有來源的傷害提高 {1}%，持續 {2} 秒。","All your holy ground (Signum Crucis, Aqua Benedicta and Fountain of Life puddles) lasts {1}% longer.":"所有神聖地面效果的持續時間延長 {1}%，包括天使之光、天使之淚與生命之泉留下的水域。","Holy Light and Ruwach deal {1}% more damage to slowed enemies.":"神聖之光與光獵對緩速中的敵人造成的傷害提高 {1}%。","You start the run with Signum Crucis. While Signum Crucis's ground lasts, every {1} s an instant Holy Light falls on the strongest enemy inside the circle (even without Holy Light).":"開場時取得天使之光。天使之光的地面效果持續期間，每 {1} 秒會對圈內最強的敵人瞬發神聖之光，即使尚未學會該技能也有效。","Holy Smite blesses {1} more basic attack.":"神聖重擊可額外祝福 {1} 次普通攻擊。","Holy Smite blesses {1} more basic attacks.":"神聖重擊可額外祝福 {1} 次普通攻擊。","Ruwach has {1}% less cooldown and its orbs come back sooner after bursting.":"光獵的冷卻時間縮短 {1}%，光球爆炸後也會更快重新出現。","Holy Smite stuns {1} s longer.":"神聖重擊的暈眩時間延長 {1} 秒。","Your melee basic attacks strike in a cone: every enemy in front of you within reach takes the full hit.":"近戰普攻會呈扇形打擊，前方攻擊距離內的所有敵人都會受到完整傷害。","Your basic attacks have a {1}% chance to cast Blessing on you (even if you have not learned it).":"普通攻擊有 {1}% 機率對自己施放天使之賜福，即使尚未學會也有效。","You start the run with Holy Smite. Each blessed basic attack also releases a Ruwach orb that bursts on the target (even without Ruwach).":"開場時取得神聖重擊。每次受祝福的普通攻擊也會放出一顆光獵光球，在目標身上爆炸，即使尚未學會光獵也有效。","+{1} max HP, -{2}% damage taken.":"最大 HP +{1}，承受傷害 -{2}%。","+{1}% speed, +{2} Haste.":"移動速度 +{1}%，冷卻加速 +{2}。","+{1}% movement speed, +{2} Haste.":"移動速度 +{1}%，冷卻加速 +{2}。","+{1}% damage to bosses and undead.":"對首領與不死系的傷害 +{1}%。","+{1} ray":"光束 +{1} 道","+{1} rays":"光束 +{1} 道","Heal: A pulse of light: heals you and damages enemies around you (x2 vs undead). Healing beyond full HP is stored as Grace: your next Heal releases it as extra damage (up to +{1}%).":"治癒術：釋放光脈衝治療自己，並傷害周圍敵人（對不死系 x2）。超出最大 HP 的治療量會儲存為恩典，下次施放時轉為額外傷害（最高 +{1}%）。","Aqua Benedicta: You pour holy water on the nearest group of enemies: the puddle lasts {1} s, damages enemies standing in it every second and heals you while you stay inside.":"天使之淚：向最近的敵群灑出聖水，留下持續 {1} 秒的水域。水域每秒傷害其中的敵人，也會治療站在水域內的你。","Blessing: You bless yourself for {1} s: more damage and faster casting.":"天使之賜福：祝福自己 {1} 秒，提高傷害與詠唱速度。","Decrease AGI: A wave that slows enemies around you and deals a little holy damage. Holy Light and Ruwach deal +{1}% damage to slowed enemies.":"緩速術（降低 AGI）：釋放波動緩速周圍敵人，並造成少量聖屬性傷害。神聖之光與光獵對緩速敵人的傷害 +{1}%。","Holy Light: A column of holy light on the bosses in sight or, if there are none, on the biggest group of enemies: a very strong hit that also reaches those around it (x2 vs undead).":"神聖之光：對視野內的首領降下聖光柱。沒有首領時，會攻擊最大的敵群。造成大量傷害，並波及周圍敵人（對不死系 x2）。","Holy Smite: A blessed mace blow to the nearest enemy: a brutal physical hit that stuns it briefly. It blesses your weapon for each enemy it hits: your next basic attacks deal +{1}% damage and release a holy wave that hits those around. Requires a mace, knuckles or a book.":"神聖重擊：重擊最近的敵人，造成物理傷害並使其短暫暈眩。每命中一名敵人就會祝福武器，接下來的普攻傷害 +{1}%，並釋放可波及周圍敵人的聖光波。須裝備鈍器、拳套或書本。","Ruwach: Orbs of light that spin around you: when they touch an enemy they burst, damaging everyone around, and come back shortly after (x2 vs undead). Scales with your ATK or your MATK, whichever is higher.":"光獵：光球環繞自身，接觸敵人時會爆炸並傷害周圍敵人，稍後重新出現（對不死系 x2）。傷害取 ATK 與 MATK 中較高者計算。","Signum Crucis: You consecrate the ground around you with a holy circle for {1} s: every second it damages the enemies inside and marks them. Marked enemies take more damage from all your holy skills (x3 vs undead).":"天使之光：在周圍設下持續 {1} 秒的聖光圓陣，每秒傷害並標記圈內敵人。被標記的敵人會受到你的所有聖屬性技能更多傷害（對不死系 x3）。","Heal's Grace deals {1}% more damage.":"治癒術的恩典傷害提高 {1}%。","Toxicology":"毒理學","Enchant Deadly Poison":"致命塗毒","Combined Venoms":"混合毒素","Concentrated Poison":"濃縮毒素","Quick Stabs":"迅捷刺擊","Spread of Daggers":"散射匕首","Toxic Reaction":"毒性反應","Venom Splasher":"毒性感染","Toxic Splash":"毒液飛濺","Flasks at Hand":"備用毒瓶","Slow Toxin":"緩效毒素","Flask Barrage":"毒瓶連投","Toxic Blade":"毒刃","Potent Poisons":"猛毒","Toxic Fumes":"毒霧","Double Attack":"二刀連擊","Dagger Mastery":"短劍精通","Blade Mastery":"刀刃精通","Quick Hands":"快手","Honed Blades":"磨利飛刀","Blindness":"致盲","Wide Fan":"廣角飛刀","Stone Throw":"投石強化","Sand at Hand":"隨手揚沙","Strip Armor":"卸除鎧甲","Thief's Eye":"盜賊之眼","Accurate Stone":"精準投石","Long-Range Sand":"遠距揚沙","Treacherous Sweep":"詭襲橫掃","Hail of Stones":"飛石如雨","Reflexes":"敏捷反應","True Edge":"銳利刀鋒","Gangster Paradise":"流氓天堂","Adrenaline Rush":"速度激發","Improve Dodge":"殘影","Quick Hiding":"快速隱匿","Breather":"喘息","Long Hiding":"持久隱匿","Out of the Shadows":"破影而出","Back Step":"後退迴避","Reject Sword":"反射刀刃","Fleeting Step":"瞬步","Tanned Hide":"強韌外皮","Preserve":"抄襲保留","Opportunist":"伺機而動","Lingering Shadow":"持續暗影","More Caltrops":"追加鐵蒺藜","Instinct":"本能","Rusty Caltrops":"鏽蝕鐵蒺藜","Ambush":"伏擊","Dimension Door":"次元之門","Wandering Shadow":"游移暗影","Only with dagger or katar":"僅限裝備短劍或拳刃","Throw Stone deals +{1}% damage and the stone bursts into shards: nearby enemies take {2}% of the hit.":"投擲石頭的傷害 +{1}%，石頭會碎裂並對附近敵人造成此次命中傷害的 {2}%。","Throw Stone throws {1} more stones.":"投擲石頭會多投出 {1} 顆石頭。","Sand Attack blinds {1} s longer.":"砂之攻擊的致盲時間延長 {1} 秒。","The extra damage after Hiding lasts +{1}% longer.":"解除隱匿後的傷害加成持續時間延長 {1}%。","Your poisons last {1}% less and deal the same total damage in that time.":"你的毒素持續時間縮短 {1}%，總傷害維持不變。","+{1}% Flee.":"迴避率 +{1}%。","+{1}% damage of all your poisons":"所有毒素傷害 +{1}%","All your poisons last {1} s longer":"所有毒素的持續時間延長 {1} 秒","Poisons from different skills stack on the same enemy. Without this talent, only the strongest one deals damage.":"不同技能的毒素可以在同一名敵人身上疊加。未點此天賦時，只有傷害最高的毒素會生效。","Envenom's poison deals +{1}% damage.":"施毒造成的毒素傷害 +{1}%。","Poisoned enemies move {1}% slower":"中毒敵人的移動速度降低 {1}%","Poisoned enemies take {1}% more damage from everything":"中毒敵人受到的所有傷害提高 {1}%","When you hit a poisoned enemy with physical damage, its poisons jump to another enemy within 2 m, with their full duration.":"對中毒敵人造成物理傷害時，毒素會傳給 2 公尺內的另一名敵人，並從完整持續時間重新計算。","Poison Bomb's poison lasts {1} s longer.":"毒霧炸彈的中毒時間延長 {1} 秒。","Poison Bomb poisons for +{1} damage per second.":"毒霧炸彈每秒額外造成 {1} 點毒素傷害。","Envenom poisons for +{1} damage per second.":"施毒每秒額外造成 {1} 點毒素傷害。","Envenom's poison lasts {1} s longer.":"施毒的中毒時間延長 {1} 秒。","Envenom stabs one more enemy and deals +{1}% damage.":"施毒會多刺擊一名敵人，傷害 +{1}%。","Your basic attacks make the enemy take +{1}% damage for {2} s.":"普通攻擊使敵人受到的傷害 +{1}%，持續 {2} 秒。","+{1}% damage on basic attacks.":"普通攻擊傷害 +{1}%。","+{1}% damage on basic attacks. With a dagger or katar, your basic attack scales {2}% better with ATK.":"普通攻擊傷害 +{1}%。裝備短劍或拳刃時，普通攻擊從 ATK 獲得的傷害加成提高 {2}%。","With a dagger or katar, your basic attack scales {1}% better with ATK.":"裝備短劍或拳刃時，普通攻擊從 ATK 獲得的傷害加成提高 {1}%。","When you cast Fan of Knives, Throw Stone or Sand Attack, those three skills gain +{1} Haste and +{2}% damage for {3} s.":"施放飛刀扇擊、投擲石頭或砂之攻擊後，這三項技能的冷卻加速 +{1}、傷害 +{2}%，持續 {3} 秒。","Shadowstep's Flee and speed last +{1}% longer.":"暗影步的迴避與移動速度加成持續時間延長 {1}%。","Caltrops lasts +{1}% longer.":"鐵蒺藜的持續時間延長 {1}%。","When Hiding ends you throw a Fan of Knives for {1}% of its damage, even if you don't have the skill.":"解除隱匿時會施放飛刀扇擊，造成其原本傷害的 {1}%，即使未習得該技能也會觸發。","While Shadowstep's buff lasts: +{1}% damage and {2} m more pickup radius. For {3} s after using it, {4}% lifesteal.":"暗影步的增益期間，傷害 +{1}%，拾取半徑增加 {2} 公尺。施放後的 {3} 秒內獲得 {4}% 生命偷取。","Your critical hits splash: enemies within {1} m take {2}% of the hit.":"暴擊會造成濺射，使 {1} 公尺內的敵人受到該次命中傷害的 {2}%。","Shadowstep jumps to {1} more enemies (if there are none, it repeats on the same one). Each jump fires a basic attack with all its bonuses: {2}%, {3}% and {4}% of its damage. After the last jump, your basic attacks keep dealing {5}% for {6} s.":"暗影步會額外跳向 {1} 名敵人。若沒有其他敵人，就重複跳向同一名敵人。每次跳躍都會發動保留所有加成的普通攻擊，依序造成原傷害的 {2}%、{3}% 和 {4}%。最後一跳之後，普通攻擊會維持原傷害的 {5}%，持續 {6} 秒。","Envenom: Quick stab that poisons (damage over time).":"施毒：快速刺擊使敵人中毒，持續受到傷害。","Caltrops: You scatter a line of caltrops between you and the enemies: those who step on it take damage and slow down.":"鐵蒺藜：在你與敵人之間撒下一列鐵蒺藜，踩到的敵人會受到傷害並緩速。","Hiding: Every so often you hide for {1} s: enemies can't touch you and you move faster. When you come out you deal {2}% more damage for {3} s.":"隱匿：每隔一段時間隱匿 {1} 秒。期間敵人無法碰觸你，且你的移動速度提升。解除隱匿後，傷害提高 {2}%，持續 {3} 秒。","Poison Bomb: You throw a poison flask at a group of enemies: it bursts, damaging all of them and badly poisoning them for {1} s.":"毒霧炸彈：朝一群敵人投擲毒瓶。毒瓶爆裂時會傷害範圍內所有敵人，並使其嚴重中毒 {1} 秒。","Sand Attack: You throw a fan of sand: it damages every enemy in front of you and blinds them for {1} s (blinded enemies wander without attacking).":"砂之攻擊：向前方扇形範圍揚沙，傷害所有命中的敵人並使其致盲 {1} 秒。致盲的敵人會四處遊走，停止攻擊。","Throw Stone: Throws a stone at the nearest enemy: a solid hit that stuns it.":"投擲石頭：朝最近的敵人扔出石頭，造成傷害並使其暈眩。","+{1} caltrop on Caltrops.":"鐵蒺藜額外撒出 {1} 枚。","+{1} caltrops on Caltrops.":"鐵蒺藜額外撒出 {1} 枚。","{1} talent points":"{1} 點天賦點數","+{1} ATK · ★ +{2}% projectile speed":"ATK +{1} · ★ 投射物速度 +{2}%","{1}% chance that opening a chest is free.":"開啟寶箱時有 {1}% 機率免付費用。","Chests cost {1}% less.":"開啟寶箱的費用降低 {1}%。","+{1}% pickup radius.":"拾取範圍 +{1}%。","+{1}% damage, +{2}% area.":"傷害 +{1}%，範圍 +{2}%。","Cart Revolution: +{1}% damage, +{2}% area.":"手推車攻擊的傷害 +{1}%，範圍 +{2}%。","Only with two-handed axe":"僅限裝備雙手斧","Not active right now: you are using a one-handed axe.":"目前裝備的是單手斧，效果尚未生效。","+{1}% melee reach. Your melee basic attacks strike in a cone: every enemy in front of you within reach takes the full hit.":"近戰攻擊距離 +{1}%。近戰普通攻擊會命中前方扇形範圍內的所有敵人，每名敵人都會受到完整傷害。","Cart":"手推車","Run Down":"衝鋒碾壓","New Wheels":"新車輪","Frequent Shout":"頻繁吶喊","Lightened Load":"輕量載重","Full Load":"滿載","Dense Rain":"密集金幣雨","Quick Strike":"迅捷打擊","Impact":"衝擊","Heavy Cart":"重型手推車","Over Thrust":"武器加強","Weapon Research":"武器研究","Heavy Zeny":"重金一擊","Mighty Shout":"強力吶喊","Armor Breaker":"破甲","Haggling":"討價還價","Restock":"補貨","Keen Eye":"銳眼","Small Change":"零錢","Lasting Mark":"持久標記","Lure":"誘敵","Efficient Load":"高效載重","Clearance Sale":"清倉特賣","Deep Purse":"大錢袋","Investment":"投資","Bargain":"撿便宜","Master Merchant":"商業大師","Reinforced Cart":"強化手推車","Greased Wheels":"潤滑車輪","Long-Reach Cart":"長距手推車","Brute Force":"蠻力","Double Spin":"雙重旋轉","True Strike":"精準打擊","Axe Mastery":"斧頭使用熟練度","Momentum":"動能","Cart Termination":"手推車終結技","Strength":"力量","Aim":"瞄準","Hilt Binding":"握柄訓練","Hammer Fall":"大地之擊","Critical Strike":"致命一擊","Meltdown":"野蠻凶砍","Maximize Power":"武器值最大化","Cart Rush has a {1}% chance to stun for {2} s and goes +{3}% farther.":"手推車突進有 {1}% 機率使敵人暈眩 {2} 秒，突進距離 +{3}%。","+{1} armor, +{2}% damage.":"護甲 +{1}，傷害 +{2}%。","+{1}% meat healing.":"肉的回復量 +{1}%。","Crazy Uproar gives {1} more charge.":"大聲吶喊的可用次數增加 {1} 次。","Crazy Uproar gives {1} more charges.":"大聲吶喊的可用次數增加 {1} 次。","Enlarge Weight Limit lasts +{1}% longer.":"負重量上升的持續時間延長 {1}%。","Mammonite deals +{1}% more to enemies marked by Zeny Rain.":"金錢攻擊對被金幣雨標記的敵人傷害 +{1}%。","Mammonite has a {1}% chance to stun.":"金錢攻擊有 {1}% 機率使敵人暈眩。","Zeny Rain's mark lasts {1} s longer.":"金幣雨的標記持續時間延長 {1} 秒。","Vending lasts +{1}% longer.":"露天商店的持續時間延長 {1}%。","Enemies marked by Zeny Rain also take more damage from Cart Revolution, like from Mammonite.":"被金幣雨標記的敵人受到的手推車攻擊傷害也會提高，效果與金錢攻擊相同。","Vending's burst stuns for 1.2 s and marks everyone it hits for Mammonite, like Zeny Rain.":"露天商店爆炸會使敵人暈眩 1.2 秒，並像金幣雨一樣標記所有命中的敵人，使其受到的金錢攻擊傷害提高。","Mammonite spends 5 zeny when used (if you have them) and then deals +35% damage and 50% of its damage to enemies within 3 m of its target (grows with area). In the Endless Tower, where there is no zeny, it always does so without spending anything.":"使用金錢攻擊時，若有足夠的 Zeny，會消耗 5 Zeny，使傷害 +35%，並對目標周圍 3 公尺內的敵人造成原傷害的 50%（半徑隨範圍加成提高）。在無盡之塔中，這個效果每次都會發動，且無須消耗 Zeny。","Mammonite: Very powerful zeny strike on the nearest enemy.":"金錢攻擊：用 Zeny 對最近的敵人發動強力攻擊。","Cart Revolution: You smash your cart into an enemy: it hits everyone around it and sends them flying.":"手推車攻擊：用手推車猛擊敵人，傷害並擊飛目標周圍的所有敵人。","Cart Rush: You charge with your cart where you are heading: you run over whoever you catch and shove them aside to clear the way.":"手推車突進：推著手推車朝面向的方向突進，撞擊沿途的敵人並將牠們推開。","Crazy Uproar: War cry: your next {1} skills reach {2} more enemy.":"大聲吶喊：發出戰吼，讓接下來 {1} 次技能多命中 {2} 名敵人。","Crazy Uproar: War cry: your next {1} skills reach {2} more enemies.":"大聲吶喊：發出戰吼，讓接下來 {1} 次技能多命中 {2} 名敵人。","Enlarge Weight Limit: Below {1}% HP you plant your cart: you push back everyone around you and take -{2}% damage for {3} s, but move {4}% slower.":"負重量上升：HP 低於 {1}% 時固定手推車並推開周圍所有敵人，接下來 {3} 秒受到的傷害降低 {2}%，移動速度降低 {4}%。","Vending: You plant a vending machine: nearby enemies go for it for {1} s, then it bursts in a shower of zeny that damages everyone around it.":"露天商店：放置一台販賣機，吸引附近敵人 {1} 秒，之後炸出大量金幣，傷害周圍所有敵人。","Zeny Rain: You make zeny rain over an area: {1} pulses that stun for {2} s and, for {3} s, make Mammonite hit those caught for +{4}%. Bosses aren't stunned: for that time they take {5}% more damage from everything.":"金幣雨：讓指定區域落下金幣，共造成 {1} 波效果，使敵人暈眩 {2} 秒，並讓命中的敵人在 {3} 秒內受到的金錢攻擊傷害 +{4}%。首領免疫暈眩，但這段期間受到的所有傷害提高 {5}%。","Reroll":"重抽","Reroll card: same skill, a different upgrade.":"重抽卡片：保留相同技能，改抽另一種強化。","Reroll card: same slot, a different roll.":"重抽卡片：保留相同欄位，重新抽取結果。","Not active right now: you are using a mace.":"目前裝備的是鈍器，效果尚未生效。","Nothing equipped in this slot.":"此欄位尚未裝備物品。","Requires {1} points in Cart.":"需要在「手推車」投入 {1} 點。","Requires Full Load at max rank ({1}/{2}).":"需要將「滿載」升至滿級（{1}/{2}）。","+{1} max HP, +{2}% damage.":"最大 HP +{1}，傷害 +{2}%。","Angel's Reincarnation of Luck":"幸運的天使之降臨","Armor Elixir +{1}":"護甲靈藥 +{1}","Requires New Wheels at max rank ({1}/{2}).":"需要將「新車輪」升至滿級（{1}/{2}）。","Stun on hit":"命中時造成暈眩","{1} free card sockets":"{1} 個空的卡片插槽","✓ Cleared":"✓ 已通關","Armor Potion +{1}":"護甲藥水 +{1}","DEF {1} · ★ -{2}% damage taken · +{3} AGI":"DEF {1} · ★ 受到的傷害 -{2}% · AGI +{3}","Regeneration Potion +{1}":"回復藥水 +{1}","Requires Frequent Shout at max rank ({1}/{2}).":"需要將「頻繁吶喊」升至滿級（{1}/{2}）。","★ Improved Bash":"★ 強化狂擊","Acolyte, Merchant, Swordsman":"服事、商人、劍士","DEF {1} · ★ +{2} Haste · +{3} AGI":"DEF {1} · ★ 冷卻加速 +{2} · AGI +{3}","★ Angelic Protection of Dexterity":"★ 靈巧的天使之守護","✓ Gearscore {1} (you have {2})":"✓ 裝備評分需求 {1}（目前 {2}）","Blessing of Double Cast +{1}":"雙重詠唱祝福 +{1}","Deity of the Executioner +{1}":"處刑者神格 +{1}","{1}. Attack: Mace":"{1}. 攻擊：鈍器","✓ Defeat Mastering":"✓ 擊敗波利之王","Rod of Vitality":"體質的手杖","{1} talent point":"{1} 點天賦點數","Angelic Protection of Agility":"敏捷的天使之守護","Angelic Protection of Vitality":"體質的天使之守護","Damage: talents +{1}% · Melee ATK ×{2} · overall ×{3}":"傷害：天賦 +{1}% · 近戰 ATK ×{2} · 整體 ×{3}","DEF {1} · ★ +{2} max HP":"DEF {1} · ★ 最大 HP +{2}","DEF {1} · ★ +{2}% movement speed":"DEF {1} · ★ 移動速度 +{2}%","upgraded! You now have {1}/{2}.":"已強化！目前為 {1}/{2}。","★ +{1} cast speed":"★ 詠唱速度 +{1}","{1}. Demoralizing Shout":"{1}. 挫志怒吼","+{1} INT · +{2}% damage":"INT +{1} · 傷害 +{2}%","+{1} pulses":"+{1} 波","+{1}% of max HP every {2} s":"每 {2} 秒回復最大 HP 的 {1}%","+{1}% speed · +{2}% Flee":"速度 +{1}% · 迴避率 +{2}%","Angel's Reincarnation of Luck (Uncommon)":"幸運的天使之降臨（罕見）","Angelic Protection of Agility (Rare)":"敏捷的天使之守護（稀有）","Angelic Protection of Vitality (Uncommon)":"體質的天使之守護（罕見）","Damage Elixir +{1}":"傷害靈藥 +{1}","DEF {1} · ★ -{2}% damage taken · +{3} DEX":"DEF {1} · ★ 受到的傷害 -{2}% · DEX +{3}","DEF {1} · ★ -{2}% damage taken · +{3} STR":"DEF {1} · ★ 受到的傷害 -{2}% · STR +{3}","DEF {1} · ★ +{2} max HP · +{3} LUK":"DEF {1} · ★ 最大 HP +{2} · LUK +{3}","Deity of the Wind":"風之神格","Deity of Thought":"思考神格","Entering Prontera Culverts…":"正在進入普隆德拉地下水道……","Equipped in Footgear":"已鑲嵌於鞋子","Equipped in Shield":"已鑲嵌於盾牌","New stage!":"新關卡！","Rod (Common)":"手杖（普通）","Rod of Vitality (Epic)":"體質的手杖（史詩）","Slots into: Weapon":"適用欄位：武器","Speed Potion +{1}":"速度藥水 +{1}","The Angry Tarous have appeared!":"憤怒的白鼠出現了！","Victory! You have {1} s to pick up the loot":"勝利！還有 {1} 秒可拾取戰利品","Blood Savage — Unlocked by clearing floor {1} of the Endless Tower":"嗜血蠻兵：通過無限塔第 {1} 層後解鎖","Critical Elixir +{1}":"暴擊靈藥 +{1}","+{1}% zeny and +{2}% discovery":"Zeny +{1}%，發現率 +{2}%","DEF {1} · ★ -{2}% damage taken":"DEF {1} · ★ 受到的傷害 -{2}%","Deity of Might +{1}":"力量神格 +{1}","A fan of arrows at the group: hits everyone in front of you and knocks them back. Fires {1} volleys.":"朝敵群射出扇形箭雨，命中前方所有敵人並將其擊退，共發射 {1} 波。","Blessing of Plenty +{1}":"豐收祝福 +{1}",": +{1}% damage on Bash.":"：狂擊傷害 +{1}%。","A very fast salvo of arrows that curve into the nearest enemy, alternating sides.":"從左右兩側交替射出高速箭矢，沿弧線飛向最近的敵人。","Stun chance":"暈眩機率","For {1} s: +{2}% AGI and DEX.":"AGI 與 DEX +{2}%，持續 {1} 秒。","Buff AGI and DEX":"AGI 與 DEX 加成","Buff AGI and DEX: {1}%":"AGI 與 DEX 加成：{1}%","Buff damage reduction":"減傷加成","Huge arrow that pierces everyone and pushes them far away.":"發射巨箭，貫穿沿途所有敵人並將其擊退一大段距離。","Projectile · Cast {1} s":"投射物 · 詠唱 {1} 秒",": Unlocked by clearing floor {1} of the Endless Tower.":"：通過無限塔第 {1} 層後解鎖。","{1}. Arrow Repel":"{1}. 衝鋒箭","{1}. Attack: Bow":"{1}. 攻擊：弓","{1}. Burn (Combustion)":"{1}. 灼傷（燃燒）","{1}. Double Strafe":"{1}. 二連矢","{1}. Fire Arrow":"{1}. 火焰箭","+{1} ATK · +{2} MATK · ★ +{3} cast speed":"ATK +{1} · MATK +{2} · ★ 詠唱速度 +{3}","Axe (Common)":"斧（普通）","Burn (Combustion)":"灼傷（燃燒）","Dawn · Storm":"黎明 · 暴風雨","Deity of Life":"生命神格","Dusk · Storm":"黃昏 · 暴風雨","Fancy Flower (Common)":"花朵頭飾（普通）","Morning · Heavy rain":"早晨 · 大雨","Night · Storm":"夜晚 · 暴風雨","Rod of Strength":"力量的手杖","Rod of Strength (Uncommon)":"力量的手杖（罕見）","Banish: this skill will stop showing up for upgrades this run.":"放逐：本場接下來的強化選項中，將不再出現這項技能。","Banish: it won't show up again in chests this run.":"放逐：本場接下來開啟的寶箱中，將不再出現這個項目。","Banish: this skill won't show up again this run.":"放逐：本場將不再出現這項技能。","Damage over Time Elixir +{1}":"持續傷害靈藥 +{1}","Deity of the Bulwark +{1}":"壁壘神格 +{1}","Arcane Mark: monsters pulled by the pulse are marked for {1} s and take {2}% more damage from everything":"秘法標記：被脈衝拉近的魔物會被標記 {1} 秒，期間受到的所有傷害提高 {2}%","Arcane Shot Deity +{1}":"秘法射擊神格 +{1}","Vampiric Blessing +{1}":"吸血祝福 +{1}","{1}. Arrow Shower":"{1}. 箭雨","Asura of Dexterity":"靈巧的匕首","Fancy Flower of Dexterity":"靈巧的花朵頭飾","Leave at home":"取消攜帶","Sweet Gent of Dexterity":"靈巧的紳士帽","{1}. Arcane Shot":"{1}. 秘法射擊","{1}. Retreat":"{1}. 後撤射擊","Afternoon · Storm":"午後 · 暴風雨","Arcane Shot Deity":"秘法射擊神格","Asura of Dexterity (Uncommon)":"靈巧的匕首（罕見）","Dawn · Rain":"黎明 · 有雨","Fancy Flower of Dexterity (Uncommon)":"靈巧的花朵頭飾（罕見）","It hatches when the run ends. Take it along from the character’s Pets tab.":"本場結束時會孵化。你可以在角色的「寵物」頁籤選擇攜帶。","Pet egg · Rocker":"寵物蛋 · 搖滾蝗蟲","Scales with ATK and INT":"效果隨 ATK 與 INT 提升","Sweet Gent of Dexterity (Uncommon)":"靈巧的紳士帽（罕見）","Take along":"攜帶","Tidal Shoes of Dexterity (Rare)":"靈巧的防水長靴（稀有）","When hatched (Neutral)":"孵化時（普通）","At Loyal":"達到忠誠時","Intimacy":"親密度","Loyal":"忠誠","Cordial":"親密","It gains intimacy as you play runs with it.":"攜帶牠參戰可提高親密度。","Evolves from Poring: with Poring Loyal and Mastering defeated {1} times.":"由波利進化。波利須達到忠誠，並擊敗波利之王 {1} 次。","You need Poring. Evolve it with the Pet Keeper in the square.":"你需要先取得波利。可找廣場上的寵物管理員進化。","Poring must be Loyal. Evolve it with the Pet Keeper in the square.":"波利須達到忠誠。可找廣場上的寵物管理員進化。","Defeat Mastering {1} times ({2}/{3}). Evolve it with the Pet Keeper in the square.":"擊敗波利之王 {1} 次（{2}/{3}）。可找廣場上的寵物管理員進化。","Evolves from Mastering: with Mastering Loyal and Angeling defeated {1} times.":"由波利之王進化。波利之王須達到忠誠，並擊敗天使波利 {1} 次。","You need Mastering. Evolve it with the Pet Keeper in the square.":"你需要先取得波利之王。可找廣場上的寵物管理員進化。","Mastering must be Loyal. Evolve it with the Pet Keeper in the square.":"波利之王須達到忠誠。可找廣場上的寵物管理員進化。","Defeat Angeling {1} times ({2}/{3}). Evolve it with the Pet Keeper in the square.":"擊敗天使波利 {1} 次（{2}/{3}）。可找廣場上的寵物管理員進化。","Evolves from Bongun: with Bongun Loyal and Hyegun defeated {1} times.":"由妖道進化。妖道須達到忠誠，並擊敗妖君 {1} 次。","You need Bongun. Evolve it with the Pet Keeper in the square.":"你需要先取得妖道。可找廣場上的寵物管理員進化。","Bongun must be Loyal. Evolve it with the Pet Keeper in the square.":"妖道須達到忠誠。可找廣場上的寵物管理員進化。","Defeat Hyegun {1} times ({2}/{3}). Evolve it with the Pet Keeper in the square.":"擊敗妖君 {1} 次（{2}/{3}）。可找廣場上的寵物管理員進化。","Evolves from Nine Tail: with Nine Tail Loyal and Cat O' Nine Tails defeated {1} times.":"由九尾狐進化。九尾狐須達到忠誠，並擊敗狂暴月夜貓 {1} 次。","You need Nine Tail. Evolve it with the Pet Keeper in the square.":"你需要先取得九尾狐。可找廣場上的寵物管理員進化。","Nine Tail must be Loyal. Evolve it with the Pet Keeper in the square.":"九尾狐須達到忠誠。可找廣場上的寵物管理員進化。","Defeat Cat O' Nine Tails {1} times ({2}/{3}). Evolve it with the Pet Keeper in the square.":"擊敗狂暴月夜貓 {1} 次（{2}/{3}）。可找廣場上的寵物管理員進化。","Evolve it with the Pet Keeper in the square.":"可找廣場上的寵物管理員進化。","+{1}% meat healing":"肉的回復量 +{1}%","+{1} HP/s":"每秒回復 {1} HP","Cordial at {1}":"親密度達 {1} 時升至親密","At Cordial, the Pet Keeper in the square will sell you its accessory (bonus ×{1}).":"達到親密時，可向廣場上的寵物管理員購買寵物飾品（加成 ×{1}）。","Sold by the Pet Keeper in the square (bonus ×{1}).":"由廣場上的寵物管理員販售（加成 ×{1}）。","Channel {1}":"分流 {1}","Adventurer's Suit of Vitality":"體質的冒險衣","Adventurer's Suit of Dexterity":"靈巧的冒險衣","Deity of Life +{1}":"生命神格 +{1}","Big Ribbon of Strength":"力量的紅蝶髮帶","Silk Robe of Intelligence":"智力的絲質外袍","Angel's Reincarnation of Intelligence":"智力的天使之降臨","Channels":"分流列表","You are here":"目前所在分流","DEF {1} · ★ -{2}% damage taken · +{3} INT":"DEF {1} · ★ 受到的傷害 -{2}% · INT +{3}","DEF {1} · ★ +{2}% movement speed · +{3} DEX":"DEF {1} · ★ 移動速度 +{2}% · DEX +{3}","DEF {1} · ★ +{2}% movement speed · +{3} VIT":"DEF {1} · ★ 移動速度 +{2}% · VIT +{3}",": +{1}% pierce chance on basic attacks.":"：普通攻擊的貫穿機率 +{1}%。","★ +{1} armor":"★ 護甲 +{1}","Adventurer's Suit of Dexterity (Rare)":"靈巧的冒險衣（稀有）","Adventurer's Suit of Vitality (Epic)":"體質的冒險衣（史詩）","Angel's Reincarnation of Intelligence (Rare)":"智力的天使之降臨（稀有）","Big Ribbon of Strength (Epic)":"力量的紅蝶髮帶（史詩）","Channel {1} · {2} player":"分流 {1} · {2} 位玩家","Contagion: a monster that dies while burning bursts into flames for {1}% of its max HP and sets those around it on fire; if any of them die burning, it bursts again":"火焰蔓延：燃燒中的魔物死亡時會爆炸，造成相當於自身最大 HP {1}% 的傷害，並點燃周圍的魔物。被點燃的魔物若在燃燒中死亡，也會引發爆炸","Damage: talents +{1}% · Ranged ATK ×{2} · overall ×{3}":"傷害：天賦 +{1}% · 遠距離 ATK ×{2} · 整體 ×{3}","DEF {1} · ★ +{2} armor":"DEF {1} · ★ 護甲 +{2}","Fire Arrow Deity":"火焰箭神格","Guard (Common)":"鐵盾（普通）","No stat changes.":"能力值沒有變化。","Pet egg · Picky":"寵物蛋 · 小雞","Shoots an arrow at the nearest enemy.":"向最近的敵人射出一支箭。","Silk Robe (Common)":"絲質外袍（普通）","Silk Robe of Intelligence (Uncommon)":"智力的絲質外袍（罕見）","Safe up to +{1}":"安全精鍊至 +{1}","Deity +{1}":"神格 +{1}","Fire Arrow Deity +{1}":"火焰箭神格 +{1}","{1} at once":"同時 {1} 個","DEF {1} · ★ +{2} max HP · +{3} INT":"DEF {1} · ★ 最大 HP +{2} · INT +{3}","Projectile speed":"投射物速度","{1}. Fire Arrow · Contagion":"{1}. 火焰箭 · 火焰蔓延","Damage: upgrades +{1}% · talents +{2}% · Ranged ATK ×{3} · overall ×{4}":"傷害：強化 +{1}% · 天賦 +{2}% · 遠距離 ATK ×{3} · 整體 ×{4}","Fire Arrow · Contagion":"火焰箭 · 火焰蔓延","Choose in {1} s":"剩下 {1} 秒可選擇","Swaps all the cards for new ones.":"將所有卡片換成新卡片。","+{1} Bow of Vitality":"+{1} 體質的弓","Need":"需求","+{1} Angelic Protection of Dexterity":"+{1} 靈巧的天使之守護","+{1} Cute Ribbon of Agility":"+{1} 敏捷的粉紗髮圈","+{1} Tidal Shoes of Dexterity":"+{1} 靈巧的防水長靴","Angelic Protection of Strength":"力量的天使之守護","Pass":"放棄","Blessing of Damage +{1}":"傷害祝福 +{1}","Deity of War +{1}":"戰爭神格 +{1}","Angelic Protection of Intelligence":"智力的天使之守護","Jacket of Luck":"幸運的皮製外套","+{1} Poring Hat of Strength":"+{1} 力量的波利帽","Big Ribbon of Vitality":"體質的紅蝶髮帶","It's yours!":"你獲得了這件物品！","Bow of Vitality":"體質的弓","Big Ribbon of Luck":"幸運的紅蝶髮帶","+{1}: refine successful!":"精鍊至 +{1} 成功！","{1}% success. If it fails, the item breaks and is lost along with its cards.":"成功率 {1}%。失敗時，裝備會損毀，已鑲嵌的卡片也會一併消失。","+{1} random properties for whoever wins it":"獲得者將取得 {1} 項隨機屬性","Sweet Gent of Strength":"力量的紳士帽","Poring Hat of Strength":"力量的波利帽","Welding Mask of Intelligence":"智力的鋼鐵面具","Deity of the Wind +{1}":"風之神格 +{1}","Clip of Strength":"力量的髮夾","Sharp Shooting: the last arrow of each salvo flies straight, deals {1}% of an arrow's damage with {2}% extra critical chance, and pierces everything in line up to {3} m behind the target":"銳利射擊：每輪齊射的最後一箭會直線飛行，造成單支箭矢 {1}% 的傷害，暴擊率額外提高 {2}%，並貫穿路徑上的所有敵人，最遠可達目標後方 {3} 公尺","Double Strafe Deity +{1}":"二連矢神格 +{1}","Time to pick a card":"選擇一張卡片","✓ Defeat Golden Thief Bug":"✓ 擊敗黃金蟲","Element: Undead {1}":"屬性：不死 {1}","Race: Undead":"種族：不死","Element: Ghost {1}":"屬性：念 {1}","Race: Demon":"種族：惡魔","You bought {1}":"你已購買 {1}","★ +{1}% Flee":"★ 迴避 +{1}%","DEF {1} · ★ -{2}% damage taken · +{3} LUK":"DEF {1} · ★ 受到的傷害 -{2}% · +{3} LUK","Pet egg · Baby Desert Wolf":"寵物蛋 · 沙漠幼狼","+{1} ATK · ★ +{2} Haste":"+{1} ATK · ★ 冷卻加速 +{2}","Angel's Reincarnation of Strength":"力量的天使之降臨","The whole party is down":"全隊倒下了","+{1} ATK · ★ +{2}% projectile speed · +{3} VIT":"+{1} ATK · ★ 投射物速度 +{2}% · +{3} VIT","★ +{1}% melee reach":"★ 近戰攻擊距離 +{1}%","Burrowing Tarou is enraged!":"掘地白鼠狂暴了！","Cards for Footgear":"鞋子適用卡片","LUK Dish +{1}":"LUK 料理 +{1}","Pet egg · Poring":"寵物蛋 · 波利","{1} friend in the square":"廣場上有 {1} 位好友","{1}. Double Strafe · Sharp Shooting":"{1}. 二連矢 · 銳利射擊","+{1}% Retreat damage":"後撤射擊傷害 +{1}%","Acolyte, Mage":"服事、魔法師","Angel's Reincarnation of Strength (Rare)":"力量的天使之降臨（稀有）","Angelic Protection of Strength (Epic)":"力量的天使之守護（史詩）","Big Ribbon of Luck (Uncommon)":"幸運的紅蝶髮帶（罕見）","Big Ribbon of Vitality (Uncommon)":"體質的紅蝶髮帶（罕見）","Blessing of Casting +{1}":"詠唱祝福 +{1}","Clip of Strength (Uncommon)":"力量的髮夾（罕見）","Cute Ribbon of Intelligence":"智力的粉紗髮圈","DEF {1} · ★ +{2} max HP · +{3} STR":"DEF {1} · ★ 最大 HP +{2} · +{3} STR","Deity of Torment":"折磨神格","Double Strafe · Sharp Shooting":"二連矢 · 銳利射擊","Double Strafe Deity":"二連矢神格","Guard of Intelligence":"智力的鐵盾","Knife (Common)":"短劍（普通）","MVP Golden Thief Bug has appeared!":"MVP 黃金蟲出現了！","Pet egg · Drops":"寵物蛋 · 土波利","Poring Hat of Strength (Epic)":"力量的波利帽（史詩）","Sweet Gent of Strength (Rare)":"力量的紳士帽（稀有）","Not active right now: you are using a one-handed spear.":"目前裝備的是單手矛，效果尚未生效。","+{1} Javelin of Intelligence":"+{1} 智力的長戟","Javelin of Intelligence":"智力的長戟","+{1} Angelic Protection of Strength":"+{1} 力量的天使之守護","+{1} Fancy Flower of Strength":"+{1} 力量的花朵頭飾","+{1} Guard of Intelligence":"+{1} 智力的鐵盾","+{1} Angel's Reincarnation of Intelligence":"+{1} 智力的天使之降臨","+{1}% stun on hit":"命中時 +{1}% 暈眩機率","DEF {1} · ★ +{2} armor · +{3} INT":"DEF {1} · ★ 防禦 +{2} · +{3} INT","DEF {1} · ★ +{2} Haste · +{3} INT":"DEF {1} · ★ 冷卻加速 +{2} · +{3} INT","Javelin of Luck":"幸運的長戟","Javelin of Vitality":"體質的長戟","+{1} ATK · ★ +{2}% projectile speed · +{3} INT":"+{1} ATK · ★ 投射物速度 +{2}% · +{3} INT","Asura of Strength":"力量的匕首","Cute Ribbon of Dexterity":"靈巧的粉紗髮圈","Blessing of Reach +{1}":"距離祝福 +{1}","★ Empowered Magnum":"★ 強化怒爆","Cards: Mandragora Card, Hornet Card":"卡片：曼陀蘿魔花卡片、蜂兵卡片","DEF {1} · ★ +{2} Haste · +{3} DEX":"DEF {1} · ★ 冷卻加速 +{2} · +{3} DEX","Pet egg · Savage Babe":"寵物蛋 · 小野豬","Refine ore · you have {1}":"精鍊礦石 · 持有 {1} 個","To refine, talk to Hollgrehenn the blacksmith in the square.":"要精鍊裝備，請找廣場上的鐵匠忽克連。","Without a bow you can't attack!":"未裝備弓，無法攻擊！","{1}. Attack: Spear":"{1}. 普通攻擊：長矛","+{1} ATK · ★ +{2}% projectile speed · +{3} LUK":"+{1} ATK · ★ 投射物速度 +{2}% · +{3} LUK","Asura of Strength (Uncommon)":"力量的匕首（罕見）","Club of Dexterity (Rare)":"靈巧的木錘（稀有）","Cute Ribbon of Dexterity (Rare)":"靈巧的粉紗髮圈（稀有）","Cute Ribbon of Intelligence (Legendary)":"智力的粉紗髮圈（傳奇）","Damage at low HP":"低 HP 時的傷害","Equipped in Head (top)":"已裝備於頭上","Guard of Intelligence (Rare)":"智力的鐵盾（稀有）","Javelin of Intelligence (Uncommon)":"智力的長戟（罕見）","Javelin of Luck (Uncommon)":"幸運的長戟（罕見）","Javelin of Vitality (Uncommon)":"體質的長戟（罕見）","Select a material to see what it is for.":"選擇材料以查看用途。","Cute Ribbon of Vitality":"體質的粉紗髮圈","DEF {1} · ★ +{2} Haste · +{3} VIT":"DEF {1} · ★ 冷卻加速 +{2} · +{3} VIT","★ Shield Strike":"★ 盾牌打擊","Cute Ribbon of Vitality (Uncommon)":"體質的粉紗髮圈（罕見）","is now wearing its Rocker Glasses!":"已戴上蝗蟲眼鏡！","Reach Potion +{1}":"距離藥水 +{1}","Knife of Luck":"幸運的短劍","+{1} ATK · ★ +{2} Haste · +{3} LUK":"+{1} ATK · ★ 冷卻加速 +{2} · +{3} LUK","Cards: Marina Card, Hornet Card, Savage Bebe Card":"卡片：水母卡片、蜂兵卡片、小野豬卡片","Cards: Soldier Skeleton Card, Snake Card":"卡片：邪骸士兵卡片、青蛇卡片","Knife of Luck (Uncommon)":"幸運的短劍（罕見）","Leaves a holy trail along its path for {1} s: it deals {2}% of its damage per second to anyone standing on it. It is longer the farther the shield goes and wider the larger the shield is":"盾牌沿途留下持續 {1} 秒的神聖軌跡，每秒對站在上面的目標造成盾擊傷害的 {2}%。盾牌飛得越遠，軌跡越長。盾牌越大，軌跡越寬。","Prontera Patrol Badge of Agility":"敏捷的普隆德拉巡邏徽章","Shield Bash Deity":"盾擊神格","Targets bleed {1}% of the hit over {2} s":"目標在 {2} 秒內因出血受到本次命中傷害的 {1}%。","Splash: {1}% of the damage within {2} m":"濺射：對 {2} 公尺內的敵人造成 {1}% 的傷害。","When the dance ends, your weapon is charged with lightning for {1} s: basic attacks deal {2}% extra lightning damage that jumps to {3} more enemies, losing {4}% per jump":"劍舞結束後，武器附帶雷電 {1} 秒。普通攻擊額外造成 {2}% 雷電傷害，並跳向另外 {3} 名敵人，每次跳躍傷害降低 {4}%。","Champion's Chains: Provoke drags provoked enemies to you (except bosses); those that die while provoked heal you for {1}% of your max HP":"冠軍鎖鏈：將被挑釁的敵人拉到身邊，首領除外。敵人在挑釁期間死亡時，恢復你最大 HP 的 {1}%。","Morale theft: each demoralized enemy gives you +{1}% damage for {2} s (up to +{3}%)":"士氣掠奪：每使一名敵人士氣低落，你的傷害 +{1}%，持續 {2} 秒，最多 +{3}%。","Bastion: while Endure lasts, a dome absorbs damage worth {1}% of your max HP; when it breaks or ends it bursts and returns what it absorbed to nearby enemies":"堡壘：霸體期間，護罩可吸收相當於你最大 HP {1}% 的傷害。護罩破裂或到期時，會將吸收的傷害回敬給周圍敵人。","Root of Yggdrasil: plants a circle of life where you cast it; inside you heal twice as much and take {1}% less damage":"世界樹之根：在施放處生成生命之環。在環內受到的治療加倍，受到的傷害降低 {1}%。","Fire Ball: each bolt bursts into a fireball that deals {1}% of its damage to those around ({2} m, grows with area)":"火球術：每支火箭都會爆成火球，對周圍造成其傷害的 {1}%。半徑為 {2} 公尺，會隨作用範圍增加。","Built-up Frost: each bolt leaves a frost charge on the enemy; at {1} charges it freezes for {2} s":"積霜：每支冰箭都會對敵人疊加一層霜凍，累積 {1} 層時使其冰凍 {2} 秒。","Chain Lightning: each bolt jumps to {1} nearby enemies with {2}% of its damage":"連鎖閃電：每道雷擊會跳向附近 {1} 名敵人，造成原傷害的 {2}%。","Soul Drain: each monster you kill with Soul Strike gives you a charge; when you cast it again, +{1} target per charge (spends them all)":"吸魂術：每用聖靈召喚擊殺一隻魔物，就累積一層。下次施放時每層增加 {1} 個目標，並消耗全部層數。","Napalm Vulcan: the hit repeats {1} more times and curses: those hit take {2}% more damage for {3} s":"念力連擊：額外重複命中 {1} 次並施加詛咒。被命中的敵人在 {3} 秒內受到的傷害提高 {2}%。","Fire Pillar: when the wall dies out, each flame bursts into a pillar of fire that deals {1}% of its damage around it":"火柱攻擊：火焰之壁熄滅時，每道火焰都會炸成火柱，對周圍造成其傷害的 {1}%。","+{1} s of freeze":"冰凍持續時間 +{1} 秒","Frozen Burst: if its target dies frozen, it bursts and deals {1}% of its max HP to everyone around (with Deep Freeze, ×{2} to frozen ones)":"冰爆：目標在冰凍中死亡時會炸裂，對周圍敵人造成相當於其最大 HP {1}% 的傷害。搭配深度冰凍時，對冰凍中的目標傷害為 {2} 倍。","Sightrasher: when it ends, the flames shoot outward and explode on impact with {1}% of its damage":"火之獵殺：火狩結束時，火焰向外射出，命中時爆炸並造成原傷害的 {1}%。","Lord of Vermilion: the storm ends with a great discharge over the whole area that deals {1}% of its damage to everyone":"怒雷強擊：雷暴結束時，整個範圍會發生強烈放電，對範圍內所有敵人造成原傷害的 {1}%。","Gale: the last volley leaves a wind current in the cone for {1} s that slows, keeps pushing and deals {2}% of a volley's damage every {3} s to anything inside":"強風：最後一輪齊射在扇形區域留下持續 {1} 秒的氣流，使敵人減速並持續擊退，每 {3} 秒造成一輪齊射傷害的 {2}%。","Field of Arrows: when the rain ends, the arrows stay stuck in the ground for {1} s; anything crossing the area is slowed and takes {2}% of an impact's damage every {3} s":"箭矢之地：箭雨結束後，箭矢會留在地上 {1} 秒。穿越的敵人會減速，並每 {3} 秒受到單次命中傷害的 {2}%。","Wind Walk: on landing, your next {1} skills fire twice (guaranteed double cast) and you move {2}% faster for {3} s":"風之步：落地後，接下來 {1} 次技能必定雙重施放，並在 {3} 秒內提高 {2}% 移動速度。","Vortex: the shot no longer pushes: it drags nearby monsters along (except bosses) for {1} m and then bursts into a whirlwind that deals {2}% of its damage to everything around":"漩渦：射擊會拖曳沿途附近的魔物 {1} 公尺，首領除外。最後爆成旋風，對周圍造成其傷害的 {2}%。","True Sight: while Improve Concentration lasts, your shots get {1}% more pierce chance and your crits deal {2}% more damage":"狙殺瞄準：心神凝聚期間，射擊的貫穿機率提高 {1}%，暴擊傷害提高 {2}%。","Coluceo: the Heal pulse repeats {1} more times, once per second, with {2}% of its healing and {3}% of its damage":"燦爛聖光：治癒術的脈衝每秒重複一次，共額外重複 {1} 次，每次提供原治療量的 {2}%，並造成原傷害的 {3}%。","Judex: the column stays on the ground for {1} s and every {2} s hits everyone in its area for {3}% of the strike":"審判：光柱留在原地 {1} 秒，每 {2} 秒對範圍內的敵人造成原攻擊傷害的 {3}%。","Adoramus: each burst blinds those it hits for {1} s and heals you a little for each one":"謳歌：每次爆發使被命中的敵人失明 {1} 秒，並依命中數為你恢復少量 HP。","Silentium: while slowed, enemies deal {1}% less damage":"靜寂：被緩速的敵人造成的傷害降低 {1}%。","Oratio: the mark grants {1}% more, and an enemy that dies marked bursts into light: it deals {2} times the damage of a tick to those around it and marks them":"祈禱文：標記的效果提高 {1}%。被標記的敵人死亡時會炸出聖光，對周圍造成每跳傷害的 {2} 倍，並標記命中的敵人。","Epiclesis: when the puddle dries up, a tree of light sprouts for {1} s that heals you a little while you are near it and every second fires rays at {2} enemies for {3}% of a tick's damage":"聖靈降臨祈禱：水窪乾涸後長出一棵光之樹，持續 {1} 秒。靠近時會恢復少量 HP，樹也會每秒向 {2} 名敵人射出光束，造成每跳傷害的 {3}%。","Clementia: while Blessing lasts, you slowly regenerate health":"慈悲術：天使之賜福期間，逐漸恢復 HP。","Duple Light: {1} more blessed hits, and each one also calls down a holy light on the target for {2}% of the hit":"二道聖光：額外增加 {1} 次祝福攻擊，每次還會召來聖光，對目標造成該次命中傷害的 {2}%。","Virulent Toxin: each Envenom stab on an enemy that already has its poison makes it {1}% stronger, up to {2} times":"劇毒：以施毒刺擊已中該毒的敵人時，毒效提高 {1}%，最多疊加 {2} 次。","Sandstorm: the sand hangs in the air in front of you for {1} s and blinds anyone who crosses it":"沙塵暴：沙塵在你前方停留 {1} 秒，使穿過的敵人失明。","Ricochet: the stone bounces to {1} more nearby enemies for {2}% of its damage and stuns them too":"彈跳：石頭額外彈向附近 {1} 名敵人，造成原傷害的 {2}%，並使其暈眩。","+{1}% duration of the damage on exit":"解除隱匿後的傷害加成持續時間 +{1}%","Smoke Bomb: when you hide you release a cloud of smoke that blinds nearby enemies for {1} s and pushes them away":"煙霧彈：進入隱匿時放出煙霧，擊退附近敵人並使其失明 {1} 秒。","Toxic Cloud: where the flask bursts, a cloud lingers for {1} s that poisons and slows anyone who crosses it":"毒雲：毒瓶爆裂處留下持續 {1} 秒的毒雲，使穿過的敵人中毒並減速。","Shadow Dance: when you appear, a shadow wave bursts out, dealing {1} damage and stunning everyone around you":"暗影之舞：現身時爆發一道暗影波，對周圍所有敵人造成 {1} 點傷害並使其暈眩。","Poisoned Caltrops: anyone who steps on them is poisoned ({1} damage per second)":"毒鐵蒺藜：踩到的敵人會中毒，每秒受到 {1} 點傷害。","Stroke of Fortune: against an enemy marked by Zeny Rain, the hit bursts into coins that deal {1}% of its damage to those around it":"財運一擊：命中被金幣雨標記的敵人時，金幣會炸開，對周圍敵人造成該次命中傷害的 {1}%。","Bouncing Cart: on landing, the cart bounces to {1} more nearby enemies and deals {2}% of its damage on each bounce":"彈跳手推車：手推車落地後額外彈向附近 {1} 名敵人，每次彈跳造成原傷害的 {2}%。","Market Cry: one more charge, and skills that spend a charge deal {1}% more damage":"市場吆喝：額外獲得一層充能，消耗充能的技能傷害提高 {1}%。","Armored Cart: when it triggers it heals you for {1}% of your max HP and, while it lasts, whoever hits you is knocked away":"裝甲手推車：觸發時恢復最大 HP 的 {1}%，效果持續期間會擊退攻擊你的敵人。","Payment in Advance: the mark gives Mammonite {1}% more and marked enemies that die drop zeny and take {2} s off its cooldown":"預付款：標記使金錢攻擊的傷害再提高 {1}%。被標記的敵人死亡時會掉落 Zeny，並使冷卻縮短 {2} 秒。","Stampede: when it stops, the cart crashes and releases a shockwave with {1}% of its damage; it leaves a dust trail for {2} s that slows anyone on it by {3}%":"橫衝直撞：手推車停下時撞出衝擊波，造成原傷害的 {1}%。沿途留下持續 {2} 秒的塵土，使踏入的敵人減速 {3}%。","Capsules: every hit the machine takes makes it spit out a capsule that lands on a nearby enemy and explodes for {1}% of the burst damage":"轉蛋膠囊：機器每次受到攻擊都會吐出一顆膠囊，落向附近的敵人，爆炸造成原爆發傷害的 {1}%。","Targets burn for {1}% of the hit over {2} s":"目標在 {2} 秒內因灼燒受到本次命中傷害的 {1}%。","{1}% chance to stun for {2} s":"有 {1}% 機率使目標暈眩 {2} 秒","Targets take {1}% more damage for {2} s":"目標在 {2} 秒內受到的傷害提高 {1}%","{1}% chance to freeze for {2} s":"有 {1}% 機率使目標冰凍 {2} 秒","+{1} charge":"充能 +{1} 層","+{1} charges":"充能 +{1} 層","+{1}% de zeny · +{2}% de descubrimiento":"Zeny 獲得量 +{1}% · 探索力 +{2}%","+{1}% de daño · +{2}% critical":"傷害 +{1}% · 暴擊率 +{2}%","+{1}% damage · +{2}% critical":"傷害 +{1}% · 暴擊率 +{2}%","+{1}% critical · +{2}% de daño crítico":"暴擊率 +{1}% · 暴擊傷害 +{2}%","+{1}% critical · +{2}% critical damage":"暴擊率 +{1}% · 暴擊傷害 +{2}%","+{1} STR · +{2}% de daño":"+{1} STR · 傷害 +{2}%","+{1} INT · +{2}% de daño":"+{1} INT · 傷害 +{2}%","+{1} DEX · +{2} cast speed":"+{1} DEX · 詠唱速度 +{2}","+{1} armor · +{2}% HP máximo":"防禦 +{1} · 最大 HP +{2}%","+{1}% de velocidad · +{2}% Flee":"移動速度 +{1}% · 迴避 +{2}%","+{1} HP every {2} s · +{3}% HP máximo":"每 {2} 秒恢復 +{1} HP · 最大 HP +{3}%","+{1} HP every {2} s · +{3}% max HP":"每 {2} 秒恢復 +{1} HP · 最大 HP +{3}%","+{1}% de EXP · +{2}% de descubrimiento":"EXP +{1}% · 探索力 +{2}%","+{1}% de área · +{2}% de daño":"作用範圍 +{1}% · 傷害 +{2}%","+{1}% Flee · +{2}% critical":"迴避 +{1}% · 暴擊率 +{2}%","+{1}% de daño de venenos, quemaduras y sangrados · +{2}% de daño":"中毒、灼燒與出血傷害 +{1}% · 傷害 +{2}%","+{1}% poison, burn and bleed damage · +{2}% damage":"中毒、灼燒與出血傷害 +{1}% · 傷害 +{2}%","Bash Deity":"狂擊神格","Bash Deity +{1}":"狂擊神格 +{1}","Bash Deity rises to rank {1}!":"狂擊神格升至階級 {1}！","Magnum Break Deity rises to rank {1}!":"怒爆神格升至階級 {1}！","Sword Dance Deity":"劍舞神格","Sword Dance Deity +{1}":"劍舞神格 +{1}","Sword Dance Deity rises to rank {1}!":"劍舞神格升至階級 {1}！","Provoke Deity":"挑釁神格","Provoke Deity +{1}":"挑釁神格 +{1}","Provoke Deity rises to rank {1}!":"挑釁神格升至階級 {1}！","Demoralizing Shout Deity":"挫志怒吼神格","Demoralizing Shout Deity +{1}":"挫志怒吼神格 +{1}","Demoralizing Shout Deity rises to rank {1}!":"挫志怒吼神格升至階級 {1}！","Shield Bash Deity +{1}":"盾擊神格 +{1}","Shield Bash Deity rises to rank {1}!":"盾擊神格升至階級 {1}！","Endure Deity":"霸體神格","Endure Deity +{1}":"霸體神格 +{1}","Endure Deity rises to rank {1}!":"霸體神格升至階級 {1}！","Increase HP Recovery Deity":"快速恢復神格","Increase HP Recovery Deity +{1}":"快速恢復神格 +{1}","Increase HP Recovery Deity rises to rank {1}!":"快速恢復神格升至階級 {1}！","Fire Bolt Deity":"火箭術神格","Fire Bolt Deity +{1}":"火箭術神格 +{1}","Fire Bolt Deity rises to rank {1}!":"火箭術神格升至階級 {1}！","Cold Bolt Deity":"冰箭術神格","Cold Bolt Deity +{1}":"冰箭術神格 +{1}","Cold Bolt Deity rises to rank {1}!":"冰箭術神格升至階級 {1}！","Lightning Bolt Deity":"雷擊術神格","Lightning Bolt Deity +{1}":"雷擊術神格 +{1}","Lightning Bolt Deity rises to rank {1}!":"雷擊術神格升至階級 {1}！","Soul Strike Deity":"聖靈召喚神格","Soul Strike Deity +{1}":"聖靈召喚神格 +{1}","Soul Strike Deity rises to rank {1}!":"聖靈召喚神格升至階級 {1}！","Napalm Beat Deity":"心靈爆破神格","Napalm Beat Deity +{1}":"心靈爆破神格 +{1}","Napalm Beat Deity rises to rank {1}!":"心靈爆破神格升至階級 {1}！","Fire Wall Deity":"火焰之壁神格","Fire Wall Deity +{1}":"火焰之壁神格 +{1}","Fire Wall Deity rises to rank {1}!":"火焰之壁神格升至階級 {1}！","Frost Diver Deity":"冰凍術神格","Frost Diver Deity +{1}":"冰凍術神格 +{1}","Frost Diver Deity rises to rank {1}!":"冰凍術神格升至階級 {1}！","Sight Deity":"火狩神格","Sight Deity +{1}":"火狩神格 +{1}","Sight Deity rises to rank {1}!":"火狩神格升至階級 {1}！","Thunderstorm Deity":"雷爆術神格","Thunderstorm Deity +{1}":"雷爆術神格 +{1}","Thunderstorm Deity rises to rank {1}!":"雷爆術神格升至階級 {1}！","Double Strafe Deity rises to rank {1}!":"二連矢神格升至階級 {1}！","Arrow Shower Deity":"箭雨神格","Arrow Shower Deity +{1}":"箭雨神格 +{1}","Arrow Shower Deity rises to rank {1}!":"箭雨神格升至階級 {1}！","Arrow Rain Deity":"箭矢風暴神格","Arrow Rain Deity +{1}":"箭矢風暴神格 +{1}","Arrow Rain Deity rises to rank {1}!":"箭矢風暴神格升至階級 {1}！","Retreat Deity":"後撤射擊神格","Retreat Deity +{1}":"後撤射擊神格 +{1}","Retreat Deity rises to rank {1}!":"後撤射擊神格升至階級 {1}！","Arcane Shot Deity rises to rank {1}!":"秘法射擊神格升至階級 {1}！","Fire Arrow Deity rises to rank {1}!":"火焰箭神格升至階級 {1}！","Arrow Repel Deity":"衝鋒箭神格","Arrow Repel Deity +{1}":"衝鋒箭神格 +{1}","Arrow Repel Deity rises to rank {1}!":"衝鋒箭神格升至階級 {1}！","Improve Concentration Deity":"心神凝聚神格","Improve Concentration Deity +{1}":"心神凝聚神格 +{1}","Improve Concentration Deity rises to rank {1}!":"心神凝聚神格升至階級 {1}！","Heal Deity":"治癒術神格","Heal Deity +{1}":"治癒術神格 +{1}","Heal Deity rises to rank {1}!":"治癒術神格升至階級 {1}！","Holy Light Deity":"神聖之光神格","Holy Light Deity +{1}":"神聖之光神格 +{1}","Holy Light Deity rises to rank {1}!":"神聖之光神格升至階級 {1}！","Ruwach Deity":"光獵神格","Ruwach Deity +{1}":"光獵神格 +{1}","Ruwach Deity rises to rank {1}!":"光獵神格升至階級 {1}！","Decrease AGI Deity":"緩速術神格（AGI）","Decrease AGI Deity +{1}":"緩速術神格（AGI） +{1}","Decrease AGI Deity rises to rank {1}!":"緩速術神格（AGI）升至階級 {1}！","Signum Crucis Deity":"天使之光神格","Signum Crucis Deity +{1}":"天使之光神格 +{1}","Signum Crucis Deity rises to rank {1}!":"天使之光神格升至階級 {1}！","Aqua Benedicta Deity":"天使之淚神格","Aqua Benedicta Deity +{1}":"天使之淚神格 +{1}","Aqua Benedicta Deity rises to rank {1}!":"天使之淚神格升至階級 {1}！","Blessing Deity":"天使之賜福神格","Blessing Deity +{1}":"天使之賜福神格 +{1}","Blessing Deity rises to rank {1}!":"天使之賜福神格升至階級 {1}！","Holy Smite Deity":"神聖重擊神格","Holy Smite Deity +{1}":"神聖重擊神格 +{1}","Holy Smite Deity rises to rank {1}!":"神聖重擊神格升至階級 {1}！","Envenom Deity":"施毒神格","Envenom Deity +{1}":"施毒神格 +{1}","Envenom Deity rises to rank {1}!":"施毒神格升至階級 {1}！","Sand Attack Deity":"噴砂神格","Sand Attack Deity +{1}":"噴砂神格 +{1}","Sand Attack Deity rises to rank {1}!":"噴砂神格升至階級 {1}！","Throw Stone Deity":"投擲石頭神格","Throw Stone Deity +{1}":"投擲石頭神格 +{1}","Throw Stone Deity rises to rank {1}!":"投擲石頭神格升至階級 {1}！","Hiding Deity":"隱匿神格","Hiding Deity +{1}":"隱匿神格 +{1}","Hiding Deity rises to rank {1}!":"隱匿神格升至階級 {1}！","Poison Bomb Deity":"毒霧炸彈神格","Poison Bomb Deity +{1}":"毒霧炸彈神格 +{1}","Poison Bomb Deity rises to rank {1}!":"毒霧炸彈神格升至階級 {1}！","Shadowstep Deity":"暗影步神格","Shadowstep Deity +{1}":"暗影步神格 +{1}","Shadowstep Deity rises to rank {1}!":"暗影步神格升至階級 {1}！","Fan of Knives Deity":"飛刀扇擊神格","Fan of Knives Deity +{1}":"飛刀扇擊神格 +{1}","Fan of Knives Deity rises to rank {1}!":"飛刀扇擊神格升至階級 {1}！","Caltrops Deity":"鐵蒺藜神格","Caltrops Deity +{1}":"鐵蒺藜神格 +{1}","Caltrops Deity rises to rank {1}!":"鐵蒺藜神格升至階級 {1}！","Mammonite Deity":"金錢攻擊神格","Mammonite Deity +{1}":"金錢攻擊神格 +{1}","Mammonite Deity rises to rank {1}!":"金錢攻擊神格升至階級 {1}！","Cart Revolution Deity":"手推車攻擊神格","Cart Revolution Deity +{1}":"手推車攻擊神格 +{1}","Cart Revolution Deity rises to rank {1}!":"手推車攻擊神格升至階級 {1}！","Crazy Uproar Deity":"大聲吶喊神格","Crazy Uproar Deity +{1}":"大聲吶喊神格 +{1}","Crazy Uproar Deity rises to rank {1}!":"大聲吶喊神格升至階級 {1}！","Enlarge Weight Limit Deity":"負重量上升神格","Enlarge Weight Limit Deity +{1}":"負重量上升神格 +{1}","Enlarge Weight Limit Deity rises to rank {1}!":"負重量上升神格升至階級 {1}！","Zeny Rain Deity":"金幣雨神格","Zeny Rain Deity +{1}":"金幣雨神格 +{1}","Zeny Rain Deity rises to rank {1}!":"金幣雨神格升至階級 {1}！","Cart Rush Deity":"手推車突進神格","Cart Rush Deity +{1}":"手推車突進神格 +{1}","Cart Rush Deity rises to rank {1}!":"手推車突進神格升至階級 {1}！","Vending Deity":"露天商店神格","Vending Deity +{1}":"露天商店神格 +{1}","Vending Deity rises to rank {1}!":"露天商店神格升至階級 {1}！","Tornado Kick Deity":"迴旋踢神格","Tornado Kick Deity +{1}":"迴旋踢神格 +{1}","Tornado Kick Deity rises to rank {1}!":"迴旋踢神格升至階級 {1}！","Heel Drop Deity":"砸踢神格","Heel Drop Deity +{1}":"砸踢神格 +{1}","Heel Drop Deity rises to rank {1}!":"砸踢神格升至階級 {1}！","Roundhouse Deity":"轉身踢神格","Roundhouse Deity +{1}":"轉身踢神格 +{1}","Roundhouse Deity rises to rank {1}!":"轉身踢神格升至階級 {1}！","Counter Kick Deity":"還擊踢神格","Counter Kick Deity +{1}":"還擊踢神格 +{1}","Counter Kick Deity rises to rank {1}!":"還擊踢神格升至階級 {1}！","Sprint Deity":"跑步神格","Sprint Deity +{1}":"跑步神格 +{1}","Sprint Deity rises to rank {1}!":"跑步神格升至階級 {1}！","Throw Shuriken Deity":"投擲飛鏢神格","Throw Shuriken Deity +{1}":"投擲飛鏢神格 +{1}","Throw Shuriken Deity rises to rank {1}!":"投擲飛鏢神格升至階級 {1}！","Throw Kunai Deity":"投擲飛刀神格","Throw Kunai Deity +{1}":"投擲飛刀神格 +{1}","Throw Kunai Deity rises to rank {1}!":"投擲飛刀神格升至階級 {1}！","Throw Huuma Shuriken Deity":"投擲風魔飛鏢神格","Throw Huuma Shuriken Deity +{1}":"投擲風魔飛鏢神格 +{1}","Throw Huuma Shuriken Deity rises to rank {1}!":"投擲風魔飛鏢神格升至階級 {1}！","Flaming Petals Deity":"火炎花神格","Flaming Petals Deity +{1}":"火炎花神格 +{1}","Flaming Petals Deity rises to rank {1}!":"火炎花神格升至階級 {1}！","Lightning Strike Deity":"雷擊碎神格","Lightning Strike Deity +{1}":"雷擊碎神格 +{1}","Lightning Strike Deity rises to rank {1}!":"雷擊碎神格升至階級 {1}！","Triple Action Deity":"三連攻擊神格","Triple Action Deity +{1}":"三連攻擊神格 +{1}","Triple Action Deity rises to rank {1}!":"三連攻擊神格升至階級 {1}！","Rapid Shower Deity":"五連擊神格","Rapid Shower Deity +{1}":"五連擊神格 +{1}","Rapid Shower Deity rises to rank {1}!":"五連擊神格升至階級 {1}！","Spread Attack Deity":"火力全開神格","Spread Attack Deity +{1}":"火力全開神格 +{1}","Spread Attack Deity rises to rank {1}!":"火力全開神格升至階級 {1}！","Desperado Deity":"亡命之徒神格","Desperado Deity +{1}":"亡命之徒神格 +{1}","Desperado Deity rises to rank {1}!":"亡命之徒神格升至階級 {1}！","Ground Drift Deity":"四面埋伏神格","Ground Drift Deity +{1}":"四面埋伏神格 +{1}","Ground Drift Deity rises to rank {1}!":"四面埋伏神格升至階級 {1}！","Tracking Deity":"百步穿楊神格","Tracking Deity +{1}":"百步穿楊神格 +{1}","Tracking Deity rises to rank {1}!":"百步穿楊神格升至階級 {1}！","Brandish Spear Deity":"騎乘攻擊神格","Brandish Spear Deity +{1}":"騎乘攻擊神格 +{1}","Brandish Spear Deity rises to rank {1}!":"騎乘攻擊神格升至階級 {1}！","Charge Attack Deity":"衝鋒攻擊神格","Charge Attack Deity +{1}":"衝鋒攻擊神格 +{1}","Charge Attack Deity rises to rank {1}!":"衝鋒攻擊神格升至階級 {1}！","Pierce Deity":"連刺攻擊神格","Pierce Deity +{1}":"連刺攻擊神格 +{1}","Pierce Deity rises to rank {1}!":"連刺攻擊神格升至階級 {1}！","Spear Boomerang Deity":"投擲長矛攻擊神格","Spear Boomerang Deity +{1}":"投擲長矛攻擊神格 +{1}","Spear Boomerang Deity rises to rank {1}!":"投擲長矛攻擊神格升至階級 {1}！","Counter Attack Deity":"反擊神格","Counter Attack Deity +{1}":"反擊神格 +{1}","Counter Attack Deity rises to rank {1}!":"反擊神格升至階級 {1}！","Bowling Bash Deity":"怪物互擊神格","Bowling Bash Deity +{1}":"怪物互擊神格 +{1}","Bowling Bash Deity rises to rank {1}!":"怪物互擊神格升至階級 {1}！","Spear Quicken Deity":"長矛加速術神格","Spear Quicken Deity +{1}":"長矛加速術神格 +{1}","Spear Quicken Deity rises to rank {1}!":"長矛加速術神格升至階級 {1}！","Shield Charge Deity":"盾擊神格","Shield Charge Deity +{1}":"盾擊神格 +{1}","Shield Charge Deity rises to rank {1}!":"盾擊神格升至階級 {1}！","Holy Cross Deity":"聖十字攻擊神格","Holy Cross Deity +{1}":"聖十字攻擊神格 +{1}","Holy Cross Deity rises to rank {1}!":"聖十字攻擊神格升至階級 {1}！","Grand Cross Deity":"聖十字審判神格","Grand Cross Deity +{1}":"聖十字審判神格 +{1}","Grand Cross Deity rises to rank {1}!":"聖十字審判神格升至階級 {1}！","Shield Boomerang Deity":"迴旋盾擊神格","Shield Boomerang Deity +{1}":"迴旋盾擊神格 +{1}","Shield Boomerang Deity rises to rank {1}!":"迴旋盾擊神格升至階級 {1}！","Auto Guard Deity":"自動防禦神格","Auto Guard Deity +{1}":"自動防禦神格 +{1}","Auto Guard Deity rises to rank {1}!":"自動防禦神格升至階級 {1}！","Meteor Storm Deity":"隕石術神格","Meteor Storm Deity +{1}":"隕石術神格 +{1}","Meteor Storm Deity rises to rank {1}!":"隕石術神格升至階級 {1}！","Fire Pillar Deity":"火柱攻擊神格","Fire Pillar Deity +{1}":"火柱攻擊神格 +{1}","Fire Pillar Deity rises to rank {1}!":"火柱攻擊神格升至階級 {1}！","Frost Nova Deity":"霜凍之術神格","Frost Nova Deity +{1}":"霜凍之術神格 +{1}","Frost Nova Deity rises to rank {1}!":"霜凍之術神格升至階級 {1}！","Storm Gust Deity":"暴風雪神格","Storm Gust Deity +{1}":"暴風雪神格 +{1}","Storm Gust Deity rises to rank {1}!":"暴風雪神格升至階級 {1}！","Jupitel Thunder Deity":"雷鳴術神格","Jupitel Thunder Deity +{1}":"雷鳴術神格 +{1}","Jupitel Thunder Deity rises to rank {1}!":"雷鳴術神格升至階級 {1}！","Lord of Vermilion Deity":"怒雷強擊神格","Lord of Vermilion Deity +{1}":"怒雷強擊神格 +{1}","Lord of Vermilion Deity rises to rank {1}!":"怒雷強擊神格升至階級 {1}！","Volcano Deity":"火元素領域神格","Volcano Deity +{1}":"火元素領域神格 +{1}","Volcano Deity rises to rank {1}!":"火元素領域神格升至階級 {1}！","Deluge Deity":"水元素領域神格","Deluge Deity +{1}":"水元素領域神格 +{1}","Deluge Deity rises to rank {1}!":"水元素領域神格升至階級 {1}！","Earth Spike Deity":"地震術神格","Earth Spike Deity +{1}":"地震術神格 +{1}","Earth Spike Deity rises to rank {1}!":"地震術神格升至階級 {1}！","Heaven's Drive Deity":"崩裂術神格","Heaven's Drive Deity +{1}":"崩裂術神格 +{1}","Heaven's Drive Deity rises to rank {1}!":"崩裂術神格升至階級 {1}！","Hindsight Deity":"自動念咒神格","Hindsight Deity +{1}":"自動念咒神格 +{1}","Hindsight Deity rises to rank {1}!":"自動念咒神格升至階級 {1}！","Abracadabra Deity":"隨機技能神格","Abracadabra Deity +{1}":"隨機技能神格 +{1}","Abracadabra Deity rises to rank {1}!":"隨機技能神格升至階級 {1}！","Blitz Beat Deity":"閃電衝擊神格","Blitz Beat Deity +{1}":"閃電衝擊神格 +{1}","Blitz Beat Deity rises to rank {1}!":"閃電衝擊神格升至階級 {1}！","Detecting Deity":"獵鷹尋敵神格","Detecting Deity +{1}":"獵鷹尋敵神格 +{1}","Detecting Deity rises to rank {1}!":"獵鷹尋敵神格升至階級 {1}！","Claymore Trap Deity":"暴散陷阱神格","Claymore Trap Deity +{1}":"暴散陷阱神格 +{1}","Claymore Trap Deity rises to rank {1}!":"暴散陷阱神格升至階級 {1}！","Sandman Deity":"睡魔陷阱神格","Sandman Deity +{1}":"睡魔陷阱神格 +{1}","Sandman Deity rises to rank {1}!":"睡魔陷阱神格升至階級 {1}！","Beast Strafing Deity":"動物猛擊神格","Beast Strafing Deity +{1}":"動物猛擊神格 +{1}","Beast Strafing Deity rises to rank {1}!":"動物猛擊神格升至階級 {1}！","Phantasmic Arrow Deity":"幻影箭神格","Phantasmic Arrow Deity +{1}":"幻影箭神格 +{1}","Phantasmic Arrow Deity rises to rank {1}!":"幻影箭神格升至階級 {1}！","Arrow Vulcan Deity":"奧義箭亂舞神格","Arrow Vulcan Deity +{1}":"奧義箭亂舞神格 +{1}","Arrow Vulcan Deity rises to rank {1}!":"奧義箭亂舞神格升至階級 {1}！","Dissonance Deity":"不諧和音神格","Dissonance Deity +{1}":"不諧和音神格 +{1}","Dissonance Deity rises to rank {1}!":"不諧和音神格升至階級 {1}！","Lullaby Deity":"搖籃曲神格","Lullaby Deity +{1}":"搖籃曲神格 +{1}","Lullaby Deity rises to rank {1}!":"搖籃曲神格升至階級 {1}！","Loki's Veil Deity":"洛奇的悲鳴神格","Loki's Veil Deity +{1}":"洛奇的悲鳴神格 +{1}","Loki's Veil Deity rises to rank {1}!":"洛奇的悲鳴神格升至階級 {1}！","A Drum on the Battlefield Deity":"戰鼓震天神格","A Drum on the Battlefield Deity +{1}":"戰鼓震天神格 +{1}","A Drum on the Battlefield Deity rises to rank {1}!":"戰鼓震天神格升至階級 {1}！","Invulnerable Siegfried Deity":"不死神齊格弗里德神格","Invulnerable Siegfried Deity +{1}":"不死神齊格弗里德神格 +{1}","Invulnerable Siegfried Deity rises to rank {1}!":"不死神齊格弗里德神格升至階級 {1}！","Sanctuary Deity":"光耀之堂神格","Sanctuary Deity +{1}":"光耀之堂神格 +{1}","Sanctuary Deity rises to rank {1}!":"光耀之堂神格升至階級 {1}！","Safety Wall Deity":"暗之障壁神格","Safety Wall Deity +{1}":"暗之障壁神格 +{1}","Safety Wall Deity rises to rank {1}!":"暗之障壁神格升至階級 {1}！","Benedictio Deity":"聖之祈福神格","Benedictio Deity +{1}":"聖之祈福神格 +{1}","Benedictio Deity rises to rank {1}!":"聖之祈福神格升至階級 {1}！","Magnus Exorcismus Deity":"十字驅魔攻擊神格","Magnus Exorcismus Deity +{1}":"十字驅魔攻擊神格 +{1}","Magnus Exorcismus Deity rises to rank {1}!":"十字驅魔攻擊神格升至階級 {1}！","Impositio Manus Deity":"神威祈福神格","Impositio Manus Deity +{1}":"神威祈福神格 +{1}","Impositio Manus Deity rises to rank {1}!":"神威祈福神格升至階級 {1}！","Magnificat Deity":"聖母之頌歌神格","Magnificat Deity +{1}":"聖母之頌歌神格 +{1}","Magnificat Deity rises to rank {1}!":"聖母之頌歌神格升至階級 {1}！","Call Spirits Deity":"蓄氣神格","Call Spirits Deity +{1}":"蓄氣神格 +{1}","Call Spirits Deity rises to rank {1}!":"蓄氣神格升至階級 {1}！","Finger Offensive Deity":"彈指神通神格","Finger Offensive Deity +{1}":"彈指神通神格 +{1}","Finger Offensive Deity rises to rank {1}!":"彈指神通神格升至階級 {1}！","Chain Combo Deity":"連環全身掌神格","Chain Combo Deity +{1}":"連環全身掌神格 +{1}","Chain Combo Deity rises to rank {1}!":"連環全身掌神格升至階級 {1}！","Combo Finish Deity":"猛龍誇強神格","Combo Finish Deity +{1}":"猛龍誇強神格 +{1}","Combo Finish Deity rises to rank {1}!":"猛龍誇強神格升至階級 {1}！","Fury Deity":"爆氣神格","Fury Deity +{1}":"爆氣神格 +{1}","Fury Deity rises to rank {1}!":"爆氣神格升至階級 {1}！","Asura Strike Deity":"阿修羅霸凰拳神格","Asura Strike Deity +{1}":"阿修羅霸凰拳神格 +{1}","Asura Strike Deity rises to rank {1}!":"阿修羅霸凰拳神格升至階級 {1}！","Sonic Blow Deity":"音速投擲神格","Sonic Blow Deity +{1}":"音速投擲神格 +{1}","Sonic Blow Deity rises to rank {1}!":"音速投擲神格升至階級 {1}！","Grimtooth Deity":"無影之牙神格","Grimtooth Deity +{1}":"無影之牙神格 +{1}","Grimtooth Deity rises to rank {1}!":"無影之牙神格升至階級 {1}！","Enchant Poison Deity":"塗毒神格","Enchant Poison Deity +{1}":"塗毒神格 +{1}","Enchant Poison Deity rises to rank {1}!":"塗毒神格升至階級 {1}！","Venom Dust Deity":"病毒散撥神格","Venom Dust Deity +{1}":"病毒散撥神格 +{1}","Venom Dust Deity rises to rank {1}!":"病毒散撥神格升至階級 {1}！","Cloaking Deity":"偽裝神格","Cloaking Deity +{1}":"偽裝神格 +{1}","Cloaking Deity rises to rank {1}!":"偽裝神格升至階級 {1}！","Venom Knife Deity":"毒刃神格","Venom Knife Deity +{1}":"毒刃神格 +{1}","Venom Knife Deity rises to rank {1}!":"毒刃神格升至階級 {1}！","Back Stab Deity":"背刺神格","Back Stab Deity +{1}":"背刺神格 +{1}","Back Stab Deity rises to rank {1}!":"背刺神格升至階級 {1}！","Raid Deity":"潛擊神格","Raid Deity +{1}":"潛擊神格 +{1}","Raid Deity rises to rank {1}!":"潛擊神格升至階級 {1}！","Divest Weapon Deity":"卸除武器神格","Divest Weapon Deity +{1}":"卸除武器神格 +{1}","Divest Weapon Deity rises to rank {1}!":"卸除武器神格升至階級 {1}！","Intimidate Deity":"脅持神格","Intimidate Deity +{1}":"脅持神格 +{1}","Intimidate Deity rises to rank {1}!":"脅持神格升至階級 {1}！","Steal Coin Deity":"偷錢神格","Steal Coin Deity +{1}":"偷錢神格 +{1}","Steal Coin Deity rises to rank {1}!":"偷錢神格升至階級 {1}！","Graffiti Deity":"塗鴉神格","Graffiti Deity +{1}":"塗鴉神格 +{1}","Graffiti Deity rises to rank {1}!":"塗鴉神格升至階級 {1}！","Axe Tornado Deity":"戰斧颶風神格","Axe Tornado Deity +{1}":"戰斧颶風神格 +{1}","Axe Tornado Deity rises to rank {1}!":"戰斧颶風神格升至階級 {1}！","Axe Boomerang Deity":"迴旋斧神格","Axe Boomerang Deity +{1}":"迴旋斧神格 +{1}","Axe Boomerang Deity rises to rank {1}!":"迴旋斧神格升至階級 {1}！","Weapon Perfection Deity":"無視體型攻擊神格","Weapon Perfection Deity +{1}":"無視體型攻擊神格 +{1}","Weapon Perfection Deity rises to rank {1}!":"無視體型攻擊神格升至階級 {1}！","Rush Quake Deity":"衝擊撼動神格","Rush Quake Deity +{1}":"衝擊撼動神格 +{1}","Rush Quake Deity rises to rank {1}!":"衝擊撼動神格升至階級 {1}！","Greed Deity":"貪婪神格","Greed Deity +{1}":"貪婪神格 +{1}","Greed Deity rises to rank {1}!":"貪婪神格升至階級 {1}！","Ore Discovery Deity":"尋找礦石神格","Ore Discovery Deity +{1}":"尋找礦石神格 +{1}","Ore Discovery Deity rises to rank {1}!":"尋找礦石神格升至階級 {1}！","Acid Terror Deity":"強酸攻擊神格","Acid Terror Deity +{1}":"強酸攻擊神格 +{1}","Acid Terror Deity rises to rank {1}!":"強酸攻擊神格升至階級 {1}！","Demonstration Deity":"火煙瓶投擲神格","Demonstration Deity +{1}":"火煙瓶投擲神格 +{1}","Demonstration Deity rises to rank {1}!":"火煙瓶投擲神格升至階級 {1}！","Call Homunculus Deity":"生命體召喚神格","Call Homunculus Deity +{1}":"生命體召喚神格 +{1}","Call Homunculus Deity rises to rank {1}!":"生命體召喚神格升至階級 {1}！","Summon Flora Deity":"生物調撥神格","Summon Flora Deity +{1}":"生物調撥神格 +{1}","Summon Flora Deity rises to rank {1}!":"生物調撥神格升至階級 {1}！","Potion Pitcher Deity":"藥水投擲神格","Potion Pitcher Deity +{1}":"藥水投擲神格 +{1}","Potion Pitcher Deity rises to rank {1}!":"藥水投擲神格升至階級 {1}！","Chemical Protection Deity":"化學保護神格","Chemical Protection Deity +{1}":"化學保護神格 +{1}","Chemical Protection Deity rises to rank {1}!":"化學保護神格升至階級 {1}！","Warmth of the Sun Deity":"太陽的溫暖神格","Warmth of the Sun Deity +{1}":"太陽的溫暖神格 +{1}","Warmth of the Sun Deity rises to rank {1}!":"太陽的溫暖神格升至階級 {1}！","Solar Burst Deity":"太陽爆炸神格","Solar Burst Deity +{1}":"太陽爆炸神格 +{1}","Solar Burst Deity rises to rank {1}!":"太陽爆炸神格升至階級 {1}！","Full Moon Kick Deity":"滿月腳神格","Full Moon Kick Deity +{1}":"滿月腳神格 +{1}","Full Moon Kick Deity rises to rank {1}!":"滿月腳神格升至階級 {1}！","New Moon Kick Deity":"朔月腳神格","New Moon Kick Deity +{1}":"朔月腳神格 +{1}","New Moon Kick Deity rises to rank {1}!":"朔月腳神格升至階級 {1}！","Falling Star Deity":"流星殞落神格","Falling Star Deity +{1}":"流星殞落神格 +{1}","Falling Star Deity rises to rank {1}!":"流星殞落神格升至階級 {1}！","Union of the Sun, Moon and Stars Deity":"太陽與月亮與星星的融合神格","Union of the Sun, Moon and Stars Deity +{1}":"太陽與月亮與星星的融合神格 +{1}","Union of the Sun, Moon and Stars Deity rises to rank {1}!":"太陽與月亮與星星的融合神格升至階級 {1}！","Esma Deity":"艾斯麻神格","Esma Deity +{1}":"艾斯麻神格 +{1}","Esma Deity rises to rank {1}!":"艾斯麻神格升至階級 {1}！","Estin Deity":"艾斯提神格","Estin Deity +{1}":"艾斯提神格 +{1}","Estin Deity rises to rank {1}!":"艾斯提神格升至階級 {1}！","Estun Deity":"艾斯敦神格","Estun Deity +{1}":"艾斯敦神格 +{1}","Estun Deity rises to rank {1}!":"艾斯敦神格升至階級 {1}！","Kaizel Deity":"凱易哲神格","Kaizel Deity +{1}":"凱易哲神格 +{1}","Kaizel Deity rises to rank {1}!":"凱易哲神格升至階級 {1}！","Kaahi Deity":"凱阿希神格","Kaahi Deity +{1}":"凱阿希神格 +{1}","Kaahi Deity rises to rank {1}!":"凱阿希神格升至階級 {1}！","Kaupe Deity":"凱誣僕神格","Kaupe Deity +{1}":"凱誣僕神格 +{1}","Kaupe Deity rises to rank {1}!":"凱誣僕神格升至階級 {1}！","Deity of Thought +{1}":"思考神格 +{1}","Deity of Memory":"記憶神格","Deity of Memory +{1}":"記憶神格 +{1}","Deity of Trickery +{1}":"詭計神格 +{1}","Deity of Torment +{1}":"折磨神格 +{1}","Choose your Deity":"選擇神格","Contagion":"火焰蔓延","Sharp Shooting":"銳利射擊","Eclipse: Lunar Leap!!":"藍瘋兔：月之跳躍！","Eclipse: Charge!!":"藍瘋兔：衝鋒！","Eclipse: Full Moon!!":"藍瘋兔：滿月！","Vocal: Deafening Song!!":"蝗蟲之王：震耳之歌！","Vocal: Cricket Hops!!":"蝗蟲之王：蟋蟀跳！","Vocal: Screech!!":"蝗蟲之王：尖嘯！","Toad: Bubble Jet!!":"蛙王：泡泡噴射！","Toad: Toad Leap!!":"蛙王：蛙王跳躍！","Toad: Croak!!":"蛙王：呱呱叫！","Toad: Frogs!!!":"蛙王：青蛙們！","Dragon Fly: Dive!!":"龍蠅：俯衝！","Dragon Fly: Buzz!!":"龍蠅：嗡嗡！","Dragon Fly: Sting!!":"龍蠅：螫刺！","Dragon Fly: Swarm!!":"龍蠅：蟲群！","Mastering: Jelly Bounce!!":"波利之王：果凍彈跳！","Mastering: Poring Rain!!":"波利之王：波利雨！","Mastering: Crush!!":"波利之王：碾壓！","Mastering: Great Leap!!":"波利之王：大躍進！","Mastering: Jelly Waves!!":"波利之王：果凍波！","Mastering: Split into Porings!!!":"波利之王：分裂成波利！","Biting Tarou: Bite!!":"噬咬白鼠：咬擊！","Biting Tarou: Rabid Rush!!":"噬咬白鼠：狂暴突進！","Plague Tarou: Bite!!":"瘟疫白鼠：咬擊！","Plague Tarou: Sewer Plague!!":"瘟疫白鼠：地下水道瘟疫！","Burrowing Tarou: Bite!!":"掘地白鼠：咬擊！","Burrowing Tarou: Burrow!!":"掘地白鼠：鑽地！","Burrowing Tarou: Rats!!!":"掘地白鼠：老鼠們！","Golden Thief Bug: Golden Burrow!!":"黃金蟲：黃金鑽地！","Golden Thief Bug: Golden Carapace!!":"黃金蟲：黃金甲殼！","Golden Thief Bug: Greed!!":"黃金蟲：貪婪！","Golden Thief Bug: Golden Charge!!":"黃金蟲：黃金衝鋒！","Golden Thief Bug: Golden Mandibles!!":"黃金蟲：黃金大顎！","Golden Thief Bug: Swarm!!":"黃金蟲：蟲群！","Angeling: Holy Light!!":"天使波利：神聖之光！","Angeling: Angelic Leap!!":"天使波利：天使之躍！","Angeling: Judgement of Heaven!!":"天使波利：天堂審判！","Deviling: Dark Orb!!":"惡魔波利：黑暗球！","Deviling: Devil Leap!!":"惡魔波利：惡魔之躍！","Deviling: Infernal Charge!!":"惡魔波利：地獄衝鋒！","Ghostring: Lament!!":"幽靈波利：哀嘆！","Ghostring: Ghost Touch!!":"幽靈波利：幽靈之觸！","Ghostring: Fade Away!!":"幽靈波利：消逝！","Penomena: Tentacles!!":"梅納海葵：觸手！","Penomena: Roots of the Deep!!":"梅納海葵：深海之根！","Penomena: Venom Tide!!":"梅納海葵：毒液潮！","Penomena: Hydra Sprouts!!":"梅納海葵：海葵新芽！","Drake: Saber Slash!!":"海盜之王：軍刀斬！","Drake: Whirlwind!!":"海盜之王：旋風！","Drake: Swell!!":"海盜之王：浪湧！","Drake: All hands, to me!!!":"海盜之王：全員，到我身邊！","Deviace: Ravenous Bite!!":"狄奧斯：貪婪啃咬！","Deviace: Abyssal Rush!!":"狄奧斯：深淵突進！","Deviace: Whirlwind!!":"狄奧斯：旋風！","Strouf: Tail Slap!!":"海神：甩尾！","Strouf: Thunderstorm!!":"海神：雷爆術！","Strouf: Surge!!":"海神：湧浪！","Strouf: School of Fish!!!":"海神：魚群！","King Dramoh: Pincer Strike!!":"大腳龍蝦：鉗擊！","King Dramoh: King's Charge!!":"大腳龍蝦：國王衝鋒！","King Dramoh: Bubbles!!":"大腳龍蝦：泡泡！","King Dramoh: Iron Pincers!!":"大腳龍蝦：鋼鐵巨鉗！","King Dramoh: My Subjects!!!":"大腳龍蝦：我的子民們！","Kraken: Tentacle Rows!!":"魔鬼大烏賊：觸手列陣！","Kraken: Cross Lash!!":"魔鬼大烏賊：交叉鞭打！","Kraken: Ink Cloud!!":"魔鬼大烏賊：墨雲！","Kraken: Kraken’s Embrace!!":"魔鬼大烏賊：魔鬼大烏賊之擁！","Kraken: Abyssal Vortex!!":"魔鬼大烏賊：深淵漩渦！","Kraken: Kraken Tentacles!!!":"魔鬼大烏賊：魔鬼大烏賊的觸手！","Vagabond Wolf: Snapping Bites!!":"流浪之狼：連續咬擊！","Vagabond Wolf: Wolf Leap!!":"流浪之狼：狼躍！","Vagabond Wolf: Wild Rush!!":"流浪之狼：狂野突進！","Vagabond Wolf: Ground Slam!!":"流浪之狼：大地重擊！","Vagabond Wolf: Howl of the Pack!!":"流浪之狼：群狼之嚎！","Skeleton General: General's Cleave!!":"邪骸戰士長：將軍劈砍！","Skeleton General: Charge!!!":"邪骸戰士長：衝啊！","Skeleton General: Archers, fire!!!":"邪骸戰士長：弓箭手，放箭！","Skeleton General: Fall in!!!":"邪骸戰士長：列隊！","Skeleton General: Archers, to me!!!":"邪骸戰士長：弓箭手，到我身邊！","Cat O' Nine Tails: Claw Swipes!!":"狂暴月夜貓：連續爪擊！","Cat O' Nine Tails: Fox Fire!!":"狂暴月夜貓：狐火！","Cat O' Nine Tails: Fox Step!!":"狂暴月夜貓：狐步！","Cat O' Nine Tails: Nine Tails!!":"狂暴月夜貓：九尾！","Cat O' Nine Tails: Sisters!!!":"狂暴月夜貓：姊妹們！","Hyegun: Vampire Hops!!":"妖君：殭屍跳！","Hyegun: Talismans!!":"妖君：符咒！","Hyegun: Embrace of Death!!":"妖君：死亡之擁！","Hyegun: Great Leap!!":"妖君：大躍進！","Hyegun: Awaken!!!":"妖君：甦醒吧！","Moonlight Flower: Foxfire!!":"月夜貓：狐火！","Moonlight Flower: Moon Step!!":"月夜貓：月步！","Moonlight Flower: Moon Dance!!":"月夜貓：月之舞！","Moonlight Flower: Fan of Flames!!":"月夜貓：火焰扇！","Moonlight Flower: Fire Moon!!":"月夜貓：火之月！","Moonlight Flower: The Nine Tails!!":"月夜貓：九尾！","Eddga: Blazing Claw!!":"虎王：烈焰之爪！","Eddga: Burning Charge!!":"虎王：燃燒衝鋒！","Eddga: Tiger Pounce!!":"虎王：猛虎撲擊！","Eddga: Infernal Roar!!":"虎王：地獄咆哮！","Eddga: Ember Rain!!":"虎王：餘燼之雨！","Eddga: To me, Bigfoot!!!":"虎王：到我身邊，大腳熊！","Orc Hero: Axe Cleave!!":"獸人英雄：斧劈！","Orc Hero: War Cry!!":"獸人英雄：戰吼！","Orc Hero: Orcish Charge!!":"獸人英雄：獸人衝鋒！","Orc Hero: Heroic Leap!!":"獸人英雄：英勇之躍！","Osiris: Mummy's Curse!!":"俄塞里斯：木乃伊詛咒！","Osiris: Desert Sands!!":"俄塞里斯：沙漠之沙！","Osiris: Teleport!!":"俄塞里斯：傳送！","Baphomet: Dark Storm!!":"巴風特：黑暗風暴！","Baphomet: Scythe!!":"巴風特：鐮刀！","Baphomet: Charge!!":"巴風特：衝鋒！","Baphomet: Earthquake!!":"巴風特：地震！","Kraken: Fury of the Deep!!":"魔鬼大烏賊：深海之怒！","Moonlight Flower: Moon Bell!!":"月夜貓：月之鐘！","Moonlight Flower: Sealed Bell!!":"月夜貓：封印之鐘！","Dancing Dragon: Dragon Dance!!":"舞龍：龍舞！","Dancing Dragon: Firecrackers!!":"舞龍：鞭炮！","Dancing Dragon: Fire Breath!!":"舞龍：火焰吐息！","Dancing Dragon: Tail Slap!!":"舞龍：甩尾！","Dancing Dragon: Firecracker Grid!!":"舞龍：鞭炮陣！","Live Peach Tree: Root Star!!":"桃妖樹：星形樹根！","Live Peach Tree: Peach Spiral!!":"桃妖樹：桃子螺旋！","Live Peach Tree: Peach Tree Shade!!":"桃妖樹：桃樹之蔭！","Live Peach Tree: Peach Barrage!!":"桃妖樹：桃子轟炸！","Live Peach Tree: Sprout!!!":"桃妖樹：發芽吧！","Wanderer: Thousand Cuts!!":"浪人：千刃斬！","Wanderer: Wandering Shadows!!":"浪人：流浪之影！","Wanderer: Iaido!!":"浪人：拔刀術！","Wanderer: Spinning Cross!!":"浪人：迴旋十字斬！","Wooden Golem: Log Leap!!":"木魔像：樹幹跳！","Wooden Golem: Stalking Roots!!":"木魔像：追蹤樹根！","Wooden Golem: Quartered Quake!!":"木魔像：四象地震！","Wooden Golem: Rolling Log!!":"木魔像：滾木！","Wooden Golem: Thorned Bark!!":"木魔像：荊棘樹皮！","Rice Cake Boy: Mochitsuki!!":"年糕童子：搗麻糬！","Rice Cake Boy: Sticky Mochi!!":"年糕童子：黏黏麻糬！","Rice Cake Boy: Rice Cake Shower!!":"年糕童子：年糕雨！","Rice Cake Boy: Mochi Pass!!":"年糕童子：麻糬傳球！","Spring Rabbit: Spring Hops!!":"新春兔：春之跳躍！","Spring Rabbit: Burrow!!":"新春兔：鑽地！","Spring Rabbit: Spinning Kick!!":"新春兔：迴旋踢！","White Lady: Jade Fan!!":"白素貞：玉扇！","White Lady: Paper Cranes!!":"白素貞：紙鶴！","White Lady: Lake Mirror!!":"白素貞：湖面倒影！","White Lady: Lotus Bloom!!":"白素貞：蓮花綻放！","White Lady: Guards!!!":"白素貞：侍衛！","Evil Snake Lord: Venom Strokes!!":"蛇王：劇毒筆觸！","Evil Snake Lord: Serpent Calligraphy!!":"蛇王：蛇之書法！","Evil Snake Lord: Serpentine Strokes!!":"蛇王：蜿蜒筆觸！","Evil Snake Lord: Living Paint!!":"蛇王：活之畫！","Evil Snake Lord: Ink Seals!!":"蛇王：墨印！","Evil Snake Lord: Ink in the Eyes!!":"蛇王：墨染雙眼！","Report":"檢舉","Install RO Survivors":"安裝 RO Survivors","New version":"新版本","There is a new version of the game. Reload the page to get it: it downloads on the title screen and you jump back in.":"遊戲有新版本。重新整理頁面後，遊戲會在標題畫面下載更新，完成後即可再次進入。","Later":"稍後","Test mode":"測試模式","Wrong password":"密碼錯誤","Change name":"更改名稱","Delete character":"刪除角色","Delete test data":"清除測試資料","Delete all test characters, their gear and everything they saved? Your normal account is not touched.":"確定要刪除所有測試角色、裝備和已儲存的資料嗎？一般帳號的資料會保留。","Delete everything":"全部刪除","When you reach your 2nd job you will choose one of its three branches as your specialization. If you want another one later, come see me.":"二轉時，你會從該職業的三個分支中選擇一個專精。日後想更換，可以來找我。","You do not have enough Kafra Points.":"卡普拉點數不足。","Change gear":"更換裝備","Move cards":"轉移卡片","Discard item":"捨棄物品","Reset stats? You get all stat points back.":"要重置能力值嗎？你會取回全部能力點數。","Not now":"暫時不要","Notice from the RO Survivors team":"RO Survivors 團隊公告","Report sent. We will review it, thanks for letting us know.":"已送出檢舉，遊戲團隊會進行審查。","You already reported this player recently.":"你最近已檢舉過這名玩家。","The party leader is on channel {1}. Join them?":"隊長在頻道 {1}。要前往會合嗎？","Go to channel {1}":"前往頻道 {1}","Leave the party?":"要離開隊伍嗎？","Offline.":"目前離線。","You can't go to that stage with the party:":"你無法與隊伍前往該關卡：","Skills not chosen":"尚未選滿技能","You have {1} of {2} skills for the tower: inside you can neither change them nor get new ones.":"你已選擇 {1}／{2} 個無限塔技能。入塔後無法更換技能，也無法取得新技能。","Enter anyway":"直接進入","Choose skills":"選擇技能","You need {1} Kafra Points and you have {2}.":"需要 {1} 卡普拉點數，目前持有 {2} 點。","All of this character's tower upgrades go back to rank 0 and you get the {1} spent points back to spend again.":"此角色的無限塔強化將全部重置為階級 0，你可以重新分配已投入的 {1} 點。","It costs {1} Kafra Points (you have {2}).":"花費 {1} 卡普拉點數（目前持有 {2} 點）。","Reset for {1} KP":"花費 {1} 卡普拉點數重置","Upgrades reset: all your tower points are back to spend again.":"已重置強化，所有無限塔點數都可以重新分配。","Stories are played solo: leave the party to play it.":"劇情關卡需單人遊玩。請先離開隊伍。","In a party, the leader chooses the stage.":"組隊時由隊長選擇關卡。","gearscore {1} of {2}":"裝備評分 {1}／{2}","Job Lv {1} of {2}":"職業等級 {1}／{2}","Not everyone in the party can enter this stage:":"部分隊員未達此關卡的入場條件：","{1} s to pick a card":"有 {1} 秒可選擇卡片","You have an unfinished run: setting out cashes in what you had and discards it.":"你有一場未完成的遠征。出發時會結算已取得的獎勵，並捨棄該場遠征。","Propose to the party":"向隊伍提議","Go to the field":"前往關卡","Run saved. You can continue it from the Tower Guardian for the next 7 days, with your character as it entered. You go back to the start of the floor you were on, with the score you had when it began. It can only be resumed once: if you leave again, the run ends.":"已儲存進度。接下來 7 天內，可從高塔守衛處繼續。角色會維持入塔時的狀態，並從目前樓層的起點及該層開始時的分數恢復。只能續玩一次，再次離開就會結束這場挑戰。","The run couldn't be saved: the server will close it with what it already had.":"這場挑戰無法儲存，伺服器會以已收到的進度結算。","To be continued...":"未完待續…","You have reached the end of the adventure... for now.":"你已完成目前開放的冒險。","Your story will continue very soon: the next stages are coming in a new update.":"後續劇情與關卡將在新版開放。","Log in to the control panel first: demos can only be watched from there.":"請先登入管理面板，才能在面板中觀看回放。","Could not load this run's demo.":"無法載入這場遊戲的回放。","Your session has expired: sign in to your account again.":"登入已逾期，請重新登入帳號。","Only characters with a 2nd job can enter the tower.":"只有已二轉的角色才能進入無限塔。","This character doesn't have any floors open yet.":"此角色尚未解鎖任何樓層。","The server doesn't have this character yet: wait a few seconds for your save to upload and try again.":"伺服器尚未收到此角色的資料。請等待幾秒，存檔同步後再試一次。","You already have a tower run in progress.":"你已有一場進行中的無限塔挑戰。","There is a new version of the game: reload the page to enter the tower.":"遊戲有新版本。請重新整理頁面後再進入無限塔。","The server is under maintenance.":"伺服器正在維護。","Your account is blocked.":"你的帳號已被封鎖。","The tower is full right now: try again in a moment.":"無限塔目前已滿，請稍後再試。","This character's job doesn't match the one the server has on record.":"此角色的職業與伺服器記錄不符。","Your stat points don't fit the Base Lv the server could verify from your runs.":"已分配的能力點數與伺服器能從遊玩紀錄驗證的基本等級不符。","Your talents don't fit the Job Lv the server could verify from your runs.":"已分配的天賦與伺服器能從遊玩紀錄驗證的職業等級不符。","Can't connect to the tower right now. Try again in a moment.":"暫時無法連線至無限塔，請稍後再試。","You have already cleared this story: you go as a helper (you keep the run rewards, but not the final reward).":"你已通過這段劇情，這次會以協助者身分出發。可以領取本場獎勵，劇情通關獎勵僅能領取一次。","clear its story first":"請先通關該段劇情","We are updating the server. We'll be back in a few minutes.":"伺服器正在更新，預計幾分鐘後恢復。","Got it":"了解","Reload":"重新整理","Leave them":"保留卡片","Decline":"拒絕","Accept":"接受","Stay":"留在這裡","Turn on":"開啟","Remove friend":"移除好友","Insults or harassment":"辱罵或騷擾","Selling for real money (RMT)":"現金交易（RMT）","Cheating":"作弊","Spam":"洗頻","Other reason":"其他原因","Ready!":"準備好了！","Specialization":"專精","Maintenance":"維護","Demo":"遊玩回放","No":"否","Reset":"重置","Choose":"選擇","every character":"所有角色","This cannot be undone.":"此操作無法復原。","Share":"分享","Add to Home Screen":"加入主畫面","Spinning kicks that sweep the horde.":"迴旋踢掃蕩成群的敵人。","A rain of shurikens.":"手裡劍之雨。","Fan-shaped bullet bursts.":"扇形子彈連射。","Night":"夜晚","Dawn":"黎明","Morning":"早晨","Midday":"正午","Afternoon":"下午","Dusk":"黃昏","Clear":"晴朗","Cloudy":"多雲","Fog":"霧","Drizzle":"毛毛雨","Rain":"雨","Heavy rain":"大雨","Storm":"暴風雨","One finger":"單指","Move (joystick)":"移動（搖桿）","Two fingers":"雙指","Rotate and zoom the camera":"旋轉與縮放鏡頭","Right click + drag":"右鍵 + 拖曳","Mouse wheel":"滑鼠滾輪","Pause / close window":"暫停／關閉視窗","Sunken Ship deck":"沉船甲板","The stairs to the lower deck have opened!":"通往下層甲板的樓梯開啟了！","Lower deck: there is no way back":"下層甲板：已無退路","Kafra Employee":"卡普拉職員","Clear the story":"通關劇情","Your gearscore":"你的裝備評分","Secret":"秘密","Hides a secret unlock":"隱藏著秘密解鎖","Beneath the Payon mountains":"斐揚山脈地底","The Izlude dungeon":"依斯魯得島海盜地洞","Byalan Temple":"柏伊亞嵐神殿","Alberta Coast":"艾爾貝塔海岸","Beneath the streets of Prontera":"普隆德拉街道地底","Outskirts of Payon":"斐揚近郊","Geffen Fields":"吉芬原野","Morroc Desert":"蘇克拉特沙漠","Cleared":"已通關","2nd job talents":"二轉天賦","min":"分","1 player":"1 名玩家","Square full · in queue":"廣場已滿 · 排隊中","The square is full: you're in the queue and will get in on your own as soon as there's room.":"廣場已滿：你正在排隊，一有空位就會自動進入。","Nobody has whispered to you yet.":"還沒有人密語你。","Tap to write to the party":"點擊以發送隊伍訊息","Press Enter to write to the party":"按 Enter 發送隊伍訊息","Players":"玩家","Quick tap":"快速點擊","Walk there":"走過去","Add":"加入","Add friend":"加為好友","In a party":"組隊中","Character name":"角色名稱","Requests":"邀請","Wants to be your friend":"想加你為好友","Create an account to have friends: do it from character select.":"建立帳號才能加好友：請在角色選擇畫面建立。","You don't have friends yet. Add someone by their character name or from their menu in the square.":"你還沒有好友。輸入角色名稱，或在廣場從對方的選單中加好友。","That character is yours.":"那是你自己的角色。","Your friend list is full.":"你的好友名單已滿。","You need an account to have friends: create one from character select.":"你需要帳號才能加好友：請在角色選擇畫面建立。","Create an account to whisper, trade, have friends and play in a party.":"建立帳號即可密語、交易、加好友與組隊遊玩。","Playing as a guest: cannot trade, have friends or play in a party.":"以訪客身分遊玩：無法交易、加好友或組隊。","Show damage by skill":"依技能顯示傷害","Show damage by player":"依玩家顯示傷害","% of party damage":"佔隊伍傷害 %","Create an account to whisper, trade and play in a party.":"建立帳號即可密語、交易與組隊遊玩。","Playing as a guest: cannot trade or play in a party.":"以訪客身分遊玩：無法交易或組隊。","Inspect":"查看","That player cannot be inspected right now.":"目前無法查看該玩家。","None":"無","You offer":"你提供","Your inventory":"你的背包","Write to the other player…":"寫訊息給對方…","Ores":"礦石","Confirmed":"已確認","nothing":"無","Refine ore":"精鍊礦石","Nothing yet.":"目前還沒有。","You have nothing of this kind you can give.":"你沒有這類可以給出的物品。","The trade was cancelled.":"交易已取消。","They declined to trade with you.":"對方拒絕與你交易。","That player is busy trading with someone else.":"該玩家正在與其他人交易。","The other player left.":"對方已離開。","The trade request expired.":"交易邀請已過期。","You no longer have everything you offer: cancel the trade.":"你已不再擁有所有提供的物品：請取消交易。","Waiting for the other player to confirm…":"等待對方確認…","You both pressed OK: press Trade to make the exchange.":"雙方都按了 OK：按「交易」完成交換。","Waiting for the other player’s OK…":"等待對方按 OK…","Add what you want to give and press OK. If anything changes, both have to press OK again.":"加入你想給的物品後按 OK。若有任何變動，雙方都需要再按一次 OK。","Offline: the message was not sent.":"離線：訊息未送出。","You are typing too fast. Wait a moment.":"你打字太快了，請稍等一下。","Your party":"你的隊伍","Go":"前往","That channel is full.":"該頻道已滿。","Wait a moment before changing channel again.":"請稍候再切換頻道。","That player is no longer in the square.":"該玩家已不在廣場。","Teleport":"傳送","Drag one finger to move · two fingers to rotate and zoom the camera · ❚❚ to pause":"單指拖曳移動 · 雙指旋轉與縮放鏡頭 · ❚❚ 暫停","WASD / arrows to move · Q/E or right click to rotate the camera · wheel to zoom (from top-down to third person) · Esc to pause · M to mute · Enter to play":"WASD／方向鍵移動 · Q/E 或右鍵旋轉鏡頭 · 滾輪縮放（從俯視到第三人稱） · Esc 暫停 · M 靜音 · Enter 開始","+: raise · Right click on +: raise 10 · −: lower":"+：提升 · 在 + 上按右鍵：提升 10 · −：降低","+: raise · −: lower":"+：提升 · −：降低","I have nothing for sale yet.":"我目前還沒有東西可以賣。","Come back later.":"晚點再來吧。","Quit run":"放棄本局","Yes, swap":"是，交換","No damage dealt yet.":"尚未造成傷害。","Other":"其他","Poison (talent)":"中毒（天賦）","Bleed (talent)":"流血（天賦）","Bleed (Deity)":"流血（神格）","Splash (talent)":"濺射（天賦）","Splash (Deity)":"濺射（神格）","Lightning (Deity)":"閃電（神格）","Bastion (Deity)":"堡壘（神格）","Scorched Earth (Deity)":"焦土（神格）","Stroke of Fortune":"幸運一擊","Bounce":"彈跳","Shards":"碎片","Stampede":"橫衝直撞","Capsule":"膠囊","Holy trail (Deity)":"神聖軌跡（神格）","+100% shield speed":"+100% 盾牌速度","Crush (talent)":"碾壓（天賦）","requires a shield":"需要盾牌","Damage on exit":"離開時傷害","Duration of the damage on exit":"離開時傷害持續時間","Reflect (talent)":"反射（天賦）","Magnet! All the loot flies to you":"磁鐵！所有戰利品飛向你","The graphics were lost. Reload the page to get them back.":"畫面資源遺失了。請重新整理頁面以恢復。","Zoom minimap out":"縮小小地圖","Zoom minimap in":"放大小地圖","Walk":"走路","Sit":"坐下","Starts with its weapon attack":"初始武器攻擊","Items":"道具","The name must be 2 to 16 letters, numbers, spaces, _ or -.":"名稱需為 2 到 16 個字元，可用字母、數字、空格、_ 或 -。","A character with that name already exists.":"已有同名角色。","Invalid item.":"無效的物品。","You don't have that card.":"你沒有那張卡片。","This card doesn't fit that kind of equipment.":"這張卡片不適用於該類裝備。","No free slots left.":"沒有空的插槽了。","Strength: +3 ATK per point on melee jobs, +1 ATK on ranged jobs.":"力量：近戰職業每點 +3 ATK，遠程職業每點 +1 ATK。","Agility: +0.67 Haste per point (40% lower cooldown on all skills at 99), and +0.2% Flee per point (gear AGI counts too).":"敏捷：每點 +0.67 冷卻縮減（99 時所有技能冷卻減少 40%），每點 +0.2% 迴避（裝備的 AGI 也算）。","Vitality: +2% max HP, +0.1 HP/s regeneration and +2% potion healing per point.":"體力：每點 +2% 最大 HP、+0.1 HP/秒回復與 +2% 藥水治療量。","Intelligence: +3 MATK per point (damage and healing of magic jobs).":"智力：每點 +3 MATK（魔法職業的傷害與治療）。","Dexterity: shorter casts (instant at 100 DEX for single target, 150 DEX for area). +0.1% double cast per point; on ranged jobs, also +3 ATK per point.":"靈巧：縮短詠唱（單體 100 DEX、範圍 150 DEX 時瞬發）。每點 +0.1% 雙重詠唱；遠程職業每點另 +3 ATK。","Luck: +0.3% crit, +0.1% Flee and +0.05% double cast per point.":"幸運：每點 +0.3% 暴擊、+0.1% 迴避與 +0.05% 雙重詠唱。","Passive":"被動","In total":"總計","Instant cast":"瞬發","upgrades":"強化","talents":"天賦","overall":"整體","Run upgrades":"本局強化","Restores 50 HP.":"恢復 50 HP。","this run only":"僅限本局","Base EXP":"基本經驗","Job EXP":"職業經驗","Size":"大小","instant":"瞬發","scale":"比例","Max level":"最高等級","Empty. Minis and MVPs drop gear during runs.":"空的。小頭目與 MVP 會在遊戲中掉落裝備。","Nothing of this kind.":"沒有這類物品。","cost":"費用","max":"最大","MATK (your skills)":"MATK（你的技能）","ATK (your skills)":"ATK（你的技能）","Skill power":"技能威力","Weapon Lv":"武器等級","Item Lv":"物品等級","Required Lv":"需求等級","RO stats: they don't count in runs yet":"RO 素質：目前尚未計入遊戲中","Select an item or a card. Double click an item to equip or unequip it. To slot a card: select it and click a highlighted piece of gear.":"選擇物品或卡片。雙擊物品可裝備或卸下。插卡：選擇卡片後點擊高亮的裝備。","empty. Equip something from the inventory with a double click.":"空的。在背包中雙擊物品來裝備。","Slots into":"插入","Select a piece of gear highlighted in pink to slot it.":"選擇以粉紅色高亮的裝備來插卡。","click to remove it":"點擊以移除","rare":"稀有","+0.3 s of freeze.":"冰凍 +0.3 秒。","Two arrows at the nearest enemy.":"對最近的敵人射出兩支箭。","Rain of arrows over a group that knocks them back.":"對一群敵人降下箭雨並擊退。","Arrow Shower, Arrow Rain, Arrow Repel and survival.":"箭雨、箭矢暴雨、衝鋒箭與生存。","Fiery Tip":"熾焰箭頭","Quick Pulse":"快速脈衝","Arcane Eye":"奧術之眼","Seasoned Hunter":"老練獵人","Gatherer":"採集者","Extra holy damage taken":"受到的神聖傷害增加","Healing per second":"每秒治療","Blessed basic attacks":"受祝福的普通攻擊","Holy Wave":"神聖波動","+healing, +damage and +area.":"+治療、+傷害與 +範圍。","Quick stab that poisons (damage over time).":"帶毒的快速刺擊（持續傷害）。","Throws a stone at the nearest enemy: a solid hit that stuns it.":"向最近的敵人丟石頭：紮實的一擊並使其暈眩。","Very powerful zeny strike on the nearest enemy.":"對最近的敵人施以非常強力的金幣打擊。","You smash your cart into an enemy: it hits everyone around it and sends them flying.":"用手推車撞向敵人：擊中周圍所有敵人並將其擊飛。","+20% damage and +8% area.":"+20% 傷害與 +8% 範圍。","Below 20% HP you plant your cart: you push back everyone around you and take -80% damage for 4 s, but move 80% slower.":"HP 低於 20% 時架起手推車：推開周圍所有敵人，4 秒內受到傷害 -80%，但移動速度降低 80%。","Spinning kick that hits and knocks back around you.":"迴旋踢，擊中並擊退周圍敵人。","Circular kick that hits and throws those around you.":"迴旋踢，擊中並拋飛周圍敵人。","Piercing shurikens.":"貫穿的手裡劍。","Fan of very fast kunai.":"極快的扇形苦無。","Giant shuriken that goes out and back, piercing everything.":"巨型手裡劍，飛出再飛回，貫穿一切。","Fire petals that fall on a group.":"落在敵群上的火焰花瓣。","Electric discharge around you.":"在你周圍釋放電流。","Three shots in a fan.":"扇形三連射。","Burst of bullets at the nearest enemy.":"對最近的敵人連射子彈。","Shotgun blast that hits everyone around you.":"霰彈槍轟擊周圍所有敵人。","You shoot in every direction around you.":"向四面八方射擊。","Grenade that explodes on a group.":"在敵群上爆炸的手榴彈。","Precise shot at the strongest enemy in sight.":"對視野內最強的敵人精準射擊。","Attack: Bow":"攻擊：弓","Attack: Gun":"攻擊：槍","Shoots a bullet at the nearest enemy.":"向最近的敵人射出一發子彈。","Attack: Huuma":"攻擊：風魔手裡劍","Throws a shuriken that pierces one enemy.":"擲出貫穿一個敵人的手裡劍。","Attack: Rod":"攻擊：法杖","Attack: Sword":"攻擊：劍","Slash at the nearest enemy.":"斬擊最近的敵人。","Attack: Two-handed weapon":"攻擊：雙手武器","Slow, powerful slash that pushes the enemy.":"緩慢而強力的斬擊，推開敵人。","Attack: Spear":"攻擊：長矛","Long thrust at the nearest enemy.":"對最近的敵人長距離突刺。","Attack: Two-handed spear":"攻擊：雙手長矛","Long, very powerful thrust.":"長距離、非常強力的突刺。","Bleeding Edges":"流血之刃","Your max HP drops to 40% and you always count as being at low HP":"最大 HP 降至 40%，且永遠視為低 HP 狀態","damage to bosses and elites":"對頭目與菁英的傷害","or":"或","one-handed sword":"單手劍","two-handed sword":"雙手劍","one-handed spear":"單手矛","two-handed spear":"雙手矛","dagger":"短劍","one-handed axe":"單手斧","two-handed axe":"雙手斧","mace":"鈍器","rod":"法杖","katar":"拳刃","knuckle":"拳套","book":"書","instrument":"樂器","whip":"鞭子","huuma shuriken":"風魔手裡劍","pistol":"手槍","rifle":"步槍","shotgun":"霰彈槍","gatling gun":"格林機槍","grenade launcher":"榴彈發射器","another weapon":"其他武器","Attack: Two-handed sword":"攻擊：雙手劍","Slow, very powerful slash.":"緩慢、非常強力的斬擊。","Attack: Two-handed axe":"攻擊：雙手斧","Attack: Dagger":"攻擊：短劍","Very fast stabs at the nearest enemy.":"對最近的敵人極快速刺擊。","Attack: Mace":"攻擊：鈍器","Blunt blow that pushes back.":"擊退敵人的鈍擊。","Attack: Axe":"攻擊：斧","Heavy axe blow that pushes the enemy back.":"沉重的斧擊，擊退敵人。","Slow, brutal axe blow that pushes the enemy back.":"緩慢而兇猛的斧擊，擊退敵人。","Attack: Fists":"攻擊：拳頭","Fast punches and kicks at close range.":"近距離快速拳腳。","projectile":"投射物","projectiles":"投射物","flame":"火焰","flames":"火焰","bolt":"發","bolts":"發","soul":"靈魂","souls":"靈魂","arrow":"箭","arrows":"箭","orb":"光球","orbs":"光球","target":"目標","targets":"目標","shuriken":"手裡劍","shurikens":"手裡劍","petal":"花瓣","petals":"花瓣","kunai":"苦無","bullet":"子彈","bullets":"子彈","burst":"連射","bursts":"連射","impact":"衝擊","impacts":"衝擊","pulse":"脈衝","pulses":"脈衝","cell":"格","cells":"格","Swift Bash":"迅捷狂擊","Stunning Blow":"暈眩打擊","Shockwave":"衝擊波","Precise Strikes":"精準打擊","Vigor":"活力","Bastion":"堡壘","You revive once per run with full HP.":"每局可滿血復活一次。","You revive once per run with full HP":"每局可滿血復活一次","Rage":"狂怒","Shock Wave":"衝擊波","Hot Blood":"熱血","Plunder":"掠奪","Double Strafe, criticals and piercing arrows.":"二連矢、暴擊與貫穿箭矢。","Arrow Shower: fill the sky with arrows.":"箭雨：讓天空佈滿箭矢。","Holy Light and Ruwach: light as a weapon.":"神聖之光與光獵：以光為武器。","Heal and blessings: endure and never fall.":"治癒術與祝福：撐住，永不倒下。","Double hits, sand, stones and loot.":"雙重攻擊、撒沙、投石與掠奪。","More zeny, more EXP and cheaper chests.":"更多金幣、更多經驗、更便宜的寶箱。","Cart Revolution: the cart as weapon and shield.":"手推車攻擊：手推車既是武器也是盾牌。","Mammonite and shouts: crushing zeny blows.":"金錢攻擊與吶喊：粉碎性的金幣打擊。","Tornado Kick and Roundhouse: kicks that sweep everything.":"迴旋踢與轉身踢：橫掃一切的踢擊。","Heel Drop and Counter Kick: stunning blows.":"砸踢與還擊踢：致暈的打擊。","Sprint, meditation and endurance.":"跑步、冥想與耐力。","Fireball":"火球","Quick Spell":"快速咒語","Frozen Heart":"冰凍之心","Spirit Wave":"靈魂波動","Arcane Mind":"奧術心智","Eagle Eye":"鷹眼","Arrow Trap":"陷阱箭","Hunting Experience":"狩獵經驗","Barrage":"彈幕","Eye of the Storm":"風暴之眼","Spreading Rain":"擴散之雨","Impaling Arrow":"穿刺之箭","Hunter-Gatherer":"狩獵採集者","Wind Walker":"行風者","Repelling Arrows":"擊退之箭","Divine Light":"神聖之光","Holy Ground":"聖地","Final Judgement":"最終審判","Greater Heal":"高級治癒術","Exorcist":"驅魔師","Appraisal":"鑑定","Bulk Buying":"大量採購","Circular Rhythm":"迴旋節奏","Eye of the Hurricane":"颶風之眼","Gale":"強風","Steel Fists":"鋼鐵之拳","Flying Kick":"飛踢","Heel Axe":"腳跟斧","Combo":"連擊","Run-up":"助跑","Stamina":"耐力","Stride":"大步","Iron Body":"鋼鐵之軀","Piercing Huuma":"貫穿風魔","Huuma Strike":"風魔打擊","Swift Thunder":"迅捷雷霆","Hand Seals":"結印","Fire Dragon":"火龍","Elemental Mastery":"元素精通","Ninja Poison":"忍者之毒","Kunai Storm":"苦無風暴","Quick Trigger":"快速扳機","Sustained Fire":"持續射擊","Slugs":"獨頭彈","Endless Desperado":"無盡亡命之徒","Grenade Volley":"榴彈齊射","Double Target":"雙重目標","Wide Bash":"廣域狂擊","Butcher's Eye":"屠夫之眼","Violence":"暴力","Parry":"格擋","Second Wind":"重振旗鼓","Fiery Sight":"熾熱巡視","Wildfire":"野火","Arcane Focus":"奧術專注","Meteor":"隕石","Frost":"冰霜","Quick Frost Diver":"快速冰凍術","Cold Mind":"冷靜心智","Eternal Winter":"永恆寒冬","Chain Lightning":"連鎖閃電","Overload":"過載","Storm Lord":"風暴之王","Hawk Eye":"鷹之眼","Steel Tips":"鋼製箭頭","Taut String":"緊繃弓弦","Charged Shot":"蓄力射擊","Concentration":"專注","Wide Rain":"寬廣之雨","Quick Rain":"快速之雨","Rhythm":"節奏","Arrow Storm":"箭矢風暴","Light Step":"輕盈步伐","Heavy Arrow":"重箭","Stunning Arrow":"暈眩之箭","True Arrow":"真實之箭","Punishment":"懲罰","Protective Blessing":"守護賜福","Grace":"恩典","Shield of Faith":"信仰之盾","Holy Alchemy":"神聖鍊金","Resurrection":"復活術","Demon Hunter":"惡魔獵人","Quick Ritual":"快速儀式","Holy Wrath":"神聖之怒","Devotion":"奉獻","Cruelty":"殘酷","Double Edge":"雙刃","Giant Slayer":"巨人殺手","Precision":"精準","Light Feet":"輕盈雙足","Sharp Sand":"銳利沙塵","Sandstorm":"沙塵暴","Vortex":"漩渦","Arcane Mark":"奧術印記","Wind Walk":"風之步","True Sight":"狙殺瞄準","Field of Arrows":"箭矢之域","Evasion":"閃避","Open Wound":"開放傷口","Aggression":"侵略","Deep Pockets":"深口袋","Pilfer":"順手牽羊","Escape":"脫逃","Trade Experience":"交易經驗","Supplier":"供應商","Good Health":"身強體健","Partner":"夥伴","Logistics":"物流","Free chest!":"免費寶箱！","Wide Sweep":"寬廣橫掃","Run Over":"碾過","Push":"推擠","Armored Cart":"裝甲手推車","Inertia":"慣性","Revolution":"迴轉","Hurricane Kick":"颶風踢","Quick Spin":"快速迴旋","Lightness":"輕盈","Dizziness":"暈眩","Typhoon":"颱風","Heel Strike":"腳跟踢","Circular Kick":"迴旋踢","Great Sweep":"大橫掃","Concussion":"腦震盪","Vital Strike":"要害打擊","Power":"力量","Celestial Axe":"天之斧","Breathing":"呼吸","Tempered Body":"淬鍊之軀","Counterblow":"反擊","Temper":"鍛鍊","Wide Counter":"廣域反擊","Meditation":"冥想","Master":"大師","Shuriken Edge":"手裡劍之刃","Piercing Shuriken":"貫穿手裡劍","More Shurikens":"更多手裡劍","Quick Throw":"快速投擲","Sharp Huuma":"銳利風魔","Quick Huuma":"快速風魔","Steady Wrist":"穩定手腕","Practice":"練習","Giant Wheel":"巨輪","Burning Petals":"燃燒花瓣","Discharge":"放電","More Petals":"更多花瓣","Electric Field":"電場","Quick Seals":"快速結印","Chakra":"查克拉","Expansion":"擴張","Ninja Exorcism":"忍者驅魔","Raigeki":"雷擊","Shadow":"暗影","Wind Feet":"疾風之足","Poisoned Kunai":"毒苦無","More Kunai":"更多苦無","Vital Point":"要害","Lethal Blow":"致命一擊","Quick Hand":"快手","Illusion":"幻影","Kunai Rain":"苦無之雨","Hollow-Point Rounds":"空尖彈","Extended Magazine":"擴充彈匣","Trigger Happy":"扳機狂","Long Burst":"長連射","Long Barrel":"長槍管","Buckshot":"鹿彈","Wide Cone":"寬錐","Deadly Desperado":"致命亡命之徒","More Bursts":"更多連射","Quick Pump":"快速上膛","Vest":"防彈背心","Tough":"強韌","Piercing Round":"穿甲彈","Scope":"瞄準鏡","Bolt Action":"栓動式","Headshot":"爆頭","Mighty Grenade":"強力榴彈","Shrapnel":"破片","Calm":"冷靜","Double Tracking":"雙重追蹤","Devastating melee blows.":"毀滅性的近戰打擊。","Guardian":"守護者","Withstands anything and provokes the horde.":"承受一切並挑釁怪物群。","The less HP, the more dangerous.":"HP 越低越危險。","Fireballs, walls and orbiting flames.":"火球、火牆與環繞火焰。","Lightning":"雷","Lightning, storms and souls.":"閃電、風暴與靈魂。","Precise arrows and crits.":"精準箭矢與暴擊。","Covers the sky with arrows.":"讓箭矢覆蓋天空。","Ranger":"遊俠","Mobility, survival and shots that push back.":"機動、生存與擊退射擊。","Offensive holy light.":"攻擊性的聖光。","Healing and resilience.":"治療與韌性。","Weakens and destroys bosses and undead.":"削弱並摧毀頭目與不死族。","Toxins that rot the horde.":"腐蝕怪物群的毒素。","Flee, blind and vanish.":"迴避、致盲與消失。","Assault":"突擊","Double hits, crits and plunder.":"雙重攻擊、暴擊與掠奪。","More zeny, more EXP, cheaper chests.":"更多金幣、更多經驗、更便宜的寶箱。","The cart as a weapon.":"手推車即武器。","Crushing zeny strikes.":"粉碎性的金幣打擊。","Spinning kicks that sweep everything.":"橫掃一切的迴旋踢。","Heel strikes and kicks that stun.":"致暈的腳跟踢與踢擊。","Discipline":"修行","Counterattacks and meditation.":"反擊與冥想。","Rain of steel.":"鋼鐵之雨。","Ninja fire and lightning.":"忍者的火與雷。","Kunai, speed and crits.":"苦無、速度與暴擊。","Fast revolver bursts.":"快速左輪連射。","Close-range destruction.":"近距離毀滅。","Precise shots and grenades.":"精準射擊與榴彈。","Buff haste":"增益冷卻縮減","Buff critical chance":"增益暴擊率","Buff Flee":"增益迴避","Buff damage":"增益傷害","Buff cast speed":"增益詠唱速度","Buff movement speed":"增益移動速度","Stronger effect":"效果更強","Extra damage taken":"額外受到傷害","Damage lost":"損失傷害","Time left to pick up the loot":"剩餘拾取戰利品時間","Time left to defeat the MVP":"剩餘擊敗 MVP 時間","Cooldown reduction":"冷卻縮減","Critical chance":"暴擊率","Poison damage":"毒傷害","Hiding time":"隱匿時間","Extra damage":"額外傷害","damage":"傷害","cooldown":"冷卻","speed":"速度","area":"範圍","projectile speed":"投射物速度","damage reduction":"傷害減免","max HP":"最大 HP","HP/s standing still":"站立時 HP/秒","pickup radius":"拾取範圍","critical":"暴擊","critical damage":"暴擊傷害","double cast":"雙重詠唱","meat healing":"肉的治療量","meat drops":"肉掉落率","damage to bosses and undead":"對頭目與不死族傷害","damage at low HP":"低 HP 時傷害","petrify chance":"石化機率","extra gem chance":"額外寶石機率","zeny":"金幣","stun chance":"暈眩機率","revive":"復活","chest discount":"寶箱折扣","You have nothing of this kind to sell.":"你沒有這類可以販賣的物品。","Slotted cards go back to your album when you sell it.":"販賣後，已插入的卡片會回到卡冊。","Angry Tarous":"憤怒的白鼠","You revive!":"你復活了！","Last Breath!":"最後一息！","a bow":"弓","a gun":"槍","Update":"更新","Lunar Leap":"月之跳躍","Full Moon":"滿月","Deafening Song":"震耳之歌","Cricket Hops":"蟋蟀跳","Screech":"尖嘯","Jelly Bounce":"果凍彈跳","Poring Rain":"波利雨","Toad Leap":"蟾蜍跳","Croak":"呱呱叫","Frogs!":"青蛙們！","Buzz":"嗡嗡","Sting":"螫刺","Jelly Waves":"果凍波","Split into Porings!":"分裂成波利！","Rabid Rush":"狂暴突進","Sewer Plague":"地下水道瘟疫","Burrow":"鑽地","Rats!":"老鼠們！","Ravenous Bite":"貪婪啃咬","Abyssal Rush":"深淵突進","Tail Slap":"甩尾","Surge":"湧浪","School of Fish!":"魚群！","Pincer Strike":"鉗擊","King's Charge":"國王衝鋒","Bubbles":"泡泡","Bubble Jet":"泡泡噴射","Iron Pincers":"鋼鐵巨鉗","My Subjects!":"我的子民們！","Lash":"鞭打","Ink Cloud":"墨雲","Tentacle Rows":"觸手列陣","Cross Lash":"交叉鞭打","Kraken’s Embrace":"海妖之擁","Abyssal Vortex":"深淵漩渦","Kraken Tentacles!":"海妖觸手！","Fury of the Deep":"深海之怒","Crush":"碾壓","Golden Charge":"黃金衝鋒","Fire Eruption":"火焰噴發","Golden Mandibles":"黃金大顎","Earthquake":"地震","Angelic Leap":"天使之躍","Judgement of Heaven":"天堂審判","Dark Orb":"黑暗球","Devil Leap":"惡魔之躍","Infernal Charge":"地獄衝鋒","Lament":"哀嘆","Ghost Touch":"幽靈之觸","Fade Away":"消逝","Saber Slash":"軍刀斬","Swell":"膨脹","Tentacles":"觸手","Roots of the Deep":"深海之根","Venom Tide":"毒液潮","Hydra Sprouts":"九頭蛇新芽","All hands, to me!":"全員，到我身邊！","Claw Swipe":"爪擊","Tiger Charge":"猛虎衝鋒","Golden Burrow":"黃金鑽地","Golden Carapace":"黃金甲殼","Swarm":"蟲群","Snapping Bites":"連續咬擊","Wolf Leap":"狼躍","Wild Rush":"狂野突進","Ground Slam":"大地重擊","Howl of the Pack":"群狼之嚎","Foxfire":"狐火","Fan of Flames":"火焰扇","The Nine Tails":"九尾","Moon Dance":"月之舞","Fire Moon":"火之月","General's Cleave":"將軍劈砍","Charge!":"衝啊！","Archers, fire!":"弓箭手，放箭！","Fall in!":"列隊！","Archers, to me!":"弓箭手，到我身邊！","Claw Swipes":"連續爪擊","Fox Fire":"狐火","Fox Step":"狐步","Nine Tails":"九尾","Sisters!":"姊妹們！","Vampire Hops":"殭屍跳","Talismans":"符咒","Embrace of Death":"死亡之擁","Great Leap":"大躍進","Awaken!":"甦醒吧！","Moon Bell":"月之鐘","Sealed Bell":"封印之鐘","Get under the bell!":"躲到鐘下！","The bell is open! Get under it":"鐘開啟了！快躲到下面","Too late! The bell stays sealed":"太遲了！鐘維持封印","Blazing Claw":"烈焰之爪","Burning Charge":"燃燒衝鋒","Tiger Pounce":"猛虎撲擊","Infernal Roar":"地獄咆哮","Ember Rain":"餘燼之雨","To me, Bigfoot!":"到我身邊，大腳熊！","Axe Cleave":"斧劈","Orcish Charge":"獸人衝鋒","Heroic Leap":"英勇之躍","Mummy's Curse":"木乃伊詛咒","Desert Sands":"沙漠之沙","Dark Storm":"黑暗風暴","Scythe":"鐮刀","Pierces 1 more enemy":"多貫穿 1 個敵人","Left stick":"左搖桿","Right stick / LB RB":"右搖桿 / LB RB","Right stick ↑↓":"右搖桿 ↑↓","D-pad / stick":"十字鍵 / 搖桿","Right click: remove a talent point or a slot's piece, +10 to a stat":"右鍵：移除天賦點數或欄位裝備，素質 +10","Select":"選擇","Toggle":"切換","Adjust":"調整","Tabs":"分頁","Talk":"交談","Pieces":"裝備","Lower":"降低","Actions":"動作","Sections":"區塊","Socket":"插槽","Insert":"插入","Filter":"篩選","Story / Set out":"劇情 / 出發","Send":"送出","Close chat":"關閉聊天","Chat":"聊天","Release":"放開","Damage to bosses and undead":"對頭目與不死族傷害","For this slot":"此欄位","Refines any item from +1 to +4":"可將任何物品從 +1 精鍊到 +4","Refines any item from +5 to +7":"可將任何物品從 +5 精鍊到 +7","Refines weapons from +8 to +10":"可將武器從 +8 精鍊到 +10","Refines armor, shields, garments, footgear and headgear from +8 to +10":"可將鎧甲、盾牌、披肩、鞋子與頭飾從 +8 精鍊到 +10","The blacksmith no longer uses it":"鐵匠已不再使用","Monster":"怪物","All your fire spells":"你所有的火系法術","Skill hit":"技能命中","Proc":"觸發","% of damage":"傷害 %","Dealing damage since":"開始造成傷害","Highest hit":"最高單擊","All your poisons":"你所有的毒","Where it comes from":"來源","Race":"種族","Element":"屬性","Undead":"不死","Formless":"無形","Brute":"動物","Plant":"植物","Insect":"昆蟲","Fish":"魚貝","Demon":"惡魔","Demi-Human":"人形","Angel":"天使","Dragon":"龍族","Small":"小型","Large":"大型","No materials. Refine ores are sold by the Kafra in the square.":"沒有材料。精鍊礦石由廣場上的卡普拉販售。","Cone strike":"錐形打擊","Cast time":"詠唱時間","Orbit speed":"環繞速度","Splash":"濺射","Space / click":"空白鍵 / 點擊","far away":"很遠","Explore the ship with Lain":"與萊恩一起探索失事輪","Talk to Lain":"與萊恩交談","Story items!":"劇情道具！","Your gear for this adventure":"這次冒險的裝備","Click or Space to continue":"點擊或按空白鍵繼續","Rescue Lain: Ghostring took her to the east room":"救出萊恩：幽靈波利把她帶到東邊的房間了","Defeat Ghostring":"擊敗幽靈波利","Go down the stairs to the hold":"走下樓梯前往船艙","Find Haru in the hold":"在船艙找到哈魯","The barrier has dissolved!":"結界消散了！","Enter Drake's room":"進入海盜之王的房間","Hey, you! Did you come to the ship too? I'm Lain.":"嘿，你！你也來這艘船嗎？我叫萊恩。","My brother Haru came to look into the rumors about this ship three days ago... and he hasn't come back.":"我哥哥哈魯三天前來調查這艘船的傳聞……到現在還沒回來。","They say at night you can hear the crew of Drake, the pirate captain. Help me find him, okay? I'll cover you.":"聽說晚上能聽到海盜船長德雷克的船員在活動。幫我找他好嗎？我會掩護你。","These are the stairs to the hold... Haru must have gone down here.":"這是通往船艙的樓梯……哈魯一定是從這裡下去的。","Do you feel that? It's suddenly freezing...":"你有感覺到嗎？突然好冷……","Another living soul on my ship... So warm. You're coming with me!":"我的船上又來了一個活生生的靈魂……好溫暖。你跟我走吧！","What...!? Let go of me!":"什麼……！？放開我！","Help me...! It's taking me to the east of the ship!":"救我……！它要把我帶到船的東邊！","You're here! Careful, it's very fast!":"你來了！小心，它非常快！","Have you come for her? Her soul is already mine... and yours will be too.":"你是來救她的嗎？她的靈魂已經是我的了……你的也會是。","Thank you! I thought I was stuck here forever...":"謝謝你！我還以為要永遠被困在這裡了……","With that ghost gone, the stairs to the hold have opened. Haru must be down there. Come on!":"那個幽靈消失後，通往船艙的樓梯開了。哈魯一定在下面。走吧！","A magic barrier... I can hear voices on the other side. That's Haru's voice!":"魔法結界……我聽到另一邊有聲音。是哈魯的聲音！","It looks like a lock mechanism. It has three triggers... they must be in the other rooms on this deck.":"看起來像是鎖的機關。有三個觸發點……一定在這層甲板的其他房間裡。","If we activate all three, the barrier should fall.":"只要啟動這三個，結界應該就會解除。","Look at the portal: it has three runes carved into it. Each one must be linked to a mechanism.":"你看那個傳送門：上面刻了三個符文。每一個應該都連著一個機關。","We need to find those three devices. They must be on the walls of the other rooms on this deck.":"我們得找到那三個裝置。應該在這層甲板其他房間的牆上。","Look, on the wall! It glows just like the portal's runes. This must be one of the devices.":"看，牆上！它跟傳送門的符文一樣在發光。這一定是其中一個裝置。","Stand on the circle for a moment and let's see if it activates.":"在圓圈上站一下，看看會不會啟動。","It worked! One of the runes on the portal has gone dark.":"成功了！傳送門上的一個符文熄滅了。","Two more to go. Let's find them.":"還剩兩個。去找吧。","This should be the last one. Let's head back to the barrier!":"這應該是最後一個了。回結界那邊吧！","Haru!":"哈魯！","Lain? No...! It's a trap, get out of here!":"萊恩？不……！這是陷阱，快離開這裡！","Yo ho ho... More souls for my crew. This gunslinger is already mine, and you'll be next.":"喲吼吼……我的船員又多了幾個靈魂。這個神槍手已經是我的了，下一個就是你。","Let my brother go, pirate!":"放了我哥哥，海盜！","If you want him... come and get him!":"想要他的話……就來搶吧！","Argh...! You've won this time, landlubbers.":"啊啊……！這次算你們贏了，旱鴨子們。","But the sea always collects its debts. We'll meet again!":"但大海總會討回欠債。我們還會再見的！","Haru! Are you okay?":"哈魯！你還好嗎？","I am now. I've been locked down here for days... I thought no one would come.":"現在好了。我被關在這裡好幾天了……還以為不會有人來。","I couldn't have done it alone.":"我一個人是辦不到的。","Thank you, really. We owe you big time.":"真的很謝謝你。我們欠你一個大人情。","You're good in a fight. If you want, we'll teach you to handle one of these: the Gunslinger's path is open to you.":"你很會打。如果你願意，我們可以教你使用這個：神槍手之路已為你敞開。","New job unlocked!":"解鎖新職業！","Story cleared":"劇情通關","Job unlocked":"職業已解鎖","You can now create it in character select.":"現在可以在角色選擇畫面建立。","Throne room":"王座廳","Captain of the Guard":"衛兵隊長","Bishop":"主教","Princess":"公主","Prince Leopold":"李奧波德王子","There you are! The heroes the whole kingdom is talking about.":"你們來了！整個王國都在談論的英雄們。","His Majesty Tristan III has invited you to his daughter's wedding to Prince Leopold, in gratitude for keeping the peace in Rune-Midgard.":"崔斯坦三世陛下邀請你們參加公主與李奧波德王子的婚禮，以感謝你們守護盧恩米德加茲的和平。","A royal wedding? I hope the food is good.":"皇家婚禮？希望食物好吃。","They say the prince arrived from a faraway kingdom only a few weeks ago... and nobody knows much about him.":"聽說王子幾週前才從遙遠的王國來到這裡……沒人知道他的底細。","Follow me. The ceremony is about to begin.":"跟我來。典禮即將開始。","Welcome, friends. Today we do not only marry my daughter: we also honor those who have protected this kingdom.":"歡迎，朋友們。今天我們不只是為女兒舉行婚禮：也要表彰守護這個王國的人。","May this union bring peace between our peoples. Bishop, whenever you are ready.":"願這段婚姻為兩國帶來和平。主教，準備好就開始吧。","We are gathered before Odin to join the Princess of Prontera and Prince Leopold.":"我們聚集於奧丁面前，見證普隆德拉公主與李奧波德王子結為連理。","Princess, do you take Prince Leopold as your husband, in peace and in war?":"公主，無論和平或戰爭，你願意嫁給李奧波德王子為妻嗎？","Yes, I do.":"我願意。","Prince Leopold, do you take the princess as your wife...?":"李奧波德王子，你願意娶公主為妻……？","I...":"我……","Your Majesty! Your Majesty! We found Prince Leopold... dead in his chambers!":"陛下！陛下！我們發現李奧波德王子……死在他的房間裡！","What...? But the prince is right here, in front of me...":"什麼……？但王子就在這裡，在我面前……","Heh, heh, heh... What a pity. The ceremony was going so well.":"呵、呵、呵……真可惜。典禮本來進行得這麼順利。","Foolish humans! One simple shapeshifting spell and you open the gates of your castle for me.":"愚蠢的人類！一個簡單的變身咒語，你們就為我打開了城門。","Father!":"父王！","Orcs! Attack! Leave no one standing!":"獸人們！進攻！一個不留！","Let me go! Father! Father...!":"放開我！父王！父王……！","The princess is coming with me. If the king wants her back, let him come for her in the land of the orcs... if he survives.":"公主跟我走。國王想要回她，就到獸人之地來找她吧……如果他能活下來的話。","My daughter... he took her...":"我的女兒……他把她帶走了……","The orcs keep coming in... Don't let them reach the throne...":"獸人不斷湧入……別讓牠們靠近王座……","So this is the hero who held off my warriors? My lord Orc Hero left me your head as a gift.":"這就是擋住我戰士們的英雄？我的主人獸人英雄把你的首級當作禮物留給我了。","You're alone. Finish him off!":"你只有一個人。解決他！","Ho, ho, ho! This is the one who held us back for a minute and a half?":"呵、呵、呵！就是這傢伙擋了我們一分半鐘？","We will tear you to pieces and hang them from the chandeliers!":"我們會把你撕成碎片，掛在吊燈上！","You're alone. Finish her off!":"你只有一個人。解決她！","Not one step further, orcs!":"不准再往前一步，獸人！","Six orcs and a big one. I'll take the ones on the left.":"六隻獸人加一隻大的。我負責左邊那些。","Now, all together!":"現在，大家一起上！","Hold on. Odin isn't done with you yet.":"撐住。奧丁還沒打算收你。","You held off a whole horde on your own. That's no small feat.":"你一個人就擋住了一整群獸人。這可不簡單。","Your Majesty, don't move. The wound is deep, but you will live.":"陛下，請別動。傷口很深，但您會活下來的。","My daughter... that monster has taken my daughter...":"我的女兒……那個怪物帶走了我的女兒……","I beg you... bring her back.":"我求你們……把她帶回來。","We will, Your Majesty. We are the kingdom's elite... and we could use someone like you.":"我們會的，陛下。我們是王國的菁英……而我們正需要像你這樣的人。","Your path is different from ours... but your courage is the same. Come with us.":"你的路與我們不同……但你的勇氣是一樣的。跟我們來吧。","We leave for the fields of Geffen at dawn.":"我們黎明時出發前往吉芬原野。","What awaits us takes more than what you know now. It's time to take the next step.":"等待我們的挑戰，需要的比你現在所知的更多。是時候踏出下一步了。","Choose your path.":"選擇你的道路。","Job change!":"轉職！","Choose your 2nd job":"選擇你的二轉職業","Loaded Flask":"裝填藥瓶","Deadly Venom":"致命劇毒","Long Blade":"長刃","Antidote":"解毒劑","Immune to damage":"免疫傷害","+20% damage and +10% area.":"+20% 傷害與 +10% 範圍。","+20% damage, +10% area and longer cast.":"+20% 傷害、+10% 範圍並延長施放。","+1 flame, +15% damage, longer duration and shorter cast.":"+1 團火焰、+15% 傷害、延長持續時間並縮短施放。","+1 caltrop, +15% damage and longer duration.":"+1 個撒菱、+15% 傷害並延長持續時間。","caltrop":"撒菱","caltrops":"撒菱","Shadow Dance":"暗影之舞","Poison (Toxic Cloud)":"毒（毒雲）","Coated Caltrops":"塗毒撒菱","Returning":"迴返","Earth":"地","Cone":"錐形","talent":"天賦","Toxic Cloud":"毒雲","Hidden: enemies can't touch you":"隱匿中：敵人碰不到你","petrified enemies take +100% damage from any source":"石化的敵人受到任何來源的傷害 +100%","homunculus":"生命體","homunculi":"生命體","Burn (talent)":"燃燒（天賦）","Frozen Burst":"冰凍爆發","Attack: Elemental Infusion":"攻擊：屬性附加","Attack: Elemental Infusion (melee)":"攻擊：屬性附加（近戰）","Attack: Whip":"攻擊：鞭子","Magic projectile of the infused element (+75% damage; fire +1 target, ice +20% pierce chance, lightning +2 projectiles); with several infusions, combines them into a single shot with everything and more damage (+150% with two, +225% with three).":"附加屬性的魔法彈（+75% 傷害；火 +1 目標、冰 +20% 貫穿機率、雷 +2 投射物）；有多種附加時組合成一發包含全部效果且傷害更高的射擊（兩種 +150%、三種 +225%）。","Two blades at once: quick strikes on the nearest enemy.":"雙刀齊出：快速攻擊最近的敵人。","Very fast punches on the nearest enemy.":"對最近的敵人極快速出拳。","A blow with the book that pushes the enemy back.":"用書本擊退敵人的一擊。","A note that flies to the nearest enemy.":"飛向最近敵人的音符。","Long whip lash on the nearest enemy.":"對最近的敵人長鞭抽打。","Your mount: tramples enemies as you ride through them.":"你的坐騎：騎過敵人時將其踐踏。","Three thrusts in a row on the nearest enemy.":"對最近的敵人連刺三下。","You throw your spear: it pierces every enemy and returns to your hands.":"擲出長矛：貫穿所有敵人並回到手中。","When an enemy hits you, you strike back very hard (and weaker at those around it).":"敵人攻擊你時，你會猛烈反擊（並以較弱的力道打擊其周圍）。","Straight-line thrust: hits the whole row of enemies in front of you and pushes them back.":"直線突刺：擊中前方整排敵人並將其擊退。","You charge with your shield at the nearest enemy: your Peco rushes forward and hits, pushes away and may stun everyone in the line. Requires a shield.":"持盾衝向最近的敵人：大嘴鳥向前猛衝，擊中、推開並可能暈眩直線上的所有敵人。需要盾牌。","You throw your shield: it hits everything it passes through and returns to your arm. Requires a shield.":"擲出盾牌：擊中沿途所有目標並回到手臂上。需要盾牌。","Meteors fall at random on a group of enemies: each one bursts in an area and may stun.":"隕石隨機落在一群敵人身上：每顆都會範圍爆炸並可能暈眩。","A pillar of fire erupts under a group of enemies and burns them four times in a row.":"火柱從一群敵人腳下噴發，連續燃燒四次。","Huge blizzard on a group: many ice hits that push back and may freeze.":"在敵群上降下巨大暴風雪：多次冰擊，擊退並可能冰凍。","Lightning orb at the nearest enemy: heavy damage and knocks it far away. Pierces one enemy.":"對最近的敵人發射雷球：沉重傷害並將其擊飛。貫穿一個敵人。","Endless lightning over a huge area: hits many times and may blind enemies.":"在大範圍內降下無盡雷電：多次打擊並可能致盲敵人。","Rock spikes erupt under the nearest enemy and launch it into the air. Each level adds a spike.":"最近敵人的腳下冒出岩刺並將其擊飛。每級多一根尖刺。","The earth bursts into spikes under a group of enemies: five impacts that push them away.":"大地在一群敵人腳下爆出尖刺：五次衝擊將其推開。","Your falcon dives three times on a random enemy and also damages those around it.":"你的獵鷹對隨機敵人俯衝三次，也會傷害其周圍敵人。","Huge phantom arrow: pierces every enemy and knocks them far away.":"巨大的幻影之箭：貫穿所有敵人並將其遠遠擊退。","A burst of five very fast arrows at the nearest enemy.":"對最近的敵人快速連射五支箭。","You play (or dance) something awful: four pulses of dissonant notes damage nearby enemies.":"你演奏（或跳）出糟糕的東西：四次不協調音符脈衝傷害附近敵人。","You fire three spirit spheres in a row at the nearest enemy.":"對最近的敵人連續發射三顆氣彈。","Four blows in quick succession on the nearest enemy.":"對最近的敵人快速連擊四下。","A devastating finishing blow on the nearest enemy: it bursts and damages everyone around.":"對最近的敵人施以毀滅性的終結一擊：爆裂並傷害周圍所有敵人。","You focus all your ki into a single brutal punch at the strongest enemy in range.":"將全部的氣集中在一記兇猛的拳頭，打向射程內最強的敵人。","Eight slashes in an instant on the nearest enemy.":"瞬間對最近的敵人斬擊八次。","Shadow blades burst from the ground in a straight line in front of you: they damage the whole row of enemies.":"暗影之刃從你前方地面直線冒出：傷害整排敵人。","You throw a poisoned knife at the nearest enemy: it pierces one and strongly poisons.":"向最近的敵人擲出毒刀：貫穿一個敵人並造成重度中毒。","You appear behind the nearest enemy and stab it very hard.":"出現在最近敵人的背後並狠狠刺下。","You spin with your weapon three times: each turn damages and pushes away the enemies around you.":"揮舞武器旋轉三圈：每一圈都傷害並推開周圍敵人。","You throw a spinning axe that pierces every enemy and comes back.":"擲出旋轉的斧頭，貫穿所有敵人並飛回。","You grab all the loot around you at once and your greed strikes nearby enemies (they give you some zeny).":"一口氣撿起周圍所有戰利品，你的貪婪會打擊附近的敵人（並讓你獲得些許金幣）。","A rain of ore falls on a group of enemies: six rocks that hit and push them away.":"礦石雨落在一群敵人身上：六塊岩石擊中並將其推開。","A fan of solar flame in front of you: heavy fire damage to every enemy it reaches.":"在前方噴出扇形太陽之焰：對範圍內所有敵人造成沉重火焰傷害。","A spinning kick like a full moon: damages and pushes away every enemy around you.":"如滿月般的迴旋踢：傷害並推開周圍所有敵人。","You leap at the strongest enemy in range and land with a brutal kick; for a moment after landing you are immune to damage.":"跳向射程內最強的敵人並以兇猛的踢擊落地；落地後短時間內免疫傷害。","Four stars fall on random enemies and burst around them.":"四顆星星隨機落在敵人身上並在其周圍爆炸。","Spirit bolts on the nearest enemy. Each level adds one more bolt.":"對最近的敵人發射靈魂箭。每級多一發。","A gust of spirit wind on the nearest enemy: damages and pushes away those around it.":"對最近的敵人颳起一陣靈風：傷害並推開其周圍敵人。","A spirit strike on the strongest enemy in sight: stuns it.":"對視野內最強的敵人施以靈魂打擊：使其暈眩。","War Saddle":"戰鞍","Trample":"踐踏","Iron Hooves":"鐵蹄","Verve":"氣勢","War Peco":"戰鬥大嘴鳥","Spear Reach":"長矛攻擊範圍","Dueling Stance":"決鬥架勢","Duelist's Reflexes":"決鬥者反射","Cold Blood":"冷血","On the Edge":"刀鋒邊緣","Holy Hooves":"神聖之蹄","Battle Rhythm":"戰鬥節奏","Holy Trample":"神聖踐踏","Crusader's Verve":"十字軍氣勢","Cross of Light":"光之十字","Arm of Faith":"信仰之臂","Edge Strike":"邊緣打擊","Shield Light":"盾之光","Hellfire":"地獄之火","Meteor Shower":"流星雨","Fiery Skin":"熾熱皮膚","Crater":"隕石坑","Volcanic Fury":"火山之怒","More Flares":"更多火柱","Fire Mark":"火焰印記","Rain of Fire":"火雨","Heart of Ice":"冰之心","Frost Wave":"冰霜波","Constant Cold":"持續寒冷","Frost Shield":"冰霜護盾","Static Charge":"靜電","Jupiter's Thunder":"朱比特之雷","Ionization":"電離","Quick Words":"快速咒文","Lord of Thunder":"雷霆之王","Wrath of the Sky":"天空之怒","Long Eruption":"持久噴發","Heart of the Volcano":"火山之心","Wisdom":"智慧","Field Fusion":"領域融合","Sharp Spikes":"銳利尖刺","Spike Field":"尖刺領域","Stone Skin":"石膚","Quick Spikes":"快速尖刺","Tectonic Force":"地殼之力","Aftershocks":"餘震","Scholar's Step":"學者之步","Spell Memory":"法術記憶","Each time Hindsight triggers it casts two bolts.":"自動念咒每次觸發會施放兩發箭術。","Abracadabra heals and grants luck more often.":"隨機技能更常帶來治療與好運。","Erudition":"博學","Hindsight is always active: your basic attacks cast bolts without having to use the skill.":"自動念咒永久生效：普通攻擊無需使用技能即可施放箭術。","Steel Talons":"鋼鐵利爪","Swift Flight":"迅捷飛行","Hunting Falcon":"狩獵之鷹","Fire Trap":"火焰陷阱","Deep Sleep":"深度睡眠","Hunting Arrows":"狩獵之箭","Hunter's Reload":"獵人裝填","Tension":"張力","Beast Hunter":"野獸獵人","Coup de Grâce Shot":"致命射擊","Piercing Notes":"穿透音符","Quick Tempo":"快速節拍","Devoted Audience":"忠實聽眾","Symphony":"交響曲","Far-Reaching Voice":"遠達之聲","Siren Song":"海妖之歌","Loki's Whim":"洛奇的任性","War Drum":"戰鼓","Prontera March":"普隆德拉進行曲","Siegfried's Armor":"齊格菲之鎧","Mana Song":"魔力之歌","Consecration":"聖化","Quick Barrier":"快速屏障","Burning Blessing":"燃燒祝福","Wide Blessing":"廣域祝福","Quick Liturgy":"快速禮拜","More Crosses":"更多十字","Long Imposition":"持久祈福","Constant Blessing":"恆常祝福","More Spheres":"更多氣彈","Swift Orbit":"迅捷環繞","Ki Focus":"氣之專注","Ki Finger":"氣指","Sphere Barrage":"氣彈彈幕","Absorption":"吸收","Relentless Fist":"無情之拳","Unleashed Spirit":"解放之魂","Hidden Strike":"隱藏一擊","Asura's Blow":"阿修羅之擊","Asura Wave":"阿修羅波動","Sonic Edge":"音速之刃","Sonic Stun":"音速暈眩","Deadly Blow":"致命打擊","Shadow Fangs":"暗影之牙","Paralysis":"麻痺","Toxic Strike":"劇毒打擊","Invisible Strike":"隱形打擊","Eye in the Shadow":"暗影之眼","Knife Fan":"飛刀扇","Blade Venom":"刃之毒","Rogue's Edge":"流氓之刃","Precise Stab":"精準刺擊","Always Behind":"永遠在背後","Blow to the Neck":"頸部一擊","Sand in the Eyes":"沙入眼","Professional Thief":"職業盜賊","Two at Once":"一次兩個","Humiliation":"羞辱","Tough Nut":"硬骨頭","Greedy Strike":"貪婪打擊","Golden Hand":"黃金之手","Rogue's Luck":"流氓之運","Nimble Fingers":"靈巧手指","Paint and Run":"塗了就跑","Ruffian":"惡棍","Steel Whirlwind":"鋼鐵旋風","Crushing Blow":"粉碎打擊","Steel Tornado":"鋼鐵龍捲","Giant-Slaying Edge":"屠巨之刃","Quick Sharpening":"快速磨刀","Hammer's Weight":"重錘之重","Seismic Wave":"地震波","Forge Fire":"鍛造之火","Always More":"永遠更多","Orichalcum Rain":"奧里哈鋼之雨","Concentrated Acid":"濃縮強酸","Corrosion":"腐蝕","Rubber Gloves":"橡膠手套","Acid Splash":"強酸飛濺","Formula":"配方","Chemical Fire":"化學之火","Slow Burn":"慢燃","Volatile Mix":"揮發混合物","Acid Bomb":"強酸炸彈","Fierce Homunculus":"兇猛生命體","Creation":"創造","Second Homunculus":"第二隻生命體","Bond":"羈絆","Research":"研究","Voracious Roots":"貪食之根","Firm Roots":"穩固之根","Carnivorous Garden":"食人花園","Concentrated Potion":"濃縮藥水","Bursting Flask":"爆裂藥瓶","Blessing of the Sun":"太陽的祝福","Long Day":"漫長白晝","Midday Sun":"正午之陽","Zenith":"天頂","Blessing of the Moon":"月亮的祝福","Lunar Orbit":"月之軌道","Quick Phases":"快速月相","Moon Kick":"月之踢","Moonfall":"月落","Blessing of the Stars":"星星的祝福","Starfall":"星落","Star Crater":"星之隕坑","Stardust":"星塵","Constellation":"星座","Long Union":"持久融合","Alignment":"連線","Falling Sky":"天塌","Soul Echo":"靈魂迴響","Watchful Spirit":"警覺之魂","Soul Thorns":"靈魂之棘","Steadfast Spirit":"堅定之魂","Agile Spirit":"敏捷之魂","Soul Counter":"靈魂反擊","Soul Drain: each monster you kill with Soul Strike gives you a charge; when you cast it again, +1 target per charge (spends them all)":"吸魂術：每用聖靈召喚擊殺一隻怪物獲得一層充能；再次施放時每層 +1 目標（全部消耗）","Cavalry":"騎兵","Duel":"決鬥","Holy Cavalry":"神聖騎兵","Fields":"領域","Scholar":"學者","Performance":"演奏","Ensemble":"合奏","Hymns":"聖歌","Liturgy":"禮拜","Spheres":"氣彈","Poisons":"毒","Trickery":"詭計","Forge":"鍛造","Ore":"礦石","Chemistry":"化學","Bioethics":"生命倫理","Pharmacy":"製藥","Sun":"太陽","Moon":"月亮","Stars":"星星","Spell":"咒術","Spirits":"靈魂","Your Peco Peco: trample, gallop, Brandish Spear and Charge Attack.":"你的大嘴鳥：踐踏、奔馳、騎乘攻擊與衝鋒攻擊。","Pierce and Spear Boomerang: thrusts and returning spears.":"連刺攻擊與投擲長矛攻擊：突刺與迴返的長矛。","Counter Attack and Spear Stab: take the hit and return it.":"反擊與長矛刺擊：承受攻擊再加以回敬。","Your Grand Peco: holy trample, Spear Quicken and Shield Charge.":"你的神聖大嘴鳥：神聖踐踏、長矛加速術與盾擊。","Holy Cross and Grand Cross: light as a weapon, at the cost of your HP.":"聖十字攻擊與聖十字審判：以 HP 為代價，以光為武器。","Shield Boomerang and Auto Guard: the shield to strike and to stay standing.":"迴旋盾擊與自動防禦：用盾牌打擊，也用盾牌屹立不倒。","Meteor Storm and Fire Pillar: the sky and the ground burn.":"隕石術與火柱攻擊：天空與大地都在燃燒。","Frost Nova and Storm Gust: freeze the whole horde.":"霜凍之術與暴風雪：冰凍整群怪物。","Jupitel Thunder and Lord of Vermilion: lightning that never stops.":"雷鳴術與怒雷強擊：永不停歇的雷電。","Volcano and Deluge: fields on the ground that empower you while you're inside.":"火元素領域與水元素領域：站在其中就能強化你的地面領域。","Earth Spike and Heaven's Drive: the earth rises against the horde.":"地震術與崩裂術：大地起身對抗怪物群。","Hindsight and Abracadabra: spells that cast themselves and whimsical magic.":"自動念咒與隨機技能：自己施放的法術與異想天開的魔法。","Blitz Beat and Detecting: your falcon hunts with you.":"閃電衝擊與獵鷹尋敵：你的獵鷹與你一同狩獵。","Arrow Vulcan and Dissonance: arrows and notes against the horde.":"奧義箭亂舞與不諧和音：用箭與音符對抗怪物群。","Lullaby and Loki's Veil: the horde sleeps or misses.":"搖籃曲與洛奇的悲鳴：讓怪物群沉睡或失手。","A Drum on the Battlefield and Invulnerable Siegfried: songs that make you stronger.":"戰鼓震天與不死神齊格弗里德：讓你更強的歌曲。","Sanctuary and Safety Wall: holy ground and barriers to stay standing.":"光耀之堂與暗之障壁：神聖之地與屏障，讓你屹立不倒。","Benedictio and Magnus Exorcismus: the light that purges the horde.":"聖母之祈福與十字驅魔攻擊：淨化怪物群的光。","Impositio Manus and Magnificat: blessings that make you stronger and faster.":"神威祈福與聖母之頌歌：讓你更強更快的祝福。","Call Spirits and Finger Offensive: your ki, in spheres that orbit and that you fire.":"蓄氣與彈指神通：你的氣化為環繞與射出的氣彈。","Chain Combo and Combo Finish: chained blows that end in a finisher.":"連環全身掌與猛龍誇強：以終結技收尾的連續攻擊。","Fury and Asura Strike: all your ki in a single blow.":"爆氣與阿修羅霸凰拳：所有的氣集中於一擊。","Sonic Blow and Grimtooth: slashes no one sees coming.":"音速投擲與無影之牙：沒人看得見的斬擊。","Enchant Poison and Venom Dust: everything you touch is poisoned.":"塗毒與病毒散撥：你碰到的一切都會中毒。","Cloaking and Venom Knife: you vanish and strike from where they can't see you.":"偽裝與毒刃：消失後從看不見的地方出手。","Back Stab and Raid: always from behind.":"背刺與潛擊：永遠從背後。","Divest Weapon and Intimidate: leave the horde without weapons or the will to fight.":"卸除武器與脅持：讓怪物群失去武器與鬥志。","Steal Coin and Graffiti: other people's zeny and dirty tricks.":"偷錢與塗鴉：別人的金幣與骯髒手段。","Axe Tornado and Axe Boomerang: the axe that spins and flies.":"旋風斧與回力斧：旋轉飛舞的斧頭。","Weapon Perfection and Rush Quake: a perfect weapon and a hammer blow that shakes the ground.":"無視體型攻擊與衝擊震地：完美的武器與震撼大地的錘擊。","Greed and Ore Discovery: loot, zeny and showers of ore.":"貪婪與尋找礦石：戰利品、金幣與礦石雨。","Acid Terror and Demonstration: corrosive acids and burning bottles.":"強酸攻擊與火煙瓶投擲：腐蝕強酸與燃燒瓶。","Call Homunculus and Summon Flora: creatures that fight by your side.":"生命體召喚與生物調撥：與你並肩作戰的生物。","Potion Pitcher and Chemical Protection: potions and protections to stay standing.":"藥水投擲與化學保護：讓你屹立不倒的藥水與防護。","Warmth of the Sun and Solar Burst: the sun that burns the horde.":"太陽的溫暖與太陽爆發：焚燒怪物群的太陽。","Full Moon Kick and New Moon Kick: kicks that sweep and that fall from the sky.":"滿月踢與新月踢：橫掃與從天而降的踢擊。","Falling Star and Union: falling stars and the power of the three celestial bodies.":"流星墜落與太陽和月亮和星星的融合：墜落的星星與三大天體之力。","Esma and Estin: the spirit as a weapon.":"艾斯麻與艾斯提：以靈魂為武器。","Estun, Kaizel and the spirit of every job: a bit of everything.":"艾斯敦、凱易哲與各職業之魂：什麼都會一點。","Kaahi and Kaupe: heal with every hit and dodge the ones that matter.":"凱阿希與凱誣僕：每次受擊都回血，並閃過關鍵的攻擊。","A knight mounted on a Peco Peco: spears and two-handed swords with long reach.":"騎乘大嘴鳥的騎士：長距離的長矛與雙手劍。","A holy warrior on his Peco: shield, faith and blows of light.":"騎著大嘴鳥的神聖戰士：盾牌、信仰與光之打擊。","Magic of mass destruction: meteors, blizzards and storms.":"大規模毀滅魔法：隕石、暴風雪與風暴。","Scholar of the elements: magic fields, earth and automatic spells.":"元素學者：魔法領域、大地與自動法術。","A hunter with a falcon and traps.":"帶著獵鷹與陷阱的獵人。","Songs and dances that empower you and bewilder the horde.":"強化你並迷惑怪物群的歌曲與舞蹈。","Healing, blessings and exorcism.":"治療、祝福與驅魔。","Fists, spirit spheres and combos all the way to Asura Strike.":"拳頭、氣彈與一路連到阿修羅霸凰拳的連擊。","Katars, poisons and strikes from the shadows.":"拳刃、毒與來自暗影的打擊。","A rogue: stabs in the back, plunder and dirty tricks.":"流氓：背刺、掠奪與骯髒手段。","A smith: stunning hammer blows and forged brute force.":"鐵匠：致暈的錘擊與鍛造出的蠻力。","Acids, fire bottles, plants and a homunculus.":"強酸、火焰瓶、植物與生命體。","The power of the sun, the moon and the stars in every kick.":"每一踢都蘊含太陽、月亮與星星之力。","Spirit spells and Ka protections.":"靈魂咒術與 Ka 系防護。","Counter":"反擊","Thorns":"荊棘","Meteors":"隕石","Bolts":"箭術","Veil":"帷幕","Deed points":"事蹟點數","Maxed":"已滿級","Unlocked":"已解鎖","A skill or item shows up with priority in the rolls (×3) for the rest of the run.":"在本局剩餘時間內，某個技能或物品會優先出現在抽選中（×3）。","Already has priority.":"已經是優先。","Focus: this skill will show up with priority for the rest of the run.":"專注：此技能將在本局剩餘時間內優先出現。","Fierce Charge":"兇猛衝鋒","Tempered Shield":"淬鍊之盾","Mimicry":"模仿","Divine Favor":"神之恩惠","Purifying Light":"淨化之光","Anathema":"咒逐","Purger":"淨化者","Chained Fists":"連鎖之拳","Combat Rhythm":"戰鬥節奏","Distilled Poison":"蒸餾毒素","Shadow Step":"影步","Sticky Fingers":"黏手指","Wind Spiral":"風之螺旋","Cutting Wind":"切割之風","Two-Hand Sword":"雙手劍","Greatsword Edge":"巨劍之刃","Launch":"擊飛","Strike":"打擊","Improved Bowling Bash":"強化怪物互擊","Grand Peco":"神聖大嘴鳥","Focus: it will show up with priority in chests for the rest of the run.":"專注：它將在本局剩餘時間內優先出現在寶箱中。","Riding puts you on your Peco Peco: trample, gallop, Brandish Spear and Charge Attack.":"騎乘術讓你騎上大嘴鳥：踐踏、奔馳、騎乘攻擊與衝鋒攻擊。","Counter Attack and Bowling Bash: the two-handed sword, to take the hit and return it.":"反擊與怪物互擊：用雙手劍承受攻擊再加以回敬。","Grand Peco puts you on your Peco: holy trample, Spear Quicken and Shield Charge.":"神聖大嘴鳥讓你騎上大嘴鳥：神聖踐踏、長矛加速術與盾擊。","Away from the square":"不在廣場","Make leader":"設為隊長","Kick":"踢出","Leader":"隊長","Leave party":"離開隊伍","You are in a party. Write in the Party channel to talk to it.":"你在隊伍中。在「隊伍」頻道發言即可與隊友交談。","Invite to party":"邀請組隊","The party invitation has expired.":"組隊邀請已過期。","The party is full.":"隊伍已滿。","Only the leader can invite to the party.":"只有隊長能邀請組隊。","You were kicked from the party.":"你被踢出隊伍了。","That party no longer exists.":"該隊伍已不存在。","Ready":"準備好了","Waiting…":"等待中…","Cancel departure":"取消出發","Waiting for the party to be ready…":"等待隊伍準備就緒…","Not everyone said they were ready in time: the party stays.":"不是所有人都及時準備好：隊伍留下。","The party departure was cancelled.":"隊伍出發已取消。","There are too many party runs on the server right now: try heading out again in a while.":"目前伺服器上的組隊遊戲太多，請稍後再出發。","story":"劇情","Lost the connection with the party. Reconnecting…":"與隊伍的連線中斷，重新連線中…","In the party run":"在隊伍遊戲中","The leader left the run.":"隊長離開了本局。","Cannot connect to the party: you are playing alone.":"無法連線到隊伍：你正在單人遊玩。","Choosing a card":"正在選卡","Down: a party member can revive you":"倒地：隊友可以復活你","Down":"倒地","Choosing…":"選擇中…","Waiting for the party":"等待隊伍","Starting in":"開始倒數","Nobody in the party has dealt damage yet.":"隊伍中還沒有人造成傷害。","Party total":"隊伍總計","You":"你","Party member":"隊友","Welcome to your first official mission. I am Selene, of the Prontera elite: today you answer to me.":"歡迎來到你的第一個正式任務。我是普隆德拉菁英的瑟蕾娜：今天你聽我的指揮。","For weeks the fishermen of Alberta have seen lights in the sunken ship at night, and two of their boats have not come back to port.":"這幾週，艾爾貝塔的漁夫們夜裡都看到沉船上有燈光，還有兩艘漁船沒有回港。","They say songs and boarding orders can be heard inside the hull. Captain Drake's crew has lain at the bottom of the sea for centuries... and something is waking them up.":"據說船身裡能聽到歌聲和登船的號令。德雷克船長的船員已經在海底躺了好幾個世紀……而有東西正在喚醒他們。","Your task is to go in, find out what is going on and come back to report. No heroics: if you see something beyond you, get out.":"你的任務是進去查明發生了什麼事，然後回來報告。別逞英雄：看到應付不了的東西就撤退。","A few fish and rotten skeletons? This is a piece of cake.":"幾條魚和腐爛的骷髏？小事一樁。","I'll wait for you inside... if you ever get there! I'm going ahead!":"我在裡面等你……如果你到得了的話！我先走啦！","Haru, wait! Don't go in alone!":"哈魯，等等！別一個人進去！","Always the same... My brother has to be first at everything.":"每次都這樣……我哥什麼都要搶第一。","Go after him before he gets into trouble. And bring him back in one piece.":"在他惹麻煩之前追上他。然後把他完整地帶回來。","Let's go. We'll find him before he does something stupid.":"走吧。在他做出傻事之前找到他。","It's so dark in here... Haru? Haru!":"這裡好暗……哈魯？哈魯！","Nothing. Knowing him, he went straight to the deepest part of the ship. Let's look for the stairs to the hold.":"沒回應。照他的個性，一定直接衝到船的最深處了。我們去找通往船艙的樓梯吧。","Look for Haru: find the stairs to the hold":"尋找哈魯：找到通往船艙的樓梯","There are the stairs to the hold. If Haru came this way, he must be down there already.":"通往船艙的樓梯在那裡。如果哈魯走這條路，他應該已經在下面了。","...Do you feel that? It's suddenly freezing cold.":"……你有感覺到嗎？突然冷得要命。","Aaaaah!! Help...! Get me out of here!":"啊啊啊啊！！救命……！把我弄出去！","It's all dark...! Can anyone hear me?!":"一片漆黑……！有人聽得到嗎？！","The ship has awakened...":"這艘船甦醒了……","Look for Lain: her screams came from the east of the ship":"尋找萊恩：她的尖叫聲來自船的東邊","It's linked to some mechanisms. There must be three, on the walls of the other rooms on this deck.":"它連著一些機關。應該有三個，在這層甲板其他房間的牆上。","Ho, ho, ho... This loudmouthed rookie walked into my cabin as if he owned it. He'll do nicely for my crew... and you'll be next.":"呵、呵、呵……這個大嘴巴菜鳥像是自己家一樣走進我的船長室。他很適合當我的船員……下一個就是你。","Now I am... I charged right in and that pirate locked me up before I knew it.":"現在好了……我直接衝進去，結果還沒反應過來就被那個海盜關起來了。","You're so stubborn. Let's get out of here before he comes back.":"你真是死腦筋。趁他回來之前快離開這裡。","At last! I was starting to think about going in myself. What happened in there?":"終於！我正開始考慮要不要自己進去。裡面發生了什麼事？","A ghost, Ghostring, caught me by the stairs to the hold. And below, Captain Drake had Haru locked up in his cabin.":"一個叫幽靈波利的鬼魂在通往船艙的樓梯旁抓住了我。而在下面，德雷克船長把哈魯關在他的船長室。","Drake has awakened, and his crew with him. But we gave him a good beating: he fled through a portal.":"德雷克甦醒了，他的船員也是。不過我們狠狠教訓了他一頓：他從傳送門逃走了。","Haru. I told you no heroics. You went in alone, without waiting for anyone, and it nearly cost all of you dearly.":"哈魯。我說過別逞英雄。你一個人跑進去，沒等任何人，差點讓你們全部付出慘痛代價。","A member of the elite doesn't rush ahead to show off: they protect their own. You'll have time to think about it in Prontera... cleaning the Peco Peco stables.":"菁英不會為了出風頭而衝在前面：而是保護自己的同伴。你回普隆德拉後有的是時間反省……一邊清理大嘴鳥的馬廄。","...Yes, ma'am.":"……是，長官。","You, on the other hand, did an excellent job: you kept calm, rescued your companions and found out what was going on.":"而你表現得非常出色：保持冷靜、救出了同伴，還查明了狀況。","But this isn't over: Drake has fled, and it won't be long before he gathers his crew again. We'll have to hunt him down in his lair, deep in the ship.":"但事情還沒結束：德雷克逃走了，用不了多久他就會再次召集船員。我們得到船的深處，在他的巢穴裡追捕他。","I'll report to Prontera. When you're ready, you'll go back for him. For now, here: you've earned this.":"我會向普隆德拉報告。等你準備好，就回去找他。現在，拿著：這是你應得的。","Thank you for everything. We wouldn't have made it without you.":"謝謝你做的一切。沒有你我們辦不到。","Ah! Did you hear that? A creak... right above us.":"啊！你聽到了嗎？吱嘎聲……就在我們頭頂上。","It must just be the hull timbers... This ship gives me the creeps.":"應該只是船身木板……這艘船讓我毛骨悚然。","Crates and rotten nets: this is where they kept the supplies.":"箱子和爛掉的漁網：這裡是存放補給的地方。","Haru, if you're hiding to scare me, it's not funny at all.":"哈魯，如果你躲起來想嚇我，一點都不好笑。","Look, footprints in the dust... Boots, and recent. They must be Haru's.":"你看，灰塵上有腳印……是靴子，而且是新的。一定是哈魯的。","He's been here, but he's gone. Always in such a hurry.":"他來過這裡，但已經走了。總是這麼急。","What was that bang?! It sounded like a door slamming shut...":"剛剛那聲巨響是什麼？！聽起來像是門被用力關上……","There's nobody here. Let's keep going, but stay close to me.":"這裡沒人。繼續前進吧，但要待在我身邊。","Hammocks... this is where the crew slept.":"吊床……這是船員睡覺的地方。","Centuries under water and they're still hanging, as if someone were coming back to use them.":"在水底沉了好幾個世紀，它們還掛著，好像有人會回來使用。","An open, empty chest. If Haru did this, he's in for it when we find him.":"一個打開的空箱子。如果是哈魯做的，等我們找到他他就慘了。","This was the officers' mess. There are plates still laid out...":"這裡是軍官的餐廳。盤子都還擺著……","...and the food is fresh. Who has been eating here?":"……而且食物是新鮮的。是誰在這裡吃東西？","This corridor leads to the east of the ship. There's an icy draft coming from there...":"這條走廊通往船的東邊。那邊吹來一陣冰冷的風……","Better not split up. Haru must have gone towards the stairs.":"最好別分開。哈魯應該是往樓梯那邊去了。","Sunken Ship 1F":"失事輪 1樓","Sunken Ship 2F":"失事輪 2樓","Sunken Ship Island":"沉船附近島嶼","See that, Lain? Invited by the king himself! After the ship business, we're famous.":"看到了嗎，萊恩？國王親自邀請耶！經過沉船那件事，我們出名了。","Famous for walking into a pirate's cabin on your own... Behave today, it's a royal wedding.":"因為自己一個人走進海盜的船長室而出名……今天給我規矩點，這是皇家婚禮。","Good to see you. Selene says she told the king himself about the ship.":"很高興見到你。瑟蕾娜說她親自向國王報告了沉船的事。","Relax. What could go wrong at a wedding?":"放輕鬆。婚禮上能出什麼差錯？","If the prince is dead... then who is that?":"如果王子死了……那這個人是誰？","Haru, don't move. That icy air... it's like on the ship.":"哈魯，別動。這股冰冷的空氣……就跟船上一樣。","I knew it! That prince smelled of orc from the door!":"我就知道！那個王子從門口就有獸人的味道！","Look out! He's going for the king!":"小心！他要攻擊國王！","You're still standing! The others... they're not moving.":"你還站著！其他人……都不動了。","Those orcs will pay for this. Lain, cover the left. Don't let them reach the king!":"那些獸人會付出代價的。萊恩，掩護左邊。別讓牠們靠近國王！","Ugh... How strong is this thing...?":"唔……這傢伙到底有多強……？","Haru! Get up, please!":"哈魯！快起來，拜託！","Three whelps and no grown-up to protect them. Finish them!":"三隻小鬼，沒有大人保護。解決他們！","It's the Prontera elite! And Selene is with them!":"是普隆德拉菁英！瑟蕾娜也在！","Selene! We're over here!":"瑟蕾娜！我們在這裡！","You held out far longer than anyone expected. Stay behind us: it's our turn now.":"你們撐得比任何人預期的都久。待在我們後面：現在輪到我們了。","You held out against a whole horde. That's no small thing.":"你們擋住了一整群獸人。這可不簡單。","We saw everything, Your Majesty. Orc Hero took her... he said to the lands of the orcs.":"我們都看到了，陛下。獸人英雄把她帶走了……他說要去獸人之地。","We will, Your Majesty. You have my word.":"我們會的，陛下。我向您保證。","I'm not going to sit around doing nothing. You neither, right?":"我才不要坐著什麼都不做。你也是吧？","Let the healers take care of the king. Outside: we have a lot to plan.":"讓治療師照顧國王。到外面去：我們有很多事要計畫。","The king is safe with the church healers. But the princess is still in Orc Hero's grasp.":"國王在教會治療師的照顧下很安全。但公主仍在獸人英雄手中。","We gave His Majesty our word: we'll bring her back. And there's no time to lose.":"我們向陛下保證過：會把她帶回來。沒時間可浪費了。","The orcs didn't come out of nowhere. Their tribes hide in the fields of Geffen: that's where we'll start looking for her.":"獸人不是憑空冒出來的。牠們的部族藏在吉芬原野：我們就從那裡開始找她。","We leave for Geffen at dawn. We have to investigate before they take her any further.":"我們黎明時出發前往吉芬。必須在牠們把她帶得更遠之前展開調查。","We're coming too! This time I won't rush ahead... much.":"我們也去！這次我不會衝在前面了……大概。","Haru... Selene, count us in. We owe this kingdom a lot.":"哈魯……瑟蕾娜，算我們一份。我們欠這個王國很多。","I was counting on it. And on you too: today you showed what you're capable of.":"我就知道你們會這麼說。也包括你：今天你證明了自己的實力。","What awaits us in Geffen calls for more than you know now. It's time to take the next step.":"吉芬等待我們的挑戰，需要的比你現在所知的更多。是時候踏出下一步了。","And take this: the Prontera patrol badge. In Geffen it will open every door.":"還有這個拿去：普隆德拉巡邏隊徽章。在吉芬它能打開每一扇門。","See you at dawn, on the road to Geffen!":"黎明時在前往吉芬的路上見！","Reward!":"獎勵！","Choose an item":"選擇一件物品","Pet egg":"寵物蛋","It doesn’t evolve.":"不會進化。","It has no accessory.":"牠沒有配件。","It already has it.":"牠已經有了。","Special dye: unlocked later on":"特殊染料：之後解鎖","Unlocked in the Endless Tower (coming soon)":"在魔物終結塔解鎖（即將推出）","Unlocked by beating Shadow Niff (coming soon)":"擊敗影之妮芙後解鎖（即將推出）","Dye unlocked":"染料已解鎖","Special dye for all your characters. Put it on at the Stylist in the plaza.":"所有角色都能使用的特殊染料。到廣場的造型師那裡換上。","All done! Looks great on you.":"完成！很適合你。","Upload this device’s characters to the account":"將此裝置的角色上傳到帳號","What is your favorite city?":"你最喜歡的城市是？","What is your favorite monster?":"你最喜歡的怪物是？","Which MVP do you respect the most?":"你最尊敬哪個 MVP？","Which job do you like best?":"你最喜歡哪個職業？","Which pet would you keep?":"你會養哪隻寵物？","Choose…":"請選擇…","Security questions":"安全問題","Answer the 5 security questions.":"回答 5 個安全問題。","Answer your account’s 5 security questions. If they’re right, you can set a new password. You have 3 tries a week.":"回答帳號的 5 個安全問題。答對即可設定新密碼。每週有 3 次機會。","Check answers":"檢查答案","Correct answers. Choose your new password.":"答案正確。請選擇新密碼。","New password":"新密碼","Save and sign in":"儲存並登入","Wrong username or answers. 1 try left this week.":"帳號或答案錯誤。本週還剩 1 次機會。","Wrong username or answers. No tries left this week.":"帳號或答案錯誤。本週已無機會。","Too much time has passed. Answer the questions again.":"時間過久。請重新回答問題。","Account":"帳號","Save questions":"儲存問題","Security questions saved. Remember your answers: they’re the only way to recover the account.":"安全問題已儲存。請記住你的答案：這是找回帳號的唯一方法。","Protect your account":"保護你的帳號","(optional)":"（選填）","Set up questions so I can recover my password if I forget it":"設定問題，以便忘記密碼時找回","Without an email, if you forget your password these 5 answers are the only way to recover the account. Remember them or write them down somewhere safe.":"帳號未綁定電子郵件，忘記密碼時，只能用這 5 個答案找回帳號。請牢記答案，或將它們記在安全的地方。","Without security questions, if you lose your password the account can’t be recovered. This decision is permanent: you won’t be able to add them later.":"沒有安全問題的話，遺失密碼就無法找回帳號。此決定是永久的：之後無法再新增。","Create the account without security questions? This is permanent: you won’t be able to add them later and, if you lose your password, the account can’t be recovered.":"要在沒有安全問題的情況下建立帳號嗎？這是永久的：之後無法再新增，遺失密碼時也無法找回帳號。","You can now set up security questions for your account, if you want.":"如果你願意，現在可以為帳號設定安全問題。","You recovered your account with the answers the game team gave you. If you want, choose your own now: ours will stop working.":"你用遊戲團隊提供的答案找回了帳號。如果你願意，現在可以設定自己的答案：我們提供的將會失效。","or pick ones you know you’ll remember.":"或選擇你確定記得住的。","They’re optional, but":"這是選填的，但","if you don’t want them, it’s forever":"如果你不要，就是永久的",": we won’t offer them again and, if you lose your password, the account can’t be recovered.":"：我們不會再提供，遺失密碼時也無法找回帳號。","I don’t want questions":"我不要安全問題","Are you sure you don’t want security questions? This is permanent: we won’t offer them again and, if you lose your password, the account can’t be recovered.":"確定不要安全問題嗎？這是永久的：我們不會再提供，遺失密碼時也無法找回帳號。","You turned down security questions: this account can’t have them.":"你拒絕了安全問題：此帳號無法再設定。","The game doesn’t ask for an email. If you ever forget your password,":"遊戲不會要求電子郵件。如果你哪天忘記密碼，","the only way to recover the account":"找回帳號的唯一方法","is to answer these 5 questions exactly as you choose them now.":"就是完全照你現在選擇的方式回答這 5 個問題。","Write your answers down somewhere safe":"把答案寫在安全的地方","From guest mode your characters, gear and cards are uploaded, but not Kafra Points or ores; what you upload can be used, not traded.":"從訪客模式會上傳你的角色、裝備與卡片，但不包括卡普拉點數與礦石；上傳的物品可以使用，但不能交易。","Accounts are coming very soon. For now, play as a guest.":"帳號功能即將推出。目前請以訪客身分遊玩。","Usernames are 3–16 letters, numbers or _.":"帳號需為 3–16 個字母、數字或 _。","The password needs at least 8 characters.":"密碼至少需要 8 個字元。","The passwords don’t match.":"兩次輸入的密碼不一致。","Enter your username and password.":"請輸入帳號與密碼。","Could not connect to the server.":"無法連線到伺服器。","News coming soon.":"最新消息即將推出。","The game could not load. Press to try again.":"遊戲無法載入。按此重試。","Open as a separate page ↗":"在獨立頁面開啟 ↗","RO Survivors is an unofficial, free fan game with no ads or purchases. It is not affiliated with, sponsored or endorsed by Gravity Co., Ltd. or Lee Myoung-Jin (studio DTDS). Ragnarok Online and its characters, graphics and music belong to their respective owners. © Gravity Co., Ltd. & Lee Myoung-Jin (studio DTDS).":"RO Survivors 是免費的非官方同人遊戲，沒有廣告或付費購買項目。本遊戲與 Gravity Co., Ltd. 或 Lee Myoung-Jin（studio DTDS）無隸屬關係，也未獲其贊助或背書。《仙境傳說》及其角色、圖像與音樂均歸各權利人所有。© Gravity Co., Ltd. & Lee Myoung-Jin（studio DTDS）。","That name is not allowed.":"不允許使用該名稱。","Chinese messages from General and Trade go to this channel; you only see them with it turned on":"「一般」與「交易」中的中文訊息會移到這個頻道；開啟後才看得到","Chat channels":"聊天頻道","Players in your plaza channel (also in speech bubbles)":"你所在廣場分流的玩家（也會顯示在對話泡泡中）","All plaza channels":"廣場所有分流","Buying and selling, from all plaza channels":"買賣交易，來自廣場所有分流","You need an account to write in the chat: create one from the character select screen.":"你需要帳號才能在聊天中發言：請在角色選擇畫面建立。","Check again":"再檢查一次","Checking…":"檢查中…","Still working on it":"仍在處理中","The server will be updated.":"伺服器即將更新。","The server is down for maintenance for an update. Please come back in a few minutes.":"伺服器正在維護更新，請稍後再回來。","Under maintenance":"維護中","Maintenance starts in 1 minute: finish what you are doing.":"維護將在 1 分鐘後開始，請儘快結束目前的操作。","That name is already taken by another player.":"該名稱已被其他玩家使用。","You need an account to play in a party: create one from the character select screen.":"你需要帳號才能組隊遊玩：請在角色選擇畫面建立。","That username is already taken.":"該帳號名稱已被使用。","Wrong username or password.":"帳號或密碼錯誤。","Too many attempts. Wait a few minutes.":"嘗試次數過多。請等幾分鐘。","The save is too large to upload.":"存檔過大，無法上傳。","Your account was used on another device. Its most recent save has been loaded.":"你的帳號曾在其他裝置上使用。已載入最新的遊戲進度。","The save on this device was missing part of your account, so it was not uploaded. The server save has been loaded.":"此裝置的存檔缺少帳號的部分資料，因此未上傳。已載入伺服器存檔。","This browser could not store your save (it may be out of space). To protect your account, nothing you do here will be uploaded to the server: free up some space or play from another browser, then reopen the game.":"此瀏覽器無法儲存你的存檔（可能空間不足）。為保護你的帳號，你在這裡的任何操作都不會上傳到伺服器：請釋放一些空間或改用其他瀏覽器，再重新開啟遊戲。","Your session has expired. Please sign in again.":"你的登入已過期。請重新登入。","Your account is permanently banned.":"你的帳號已被永久停權。","You are muted in chat.":"你已被禁言。","Notice":"通知","Your mute has been lifted: you can write in chat again.":"你的禁言已解除：可以再次在聊天中發言。","Your account suspension has been lifted.":"你的帳號停權已解除。","permanently":"永久","for 1 day":"1 天","insults or harassment":"辱罵或騷擾","real-money trading":"現金交易","cheating":"作弊","breaking the rules":"違反規則","You need an account to trade: create one from the character select screen.":"你需要帳號才能交易：請在角色選擇畫面建立。","That player is a guest and can't trade.":"該玩家是訪客，無法交易。","You can't trade with your own account.":"你無法與自己的帳號交易。","The trade didn't go through: someone no longer had something they offered.":"交易未完成：有人已不再擁有其提供的物品。","Solar Fan":"太陽之扇","Feline Agility":"貓之敏捷","Healing Waters":"治癒之水","Focused Soul":"專注之魂","Marked Soul":"標記之魂","Menace":"威脅","Ka Armor":"Ka 之鎧","Stolen Armor":"偷來的鎧甲","Longbow":"長弓","Wide Raid":"廣域潛擊","Final Raid":"最終潛擊","Killer":"殺手","Ultimate Asura":"終極阿修羅","Avarice":"貪婪","Bulwark":"壁壘","Flock":"鳥群","Holy Barding":"神聖馬鎧","Crushing Sweep":"粉碎橫掃","Well Hidden":"藏得很好","Full Pouch":"滿袋","Empowered Bolts":"強化箭術","Improved Brandish Spear":"強化騎乘攻擊","Strong Arm":"強壯手臂","Long Arms":"長臂","Good Luck":"好運","Calluses":"繭","Heat":"熱度","Wide Field":"寬廣領域","Minefield":"地雷區","Eternal Chant":"永恆詠唱","Long Chant":"長詠唱","Chant":"詠唱","Thorny Coating":"荊棘塗層","Thick Coating":"厚塗層","Reinforced Coating":"強化塗層","Overrunning Charge":"輾壓衝鋒","Explosive Charge":"爆炸衝鋒","Pickpocket":"扒手","Patient Hunter":"耐心的獵人","Absolute Zero":"絕對零度","Burning Puddle":"燃燒水窪","Open Sky":"開闊天空","Elbow Strike":"肘擊","Sharpened Greed":"磨利的貪婪","Scorching Pillar":"灼熱火柱","Double Combo":"雙重連擊","Comet":"彗星","Fluid Casting":"流暢詠唱","Improved Counter":"強化反擊","Crystals":"水晶","Immense Cross":"巨大十字","Greater Cross":"大十字","Crusade":"十字軍","Fine Blades":"精細刀刃","Sharp Knife":"利刃","Ka Body":"Ka 之軀","Celestial Body":"天體","Predator":"掠食者","Cave-in":"崩塌","Off-Key":"走音","Disarm":"繳械","Rend":"撕裂","Dazzle":"炫目","Awakening":"覺醒","Total Plunder":"全面掠奪","Distillate":"蒸餾物","Detonator":"引爆器","Double Sonic Blow":"雙重音速投擲","Double Spell":"雙重咒語","Double Cross":"雙重十字","Two Shields":"雙盾","Two Flasks":"雙瓶","Two Axes":"雙斧","Two Spears":"雙矛","Duelist":"決鬥者","Lasting Effect":"持久效果","Elementalist":"元素師","Holy Charge":"神聖衝鋒","Deadly Ambush":"致命伏擊","Link":"連結","Vines":"藤蔓","Rehearsal":"排練","Protective Frost":"守護冰霜","Stunning Shield":"暈眩之盾","Blessed Shield":"受祝福之盾","Unbreakable Shield":"不破之盾","Heavy Shield":"重盾","Swift Shield":"迅捷之盾","Dense Spheres":"密集氣彈","Eternal Spheres":"永恆氣彈","Twin Spheres":"雙生氣彈","Piercing Spheres":"貫穿氣彈","Ultimate Esma":"終極艾斯麻","Double Esma":"雙重艾斯麻","Empowered Esma":"強化艾斯麻","Spurs":"馬刺","Stigma":"聖痕","Double Thrust":"雙重突刺","Shooting Star":"流星","Heavy Stars":"沉重之星","Refrain":"副歌","Lasting Estun":"持久艾斯敦","Greater Exorcism":"大驅魔","Explosives":"炸藥","Fault Line":"斷層線","Steadfast Faith":"堅定信仰","Tireless Faith":"不倦信仰","Holy Fervor":"神聖熱忱","Long Reach":"長距離","Serrated Edge":"鋸齒之刃","Swift Edge":"迅捷之刃","Spectral Arrow":"幽靈之箭","Giant Arrow":"巨箭","Singing Arrows":"歌唱之箭","Flash":"閃光","Master Forge":"鍛造大師","Blend In":"融入","Pent-up Fury":"壓抑之怒","Long Fury":"持久爆氣","Holy Gallop":"神聖奔馳","Full Gallop":"全速奔馳","Gallop":"奔馳","Wide Spin":"寬廣迴旋","Chained Blows":"連鎖打擊","Divine Grace":"神聖恩典","Renewed Grace":"恩典再臨","Great Grimoire":"大魔導書","Cracks":"裂痕","High Guard":"高架防禦","Steady Guard":"穩定防禦","Lunar Guard":"月之防禦","Throwing Axe":"投擲斧","Heavy Axes":"重斧","Solar Halo":"太陽光環","Treacherous Wound":"奸詐之傷","Sturdy Smith":"強壯的鐵匠","Perpetual Ice":"永凍之冰","Brittle Ice":"易碎之冰","Coated Blade":"塗層之刃","Garden":"花園","Phantom Impact":"幻影衝擊","Lunar Impact":"月之衝擊","Defenseless":"毫無防備","Immunity":"免疫","Killer Instinct":"殺手本能","Oath":"誓言","Full Ka":"完全 Ka","Long Kaahi":"持久凱阿希","Deep Kaahi":"深度凱阿希","Triple Kaupe":"三重凱誣僕","Recovered Ki":"氣之恢復","Sustained Ki":"持續之氣","Swift Ki":"迅捷之氣","Laboratory":"實驗室","Mounted Lancer":"騎乘槍兵","Throwing Spear":"投擲長矛","Blessed Spear":"受祝福之矛","Heavy Spear":"重矛","Brutal Throw":"兇猛投擲","Lasting Bond":"持久羈絆","Close Reading":"細讀","Perfect Liturgy":"完美禮拜","Flare":"閃焰","Quagmire":"泥沼","Waxing Moon":"盈月","New Moon":"新月","Master Trapper":"陷阱大師","Fickle Magic":"善變魔法","Magnificence":"壯麗","Left Hand":"左手","Long Fingers":"長手指","Holy Hands":"神聖之手","Long March":"長征","Tide":"潮汐","Divine Hammer":"神聖之錘","Blessed Mace":"受祝福之錘","Open Mind":"開闊心智","Clear Mind":"清澈心智","Glacial Mind":"冰河心智","Serene Mind":"寧靜心智","Burning Meteors":"燃燒隕石","Heavy Ore":"沉重礦石","Miner":"礦工","Bite":"咬擊","Reinforced Wall":"強化之牆","Healing Wall":"治癒之牆","Long Lullaby":"長搖籃曲","Dead of Night":"夜深人靜","High Note":"高音","Icy Nova":"冰霜新星","Wide Cloud":"寬廣毒雲","Deadly Cloud":"致命毒雲","Lingering Cloud":"殘留毒雲","Masterpiece":"傑作","Pure Gold":"純金","One More Spin":"再轉一圈","Lightning Rod":"避雷針","Spirit Step":"靈魂之步","Silent Step":"無聲之步","Armored Peco":"裝甲大嘴鳥","Nightmare":"夢魘","Dive":"俯衝","Sharp Pick":"利鎬","Solar Skin":"太陽之膚","Improved Pierce":"強化連刺攻擊","Corrosive Paint":"腐蝕塗料","Pyromancer":"火焰術士","Swift Prayer":"迅捷祈禱","Plumage":"羽毛","Deadly Dust":"致命毒粉","Solar Stance":"太陽架勢","Steady Hand":"穩定之手","Tempered Tip":"淬鍊箭頭","Piercing Tips":"貫穿箭頭","Tracker":"追蹤者","Piercing Bolt":"貫穿之矢","Drumroll":"鼓聲","Refined":"精鍊","Finisher":"終結者","Resonance":"共鳴","Riposte":"還擊","Living Rock":"活岩","Bonebreaker":"碎骨者","Break Armor":"破甲","Thunderous Noise":"雷鳴巨響","Sacrifice":"犧牲","Tremor":"震顫","Wide Sanctuary":"寬廣聖域","Plunderer":"掠奪者","Holy Seal":"神聖封印","Silence":"沉默","Overheat":"過熱","Scorching Sun":"灼熱太陽","Burning Sun":"燃燒太陽","Long Shadow":"長影","Restoring Shadow":"恢復之影","Burning Ground":"燃燒之地","Blessed Ground":"受祝福之地","Broken Ground":"破碎之地","Lasting Temper":"持久鍛鍊","Third Arrow":"第三支箭","Solid Ground":"堅實大地","Raging Earth":"狂怒大地","Mother Earth":"大地之母","Tolerance":"耐受","Perpetual Storm":"永恆風暴","Toxins":"毒素","Treacherous":"奸詐","Three Stars":"三顆星","Learned Trick":"學來的把戲","Threshold":"門檻","Wide Veil":"寬廣帷幕","Cutting Veil":"切割帷幕","Lasting Poison":"持久之毒","Fierce Blizzard":"猛烈暴風雪","Long Blizzard":"長暴風雪","Veins":"礦脈","Tailwind":"順風","Icy Wind":"寒風","Heavy Wind":"重風","Keen Sight":"銳利視野","Low Flight":"低空飛行","Anvil":"鐵砧","Block chance":"格擋機率","Blind chance":"致盲機率","Sleep":"睡眠","Pins":"大頭針","Father Matthias":"馬提亞斯神父","You no longer have what you need to do that.":"你已不再擁有執行此操作所需的東西。","Attack: Katar":"攻擊：拳刃","Attack: Knuckles":"攻擊：拳套","Attack: Book":"攻擊：書","Attack: Instrument":"攻擊：樂器","Pick a job, ready your weapon and hold off the horde.":"選擇職業、準備武器、擋住怪物群。","Offline version: you play solo, no connection needed.":"離線版：單人遊玩，無需連線。","Your characters and their gear are saved on this PC.":"你的角色與裝備儲存在這台電腦上。","Update client":"更新客戶端","Downloads":"下載","Player":"玩家","Installing…":"安裝中…","Checking for updates…":"檢查更新中…","Couldn't download the new version. Check your internet connection and try again.":"無法下載新版本。請檢查網路連線後再試一次。","The client can only be updated from the installed game.":"只能從已安裝的遊戲更新客戶端。","There are no updates when running uninstalled (development).":"未安裝執行時（開發版）沒有更新。","Couldn't check for updates. Check your internet connection and try again.":"無法檢查更新。請檢查網路連線後再試一次。","Waves":"波次","Enter the tower":"進入塔","You fell in the tower":"你在塔中倒下了","Wave":"波次","Points earned":"獲得點數","Free points":"可用點數","Tower cleared!":"塔已通關！","Open":"開啟","Every wave you clear gives tower points (more on boss waves and in higher blocks). Upgrades are permanent and only count inside the tower.":"每通過一波都會獲得塔點數（頭目波與更高區段更多）。強化是永久的，但只在塔內生效。","Start at wave":"起始波次","You start with these skills at rank 1. There is no EXP, no chests and no loot in the tower: before each floor you pick a card that improves one of them. The rest of your power comes from your gear, your Deity and your tower upgrades.":"你以 1 級的這些技能開始。塔內沒有經驗、寶箱與戰利品：每層開始前選一張卡片強化其中之一。其餘的戰力來自你的裝備、神格與塔強化。","Official server result":"官方伺服器結果","Checking on the server…":"伺服器檢查中…","No answer from the server: this run does not count.":"伺服器沒有回應：本局不計。","Server result (your run diverged from the server’s)":"伺服器結果（你的遊戲與伺服器不一致）","Run voided by the server":"本局被伺服器判定無效","Local run (does not count)":"本機遊戲（不計）","This character doesn't have any waves open yet.":"這個角色還沒有開啟任何波次。","Can't check the tower right now. Try again in a moment.":"目前無法檢查塔。請稍後再試。","All time":"歷代","Loading the ladder…":"載入排行榜中…","Can't load the ladder right now. Try again in a moment.":"目前無法載入排行榜。請稍後再試。","Nobody has cleared a wave in this ranking yet.":"此排行中還沒有人通過任何一波。","Each character's best run counts: the highest score and, on a tie, the highest wave cleared. Only runs verified by the server (it checks them throughout the day). Seasons are monthly (UTC).":"計入每個角色的最佳一局：分數最高者，同分時以通關波次最高者為準。僅計入伺服器驗證過的遊戲（全天陸續檢查）。賽季每月一期（UTC）。","Registering the run on the server…":"正在伺服器上登記本局…","Run registered: the server will check it throughout the day. Points and the ladder are updated once it is checked.":"本局已登記：伺服器會在當天陸續檢查。檢查完成後會更新點數與排行榜。","Run not played: it doesn't count.":"未遊玩：不計。","The server didn't confirm the end: what it received before the cut counts.":"伺服器未確認結束：以中斷前收到的資料為準。","The server checks runs throughout the day: their points and the ladder are updated once they are checked.":"伺服器會全天陸續檢查遊戲：檢查完成後才更新其點數與排行榜。","The bosses are enraged!":"頭目暴怒了！","Enraged!":"暴怒！","Score":"分數","Best combo":"最佳連擊","Horde":"大軍","Fangs":"利牙","Elites":"菁英","Furious bosses":"狂怒頭目","Hourglass":"沙漏","Broken armor":"破損護甲","Corpses":"屍體","Clumsiness":"笨拙","Breathless":"喘不過氣","Fragile combo":"脆弱連擊","Vengeance":"復仇","No healing on clearing a wave":"通過波次時不回血","Tower curses":"塔之詛咒","Pick one more":"再選一個","Pick curses":"選擇詛咒","Endless waves":"無盡波次","Saved":"已儲存","Your rank this month":"你本月的名次","just now":"剛剛","1-minute waves":"1 分鐘一波","Best wave":"最佳波次","New run":"新的一局","From wave 1":"從第 1 波開始","Continue run":"繼續遊戲","Starting a new run closes the saved one (what you already played in it counts).":"開始新的一局會關閉已儲存的那局（已玩過的部分照樣計算）。","Every wave cleared gives tower points (more on boss waves and higher floors). Upgrades are permanent and only count in the tower.":"每通過一波都會獲得塔點數（頭目波與更高層更多）。強化是永久的，只在塔內生效。","Run saved. You can continue it from the Tower Keeper for the next 7 days, with your character as it was when you entered.":"本局已儲存。接下來 7 天內可從塔之守衛處繼續，角色維持進塔時的狀態。","Save and quit":"儲存並離開","End the run":"結束本局","Wide Dive":"廣域俯衝","Raptor Instinct":"猛禽本能","Wind Sign":"風之徵兆","Lookout":"瞭望","Wingbeat":"振翅","Diving Assault":"俯衝突擊","Lasting Traps":"持久陷阱","Lying in Wait":"守株待兔","Steel Tip":"鋼製箭頭","Blood Trail":"血跡","Spectral Reload":"幻影裝填","Talent trees":"天賦樹","The talents of every class, exactly as they are in the game right now. Hover (or tap) a talent or a skill to see what it does.":"各職業的天賦，與遊戲當前版本完全相同。將滑鼠移到（或點擊）天賦或技能上查看效果。","Back to the game":"返回遊戲","learns a skill":"學會技能","Each skill level":"每個技能等級","50 talent points (one per Job Lv), spread however you like across its three branches.":"50 天賦點數（每職業等級一點），可自由分配到三個分支。","In development":"開發中","Skills its branches teach":"各分支教授的技能","Hover (or tap) a talent or a skill to see what it does.":"將滑鼠移到（或點擊）天賦或技能上查看效果。","Learns a skill":"學會技能","Final talent":"最終天賦","Only with certain weapons":"僅限特定武器","The number: the talent ranks":"數字：天賦等級","No 2nd job yet":"尚無二轉","No combo":"無連擊","You didn't reach the wave's points!":"你沒有達到本波的分數！","Wave lost":"本波失敗","You didn't reach the wave's points":"你沒有達到本波的分數","Broken!":"中斷！","Path":"路線","Mounted Sweep":"騎乘橫掃","Brandish Spear sweeps wider, slows and pushes the horde back, until it stuns them all.":"騎乘攻擊掃得更廣、緩速並擊退怪物群，最終使其全部暈眩。","Fierce Spear":"兇猛長矛","Brandish Spear hits harder and more often, and ends up a devastating slash.":"騎乘攻擊打得更重、更頻繁，最終成為毀滅性的斬擊。","Charge Attack reaches further, stuns and runs over everyone in its way.":"衝鋒攻擊距離更遠、會暈眩，並輾過路上所有敵人。","Endless Charge":"無盡衝鋒","Charge Attack hits harder, weakens and marks, and if it kills it is ready again.":"衝鋒攻擊打得更重、削弱並標記，擊殺時可立即再次使用。","Multi Thrust":"多重突刺","Pierce reaches more enemies, more often, and every thrust jumps to another.":"連刺攻擊波及更多敵人、更頻繁，每次突刺都會跳到另一個敵人。","Pierce breaks armor, lands stronger crits and finishes off the wounded.":"連刺攻擊破甲、暴擊更強，並終結受傷的敵人。","Returning Spear":"迴返長矛","More spears, faster, until your attacks throw them on their own.":"更多長矛、更快，最終你的攻擊會自動擲出它們。","Dragon Spear":"龍之矛","A heavier spear that stuns and tears, up to one huge blow.":"更沉重的長矛，會暈眩與撕裂，最終化為一記巨大打擊。","Counter Attack triggers more often, wider, disarms and heals you.":"反擊更常觸發、範圍更廣、會繳械並治療你。","Counter Attack hits harder, stuns and leaves your basic attacks charged.":"反擊打得更重、會暈眩，並讓你的普通攻擊充能。","Bowling Bash knocks further, stuns and bounces from enemy to enemy.":"怪物互擊擊飛更遠、會暈眩，並在敵人間彈跳。","Brutal Greatsword":"兇猛巨劍","Bowling Bash hits harder, tears and breaks, and finishes off the wounded.":"怪物互擊打得更重、撕裂並破甲，並終結受傷的敵人。","Spear Push":"長矛推擊","Quick Sweep":"快速橫掃","War Brandish":"戰爭旋風","Stunning Charge":"暈眩衝鋒","Spear Ram":"長矛衝撞","Intimidating Charge":"威嚇衝鋒","Marked Spear":"標記之矛","Tireless Charge":"不倦衝鋒","Lancer":"槍騎兵","Swift Thrusts":"迅捷突刺","Chain Thrust":"連鎖突刺","Sure Point":"必中點","Final Thrust":"最終突刺","Reflex Spear":"反射之矛","Stunning Spear":"暈眩之矛","Bleeding Spear":"流血之矛","Draconic Spear":"龍之矛","Temperance":"節制","Blood for Blood":"以血還血","Stunning Counter":"暈眩反擊","Devastating Counter":"毀滅反擊","Quick Bowling Bash":"快速怪物互擊","Bleeding Blow":"流血打擊","Greatsword Finisher":"巨劍終結","Holy Haste":"神聖冷卻縮減","Spear Quicken lasts longer, recharges sooner and grants crit, until it never fades.":"長矛加速術持續更久、更快充能並給予暴擊，最終永不消退。","Casting Spear Quicken gives you damage, speed and crit, and while it is active your Peco tramples twice as hard.":"施放長矛加速術給予傷害、速度與暴擊，生效期間大嘴鳥的踐踏力道加倍。","Shield Charge hits harder, in a larger area and stuns, until it is a crushing charge.":"盾擊打得更重、範圍更大並會暈眩，最終成為粉碎性的衝鋒。","Relentless Charge":"無情衝鋒","Shield Charge recharges sooner, weakens and marks, and if it kills it is ready again.":"盾擊更快充能、削弱並標記，擊殺時可立即再次使用。","Multiple Cross":"多重十字","Holy Cross reaches more enemies, more often and marks, until your attacks cast it on their own.":"聖十字攻擊波及更多敵人、更頻繁並標記，最終你的攻擊會自動施放它。","Cross of Judgment":"審判十字","Holy Cross hits harder, with stronger crits and stuns, up to one huge blow.":"聖十字攻擊打得更重、暴擊更強並會暈眩，最終化為一記巨大打擊。","A bigger Grand Cross that blinds and costs you less, and consecrates the ground.":"更大的聖十字審判，會致盲且消耗更少，並淨化地面。","Grand Cross hits harder, more often and with crits, and gives back the HP it costs.":"聖十字審判打得更重、更頻繁且會暴擊，並返還消耗的 HP。","Flying Shields":"飛舞之盾","More shields, faster and more often, that end up bouncing from enemy to enemy.":"更多盾牌、更快更頻繁，最終在敵人之間彈跳。","Shield Boomerang hits harder, stuns and humiliates, up to one huge blow.":"迴旋盾擊打得更重、會暈眩與羞辱，最終化為一記巨大打擊。","Auto Guard lasts longer, blocks more and releases light when it blocks, until it never drops.":"自動防禦持續更久、格擋更多並在格擋時釋放光芒，最終永不解除。","Auto Guard heals you when it blocks, recharges sooner and gives you damage, until it is always ready.":"自動防禦格擋時治療你、更快充能並給予傷害，最終隨時待命。","Eternal Quicken":"永恆加速","Holy Fury":"神聖之怒","Crusader's Stride":"十字軍步伐","Crusader's Eye":"十字軍之眼","Bastion Charge":"壁壘衝鋒","Quick Shield":"快速之盾","Intimidating Shield":"威嚇之盾","Holy Mark":"神聖印記","Unrelenting Charge":"不懈衝鋒","Armor of Faith":"信仰之鎧","Quick Cross":"快速十字","Reflex Cross":"反射十字","Stunning Cross":"暈眩十字","Judgment Cross":"審判十字","Wall of Faith":"信仰之牆","Shield Throw":"擲盾","Bouncing Shield":"彈跳之盾","Humiliating Shield":"羞辱之盾","Bastion Shield":"壁壘之盾","Eternal Guard":"永恆防禦","Quick Guard":"快速防禦","Holy Riposte":"神聖還擊","Constant Guard":"恆常防禦","More meteors, in a larger area and more often, until they cover the sky.":"更多隕石、範圍更大、更頻繁，最終覆蓋整片天空。","Colossal Meteor":"巨型隕石","Meteor Storm hits harder, stuns and burns, until it falls as one huge rock.":"隕石術打得更重、會暈眩與燃燒，最終落下一顆巨大的岩石。","Columns":"火柱群","More flames, more often and marking, until the ground is left burning.":"更多火焰、更頻繁並標記，最終讓大地燃燒。","Fire Pillar hits harder, with crits and smothering, until your attacks cast it on their own.":"火柱攻擊打得更重、會暴擊與窒息，最終你的攻擊會自動施放它。","A wider Frost Nova, more often and slowing, until your attacks cast it.":"更廣的霜凍之術、更頻繁並緩速，最終你的攻擊會施放它。","Frost Nova hits harder, freezes longer and frozen enemies take more damage.":"霜凍之術打得更重、冰凍更久，冰凍的敵人受到更多傷害。","Storm Gust lasts longer, slows and covers more, until it freezes everyone.":"暴風雪持續更久、緩速並覆蓋更廣，最終冰凍所有人。","Ice Storm":"冰風暴","Storm Gust hits harder, more often and with crits, until it goes off twice.":"暴風雪打得更重、更頻繁且會暴擊，最終連續發動兩次。","More orbs, that pierce and come out more often, until they jump from enemy to enemy.":"更多雷球，會貫穿且更常出現，最終在敵人之間跳躍。","Jupitel Thunder hits harder, stuns and ionizes, up to one huge thunderbolt.":"雷鳴術打得更重、會暈眩與電離，最終化為一道巨大的雷霆。","Lord of Vermilion covers more, blinds and comes out more often, until the sky is full of lightning.":"怒雷強擊覆蓋更廣、會致盲且更常出現，最終讓天空佈滿閃電。","Lord of Vermilion hits harder, with crits and electrocuting, and leaves the ground charged.":"怒雷強擊打得更重、會暴擊與電擊，並讓地面帶電。","Inner Flame":"內在火焰","Burning Sky":"燃燒天空","Sky Rock":"天降岩石","Quick Fire":"快速之火","Ground Ablaze":"燃燒大地","Ravenous Flame":"貪婪之焰","Smothering Heat":"窒息高溫","Reflex Pillar":"反射火柱","Winter":"寒冬","Inner Cold":"內在寒冷","Reflex Nova":"反射新星","Devastating Nova":"毀滅新星","Wide Blizzard":"寬廣暴風雪","Quick Blizzard":"快速暴風雪","Double Blizzard":"雙重暴風雪","Voltage":"電壓","Insulator":"絕緣體","Quick Thunder":"快速雷鳴","Mighty Thunder":"強力雷鳴","Wrath of Jupiter":"朱比特之怒","Swift Lightning":"迅捷閃電","Electric Overload":"電力過載","Electrocution":"電擊","A bigger Volcano that lasts longer and gives you more damage, until it never dies out.":"更大的火元素領域，持續更久、給予更多傷害，最終永不熄滅。","Volcano hits harder, fires you up when cast and comes out more often, until it opens two at once.":"火元素領域打得更重、施放時讓你熱血沸騰且更常出現，最終同時開啟兩個。","Deluge heals more, covers more and comes out more often, until it never dries up.":"水元素領域治療更多、覆蓋更廣且更常出現，最終永不乾涸。","Deluge slows, weakens and speeds you up, until it traps everyone in the mud.":"水元素領域會緩速、削弱並讓你加速，最終將所有人困在泥沼中。","Earth Spike reaches more enemies, more often and cracks the ground, until your attacks cast it.":"地震術波及更多敵人、更頻繁並使地面龜裂，最終你的攻擊會施放它。","Giant Spike":"巨型尖刺","Earth Spike hits harder, stuns and crits, until it is a huge peak.":"地震術打得更重、會暈眩與暴擊，最終化為一座巨大的山峰。","Heaven's Drive covers more, slows and repeats, until the ground is left broken.":"崩裂術覆蓋更廣、會緩速與重複，最終讓大地破碎。","Heaven's Drive hits harder, more often and collapses, up to an earthquake.":"崩裂術打得更重、更頻繁並造成崩塌，最終化為一場地震。","Autocast":"自動施法","Hindsight casts bolts more often and for longer, until it is always active.":"自動念咒更常施放箭術、持續更久，最終永久生效。","Hindsight's bolts hit harder and you cast it more often, until you never stop casting it.":"自動念咒的箭術打得更重且更常施放，最終永不停歇。","Abracadabra comes out more often, with more luck and crits, until it goes off twice.":"隨機技能更常出現、運氣更好且會暴擊，最終連續發動兩次。","Abracadabra hits harder and speeds you up, until your attacks cast it on their own.":"隨機技能打得更重並讓你加速，最終你的攻擊會自動施放它。","Eternal Volcano":"永恆火山","Lava Heat":"熔岩高溫","Quick Eruption":"快速噴發","Steady Rain":"穩定降雨","Eternal Deluge":"永恆洪水","Heavy Water":"重水","Current":"水流","Quicksand":"流沙","Geology":"地質學","Stone Patience":"岩石般的耐心","Bark":"樹皮","Reflex Spikes":"反射尖刺","Sharp Rock":"利石","Mountain Peak":"山峰","Quick Tremor":"快速震顫","Every time Hindsight triggers it casts two bolts":"自動念咒每次觸發會施放兩發箭術","Hindsight is always active: your basic attacks cast bolts without using the skill":"自動念咒永久生效：普通攻擊無需使用技能即可施放箭術","Reread":"重讀","Brilliant Mind":"聰慧心智","Ceaseless Spell":"不停咒語","Abracadabra heals and brings luck more often":"隨機技能更常帶來治療與好運","Lucky Strike":"幸運一擊","Double Trick":"雙重戲法","Swift Trick":"迅捷戲法","Unleashed Arcana":"解放奧秘","Reflex Magic":"反射魔法","Free Falcon":"自由之鷹","Dives more often and on more enemies, until the falcon attacks on its own with your shots.":"更常俯衝、波及更多敵人，最終獵鷹會隨你的射擊自動攻擊。","Deadly Dive":"致命俯衝","Fewer dives, but a single one that bursts a whole group and stuns it.":"俯衝次數減少，但單次俯衝會炸開整群敵人並使其暈眩。","Hunter's Eye":"獵人之眼","More marked prey, taking more damage, and the mark jumps from one to another.":"更多被標記的獵物，受到更多傷害，且標記會在敵人之間跳躍。","Hunting Sign":"狩獵徵兆","Detecting also empowers you: damage, crit and speed, and killing a marked enemy recharges it.":"獵鷹尋敵也會強化你：傷害、暴擊與速度，擊殺被標記的敵人時會重新充能。","Many traps that last longer and rearm.":"更多持續更久且會重新佈置的陷阱。","Big Charge":"大型炸藥","A single huge trap that blows everything up.":"單一巨型陷阱，把一切都炸飛。","They sleep longer, take more damage asleep and the sleep spreads.":"睡得更久、睡眠中受到更多傷害，且睡眠會擴散。","Blinding Sand":"致盲之沙","When they wake up they are weak and slow, and the sand stays on the ground.":"醒來後虛弱又遲緩，沙子還會留在地上。","More arrows, more often, until every shot goes off twice.":"更多箭、更頻繁，最終每次射擊都發動兩次。","Heavy Shot":"重擊射擊","Arrows that pierce everything and deal much more to bosses and elites.":"貫穿一切的箭矢，對頭目與菁英造成更多傷害。","Spectral Lance":"幽靈長槍","A bigger arrow that stuns and leaves a trail that keeps dealing damage.":"更大的箭，會暈眩並留下持續造成傷害的軌跡。","Mercy Shot":"慈悲一箭","More damage and crits, and it finishes off those it leaves at low HP.":"更多傷害與暴擊，並終結被打到低 HP 的敵人。","Mighty Dive":"強力俯衝","Chain Hunt":"連鎖狩獵","When a marked enemy dies, its mark jumps to the nearest enemy with the time it had left":"被標記的敵人死亡時，標記會以剩餘時間跳到最近的敵人","Hunting Focus":"狩獵專注","Hunting Instinct":"狩獵本能","Hunting Stride":"狩獵步伐","Hunting Order":"狩獵號令","Killing a marked enemy leaves Detecting ready to be cast again":"擊殺被標記的敵人會讓獵鷹尋敵可以立即再次施放","More Traps":"更多陷阱","Rearm":"重新佈置","Every Claymore Trap rearms after bursting: it explodes twice":"每個爆散陷阱爆炸後會重新佈置：爆炸兩次","Survival Instinct":"生存本能","Heavy Sleep":"沉睡","Quick Sand":"快速之沙","Contagious Sleep":"傳染睡眠","Heavy Sand":"沉重之沙","Sand on the Ground":"地上的沙","Two Volleys":"雙重齊射","Beast Strafing always goes off twice in a row.":"動物猛擊永遠連續發動兩次。","Big Game Arrow":"巨獸之箭","Ghost Trail":"幽靈軌跡","Deadly Aim":"致命瞄準","Rain of Notes":"音符之雨","More arrows, that pierce and come out more often, until they play with your attacks.":"更多箭，會貫穿且更常出現，最終隨你的攻擊一同演奏。","Solo Arrow":"獨奏之箭","Arrow Vulcan hits harder, with crits and marking, up to a grand finale.":"奧義箭亂舞打得更重、會暴擊並標記，最終迎來盛大終章。","Echo":"迴響","Dissonance reaches further, puts enemies off-key and plays more often, until it fills the stage.":"不諧和音範圍更遠、使敵人走音且更常演奏，最終填滿整個舞台。","Dissonance hits harder, stuns and crits, up to a full symphony.":"不諧和音打得更重、會暈眩與暴擊，最終化為完整的交響曲。","Cradle Song":"搖籃之歌","Lullaby puts enemies to sleep longer, reaches further and plays more often, up to Ragnarok.":"搖籃曲讓敵人睡得更久、範圍更遠且更常演奏，最終迎來諸神黃昏。","Sleeping enemies take more damage, nearby ones are slowed and Lullaby never stops playing.":"睡眠中的敵人受到更多傷害，附近的敵人會緩速，搖籃曲永不停止。","Loki's Veil lasts longer, covers more and comes out more often, until it never lifts.":"洛奇的悲鳴持續更久、覆蓋更廣且更常出現，最終永不揭開。","Loki's Veil damages those inside and gives you crit and speed, until you become a deadly dance.":"洛奇的悲鳴傷害其中的敵人，並給予你暴擊與速度，最終你化為致命之舞。","March":"進行曲","A Drum on the Battlefield lasts longer, plays more often and armors you, until it never stops.":"戰鼓震天持續更久、更常演奏並為你披甲，最終永不停歇。","A Drum on the Battlefield gives more damage, crit and speed, up to a war call.":"戰鼓震天給予更多傷害、暴擊與速度，最終化為戰爭號召。","Invulnerable Siegfried lasts longer, protects more and plays more often, until it makes you invulnerable.":"不死神齊格弗里德持續更久、防護更多且更常演奏，最終讓你無敵。","Invulnerable Siegfried heals you, gives you damage and speed, and with the drum active you deal more damage.":"不死神齊格弗里德治療你、給予傷害與速度，戰鼓生效時傷害更高。","Encore Call":"安可","Steady Stage":"穩定舞台","Arpeggio":"琶音","Marked Note":"標記音符","Grand Finale":"盛大終章","Constant Noise":"持續噪音","Great Stage":"大舞台","Cymbal Crash":"鈸聲","Climax":"高潮","Stage Grace":"舞台恩典","Applause":"掌聲","Sweet Dreams":"好夢","Endless Lullaby":"無盡搖籃曲","Quick Veil":"快速帷幕","Eternal Veil":"永恆帷幕","Deceit":"欺瞞","Loki's Dance":"洛奇之舞","Choir":"合唱團","Eternal March":"永恆進行曲","Sharp Drum":"銳利鼓聲","Martial Step":"武步","War Call":"戰爭號召","Quick Song":"快速之歌","Battle Hymn":"戰鬥聖歌","Light Hymn":"輕快聖歌","A bigger Sanctuary that lasts longer and heals more, until it is holy ground.":"更大的光耀之堂，持續更久且治療更多，最終成為聖地。","Sanctuary burns the horde more, slows and marks it, until it never stops burning.":"光耀之堂更能灼燒怪物群、會緩速並標記，最終永不停止燃燒。","Safety Wall takes more hits, recharges sooner and lets you run, until it never falls.":"暗之障壁承受更多攻擊、更快充能並讓你加速，最終永不倒下。","Every hit Safety Wall stops heals you, and raising it gives you damage and crit.":"暗之障壁擋下的每次攻擊都會治療你，升起障壁時給予傷害與暴擊。","Benedictio covers more, marks more and recharges sooner, until your attacks cast it.":"聖母之祈福覆蓋更廣、標記更強且更快充能，最終你的攻擊會施放它。","Benedictio hits harder, with crits and stuns, up to a huge judgment.":"聖母之祈福打得更重、會暴擊與暈眩，最終化為巨大的審判。","Magnus Exorcismus with more crosses, bigger and blinding, up to Judex.":"十字驅魔攻擊的十字更多、更大且會致盲，最終成為 Judex。","Magnus Exorcismus hits harder, more often and weakens, and purifies the ground.":"十字驅魔攻擊打得更重、更頻繁並削弱敵人，還會淨化地面。","Impositio Manus gives more damage, lasts longer and renews sooner, until it never fades.":"神威祈福給予更多傷害、持續更久且更快續上，最終永不消退。","Impositio Manus gives you crit, speed and damage when cast, and you cast it nonstop.":"神威祈福施放時給予暴擊、速度與傷害，且你會不停施放。","Magnificat gives more Haste, lasts longer and recharges sooner, until it never fades.":"聖母之頌歌給予更多冷卻縮減、持續更久且更快充能，最終永不消退。","Magnificat heals you and gives you damage and crit, and with Impositio active you deal more damage.":"聖母之頌歌治療你並給予傷害與暴擊，神威祈福生效時傷害更高。","Heavy Ground":"沉重之地","Ground Judgment":"大地審判","Ceaseless Sanctuary":"不息聖域","Refuge":"避難所","Eternal Wall":"永恆之牆","Divine Riposte":"神聖還擊","Cutting Faith":"銳利信仰","Constant Wall":"恆常之牆","Sentence":"宣判","Holy Armor":"神聖之鎧","Reflex Blessing":"反射祝福","Holy Fire":"聖火","Divine Strike":"神聖打擊","Burning Judgment":"燃燒審判","Purging Light":"淨化之光","Quick Exorcism":"快速驅魔","Atonement":"贖罪","Purified Ground":"淨化之地","Plea":"懇求","Holy Silence":"神聖沉默","Eternal Imposition":"永恆祈福","Sharp Gloria":"銳利榮光","Blessed Step":"受祝福的步伐","Gloria's Favor":"榮光之恩","Quick Imposition":"快速祈福","Quick Magnificat":"快速頌歌","Eternal Magnificat":"永恆頌歌","Holy Hymn":"神聖聖歌","Orbit":"軌道","More orbs, spinning faster and for longer, until they never fade.":"更多氣彈，轉得更快更久，最終永不消失。","Orbs that hit harder, stun and weigh down, until they heal you with every hit.":"氣彈打得更重、會暈眩與壓制，最終每次命中都會治療你。","More orbs, that pierce and come out more often, until your attacks fire them.":"更多氣彈，會貫穿且更常出現，最終你的攻擊會射出它們。","Finger Offensive hits harder, with crits and marking, up to a finger of death.":"彈指神通打得更重、會暴擊並標記，最終成為死亡之指。","Chain Combo reaches more enemies, stuns and comes out more often, until it jumps from enemy to enemy.":"連環全身掌波及更多敵人、會暈眩且更常出現，最終在敵人之間跳躍。","Chain Combo hits harder, brings the finisher closer and bleeds, until it goes off twice.":"連環全身掌打得更重、讓終結技更快就緒並造成流血，最終連續發動兩次。","Combo Finish covers more, breaks and slows, until it opens the gates of hell.":"猛龍誇強覆蓋更廣、會破甲與緩速，最終打開地獄之門。","Combo Finish hits harder, more often and with crits, and finishes off the wounded.":"猛龍誇強打得更重、更頻繁且會暴擊，並終結受傷的敵人。","Fury lasts longer, recharges sooner and gives more Haste, until it never fades.":"爆氣持續更久、更快充能並給予更多冷卻縮減，最終永不消退。","Fury gives more crit, damage and speed when cast, and you cast it nonstop.":"爆氣施放時給予更多暴擊、傷害與速度，且你會不停施放。","Asura Strike splashes, stuns and recovers sooner, and leaves a crater.":"阿修羅霸凰拳會濺射、暈眩且更快恢復，並留下隕坑。","Asura Strike hits harder, with crits and marking, up to the ultimate blow.":"阿修羅霸凰拳打得更重、會暴擊並標記，最終成為終極一擊。","Stunning Orb":"暈眩氣彈","Heavy Orb":"沉重氣彈","Vital Ki":"生命之氣","Quick Finger":"快速指彈","Reflex Finger":"反射指彈","Ki Mark":"氣之印記","Finger of Death":"死亡之指","Triple Strike":"三重打擊","Monk's Guard":"武僧防禦","Quick Combo":"快速連擊","Chain of Blows":"連續打擊","Inner Blow":"內勁","Infinite Combo":"無限連擊","Heavy Wave":"沉重波動","Quick Finisher":"快速終結","Monk's True Strike":"武僧的真實打擊","Last Blow":"最後一擊","Eternal Fury":"永恆爆氣","Asura's Feet":"阿修羅之足","Constant Fury":"恆常爆氣","Asura's Stunning Blow":"阿修羅暈眩之擊","Asura's Crater":"阿修羅隕坑","Pressure Point":"穴位","Destroying Ki":"毀滅之氣","Sonic Blow reaches more enemies, comes out more often and tears, until your attacks cast it.":"音速投擲波及更多敵人、更常出現並撕裂，最終你的攻擊會施放它。","Sonic Blow hits harder, stuns and crits, and finishes off the wounded.":"音速投擲打得更重、會暈眩與暴擊，並終結受傷的敵人。","Grimtooth reaches further, tears and comes out more often, until it jumps from one to another.":"無影之牙範圍更遠、會撕裂且更常出現，最終在敵人之間跳躍。","Grimtooth hits harder, marks and weakens, up to a meteor assault.":"無影之牙打得更重、會標記與削弱，最終化為流星突擊。","Enchant Poison lasts longer, poisons more and renews sooner, until it never dries up.":"塗毒持續更久、毒性更強且更快續上，最終永不乾涸。","Nimble Poison":"靈活之毒","Coating your blade gives you speed, crit and damage, and you do it nonstop.":"為刀刃塗毒時給予速度、暴擊與傷害，且你會不停塗毒。","A bigger, longer-lasting Venom Dust that slows, until it never fades.":"更大、持續更久的病毒散撥，會緩速，最終永不消散。","Venom Dust hits harder, weakens and comes out more often, up to a lethal cloud.":"病毒散撥打得更重、會削弱且更常出現，最終化為致命毒雲。","Cloaking lasts longer, recharges sooner and you come out with crits, until you are never seen.":"偽裝持續更久、更快充能，現身時帶著暴擊，最終永遠不被看見。","From Cloaking you hit harder, and hiding gives you speed, crit and damage.":"從偽裝中出手打得更重，隱身時給予速度、暴擊與傷害。","Fan":"扇","More knives, more often and more poisonous, until your attacks throw them.":"更多飛刀、更頻繁且毒性更強，最終你的攻擊會擲出它們。","Venom Knife hits harder, with crits and marking, until it destroys souls.":"毒刃打得更重、會暴擊並標記，最終能摧毀靈魂。","Assassin's Cold Blood":"刺客的冷血","Stab":"刺擊","Reflex Sonic":"反射音速","Quick Fang":"快速之牙","Chained Fangs":"連鎖之牙","Shadow Mark":"暗影印記","Weakening Wound":"削弱之傷","Quick Coating":"快速塗毒","Eternal Poison":"永恆之毒","Toxic Step":"毒性步伐","Poisoned Edge":"淬毒之刃","Toxin":"毒素","Constant Coating":"恆常塗毒","Heavy Cloud":"沉重毒雲","Eternal Mist":"永恆毒霧","Weakening Dust":"削弱毒粉","Quick Dust":"快速毒粉","Stalking":"潛伏","Eternal Shadow":"永恆暗影","Step in the Shadow":"暗影中的步伐","Hidden Eye":"隱藏之眼","Assault from the Shadow":"暗影突擊","Knife Rain":"飛刀之雨","Quick Knife":"快速飛刀","Reflex Knife":"反射飛刀","Precise Cut":"精準切割","Hunter's Mark":"獵人印記","Back Stab comes out more often, bleeds and stuns, and if it kills it is ready again.":"背刺更常出現、會流血與暈眩，擊殺時可立即再次使用。","Back Stab hits harder, with crits and in the blind spot, up to a deadly stab.":"背刺打得更重、會暴擊並攻擊盲點，最終成為致命一刺。","Raid covers more, blinds and comes out more often, up to the final assault.":"潛擊覆蓋更廣、會致盲且更常出現，最終成為最終潛擊。","Raid hits harder, frightens and bleeds, and heals you with what it plunders.":"潛擊打得更重、會恐嚇與流血，並用掠奪來的東西治療你。","Divest Weapon reaches more enemies, lasts longer and comes out more often, up to Full Strip.":"卸除武器波及更多敵人、持續更久且更常出現，最終成為所有卸除。","Disarmed enemies deal less damage and take more, and disarming gives you damage, until your attacks do it.":"被繳械的敵人造成更少傷害、受到更多傷害，繳械時給予你傷害，最終你的攻擊會自動繳械。","Intimidate reaches more enemies, more often and stuns, until it throws them into each other.":"脅持波及更多敵人、更頻繁且會暈眩，最終把敵人互相砸在一起。","Intimidate hits harder, humiliates and taunts, and finishes off the fallen.":"脅持打得更重、會羞辱與嘲諷，並終結倒下的敵人。","Steal Coin reaches more enemies, more often and steals more, until your attacks steal.":"偷錢波及更多敵人、更頻繁且偷得更多，最終你的攻擊會自動偷竊。","Steal Coin hits harder, with crits and stuns, up to a big blow.":"偷錢打得更重、會暴擊與暈眩，最終成為一記重擊。","A bigger, longer-lasting and stickier Graffiti, up to a masterpiece.":"更大、持續更久且更黏的塗鴉，最終成為傑作。","Graffiti hits harder, signs and weakens, and you paint it nonstop.":"塗鴉打得更重、會簽名與削弱，且你會不停作畫。","Street Rat":"街頭鼠輩","Endless Stab":"無盡刺擊","Betrayal":"背叛","Blind Spot":"盲點","Deadly Stab":"致命一刺","Quick Raid":"快速潛擊","Frighten":"恐嚇","Bloody Raid":"血腥潛擊","Blood Loot":"血之戰利品","Nimble Thief":"靈巧盜賊","Thief's Sight":"盜賊視野","Reflex Divest":"反射卸除","Quick Threat":"快速威脅","Low Blow":"下流一擊","Chain Throw":"連鎖投擲","Taunt":"嘲諷","Finish the Fallen":"終結倒地者","Dirty Trick":"骯髒手段","Reflex Theft":"反射偷竊","Dirty Blow":"骯髒一擊","Coin in the Face":"金幣砸臉","Big Blow":"重擊","Lasting Paint":"持久塗料","Sticky Paint":"黏稠塗料","Toxic Paint":"毒性塗料","Paint and Repaint":"塗了又塗","A wider Axe Tornado, with more spins and more often, until your attacks spin it.":"更廣的旋風斧，轉更多圈且更頻繁，最終你的攻擊會自動旋轉。","Axe Tornado hits harder, tears and stuns, up to a steel tornado.":"旋風斧打得更重、會撕裂與暈眩，最終化為鋼鐵龍捲。","Axe Rain":"斧之雨","More axes, faster and more often, that bounce from enemy to enemy.":"更多斧頭、更快更頻繁，並在敵人之間彈跳。","Axe Boomerang hits harder, tears and crits, up to a giant's axe.":"回力斧打得更重、會撕裂與暴擊，最終化為巨人之斧。","Weapon Perfection lasts longer, sharpens sooner and gives Haste, until it never loses its edge.":"無視體型攻擊持續更久、更快磨利並給予冷卻縮減，最終永不鈍化。","Weapon Perfection hits big ones harder and sharpening gives you crit, speed and damage.":"無視體型攻擊對大型敵人打得更重，磨刀時給予暴擊、速度與傷害。","A wider Rush Quake that breaks the ground and slows, until it leaves a rift.":"更廣的衝擊震地，會破壞地面與緩速，最終留下裂谷。","Rush Quake hits harder, more often and stuns, up to the divine hammer.":"衝擊震地打得更重、更頻繁且會暈眩，最終化為神之錘。","Greed reaches further, comes out more often and grabs, until your attacks cast it.":"貪婪範圍更遠、更常出現並會抓取，最終你的攻擊會施放它。","Greed hits harder, takes more zeny and weakens, and heals you with what it takes.":"貪婪打得更重、拿到更多金幣並削弱敵人，還會用拿到的東西治療你。","More rocks, in a larger area and more often, up to an orichalcum rain.":"更多岩石、範圍更大且更頻繁，最終化為奧里哈鋼之雨。","Ore Discovery hits harder, stuns and marks, up to a meteorite.":"尋找礦石打得更重、會暈眩並標記，最終化為隕石。","Muscle":"肌肉","Reflex Tornado":"反射龍捲","Serrated Axe":"鋸齒斧","Spinning Blow":"迴旋打擊","Light Throw":"輕投","Axe Flight":"飛斧","Bouncing Axe":"彈跳之斧","True Axe Strike":"斧之真實打擊","Giant's Axe":"巨人之斧","Apron":"圍裙","Eternal Edge":"永恆之刃","Sharpened Steel":"磨利之鋼","War Forge":"戰爭鍛造","Rift":"裂谷","Seismic Blow":"地震之擊","Quick Hammer":"快速之錘","Anvil Blow":"鐵砧之擊","Miner's Back":"礦工之背","Grab":"抓取","Reflex Greed":"反射貪婪","Miser's Blow":"守財奴之擊","Vital Avarice":"生命貪婪","Quick Veins":"快速礦脈","Marked Ore":"標記礦石","Meteorite":"隕石","More flasks, that splash and come out more often, up to a chain reaction.":"更多藥瓶，會濺射且更常出現，最終引發連鎖反應。","Acid Terror hits harder, corrodes and burns, up to an acid bomb.":"強酸攻擊打得更重、會腐蝕與燃燒，最終化為強酸炸彈。","A bigger, longer-lasting and stickier Demonstration, until it never dies out.":"更大、持續更久且更黏的火煙瓶投擲，最終永不熄滅。","Demonstration hits harder, more often and with crits, until your attacks throw it.":"火煙瓶投擲打得更重、更頻繁且會暴擊，最終你的攻擊會自動投擲。","Your homunculus lasts longer, attacks faster and you get another, until it never leaves you.":"你的生命體持續更久、攻擊更快並多一隻，最終永遠不離開你。","Your homunculus hits harder, tears and stuns, until it evolves.":"你的生命體打得更重、會撕裂與暈眩，最終進化。","More plants, that entangle and last longer, up to a carnivorous garden.":"更多植物，會纏繞且持續更久，最終成為食人花園。","Your plants hit harder, weaken and mark, and heal you with what they bite.":"你的植物打得更重、會削弱並標記，還會用咬到的東西治療你。","Potion Pitcher heals more, more often and for longer, up to a bottomless kit.":"藥水投擲治療更多、更頻繁且持續更久，最終成為無底急救箱。","Potion Pitcher splashes enemies and gives you damage and speed, up to a berserk potion.":"藥水投擲會濺射敵人並給予你傷害與速度，最終成為狂暴藥水。","Chemical Protection lasts longer, protects more and renews sooner, until it covers you fully.":"化學保護持續更久、防護更多且更快續上，最終完全覆蓋你。","Chemical Protection hurts whoever hits you and gives you damage and speed, until you never take it off.":"化學保護會傷害攻擊你的敵人並給予你傷害與速度，最終永不卸下。","Lab Coat":"實驗袍","Quick Flask":"快速藥瓶","Chain Reaction":"連鎖反應","Chemical Burn":"化學灼傷","Tar":"焦油","Quick Bottle":"快速火焰瓶","Chemical Flare":"化學閃焰","Reflex Bottle":"反射火焰瓶","Genetics":"遺傳學","Eternal Bond":"永恆羈絆","Homunculus Claws":"生命體之爪","Homunculus Ram":"生命體衝撞","Homunculus S":"生命體 S","Long Roots":"長根","Pollen":"花粉","Acid Sap":"酸性樹液","Vital Roots":"生命之根","Universal Antidote":"萬能解毒劑","First Aid Kit":"急救箱","Fury Potion":"狂怒藥水","Agility Potion":"敏捷藥水","Quick Coat":"快速塗層","Offensive Coat":"攻擊塗層","Light Coat":"輕塗層","Constant Protection":"恆常保護","A bigger Warmth of the Sun that lasts longer and returns sooner, until it never sets.":"更大的太陽的溫暖，持續更久且更快回歸，最終永不落下。","Warmth of the Sun burns more, leaves enemies burning and dazzles, up to a crown of fire.":"太陽的溫暖燒得更猛、讓敵人燃燒並使其目眩，最終化為火焰之冠。","Solar Burst covers more, comes out more often and dazzles, until your attacks cast it.":"太陽爆發覆蓋更廣、更常出現並使敵人目眩，最終你的攻擊會施放它。","Solar Burst hits harder, with crits and marking, up to a scorching sun.":"太陽爆發打得更重、會暴擊並標記，最終化為灼熱太陽。","Full Moon Kick sweeps more, more often and demoralizes, until it jumps from one to another.":"滿月踢掃得更廣、更頻繁並降低士氣，最終在敵人之間跳躍。","Full Moon Kick hits harder, stuns and crits, up to the new moon.":"滿月踢打得更重、會暈眩與暴擊，最終迎來新月。","New Moon Kick comes out more often, stuns and slows, and if it kills it is ready again.":"新月踢更常出現、會暈眩與緩速，擊殺時可立即再次使用。","New Moon Kick hits harder, marks and covers more, until it falls like a black moon.":"新月踢打得更重、會標記並覆蓋更廣，最終如黑月般落下。","More Stars":"更多星星","More stars, in a larger area and more often, until the sky falls.":"更多星星、範圍更大且更頻繁，最終天空崩落。","Falling Star hits harder, stuns and shines, up to a supernova.":"流星墜落打得更重、會暈眩並發光，最終化為超新星。","Union lasts longer, aligns sooner and gives more damage, until it never breaks.":"太陽和月亮和星星的融合持續更久、更快連線並給予更多傷害，最終永不中斷。","Conjunction":"合相","Casting Union gives you crit, speed and damage, and you cast it nonstop.":"施放太陽和月亮和星星的融合給予暴擊、速度與傷害，且你會不停施放。","Inner Fire":"內在之火","Eternal Sun":"永恆太陽","Solar Crown":"太陽之冠","Solar Gust":"太陽陣風","Reflex Sun":"反射太陽","Sun Mark":"太陽印記","Night Light":"夜之光","Chained Moon":"連鎖之月","Moon Strike":"月之打擊","Moonlight":"月光","Lunar Gravity":"月之引力","Endless Fall":"無盡墜落","Lunar Crater":"月之隕坑","Lunar Wave":"月之波動","Black Moon":"黑月","Stellar Gravity":"星之引力","Stellar Impact":"星之衝擊","Shine":"閃耀","Eternal Union":"永恆融合","Celestial Step":"天體之步","Astral Strength":"星界之力","Constant Union":"恆常融合","Esma reaches more enemies, flows faster and marks, until your attacks cast it.":"艾斯麻波及更多敵人、流動更快並標記，最終你的攻擊會施放它。","Esma hits harder, with crits and stuns, up to the ultimate Esma.":"艾斯麻打得更重、會暴擊與暈眩，最終成為終極艾斯麻。","Estin covers more, slows and comes out more often, and leaves a whirlwind.":"艾斯提覆蓋更廣、會緩速且更常出現，並留下旋風。","Estin hits harder, cuts and chills, and jumps from enemy to enemy.":"艾斯提打得更重、會切割與冰凍，並在敵人之間跳躍。","Estun stuns longer, more enemies and more often, until it paralyzes the soul.":"艾斯敦暈眩更久、更多敵人且更頻繁，最終麻痺靈魂。","Estun hits harder, leaves enemies vulnerable and crits, up to a blow of the spirits.":"艾斯敦打得更重、讓敵人變得脆弱並會暴擊，最終化為眾靈之擊。","Kaizel revives you with more HP, recharges sooner and speeds you up, until it is always ready.":"凱易哲復活時給予更多 HP、更快充能並讓你加速，最終隨時待命。","Casting Kaizel gives you damage and crit, until you hold the spirit of the Soul Linker itself.":"施放凱易哲給予傷害與暴擊，最終你掌握了悟靈士本身的靈魂。","Kaahi heals more, lasts longer and renews sooner, until it never fades.":"凱阿希治療更多、持續更久且更快續上，最終永不消退。","With Kaahi whoever hits you suffers, and casting it gives you damage and speed; with Kaupe, more damage.":"凱阿希生效時攻擊你的敵人會受苦，施放時給予傷害與速度；搭配凱誣僕傷害更高。","Kaupe dodges more hits, recharges sooner and speeds you up, until it is always ready.":"凱誣僕閃避更多攻擊、更快充能並讓你加速，最終隨時待命。","When Kaupe dodges, the attacker suffers, and casting it gives you crit, damage and speed.":"凱誣僕閃避時攻擊者會受苦，施放時給予暴擊、傷害與速度。","Serene Soul":"寧靜之魂","Reflex Esma":"反射艾斯麻","Sharp Soul":"銳利之魂","Spirit Blow":"靈魂打擊","Quick Wind":"快速之風","Soul Whirlwind":"靈魂旋風","Wind Cut":"風之切割","Freezing Wind":"冰凍之風","Chained Wind":"連鎖之風","Quick Estun":"快速艾斯敦","Soul Paralysis":"靈魂麻痺","Vulnerable Soul":"脆弱之魂","Soul Blow":"靈魂重擊","Blow of the Spirits":"眾靈之擊","Guardian Spirit":"守護之靈","Constant Kaizel":"恆常凱易哲","Warrior Spirit":"戰士之魂","Hunter Spirit":"獵人之魂","Swift Spirit":"迅捷之魂","Watchful Soul":"警覺之魂","Eternal Kaahi":"永恆凱阿希","Wounding Soul":"傷人之魂","Light Soul":"輕盈之魂","Swift Dodge":"迅捷閃避","Constant Kaupe":"恆常凱誣僕","True Soul":"真實之魂","Vengeful Soul":"復仇之魂","Soul Dance":"靈魂之舞","Every wave cleared gives tower points (more on boss waves and higher floors). Upgrades are permanent and each rank costs more than the last (the strongest ones have a cap); they only count in the tower.":"每通過一波都會獲得塔點數（頭目波與更高層更多）。強化是永久的，每一級都比上一級貴（最強的幾項有上限）；只在塔內生效。","Double":"雙重","Play or pause (Space)":"播放或暫停（空白鍵）","Go to this moment":"跳到此時刻","This run is from before demos existed: it plays with the current code and may not match.":"這局早於重播功能推出：會以目前的程式播放，可能不一致。","Loading the demo…":"載入重播中…","A talent gives it at the start of the run: you always have it":"天賦讓你在開局時就擁有：永遠持有","From a talent":"來自天賦","All upgrades go back to rank 0 and you get the spent points back":"所有強化回到 0 級，並返還已花費的點數","There are no upgrades to reset.":"沒有可重置的強化。","1-minute floors":"1 分鐘一層","From floor 1":"從第 1 層開始","Nobody has cleared a floor in this ranking yet.":"此排行中還沒有人通過任何一層。","Floor":"樓層","Floors cleared":"已通過樓層","The bosses are still alive! Run over":"頭目還活著！遊戲結束","You didn't reach the floor points! Run over":"你沒有達到本層分數！遊戲結束","Choose a card":"選擇一張卡片","Run over":"遊戲結束","Just one: it goes up a rank every 10 floors":"只有一個：每 10 層升一級","Rank 1":"等級 1","You didn't reach the floor points":"你沒有達到本層分數","The bosses stayed alive":"頭目仍然活著","Run finished":"本局結束","Finish and exit":"結束並離開","Save and exit (only once)":"儲存並離開（僅限一次）","Build":"配置","Gear, stats, talents and skills it entered with":"進塔時的裝備、素質、天賦與技能","cards":"卡片","Tower skills":"塔用技能","Tower upgrades":"塔強化","Your account was opened in another tab. Nothing is saved in this one anymore: reload it if you want to keep playing here.":"你的帳號在另一個分頁中開啟了。這個分頁不會再儲存任何東西：若想在這裡繼續遊玩請重新整理。","You logged in to your account on another device. Log in again if you want to play here.":"你在另一台裝置上登入了帳號。若想在這裡遊玩請重新登入。","Loading Ragnarok assets… {1}%":"正在載入仙境傳說素材… {1}%","Gearscore {1} (you have {2})":"裝備評分 {1}（你有 {2}）","Delete all your account progress? You will lose":"要刪除帳號的所有進度嗎？你將失去",", the inventory, cards, minerals, Kafra Points and unlocked jobs, on the server and on all your devices too. Your username stays and you can start over with it.":"、背包、卡片、礦石、卡普拉點數與已解鎖職業，伺服器與所有裝置上的資料都會消失。帳號名稱會保留，可以用它重新開始。","Delete all guest progress in this browser? You will lose":"要刪除此瀏覽器中的所有訪客進度嗎？你將失去",", the inventory, cards, minerals, Kafra Points and unlocked jobs.":"、背包、卡片、礦石、卡普拉點數與已解鎖職業。","{1} s left":"剩餘 {1} 秒","{1} charges left":"剩餘 {1} 次","×{1} stacked":"×{1} 層","{1} players":"{1} 名玩家","Square full · in queue: {1} of {2}":"廣場已滿 · 排隊中：第 {1} 位，共 {2} 位","{1} friends in the square":"{1} 位好友在廣場","from your friends?":"從好友中移除嗎？","wants to be your friend.":"想加你為好友。","wants to trade with you.":"想與你交易。","At most {1} pieces per trade.":"每次交易最多 {1} 件。","Welcome to the":"歡迎來到","Kafra Corporation":"卡普拉公司",". Would you like me to teleport you to the":"。需要我把你傳送到","Prontera fields":"普隆德拉原野","You left a run in":"你在","at minute":"第","(Lv {1}). Do you want to continue from there?":"分鐘（Lv {1}）離開了一局。要從那裡繼續嗎？","You collect what you had:":"你帶走已獲得的東西：","base EXP,":"基本經驗、","job EXP and the loot you had found.":"職業經驗與找到的戰利品。","+{1}% damage (morale)":"+{1}% 傷害（士氣）","+{1}% damage (ambush)":"+{1}% 傷害（伏擊）","{1} wins":"{1} 勝","Run piece · refine {1}/{2}":"本局裝備 · 精鍊 {1}/{2}","Pick a card (1–{1})":"選一張卡片（1–{1}）","You reached Base Lv {1}!":"你達到了基本等級 {1}！","You reached Job Lv {1}!":"你達到了職業等級 {1}！","+{1} stat points":"+{1} 素質點數","+{1} talent points":"+{1} 天賦點數","+{1} talent point":"+{1} 天賦點數","{1} stat point":"{1} 素質點數","+{1}% damage and +{2}% reach.":"+{1}% 傷害與 +{2}% 攻擊範圍。","+{1}% damage and +{2}% area.":"+{1}% 傷害與 +{2}% 範圍。","+{1}% area and reach.":"+{1}% 範圍與攻擊距離。","Below {1}% HP you deal +{2}% damage.":"HP 低於 {1}% 時傷害 +{2}%。","+{1} ball.":"+{1} 顆火球。","+{1} balls.":"+{1} 顆火球。","+{1} bolt.":"+{1} 發。","+{1} bolts.":"+{1} 發。","Souls curve towards the enemy (x{1} vs undead). Each level adds one more soul.":"靈魂彎曲飛向敵人（對不死族 x{1}）。每級多一個靈魂。","+{1} soul and +{2}% damage.":"+{1} 個靈魂與 +{2}% 傷害。","+{1} flame, +{2}% damage and longer duration.":"+{1} 道火焰、+{2}% 傷害並延長持續時間。","+{1}% damage and longer freeze.":"+{1}% 傷害並延長冰凍。","+{1} flame and +{2}% damage.":"+{1} 團火焰與 +{2}% 傷害。","-{1}% cooldown.":"冷卻 -{1}%。","+{1}% chance to petrify on hit.":"命中時有 +{1}% 機率石化。","+{1} arrow.":"+{1} 支箭。","+{1} pierce.":"+{1} 貫穿。","+{1} arrow wave and +{2}% damage.":"+{1} 波箭雨與 +{2}% 傷害。","+{1} volley and +{2}% damage.":"+{1} 輪與 +{2}% 傷害。","+{1}% projectile speed and +{2}% area.":"投射物速度 +{1}% 與範圍 +{2}%。","For {1} s: +{2} Haste and +{3}% critical.":"{1} 秒內：+{2} 冷卻縮減與 +{3}% 暴擊。","+{1}% AGI and DEX":"AGI 與 DEX +{1}%","+{1} projectile on all your shooting skills.":"所有射擊技能 +{1} 投射物。","A pulse of light: heals you and damages enemies around you (x{1} vs undead). Healing beyond full HP is stored as Grace: your next Heal releases it as extra damage (up to +{2}%).":"光之脈衝：治療自己並傷害周圍敵人（對不死族 x{1}）。超出最大 HP 的治療量會儲存為恩典：下一次治癒術會將其釋放為額外傷害（最多 +{2}%）。","A column of holy light on the bosses in sight or, if there are none, on the biggest group of enemies: a very strong hit that also reaches those around it (x{1} vs undead).":"對視野內的頭目降下聖光柱；若無頭目則落在最大的敵群上：非常強的一擊，也會波及周圍（對不死族 x{1}）。","Orbs of light that spin around you: when they touch an enemy they burst, damaging everyone around, and come back shortly after (x{1} vs undead). Scales with your ATK or your MATK, whichever is higher.":"環繞你旋轉的光球：碰到敵人時爆裂，傷害周圍所有人，不久後再出現（對不死族 x{1}）。依 ATK 或 MATK 中較高者成長。","A wave that slows enemies around you and deals a little holy damage. Holy Light and Ruwach deal +{1}% damage to slowed enemies.":"使周圍敵人緩速並造成少量神聖傷害的波動。神聖之光與光獵對緩速中的敵人傷害 +{1}%。","+{1}% damage and longer duration.":"+{1}% 傷害並延長持續時間。","You bless yourself for {1} s: more damage and faster casting.":"為自己賜福 {1} 秒：傷害提高、詠唱加快。","+{1}% cast speed":"詠唱速度 +{1}%","Blessed basic attacks: +{1}% damage ({2} left)":"受祝福的普通攻擊：傷害 +{1}%（剩餘 {2} 次）","Grace: your next Heal deals +{1}% damage":"恩典：下一次治癒術傷害 +{1}%","You consecrate the ground around you with a holy circle for {1} s: every second it damages the enemies inside and marks them. Marked enemies take more damage from all your holy skills (x{2} vs undead).":"以神聖之環淨化周圍地面 {1} 秒：每秒傷害圈內敵人並加以標記。被標記的敵人受到你所有神聖技能的傷害提高（對不死族 x{2}）。","You pour holy water on the nearest group of enemies: the puddle lasts {1} s, damages enemies standing in it every second and heals you while you stay inside.":"將聖水灑向最近的敵群：水窪持續 {1} 秒，每秒傷害站在其中的敵人，你站在裡面時會回復 HP。","Aqua Benedicta heals {1}% more":"天使之淚的治療量提高 {1}%","Each Heal that heals you grants +{1} max HP for {2} s":"每次治癒術治療你時，{2} 秒內最大 HP +{1}","Blessing also grants +{1} Haste while it lasts":"天使之賜福持續期間另 +{1} 冷卻縮減","Holy Light deals {1}% more damage to enemies marked by Signum Crucis":"神聖之光對被天使之光標記的敵人傷害提高 {1}%","Holy Light and Ruwach deal {1}% more damage to slowed enemies":"神聖之光與光獵對緩速中的敵人傷害提高 {1}%","Holy Smite blesses {1} more basic attack":"神聖重擊多祝福 {1} 次普通攻擊","Holy Smite blesses {1} more basic attacks":"神聖重擊多祝福 {1} 次普通攻擊","Your basic attacks have a {1}% chance to cast Blessing on you (even if you have not learned it)":"普通攻擊有 {1}% 機率對你施放天使之賜福（即使你未學會）","+{1}% melee ATK":"近戰 ATK +{1}%","+{1} target.":"+{1} 目標。","+{1} orb and +{2}% damage.":"+{1} 顆光球與 +{2}% 傷害。","+{1}% speed and +{2} Haste.":"+{1}% 速度與 +{2} 冷卻縮減。","-{1}% damage taken and +{2} max HP.":"受到傷害 -{1}% 與 +{2} 最大 HP。","+{1}% damage and poison.":"+{1}% 傷害與毒性。","You throw a fan of sand: it damages every enemy in front of you and blinds them for {1} s (blinded enemies wander without attacking).":"撒出扇形沙子：傷害前方所有敵人並致盲 {1} 秒（致盲的敵人會四處遊蕩不攻擊）。","+{1}% damage and longer stun.":"+{1}% 傷害並延長暈眩。","Every so often you hide for {1} s: enemies can't touch you and you move faster. When you come out you deal {2}% more damage for {3} s.":"每隔一段時間隱身 {1} 秒：敵人碰不到你且你移動更快。現身後 {3} 秒內傷害提高 {2}%。","+{1}% Flee and +{2}% speed.":"+{1}% 迴避與 +{2}% 速度。","+{1}% chance for a monster to drop extra EXP.":"怪物有 +{1}% 機率額外掉落經驗。","+{1}% EXP.":"+{1}% 經驗值。","+{1}% meat healing and +{2}% meat drops.":"肉的治療量 +{1}% 與肉掉落率 +{2}%。","+{1}% damage and +{2} max HP.":"+{1}% 傷害與 +{2} 最大 HP。","Heel strike on the nearest enemy that stuns it for {1} s.":"對最近的敵人施以腳跟踢，使其暈眩 {1} 秒。","When hit you counterattack (every {1} s) with area damage.":"被擊中時反擊（每 {1} 秒），造成範圍傷害。","You break into a run: +{1}% speed for {2} s.":"拔腿狂奔：{2} 秒內速度 +{1}%。","+{1} HP per second while standing still.":"站著不動時每秒 +{1} HP。","+{1}% area and +{2}% critical.":"+{1}% 範圍與 +{2}% 暴擊。","+{1} shuriken.":"+{1} 枚手裡劍。","+{1} kunai.":"+{1} 枚苦無。","+{1} petal and +{2}% damage.":"+{1} 片花瓣與 +{2}% 傷害。","+{1}% damage and +{2}% projectile speed.":"+{1}% 傷害與 +{2}% 投射物速度。","+{1} bullet.":"+{1} 發子彈。","+{1} bullet and +{2}% damage.":"+{1} 發子彈與 +{2}% 傷害。","+{1} burst and +{2}% damage.":"+{1} 輪連射與 +{2}% 傷害。","+{1}% damage and +{2}% critical.":"+{1}% 傷害與 +{2}% 暴擊。","Sword Dance hits bleed for {1}% of their damage over {2} s.":"劍舞命中會在 {2} 秒內造成其傷害 {1}% 的流血。","Endure reduces damage by a further {1}%":"霸體額外減少 {1}% 傷害","Endure reduces damage by a further {1}%.":"霸體額外減少 {1}% 傷害。","While Endure is active, you return {1}% of each hit taken (before reductions) to the attacker":"霸體期間，將每次受到傷害（減免前）的 {1}% 反彈給攻擊者","While Endure is active, you return {1}% of each hit taken (before reductions) to the attacker.":"霸體期間，將每次受到傷害（減免前）的 {1}% 反彈給攻擊者。","+{1}% damage. Your max HP drops to {2}% and you always count as being at low HP. You heal {3}% of the damage your bleeds deal.":"+{1}% 傷害。最大 HP 降至 {2}%，且永遠視為低 HP 狀態。流血傷害的 {3}% 會治療你。","You heal {1}% of the damage your bleeds deal":"流血傷害的 {1}% 會治療你","You heal {1}% of the damage your bleeds deal.":"流血傷害的 {1}% 會治療你。","At low HP, your hits make enemies bleed for {1}% of their damage over {2} s":"低 HP 時，你的打擊使敵人在 {2} 秒內流血，造成其傷害的 {1}%","+{1}% damage to bosses and elites":"對頭目與菁英傷害 +{1}%","+{1}% range":"射程 +{1}%","Bash deals +{1}% damage and reaches {2}% further.":"狂擊傷害 +{1}%，攻擊範圍增加 {2}%。","Wall: +{1}% damage":"壁壘：+{1}% 傷害","Last Breath: +{1}% damage":"最後一息：+{1}% 傷害","Magnum Break has a {1}% chance to stun.":"怒爆有 {1}% 機率暈眩。","Fire Bolt burns: +{1} damage per second for {2} s.":"火箭術造成燃燒：{2} 秒內每秒 +{1} 傷害。","Fire Wall lasts +{1}% longer.":"火焰之壁持續時間延長 {1}%。","Enemies hit by Cold Bolt take +{1}% damage for {2} s.":"被冰箭術命中的敵人在 {2} 秒內受到傷害 +{1}%。","Enemies hit by Arrow Shower take +{1}% damage for {2} s.":"被箭雨命中的敵人在 {2} 秒內受到傷害 +{1}%。","Enemies hit by Holy Light take +{1}% damage for {2} s.":"被神聖之光命中的敵人在 {2} 秒內受到傷害 +{1}%。","Enemies hit by Triple Action take +{1}% damage for {2} s.":"被三連攻擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Enemies stabbed by Envenom take +{1}% damage for {2} s.":"被施毒刺中的敵人在 {2} 秒內受到傷害 +{1}%。","Cold Bolt slows for {1} s.":"冰箭術緩速 {1} 秒。","Arrow Shower slows for {1} s.":"箭雨緩速 {1} 秒。","Envenom slows for {1} s.":"施毒緩速 {1} 秒。","Lightning Strike slows for {1} s.":"雷擊碎緩速 {1} 秒。","Spread Attack slows for {1} s.":"火力全開緩速 {1} 秒。","+{1} Cold Bolt and +{2}% damage.":"+{1} 發冰箭術與 +{2}% 傷害。","-{1}% cast time.":"詠唱時間 -{1}%。","+{1}% petrify on hit":"命中時 +{1}% 石化","+{1}% petrify on hit.":"命中時 +{1}% 石化。","+{1}% bonus EXP on kill":"擊殺時 +{1}% 額外經驗","Chests cost {1}% less":"寶箱費用減少 {1}%","+{1} HP/s while standing still":"站著不動時 +{1} HP/秒","+{1} projectile.":"+{1} 投射物。","Thunderstorm deals +{1}% damage and +{2}% area.":"雷爆術傷害 +{1}%，範圍 +{2}%。","Arrow Shower has a {1}% chance to stun.":"箭雨有 {1}% 機率暈眩。","Arrow Shower fires one more arrow and deals +{1}% damage.":"箭雨多射一支箭，傷害 +{1}%。","Improve Concentration lasts +{1}% longer and has +{2} Haste.":"心神凝聚持續時間延長 {1}%，並 +{2} 冷卻縮減。","Arrow Repel deals +{1}% damage and +{2}% range.":"衝鋒箭傷害 +{1}%，射程 +{2}%。","Your basic attacks pierce {1} more enemy.":"你的普通攻擊多貫穿 {1} 個敵人。","Ruwach spins {1}% faster and deals +{2}% damage.":"光獵旋轉加快 {1}%，傷害 +{2}%。","Holy Light deals +{1}% damage to undead.":"神聖之光對不死族傷害 +{1}%。","Signum Crucis deals +{1}% damage and +{2}% area.":"天使之光傷害 +{1}%，範圍 +{2}%。","Heel Drop stuns {1} s longer.":"砸踢的暈眩延長 {1} 秒。","Crazy Uproar lasts +{1}% longer.":"大聲吶喊持續時間延長 {1}%。","War cry: your next {1} skills reach {2} more enemy.":"戰吼：接下來 {1} 個技能多波及 {2} 個敵人。","You plant a vending machine: nearby enemies go for it for {1} s, then it bursts in a shower of zeny that damages everyone around it.":"擺下一台自動販賣機：附近敵人會在 {1} 秒內朝它衝去，接著它爆成金幣雨，傷害周圍所有敵人。","Sprint lasts +{1}% longer.":"跑步持續時間延長 {1}%。","Cart Revolution deals +{1}% damage and +{2}% area.":"手推車攻擊傷害 +{1}%，範圍 +{2}%。","Heel Drop hits one more enemy and deals +{1}% damage.":"砸踢多擊中一個敵人，傷害 +{1}%。","Throw Shuriken throws one more and deals +{1}% damage.":"投擲飛鏢多擲一枚，傷害 +{1}%。","Lightning Strike deals +{1}% damage and +{2}% area.":"雷擊碎傷害 +{1}%，範圍 +{2}%。","Throw Kunai blinds for {1} s.":"投擲飛刀致盲 {1} 秒。","Throw Kunai poisons for +{1} damage per second.":"投擲飛刀的毒每秒 +{1} 傷害。","Desperado blinds for {1} s.":"亡命之徒致盲 {1} 秒。","Desperado fires one more burst and deals +{1}% damage.":"亡命之徒多一輪連射，傷害 +{1}%。","Ground Drift has a {1}% chance to stun.":"四面埋伏有 {1}% 機率暈眩。","Endure lasts +{1}% longer.":"霸體持續時間延長 {1}%。","+{1} HP/s while moving":"移動時 +{1} HP/秒","+{1}% damage at low HP, +{2}% damage.":"低 HP 時傷害 +{1}%，傷害 +{2}%。","+{1} Fire Bolt and +{2}% damage.":"+{1} 發火箭術與 +{2}% 傷害。","Cold Bolt freezes with +{1}% chance.":"冰箭術冰凍機率 +{1}%。","Frost Diver freezes {1}.{2} s longer.":"冰凍術的冰凍延長 {1}.{2} 秒。","Double Strafe fires one more arrow and deals +{1}% damage.":"二連矢多射一支箭，傷害 +{1}%。","Arrow Shower slows for {1}.{2} s.":"箭雨緩速 {1}.{2} 秒。","Arrow Repel stuns with {1}% chance.":"衝鋒箭有 {1}% 機率暈眩。","Holy Light casts one more ray and deals +{1}% damage.":"神聖之光多一道光，傷害 +{1}%。","Signum Crucis marks a further +{1}%.":"天使之光的標記效果再 +{1}%。","Envenom poisons for +{1}.{2} damage per second.":"施毒的毒每秒 +{1}.{2} 傷害。","Sand Attack blinds {1}.{2} s longer.":"噴砂的致盲延長 {1}.{2} 秒。","+{1}% zeny.":"金幣 +{1}%。","+{1}% extra EXP on kill.":"擊殺時額外經驗 +{1}%。","+{1}% double cast, +{2}% critical damage.":"+{1}% 雙重詠唱，+{2}% 暴擊傷害。","{1}% chance that opening a chest is free":"開啟寶箱有 {1}% 機率免費","Cart Revolution stuns with {1}% chance.":"手推車攻擊有 {1}% 機率暈眩。","Mammonite deals +{1}% damage and splashes {2}% further.":"金錢攻擊傷害 +{1}%，濺射範圍擴大 {2}%。","Tornado Kick stuns with {1}% chance.":"迴旋踢有 {1}% 機率暈眩。","Tornado Kick deals +{1}% damage and +{2}% area.":"迴旋踢傷害 +{1}%，範圍 +{2}%。","Heel Drop stuns {1}.{2} s longer.":"砸踢的暈眩延長 {1}.{2} 秒。","+{1}.{2} HP/s while standing still.":"站著不動時 +{1}.{2} HP/秒。","Throw Kunai throws {1} more kunai and deals +{2}% damage.":"投擲飛刀多擲 {1} 枚，傷害 +{2}%。","Triple Action fires {1} more bullets and deals +{2}% damage.":"三連攻擊多射 {1} 發子彈，傷害 +{2}%。","Tracking shoots one more target and deals +{1}% damage.":"百步穿楊多射一個目標，傷害 +{1}%。","+{1}.{2} armor":"+{1}.{2} 護甲","-{1}% cooldown":"-{1}% 冷卻","+{1}% damage taken":"+{1}% 受到傷害","+{1}% EXP":"+{1}% 經驗值","+{1}% pickup radius":"+{1}% 拾取範圍","+{1}% damage to bosses and undead":"對頭目與不死族傷害 +{1}%","-{1}% speed":"-{1}% 速度","-{1} max HP":"-{1} 最大 HP","+{1}% damage at low HP":"低 HP 時傷害 +{1}%","-{1} HP/s":"-{1} HP/秒","-{1}% cast time":"-{1}% 詠唱時間","+{1}% size":"+{1}% 大小","+{1} target ({2} left)":"+{1} 目標（剩餘 {2}）","+{1} bullet":"+{1} 發子彈","+{1} bullets":"+{1} 發子彈","+{1} cells":"+{1} 格","+{1} caltrop":"+{1} 個撒菱","+{1} caltrops":"+{1} 個撒菱","+{1} bolt":"+{1} 發","+{1} bolts":"+{1} 發","+{1} soul":"+{1} 個靈魂","+{1} souls":"+{1} 個靈魂","+{1} shuriken":"+{1} 枚手裡劍","+{1} shurikens":"+{1} 枚手裡劍","+{1} petal":"+{1} 片花瓣","+{1} petals":"+{1} 片花瓣","+{1} kunai":"+{1} 枚苦無","+{1} burst":"+{1} 輪連射","+{1} bursts":"+{1} 輪連射","selling {1} of {2}":"販賣 {1}／擁有 {2}","{1} selected":"已選 {1} 件","Will you sell me {1} item for {2}?":"要以 {2} 賣給我 {1} 件物品嗎？","Will you sell me {1} items for {2}?":"要以 {2} 賣給我 {1} 件物品嗎？","You sold {1} item: {2}.":"你賣出了 {1} 件物品：{2}。","You sold {1} items: {2}.":"你賣出了 {1} 件物品：{2}。","In Safari, tap":"在 Safari 中點擊",". The game will open full screen, like an app.":"。遊戲會像 App 一樣全螢幕開啟。","Version {1}":"版本 {1}","{1} · this run only":"{1} · 僅限本局","Splashes {1}% of the damage to monsters within {2} m":"對 {2} 公尺內的怪物濺射 {1}% 傷害","Cards for {1}":"{1} 的卡片","Equipped in {1}":"裝備於{1}","{1} socketed":"已插入 {1} 張","Already at the maximum (+{1}).":"已達上限（+{1}）。","cone strike ({1}% of the damage to the others)":"錐形打擊（對其他敵人造成 {1}% 傷害）","+{1} pierce":"+{1} 貫穿","-{1}% movement speed":"-{1}% 移動速度","+{1}% splash":"+{1}% 濺射","Activate the barrier mechanisms ({1}/3)":"啟動結界機關（{1}/3）","Mechanism activated ({1}/3)":"機關已啟動（{1}/3）","Job Lv {1} (you have {2})":"職業等級 {1}（你有 {2}）","Basic attacks at {1}% damage":"普通攻擊造成 {1}% 傷害","Guaranteed double cast ({1} left)":"必定雙重詠唱（剩餘 {1}）","+{1}% pierce chance and +{2}% crit damage":"+{1}% 貫穿機率與 +{2}% 暴擊傷害","Caltrops poisons: {1} damage per second.":"撒菱帶毒：每秒 {1} 傷害。","Your poisons last {1}% less and deal the same total damage in that time":"你的毒持續時間減少 {1}%，但在這段時間內造成相同的總傷害","+{1} Haste and +{2}% damage on Fan of Knives, Throw Stone and Sand Attack":"飛刀扇、投擲石頭與噴砂 +{1} 冷卻縮減與 +{2}% 傷害","Your critical hits stun for {1} s (except bosses).":"你的暴擊使敵人暈眩 {1} 秒（頭目除外）。","+{1} homunculus":"+{1} 生命體","+{1} homunculi":"+{1} 生命體","+{1} bolt from levels":"等級帶來 +{1} 發","+{1} bolts from levels":"等級帶來 +{1} 發","A magic slash of the infused element that sweeps a cone in front of you (+{1}% damage; fire +{2} target, ice +{3}% reach, lightning +{4}% double cast); with several infusions it combines them for more damage (+{5}% with two, +{6}% with three).":"以附加屬性的魔法斬擊橫掃前方錐形範圍（+{1}% 傷害；火 +{2} 目標、冰 +{3}% 攻擊範圍、雷 +{4}% 雙重詠唱）；有多種附加時會組合起來造成更多傷害（兩種 +{5}%、三種 +{6}%）。","Your Peco charges the strongest enemy within {1} m: hits harder the farther away it was (up to double) and stuns it.":"大嘴鳥衝向 {1} 公尺內最強的敵人：距離越遠打得越重（最多兩倍）並使其暈眩。","Two cross-shaped slashes of holy light on the nearest enemy (x{1} vs undead).":"對最近的敵人施以兩道十字形聖光斬擊（對不死族 x{1}）。","Great cross of light around you: heavy holy damage (x{1} vs undead), but it costs {2}% of your current HP.":"在身邊展開巨大的光之十字：沉重的神聖傷害（對不死族 x{1}），但消耗當前 HP 的 {2}%。","For {1} s your shield blocks {2}% of the hits you take (they deal nothing). Requires a shield.":"{1} 秒內，盾牌格擋 {2}% 受到的攻擊（不造成任何傷害）。需要盾牌。","+{1} meteor and +{2}% damage.":"+{1} 顆隕石與 +{2}% 傷害。","Ice burst around you: damages and freezes nearby enemies for {1} s.":"在身邊爆發冰霜：傷害附近敵人並冰凍 {1} 秒。","+{1} hits and +{2}% damage.":"+{1} 次打擊與 +{2}% 傷害。","+{1} bolts and +{2}% damage.":"+{1} 發與 +{2}% 傷害。","You raise a field of fire at your feet for {1} s: it burns enemies inside and, while you stand in it, you deal +{2}% damage.":"在腳下升起火焰領域 {1} 秒：燃燒其中的敵人，你站在裡面時傷害 +{2}%。","You flood the ground at your feet for {1} s: while inside you heal {2}% of your HP per second, and enemies that step in get soaked (slower and take some damage).":"在腳下引水淹沒地面 {1} 秒：在其中時每秒回復 {2}% HP，踏入的敵人會被浸濕（變慢並受到些許傷害）。","+{1} spike.":"+{1} 根尖刺。","+{1} impact and +{2}% damage.":"+{1} 次衝擊與 +{2}% 傷害。","For {1} s, each basic attack has a {2}% chance to cast a Fire Bolt, Cold Bolt or Lightning Bolt on its target (scales with MATK).":"{1} 秒內，每次普通攻擊有 {2}% 機率對目標施放火箭術、冰箭術或雷擊術（隨 MATK 成長）。","A random spell: meteor shower, ice burst, lightning on the horde, healing, gravity that pulls in and stuns enemies, or a stroke of luck (+{1}% damage for {2} s).":"隨機法術：流星雨、冰霜爆發、雷擊怪物群、治療、拉近並暈眩敵人的重力，或好運降臨（{2} 秒內 +{1}% 傷害）。","Your falcon marks the {1} strongest enemies in sight: they take {2}% more damage for {3} s.":"你的獵鷹標記視野內最強的 {1} 個敵人：{3} 秒內受到傷害提高 {2}%。","You set {1} traps near the enemies: the first one stepped on bursts and damages everyone around. They last {2} s.":"在敵人附近設置 {1} 個陷阱：第一個被踩到的會爆炸並傷害周圍所有敵人。持續 {2} 秒。","You throw magic sand on a group of enemies: they fall asleep for {1} s (bosses, half as long).":"向一群敵人撒出魔法沙：使其睡眠 {1} 秒（頭目減半）。","A lullaby that puts nearby enemies to sleep for {1} s (bosses, half as long).":"使附近敵人睡眠 {1} 秒的搖籃曲（頭目減半）。","You spread a {1} s veil at your feet: enemies inside are blinded and deal half damage.":"在腳下展開 {1} 秒的帷幕：其中的敵人被致盲且傷害減半。","For {1} s: +{2}% damage and +{3} armor.":"{1} 秒內：+{2}% 傷害與 +{3} 護甲。","For {1} s you take {2}% less damage.":"{1} 秒內受到傷害減少 {2}%。","You consecrate the ground at your feet for {1} s: while inside you heal {2}% of your HP per second, and enemies that step in burn (x{3} vs undead).":"淨化腳下地面 {1} 秒：在其中時每秒回復 {2}% HP，踏入的敵人會燃燒（對不死族 x{3}）。","You bless the ground around you: damages nearby enemies (x{1} vs undead) and makes them take {2}% more damage for {3} s.":"祝福周圍地面：傷害附近敵人（對不死族 x{1}），並使其在 {3} 秒內受到傷害提高 {2}%。","Holy crosses strike an area six times: heavy damage to everything inside (x{1} vs undead).":"神聖十字對一片區域打擊六次：對其中一切造成沉重傷害（對不死族 x{1}）。","+{1} cross and +{2}% damage.":"+{1} 道十字與 +{2}% 傷害。","For {1} s you deal {2}% more damage.":"{1} 秒內傷害提高 {2}%。","For {1} s: +{2} Haste.":"{1} 秒內：+{2} 冷卻縮減。","You summon spirit spheres that orbit you for {1} s and hit the enemies they touch.":"召喚環繞你 {1} 秒的氣彈，擊中碰到的敵人。","+{1} sphere and +{2}% damage.":"+{1} 顆氣彈與 +{2}% 傷害。","You unleash your spirit: for {1} s, +{2}% critical and +{3} Haste.":"釋放氣勢：{1} 秒內 +{2}% 暴擊與 +{3} 冷卻縮減。","For {1} s all your physical hits poison ({2} damage per second for {3} s, grows with ATK).":"{1} 秒內，你所有物理攻擊都會帶毒（{3} 秒內每秒 {2} 傷害，隨 ATK 成長）。","You scatter poisonous dust over a group of enemies: the cloud lasts {1} s and strongly poisons everyone who passes through it.":"在一群敵人上方撒下毒粉：毒雲持續 {1} 秒，使所有經過者重度中毒。","You turn invisible for {1} s: enemies can't touch you, you move {2}% faster and deal {3}% more damage.":"隱形 {1} 秒：敵人碰不到你，移動速度 +{2}%，傷害 +{3}%。","Slashes all around you: they damage nearby enemies, blind them for {1} s and make them take {2}% more damage for {3} s.":"向四周斬擊：傷害附近敵人，使其致盲 {1} 秒，並在 {3} 秒內受到傷害提高 {2}%。","You disarm the {1} strongest enemies in range: they deal {2}% less damage for {3} s.":"繳械射程內最強的 {1} 個敵人：{3} 秒內造成的傷害減少 {2}%。","You grab the nearest enemy and throw it far away: damage and a {1} s stun.":"抓住最近的敵人並將其遠遠拋出：造成傷害並暈眩 {1} 秒。","A quick hit on the nearest enemy that steals zeny ({1} or more depending on the monster).":"快速打擊最近的敵人並偷取金幣（依怪物而定，{1} 或更多）。","You paint the ground under a group of enemies for {1} s: those who step on it are slowed, take some damage and {2}% more from everything.":"在一群敵人腳下塗鴉 {1} 秒：踩到的敵人會減速、受到些許傷害，且受到所有傷害提高 {2}%。","For {1} s you deal {2}% more damage, and {3}% more to bosses and elites.":"{1} 秒內傷害提高 {2}%，對頭目與菁英提高 {3}%。","+{1} rock and +{2}% damage.":"+{1} 塊岩石與 +{2}% 傷害。","You throw a flask of acid at the nearest enemy: heavy damage and it corrodes its armor (it takes {1}% more damage for {2} s).":"向最近的敵人丟出強酸瓶：沉重傷害並腐蝕其護甲（{2} 秒內受到傷害提高 {1}%）。","You throw a fire bottle on a group: the ground burns for {1} s and burns those who step on it.":"向一群敵人丟出火焰瓶：地面燃燒 {1} 秒，灼燒踩到的敵人。","You call your homunculus for {1} s: it follows you and leaps at the nearest enemy once per second.":"召喚你的生命體 {1} 秒：牠會跟著你，每秒撲向最近的敵人一次。","You plant a Mandragora beside you for {1} s: it bites enemies that come close.":"在身邊種下曼陀蘿魔花 {1} 秒：咬住靠近的敵人。","When you're hurt, you throw yourself a potion that heals {1}% of your max HP.":"受傷時，為自己丟一瓶藥水，回復最大 HP 的 {1}%。","The sun's warmth surrounds you for {1} s: it burns and pushes away enemies that come close.":"太陽的溫暖環繞你 {1} 秒：灼燒並推開靠近的敵人。","+{1} star and +{2}% damage.":"+{1} 顆星星與 +{2}% 傷害。","For {1} s: +{2}% damage, +{3} Haste and +{4}% speed. Costs {5}% of your current HP.":"{1} 秒內：+{2}% 傷害、+{3} 冷卻縮減與 +{4}% 速度。消耗當前 HP 的 {5}%。","For {1} s, if a hit would kill you, you get back up with half your HP (once).":"{1} 秒內，若某次攻擊會讓你死亡，你會以一半 HP 站起來（一次）。","For {1} s, each hit you take heals you for {2}% of your max HP.":"{1} 秒內，每次受到攻擊都會回復最大 HP 的 {2}%。","A spirit pulls you out of the next {1} hits you take (they deal nothing).":"靈魂替你擋下接下來 {1} 次攻擊（不造成任何傷害）。","Your ice spells slow for {1} s (longer if they already slowed).":"你的冰系法術緩速 {1} 秒（若已緩速則延長）。","While riding, your Peco tramples the enemies beneath you: {1} damage per second (grows with melee ATK).":"騎乘時，大嘴鳥踐踏身下的敵人：每秒 {1} 傷害（隨近戰 ATK 成長）。","After {1} s riding without stopping, +{2}% damage.":"持續騎乘 {1} 秒不停下後，傷害 +{2}%。","Trample pushes enemies back {1} px.":"踐踏將敵人推開 {1} px。","Charge Attack reaches {1}% farther and deals +{2}% damage.":"衝鋒攻擊距離增加 {1}%，傷害 +{2}%。","Charge Attack runs over the enemies in its path: they take {1}% of its hit and are sent flying.":"衝鋒攻擊會輾過路徑上的敵人：受到其 {1}% 傷害並被擊飛。","Your Peco's trample deals {1}% more damage and you move {2}% faster.":"大嘴鳥的踐踏傷害提高 {1}%，你的移動速度 +{2}%。","Pierce makes enemies bleed {1}% of its damage over {2} s.":"連刺攻擊使敵人在 {2} 秒內流血，造成其傷害的 {1}%。","Enemies hit by Pierce take +{1}% damage for {2} s.":"被連刺攻擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Spear Boomerang flies {1}% faster and is {2}% bigger.":"投擲長矛攻擊飛行速度 +{1}%，大小 +{2}%。","Counter Attack disarms: the attacker deals {1}% less damage for {2} s.":"反擊會繳械：攻擊者在 {2} 秒內造成的傷害減少 {1}%。","When you're hit, your basic attacks deal +{1}% damage for {2} s.":"被擊中時，普通攻擊在 {2} 秒內傷害 +{1}%。","Spear Stab reaches {1}% farther.":"長矛刺擊攻擊範圍增加 {1}%。","Spear Stab has a {1}% chance to stun.":"長矛刺擊有 {1}% 機率暈眩。","Spear Quicken lasts {1}% longer.":"長矛加速術持續時間延長 {1}%。","Trampled enemies take {1}% more damage for {2} s.":"被踐踏的敵人在 {2} 秒內受到傷害提高 {1}%。","Spear Quicken gives {1}% more critical.":"長矛加速術的暴擊提高 {1}%。","Shield Charge has a {1}% higher chance to stun.":"盾擊暈眩機率提高 {1}%。","With Spear Quicken active you deal +{1}% damage and your Peco's trample deals double.":"長矛加速術期間傷害 +{1}%，大嘴鳥的踐踏傷害加倍。","Enemies hit by Holy Cross take +{1}% damage for {2} s.":"被聖十字攻擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Grand Cross costs you {1}% less HP.":"聖十字審判消耗的 HP 減少 {1}%。","Grand Cross blinds enemies for {1} s.":"聖十字審判使敵人致盲 {1} 秒。","Grand Cross: +{1}% damage and +{2}% area, and it gives back the HP it costs you.":"聖十字審判：+{1}% 傷害與 +{2}% 範圍，並返還消耗的 HP。","Shield Boomerang flies {1}% faster and is {2}% bigger.":"迴旋盾擊飛行速度 +{1}%，大小 +{2}%。","Shield Boomerang has a {1}% chance to stun.":"迴旋盾擊有 {1}% 機率暈眩。","You reflect {1}% of the damage the attacker deals to you.":"將攻擊者對你造成傷害的 {1}% 反射回去。","Auto Guard lasts {1}% longer.":"自動防禦持續時間延長 {1}%。","When Auto Guard blocks, a holy light deals {1} damage (grows with ATK) to nearby enemies.":"自動防禦格擋時，聖光對附近敵人造成 {1} 傷害（隨 ATK 成長）。","When Auto Guard blocks, you heal {1}% of your max HP.":"自動防禦格擋時，回復最大 HP 的 {1}%。","Auto Guard blocks {1}% more hits.":"自動防禦多格擋 {1}% 的攻擊。","Meteor Storm has a {1}% higher chance to stun.":"隕石術暈眩機率提高 {1}%。","Meteor Storm leaves enemies burning: +{1} damage per second for {2} s.":"隕石術使敵人燃燒：{2} 秒內每秒 +{1} 傷害。","Enemies hit by Fire Pillar take +{1}% damage for {2} s.":"被火柱攻擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Frost Nova freezes {1} s longer.":"霜凍之術的冰凍延長 {1} 秒。","Frozen enemies take {1}% more damage.":"冰凍的敵人受到傷害提高 {1}%。","Storm Gust slows {1} s longer.":"暴風雪的緩速延長 {1} 秒。","Jupitel Thunder has a {1}% chance to stun.":"雷鳴術有 {1}% 機率暈眩。","Enemies hit by Jupitel Thunder take +{1}% damage for {2} s.":"被雷鳴術命中的敵人在 {2} 秒內受到傷害 +{1}%。","Lord of Vermilion blinds everyone it hits for {1} s.":"怒雷強擊使所有命中的敵人致盲 {1} 秒。","Volcano lasts {1}% longer.":"火元素領域持續時間延長 {1}%。","Inside Volcano you deal {1}% more damage.":"在火元素領域範圍內傷害提高 {1}%。","Deluge heals you {1}% more of your HP per second.":"水元素領域每秒多回復 {1}% HP。","Deluge slows {1} s longer.":"水元素領域的緩速延長 {1} 秒。","Earth Spike has a {1}% chance to stun.":"地震術有 {1}% 機率暈眩。","Enemies hit by Earth Spike take +{1}% damage for {2} s.":"被地震術命中的敵人在 {2} 秒內受到傷害 +{1}%。","Hindsight casts bolts with a {1}% higher chance.":"自動念咒施放箭術的機率提高 {1}%。","Hindsight lasts {1}% longer.":"自動念咒持續時間延長 {1}%。","Hindsight's bolts deal {1}% more damage.":"自動念咒的箭術傷害提高 {1}%。","Blitz Beat makes enemies bleed {1}% of its damage over {2} s.":"閃電衝擊使敵人在 {2} 秒內流血，造成其傷害的 {1}%。","Blitz Beat has a {1}% chance to stun.":"閃電衝擊有 {1}% 機率暈眩。","Enemies marked by Detecting take {1}% more damage.":"被獵鷹尋敵標記的敵人受到傷害提高 {1}%。","When you hit a marked enemy with your bow, your falcon pecks it with a {1}% chance.":"用弓命中被標記的敵人時，你的獵鷹有 {1}% 機率啄擊牠。","Claymore Trap snares (stuns for {1} s) with a {2}% chance.":"爆散陷阱有 {2}% 機率困住敵人（暈眩 {1} 秒）。","Claymore Trap leaves enemies burning: +{1} damage per second for {2} s.":"爆散陷阱使敵人燃燒：{2} 秒內每秒 +{1} 傷害。","Claymore Trap has a {1}% chance to freeze.":"爆散陷阱有 {1}% 機率冰凍。","Stunned or sleeping enemies take {1}% more damage.":"暈眩或睡眠中的敵人受到傷害提高 {1}%。","Phantasmic Arrow is {1}% bigger.":"幻影箭大小 +{1}%。","Phantasmic Arrow has a {1}% chance to stun.":"幻影箭有 {1}% 機率暈眩。","Dissonance demoralizes: enemies deal {1}% less damage for {2} s.":"不諧和音會降低士氣：敵人在 {2} 秒內造成的傷害減少 {1}%。","Lullaby puts enemies to sleep {1} s longer.":"搖籃曲的睡眠延長 {1} 秒。","Enemies within {1} m of you are always slowed ({2} s of slow every second).":"你周圍 {1} 公尺內的敵人永遠處於緩速狀態（每秒緩速 {2} 秒）。","Loki's Veil lasts {1}% longer.":"洛奇的悲鳴持續時間延長 {1}%。","Loki's Veil deals {1} damage per second (grows with ranged ATK) to those inside.":"洛奇的悲鳴對範圍內的敵人每秒造成 {1} 傷害（隨遠程 ATK 成長）。","A Drum on the Battlefield gives {1}% more damage.":"戰鼓震天的傷害提高 {1}%。","A Drum on the Battlefield lasts {1}% longer.":"戰鼓震天持續時間延長 {1}%。","A Drum on the Battlefield gives {1} more armor.":"戰鼓震天的護甲提高 {1}。","Invulnerable Siegfried lasts {1}% longer.":"不死神齊格弗里德持續時間延長 {1}%。","Invulnerable Siegfried reduces {1}% more damage.":"不死神齊格弗里德多減少 {1}% 傷害。","When you sing Invulnerable Siegfried you heal {1}% of your max HP.":"演唱不死神齊格弗里德時，回復最大 HP 的 {1}%。","With A Drum on the Battlefield and Invulnerable Siegfried active at the same time you deal +{1}% damage.":"戰鼓震天與不死神齊格弗里德同時生效時，傷害 +{1}%。","Sanctuary heals you {1}% more of your HP per second.":"光耀之堂每秒多回復 {1}% HP。","Sanctuary lasts {1}% longer.":"光耀之堂持續時間延長 {1}%。","Safety Wall absorbs {1} more hit.":"暗之障壁多吸收 {1} 次攻擊。","Safety Wall absorbs {1} more hits.":"暗之障壁多吸收 {1} 次攻擊。","Each hit Safety Wall absorbs heals you for {1}% of your max HP.":"暗之障壁每吸收一次攻擊，回復最大 HP 的 {1}%。","Sanctuary lasts {1}% longer, is {2}% bigger and heals you {3}% more of your HP per second.":"光耀之堂持續時間延長 {1}%、範圍擴大 {2}%，每秒多回復 {3}% HP。","Benedictio marks {1}% more.":"聖母之祈福的標記效果提高 {1}%。","Impositio Manus gives {1}% more damage.":"神威祈福的傷害提高 {1}%。","Impositio Manus lasts {1}% longer.":"神威祈福持續時間延長 {1}%。","Your basic attacks deal +{1}% damage to undead.":"普通攻擊對不死族傷害 +{1}%。","Magnificat gives {1} more Haste.":"聖母之頌歌多給 {1} 冷卻縮減。","Magnificat lasts {1}% longer.":"聖母之頌歌持續時間延長 {1}%。","While Magnificat lasts you heal {1}% of your max HP per second.":"聖母之頌歌持續期間，每秒回復最大 HP 的 {1}%。","With Impositio Manus and Magnificat active at the same time you deal +{1}% damage.":"神威祈福與聖母之頌歌同時生效時，傷害 +{1}%。","Call Spirits orbits {1}% faster and {2}% farther.":"蓄氣環繞速度 +{1}%，距離 +{2}%。","Call Spirits lasts {1}% longer.":"蓄氣持續時間延長 {1}%。","Chain Combo has a {1}% chance to stun.":"連環全身掌有 {1}% 機率暈眩。","Casting Chain Combo removes {1}% of Combo Finish's remaining cooldown.":"施放連環全身掌會減少猛龍誇強 {1}% 的剩餘冷卻。","Enemies hit by Combo Finish take +{1}% damage for {2} s.":"被猛龍誇強命中的敵人在 {2} 秒內受到傷害 +{1}%。","Fury gives {1}% more critical.":"爆氣的暴擊提高 {1}%。","Fury lasts {1}% longer.":"爆氣持續時間延長 {1}%。","Fury gives {1} more Haste.":"爆氣多給 {1} 冷卻縮減。","Sonic Blow has a {1}% chance to stun.":"音速投擲有 {1}% 機率暈眩。","Grimtooth reaches {1}% farther.":"無影之牙攻擊範圍增加 {1}%。","Grimtooth makes enemies bleed {1}% of its damage over {2} s.":"無影之牙使敵人在 {2} 秒內流血，造成其傷害的 {1}%。","Enchant Poison's poison deals {1}% more damage.":"塗毒的毒傷害提高 {1}%。","Enchant Poison lasts {1}% longer.":"塗毒持續時間延長 {1}%。","Your poisons last {1} s longer.":"你的毒延長 {1} 秒。","Venom Dust lasts {1}% longer.":"病毒散撥持續時間延長 {1}%。","During Cloaking you deal {1}% more damage.":"偽裝期間傷害提高 {1}%。","Cloaking lasts {1}% longer.":"偽裝持續時間延長 {1}%。","When you leave Cloaking, +{1}% critical for {2} s.":"離開偽裝時，{2} 秒內暴擊 +{1}%。","Venom Knife poisons for {1} more damage per second.":"毒刃的毒每秒多 {1} 傷害。","Back Stab makes enemies bleed {1}% of its damage over {2} s.":"背刺使敵人在 {2} 秒內流血，造成其傷害的 {1}%。","Back Stab has a {1}% chance to stun.":"背刺有 {1}% 機率暈眩。","Raid blinds {1} s longer.":"潛擊的致盲延長 {1} 秒。","Divest Weapon removes {1}% more damage.":"卸除武器多減少 {1}% 傷害。","Divest Weapon lasts {1} s longer.":"卸除武器延長 {1} 秒。","Disarmed or demoralized enemies take {1}% more damage.":"被繳械或士氣低落的敵人受到傷害提高 {1}%。","Enemies thrown by Intimidate take +{1}% damage for {2} s.":"被脅持拋出的敵人在 {2} 秒內受到傷害 +{1}%。","Steal Coin steals {1}% more zeny.":"偷錢多偷 {1}% 金幣。","Graffiti makes enemies take {1}% more damage.":"塗鴉使敵人受到傷害提高 {1}%。","Axe Boomerang makes enemies bleed {1}% of its damage over {2} s.":"回力斧使敵人在 {2} 秒內流血，造成其傷害的 {1}%。","Weapon Perfection deals {1}% more damage to bosses and elites.":"無視體型攻擊對頭目與菁英傷害提高 {1}%。","Weapon Perfection lasts {1}% longer.":"無視體型攻擊持續時間延長 {1}%。","Weapon Perfection also gives {1} Haste.":"無視體型攻擊另給 {1} 冷卻縮減。","Enemies hit by Rush Quake take +{1}% damage for {2} s.":"被衝擊震地命中的敵人在 {2} 秒內受到傷害 +{1}%。","Greed gets {1} more zeny from each enemy it hits.":"貪婪從每個命中的敵人身上多拿 {1} 金幣。","Ore Discovery has a {1}% chance to stun.":"尋找礦石有 {1}% 機率暈眩。","Acid Terror corrodes {1}% more.":"強酸攻擊的腐蝕提高 {1}%。","Demonstration burns {1}% longer.":"火煙瓶投擲的燃燒延長 {1}%。","Call Homunculus lasts {1}% longer.":"生命體召喚持續時間延長 {1}%。","Your homunculus attacks {1}% faster.":"你的生命體攻擊速度提高 {1}%。","Summon Flora slows those it bites for {1} s.":"生物調撥使被咬的敵人緩速 {1} 秒。","Potion Pitcher heals {1}% more of your max HP.":"藥水投擲多回復最大 HP 的 {1}%。","After Potion Pitcher you heal {1}% of your HP per second for {2} s.":"藥水投擲後，{2} 秒內每秒回復 {1}% HP。","Potion Pitcher splashes: {1} damage (grows with ATK) to nearby enemies.":"藥水投擲會濺射：對附近敵人造成 {1} 傷害（隨 ATK 成長）。","Chemical Protection lasts {1}% longer.":"化學保護持續時間延長 {1}%。","Chemical Protection reduces {1}% more damage.":"化學保護多減少 {1}% 傷害。","With Chemical Protection, whoever hits you takes {1} damage (grows with ATK).":"化學保護期間，攻擊你的敵人受到 {1} 傷害（隨 ATK 成長）。","Chemical Protection lasts {1}% longer and reduces {2}% more damage.":"化學保護持續時間延長 {1}%，多減少 {2}% 傷害。","Warmth of the Sun lasts {1}% longer.":"太陽的溫暖持續時間延長 {1}%。","Warmth of the Sun leaves enemies burning: +{1} damage per second for {2} s.":"太陽的溫暖使敵人燃燒：{2} 秒內每秒 +{1} 傷害。","Solar Burst has a {1}% chance to stun.":"太陽爆發有 {1}% 機率暈眩。","Full Moon Kick demoralizes: enemies deal {1}% less damage for {2} s.":"滿月踢會降低士氣：敵人在 {2} 秒內造成的傷害減少 {1}%。","New Moon Kick has a {1}% chance to stun.":"新月踢有 {1}% 機率暈眩。","Union lasts {1}% longer.":"太陽和月亮和星星的融合持續時間延長 {1}%。","Union gives {1}% more damage.":"太陽和月亮和星星的融合的傷害提高 {1}%。","Enemies hit by Esma take +{1}% damage for {2} s.":"被艾斯麻命中的敵人在 {2} 秒內受到傷害 +{1}%。","Estun stuns {1} s longer.":"艾斯敦的暈眩延長 {1} 秒。","Kaizel revives you with {1}% more HP.":"凱易哲復活時多回復 {1}% HP。","Kaahi heals you {1}% more of your HP with each hit.":"凱阿希每次受擊多回復 {1}% HP。","Kaahi lasts {1}% longer.":"凱阿希持續時間延長 {1}%。","With Kaahi active, whoever hits you takes {1} damage (grows with MATK).":"凱阿希生效時，攻擊你的敵人受到 {1} 傷害（隨 MATK 成長）。","Kaupe dodges {1} more hit.":"凱誣僕多閃避 {1} 次攻擊。","Kaupe dodges {1} more hits.":"凱誣僕多閃避 {1} 次攻擊。","When Kaupe dodges a hit, the attacker takes {1} damage (grows with MATK).":"凱誣僕閃避攻擊時，攻擊者受到 {1} 傷害（隨 MATK 成長）。","With Kaahi active and Kaupe charges left you deal +{1}% damage.":"凱阿希生效且凱誣僕仍有次數時，傷害 +{1}%。","+{1} targets on the next Soul Strike":"下一次聖靈召喚 +{1} 目標","Clear {1} for the first time.":"首次通關{1}。","Boss hunter: {1}":"頭目獵人：{1}","Defeat {1}":"擊敗{1}","Defeat {1} for the first time.":"首次擊敗{1}。","Defeat {1} {2} times.":"擊敗{1} {2} 次。","{1} hunter":"{1}獵人","Kill {1} {2}.":"擊殺 {1} 隻{2}。","Test character: starts at Lv {1} and Job Lv {2}, with all its points to spend and legendary gear worth about {3} gearscore.":"測試角色：從 Lv {1}、職業等級 {2} 開始，所有點數可分配，並配有約 {3} 裝備評分的傳說裝備。","Two two-handed sword blows on the nearest enemy that send it flying: those behind it take {1}% of the hit and are knocked away.":"對最近的敵人施以兩記雙手劍重擊並將其擊飛：其後方的敵人受到該擊 {1}% 的傷害並被擊退。","You ride your Peco Peco: you move {1}% faster and your mount's talents kick in (trample, gallop...).":"騎上大嘴鳥：移動速度 +{1}%，坐騎相關天賦開始生效（踐踏、奔馳…）。","Bowling Bash sends the enemy {1}% farther and catches more along the way.":"怪物互擊將敵人擊飛的距離增加 {1}%，沿途捲入更多敵人。","Bowling Bash has a {1}% chance to stun.":"怪物互擊有 {1}% 機率暈眩。","invites you to their party.":"邀請你加入隊伍。","Getting up {1}%":"起身中 {1}%","bonus ×{1}":"加成 ×{1}","{1} at {2}":"{2} 時為{1}","Unlocked by clearing floor {1} of the Endless Tower":"通過無盡之塔第 {1} 層後解鎖","Wrong username or answers. {1} tries left this week.":"帳號或答案錯誤。本週還剩 {1} 次機會。","Updating… {1}%":"更新中… {1}%","Maintenance starts in {1} minutes.":"維護將在 {1} 分鐘後開始。","for {1} days":"{1} 天","Downloading… {1}%":"下載中… {1}%","You already have the latest version ({1}).":"你已經是最新版本（{1}）。","A new version ({1}) is available. It downloads, the game closes and installs it by itself. Your characters stay as they are.":"有新版本（{1}）可用。下載後遊戲會關閉並自動安裝。你的角色維持原樣。","+{1} points":"+{1} 點","+{1} critical damage":"+{1} 暴擊傷害","+{1} damage":"+{1} 傷害","+{1} critical chance":"+{1} 暴擊率","+{1} speed":"+{1} 速度","+{1} area":"+{1} 範圍","-{1} damage taken":"-{1} 受到傷害","Starts in {1}":"{1} 後開始","Waves {1}–{2}":"第 {1}–{2} 波","You can start at any wave up to the highest you have reached ({1}). Best wave cleared: {2}.":"你可以從已到達的最高波次（{1}）以內的任何一波開始。最佳通關波次：{2}。","{1} left":"剩餘 {1}","You cleared every open wave! +{1} points":"你通過了所有已開啟的波次！+{1} 點","Wave {1} cleared! +{2} tower points":"第 {1} 波通關！+{2} 塔點數","Wave {1}! Bosses incoming!":"第 {1} 波！頭目來襲！","Wave {1}!":"第 {1} 波！","{1} to check (+{2})":"待檢查 {1} 局（+{2}）","{1} s to kill the bosses before they enrage!":"{1} 秒內擊殺頭目，否則牠們會暴怒！","Combo {1}":"連擊 {1}","+{1} monsters at once and per second":"同時與每秒出現的怪物 +{1}","+{1} monster health":"+{1} 怪物血量","+{1} monster damage":"+{1} 怪物傷害","+{1} monster speed":"+{1} 怪物速度","{1} of monsters spawn as elites":"{1} 的怪物以菁英形態出現","+{1} boss health and damage":"+{1} 頭目血量與傷害","Bosses enrage {1} earlier":"頭目提早 {1} 暴怒","+{1} damage taken":"+{1} 受到傷害","{1} of monsters explode on death":"{1} 的怪物死亡時爆炸","+{1} skill cooldown":"+{1} 技能冷卻","No healing on clearing a wave and you lose {1} health":"通過波次時不回血，並失去 {1} 生命","-{1} healing on clearing a wave":"通過波次時回血 -{1}","The combo breaks {1} sooner":"連擊提早 {1} 中斷","{1} of monsters shoot at you on death":"{1} 的怪物死亡時朝你射擊","You see {1} less around you":"你周圍的視野減少 {1}","Pick {1}: they make the tower harder and raise the score of every kill":"選擇 {1} 個：讓塔變得更難，並提高每次擊殺的分數","+{1}% score":"+{1}% 分數","Best: {1}":"最佳：{1}","{1} h ago":"{1} 小時前","{1} days ago":"{1} 天前","Restoring your run… {1}%":"恢復你的遊戲中… {1}%","Rank {1} this month":"本月第 {1} 名","Specialize in":"要專精","You are a":"你現在是","Enemies marked by Detecting take {1}% more damage":"被獵鷹尋敵標記的敵人受到傷害提高 {1}%","Claymore Trap traps last {1}% longer.":"爆散陷阱的陷阱持續時間延長 {1}%。","Claymore Trap blinds those it hits for {1} s.":"爆散陷阱使命中的敵人致盲 {1} 秒。","Enemies hit by Beast Strafing take +{1}% damage for 4 s.":"被動物猛擊命中的敵人在 4 秒內受到傷害 +{1}%。","Beast Strafing bleeds {1}% of its damage over 3 s.":"動物猛擊在 3 秒內造成其傷害 {1}% 的流血。","You deal {1}% more damage to enemies below {2}% HP":"對 HP 低於 {2}% 的敵人傷害提高 {1}%","Each class has 3 branches; rows open every {1} points spent in the branch.":"每個職業有 3 個分支；在分支中每投入 {1} 點就開啟下一排。","Max rank {1}":"最高等級 {1}","{1} ranks":"{1} 級","It comes from {1} and keeps its tree (50 points). On promotion you choose":"由{1}轉職而來並保留其天賦樹（50 點）。轉職時從這三個分支中","of these three branches as your specialization and spend its 50 points there: it adds its 2 skills. Every 2nd job class is still in development and may change.":"作為專精，並在那裡投入 50 點：會加入它的 2 個技能。所有二轉職業仍在開發中，可能會變動。","Points {1} / {2}":"分數 {1} / {2}","While riding, your Peco tramples the enemies under you: {1} damage per second (grows with melee ATK)":"騎乘時，大嘴鳥踐踏身下的敵人：每秒 {1} 傷害（隨近戰 ATK 成長）","After {1} s of riding without stopping, +{2}% damage":"持續騎乘 {1} 秒不停下後，傷害 +{2}%","Brandish Spear slows for {1} s.":"騎乘攻擊緩速 {1} 秒。","Brandish Spear pushes {1} px further.":"騎乘攻擊多推開 {1} px。","Brandish Spear bleeds {1}% of its damage over {2} s.":"騎乘攻擊在 {2} 秒內造成其傷害 {1}% 的流血。","Charge Attack has a {1}% chance to stun.":"衝鋒攻擊有 {1}% 機率暈眩。","Charge Attack runs over the enemies in its way: they take {1}% of its hit and are sent flying":"衝鋒攻擊會輾過路上的敵人：受到其 {1}% 傷害並被擊飛","Charge Attack makes the enemy deal {1}% less damage for {2} s.":"衝鋒攻擊使敵人在 {2} 秒內造成的傷害減少 {1}%。","Enemies hit by Charge Attack take +{1}% damage for {2} s.":"被衝鋒攻擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Critical hits of Pierce deal +{1}% damage.":"連刺攻擊的暴擊傷害 +{1}%。","+{1} spear":"+{1} 支長矛","+{1} spears":"+{1} 支長矛","Spear Boomerang has a {1}% chance to stun.":"投擲長矛攻擊有 {1}% 機率暈眩。","Spear Boomerang bleeds {1}% of its damage over {2} s.":"投擲長矛攻擊在 {2} 秒內造成其傷害 {1}% 的流血。","When you are hit, your basic attacks deal +{1}% damage for {2} s":"被擊中時，普通攻擊在 {2} 秒內傷害 +{1}%","Counter Attack has a {1}% chance to stun.":"反擊有 {1}% 機率暈眩。","Bowling Bash bleeds {1}% of its damage over {2} s.":"怪物互擊在 {2} 秒內造成其傷害 {1}% 的流血。","Enemies hit by Bowling Bash take +{1}% damage for {2} s.":"被怪物互擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Trampled enemies take {1}% more damage for {2} s":"被踐踏的敵人在 {2} 秒內受到傷害提高 {1}%","Spear Quicken grants {1}% more crit":"長矛加速術多給 {1}% 暴擊","Grand Cross costs you {1}% less HP":"聖十字審判消耗的 HP 減少 {1}%","You return {1}% of the damage the attacker deals to you":"將攻擊者對你造成傷害的 {1}% 反射回去","+{1} shield":"+{1} 面盾牌","+{1} shields":"+{1} 面盾牌","When Auto Guard blocks, a holy light deals {1} damage (grows with ATK) to nearby enemies":"自動防禦格擋時，聖光對附近敵人造成 {1} 傷害（隨 ATK 成長）","Auto Guard blocks {1}% more hits":"自動防禦多格擋 {1}% 的攻擊","When Auto Guard blocks you heal {1}% of your max HP":"自動防禦格擋時，回復最大 HP 的 {1}%","Frozen enemies take {1}% more damage":"冰凍的敵人受到傷害提高 {1}%","Inside Volcano you deal {1}% more damage":"在火元素領域範圍內傷害提高 {1}%","Deluge heals you {1}% more of your HP per second":"水元素領域每秒多回復 {1}% HP","Heaven's Drive slows for {1} s.":"崩裂術緩速 {1} 秒。","Hindsight casts bolts with {1}% more chance":"自動念咒施放箭術的機率提高 {1}%","Hindsight's bolts deal {1}% more damage":"自動念咒的箭術傷害提高 {1}%","Every basic attack has a {1}% chance for your falcon to make a free dive on its target":"每次普通攻擊有 {1}% 機率讓獵鷹對目標免費俯衝一次","Blitz Beat is a single dive on the largest group: it deals {1} times the damage of a dive, in twice the area, and stuns everyone for {2} s":"閃電衝擊改為對最大敵群俯衝一次：造成一次俯衝 {1} 倍的傷害，範圍加倍，並使所有敵人暈眩 {2} 秒","Detecting gives you {1}% more damage for {2} s":"獵鷹尋敵讓你在 {2} 秒內傷害提高 {1}%","Detecting gives you {1}% more crit for {2} s":"獵鷹尋敵讓你在 {2} 秒內暴擊提高 {1}%","Detecting makes you {1}% faster for {2} s":"獵鷹尋敵讓你在 {2} 秒內速度提高 {1}%","Claymore Trap leaves a single trap: it deals {1} times the damage, in a {2}% larger area, and sends everyone flying":"爆散陷阱只放一個陷阱：造成 {1} 倍傷害，範圍擴大 {2}%，並把所有敵人炸飛","Sandman puts enemies to sleep {1} s longer":"睡魔陷阱使敵人睡眠延長 {1} 秒","Stunned or sleeping enemies take {1}% more damage":"暈眩或睡眠中的敵人受到傷害提高 {1}%","When you kill a sleeping enemy, those around it fall asleep for {1} s":"擊殺睡眠中的敵人時，其周圍的敵人會睡著 {1} 秒","Enemies put to sleep by Sandman deal {1}% less damage for {2} s when they wake up":"被睡魔陷阱催眠的敵人醒來後 {2} 秒內造成的傷害減少 {1}%","Enemies put to sleep by Sandman are slowed for {1} s when they wake up":"被睡魔陷阱催眠的敵人醒來後緩速 {1} 秒","Sandman leaves the sand on the ground for {1} s: those who step on it are slowed and deal less damage":"睡魔陷阱讓沙子留在地上 {1} 秒：踩到的敵人會緩速且傷害降低","Beast Strafing bleeds {1}% of its damage over {2} s.":"動物猛擊在 {2} 秒內造成其傷害 {1}% 的流血。","Enemies hit by Beast Strafing take +{1}% damage for {2} s.":"被動物猛擊命中的敵人在 {2} 秒內受到傷害 +{1}%。","Beast Strafing's extra damage to bosses and elites goes from {1}% to {2}%":"動物猛擊對頭目與菁英的額外傷害從 {1}% 提高到 {2}%","Enemies pierced by Phantasmic Arrow take {1}% of the hit again over {2} s":"被幻影箭貫穿的敵人在 {2} 秒內再次受到該擊 {1}% 的傷害","Critical hits of Phantasmic Arrow deal +{1}% damage.":"幻影箭的暴擊傷害 +{1}%。","Phantasmic Arrow finishes off non-boss enemies left below {1}% HP":"幻影箭會終結 HP 低於 {1}% 的非頭目敵人","Lullaby puts enemies to sleep {1} s longer":"搖籃曲使敵人睡眠延長 {1} 秒","Enemies within {1} m of you are always slower ({2} s of slow every second)":"你周圍 {1} 公尺內的敵人永遠減速（每秒緩速 {2} 秒）","Loki's Veil deals {1} damage per second (grows with ranged ATK) to those inside":"洛奇的悲鳴對範圍內的敵人每秒造成 {1} 傷害（隨遠程 ATK 成長）","A Drum on the Battlefield gives {1} more armor":"戰鼓震天的護甲提高 {1}","A Drum on the Battlefield gives {1}% more damage":"戰鼓震天的傷害提高 {1}%","Invulnerable Siegfried reduces {1}% more damage":"不死神齊格弗里德多減少 {1}% 傷害","When you sing Invulnerable Siegfried you heal {1}% of your max HP":"演唱不死神齊格弗里德時，回復最大 HP 的 {1}%","With A Drum on the Battlefield and Invulnerable Siegfried active at once you deal +{1}% damage":"戰鼓震天與不死神齊格弗里德同時生效時，傷害 +{1}%","Sanctuary heals you {1}% more HP per second":"光耀之堂每秒多回復 {1}% HP","Safety Wall takes {1} more hit":"暗之障壁多承受 {1} 次攻擊","Safety Wall takes {1} more hits":"暗之障壁多承受 {1} 次攻擊","Every hit Safety Wall takes heals you {1}% of your max HP":"暗之障壁每承受一次攻擊，回復最大 HP 的 {1}%","Impositio Manus gives {1}% more damage":"神威祈福的傷害提高 {1}%","Magnificat gives {1} more Haste":"聖母之頌歌多給 {1} 冷卻縮減","While Magnificat lasts you heal {1}% of your max HP per second":"聖母之頌歌持續期間，每秒回復最大 HP 的 {1}%","With Impositio Manus and Magnificat active at once you deal +{1}% damage":"神威祈福與聖母之頌歌同時生效時，傷害 +{1}%","Casting Chain Combo removes {1}% of Combo Finish's remaining cooldown":"施放連環全身掌會減少猛龍誇強 {1}% 的剩餘冷卻","Fury gives {1} more Haste":"爆氣多給 {1} 冷卻縮減","Fury grants {1}% more crit":"爆氣多給 {1}% 暴擊","Your poisons last {1} s longer":"你的毒延長 {1} 秒","Enchant Poison's poison deals {1}% more damage":"塗毒的毒傷害提高 {1}%","When you leave Cloaking, +{1}% crit for {2} s":"離開偽裝時，{2} 秒內暴擊 +{1}%","During Cloaking you deal {1}% more damage":"偽裝期間傷害提高 {1}%","Divest Weapon lasts {1} s longer":"卸除武器延長 {1} 秒","Divest Weapon removes {1}% more damage":"卸除武器多減少 {1}% 傷害","Disarmed or demoralized enemies take {1}% more damage":"被繳械或士氣低落的敵人受到傷害提高 {1}%","Steal Coin steals {1}% more zeny":"偷錢多偷 {1}% 金幣","Axe Boomerang flies {1}% faster and is {2}% bigger.":"回力斧飛行速度 +{1}%，大小 +{2}%。","Weapon Perfection also gives {1} Haste":"無視體型攻擊另給 {1} 冷卻縮減","Weapon Perfection deals {1}% more damage to bosses and elites":"無視體型攻擊對頭目與菁英傷害提高 {1}%","Greed takes {1} more zeny from each enemy it hits":"貪婪從每個命中的敵人身上多拿 {1} 金幣","Your homunculus attacks {1}% faster":"你的生命體攻擊速度提高 {1}%","Potion Pitcher heals {1}% more of your max HP":"藥水投擲多回復最大 HP 的 {1}%","After Potion Pitcher you heal {1}% of your HP per second for {2} s":"藥水投擲後，{2} 秒內每秒回復 {1}% HP","Potion Pitcher splashes: {1} damage (grows with ATK) to nearby enemies":"藥水投擲會濺射：對附近敵人造成 {1} 傷害（隨 ATK 成長）","Chemical Protection reduces {1}% more damage":"化學保護多減少 {1}% 傷害","With Chemical Protection, whoever hits you takes {1} damage (grows with ATK)":"化學保護期間，攻擊你的敵人受到 {1} 傷害（隨 ATK 成長）","Union gives {1}% more damage":"太陽和月亮和星星的融合的傷害提高 {1}%","Estin slows for {1} s.":"艾斯提緩速 {1} 秒。","Kaizel revives you with {1}% more HP":"凱易哲復活時多回復 {1}% HP","Kaahi heals you {1}% more of your HP with every hit":"凱阿希每次受擊多回復 {1}% HP","With Kaahi active, whoever hits you takes {1} damage (grows with MATK)":"凱阿希生效時，攻擊你的敵人受到 {1} 傷害（隨 MATK 成長）","With Kaahi active and Kaupe charges you deal +{1}% damage":"凱阿希生效且凱誣僕仍有次數時，傷害 +{1}%","Kaupe dodges {1} more hit":"凱誣僕多閃避 {1} 次攻擊","Kaupe dodges {1} more hits":"凱誣僕多閃避 {1} 次攻擊","When Kaupe dodges a hit, the attacker takes {1} damage (grows with MATK)":"凱誣僕閃避攻擊時，攻擊者受到 {1} 傷害（隨 MATK 成長）","+{1} meteor":"+{1} 顆隕石","+{1} meteors":"+{1} 顆隕石","+{1} trap":"+{1} 個陷阱","+{1} traps":"+{1} 個陷阱","+{1} cross":"+{1} 道十字","+{1} crosses":"+{1} 道十字","+{1} knife":"+{1} 把飛刀","+{1} knives":"+{1} 把飛刀","+{1} spin":"+{1} 圈","+{1} spins":"+{1} 圈","+{1} axe":"+{1} 把斧頭","+{1} axes":"+{1} 把斧頭","+{1} rock":"+{1} 塊岩石","+{1} rocks":"+{1} 塊岩石","+{1} flask":"+{1} 個藥瓶","+{1} flasks":"+{1} 個藥瓶","+{1} plant":"+{1} 株植物","+{1} plants":"+{1} 株植物","+{1} star":"+{1} 顆星星","+{1} stars":"+{1} 顆星星","Graffiti lasts {1}% longer.":"塗鴉持續時間延長 {1}%。","Summon Flora lasts {1}% longer.":"生物調撥持續時間延長 {1}%。","+{1} damage to bosses and elites":"+{1} 對頭目與菁英傷害","+{1} damage over time":"+{1} 持續傷害","+{1} double chance":"+{1} 雙重機率","+{1} melee reach":"+{1} 近戰攻擊範圍","+{1} repeats":"+{1} 重複次數","+{1} dodge":"+{1} 閃避","+{1} lifesteal":"+{1} 吸血","Fast-forwarding the demo… {1} %":"快轉重播中… {1} %","+{1} double cast chance":"+{1} 雙重詠唱機率","Floor {1}!":"第 {1} 層！","Floor {1}! Bosses incoming!":"第 {1} 層！頭目來襲！","Floor {1} cleared! +{2} tower points":"第 {1} 層通關！+{2} 塔點數","Floor {1} cleared!":"第 {1} 層通關！","You cleared every open floor! +{1} points":"你通過了所有已開啟的樓層！+{1} 點","{1} s to kill the bosses!":"{1} 秒內擊殺頭目！","{1} s to reach the floor points!":"{1} 秒內達到本層分數！","Bosses {1} / {2}":"頭目 {1} / {2}","Job {1}":"職業 {1}","Prontera awaits":"普隆德拉在等著你","A Ragnarok Online–inspired survivors game":"以《仙境傳說》為靈感的生存遊戲","Guest":"訪客","Enter":"登入","Create account":"建立帳號","Play!":"開始遊戲！","Play":"開始遊戲","News":"最新消息","Language":"語言","Talents":"天賦","Credits":"製作人員","Legal notice, rules and privacy":"法律聲明、遊戲規則與隱私權","Fan game by":"同人遊戲製作","☕ Buy me a coffee":"☕ 請我喝杯咖啡","Pick a job, ready your weapon and hold off the horde. Nothing to download.":"選擇職業、拿起武器，抵禦來襲的魔物。不用下載即可遊玩。","Your characters and their gear stay saved in this browser.":"角色和裝備會儲存在這個瀏覽器。","With an account, trade in the square and play your characters from anywhere.":"登入帳號後，可以在廣場交易，並從其他裝置遊玩你的角色。","Loading…":"載入中…","Loading… {1}%":"載入中… {1}%","Loading assets…":"正在載入素材…","Loading Ragnarok assets…":"正在載入仙境傳說素材…","Username":"帳號","Password":"密碼","Repeat password":"再次輸入密碼","Forgot your password?":"忘記密碼？","Sign in":"登入","Log in":"登入","Back":"返回","Leave":"離開","Cancel":"取消","Confirm":"確認","OK":"確定","Done":"完成","Continue":"繼續","Close":"關閉","Prontera Patrol Badge":"普隆德拉巡邏徽章","No ★: only its tier and affixes":"無 ★ 專屬屬性，僅有階級與詞綴","Stage reward":"關卡獎勵","Mail Carrier":"郵差","Check the mail":"查看郵件","Cards by slot":"各部位卡片","Every card that drops in the stages":"各關卡的卡片掉落清單","Their bonuses and who drops them":"卡片效果與掉落魔物","Each card only fits one kind of piece (headgear cards fit all three head slots). Every monster drops its own, very rarely; bosses (👑) a lot more often. Its bonus doesn’t depend on the stage tier or the piece’s refine.":"每張卡片只能鑲嵌在指定類型的裝備上，頭飾卡片可用於頭上、頭中及頭下三個欄位。每種魔物都有自己的卡片，掉落機率很低，首領（👑）則較容易掉落。卡片效果不受關卡階級或裝備精鍊等級影響。","Gear and cards are rolled for: the highest Need roll wins; if nobody needs it, the highest Greed. Even with more monsters, the same cards and eggs drop as when playing solo.":"裝備與卡片以擲骰分配，選擇「需求」的人當中點數最高者取得。若無人選擇「需求」，則由「貪婪」點數最高者取得。即使組隊時魔物較多，卡片和寵物蛋的掉落仍與單人遊玩相同。","The plaza is split into named lobbies (Asgard, Midgard...), each with its own channels, chat and parties. You pick one when you enter Prontera (normal, crowded or full) and can switch from the label at the top. Friends, whispers and the Endless Tower are shared by all of them; you can invite a friend from another lobby to your party from the friends list and, if they accept, they move to yours.":"廣場分成阿斯嘉德、米德加爾特等大廳，各自有分流、聊天室和隊伍。進入普隆德拉時可選擇大廳，並查看正常、擁擠或已滿的狀態。之後也能從畫面上方的標籤切換。好友、密語和無限塔跨大廳共用。你可以從好友名單邀請其他大廳的好友加入隊伍，對方接受後就會移到你所在的大廳。","Each lobby has several channels; you can jump to a friend’s from their menu.":"每個大廳都有多個分流，可以從好友選單前往好友所在的分流。","The game’s mail: notices and gifts from the team, and anything we recover for your account. Attached items are collected here. A “!” means new mail. Account only.":"在這裡查看遊戲團隊寄來的通知、禮物和為帳號找回的物品，也能領取郵件附件。「！」表示有新郵件。僅限註冊帳號使用。","Thanks for your patience":"感謝你的耐心等候","We did some server maintenance to spread the load better and opened two new lobbies, Jotunheim and Nidavellir. Thanks for waiting: here are 500 Kafra Points, 2 Oridecon and 2 Elunium.":"我們已完成伺服器維護，並開放約頓海姆和尼達維勒兩個新大廳，以分散伺服器負載。感謝你的等候，這次送上 500 卡普拉點數、2 個神之金屬和 2 個鋁。","From the RO Survivors team":"寄件者：RO Survivors 團隊","Attached":"附件","Collected":"已領取","Throw away":"丟棄","Collect":"領取","You have no mail.":"目前沒有郵件。","Notices and gifts from the game team arrive here, along with anything we recover for your account.":"遊戲團隊的通知、禮物，以及為你的帳號找回的物品，都會寄到這裡。","Click what you want to sell to mark it. On cards, each click marks one more copy. Anything a character is wearing or that is protected can't be sold.":"點選要販售的物品。卡片每點一次就多選一張。角色穿戴中或已設為保護的物品無法販售。","Apply":"套用","Save":"儲存","Create":"建立","Delete":"刪除","Delete progress":"刪除遊戲進度","Restore defaults":"還原預設值","Back to the title screen":"返回標題畫面","Change portrait":"更換頭像","Choose your portrait":"選擇頭像","Character select":"選擇角色","Switch character":"切換角色","Create character":"建立角色","Character":"角色","Characters {1}/{2}":"角色 {1}/{2}","+ Empty slot":"＋ 空欄位","Empty slot":"空欄位","Empty slot.":"空欄位。","Nothing equipped.":"未裝備任何物品。","Empty slot. Press":"空欄位。按下","to make a new character.":"即可建立新角色。","Achievements":"成就","ACHIEVEMENTS":"成就","Name":"名稱","Gender":"性別","Male":"男性","Female":"女性","♂ Male":"♂ 男性","♀ Female":"♀ 女性","Job":"職業","Hairstyle":"髮型","Hair color":"髮色","Clothes color":"服裝顏色","Original":"原始樣式","Color {1}":"顏色 {1}","Orange":"橘色","Aqua green":"水綠色","Ash blue":"灰藍色","Crimson":"深紅色","Random":"隨機","Idle":"待機","Rotate":"旋轉","Stats":"能力值","Points left:":"剩餘點數：","Points left: {1}":"剩餘點數：{1}","cost {1}":"消耗 {1} 點","Lots of HP and armor. Powerful melee blows.":"HP 高、防禦力強，擅長強力的近身攻擊。","Fragile but deadly at range.":"防禦較弱，擅長遠距離輸出。","Fast, shoots piercing arrows.":"行動迅速，可以射出貫穿敵人的箭。","Heals itself and punishes the undead.":"能恢復自身生命值，擅長對付不死系敵人。","(on the 1st level-up)":"（第一次升級時）","Starts with its weapon attack · Signature:":"初始為武器攻擊 · 招牌技能：","Options":"選項","⚙ Options":"⚙ 選項","Settings":"設定","Sound":"音效","Graphics":"畫面","Game":"遊戲","Controls":"操作","Mute all":"全部靜音","Also with the M key":"也可按 M 鍵切換","Master volume":"主音量","All game sound":"所有遊戲音效","Music":"音樂","Prontera, field and MVP themes":"普隆德拉、野外與 MVP 音樂","Effects":"效果","Skills, hits, monsters and loot":"技能、命中、魔物與掉落音效","Ambience":"環境音","Wind, storms and wildlife":"風聲、暴風雨及野生動物聲音","Interface":"介面","Equipping, selling and raising stats":"裝備、販賣和提升能力值的音效","Mute in background":"在背景時靜音","When you switch tabs or apps":"切換分頁或應用程式時","Game and window texts":"遊戲及視窗文字","Skill, monster and item names are the ones from the Ragnarok client.":"技能、魔物與道具名稱沿用《仙境傳說》用戶端的名稱。","Damage numbers":"傷害數字","Screen shake":"畫面震動","Auto-pause":"自動暫停","Resolution":"解析度","High":"高","Medium":"中","Low":"低","Fullscreen":"全螢幕","On":"開啟","Off":"關閉","Inventory":"背包","You sold {1} item:":"已販售 {1} 件物品：","You sold {1} items:":"已販售 {1} 件物品：","+{1} Kafra Points":"+{1} 卡普拉點數","{1} Kafra Points each":"每張 {1} 卡普拉點數","Tier {1}":"第 {1} 階","Refine +{1}: ×{2}":"精鍊 +{1}：×{2}","Tier {1} · Armor":"第 {1} 階 · 防具","Tier {1} · Headgear":"第 {1} 階 · 頭飾","Tier {1} · Shield":"第 {1} 階 · 盾牌","Tier {1} · Garment":"第 {1} 階 · 披肩","Tier {1} · Shoes":"第 {1} 階 · 鞋子","Tier {1} · Accessory":"第 {1} 階 · 飾品","Add cards":"鑲嵌卡片","Socket cards":"鑲嵌卡片","Socket {1}":"插槽 {1}","empty":"空","Pick the card for socket {1}.":"請選擇要鑲嵌到插槽 {1} 的卡片。","You don't have cards that fit this kind of gear.":"你沒有適用於這類裝備的卡片。","Remove card":"卸下卡片","Socket {1}: pick another card to swap it, or":"插槽 {1}：可選擇另一張卡片替換，或","Cards for Headgear":"頭飾適用卡片","Cards for Weapon":"武器適用卡片","Cards for Armor":"防具適用卡片","Cards for Shield":"盾牌適用卡片","Cards for Garment":"披肩適用卡片","Cards for Shoes":"鞋子適用卡片","Cards for Accessory":"飾品適用卡片","chest {1} z":"寶箱 {1} z","You need {1}/{2} zeny to open the chest":"Zeny 不足，無法開啟寶箱（目前 {1}／所需 {2}）。","Equipment":"裝備","Equip":"裝備","Unequip":"卸下","Equipped":"已裝備","+{1}% Sword Dance damage":"+{1}% 劍舞傷害","Skills":"技能","Skill":"技能","Cards":"卡片","Card":"卡片","Pets":"寵物","Pet":"寵物","Weapons":"武器","Weapon":"武器","Armor":"防具","Shield":"盾牌","Accessory":"飾品","Accessories":"飾品","Headgear":"頭飾","Garment":"披肩","Footgear":"鞋子","Consumables":"消耗品","Materials":"材料","All":"全部","Empty":"空","Sort":"排序","Compare":"比較","Search the wiki…":"搜尋百科…","Search":"搜尋","In run":"戰鬥中","Base Lv {1}":"基本等級 {1}","Job Lv {1}":"職業等級 {1}","Base Lv":"基本等級","Job Lv":"職業等級","Level":"等級","Level {1}":"等級 {1}","Level up!":"升級！","Attack":"攻擊","Attack Speed":"攻擊速度","Attack speed":"攻擊速度","Movement Speed":"移動速度","Move speed":"移動速度","Movement speed":"移動速度","Speed":"速度","Critical Rate":"暴擊率","Critical Chance":"暴擊率","Critical Damage":"暴擊傷害","Critical damage":"暴擊傷害","Physical Attack":"物理攻擊","Magic Attack":"魔法攻擊","Defense":"防禦","Magic Defense":"魔法防禦","Cooldown":"冷卻時間","Duration":"持續時間","Range":"範圍","Damage":"傷害","Damage taken":"受到的傷害","Dodge":"迴避","Hit":"命中","Crit":"暴擊","Flee":"迴避","Attack +{1}%":"攻擊 +{1}%","Attack Speed +{1}%":"攻擊速度 +{1}%","Attack speed +{1}%":"攻擊速度 +{1}%","Movement Speed +{1}%":"移動速度 +{1}%","Critical Damage +{1}%":"暴擊傷害 +{1}%","HP {1} · Speed {2} · Armor {3}":"HP {1} · 速度 {2} · 防禦 {3}","Prontera":"普隆德拉","Fountain square":"噴泉廣場","Friends":"好友","Expeditions":"遠征","Shop":"商店","Buy":"購買","Sell":"販賣","Sell all":"全部賣出","Ore Dealer":"礦石商人","Ore vendor":"礦石商人","Kafra Points":"卡普拉點數","{1} Kafra Points":"{1} 卡普拉點數","Trade":"交易","Quest":"任務","Quests":"任務","Reward":"獎勵","Rewards":"獎勵","Map":"地圖","Training":"訓練","Paused":"已暫停","Pause":"暫停","Resume":"繼續遊戲","Game Over":"遊戲結束","You died":"你倒下了","Return to Prontera":"返回普隆德拉","Continue playing":"繼續遊玩","Unfinished run":"未完成的遠征","Run discarded":"已捨棄遠征","Wave {1}":"第 {1} 波","Kills":"擊殺數","Run damage":"本場傷害","Back to Prontera":"返回普隆德拉","Not enough points":"點數不足","Novice":"初心者","Swordsman":"劍士","Swordman":"劍士","Mage":"魔法師","Archer":"弓箭手","Acolyte":"服事","Thief":"盜賊","Merchant":"商人","Ninja":"忍者","Gunslinger":"神槍手","Knight":"騎士","Crusader":"十字軍","Wizard":"巫師","Sage":"賢者","Hunter":"獵人","Bard":"詩人","Dancer":"舞孃","Priest":"祭司","Monk":"武僧","Assassin":"刺客","Rogue":"流氓","Blacksmith":"鐵匠","Alchemist":"鍊金術師","Soul Linker":"悟靈士","Star Gladiator":"拳聖","Lord Knight":"騎士領主","Paladin":"聖殿十字軍","High Wizard":"超魔導師","Professor":"智者","Sniper":"神射手","Clown":"搞笑藝人","Gypsy":"冷豔舞姬","High Priest":"神官","Champion":"武術宗師","Assassin Cross":"十字刺客","Stalker":"神行太保","Whitesmith":"神工匠","Creator":"創造者","Bash":"狂擊","Magnum Break":"怒爆","Provoke":"挑釁","Endure":"霸體","Increase HP Recovery":"快速恢復","Double Strafe":"二連矢","Arrow Shower":"箭雨","Fire Bolt":"火箭術","Cold Bolt":"冰箭術","Lightning Bolt":"雷擊術","Fire Ball":"火球術","Fire Wall":"火焰之壁","Frost Diver":"冰凍術","Napalm Beat":"心靈爆破","Soul Strike":"聖靈召喚","Thunder Storm":"雷爆術","Heal":"治癒術","Blessing":"天使之賜福","Increase Agility":"加速術","Decrease Agility":"緩速術","Kyrie Eleison":"霸邪之陣","Magnificat":"聖母之頌歌","Hiding":"隱匿","Steal":"偷竊","Envenom":"施毒","Back Stab":"背刺","Mammonite":"金錢攻擊","Cart Revolution":"手推車攻擊","Powerful blow to the nearest enemy. Can learn to stun.":"對最近的敵人施以重擊，可習得使敵人暈眩的效果。","Fire explosion around you that knocks enemies back.":"在周圍引發火焰爆炸並擊退敵人。","Provokes nearby enemies: they take +{1}% damage for {2} s.":"挑釁附近的敵人，使其在 {2} 秒內受到的傷害 +{1}%。","You weather the blows: -{1}% damage taken for {2} s.":"承受攻擊時，在 {2} 秒內受到的傷害 -{1}%。","You regenerate {1} HP per second for {2} s ({3} HP in total).":"每秒恢復 {1} HP，持續 {2} 秒（共 {3} HP）。","Poring":"波利","Drops":"土波利","Poporing":"波波利","Mastering":"波利之王","Lunatic":"瘋兔","Fabre":"綠棉蟲","Pupa":"蟲蛹","Rocker":"搖滾蝗蟲","Chonchon":"蒼蠅","Willow":"樹精","Condor":"禿鷹","Spore":"魔菇","Savage Babe":"小野豬","Smokie":"狸貓","Wolf":"狼","Goblin":"哥布靈","Kobold":"犬妖","Orc Warrior":"獸人戰士","Orc Lady":"獸人女戰士","Orc Skeleton":"邪骸獸人","Zombie":"腐屍","Soldier Skeleton":"邪骸士兵","Archer Skeleton":"邪骸弓箭手","Munak":"殭屍","Sohee":"鬼女","Nine Tail":"九尾狐","Moonlight Flower":"月夜貓","Eddga":"虎王","Drake":"海盜之王","Golden Thief Bug":"黃金蟲","Angeling":"天使波利","Deviling":"惡魔波利","Ghostring":"幽靈波利","Orc Hero":"獸人英雄","Osiris":"俄塞里斯","Baphomet":"巴風特","Hornet":"蜂兵","Baby Desert Wolf":"沙漠幼狼","Familiar":"吸血蝙蝠","Poring Card":"波利卡片","Drops Card":"土波利卡片","Lunatic Card":"瘋兔卡片","Fabre Card":"綠棉蟲卡片","Pupa Card":"蟲蛹卡片","Rocker Card":"搖滾蝗蟲卡片","Willow Card":"樹精卡片","Spore Card":"魔菇卡片","Orc Warrior Card":"獸人戰士卡片","Red Potion":"紅色藥水","Orange Potion":"赤色藥水","Yellow Potion":"黃色藥水","White Potion":"白色藥水","Blue Potion":"藍色藥水","Green Potion":"綠色藥水","Fly Wing":"蒼蠅翅膀","Butterfly Wing":"蝴蝶翅膀","Jellopy":"傑勒比結晶","Oridecon":"神之金屬","Elunium":"鋁","Main Gauche":"笨拙短劍","Bow":"弓","Composite Bow":"坎普茲弓","Rod":"手杖","Wand":"橡木魔杖","Mace":"鐵錘","Cotton Shirt":"棉襯衫","Adventurer's Suit":"冒險衣","Buckler":"圓盾","Sandals":"輕便鞋","Shoes":"長靴","Payon":"斐揚","Geffen":"吉芬","Morroc":"夢羅克","Alberta":"艾爾貝塔","Izlude":"依斯魯得","Al De Baran":"艾爾帕蘭","Glast Heim":"克雷斯特漢姆古城","Payon Cave":"斐揚洞穴","Orc Dungeon":"獸人地下洞穴","Entering Prontera…":"正在進入普隆德拉…","Fountain Square":"噴泉廣場","Offline":"離線","Status":"狀態","Gearscore":"裝備評分","Comparison":"比較","Nothing to compare with.":"沒有可比較的裝備。","For this slot ({1})":"可用於此欄位的裝備（{1}）","You don't have anything for this slot.":"沒有適用於此欄位的裝備。","Head (top)":"頭上","Head (mid)":"頭中","Head (low)":"頭下","Head":"頭部","Click to rotate":"點擊旋轉","Only my job":"僅限目前職業","Details":"詳細資料","Select an item to see its stats.":"選擇道具以查看能力值。","starter gear":"初始裝備","{1} stat points":"{1} 點能力值點數","{1} skill points":"{1} 點技能點數","In a run":"戰鬥中","Max HP":"最大 HP","Regeneration":"自然恢復","Melee ATK":"近距離 ATK","Ranged ATK":"遠距離 ATK","Haste":"冷卻加速","Critical":"暴擊","Max cast (single target)":"最長詠唱（單一目標）","Max cast (area)":"最長詠唱（範圍）","Area":"範圍","Zeny":"Zeny 幣","Double cast":"雙重詠唱","Reset stats":"重置能力值","Agility":"敏捷","Vitality":"體質","Intelligence":"智力","Dexterity":"靈巧","Luck":"幸運","Runs":"場次","Record":"紀錄","Stage cleared":"已通關關卡","Best run level":"單場最高等級","MVPs defeated":"擊敗的 MVP 數","Tap a talent to see what it does.":"點一下天賦可查看效果。","Monsters":"魔物","({1} wins)":"（{1} 勝）","Weapon Level: {1}":"武器等級：{1}","Armor Level: {1}":"防具等級：{1}","Base Level {1}":"基本等級 {1}","Requirement:":"需求：","Requirement: None":"需求：無","Weight: {1}":"重量：{1}","Attack: {1}":"攻擊力：{1}","Defense: {1}":"防禦力：{1}","Perfect Dodge +{1}":"完全迴避 +{1}","Type":"類型","One-Handed Sword":"單手劍","Restorative":"恢復道具","Forging material":"鍛造材料","Compound on":"鑲嵌部位","A basic one-handed sword.":"一把基本的單手劍。","A simple, sturdily made shirt of cotton.":"一件簡單耐穿的棉製襯衫。","A square shield that is small, yet effective in combat.":"一面小巧的方盾，能在戰鬥中提供防護。","Ore Merchant":"礦石商人","Select by quality:":"依品質選取：","Clear selection":"清除選取","Expedition Captain":"遠征隊長","Chronicler of Deeds":"事蹟紀錄員","Pet Keeper":"寵物管理員","Stylist":"造型師","Librarian":"圖書管理員","Tower Guardian":"高塔守衛","Talk to the captain":"與隊長交談","Difficulty":"難度","Loot":"掉落物","Endless Tower":"無限塔","Sword":"長劍","Weapon Dealer":"武器商人","Solo lobby":"單人大廳","Armero":"武器商人","Talk to the weapon dealer":"與武器商人交談","Hablar con el armero":"與武器商人交談","Starting weapon":"初始武器","Arma de inicio":"初始武器","Katana":"武士刀","Blade":"厚刃劍","PoPoring Card":"波波利卡片","Chonchon Card":"蒼蠅卡片","Condor Card":"禿鷹卡片","Hornet Card":"蜂兵卡片","Familiar Card":"吸血蝙蝠卡片","Wolf Card":"狼卡片","Zombie Card":"腐屍卡片","Ghostring Card":"幽靈波利卡片","Orc Skeleton Card":"邪骸獸人卡片","Soldier Skeleton Card":"邪骸士兵卡片","Archer Skeleton Card":"邪骸弓箭手卡片","Munak Card":"殭屍卡片","Kobold Card":"犬妖卡片","Baby Desert Wolf Card":"沙漠幼狼卡片","Channel {1} · {2} players ▾":"分流 {1} · {2} 位玩家 ▾","Choose a lobby":"選擇大廳","Each lobby has its own square, channels and chat. Your friends and the Endless Tower are the same in all of them.":"每個大廳都有各自的廣場、分流和聊天室。好友名單和無限塔在所有大廳共用。","Lobbies":"大廳列表","Crowded":"擁擠","Last time":"上次所在大廳","Play offline":"離線遊玩","Asgard":"阿斯嘉德","Midgard":"米德加爾特","Alfheim":"亞爾夫海姆","Vanaheim":"華納海姆","Jotunheim":"約頓海姆","Nidavellir":"尼達維勒","Svartalfheim":"斯瓦塔爾夫海姆","Niflheim":"尼福爾海姆","Muspelheim":"穆斯貝爾海姆","Your gearscore: {1}":"你的裝備評分：{1}","Available":"可進入","Locked":"未解鎖","Coming soon":"即將推出","Bosses":"首領","Boss loot":"首領掉落","Set out":"出發","Prontera Fields":"普隆德拉原野","Prontera Culverts":"普隆德拉地下水道","Sunken Ship":"沉沒之船","Payon Forest":"斐揚森林","Prontera Castle":"普隆德拉城堡","Orc Village":"獸人村落","Morroc Pyramids":"夢羅克金字塔","South of Prontera":"普隆德拉南方","You survived!":"你活下來了！","Run abandoned":"已放棄本場遊戲","You have been revived!":"你被救起了！","Zoom out minimap":"縮小小地圖","Zoom in minimap":"放大小地圖","Mastela Fruit":"瑪絲黛拉果實","Panacea":"萬能藥","Royal Jelly":"蜂膠","Yggdrasil Berry":"天地樹果實","Concentration Potion":"集中藥水","Awakening Potion":"覺醒藥水","Berserk Potion":"菠色克藥水","Yellow Gemstone":"黃色魔力礦石","Blue Gemstone":"藍色魔力礦石","Horseshoe":"馬蹄","Falchion":"圓月刀","Rapier":"擊刺長劍","Orcish Sword":"獸人刀","Ring Pommel Saber":"圓柄馬刀","Saber":"騎兵之劍","Ice Falchion":"水靈之刀","Cutlus":"狂擊之劍","Mysteltainn":"妖劍 弒光","Slayer":"雙手劍","Claymore":"十字巨劍","Krasnaya":"克拉斯拿雅劍","Knife":"短劍","Dirk":"德克短劍","Dagger":"大駒短劍","Stiletto":"雙刃短劍","Gladius":"長柄短劍","Damascus":"大馬士革短劍","Combat Knife":"戰鬥短劍","Jur":"拳刃","Katar":"卡塔勒拳刃","Jamadhar":"秘刃 闇嘯","Katar of Raging Blaze":"火靈拳刃","Infiltrator":"刺殺拳刃","Loki's Nail":"洛奇的指甲","Bloody Roar":"血拳刃","Axe":"斧","Orcish Axe":"獸人斧","Battle Axe":"巨斧","Hammer":"鋼斧","Doom Slayer":"超重雙手斧","Hurricane Fury":"狂暴颶風斧","Javelin":"長戟","Pike":"步兵長矛","Gungnir":"剛尼爾長矛","Guisarme":"彎刃長矛","Trident":"德瑞尹長戟","Crescent Scythe":"死神之鐮","Spectral Spear":"妖怪的槍","Flail":"流星錘","Morning Star":"日星錘","Sword Mace":"尖刃鐵錘","Chain":"鏈錘","Golden Mace":"黃金之錘","Long Mace":"秘銀長錘","Mjolnir":"雷神之錘","Book":"書","Book of Billows":"水靈之書","Girl's Diary":"日記本","Staff":"智慧魔杖","Arc Wand":"言靈魔杖","Mighty Staff":"巫杖 魂咬","Staff of Bordeaux":"波爾多之杖","Great Bow":"克羅伊特弓","Cross Bow":"十字弓","Hunter Bow":"獵人之弓","Ballista":"貝利斯塔強弩","Orc Archer Bow":"獸人弓箭手之弓","Waghnak":"虎爪拳套","Knuckle Dusters":"鋼鐵拳套","Studded Knuckles":"賀勒拳套","Claw":"龍爪拳套","Finger":"鷹爪拳套","Kaiser Knuckle":"風靈拳套","Violin":"小提琴","Lute":"魯特琴","Harp":"豎琴","Electric Guitar":"電子吉他","Rope":"鞭子","Wire Whip":"鋼鐵鞭子","Tail Whip":"幸運鞭子","Chemeti Whip":"秘鞭 眷戀","Guard":"鐵盾","Mirror Shield":"鏡盾","Holy Guard":"聖耀之盾","Stone Buckler":"石製圓盾","Thorny Buckler":"刺針盾牌","Sunglasses":"太陽眼鏡","Glasses":"眼鏡","Diver Goggles":"泳鏡","Ribbon":"紫蝶髮帶","Bandana":"方頭巾","Eye Patch":"獨眼龍眼罩","Kitty Band":"貓耳髮圈","Bunny Band":"兔耳髮圈","Hat":"漁夫帽","Cap":"無邊帽","Tiara":"后冠","Crown":"王冠","Golden Gear":"黃金帽","Western Grace":"牛仔帽","Monk Hat":"神聖之帽","Wizard Hat":"魔法帽","Majestic Goat":"山羊頭盔","Mini Glasses":"迷你眼鏡","Clown Nose":"小丑鼻子","Munak Hat":"殭屍帽","Pipe":"煙斗","Stop Post":"停止標誌頭飾","Ghost Bandana":"亡者髮箍","Nurse Cap":"護士帽","Sakkat":"草帽","Halo":"光環","Apple of Archer":"蘋果頭飾","Elven Ears":"妖精長耳朵飾","Pirate Bandana":"海盜頭巾","Mr. Scream":"整人面具","Poo Poo Hat":"糞便帽","Welding Mask":"鋼鐵面具","Binoculars":"望遠鏡","Goblin Mask":"哥布靈面具","Green Feeler":"觸角頭飾","Orc Helm":"獸人頭盔","Jacket":"皮製外套","Mantle":"大衣","Coat":"長大衣","Mink Coat":"毛皮大衣","Chain Mail":"鋼鐵鎖子甲","Full Plate":"鋼鐵鎧甲","Formal Suit":"西裝外套","Scapulare":"聖職之袍","Wooden Mail":"木製鎧甲","Tights":"緊身便衣","Silver Robe":"秘銀之衣","Thief Clothes":"盜賊之衣","Ninja Suit":"忍服 血櫻","Odin's Blessing":"奧丁的祝福","Sniping Suit":"剪裁服裝","Boots":"戰士長靴","Sleipnir":"史雷普尼爾之靴","Greaves":"重靴","Vidar's Boots":"迪塔樂長靴","Goibne's Greaves":"哥夫內軍靴","Hood":"連帽披肩","Muffler":"披肩","Manteau":"斗篷","Skeleton Manteau":"邪骸戰士的斗篷","Eagle Wing":"老鷹之翅膀","Ring":"力量戒指","Earring":"智力耳環","Necklace":"體力項鏈","Glove":"防禦手套","Brooch":"敏捷別針","Rosary":"幸運珠鏈","Skull Ring":"骷髏戒指","Gold Ring":"金戒指","Silver Ring":"銀戒指","Flower Ring":"花戒指","Eye of Dullahan":"永恆戒指","Safety Ring":"防禦戒指","Critical Ring":"潛能戒指","Celebrant's Mitten":"智慧手套","Bow Thimble":"神射手套","Rogue's Treasure":"怪盜戒指","Belt":"皮帶","Brisingamen":"女神頸鍊","Ring of Flame Lord":"火焰國王戒指","Ring of Resonance":"共鳴戒指","Puppy Love":"花冠","Ph.D Hat":"學士帽","Lord Kaho's Horn":"卡浩之角","Bone Helm":"骨製頭盔","Corsair":"海盜船長帽","Deviruchi Hat":"小惡魔帽","Bongun Hat":"妖道帽","Spirit of Hugin":"福金之魂","Spirit of Munin":"霧尼之魂","Loki's Whispers":"傲慢之像","Gleipnir":"魔法鐵鏈","Witch's Tonic":"魔女藥水","Blank Scroll":"大卷軸","Enriched Elunium":"濃縮鋁","Enriched Oridecon":"濃縮神之金屬","Poring Egg":"波利寵物蛋","Drops Egg":"土波利寵物蛋","Poporing Egg":"波波利寵物蛋","Lunatic Egg":"瘋兔寵物蛋","Picky Egg":"小雞寵物蛋","Savage Bebe Egg":"小野豬寵物蛋","Baby Desert Wolf Egg":"沙漠幼狼寵物蛋","Rocker Egg":"搖滾蝗蟲寵物蛋","Spore Egg":"魔菇寵物蛋","Poison Spore Egg":"毒魔菇寵物蛋","Smokie Egg":"貍貓寵物蛋","Munak Egg":"殭屍寵物蛋","Sohee Egg":"鬼女寵物蛋","Bongun Egg":"妖道寵物蛋","Whisper Egg":"白幽靈寵物蛋","Mastering Egg":"波利之王寵物蛋","Hyegun Egg":"妖君寵物蛋","Willow Egg":"樹精寵物蛋","Transparent Head Protector":"潛水頭盔","Wig":"三色假髮","Silk Ribbon":"寵物髮帶","Punisher":"體罰棒","Tiny Egg Shell":"寵物蛋殼帽","Backpack":"寵物書包","Rocker Glasses":"蝗蟲眼鏡","Green Lace":"寵物圍兜兜","Golden Bell":"寵物鈴鐺","Bark Shorts":"樹皮褲","Red Scarf":"紅色領巾","Grave Keeper's Sword":"靈幻道士之劍","Green Jewel Bag":"綠色福袋","Pet Soul Ring":"寵物靈環","Ring of Death":"死亡之扣環","Speed Potion":"移速變化藥水","Steamed Tongue":"力量料理","Dragon Breath Cocktail":"智力料理","Hwergelmir's Tonic":"靈巧料理","Cooked Nine Tail's Tails":"幸運料理","Stew of Immortality":"體力料理","Miracle Tonic":"幻想的靈藥","Dragon Killer":"天龍短劍","Jitte":"破刃劍","Asura":"匕首","Krieg":"刺針短劍","Six Shooter":"六輪發手槍","Garrison":"加立遜手槍","Branch":"布林其來福槍","Cyclone":"風暴來福槍","Gate Keeper":"守門霰彈槍","Destroyer":"破壞者榴彈槍","Huuma Giant Wheel Shuriken":"風魔輪飛鏢","Huuma Blaze Shuriken":"風魔熱火飛鏢","Red Slim Potion":"紅色纖細藥水","Yellow Slim Potion":"黃色纖細藥水","White Slim Potion":"白色纖細藥水","Level 3 Earth Spike Scroll":"地震術 3 級卷軸","Haedong Gum":"海東劍","Fire Brand":"火靈之劍","Moonlight Sword":"月靈短劍","Katar of Cold Icicle":"冰靈拳刃","Book of Blazing Sun":"火靈之書","Book of Apocalypse":"預言錄","Valkyrie Shield":"巴基力亞鋼盾","Hairband":"髮箍","Angel Wings":"天使髮圈","Evil Wings":"惡魔髮圈","Butterfly Mask":"蝴蝶假面","Valkyrie Armor":"巴基力的鎧甲","Cape of Ancient Lord":"伯爵斗篷","Manteau of Survival":"生存斗篷","Megingjord":"雷神腰帶","Dokkaebi Egg":"土人寵物蛋","Angelring Egg":"天使波利寵物蛋","Nine Tails Egg":"九尾狐寵物蛋","Cat O Nine Tails Egg":"狂暴月夜貓寵物蛋","Moonlight Flower Egg":"月夜貓寵物蛋","Red Collar Bell":"紅色鈴鐺項圈","Fire Elemental Converter":"火 肯貝特","Level 10 Blessing Scroll":"天使之賜福 10 級卷軸","Level 10 Increase Agility Scroll":"加速術 10 級卷軸","Level 10 Wind Walk Scroll":"風之步 10 級卷軸","Level 5 Adrenaline Rush Scroll":"速度激發 5 級卷軸","Pecopeco Egg Card":"大嘴鳥蛋卡片","Roda Frog Card":"羅達蛙卡片","Thief Bug Card":"盜蟲卡片","Savage Bebe Card":"小野豬卡片","Plankton Card":"漂浮蟲卡片","Skeleton Card":"邪骸戰士卡片","Kukre Card":"庫克雷卡片","Tarou Card":"白鼠卡片","Wormtail Card":"森靈卡片","Hydra Card":"海葵卡片","Snake Card":"青蛇卡片","Smokie Card":"狸貓卡片","Poison Spore Card":"毒魔菇卡片","Vadon Card":"螃蟹卡片","Elder Willow Card":"長老樹精卡片","Marina Card":"水母卡片","Goblin Card":"哥布靈卡片","Cornutus Card":"卡那多斯卡片","Drainliar Card":"紅蝙蝠卡片","Bigfoot Card":"大腳熊卡片","Phen Card":"劍魚卡片","Marine Sphere Card":"氣泡蟲卡片","Swordfish Card":"異變魚卡片","Obeaune Card":"人魚卡片","Marse Card":"烏賊卡片","Sohee Card":"鬼女卡片","Whisper Card":"白幽靈卡片","Horong Card":"鬼火卡片","Strouf Card":"海神卡片","Eddga Card":"虎王卡片","Deviace Card":"狄奧斯卡片","Moonlight Flower Card":"月夜貓卡片","Drake Card":"海盜之王卡片","Orc Hero Card":"獸人英雄卡片","Osiris Card":"俄塞里斯卡片","Baphomet Card":"巴風特卡片","Nine Tail Card":"九尾狐卡片","Dragon Tail Card":"刺尾蜻蜓卡片","Merman Card":"人魚士兵卡片","Bongun Card":"妖道卡片","Skeleton General Card":"邪骸戰士長卡片","Greatest General Card":"將軍魔碑卡片","Cat O' Nine Tails Card":"狂暴月夜貓卡片","Cramp Card":"藍鼠卡片","Penomena Card":"梅納海葵卡片","Yao Jun Card":"妖君卡片","King Dramoh Card":"大腳龍蝦卡片","Kraken Card":"魔鬼大烏賊卡片","Thiefbug Egg Card":"盜蟲卵卡片","Female Thiefbug Card":"浮勒盜蟲卡片","Angelring Card":"天使波利卡片","Pirate Skel Card":"邪骸海盜卡片","Dokkaebi Card":"土人卡片","Golden Thiefbug Card":"黃金蟲卡片","Devilring Card":"惡魔波利卡片","Wandering Wolf Card":"流浪之狼卡片","Sword Mastery":"單手劍使用熟練度","Auto Berserk":"狂暴狀態","Increase SP Recovery":"禪心","Energy Coat":"能量外套","Stone Curse":"石化術","Owl's Eye":"鶚梟之眼","Vulture's Eye":"蒼鷹之眼","Improve Concentration":"心神凝聚","Holy Light":"神聖之光","Ruwach":"光獵","Decrease AGI":"緩速術","Signum Crucis":"天使之光","Aqua Benedicta":"天使之淚","Increase AGI":"加速術","Angelus":"天使之障壁","Divine Protection":"天使之護","Demon Bane":"天使之擊","Crazy Uproar":"大聲吶喊","Overcharge":"高價賣出","Discount":"低價買進","Enlarge Weight Limit":"負重量上升","Vending":"露天商店","Pushcart":"手推車使用","Counter Kick":"還擊踢","Peaceful Break":"平安的休息","Throw Shuriken":"投擲飛鏢","Throw Kunai":"投擲飛刀","Throw Huuma Shuriken":"投擲風魔飛鏢","Flaming Petals":"火炎花","Dagger Throwing Practice":"飛刀修練","Cicada Skin Shed":"金蟬脫殼","Triple Action":"三連攻擊","Desperado":"亡命之徒","Tracking":"百步穿楊","Single Action":"單槍射擊","Chain Action":"連鎖衝擊","Charge Attack":"衝鋒攻擊","Pierce":"連刺攻擊","Spear Boomerang":"投擲長矛攻擊","Counter Attack":"反擊","Bowling Bash":"怪物互擊","Spear Quicken":"長矛加速術","Shield Charge":"盾擊","Holy Cross":"聖十字攻擊","Grand Cross":"聖十字審判","Shield Boomerang":"迴旋盾擊","Auto Guard":"自動防禦","Meteor Storm":"隕石術","Fire Pillar":"火柱攻擊","Frost Nova":"霜凍之術","Storm Gust":"暴風雪","Jupitel Thunder":"雷鳴術","Lord of Vermilion":"怒雷強擊","Volcano":"火元素領域","Deluge":"水元素領域","Earth Spike":"地震術","Heaven's Drive":"崩裂術","Abracadabra":"隨機技能","Blitz Beat":"閃電衝擊","Detecting":"獵鷹尋敵","Claymore Trap":"暴散陷阱","Sandman":"睡魔陷阱","Phantasmic Arrow":"幻影箭","Arrow Vulcan":"奧義箭亂舞","Dissonance":"不諧和音","Lullaby":"搖籃曲","Invulnerable Siegfried":"不死神齊格弗里德","Sanctuary":"光耀之堂","Magnus Exorcismus":"十字驅魔攻擊","Impositio Manus":"神威祈福","Finger Offensive":"彈指神通","Chain Combo":"連環全身掌","Combo Finish":"猛龍誇強","Asura Strike":"阿修羅霸凰拳","Sonic Blow":"音速投擲","Grimtooth":"無影之牙","Enchant Poison":"塗毒","Venom Dust":"病毒散撥","Cloaking":"偽裝","Venom Knife":"毒刃","Raid":"潛擊","Intimidate":"脅持","Steal Coin":"偷錢","Graffiti":"塗鴉","Axe Tornado":"戰斧颶風","Axe Boomerang":"迴旋斧","Weapon Perfection":"無視體型攻擊","Greed":"貪婪","Ore Discovery":"尋找礦石","Acid Terror":"強酸攻擊","Demonstration":"火煙瓶投擲","Call Homunculus":"生命體召喚","Potion Pitcher":"藥水投擲","Esma":"艾斯麻","Estin":"艾斯提","Estun":"艾斯敦","Kaizel":"凱易哲","Kaahi":"凱阿希","Kaupe":"凱誣僕","Two-Hand Mastery":"雙手劍使用熟練度","Arrow Repel":"衝鋒箭","Arrow Crafting":"製作箭","Sand Attack":"噴砂","Throw Stone":"投擲石頭","Tornado Kick":"迴旋踢","Heel Drop":"砸踢","Roundhouse":"轉身踢","Sprint":"跑步","Kihop":"加油","Mild Wind":"溫暖的風","Lightning Strike":"雷擊碎","Rapid Shower":"五連擊","Spread Attack":"火力全開","Ground Drift":"四面埋伏","Snake Eye":"瞄準之眼","Madness Canceller":"瘋狂凱斯樂","Hindsight":"自動念咒","Loki's Veil":"洛奇的悲鳴","A Drum on the Battlefield":"戰鼓震天","Benedictio":"聖之祈福","Call Spirits":"蓄氣","Fury":"爆氣","Divest Weapon":"卸除武器","Summon Flora":"生物調撥","Warmth of the Sun":"太陽的溫暖","Solar Burst":"太陽爆炸","Full Moon Kick":"滿月腳","New Moon Kick":"朔月腳","Falling Star":"流星殞落","Union of the Sun, Moon and Stars":"太陽與月亮與星星的融合","Roda Frog":"羅達蛙","Peco Peco Egg":"大嘴鳥蛋","Thief Bug Egg":"盜蟲卵","Thief Bug":"盜蟲","Tarou":"白鼠","Plankton":"漂浮蟲","Drainliar":"紅蝙蝠","Thief Bug Female":"浮勒盜蟲","Cramp":"藍鼠","Kukre":"庫克雷","Marina":"水母","Hydra":"海葵","Whisper":"白幽靈","Penomena":"梅納海葵","Sword Fish":"異變魚","Pirate Skeleton":"邪骸海盜","Vadon":"螃蟹","Cornutus":"卡那多斯","Marse":"烏賊","Phen":"劍魚","Obeaune":"人魚","Marine Sphere":"氣泡蟲","Merman":"人魚士兵","Deviace":"狄奧斯","Strouf":"海神","King Dramoh":"大腳龍蝦","Kraken":"魔鬼大烏賊","Kraken Leg":"魔鬼大烏賊的觸手","Wormtail":"森靈","Poison Spore":"毒魔菇","Elder Willow":"長老樹精","Dragon Tail":"刺尾蜻蜓","Bigfoot":"大腳熊","Greatest General":"將軍魔碑","Dokebi":"土人","Vagabond Wolf":"流浪之狼","Skeleton":"邪骸戰士","Bongun":"妖道","Horong":"鬼火","Skeleton General":"邪骸戰士長","Cat O' Nine Tails":"狂暴月夜貓","You now need an account":"現在需要遊戲帳號","Ahora hace falta una cuenta":"現在需要遊戲帳號","Playing as a guest is no longer available. Create your account, free and with no email, and all the progress of your guest account will be transferred to the new account: characters, gear, cards and Kafra Points.":"遊戲已停止提供訪客模式。你可以免費建立帳號，無須電子郵件。訪客的所有進度都會轉移到新帳號，包括角色、裝備、卡片和卡普拉點數。","Ya no se puede jugar como invitado. Crea tu cuenta, gratis y sin email, y todo el progreso de tu cuenta de invitado se traspasará a la nueva cuenta: personajes, equipo, cartas y Puntos Kafra.":"遊戲已停止提供訪客模式。你可以免費建立帳號，無須電子郵件。訪客的所有進度都會轉移到新帳號，包括角色、裝備、卡片和卡普拉點數。","Create my account":"建立我的帳號","Crear mi cuenta":"建立我的帳號","Playing as a guest is no longer available. Create your account and you will keep all your progress.":"遊戲已停止提供訪客模式。建立帳號即可保留所有進度。","Ya no se puede jugar como invitado. Crea tu cuenta y conservarás todo tu progreso.":"遊戲已停止提供訪客模式。建立帳號即可保留所有進度。","To play RO Survivors you need an account. It is free and does not ask for an email.":"遊玩 RO Survivors 需要遊戲帳號。帳號可免費建立，無須電子郵件。","Para jugar a RO Survivors hace falta una cuenta. Es gratis y no pide email.":"遊玩 RO Survivors 需要遊戲帳號。帳號可免費建立，無須電子郵件。","I already have an account":"我已有帳號","Ya tengo cuenta":"我已有帳號","Preguntas de seguridad":"安全問題","(opcional)":"（選填）","Sin email, si olvidas la contraseña la única forma de recuperar la cuenta son estas 5 respuestas. Recuérdalas o apúntalas en un sitio seguro.":"帳號未綁定電子郵件，忘記密碼時，只能用這 5 個答案找回帳號。請牢記答案，或將它們記在安全的地方。","Your characters and their gear are saved to your account.":"角色和裝備會儲存在你的帳號中。","Tus personajes y su equipo se guardan en tu cuenta.":"角色和裝備會儲存在你的帳號中。","Trade in the square and play your characters from anywhere.":"你可以在廣場交易，也能在不同裝置上遊玩同一帳號的角色。","A comerciar en la plaza y a jugar con tus personajes desde cualquier sitio.":"你可以在廣場交易，也能在不同裝置上遊玩同一帳號的角色。","RO Survivors es un fan game no oficial y gratuito, sin anuncios ni compras. No está afiliado, patrocinado ni respaldado por Gravity Co., Ltd. ni por Lee Myoung-Jin (studio DTDS). Ragnarok Online y sus personajes, gráficos y músicas son propiedad de sus respectivos dueños. © Gravity Co., Ltd. & Lee Myoung-Jin (studio DTDS).":"RO Survivors 是免費的非官方同人遊戲，沒有廣告或付費購買項目。本遊戲與 Gravity Co., Ltd. 或 Lee Myoung-Jin（studio DTDS）無隸屬關係，也未獲其贊助或背書。《仙境傳說》及其角色、圖像與音樂均歸各權利人所有。© Gravity Co., Ltd. & Lee Myoung-Jin（studio DTDS）。","Fan game por":"同人遊戲製作","Retirada":"後撤射擊","Flecha ígnea":"火焰箭","Golpe sagrado":"神聖重擊","+{1}% pierce":"+{1}% 貫穿機率","+{1}% stun chance on hit":"命中時 +{1}% 暈眩機率","Explosión Magnum":"怒爆","Danza de espadas":"劍舞","Grito desmoralizador":"挫志怒吼","Embate de escudo":"盾擊","Recuperación de HP":"快速恢復","Saeta de fuego":"火箭術","Saeta de hielo":"冰箭術","Saeta de rayo":"雷擊術","Golpe de alma":"聖靈召喚","Pulso napalm":"心靈爆破","Muro de fuego":"火焰之壁","Ola de escarcha":"冰凍術","Doble ráfaga":"二連矢","Lluvia de flechas":"箭雨","Aguacero de flechas":"箭矢風暴","Tiro arcano":"秘法射擊","Flecha repulsora":"衝鋒箭","Concentración":"心神凝聚","Luz sagrada":"神聖之光","Reducir AGI":"緩速術","Ataque de arena":"噴砂","Lanzar piedra":"投擲石頭","Bomba de veneno":"毒霧炸彈","Abanico de cuchillos":"飛刀扇擊","Revolución del carro":"手推車攻擊","Alboroto":"大聲吶喊","Aumentar peso máximo":"負重量上升","Lluvia de zeny":"金幣雨","Embestida del carro":"手推車突進","Patada tornado":"迴旋踢","Caída de talón":"砸踢","Contrapatada":"還擊踢","Lanzar shuriken":"投擲飛鏢","Lanzar kunai":"投擲飛刀","Lanzar Huuma Shuriken":"投擲風魔飛鏢","Pétalos llameantes":"火炎花","Golpe de rayo":"雷擊碎","Acción triple":"三連攻擊","Ráfaga rápida":"五連擊","Ataque disperso":"火力全開","Granada rasante":"四面埋伏","Servidor lleno":"伺服器已滿","Server full":"伺服器已滿","Ahora mismo hay {1} jugadores, el máximo para que el juego vaya bien. Estás en la cola: entrarás solo en cuanto haya sitio.":"目前有 {1} 名玩家，已達伺服器可順暢運作的上限。你正在排隊，有空位時會自動進入。","There are {1} players right now, the most the game can take and still run well. You are in the queue: you will get in automatically as soon as there is room.":"目前有 {1} 名玩家，已達伺服器可順暢運作的上限。你正在排隊，有空位時會自動進入。","Puesto {1} de {2}":"排隊中：第 {1} 位，共 {2} 位","Position {1} of {2}":"排隊中：第 {1} 位，共 {2} 位","Conectando con el servidor…":"正在連線到伺服器…","Connecting to the server…":"正在連線到伺服器…","Para jugar hace falta conexión con el servidor. Lo seguimos intentando.":"需要連線到伺服器才能遊玩，正在重試。","You need a connection to the server to play. We keep trying.":"需要連線到伺服器才能遊玩，正在重試。","Gear and cards":"裝備與卡片","Equipo y cartas":"裝備與卡片","Legendaries: the skill damage bonus is for a 1st job skill up to tier 2, and for a 1st or 2nd job skill from tier 3. Pieces only a 2nd job can use (like the Assassin's Katar of Raging Blaze) boost a skill of its 1st job: until now they dropped with no skill bonus. The ones you already have stay as they are.":"傳說裝備：技能傷害加成在第 2 階（含）以下為一轉技能，第 3 階級起為一轉或二轉技能。只有二轉職業能使用的裝備（例如刺客的 火靈拳刃）會強化其一轉職業的技能：之前掉落時沒有技能加成。已經擁有的裝備維持不變。","Legendarios: la mejora de daño de skill es de una skill de 1st job hasta el tier 2, y de 1st o de 2nd job desde el tier 3. Las piezas que solo lleva un 2nd job (como la Katar of Raging Blaze del Assassin) mejoran una skill de su 1st job: hasta ahora caían sin mejora de skill. Las que ya tienes se quedan como están.":"傳說裝備：技能傷害加成在第 2 階（含）以下為一轉技能，第 3 階級起為一轉或二轉技能。只有二轉職業能使用的裝備（例如刺客的 火靈拳刃）會強化其一轉職業的技能：之前掉落時沒有技能加成。已經擁有的裝備維持不變。","傳說裝備：技能傷害加成在第 2 階級以前為一轉技能，第 3 階級起為一轉或二轉技能。只有二轉職業能使用的裝備（例如刺客的 Katar of Raging Blaze）會強化其一轉職業的技能：之前掉落時沒有技能加成。已經擁有的裝備維持不變。":"傳說裝備：技能傷害加成在第 2 階（含）以下為一轉技能，第 3 階級起為一轉或二轉技能。只有二轉職業能使用的裝備（例如刺客的 火靈拳刃）會強化其一轉職業的技能：之前掉落時沒有技能加成。已經擁有的裝備維持不變。","From tier 3 on, the skill upgrade on the legendaries you get can also be for one of your 2nd job skills, as the Librarian says. Until now only 1st job skills rolled.":"從第 3 階起，你取得的傳說裝備的技能詞條也可能是你二轉職業的技能，與圖書館員的說明一致。之前只會出現一轉技能。","Desde el tier 3, la mejora de skill de los legendarios que consigues también puede ser de una skill de tu 2nd job, como dice el Bibliotecario. Hasta ahora solo salían skills de 1st job.":"從第 3 階起，你取得的傳說裝備的技能詞條也可能是你二轉職業的技能，與圖書館員的說明一致。之前只會出現一轉技能。","Two-handed legendary weapons (spears, two-handed swords, axes...) no longer roll «+% damage» to a skill that needs a shield (Shield Bash, Shield Charge, Shield Boomerang): you cannot wear a shield with them, so it did nothing.":"雙手傳說武器（雙手槍、雙手劍、斧頭……）不會再出現需要盾牌的技能（盾牌衝擊、盾擊、迴旋盾擊）的「+% 傷害」詞條：雙手武器無法裝備盾牌，這個詞條沒有效果。","Las armas legendarias a dos manos (lanzas, espadones, hachas...) ya no salen con «+% de daño» a una skill que necesita escudo (Shield Bash, Shield Charge, Shield Boomerang): con ellas no se puede llevar escudo y no hacía nada.":"雙手傳說武器（雙手槍、雙手劍、斧頭……）不會再出現需要盾牌的技能（盾牌衝擊、盾擊、迴旋盾擊）的「+% 傷害」詞條：雙手武器無法裝備盾牌，這個詞條沒有效果。","Legendary rods no longer roll «+% damage» to Holy Smite (it can only be used with a mace, knuckles or a book), and legendary shields no longer roll «+% damage» to Gunslinger skills (all their weapons are two-handed, so they cannot wear a shield). If a Gunslinger picks up a legendary shield, its upgrade is for a skill of a job that can wear one.":"傳說法杖不會再出現「+% 神聖重擊傷害」（神聖重擊只能搭配鈍器、拳套或書本使用），傳說盾牌也不會再出現神槍手技能的「+% 傷害」（神槍手的武器全是雙手武器，無法裝備盾牌）。神槍手撿到傳說盾牌時，詞條會是能裝備盾牌之職業的技能。","Las varas legendarias ya no salen con «+% de daño» a Golpe sagrado (solo se puede usar con maza, nudillos o libro), y los escudos legendarios ya no salen con «+% de daño» a skills del Gunslinger (todas sus armas son a dos manos y no puede llevar escudo). Si un Gunslinger recoge un escudo legendario, su mejora es de una skill de un job que sí lleva escudo.":"傳說法杖不會再出現「+% 神聖重擊傷害」（神聖重擊只能搭配鈍器、拳套或書本使用），傳說盾牌也不會再出現神槍手技能的「+% 傷害」（神槍手的武器全是雙手武器，無法裝備盾牌）。神槍手撿到傳說盾牌時，詞條會是能裝備盾牌之職業的技能。","Legendaries you already had with one of those skills (a shield skill on a two-handed weapon, Holy Smite on a rod, or a Gunslinger skill on a shield) now upgrade another skill that works with the item, with the same percentage. The Postman sends you a letter about it.":"你已擁有、帶有上述技能詞條的傳說裝備（雙手武器上的盾牌技能、法杖上的神聖重擊，或盾牌上的神槍手技能）會改為強化這件裝備能用的另一個技能，百分比不變。郵差會寄信通知你。","Las legendarias que ya tenías con una de esas skills (de escudo en un arma a dos manos, Golpe sagrado en una vara o del Gunslinger en un escudo) pasan a mejorar otra skill que sí sirve con la pieza, con el mismo porcentaje. Te llega una carta del Cartero que lo avisa.":"你已擁有、帶有上述技能詞條的傳說裝備（雙手武器上的盾牌技能、法杖上的神聖重擊，或盾牌上的神槍手技能）會改為強化這件裝備能用的另一個技能，百分比不變。郵差會寄信通知你。","En grupo":"隊伍","Party: a player whose connection to the run took more than 6 s stayed playing alone even while seeing the others, with their own monsters, EXP, zeny and loot. Now, as soon as they connect, they join the party's run.":"隊伍：連線到遊戲超過 6 秒的玩家，即使看得到隊友，也會一直單人遊玩，怪物、經驗值、金幣和戰利品都是自己的。現在只要一連上，就會加入隊伍的遊戲。","Grupo: quien tardaba en conectar con la partida (más de 6 s) se quedaba jugando solo aunque viera a los demás, con sus propios monstruos, su EXP, su zeny y su botín. Ahora, en cuanto conecta, pasa a la partida del grupo.":"隊伍：連線到遊戲超過 6 秒的玩家，即使看得到隊友，也會一直單人遊玩，怪物、經驗值、金幣和戰利品都是自己的。現在只要一連上，就會加入隊伍的遊戲。","隊伍: a player whose connection to the run took more than 6 s stayed playing alone even while seeing the others, with their own monsters, EXP, zeny and loot. Now, as soon as they connect, they join the party's run.":"隊伍：連線到遊戲超過 6 秒的玩家，即使看得到隊友，也會一直單人遊玩，怪物、經驗值、金幣和戰利品都是自己的。現在只要一連上，就會加入隊伍的遊戲。","隊伍：a player whose connection to the run took more than 6 s stayed playing alone even while seeing the others, with their own monsters, EXP, zeny and loot. Now, as soon as they connect, they join the party's run.":"隊伍：連線到遊戲超過 6 秒的玩家，即使看得到隊友，也會一直單人遊玩，怪物、經驗值、金幣和戰利品都是自己的。現在只要一連上，就會加入隊伍的遊戲。","If you spend 5 minutes in the plaza without touching anything, you leave the game and free your spot. To come back, press Play: if the server is full, you join the queue.":"在廣場 5 分鐘沒有任何操作時，會離開遊戲並讓出位置。按「開始遊戲」即可回來；伺服器額滿時會進入排隊。","Si pasas 5 minutos sin tocar nada en la plaza, sales del juego y dejas tu plaza libre. Para volver, pulsa Jugar: si el servidor está lleno, entras por la cola.":"在廣場 5 分鐘沒有任何操作時，會離開遊戲並讓出位置。按「開始遊戲」即可回來；伺服器額滿時會進入排隊。","Interface and texts":"介面與文字","Interfaz y textos":"介面與文字","Sound: with \"Mute in background\" on, the game also goes quiet when you click on another window (not only when switching tabs). Also, when lots of effects play at once the volume is held back instead of clipping.":"音效：開啟「背景時靜音」後，點擊其他視窗時遊戲也會靜音（不只是切換分頁時）。另外，許多音效同時響起時，音量會被壓住，不會爆音。","Sonido: con «Silenciar en segundo plano» puesto, el juego también se calla al hacer clic en otra ventana (no solo al cambiar de pestaña). Además, cuando suenan muchos efectos a la vez el volumen se contiene en vez de saturar.":"音效：開啟「背景時靜音」後，點擊其他視窗時遊戲也會靜音（不只是切換分頁時）。另外，許多音效同時響起時，音量會被壓住，不會爆音。","Arreglos":"修正","Runs that were saved with the EXP but without the loot: if your account changed on the server during the run (a trade, the Mail Carrier, or the server correcting your save), that run's items and cards were lost at the end. Now they are added to your account as it is.":"有些對局只保存了經驗值，卻沒有保存戰利品：如果對局進行中你的帳號在伺服器上有變動（交易、郵差，或伺服器修正了你的存檔），結束時這一局的裝備與卡片會遺失。現在會加進你目前的帳號。","Partidas que se guardaban con la EXP pero sin el botín: si durante la partida tu cuenta cambiaba desde el servidor (un comercio, el Cartero, o el servidor corrigiendo tu guardado), al acabar se perdían las piezas y las cartas de esa partida. Ahora se suman a tu cuenta tal como está.":"有些對局只保存了經驗值，卻沒有保存戰利品：如果對局進行中你的帳號在伺服器上有變動（交易、郵差，或伺服器修正了你的存檔），結束時這一局的裝備與卡片會遺失。現在會加進你目前的帳號。","Character select: if two characters had ended up in the same slot (creating one while the server was slow), the list showed one and \"Play\" entered with the other. Now the newer one moves to the first free slot and both are shown; you can delete the extra one like any other.":"角色選擇：如果兩個角色落在同一個欄位（伺服器較慢時建立角色造成），清單顯示的是其中一個，「開始遊戲」卻進入另一個。現在較新的角色會移到第一個空欄位，兩個都看得到；多出來的可以像其他角色一樣刪除。","Selección de personaje: si dos personajes habían quedado en el mismo hueco (al crear uno mientras el servidor iba lento), la lista enseñaba uno y «Jugar» entraba con el otro. Ahora el más nuevo pasa al primer hueco libre y se ven los dos; el que sobre se puede borrar como cualquier otro.":"角色選擇：如果兩個角色落在同一個欄位（伺服器較慢時建立角色造成），清單顯示的是其中一個，「開始遊戲」卻進入另一個。現在較新的角色會移到第一個空欄位，兩個都看得到；多出來的可以像其他角色一樣刪除。","On some iPhones and iPads, the page fully reloaded after every run before going back to Prontera, as if you had been logged out. It no longer reloads.":"部分 iPhone 與 iPad 在每局結束後，回到普隆德拉之前會整頁重新載入，看起來像被登出。現在不會再重新載入。","En algunos iPhone y iPad, al acabar cada partida la página se volvía a cargar entera antes de volver a Prontera, como si se hubiera cerrado la sesión. Ya no se recarga.":"部分 iPhone 與 iPad 在每局結束後，回到普隆德拉之前會整頁重新載入，看起來像被登出。現在不會再重新載入。","With the server full, finishing an Endless Tower run on iPhone or iPad could put you in the entry queue as if you had just arrived. Now whoever is playing keeps their place.":"伺服器滿載時，在 iPhone 或 iPad 打完無盡之塔後，可能會像剛進來一樣被排進入場排隊。現在正在遊玩的玩家會保留自己的位置。","Con el servidor lleno, al acabar una partida de la Endless Tower en iPhone o iPad se podía caer en la cola de entrada como si se acabara de llegar. Ahora quien está jugando conserva su sitio.":"伺服器滿載時，在 iPhone 或 iPad 打完無盡之塔後，可能會像剛進來一樣被排進入場排隊。現在正在遊玩的玩家會保留自己的位置。","伺服器滿載時，在 iPhone 或 iPad 打完無盡之塔後，可能會像剛進來一樣被排進入場佇列。現在正在遊玩的玩家會保留自己的位置。":"伺服器滿載時，在 iPhone 或 iPad 打完無盡之塔後，可能會像剛進來一樣被排進入場排隊。現在正在遊玩的玩家會保留自己的位置。","Mantenimiento":"維護","Closing for about 2-3 h to apply the loot and trade patch and check both servers.":"將暫停服務約 2 至 3 小時，以套用戰利品與交易修補程式，並檢查兩台伺服器。","{1} propiedades sin identificar: se revelan al terminar la partida":"{1} 項未鑑定屬性，將在本局結束時揭曉","{1} unidentified properties: revealed when the run ends":"{1} 項未鑑定屬性，將在本局結束時揭曉","Sin identificar: sus propiedades se revelan al terminar":"未鑑定：屬性將在本局結束時揭曉","Unidentified: its properties are revealed when you finish":"未鑑定：屬性將在本局結束時揭曉","Sin identificar: sus propiedades se revelan al cobrar la partida":"未鑑定：領取本局獎勵時將揭曉屬性","Unidentified: its properties are revealed when the run is claimed":"未鑑定：領取本局獎勵時將揭曉屬性","+{1} propiedades al azar para quien la gane":"獲得者將取得 {1} 項隨機屬性","En mantenimiento":"維護中","Maintenance with new content. Back in a few minutes.":"伺服器正在維護並更新遊戲內容，預計幾分鐘後恢復服務。","El servidor se actualizará.":"伺服器即將更新。","El servidor está en mantenimiento por una actualización. Vuelve en unos minutos.":"伺服器正在維護更新，請稍後再回來。","Estamos actualizando el servidor. Volvemos en unos minutos.":"伺服器正在更新，預計幾分鐘後恢復。","El mantenimiento empieza en 1 minuto: termina lo que estés haciendo.":"維護將在 1 分鐘後開始，請儘快結束目前的操作。","El mantenimiento empieza en {1} minutos.":"維護將在 {1} 分鐘後開始。","Your pet comments on the run when you play solo: it greets you at the start with its RO sound and an emote, worries when your HP runs low, cheers you on during good streaks and is sad if you fall. At most one line every half minute, so it never gets in the way. In a party it stays quiet.":"單人遊玩時，你的寵物會對關卡發表意見：開始時用牠的 RO 音效和表情跟你打招呼，生命值低時會擔心你，連續擊殺順利時會替你加油，倒下時會難過。最多每半分鐘說一句，不會打擾你。組隊時不會說話。","Tu pet comenta la partida cuando juegas solo: te saluda al empezar con su sonido de RO y un emote, se preocupa si te queda poca vida, te anima en las buenas rachas y lo siente si caes. Como mucho una frase cada medio minuto, para no molestar. En grupo no dice nada.":"單人遊玩時，你的寵物會對關卡發表意見：開始時用牠的 RO 音效和表情跟你打招呼，生命值低時會擔心你，連續擊殺順利時會替你加油，倒下時會難過。最多每半分鐘說一句，不會打擾你。組隊時不會說話。","Drops are back during the run: what a monster drops (a piece or a card) falls as a «?» with a purple beam. You do not need to pick it up: it is already yours; after a few seconds it fades and «Item found!» shows up. When the run ends, the summary screen shows what it was. Drop rates and the most pieces per run are the same as always; the server still decides the piece and its quality. In a group, the «?» belong to everyone and are shared out at the end with Need/Greed.":"關卡中的掉落回來了：怪物掉落的東西（裝備或卡片）會以帶紫色光柱的「?」出現在地上。不用去撿，已經是你的了：幾秒後會消失並顯示「找到物品！」。關卡結束時結算畫面會告訴你那是什麼。掉落機率與每局最多件數都和以前一樣；裝備與品質仍由伺服器決定。組隊時，「?」屬於全隊，結束時以 需求／貪婪 分配。","Vuelven los drops durante la partida: lo que suelta un monstruo (pieza o carta) cae como un «?» con su haz morado. No hay que ir a recogerlo: ya es tuyo, a los pocos segundos se esfuma y sale «¡Objeto encontrado!». Al terminar la partida, la pantalla final te enseña qué era. Las probabilidades y el máximo de piezas por partida son los de siempre; la pieza y su calidad las sigue decidiendo el servidor. En grupo, los «?» son de todos y se reparten al final con Need/Greed.":"關卡中的掉落回來了：怪物掉落的東西（裝備或卡片）會以帶紫色光柱的「?」出現在地上。不用去撿，已經是你的了：幾秒後會消失並顯示「找到物品！」。關卡結束時結算畫面會告訴你那是什麼。掉落機率與每局最多件數都和以前一樣；裝備與品質仍由伺服器決定。組隊時，「?」屬於全隊，結束時以 需求／貪婪 分配。","關卡中的掉落回來了：怪物掉落的東西（裝備或卡片）會以帶紫色光柱的「?」出現在地上。不用去撿，已經是你的了：幾秒後會消失並顯示「找到物品！」。關卡結束時結算畫面會告訴你那是什麼。掉落機率與每局最多件數都和以前一樣；裝備與品質仍由伺服器決定。組隊時，「?」屬於全隊，結束時以 Need/Greed 分配。":"關卡中的掉落回來了：怪物掉落的東西（裝備或卡片）會以帶紫色光柱的「?」出現在地上。不用去撿，已經是你的了：幾秒後會消失並顯示「找到物品！」。關卡結束時結算畫面會告訴你那是什麼。掉落機率與每局最多件數都和以前一樣；裝備與品質仍由伺服器決定。組隊時，「?」屬於全隊，結束時以 需求／貪婪 分配。","Legendaries: up to tier 2, the skill bonus is for a 1st job that can use the item; from tier 3, for a 2nd job that can use it. An item only a 2nd job can use no longer gets skills of its 1st job at tier 1 or 2 (staffs used to roll Taekwon kicks). Tier 1 or 2 bows can also roll Thief skills, for Rogues using a bow.":"傳說裝備：第 2 階級以前，技能加成為能使用這件裝備的一轉職業技能；第 3 階級起，為能使用它的二轉職業技能。只有二轉職業能使用的裝備，在第 1、2 階級不再出現其一轉職業的技能（之前法杖會出現跆拳道的踢技）。第 1、2 階級的弓也可能出現盜賊技能，給使用弓的流氓。","Legendarios: hasta el tier 2, la mejora de skill es de un 1st job que puede usar la pieza; desde el tier 3, de un 2nd job que puede usarla. Una pieza que solo usa un 2nd job ya no trae skills de su 1st job en tier 1 o 2 (antes los bastones sacaban patadas de Taekwon). Los arcos de tier 1 o 2 pueden traer también skills de Thief, para el Rogue con arco.":"傳說裝備：第 2 階級以前，技能加成為能使用這件裝備的一轉職業技能；第 3 階級起，為能使用它的二轉職業技能。只有二轉職業能使用的裝備，在第 1、2 階級不再出現其一轉職業的技能（之前法杖會出現跆拳道的踢技）。第 1、2 階級的弓也可能出現盜賊技能，給使用弓的流氓。","Cuentas":"帳號","Loot: gear, cards and pet eggs no longer drop during a run. When it ends (also if you die or leave) the summary screen shows what you got, already identified, and it goes into your account.":"戰利品：關卡中不再掉落裝備、卡片和寵物蛋。結束時（死亡或放棄也一樣）結算畫面會顯示你獲得的東西，已經鑑定好並放入你的帳號。","Botín: durante la partida ya no caen piezas, cartas ni huevos de pet. Al terminar (también si mueres o abandonas) la pantalla final te enseña lo que has conseguido, ya identificado, y entra en tu cuenta.":"戰利品：關卡中不再掉落裝備、卡片和寵物蛋。結束時（死亡或放棄也一樣）結算畫面會顯示你獲得的東西，已經鑑定好並放入你的帳號。","Playing now needs a connection: you cannot start a run without one. During the run, what you kill is sent to the server every few minutes; when it ends, the summary screen waits until the loot is in your account before letting you go back. If the connection drops, what had already arrived counts: you go back to the title screen and your loot reaches you through the Prontera Mail Carrier.":"現在遊玩需要連線：沒有連線就無法開始關卡。關卡中，你擊敗的怪物每隔幾分鐘會傳到伺服器；結束時，結算畫面會等戰利品存進你的帳號後才讓你返回。如果連線中斷，以已經送達的部分計算：你會回到標題畫面，戰利品會由普隆德拉的郵差送給你。","Para jugar hace falta conexión: sin ella no se puede empezar una partida. Durante la partida, lo que vas matando se manda al servidor cada pocos minutos; al terminar, la pantalla final espera a que el botín esté en tu cuenta antes de dejarte volver. Si la conexión se corta, cuenta lo que ya había llegado: vuelves a la portada y lo que te toca te llega por el Cartero de Prontera.":"現在遊玩需要連線：沒有連線就無法開始關卡。關卡中，你擊敗的怪物每隔幾分鐘會傳到伺服器；結束時，結算畫面會等戰利品存進你的帳號後才讓你返回。如果連線中斷，以已經送達的部分計算：你會回到標題畫面，戰利品會由普隆德拉的郵差送給你。","Party: Need / Greed now happens when the run ends, with every item at once on the summary screen, and you can see what everyone picks. Each player has 2 Needs per run and can only Need what their job can wear (anyone can Need cards and eggs); after that, Greed at most. Whoever does not pick in time goes Greed. The best items show up at the top of the list (legendaries and epics, then cards and eggs) and the time to pick grows with how much there is to share out. What you win is yours even if you left early or lost your connection: it reaches you through the Prontera Mail Carrier.":"隊伍：需求／貪婪 改在結束時進行，所有物品一次列在結算畫面上，也能看到每個人的選擇。每位玩家每局有 2 次 需求，而且只能對自己職業能穿戴的物品選 需求（卡片和蛋所有人都可以）；用完後最多只能選 貪婪。沒有及時選擇的人視為 貪婪。最好的物品會排在清單最上方（傳說與史詩，接著是卡片與蛋），選擇時間也會隨著要分配的數量增加。你贏得的東西就算提早離開或連線中斷也屬於你：會由普隆德拉的郵差送給你。","Grupo: el Need / Greed se hace al terminar, con todas las piezas a la vez en la pantalla final, y ves lo que elige cada uno. Cada jugador tiene 2 Need por partida y solo puede pedir Need por lo que su job puede llevar (en cartas y huevos, todos); después, como mucho Greed. Quien no elige a tiempo va a Greed. Lo mejor sale arriba de la lista (legendarias y épicas, luego cartas y huevos) y el tiempo para elegir crece con lo que haya que repartir. Lo que ganes es tuyo aunque te hayas ido antes o se te haya cortado la conexión: te llega por el Cartero de Prontera.":"隊伍：需求／貪婪 改在結束時進行，所有物品一次列在結算畫面上，也能看到每個人的選擇。每位玩家每局有 2 次 需求，而且只能對自己職業能穿戴的物品選 需求（卡片和蛋所有人都可以）；用完後最多只能選 貪婪。沒有及時選擇的人視為 貪婪。最好的物品會排在清單最上方（傳說與史詩，接著是卡片與蛋），選擇時間也會隨著要分配的數量增加。你贏得的東西就算提早離開或連線中斷也屬於你：會由普隆德拉的郵差送給你。","隊伍：Need / Greed 改在結束時進行，所有物品一次列在結算畫面上，也能看到每個人的選擇。每位玩家每局有 2 次 Need，而且只能對自己職業能穿戴的物品選 Need（卡片和蛋所有人都可以）；用完後最多只能選 Greed。沒有及時選擇的人視為 Greed。最好的物品會排在清單最上方（傳說與史詩，接著是卡片與蛋），選擇時間也會隨著要分配的數量增加。你贏得的東西就算提早離開或連線中斷也屬於你：會由普隆德拉的郵差送給你。":"隊伍：需求／貪婪 改在結束時進行，所有物品一次列在結算畫面上，也能看到每個人的選擇。每位玩家每局有 2 次 需求，而且只能對自己職業能穿戴的物品選 需求（卡片和蛋所有人都可以）；用完後最多只能選 貪婪。沒有及時選擇的人視為 貪婪。最好的物品會排在清單最上方（傳說與史詩，接著是卡片與蛋），選擇時間也會隨著要分配的數量增加。你贏得的東西就算提早離開或連線中斷也屬於你：會由普隆德拉的郵差送給你。","Your friend list belongs to your account: it is the same on all your characters, and each friend shows the character they are playing or the last one they used. The friends you already had are kept, and so is how long you have been friends.":"好友清單改為屬於帳號：你所有角色的好友清單都相同，每位好友會顯示他正在使用或最後使用的角色。原有的好友會保留，成為好友的時間也會保留。","La lista de amigos es de la cuenta: es la misma en todos tus personajes, y cada amigo sale con el personaje con el que juega o el último que usó. Los amigos que ya tenías se conservan, y desde cuándo sois amigos también.":"好友清單改為屬於帳號：你所有角色的好友清單都相同，每位好友會顯示他正在使用或最後使用的角色。原有的好友會保留，成為好友的時間也會保留。","Chat spam brake on every channel (party, whispers and the trade window too): 3 messages in a row and at most 15 per minute, and you can't repeat the same message (or nearly the same) within 60 s, 3 minutes in Trade. If you keep at it, your chat gets muted for a while on its own: 1 minute, then 5, then 15. The chat tells you why your message didn't go out and how long to wait.":"所有聊天頻道（包括隊伍、密語與交易視窗）都會限制洗頻：最多連續 3 則、每分鐘最多 15 則，60 秒內不能重複發送相同（或幾乎相同）的訊息，交易頻道為 3 分鐘。持續洗頻會被自動禁言一段時間：先 1 分鐘，再 5 分鐘，然後 15 分鐘。聊天框會告訴你訊息沒送出的原因和需要等多久。","Freno al spam en el chat, en todos los canales (también grupo, susurros y la ventana de comercio): 3 mensajes seguidos y como mucho 15 por minuto, y no se puede repetir el mismo mensaje (o casi el mismo) en 60 s, 3 minutos en Comercio. Si se insiste, el chat se silencia solo un rato: 1 minuto, luego 5 y luego 15. El chat te dice por qué no ha salido tu mensaje y cuánto tienes que esperar.":"所有聊天頻道（包括隊伍、密語與交易視窗）都會限制洗頻：最多連續 3 則、每分鐘最多 15 則，60 秒內不能重複發送相同（或幾乎相同）的訊息，交易頻道為 3 分鐘。持續洗頻會被自動禁言一段時間：先 1 分鐘，再 5 分鐘，然後 15 分鐘。聊天框會告訴你訊息沒送出的原因和需要等多久。","Trading: a muted account can't trade while the mute lasts, neither asking nor accepting. If it gets muted with a trade open, the trade closes with nothing exchanged.":"交易：被禁言的帳號在禁言期間無法交易，無論是發起或接受。若在交易進行中被禁言，交易會直接關閉，不會交換任何物品。","Comercio: una cuenta silenciada no puede comerciar mientras dure el silencio, ni pidiendo ni aceptando. Si la silencian con un comercio abierto, se cierra sin cambiar nada.":"交易：被禁言的帳號在禁言期間無法交易，無論是發起或接受。若在交易進行中被禁言，交易會直接關閉，不會交換任何物品。","Trading: the “Not tradable” tag now also shows on loose cards that can't be given (or how many can be given, if only some) and on gear with one of those cards in it. Pieces another player offers you in a trade no longer show as “Not tradable”.":"交易：「不可交易」標籤現在也會顯示在無法給予的卡片上（若只有部分可交易，則顯示可交易的張數），以及鑲有這類卡片的裝備上。交易中其他玩家提供的物品不再顯示為「不可交易」。","Comercio: la etiqueta «No comerciable» sale también en las cartas sueltas que no se pueden dar (o cuántas se pueden dar, si son solo algunas) y en el equipo que lleva encajada una de esas cartas. Las piezas que te ofrece otro jugador en el comercio ya no salen como «No comerciable».":"交易：「不可交易」標籤現在也會顯示在無法給予的卡片上（若只有部分可交易，則顯示可交易的張數），以及鑲有這類卡片的裝備上。交易中其他玩家提供的物品不再顯示為「不可交易」。","New trading rules. Both accounts must be at least 3 days old, and each can make 3 trades a day. Common to Epic gear (white, green, blue and purple) can only be traded with friends of 3 days or more. Legendaries and cards can only be traded within an hour of getting them, and with someone who was in that party (solo-run ones can't be traded). Anything you receive in a trade is bound to your account and can't be given again. Kafra Points and ores are bound to your account and can't be traded anymore, and neither can gear with cards slotted in it. Everything you owned before this change becomes untradeable.":"交易新規則。雙方帳號都需建立滿 3 天，每個帳號每天可交易 3 次。普通到史詩（白、綠、藍、紫）只能與成為好友 3 天以上的人交易。傳說與卡片只能在取得後 1 小時內，與當時同隊的隊友交易（單人遊戲取得的無法交易）。透過交易取得的物品會綁定帳號，無法再次給出。卡普拉點數與礦石綁定帳號，不再能交易，鑲有卡片的裝備也無法交易。這次調整之前擁有的所有物品都會變成不可交易。","Comercio con reglas nuevas. Las dos cuentas tienen que tener al menos 3 días, y cada una puede hacer 3 comercios al día. De Común a Épica (blanco, verde, azul y lila) solo se comercia con amigos desde hace 3 días o más. Las legendarias y las cartas, solo en la hora siguiente a conseguirlas y con quien iba en ese grupo (las de una partida en solitario no se comercian). Lo que recibes en un comercio queda ligado a tu cuenta y no se puede volver a dar. Los Puntos Kafra y los minerales son de tu cuenta y ya no se intercambian, ni el equipo con cartas encajadas. Todo lo que tenías antes de este cambio queda como no comerciable.":"交易新規則。雙方帳號都需建立滿 3 天，每個帳號每天可交易 3 次。普通到史詩（白、綠、藍、紫）只能與成為好友 3 天以上的人交易。傳說與卡片只能在取得後 1 小時內，與當時同隊的隊友交易（單人遊戲取得的無法交易）。透過交易取得的物品會綁定帳號，無法再次給出。卡普拉點數與礦石綁定帳號，不再能交易，鑲有卡片的裝備也無法交易。這次調整之前擁有的所有物品都會變成不可交易。","While you are down in a party run, your character gains no EXP (neither base nor job). You start gaining it again as soon as a teammate revives you.":"組隊遊戲中倒地時，角色不會獲得經驗值（基本與職業經驗都不會）。隊友將你扶起後即可重新獲得。","Mientras estás caído en una partida en grupo no ganas EXP de tu personaje (ni base ni de job). La vuelves a ganar en cuanto un compañero te levanta.":"組隊遊戲中倒地時，角色不會獲得經驗值（基本與職業經驗都不會）。隊友將你扶起後即可重新獲得。","Pets: when you claimed a run that had started more than 6 hours earlier (for example, leaving the game open), the pet hatched from an egg in that run could disappear. Not anymore.":"寵物：領取開始超過 6 小時的關卡時（例如遊戲一直開著），在那場關卡中從蛋孵出的寵物可能會消失。現在不會了。","Pets: al cobrar una partida que había empezado hace más de 6 horas (por ejemplo, dejando el juego abierto), el pet que había salido de un huevo en ella podía desaparecer. Ya no.":"寵物：領取開始超過 6 小時的關卡時（例如遊戲一直開著），在那場關卡中從蛋孵出的寵物可能會消失。現在不會了。","«+% pierce» cards no longer show up once your total pierce chance is at the 75% cap, also counting the chance that does not come from cards (the Archer's bow, the Mage's ice infusion, talents, Deity and gear). Before, they kept showing up and did nothing.":"當你的總貫穿率已達 75% 上限時（也計入不是來自卡片的貫穿率：弓箭手的弓、法師的冰屬性附魔、天賦、神格 與裝備），不會再出現「+% 貫穿率」卡片。之前會繼續出現，但沒有任何效果。","Las cartas de «+% de perforación» dejan de salir cuando tu probabilidad total de perforar ya está en el tope del 75 %, contando también la que no viene de las cartas (el arco del Archer, la infusión de hielo del Mage, talentos, Deity y equipo). Antes seguían saliendo y no servían de nada.":"當你的總貫穿率已達 75% 上限時（也計入不是來自卡片的貫穿率：弓箭手的弓、法師的冰屬性附魔、天賦、神格 與裝備），不會再出現「+% 貫穿率」卡片。之前會繼續出現，但沒有任何效果。","當你的總貫穿率已達 75% 上限時（也計入不是來自卡片的貫穿率：弓箭手的弓、法師的冰屬性附魔、天賦、Deity 與裝備），不會再出現「+% 貫穿率」卡片。之前會繼續出現，但沒有任何效果。":"當你的總貫穿率已達 75% 上限時（也計入不是來自卡片的貫穿率：弓箭手的弓、法師的冰屬性附魔、天賦、神格 與裝備），不會再出現「+% 貫穿率」卡片。之前會繼續出現，但沒有任何效果。","Unfinished run: if you close the game while picking a card or with a chest open, continuing it shows the same cards (they used to be rolled again). And pressing «Resume» now checks with the server whether the run is still open: if it already ended (its time ran out or you started another one), its loot reaches you through the Mail Carrier and you keep the EXP you had, instead of playing on in a run that no longer gives loot.":"未完成的一局：如果在選卡片或打開寶箱時關閉遊戲，繼續時會出現同樣的卡片（以前會重新抽）。按下「繼續」時會先向伺服器確認這局是否還在進行：如果已經結束（時間已到或你開始了另一局），戰利品會由郵差寄給你，並帶走已獲得的經驗，不會再繼續玩一局已經不給戰利品的遊戲。","Partida a medias: si cierras el juego mientras eliges carta o con un cofre abierto, al seguirla salen las mismas cartas (antes se volvían a tirar). Y al pulsar «Continuar» se mira en el servidor si la partida sigue abierta: si ya terminó (se acabó su tiempo o empezaste otra), su botín te llega por el Cartero y cobras la EXP que llevabas, en vez de seguir jugando una partida que ya no da botín.":"未完成的一局：如果在選卡片或打開寶箱時關閉遊戲，繼續時會出現同樣的卡片（以前會重新抽）。按下「繼續」時會先向伺服器確認這局是否還在進行：如果已經結束（時間已到或你開始了另一局），戰利品會由郵差寄給你，並帶走已獲得的經驗，不會再繼續玩一局已經不給戰利品的遊戲。","Options › Graphics › Effect opacity: the rings and flashes skills leave on the ground (Fan of Knives, Magnum Break, buff auras…) didn't fade. Now they follow the opacity like the other effects; the cast circle, target marks and boss warnings are still shown in full.":"選項 › 畫面 › 特效透明度：技能留在地面上的光環與閃光（飛刀扇、怒爆、增益效果的光環……）不會變透明。現在它們和其他特效一樣跟隨透明度；施法圓圈、目標標記與首領的警示仍會完整顯示。","Opciones › Gráficos › Opacidad de los efectos: los aros y destellos del suelo de las skills (el de Fan of Knives, Magnum Break, los auras de los buffs…) no se aclaraban. Ahora siguen la opacidad como los demás efectos; el círculo de casteo, las marcas de objetivo y los avisos de los jefes se siguen viendo enteros.":"選項 › 畫面 › 特效透明度：技能留在地面上的光環與閃光（飛刀扇、怒爆、增益效果的光環……）不會變透明。現在它們和其他特效一樣跟隨透明度；施法圓圈、目標標記與首領的警示仍會完整顯示。","With a low effect opacity, Moonlight Flower’s bell was barely visible: the red floor and the circle of light under the bell faded like any other effect. Now they’re shown in full at any opacity and graphics quality, as are the countdown, the skill name the boss shouts and the fire that bosses’ fire skills leave on the ground (Moonlight Flower, Cat O' Nine Tails…).":"特效透明度調低時，月夜貓 的鐘幾乎看不見：紅色地面與鐘下的光圈會像一般特效一樣變透明。現在無論透明度與畫質為何都會完整顯示；倒數計時、首領喊出的技能名稱，以及首領的火焰技能留在地上的火焰（月夜貓、狂暴月夜貓……）也一樣。","Con la opacidad de los efectos baja, la campana de Moonlight Flower casi no se veía: el suelo rojo y el círculo de luz bajo la campana se aclaraban como un efecto más. Ahora se ven enteros con cualquier opacidad y calidad gráfica, igual que la cuenta atrás, el nombre de la skill que grita el jefe y el fuego que dejan en el suelo las skills de fuego de los jefes (Moonlight Flower, Cat O' Nine Tails…).":"特效透明度調低時，月夜貓 的鐘幾乎看不見：紅色地面與鐘下的光圈會像一般特效一樣變透明。現在無論透明度與畫質為何都會完整顯示；倒數計時、首領喊出的技能名稱，以及首領的火焰技能留在地上的火焰（月夜貓、狂暴月夜貓……）也一樣。","特效透明度調低時，Moonlight Flower 的鐘幾乎看不見：紅色地面與鐘下的光圈會像一般特效一樣變透明。現在無論透明度與畫質為何都會完整顯示；倒數計時、首領喊出的技能名稱，以及首領的火焰技能留在地上的火焰（Moonlight Flower、Cat O' Nine Tails……）也一樣。":"特效透明度調低時，月夜貓 的鐘幾乎看不見：紅色地面與鐘下的光圈會像一般特效一樣變透明。現在無論透明度與畫質為何都會完整顯示；倒數計時、首領喊出的技能名稱，以及首領的火焰技能留在地上的火焰（月夜貓、狂暴月夜貓……）也一樣。","Generic controllers on Windows (not Xbox, PlayStation or Switch): we have worked on the reports of the camera zooming in on its own, lists scrolling down on their own and L2/R2 zooming and acting as Select/Start at the same time. An axis that isn't at 0 at rest is no longer read, and if L2 and R2 also move an axis, pressing them now counts as LT/RT and that axis is no longer read. If you have one of these controllers, please try it and let us know whether it's fixed. New in Options › Controls: «Use controller», to turn it off without unplugging it.":"Windows 上的通用手把（非 Xbox、PlayStation 或 Switch）：我們針對「鏡頭自己拉近、清單自己往下捲、L2/R2 同時縮放鏡頭並觸發 Select/Start」的回報做了調整。現在靜止時不在 0 的軸不再讀取；如果 L2 和 R2 同時會移動一個軸，按下時會當成 LT/RT，該軸也不再讀取。如果你有這類手把，請試試看並告訴我們是否已經解決。選項 › 操作新增「使用手把」，不用拔掉也能關閉手把。","Mandos genéricos en Windows (ni de Xbox, ni de PlayStation ni de Switch): hemos trabajado en los avisos de cámara que se acerca sola, listas que bajan solas y L2/R2 que hacían zoom y Select/Start a la vez. Ahora un eje que en reposo no está en 0 no se lee, y si L2 y R2 mueven además un eje, al pulsarlos se usan como LT/RT y ese eje se deja de leer. Si tienes uno de estos mandos, pruébalo y cuéntanos si se ha arreglado. Nuevo en Opciones › Controles: «Usar mando», para apagarlo sin desconectarlo.":"Windows 上的通用手把（非 Xbox、PlayStation 或 Switch）：我們針對「鏡頭自己拉近、清單自己往下捲、L2/R2 同時縮放鏡頭並觸發 Select/Start」的回報做了調整。現在靜止時不在 0 的軸不再讀取；如果 L2 和 R2 同時會移動一個軸，按下時會當成 LT/RT，該軸也不再讀取。如果你有這類手把，請試試看並告訴我們是否已經解決。選項 › 操作新增「使用手把」，不用拔掉也能關閉手把。","While a Willow, an Elder Willow or a Poporing plays its death animation, the monsters and ground loot behind it no longer disappear.":"樹精、長老樹精 或 波波利 播放死亡動畫時，位於其後方的怪物與地上的戰利品不會再消失。","Mientras un Willow, un Elder Willow o un Poporing hacen la animación de morir, los monstruos y el botín del suelo que quedan detrás ya no desaparecen.":"樹精、長老樹精 或 波波利 播放死亡動畫時，位於其後方的怪物與地上的戰利品不會再消失。","Willow、Elder Willow 或 Poporing 播放死亡動畫時，位於其後方的怪物與地上的戰利品不會再消失。":"樹精、長老樹精 或 波波利 播放死亡動畫時，位於其後方的怪物與地上的戰利品不會再消失。","Party: if the run ends while a Need / Greed roll is still open, the item, card or egg goes into the loot of whoever wins the roll (before, they got nothing).":"組隊：如果關卡結束時 需求／貪婪 擲骰還沒結束，裝備、卡片或寵物蛋會進入擲骰獲勝者的戰利品（之前會拿不到）。","Grupo: si la partida acaba con una tirada de Need / Greed todavía abierta, la pieza, la carta o el huevo entran en el botín del que gana la tirada (antes se quedaba sin ellos).":"組隊：如果關卡結束時 需求／貪婪 擲骰還沒結束，裝備、卡片或寵物蛋會進入擲骰獲勝者的戰利品（之前會拿不到）。","組隊：如果關卡結束時 Need / Greed 擲骰還沒結束，裝備、卡片或寵物蛋會進入擲骰獲勝者的戰利品（之前會拿不到）。":"組隊：如果關卡結束時 需求／貪婪 擲骰還沒結束，裝備、卡片或寵物蛋會進入擲骰獲勝者的戰利品（之前會拿不到）。","November 14, 2026":"2026 年 11 月 14 日","14 de noviembre de 2026":"2026 年 11 月 14 日","Here we go!":"出發吧！","I've got your back! Well, I'll watch it.":"我掩護你！呃，我在旁邊看著。","Are there snacks at the end?":"最後有點心嗎？","Smells like loot today!":"今天聞起來有寶物的味道！","Hey, they're hitting you!":"喂，你在挨打耶！","A potion, maybe?":"要不要喝瓶藥水？","Run, run!":"快跑，快跑！","Don't leave me here alone…":"別把我一個人丟在這裡……","Nooo! Who's going to feed me now?":"不——！現在誰來餵我？","I'll save you a spot in Prontera…":"我在普隆德拉幫你佔位子……","The next one will go better, for sure.":"下一局一定會更好。","Was that part of the plan?":"那也是計畫的一部分嗎？","Unstoppable!":"勢不可擋！","That's it! Again!":"就是這樣！再來！","Not a scratch. Show-off!":"毫髮無傷。愛現！","You're so good at this!":"你真的很會耶！","Fix for the loot of runs started before the maintenance":"修正維護前開始的遠征之掉落物問題。","Arreglo del botín de las partidas de antes del mantenimiento":"修正維護前開始的遠征之掉落物問題。","Item found!":"找到物品！","¡Objeto encontrado!":"找到物品！","Handing out the loot…":"正在分配戰利品…","You left before the run ended: whatever you win in the party loot will reach you through the Prontera Mail Carrier.":"你在遠征結束前離開了：隊伍分配給你的戰利品，會透過普隆德拉的郵差寄給你。","The server is not responding: whatever you win in the party loot will reach you through the Prontera Mail Carrier.":"伺服器沒有回應：隊伍分配給你的戰利品，會透過普隆德拉的郵差寄給你。","Your loot is waiting at the Prontera Mail Carrier.":"請向普隆德拉的郵差領取你的戰利品。","The server is not responding: your loot will reach you through the Prontera Mail Carrier.":"伺服器沒有回應：你的戰利品會透過普隆德拉的郵差寄給你。","You get":"你獲得","You get nothing this time.":"這次沒有獲得戰利品。","Waiting for what the others killed to share out the loot…":"正在等待其他隊員的擊殺紀錄，以分配戰利品…","Nothing dropped this time.":"這次沒有掉落物品。","Loot handed out":"戰利品已分配","Needs left":"剩餘需求次數","Greed the rest":"其餘全部選擇貪婪","Pass on the items you have not chosen":"放棄尚未選擇的物品","Party loot":"隊伍戰利品","Huevo de pet":"寵物蛋","Repartiendo el botín…":"正在分配戰利品…","Has salido antes de que acabe la partida: lo que ganes en el reparto del grupo te llegará por el Cartero de Prontera.":"你在遠征結束前離開了：隊伍分配給你的戰利品，會透過普隆德拉的郵差寄給你。","El servidor no responde: lo que ganes en el reparto del grupo te llegará por el Cartero de Prontera.":"伺服器沒有回應：隊伍分配給你的戰利品，會透過普隆德拉的郵差寄給你。","Lo que te ha tocado está en el Cartero de Prontera.":"請向普隆德拉的郵差領取你的戰利品。","El servidor no responde: lo que te ha tocado te llegará por el Cartero de Prontera.":"伺服器沒有回應：你的戰利品會透過普隆德拉的郵差寄給你。","Te llevas":"你獲得","Esta vez no te llevas nada.":"這次沒有獲得戰利品。","Esperando lo que han matado los demás para repartir el botín…":"正在等待其他隊員的擊殺紀錄，以分配戰利品…","Esta vez no ha caído nada.":"這次沒有掉落物品。","Reparto hecho":"戰利品已分配","Need que te quedan":"剩餘需求次數","{greed} a todo lo que falta":"其餘全部選擇貪婪","Pasa en las piezas que no has elegido":"放棄尚未選擇的物品","Botín obtenido":"獲得的戰利品","During the run, what a monster drops (a piece or a card) falls as a «?»: you do not need to pick it up, it is already yours; after a few seconds it fades and «Item found!» shows up. When the run ends, the summary screen shows what it was (the server decides the piece and its quality). In a group, the «?» belong to everyone and are shared out at the end.":"遠征中，怪物掉落的裝備或卡片會以「?」出現在地上，不用走過去撿取；幾秒後會消失，並顯示「找到物品！」。遠征結束時，結算畫面才會揭曉物品（裝備及品質由伺服器決定）。組隊時，「?」屬於全隊，會在結束時分配。","It does not drop on the ground during the run: when it ends, the summary screen shows what you got.":"遠征期間不會在地上顯示掉落物；結束時，結算畫面會顯示你獲得的物品。","When the run ends, all the party loot shows up at once on the summary screen and everyone picks Need, Greed or Pass: the highest Need roll wins; if nobody needs it, the highest Greed. Each player has 2 Needs per run, only for what their job can wear; whoever does not pick in time goes Greed. Even with more monsters, the same cards and eggs drop as when playing solo.":"遠征結束時，隊伍的所有戰利品會一次顯示在結算畫面。每人可選擇「需求」、「貪婪」或「放棄」：需求擲骰最高者獲得；若沒人需求，則由貪婪擲骰最高者獲得。每人每場有 2 次需求機會，僅限目前職業能穿戴的物品；逾時未選擇會視為貪婪。即使組隊時怪物更多，卡片與寵物蛋的掉落量仍與單人遊玩相同。","Se encaja en":"插入","EXP base":"基本經驗","EXP de job":"職業經驗","Nv en partida":"本場等級","Cartas obtenidas":"已獲得的卡片","The bell is sealed! Kill Cat O' Nine Tails within {1} s":"鐘被封印了！在 {1} 秒內擊殺狂暴月夜貓","Not tradable":"不可交易","It can't be given in a trade":"無法透過交易轉讓","{1} tradable":"{1} 張可交易","Total":"總計","Hold off the orc assault beside the king":"在國王身旁抵擋獸人進攻","You already wear the uniform of a Novice. We leave for the fields of Geffen at dawn.":"你已經穿上初心者的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Novice. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，初心者。我們黎明時出發前往吉芬原野。","From Novice":"原職業：初心者","You already wear the uniform of a Swordsman. We leave for the fields of Geffen at dawn.":"你已經穿上劍士的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Swordsman. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，劍士。我們黎明時出發前往吉芬原野。","From Swordsman":"原職業：劍士","You already wear the uniform of a Mage. We leave for the fields of Geffen at dawn.":"你已經穿上魔法師的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Mage. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，魔法師。我們黎明時出發前往吉芬原野。","From Mage":"原職業：魔法師","You already wear the uniform of a Archer. We leave for the fields of Geffen at dawn.":"你已經穿上弓箭手的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Archer. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，弓箭手。我們黎明時出發前往吉芬原野。","From Archer":"原職業：弓箭手","You already wear the uniform of a Acolyte. We leave for the fields of Geffen at dawn.":"你已經穿上服事的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Acolyte. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，服事。我們黎明時出發前往吉芬原野。","From Acolyte":"原職業：服事","You already wear the uniform of a Thief. We leave for the fields of Geffen at dawn.":"你已經穿上盜賊的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Thief. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，盜賊。我們黎明時出發前往吉芬原野。","From Thief":"原職業：盜賊","You already wear the uniform of a Merchant. We leave for the fields of Geffen at dawn.":"你已經穿上商人的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Merchant. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，商人。我們黎明時出發前往吉芬原野。","From Merchant":"原職業：商人","You already wear the uniform of a Knight. We leave for the fields of Geffen at dawn.":"你已經穿上騎士的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Knight. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，騎士。我們黎明時出發前往吉芬原野。","From Knight":"原職業：騎士","You already wear the uniform of a Crusader. We leave for the fields of Geffen at dawn.":"你已經穿上十字軍的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Crusader. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，十字軍。我們黎明時出發前往吉芬原野。","From Crusader":"原職業：十字軍","You already wear the uniform of a Wizard. We leave for the fields of Geffen at dawn.":"你已經穿上巫師的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Wizard. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，巫師。我們黎明時出發前往吉芬原野。","From Wizard":"原職業：巫師","You already wear the uniform of a Sage. We leave for the fields of Geffen at dawn.":"你已經穿上賢者的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Sage. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，賢者。我們黎明時出發前往吉芬原野。","From Sage":"原職業：賢者","You already wear the uniform of a Hunter. We leave for the fields of Geffen at dawn.":"你已經穿上獵人的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Hunter. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，獵人。我們黎明時出發前往吉芬原野。","From Hunter":"原職業：獵人","You already wear the uniform of a Bard. We leave for the fields of Geffen at dawn.":"你已經穿上詩人的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Bard. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，詩人。我們黎明時出發前往吉芬原野。","From Bard":"原職業：詩人","You already wear the uniform of a Dancer. We leave for the fields of Geffen at dawn.":"你已經穿上舞孃的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Dancer. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，舞孃。我們黎明時出發前往吉芬原野。","From Dancer":"原職業：舞孃","You already wear the uniform of a Priest. We leave for the fields of Geffen at dawn.":"你已經穿上祭司的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Priest. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，祭司。我們黎明時出發前往吉芬原野。","From Priest":"原職業：祭司","You already wear the uniform of a Monk. We leave for the fields of Geffen at dawn.":"你已經穿上武僧的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Monk. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，武僧。我們黎明時出發前往吉芬原野。","From Monk":"原職業：武僧","You already wear the uniform of a Assassin. We leave for the fields of Geffen at dawn.":"你已經穿上刺客的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Assassin. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，刺客。我們黎明時出發前往吉芬原野。","From Assassin":"原職業：刺客","You already wear the uniform of a Rogue. We leave for the fields of Geffen at dawn.":"你已經穿上流氓的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Rogue. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，流氓。我們黎明時出發前往吉芬原野。","From Rogue":"原職業：流氓","You already wear the uniform of a Blacksmith. We leave for the fields of Geffen at dawn.":"你已經穿上鐵匠的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Blacksmith. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，鐵匠。我們黎明時出發前往吉芬原野。","From Blacksmith":"原職業：鐵匠","You already wear the uniform of a Alchemist. We leave for the fields of Geffen at dawn.":"你已經穿上鍊金術師的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Alchemist. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，鍊金術師。我們黎明時出發前往吉芬原野。","From Alchemist":"原職業：鍊金術師","You already wear the uniform of a Gunslinger. We leave for the fields of Geffen at dawn.":"你已經穿上神槍手的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Gunslinger. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，神槍手。我們黎明時出發前往吉芬原野。","From Gunslinger":"原職業：神槍手","You already wear the uniform of a Ninja. We leave for the fields of Geffen at dawn.":"你已經穿上忍者的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Ninja. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，忍者。我們黎明時出發前往吉芬原野。","From Ninja":"原職業：忍者","You already wear the uniform of a Soul Linker. We leave for the fields of Geffen at dawn.":"你已經穿上悟靈士的制服。我們黎明時出發前往吉芬原野。","Welcome to the elite, Soul Linker. We leave for the fields of Geffen at dawn.":"歡迎加入菁英行列，悟靈士。我們黎明時出發前往吉芬原野。","From Soul Linker":"原職業：悟靈士","Turn off":"關閉","Turned off":"已關閉","turned off: it won't affect your runs until you turn it back on.":"已關閉：重新開啟前，不會影響你的遠征。","turned on for your next runs.":"已開啟，將於接下來的遠征生效。","Slow: {1} s":"緩速：{1}秒"};

  const GAME = 'RO Survivors';
  const PUBLIC_PATTERNS = [{"original":"Entering {stage}…","translation":"正在進入{stage}…"},{"original":"{stage} (story)","translation":"{stage}（劇情）"},{"original":"Defeat {mvp}","translation":"擊敗 {mvp}"},{"original":"Requires {n} points in {branch}.","translation":"需要在{branch}投入 {n} 點。"},{"original":"+{v} {skill} damage.","translation":"{skill} 傷害 +{v}。"},{"original":"-{v} {skill} cooldown.","translation":"{skill} 冷卻 -{v}。"},{"original":"+{v} {skill} area.","translation":"{skill} 範圍 +{v}。"},{"original":"+{v} {skill} range.","translation":"{skill} 射程 +{v}。"},{"original":"{skill} pierces {n} more enemy.","translation":"{skill} 多貫穿 {n} 個敵人。"},{"original":"{skill} pierces {n} more enemies.","translation":"{skill} 多貫穿 {n} 個敵人。"},{"original":"You start every run with {skill} at Lv {lv}.","translation":"每局開始時擁有 Lv {lv} 的{skill}。"},{"original":"Requires {talent} at max rank ({n}/{max}).","translation":"需要{talent}達到最高等級（{n}/{max}）。"},{"original":"+{p}% {skill} damage","translation":"+{p}% {skill}傷害"},{"original":"Learn the skill {skill}","translation":"學習技能{skill}"},{"original":"From the Conduit: {skill}","translation":"來自導管：{skill}"},{"original":"It is your {skill} (Lingering Frost)","translation":"這是你的{skill}（殘留冰霜）"},{"original":"defeat {mvp}","translation":"擊敗 {mvp}"},{"original":"You need {pet}.","translation":"你需要{pet}。"},{"original":"{pet} must be Loyal.","translation":"{pet}必須達到忠誠。"},{"original":"Evolves from {pet}: with {pet} Loyal and {mvp} defeated {n} times.","translation":"由{pet}進化：需{pet}達到忠誠，並擊敗{mvp} {n} 次。"},{"original":"{pet} must be Cordial ({n}/{min}).","translation":"{pet}必須達到親密（{n}/{min}）。"},{"original":"{pet} is born! Take it along from the character’s Pets tab.","translation":"{pet}誕生了！可在角色的「寵物」分頁中攜帶。"},{"original":"The tower is closed to you. Defeat the MVP of {stage} with this character to open its first 10 waves.","translation":"塔對你關閉。用此角色擊敗{stage}的 MVP，即可開啟前 10 波。"},{"original":"Clear {stage}","translation":"通關{stage}"},{"original":"Not your specialization: it can only be changed with the {npc} in Prontera.","translation":"不是你的專精：只能找普隆德拉的{npc}更改。"},{"original":"Your basic attacks have a {a} chance to cast {skill} for free, with {b} of its damage","translation":"你的普通攻擊有 {a} 機率免費施放{skill}，造成其 {b} 的傷害"},{"original":"{skill} deals {a} more damage in a {b} larger area.","translation":"{skill}傷害提高 {a}，範圍擴大 {b}。"},{"original":"{skill} always goes off twice in a row.","translation":"{skill}永遠連續發動兩次。"},{"original":"Where {skill} hits, a zone stays for {a} s that deals {b} of its hit every second to everyone inside","translation":"{skill}命中處留下持續 {a} 秒的區域，每秒對其中所有敵人造成其打擊 {b} 的傷害"},{"original":"Every hit of {skill} bounces to another nearby enemy for half the damage","translation":"{skill}的每次打擊都會彈到附近另一個敵人，造成一半傷害"},{"original":"{skill} finishes off non-boss enemies left below {a} HP","translation":"{skill}會終結 HP 低於 {a} 的非頭目敵人"},{"original":"If {skill} kills an enemy, it recharges at once (at most once per second)","translation":"若{skill}擊殺敵人，會立即重新充能（每秒最多一次）"},{"original":"{skill} heals you for {a} of the damage it deals","translation":"{skill}造成傷害的 {a} 會治療你"},{"original":"{skill} lasts {a} longer.","translation":"{skill}持續時間延長 {a}。"},{"original":"{skill} recharges {a} faster.","translation":"{skill}充能加快 {a}。"},{"original":"{skill} reaches {a} more targets.","translation":"{skill}多波及 {a} 個目標。"},{"original":"{skill} freezes everyone it hits for {a} s.","translation":"{skill}冰凍所有命中的敵人 {a} 秒。"},{"original":"{skill} stuns everyone it hits for {a} s.","translation":"{skill}使所有命中的敵人暈眩 {a} 秒。"},{"original":"{skill} bleeds {a} of its damage over 3 s.","translation":"{skill}在 3 秒內造成其傷害 {a} 的流血。"},{"original":"Enemies hit by {skill} take +{a} damage for 4 s.","translation":"被{skill}命中的敵人在 4 秒內受到傷害 +{a}。"},{"original":"{skill} has a {a} chance to stun.","translation":"{skill}有 {a} 機率暈眩。"},{"original":"Enemies hit by {skill} deal {a} less damage for 5 s.","translation":"被{skill}命中的敵人在 5 秒內造成的傷害減少 {a}。"},{"original":"{skill} slows the enemies it hits for {a} s.","translation":"{skill}使命中的敵人緩速 {a} 秒。"},{"original":"{skill} blinds the enemies it hits for {a} s.","translation":"{skill}使命中的敵人致盲 {a} 秒。"},{"original":"Critical hits of {skill} deal +{a} damage.","translation":"{skill}的暴擊傷害 +{a}。"},{"original":"The tower is closed to you. Beat the MVP of {stage} with this character to open its first 10 floors.","translation":"塔對你關閉。用此角色擊敗{stage}的 MVP，即可開啟前 10 層。"},{"original":"{skill} Deity rises to rank {r}!","translation":"{skill}神格升至等級 {r}！"},{"original":"MVP {mvp} has appeared!","translation":"MVP {mvp} 出現了！"},{"original":"{mvp} has appeared!","translation":"{mvp} 出現了！"},{"original":"{mvp} is enraged!","translation":"{mvp} 暴怒了！"},{"original":"Wave {n}! MVP {mvp} has appeared!","translation":"第 {n} 波！MVP {mvp} 出現了！"},{"original":"Floor {n}! MVP {mvp} has appeared!","translation":"第 {n} 層！MVP {mvp} 出現了！"},{"original":"Hold off the orc assault beside the king: {minutes}:{seconds}","translation":"在國王身旁抵擋獸人進攻：{minutes}:{seconds}"},{"original":": +{value}% damage on {skill}.","translation":"：{skill} 傷害 +{value}%。"}];
  const WIKI_PASSAGES = new Map([["The leader is the host: picks the stage and runs the monsters. If they leave, another member takes the run over.","隊長擔任主機，負責選擇關卡和處理魔物行動。若隊長離開，會由另一名隊員接手這場遠征。"],["Stories cannot be played in a party: leave the party to play them. If another character on your account already cleared one, you can skip it and get its reward (no EXP).","劇情只能單人遊玩，請先離開隊伍。同帳號的其他角色若已通關，你可以跳過該段劇情並領取獎勵，但不會獲得 EXP。"],["Tap them to whisper, inspect their gear, trade, invite to party or add as a friend. Pieces tagged “Not tradable” (starter gear and anything bound to your account, like what you got while playing as a guest) can't be given away.","點選玩家可密語、查看裝備、交易、邀請組隊或加為好友。標示「不可交易」的裝備無法轉給他人，包括初始裝備及綁定帳號的裝備，例如以訪客身分取得的裝備。"],["On floors that character has already cleared you can speed the run up to x2 or x4 with the speed button on the scoreboard (or the V key); while it is sped up, graphics drop to the minimum. When you reach a floor you have not cleared yet it goes back to normal speed and your graphics on its own. It counts the same as at normal speed.","在這名角色已通過的樓層，可用計分板上的速度按鈕或 V 鍵切換至 x2 或 x4 倍速。加速期間，畫質會降到最低。抵達尚未通過的樓層時，遊戲會自動恢復正常速度和原本的畫質設定，計分方式與正常速度相同。"],["Many pieces carry something of their own, taken from what they give in RO: the","許多裝備沿用 RO 原作的專屬效果。說明中的"],["on the tooltip. It comes at every quality, on top of the affixes, and its value is multiplied by the tier of the stage where it drops (tier 2 = ×2) and by refine. 👑 = mini boss or MVP: they drop their gear much more often than normal monsters.","就是這項效果。各種品質的裝備都可帶有這項效果，並與詞綴疊加。數值會乘上掉落關卡的階級倍率（第 2 階為 ×2）和精鍊倍率。👑 代表小頭目或 MVP，牠們比一般魔物更容易掉落各自的裝備。"],["2nd job characters only. One-minute floors that keep getting harder, with monsters that never stop coming: to clear each one you must reach its minimum points and, if it has bosses, kill them before time runs out; otherwise the run ends. Floors 10, 20, 30... last two minutes and only the MVP of the block shows up, summoning 30 monsters every 15 seconds: you have to kill it in time. At the start you pick the Deity of one of your skills (it goes up a rank every 10 floors) and before each floor you pick one of the common upgrade cards on offer, one for your basic attack and one for each skill you carry (+3% damage and +0.5% HP, like a level-up); after floors 5 and 10 of each block, the cards are epic. Clearing floor 50 unlocks the Blood Savage dye for all your characters (put it on at the Stylist). A run can be saved and resumed only once, from the start of the floor you were on. Tower upgrades and skills are bought with its own points at the Guardian. Needs a registered account: the server verifies every run for the monthly ladder.","僅限二轉角色挑戰。每層限時一分鐘，難度逐層提高，魔物會持續出現。你必須達到該層的最低分數，有首領時還須在時間內擊敗首領，否則遠征結束。第 10、20、30……層限時兩分鐘，只有該區段的 MVP 登場，每 15 秒召喚 30 隻魔物，必須在時限內擊敗牠。開局時，從自己的技能中選擇一項神格，每 10 層提升一階。每層開始前，從提供的普通強化卡中選一張。普攻和攜帶的每項技能各有一張可選（傷害 +3%、HP +0.5%，效果如同升級）。每區段通過第 5 與第 10 層後，提供的卡片為史詩品質。通過第 50 層會為帳號內所有角色解鎖嗜血蠻兵染色，可向造型師套用。每次遠征只能儲存並續玩一次，續玩時從當時所在樓層的起點開始。無限塔的強化和技能可用塔內點數向高塔守衛購買。挑戰須使用已註冊的帳號，伺服器會驗證每場遠征的成績以列入月度排行榜。"],["Your character button opens their panel: gear, cards, stats, talents, pet and records. Stats and talents are reset from there too. Inventory, loose cards, ores and Kafra Points belong to the account: all your characters share them.","點選「角色」可開啟角色面板，查看裝備、卡片、能力值、天賦、寵物與紀錄，也可以在這裡重置能力值與天賦。背包物品、未鑲嵌的卡片、礦石與卡普拉點數由帳號內所有角色共用。"],["Gear drops from monsters (each one’s RO drops) and belongs to the account: all your characters share it. Dying never costs you what you already had. Regular monsters and elites drop at most {1} pieces per run at the lowest difficulty and up to {2} with everything maxed; each boss drops at most one, on top of that.","裝備由魔物掉落，沿用各魔物在 RO 中的掉落品，並由帳號內所有角色共用。角色陣亡時，已擁有的物品會保留。最低難度下，一般魔物與菁英每場遠征合計最多掉落 {1} 件裝備，所有難度設定拉滿時最多 {2} 件。每名首領另外最多掉落一件。"],["Gear drops from monsters (each one’s RO drops) and belongs to the account: all your characters share it. Dying never costs you what you already had. During the run, what a monster drops (a piece or a card) falls as a «?»: you do not need to pick it up, it is already yours; after a few seconds it fades and «Item found!» shows up. When the run ends, the summary screen shows what it was (the server decides the piece and its quality). In a group, the «?» belong to everyone and are shared out at the end. Regular monsters and elites drop at most {1} pieces per run at the lowest difficulty and up to {2} with everything maxed; each boss drops at most one, on top of that.","裝備由魔物掉落，沿用各魔物在 RO 中的掉落品，並由帳號內所有角色共用。角色陣亡時，已擁有的物品會保留。遠征中，魔物掉落的裝備或卡片會以「？」出現在地上。單人遊玩時，掉落物會自動歸你，無須撿取。問號會在幾秒後消失，並顯示「找到物品！」。遠征結束時，結算畫面會顯示掉落物，裝備種類與品質由伺服器決定。組隊時，掉落物由全隊共用，並在結束時分配。最低難度下，一般魔物與菁英每場遠征合計最多掉落 {1} 件，所有難度設定調到最高時最多 {2} 件。每名首領另外最多掉落一件。"],["Everything from epic and +{1}–{2}% damage to a skill: up to tier {3}, a skill of a 1st job that can use the item; from tier {4}, a skill of a 2nd job that can use it","包含史詩裝備的所有效果，另使一項技能的傷害提高 {1}–{2}%。第 {3} 階以下（含）加成適用於可使用這件裝備的一轉職業技能，第 {4} 階起則適用於可使用這件裝備的二轉職業技能。"],["Gear that drops during a run is","遠征中掉落的裝備會標為"],["unidentified","未鑑定"],[": you see its quality, but its affixes are revealed when the run ends and the server claims it.","。掉落時即可看到品質，詞綴會在遠征結束、伺服器結算後揭曉。"],["The account currency. Earn them by selling gear and cards to the Ore Merchant and spend them on ores, pet accessories and more. They are bound to your account: they cannot be traded.","卡普拉點數是帳號共用的貨幣。把裝備和卡片賣給礦石商人即可獲得點數，可用來購買礦石、寵物配件等物品。點數綁定帳號，無法交易。"],["When you play solo, your pet comments on the run: it greets you at the start, worries when your HP is low, cheers you on during streaks and is sad if you fall (at most one line every half minute). In a party it stays quiet.","單人遊玩時，寵物會在開場時跟你打招呼，HP 過低時會擔心你，連殺時會替你加油，你倒下時也會難過。寵物每半分鐘最多說一句話，組隊時會保持安靜。"]]);
  const OFFICIAL_BOSS_CASTS = new Map([["Eclipse: 月之跳躍!!","藍瘋兔：月之跳躍！"],["Eclipse: 衝鋒!!","藍瘋兔：衝鋒！"],["Eclipse: 滿月!!","藍瘋兔：滿月！"],["Vocal: 震耳之歌!!","蝗蟲之王：震耳之歌！"],["Vocal: 蟋蟀跳!!","蝗蟲之王：蟋蟀跳！"],["Vocal: 尖嘯!!","蝗蟲之王：尖嘯！"],["Toad: 泡泡噴射!!","蛙王：泡泡噴射！"],["Toad: 蟾蜍跳!!","蛙王：蟾蜍跳！"],["Toad: 呱呱叫!!","蛙王：呱呱叫！"],["Toad: 青蛙們！!!","蛙王：青蛙們！"],["Dragon Fly: 俯衝!!","龍蠅：俯衝！"],["Dragon Fly: 嗡嗡!!","龍蠅：嗡嗡！"],["Dragon Fly: 螫刺!!","龍蠅：螫刺！"],["Dragon Fly: 蟲群!!","龍蠅：蟲群！"],["Mastering: 果凍彈跳!!","波利之王：果凍彈跳！"],["Mastering: 波利雨!!","波利之王：波利雨！"],["Mastering: 碾壓!!","波利之王：碾壓！"],["Mastering: 大躍進!!","波利之王：大躍進！"],["Mastering: 果凍波!!","波利之王：果凍波！"],["Mastering: 分裂成波利！!!","波利之王：分裂成波利！"],["Biting Tarou: 咬擊!!","噬咬白鼠：咬擊！"],["Biting Tarou: 狂暴突進!!","噬咬白鼠：狂暴突進！"],["Plague Tarou: 咬擊!!","瘟疫白鼠：咬擊！"],["Plague Tarou: 地下水道瘟疫!!","瘟疫白鼠：地下水道瘟疫！"],["Burrowing Tarou: 咬擊!!","掘地白鼠：咬擊！"],["Burrowing Tarou: 鑽地!!","掘地白鼠：鑽地！"],["Burrowing Tarou: 老鼠們！!!","掘地白鼠：老鼠們！"],["Golden Thief Bug: 黃金鑽地!!","黃金蟲：黃金鑽地！"],["Golden Thief Bug: 黃金甲殼!!","黃金蟲：黃金甲殼！"],["Golden Thief Bug: 貪婪!!","黃金蟲：貪婪！"],["Golden Thief Bug: 黃金衝鋒!!","黃金蟲：黃金衝鋒！"],["Golden Thief Bug: 黃金大顎!!","黃金蟲：黃金大顎！"],["Golden Thief Bug: 蟲群!!","黃金蟲：蟲群！"],["Angeling: 聖光!!","天使波利：聖光！"],["Angeling: 天使之躍!!","天使波利：天使之躍！"],["Angeling: 天堂審判!!","天使波利：天堂審判！"],["Deviling: 黑暗球!!","惡魔波利：黑暗球！"],["Deviling: 惡魔之躍!!","惡魔波利：惡魔之躍！"],["Deviling: 地獄衝鋒!!","惡魔波利：地獄衝鋒！"],["Ghostring: 哀嘆!!","幽靈波利：哀嘆！"],["Ghostring: 幽靈之觸!!","幽靈波利：幽靈之觸！"],["Ghostring: 消逝!!","幽靈波利：消逝！"],["Penomena: 觸手!!","梅納海葵：觸手！"],["Penomena: 深海之根!!","梅納海葵：深海之根！"],["Penomena: 毒液潮!!","梅納海葵：毒液潮！"],["Penomena: 九頭蛇新芽!!","梅納海葵：九頭蛇新芽！"],["Drake: 軍刀斬!!","海盜之王：軍刀斬！"],["Drake: 旋風!!","海盜之王：旋風！"],["Drake: 膨脹!!","海盜之王：膨脹！"],["Drake: 全員，到我身邊！!!","海盜之王：全員，到我身邊！"],["Deviace: 貪婪啃咬!!","狄奧斯：貪婪啃咬！"],["Deviace: 深淵突進!!","狄奧斯：深淵突進！"],["Deviace: 旋風!!","狄奧斯：旋風！"],["Strouf: 甩尾!!","海神：甩尾！"],["Strouf: 雷爆術!!","海神：雷爆術！"],["Strouf: 湧浪!!","海神：湧浪！"],["Strouf: 魚群！!!","海神：魚群！"],["King Dramoh: 鉗擊!!","大腳龍蝦：鉗擊！"],["King Dramoh: 國王衝鋒!!","大腳龍蝦：國王衝鋒！"],["King Dramoh: 泡泡!!","大腳龍蝦：泡泡！"],["King Dramoh: 鋼鐵巨鉗!!","大腳龍蝦：鋼鐵巨鉗！"],["King Dramoh: 我的子民們！!!","大腳龍蝦：我的子民們！"],["Kraken: 觸手列陣!!","魔鬼大烏賊：觸手列陣！"],["Kraken: 交叉鞭打!!","魔鬼大烏賊：交叉鞭打！"],["Kraken: 墨雲!!","魔鬼大烏賊：墨雲！"],["Kraken: 海妖之擁!!","魔鬼大烏賊：海妖之擁！"],["Kraken: 深淵漩渦!!","魔鬼大烏賊：深淵漩渦！"],["Kraken: 海妖觸手！!!","魔鬼大烏賊：海妖觸手！"],["Vagabond Wolf: 連續咬擊!!","流浪之狼：連續咬擊！"],["Vagabond Wolf: 狼躍!!","流浪之狼：狼躍！"],["Vagabond Wolf: 狂野突進!!","流浪之狼：狂野突進！"],["Vagabond Wolf: 大地重擊!!","流浪之狼：大地重擊！"],["Vagabond Wolf: 群狼之嚎!!","流浪之狼：群狼之嚎！"],["Skeleton General: 將軍劈砍!!","邪骸戰士長：將軍劈砍！"],["Skeleton General: 衝啊！!!","邪骸戰士長：衝啊！"],["Skeleton General: 弓箭手，放箭！!!","邪骸戰士長：弓箭手，放箭！"],["Skeleton General: 列隊！!!","邪骸戰士長：列隊！"],["Skeleton General: 弓箭手，到我身邊！!!","邪骸戰士長：弓箭手，到我身邊！"],["Cat O' Nine Tails: 連續爪擊!!","狂暴月夜貓：連續爪擊！"],["Cat O' Nine Tails: 狐火!!","狂暴月夜貓：狐火！"],["Cat O' Nine Tails: 狐步!!","狂暴月夜貓：狐步！"],["Cat O' Nine Tails: 九尾!!","狂暴月夜貓：九尾！"],["Cat O' Nine Tails: 姊妹們！!!","狂暴月夜貓：姊妹們！"],["Hyegun: 殭屍跳!!","妖君：殭屍跳！"],["Hyegun: 符咒!!","妖君：符咒！"],["Hyegun: 死亡之擁!!","妖君：死亡之擁！"],["Hyegun: 大躍進!!","妖君：大躍進！"],["Hyegun: 甦醒吧！!!","妖君：甦醒吧！"],["Moonlight Flower: 狐火!!","月夜貓：狐火！"],["Moonlight Flower: 月步!!","月夜貓：月步！"],["Moonlight Flower: 月之舞!!","月夜貓：月之舞！"],["Moonlight Flower: 火焰扇!!","月夜貓：火焰扇！"],["Moonlight Flower: 火之月!!","月夜貓：火之月！"],["Moonlight Flower: 九尾!!","月夜貓：九尾！"],["Eddga: 烈焰之爪!!","虎王：烈焰之爪！"],["Eddga: 燃燒衝鋒!!","虎王：燃燒衝鋒！"],["Eddga: 猛虎撲擊!!","虎王：猛虎撲擊！"],["Eddga: 地獄咆哮!!","虎王：地獄咆哮！"],["Eddga: 餘燼之雨!!","虎王：餘燼之雨！"],["Eddga: 到我身邊，大腳熊！!!","虎王：到我身邊，大腳熊！"],["Orc Hero: 斧劈!!","獸人英雄：斧劈！"],["Orc Hero: 戰吼!!","獸人英雄：戰吼！"],["Orc Hero: 獸人衝鋒!!","獸人英雄：獸人衝鋒！"],["Orc Hero: 英勇之躍!!","獸人英雄：英勇之躍！"],["Osiris: 木乃伊詛咒!!","俄塞里斯：木乃伊詛咒！"],["Osiris: 沙漠之沙!!","俄塞里斯：沙漠之沙！"],["Osiris: 傳送!!","俄塞里斯：傳送！"],["Baphomet: 黑暗風暴!!","巴風特：黑暗風暴！"],["Baphomet: 鐮刀!!","巴風特：鐮刀！"],["Baphomet: 衝鋒!!","巴風特：衝鋒！"],["Baphomet: 地震!!","巴風特：地震！"],["Kraken: 深海之怒!!","魔鬼大烏賊：深海之怒！"],["Moonlight Flower: 月之鐘!!","月夜貓：月之鐘！"],["Moonlight Flower: 封印之鐘!!","月夜貓：封印之鐘！"],["Dancing Dragon: 龍舞!!","舞龍：龍舞！"],["Dancing Dragon: 鞭炮!!","舞龍：鞭炮！"],["Dancing Dragon: 火焰吐息!!","舞龍：火焰吐息！"],["Dancing Dragon: 甩尾!!","舞龍：甩尾！"],["Dancing Dragon: 鞭炮陣!!","舞龍：鞭炮陣！"],["Live Peach Tree: 星形樹根!!","桃妖樹：星形樹根！"],["Live Peach Tree: 桃子螺旋!!","桃妖樹：桃子螺旋！"],["Live Peach Tree: 桃樹之蔭!!","桃妖樹：桃樹之蔭！"],["Live Peach Tree: 桃子轟炸!!","桃妖樹：桃子轟炸！"],["Live Peach Tree: 發芽吧！!!","桃妖樹：發芽吧！"],["Wanderer: 千刃斬!!","浪人：千刃斬！"],["Wanderer: 流浪之影!!","浪人：流浪之影！"],["Wanderer: 拔刀術!!","浪人：拔刀術！"],["Wanderer: 迴旋十字斬!!","浪人：迴旋十字斬！"],["Wooden Golem: 樹幹跳!!","木魔像：樹幹跳！"],["Wooden Golem: 追蹤樹根!!","木魔像：追蹤樹根！"],["Wooden Golem: 四象地震!!","木魔像：四象地震！"],["Wooden Golem: 滾木!!","木魔像：滾木！"],["Wooden Golem: 荊棘樹皮!!","木魔像：荊棘樹皮！"],["Rice Cake Boy: 搗麻糬!!","年糕童子：搗麻糬！"],["Rice Cake Boy: 黏黏麻糬!!","年糕童子：黏黏麻糬！"],["Rice Cake Boy: 年糕雨!!","年糕童子：年糕雨！"],["Rice Cake Boy: 麻糬傳球!!","年糕童子：麻糬傳球！"],["Spring Rabbit: 春之跳躍!!","新春兔：春之跳躍！"],["Spring Rabbit: 鑽地!!","新春兔：鑽地！"],["Spring Rabbit: 迴旋踢!!","新春兔：迴旋踢！"],["White Lady: 玉扇!!","白素貞：玉扇！"],["White Lady: 紙鶴!!","白素貞：紙鶴！"],["White Lady: 湖面倒影!!","白素貞：湖面倒影！"],["White Lady: 蓮花綻放!!","白素貞：蓮花綻放！"],["White Lady: 侍衛！!!","白素貞：侍衛！"],["Evil Snake Lord: 劇毒筆觸!!","蛇王：劇毒筆觸！"],["Evil Snake Lord: 蛇之書法!!","蛇王：蛇之書法！"],["Evil Snake Lord: 蜿蜒筆觸!!","蛇王：蜿蜒筆觸！"],["Evil Snake Lord: 活之畫!!","蛇王：活之畫！"],["Evil Snake Lord: 墨印!!","蛇王：墨印！"],["Evil Snake Lord: 墨染雙眼!!","蛇王：墨染雙眼！"]]);
  // RO Survivors 公開技能表同一 ID 的繁中與英文名稱。裝備與魔物目前以英文名稱呈現。
  const OFFICIAL_SKILL_NAMES = new Map(Object.entries({
    '降低士氣的吶喊': 'Demoralizing Shout',
    '盾牌衝擊': 'Shield Bash',
    '箭矢暴雨': 'Arrow Rain',
    '撤退': 'Retreat',
    '奧術射擊': 'Arcane Shot',
    '毒藥瓶': 'Poison Bomb',
    '影步': 'Shadowstep',
    '飛刀扇': 'Fan of Knives',
    '撒菱': 'Caltrops',
    '手推車衝撞': 'Cart Rush',
    '溫和之風': 'Mild Wind',
    '聖錘 十字星': 'Grand Cross',
    '爆散陷阱': 'Claymore Trap',
    '聖母之祈福': 'Benedictio',
    '旋風斧': 'Axe Tornado',
    '回力斧': 'Axe Boomerang',
    '衝擊震地': 'Rush Quake',
    '太陽爆發': 'Solar Burst',
    '滿月踢': 'Full Moon Kick',
    '新月踢': 'New Moon Kick',
    '流星墜落': 'Falling Star',
    '太陽和月亮和星星的融合': 'Union of the Sun, Moon and Stars'
  }));
  const SKILL_NAME_FIELD = '#wiki .wk-skill-head b, #picker .pk-name, #skill-tip:not(.st-short) .st-head b';
  const LOBBY_QUEUE_STATUS = /^(?:Square full · in queue|廣場已滿 · 排隊中)(?:$|[:：])/u;
  const CHAT_QUEUE_NOTICE = "The square is full: you're in the queue and will get in on your own as soon as there's room.";
  const SCHEMA = 1;
  const SETTINGS = 'settings-v1';
  const LIMIT = 20000;
  const MAX_TEXT = 600;
  const MAX_FILE = 8 * 1024 * 1024;
  const ATTRS = ['title', 'aria-label', 'alt', 'placeholder'];
  const SLOT = /\{([1-9]\d*)\}/g;
  const NUMBER = /(?<![\p{L}\p{N}_])(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?![\p{L}\p{N}_])/gu;
  const RO_STAT = /\b(?:STR|AGI|VIT|INT|DEX|LUK)\b/g;
  const HAN = /\p{Script=Han}/u;
  const PRIVATE_TEXT = /(?:https?:|www\.|\S@\S|@[\w.]+|\b(?:\d{1,4}[-/]\d{1,2}[-/]\d{1,4}|\d{1,2}:\d{2}|v?\d+\.\d+\.\d+)\b|\b[0-9a-f]{12,}\b|\b[\w-]{24,}\b|\b(?=[A-Z0-9]{7,}\b)(?=[A-Z0-9]*\d)[A-Z0-9]+\b|\b\d{7,}\b|\b(?:password|username|account|character name|player name)\s*:)/i;
  const IGNORE = /^(?:RO|SURVIVORS|BETA|EN|ES|English|Español|STR|AGI|VIT|INT|DEX|LUK|HP|SP|EXP|ATK|MATK|ASPD|DEF|MDEF|DPS|MVP|GS|Lv)(?:[\d★*]+)?$/i;
  const BLOCKED = [
    'script', 'style', 'noscript', 'template', 'pre', 'code', 'canvas', 'svg', 'kbd:not(#lobby-prompt > kbd)',
    // The game opts out of browser translation at the document root.
    'input:not(#chat-input, #wk-search)', 'textarea', 'select:not(#sp-register .rq-field > select.ro-select)',
    'option:not(#sp-register .rq-field > select.ro-select > option:first-child[value=""][disabled])', '[contenteditable]', ':not(html)[translate="no"]',
    '#stage', '#run-labels', '#lobby-labels > :not(.npc, #player-menu)', '#party-frame', '#party-wait',
    '#loot-rolls', '#friends:not(:has(> #player-menu))', '#friends > :not(#player-menu)',
    '#trade', '#chat-log > :not(.chat-line.system)', '#pb-name', '#wiki .wk-result small',
    '#towerkeeper .tk-lrow > span',
    '#slots .slot-name', '#slots .n', '#slot-info .n', '#cp-avatar', '#hud-name > span',
    '#account-popup', '#cc-error', '#sp-version', '#opt-version',
    '#sp-login .error', '#sp-register .error', '#sp-recover', '#sp-reset',
    '#legal-popup', '#ro-zh-tw-tools'
  ].join(',');

  // 查看玩家時，桌面版把天賦提示放進共用浮窗，行動版則寫入職業分頁。
  const TALENT_DETAILS = '#charpanel #tooltip, #ins-job-detail, .tooltip.item-tip:has(> b ~ span.muted)';
  const ITEM_DETAILS = '.tooltip.item-tip .muted, .tooltip.item-tip > .base-stats, #ins-detail > .muted';

  // 以下區塊由已檢查的遊戲程式產生。混合玩家資料的面板只處理列明的欄位。
  const PUBLIC_UI = [
    '#splash .sp-tabs', '#splash .ro-title', '#splash .sp-logo',
    '#splash [data-sp-pane="guest"]', '#sp-top', '#loading', '#news-popup',
    '#charselect .brand', '#charselect .ro-title', '#charselect .btn-row',
    '#charselect .pb-ach', '#pb-kind', '#pb-kafra', '#pb-exit', '#pb-register', '#pb-portrait',
    '#slots', '#slot-info', '#charcreate', '#options', '#portrait-picker',
    '#cp-level', '#cp-job-level', '#cp-exp-text', '#cp-job-exp-text', '#cp-stat-points',
    '#cp-points', '#cp-gs', '#charpanel .tabs', '#charpanel .btn-row', '#cp-back', '#cp-sock',
    '#cp-tab-equip', '#cp-tab-inv', '#cp-tab-cards', '#cp-tab-pets .box-title', '#cp-pet-detail', '#cp-tab-cos',
    '#cp-tab-stats', '#cp-tab-talents', TALENT_DETAILS, '.tooltip.item-tip > .stat-tip',
    '#inspect .ins-tabs > button', '#ins-head', '#ins-equip .equip-slot :is(.lbl, .nm)',
    '#ins-detail', '#ins-close', '#ins-tab-stats .box-title', '#ins-prim .ins-prim',
    '#ins-derived', '#ins-record', '#ins-trees',
    '#lobby-place', '#lobby-actions', '#lobby-labels > .npc', '#minimap-name',
    '#npc-text .diff',
    '#shop', '#wiki', '#stages', '#smith', '#chronicle', '#towerkeeper', '#stylist', '#channel-list',
    '#petkeeper .ro-title', '#petkeeper .btn-row', '#petkeeper .tab-btn',
    '#petkeeper #pk-list', '#petkeeper #pk-kafra', '#petkeeper #pk-note',
    '#festival :is(.fe-head, .tabs, #festival-close, #festival-play, #fe-bar, .gc-balls, .fe-hint, .fe-col-ball, .fe-slot)',
    '#picker', '#skill-tip', '#drop-reveal',
    '#pause', '#gameover .ro-title', '#gameover .btn-row', '#go-stats',
    '#hud-name > small', '#hud .boss-name', '#hud #announce', '#hud #quest', '#hud #chest-cost',
    '#hud #skillbar', '#hud #runitems', '#hud #buffs', '#hud #weather', '#hud #bank-btn', '#story'
  ].join(',');
  const HUD_TOAST = '#hud #toasts > .toast';
  const KNOWN_ONLY = [
    '.untradable-tag', // Fixed game badge and title; preserve trade/player data exclusions.
    '#mailbox .ro-title, #mb-close, #mb-list > .empty-note, #mb-read > .muted',
    '#go-server-loot .go-loot-note, #go-server-loot .gl-head > span:first-child, #go-server-loot .gl-btns button, #go-server-loot .gl-foot button, #go-server-loot .gl-name > small, #go-server-loot .gl-mine > span',
    '#mb-list .mb-row .chr-info > b, #mb-list .mb-tag, #mb-read > .mb-title, #mb-read > .mb-body',
    '#mb-read .mb-attach-head, #mb-read .mb-grid .item-cell[title], #mb-delete, #mb-claim',
    '#sp-login label', '#sp-login button', '#sp-register label', '#sp-register button',
    '#sp-legal-link', '#sp-credits-link', '#splash footer', '#splash .sp-legal', '#splash .sp-meta > span', '#hud .ro-btn', HUD_TOAST,
    '#dps-toggle', '#dps .ro-title', '#dps .dps-mode', '#dps .dps-empty', '#dps .dps-total > span',
    '.tooltip.item-tip > :is(.tip-item, .tip-price, .bon-list, .error, .worn-note)', '#cp-pets .pet-cell[title]',
    '#npc-name', '#npc-options button', '#npc-dialog.over-splash #npc-text > p', '#lobby-prompt',
    '#festival .gc-result > .err',
    '#sp-register :is(#sp-guest-note, .rq-head, #sp-rq-help)',
    '#chat-channel', '#chat-tabs > button.chat-tab', '#chat-input', '#chat-emote',
    '#emote-panel .emote-phrases button', '#wiki #wk-search'
  ].join(',');

  // 玩家名稱在獨立的 <b> 裡。密語也和魔物 Whisper 共用英文名稱。
  const PLAYER_MENU_FIELDS = '#player-menu > :is(button.ro-btn, small.menu-note)';
  const PLAYER_MENU_TRANSLATIONS = new Map([
    ['Inspect', '查看角色'],
    ['Whisper', '密語'],
    ['Add friend', '加入好友'],
    ['Trade', '交易'],
    ['Report', '檢舉'],
    ['Invite to party', '邀請組隊'],
    ['Create an account to whisper, trade, have friends and play in a party.', '建立帳號後即可密語、交易、加好友和組隊。'],
    ['Playing as a guest: cannot trade, have friends or play in a party.', '這位玩家以訪客身分遊玩，無法交易、加好友或組隊。']
  ]);

  const state = {
    settings: { enabled: true, collectEnglish: false, preferAlternateSkillNames: true,
      hideEquipmentDetails: false, disableAutoFullscreen: false },
    dictionary: new Map(Object.entries(BUILTIN)),
    records: new Map(),
    pending: new Map(),
    database: null,
    ready: false,
    storageError: '',
    settingsError: '',
    limitReached: false,
    paused: false,
    writing: null
  };

  const originals = new WeakMap();
  const seen = new WeakMap();
  const lookupCache = new Map();
  const queue = new Set();
  let scan = null;
  let frame = 0;
  let flushTimer = 0;
  let channel;
  let refreshPending = false;
  let storyTimer = 0;
  let stableStory;
  let ui;
  let observer;
  let refreshCharacterPoints;
  let enabled = false;
  let collecting = false;

  const normalize = (value) => value.trim().replace(/\s+/gu, ' ');
  const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  function valuesEqual(left, right) {
    if (left.length !== right.length) return false;
    right.sort();
    return left.sort().every((value, index) => value === right[index]);
  }

  function numberTemplate(text) {
    const numbers = [];
    const key = text.replace(NUMBER, (number) => {
      numbers.push(number);
      return '{' + numbers.length + '}';
    });
    return { key, numbers };
  }

  function sourceKey(value) {
    if (typeof value !== 'string' || value.length > MAX_TEXT) return '';
    const key = normalize(value);
    if (!/[A-Za-z]/.test(key) || HAN.test(key) || IGNORE.test(key) || PRIVATE_TEXT.test(key) ||
      /[<>\u0000-\u001f]/.test(key)) return '';
    const slots = [...key.matchAll(SLOT)].map((match) => match[1]);
    if (slots.some((slot, i) => Number(slot) !== i + 1) ||
      /[{}]/.test(key.replace(SLOT, ''))) return '';
    return key;
  }

  function validTranslation(key, value) {
    if (typeof value !== 'string' || value.length > MAX_TEXT * 2 ||
      !HAN.test(value) || /[<>\u0000-\u001f]/.test(value)) return false;
    const slots = (text) => [...text.matchAll(SLOT)].map((match) => match[1]);
    return !/[{}]/.test(value.replace(SLOT, '')) &&
      valuesEqual(slots(key), slots(value)) &&
      valuesEqual(key.match(RO_STAT) || [], value.match(RO_STAT) || []) &&
      valuesEqual(key.replace(SLOT, '').match(NUMBER) || [], value.replace(SLOT, '').match(NUMBER) || []);
  }

  function lookup(key) {
    if (lookupCache.has(key)) return lookupCache.get(key);
    const template = numberTemplate(key);
    let result = state.dictionary.get(key);
    if (!result && template.numbers.length && !/[{}]/.test(key)) {
      result = state.dictionary.get(template.key)?.replace(SLOT, (_, index) => template.numbers[Number(index) - 1]);
    }
    // 遊戲有時會在數值效果句尾補句點。保留完整詞條的優先順序。
    if (!result && /\{1\}/.test(template.key) && /[^.]\.$/u.test(key)) {
      const sentence = lookup(key.slice(0, -1));
      if (sentence) result = /[。！？.!?]$/u.test(sentence) ? sentence : sentence + '。';
    }
    result ||= '';
    if (lookupCache.size >= 3000) lookupCache.clear();
    lookupCache.set(key, result);
    return result;
  }

  function translateWikiPassage(original, el, attr) {
    if (attr || !WIKI_PASSAGES.size || original.length > 1600 || !el.closest('#wk-detail')) return '';
    const key = normalize(original);
    const direct = WIKI_PASSAGES.get(key);
    if (direct) return direct;
    const { key: template, numbers } = numberTemplate(key);
    return WIKI_PASSAGES.get(template)?.replace(SLOT, (_, index) => numbers[Number(index) - 1]) || '';
  }

  function translateWikiEquipment(original, el) {
    if (el.matches('#wk-detail .wk-gear li') && /^\s*:\s/u.test(original)) {
      return original.replace(/^(\s*:\s*)(.+)$/u, (_, prefix, names) =>
        prefix + names.split(', ').map(name => {
          const icon = name.match(/^(?:👑|🎁) /u)?.[0] || '';
          return icon + (lookup(name.slice(icon.length)) || name.slice(icon.length));
        }).join(', '));
    }
    if (!el.matches('#wk-detail .wk-star, #wk-detail:has(#wk-deity-rank) .wk-item small')) return '';
    return original.split(/(\s+[·→]\s+)/u).map(part => {
      return part.replace(/^(\s*(?:★\s+)?)(\S.*?)(\s*)$/u, (match, prefix, effect, suffix) => {
        const translated = lookup(effect);
        return translated ? prefix + translated + suffix : match;
      });
    }).join('');
  }

  const publicLabel = /^(?:skill|stage|mvp|pet|talent|branch|npc)$/u;
  const publicPatternsByWord = new Map();
  for (const {original, translation} of PUBLIC_PATTERNS) {
    const slots = original.split(/\{(\w+)\}/u);
    const regex = slots.map((part, index) => {
      if (index % 2 === 0) return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return publicLabel.test(part) ? '([^<>{}]{1,80}?)' :
        '([+−-]?(?:\\d{1,3}(?:,\\d{3})+|\\d+)(?:\\.\\d+)?%?|\\{\\d+\\})';
    }).join('');
    const firstWord = original.match(/^[A-Za-z]+/u)?.[0] || '';
    const group = publicPatternsByWord.get(firstWord) || [];
    group.push({ match: new RegExp('^' + regex + '$', 'u'), keys: slots.filter((_, i) => i % 2), translation });
    publicPatternsByWord.set(firstWord, group);
  }

  function translatePublicPattern(key) {
    if (!publicPatternsByWord.size) return '';
    const firstWord = key.match(/^[A-Za-z]+/u)?.[0] || '';
    const specific = publicPatternsByWord.get(firstWord) || [];
    const general = firstWord && publicPatternsByWord.get('') || [];
    for (const {match, keys, translation} of [...specific, ...general]) {
      const captures = match.exec(key);
      if (!captures) continue;
      const values = new Map();
      const complete = keys.every((name, i) => {
        const raw = captures[i + 1];
        const value = publicLabel.test(name) ? lookup(raw) : raw;
        if (!value || (values.has(name) && values.get(name) !== value)) return false;
        values.set(name, value);
        return true;
      });
      if (complete) {
        return translation.replace(/\{(\w+)\}/g, (_, name) => values.get(name));
      }
    }
    return '';
  }

  // The chest picker supplies these labels from runItemName, never from player text.
  // Match only its replacement badge and confirmation face; keep the native card DOM.
  function translateRunItemSwap(original, el) {
    let parts;
    let format;
    const key = normalize(original);
    if (el.matches('#picker #pk-cards .pk-card > .pk-swap > span:not(.pk-swap-ico):last-child')) {
      parts = /^(?:Replaces |Sustituye a |取代 )(.+)$/u.exec(key);
      format = ([name]) => '將替換「' + name + '」';
    } else if (el.matches('#picker #pk-cards .pk-back > b')) {
      parts = /^Swap (.+) for (.+)\?$/u.exec(key) ||
        /^¿Cambiar (.+) por (.+)\?$/u.exec(key) || /^要將 (.+) 換成 (.+) 嗎？$/u.exec(key);
      format = ([oldName, newName]) => '要將「' + oldName + '」替換為「' + newName + '」嗎？';
    } else if (el.matches('#picker #pk-cards .pk-back > small')) {
      parts = /^(?:You will lose |Perderás )(.+)\.$/u.exec(key) || /^你將失去 (.+)。$/u.exec(key);
      format = ([name]) => '將失去「' + name + '」。';
    }
    if (!parts) return '';
    const names = parts.slice(1).map(name => {
      const rank = /^(.*?)( \+\d+)$/u.exec(name);
      const stem = rank ? rank[1] : name;
      const suffix = rank ? rank[2] : '';
      const base = lookup(stem);
      if (base) return base + suffix;
      // runItemName appends English " Deity" even when the skill name is Chinese.
      const deity = /^(.+) Deity$/u.exec(stem);
      if (deity) {
        const skill = deity[1];
        const preferred = state.settings.preferAlternateSkillNames && OFFICIAL_SKILL_NAMES.get(skill);
        const translated = (preferred && lookup(preferred)) || lookup(skill) || (HAN.test(skill) ? skill : '');
        if (translated) return translated + '神格' + suffix;
      }
      const direct = lookup(name);
      if (direct) return direct;
      return HAN.test(name) ? name : '';
    });
    // New, unrecognized English names stay in the regular unknown-text collection path.
    if (names.some(name => !name)) return '';
    return original.replace(/\S[\s\S]*\S|\S/u, () => format(names));
  }

  function translate(key, publicField) {
    const direct = lookup(key);
    if (direct) return { text: direct, complete: true };
    if (!publicField) return { text: '', complete: false };

    const dynamic = translatePublicPattern(key);
    if (dynamic) return { text: dynamic, complete: true };

    const deity = /^(Deity \+\d+): (.+)$/u.exec(key);
    if (deity) {
      const title = lookup(deity[1]);
      const effect = lookup(deity[2]);
      if (title && effect) return { text: title + '：' + effect, complete: true };
    }

    // 例如角色說明前面的「 — 」，以及技能圖示的「技能：說明」。
    const lead = key.match(/^(?:[—·]|MVP|Mini) /u)?.[0] || '';
    const parts = key.slice(lead.length).split(/( — | · |: )/u);
    let changed = false;
    let complete = true;
    for (let i = 0; i < parts.length; i += 2) {
      const colon = parts[i].endsWith(':');
      const star = parts[i].startsWith('★ ') && lookup(parts[i].slice(2));
      const value = lookup(parts[i]) || (star && '★ ' + star) || (colon && lookup(parts[i].slice(0, -1)));
      if (value) {
        parts[i] = colon && !value.endsWith('：') ? value + '：' : value;
        changed = true;
      } else if (sourceKey(parts[i]) &&
        !/^[+-](?:\d+(?:\.\d+)?|\{\d+\}) (?:STR|AGI|VIT|INT|DEX|LUK)$/u.test(parts[i])) {
        complete = false;
      }
    }
    return { text: changed ? lead + parts.join('') : '', complete: changed && complete };
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ro-survivors-zh-tw', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('entries', { keyPath: 'original' });
      request.onsuccess = () => {
        const database = request.result;
        database.onversionchange = () => {
          database.close();
          state.ready = false;
          storageFailure('資料庫已更新，請重新整理頁面。');
        };
        resolve(database);
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('資料庫正被其他分頁占用'));
    });
  }

  function transact(mode, perform) {
    return new Promise((resolve, reject) => {
      const transaction = state.database.transaction('entries', mode);
      let result;
      transaction.oncomplete = () => resolve(result);
      transaction.onabort = () => reject(transaction.error || new Error('資料庫作業中止'));
      perform(transaction.objectStore('entries'), (value) => { result = value; });
    });
  }

  async function readRecords() {
    const rows = await transact('readonly', (store, done) => {
      const request = store.getAll();
      request.onsuccess = () => done(request.result);
    });
    const dictionary = new Map(Object.entries(BUILTIN));
    const records = new Map();
    for (const row of rows) {
      if (sourceKey(row.original) !== row.original) continue;
      if (row.translation && validTranslation(row.original, row.translation)) {
        dictionary.set(row.original, row.translation);
      }
      if (Number.isSafeInteger(row.count) && row.count > 0 && !dictionary.has(row.original)) {
        records.set(row.original, row.count);
      }
    }
    const dictionaryChanged = dictionary.size !== state.dictionary.size ||
      [...dictionary].some(([key, value]) => state.dictionary.get(key) !== value);
    state.dictionary = dictionary;
    if (dictionaryChanged) {
      lookupCache.clear();
      rescan();
    }
    for (const key of records.keys()) {
      if (translate(key, true).complete) records.delete(key);
    }
    state.records = records;
    updatePanel();
  }

  function storageFailure(message) {
    state.storageError = message;
    updatePanel();
  }

  function record(key) {
    if (!state.ready || state.paused) return;
    if (!state.records.has(key) && !state.pending.has(key) &&
      state.records.size + state.pending.size >= LIMIT) {
      if (!state.limitReached) {
        state.limitReached = true;
        updatePanel();
      }
      return;
    }
    state.pending.set(key, (state.pending.get(key) || 0) + 1);
    if (!flushTimer) flushTimer = setTimeout(() => { void flush(); }, 1250);
  }

  async function flush() {
    clearTimeout(flushTimer);
    flushTimer = 0;
    if (state.writing) {
      await state.writing;
      return flush();
    }
    if (!state.ready || !state.pending.size) return;
    const batch = state.pending;
    state.pending = new Map();
    state.writing = (async () => {
      try {
        const updated = new Map();
        await transact('readwrite', (store) => {
          for (const [original, count] of batch) {
            const request = store.get(original);
            request.onsuccess = () => {
              const row = request.result || { original };
              if (!row.translation) {
                const total = (row.count || 0) + count;
                store.put({ ...row, count: total });
                updated.set(original, total);
              }
            };
          }
        });
        for (const [key, count] of updated) {
          if (!translate(key, true).complete) state.records.set(key, count);
        }
        state.storageError = '';
        channel?.postMessage('records');
      } catch {
        for (const [key, count] of batch) {
          state.pending.set(key, (state.pending.get(key) || 0) + count);
        }
        storageFailure('待翻譯文字儲存失敗，資料暫留在本頁。請先匯出備份。');
      }
    })();
    await state.writing;
    state.writing = null;
    updatePanel();
    if (refreshPending) void refreshFromOtherTab();
  }

  async function refreshFromOtherTab() {
    refreshPending = true;
    if (!state.ready || state.writing || state.paused) return;
    refreshPending = false;
    try {
      await readRecords();
    } catch {
      storageFailure('無法讀取其他分頁的詞庫更新。');
    }
  }

  function elementOf(node) {
    return node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  }

  function translateTalentTooltip(key) {
    const next = key.startsWith('Next rank: ');
    const detail = next ? key.slice('Next rank: '.length) : key;
    let text = lookup(detail);
    if (!text) {
      const branch = /^Requires (\d+) points? in (.+)\.$/.exec(detail);
      const prerequisite = /^Requires (.+) at max rank \((\d+\/\d+)\)\.$/.exec(detail);
      const modifier = /^(.+) on (.+)\.$/.exec(detail);
      if (branch && lookup(branch[2])) {
        text = '需要在「' + lookup(branch[2]) + '」投入 ' + branch[1] + ' 點。';
      } else if (prerequisite && lookup(prerequisite[1])) {
        text = '需要將「' + lookup(prerequisite[1]) + '」升至滿級（' + prerequisite[2] + '）。';
      } else if (modifier && lookup(modifier[1]) && lookup(modifier[2])) {
        text = lookup(modifier[2]) + '：' + lookup(modifier[1]) + '。';
      }
    }
    if (!text && next) {
      const effect = translate(detail, true);
      if (effect.complete) text = effect.text;
    }
    return text && (next ? '下一級：' + text : text);
  }

  function translatePetDrop(key) {
    const drop = /^Its egg drops from (.+?) \((.+)\)\.$/u.exec(key);
    if (!drop) return '';
    const pet = lookup(drop[1]);
    const maps = drop[2].split(', ').map(lookup);
    return pet && maps.every(Boolean) ? '寵物蛋由' + pet + '掉落（' + maps.join('、') + '）。' : '';
  }

  function translateGrandCrossWeapon(key, el) {
    if (!/^(?:\+\d+ )?Grand Cross$/u.test(key)) return '';
    const item = el.closest('.eq-item, .tip-item, .equip-slot, .cand, .dr-inner, .item-cell');
    if (!item?.querySelector('img[src$="/1528.png"]')) return '';
    return key.replace('Grand Cross', '聖錘十字星');
  }

  function translateGearName(key, el, isDialogGear = false) {
    if (!isDialogGear && !el.matches(
      ':is(#cp-tab-equip, #ins-equip) .equip-slot .nm, #ins-detail .tip-item b, .tooltip.item-tip .tip-item b, ' +
      '#charpanel .eq-name > b, #charpanel .cand-info > b, #cp-eq-cmp > .cmp-head > b, #smith-list .cand-info > b, ' +
      '#smith-detail .eq-name > b, #drop-reveal .dr-name, #skill-tip:not(.st-short) .st-hist > li.from-talent > b, ' +
      '#festival .fe-slot:is(.q0, .q1, .q2, .q3, .q4) > b'
    )) return '';
    const exact = lookup(key);
    if (exact) return exact;
    const name = /^(\+\d+ )?(.+?)(?: of (Strength|Agility|Vitality|Intelligence|Dexterity|Luck))?$/u.exec(key);
    if (!name || (!name[1] && !name[3])) return '';
    const [, refine, item, stat] = name;
    const base = translateGrandCrossWeapon(item, el) || lookup(item);
    const affix = stat ? lookup(stat) : '';
    return base && (!stat || affix) ? (refine || '') + (stat ? affix + '的' : '') + base : '';
  }

  function translateLootToast(key, el) {
    if (!el.matches(HUD_TOAST + '.q')) return '';
    const exact = lookup(key);
    if (exact) return exact;
    const obtained = /^¡(.+)!$/u.exec(key);
    if (obtained) {
      const item = lookup(obtained[1]);
      return item ? item + '！' : '';
    }
    const upgrade = /^(.+) (\+\d+)$/u.exec(key);
    const item = upgrade && lookup(upgrade[1]);
    return item ? item + ' ' + upgrade[2] : '';
  }

  function translateGearBonus(original) {
    const translated = original.split(/( · )/u).map((part) => {
      const key = normalize(part).replace(/^:\s*/u, '');
      const star = key.startsWith('★ ') ? '★ ' : '';
      const text = key.slice(star.length);
      const skill = /^(\+\d+(?:[.,]\d+)?%) (.+) damage[.]?$/iu.exec(text) ||
        /^(\+\d+(?:[.,]\d+)?%) de daño de (.+?)[.]?$/iu.exec(text);
      const name = skill && (lookup(skill[2]) || (/^[\p{Script=Han} ]+$/u.test(skill[2]) && skill[2]));
      const value = lookup(text) || (name && skill[1] + ' ' + name + '傷害');
      return value ? part.replace(/\S[\s\S]*\S|\S/u, () =>
        (/^\s*:/u.test(part) ? '：' : '') + star + value) : part;
    }).join('');
    return translated !== original ? translated : '';
  }

  function translateSkillTooltip(original, el) {
    if (el.matches('.st-note')) {
      const labels = {
        upgrades: '強化', talents: '天賦', overall: '總倍率', '整體': '總倍率',
        'Melee ATK': lookup('Melee ATK'), 'Ranged ATK': lookup('Ranged ATK'),
        '近戰 ATK': lookup('Melee ATK'), '遠程 ATK': lookup('Ranged ATK')
      };
      return original.replace(/^(\s*)(?:Damage|傷害)[:：]\s*(\S.*?)(\s*)$/u, (_, leading, details, trailing) =>
        leading + '傷害：' + details.replace(/(^| · )(upgrades|talents|overall|整體|Melee ATK|Ranged ATK|近戰 ATK|遠程 ATK)(?= [＋+−×-]\d)/gu,
          (match, separator, label) => labels[label] ? separator + labels[label] : match) + trailing);
    }
    if (el.matches('.st-rows > span, .st-tags > span')) {
      const labels = { Pierce: '貫穿機率', '貫穿': '貫穿機率', Cast: '詠唱' };
      const label = labels[normalize(original)];
      if (label) return original.replace(/\S[\s\S]*\S|\S/u, () => label);
    }
    if (el.matches('.st-rows > b')) {
      return original.replace(/^(\s*\d+(?:[.,]\d+)?%) \(cap\)(\s*)$/u, '$1（上限）$2');
    }
    if (el.matches('.st-hist > li')) {
      const deity = original.replace(/^(\s*)Deity (\+\d+):/u, '$1神格 $2：');
      if (deity !== original) {
        return deity.replace(/^(\s*神格 \+\d+：)\s*(\S.*?)(\s*)$/u, (_, title, effect, trailing) =>
          title + (translate(normalize(effect), true).text || effect) + trailing);
      }
      return translateGearBonus(original);
    }
    return original.replace(/^(\s*(?:[^:：\n]*[:：]\s*)?)(Your melee basic attacks strike in a cone:\s+every enemy in front of you within reach takes the full hit\.)(\s*)$/u,
      (_, prefix, effect, trailing) => prefix + (lookup(normalize(effect)) || effect) + trailing);
  }

  function translateCosmeticDetail(original) {
    const key = normalize(original);
    const achievement = /^Chronicler achievement: defeat (.+) (\d[\d,]*) times \((\d[\d,]*) so far\)\.$/u.exec(key);
    const spanish = /^Logro del Cronista: mata (\d[\d.]*) veces a (.+) \(llevas (\d[\d.]*)\)\.$/u.exec(key);
    if (achievement || spanish) {
      const [, monster, required, defeated] = achievement || [null, spanish[2], spanish[1], spanish[3]];
      return '事蹟記錄者的成就：擊敗 ' + (lookup(monster) || monster) + ' ' + required + ' 次（目前 ' + defeated + ' 次）。';
    }
    const officialAchievement = /^(事蹟記錄者的成就：擊敗\s+)(.+?)(\s+\d[\d,]* 次（目前 \d[\d,]* 次）。)$/u.exec(key);
    if (officialAchievement) {
      const [, before, monster, after] = officialAchievement;
      const name = lookup(monster);
      return name ? before + name + after : '';
    }
    const covered = /^(?:Also covers:|Tapa también:) ([^.]+)\.(?: (.+))?$/u.exec(key);
    if (covered) {
      const slots = covered[1].split(', ').map(slot => lookup(slot) || slot);
      const detail = covered[2];
      return '同時遮住：' + slots.join('、') + '。' +
        (detail ? translateCosmeticDetail(detail) || translate(detail, true).text || detail : '');
    }
    return '';
  }

  function translateEquipmentDetails(key) {
    if (key.startsWith('Cards: ')) {
      const detail = key.slice('Cards: '.length);
      const sockets = /^\d+ free card sockets?$/u.test(detail) && lookup(detail);
      if (sockets) return '卡片：' + sockets;
      const cards = detail.split(', ').map(name => name.endsWith(' Card') && lookup(name));
      return cards.every(Boolean) ? '卡片：' + cards.join('、') : '';
    }
    if (key.startsWith('Slots into: ')) {
      const slot = lookup(key.slice('Slots into: '.length));
      return lookup(key) || (slot && '適用欄位：' + slot);
    }
    if (key.includes(', ')) {
      const jobs = key.split(', ').map(lookup);
      if (jobs.every(Boolean)) return lookup(key) || jobs.join('、');
    }
    return '';
  }

  function translateSaleConfirmation(node, el, original) {
    if (el.id === 'npc-text') {
      const offer = /^(\s*)Will you sell me (\d[\d,]*) items? for(\s*)$/u.exec(original);
      if (offer && /^\d[\d,]* (?:Kafra Points|卡普拉點數)$/u.test(node.nextSibling?.textContent || '')) {
        return offer[1] + '要販售 ' + offer[2] + ' 件物品，換取' + offer[3];
      }
      if (original === '?' && /^\d[\d,]* (?:Kafra Points|卡普拉點數)$/u.test(node.previousSibling?.textContent || '')) {
        return '？';
      }
    }
    if (el.matches('#npc-text > b') && /^\d[\d,]* Kafra Points$/u.test(original)) return lookup(original);
    return '';
  }

  function translateResumeDialog(el, original) {
    if (!el.matches('#npc-text, #npc-text > b')) return '';
    const title = el.closest('#npc-dialog')?.querySelector('#npc-name')?.textContent;
    if (title === 'Unfinished run' || title === '未完成的遠征') {
      if (el.tagName === 'B') return lookup(original);
      if (original === 'You left a run in ') return '你在 ';
      if (original === ' at minute ') return ' 留下了一場未完成的遠征，當時進度為 ';
      const level = /^ \(Lv (\d+)\)\. Do you want to continue from there\?$/u.exec(original);
      if (level) return '（等級 ' + level[1] + '）。要從那裡繼續嗎？';
    } else if (el.id === 'npc-text' && (title === 'Run discarded' || title === '已捨棄遠征')) {
      if (original === 'You collect what you had: ') return '已領取本次遠征獲得的基本經驗值 ';
      if (original === ' base EXP, ') return '、職業經驗值 ';
      if (original === ' job EXP and the loot you had found.') return '，以及已取得的戰利品。';
    }
    return '';
  }

  const DIALOG_PARTS = new Map([
    ['In Safari, tap', '在 Safari 點選'],
    ['and then', '，再點選'],
    ['. The game will open full screen, like an app.', '。遊戲會像 App 一樣以全螢幕開啟。'],
    ['The name', '名稱'],
    ['is already taken by another player. Pick another one to keep playing this character.', '已被其他玩家使用。請另選名稱以繼續遊玩此角色。'],
    ['Delete', '要刪除'],
    ['? Their records and starter gear will be lost.', '嗎？此角色的紀錄與初始裝備將會消失。'],
    ['Delete all your account progress? You will lose', '要清除帳號的所有進度嗎？你將失去'],
    ['Delete all guest progress in this browser? You will lose', '要清除此瀏覽器的所有訪客進度嗎？你將失去'],
    [', the inventory, cards, minerals, Kafra Points and unlocked jobs, on the server and on all your devices too. Your username stays and you can start over with it.', '、背包物品、卡片、礦石、卡普拉點數與已解鎖的職業。伺服器和所有裝置上的進度都會一併清除。帳號會保留，你可以用同一帳號重新開始。'],
    [', the inventory, cards, minerals, Kafra Points and unlocked jobs.', '、背包物品、卡片、礦石、卡普拉點數與已解鎖的職業。'],
    ['wants to be your friend.', '想加你為好友。'],
    ['invites you to their party.', '邀請你加入隊伍。'],
    ['wants to trade with you.', '想與你交易。'],
    ['wants to set out with the party:', '想與隊伍出發前往：'],
    ['Remove', '要將'],
    ['from your friends?', '從好友名單移除嗎？'],
    ['Why are you reporting', '你為什麼要檢舉'],
    ['? We will keep their latest messages to review it.', '？遊戲團隊會保留對方最近的訊息以供審查。'],
    ['Discard', '要捨棄'],
    ['? Slotted cards go back to your album.', '嗎？已鑲嵌的卡片會退回卡冊。'],
    ['Move them to', '是否將卡片移到'],
    ['? The rest stay on the piece you take off.', '嗎？剩餘卡片會留在卸下的裝備上。'],
    ['Specialize in', '要選擇專精'],
    ['You are a', '你目前的專精是'],
    ['中文 channel', '中文頻道'],
    ["Your message went to the 中文 channel, but you don't have it turned on: you won't see the replies. Turn it on to talk there.", '你的訊息已送到中文頻道。開啟頻道後，就能查看回覆並和其他玩家聊天。'],
    ['Chinese messages go to the 中文 channel. Turn it on to see what other players write and to talk with them.', '中文訊息會送到中文頻道。開啟後即可查看其他玩家的訊息並聊天。']
  ]);

  function translatePartyRequirements(key) {
    const prefix = "You can't go to that stage with the party:";
    const details = key.startsWith(prefix) ? key.slice(prefix.length).trimStart() : key.replace(/^:\s*/u, '');
    const reasons = details.split(', ').map(reason => {
      const monster = /^defeat (.+)$/u.exec(reason)?.[1];
      return monster ? '擊敗' + (lookup(monster) || monster) : lookup(reason);
    });
    if (!reasons.every(Boolean)) return '';
    return (key.startsWith(prefix) ? '你無法與隊伍前往該關卡：' : '：') + reasons.join('、');
  }

  function translateWeaponDealerDialog(node, el, original) {
    const key = normalize(original);
    const price = /^(\d[\d,.]*) (?:Kafra Points|Puntos Kafra)$/u.exec(key);
    if (el.closest('#npc-text .ore-row:has(button[data-weapon])')) {
      const owned = /^tienes (\d[\d,.]*)$/u.exec(key);
      return price ? price[1] + ' 卡普拉點數' : owned ? '持有 ' + owned[1] : lookup(key);
    }
    if (el.matches('#npc-text > p > b')) {
      const previous = node.parentNode.previousSibling;
      const before = normalize(originals.get(previous)?.text?.original ?? previous?.textContent ?? '');
      if (/^(?:You bought|Has comprado|買了)$/u.test(before)) return lookup(key);
      if (price && /^(?:another one just like it for|por|for|你用)$/u.test(before)) {
        return price[1] + ' 卡普拉點數';
      }
      return '';
    }
    if (!el.matches('#npc-text > p')) return '';
    if (el.matches('p.muted')) return price ? price[1] + ' 卡普拉點數' : '';
    if (!el.querySelector(':scope > b')) return '';
    const parts = new Map([
      ["Sold the weapon you started with? I'll make", '賣掉了一開始的武器嗎？我可以幫 '],
      ['¿Has vendido el arma con la que empezaste? Te hago otra igual para', '賣掉了一開始的武器嗎？我可以幫 '],
      ['another one just like it for', ' 用 '],
      ['por', ' 用 '],
      ['.', ' 再打一把一模一樣的。'],
      ["I don't have any weapon", '我這裡沒有 '],
      ['No tengo ningún arma que pueda llevar', '我這裡沒有 '],
      ['can use.', ' 能用的武器。'],
      ['You bought', '你買了 '],
      ['Has comprado', '你買了 '],
      ['for', '，花了 ']
    ]);
    if (key === '.' && el.querySelectorAll(':scope > b').length === 1) return ' 能用的武器。';
    if (key === 'por' && /^(?:Has comprado|你買了)/u.test(el.textContent.trim())) return '，花了 ';
    const owner = /^\. It's in (.+)'s inventory\.$/u.exec(original.trim()) ||
      /^\. Lo tienes en el inventario de (.+)\.$/u.exec(original.trim());
    return owner ? '，已放進 ' + owner[1] + ' 的物品欄。' : parts.get(key) || '';
  }

  function translateKnownDialog(el, original, node) {
    const body = el.closest('#npc-text');
    if (!body && el.id !== 'npc-name') return '';
    const key = normalize(original);
    const title = body?.closest('#npc-dialog')?.querySelector('#npc-name')?.textContent;
    if (/^(?:Weapon Dealer|Armero|武器商人)$/u.test(title)) {
      return translateWeaponDealerDialog(node, el, original);
    }
    if (el.matches('#npc-text > p, #npc-text > p > b') &&
      /^(?:Server full|Servidor lleno|伺服器已滿|Connecting to the server…|Conectando con el servidor…|正在連線到伺服器…)$/u.test(title)) {
      return lookup(key);
    }
    if (el.matches('#npc-dialog.over-splash #npc-text > p') &&
      /^(?:You now need an account|Ahora hace falta una cuenta|現在需要遊戲帳號)$/u.test(title)) {
      return lookup(key);
    }
    if (el === body && /^(?:Mail Carrier|郵差)$/u.test(title)) {
      const letter = /^Throw away the letter [“"](.+)[”"]\?$/u.exec(key)?.[1];
      if (letter) return '要捨棄郵件「' + (lookup(letter) || letter) + '」嗎？';
    }
    if (body && /^(?:Notice from the RO Survivors team|RO Survivors 團隊公告|Diagnóstico)$/u.test(title)) return '';
    const emphasis = el.closest('#npc-text b, #npc-text strong');
    if (emphasis) {
      if (el.matches('#npc-text .lb-pick .lb[data-lb] > b')) return lookup(key);
      // Player names occupy their own bold nodes in invitations and account dialogs.
      if (/^(?:Change gear|更換裝備|Discard item|捨棄物品|Refine|精鍊)$/u.test(title)) {
        return lookup(key) || translateGearName(key, el, true);
      }
      if (/wants to set out with the party:|想與隊伍出發前往：/u.test(emphasis.previousSibling?.textContent || '')) {
        const story = key.match(/^(.+) \(story\)$/u)?.[1];
        return story ? (lookup(story) || story) + '（劇情）' : lookup(key);
      }
      if (/^(?:Install RO Survivors|安裝 RO Survivors|Delete progress|清除進度|Specialization|專精|Master of trades|職業導師)$/u.test(title)) {
        return lookup(key);
      }
      return '';
    }
    const party = /^(?:Party|隊伍)$/u.test(title) && (key.startsWith("You can't go to that stage with the party:") ||
      el.matches('#npc-text .party-short li') && key.startsWith(':')) && translatePartyRequirements(key);
    const tripDetails = /^(?:Party|隊伍)$/u.test(title) && key.startsWith('· ') && translate(key, true).text;
    const gearQuestion = /^(?:Change gear|更換裝備)$/u.test(title) && key === '?' && '嗎？';
    const reportReason = el.matches('#npc-text .report-why') && key === 'Traps' && '作弊';
    const translated = party || tripDetails || gearQuestion || reportReason || DIALOG_PARTS.get(key) || lookup(sourceKey(key)) ||
      key.replace(/^(\d+(?:\.\d+)?)% success\. If it fails,$/u, '成功率 $1%。失敗時，')
        .replace(/^(?:\(([^)]+)\) )?breaks and is lost with its cards\. Are you sure\?$/u,
          (_, quality) => (quality ? '（' + (lookup(quality) || quality) + '）' : '') + '會損毀，卡片也會一併消失。確定要精鍊嗎？')
        .replace(/^has ([\d,]+) cards? socketed\. Move (them|[\d,]+) to$/u,
          (_, count, moving) => '已鑲嵌 ' + count + ' 張卡片。是否將' + (moving === 'them' ? '卡片' : '其中 ' + moving + ' 張') + '移到')
        .replace(/^You have no specialization yet: the first point you spend in one of the (.+) trees chooses it\.$/u,
          (_, job) => '尚未選擇專精。在' + (lookup(job) || job) + '的天賦樹投入第一點時，就會選定該分支。')
        .replace(/^\? You will only be able to spend points in that (.+) branch: it adds its 2 skills\. To change it, talk to the (.+) in Prontera \(([\d,]+) Kafra Points\)\.$/u,
          (_, job, npc, price) => '嗎？你只能在' + (lookup(job) || job) + '的這個分支投入點數，並取得該分支的 2 個技能。若要更換，請找普隆德拉的' + (lookup(npc) || npc) + '（' + price + ' 卡普拉點數）。')
        .replace(/^(.+) now\. For ([\d,]+) Kafra Points I give you back the points in your (.+) trees and you choose another branch with the first point you spend\. You have ([\d,]+)\.$/u,
          (_, job, price, tree, balance) => '（' + (lookup(job) || job) + '）。花費 ' + price + ' 卡普拉點數即可退還' + (lookup(tree) || tree) + '天賦點數，下一次加點時可選擇其他分支。你目前持有 ' + balance + ' 點。')
        .replace(/^(?:Maintenance at|Mantenimiento a las) (.+?) \((?:in|en) (\d+:\d{2})\): (?:the server will be updated|el servidor se actualizará)\.(.*)$/u,
          notice => translateMaintenanceNotice(notice) || notice);
    if (translated === key) return '';
    return original.replace(/\S[\s\S]*\S|\S/u, () => translated);
  }

  function translateMaintenanceNotice(text) {
    const key = normalize(text);
    const warning = /^(?:Maintenance at|Mantenimiento a las) (.+?) \((?:in|en) (\d+:\d{2})\): (?:the server will be updated|el servidor se actualizará)\.(?: (.+))?$/u.exec(key);
    if (warning) {
      const [, time, left, detail] = warning;
      return '預定於 ' + time + ' 維護（剩餘 ' + left + '），屆時將更新伺服器。' +
        (detail ? ' ' + (lookup(detail) || detail) : '');
    }
    const countdown = /^(?:In|Dentro de) (\d+:\d{2}) · (.+)$/u.exec(key);
    if (countdown) return '剩餘 ' + countdown[1] + ' · ' + (lookup(countdown[2]) || countdown[2]);
    return lookup(key);
  }

  function parseOfficialNewsSource(source) {
  const LIMITS = Object.freeze({ source: 16 * 1024 * 1024, template: 1024 * 1024, homepage: 2 * 1024 * 1024 });
  const normalize = value => value.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\s+/g, ' ').trim();
  
  function readStaticTemplate(source, start) {
    if (source[start] !== '`') throw new Error('Expected a template literal');
    let text = '';
    for (let i = start + 1; i < source.length; i++) {
      if (i - start > LIMITS.template) throw new Error('Changelog template exceeds size limit');
      const char = source[i];
      if (char === '`') return { text, end: i + 1 };
      if (char === '$' && source[i + 1] === '{') throw new Error('Dynamic changelog interpolation is not supported');
      if (char !== '\\') { text += char; continue; }
      const escape = source[++i];
      if (escape === undefined) throw new Error('Unterminated template escape');
      const simple = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '`': '`', '\\': '\\', '$': '$' };
      if (Object.hasOwn(simple, escape)) { text += simple[escape]; continue; }
      if (escape === '\n') continue;
      if (escape === '\r') { if (source[i + 1] === '\n') i++; continue; }
      if (escape === 'x' || escape === 'u') {
        let hex;
        if (escape === 'u' && source[i + 1] === '{') {
          const end = source.indexOf('}', i + 2);
          if (end < 0) throw new Error('Unterminated Unicode escape');
          hex = source.slice(i + 2, end);
          if (!/^[\da-f]{1,6}$/i.test(hex) || parseInt(hex, 16) > 0x10ffff) throw new Error('Invalid Unicode escape');
          i = end;
        } else {
          const length = escape === 'x' ? 2 : 4;
          hex = source.slice(i + 1, i + 1 + length);
          if (!new RegExp('^[\\da-f]{' + length + '}$', 'i').test(hex)) throw new Error('Invalid hexadecimal escape');
          i += length;
        }
        text += String.fromCodePoint(parseInt(hex, 16));
        continue;
      }
      // Reject unfamiliar syntax instead of quietly changing its meaning.
      throw new Error('Unsupported changelog escape: \\' + escape);
    }
    throw new Error('Unterminated changelog template');
  }
  
  function extractChangelogs(source) {
    if (typeof source !== 'string' || source.length > LIMITS.source) throw new Error('Invalid or oversized game bundle');
    const found = { en: [], 'zh-TW': [] };
    const candidates = /`# (?:Changelog|更新紀錄)\r?\n/g;
    let match;
    let count = 0;
    while ((match = candidates.exec(source))) {
      if (++count > 16) throw new Error('Too many candidate changelog templates');
      const template = readStaticTemplate(source, match.index);
      candidates.lastIndex = template.end;
      const intro = template.text.split(/^## /m)[0];
      if (/English version of CHANGELOG\.md/.test(intro)) found.en.push(template.text);
      if (/CHANGELOG\.md 的繁體中文版/.test(intro) && /zh-TW/.test(intro)) found['zh-TW'].push(template.text);
    }
    if (found.en.length !== 1 || found['zh-TW'].length !== 1) throw new Error('Expected exactly one English and one Traditional Chinese changelog; source format may have changed');
    return { en: found.en[0], 'zh-TW': found['zh-TW'][0] };
  }
  
  function parseReleases(markdown) {
    const releases = [];
    const versions = new Set();
    let release = null;
    let section = null;
    let item = null;
    for (const line of markdown.split(/\r?\n/)) {
      if (line.startsWith('## ')) {
        const title = line.slice(3).trim();
        const match = title.match(/^(?:Beta\s+)?(\d+\.\d+(?:\.\d+)*)\s+[—–-]\s+.+$/);
        release = null; section = null; item = null;
        // Only dated releases. Drafts/next-push content is never proposed for publication.
        if (!match || /sin publicar|unreleased|para el siguiente push|for the next push|未發布|下次推送/i.test(title)) continue;
        if (versions.has(match[1])) throw new Error('Duplicate release version: ' + match[1]);
        versions.add(match[1]);
        release = { version: match[1], title, sections: [] };
        releases.push(release);
        continue;
      }
      if (!release) continue;
      if (line.startsWith('### ')) {
        section = { heading: line.slice(4).trim(), blocks: [] };
        release.sections.push(section); item = null;
        continue;
      }
      if (!line.trim()) { item = null; continue; }
      if (!section) { section = { heading: '', blocks: [] }; release.sections.push(section); }
      if (line.startsWith('- ')) {
        const content = line.slice(2).trim();
        const tag = content.match(/^\[([^\]]+)\]\s*/);
        item = { kind: 'item', tag: tag ? tag[1].trim() : '', text: tag ? content.slice(tag[0].length) : content };
        section.blocks.push(item);
      } else if (item && /^\s+\S/.test(line)) {
        item.text += ' ' + line.trim();
      } else {
        item = null;
        section.blocks.push({ kind: 'paragraph', tag: '', text: line.trim() });
      }
    }
    if (!releases.length) throw new Error('No dated public releases found');
    return releases;
  }
  
  const TAGS = new Map([['New', 'new'], ['新增', 'new'], ['Change', 'change'], ['調整', 'change'], ['Improvement', 'improvement'], ['改善', 'improvement'], ['Fix', 'fix'], ['修正', 'fix'], ['', '']]);
  
  function alignChangelogs(changelogs) {
    const english = parseReleases(changelogs.en);
    const chinese = new Map(parseReleases(changelogs['zh-TW']).map(release => [release.version, release]));
    const pairs = [];
    const diagnostics = [];
    const releases = [];
    function addPair(original, translation, context) {
      const pair = { ...context, type: context.kind, original: normalize(original), translation: normalize(translation) };
      if (!pair.original) return;
      const han = (pair.translation.match(/[\u3400-\u9fff]/g) || []).length;
      const latin = (pair.translation.match(/[A-Za-z]/g) || []).length;
      if (!han || pair.original === pair.translation || (latin > 30 && latin > han * 3)) {
        diagnostics.push({ ...context, reason: 'official-english-fallback', original: pair.original });
        return;
      }
      pairs.push(pair);
    }
    for (const en of english) {
      const zh = chinese.get(en.version);
      const context = { version: en.version };
      if (!zh) { diagnostics.push({ ...context, reason: 'missing-official-release' }); continue; }
      let mismatch = en.sections.length !== zh.sections.length;
      for (let i = 0; !mismatch && i < en.sections.length; i++) {
        const a = en.sections[i].blocks, b = zh.sections[i].blocks;
        mismatch = a.length !== b.length || a.some((x, j) => x.kind !== b[j].kind || !TAGS.has(x.tag) || !TAGS.has(b[j].tag) || TAGS.get(x.tag) !== TAGS.get(b[j].tag));
      }
      if (mismatch) { diagnostics.push({ ...context, reason: 'release-structure-mismatch' }); continue; }
      releases.push({ version: en.version, title: en.title, translatedTitle: zh.title, sections: en.sections.length, items: en.sections.reduce((sum, section) => sum + section.blocks.length, 0) });
      addPair(en.title, zh.title, { ...context, kind: 'title' });
      en.sections.forEach((section, sectionIndex) => {
        const target = zh.sections[sectionIndex];
        addPair(section.heading, target.heading, { ...context, sectionIndex, kind: 'heading' });
        section.blocks.forEach((block, itemIndex) => addPair(block.text, target.blocks[itemIndex].text, { ...context, sectionIndex, itemIndex, kind: block.kind, tag: block.tag }));
      });
    }
    return { latestVersion: english[0].version, releases, pairs, rejected: diagnostics };
  }
  return alignChangelogs(extractChangelogs(source));
  }

  // Public official news is a fallback only; reviewed translation entries take priority.
  // No game code is evaluated and no player text is sent to a translation service.
  const officialNews = { url: '', pairs: new Map(), loaded: false, loading: null, retryAfter: 0 };
  const OFFICIAL_NEWS_CACHE = 'ro-survivors-zh-tw:official-news:v1';
  function officialNewsKey(version, type, original) {
    return version + '\n' + type + '\n' + normalize(original);
  }
  function indexOfficialNews(pairs) {
    if (!Array.isArray(pairs) || pairs.length > 2000) throw new Error('Invalid official news cache');
    const result = new Map(), conflicts = new Set();
    for (const pair of pairs) {
      if (!pair || !/^\d+\.\d+(?:\.\d+)*$/u.test(pair.version) ||
          !['title', 'heading', 'item', 'paragraph'].includes(pair.type) ||
          typeof pair.original !== 'string' || pair.original.length > 16000 ||
          typeof pair.translation !== 'string' || pair.translation.length > 16000 ||
          !/[\u3400-\u9fff]/u.test(pair.translation)) throw new Error('Invalid official news entry');
      const key = officialNewsKey(pair.version, pair.type, pair.original);
      if (result.has(key) && result.get(key) !== pair.translation) conflicts.add(key);
      result.set(key, pair.translation);
    }
    for (const key of conflicts) result.delete(key);
    return result;
  }
  function loadOfficialNews() {
    if (officialNews.loading || officialNews.loaded || Date.now() < officialNews.retryAfter) return;
    const scripts = [...document.scripts].filter(script => {
      if (script.type !== 'module' || !script.src) return false;
      try {
        const url = new URL(script.src);
        return url.origin === location.origin && /^\/build\/main-[\w-]+\.js$/u.test(url.pathname);
      } catch { return false; }
    });
    if (scripts.length !== 1) return;
    const url = scripts[0].src;
    officialNews.url = url;
    officialNews.loading = (async () => {
      try {
        // Cache only paired public strings, keyed to the exact version already on this page.
        try {
          const saved = localStorage.getItem(OFFICIAL_NEWS_CACHE);
          if (saved && saved.length < 2 * 1024 * 1024) {
            const cache = JSON.parse(saved);
            if (cache.schema === 1 && cache.url === url) {
              officialNews.pairs = indexOfficialNews(cache.pairs);
              officialNews.loaded = true;
              return;
            }
          }
        } catch { /* Storage unavailable or stale: public source remains usable. */ }
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        let source;
        try {
          const response = await fetch(url, { cache: 'force-cache', credentials: 'omit', redirect: 'error', signal: controller.signal });
          if (!response.ok || Number(response.headers.get('content-length')) > 8 * 1024 * 1024) throw new Error('Public news source unavailable');
          const reader = response.body?.getReader();
          if (reader) {
            const decoder = new TextDecoder();
            let bytes = 0;
            const parts = [];
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                bytes += value.byteLength;
                if (bytes > 8 * 1024 * 1024) { controller.abort(); throw new Error('Public news source too large'); }
                parts.push(decoder.decode(value, { stream: true }));
              }
              parts.push(decoder.decode());
              source = parts.join('');
            } finally { reader.releaseLock(); }
          } else {
            source = await response.text();
            if (source.length > 8 * 1024 * 1024) throw new Error('Public news source too large');
          }
        } finally { clearTimeout(timer); }
        const parsed = parseOfficialNewsSource(source);
        const pairs = parsed.pairs.map(({version, type, original, translation}) => ({version, type, original, translation}));
        officialNews.pairs = indexOfficialNews(pairs);
        officialNews.loaded = true;
        try {
          const cache = JSON.stringify({ schema: 1, url, pairs });
          if (cache.length < 2 * 1024 * 1024) localStorage.setItem(OFFICIAL_NEWS_CACHE, cache);
        } catch { /* Optional public-data cache must never stop the game. */ }
      } catch (error) {
        officialNews.retryAfter = Date.now() + 60000;
        console.info('[RO 繁中] 官方公告同步暫不可用，繼續使用現有詞庫。', error?.message);
      } finally {
        // Wait for loading to be assigned even when the cache was read synchronously.
        queueMicrotask(() => {
          officialNews.loading = null;
          if (enabled || collecting) {
            const body = document.getElementById('news-body');
            if (body) enqueue(body);
          }
        });
      }
    })();
  }
  function officialNewsTranslation(original, el) {
    if ((!enabled && !collecting) || !/[A-Za-z]{2}/u.test(original)) return '';
    const body = el.closest('#news-body');
    if (!body || body.closest('.hidden,[hidden],[aria-hidden="true"]')) return '';
    const version = /^\s*(?:Beta\s+)?(\d+\.\d+(?:\.\d+)*)\s*[—–-]/u.exec(body.querySelector('h2')?.textContent || '')?.[1];
    if (!version) return '';
    const type = { H2: 'title', H3: 'heading', LI: 'item', P: 'paragraph' }[el.tagName];
    if (!type) return '';
    loadOfficialNews();
    return officialNews.pairs.get(officialNewsKey(version, type, original)) || '';
  }
  function processNewsBlock(node, el) {
    if (node.nodeType !== Node.TEXT_NODE || el.closest('.news-tag')) return false;
    const block = el.closest('#news-body > h2, #news-body > h3, #news-body > p, #news-body > ul > li');
    if (!block) return false;
    // Native news may split a sentence with <b> or <code>. Keep the original nodes,
    // badge, attributes and handlers; only their restorable text fields change.
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
      acceptNode: child => child.parentElement?.closest('.news-tag,script,style')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const fields = [];
    let child;
    while ((child = walker.nextNode())) {
      const raw = child.nodeValue;
      const last = originals.get(child)?.text;
      fields.push({ node: child, raw, original: last && raw === last.applied ? last.original : raw });
    }
    const original = fields.map(field => field.original).join('');
    const key = normalize(original);
    let translated = lookup(key);
    if (!translated && block.tagName === 'H2') {
      const heading = /^(\S+ [\d.]+ — )(.+)$/u.exec(key);
      const date = heading && lookup(heading[2]);
      if (date) translated = heading[1] + date;
    }
    if (!translated) translated = officialNewsTranslation(original, block);
    // Do not collect every individual markup fragment or public strings while their
    // official translation is still loading. Unknown complete passages stay local.
    if (!translated && collecting && !officialNews.loading && state.ready && !state.paused &&
        sourceKey(key) && !block.closest('.hidden,[hidden],[aria-hidden="true"]') &&
        (typeof block.checkVisibility !== 'function' || block.checkVisibility({ visibilityProperty: true }))) {
      const candidate = numberTemplate(key).key;
      if (sourceKey(candidate) && seen.get(block)?.news !== candidate) {
        seen.set(block, { ...(seen.get(block) || {}), news: candidate });
        record(candidate);
      }
    }
    let contentIndex = fields.findIndex(field => field.node.parentNode === block);
    if (contentIndex < 0) contentIndex = fields.findIndex(field => /\S/u.test(field.original));
    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      const output = enabled && translated && contentIndex >= 0
        ? (index === contentIndex ? original.replace(/\S[\s\S]*\S|\S/u, () => translated) : '')
        : field.original;
      const saved = originals.get(field.node) || {};
      if (output !== field.original) saved.text = { original: field.original, applied: output };
      else delete saved.text;
      originals.set(field.node, saved);
      if (output !== field.raw) field.node.nodeValue = output;
    }
    return true;
  }

  function processField(node, el, attr) {
    if ((attr === 'placeholder') !== (el.id === 'chat-input' || el.id === 'wk-search')) return;
    const raw = attr ? el.getAttribute(attr) : node.nodeValue;
    const field = attr || 'text';
    const last = originals.get(node)?.[field];
    const original = last && raw === last.applied ? last.original : raw;
    if (!attr && el.id === 'lobby-online') updateLobbyQueueLayout(el, original);
    if (!original || (/^\s*«[\s\S]*»\s*$/u.test(original) && el.closest('#wk-detail'))) return;
    if (enabled && !attr && el.id === 'story-text' && raw !== last?.applied &&
      (stableStory?.node !== node || stableStory?.raw !== raw)) {
      clearTimeout(storyTimer);
      storyTimer = setTimeout(() => {
        stableStory = { node, raw };
        enqueue(node);
      }, 280);
      return;
    }
    let output = original;
    let key = '';
    const securityPlaceholder = !attr && el.matches('#sp-register .rq-field > select.ro-select > option:first-child[value=""][disabled]');
    const runItemSwap = enabled && !attr && translateRunItemSwap(original, el);
    // Only the festival collection counter bypasses the date-like text filter.
    const festivalLabel = enabled && !attr && (
      (el.matches('#festival .gc-col-head > span') && lookup(normalize(original))) ||
      (el.matches('#festival .gc-ball-btns [data-open][data-n="1"]') && normalize(original) === 'Open' && lookup('Abrir'))
    );
    const wikiPassage = enabled && translateWikiPassage(original, el, attr);
    const skillDetails = enabled && !attr && el.closest('#skill-tip') && translateSkillTooltip(original, el);
    const cosmeticDetail = enabled && !attr && el.matches('#cp-cos-detail > .muted') && translateCosmeticDetail(original);
    const gearBonus = enabled && !attr &&
      el.matches('.bon-list > li, #wiki .wk-gear .wk-star') && translateGearBonus(original);
    const wikiEquipment = enabled && !attr && el.closest('#wk-detail') && translateWikiEquipment(original, el);
    const lobbyStatus = enabled && !attr && el.id === 'lobby-online' &&
      original.replace(/^(\s*)(Asgard|Midgard|Alfheim|Vanaheim|Jotunheim|Nidavellir|Svartalfheim|Niflheim|Muspelheim)(?=\s*·|\s*$)/u,
        (_, space, name) => space + (lookup(name) || name))
        .replace(/(·\s*)Channel (\d+)\s*·\s*([\d,]+) players?(?=\s*(?:[▾▼]\s*)?$)/u,
          (_, separator, channel, count) => separator + '分流 ' + channel + ' · ' + count + ' 名玩家');
    const lobbyOccupancy = enabled && !attr && el.matches('#channel-list .lb[data-lb] > small, #npc-text .lb-pick .lb[data-lb] > small') &&
      ({ Normal: '正常', Full: '已滿', 'No response': '無回應' })[normalize(original)];
    const officialName = enabled && state.settings.preferAlternateSkillNames && !attr && HAN.test(original) &&
      el.matches(SKILL_NAME_FIELD) && OFFICIAL_SKILL_NAMES.get(normalize(original));
    const preferredName = officialName && lookup(officialName);
    const dialog = enabled && !attr &&
      (translateSaleConfirmation(node, el, original) || translateResumeDialog(el, original) ||
        translateKnownDialog(el, original, node));
    const wornForSale = !attr && el.matches('#shop-info, .tooltip.item-tip > .worn-note') &&
      /^(\s*)worn by (.+)\. Unequip it to be able to sell it\.(\s*)$/iu.exec(original);
    const wornByOther = !attr && el.matches('#cp-inv-detail .worn-note') &&
      /^(\s*)Worn by (.+)\. Unequip it from that character to use it here\.(\s*)$/u.exec(original);
    if (runItemSwap) {
      output = runItemSwap;
    } else if (festivalLabel) {
      output = original.replace(/\S[\s\S]*\S|\S/u, () => festivalLabel);
    } else if (cosmeticDetail) {
      output = cosmeticDetail;
    } else if (skillDetails && skillDetails !== original) {
      output = skillDetails;
    } else if (wikiPassage) {
      output = original.replace(/\S[\s\S]*\S|\S/u, () => wikiPassage);
    } else if (gearBonus) {
      output = gearBonus;
    } else if (wikiEquipment && wikiEquipment !== original) {
      output = wikiEquipment;
    } else if (lobbyStatus && lobbyStatus !== original) {
      output = lobbyStatus;
    } else if (typeof lobbyOccupancy === 'string') {
      output = original.replace(/\S[\s\S]*\S|\S/u, () => lobbyOccupancy);
    } else if (preferredName) {
      output = original.replace(/\S[\s\S]*\S|\S/u, () => preferredName);
    } else if (!attr && (el.id === 'cp-title' || el.id === 'ins-title')) {
      const separator = original.lastIndexOf(' · ');
      const job = enabled && separator >= 0 && lookup(original.slice(separator + 3));
      if (job) output = original.slice(0, separator + 3) + job;
    } else if (enabled && !attr && el.matches('.tooltip.item-tip > .worn-note') &&
      /^worn by /iu.test(original.trim()) && !wornForSale) {
      output = original.replace(/^(\s*)worn by (.+)$/iu, '$1由 $2 穿戴');
    } else if (wornForSale || wornByOther) {
      const [, before, character, after] = wornForSale || wornByOther;
      if (enabled) {
        const instruction = wornForSale ? '卸下後才能販售。' : '請先從該角色身上卸下，才能在這裡使用。';
        output = before + '目前由 ' + character + ' 穿戴。' + instruction + after;
      }
    } else if (dialog) {
      output = dialog;
    } else if (enabled && el.matches(PLAYER_MENU_FIELDS)) {
      const label = normalize(original);
      const channel = label.match(/^Go to channel (\d+)$/u)?.[1];
      const translated = PLAYER_MENU_TRANSLATIONS.get(label) || (channel && '前往頻道 ' + channel);
      if (translated) output = original.replace(/\S[\s\S]*\S|\S/u, () => translated);
    } else if (enabled && (
      (!attr && el.matches(':is(#dps, #gameover) .dps-row[data-key]:not([data-key^="p:"]) > .dps-name')) ||
      (attr === 'title' && el.matches('#gameover .dps-row[data-key]:not([data-key^="p:"])'))
    )) {
      const rank = /^\s*\d+\.\s+/u.exec(original)?.[0] || '';
      const skill = original.slice(rank.length);
      const translated = skill.split(/( · )/u).map((part, index) => {
        if (index % 2) return part;
        const key = normalize(part);
        const official = state.settings.preferAlternateSkillNames && OFFICIAL_SKILL_NAMES.get(key);
        return (official && lookup(official)) || lookup(key) || part;
      }).join('');
      output = rank + translated;
    } else if ((!attr && el.matches('#maint-banner .mb-text, #sp-maint, #sp-maint *')) ||
      (attr === 'title' && el.id === 'maint-banner') ||
      (!attr && el.matches('#npc-text > p') &&
        /^(?:Maintenance|Mantenimiento|維護)$/u.test(document.getElementById('npc-name')?.textContent))) {
      if (enabled) output = translateMaintenanceNotice(original) || original;
    } else if (enabled && !attr && el.matches('#hud #announce') &&
        /^(?:The bell is sealed! Kill |鐘被封印了！在 )/u.test(normalize(original))) {
      const notice = normalize(original);
      const english = /^The bell is sealed! Kill (.+) within (\d+(?:\.\d+)?) s$/u.exec(notice);
      const chinese = /^鐘被封印了！在 (\d+(?:\.\d+)?) 秒內擊殺 (.+)$/u.exec(notice);
      const name = english?.[1] || chinese?.[2];
      const seconds = english?.[2] || chinese?.[1];
      const target = lookup("Cat O' Nine Tails");
      if (seconds && target && (name === "Cat O' Nine Tails" || name === target)) {
        output = '鐘被封印了！在 ' + seconds + ' 秒內擊殺 ' + target;
      }
    } else if (enabled && !attr && el.matches('#chat-log > .chat-line.system')) {
      const maintenance = /^(?:Maintenance (?:at |starts in )|Mantenimiento a las |El mantenimiento empieza en )/u.test(normalize(original)) &&
        translateMaintenanceNotice(original);
      if (maintenance) output = maintenance;
      const label = normalize(original);
      const connection = /^Connected to ([A-Za-z]+), channel (\d+)\.$/u.exec(label);
      const fullLobby = /^([\p{L}]+) is full: choose another lobby\.$/u.exec(label)?.[1];
      if (connection) {
        const [, lobby, channel] = connection;
        output = '已連線至' + (lookup(lobby) || lobby) + '，分流 ' + channel + '。';
      } else if (fullLobby) {
        output = (lookup(fullLobby) || fullLobby) + '大廳已滿，請選擇其他大廳。';
      } else if (label === CHAT_QUEUE_NOTICE ||
          /^(?:(?:Connected to|You moved to) channel \d+\.|Connection lost\. Reconnecting…)$/.test(label)) {
        output = lookup(label) || original;
      }
    } else if (enabled && !attr && el.matches('#mb-list .mb-row .chr-info > small, #mb-read > .mb-meta')) {
      output = original.replace(/^From the RO Survivors team(?= · )/u,
        (sender) => lookup(sender) || sender)
        .replace(/\b(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/u,
          (_, day, month, year) => year + ' 年 ' +
            ('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ').indexOf(month) + 1) + ' 月 ' + Number(day) + ' 日');
    } else if (securityPlaceholder) {
      if (enabled && /^(?:Choose|Elige)(?:\.\.\.|…)$/u.test(normalize(original))) output = '請選擇…';
    } else if (!attr && el.matches('#picker .pk-lines > li > .pk-talent') && normalize(original).startsWith('★ ')) {
      if (enabled) {
        const sources = normalize(original).slice(2);
        const translated = sources.split(' · ').map((name) => translateGearName(name, el, true) || name).join(' · ');
        if (translated !== sources) output = '★ ' + translated;
      }
    } else if (!attr && el.closest('#hud #quest') &&
        /^Hold off the orc assault beside the king: \d{1,3}:[0-5]\d$/u.test(normalize(original))) {
      // This public quest contains a countdown, which the general privacy filter rejects.
      // Only translate the verified sentence in its HUD; never collect time-bearing text.
      if (enabled) {
        const translated = translatePublicPattern(normalize(original));
        if (translated) output = original.replace(/\S[\s\S]*\S|\S/u, () => translated);
      }
    } else if ((enabled || collecting) && original.length <= MAX_TEXT) {
      const publicField = Boolean(el.closest(PUBLIC_UI));
      const itemDetails = el.matches(ITEM_DETAILS);
      if (publicField || itemDetails || el.closest(KNOWN_ONLY)) {
        key = sourceKey(original);
        if (key) {
          const talent = el.closest(TALENT_DETAILS) && translateTalentTooltip(key);
          const petDrop = el.matches('#cp-pet-detail .eq-info > span.muted') && translatePetDrop(key);
          const translated = (itemDetails && translateEquipmentDetails(key)) || translateLootToast(key, el) || translateGrandCrossWeapon(key, el) ||
            talent || petDrop || translateGearName(key, el);
          const match = translated ? {text: translated, complete: true} : translate(key, publicField || itemDetails);
          if (enabled && match.text) output = original.replace(/\S[\s\S]*\S|\S/u, () => match.text);
          if (collecting && !match.complete && publicField && state.ready && !state.paused &&
            (key.match(/[A-Za-z]+/g) || []).some((word) => word.length > 1 && !IGNORE.test(word))) {
            const candidate = numberTemplate(key).key;
            if (seen.get(node)?.[field] !== candidate && sourceKey(candidate) &&
              !el.closest('.hidden,[hidden],[aria-hidden="true"]') &&
              (typeof el.checkVisibility !== 'function' ||
                el.checkVisibility({ visibilityProperty: true }))) {
              const fields = seen.get(node) || {};
              fields[field] = candidate;
              seen.set(node, fields);
              record(candidate);
            }
          }
        }
      }
    }
    if (enabled && !attr && el.id === 'lobby-online' && LOBBY_QUEUE_STATUS.test(normalize(original))) {
      output = output.replace(/第 ([\d,]+) 位，共 ([\d,]+) 位/u, (_, position, total) =>
        '第 ' + position.padStart(4, '\u2007') + ' 位，共 ' + total.padStart(4, '\u2007') + ' 位');
    }
    if (output !== original) {
      const fields = originals.get(node) || {};
      fields[field] = { original, applied: output };
      originals.set(node, fields);
    } else if (last) {
      delete originals.get(node)[field];
    }
    if (output === raw) return;
    if (attr) el.setAttribute(attr, output);
    else node.nodeValue = output;
  }

  function processNode(node) {
    const el = elementOf(node);
    if (!el || el.closest(BLOCKED)) return;
    if (processNewsBlock(node, el)) return;
    if (node.nodeType === Node.TEXT_NODE) {
      if (/\S/u.test(node.nodeValue)) processField(node, el, null);
    } else {
      for (const attr of ATTRS) {
        if (el.hasAttribute(attr)) processField(node, el, attr);
      }
    }
  }

  const PREPAINT_UI = PUBLIC_UI + ', ' + KNOWN_ONLY +
    ', #maint-banner, #sp-maint, #npc-dialog, #mailbox, #charpanel, #inspect, #chat-log > .chat-line.system, #player-menu';

  function enqueue(node, prepaintDeadline = 0) {
    if (!node.isConnected) return;
    const el = elementOf(node);
    if (el?.closest(BLOCKED)) return;
    // DPS rows can be rebuilt every update. Translate their labels before the next paint.
    const dpsNames = ':is(#dps, #gameover) .dps-row[data-key]:not([data-key^="p:"]) > .dps-name';
    if (enabled && el?.matches(dpsNames) && node.nodeType === Node.TEXT_NODE) {
      processNode(node);
      return;
    }
    if (enabled && node.nodeType === Node.ELEMENT_NODE && (el.matches('#dps, #gameover') || el.closest('#dps, #gameover'))) {
      const labels = el.matches(dpsNames) ? [el] : el.querySelectorAll(dpsNames);
      for (const label of labels) {
        for (const child of label.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) processNode(child);
        }
      }
    }
    // Keep transient HUD messages and queue counts current during a full scan.
    if (el?.matches(HUD_TOAST + ', #lobby-online') && el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE) {
      processNode(el.firstChild);
      return;
    }
    // Translate small UI updates before paint. Large rebuilds continue in the normal queue.
    if (enabled && performance.now() < prepaintDeadline && el?.closest(PREPAINT_UI)) {
      processNode(node);
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode: (child) => elementOf(child)?.closest(BLOCKED)
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      });
      for (let count = 0; count < 80 && performance.now() < prepaintDeadline; count++) {
        const child = walker.nextNode();
        if (!child) return;
        processNode(child);
      }
    }
    for (let parent = node; parent; parent = parent.parentNode) {
      if (queue.has(parent)) return;
    }
    queue.add(node);
    if (!frame) frame = setTimeout(drain, 16);
  }

  function drain() {
    frame = 0;
    const until = performance.now() + 4;
    let steps = 0;
    try {
      while ((scan || queue.size) && steps++ < 240 && performance.now() < until) {
        if (!scan) {
          const node = queue.values().next().value;
          queue.delete(node);
          if (!node.isConnected) continue;
          if (node.nodeType === Node.ELEMENT_NODE) {
            scan = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
              acceptNode: (child) => elementOf(child)?.closest(BLOCKED)
                ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
            });
          }
          processNode(node);
        } else {
          const node = scan.root.isConnected ? scan.nextNode() : null;
          if (node) processNode(node);
          else scan = null;
        }
      }
    } catch (error) {
      scan = null;
      console.warn('[RO Survivors zh-TW] DOM 掃描失敗', error);
    }
    if (scan || queue.size) frame = setTimeout(drain, 16);
  }

  function rescan() {
    queue.clear();
    scan = null;
    if (document.body) enqueue(document.body);
  }

  function updateLobbyQueueLayout(el, text) {
    const sign = el.closest('#lobby-place');
    if (!sign) return;
    const status = normalize(text || '');
    // A rebuilt or briefly empty status row should keep its reserved space until the next status.
    if (!enabled || status) sign.toggleAttribute('data-ro-zh-tw-queue', enabled && LOBBY_QUEUE_STATUS.test(status));
  }

  function updateLanguage() {
    const language = document.documentElement.lang;
    const supported = /^(?:en(?:-[a-z0-9]+)*|zh-TW)$/i.test(language);
    const next = state.settings.enabled && supported;
    const nextCollecting = state.settings.collectEnglish && supported;
    const startedCollecting = nextCollecting && !collecting;
    collecting = nextCollecting;
    if (next !== enabled) {
      enabled = next;
      refreshPetSpeechViews();
      const lobbyOnline = document.getElementById('lobby-online');
      if (lobbyOnline) updateLobbyQueueLayout(lobbyOnline, lobbyOnline.textContent);
      else if (!enabled) document.getElementById('lobby-place')?.removeAttribute('data-ro-zh-tw-queue');
      rescan();
    } else if (startedCollecting && state.ready) {
      rescan();
    }
    updatePanel();
    refreshCharacterPoints?.();
  }

  function observe() {
    observer = new MutationObserver((mutations) => {
      const prepaintDeadline = performance.now() + 3;
      for (const change of mutations) {
        const target = change.target;
        if (target === document.documentElement && change.attributeName === 'lang') {
          updateLanguage();
          continue;
        }
        if (!enabled && !collecting) continue;
        if (change.type === 'childList') {
          for (const node of change.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) enqueue(node, prepaintDeadline);
          }
        } else if (change.type === 'characterData') {
          if (originals.get(target)?.text?.applied !== target.nodeValue) enqueue(target, prepaintDeadline);
        } else if (change.attributeName === 'class') {
          if (!target.classList.contains('hidden') &&
            /(?:^|\s)hidden(?:\s|$)/.test(change.oldValue || '')) enqueue(target, prepaintDeadline);
        } else if (change.attributeName === 'hidden' || change.attributeName === 'aria-hidden') {
          if (!target.hidden && target.getAttribute('aria-hidden') !== 'true') enqueue(target, prepaintDeadline);
        } else if (originals.get(target)?.[change.attributeName]?.applied !==
          target.getAttribute(change.attributeName)) {
          enqueue(target, prepaintDeadline);
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true, childList: true, characterData: true, attributes: true, attributeOldValue: true,
      attributeFilter: [...ATTRS, 'lang', 'class', 'hidden', 'aria-hidden']
    });
    window.addEventListener('ro-lang', updateLanguage);
  }

  function unknownEntries() {
    const counts = new Map(state.records);
    for (const [key, count] of state.pending) {
      if (!translate(key, true).complete) counts.set(key, (counts.get(key) || 0) + count);
    }
    return [...counts]
      .map(([original, count]) => ({ original, count, translation: '' }))
      .sort((a, b) => b.count - a.count || a.original.localeCompare(b.original, 'en'));
  }

  function unknownCount() {
    let count = state.records.size;
    for (const key of state.pending.keys()) {
      if (!state.records.has(key) && !translate(key, true).complete) count++;
    }
    return count;
  }

  function download(kind, entries) {
    const data = { schemaVersion: SCHEMA, game: GAME, sourceLanguage: 'en', targetLanguage: 'zh-TW', entries };
    const file = new Blob([JSON.stringify(data, null, 2) + '\n'], {
      type: 'application/json;charset=utf-8'
    });
    downloadBlob(file, 'ro-survivors-' + kind + '.json');
  }

  function downloadBlob(file, name) {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    ui.shadow.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  function parseImport(data) {
    if (!data || Array.isArray(data) || typeof data !== 'object') throw new Error('需要 JSON 物件。');
    let entries;
    if (own(data, 'entries')) {
      if (!Array.isArray(data.entries) ||
        (own(data, 'schemaVersion') && data.schemaVersion !== SCHEMA) ||
        (own(data, 'game') && data.game !== GAME) ||
        (own(data, 'sourceLanguage') && data.sourceLanguage !== 'en') ||
        (own(data, 'targetLanguage') && data.targetLanguage !== 'zh-TW')) {
        throw new Error('JSON 版本、遊戲、語言或 entries 格式不相容。');
      }
      entries = data.entries;
    } else {
      entries = Object.entries(data).map(([original, translation]) => ({ original, translation }));
    }
    if (entries.length > LIMIT + Object.keys(BUILTIN).length) throw new Error('詞庫檔案筆數過多。');
    const pairs = new Map();
    const counts = { success: 0, invalid: 0, duplicate: 0, blank: 0 };
    for (const entry of entries) {
      const key = sourceKey(entry?.original);
      const value = entry?.translation;
      if (!key || typeof value !== 'string') counts.invalid++;
      else if (!value.trim()) counts.blank++;
      else if (!validTranslation(key, value.trim())) counts.invalid++;
      else if (pairs.has(key)) counts.duplicate++;
      else pairs.set(key, value.trim());
    }
    return { pairs, counts };
  }

  async function importFile(file, overwrite) {
    if (!file) return;
    if (file.size > MAX_FILE) throw new Error('檔案超過 8 MiB。');
    const { pairs, counts } = parseImport(JSON.parse((await file.text()).replace(/^\uFEFF/, '')));
    await flush();
    await transact('readwrite', (store) => {
      for (const [original, translation] of pairs) {
        const request = store.get(original);
        request.onsuccess = () => {
          const row = request.result || { original };
          const existing = row.translation || (own(BUILTIN, original) ? BUILTIN[original] : '');
          if (existing === translation || (existing && !overwrite)) counts.duplicate++;
          else {
            store.put({ ...row, translation });
            counts.success++;
          }
        };
      }
    });
    await readRecords();
    channel?.postMessage('records');
    show('匯入 ' + counts.success + ' 筆，重複或保留 ' + counts.duplicate +
      ' 筆，無效 ' + counts.invalid + ' 筆，空白 ' + counts.blank + ' 筆。');
  }

  async function clearUnknown() {
    if (!window.confirm('要清空待翻譯紀錄嗎？已匯入的詞庫和英文對照會保留。')) return;
    await flush();
    await transact('readwrite', (store) => {
      const request = store.openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        if (!cursor.value.translation && !translate(cursor.key, true).complete) cursor.delete();
        cursor.continue();
      };
    });
    for (const key of state.pending.keys()) {
      if (!translate(key, true).complete) state.pending.delete(key);
    }
    state.limitReached = false;
    await readRecords();
    channel?.postMessage('records');
    show('已清空待翻譯紀錄。');
  }

  function saveSettings() {
    try {
      GM_setValue(SETTINGS, state.settings);
      state.settingsError = '';
    } catch {
      state.settingsError = '工具設定無法儲存。';
    }
  }

  function show(message) {
    ui.message.textContent = message;
  }

  function updatePanel() {
    if (!ui) return;
    const settingsOpen = ui.panelOpen;
    ui.switch.checked = state.settings.enabled;
    ui.collectEnglish.checked = state.settings.collectEnglish;
    ui.preferAlternateNames.checked = state.settings.preferAlternateSkillNames;
    ui.panel.hidden = !settingsOpen;
    if (settingsOpen) {
      ui.summary.textContent = state.dictionary.size + ' 筆翻譯 · ' + (state.ready ?
        unknownCount() + ' 筆待翻譯' : '待翻譯資料未載入');
    }
    const error = state.storageError || state.settingsError;
    ui.status.textContent = error || (state.limitReached
      ? '待翻譯資料已達上限，請匯出並整理紀錄。'
      : state.settings.enabled && !enabled ? '請將遊戲語言切換成繁體中文或 English。' : '');
    if (ui.import) ui.import.disabled = !state.ready || state.paused;
    ui.clear.disabled = !state.ready || state.paused;
  }

  async function panelAction(action) {
    if (state.paused) return;
    state.paused = true;
    updatePanel();
    try {
      await action();
    } catch (error) {
      show('作業失敗：' + (error?.message || '請確認檔案或瀏覽器儲存設定。'));
    } finally {
      state.paused = false;
      updatePanel();
      if (refreshPending) void refreshFromOtherTab();
    }
  }

  async function readCharacterPointSource() {
    const unique = (values) => {
      const found = [...new Set(values)];
      if (found.length !== 1) throw new Error('無法辨識原生角色點數資料。');
      return found[0];
    };
    const capture = (text, pattern, group = 1) => unique([...text.matchAll(pattern)].map(match => match[group]));
    const main = unique([...document.scripts].filter(script => {
      if (script.type !== 'module' || !script.src) return false;
      const url = new URL(script.src);
      return url.origin === location.origin && /^\/build\/main-[\w-]+\.js$/u.test(url.pathname);
    }));
    const response = await fetch(main.src, {signal: AbortSignal.timeout(15000)});
    if (!response.ok) throw new Error('暫時無法讀取原生角色點數。');
    const source = await response.text();
    if (source.length > 8 * 1024 * 1024) throw new Error('原生角色資料格式已變更。');
    const imports = new Map();
    for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/gu)) {
      for (const binding of match[1].split(',')) {
        const [name, alias = name] = binding.trim().split(/\s+as\s+/u);
        imports.set(alias, {name, url: new URL(match[2], main.src).href});
      }
    }
    const countAt = source.indexOf('"cp-stat-points"');
    const panel = source.slice(source.lastIndexOf('function ', countAt), countAt + 30);
    const stat = imports.get(capture(panel, /=([\w$]+)\([\w$]+\.level,[\w$]+\.stats\);[\w$]+\("cp-stat-points"\)/gu));
    const skill = imports.get(capture(panel, /=([\w$]+)\([\w$]+\.job,[\w$]+\.jobLevel,[\w$]+\.talents,[\w$]+\(\)\);[\w$]+\("cp-points"\)/gu));
    const jobs = imports.get(capture(panel, /\(\)=>([\w$]+)\([\w$]+\.job\)\.includes\(/gu));
    const keyName = capture(source, /([\w$]+)="ro-survivors\.characters\.v1"/gu);
    const levelRules = Number(capture(source, /levelRules:(\d+)\}/gu));
    const escaped = keyName.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    const namespace = imports.get(capture(source, new RegExp('[\\w$]+\\(([\\w$]+)\\(' + escaped + '\\)\\)', 'gu')));
    if ([stat, skill, jobs, namespace].some(ref => !ref)) throw new Error('原生角色點數介面已變更。');
    const moduleUrl = new URL(unique([stat, skill, jobs, namespace].map(ref => ref.url)));
    if (moduleUrl.origin !== location.origin || !moduleUrl.pathname.startsWith('/build/')) throw new Error('原生角色資料來源不符。');
    const native = await import(moduleUrl.href);
    const storage = unique(Object.values(native).filter(value => value && typeof value === 'object' &&
      ['getItem', 'setItem', 'removeItem'].every(key => typeof value[key] === 'function') &&
      Function.prototype.toString.call(value.getItem).includes('localStorage.getItem(')));
    const statPoints = native[stat.name], skillPoints = native[skill.name], jobTree = native[jobs.name];
    const storageKey = native[namespace.name];
    if ([statPoints, skillPoints, jobTree, storageKey].some(fn => typeof fn !== 'function')) throw new Error('原生角色點數格式不符。');
    let previousRaw, characters = [];
    return (name) => {
      // The native account store can live in memory. Never modify or migrate its save data.
      const raw = storage.getItem(storageKey('ro-survivors.characters.v1')) || '[]';
      if (raw !== previousRaw) {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('原生角色清單格式不符。');
        characters = parsed;
        previousRaw = raw;
      }
      const matches = characters.filter(character => character?.name === name);
      if (matches.length !== 1) return null;
      const character = matches[0];
      if (!Number.isInteger(character.level) || !Number.isInteger(character.jobLevel) ||
        character.levelRules !== levelRules || !character.stats || !character.talents ||
        typeof character.job !== 'string') return null;
      // Match the game's legacy job rename, without running its save migration functions.
      const job = character.job === 'novice' ? 'swordsman' : character.job;
      const stats = statPoints(character.level, character.stats);
      const talents = jobTree(job).reduce((sum, tree) => sum +
        skillPoints(job, character.jobLevel, character.talents, tree), 0);
      if (![stats, talents].every(value => Number.isSafeInteger(value) && value >= 0)) return null;
      return {stats, talents};
    };
  }

  function mountCharacterPointBadges() {
    const lobby = document.getElementById('lobby-ui');
    const labels = document.getElementById('lobby-labels');
    const panel = document.getElementById('charpanel');
    const outer = document.getElementById('lobby-char');
    if (!lobby || !labels || !panel || !outer) return;
    const style = document.createElement('style');
    style.textContent = `.ro-zh-tw-point-badge { display: inline-flex; align-items: center; justify-content: center;
      box-sizing: border-box; min-width: 1.45em; height: 1.45em; margin-inline-start: .35em;
      padding: 0 .3em; border-radius: 999px; background: #b72d3b; color: #fff;
      font: 700 .7em/1 system-ui, sans-serif; vertical-align: middle; white-space: nowrap;
      text-shadow: none; box-shadow: 0 0 0 1px #fff9; pointer-events: none; }
      .ro-zh-tw-point-badge[hidden] { display: none; }`;
    document.head.append(style);
    const badges = new Map();
    const setBadge = (button, value, description) => {
      if (!button) return;
      let badge = badges.get(button);
      if (!value) {
        if (badge) badge.hidden = true;
        return;
      }
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'ro-zh-tw-point-badge';
        badge.translate = false;
        badges.set(button, badge);
      }
      if (badge.parentElement !== button) button.append(badge);
      if (badge.textContent !== String(value)) badge.textContent = String(value);
      if (badge.getAttribute('aria-label') !== description) {
        badge.setAttribute('aria-label', description);
        badge.title = description;
      }
      badge.hidden = false;
    };
    const render = (points) => {
      setBadge(outer, points && (points.stats || points.talents) ? '!' : '',
        points ? `尚有未分配點數：能力點 ${points.stats}、職業點 ${points.talents}` : '');
      setBadge(panel.querySelector('.tab-btn[data-tab="stats"]'), points?.stats,
        `未分配能力點 ${points?.stats || 0}`);
      setBadge(panel.querySelector('.tab-btn[data-tab="talents"]'), points?.talents,
        `未分配職業點 ${points?.talents || 0}（含各轉職階段）`);
    };
    let readPoints, loading, queued = false, retryAfter = 0, warned = false;
    const warn = (error) => {
      if (!warned) console.warn('[RO Survivors zh-TW] 未分配點數提示暫時無法讀取', error.message);
      warned = true;
      render(null);
    };
    const refresh = () => {
      queued = false;
      const active = enabled && !document.hidden && !lobby.hidden && !lobby.classList.contains('hidden');
      const name = active ? labels.querySelector('.lobby-name.self')?.firstChild?.textContent?.trim() : '';
      if (!name) return render(null);
      if (!readPoints) {
        if (!loading && Date.now() >= retryAfter) {
          loading = readCharacterPointSource().then(reader => { readPoints = reader; warned = false; })
            .catch(error => { retryAfter = Date.now() + 60000; warn(error); })
            .finally(() => { loading = null; schedule(); });
        }
        return render(null);
      }
      try { render(readPoints(name)); } catch (error) { warn(error); }
    };
    const schedule = () => {
      if (!queued) { queued = true; queueMicrotask(refresh); }
    };
    const observer = new MutationObserver(changes => {
      if (changes.some(change => !elementOf(change.target)?.closest('.ro-zh-tw-point-badge'))) schedule();
    });
    observer.observe(lobby, {attributes: true, attributeFilter: ['class', 'hidden']});
    observer.observe(labels, {childList: true, characterData: true, subtree: true});
    observer.observe(panel, {attributes: true, attributeFilter: ['class', 'hidden']});
    for (const element of [outer, panel.querySelector('.tabs'), document.getElementById('cp-stat-points'), document.getElementById('cp-points')]) {
      if (element) observer.observe(element, {childList: true, characterData: true, subtree: true});
    }
    window.addEventListener('ro-save-replaced', schedule);
    window.addEventListener('storage', schedule);
    document.addEventListener('visibilitychange', schedule);
    panel.addEventListener('click', schedule);
    refreshCharacterPoints = schedule;
    schedule();
  }

  async function readEquipmentCatalog() {
    const incompatible = () => new Error('官方圖鑑資料格式已變更，暫時無法完整讀取，請更新繁中工具。');
    const unique = (values) => {
      const matches = [...new Set(values)];
      if (matches.length !== 1) throw incompatible();
      return matches[0];
    };
    // Follow the active game's imports and semantic data shapes, not build hashes or export aliases.
    const gamePath = [...document.scripts].find((script) => {
      if (script.type !== 'module' || !script.src) return false;
      const url = new URL(script.src);
      return url.origin === location.origin && /^\/build\/main-[\w-]+\.js$/u.test(url.pathname);
    });
    if (!gamePath) throw new Error('請等遊戲載入完成，再開啟圖鑑。');
    const response = await fetch(gamePath.src);
    if (!response.ok) throw new Error('遊戲資料暫時無法讀取，請重新開啟圖鑑。');
    const source = await response.text();
    const imports = new Map();
    for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/gu)) {
      for (const binding of match[1].split(',')) {
        const names = binding.trim().split(/\s+as\s+/u);
        const local = names[1] || names[0];
        imports.set(local, { name: names[0], url: new URL(match[2], gamePath.src).href });
      }
    }
    const capture = (text, pattern, group = 1) => unique(
      [...text.matchAll(pattern)].map((match) => match[group]));
    const reference = (pattern, group = 1, text = source) => imports.get(capture(text, pattern, group));
    const statSource = capture(source,
      /function [\w$]+\([\w$]+\)\{[^{}]{0,120}\.itemId[^{}]{0,80}\.starter\)return\{atk:0,matk:0,def:0\};.{0,1000}?\.baseMult.{0,300}?def:0\}\}/gu, 0);
    // These constants are resolved from their native consumers, since numeric values alone are ambiguous.
    const reward = reference(/\.push\(\{id:[\w$]+\.reward,quality:([\w$]+)/gu, 1);
    const attack = reference(/(?:const|let|var)\s*\[[\w$]+,[\w$]+\]=([\w$]+),[\w$]+=[\w$]+\[[\w$]+\.wtype/gu, 1, statSource);
    const deity = reference(/\(([\w$]+)\([\w$]+\.itemId\)\?1:0\)/gu, 1, statSource);
    const storyPattern = /\(([\w$]+)\[([\w$]+)\([\w$]+\.job\)\.base\?\?[\w$]+\.job\]\?\?\[\]\)\.map/gu;
    const story = reference(storyPattern, 1);
    const job = reference(storyPattern, 2);
    const refs = [reward, attack, deity, story, job];
    if (refs.some((entry) => !entry)) throw incompatible();
    const moduleUrl = new URL(unique(refs.map((entry) => entry.url)));
    if (moduleUrl.origin !== location.origin || !moduleUrl.pathname.startsWith('/build/')) throw incompatible();
    const native = await import(moduleUrl.href);
    const values = [...new Set(Object.values(native))];
    const table = (test) => unique(values.filter((value) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
      const rows = Object.values(value);
      return rows.length > 0 && rows.every((row) => row && typeof row === 'object' && test(row));
    }));
    const nativeFunction = (test) => unique(values.filter((value) =>
      typeof value === 'function' && test(Function.prototype.toString.call(value))));
    const equipment = table((row) => Number.isInteger(row.id) && typeof row.slot === 'string' &&
      Number.isInteger(row.cardSlots) && Array.isArray(row.bonuses));
    const cards = table((row) => Number.isInteger(row.id) && typeof row.monster === 'string' &&
      typeof row.compound === 'string' && Array.isArray(row.bonuses));
    const monsters = table((row) => typeof row.id === 'string' && typeof row.name === 'string' &&
      Number.isFinite(row.hp) && Number.isFinite(row.damage));
    const stages = table((row) => typeof row.map === 'string' && Array.isArray(row.waves) &&
      Array.isArray(row.bosses) && Number.isFinite(row.runLength));
    const monsterEquipment = table((row) => Array.isArray(row) &&
      row.every((drop) => Number.isInteger(drop.id) && Number.isFinite(drop.rate)));
    const enchants = table((row) => typeof row.id === 'string' && typeof row.slot === 'string' &&
      typeof row.text === 'function' && typeof row.apply === 'function');
    const qualities = unique(values.filter((value) => Array.isArray(value) && value.length > 0 &&
      value.every((row) => row && typeof row.name === 'string' && Number.isFinite(row.color) &&
        Number.isFinite(row.baseMult) && Number.isFinite(row.weight))));
    const tiers = unique(values.filter((value) => Array.isArray(value) && value.length > 0 &&
      value.every((row) => row && Number.isInteger(row.tier) && Number.isFinite(row.mult) &&
        Number.isFinite(row.weaponMult))));
    const assets = unique(values.filter((value) => value && typeof value === 'object' &&
      typeof value.load === 'function' && value.icons instanceof Map && value.itemTextures instanceof Map));
    const intrinsicEffects = nativeFunction((text) => text.includes('★ ') &&
      text.includes('.mult') && text.includes('.apply') && text.includes('.text'));
    const formatEffects = nativeFunction((text) => text.includes('.group.add(') &&
      text.includes('.group.value') && text.includes('.group.id'));
    const localize = nativeFunction((text) => text.includes('.lang]') &&
      text.includes('.replace(/\\{(\\w+)\\}/g'));
    const isTwoHanded = nativeFunction((text) => text.includes('.slot==="weapon"') &&
      text.includes('.wtype??""') && text.includes('.has('));
    const storyEquipment = native[story.name], storyQuality = native[reward.name];
    const weaponAttackRange = native[attack.name], isDeityEquipment = native[deity.name], getJob = native[job.name];
    if (!storyEquipment || !Object.values(storyEquipment).every((ids) =>
      Array.isArray(ids) && ids.every((id) => equipment[id])) ||
      !Number.isInteger(storyQuality) || !qualities[storyQuality] ||
      !Array.isArray(weaponAttackRange) || weaponAttackRange.length !== 2 ||
      !weaponAttackRange.every(Number.isFinite) || typeof isDeityEquipment !== 'function' ||
      typeof getJob !== 'function') throw incompatible();
    const monsterCards = Object.fromEntries(Object.values(cards).map((card) => [card.monster, card.id]));
    const tierProperties = (tier) => tiers.find((row) => row.tier === tier) || tiers[0];
    const qualityColor = (quality) => '#' + qualities[quality].color.toString(16).padStart(6, '0');
    let manifest = assets.manifest;
    if (!manifest?.items || !manifest?.cards) {
      const response = await fetch('/assets/manifest.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('原版道具清單暫時無法讀取，請重新開啟圖鑑。');
      manifest = await response.json();
    }
    if (!manifest.items || !manifest.cards) throw new Error('原版道具清單格式已變更。');

    const maps = [
      ['prontera', 'Campos de Prontera', '普隆德拉原野', 1],
      ['sewer', 'Alcantarillas de Prontera', '普隆德拉地下水道', 1],
      ['sunken', 'Barco hundido', '沉船甲板', 1],
      ['sunken_story', 'Barco hundido', '沉沒之船（劇情）', 1],
      ['byalan', 'Isla de Byalan', '海底洞窟', 2],
      ['payon', 'Bosque de Payon', '斐揚森林', 2],
      ['payon_cave', 'Cueva de Payon', '斐揚洞穴', 2],
      ['prt_castle', 'Castillo de Prontera', '普隆德拉城堡', 2]
    ];
    const slots = {
      weapon: '武器', shield: '盾牌', head_top: '頭部（上）', head_mid: '頭部（中）',
      head_low: '頭部（下）', headgear: '頭飾', armor: '護甲', garment: '披肩', shoes: '鞋子',
      acc: '飾品', accessory: '飾品'
    };
    const weaponTypes = {
      단검: '短劍', 검: '單手劍', 양손검: '雙手劍', 창: '單手矛', 양손창: '雙手矛',
      도끼: '單手斧', 양손도끼: '雙手斧', 클럽: '鈍器', 너클: '拳套', 롯드: '法杖',
      책: '書', 활: '弓', 악기: '樂器', 채찍: '鞭子', 카타르: '拳刃', 권총: '手槍',
      라이플: '步槍', 샷건: '散彈槍', 수리검: '風魔飛鏢'
    };
    const translate = (name) => lookup(name) || lookup(localize(name)) || localize(name);
    const effectText = (effect) => translateGearBonus(effect) || translate(effect);
    const drops = new Map();
    const addSource = (itemId, source) => {
      const sources = drops.get(itemId) || [];
      if (!sources.some((entry) => entry.map === source.map && entry.label === source.label)) {
        sources.push(source);
        drops.set(itemId, sources);
      }
    };
    for (const [mapId, original, map, tier] of maps) {
      const stage = stages[mapId];
      const monstersOnMap = new Set(stage.waves.flatMap(({ pool }) => pool));
      for (const boss of stage.bosses) monstersOnMap.add(boss.id);
      if (!stage.story && !stage.storyOnly) {
        for (const monsterId of monstersOnMap) {
          const monster = monsters[monsterId];
          const name = monster ? translate(monster.name) : monsterId;
          const source = { map, original, tier, label: (monster?.boss ? '👑 ' : '') + name };
          for (const drop of monsterEquipment[monsterId] || []) addSource(drop.id, source);
          if (monsterCards[monsterId]) addSource(monsterCards[monsterId], source);
        }
      }
      if (stage.reward) addSource(stage.reward, { map, original, tier, label: '🎁 關卡獎勵', quality: storyQuality });
      if (stage.jobWeapon) {
        for (const id of Object.values(storyEquipment).flat()) {
          addSource(id, { map, original, tier, label: '🎁 職業劇情獎勵', quality: storyQuality });
        }
      }
    }

    // Read private numeric tables from the same stat function without evaluating source code.
    const escapePattern = (text) => text.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    const declaration = (name, literal) => capture(source,
      new RegExp('(?:const |let |var |,)' + escapePattern(name) + '=(' + literal + ')(?=[,;])', 'gu'));
    const numericTable = (name) => Object.fromEntries(declaration(name, '\\{[^{}]+\\}')
      .slice(1, -1).split(',').map((entry) => {
        const match = /^([\p{L}\p{N}_$]+):(-?(?:\d*\.)?\d+(?:e[+-]?\d+)?)$/u.exec(entry);
        if (!match || !Number.isFinite(Number(match[2]))) throw incompatible();
        return [match[1], Number(match[2])];
      }));
    const defenseBySlot = numericTable(capture(statSource,
      /def:\(([\w$]+)\[[\w$]+\.slot\]\?\?0\)\*[\w$]+\.mult/gu));
    const weaponWeights = numericTable(capture(statSource,
      /=([\w$]+)\[[\w$]+\.wtype\?\?""\]\?\?/gu));
    const fallback = capture(statSource,
      /\?\?\([\w$]+\([\w$]+\)\?([\d.]+:[\d.]+)\)/gu).split(':').map(Number);
    const casterTypes = JSON.parse(declaration(capture(statSource,
      /return ([\w$]+)\.has\([\w$]+\.wtype\?\?""\)/gu), 'new Set\\(\\[[^\\]]+\\]\\)').slice(8, -1));
    const casterRatio = Number(declaration(capture(statSource,
      /\?\{atk:[\w$]+\*([\w$]+),matk:[\w$]+,def:0\}/gu), '[\\d.]+'));
    if (!fallback.every(Number.isFinite) || !Number.isFinite(casterRatio) ||
      !Array.isArray(casterTypes) || !casterTypes.every((type) => typeof type === 'string') ||
      !/=\([\w$]+\+\([\w$]+-[\w$]+\)\*[\w$]+\)\*[\w$]+\.weaponMult\*/u.test(statSource)) throw incompatible();
    // Native base stats at +0 for the selected tier and quality.
    const baseStats = (item, tier, quality) => {
      if (item.starter) return [];
      const effective = tierProperties(Math.min(tiers.at(-1).tier, tier + Number(isDeityEquipment(item.id))));
      if (item.slot !== 'weapon') {
        const defense = Math.round((defenseBySlot[item.slot] || 0) * effective.mult * 10) / 10;
        return defense ? ['DEF ' + defense] : [];
      }
      const [min, max] = weaponAttackRange;
      const weight = weaponWeights[item.wtype] ?? fallback[isTwoHanded(item) ? 0 : 1];
      const power = (min + (max - min) * weight) * effective.weaponMult * qualities[quality].baseMult;
      const caster = casterTypes.includes(item.wtype);
      return ['ATK +' + Math.round(caster ? power * casterRatio : power),
        ...(caster || item.base?.matk ? ['MATK +' + Math.round(power)] : [])];
    };

    return {
      tiers: tiers.map(({ tier }) => tier),
      qualities: qualities.map(({ name }, index) => ({
        name: ['普通', '優良', '稀有', '史詩', '傳說'][index] || translate(name),
        color: qualityColor(index)
      })),
      items: [...Object.values(equipment), ...Object.values(cards)].map((item) => {
        const card = Object.hasOwn(item, 'compound');
        const entry = (card ? manifest.cards : manifest.items)[item.id];
        const original = entry?.name || '#' + item.id;
        const name = lookup(original) || translate(original);
        const category = slots[card ? item.compound : item.slot] || '其他';
        const subtype = !card && item.slot === 'weapon' ? weaponTypes[item.wtype] || '其他武器' : '';
        const sources = drops.get(item.id) || [];
        const bonuses = formatEffects(item.bonuses).map(effectText);
        const itemTiers = card ? [] : [...new Set(sources.map(({ tier }) => tier))].sort((a, b) => a - b);
        const jobs = item.jobs?.map((id) => translate(getJob(id).name)) || [];
        const deity = !card && Object.values(enchants).find((entry) => entry.slot === 'deity' && entry.icon === item.id);
        return {
          id: item.id, card, name, original, category, subtype, jobs, bonuses, sources, itemTiers,
          starter: !card && item.starter, deity: deity ? translate(deity.name) : '',
          image: entry ? '/assets/' + (card ? entry.image : entry.icon) : '',
          fixedQuality: sources.length && sources.every((source) => source.quality === sources[0].quality)
            ? sources[0].quality : undefined,
          stats: (tier, quality) => [
            ...baseStats(item, tier, quality),
            ...intrinsicEffects(item.id, tier).map((effect) => effectText(effect.text(1)))
          ]
        };
      })
    };
  }

  function mountEquipmentCatalog(trigger) {
    const dialog = document.createElement('dialog');
    dialog.id = 'ro-zh-tw-equipment';
    dialog.className = 'ro-window';
    dialog.translate = false;
    dialog.setAttribute('aria-labelledby', 'ro-zh-tw-equipment-title');
    dialog.innerHTML = `
      <div class="ro-title" id="ro-zh-tw-equipment-title" tabindex="-1" autofocus>裝備與卡片圖鑑</div>
      <div class="ro-body">
        <input type="search" aria-label="搜尋裝備與卡片" placeholder="搜尋名稱、地點、怪物或屬性">
        <nav aria-label="圖鑑分類"></nav>
        <div class="ro-zh-tw-equipment-scroll">
          <p role="status"></p>
          <div class="wk-gears"></div>
        </div>
      </div>
      <footer><button class="ro-btn" type="button">關閉</button></footer>`;
    const search = dialog.querySelector('input');
    const navigation = dialog.querySelector('nav');
    const scroll = dialog.querySelector('.ro-zh-tw-equipment-scroll');
    const status = scroll.querySelector('[role="status"]');
    const list = scroll.querySelector('.wk-gears');
    const node = (tag, className, text) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    };
    const button = (text, action) => {
      const element = node('button', 'ro-btn small', text);
      element.type = 'button';
      element.onclick = action;
      return element;
    };
    const searchKey = (value) => value.toLowerCase().normalize('NFKC').replace(/\s+/gu, ' ').trim();
    let catalog;
    let path = [];
    let query = '';
    let selected;
    let listTop = 0;

    function render() {
      const focused = dialog.contains(document.activeElement) && document.activeElement !== search;
      list.replaceChildren();
      navigation.replaceChildren(button('全部', () => navigate([])));
      path.forEach((label, index) => {
        navigation.append(button(label, () => navigate(path.slice(0, index + 1))));
      });
      if (selected) {
        navigation.append(button('返回清單', () => {
          selected = undefined;
          render();
          scroll.scrollTop = listTop;
        }));
        status.textContent = '';
        const item = selected;
        const card = node('article', 'wk-gear' + (item.card ? ' wk-card' : ''));
        const content = itemHeading(card, item);
        const title = content.querySelector('b');
        title.tabIndex = -1;
        if (item.jobs.length) content.append(node('small', 'muted', item.jobs.join('、')));
        const controls = node('div', 'ro-zh-tw-equipment-tiers');
        const effect = node('div', 'ro-zh-tw-equipment-effects');
        const quality = node('select', 'ro-select');
        quality.setAttribute('aria-label', '預覽裝備品質');
        const tierChoices = item.itemTiers.length ? item.itemTiers : catalog.tiers;
        if (!item.card && !item.starter) {
          for (const [index, entry] of catalog.qualities.entries()) quality.add(new Option(entry.name, index));
          quality.value = String(item.fixedQuality ?? 0);
          controls.append(node('span', 'muted', '+0 屬性預覽'), quality);
          content.append(controls);
        }
        content.append(effect);
        const renderStats = () => {
          const rarity = Number(quality.value);
          title.style.color = rarity ? catalog.qualities[rarity].color : '';
          effect.replaceChildren();
          if (!item.card && !item.starter) {
            for (const tier of tierChoices) {
              const row = node('span', 'wk-star');
              row.append(node('em', '', 'T' + tier), document.createTextNode(item.stats(tier, rarity).join(' · ') || '無屬性'));
              effect.append(row);
            }
          }
          for (const bonus of item.bonuses) effect.append(node('span', 'wk-star', bonus));
          if (!effect.childNodes.length) effect.append(node('small', 'muted', '無屬性'));
        };
        quality.onchange = renderStats;
        renderStats();

        content.append(node('b', 'ro-zh-tw-equipment-drops', '取得方式'));
        const locations = node('ul');
        if (item.starter) locations.append(node('li', '', '角色初始裝備'));
        if (item.deity) locations.append(node('li', '', '原版神祇系統：' + item.deity));
        const sourceByMap = new Map();
        for (const source of item.sources) {
          const key = source.map + ' · T' + source.tier;
          if (!sourceByMap.has(key)) sourceByMap.set(key, { ...source, labels: [] });
          sourceByMap.get(key).labels.push(source.label);
        }
        for (const source of sourceByMap.values()) {
          const row = node('li');
          row.append(node('b', '', source.map), node('em', '', 'T' + source.tier),
            document.createTextNode(' ' + source.labels.join('、')));
          locations.append(row);
        }
        if (!locations.childNodes.length) locations.append(node('li', '', '原版資料未列出取得地點'));
        content.append(locations);
        list.append(card);
        if (focused) title.focus({ preventScroll: true });
        return;
      }

      const scope = catalog.items.filter((item) =>
        path.every((label, index) => item.path[index] === label));
      const terms = searchKey(query).split(' ').filter(Boolean);
      const matches = scope.filter((item) => terms.every((term) => item.search.includes(term)));
      const groups = new Map();
      if (!terms.length) {
        for (const item of matches) {
          const label = item.path[path.length];
          if (label) groups.set(label, (groups.get(label) || 0) + 1);
        }
      }
      status.textContent = matches.length ? matches.length + ' 件' : '找不到符合條件的道具';
      if (groups.size) {
        for (const [label, count] of groups) {
          list.append(button(label + ' · ' + count, () => navigate([...path, label])));
        }
      } else {
        for (const item of matches) {
          const row = button('', () => {
            listTop = scroll.scrollTop;
            selected = item;
            render();
            scroll.scrollTop = 0;
          });
          row.className = 'wk-gear' + (item.card ? ' wk-card' : '');
          const content = itemHeading(row, item);
          content.append(node('small', 'muted', [...item.path.slice(1), ...item.itemTiers.map((tier) => 'T' + tier)].join(' · ')));
          list.append(row);
        }
      }
      if (focused) (list.querySelector('button') || navigation.lastElementChild).focus({ preventScroll: true });
    }

    function itemHeading(container, item) {
      const imageUrl = new URL(item.image || '/', location.origin);
      if (imageUrl.origin === location.origin && imageUrl.pathname.startsWith('/assets/') &&
          /\.(?:png|webp|jpe?g|gif)$/iu.test(imageUrl.pathname)) {
        const image = node('img');
        image.src = imageUrl.href;
        image.alt = '';
        image.loading = 'lazy';
        container.append(image);
      }
      const content = node('div');
      const title = node('b', '', item.name);
      if (item.fixedQuality) title.style.color = catalog.qualities[item.fixedQuality].color;
      content.append(title);
      container.append(content);
      return content;
    }

    function navigate(nextPath) {
      path = nextPath;
      selected = undefined;
      render();
      scroll.scrollTop = 0;
    }

    dialog.querySelector('footer button').onclick = () => dialog.close();
    // Keep game commands from running while typing. Movement keyup still reaches the game.
    dialog.addEventListener('keydown', (event) => event.stopPropagation());
    dialog.addEventListener('keyup', (event) => {
      if (!/^(?:[wasd]|Arrow(?:Up|Down|Left|Right))$/iu.test(event.key)) event.stopPropagation();
    });
    for (const type of ['pointerdown', 'pointerup', 'click', 'wheel', 'touchstart', 'touchend']) {
      dialog.addEventListener(type, (event) => event.stopPropagation());
    }
    search.oninput = () => {
      query = search.value;
      if (catalog) navigate(path);
    };
    dialog.addEventListener('close', () => trigger.focus());
    trigger.onclick = async () => {
      if (dialog.open) return;
      (document.fullscreenElement || document.body).append(dialog);
      dialog.showModal();
      if (catalog) return;
      search.disabled = true;
      status.textContent = '正在讀取原版裝備資料…';
      try {
        catalog = await readEquipmentCatalog();
        for (const item of catalog.items) {
          item.path = [item.card ? '卡片' : '裝備', item.category, ...(item.subtype ? [item.subtype] : [])];
          const effects = item.itemTiers.flatMap((tier) => item.stats(tier, 0));
          item.search = searchKey([item.name, item.original, ...item.path, ...item.jobs, ...item.bonuses,
            ...effects, item.deity, ...item.itemTiers.map((tier) => 'T' + tier),
            ...item.sources.flatMap(({ map, original, label }) => [map, original, label])].join(' '));
        }
        search.disabled = false;
        navigate([]);
      } catch (error) {
        catalog = undefined;
        status.textContent = error.message || '原版裝備資料暫時無法讀取。';
      }
    };
  }

  function mountPanel() {
    const host = document.createElement('div');
    host.id = 'ro-zh-tw-tools';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { all: initial; position: fixed; right: 16px; bottom: 16px; z-index: 2147483646;
          font: 14px/1.4 system-ui, sans-serif; color: #f4f5f7; }
        *, *::before, *::after { box-sizing: border-box; }
        [hidden] { display: none !important; }
        .box { position: relative; }
        header { display: flex; justify-content: flex-end; gap: 6px; }
        button { min-height: 36px; padding: 5px 9px; color: inherit; background: #293b50;
          border: 1px solid #627a95; border-radius: 6px; font: inherit; cursor: pointer; }
        button:hover { background: #3b526e; }
        button:focus-visible, input:focus-visible { outline: 2px solid #ffd37b; outline-offset: 2px; }
        #panel { position: absolute; right: 0; bottom: 42px; width: min(285px, calc(100vw - 26px));
          max-height: min(70vh, calc(100dvh - 70px)); overflow: auto; padding: 9px 10px;
          color: #f4f5f7; background: #161e27; border: 1px solid #576a7f; border-radius: 9px;
          box-shadow: 0 3px 14px #0007; }
        #panel label, #panel p { display: block; margin: 4px 0 8px; }
        .buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
        #status { color: #ffd37b; }
        p:empty { display: none; }
        details > summary { cursor: pointer; }
        .disclosure { margin-top: 8px; font-size: 12px; }
        .disclosure p { margin: 4px 0 0; }
      </style>
      <div class="box">
        <header>
          <button id="settings-toggle" type="button" aria-controls="panel" aria-expanded="false">繁中</button>
          <button id="equipment-catalog" type="button">圖鑑</button>
        </header>
        <section id="panel" aria-label="RO Survivors 繁體中文化設定" hidden>
          <details id="translation-controls">
            <summary><strong>RO Survivors 繁體中文化</strong></summary>
            <div id="summary"></div>
            <label><input id="enabled" type="checkbox"> 啟用中文化</label>
            <label><input id="collect-english" type="checkbox"> 收集英文</label>
            <div class="buttons">
              <button id="unknown" type="button">匯出未翻譯文字</button>
              <button id="clear" type="button">清空待翻譯</button>
            </div>
            <p id="message" role="status"></p>
            <p id="status" role="status"></p>
          </details>
          <label><input id="hide-equipment-details" type="checkbox"> 關閉裝備頁顯示明細</label>
          <label><input id="disable-auto-fullscreen" type="checkbox"> 關閉自動全螢幕</label>
          <label><input id="prefer-alternate-names" type="checkbox"> 優先使用技能名稱對照</label>
          <details class="disclosure">
            <summary>資料使用說明</summary>
            <p>翻譯文字與待翻譯紀錄保存在瀏覽器本機，不會自動上傳。匯出功能只會下載本機檔案。</p>
          </details>
        </section>
      </div>`;
    const el = (id) => shadow.getElementById(id);
    ui = {
      shadow, panel: el('panel'), switch: el('enabled'), collectEnglish: el('collect-english'),
      preferAlternateNames: el('prefer-alternate-names'), summary: el('summary'), status: el('status'),
      message: el('message'), clear: el('clear'), panelOpen: false
    };
    document.body.append(host);
    mountEquipmentCatalog(el('equipment-catalog'));

    const toggle = el('settings-toggle');
    toggle.onclick = () => {
      ui.panelOpen = !ui.panelOpen;
      ui.panel.hidden = !ui.panelOpen;
      toggle.setAttribute('aria-expanded', String(ui.panelOpen));
    };
    ui.switch.onchange = () => {
      state.settings.enabled = ui.switch.checked;
      saveSettings();
      updateLanguage();
    };
    ui.collectEnglish.onchange = () => {
      state.settings.collectEnglish = ui.collectEnglish.checked;
      saveSettings();
      updateLanguage();
      if (!collecting) void flush();
    };
    ui.preferAlternateNames.onchange = () => {
      state.settings.preferAlternateSkillNames = ui.preferAlternateNames.checked;
      saveSettings();
      rescan();
    };
    el('unknown').onclick = () => void panelAction(async () => {
      await flush();
      const entries = unknownEntries();
      download('unknown', entries);
      show('已匯出 ' + entries.length + ' 筆待翻譯文字。');
    });
    ui.clear.onclick = () => void panelAction(clearUnknown);

    host.addEventListener('keyup', (event) => {
      if (!/^(?:[wasd]|Arrow(?:Up|Down|Left|Right))$/i.test(event.key)) event.stopPropagation();
    });
    for (const event of ['keydown', 'pointerdown', 'pointerup', 'pointermove', 'mousedown',
      'mouseup', 'click', 'dblclick', 'contextmenu', 'wheel', 'touchstart', 'touchend']) {
      host.addEventListener(event, (input) => input.stopPropagation());
    }
  }

  function mountEquipmentItemTooltip() {
    const list = document.getElementById('cp-eq-list');
    const inventory = document.getElementById('cp-inventory');
    if (!list || !inventory) return;

    let activeRow = null;
    const filteredCell = document.createElement('div');
    filteredCell.hidden = true;
    function copyDetails(detail) {
      const preview = detail.cloneNode(true);
      preview.querySelectorAll('button, .btn-row, .ro-zh-tw-share').forEach(element => element.remove());
      preview.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      preview.dataset.roEquipmentPreview = '';
      return preview;
    }

    function showPreview(preview) {
      const comparison = document.getElementById('cp-eq-cmp');
      comparison?.querySelector('[data-ro-equipment-preview]')?.remove();
      comparison?.querySelector('.cmp-head, .box-title')?.after(preview);
    }
    function hide() {
      if (!activeRow) return;
      activeRow = null;
      inventory.onmouseleave?.();
    }

    const checkbox = document.getElementById('ro-zh-tw-tools')?.shadowRoot?.getElementById('hide-equipment-details');
    if (checkbox) {
      checkbox.checked = state.settings.hideEquipmentDetails;
      checkbox.addEventListener('change', () => {
        state.settings.hideEquipmentDetails = checkbox.checked;
        if (checkbox.checked) {
          hide();
          document.querySelector('#cp-eq-cmp [data-ro-equipment-preview]')?.remove();
        }
        saveSettings();
      });
    }

    function show(event) {
      if (state.settings.hideEquipmentDetails) return;
      const row = event.target.closest('#cp-eq-list .cand[data-uid]');
      if (!row || event.target.closest('button') || typeof inventory.onmousemove !== 'function') {
        hide();
        return;
      }
      // The native tooltip resolves gear by UID, including when the bag filter hides it.
      const visibleCell = inventory.querySelector(`[data-uid="${CSS.escape(row.dataset.uid)}"]`);
      if (activeRow && activeRow !== row) hide();
      const cell = visibleCell || filteredCell;
      if (!visibleCell) {
        cell.dataset.uid = row.dataset.uid;
        inventory.append(cell);
      }
      try {
        activeRow = row;
        inventory.onmousemove({ target: cell, clientX: event.clientX, clientY: event.clientY });
      } finally {
        if (!visibleCell) cell.remove();
      }
    }

    list.addEventListener('pointermove', event => {
      if (event.pointerType === 'mouse') show(event);
    });
    list.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') hide();
    });
    list.addEventListener('click', event => {
      if (state.settings.hideEquipmentDetails ||
        (!document.documentElement.classList.contains('touch') && event.pointerType !== 'touch')) return;
      const row = event.target.closest('.cand[data-uid]');
      const comparison = document.getElementById('cp-eq-cmp');
      if (!row || !comparison || event.target.closest('button')) return;
      const selector = `[data-uid="${CSS.escape(row.dataset.uid)}"]`;
      const filters = document.getElementById('cp-inv-filters');
      const previousFilter = filters?.querySelector('.inv-chip.active')?.dataset.f;
      const previousItem = inventory.querySelector('.item-cell.sel')?.dataset.uid;
      let cell = inventory.querySelector(selector);
      const all = filters?.querySelector('[data-f="all"]');
      const changedFilter = !cell && all && previousFilter && previousFilter !== 'all';
      if (changedFilter) {
        all.click();
        cell = inventory.querySelector(selector);
      }
      let preview;
      try {
        if (!cell || typeof cell.onclick !== 'function') return;
        cell.click();
        const detail = document.querySelector('#cp-inv-detail > .eq-item');
        if (!detail) return;
        preview = copyDetails(detail);
      } finally {
        if (changedFilter && previousFilter) {
          filters.querySelector(`[data-f="${CSS.escape(previousFilter)}"]`)?.click();
        }
        if (previousItem && previousItem !== row.dataset.uid) {
          inventory.querySelector(`[data-uid="${CSS.escape(previousItem)}"]`)?.click();
        }
      }
      showPreview(preview);
    });
    document.addEventListener('click', event => {
      const slot = event.target.closest(':is(#cp-slots-left, #cp-slots-right) .equip-slot[data-slot]');
      if (!slot || state.settings.hideEquipmentDetails) return;
      const selected = slot.dataset.slot;
      queueMicrotask(() => {
        const current = document.querySelector(':is(#cp-slots-left, #cp-slots-right) .equip-slot.sel');
        if (current?.dataset.slot !== selected || state.settings.hideEquipmentDetails) return;
        const equipped = document.querySelector('#cp-eq-current > .eq-item');
        if (equipped) showPreview(copyDetails(equipped));
      });
    }, true);
    document.addEventListener('pointerdown', event => {
      if (!list.contains(event.target)) hide();
    }, true);
    new MutationObserver(() => {
      if (activeRow && !list.contains(activeRow)) hide();
    }).observe(list, { childList: true });
  }

  function mountAndroidFullscreen() {
    const checkbox = document.getElementById('ro-zh-tw-tools')?.shadowRoot?.getElementById('disable-auto-fullscreen');
    if (checkbox) {
      checkbox.checked = state.settings.disableAutoFullscreen;
      checkbox.addEventListener('change', () => {
        state.settings.disableAutoFullscreen = checkbox.checked;
        saveSettings();
      });
    }

    const android = navigator.userAgentData?.platform === 'Android' || /Android/i.test(navigator.userAgent);
    if (!android || !document.fullscreenEnabled || !document.documentElement.requestFullscreen) return;

    function enter(event) {
      if (!enabled || state.settings.disableAutoFullscreen || !event.isTrusted ||
        event.composedPath().some(node => node.id === 'ro-zh-tw-tools')) return;
      if (navigator.userActivation && !navigator.userActivation.isActive && !document.fullscreenElement) return;
      document.removeEventListener('click', enter, true);
      if (!document.fullscreenElement) {
        void document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
      }
    }
    document.addEventListener('click', enter, true);
  }




  // Only the 16 public pet speech lines, before Pixi wraps text or sizes the bubble.
  const PET_SPEECH_EN = new Map([["Here we go!","出發吧！"],["I've got your back! Well, I'll watch it.","我掩護你！呃，我在旁邊看著。"],["Are there snacks at the end?","最後有點心嗎？"],["Smells like loot today!","今天聞起來有寶物的味道！"],["Hey, they're hitting you!","喂，你在挨打耶！"],["A potion, maybe?","要不要喝瓶藥水？"],["Run, run!","快跑，快跑！"],["Don't leave me here alone…","別把我一個人丟在這裡……"],["Nooo! Who's going to feed me now?","不——！現在誰來餵我？"],["I'll save you a spot in Prontera…","我在普隆德拉幫你佔位子……"],["The next one will go better, for sure.","下一局一定會更好。"],["Was that part of the plan?","那也是計畫的一部分嗎？"],["Unstoppable!","勢不可擋！"],["That's it! Again!","就是這樣！再來！"],["Not a scratch. Show-off!","毫髮無傷。愛現！"],["You're so good at this!","你真的很會耶！"]]);
  const petSpeechHooks = new WeakSet();
  const petSpeechViews = new WeakMap();
  const petSpeechRefs = new Set();
  function isPetSpeechText(view) {
    const style = view._style;
    return view.renderPipeId === 'text' && style &&
      style.fontFamily === 'Nunito, Segoe UI, sans-serif' &&
      style.fontSize === 13 && String(style.fontWeight) === '700' &&
      style.fill === 4864556 && style.wordWrap === true &&
      style.wordWrapWidth === 170 && style.align === 'center';
  }

  function refreshPetSpeechViews() {
    for (const ref of petSpeechRefs) {
      const view = ref.deref();
      if (!view || view.destroyed) { petSpeechRefs.delete(ref); continue; }
      try {
        const record = petSpeechViews.get(view);
        if (!record || view._text !== record.applied || !isPetSpeechText(view)) continue;
        const next = enabled ? state.dictionary.get(record.original) || PET_SPEECH_EN.get(record.original) : record.original;
        if (next === view._text) continue;
        // Refresh only the observed two-child pet bubble; never traverse the scene.
        const children = view.parent?.children;
        const bg = children?.[0];
        if (children?.length !== 2 || children[1] !== view ||
            !['clear', 'roundRect', 'fill', 'stroke', 'poly'].every(key => typeof bg?.[key] === 'function')) continue;
        record.applied = next;
        view.text = next;
        view._style.breakWords = enabled ? true : record.breakWords;
        const width = view.width + 18, height = view.height + 10;
        bg.clear().roundRect(-width / 2, -height - 3, width, height, 8)
          .fill({ color: 16776694, alpha: .95 }).stroke({ color: 13218958, width: 1.5 })
          .poly([-5, -4, 5, -4, 0, 3]).fill({ color: 16776694, alpha: .95 });
        view.y = -8;
      } catch { /* Renderer changes must not interrupt the game or the toggle. */ }
    }
  }

  function wrapPetTextViewUpdate(type) {
    const proto = type?.prototype;
    if (!proto || petSpeechHooks.has(proto)) return false;
    const descriptor = Object.getOwnPropertyDescriptor(proto, 'onViewUpdate');
    if (!descriptor?.writable || typeof descriptor.value !== 'function') return false;
    const update = descriptor.value;
    const wrapped = function (...args) {
      // Fast exit for sprites/graphics. Do not inspect or collect other canvas text.
      if (this.renderPipeId === 'text') try {
        if (PET_SPEECH_EN.has(this._text) && isPetSpeechText(this)) {
          const original = this._text;
          const applied = enabled ? state.dictionary.get(original) || PET_SPEECH_EN.get(original) : original;
          const previous = petSpeechViews.get(this);
          const breakWords = previous ? previous.breakWords : this._style.breakWords;
          if (!petSpeechViews.has(this) && typeof WeakRef === 'function') {
            // At most a few pets are alive; bound bookkeeping and never retain sprites.
            for (const ref of petSpeechRefs) if (!ref.deref()) petSpeechRefs.delete(ref);
            if (petSpeechRefs.size >= 32) petSpeechRefs.delete(petSpeechRefs.values().next().value);
            petSpeechRefs.add(new WeakRef(this));
          }
          petSpeechViews.set(this, { original, applied, breakWords });
          // Display text only. Keep the original setter's invalidation and native call.
          // The next speech also gets a distinct texture key; no stale English texture.
          this._text = applied;
          // Pixi's default wraps on spaces; Chinese needs grapheme wrapping.
          // This style belongs to the matched pet Text and is restored when disabled.
          const wrapWords = enabled ? true : breakWords;
          if (this._style.breakWords !== wrapWords) this._style.breakWords = wrapWords;
        }
      } catch { /* Always preserve the native renderer call below. */ }
      return Reflect.apply(update, this, args);
    };
    Object.defineProperty(proto, 'onViewUpdate', { ...descriptor, value: wrapped });
    petSpeechHooks.add(proto);
    return true;
  }

  async function installPetSpeechTranslation() {
    // Reuse the game's own preloaded module instance, never import/restart main.
    // Discover the current hashed URL instead of pinning a game build.
    const urls = [...document.querySelectorAll('link[rel="modulepreload"][href]')]
      .map(link => new URL(link.href, location.href))
      .filter(url => url.origin === location.origin && !url.search && !url.hash &&
        /^\/build\/soul_linker-[A-Za-z0-9_-]+\.js$/u.test(url.pathname));
    if (urls.length !== 1) return;
    const exports = await import(urls[0].href);
    // Match the observed ViewContainer contract rather than its minified export name.
    const types = [...new Set(Object.values(exports))].filter(type => {
      const proto = typeof type === 'function' && type.prototype;
      return proto && typeof Object.getOwnPropertyDescriptor(proto, 'bounds')?.get === 'function' &&
        typeof Object.getOwnPropertyDescriptor(proto, 'onViewUpdate')?.value === 'function' &&
        typeof Object.getOwnPropertyDescriptor(proto, 'collectRenderablesSimple')?.value === 'function' &&
        typeof Object.getOwnPropertyDescriptor(proto, 'unload')?.value === 'function';
    });
    if (types.length === 1) wrapPetTextViewUpdate(types[0]);
  }

  function translateBossCanvasText() {
    for (const type of [globalThis.CanvasRenderingContext2D, globalThis.OffscreenCanvasRenderingContext2D]) {
      if (!type) continue;
      for (const method of ['measureText', 'strokeText', 'fillText']) {
        const descriptor = Object.getOwnPropertyDescriptor(type.prototype, method);
        if (!descriptor?.writable || typeof descriptor.value !== 'function') continue;
        const draw = descriptor.value;
        type.prototype[method] = function (text, ...args) {
          // The game's Pixi boss-cast labels use a dedicated 13px Nunito style.
          if (enabled && typeof text === 'string' && text.endsWith('!!') &&
              /\b13px\b.*\bNunito\b/u.test(this.font)) {
            text = OFFICIAL_BOSS_CASTS.get(text) || (own(BUILTIN, text) && state.dictionary.get(text)) || text;
          }
          return Reflect.apply(draw, this, [text, ...args]);
        };
      }
    }
  }

  async function start() {
    if (!document.getElementById('stage') || !document.getElementById('splash')) return;
    const gameWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
    const originalAlert = gameWindow.alert;
    gameWindow.alert = function (message) {
      if (enabled && message === 'Your account was opened in another tab. Nothing is saved in this one anymore: reload it if you want to keep playing here.') {
        return originalAlert.call(gameWindow, '你的帳號已在另一個分頁開啟。這個分頁將不再儲存遊戲進度。若要在這裡繼續遊玩，請重新整理此分頁。');
      }
      if (enabled && message === 'Your account was used on another device. Its most recent save has been loaded.') {
        return originalAlert.call(gameWindow, lookup(message) || message);
      }
      return originalAlert.apply(gameWindow, arguments);
    };
    try {
      const saved = GM_getValue(SETTINGS, {});
      if (typeof saved?.enabled === 'boolean') state.settings.enabled = saved.enabled;
      if (typeof saved?.collectEnglish === 'boolean') state.settings.collectEnglish = saved.collectEnglish;
      if (typeof saved?.preferAlternateSkillNames === 'boolean') state.settings.preferAlternateSkillNames = saved.preferAlternateSkillNames;
      if (typeof saved?.hideEquipmentDetails === 'boolean') state.settings.hideEquipmentDetails = saved.hideEquipmentDetails;
      if (typeof saved?.disableAutoFullscreen === 'boolean') state.settings.disableAutoFullscreen = saved.disableAutoFullscreen;
    } catch {
      state.settingsError = '無法讀取工具設定。';
    }
    mountPanel();
    mountCharacterPointBadges();
    mountEquipmentItemTooltip();
    mountAndroidFullscreen();
    const gameUiStyle = document.createElement('style');
    gameUiStyle.textContent = `
      /* 網頁介面採用繁中字型，缺字時依序退回系統字型。 */
      body, button, input, select, textarea, .ro-window {
        font-family: "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif;
      }
      #ro-zh-tw-equipment { position: fixed; inset: 0; margin: auto; padding: 0;
        width: min(580px, calc(100% - 24px)); height: min(740px, calc(100dvh - 24px));
        max-width: none; max-height: none; text-align: start; color: var(--ro-text, #243456);
        font: 14px/1.4 system-ui, sans-serif; color-scheme: light; }
      #ro-zh-tw-equipment[open] { display: flex; flex-direction: column; }
      #ro-zh-tw-equipment::backdrop { background: #080e1e80; }
      #ro-zh-tw-equipment .ro-body { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
      #ro-zh-tw-equipment input { box-sizing: border-box; width: 100%; padding: 9px 10px;
        border: 1px solid var(--ro-border, #a9b9da); border-radius: 8px; background: #fff;
        color: inherit; font: inherit; font-size: 16px; }
      #ro-zh-tw-equipment nav, .ro-zh-tw-equipment-tiers { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
      #ro-zh-tw-equipment nav:empty { display: none; }
      #ro-zh-tw-equipment nav .ro-btn { margin: 0; }
      #ro-zh-tw-equipment footer { display: flex; justify-content: end; padding: 6px 12px;
        border-top: 1px solid var(--ro-line, #d7dfee); }
      .ro-zh-tw-equipment-scroll { overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable;
        min-height: 0; flex: 1; padding: 2px 6px 3px 2px; touch-action: pan-y; }
      #ro-zh-tw-equipment [role="status"] { margin: 0 0 6px; color: var(--ro-muted, #586783); font-size: 12px; }
      #ro-zh-tw-equipment [role="status"]:empty { display: none; }
      #ro-zh-tw-equipment .wk-gears { display: grid; grid-template-columns: minmax(0, 1fr); gap: 6px; }
      #ro-zh-tw-equipment button.wk-gear { width: 100%; min-height: 44px; text-align: start; cursor: pointer; }
      #ro-zh-tw-equipment button.wk-gear:hover { border-color: var(--ro-blue-1, #738dbf); }
      #ro-zh-tw-equipment .wk-gear > div { min-width: 0; }
      #ro-zh-tw-equipment article.wk-gear > img { width: 38px; height: 38px; }
      #ro-zh-tw-equipment article.wk-card > img { width: clamp(44px, 16vw, 78px); height: auto; }
      #ro-zh-tw-equipment .wk-gear :is(small, li) { overflow-wrap: anywhere; }
      #ro-zh-tw-equipment .ro-zh-tw-equipment-drops, .ro-zh-tw-equipment-tiers { margin-top: 8px; }
      #ro-zh-tw-equipment button:focus-visible, #ro-zh-tw-equipment select:focus-visible {
        outline: 2px solid var(--ro-blue-1, #5576bb); outline-offset: 1px; }
      /* The native HUD creates and updates the damage meter on touch devices too. */
      @media (max-width: 720px), (max-height: 500px) {
        html.touch #minimap > #dps-toggle:not(.hidden) {
          display: block;
          width: 28px;
          height: 28px;
        }
        html.touch #hud > #dps:not(.hidden) {
          display: block;
          top: calc(var(--col-t) + var(--col-w) + 120px);
          right: var(--col-r);
          max-width: calc(100% - var(--col-r) - 8px);
          max-height: min(32dvh, calc(100% - var(--col-t) - var(--col-w) - 128px));
        }
      }
      @media (max-height: 500px) and (orientation: landscape) {
        html.touch #hud > #dps:not(.hidden) {
          top: calc(var(--col-t) + 44px);
          right: calc(var(--col-r) + var(--col-w) + 8px);
          max-width: calc(100% - var(--col-r) - var(--col-w) - 16px);
          max-height: 40dvh;
        }
      }
      #lobby-place[data-ro-zh-tw-queue] {
        box-sizing: border-box;
        inline-size: min(24em, calc(100% - 24px));
      }
      #lobby-place[data-ro-zh-tw-queue]:not(:has(> #lobby-online))::after {
        content: "";
        font-size: var(--fs-sm, 14px);
      }
      #lobby-place[data-ro-zh-tw-queue] > #lobby-online,
      #lobby-place[data-ro-zh-tw-queue]:not(:has(> #lobby-online))::after {
        display: block;
        block-size: 1.4em;
        line-height: 1.35;
        text-align: left;
        font-variant-numeric: tabular-nums;
      }
      @media (max-width: 480px) {
        #lobby-place[data-ro-zh-tw-queue] { padding-inline: 10px; }
        #lobby-place[data-ro-zh-tw-queue] > #lobby-online,
        #lobby-place[data-ro-zh-tw-queue]:not(:has(> #lobby-online))::after { block-size: 2.7em; overflow: visible; }
      }`;
    document.head.append(gameUiStyle);
    observe();
    updateLanguage();
    translateBossCanvasText();
    void installPetSpeechTranslation().catch(() => { /* A changed game module must not interrupt play. */ });
    try {
      state.database = await openDatabase();
      await readRecords();
      state.ready = true;
      if (typeof BroadcastChannel === 'function') {
        channel = new BroadcastChannel('ro-survivors-zh-tw-v1');
        channel.onmessage = () => void refreshFromOtherTab();
      }
      if (collecting) rescan();
      updatePanel();
    } catch {
      storageFailure('本機資料庫無法開啟。內建翻譯仍可使用。');
    }
    window.addEventListener('pagehide', () => void flush());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) void flush();
    });
  }

  void start().catch((error) => console.warn('[RO Survivors zh-TW] 啟動失敗', error));
  })();
  };

  if (document.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot, { once: true });
  }
})();
