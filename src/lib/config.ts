// 运行时配置
let runtimeConfig: {
  API_BASE_URL: string;
} | null = null;

// 配置加载状态
let configLoading = true;

// 默认后备配置
const defaultConfig = {
  API_BASE_URL: 'http://127.0.0.1:8000', // 仅在运行时配置加载失败时使用
};

// 加载运行时配置的函数
export async function loadRuntimeConfig(): Promise<void> {
  try {
    console.log('🔧 DEBUG: Starting to load runtime config...');
    // 尝试从配置接口加载配置
    const response = await fetch('/api/config');
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      // 只有当响应确实是 JSON 时才解析为 JSON
      if (contentType && contentType.includes('application/json')) {
        runtimeConfig = await response.json();
        console.log('Runtime config loaded successfully');
      } else {
        console.log(
          '配置端点返回非 JSON 响应，跳过运行时配置'
        );
      }
    } else {
      console.log(
        '🔧 DEBUG: 配置获取失败，状态码：',
        response.status
      );
    }
  } catch (error) {
    console.log('加载运行时配置失败，使用默认配置：', error);
  } finally {
    configLoading = false;
    console.log(
      '🔧 DEBUG: 配置加载完成，configLoading 设置为 false'
    );
  }
}

// 获取当前配置
export function getConfig() {
  // 如果配置仍在加载中，返回默认配置以避免使用过期的 Vite 环境变量
  if (configLoading) {
    console.log('Config still loading, using default config');
    return defaultConfig;
  }

  // 优先使用运行时配置（用于 Lambda）
  if (runtimeConfig) {
    console.log('Using runtime config');
    return runtimeConfig;
  }

  // 然后尝试使用 Vite 环境变量（用于本地开发）
  if (import.meta.env.VITE_API_BASE_URL) {
    const viteConfig = {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    };
    console.log('Using Vite environment config');
    return viteConfig;
  }

  // 最后回退到默认配置
  console.log('Using default config');
  return defaultConfig;
}

// 动态的 API_BASE_URL 访问器 - 始终返回当前配置
export function getAPIBaseURL(): string {
  const baseURL = getConfig().API_BASE_URL;
  // 如果基础 URL 只是 '/'，返回空字符串以避免双斜杠或错误的 http:// 前缀
  if (baseURL === '/') {
    return '';
  }
  return baseURL;
}

// 为兼容性保留（但不推荐）
// 已移除静态导出以防止使用过期的配置值
// export const API_BASE_URL = getAPIBaseURL();

export const config = {
  get API_BASE_URL() {
    return getAPIBaseURL();
  },
};
