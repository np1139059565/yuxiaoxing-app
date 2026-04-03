import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DRAMAS } from "@/lib/data";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  Mic,
  Square,
  RotateCcw,
  Star,
  Share2,
  Download,
  ChevronRight,
} from "lucide-react";

type DubbingStep = "preview" | "record" | "score" | "result";

export default function DramaDubbing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const drama = DRAMAS.find((d) => d.id === id);

  const [step, setStep] = useState<DubbingStep>("preview");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedLines, setRecordedLines] = useState<boolean[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedSkin, setSelectedSkin] = useState("原声");
  const [showShareToast, setShowShareToast] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recordTimerRef.current) clearTimeout(recordTimerRef.current);
    };
  }, []);

  if (!drama) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">短剧未找到</p>
      </div>
    );
  }

  const lines = drama.lines;

  // Preview step
  const togglePlayback = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      timerRef.current = setInterval(() => {
        setPlaybackTime((prev) => {
          const maxTime = lines[lines.length - 1].endTime;
          if (prev >= maxTime) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
  };

  const getActiveLineIndex = () => {
    for (let i = 0; i < lines.length; i++) {
      if (playbackTime >= lines[i].startTime && playbackTime < lines[i].endTime) {
        return i;
      }
    }
    return -1;
  };

  // Record step
  const startRecording = () => {
    setIsRecording(true);
    // Simulate 3 second recording
    recordTimerRef.current = setTimeout(() => {
      setIsRecording(false);
      const newRecorded = [...recordedLines];
      newRecorded[currentLineIndex] = true;
      setRecordedLines(newRecorded);

      // Generate mock score
      const score = Math.floor(Math.random() * 30) + 70;
      const newScores = [...scores];
      newScores[currentLineIndex] = score;
      setScores(newScores);
    }, 3000);
  };

  const stopRecording = () => {
    if (recordTimerRef.current) clearTimeout(recordTimerRef.current);
    setIsRecording(false);
    const newRecorded = [...recordedLines];
    newRecorded[currentLineIndex] = true;
    setRecordedLines(newRecorded);

    const score = Math.floor(Math.random() * 30) + 70;
    const newScores = [...scores];
    newScores[currentLineIndex] = score;
    setScores(newScores);
  };

  const reRecord = () => {
    const newRecorded = [...recordedLines];
    newRecorded[currentLineIndex] = false;
    setRecordedLines(newRecorded);
    const newScores = [...scores];
    newScores[currentLineIndex] = 0;
    setScores(newScores);
  };

  const nextLine = () => {
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      // Calculate total score
      const validScores = scores.filter((s) => s > 0);
      const avg = validScores.length > 0
        ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
        : 0;
      setTotalScore(avg);
      setStep("score");
    }
  };

  const skipLine = () => {
    nextLine();
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "太棒啦！发音超标准，堪比母语者～";
    if (score >= 60) return "不错哦！再调整一下语调，会更完美～";
    return "加油！多模仿几次，你一定可以的～";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🌟";
    if (score >= 60) return "👍";
    return "💪";
  };

  // PREVIEW STEP
  if (step === "preview") {
    const activeIdx = getActiveLineIndex();
    const maxTime = lines[lines.length - 1].endTime;
    const progress = (playbackTime / maxTime) * 100;

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <button
            onClick={() => navigate("/drama")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <p className="text-white/80 text-sm font-medium">先看原片，熟悉节奏</p>
          <div className="w-9" />
        </div>

        {/* Video area (simulated) */}
        <div className="mx-4 rounded-2xl overflow-hidden bg-gray-800 aspect-video flex items-center justify-center relative">
          <img
            src={drama.coverUrl}
            alt={drama.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={togglePlayback}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>
          </div>
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-purple-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Subtitles */}
        <div className="flex-1 px-4 pt-6 space-y-3">
          {lines.map((line, idx) => (
            <div
              key={line.id}
              className={`p-3 rounded-xl transition-all duration-300 ${
                idx === activeIdx
                  ? "bg-purple-500/20 border border-purple-500/40"
                  : "bg-white/5"
              }`}
            >
              <span className="text-xs text-purple-400 font-medium">
                {line.speaker}
              </span>
              <p
                className={`text-base mt-0.5 transition-colors ${
                  idx === activeIdx ? "text-white font-medium" : "text-white/50"
                }`}
              >
                {line.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom buttons */}
        <div className="px-4 pb-8 pt-4 flex gap-3">
          <button
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsPlaying(false);
              setPlaybackTime(0);
              setCurrentLineIndex(0);
              setRecordedLines([]);
              setScores([]);
              setStep("record");
            }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
          >
            开始录制
          </button>
          <button
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsPlaying(false);
              setPlaybackTime(0);
              setCurrentLineIndex(0);
              setRecordedLines([]);
              setScores([]);
              setStep("record");
            }}
            className="px-4 bg-white/10 text-white/60 font-medium py-3.5 rounded-xl text-sm"
          >
            跳过
          </button>
        </div>
      </div>
    );
  }

  // RECORD STEP
  if (step === "record") {
    const currentLine = lines[currentLineIndex];
    const lineScore = scores[currentLineIndex] || 0;
    const isLineRecorded = recordedLines[currentLineIndex] || false;

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <button
            onClick={() => setStep("preview")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <p className="text-white/80 text-sm font-medium">逐句录制，大胆开口</p>
          <span className="text-white/60 text-sm font-bold">
            {currentLineIndex + 1}/{lines.length}
          </span>
        </div>

        {/* Scene image */}
        <div className="mx-4 rounded-2xl overflow-hidden bg-gray-800 aspect-video flex items-center justify-center relative">
          <img
            src={drama.coverUrl}
            alt={drama.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-end p-4">
            <div className="w-full">
              <span className="text-xs text-purple-300 font-medium">
                {currentLine.speaker}
              </span>
              <p className="text-white text-xl font-bold mt-1">{currentLine.text}</p>
            </div>
          </div>
          {isRecording && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-500 px-2.5 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold">录制中</span>
            </div>
          )}
        </div>

        {/* Rhythm bar */}
        {isRecording && (
          <div className="mx-4 mt-3">
            <div className="flex gap-0.5 h-8 items-end">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-400 rounded-t animate-pulse"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
            <p className="text-center text-xs text-blue-400 mt-1">🔵 节奏刚好</p>
          </div>
        )}

        {/* Score feedback */}
        {isLineRecorded && lineScore > 0 && (
          <div className="mx-4 mt-4 bg-white/10 rounded-xl p-4 text-center">
            <p className="text-white text-lg font-bold">
              当前句得分：{lineScore}分 {getScoreEmoji(lineScore)}
            </p>
            <p className="text-white/60 text-xs mt-1">{getScoreMessage(lineScore)}</p>
          </div>
        )}

        <div className="flex-1" />

        {/* Controls */}
        <div className="px-4 pb-8 pt-4">
          <div className="flex items-center justify-center gap-6 mb-4">
            {!isRecording && isLineRecorded && (
              <button
                onClick={reRecord}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/60 text-[10px]">重录</span>
              </button>
            )}

            {!isRecording && !isLineRecorded ? (
              <button
                onClick={startRecording}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-400 flex items-center justify-center shadow-lg shadow-red-500/30 active:scale-95 transition-transform">
                  <Mic className="w-7 h-7 text-white" />
                </div>
                <span className="text-white/60 text-xs">录制</span>
              </button>
            ) : isRecording ? (
              <button
                onClick={stopRecording}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse active:scale-95 transition-transform">
                  <Square className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/60 text-xs">停止</span>
              </button>
            ) : null}

            {!isRecording && (
              <button onClick={skipLine} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <SkipForward className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/60 text-[10px]">跳过</span>
              </button>
            )}
          </div>

          {isLineRecorded && !isRecording && (
            <button
              onClick={nextLine}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-1"
            >
              {currentLineIndex < lines.length - 1 ? "下一句" : "完成录制"}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // SCORE STEP
  if (step === "score") {
    const pronunciation = Math.round(totalScore * 0.4);
    const intonation = Math.round(totalScore * 0.2 + Math.random() * 5);
    const stress = Math.round(totalScore * 0.2 + Math.random() * 3);
    const rhythm = Math.round(totalScore * 0.2 + Math.random() * 4);

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-950 flex flex-col items-center px-6 pt-16">
        <h2 className="text-white/80 text-sm font-medium mb-6">
          配音完成，看看你的得分吧！
        </h2>

        {/* Score Circle */}
        <div className="relative w-36 h-36 mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={totalScore >= 80 ? "#10B981" : totalScore >= 60 ? "#F59E0B" : "#EF4444"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(totalScore / 100) * 339.3} 339.3`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{totalScore}</span>
            <span className="text-white/60 text-xs">总分</span>
          </div>
        </div>

        <p className="text-white text-center font-medium mb-6">
          {getScoreEmoji(totalScore)} {getScoreMessage(totalScore)}
        </p>

        {/* Score Breakdown */}
        <div className="w-full bg-white/10 rounded-2xl p-4 mb-6 space-y-3">
          {[
            { label: "发音", score: pronunciation, max: 40 },
            { label: "语调", score: intonation, max: 20 },
            { label: "重音", score: stress, max: 20 },
            { label: "节奏", score: rhythm, max: 20 },
          ].map((dim) => (
            <div key={dim.label} className="flex items-center gap-3">
              <span className="text-white/60 text-sm w-10">{dim.label}</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${(dim.score / dim.max) * 100}%` }}
                />
              </div>
              <span className="text-white text-sm font-bold w-12 text-right">
                {dim.score}/{dim.max}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={() => {
              setCurrentLineIndex(0);
              setRecordedLines([]);
              setScores([]);
              setStep("record");
            }}
            className="w-full bg-white/10 text-white font-bold py-3.5 rounded-xl"
          >
            重新录制
          </button>
          <button
            onClick={() => setStep("result")}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
          >
            合成成片 🎬
          </button>
        </div>
      </div>
    );
  }

  // RESULT STEP
  if (step === "result") {
    const SKINS = ["原声", "御姐音", "正太音", "温柔音", "搞笑电音"];

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <button
            onClick={() => setStep("score")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <p className="text-white/80 text-sm font-medium">你的专属配音作品！</p>
          <div className="w-9" />
        </div>

        {/* Video result (simulated) */}
        <div className="mx-4 rounded-2xl overflow-hidden bg-gray-800 aspect-video relative">
          <img
            src={drama.coverUrl}
            alt={drama.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div>
              <p className="text-white font-bold">{drama.title}</p>
              <p className="text-white/60 text-xs mt-0.5">
                配音皮肤：{selectedSkin} | 得分：{totalScore}分
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 text-white/30 text-[8px]">
            瞬说APP | 你的专属配音作品
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* Skin Selection */}
        <div className="px-4 mt-4">
          <p className="text-white/60 text-sm mb-2">配音皮肤（点击切换）</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SKINS.map((skin) => (
              <button
                key={skin}
                onClick={() => setSelectedSkin(skin)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedSkin === skin
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {skin}
              </button>
            ))}
          </div>
        </div>

        {/* Lines recap */}
        <div className="px-4 mt-4 flex-1">
          <div className="space-y-2">
            {lines.map((line, idx) => (
              <div key={line.id} className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
                <span className="text-xs text-purple-400 font-medium w-6">{line.speaker}</span>
                <p className="text-white/80 text-sm flex-1">{line.text}</p>
                {scores[idx] > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">{scores[idx]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-4 pb-8 pt-4 flex gap-3">
          <button
            onClick={() => {
              setShowShareToast(true);
              setTimeout(() => setShowShareToast(false), 2000);
            }}
            className="flex-1 bg-white/10 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            保存本地
          </button>
          <button
            onClick={() => {
              setShowShareToast(true);
              setTimeout(() => setShowShareToast(false), 2000);
            }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Share2 className="w-4 h-4" />
            分享
          </button>
        </div>

        {/* Toast */}
        {showShareToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-2.5 rounded-full text-sm font-medium z-50 animate-bounce">
            ✅ 操作成功！
          </div>
        )}
      </div>
    );
  }

  return null;
}