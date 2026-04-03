import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { USER_STATS, EMOTION_GROUPS } from "@/lib/data";
import { ArrowLeft, Eye, Zap, Smile, Play } from "lucide-react";

export default function FlashcardHome() {
  const navigate = useNavigate();
  const stats = USER_STATS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg px-5 pt-12 pb-4 sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">单词不用背，看图就会</h1>
            <p className="text-xs text-gray-400">每天10分钟，碎片化记单词</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Progress Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <h3 className="text-sm font-medium text-orange-100 mb-3">我的进度</h3>
          <div className="grid grid-cols-3 gap-3 relative z-10">
            <div>
              <p className="text-3xl font-bold">{stats.todayRemembered}</p>
              <p className="text-xs text-orange-100 mt-0.5">今日记住</p>
            </div>
            <div>
              <p className="text-3xl font-bold">+{stats.reactionSpeed}%</p>
              <p className="text-xs text-orange-100 mt-0.5">反应速度</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalMastered}</p>
              <p className="text-xs text-orange-100 mt-0.5">已掌握</p>
            </div>
          </div>
          <p className="text-xs text-orange-100 mt-3 italic">
            再坚持3天，就能流利说出点餐相关单词啦 ☕
          </p>
        </div>

        {/* Mode Selection */}
        <h3 className="font-bold text-gray-800 mb-3">选择学习模式</h3>
        <div className="space-y-3 mb-6">
          <button
            onClick={() => navigate("/flashcard/study")}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-gray-800">开始闪记</h4>
              <p className="text-xs text-gray-400 mt-0.5">普通模式，左右滑动学习</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/flashcard/study?mode=listen")}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-gray-800">闭眼听</h4>
              <p className="text-xs text-gray-400 mt-0.5">闭眼听发音，在脑中联想画面</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/flashcard/study?mode=speed")}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-gray-800">极速闪</h4>
              <p className="text-xs text-gray-400 mt-0.5">0.5秒一张，极速记忆训练</p>
            </div>
          </button>
        </div>

        {/* Emotion Groups */}
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1.5">
          <Smile className="w-4 h-4" />
          情绪分组
        </h3>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {EMOTION_GROUPS.map((group) => (
            <button
              key={group.key}
              onClick={() => navigate(`/flashcard/study?emotion=${group.key}`)}
              className={`bg-gradient-to-br ${group.color} rounded-2xl p-3 text-center text-white active:scale-95 transition-transform`}
            >
              <span className="text-2xl block mb-1">{group.emoji}</span>
              <span className="text-xs font-bold">{group.label}</span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}