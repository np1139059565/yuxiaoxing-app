import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { USER_STATS, DRAMAS } from "@/lib/data";
import { BookOpen, Mic, Flame, Trophy, ChevronRight, Star } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const stats = USER_STATS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white pb-24">
      {/* 头部 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-400 px-5 pt-12 pb-8 rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-white">瞬说</h1>
              <p className="text-orange-100 text-sm mt-0.5">不用背，开口就会</p>
            </div>
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1.5">
              <Flame className="w-4 h-4 text-yellow-200" />
              <span className="text-white text-sm font-bold">{stats.streakDays}天</span>
            </div>
          </div>
          <p className="text-white/90 text-lg font-medium mt-4">今日开口，不负时光 ✨</p>
        </div>
      </div>

      <div className="px-5 -mt-4 relative z-10">
        {/* 今日统计卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">今日学习进度</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">{stats.todayRemembered}</p>
              <p className="text-xs text-gray-400 mt-0.5">记住单词</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-bold text-purple-500">{stats.totalMastered}</p>
              <p className="text-xs text-gray-400 mt-0.5">已掌握</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">+{stats.reactionSpeed}%</p>
              <p className="text-xs text-gray-400 mt-0.5">反应速度</p>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate("/flashcard")}
            className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl p-4 text-left group active:scale-[0.98] transition-transform"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
            <BookOpen className="w-7 h-7 text-white mb-2" />
            <h3 className="text-white font-bold text-base">图像闪记</h3>
            <p className="text-orange-100 text-xs mt-0.5">看图就会，不用背</p>
            <ChevronRight className="w-4 h-4 text-white/60 absolute bottom-4 right-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/drama")}
            className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-400 rounded-2xl p-4 text-left group active:scale-[0.98] transition-transform"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
            <Mic className="w-7 h-7 text-white mb-2" />
            <h3 className="text-white font-bold text-base">短剧配音</h3>
            <p className="text-purple-100 text-xs mt-0.5">15秒一段，超上瘾</p>
            <ChevronRight className="w-4 h-4 text-white/60 absolute bottom-4 right-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 今日最佳 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-500" />
              今日最佳配音 ✨
            </h3>
          </div>
          <div className="space-y-3">
            {DRAMAS.filter((d) => d.isNew).map((drama) => (
              <button
                key={drama.id}
                onClick={() => navigate(`/drama/${drama.id}`)}
                className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow active:scale-[0.99]"
              >
                <img
                  src={drama.coverUrl}
                  alt={drama.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 text-left min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">
                    {drama.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex">
                      {Array.from({ length: drama.difficulty }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      {drama.tags.map((t) => `#${t}`).join(" ")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {drama.description}
                  </p>
                </div>
                <div className="bg-orange-50 text-orange-500 text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0">
                  今日新更
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 头图横幅 */}
        <div className="rounded-2xl overflow-hidden mb-4">
          <img
            src="/images/ef55279f-52b3-4895-8bad-201d7ee55a0d.png"
            alt="Language Learning"
            className="w-full h-36 object-cover"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}