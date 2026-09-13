# LeRobot 文档中文站（官方文档复刻）

把 https://huggingface.co/docs/lerobot 的**全部文档**复刻为简体中文静态站点。
页面样式由官方 [`doc-builder`](https://github.com/huggingface/doc-builder) 的 SvelteKit 主题（kit）渲染，与官网主体风格一致；图片与代码内容保持原样。

- 109 个页面全部翻译（含 9 个 API 参考页的 docstring 描述）
- 左侧导航、右侧“本页目录”、“复制页面”等界面文案均为中文
- **专业术语英文优先**：policy、dataset、checkpoint、episode、rollout、token、benchmark、inference、fine-tune、
  teleoperation、leader/follower arm、gripper、end-effector、calibration、demonstration、simulation、
  observation、action、state 等直接保留英文（见 `tools/GLOSSARY.md`）
- 6497 个翻译单元，经程序校验：占位符（代码/链接/标签）100% 完整、页面结构零损坏
- 纯中文版本备份在 `tools/units_zh_zhonly/`（如需回退中文术语，替换回 `units_zh` 后重跑注入与构建即可）

## 预览

```powershell
python tools/serve_site.py
# 浏览器打开 http://localhost:8090/docs/lerobot/main/en/index.html
```

> 站点资源路径以 `/docs/lerobot/main/en/` 为根（与官网一致），所以需要用上面的小服务器预览，
> 直接双击 HTML 文件会缺少样式。

## 部署到 Vercel / EdgeOne Makers

纯静态，无需构建，两种方式任选：

- **CLI（最快）**：在项目根目录执行 `npx vercel --prod`（首次会要求登录）
- **Git 导入**：把本仓库推到 GitHub，在平台导入并直接 Deploy

平台配置文件均已提供：

- `vercel.json`：`outputDirectory: site`、`cleanUrls`、根路径跳转
- `edgeone.json`（EdgeOne Makers）：`outputDirectory: ./site`、根路径 302 跳转
- `site/index.html`：根路径兜底跳转页（即使平台不读取上述配置，访问 `/` 也会自动跳转）

部署后访问 `https://<域名>/docs/lerobot/main/en/`；访问根路径 `/` 会自动跳转到该首页。
站点文件按官网 URL 结构放在 `site/docs/lerobot/main/en/` 下，站内绝对链接（`/docs/lerobot/main/en/...`）
可直接命中。

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `site/` | **最终站点**（109 个 HTML + 自带 CSS/JS；位于 `site/docs/lerobot/main/en/`，与官网 URL 结构一致） |
| `source/` | 官方仓库 `huggingface/lerobot` 的稀疏检出（`docs/`、`src/`、`pyproject.toml`） |
| `tools/mdx_en/` | doc-builder 展开后的英文 MDX（`[[autodoc]]` 已展开为 API 文档） |
| `tools/units_en/` | 从 MDX 抽取的翻译单元（JSON，代码/链接/标签用占位符 ⟦n⟧ 保护） |
| `tools/units_zh/` | 各单元的中文译文（`zh` 字段） |
| `tools/mdx_zh/` | 注入译文后的中文 MDX |
| `tools/toctree_zh.yml` | 中文目录（侧边栏） |
| `tools/shots/` | 验收截图 |

## 流水线脚本（`tools/`）

| 脚本 | 用途 |
| --- | --- |
| `extract.py` | 从展开后的 MDX 抽取可翻译单元 → `units_en/` |
| `check_zh.py` | 校验译文：id 齐全、占位符 ⟦n⟧ 每个恰好出现一次、无空翻译 |
| `keep_english.py` | 术语英文优先：按词组/动词场景回注英文并规范中英混排空格 |
| `inject.py` | 注入译文（还原占位符）→ `mdx_zh/`，并补 GitHub 源码链接 |
| `sanity_check.py` | 翻译前后结构对比（页头/页脚/代码围栏/组件数量一致） |
| `build_site.py` | 用官方 kit 渲染整站 → `site/` |
| `serve_site.py` | 本地预览服务器（处理无扩展名链接与 `/docs/...` 前缀） |
| `link_check.py` | 全站链接爬取检查（当前 0 坏链） |
| `screenshot.py` | 无头 Edge 截图（验收用） |

### 更新译文后重新构建

```powershell
# 1) 修改 tools/units_zh/<页面>.json 中对应 unit 的 "zh"
python tools/check_zh.py           # 2) 校验占位符完整性
python tools/inject.py             # 3) 组装中文 MDX
python tools/build_site.py tools/mdx_zh/lerobot/main/en site   # 4) 重新渲染
```

术语策略调整（英文优先 / 纯中文）：纯中文译文在 `tools/units_zh_zhonly/`；
从纯中文版重新应用“英文优先”只需 `python tools/keep_english.py`（就地改写 `units_zh`，随后执行 2)–4)）。

## 已知差异（相对官网）

- 不含 huggingface.co 外层全局导航/搜索（那部分由官网外壳提供，非文档构建产物）
- API 页中少量上游源文档自带的 `:pymeth:` 等 Sphinx 角色残留（官网同样存在）
- 版本选择器、语言切换等官网外壳功能未包含

## 许可与致谢

- 文档内容翻译自 [huggingface/lerobot](https://github.com/huggingface/lerobot) 的官方文档（Apache-2.0），
  本仓库的译文、工具链同样以 **Apache-2.0** 发布（见 `LICENSE`）。
- 页面渲染使用 Hugging Face 官方 [doc-builder](https://github.com/huggingface/doc-builder) 的 SvelteKit 主题（Apache-2.0）。

## 重建环境说明（如需从头再来）

1. `pip install hf-doc-builder`（并安装 `huggingface/doc-builder` 仓库版以获得完整功能）
2. `git clone --filter=blob:none --sparse https://github.com/huggingface/lerobot source`
   然后 `git sparse-checkout set --no-cone docs .github/workflows src pyproject.toml`
3. 展开英文 MDX：
   `PYTHONPATH=source/src doc-builder build lerobot source/docs/source --build_dir tools/mdx_en --version main`
   （需要 `pip install` LeRobot 的基础/数据集依赖，使 `[[autodoc]]` 能导入模块）
4. 之后按上面的“流水线脚本”执行。
