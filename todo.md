# 瞬说 (ShuoShuo) - 语言学习APP Web版 MVP

## 设计指南

### 设计参考
- **Duolingo**：活泼、色彩丰富、游戏化的学习体验
- **多邻国 / Babbel**：干净的移动优先设计，卡片式交互
- **风格**：现代移动优先 + 俏皮 + 温暖渐变

### 颜色方案
- 主色（Primary）：#FF6B35（暖橙 — 主要 CTA、充满活力）
- 辅色（Secondary）：#7C3AED（紫色 — 点缀、成就）
- 成功（Success）：#10B981（绿色 — 正确/已记住）
- 警示（Warning）：#F59E0B（黄色 — 速度较慢）
- 错误（Error）：#EF4444（红色 — 跳过/错误）
- 背景（Background）：#FAFAF8（暖白）
- 卡片（Card）：#FFFFFF
- 主文本（Text Primary）：#1A1A2E（深海军蓝）
- 次文本（Text Secondary）：#6B7280（灰色）
- 渐变（Gradient）：linear-gradient(135deg, #FF6B35, #FF8C61)

### 字体排版
- 标题：Inter，字体粗细 700
- 正文：Inter，字体粗细 400
- UI 文本统一使用中文（与 PRD 保持一致）

### 关键组件样式
- 卡片：白色背景，rounded-2xl，shadow-lg，hover 提升效果
- 按钮：圆角（rounded-full），主按钮使用渐变背景，粗体文本
- 闪记卡片：全屏、可滑动、以大图为主
- 底部导航：固定底部，4 个选项卡并带图标
- 移动视口：最大宽度 max-w-md 居中展示

### 需要生成的图片
1. **hero-language-learning.jpg** - 色彩丰富的抽象插图，表现语言学习，包含对话气泡、书籍、地球等元素（风格：极简且鲜明）
2. **flashcard-coffee.jpg** - 咖啡杯在咖啡馆桌上的摄影感图，暖色光线，氛围舒适（风格：照片级写实）
3. **flashcard-hello.jpg** - 友好的人群在街头打招呼，多元化群体，温暖阳光（风格：照片级写实）
4. **flashcard-eat.jpg** - 餐桌上美味菜肴的照片，色彩诱人（风格：照片级写实）
5. **drama-cafe-scene.jpg** - 两人在咖啡吧台聊天的场景插画，友好对话（风格：卡通/插画，暖色调）
6. **drama-street-scene.jpg** - 城市街道上询路的互动场景插画，体现助人情境（风格：卡通/插画，暖色调）

---

## Development Tasks & Files

### 开发任务与文件

#### 需创建的文件（最多 8 个）:

1. **src/pages/Index.tsx** - 主页：品牌介绍、底部导航、今日统计、最佳配音展示
2. **src/pages/FlashCardHome.tsx** - 闪记入口页：模式选择、情绪分组、进度统计
3. **src/pages/FlashCardStudy.tsx** - 全屏滑动的闪记学习页，支持手势交互
4. **src/pages/DramaList.tsx** - 配音短剧列表：分类/难度筛选、搜索、卡片网格
5. **src/pages/DramaDubbing.tsx** - 完整的配音流程：预览 → 录音 → 打分 → 结果
6. **src/pages/Profile.tsx** - 用户资料页：统计、词库、我的作品、设置
7. **src/components/BottomNav.tsx** - 通用底部导航组件（首页 / 闪记 / 配音 / 我的）
8. **src/data/mockData.ts** - 所有 mock 数据（闪记卡、短剧、用户统计）