import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { USER_STATS, FLASHCARDS, DRAMAS } from "@/lib/data";
import {
  BookOpen,
  Mic,
  Flame,
  Trophy,
  Star,
  Settings,
  HelpCircle,
  Info,
  ChevronRight,
  Heart,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const stats = USER_STATS;
  const favoritedCards = FLASHCARDS.filter((c) => c.isFavorited);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* 头部 */}
      <div className="bg-gradient-to-br from-orange-500 to-purple-500 px-5 pt-12 pb-8 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            😊
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">语言学习者</h2>
            <p className="text-white/70 text-sm mt-0.5">坚持学习第 {stats.streakDays} 天</p>
          </div>
        </div>

        {/* 统计 */}
        <div className="relative z-10 grid grid-cols-4 gap-2 mt-6 bg-white/10 rounded-xl p-3">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{stats.totalMastered}</p>
            <p className="text-[10px] text-white/60">已掌握</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{stats.totalWorks}</p>
            <p className="text-[10px] text-white/60">配音作品</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{stats.streakDays}</p>
            <p className="text-[10px] text-white/60">连续天数</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">+{stats.reactionSpeed}%</p>
            <p className="text-[10px] text-white/60">反应提升</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 relative z-10">
        {/* 成就徽章 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-yellow-500" />
            我的成就
          </h3>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                🔥
              </div>
              <span className="text-[10px] text-gray-500 mt-1">连续5天</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                🎤
              </div>
              <span className="text-[10px] text-gray-500 mt-1">配音达人</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                📚
              </div>
              <span className="text-[10px] text-gray-500 mt-1">闪记大师</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                🔒
              </div>
              <span className="text-[10px] text-gray-400 mt-1">待解锁</span>
            </div>
          </div>
        </div>

        {/* 我的词库 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              我的词库
            </h3>
            <button
              onClick={() => navigate("/flashcard")}
              className="text-orange-500 text-xs font-medium flex items-center gap-0.5"
            >
              查看全部 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {favoritedCards.length === 0 ? (
            <div className="text-center py-4">
              <Heart className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-xs">还没有收藏单词哦，去闪记页面收藏吧～</p>
            </div>
          ) : (
            <div className="space-y-2">
              {favoritedCards.slice(0, 3).map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-3 bg-orange-50 rounded-xl p-2.5"
                >
                  <img
                    src={card.imageUrl}
                    alt={card.word}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{card.word}</p>
                    <p className="text-gray-400 text-xs">{card.sentence}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 我的作品 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-purple-500" />
              我的配音作品
            </h3>
            <button
              onClick={() => navigate("/drama")}
              className="text-purple-500 text-xs font-medium flex items-center gap-0.5"
            >
              查看全部 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {stats.totalWorks === 0 ? (
            <div className="text-center py-4">
              <Mic className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-xs">
                还没有配音作品哦，快去录制你的第一条作品吧～
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {DRAMAS.slice(0, stats.totalWorks).map((drama) => (
                <button
                  key={drama.id}
                  onClick={() => navigate(`/drama/${drama.id}`)}
                  className="rounded-xl overflow-hidden relative aspect-square"
                >
                  <img
                    src={drama.coverUrl}
                    alt={drama.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1.5">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-[10px] font-bold">85</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 设置菜单 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {[
            { icon: Settings, label: "设置", color: "text-gray-500" },
            { icon: HelpCircle, label: "帮助与反馈", color: "text-blue-500" },
            { icon: Info, label: "关于瞬说", color: "text-purple-500" },
          ].map((item, idx) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                idx < 2 ? "border-b border-gray-50" : ""
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-gray-700 text-sm font-medium flex-1 text-left">
                {item.label}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}