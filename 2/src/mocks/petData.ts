import { Pet } from '@/types/pet';

export const petData: Pet[] = [
  {
    id: '1',
    name: '火焰灵猫',
    type: ['火', '普通'],
    description: '火焰灵猫是一种生活在火山地区的神秘生物，它们的身体能自然产生热量，尾巴末端总是燃烧着不灭的火焰。它们性格活泼好动，对人类友好，是初学者理想的伙伴。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Fire%20cat%20monster%2C%20flaming%20tail%2C%20mystical%20eyes%2C%20vibrant%20colors%2C%20digital%20art&sign=e9d86b2836179e191ff929503c9b60c6',
    attributes: {
      strength: 65,
      agility: 85,
      intelligence: 70,
      vitality: 60,
      defense: 55
    },
    abilities: [
      { name: '火焰冲击', description: '用燃烧的爪子攻击敌人，有几率造成烧伤效果' },
      { name: '快速移动', description: '短时间内大幅提升移动速度' }
    ],
    habitat: '火山地区、热泉附近',
    rarity: 'uncommon',
    isCollected: true,
    height: '0.8m',
    weight: '12kg',
    evolutionStage: 1,
    evolutionTo: '2'
  },
  {
    id: '2',
    name: '烈焰狮王',
    type: ['火', '格斗'],
    description: '火焰灵猫的进化形态，拥有更强大的火焰力量和王者气质。鬃毛如同燃烧的火焰，吼声能震动山谷。只有被它认可的训练师才能获得它的忠诚。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Lion%20monster%20with%20flaming%20mane%2C%20royal%20appearance%2C%20powerful%20stance%2C%20digital%20art&sign=95d42ea60e8b6ec1f59ef0696c044e76',
    attributes: {
      strength: 90,
      agility: 75,
      intelligence: 80,
      vitality: 85,
      defense: 70
    },
    abilities: [
      { name: '烈焰风暴', description: '释放火焰旋风攻击周围所有敌人' },
      { name: '王者威严', description: '降低周围敌人的攻击和防御' },
      { name: '火焰护甲', description: '用火焰包裹身体，提升防御并对攻击者造成伤害' }
    ],
    habitat: '活火山内部、熔岩地带',
    rarity: 'rare',
    isCollected: true,
    height: '1.5m',
    weight: '75kg',
    evolutionStage: 2,
    evolutionFrom: '1'
  },
  {
    id: '3',
    name: '水蓝海豚',
    type: ['水'],
    description: '生活在清澈海水中的友好宠兽，拥有流线型身体和高超的游泳技巧。它们能发出特殊的声波与同伴交流，对人类非常友善。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Blue%20dolphin%20monster%2C%20friendly%20expression%2C%20shiny%20scales%2C%20underwater%20background%2C%20digital%20art&sign=266724209ccb532f6a52ddc602d5ffe8',
    attributes: {
      strength: 55,
      agility: 80,
      intelligence: 90,
      vitality: 75,
      defense: 60
    },
    abilities: [
      { name: '水炮', description: '喷射高压水流攻击敌人' },
      { name: '治愈波动', description: '发出治愈声波，恢复自身或同伴的生命值' }
    ],
    habitat: '热带海洋、清澈海湾',
    rarity: 'uncommon',
    isCollected: true,
    height: '1.2m',
    weight: '45kg',
    evolutionStage: 1,
    evolutionTo: '4'
  },
  {
    id: '4',
    name: '潮汐鲸皇',
    type: ['水', '龙'],
    description: '水蓝海豚的进化形态，体型巨大，拥有控制水流的能力。传说它的出现会带来丰沛的雨水，被沿海居民视为祥瑞的象征。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Giant%20whale%20monster%2C%20water%20control%2C%20majestic%20appearance%2C%20ocean%20background%2C%20digital%20art&sign=32d39ce4441524d0fc501ed0d93d3f70',
    attributes: {
      strength: 85,
      agility: 65,
      intelligence: 100,
      vitality: 120,
      defense: 95
    },
    abilities: [
      { name: '海啸', description: '召唤巨大海浪攻击所有敌人' },
      { name: '海洋祝福', description: '给自己和所有队友都回复大量生命值并清除负面状态' },
      { name: '水流屏障', description: '创造水之屏障，吸收伤害并反弹部分伤害给攻击者' }
    ],
    habitat: '深海区域、远洋海域',
    rarity: 'legendary',
    isCollected: false,
    height: '10m',
    weight: '5000kg',
    evolutionStage: 2,
    evolutionFrom: '3'
  },
  {
    id: '5',
    name: '绿叶松鼠',
    type: ['草'],
    description: '生活在森林中的小型宠兽，尾巴如同蓬松的绿叶，能进行简单的光合作用。性格活泼好动，喜欢收集闪亮的东西。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Squirrel%20monster%20with%20leaf%20tail%2C%20green%20fur%2C%20forest%20background%2C%20cute%20expression%2C%20digital%20art&sign=eef6e037ef03de4670729ef9eda49d58',
    attributes: {
      strength: 45,
      agility: 90,
      intelligence: 65,
      vitality: 60,
      defense: 50
    },
    abilities: [
      { name: '叶片飞镖', description: '发射锋利的叶片攻击敌人' },
      { name: '光合作用', description: '在阳光下缓慢恢复生命值' }
    ],
    habitat: '温带森林、公园树丛',
    rarity: 'common',
    isCollected: true,
    height: '0.3m',
    weight: '2kg',
    evolutionStage: 1,
    evolutionTo: '6'
  },
  {
    id: '6',
    name: '丛林守护兽',
    type: ['草', '妖精'],
    description: '绿叶松鼠的进化形态，体型变大，获得了与植物沟通的能力。它能召唤藤蔓和操控植物生长，是森林生态的守护者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Guardian%20beast%20with%20plant%20features%2C%20tree%20like%20appearance%2C%20forest%20background%2C%20mystical%20aura%2C%20digital%20art&sign=cdb09469aeb229ccfbc480a119300998',
    attributes: {
      strength: 75,
      agility: 70,
      intelligence: 85,
      vitality: 95,
      defense: 80
    },
    abilities: [
      { name: '藤蔓束缚', description: '用强力藤蔓束缚敌人，使其无法行动' },
      { name: '森林祝福', description: '召唤森林之力恢复所有同伴的生命值' },
      { name: '自然守护', description: '创造植物屏障，大幅提升所有同伴的防御' }
    ],
    habitat: '古老森林、原始丛林',
    rarity: 'rare',
    isCollected: false,
    height: '2.5m',
    weight: '180kg',
    evolutionStage: 2,
    evolutionFrom: '5'
  },
  // 新增20只宠兽 - 普通(common)
  {
    id: '7',
    name: '电气鼠',
    type: ['电'],
    description: '身体带有微弱电流的小型啮齿类宠兽，尾巴像避雷针一样竖立。受到惊吓时会释放出微弱电流，常常在高压电塔附近被发现。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Electric%20mouse%20monster%2C%20yellow%20fur%2C%20black%20stripes%2C%20sparkling%20eyes%2C%20digital%20art&sign=18b9e8a741fd3caafcbd628967b3f06c',
    attributes: {
      strength: 35,
      agility: 95,
      intelligence: 55,
      vitality: 45,
      defense: 40
    },
    abilities: [
      { name: '电击', description: '释放微弱电流攻击敌人' },
      { name: '高速移动', description: '以极快速度移动，闪避敌人攻击' }
    ],
    habitat: '城市近郊、高压电塔附近',
    rarity: 'common',
    isCollected: true,
    height: '0.25m',
    weight: '1.8kg',
    evolutionStage: 1,
    evolutionTo: '27'
  },
  {
    id: '8',
    name: '岩石爬虫',
    type: ['岩石'],
    description: '生活在山区的小型爬行类宠兽，背部覆盖着坚硬的岩石甲壳。行动迟缓但防御力强，遇到危险时会蜷缩成球状保护自己。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Rock%20lizard%20monster%2C%20stone%20shell%2C%20mountain%20background%2C%20brown%20color%2C%20digital%20art&sign=fe331f7be5dc0f1648c689b62d62e48d',
    attributes: {
      strength: 60,
      agility: 30,
      intelligence: 40,
      vitality: 70,
      defense: 85
    },
    abilities: [
      { name: '岩石投掷', description: '投掷小石块攻击敌人' },
      { name: '变硬', description: '暂时提升自身防御力' }
    ],
    habitat: '山区、岩石地带',
    rarity: 'common',
    isCollected: true,
    height: '0.4m',
    weight: '8kg',
    evolutionStage: 1,
    evolutionTo: '28'
  },
  {
    id: '9',
    name: '微风鸟',
    type: ['飞行'],
    description: '拥有轻盈羽毛的小型鸟类宠兽，能借助微风长时间滑翔。歌声清脆悦耳，常被人们当作宠物饲养。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Small%20bird%20monster%2C%20white%20feathers%2C%20blue%20wings%2C%20flying%20pose%2C%20digital%20art&sign=58f6dedf8bed216cef0288cdc75c9116',
    attributes: {
      strength: 30,
      agility: 90,
      intelligence: 60,
      vitality: 40,
      defense: 35
    },
    abilities: [
      { name: '旋风', description: '拍打翅膀产生小型旋风' },
      { name: '鸣叫', description: '发出清脆鸣叫，提升同伴士气' }
    ],
    habitat: '森林边缘、公园、城市上空',
    rarity: 'common',
    isCollected: true,
    height: '0.3m',
    weight: '0.5kg',
    evolutionStage: 1,
    evolutionTo: '29'
  },
  {
    id: '10',
    name: '小土狗',
    type: ['普通'],
    description: '常见的犬类宠兽，性格温顺忠诚，容易训练。是最适合初学者的伙伴之一，能与人类建立深厚的情感纽带。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Small%20dog%20monster%2C%20brown%20fur%2C%20friendly%20expression%2C%20digital%20art&sign=6690ff5efaa1a07d6bc1f8972c758c2f',
    attributes: {
      strength: 50,
      agility: 65,
      intelligence: 70,
      vitality: 60,
      defense: 55
    },
    abilities: [
      { name: '猛扑', description: '向前猛扑，用牙齿撕咬敌人' },
      { name: '嗅觉追踪', description: '通过嗅觉追踪目标，提升命中率' }
    ],
    habitat: '人类居住区、城市周边',
    rarity: 'common',
    isCollected: true,
    height: '0.5m',
    weight: '8kg',
    evolutionStage: 1
  },
  {
    id: '11',
    name: '泡沫鱼',
    type: ['水'],
    description: '生活在淡水湖泊中的小型鱼类宠兽，能吐出彩色泡沫。这些泡沫在阳光下会折射出美丽的光芒，常被当作观赏宠兽。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Bubble%20fish%20monster%2C%20colorful%20bubbles%2C%20freshwater%20background%2C%20vibrant%20colors%2C%20digital%20art&sign=3b0a4a09924c94e2f4b11c9c57322d3d',
    attributes: {
      strength: 40,
      agility: 75,
      intelligence: 50,
      vitality: 55,
      defense: 45
    },
    abilities: [
      { name: '泡沫喷射', description: '吐出泡沫攻击敌人，降低其速度' },
      { name: '水幕', description: '制造水幕防御敌人攻击' }
    ],
    habitat: '淡水湖泊、河流',
    rarity: 'common',
    isCollected: false,
    height: '0.2m',
    weight: '0.3kg',
    evolutionStage: 1,
    evolutionTo: '31'
  },
  {
    id: '12',
    name: '迷你蘑菇',
    type: ['草', '毒'],
    description: '生长在潮湿森林中的菌类宠兽，身体像一个小蘑菇。头顶的菌盖能释放出孢子，有些孢子具有毒性。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Mini%20mushroom%20monster%2C%20red%20cap%20with%20white%20spots%2C%20forest%20floor%20background%2C%20digital%20art&sign=14b0c41083b708b20add616af25f478b',
    attributes: {
      strength: 30,
      agility: 45,
      intelligence: 60,
      vitality: 65,
      defense: 50
    },
    abilities: [
      { name: '孢子散布', description: '释放有毒孢子，使敌人中毒' },
      { name: '光合作用', description: '在阳光下缓慢恢复生命值' }
    ],
    habitat: '潮湿森林、腐木附近',
    rarity: 'common',
    isCollected: false,
    height: '0.2m',
    weight: '0.4kg',
    evolutionStage: 1,
    evolutionTo: '32'
  },
  {
    id: '13',
    name: '小蝙蝠',
    type: ['飞行', '暗'],
    description: '生活在洞穴中的夜行性宠兽，视力不佳但听觉敏锐。能发出超声波定位，在黑暗中也能准确捕捉猎物。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Small%20bat%20monster%2C%20purple%20wings%2C%20cave%20background%2C%20nocturnal%2C%20digital%20art&sign=c6425778e9441e44aabb63ef6939259c',
    attributes: {
      strength: 45,
      agility: 85,
      intelligence: 50,
      vitality: 40,
      defense: 35
    },
    abilities: [
      { name: '超声波', description: '发出超声波攻击敌人，使其混乱' },
      { name: '黑夜飞行', description: '在黑暗中提升闪避率' }
    ],
    habitat: '洞穴、废弃建筑物',
    rarity: 'common',
    isCollected: false,
    height: '0.25m',
    weight: '0.3kg',
    evolutionStage: 1,
    evolutionTo: '33'
  },
  {
    id: '14',
    name: '冰原兔子',
    type: ['冰'],
    description: '生活在寒冷地区的兔形宠兽，全身覆盖着厚厚的白色绒毛。耳朵尖端有冰结晶，能在寒冷环境中保持体温。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Snow%20rabbit%20monster%2C%20white%20fur%2C%20ice%20crystals%20on%20ears%2C%20snowy%20background%2C%20digital%20art&sign=4e5d899b3b49b00ac55d8a874aba522b',
    attributes: {
      strength: 40,
      agility: 90,
      intelligence: 55,
      vitality: 50,
      defense: 45
    },
    abilities: [
      { name: '冰粒喷射', description: '喷射冰粒攻击敌人' },
      { name: '冰滑', description: '在地面制造冰层，提升自身速度' }
    ],
    habitat: '雪山、极地地区',
    rarity: 'common',
    isCollected: false,
    height: '0.35m',
    weight: '2.5kg',
    evolutionStage: 1,
    evolutionTo: '34'
  },
  // 新增20只宠兽 - 罕见(uncommon)
  {
    id: '15',
    name: '火焰狐狸',
    type: ['火'],
    description: '生活在火山地区的狐狸形宠兽，尾巴和耳朵尖端燃烧着火焰。比火焰灵猫更罕见，性格也更独立和聪明。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Fire%20fox%20monster%2C%20flaming%20tail%20and%20ears%2C%20volcano%20background%2C%20orange%20and%20red%20fur%2C%20digital%20art&sign=517dd2587ef8cd353aaa546d0e801197',
    attributes: {
      strength: 65,
      agility: 85,
      intelligence: 75,
      vitality: 65,
      defense: 55
    },
    abilities: [
      { name: '火焰弹', description: '吐出小型火焰弹攻击敌人' },
      { name: '火焰分身', description: '制造火焰分身迷惑敌人' }
    ],
    habitat: '活火山周边、熔岩地带',
    rarity: 'uncommon',
    isCollected: true,
    height: '0.6m',
    weight: '7kg',
    evolutionStage: 1,
    evolutionTo: '35'
  },
  {
    id: '16',
    name: '雷电蛇',
    type: ['电', '毒'],
    description: '带有强烈电流的蛇形宠兽，皮肤呈现蓝黄色条纹。攻击时会用带电的毒牙咬伤敌人，同时注入毒素和电流。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Thunder%20snake%20monster%2C%20blue%20and%20yellow%20stripes%2C%20electric%20aura%2C%20digital%20art&sign=043341c3de688641259694c0369a1759',
    attributes: {
      strength: 60,
      agility: 80,
      intelligence: 65,
      vitality: 55,
      defense: 50
    },
    abilities: [
      { name: '雷电牙', description: '用带电的牙齿咬伤敌人' },
      { name: '麻痹毒素', description: '注入毒素，有几率使敌人麻痹' }
    ],
    habitat: '热带雨林、沼泽地区',
    rarity: 'uncommon',
    isCollected: true,
    height: '1.2m',
    weight: '3.5kg',
    evolutionStage: 1,
    evolutionTo: '36'
  },
  {
    id: '17',
    name: '钢铁甲虫',
    type: ['虫', '钢'],
    description: '外壳如同钢铁般坚硬的甲虫宠兽，能飞行但速度较慢。前肢进化成了锋利的镰刀，攻击力很强。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Steel%20beetle%20monster%2C%20metallic%20shell%2C%20sickle%20arms%2C%20digital%20art&sign=58fc9d6f17b703f7d43367141b5a1f5e',
    attributes: {
      strength: 80,
      agility: 50,
      intelligence: 45,
      vitality: 75,
      defense: 90
    },
    abilities: [
      { name: '钢铁镰刀', description: '用锋利的前肢切割敌人' },
      { name: '钢甲', description: '暂时提升自身防御力' }
    ],
    habitat: '山区、矿脉附近',
    rarity: 'uncommon',
    isCollected: false,
    height: '0.5m',
    weight: '12kg',
    evolutionStage: 1,
    evolutionTo: '37'
  },
  {
    id: '18',
    name: '治愈之鹿',
    type: ['草', '妖精'],
    description: '拥有治愈能力的鹿形宠兽，头上长着带有花朵的鹿角。能释放治愈能量，常被视为森林的守护者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Healing%20deer%20monster%2C%20flower%20antlers%2C%20forest%20background%2C%20green%20fur%2C%20digital%20art&sign=aa02df59d6957a1cfde5ab60a1b7d97c',
    attributes: {
      strength: 50,
      agility: 70,
      intelligence: 85,
      vitality: 80,
      defense: 65
    },
    abilities: [
      { name: '治愈之光', description: '释放治愈光芒，恢复同伴生命值' },
      { name: '自然之力', description: '召唤自然能量提升同伴能力' }
    ],
    habitat: '古老森林、圣地',
    rarity: 'uncommon',
    isCollected: false,
    height: '1.1m',
    weight: '35kg',
    evolutionStage: 1,
    evolutionTo: '38'
  },
  {
    id: '19',
    name: '暗影豹',
    type: ['暗', '普通'],
    description: '生活在夜间的豹形宠兽，身体能融入阴影中。行动悄无声息，是出色的猎手，眼睛在黑暗中会发出幽绿光芒。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Shadow%20panther%20monster%2C%20black%20fur%2C%20green%20eyes%2C%20night%20background%2C%20digital%20art&sign=e8142c613436db2af9a4991592819568',
    attributes: {
      strength: 75,
      agility: 95,
      intelligence: 70,
      vitality: 60,
      defense: 55
    },
    abilities: [
      { name: '暗影突袭', description: '融入阴影后突袭敌人' },
      { name: '夜视', description: '在黑暗中提升命中率和闪避率' }
    ],
    habitat: '热带雨林、夜间的城市',
    rarity: 'uncommon',
    isCollected: false,
    height: '0.8m',
    weight: '25kg',
    evolutionStage: 1,
    evolutionTo: '39'
  },
  {
    id: '20',
    name: '水晶龟',
    type: ['水', '岩石'],
    description: '背甲由水晶构成的龟形宠兽，能在水中和陆地上生活。水晶背甲能反射阳光产生彩虹，具有强大的防御能力。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Crystal%20turtle%20monster%2C%20transparent%20shell%2C%20beach%20background%2C%20colorful%20crystals%2C%20digital%20art&sign=34325f17374321b7c65fd541035e0161',
    attributes: {
      strength: 55,
      agility: 40,
      intelligence: 65,
      vitality: 90,
      defense: 95
    },
    abilities: [
      { name: '水晶冲击', description: '用坚硬的水晶背甲撞击敌人' },
      { name: '水炮', description: '喷射高压水流攻击敌人' }
    ],
    habitat: '海岸、湖泊',
    rarity: 'uncommon',
    isCollected: false,
    height: '0.6m',
    weight: '45kg',
    evolutionStage: 1,
    evolutionTo: '40'
  },
  // 新增20只宠兽 - 稀有(rare)
  {
    id: '22',
    name: '寒冰巨龙',
    type: ['冰', '龙'],
    description: '生活在极寒地区的龙形宠兽，能呼出极冷的气息冻结敌人。鳞片如同冰晶般闪耀，是冰元素的强大掌控者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Ice%20dragon%20monster%2C%20blue%20scales%2C%20frost%20aura%2C%20snowy%20mountain%20background%2C%20digital%20art&sign=7fc6301b1a77bf21217ce39115be486a',
    attributes: {
      strength: 90,
      agility: 65,
      intelligence: 80,
      vitality: 95,
      defense: 85
    },
    abilities: [
      { name: '寒冰吐息', description: '呼出极冷气息冻结敌人' },
      { name: '冰之铠甲', description: '用冰覆盖身体，提升防御并对攻击者造成伤害' },
      { name: '暴风雪', description: '召唤暴风雪攻击所有敌人' }
    ],
    habitat: '极地冰原、雪山之巅',
    rarity: 'rare',
    isCollected: false,
    height: '3.5m',
    weight: '800kg',
    evolutionStage: 1,
    evolutionTo: '42'
  },
  // 新增20只宠兽 - 史诗(epic)
  {
    id: '76',
    name: '暗影先知',
    type: ['暗', '超能'],
    description: '暗影先知是一种神秘的双属性宠兽，能够操控暗影能量并拥有强大的精神力量。它的存在介于现实与阴影之间，能够预知未来并影响他人心智。传说它是古老文明的守护者，掌握着宇宙的秘密。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Dark%20psychic%20monster%2C%20shadowy%20figure%2C%20glowing%20purple%20eyes%2C%20mysterious%20aura%2C%20digital%20art&sign=cb17cce06e1465e26d6e4e36725ef3a2',
    attributes: {
      strength: 70,
      agility: 65,
      intelligence: 95,
      vitality: 60,
      defense: 55
    },
    abilities: [
      { name: '暗影突袭', description: '融入暗影中进行突袭，造成高额伤害并使敌人陷入恐惧状态' },
      { name: '精神控制', description: '对单个敌人进行精神控制，使其暂时成为己方战力' },
      { name: '未来视', description: '预知危险，大幅提升自身闪避率并能看破敌人弱点' }
    ],
    habitat: '暗影森林、废弃神殿',
    rarity: 'epic',
    isCollected: false,
    height: '1.8m',
    weight: '45kg',
    evolutionStage: 1
  },

  // 新增20只宠兽 - 普通(common)
  {
    id: '27',
    name: '闪电松鼠',
    type: ['电', '普通'],
    description: '一种生活在高压电塔附近的松鼠，尾巴能储存少量电能，受到惊吓时会释放电流。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Electric%20squirrel%2C%20yellow%20fur%2C%20spark%20tail%2C%20cute%20expression%2C%20digital%20art&sign=00c59feae57bf94554349eebb22c6675',
    attributes: {
      strength: 40,
      agility: 85,
      intelligence: 55,
      vitality: 45,
      defense: 40
    },
    abilities: [
      { name: '小电击', description: '释放微弱电流攻击敌人' },
      { name: '高速移动', description: '快速移动躲避攻击' }
    ],
    habitat: '电力设施附近、森林',
    rarity: 'common',
    isCollected: false,
    height: '0.3m',
    weight: '0.8kg',
    evolutionStage: 1,
    evolutionTo: '68'
  },
  {
    id: '28',
    name: '岩石小龟',
    type: ['岩石', '水'],
    description: '背着小型岩石甲壳的乌龟，能在陆地和水中生活，行动缓慢但防御力不错。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Small%20rock%20turtle%2C%20brown%20shell%2C%20water%20background%2C%20digital%20art&sign=baa3d80328b24747e9f112eed3d2deea',
    attributes: {
      strength: 50,
      agility: 30,
      intelligence: 45,
      vitality: 65,
      defense: 75
    },
    abilities: [
      { name: '缩壳', description: '缩进壳中提升防御力' },
      { name: '水枪', description: '喷射小股水流' }
    ],
    habitat: '河流、湖泊、岩石地带',
    rarity: 'common',
    isCollected: false,
    height: '0.4m',
    weight: '5kg',
    evolutionStage: 1,
    evolutionTo: '69'
  },
  {
    id: '29',
    name: '风语鸟',
    type: ['飞行', '超能'],
    description: '能感知风的变化的小鸟，歌声悦耳，据说能预测天气变化。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Small%20blue%20bird%2C%20wind%20around%2C%20singing%2C%20digital%20art&sign=5857f3ed7fb00a4dbf1dbee84fd441ae',
     attributes: {
      strength: 40,
      agility: 95,
      intelligence: 75,
      vitality: 45,
      defense: 40
    },
    abilities: [
      { name: '风之翼', description: '用翅膀制造小型旋风' },
      { name: '预知', description: '提升闪避率' }
    ],
    habitat: '森林、高原',
    rarity: 'common',
    isCollected: false,
     height: '0.3m',
     weight: '0.4kg',
     evolutionStage: 1,
     evolutionFrom: '9',
    evolutionTo: '70'
  },
  {
    id: '30',
    name: '土拨鼠',
    type: ['地面', '普通'],
    description: '擅长挖掘的啮齿类宠兽，能在地下快速移动，遇到危险会钻进洞穴。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Groundhog%20monster%2C%20brown%20fur%2C%20digging%2C%20digital%20art&sign=a31275bb9267c7dc6100202e0e3fbe58',
    attributes: {
      strength: 55,
      agility: 60,
      intelligence: 45,
      vitality: 50,
      defense: 55
    },
    abilities: [
      { name: '挖洞', description: '挖掘洞穴躲避攻击' },
      { name: '泥浆投掷', description: '投掷泥浆降低敌人命中率' }
    ],
    habitat: '草原、农田',
    rarity: 'common',
    isCollected: false,
    height: '0.4m',
    weight: '2kg',
    evolutionStage: 1,
    evolutionTo: '71'
  },
  {
    id: '31',
    name: '荧光鱼',
    type: ['水', '电'],
    description: '生活在深海的发光鱼类，身体能发出微弱电流和光芒，吸引小生物。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Glowing%20fish%20monster%2C%20blue%20light%2C%20deep%20sea%2C%20digital%20art&sign=be537e0e4029b217c65140b2bdc4e84b',
    attributes: {
      strength: 40,
      agility: 70,
      intelligence: 50,
      vitality: 45,
      defense: 40
    },
    abilities: [
      { name: '闪光', description: '发出强光使敌人暂时失明' },
      { name: '弱电', description: '释放微弱电流' }
    ],
    habitat: '深海、洞穴湖泊',
    rarity: 'common',
    isCollected: false,
    height: '0.2m',
    weight: '0.3kg',
    evolutionStage: 1,
    evolutionTo: '72'
  },

  {
    id: '33',
    name: '夜行蝙蝠',
    type: ['飞行', '暗'],
    description: '昼伏夜出的蝙蝠宠兽，视力不佳但听觉敏锐，能发出超声波定位。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Nocturnal%20bat%20monster%2C%20black%20wings%2C%20night%20background%2C%20digital%20art&sign=605d8d4e29a393fd37a4fbf20a9e46b5',
    attributes: {
      strength: 45,
      agility: 80,
      intelligence: 50,
      vitality: 40,
      defense: 35
    },
    abilities: [
      { name: '超声波', description: '发出超声波攻击敌人' },
      { name: '黑夜飞行', description: '在黑暗中提升闪避率' }
    ],
    habitat: '洞穴、废弃建筑',
    rarity: 'common',
    isCollected: false,
    height: '0.3m',
    weight: '0.2kg',
  evolutionStage: 1,
  evolutionFrom: '13',
  evolutionTo: '74'
  },
  {
    id: '75',
    name: '寒冰兔',
    type: ['冰', '普通'],
    description: '冰原兔子的进化形态，体型更大，冰结晶覆盖全身，拥有更强的冰系能力。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Ice%20rabbit%20monster%2C%20white%20fur%2C%20blue%20crystals%20on%20body%2C%20snowy%20background%2C%20digital%20art&sign=159154d7ba4c8cb9a4c874594ae926ce',
    attributes: {
      strength: 55,
      agility: 95,
      intelligence: 65,
      vitality: 60,
      defense: 55
    },
    abilities: [
      { name: '冰锥突击', description: '用锋利冰锥攻击敌人' },
      { name: '寒冰屏障', description: '制造冰墙防御攻击' },
      { name: '极寒领域', description: '降低周围敌人速度' }
    ],
    habitat: '雪山、极地冰川',
    rarity: 'uncommon',
    isCollected: false,
    height: '0.5m',
    weight: '3.5kg',
    evolutionStage: 2,
    evolutionFrom: '14',
    evolutionTo: '88'
  },
  // 新增20只宠兽 - 罕见(uncommon)






   // 新增20只宠兽 - 稀有(rare)
   
   // 新增10只全新宠兽 - 普通(common)

   {
     id: '77',
     name: '荧光蝶',
     type: ['虫', '飞行'],
     description: '翅膀上带有荧光粉末的蝴蝶宠兽，在夜间会发出美丽的光芒，常被当作观赏宠兽。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Butterfly%20monster%2C%20glowing%20wings%2C%20colorful%2C%20night%20background%2C%20digital%20art&sign=d9914d16054602b3cad3dbe5dbd52e8e',
     attributes: {
       strength: 30,
       agility: 85,
       intelligence: 50,
       vitality: 45,
       defense: 35
     },
     abilities: [
       { name: '粉末攻击', description: '撒出荧光粉末干扰敌人' },
       { name: '高速飞行', description: '提升闪避率' }
     ],
     habitat: '森林、花园',
     rarity: 'common',
     isCollected: false,
     height: '0.25m',
     weight: '0.1kg',
     evolutionStage: 1,
     evolutionTo: '87'
   },
   {
     id: '78',
     name: '小水獭',
     type: ['水', '普通'],
     description: '生活在河流中的小型哺乳动物宠兽，擅长游泳和捕鱼，性格活泼好动。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Otter%20monster%2C%20brown%20fur%2C%20webbed%20feet%2C%20river%20background%2C%20digital%20art&sign=5637a89f8277170618b0534f76618770',
     attributes: {
       strength: 45,
       agility: 70,
       intelligence: 65,
       vitality: 55,
       defense: 50
     },
     abilities: [
       { name: '水枪', description: '喷射水流攻击敌人' },
       { name: '爪击', description: '用锋利的爪子攻击' }
     ],
     habitat: '河流、湖泊',
     rarity: 'common',
     isCollected: false,
     height: '0.4m',
     weight: '3kg',
     evolutionStage: 1,
     evolutionTo: '89'
   },
   {
     id: '79',
     name: '电蜥蜴',
     type: ['电', '爬行'],
     description: '背部有发电器官的蜥蜴宠兽，受到威胁时会释放电流保护自己。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Lizard%20monster%2C%20electric%20organs%2C%20yellow%20and%20black%20pattern%2C%20digital%20art&sign=9138a113f2dc0df356f465036ac8f09c',
     attributes: {
       strength: 45,
       agility: 65,
       intelligence: 45,
       vitality: 50,
       defense: 45
     },
     abilities: [
       { name: '电击', description: '释放电流攻击敌人' },
       { name: '尾巴抽打', description: '用尾巴攻击敌人' }
     ],
     habitat: '草原、沙漠',
     rarity: 'common',
     isCollected: false,
     height: '0.4m',
     weight: '1.5kg',
     evolutionStage: 1,
     evolutionTo: '90'
   },
   
   // 新增10只全新宠兽 - 罕见(uncommon)
   {
     id: '80',
     name: '冰晶狐狸',
     type: ['冰', '普通'],
     description: '生活在寒冷地区的狐狸宠兽，尾巴上长有冰晶，能在雪地中自由穿行。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Fox%20monster%2C%20ice%20crystals%20on%20tail%2C%20white%20fur%2C%20snowy%20background%2C%20digital%20art&sign=3362b576e59ae74ab3b8d6d0b2e77b6c',
     attributes: {
       strength: 55,
       agility: 80,
       intelligence: 70,
       vitality: 65,
       defense: 55
     },
     abilities: [
       { name: '冰爪', description: '用冰冷的爪子攻击敌人' },
       { name: '冰雾', description: '制造冰雾降低敌人命中率' },
       { name: '耐寒', description: '在寒冷环境中提升防御' }
     ],
     habitat: '雪山、极地',
     rarity: 'uncommon',
     isCollected: false,
     height: '0.6m',
     weight: '7kg',
     evolutionStage: 1,
     evolutionTo: '91'
   },
   {
     id: '81',
     name: '毒液蜘蛛',
     type: ['虫', '毒'],
     description: '带有强烈毒性的大型蜘蛛宠兽，腿部有紫色花纹，能织出坚韧的蜘蛛网。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Spider%20monster%2C%20purple%20markings%2C%20poison%20glands%2C%20dark%20forest%2C%20digital%20art&sign=017be2436d8fe1f2863d5787c4e2e208',
     attributes: {
       strength: 60,
       agility: 75,
       intelligence: 55,
       vitality: 60,
       defense: 50
     },
     abilities: [
       { name: '毒牙', description: '注入毒液攻击敌人' },
       { name: '蛛网束缚', description: '用蜘蛛网困住敌人' },
       { name: '潜伏', description: '提升暴击率' }
     ],
     habitat: '热带雨林、洞穴',
     rarity: 'uncommon',
     isCollected: false,
     height: '0.5m',
     weight: '3kg',
     evolutionStage: 1,
     evolutionTo: '92'
   },
   {
     id: '82',
     name: '钢铁仓鼠',
     type: ['钢', '普通'],
     description: '身体覆盖着金属外壳的仓鼠宠兽，虽然行动缓慢但防御力极高，性格温顺。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Hamster%20monster%2C%20metal%20shell%2C%20cute%20expression%2C%20digital%20art&sign=7c33e8142d5e58894adb11c8c66fd9cb',
     attributes: {
       strength: 65,
       agility: 45,
       intelligence: 55,
       vitality: 80,
       defense: 90
     },
     abilities: [
       { name: '钢铁撞击', description: '用金属外壳撞击敌人' },
       { name: '金属硬化', description: '暂时提升防御力' },
       { name: '滚动', description: '蜷缩成球滚动攻击' }
     ],
     habitat: '山地、矿脉',
     rarity: 'uncommon',
     isCollected: false,
     height: '0.3m',
     weight: '5kg',
     evolutionStage: 1,
     evolutionTo: '93'
   },
   
   // 新增10只全新宠兽 - 稀有(rare)
   {
     id: '83',
     name: '风暴猎鹰',
     type: ['飞行', '电'],
     description: '能操控雷电的猛禽宠兽，展开翅膀时会产生雷电，是天空的霸主之一。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Falcon%20monster%2C%20electric%20aura%2C%20storm%20background%2C%20powerful%20stance%2C%20digital%20art&sign=033946e35c290724ce8b3249a747f579',
     attributes: {
       strength: 80,
       agility: 95,
       intelligence: 75,
       vitality: 70,
       defense: 65
     },
     abilities: [
       { name: '雷电俯冲', description: '从高空俯冲攻击，带有雷电伤害' },
       { name: '风暴召唤', description: '召唤小型风暴攻击敌人' },
       { name: '静电场', description: '使周围敌人有几率麻痹' },
       { name: '高空视野', description: '提升命中率' }
     ],
     habitat: '高山、雷云区',
     rarity: 'rare',
     isCollected: false,
     height: '1.2m',
     weight: '5kg',
     evolutionStage: 1,
     evolutionTo: '94'
   },
   {
     id: '84',
     name: '大地熊',
     type: ['地面', '格斗'],
     description: '拥有操控大地能力的熊形宠兽，体型庞大，力量惊人，能轻易举起巨石。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Bear%20monster%2C%20earth%20elements%2C%20mountain%20background%2C%20powerful%20build%2C%20digital%20art&sign=960e0e79d59e9431078aec8b1b563d19',
     attributes: {
       strength: 95,
       agility: 45,
       intelligence: 60,
       vitality: 110,
       defense: 85
     },
     abilities: [
       { name: '大地猛击', description: '用拳头重击地面，造成范围伤害' },
       { name: '岩石护甲', description: '召唤岩石提升防御力' },
       { name: '地震', description: '引发小范围地震攻击所有敌人' },
       { name: '蛮力', description: '牺牲速度提升攻击力' }
     ],
     habitat: '山区、森林',
     rarity: 'rare',
     isCollected: false,
     height: '2.5m',
     weight: '300kg',
     evolutionStage: 1,
     evolutionTo: '95'
   },
   
   // 新增10只全新宠兽 - 史诗(epic)
   {
     id: '85',
     name: '时空旅者',
     type: ['超能', '龙'],
     description: '来自时空夹缝的神秘宠兽，身体呈现半透明状态，能操控时间流速，非常罕见。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Time%20dragon%20monster%2C%20transparent%20body%2C%20space%20background%2C%20mystical%20aura%2C%20digital%20art&sign=5d968158d6494ffaf8fb6df8a8d14eec',
     attributes: {
       strength: 85,
       agility: 80,
       intelligence: 110,
       vitality: 90,
       defense: 75
     },
     abilities: [
       { name: '时间扭曲', description: '减缓敌人行动速度' },
       { name: '空间跳跃', description: '瞬间移动并闪避攻击' },
       { name: '预知未来', description: '提前规避攻击并反击' },
       { name: '能量冲击', description: '释放时空能量攻击敌人' },
       { name: '时间回溯', description: '恢复少量生命值' }
     ],
     habitat: '时空夹缝、遗迹',
     rarity: 'epic',
     isCollected: false,
     height: '1.8m',
     weight: '30kg',
     evolutionStage: 1
   },

   {
     id: '96',
     name: '黑暗君王',
     type: ['暗', '龙'],
     description: '黑暗君王是来自深渊的传说生物，统治着暗影世界。它的鳞片如同黑曜石般坚硬，双眼燃烧着永恒的暗影之火。作为暗与龙属性的完美结合，它既能操控暗影能量，又拥有龙族的强大力量。',
     imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Dark%20dragon%20king%20monster%2C%20black%20scales%2C%20red%20eyes%2C%20dark%20aura%2C%20digital%20art&sign=987f3856b67e481ed425b703076572ff',
     attributes: {
       strength: 110,
       agility: 85,
       intelligence: 95,
       vitality: 130,
       defense: 105
     },
     abilities: [
       { name: '暗影吐息', description: '喷出黑暗能量，对所有敌人造成暗属性伤害并降低其防御力' },
       { name: '龙威', description: '释放王者气息，使敌人陷入恐惧状态并降低其攻击力' },
       { name: '深渊之门', description: '召唤暗影生物协助战斗' },
       { name: '黑暗守护', description: '用暗影能量形成护盾，吸收伤害并反弹部分伤害给攻击者' }
     ],
     habitat: '暗影深渊、废弃古城',
     rarity: 'legendary',
     isCollected: false,
     height: '5.2m',
     weight: '1200kg',
     evolutionStage: 1
  },
  {
    id: '97',
    name: '巨钳蟹',
    type: ['水'],
    description: '生活在淡水湖泊和河流中的甲壳类宠兽，拥有一对巨大的螯钳，力量惊人。虽然行动迟缓，但防御力很强，是初学者理想的水属性伙伴。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Giant%20crab%20with%20large%20claws%2C%20blue%20color%2C%20water%20monster%2C%20digital%20art&sign=d1da7f48bea7a88327ec69b8ba87c926',
    attributes: {
      strength: 70,
      agility: 45,
      intelligence: 50,
      vitality: 65,
      defense: 75
    },
    abilities: [
      { name: '巨钳攻击', description: '用巨大的螯钳夹击敌人，有几率造成敌人麻痹' },
      { name: '水枪', description: '喷射高压水流攻击敌人' }
    ],
    habitat: '淡水湖泊、河流、河口',
    rarity: 'common',
    isCollected: false,
    height: '0.7m',
    weight: '25kg',
    evolutionStage: 1,
    evolutionTo: '99'
  },
  {
    id: '98',
    name: '幻彩水母',
    type: ['水'],
    description: '生活在深海中的神秘水母宠兽，身体呈现出梦幻般的彩色光芒。它能释放特殊的生物电流，不仅能攻击敌人，还能迷惑对手的感知。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Colorful%20jellyfish%2C%20transparent%20body%2C%20glowing%2C%20water%20monster%2C%20digital%20art&sign=2994f21e5a87b06a1f2f86a683be927e',
    attributes: {
      strength: 65,
      agility: 80,
      intelligence: 85,
      vitality: 70,
      defense: 60
    },
    abilities: [
      { name: '幻彩光芒', description: '释放彩色光芒迷惑敌人，降低其命中率和攻击力' },
      { name: '水流脉冲', description: '释放具有穿透力的水流攻击，对直线上的多个敌人造成伤害' },
      { name: '神秘 aura', description: '提升自身和周围同伴的特殊防御能力' }
    ],
    habitat: '深海区域、珊瑚礁',
    rarity: 'rare',
    isCollected: false,
    height: '0.5m',
    weight: '2kg',
    evolutionStage: 1
  },
  {
    id: '99',
    name: '潮汐歌姬·塞壬',
    type: ['超能', '水'],
    description: '潮汐歌姬·塞壬是生活在深海中的传说宠兽，拥有动人的歌声和操控水元素与精神力量的双重能力。她的歌声能治愈盟友也能迷惑敌人，被水手们视为大海的化身。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Water%20and%20psychic%20siren%20monster%2C%20singing%2C%20beautiful%20voice%2C%20blue%20hair%2C%20mermaid%20tail%2C%20digital%20art&sign=ae9b6769fc5f63cb9e94bb5ce114a067',
    attributes: {
      strength: 75,
      agility: 90,
      intelligence: 115,
      vitality: 95,
      defense: 85
    },
    abilities: [
      { name: '海洋之歌', description: '唱出治愈之歌，恢复所有同伴的生命值并清除负面状态' },
      { name: '精神控制', description: '用心灵力量控制单个敌人，使其暂时成为己方战力' },
      { name: '潮汐领域', description: '召唤巨大海浪攻击所有敌人，并有几率使敌人溺水' },
      { name: '音波屏障', description: '用声波形成护盾，吸收伤害并反弹部分伤害给攻击者' }
    ],
    habitat: '深海海沟、海底神殿',
    rarity: 'legendary',
    isCollected: false,
    height: '1.7m',
    weight: '42kg',
    evolutionStage: 1
   },
    {
      id: '100',
      name: '棱镜晶灵',
      type: ['超能', '钢'],
      description: '棱镜晶灵是一种神秘的双属性宠兽，身体由半透明的水晶构成，能够折射光线并操控精神能量。它的存在如同活的棱镜，既拥有钢铁般的防御力，又具备强大的心灵力量。',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Psychic%20steel%20crystal%20monster%2C%20transparent%20body%2C%20glowing%20blue%20eyes%2C%20metallic%20edges%2C%20digital%20art&sign=538def184de5824ca7aac227974f918b',
      attributes: {
        strength: 75,
        agility: 65,
        intelligence: 95,
        vitality: 70,
        defense: 90
      },
      abilities: [
        { name: '水晶思维', description: '通过水晶折射放大精神力量，对单个敌人造成高额超能伤害' },
        { name: '钢铁意志', description: '暂时提升自身防御力，并反弹部分受到的伤害' },
        { name: '能量反射', description: '将敌人的特殊攻击反弹回去，并回复少量生命值' },
        { name: '心灵屏障', description: '创造一个能吸收伤害的心灵屏障，保护自己和同伴' }
      ],
      habitat: '水晶洞穴、能量富集区',
      rarity: 'epic',
      isCollected: false,
      height: '1.2m',
      weight: '45kg',
      evolutionStage: 1
    },
    {
      id: '101',
      name: '虹镜守护者',
      type: ['超能', '妖精'],
      description: '虹镜守护者是一种拥有彩虹水晶外壳的神秘宠兽，能够操控光线和心灵能量。它的身体如同会移动的彩虹镜子，既可以反射攻击，又能治愈同伴，是平衡与守护的象征。',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Rainbow%20mirror%20fairy%20monster%2C%20psychic%20powers%2C%20colorful%20crystal%20body%2C%20magical%20aura%2C%20digital%20art&sign=dc3f66055804728bebf723355402d04e',
      attributes: {
        strength: 65,
        agility: 80,
        intelligence: 90,
        vitality: 75,
        defense: 70
      },
      abilities: [
        { name: '彩虹光雨', description: '召唤彩虹光束攻击多个敌人，有几率造成混乱效果' },
        { name: '心灵守护', description: '提升所有同伴的精神防御，并小幅恢复生命值' },
        { name: '幻境反射', description: '创造幻境迷惑敌人，反弹精神攻击并降低其命中率' },
        { name: '妖精祝福', description: '为同伴施加祝福，提升攻击力和防御力，并清除负面状态' }
      ],
      habitat: '光之森林、彩虹泉源',
      rarity: 'epic',
      isCollected: false,
      height: '1.5m',
      weight: '30kg',
      evolutionStage: 1
    },
  {
    id: '102',
    name: '炽晶龙蜥',
    type: ['火', '岩石'],
    description: '身体由燃烧的水晶构成的龙形生物，蕴含着火与地的双重力量。坚硬的水晶鳞片能够抵御高温和物理攻击，口中能喷出熔火结晶，将敌人化为灰烬。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Dragon%20lizard%20made%20of%20burning%20crystals%2C%20fire%20and%20earth%20elements%2C%20fiery%20crystal%20scales%2C%20magical%20aura%2C%20digital%20art&sign=f106f5b6d584d934fd6604b74d0c9b5d',
    attributes: {
      strength: 95,
      agility: 65,
      intelligence: 75,
      vitality: 90,
      defense: 100
    },
    abilities: [
      { name: '熔火结晶', description: '喷出高温熔火结晶攻击敌人，有几率造成持续烧伤效果' },
      { name: '水晶壁垒', description: '召唤水晶屏障保护自己，大幅提升防御力并反弹部分伤害' },
      { name: '地火喷发', description: '引发地下火焰喷发，对周围所有敌人造成范围伤害' }
    ],
    habitat: '火山地带、熔岩洞窟',
    rarity: 'epic',
    isCollected: false,
    height: '2.8m',
    weight: '180kg',
    evolutionStage: 1
  },
  {
    id: '103',
    name: '永冬信使',
    type: ['冰', '飞行'],
    description: '形如冰晶构成的猫头鹰，挥翅间会洒下细碎的冰晶，预示着严寒的到来。它的羽毛如同坚冰般锋利，能够在极寒环境中自由穿梭，是冬季的神秘使者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Ice%20crystal%20owl%2C%20flying%20messenger%2C%20winter%20theme%2C%20sharp%20ice%20feathers%2C%20magical%20aura%2C%20digital%20art&sign=10681c6508679a4da99585ff606f0c1f',
    attributes: {
      strength: 70,
      agility: 95,
      intelligence: 85,
      vitality: 75,
      defense: 75
    },
    abilities: [
      { name: '冰晶风暴', description: '煽动翅膀创造冰晶风暴，对敌人造成伤害并降低其速度' },
      { name: '极寒凝视', description: '用寒冷的目光冻结敌人，使其无法行动' },
      { name: '雪之隐', description: '融入雪地环境，大幅提升自身闪避率' }
    ],
    habitat: '雪山之巅、极地冰原',
    rarity: 'rare',
    isCollected: false,
    height: '1.2m',
    weight: '12kg',
    evolutionStage: 1
  },
  {
    id: '104',
    name: '织梦婆娑',
    type: ['超能', '水'],
    description: '如同漂浮的古老水母，身体透亮，能编织幻梦，引人沉眠。它的触须散发着神秘的荧光，能够进入生物的梦境并操控其思想，是传说中的造梦师。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Ancient%20jellyfish%20with%20dream%20weaving%20abilities%2C%20transparent%20body%2C%20glowing%20tentacles%2C%20mystical%20aura%2C%20digital%20art&sign=fa0dbf989615d95f9e7e1c8ef241ea56',
    attributes: {
      strength: 60,
      agility: 75,
      intelligence: 110,
      vitality: 85,
      defense: 65
    },
    abilities: [
      { name: '幻梦编织', description: '创造梦境领域，使敌人陷入沉睡状态' },
      { name: '心灵共鸣', description: '读取敌人思想，预测其行动并提高自身闪避率' },
      { name: '记忆篡改', description: '篡改敌人记忆，使其暂时敌我不分' },
      { name: '梦境治疗', description: '通过梦境力量恢复同伴生命值' }
    ],
    habitat: '深海遗迹、神秘湖泊',
    rarity: 'epic',
    isCollected: false,
    height: '0.8m',
    weight: '3kg',
    evolutionStage: 1
  },
  {
    id: '105',
    name: '燧人氏',
    type: ['火', '超能'],
    description: '人形的火之精灵，手持燧石，能点燃最原始也是最纯粹的火焰。它是火元素的始祖，掌握着火焰的本质力量，传说中是人类获取火种的引导者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Humanoid%20fire%20spirit%20holding%20flint%2C%20ancient%20fire%20power%2C%20divine%20aura%2C%20sacred%20fire%2C%20digital%20art&sign=36f8f1e2fc84ad9cc5655ffe77311de3',
    attributes: {
      strength: 105,
      agility: 85,
      intelligence: 100,
      vitality: 95,
      defense: 85
    },
    abilities: [
      { name: '原始之火', description: '点燃最纯粹的火焰，对敌人造成高额伤害并净化负面状态' },
      { name: '火之祝福', description: '赐予同伴火焰祝福，提升攻击力并附加燃烧效果' },
      { name: '薪火相传', description: '将生命力量转化为火焰能量，牺牲自身生命治疗同伴' },
      { name: '火元素掌控', description: '完全掌控火焰元素，免疫火属性伤害并强化自身火属性攻击' }
    ],
    habitat: '火山深处、古老祭坛',
    rarity: 'legendary',
    isCollected: false,
    height: '1.7m',
    weight: '60kg',
    evolutionStage: 1
  },
  {
    id: '106',
    name: '涡轮河童',
    type: ['水', '钢'],
    description: '背后有巨大涡轮的机械水生物，擅长利用水力进行冲击和切割。它的身体由特殊合金制成，能够在水下高速移动，是水域中的机械猎手。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Mechanic%20kappapride%20with%20turbine%20on%20back%2C%20water%20creature%2C%20mechanical%20parts%2C%20aquatic%20hunter%2C%20digital%20art&sign=fdacdaadbf708bf8ea093e695c8414c7',
    attributes: {
      strength: 85,
      agility: 80,
      intelligence: 70,
      vitality: 85,
      defense: 90
    },
    abilities: [
      { name: '涡轮冲击', description: '启动背后涡轮高速冲击敌人，造成伤害并击退' },
      { name: '高压水枪', description: '喷射高压水流切割敌人，有几率降低其防御' },
      { name: '水盾防御', description: '制造水盾保护自己，吸收伤害并反弹部分伤害' },
      { name: '涡轮加速', description: '短时间内提升自身速度和攻击频率' }
    ],
    habitat: '河流、湖泊、海洋',
    rarity: 'rare',
    isCollected: false,
    height: '0.9m',
    weight: '45kg',
    evolutionStage: 1
  },
  {
    id: '107',
    name: '地听鼹贤',
    type: ['地面', '超能'],
    description: '耳朵异常灵敏的鼹鼠长老，能聆听大地深处的声音，预知危险。它的大耳朵不仅能收集声波，还能感知地下的震动，是出色的预警者和探索者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Elder%20mole%20with%20large%20ears%2C%20psychic%20powers%2C%20earth%20element%2C%20wise%20expression%2C%20digital%20art&sign=472d2857be1747d61683c0f7205f55df',
    attributes: {
      strength: 65,
      agility: 55,
      intelligence: 100,
      vitality: 75,
      defense: 85
    },
    abilities: [
      { name: '地听术', description: '聆听大地之声，感知周围环境并提升自身闪避率' },
      { name: '危险预知', description: '预知敌方行动，大幅提升防御力并免疫控制效果' },
      { name: '地震感应', description: '引发小型地震，对周围敌人造成伤害并降低其速度' }
    ],
    habitat: '地下洞窟、隧道系统',
    rarity: 'rare',
    isCollected: false,
    height: '0.6m',
    weight: '15kg',
    evolutionStage: 1
  },
  {
    id: '108',
    name: '谵妄暗鸦',
    type: ['暗', '超能'],
    description: '它的叫声会搅乱心神，使听到的生物陷入混乱与谵妄状态。全身覆盖着暗紫色的羽毛，眼睛闪烁着诡异的光芒，是黑暗森林中的精神扰乱者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Dark%20raven%20with%20psychic%20abilities%2C%20purple%20feathers%2C%20glowing%20eyes%2C%20mystical%20aura%2C%20digital%20art&sign=e30cd4cbcf725c492a7da0dfa2d8a4c7',
    attributes: {
      strength: 70,
      agility: 90,
      intelligence: 95,
      vitality: 65,
      defense: 70
    },
    abilities: [
      { name: '谵妄尖叫', description: '发出刺耳尖叫，使敌人陷入混乱状态并降低其命中率' },
      { name: '心灵干扰', description: '干扰敌人思维，使其暂时敌我不分' },
      { name: '暗影潜行', description: '融入暗影中，提升自身闪避率和暴击率' },
      { name: '精神冲击', description: '对单个敌人造成精神伤害并使其晕眩' }
    ],
    habitat: '黑暗森林、废弃城堡',
    rarity: 'epic',
    isCollected: false,
    height: '0.8m',
    weight: '4kg',
    evolutionStage: 1
  },
  {
    id: '109',
    name: '辉光星尘',
    type: ['超能', '飞行'],
    description: '如同凝聚在一起的发光星尘，微小却拥有宇宙的光芒。它能吸收星辰之力，释放出耀眼的光芒攻击敌人，也能治愈同伴的伤痛。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Glowing%20stardust%20creature%2C%20floating%20in%20space%2C%20psychic%20powers%2C%20bright%20aura%2C%20digital%20art&sign=85f44385a297c06b5b028a37135703f6',
    attributes: {
      strength: 80,
      agility: 100,
      intelligence: 120,
      vitality: 85,
      defense: 75
    },
    abilities: [
      { name: '星辰坠落', description: '召唤流星雨攻击所有敌人，造成高额伤害' },
      { name: '星光治愈', description: '释放星辰光芒，恢复所有同伴的生命值' },
      { name: '星尘护盾', description: '创造星尘护盾，吸收伤害并提升所有同伴的防御力' },
      { name: '宇宙洞察', description: '看穿敌人弱点，提升所有同伴的暴击率' }
    ],
    habitat: '星空、高处云层',
    rarity: 'legendary',
    isCollected: false,
    height: '0.5m',
    weight: '0.1kg',
    evolutionStage: 1
  },
  {
    id: '110',
    name: '裂帛螳王',
    type: ['虫', '格斗'],
    description: '双刀锋利到能撕裂空气发出布匹撕裂之声的螳螂王者。它的前肢进化成了致命的武器，动作迅猛，是森林中的顶级猎手。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=King%20mantis%20with%20sharp%20blades%2C%20insect%20type%2C%20fighting%20abilities%2C%20predator%2C%20digital%20art&sign=1b5b6f37bac39689a1caee019f4ac5f9',
    attributes: {
      strength: 90,
      agility: 105,
      intelligence: 60,
      vitality: 70,
      defense: 65
    },
    abilities: [
      { name: '裂帛斩', description: '用锋利前肢快速斩击，对敌人造成高额伤害并降低其防御' },
      { name: '迅雷闪', description: '以极快速度移动并攻击，提升暴击率' },
      { name: '螳螂拳', description: '连续拳击敌人，造成多次伤害' },
      { name: '狩猎本能', description: '进入狩猎状态，提升攻击力和敏捷度' }
    ],
    habitat: '热带雨林、茂密丛林',
    rarity: 'rare',
    isCollected: false,
    height: '1.2m',
    weight: '8kg',
    evolutionStage: 1
  },
  {
    id: '111',
    name: '铸铁犀尊',
    type: ['钢', '地面'],
    description: '身体如同经过千锤百炼的生铁，沉重而坚固，冲撞力无敌。它的独角和铠甲般的皮肤能抵御任何攻击，是绝对的防御专家。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Steel%20rhinoceros%20monster%2C%20metal%20armor%2C%20earth%20element%2C%20powerful%20build%2C%20digital%20art&sign=5a13428116cb50113f62a590aa14169f',
    attributes: {
      strength: 110,
      agility: 45,
      intelligence: 55,
      vitality: 120,
      defense: 115
    },
    abilities: [
      { name: '钢铁冲撞', description: '全力冲撞敌人，造成高额伤害并击退' },
      { name: '铁壁防御', description: '进入防御状态，大幅提升防御力并反弹部分伤害' },
      { name: '地震践踏', description: '用力践踏地面，造成范围伤害并降低敌人速度' },
      { name: '金属强化', description: '强化金属身体，提升所有属性' }
    ],
    habitat: '山地、矿脉、金属富集区',
    rarity: 'epic',
    isCollected: false,
    height: '2.5m',
    weight: '1500kg',
    evolutionStage: 1
  },
  {
    id: '112',
    name: '苍翠贤者',
    type: ['草', '超能'],
    description: '一棵古老而智慧的树人，掌握着自然和生命的法术。它的身体由坚韧的树皮构成，枝桠间常年生长着茂密的树叶和珍贵的草药，是森林中最受尊敬的守护者之一。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Ancient%20wise%20tree%20humanoid%2C%20nature%20magic%2C%20forest%20background%2C%20vibrant%20green%2C%20digital%20art&sign=764d9cc0cdc731798bbc641507f0c103',
    attributes: {
      strength: 80,
      agility: 55,
      intelligence: 120,
      vitality: 110,
      defense: 90
    },
    abilities: [
      { name: '自然祝福', description: '释放生命能量，治疗所有同伴并清除负面状态' },
      { name: '森林之墙', description: '召唤坚固的藤蔓和树木保护自己，大幅提升防御力' },
      { name: '生命汲取', description: '从敌人身上汲取生命力，恢复自身健康并造成伤害' },
      { name: '智慧启示', description: '分享古老智慧，提升所有同伴的智力和技能效果' }
    ],
    habitat: '古老森林、生命之树附近',
    rarity: 'legendary',
    isCollected: false,
    height: '3.5m',
    weight: '2000kg',
    evolutionStage: 1
  },
  {
    id: '113',
    name: '无相之风',
    type: ['风'],
    description: '没有固定形态的风之元素聚合体，变幻莫测。它能自由操控气流，以极快的速度移动，几乎无法被捕捉到实体。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Formless%20wind%20elemental%2C%20changing%20shape%2C%20air%20magic%2C%20cloud%20background%2C%20digital%20art&sign=fb3f70db44603f359047886f1109ce3d',
    attributes: {
      strength: 65,
      agility: 115,
      intelligence: 75,
      vitality: 70,
      defense: 60
    },
    abilities: [
      { name: '疾风刃', description: '凝聚风元素形成锋利的刀刃攻击敌人' },
      { name: '瞬间移动', description: '以风的速度短距离瞬间移动，闪避攻击' },
      { name: '龙卷风暴', description: '召唤小型龙卷风攻击周围敌人' },
      { name: '空气护盾', description: '创造空气屏障，减轻受到的伤害' }
    ],
    habitat: '高山之巅、云层之上',
    rarity: 'epic',
    isCollected: false,
    height: '可变',
    weight: '0kg',
    evolutionStage: 1
  },
  {
    id: '114',
    name: '焦容巨像',
    type: ['火', '岩石'],
    description: '面部被火焰烧灼至熔融状的岩石巨像，沉默而可怕。它的身体由坚硬的岩石构成，内部流淌着滚烫的岩浆，所到之处寸草不生。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Rock%20golem%20with%20molten%20face%2C%20fire%20and%20earth%20elements%2C%20volcano%20background%2C%20digital%20art&sign=404dc14c4b4e39bcb0b1bc5320f4d912',
    attributes: {
      strength: 120,
      agility: 35,
      intelligence: 50,
      vitality: 130,
      defense: 115
    },
    abilities: [
      { name: '熔岩拳', description: '用燃烧的岩石拳头重击敌人，造成高额伤害并附加烧伤效果' },
      { name: '地火喷发', description: '引发地下火焰喷发，对周围敌人造成范围伤害' },
      { name: '岩石护甲', description: '硬化皮肤，大幅提升防御力' },
      { name: '火焰威慑', description: '释放炽热气息，使敌人陷入恐惧状态' }
    ],
    habitat: '活火山内部、熔岩地带',
    rarity: 'epic',
    isCollected: false,
    height: '5m',
    weight: '8000kg',
    evolutionStage: 1
  },
  {
    id: '115',
    name: '雷音云螺',
    type: ['电', '飞行'],
    description: '漂浮在空中的巨大海螺，旋转时会发出雷鸣般的低沉音波。它的壳上布满了神秘的纹路，能吸收和释放雷电能量。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Giant%20floating%20conch%20shell%2C%20thunder%20sounds%2C%20electric%20aura%2C%20cloud%20background%2C%20digital%20art&sign=d9c41ca9fb32bd0ba73b38301121e3b2',
    attributes: {
      strength: 70,
      agility: 75,
      intelligence: 85,
      vitality: 80,
      defense: 75
    },
    abilities: [
      { name: '雷音波', description: '发出低沉的音波，对敌人造成伤害并震晕目标' },
      { name: '雷电螺旋', description: '旋转身体释放雷电，对多个敌人造成伤害' },
      { name: '电磁屏障', description: '创造电磁护盾，吸收伤害并反弹部分伤害' },
      { name: '云层移动', description: '操控云层快速移动，提升自身和同伴的速度' }
    ],
    habitat: '雷云区、风暴中心',
    rarity: 'rare',
    isCollected: false,
    height: '2m',
    weight: '500kg',
    evolutionStage: 1
  },
  {
    id: '116',
    name: '冥灯水母',
    type: ['水', '暗'],
    description: '在深海中发出幽暗光芒的水母，是指引也是陷阱。它的触须带有剧毒，能发出迷惑性的光芒吸引猎物，然后将其麻痹并捕食。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Deep%20sea%20jellyfish%20with%20dim%20light%2C%20poison%20tentacles%2C%20dark%20ocean%20background%2C%20digital%20art&sign=58301e6d12266446501bffc6c4a63837',
    attributes: {
      strength: 60,
      agility: 80,
      intelligence: 75,
      vitality: 70,
      defense: 65
    },
    abilities: [
      { name: '迷惑之光', description: '发出柔和的光芒，使敌人陷入混乱状态' },
      { name: '毒刺攻击', description: '用有毒的触须攻击敌人，造成伤害并附加中毒效果' },
      { name: '深海隐匿', description: '融入黑暗环境，提升自身闪避率' },
      { name: '黑暗治愈', description: '吸收黑暗能量缓慢恢复生命值' }
    ],
    habitat: '深海海沟、黑暗海域',
    rarity: 'rare',
    isCollected: false,
    height: '1.5m',
    weight: '15kg',
    evolutionStage: 1
  },
  {
    id: '117',
    name: '荒原孤狼',
    type: ['地面', '普通'],
    description: '在属性荒原上独自徘徊的狼，能呼唤风沙掩护自己。它的皮毛呈现出沙黄色，与周围环境融为一体，是出色的猎手。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Desert%20wolf%20howling%20at%20sandstorm%2C%20solo%20predator%2C%20wilderness%20background%2C%20digital%20art&sign=b2cd04d0747ee880202f2e5974ac3d7b',
    attributes: {
      strength: 75,
      agility: 90,
      intelligence: 70,
      vitality: 85,
      defense: 70
    },
    abilities: [
      { name: '风沙突击', description: '召唤风沙掩护自己，高速冲向敌人发动攻击' },
      { name: '精准撕咬', description: '瞄准敌人弱点发动致命撕咬，有几率造成额外伤害' },
      { name: '荒原感知', description: '提升自身感知能力，增加命中率和闪避率' },
      { name: '孤狼之嚎', description: '发出狼嚎，提升自身攻击力和速度' }
    ],
    habitat: '沙漠、戈壁滩、荒野',
    rarity: 'rare',
    isCollected: false,
    height: '1.2m',
    weight: '45kg',
    evolutionStage: 1
  },
  {
    id: '118',
    name: '焊铁炮虾',
    type: ['钢', '水'],
    description: '一只巨虾，其巨钳能过热发红，并喷射出熔化的金属弹丸。它的外壳由特殊合金构成，能承受极高的温度，是优秀的近距离战斗者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Giant%20prawn%20with%20heated%20claws%2C%20metal%20shell%2C%20water%20and%20steel%20elements%2C%20digital%20art&sign=c9b87cbf0f62292044a7023fde620d4c',
    attributes: {
      strength: 90,
      agility: 65,
      intelligence: 60,
      vitality: 95,
      defense: 100
    },
    abilities: [
      { name: '热熔炮弹', description: '发射高温熔化的金属弹丸攻击敌人' },
      { name: '焊铁钳', description: '用高温发红的巨钳夹击敌人，造成伤害并附加灼伤效果' },
      { name: '钢甲防护', description: '强化金属外壳，大幅提升防御力' },
      { name: '水炮冷却', description: '喷射水流冷却自身，恢复少量生命值并解除负面状态' }
    ],
    habitat: '深海热泉、工业港口附近',
    rarity: 'uncommon',
    isCollected: false,
    height: '1.3m',
    weight: '80kg',
    evolutionStage: 1
  },
  {
    id: '119',
    name: '孢子女皇',
    type: ['草', '毒'],
    description: '巨大的真菌主体，能释放出控制其他生物的寄生孢子。它的身体由无数真菌组成，能够缓慢移动，在它经过的地方会生长出奇异的蘑菇。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Giant%20fungal%20queen%2C%20spore%20clouds%2C%20forest%20floor%20background%2C%20mushroom%20growths%2C%20digital%20art&sign=dd6adf0254df7001b174398760f74526',
    attributes: {
      strength: 65,
      agility: 45,
      intelligence: 90,
      vitality: 100,
      defense: 85
    },
    abilities: [
      { name: '寄生孢子', description: '释放寄生孢子，控制敌人使其暂时成为己方战力' },
      { name: '毒雾扩散', description: '释放有毒雾气，对周围敌人造成持续伤害' },
      { name: '真菌生长', description: '召唤真菌生长，恢复自身生命值' },
      { name: '菌丝缠绕', description: '用菌丝束缚敌人，降低其速度和攻击力' }
    ],
    habitat: '阴暗森林、潮湿洞穴',
    rarity: 'uncommon',
    isCollected: false,
    height: '2m',
    weight: '150kg',
    evolutionStage: 1
  },
  {
    id: '120',
    name: '楔石灵',
    type: ['岩石', '超能'],
    description: '一块被注入灵魂的古老楔形石碑，拥有封印和镇压的力量。它的表面刻满了神秘的符文，能发出强大的精神能量，是古代文明的守护者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Ancient%20stele%20with%20soul%2C%20wedge%20shape%2C%20mystic%20runes%2C%20ruins%20background%2C%20digital%20art&sign=124eab5a71f40f5c37f019994694d50c',
    attributes: {
      strength: 85,
      agility: 30,
      intelligence: 105,
      vitality: 95,
      defense: 110
    },
    abilities: [
      { name: '封印术', description: '释放封印能量，使敌人无法使用技能' },
      { name: '石化凝视', description: '用神秘符文的力量将敌人暂时石化' },
      { name: '石碑守护', description: '激活石碑能量，大幅提升自身防御力' },
      { name: '精神压制', description: '释放强大的精神能量，降低敌人的智力和攻击力' }
    ],
    habitat: '古代遗迹、神秘陵墓',
    rarity: 'common',
    isCollected: false,
    height: '1.8m',
    weight: '1200kg',
    evolutionStage: 1
  },
  {
    id: '121',
    name: '次元跃迁者',
    type: ['超能', '暗'],
    description: '能在光与影的缝隙中进行短距离空间跳跃的神秘生物。它的身体呈现出半透明的状态，边缘闪烁着微弱的光芒，是出色的暗杀者和情报收集者。',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Mystic%20creature%20with%20teleportation%20ability%2C%20semi-transparent%20body%2C%20shadow%20and%20light%20elements%2C%20digital%20art&sign=6f1d65930e32d90844759b3e60286579',
    attributes: {
      strength: 70,
      agility: 100,
      intelligence: 95,
      vitality: 65,
      defense: 60
    },
    abilities: [
      { name: '次元跳跃', description: '在短距离内瞬间移动，闪避攻击并接近敌人' },
      { name: '影刃突袭', description: '从阴影中发动突袭，对敌人造成高额伤害' },
      { name: '空间扭曲', description: '扭曲周围空间，降低敌人的命中率' },
      { name: '光暗转换', description: '在光与暗之间转换形态，提升自身能力' }
    ],
    habitat: '次元缝隙、阴影之地',
    rarity: 'common',
    isCollected: false,
    height: '1.6m',
    weight: '40kg',
    evolutionStage: 1
  },
     {
     id: '122',
     name: 'Saber',
     type: ['光', '剑'],
     description: '来自遥远传说中的剑士宠兽，手持Excalibur圣剑，拥有无与伦比的剑技和高贵的品格。只能通过商店用金币购买，无法通过抽卡获得。',
      imageUrl: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/272890065666/attachment/20200412234350_vqlfm_20250904212426.jpg',
     attributes: {
       strength: 100,
       agility: 90,
       intelligence: 85,
       vitality: 95,
       defense: 80
     },
     abilities: [
       { name: '王权斩', description: '对敌方单体造成大量伤害' },
       { name: '圆桌誓言', description: '为我方全体回复大量生命值' },
       { name: 'Excalibur!', description: '对敌方全体造成大量伤害' },
       { name: '守护命运长夜', description: '我方全体角色在一回合内不受任何伤害' }
     ],
     habitat: '传说之国',
     rarity: 'special',
     isCollected: false,
     height: '1.6m',
     weight: '52kg',
     evolutionStage: 1
   }
   ];