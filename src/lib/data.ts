// Mock data for 瞬说 Language Learning App

export interface Flashcard {
  id: string;
  word: string;
  partOfSpeech: string;
  sentence: string;
  imageUrl: string;
  level: number; // 0=new, 1=initial, 2=consolidate, 3=proficient, 4=mastered
  rightSwipeCount: number;
  leftSwipeCount: number;
  isFavorited: boolean;
  emotionGroup?: "happy" | "tired" | "angry" | "daily";
}

export interface Drama {
  id: string;
  title: string;
  category: "daily" | "emotion" | "funny" | "passion";
  difficulty: 1 | 2 | 3;
  tags: string[];
  coverUrl: string;
  description: string;
  isNew: boolean;
  lines: DramaLine[];
}

export interface DramaLine {
  id: string;
  speaker: string;
  text: string;
  startTime: number;
  endTime: number;
}

export interface UserStats {
  todayLearned: number;
  todayRemembered: number;
  totalMastered: number;
  reactionSpeed: number; // percentage change vs yesterday
  streakDays: number;
  totalWorks: number;
}

export const FLASHCARDS: Flashcard[] = [
  {
    id: "1",
    word: "coffee",
    partOfSpeech: "n.",
    sentence: "I drink coffee every morning.",
    imageUrl: "https://mgx-backend-cdn.metadl.com/generate/images/13357/2026-04-02/02edde0d-812a-4356-abdf-5c1f9a8efa78.png",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "happy",
  },
  {
    id: "2",
    word: "hello",
    partOfSpeech: "interj.",
    sentence: "Hello! How are you?",
    imageUrl: "https://mgx-backend-cdn.metadl.com/generate/images/13357/2026-04-02/49c4c302-1b68-4c13-b241-6c87a126925e.png",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "happy",
  },
  {
    id: "3",
    word: "eat",
    partOfSpeech: "v.",
    sentence: "I want to eat lunch.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "daily",
  },
  {
    id: "4",
    word: "happy",
    partOfSpeech: "adj.",
    sentence: "I am so happy today!",
    imageUrl: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "happy",
  },
  {
    id: "5",
    word: "tired",
    partOfSpeech: "adj.",
    sentence: "I feel tired after work.",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "tired",
  },
  {
    id: "6",
    word: "drink",
    partOfSpeech: "v.",
    sentence: "I drink water every day.",
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "daily",
  },
  {
    id: "7",
    word: "angry",
    partOfSpeech: "adj.",
    sentence: "Don't be angry with me.",
    imageUrl: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "angry",
  },
  {
    id: "8",
    word: "go",
    partOfSpeech: "v.",
    sentence: "Let's go to the park!",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "daily",
  },
  {
    id: "9",
    word: "smile",
    partOfSpeech: "v.",
    sentence: "She has a beautiful smile.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "happy",
  },
  {
    id: "10",
    word: "sleepy",
    partOfSpeech: "adj.",
    sentence: "I am very sleepy now.",
    imageUrl: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=800&auto=format",
    level: 0,
    rightSwipeCount: 0,
    leftSwipeCount: 0,
    isFavorited: false,
    emotionGroup: "tired",
  },
];

export const DRAMAS: Drama[] = [
  {
    id: "d1",
    title: "便利店不小心说漏嘴",
    category: "funny",
    difficulty: 1,
    tags: ["日常", "搞笑", "简单"],
    coverUrl: "https://mgx-backend-cdn.metadl.com/generate/images/13357/2026-04-02/d6d9886a-0519-4fe1-846b-ea1762553b68.png",
    description: "零基础也能轻松驾驭，在便利店的搞笑对话～",
    isNew: true,
    lines: [
      { id: "l1", speaker: "A", text: "Hello! Can I help you?", startTime: 0, endTime: 2.5 },
      { id: "l2", speaker: "B", text: "Yes, I want a coffee please.", startTime: 2.5, endTime: 5.5 },
      { id: "l3", speaker: "A", text: "Sure! That is three dollars.", startTime: 5.5, endTime: 8.5 },
    ],
  },
  {
    id: "d2",
    title: "第一次和外国人搭讪",
    category: "daily",
    difficulty: 1,
    tags: ["日常", "简单"],
    coverUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format",
    description: "学会和外国人简单搭讪，实用又好玩～",
    isNew: true,
    lines: [
      { id: "l1", speaker: "A", text: "Hi! Nice to meet you!", startTime: 0, endTime: 2 },
      { id: "l2", speaker: "B", text: "Nice to meet you too!", startTime: 2, endTime: 4 },
      { id: "l3", speaker: "A", text: "Where are you from?", startTime: 4, endTime: 6 },
      { id: "l4", speaker: "B", text: "I am from America.", startTime: 6, endTime: 8 },
    ],
  },
  {
    id: "d3",
    title: "餐厅点餐大冒险",
    category: "daily",
    difficulty: 1,
    tags: ["日常", "点餐"],
    coverUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format",
    description: "在餐厅轻松点餐，学会实用口语～",
    isNew: false,
    lines: [
      { id: "l1", speaker: "A", text: "What would you like to eat?", startTime: 0, endTime: 2.5 },
      { id: "l2", speaker: "B", text: "I want a hamburger please.", startTime: 2.5, endTime: 5 },
      { id: "l3", speaker: "A", text: "Anything to drink?", startTime: 5, endTime: 7 },
      { id: "l4", speaker: "B", text: "A coffee, thank you!", startTime: 7, endTime: 9 },
    ],
  },
  {
    id: "d4",
    title: "深夜emo安慰你",
    category: "emotion",
    difficulty: 2,
    tags: ["情感", "安慰"],
    coverUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format",
    description: "学会用英语安慰朋友，温暖又治愈～",
    isNew: false,
    lines: [
      { id: "l1", speaker: "A", text: "Are you okay? You look sad.", startTime: 0, endTime: 3 },
      { id: "l2", speaker: "B", text: "I had a bad day today.", startTime: 3, endTime: 5.5 },
      { id: "l3", speaker: "A", text: "Don't worry. I am here for you.", startTime: 5.5, endTime: 8.5 },
    ],
  },
  {
    id: "d5",
    title: "社死现场之打错招呼",
    category: "funny",
    difficulty: 1,
    tags: ["搞笑", "社死"],
    coverUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format",
    description: "超级搞笑的社死瞬间，笑着学英语～",
    isNew: true,
    lines: [
      { id: "l1", speaker: "A", text: "Hey! Long time no see!", startTime: 0, endTime: 2.5 },
      { id: "l2", speaker: "B", text: "Sorry, who are you?", startTime: 2.5, endTime: 4.5 },
      { id: "l3", speaker: "A", text: "Oh no! Wrong person!", startTime: 4.5, endTime: 7 },
    ],
  },
  {
    id: "d6",
    title: "加油！你可以的！",
    category: "passion",
    difficulty: 2,
    tags: ["热血", "鼓励"],
    coverUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format",
    description: "充满力量的鼓励对话，提升开口自信～",
    isNew: false,
    lines: [
      { id: "l1", speaker: "A", text: "I can not do this anymore.", startTime: 0, endTime: 2.5 },
      { id: "l2", speaker: "B", text: "Yes you can! Believe in yourself!", startTime: 2.5, endTime: 5.5 },
      { id: "l3", speaker: "A", text: "Thank you! I will try again!", startTime: 5.5, endTime: 8 },
    ],
  },
];

export const USER_STATS: UserStats = {
  todayLearned: 12,
  todayRemembered: 8,
  totalMastered: 45,
  reactionSpeed: 12,
  streakDays: 5,
  totalWorks: 3,
};

export const EMOTION_GROUPS = [
  { key: "happy" as const, label: "开心", emoji: "✨", color: "from-yellow-400 to-orange-400" },
  { key: "tired" as const, label: "疲惫", emoji: "😴", color: "from-blue-400 to-indigo-400" },
  { key: "angry" as const, label: "生气", emoji: "😠", color: "from-red-400 to-pink-400" },
  { key: "daily" as const, label: "日常", emoji: "🌿", color: "from-green-400 to-emerald-400" },
];

export const CATEGORY_MAP: Record<string, string> = {
  daily: "日常",
  emotion: "情感",
  funny: "搞笑",
  passion: "热血",
};

export const DIFFICULTY_MAP: Record<number, string> = {
  1: "零基础",
  2: "入门",
  3: "提升",
};