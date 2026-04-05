import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function AuthErrorPage() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const errorMessage =
    searchParams.get('msg') ||
    '抱歉，您的认证信息无效或已过期';

  useEffect(() => {
    // 倒计时逻辑
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to home page
          // 重定向到首页
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up timer
    // 清理计时器
    return () => clearInterval(timer);
  }, []);

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-4">
          {/* 错误图标 */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
              <AlertCircle
                className="relative h-12 w-12 text-red-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* 错误标题 */}
          <h1 className="text-2xl font-bold text-gray-800">
            认证错误
          </h1>

          {/* 错误描述 */}
          <p className="text-base text-muted-foreground">{errorMessage}</p>

          {/* Countdown提示 */}
          <div className="pt-2">
            <p className="text-sm text-gray-500">
              {countdown > 0 ? (
                <>
                  将在{' '}
                      <span className="text-blue-600 font-semibold text-base">
                        {countdown}
                      </span>{' '}
                      秒后自动返回首页
                </>
              ) : (
                '正在重定向...'
              )}
            </p>
          </div>
        </div>

        {/* 返回首页按钮 */}
        <div className="flex justify-center pt-2">
          <Button onClick={handleReturnHome} className="px-6">
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}
