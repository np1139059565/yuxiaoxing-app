import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { DRAMAS, DIFFICULTY_MAP } from "@/lib/data";
import { ArrowLeft, Search, Star, Sparkles } from "lucide-react";

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "daily", label: "日常" },
  { key: "emotion", label: "情感" },
  { key: "funny", label: "搞笑" },
  { key: "passion", label: "热血" },
];

const DIFFICULTIES = [
  { key: 0, label: "全部" },
  { key: 1, label: "1星" },
  { key: 2, label: "2星" },
  { key: 3, label: "3星" },
];

export default function DramaList() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDramas = DRAMAS.filter((d) => {
    if (activeCategory !== "all" && d.category !== activeCategory) return false;
    if (activeDifficulty !== 0 && d.difficulty !== activeDifficulty) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q)) ||
        d.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24">
      {/* 头部 */}
      <div className="bg-white/80 backdrop-blur-lg px-5 pt-12 pb-4 sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">短剧配音，演着学口语</h1>
            <p className="text-xs text-gray-400">15秒一段，开口无压力</p>
          </div>
        </div>

        {/* 搜索 */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索短剧标题或关键词（如：点餐、表白）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* 分类选项卡 */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 难度筛选 */}
        <div className="flex gap-2 mt-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.key}
              onClick={() => setActiveDifficulty(diff.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeDifficulty === diff.key
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  : "bg-gray-50 text-gray-400 border border-gray-100"
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* 短剧列表 */}
      <div className="px-5 pt-4 space-y-3">
        {filteredDramas.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🎬</p>
            <p className="text-gray-400">暂无相关短剧，换个分类或难度试试吧～</p>
          </div>
        ) : (
          filteredDramas.map((drama) => (
            <button
              key={drama.id}
              onClick={() => navigate(`/drama/${drama.id}`)}
              className="w-full flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.99] text-left"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={drama.coverUrl}
                  alt={drama.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                {drama.isNew && (
                  <div className="absolute top-1 left-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    新
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 py-0.5">
                <h3 className="font-bold text-gray-800 text-sm truncate">{drama.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex">
                    {Array.from({ length: drama.difficulty }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                    {Array.from({ length: 3 - drama.difficulty }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-gray-200" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {DIFFICULTY_MAP[drama.difficulty]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {drama.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1 truncate">{drama.description}</p>
              </div>
            </button>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}