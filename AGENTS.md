# AGENTS.md

本文件面向在本仓库工作的 AI Agent / 开发者，说明项目定位、命令、设计基准与修改边界。

## 1. 项目概览

- 这是一个 **Shopify Online Store 2.0 主题**（Liquid），不是独立前端应用。
- 店铺：`01qfgs-sv.myshopify.com`，线上域名 `https://www.vesperrobot.au`。
- 后端（商品、订单、购物车、支付、客户账号）全部由 Shopify 提供，本仓库只负责呈现层。
- 仓库地址：`https://github.com/Randyren2024/shopify-vesper`（远程名 `origin`，主分支 `master`）。
- 主题来源：由一份 Vue 版落地页 + 一套旧的 AgriTech 主题逐步合并而来，因此**同时存在两套历史遗留命名**（见第 5 节）。

## 2. 环境与命令

需要 Shopify CLI v3+（当前使用 v5.0.0），已在本机完成 `shopify auth login`（账号 `alan01@vesperrobot.au`）。

```powershell
# 列出主题，含 [live] 标记与主题 ID
shopify theme list --store 01qfgs-sv.myshopify.com

# 推送本地改动到指定主题（推荐指定 ID，避免推错主题）
shopify theme push --store 01qfgs-sv.myshopify.com --theme <THEME_ID>

# 推送并新建一个未发布主题
shopify theme push --store 01qfgs-sv.myshopify.com --unpublished --theme-name "Vesper Robot vX"

# 设为线上生效
shopify theme publish --store 01qfgs-sv.myshopify.com --theme <THEME_ID> --force

# 本地实时预览（不写远端）
shopify theme dev --store 01qfgs-sv.myshopify.com

# 代码规范检查
shopify theme check
```

注意事项：

- 非交互终端（CI / Agent）执行 `publish` 必须带 `--force`，否则报 `Flag not specified: --force`。
- **不要使用 `shopify theme push --live`**：它会直接覆盖线上主题。正确流程是推送到指定主题 → 预览链接核对 → 再 `publish`。
- 预览链接格式：`https://www.vesperrobot.au/<路径>?preview_theme_id=<THEME_ID>`。
- 线上旧主题不会被删除，回滚方式是再 `publish` 原主题 ID。

## 3. 目录结构

```
layout/theme.liquid         全站入口，按 template.name 分流首页与其他页
layout/password.liquid
sections/                   各页面区块（vesper-* 为自有区块，其余为旧 AgriTech 区块）
sections/header-group.json  全站共用 header（含 section 顺序与设置）
sections/footer-group.json  全站共用 footer
sections/agri-*-group.json  旧分组，已不再被 theme.liquid 引用，仅保留
snippets/                   可复用片段（图标、卡片、产品文案、SEO meta）
templates/                  JSON 模板，决定每个页面用哪些 section
assets/                     CSS / JS / 图片（99 个文件，约 31 MB）
config/settings_data.json   主题设置（通常不改，除非明确要求）
blocks/ locales/            主题块与翻译
```

关键文件：

| 文件 | 作用 |
| --- | --- |
| `layout/theme.liquid` | CSS 加载顺序、首页/非首页分流、全局脚本 |
| `sections/header.liquid` | **全站唯一 header**（fixed、56px、含购物车与账号入口） |
| `sections/footer.liquid` | 全站唯一 footer |
| `assets/vesper-core.css` | 设计 token（`--v-*`）与共享组件 |
| `assets/vesper-robot.css` | Tailwind 编译产物 + preflight，首页主样式 |
| `assets/vesper-unify.css` | 最后加载的收敛层（字体/底色/头部留白） |
| `assets/vesper-base.css` | 页面级组件样式，`--vesper-*` token 映射到 `--v-*` |
| `snippets/vesper-icons.liquid` | 统一图标集 |
| `snippets/vesper-product-content-*.liquid` | 按 product.handle 组织的产品页文案 |

## 4. 设计系统：主页是唯一基准

`https://www.vesperrobot.au/`（首页）是唯一视觉基准，其余所有页面都必须向它对齐。**不要引入第二套配色或第二套字体。**

### 颜色 token

| 用途 | 值 | token |
| --- | --- | --- |
| 品牌深绿（主色） | `#1e3d1e` | `--v-green` / `--vesper-primary` |
| 绿色 hover | `#2d5a2d` | `--v-green-hover` |
| 深绿 dark | `#16301a` | `--vesper-primary-dark` |
| 品牌橙（强调/前缀点） | `#c85a0a` | `--v-orange` |
| 墨黑（文字） | `#111110` | `--v-ink` |
| 次级灰（文字） | `#6b6b68` | `--v-ink-soft` |
| 米白（页面底色） | `#f8f7f4` | `--v-bg` |
| 浅灰（色块/芯片底色） | `#eeecea` | `--v-bg-alt` |
| 分隔线 | `rgba(17,17,16,.1)` | `--v-line` |
| 亮绿（首页 CTA 专用） | `#8de600` | `--vesper-accent` |

### 字体与尺寸

- 正文：`--v-font: "Barlow", system-ui, sans-serif`
- 标题：`--v-font-display: "Barlow Condensed", "Barlow", system-ui, sans-serif`
- 主题**不加载 webfont**（曾因 Google Fonts 阻塞首屏而移除），Barlow 栈实际回落到系统 UI 字体。新增字体请求前必须先说明性能影响。
- Header 固定高度 `--v-nav-height: 56px`；非首页正文用 `.v-main` 的 `padding-top` 让出空间。

### 图标规范

- 统一通过 `{% render 'vesper-icons', icon: 'cart', class: 'v-icon' %}` 引用，不要在页面里内联手写 SVG。
- 描边宽度统一 `1.5`（与 header 一致）。
- 尺寸：正文/列表图标 16px，分享按钮 18px。
- 徽章（badge / chip）统一：`background: #eeecea` + `1px solid rgba(17,17,16,.1)` + 11–12px 全大写 + 品牌橙小圆点前缀，不要做多色轮换。

## 5. CSS 分层与加载顺序（必须遵守）

`layout/theme.liquid` 对首页与非首页走两条分支：

**首页**：`vesper-robot.css` → `vesper-core.css`（外加一段内联的移动端优化 `<style>`）。首页区块大量使用内联 style，按原样保留。

**非首页**：

```
css-variables (snippet)
critical.css        （preload）
vesper-base.css
vesper-robot.css    （header/footer 用到的 Tailwind 工具类）
vesper-core.css     （--v-* token + 共享组件）
vesper-unify.css    （必须最后，字体/底色/头部留白）
```

规则：

- 新增页面级 CSS 必须放在 `vesper-core.css` **之前**，否则会被 token/组件层覆盖。
- `vesper-unify.css` 永远是最后一层，不要在它之后加样式表。
- 页面 CSS 使用 `v-` / `vpd-` / 页面专属前缀，禁止使用 `.container` `.grid` `.btn` `.card` `.hero` 这类无前缀类名（会与 Tailwind preflight 冲突）。

## 6. Liquid 约定

- 自有 section 命名 `vesper-*.liquid`，模板通过 `templates/*.json` 引用，不改旧模板的 section 组成，除非明确要求。
- header / footer 只改 `header-group.json`、`footer-group.json` 引用的那两个 section；`agri-header-group.json`、`agri-footer-group.json` 已废弃，不要重新接回去。
- 所有站内链接用 `routes.*` 或 `{{ routes.root_url }}` 前缀，不要硬编码域名。
- 文本走 `{{ '...' | t }}` 或 section settings，不要把文案写死在逻辑里。
- 产品页文案按 handle 拆分在 `snippets/vesper-product-content-<handle>.liquid`；`sections/vesper-product-detail.liquid` 通过 `product.handle` 选择 snippet 并渲染 `vpd_badges` / `vpd_features`。

## 7. 表单链路（当前是两条独立链路）

| 入口 | 实现 | 数据落点 |
| --- | --- | --- |
| 首页 / `page.submitform` / `page.formsucces` | Shopify Forms app block（`form_id 1208064`） | Shopify Forms 应用 |
| `page.contact-us` | 原生 `{% form 'contact' %}` | 仅发送邮件，**不落库** |

改造表单前先确认目标是"统一到一条链路"还是"保持现状"，不要默认合并。

## 8. 修改边界

**必须做**

- 改动前先 `shopify theme check`，确认新增 offense 为 0（基线约 82 offenses / 16 files，均来自旧主题遗留）。
- 视觉类改动推送后用 `preview_theme_id` 链接核对，必要时截图比对首页基准。
- 改配色只改 token 或按第 4 节色值替换，不允许出现第二套绿色/蓝色/紫色。

**不要做**

- 不要 `push --live`、不要删主题、不要改 `config/settings_data.json`（除非明确要求）。
- 不要重新引入 Google Fonts 或其他第三方字体。
- 不要在非首页引入 Tailwind 工具类（编译产物只包含原构建用到的类，新类会静默失效）。
- 不要只改 `sections/vesper-header.liquid` / `vesper-footer.liquid` 还期望生效——它们已不被引用。
- 不要把 `_` 开头的废弃文件"顺手清理"，除非明确要求。

## 9. 提交约定

- 提交信息中文，格式：`模块: 变更点`，例如 `主题: 全站对齐主页配色与字体`。
- 提交前 `git status` 确认只包含本次意图内的文件；`assets/` 下大图不要误加。
- 推送远端：`git push origin master`。
