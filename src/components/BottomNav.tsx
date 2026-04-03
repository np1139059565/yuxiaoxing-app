import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Mic, User } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "首页", icon: Home },
  { path: "/flashcard", label: "闪记", icon: BookOpen },
  { path: "/drama", label: "配音", icon: Mic },
  { path: "/profile", label: "我的", icon: User },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-orange-500 scale-105"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-all ${isActive ? "stroke-[2.5px]" : ""}`}
              />
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-orange-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}