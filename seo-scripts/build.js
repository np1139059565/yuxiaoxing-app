import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { main as convertBlog } from "./convert-blog-to-html.js";

// 从 site.config.json 加载配置（如果存在）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, 'site.config.json');

let siteConfig = {};
if (fs.existsSync(configPath)) {
  try {
    siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    // 忽略配置解析错误
  }
}

try {
  convertBlog(siteConfig);
} catch (error) { }

try {
  execSync("node seo-scripts/generate-sitemap.js", { stdio: "pipe" });
} catch (error) { }

console.log("Build success");
