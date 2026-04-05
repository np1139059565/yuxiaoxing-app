import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FLASHCARDS } from "@/lib/data";
import { ArrowLeft, Volume2, Star, X, Check, Heart, ChevronDown } from "lucide-react";

type SwipeDirection = "left" | "right" | "up" | "down" | null;

export default function FlashcardStudy() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emotionFilter = searchParams.get("emotion");
  const mode = searchParams.get("mode");

  const cards = emotionFilter
    ? FLASHCARDS.filter((c) => c.emotionGroup === emotionFilter)
    : FLASHCARDS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<SwipeDirection>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [consecutiveRight, setConsecutiveRight] = useState(0);
  const [showPartOfSpeech, setShowPartOfSpeech] = useState(false);
  const [remembered, setRemembered] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentCard = cards[currentIndex];

  // 极速模式自动前进
  useEffect(() => {
    if (mode === "speed" && !isFinished) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= cards.length - 1) {
            setIsFinished(true);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [mode, isFinished, cards.length]);

  const speak = useCallback((text: string, slow = false) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = slow ? 0.5 : 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const showFeedbackMsg = (msg: string) => {
    setFeedback(msg);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500);
  };

  const handleSwipe = (direction: SwipeDirection) => {
    setSwipeDir(direction);

    if (direction === "right") {
      setConsecutiveRight((prev) => {
        const next = prev + 1;
        if (next >= 5) {
          showFeedbackMsg("🎉 连续正确！你也太厉害啦");
          return 0;
        }
        return next;
      });
      setRemembered((prev) => prev + 1);
      showFeedbackMsg("✓ 记住啦！大脑又进步了");
    } else if (direction === "left") {
      setConsecutiveRight(0);
      showFeedbackMsg("→ 下次再试，不急～");
    } else if (direction === "up") {
      showFeedbackMsg("⭐ 已收藏，随时复习");
    } else if (direction === "down") {
      if (currentCard) {
        speak(`${currentCard.word}. ${currentCard.sentence}`, true);
      }
      showFeedbackMsg("🔊 慢读发音");
      setSwipeDir(null);
      return;
    }

    setTimeout(() => {
      setSwipeDir(null);
      setDragOffset({ x: 0, y: 0 });
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 300);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (mode === "speed") return;
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    longPressTimer.current = setTimeout(() => {
      setShowPartOfSpeech(true);
    }, 500);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || mode === "speed") return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      setShowPartOfSpeech(false);
    }
  };

  const handlePointerUp = () => {
    if (mode === "speed") return;
    setIsDragging(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setShowPartOfSpeech(false);

    const dx = dragOffset.x;
    const dy = dragOffset.y;
    const threshold = 80;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > threshold) handleSwipe("right");
      else if (dx < -threshold) handleSwipe("left");
      else setDragOffset({ x: 0, y: 0 });
    } else {
      if (dy < -threshold) handleSwipe("up");
      else if (dy > threshold) handleSwipe("down");
      else setDragOffset({ x: 0, y: 0 });
    }
  };

  // 听力模式
  if (mode === "listen") {
    return <ListenMode cards={cards} onBack={() => navigate("/flashcard")} speak={speak} />;
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {mode === "speed" ? "今日极速闪记完成 ✅" : "今日闪记完成！"}
        </h2>
        <p className="text-gray-500 mb-2">
          {mode === "speed"
            ? `记住了 ${cards.length} 个高频词`
            : `记住了 ${remembered} 个单词`}
        </p>
        <p className="text-sm text-gray-400 mb-8">太棒啦！明天继续加油哦～</p>
        <button
          onClick={() => navigate("/flashcard")}
          className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold px-8 py-3 rounded-xl active:scale-95 transition-transform"
        >
          返回
        </button>
        <button
          onClick={() => navigate("/drama")}
          className="mt-3 text-purple-500 font-medium text-sm"
        >
          去配音巩固所学单词 →
        </button>
      </div>
    );
  }

  if (!currentCard) return null;

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.min(Math.abs(dragOffset.x) / 300, 0.5);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col select-none touch-none overflow-hidden">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 relative z-20">
        <button
          onClick={() => navigate("/flashcard")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <p className="text-white/60 text-sm">听发音 → 想画面</p>
        <span className="text-white/60 text-sm font-medium">
          {currentIndex + 1}/{cards.length}
        </span>
      </div>

      {/* 闪记卡片 */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        {/* 划动指示 */}
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-opacity ${
            dragOffset.x < -30 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-red-500 rounded-full p-3">
            <X className="w-6 h-6 text-white" />
          </div>
        </div>
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-opacity ${
            dragOffset.x > 30 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-green-500 rounded-full p-3">
            <Check className="w-6 h-6 text-white" />
          </div>
        </div>
        <div
          className={`absolute top-4 left-1/2 -translate-x-1/2 transition-opacity ${
            dragOffset.y < -30 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-yellow-500 rounded-full p-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity ${
            dragOffset.y > 30 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-blue-500 rounded-full p-3">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </div>

        <div
          className={`w-full max-w-sm rounded-3xl overflow-hidden bg-white shadow-2xl transition-all ${
            swipeDir ? "duration-300" : isDragging ? "duration-0" : "duration-200"
          } ${
            swipeDir === "left"
              ? "-translate-x-[120%] -rotate-12"
              : swipeDir === "right"
              ? "translate-x-[120%] rotate-12"
              : swipeDir === "up"
              ? "-translate-y-[120%]"
              : ""
          }`}
          style={
            !swipeDir
              ? {
                  transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
                  opacity,
                }
              : undefined
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* 图片 */}
          <div className="relative aspect-square">
            <img
              src={currentCard.imageUrl}
              alt={currentCard.word}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {showPartOfSpeech && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {currentCard.partOfSpeech}
                </span>
              </div>
            )}
          </div>

          {/* 单词与例句 */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{currentCard.word}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentCard.word);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-orange-500" />
              </button>
            </div>
            <p
              className="text-gray-500 text-base cursor-pointer hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                speak(currentCard.sentence);
              }}
            >
              {currentCard.sentence}
            </p>
          </div>
        </div>

        {/* 反馈提示 */}
        {showFeedback && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-2.5 rounded-full text-sm font-medium animate-bounce z-30">
            {feedback}
          </div>
        )}
      </div>

      {/* 底部提示 */}
      <div className="pb-8 pt-4 text-center">
        <div className="flex items-center justify-center gap-6 text-white/40 text-xs">
          <span>← 跳过</span>
          <span>↑ 收藏</span>
          <span>↓ 慢读</span>
          <span>记住 →</span>
        </div>
      </div>
    </div>
  );
}

// 听力模式子组件
function ListenMode({
  cards,
  onBack,
  speak,
}: {
  cards: typeof FLASHCARDS;
  onBack: () => void;
  speak: (text: string, slow?: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    if (!isRevealed && currentCard) {
      const timer = setTimeout(() => {
        speak(currentCard.word);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isRevealed, currentCard, speak]);

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-4">👂</div>
        <h2 className="text-2xl font-bold text-white mb-2">闭眼听词完成！</h2>
        <p className="text-gray-400 mb-8">答对了 {correctCount} 个单词</p>
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold px-8 py-3 rounded-xl"
        >
          返回
        </button>
      </div>
    );
  }

  if (!currentCard) return null;

  const handleReveal = (guessedCorrect: boolean) => {
    setIsRevealed(true);
    if (guessedCorrect) setCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setIsRevealed(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex items-center justify-between px-4 pt-12 pb-3">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <p className="text-white/60 text-sm">闭眼听，在脑子里想画面哦</p>
        <span className="text-white/60 text-sm">{currentIndex + 1}/{cards.length}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {!isRevealed ? (
          <>
            <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mb-8 animate-pulse">
              <Volume2 className="w-10 h-10 text-indigo-400" />
            </div>
            <p className="text-white/40 text-sm mb-8">听到发音了吗？想想对应的画面...</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleReveal(true)}
                className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-transform"
              >
                ✅ 想到了！
              </button>
              <button
                onClick={() => handleReveal(false)}
                className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-transform"
              >
                🤔 没想到
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={currentCard.imageUrl}
              alt={currentCard.word}
              className="w-48 h-48 rounded-2xl object-cover mb-4"
            />
            <h2 className="text-3xl font-bold text-white mb-1">{currentCard.word}</h2>
            <p className="text-white/60 mb-6">{currentCard.sentence}</p>
            <button
              onClick={handleNext}
              className="bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl active:scale-95 transition-transform"
            >
              下一个 →
            </button>
          </>
        )}
      </div>

      {/* 进度条 */}
      <div className="px-6 pb-8">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}