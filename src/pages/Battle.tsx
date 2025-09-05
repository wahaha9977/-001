import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petData } from '@/mocks/petData';
import { Pet } from '@/types/pet';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

   // 战斗状态类型
  type BattleState = 'selecting' | 'battling' | 'finished';
  type BattleMode = 'practice' | 'tower';

  // 战斗角色类型
  type BattleCombatant = {
    pet: Pet;
    health: number;
    maxHealth: number;
  };

  // 战斗动作类型
  type BattleAction = {
    attacker: 'player' | 'enemy' | 'system';
    combatantIndex: number;
    skillIndex: number;
    damage: number;
    isCritical: boolean;
  };

interface BattleProps {
  towerMode?: boolean;
}

export default function Battle({ towerMode = false }: BattleProps) {
  const navigate = useNavigate();
  const { mode } = useParams<{ mode: string }>();
  const battleMode = towerMode ? 'tower' : (mode as BattleMode) || 'practice';
  
   // 爬塔模式特有的状态
  const [currentFloor, setCurrentFloor] = useState(1);
  const [highestFloor, setHighestFloor] = useState(0);
  const [currentTowerHealth, setCurrentTowerHealth] = useState<BattleCombatant[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  // 爬塔模式下电脑宠兽的属性加成百分比
  const [enemyAttributeBonus, setEnemyAttributeBonus] = useState(0);
  // 保存爬塔过程中的宠兽队伍，用于暂时离开后继续使用
  const [savedTowerPets, setSavedTowerPets] = useState<Pet[]>([]);
  
  const [battleState, setBattleState] = useState<BattleState>('selecting');
  const [collectedPets, setCollectedPets] = useState<Pet[]>([]);
  const [selectedPets, setSelectedPets] = useState<Pet[]>([]);
  const [playerTeam, setPlayerTeam] = useState<BattleCombatant[]>([]);
  const [enemyTeam, setEnemyTeam] = useState<BattleCombatant[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player');
  const [battleLog, setBattleLog] = useState<BattleAction[]>([]);
  const [battleResult, setBattleResult] = useState<'win' | 'lose' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // 自动战斗状态
  const [isAutoBattling, setIsAutoBattling] = useState(false);
  
  // 为debug添加的临时状态
  const [debugInfo, setDebugInfo] = useState({
    selectedPetsCount: 0,
    teamLength: 0,
    validSelectedPetsCount: 0
  });

  // 从本地存储获取已收集宠兽
  useEffect(() => {
    const savedCollected = localStorage.getItem('collectedPets');
    if (savedCollected) {
      const collectedIds = JSON.parse(savedCollected);
      const pets = petData
        .filter(pet => collectedIds.includes(pet.id))
        .map(pet => ({ ...pet }));
      setCollectedPets(pets);
      
      // 如果没有足够的宠兽，提示并返回主页
      if (pets.length < 2) {
        toast.error('至少需要2只已收集的宠兽才能进行战斗');
        navigate('/');
      }
    } else {
      toast.error('您还没有收集任何宠兽');
      navigate('/');
    }
  }, [navigate]);

   // 选择宠兽
  const selectPet = (pet: Pet) => {
    setSelectedPets(prev => {
      // 检查宠兽是否已选中
      if (prev.some(p => p.id === pet.id)) {
        // 取消选择
        return prev.filter(p => p.id !== pet.id);
      } else if (prev.length < 2) {
        // 添加选择
        return [...prev, pet];
      } else {
        toast.info('最多只能选择2只宠兽进行战斗');
        return prev;
      }
    });
  };

   // 初始化爬塔模式
  useEffect(() => {
    if (battleMode === 'tower') {
      // 从本地存储加载最高层数记录
      const savedRecord = localStorage.getItem('climbingTowerRecord');
      if (savedRecord) {
        setHighestFloor(parseInt(savedRecord, 10));
      }
      
  // 检查是否有临时保存的进度
      const tempProgress = localStorage.getItem('tempClimbingProgress');
      if (tempProgress) {
        const floor = parseInt(tempProgress, 10);
        setCurrentFloor(floor);
        // 前10层敌方全属性降低20%，之后每层增加1%
        setEnemyAttributeBonus(floor <= 10 ? -20 : (floor - 10) * 1);
        setHasSavedProgress(true);
        
        // 加载保存的宠兽队伍
        const savedPets = localStorage.getItem('savedTowerPets');
        if (savedPets) {
          const parsedPets = JSON.parse(savedPets);
          setSavedTowerPets(parsedPets);
          
          // 如果有保存的宠兽队伍且不是第一层，直接设置为已选择状态
          if (floor > 1 && parsedPets.length >= 2) {
            setSelectedPets(parsedPets);
          }
        }
       } else {
         setCurrentFloor(1);
       setEnemyAttributeBonus(-20); // 第一层敌方全属性降低20%
      setIsAutoBattling(false);
        setHasSavedProgress(false);
        // 清除保存的宠兽队伍
        setSavedTowerPets([]);
      }
    }
  }, [battleMode]);

  // 计算宠兽最大生命值
  const calculateMaxHealth = (pet: Pet): number => {
    // 添加全面的安全检查，确保属性值有效
    if (!pet || !pet.attributes) {
      console.error('Invalid pet data for health calculation', pet);
      return 100; // 默认生命值
    }
    
    const vitality = pet.attributes.vitality || 50;
    const defense = pet.attributes.defense || 50;
    const health = Math.floor((vitality * 2) + (defense / 2));
    return Math.max(1, health); // 确保至少有1点生命值
  };

   // 获取随机敌人宠兽
  const getRandomEnemyPets = (count: number): Pet[] => {
    const savedCollected = localStorage.getItem('collectedPets');
    const collectedIds = savedCollected ? JSON.parse(savedCollected) : [];
    
    // 过滤出未收集的宠兽
    let candidatePets = petData.filter(pet => !collectedIds.includes(pet.id));
    
    // 如果没有足够的未收集宠兽，允许使用已收集的宠兽
    if (candidatePets.length < count) {
      // 添加已收集宠兽但降低其出现概率
      const collectedPets = petData.filter(pet => collectedIds.includes(pet.id));
      candidatePets = [...candidatePets, ...collectedPets.slice(0, count - candidatePets.length)];
    }
    
    // 确保我们有足够的宠兽，如果没有，直接从所有宠兽中随机选择
    if (candidatePets.length < count) {
      const remainingNeeded = count - candidatePets.length;
      const allPetsShuffled = [...petData].sort(() => 0.5 - Math.random());
      const additionalPets = allPetsShuffled.filter(pet => 
        !candidatePets.some(cp => cp.id === pet.id)
      ).slice(0, remainingNeeded);
      
      candidatePets = [...candidatePets, ...additionalPets];
    }
    
    // 随机选择指定数量的宠兽
    const shuffled = [...candidatePets].sort(() => 0.5 - Math.random());
    const selectedPets = shuffled.slice(0, count);
    
    // 如果是爬塔模式，应用属性加成
    if (battleMode === 'tower' && enemyAttributeBonus > 0) {
      return selectedPets.map(pet => ({
        ...pet,
        attributes: {
          strength: Math.floor(pet.attributes.strength * (1 + enemyAttributeBonus / 100)),
          agility: Math.floor(pet.attributes.agility * (1 + enemyAttributeBonus / 100)),
          intelligence: Math.floor(pet.attributes.intelligence * (1 + enemyAttributeBonus / 100)),
          vitality: Math.floor(pet.attributes.vitality * (1 + enemyAttributeBonus / 100)),
          defense: Math.floor(pet.attributes.defense * (1 + enemyAttributeBonus / 100))
        }
      }));
    }
    
    return selectedPets;
  };

   // 开始战斗
  const startBattle = (isNextLevel: boolean = false) => {
    // 确保validSelectedPets在整个函数中可见
    let validSelectedPets = [];
    
    if (!isNextLevel && selectedPets.length < 2) {
      toast.error('请选择2只宠兽进行战斗');
      return;
    }
    
    // 初始化玩家队伍
    let newPlayerTeam: BattleCombatant[] = [];
    
    // 新战斗，使用选中的宠物
    // 完全重写初始化逻辑，确保简单可靠
    if (!selectedPets || !Array.isArray(selectedPets)) {
      console.error('选中的宠兽数据无效');
      toast.error('玩家队伍初始化失败 - 请重新选择宠兽');
      return;
    }
    
    console.log('开始初始化玩家队伍，选中的宠兽数量:', selectedPets.length);
    
    // 检查并确保selectedPets中的每个元素都是有效的Pet对象
    validSelectedPets = selectedPets.filter(pet => {
      // 确保pet对象存在且有必要的属性
      return pet && 
             typeof pet === 'object' && 
             pet.id && 
             pet.name && 
             Array.isArray(pet.type);
    });
    
    console.log('有效宠兽数量:', validSelectedPets.length);
    
    // 直接转换selectedPets为playerTeam，确保每只宠兽都被正确处理
    newPlayerTeam = validSelectedPets.slice(0, 2).map((pet, index) => {
      // 即使pet对象有缺失属性，也创建有效的战斗单位
      const validPet = {
        id: pet?.id || `pet-${Date.now()}-${index}`,
        name: pet?.name || `宠兽${index + 1}`,
        type: pet?.type || ["普通"],
        description: pet?.description || "一只可爱的宠兽",
        imageUrl: pet?.imageUrl || "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Default%20pet%2C%20cartoon%20style%2C%20vibrant%20colors&sign=14d2ee752823dc1dff6fdbafd4d80a85",
        attributes: pet?.attributes || {
          strength: 50,
          agility: 50,
          intelligence: 50,
          vitality: 50,
          defense: 50
        },
        abilities: pet?.abilities || [{ name: "撞击", description: "基础物理攻击" }],
        habitat: pet?.habitat || "未知",
        rarity: pet?.rarity || "common",
        isCollected: true,
        height: pet?.height || "0.5m",
        weight: pet?.weight || "5kg",evolutionStage: pet?.evolutionStage || 1
      };
      
      return {
        pet: validPet,
        health: calculateMaxHealth(validPet),
        maxHealth: calculateMaxHealth(validPet)
      };
    });
    
    // 确保至少有2只宠兽
    while (newPlayerTeam.length < 2) {
      const index = newPlayerTeam.length;
      newPlayerTeam.push({
        pet: {
          id: `backup-${Date.now()}-${index}`,
          name: `后备宠兽${index + 1}`,
          type: ["普通"],
          description: "战斗后备宠兽",
          imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Backup%20battle%20pet%2C%20cartoon%20style%2C%20vibrant%20colors&sign=ec5304f198e712d9cd74429a4e25a71b",
          attributes: { strength: 50, agility: 50, intelligence: 50, vitality: 50, defense: 50 },
          abilities: [{ name: "撞击", description: "基础物理攻击" }],
          habitat: "未知",
          rarity: "common",
          isCollected: true,
          height: "0.5m",
          weight: "5kg",
          evolutionStage: 1
        },
        health: 100,
        maxHealth: 100
      });
    }
    
    console.log('玩家队伍初始化完成，队伍长度:', newPlayerTeam.length);
    
     // 简化验证逻辑，确保队伍有效
    if (newPlayerTeam.length === 0) {
      console.error('玩家队伍初始化失败 - 没有可用的宠兽', {
        teamLength: newPlayerTeam.length,
        selectedPetsCount: selectedPets.length,
        validSelectedPetsCount: validSelectedPets.length,
        validSelectedPets: validSelectedPets
      });
      
      toast.error('玩家队伍初始化失败 - 请先选择宠兽', { duration: 5000 });
      setBattleState('selecting');
      return;
    }
    
    // 额外检查，确保newPlayerTeam中的每个战斗单位都有有效的pet属性
    if (newPlayerTeam.some(combatant => !combatant.pet || typeof combatant.pet !== 'object')) {
      console.error('玩家队伍包含无效的宠兽数据', newPlayerTeam);
      
      // 过滤掉无效的战斗单位
      newPlayerTeam = newPlayerTeam.filter(combatant => combatant.pet && typeof combatant.pet === 'object');
      
      // 再次确保队伍有足够的宠兽
      while (newPlayerTeam.length < 2) {
        const index = newPlayerTeam.length;
        newPlayerTeam.push({
          pet: {
            id: `emergency-${Date.now()}-${index}`,
            name: `应急宠兽${index + 1}`,
            type: ["普通"],
            description: "紧急备用宠兽",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Emergency%20battle%20pet%2C%20cartoon%20style%2C%20vibrant%20colors&sign=3c9bfbafb5b2dc9a569ba865dbdaa8c9",
            attributes: { strength: 50, agility: 50, intelligence: 50, vitality: 50, defense: 50 },
            abilities: [{ name: "撞击", description: "基础物理攻击" }],
            habitat: "未知",
            rarity: "common",
            isCollected: true,
            height: "0.5m",
            weight: "5kg",
            evolutionStage: 1
          },
          health: 100,
          maxHealth: 100
        });
      }
      
      toast.warning('部分宠兽数据无效，已使用备用宠兽替代', { duration: 5000 });
    }
    
     // 确保至少有2只宠兽
    while (newPlayerTeam.length < 2) {
      const index = newPlayerTeam.length;
      const randomIndex = Math.floor(Math.random() * selectedPets.length);
      const fallbackPet = selectedPets[randomIndex];
      
      if (fallbackPet) {
        // 直接使用原始选中的宠兽，不经过严格验证
        newPlayerTeam.push({
          pet: fallbackPet,
          health: calculateMaxHealth(fallbackPet),
          maxHealth: calculateMaxHealth(fallbackPet)
        });
      } else {
        // 如果实在没有，创建一个默认宠兽
        newPlayerTeam.push({
          pet: {
            id: `fallback-${Date.now()}-${index}`,
            name: `默认宠兽${index + 1}`,
            type: ["普通"],
            description: "默认战斗宠兽",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Default%20battle%20pet%2C%20cartoon%20style%2C%20vibrant%20colors&sign=aab9631772274b31401e3bd500d4b72e",
            attributes: { strength: 50, agility: 50, intelligence: 50, vitality: 50, defense: 50 },
            abilities: [{ name: "撞击", description: "基础物理攻击" }],
            habitat: "未知",
            rarity: "common",
            isCollected: true,
            height: "0.5m",
            weight: "5kg",
            evolutionStage: 1
          },
          health: 100,
          maxHealth: 100
        });
      }
    }
    
    console.log('玩家队伍最终长度:', newPlayerTeam.length);
    
    setPlayerTeam(newPlayerTeam);
    
    // 随机选择2只未收集的宠兽作为敌人
    const enemyPets = getRandomEnemyPets(2);
    
    // 确保敌人队伍有效
    if (enemyPets.length < 2) {
      toast.error('无法生成敌人队伍，请稍后再试');
      return;
    }
    
    const enemyTeam: BattleCombatant[] = enemyPets.map(pet => ({
      pet,
      health: calculateMaxHealth(pet),
      maxHealth: calculateMaxHealth(pet)
    }));
    
    // 初始化战斗状态
    setEnemyTeam(enemyTeam);
    
     // 添加战斗开始日志
    setBattleLog([{
      attacker: 'system',
      combatantIndex: -1,
      skillIndex: -1,
      damage: 0,
      isCritical: false
    }]);
    
    // 设置debug信息
    setDebugInfo({
      selectedPetsCount: selectedPets.length,
      teamLength: newPlayerTeam.length,
      validSelectedPetsCount: validSelectedPets.length
    });
    
      // 设置战斗状态并初始化战斗流程
    setBattleState('battling');
    // 开启自动战斗时，让敌方先攻击
    setCurrentTurn(isAutoBattling ? 'enemy' : 'player');
    setIsAnimating(false);
    
    // 如果开启了自动战斗且当前是玩家回合，立即执行自动战斗
    // 开启自动战斗时，立即执行自动攻击
    if (isAutoBattling) {
      setTimeout(() => {
        executeAutoPlayerTurn();
      }, 500);
    }
    
    // 保存当前队伍的生命值状态，用于爬塔模式
    if (battleMode === 'tower' && currentFloor === 1) {
      setCurrentTowerHealth(newPlayerTeam);
    }
    
    toast.success(battleMode === 'tower' ? `${currentFloor}层战斗开始！` : '战斗开始！');
  };

   // 执行玩家技能
  const executePlayerSkill = (combatantIndex: number, skillIndex: number) => {
    if (currentTurn !== 'player' || isAnimating) return;
    
    const playerCombatant = playerTeam[combatantIndex];
    if (!playerCombatant || playerCombatant.health <= 0) return;
    
    // 计算效果（伤害或治疗）
    const effectInfo = calculateEffect(
      playerCombatant.pet, 
      enemyTeam[0].pet, // 回复技能不需要实际的防御者数据
      skillIndex
    );
    
   if (effectInfo.isHealSkill) {
      // 处理回复技能
      const newPlayerTeam = [...playerTeam];
      
      // 检查是否是潮汐鲸皇的海洋祝福技能，为自己和所有队友回复生命值
      const isOceanBlessing = playerCombatant.pet.id === '4' && 
                            playerCombatant.pet.abilities[skillIndex].name === '海洋祝福';
      
      if (isOceanBlessing) {
        // 为所有存活的队友回复生命值，包括自己
        const alivePlayers = newPlayerTeam.filter(p => p.health > 0);
        alivePlayers.forEach((_, index) => {
          const playerIndex = newPlayerTeam.findIndex(p => p.pet.id === alivePlayers[index].pet.id);
          const currentHealth = newPlayerTeam[playerIndex].health;
          const maxHealth = newPlayerTeam[playerIndex].maxHealth;
          
          // 海洋祝福技能的治疗量增加50%
          const oceanBlessingHeal = Math.floor(effectInfo.heal * 1.5);
          
          // 应用治疗效果，不超过最大生命值
          newPlayerTeam[playerIndex].health = Math.min(currentHealth + oceanBlessingHeal, maxHealth);
        });
      } else {
        // 普通治疗技能，只为自己回复生命值
        const currentHealth = newPlayerTeam[combatantIndex].health;
        const maxHealth = newPlayerTeam[combatantIndex].maxHealth;
        
        // 应用治疗效果，不超过最大生命值
        newPlayerTeam[combatantIndex].health = Math.min(currentHealth + effectInfo.heal, maxHealth);
      }
      
      setPlayerTeam(newPlayerTeam);
      
      // 添加战斗日志 - 治疗版本
      const action: BattleAction = {
        attacker: 'player',
        combatantIndex,
        skillIndex,
        damage: -effectInfo.heal, // 使用负伤害表示治疗
        isCritical: effectInfo.isCritical
      };
      
      setBattleLog(prev => [...prev, action]);
      
      // 切换到敌人回合
      setIsAnimating(true);
      setTimeout(() => {
        executeEnemyTurn();
        setIsAnimating(false);
      }, 1500);
    } else {
      // 处理伤害技能
      // 随机选择一个敌人目标
      const aliveEnemies = enemyTeam.filter(e => e.health > 0);
      if (aliveEnemies.length === 0) return;
      
      const targetIndex = Math.floor(Math.random() * aliveEnemies.length);
      
      // 应用伤害
      const newEnemyTeam = [...enemyTeam];
      newEnemyTeam[enemyTeam.findIndex(e => e.pet.id === aliveEnemies[targetIndex].pet.id)].health -= effectInfo.damage;
      
      // 确保生命值不为负
      newEnemyTeam.forEach(enemy => {
        if (enemy.health < 0) enemy.health = 0;
      });
      
      setEnemyTeam(newEnemyTeam);
      
      // 添加战斗日志
      const action: BattleAction = {
        attacker: 'player',
        combatantIndex,
        skillIndex,
        damage: effectInfo.damage,
        isCritical: effectInfo.isCritical
      };
      
      setBattleLog(prev => [...prev, action]);
      
      // 检查战斗是否结束
      if (newEnemyTeam.every(enemy => enemy.health <= 0)) {
        endBattle('win');
        // 不再在胜利时关闭自动战斗
        return;
      }
      
      // 切换到敌人回合
      setIsAnimating(true);
      setTimeout(() => {
        executeEnemyTurn();
        setIsAnimating(false);
      }, 1500);
    }
  };

   // 执行敌人回合
  const executeEnemyTurn = () => {
    if (isAnimating) return;
    
    // 检查是否所有玩家宠兽都已死亡
    if (playerTeam.every(p => p.health <= 0)) {
      endBattle('lose');
      return;
    }
    
    // 随机选择一个活着的敌人
    const aliveEnemies = enemyTeam.filter(e => e.health > 0);
    if (aliveEnemies.length === 0) return;
    
    const enemyIndex = Math.floor(Math.random() * aliveEnemies.length);
    const enemyCombatant = aliveEnemies[enemyIndex];
    
    // 随机选择一个技能
    const skillIndex = Math.floor(Math.random() * enemyCombatant.pet.abilities.length);
    
    // 计算效果（伤害或治疗）
    const effectInfo = calculateEffect(
      enemyCombatant.pet,
      playerTeam[0].pet, // 回复技能不需要实际的防御者数据
      skillIndex
    );
    
    if (effectInfo.isHealSkill) {
      // 处理敌人的回复技能
      const newEnemyTeam = [...enemyTeam];
      const currentHealth = newEnemyTeam[enemyIndex].health;
      const maxHealth = newEnemyTeam[enemyIndex].maxHealth;
      
      // 应用治疗效果，不超过最大生命值
      newEnemyTeam[enemyIndex].health = Math.min(currentHealth + effectInfo.heal, maxHealth);
      
      setEnemyTeam(newEnemyTeam);
      
      // 添加战斗日志 - 治疗版本
      const action: BattleAction = {
        attacker: 'enemy',
        combatantIndex: enemyTeam.findIndex(e => e.pet.id === enemyCombatant.pet.id),
        skillIndex,
        damage: -effectInfo.heal, // 使用负伤害表示治疗
        isCritical: effectInfo.isCritical
      };
      
      setBattleLog(prev => [...prev, action]);
    } else {
      // 处理敌人的伤害技能
      // 随机选择一个玩家目标
      const alivePlayers = playerTeam.filter(p => p.health > 0);
      if (alivePlayers.length === 0) return;
      
      const targetIndex = Math.floor(Math.random() * alivePlayers.length);
      
      // 应用伤害
      const newPlayerTeam = [...playerTeam];
      newPlayerTeam[playerTeam.findIndex(p => p.pet.id === alivePlayers[targetIndex].pet.id)].health -= effectInfo.damage;
      
      // 确保生命值不为负
      newPlayerTeam.forEach(player => {
        if (player.health < 0) player.health = 0;
      });
      
      setPlayerTeam(newPlayerTeam);
      
      // 添加战斗日志
      const action: BattleAction = {
        attacker: 'enemy',
        combatantIndex: enemyTeam.findIndex(e => e.pet.id === enemyCombatant.pet.id),
        skillIndex,
        damage: effectInfo.damage,
        isCritical: effectInfo.isCritical
      };
      
      setBattleLog(prev => [...prev, action]);
      
      // 检查战斗是否结束
       if (newPlayerTeam.every(player => player.health <= 0)) {
        endBattle('lose');
        // 失败时关闭自动战斗
        setIsAutoBattling(false);
        return;
      }
    }
    
    // 切换回玩家回合
    setIsAnimating(false);
    setCurrentTurn('player');
    
    // 如果开启自动战斗，继续执行玩家回合
    if (isAutoBattling) {
      setTimeout(() => {
        executeAutoPlayerTurn();
      }, 500);
    }
  };

    // 计算伤害或治疗值
  const calculateEffect = (
    attacker: Pet, 
    defender: Pet, 
    skillIndex: number
  ): { damage: number; heal: number; isCritical: boolean; isHealSkill: boolean } => {
    // 获取技能
    const skill = attacker.abilities[skillIndex] || { name: '普通攻击', description: '普通的攻击' };
    
     // 检查是否为回复技能（通过描述中包含"恢复"、"治愈"等关键词判断）
    const isHealSkill = skill.description.includes('恢复') || 
                      skill.description.includes('治愈') ||
                      skill.description.includes('治疗') ||
                      skill.name.includes('恢复') ||
                      skill.name.includes('治愈') ||
                      skill.name.includes('治疗') ||
                      skill.description.includes('回复');
    
    if (isHealSkill) {
       // 回复技能逻辑
      let intelligence = attacker.attributes.intelligence;
      
      // 如果宠兽好感度达到100，增加10%属性
      if (attacker.favorability >= 100) {
        intelligence = Math.floor(intelligence * 1.1);
      }
      
      // 传说宠兽全属性增加10%
      if (attacker.rarity === 'legendary') {
        intelligence = Math.floor(intelligence * 1.1);
      }
      
      // 特殊宠兽全属性增加30%
      if (attacker.rarity === 'special') {
        intelligence = Math.floor(intelligence * 1.3);
      }
      
      // 基础治疗基于智力和技能索引
      let heal = Math.floor(intelligence * 0.8) + (skillIndex + 1) * 3;
      
      // 随机暴击治疗几率 (15%)
      const isCritical = Math.random() < 0.15;
      if (isCritical) {
        heal = Math.floor(heal * 1.5);
      }
      
      return { damage: 0, heal, isCritical, isHealSkill: true };
    } else {
      // 伤害技能逻辑
      let strength = attacker.attributes.strength;
      let defense = defender.attributes.defense;
      
      // 如果宠兽好感度达到100，增加10%属性
      if (attacker.favorability >= 100) {
        strength = Math.floor(strength * 1.1);
      }
      
      if (defender.favorability >= 100) {
        defense = Math.floor(defense * 1.1);
      }
      
      // 传说宠兽全属性增加10%
      if (attacker.rarity === 'legendary') {
        strength = Math.floor(strength * 1.1);
      }
      
      // 特殊宠兽全属性增加30%
      if (attacker.rarity === 'special') {
        strength = Math.floor(strength * 1.3);
      }
      
      // 防御方属性加成
      if (defender.rarity === 'legendary') {
        defense = Math.floor(defense * 1.1);
      }
      
      if (defender.rarity === 'special') {
        defense = Math.floor(defense * 1.3);
      }
      
      let damage = strength + (skillIndex + 1) * 5;
      
      // 考虑防御减免
      const defenseReduction = defense / 4;
      damage = Math.max(1, Math.floor(damage - defenseReduction));
      
      // 随机暴击几率 (15%)
      const isCritical = Math.random() < 0.15;
      if (isCritical) {
        damage = Math.floor(damage * 1.5);
      }
      
      return { damage, heal: 0, isCritical, isHealSkill: false };
    }
  };

     // 结束战斗
   const endBattle = (result: 'win' | 'lose') => {
    setBattleResult(result);
    setBattleState('finished');
    
    if (battleMode === 'tower') {
      if (result === 'win') {
        // 爬塔胜利
        const newFloor = currentFloor + 1;
        
        // 如果达到新的最高记录，更新记录
        if (newFloor - 1 > highestFloor) {
          setHighestFloor(newFloor - 1);
          localStorage.setItem('climbingTowerRecord', (newFloor - 1).toString());
        }
        
    // 新增金币奖励：每通关一层获得10金币
    const coinReward = 10;
    const currentCoins = parseInt(localStorage.getItem('storeCoins') || '0', 10);
    const newCoins = currentCoins + coinReward;
    localStorage.setItem('storeCoins', newCoins.toString());
    
        toast.success(`🎉 太棒了！你成功征服了第${currentFloor}层！
🏆 你的爬塔记录已更新为${newFloor - 1}层！
💰 获得了${coinReward}金币奖励！
 💪 下一层敌人属性将${enemyAttributeBonus + 1 > 0 ? `提升${enemyAttributeBonus + 1}%` : `降低${Math.abs(enemyAttributeBonus + 1)}%`}！
⚔️ 准备好迎接第${newFloor}层的挑战了吗？`);
        
        // 如果开启了自动战斗，延迟2秒后自动进入下一层
        if (isAutoBattling) {
          setTimeout(() => {
            goToNextFloor();
          }, 2000);
        }
      } else {
        // 爬塔失败
        toast.error(`😭 挑战失败！你在第${currentFloor}层遇到了强大的对手。
💪 不要灰心，分析战斗经验，下次一定能走得更远！`);
      }
    } else {
      // 练习对战
      if (result === 'win') {
        toast.success(`练习对战胜利！没有金币奖励。`);
      }
    }
  };

   // 返回主菜单
  const returnToMainMenu = () => {
    navigate('/');
  };

   // 自动战斗：执行玩家回合
   const executeAutoPlayerTurn = () => {
    if (currentTurn !== 'player' || isAnimating || !isAutoBattling) return;
    
    // 随机选择一个活着的玩家宠兽
    const alivePlayers = playerTeam.filter(p => p.health > 0);
    if (alivePlayers.length === 0) return;
    
    // 智能选择最优宠兽：优先选择血量较多的宠兽
    const sortedPlayers = [...alivePlayers].sort((a, b) => b.health - a.health);
    const playerCombatant = sortedPlayers[0];
    const playerIndex = playerTeam.findIndex(p => p.pet?.id === playerCombatant.pet?.id);
    
    // 智能选择技能：优先选择攻击力高的技能
    const skillIndex = selectOptimalSkill(playerCombatant);
    
    // 自动执行技能
    setTimeout(() => {
      executePlayerSkill(playerIndex, skillIndex);
    }, 500);
  };
  
  // 智能选择最优技能
  const selectOptimalSkill = (combatant: BattleCombatant): number => {
    // 获取所有可用技能
    const abilities = combatant.pet.abilities;
    
    // 智能判断选择哪种技能
    // 1. 如果血量很低，优先选择治疗技能
    if (combatant.health < combatant.maxHealth * 0.3) {
      for (let i = 0; i < abilities.length; i++) {
        if (isHealSkill(abilities[i])) {
          return i;
        }
      }
    }
    
    // 2. 优先选择造成伤害高的技能
    // 简单实现：优先选择有"大量"、"全体"、"巨量"等关键词的技能
    for (let i = 0; i < abilities.length; i++) {
      const ability = abilities[i];
      if (!isHealSkill(ability) && (
        ability.description.includes('大量') || 
        ability.description.includes('全体') || 
        ability.description.includes('巨量') ||
        ability.name.includes('!')
      )) {
        return i;
      }
    }
    
    // 3. 默认选择第一个非治疗技能
    for (let i = 0; i < abilities.length; i++) {
      if (!isHealSkill(abilities[i])) {
        return i;
      }
    }
    
    // 4. 如果没有非治疗技能，返回第一个技能
    return 0;
  };
  
  // 判断是否为治疗技能
  const isHealSkill = (ability: { name: string; description: string }): boolean => {
    return ability.description.includes('恢复') || 
           ability.description.includes('治愈') ||
           ability.description.includes('治疗') ||
           ability.description.includes('回复') ||
           ability.name.includes('恢复') ||
           ability.name.includes('治愈') ||
           ability.name.includes('治疗') ||
           ability.name.includes('回复');
  };

  // 切换自动战斗状态
  const toggleAutoBattle = () => {
    if (battleMode !== 'tower') {
      toast.info('自动战斗仅在爬塔模式下可用');
      return;
    }
    
    // 立即更新自动战斗状态，而不是在回调中
    const newState = !isAutoBattling;
    setIsAutoBattling(newState);
    
    if (newState) {
      toast.success('已开启自动战斗，立即开始自动攻击！无需点击技能，战斗将自动进行');
      // 如果当前是玩家回合，立即执行一次自动战斗
      if (currentTurn === 'player' && battleState === 'battling') {
        executeAutoPlayerTurn();
      } else if (currentTurn === 'enemy' && battleState === 'battling') {
        // 如果当前是敌方回合，让敌方先攻击
        executeEnemyTurn();
      }
    } else {
      toast.info('已关闭自动战斗');
    }
  };

  // 重新战斗
  const restartBattle = () => {
    setSelectedPets([]);
    setBattleState('selecting');
    
    // 爬塔模式下，重置当前层数为1，但保留最高记录
     if (battleMode === 'tower') {
      setCurrentFloor(1);
      // 清除临时保存的进度
      localStorage.removeItem('tempClimbingProgress');
      localStorage.removeItem('savedTowerPets');
      setHasSavedProgress(false);
      // 重置敌人属性加成
      setEnemyAttributeBonus(0);
    }
  };

   // 进入下一层（爬塔模式）
  const goToNextFloor = () => {
    // 更新下一层的敌人属性加成
    // 前10层敌方全属性降低20%，之后每层增加1%
    setEnemyAttributeBonus(prev => {
      const newFloor = currentFloor + 1;
      return newFloor <= 10 ? -20 : (newFloor - 10) * 1;
    });
    
    // 保存当前的宠兽队伍，用于暂时离开后继续使用
    if (playerTeam.length > 0) {
      const currentPets = playerTeam.map(combatant => combatant.pet);
      setSavedTowerPets(currentPets);
      localStorage.setItem('savedTowerPets', JSON.stringify(currentPets));
    }
    
    // 恢复玩家队伍的生命值
    setPlayerTeam(prev => prev.map(combatant => ({
      ...combatant,
      health: combatant.maxHealth
    })));
    
    // 进入下一层
    setCurrentFloor(prev => prev + 1);
    setBattleState('battling');
    setBattleLog([{
      attacker: 'system',
      combatantIndex: -1,
      skillIndex: -1,
      damage: 0,
      isCritical: false
    }]);
    setIsAnimating(false);
    setBattleResult(null);
    
    // 随机生成下一层的敌人
    const enemyPets = getRandomEnemyPets(2);
    const enemyTeam: BattleCombatant[] = enemyPets.map(pet => ({
      pet,
      health: calculateMaxHealth(pet),
      maxHealth: calculateMaxHealth(pet)
    }));
    setEnemyTeam(enemyTeam);
    
    toast.success(`${currentFloor + 1}层战斗开始！`);
    
   // 自动进入下一层后，如果开启了自动战斗，立即执行自动攻击
    if (isAutoBattling) {
      setCurrentTurn('player');
      // 确保状态已更新后再执行
      setTimeout(() => {
        executeAutoPlayerTurn();
      }, 500);
    }
  };

  // 获取宠兽类型的颜色
  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      '火': 'bg-red-100 text-red-800',
      '水': 'bg-blue-100 text-blue-800',
      '草': 'bg-green-100 text-green-800',
      '电': 'bg-yellow-100 text-yellow-800',
      '冰': 'bg-cyan-100 text-cyan-800',
      '格斗': 'bg-orange-100 text-orange-800',
      '毒': 'bg-purple-100 text-purple-800',
      '地面': 'bg-amber-100 text-amber-800',
      '飞行': 'bg-indigo-100 text-indigo-800',
      '超能力': 'bg-pink-100 text-pink-800',
      '虫': 'bg-lime-100 text-lime-800',
      '岩石': 'bg-stone-100 text-stone-800',
      '幽灵': 'bg-violet-100 text-violet-800',
      '龙': 'bg-rose-100 text-rose-800',
      '钢': 'bg-slate-100 text-slate-800',
      '妖精': 'bg-fuchsia-100 text-fuchsia-800',
      '暗': 'bg-gray-100 text-gray-800',
      '普通': 'bg-gray-100 text-gray-800'
    };
    
    return typeColors[type] || 'bg-gray-100 text-gray-800';
  };

  // 获取稀有度颜色
  const getRarityColor = (rarity: string): string => {
    switch(rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取稀有度名称
   const getRarityName = (rarity: string): string => {
    switch(rarity) {
      case 'common': return '普通';
      case 'uncommon': return '高级';
      case 'rare': return '稀有';
      case 'epic': return '史诗';
      case 'legendary': return '传说';
      default: return '未知';
    }
  };

  return (
     <div className="min-h-screen relative overflow-hidden bg-cover bg-center" style={{ 
       backgroundImage: `url('https://lf-code-agent.coze.cn/obj/x-ai-cn/272890065666/attachment/701718aa180249e29feda62f231c429e~tplv-a9rns2rl98-web-thumb-wm-avif_20250904165433.webp')`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundAttachment: 'fixed'
     }}>
      {/* 添加半透明遮罩层，确保文字清晰可读 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* 调试信息区域（临时添加，仅用于开发环境） */}
       {/* 开发环境调试信息 */}
      <div className="hidden bg-gray-100 text-gray-800 py-1 px-4 text-xs">
        <div className="container mx-auto">
          <span>调试: 选中宠兽数量: {debugInfo.selectedPetsCount}, 队伍长度: {debugInfo.teamLength}, 有效宠兽: {debugInfo.validSelectedPetsCount}</span>
        </div>
      </div>
      
       {/* 顶部导航栏 - 调整为半透明背景以适配新背景 */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/battle')}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            <span>返回</span>
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">
            {battleMode === 'tower' ? `爬塔对战 - ${currentFloor}层` : '宠兽对战'}
          </h1>
          
          <div className="text-sm text-gray-500">
            {battleState === 'selecting' && '选择出战宠兽'}
            {battleState === 'battling' && '战斗中...'}
            {battleState === 'finished' && '战斗结束'}
          </div>
        </div>
      </header>
       
     
       
       <main className="container mx-auto px-4 py-8 relative z-10">
        {/* 宠兽选择界面 */}
        {battleState === 'selecting' && (
          <div className="max-w-4xl mx-auto">
             <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">选择出战宠兽</h2>
              <p className="text-gray-700 mb-6">请选择两只已收集的宠兽进行战斗</p>
              
               {collectedPets.length < 2 ? (
                <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100">
                  <i className="fa-solid fa-exclamation-circle text-3xl text-yellow-500 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">宠兽数量不足</h3>
                  <p className="text-gray-700 mb-6">您需要至少收集2只宠兽才能进行战斗</p>
                  <button
                    onClick={() => navigate('/gacha')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                  >
                    <i className="fa-solid fa-gift mr-2"></i> 去抽卡获取宠兽
                  </button>
                </div>
              ) : (
                <>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {collectedPets.map(pet => (
                      <div 
                        key={pet.id}
                        className={cn(
                          "bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border transition-all duration-300 hover:shadow-lg cursor-pointer",
                          selectedPets.some(p => p.id === pet.id) 
                            ? "border-blue-500 ring-2 ring-blue-200" 
                            : "border-gray-100"
                        )}
                        onClick={() => selectPet(pet)}
                      >
                        <div className="flex">
                          {/* 宠兽图片 */}
                          <div className="w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-3">
                            <img 
                              src={pet.imageUrl} 
                              alt={pet.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          
                          {/* 宠兽信息 */}
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(pet.rarity)}`}>
                                {getRarityName(pet.rarity)}
                              </span>
                            </div>
                            
                            {/* 类型标签 */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {pet.type.map(type => (
                                <span 
                                  key={type} 
                                  className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(type)}`}
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                            
           {/* 属性简要展示 */}
                            <div className="grid grid-cols-3 gap-1 text-xs">
                              <div className="flex items-center gap-1">
                                <i className="fa-solid fa-bolt text-amber-500"></i>
                                <span className="font-medium">{pet.attributes.strength}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <i className="fa-solid fa-heart text-red-500"></i>
                                <span className="font-medium">{calculateMaxHealth(pet)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <i className="fa-solid fa-shield text-blue-500"></i>
                                <span className="font-medium">{pet.attributes.defense}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {selectedPets.some(p => p.id === pet.id) && (
                          <div className="bg-blue-50 px-3 py-2 text-xs text-blue-700 flex items-center justify-center">
                            <i className="fa-solid fa-check-circle mr-1"></i>
                            <span>已选择</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={startBattle}
                      disabled={selectedPets.length !== 2}
                      className={cn(
                        "inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium transition-all duration-300",
                        selectedPets.length === 2
                          ? "bg-red-600 text-white hover:bg-red-700 transform hover:scale-105"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <i className="fa-solid fa-play mr-2"></i> 开始战斗
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      
        {/* 战斗界面 */}
        {battleState === 'battling' && (
          <div className="max-w-4xl mx-auto">
            {/* 敌人队伍 */}
            <div className="mb-8">
               <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <i className="fa-solid fa-robot mr-2 text-gray-300"></i> 电脑对手
              </h2>
               
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enemyTeam.map((combatant, index) => (
                  <div key={combatant.pet.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="p-4 flex items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                        <img 
                          src={combatant.pet.imageUrl} 
                          alt={combatant.pet.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{combatant.pet.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(combatant.pet.rarity)}`}>
                            {getRarityName(combatant.pet.rarity)}
                          </span>
                        </div>
                        
                        {/* 类型标签 */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {combatant.pet.type.map(type => (
                            <span 
                              key={type} 
                              className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(type)}`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                        
                        {/* 生命值条 */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              combatant.health > 50 ? 'bg-green-500' : 
                              combatant.health > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(combatant.health / combatant.maxHealth) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>生命值</span>
                          <span>{combatant.health}/{combatant.maxHealth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
              {/* 玩家队伍 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                 <i className="fa-solid fa-user mr-2 text-blue-400"></i> 你的队伍
                 {/* 自动战斗按钮 - 只在爬塔模式显示 */}
                 {battleMode === 'tower' && battleState === 'battling' && (
                    <button
                     onClick={toggleAutoBattle}
                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                       isAutoBattling 
                         ? 'bg-green-600 text-white hover:bg-green-700' 
                         : 'bg-blue-600 text-white hover:bg-blue-700'
                     }`}
                     title="开启后无需手动点击技能，系统将自动选择最优技能进行战斗"
                   >
                     <i className={`fa-solid mr-2 ${isAutoBattling ? 'fa-pause' : 'fa-play'}`}></i>
                     {isAutoBattling ? '暂停自动战斗' : '自动战斗'}
                   </button>
                 )}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {playerTeam.length > 0 ? (
                  playerTeam.map((combatant, index) => (
                    <div key={`player-${index}-${combatant.pet?.id || index}`} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200">
                      <div className="p-4 flex items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                          {combatant.pet ? (
                            <img 
                              src={combatant.pet.imageUrl} 
                              alt={combatant.pet.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <i className="fa-solid fa-question-circle text-2xl"></i>
                            </div>
                          )}
                        </div>
                      
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {combatant.pet?.name || '未知宠兽'}
                            </h3>
                            {combatant.pet && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(combatant.pet.rarity)}`}>
                                {getRarityName(combatant.pet.rarity)}
                              </span>
                            )}
                          </div>
                        
                          {/* 类型标签 */}
                          {combatant.pet && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {combatant.pet.type.map(type => (
                                <span 
                                  key={type} 
                                  className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(type)}`}
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          )}
                        
                          {/* 生命值条 */}
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                combatant.health > 50 ? 'bg-green-500' : 
                                combatant.health > 20 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${(combatant.health / combatant.maxHealth) * 100}%` }}
                            ></div>
                          </div>
                        
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>生命值</span>
                            <span>{combatant.health}/{combatant.maxHealth}</span>
                          </div>
                        </div>
                      </div>
                    
                      {/* 技能按钮 */}
                      <div className="bg-gray-50 p-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">选择技能</h4>
                         <div className="grid grid-cols-2 gap-3">
                          {combatant.pet?.abilities ? (
                            combatant.pet.abilities.map((ability, skillIndex) => (
                              <button
                                key={skillIndex}
                                onClick={() => executePlayerSkill(index, skillIndex)}
                                disabled={combatant.health <= 0 || currentTurn !== 'player' || isAnimating}
                                className={cn(
                                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 transform active:scale-95",
                                  combatant.health <= 0 || currentTurn !== 'player' || isAnimating
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                )}
                              >
                                {ability.name}
                              </button>
                            ))
                          ) : (
                            <div className="col-span-2 text-center py-3 text-gray-500 text-sm">
                              无法加载技能数据
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
                    <i className="fa-solid fa-exclamation-circle text-2xl text-yellow-500 mb-2"></i>
                    <p className="text-gray-600">玩家队伍数据加载失败</p>
                    <button 
                      onClick={() => setBattleState('selecting')}
                      className="mt-4 text-blue-600 hover:text-blue-800"
                    >
                      返回重新选择宠兽
                    </button>
                  </div>
                )}
              </div>
            </div>
            
             {/* 战斗日志 */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">战斗日志</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {battleLog.length === 0 ? (
                     <div className="text-center text-gray-500 italic">战斗尚未开始...</div>
                   ) : (
                   <ul className="space-y-3">
                      {battleLog.slice(-5).map((action, index) => {
                        // 处理系统消息
                        if (action.attacker === 'system') {
                          return (
                            <li key={index} className="text-center">
                              <p className="text-gray-500 italic">战斗即将开始！准备战斗吧！</p>
                            </li>
                          );
                        }
                        
                        const combatant = action.attacker === 'player' 
                          ? playerTeam[action.combatantIndex]
                          : enemyTeam[action.combatantIndex];
                        
                        if (!combatant || !combatant.pet) {
                          return (
                            <li key={index} className="text-center text-gray-500 italic">
                              战斗正在进行中...
                            </li>
                          );
                        }
                        
                        const skill = combatant.pet.abilities[action.skillIndex] || { name: '普通攻击' };
                        
                        return (
                       <li key={index} className="flex items-start">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                              action.attacker === 'player' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                            }`}>
                              <i className={action.attacker === 'player' ? "fa-solid fa-user" : "fa-solid fa-robot"}></i>
                            </div>
                            
                            <div>
                              <p className="text-gray-900">
                                <span className={action.attacker === 'player' ? 'text-blue-600 font-medium' : 'text-red-600 font-medium'}>
                                  {combatant.pet.name}
                                </span>
                                使用了
                                <span className="font-medium text-gray-900 ml-1 mr-1">{skill.name}</span>
                                {action.isCritical && (
                                  <span className={`ml-1 ${action.damage < 0 ? 'text-green-600' : 'text-red-600'} font-bold`}>
                                    <i className="fa-solid fa-star mr-1"></i>{action.damage < 0 ? '强效治疗!' : '暴击!'}
                                  </span>
                                )}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {action.damage < 0 
                                  ? `恢复了 ${Math.abs(action.damage)} 点生命值` 
                                  : `造成了 ${action.damage} 点伤害`
                                }
                              </p>
                            </div>
                          </li>
                        );
                      })}
                   </ul>
                 )}
              </div>
            </div>
          </div>
        )}
        
         {/* 战斗结束界面 */}
        {battleState === 'finished' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className={cn(
              "bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-gray-100",
              battleResult === 'win' ? "border-green-200" : "border-red-200"
            )}>
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                battleResult === 'win' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                <i className={cn(
                  "fa-solid text-4xl",
                  battleResult === 'win' ? "fa-trophy" : "fa-times-circle"
                )}></i>
              </div>
              
               <h2 className={cn(
                "text-2xl font-bold mb-4",
                battleResult === 'win' ? "text-green-600" : "text-red-600"
              )}>
                {battleResult === 'win' ? "战斗胜利!" : "战斗失败"}
              </h2>
              
                 <p className="text-gray-700 mb-8">
                 {battleMode === 'tower' ? (
                   battleResult === 'win' 
                     ? `🎉 恭喜你成功通过了第${currentFloor}层！
你的坚持和策略让你不断突破自我！现在准备好挑战更高楼层吧！` 
                     : `😭 很遗憾，你在第${currentFloor}层遇到了强大的对手。
不要灰心，每一次挑战都是成长的机会，下次一定能走得更远！`
                 ) : (
                battleResult === 'win' 
                     ? "恭喜你赢得了练习对战！练习模式无金币奖励，可通过爬塔模式获得金币。" 
                     : "很遗憾，你被电脑对手击败了。再接再厉!"
                 )}
                </p>
               
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 {battleMode === 'tower' ? (
                   <>
                     {battleResult === 'win' && currentFloor > 0 && (
                        <button
                          onClick={goToNextFloor}
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                        >
                          <i className="fa-solid fa-arrow-right mr-2"></i> 下一层
                        </button>
                      )}
                      
                      {/* 如果开启了自动战斗，自动进入下一层 */}
                      {battleResult === 'win' && isAutoBattling && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-lg font-medium">自动进入下一层...</p>
                          </div>
                        </div>
                      )}
                      
                       {/* 战斗失败时只显示重新爬塔和返回主菜单 */}
                      {battleResult === 'lose' ? (
                        <button
                          onClick={restartBattle}
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                        >
                          <i className="fa-solid fa-redo mr-2"></i> 重新爬塔
                        </button>
                      ) : (
                        <>
                          <button
                           onClick={() => {
                             localStorage.setItem('tempClimbingProgress', currentFloor.toString());
                             
                             // 保存当前的宠兽队伍，用于下次继续使用
                             if (playerTeam.length > 0 && currentFloor > 1) {
                               const currentPets = playerTeam.map(combatant => combatant.pet);
                               localStorage.setItem('savedTowerPets', JSON.stringify(currentPets));
                             }
                             
                             toast.success('进度已保存，您可以稍后继续挑战！');
                             navigate('/battle');
                           }}
                           className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                         >
                           <i className="fa-solid fa-save mr-2"></i> 暂时离开
                         </button>
                         
                         <button
                           onClick={restartBattle}
                           className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                         >
                           <i className="fa-solid fa-redo mr-2"></i> 重新爬塔
                         </button>
                       </>
                     )}
                   </>
                 ) : (
                   <button
                     onClick={restartBattle}
                     className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                   >
                     <i className="fa-solid fa-redo mr-2"></i> 再来一局
                   </button>
                 )}
                 
                 <button
                   onClick={returnToMainMenu}
                   className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors"
                 >
                   <i className="fa-solid fa-home mr-2"></i> 返回主菜单
                 </button>
               </div></div>
          </div>
        )}
      </main>
    </div>
  );
}