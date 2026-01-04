<pre align="center">
一个简洁、优雅、快速的静态博客模板！🚀 基于 Astro 5.0+ & Tailwind CSS 开发
</pre>

<div align="center">
<img alt="Ryuchan Logo" src="https://picbed.xiaozhangya.xin/blog/logo.png" width="280px">
</div>

[![license](https://badgen.net/github/license/kobaridev/RyuChan)](https://github.com/kobaridev/RyuChan/blob/main/LICENSE)&nbsp;&nbsp;&nbsp;[![release](https://badgen.net/github/release/kobaridev/RyuChan)](https://github.com/kobaridev/RyuChan/releases)

[**🖥️ Ryuchan Demo**](https://demo.131714.xyz)

## 📷 预览

![preview](https://picbed.xiaozhangya.xin/blog/preview-dark.png)

## ✨ 特点

- ✅ **白天** / **黑夜** 模式可用
- ✅ 极速的访问速度与优秀的 SEO
- ✅ 视图过渡动画（使用 ClientRouter）
- ✅ 支持文章全文搜索（Pagefind）
- ✅ 移动端优先的响应式设计（优化卡片布局、网格导航）
- ✅ 高度可配置的 Banner（支持随机图、打字机效果、高度自定义）
- ✅ 使用 [Tailwind CSS](https://tailwindcss.com/) 与 [daisyUI](https://daisyui.com/) 构建自适应页面
- ✅ RSS 订阅支持
- 🛠️ 博客易上手
  - 只需在 `ryuchan.config.yaml` 配置你的博客内容

## ✒️ 文章信息

|    名称     |   含义   | 是否必要 |
| :---------: | :------: | :------: |
|    title    | 文章标题 |    是    |
| description | 文章简介 |    是    |
|   pubDate   | 文章日期 |    是    |
|    image    | 文章封面 |    否    |
| categories  | 文章分类 |    否    |
|    tags     | 文章标签 |    否    |
|    badge    | 文章徽标 |    否    |
|    draft    | 草稿状态 |    否    |

> [!TIP]
>
> - 你可以通过把 `badge` 属性设置为 `Pin` 来置顶你的文章
> - 设置 `draft: true` 可将文章标记为草稿，草稿文章不会在列表显示

## ⬇️ 使用方法

1. 安装 pnpm 包管理器（如果你没有安装过的话）

```sh
npm i -g pnpm
```

2. 克隆项目

```sh
git clone https://github.com/kobaridev/RyuChan.git Ryuchan
```

3. 进入项目文件夹

```sh
cd Ryuchan
```

4. 安装依赖

```sh
pnpm i
```

5. 调试、运行项目

**首次运行或更新内容后**，请先执行 `search:index` 来生成搜索索引：

```sh
# 生成搜索索引以供开发时使用
pnpm run search:index

pnpm run dev
```

## 🔧 配置

Ryuchan 使用 `ryuchan.config.yaml` 作为配置文件，你可以在此文件中配置网站的基本信息、导航栏、页脚等内容。

### 网站基本信息 (site)

```yaml
site:
  tab: Ryuchan # 浏览器标签栏上显示的文本
  title: Ryuchan # 网站的主标题
  description: A clean, elegant, and fast static blog template! # 网站描述，用于SEO
  language: zh # 网站的语言代码，如"en"表示英文，"zh"表示中文
  favicon: /favicon.ico # 网站图标路径
```

### 主题设置 (theme)

```yaml
theme:
  light: winter # 浅色模式的主题，基于daisyUI的主题
  dark: dracula # 深色模式的主题，基于daisyUI的主题
  code: github-dark # 代码块的主题样式
```

- 主题基于 [daisyUI](https://daisyui.com/docs/themes/) 提供的主题选项
- 代码块主题使用 [Shiki](https://shiki.style/themes) 提供的样式

### 日期格式 (date_format)

```yaml
date_format: ddd MMM DD YYYY # 日期显示格式
```

### Banner 设置 (banner)

```yaml
banner:
  enableRandom: true # 是否启用随机图 API
  randomUrl: "https://t.alcy.cc/lai" # 随机图 API 地址
  randomCount: 5 # 生成的随机图数量
  height: "60vh" # Banner 高度配置
  images: # 如果不启用随机图，则使用此列表中的图片
    - "https://example.com/image1.jpg"
```

### 页面标题配置 (pages)

可以为不同页面配置独立的标题、副标题和打字机效果：

```yaml
pages:
  home:  
    title: "RyuChan's Blog"  
    subtitle: "欲买桂花同载酒，终不似，少年游！"   
    typewriterTexts: # 打字机文本列表
      - "🌸 欲买桂花同载酒，终不似，少年游！"  
      - "🌸花有重开日，人无再少年！"
```

### 菜单配置 (menu)

```yaml
menu:
  - id: home # 菜单项唯一标识符
    text: Home # 菜单显示的文本
    href: / # 链接地址
    svg: "material-symbols:home-outline-rounded" # 图标
    target: _self # 链接打开方式
```

每个菜单项包含以下属性：

- `id`: 唯一标识符
- `text`: 显示的文本
- `href`: 链接地址
- `svg`: 图标代码，使用 [Iconify](https://icon-sets.iconify.design/) 的图标集
- `target`: 链接打开方式(`_self`当前窗口或`_blank`新窗口)

#### 子菜单项 (subItems)

你可以通过添加 `subItems` 配置子菜单项，格式与主菜单项相同。

### 用户信息 (user)

```yaml
user:
  name: kobaridev # 用户名称
  site: "https://example.com" # 用户网站
  avatar: /profile.png # 用户头像
```

### 社交媒体配置 (social)

侧边栏和页脚可以配置不同的社交媒体链接：

```yaml
sidebar:
  social:
    - href: "https://github.com/kobaridev" # 链接地址
      ariaLabel: Github # 无障碍标签
      title: Github # 鼠标悬停时的提示
      svg: "ri:github-line" # 图标代码
```

### 图标设置 (icon)

Ryuchan 使用 [Iconify](https://icon-sets.iconify.design/) 作为图标库。你可以在其网站上搜索你喜欢的图标，然后复制图标的代码到配置文件中的 `svg` 字段。

### 语言设置 (language)

Ryuchan 支持多语言，通过以下方式配置：

1. 在 `ryuchan.config.yaml` 中设置网站默认语言：

```yaml
site:
  language: zh # 设置为 "zh" 使用中文，"en" 使用英文
```

2. 通过 `src/i18n/translations.yaml` 文件管理所有界面文本翻译：

```yaml
en: # 英文翻译
  label:
    noTag: No tags assigned
    tagCard: Tags
    # 其他英文标签...

zh: # 中文翻译
  label:
    noTag: 未分配标签
    tagCard: 标签
    # 其他中文标签...
```

#### 添加或修改翻译

要添加新的语言支持或修改现有翻译：

1. 在 `translations.yaml` 文件中添加新的语言代码和对应翻译，或修改现有翻译
2. 在 `ryuchan.config.yaml` 中更改 `site.language` 为你要使用的语言代码

## � 在线写作配置 (GitHub App)

Ryuchan 支持直接在博客后台在线编辑和发布文章。为了实现这一功能，你需要创建一个 GitHub App 并进行配置。

### 1. 创建 GitHub App

1.  登录 GitHub，进入 [Developer Settings > GitHub Apps](https://github.com/settings/apps)。
2.  点击 **New GitHub App**。
3.  填写以下信息：
    *   **GitHub App name**: 起一个名字（例如 `Ryuchan-Writer`）。
    *   **Homepage URL**: 你的博客地址（例如 `https://your-blog.com`）。
    *   **Callback URL**: `https://your-blog.com/write` (这一步很重要，用于 OAuth 回调)。
    *   取消勾选 **Expire user authorization tokens**。
    *   取消勾选 **Request user authorization (OAuth) during installation**。
    *   **Webhook**: 取消勾选 **Active**（我们不需要 Webhook）。

### 2. 设置权限 (Permissions)

在 **Repository permissions** 中设置：

*   **Contents**: 选择 `Read and write` (用于读取和保存文章)。
*   **Metadata**: 选择 `Read-only` (默认必选)。

### 3. 生成私钥 (Private Key)

1.  创建 App 后，滚动到底部。
2.  点击 **Generate a private key**。
3.  这将下载一个 `.pem` 文件。**请妥善保管此文件**，稍后在博客配置页需要导入它。

### 4. 安装 App

1.  在 App 设置页面的左侧菜单，点击 **Install App**。
2.  选择你的博客所在的账号或组织，点击 **Install**。
3.  选择 **Only select repositories**，并选择你的博客仓库（例如 `your-name/Ryuchan`）。
4.  点击 **Install**。

### 5. 获取配置信息

回到 App 的 **General** 设置页面，记录以下信息：

*   **App ID**: 页面顶部的 `App ID`。
*   **Client ID**: 页面顶部的 `Client ID`。

### 6. 配置博客

1.  打开你的博客，访问 `/config` 页面（或者点击右上角的设置图标）。
2.  在配置页中，点击 **导入密钥 (.pem)**，选择刚才下载的 `.pem` 文件。
3.  确保 `ryuchan.config.yaml` 中的仓库信息正确。

现在，你就可以访问 `/write` 页面开始在线写作了！

## �🚀 自动更新

你可以使用我们提供的更新脚本保持项目与 Ryuchan 的最新版本同步：

```sh
bash ryuchan.update.sh
```

该脚本将：

1.  **克隆最新版本** 的 Ryuchan 仓库。
2.  **安全地更新** 你的项目文件，根据 `.updateignore` 文件添加和覆盖文件。
3.  **智能地删除** 官方仓库中已移除的文件，而不会影响你忽略的文件。
4.  **清理** 任何残留的空文件夹和临时文件。
5.  使用 `pnpm` **安装或更新** 依赖项。

## 👀 问题

如果你有任何问题或建议，可以通过提交 Issues 来反馈或同开发者交流！

## 🎉 感谢


@[EveSunMaple](https://github.com/EveSunMaple) 本博客模板在其[Frosti](https://github.com/EveSunMaple/Frosti)模板基础上进行二创！

@[WhitePaper233](https://github.com/WhitePaper233) 
本博客部分设计，参考自其[yukina](https://github.com/WhitePaper233/yukina)！