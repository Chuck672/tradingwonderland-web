# BBS 社区模块开发需求文档

## 项目背景

基于现在我的交易教学网站TradingWonderLand，技术栈如下(请自行核对)：
- **框架**: Next.js (App Router)
- **认证**: NextAuth.js
- **ORM**: Drizzle ORM
- **数据库**: MySQL (Hostinger 托管)
- **部署环境**: Hostinger Node.js 主机，1.5GB RAM，2 CPU Cores，200GB 磁盘

现在需要在现有项目中 **新增一个独立的 BBS 社区模块**，让会员可以打卡签到、发布交易心得、分享策略。

---

## ⚠️ 核心原则（必须严格遵守）

1. **绝不修改任何现有文件的代码逻辑**。已有的页面、API、组件、schema 不能被改动
2. **共用现有的 NextAuth 会员认证系统**，通过 `getServerSession()` 或 `useSession()` 获取当前用户，不要新建任何认证逻辑
3. **共用现有的 Drizzle 数据库连接实例**（通常在 `src/db/index.ts` 或 `src/lib/db.ts` 中），不要新建数据库连接
4. **所有 BBS 相关代码必须集中在独立目录中**，方便后续维护和排查问题
5. **所有新增数据表以 `bbs_` 为前缀**，避免与现有表冲突
6. **使用 Drizzle ORM 定义 schema 和执行查询**，不要写原生 SQL
7. **图片上传存储到本地 `public/uploads/bbs/` 目录**，不使用第三方云存储
8. **内存敏感**：服务器只有 1.5GB RAM，不要引入 Redis、MongoDB 或任何重型依赖
9. **不修改现有用户表**：用户扩展信息通过新建 `bbs_user_profiles` 表实现

---

## 开发前准备工作（Step 1）

在写任何代码之前，请先：

1. **阅读项目根目录的 `package.json`**，了解已安装的依赖和 Next.js 版本
2. **阅读 `drizzle.config.ts`**，了解数据库连接配置方式
3. **阅读现有的 Drizzle schema 文件**（通常在 `src/db/schema.ts` 或 `src/db/schema/` 目录），找到 `users` 表的定义，确认用户表名和主键字段名（可能是 `id`、`userId` 或其他）
4. **阅读 NextAuth 配置文件**（通常在 `src/app/api/auth/[...nextauth]/route.ts` 或 `src/lib/auth.ts`），了解 session 中包含哪些用户字段
5. **阅读现有的数据库连接实例导出位置**，确认 import 路径
6. **确认项目使用的是 App Router 还是 Pages Router**
7. **确认项目使用的 CSS 方案**（Tailwind CSS / CSS Modules / styled-components 等）
8. **确认是否使用 UI 组件库**（shadcn/ui、Ant Design、MUI 等）

### 额外需要汇报的会员体系信息

9. **用户表中是否有以下相关字段**（列出字段名和类型）：
   - 角色/权限相关（role, type, permission...）
   - 会员等级相关（plan, tier, level, membership...）
   - 订阅状态相关（subscription, subscriptionStatus, isPremium, isPaid...）
   - 会员到期时间（expiresAt, validUntil, subscriptionEnd...）
10. **NextAuth session 中是否包含上述字段**，还是只有基本的 id/name/email/image
11. **是否有现有的支付/订阅相关表**（如 subscriptions, payments, orders 等）

将以上所有信息汇总后告诉我，等我确认后再开始编码。

---

## 文件结构要求

所有 BBS 相关代码必须按以下结构组织：

```
src/
├── db/
│   └── schema/
│       └── bbs.ts                    ← 【新增】BBS 所有表的 Drizzle schema
│
├── app/
│   └── bbs/                          ← 【新增】BBS 前端页面（独立路由组）
│       ├── layout.tsx                ← BBS 专属布局
│       ├── page.tsx                  ← BBS 首页（帖子列表）
│       ├── post/
│       │   ├── new/
│       │   │   └── page.tsx          ← 发帖页面
│       │   └── [id]/
│       │       └── page.tsx          ← 帖子详情 + 回帖
│       ├── checkin/
│       │   └── page.tsx              ← 打卡签到页面
│       ├── bookmarks/
│       │   └── page.tsx              ← 我的收藏页面 (Phase 2)
│       └── components/               ← BBS 专属组件
│           ├── PostCard.tsx           ← 帖子卡片
│           ├── PostForm.tsx           ← 发帖表单
│           ├── ReplyForm.tsx          ← 回帖表单
│           ├── ReplyList.tsx          ← 回复列表
│           ├── CategoryFilter.tsx     ← 分类筛选
│           ├── CheckinButton.tsx      ← 打卡按钮
│           ├── CheckinCalendar.tsx    ← 打卡日历热力图
│           ├── ImageUpload.tsx        ← 图片上传组件
│           ├── Pagination.tsx         ← 分页组件
│           ├── PermissionGuard.tsx    ← 权限提示组件
│           ├── LikeButton.tsx         ← 点赞按钮 (Phase 2)
│           ├── BookmarkButton.tsx     ← 收藏按钮 (Phase 2)
│           ├── SearchBar.tsx          ← 搜索框 (Phase 2)
│           ├── CheckinRanking.tsx     ← 打卡排行榜 (Phase 2)
│           ├── MonthlyTopPosts.tsx    ← 月度热帖 (Phase 2)
│           └── MentionInput.tsx       ← @提醒输入框 (Phase 2)
│
│   └── api/
│       └── bbs/                      ← 【新增】BBS API 路由
│           ├── posts/
│           │   ├── route.ts           ← GET(列表) + POST(发帖)
│           │   └── [id]/
│           │       ├── route.ts       ← GET(详情) + PUT(编辑) + DELETE(删除)
│           │       └── replies/
│           │           └── route.ts   ← GET(回复列表) + POST(回复)
│           ├── checkin/
│           │   └── route.ts           ← GET(打卡状态) + POST(打卡)
│           ├── upload/
│           │   └── route.ts           ← POST(图片上传)
│           ├── profile/
│           │   └── route.ts           ← GET(社区档案) + PUT(更新档案)
│           ├── likes/                  ← Phase 2
│           │   └── route.ts
│           ├── bookmarks/              ← Phase 2
│           │   └── route.ts
│           ├── search/                 ← Phase 2
│           │   └── route.ts
│           └── ranking/                ← Phase 2
│               └── route.ts
│
├── lib/
│   └── bbs/                          ← 【新增】BBS 工具函数
│       ├── permissions.ts             ← 权限判断逻辑
│       ├── actions.ts                 ← Server Actions（如果使用）
│       └── utils.ts                   ← BBS 专用工具函数（时间格式化等）
│
└── public/
    └── uploads/
        └── bbs/                      ← 【新增】BBS 图片上传目录
            └── .gitkeep
```

---

## 数据库 Schema 设计

在 `src/db/schema/bbs.ts` 中定义以下所有表。
注意：`users` 表的引用要使用现有 schema 中的实际表名和字段名。

### Phase 1 表

#### 1. `bbs_categories` - 版块分类表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| name | varchar(100) | NOT NULL | 分类名称 |
| slug | varchar(100) | UNIQUE, NOT NULL | URL 友好标识 |
| description | text | nullable | 分类描述 |
| sortOrder | int | default 0 | 排序权重 |
| isVipOnly | boolean | default false | 是否 VIP 专属版块 |
| requiredRole | enum('member','vip','moderator','admin') | default 'member' | 发帖所需最低角色 |
| createdAt | timestamp | default now() | |

预设分类数据（需要生成 seed 脚本）：

| name | slug | isVipOnly | requiredRole | description |
|------|------|-----------|--------------|-------------|
| 心态记录 | mindset | false | vip | 记录交易中的心理变化和情绪管理 |
| 交易心得 | insights | false | vip | 分享交易中的经验和教训 |
| 策略分享 | strategy | false | vip | 分享交易策略和方法论 |
| 风险控制 | risk-management | false | vip | 讨论风控方法和资金管理 |
| 其他讨论 | general | false | member | 自由讨论区 |

#### 2. `bbs_user_profiles` - 社区用户档案表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| userId | 与 users 主键类型一致 | UNIQUE, 外键 → users.主键 | 一对一关系 |
| nickname | varchar(50) | nullable | 社区昵称，为空则用原始 name |
| signature | varchar(200) | nullable | 个性签名 |
| bbsRole | enum('member','vip','moderator','admin') | default 'member' | 社区角色 |
| postCount | int | default 0 | 发帖数（冗余计数） |
| replyCount | int | default 0 | 回帖数（冗余计数） |
| totalCheckins | int | default 0 | 累计打卡天数 |
| maxStreak | int | default 0 | 历史最长连续打卡天数 |
| createdAt | timestamp | default now() | |
| updatedAt | timestamp | default now() on update | |

#### 3. `bbs_posts` - 帖子表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| categoryId | int | NOT NULL, 外键 → bbs_categories.id | |
| userId | 与 users 主键类型一致 | NOT NULL, 外键 → users.主键 | |
| title | varchar(255) | NOT NULL | 标题 |
| content | text | NOT NULL | 内容，支持换行 |
| images | json | nullable | 图片 URL 数组 |
| viewCount | int | default 0 | 浏览量 |
| isPinned | boolean | default false | 是否置顶 |
| isDeleted | boolean | default false | 软删除标记 |
| createdAt | timestamp | default now() | |
| updatedAt | timestamp | default now() on update | |

#### 4. `bbs_replies` - 回复表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| postId | int | NOT NULL, 外键 → bbs_posts.id | |
| userId | 与 users 主键类型一致 | NOT NULL, 外键 → users.主键 | |
| content | text | NOT NULL | 回复内容 |
| isDeleted | boolean | default false | 软删除标记 |
| createdAt | timestamp | default now() | |

#### 5. `bbs_checkins` - 打卡签到表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| userId | 与 users 主键类型一致 | NOT NULL, 外键 → users.主键 | |
| checkinDate | date | NOT NULL | 打卡日期 |
| note | text | nullable | 今日交易感悟 |
| streakDays | int | default 1 | 当前连续打卡天数 |
| createdAt | timestamp | default now() | |
| | | UNIQUE(userId, checkinDate) | 每人每天只能打卡一次 |

### Phase 2 表

#### 6. `bbs_likes` - 点赞表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| userId | 与 users 主键类型一致 | NOT NULL, 外键 → users.主键 | |
| postId | int | nullable, 外键 → bbs_posts.id | 给帖子点赞 |
| replyId | int | nullable, 外键 → bbs_replies.id | 给回复点赞 |
| createdAt | timestamp | default now() | |
| | | UNIQUE(userId, postId) | |
| | | UNIQUE(userId, replyId) | |

#### 7. `bbs_bookmarks` - 收藏表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | int | 自增主键 | |
| userId | 与 users 主键类型一致 | NOT NULL, 外键 → users.主键 | |
| postId | int | NOT NULL, 外键 → bbs_posts.id | |
| createdAt | timestamp | default now() | |
| | | UNIQUE(userId, postId) | |

---

## 会员权限体系

### 权限判断逻辑

创建 `src/lib/bbs/permissions.ts`：

**Step 1**: 先阅读现有用户表的字段，确认是否已有角色/会员等级相关字段

**如果现有用户表已有付费状态字段**（如 role、plan、subscription 等）：
- 在 BBS API 中直接读取该字段判断权限
- `bbs_user_profiles.bbsRole` 仅用于 BBS 内部额外角色（如版主）
- 付费状态优先于 bbsRole

**如果现有用户表没有付费状态字段**：
- 完全依赖 `bbs_user_profiles.bbsRole` 管理权限
- 管理员手动设置 VIP

### 权限矩阵

| 功能 | guest (未登录) | member (普通会员) | vip (付费会员) | moderator (版主) | admin (管理员) |
|------|:-:|:-:|:-:|:-:|:-:|
| 浏览帖子 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 浏览打卡页 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 回帖 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 每日打卡 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 点赞/收藏 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 删除自己的帖子/回复 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 发帖 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 上传图片 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 进入 VIP 专属版块 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 删除他人帖子/回复 | ❌ | ❌ | ❌ | ✅ | ✅ |
| 置顶帖子 | ❌ | ❌ | ❌ | ✅ | ✅ |

### 权限工具函数结构

```typescript
export type BBSRole = 'guest' | 'member' | 'vip' | 'moderator' | 'admin'

export interface BBSPermissions {
  canViewPosts: boolean
  canCreatePost: boolean
  canReply: boolean
  canUploadImage: boolean
  canCheckin: boolean
  canLike: boolean
  canBookmark: boolean
  canDeleteOwnPost: boolean
  canDeleteAnyPost: boolean
  canPinPost: boolean
  canAccessVipCategory: boolean
}

export function getPermissions(role: BBSRole): BBSPermissions
export async function getUserBBSRole(session: any): Promise<BBSRole>
export async function ensureBBSProfile(userId: string): Promise<BBSUserProfile>
```

### 用户首次进入 BBS 的自动初始化

当用户第一次访问 BBS 相关页面或 API 时：
1. 检查 `bbs_user_profiles` 是否存在该用户的记录
2. 如果不存在，自动创建一条记录
3. `bbsRole` 的初始值根据用户在原表中的付费状态决定（如果有的话）
4. 这个逻辑封装在 `ensureBBSProfile(userId)` 函数中，所有 BBS API 都调用它

### 前端权限提示

- 普通会员点击「发帖」按钮时，显示提示弹窗："升级为付费会员即可发帖，享受更多社区特权"，并提供跳转到付费页面的按钮
- 未登录用户点击任何交互按钮时，显示"请先登录"并跳转到登录页
- **不要隐藏按钮**，而是展示按钮但点击后给出引导提示（促进转化）

---

## Phase 1 功能详细需求

### 1. 帖子列表页 (`/bbs`)

- 显示所有帖子（`isDeleted = false`），按创建时间倒序排列，置顶帖（`isPinned = true`）优先
- 每个帖子卡片显示：
  - 标题
  - 作者头像 + 昵称（优先显示 bbs_user_profiles.nickname，没有则显示 users.name）
  - 分类标签（带颜色区分）
  - 发布时间（相对时间，如"2小时前"）
  - 回复数
  - 浏览量
  - 置顶标记（如果 isPinned = true）
- 顶部分类筛选标签栏：全部 / 心态记录 / 交易心得 / 策略分享 / 风险控制 / 其他讨论
- 支持分页（每页 20 条）
- 右上角"发帖"按钮：
  - 已登录 VIP+ 用户：正常跳转发帖页
  - 已登录普通会员：弹出升级提示
  - 未登录：跳转登录页

### 2. 发帖页面 (`/bbs/post/new`)

- 需要登录且有发帖权限才能访问，否则：
  - 未登录 → 跳转登录页
  - 无权限 → 显示升级提示页面
- 表单字段：
  - 分类选择（下拉框，必选，只显示用户有权限发帖的分类）
  - 标题（必填，最大 100 字符）
  - 内容（必填，textarea，支持换行，最大 5000 字符）
  - 图片上传（可选，最多 9 张，每张最大 5MB，仅限 jpg/png/gif/webp）
- 图片上传支持拖拽或点击，上传后显示缩略图预览，可删除已上传图片
- 发布成功后跳转到帖子详情页
- 发布成功后更新 `bbs_user_profiles.postCount + 1`

### 3. 帖子详情页 (`/bbs/post/[id]`)

- 显示帖子完整内容、图片（网格排列，可点击放大预览）、作者信息、发布时间
- 每次访问 `viewCount + 1`（通过单独的 API 调用实现，避免 Server Action 重复计数）
- 下方显示回复列表（按时间正序排列）
- 每条回复显示：作者头像 + 昵称、回复内容、回复时间
- 回复输入框（需登录，member 及以上角色均可回帖）
- 作者本人可以删除自己的帖子和回复（软删除，设置 `isDeleted = true`）
- moderator/admin 可以删除任何帖子和回复

### 4. 回复功能

- 需要登录，member 及以上角色均可
- 回复内容最大 2000 字符
- 服务端校验内容长度
- 发布回复后，回复列表实时刷新（不需要刷新整个页面）
- 发布成功后更新 `bbs_user_profiles.replyCount + 1`

### 5. 每日打卡 (`/bbs/checkin`)

- 需要登录，member 及以上角色均可打卡
- 页面布局：
  - 顶部：当前连续打卡天数（大数字突出展示）+ 累计打卡天数
  - 中部：打卡按钮 + "今日交易感悟"输入框（可选填）
  - 下方：本月打卡日历（用绿色方块标记已打卡日期，类似 GitHub 贡献热力图）
  - 底部：最近 30 天的打卡记录列表（日期 + 感悟内容）
- 已打卡状态：按钮变灰，显示"今日已打卡 ✅"
- 连续打卡天数计算逻辑：
  - 查询昨天是否有打卡记录
  - 如果有：`streakDays = 昨天的 streakDays + 1`
  - 如果没有：`streakDays = 1`（重新开始）
- 打卡成功后更新：
  - `bbs_checkins` 新增记录
  - `bbs_user_profiles.totalCheckins + 1`
  - `bbs_user_profiles.maxStreak = max(maxStreak, 当前 streakDays)`

### 6. 图片上传 API (`/api/bbs/upload`)

- POST 请求，接收 `multipart/form-data`
- 使用 Next.js App Router 内置的 `Request.formData()` 处理文件上传（**不要用 multer**，与 App Router 不兼容）
- 保存到 `public/uploads/bbs/` 目录
- 文件名格式：`{timestamp}-{random8位}.{ext}`
- 返回图片 URL：`/uploads/bbs/{filename}`
- 限制：
  - 单文件最大 5MB
  - 仅允许 `image/jpeg`、`image/png`、`image/gif`、`image/webp`
  - 同时检查 MIME type 和文件扩展名
- 需要登录且有图片上传权限（VIP 及以上）

---

## Phase 2 功能详细需求

### 7. 点赞功能

- 可以给帖子或回复点赞
- 再次点击取消点赞（toggle 机制）
- 帖子卡片和帖子详情页显示点赞数
- 已点赞状态用实心图标，未点赞用空心图标
- 需要登录，member 及以上角色均可
- API：`POST /api/bbs/likes`，body: `{ postId?: number, replyId?: number }`

### 8. 收藏功能

- 可以收藏帖子
- 再次点击取消收藏（toggle 机制）
- 帖子详情页显示收藏按钮
- 用户可在 `/bbs/bookmarks` 页面查看自己收藏的帖子列表
- 需要登录，member 及以上角色均可
- API：`POST /api/bbs/bookmarks`，body: `{ postId: number }`

### 9. 打卡排行榜

- 在打卡页面增加排行榜板块
- 两个维度切换：
  - 连续打卡天数 TOP 20（当前最长连续天数）
  - 本月打卡总天数 TOP 20
- 显示：排名、用户头像、昵称、天数
- API：`GET /api/bbs/ranking?type=streak|monthly`

### 10. @提醒功能

- 回复时可以输入 `@` 触发用户搜索下拉框
- 下拉框中搜索并展示匹配的用户（取前 10 条）
- 选择用户后在输入框中插入 `@用户名`
- 发布后被 `@` 的用户名高亮显示（蓝色可点击样式）
- 暂不实现通知推送功能，仅做前端展示

### 11. 月度最佳帖子

- 在 BBS 首页侧边栏（移动端为折叠区块）显示"🔥 本月热帖 TOP 10"
- 按当月点赞数排序
- 显示：排名、帖子标题（截断）、作者昵称、点赞数
- 点击可跳转到帖子详情页

### 12. 帖子搜索

- 搜索框位于 BBS 首页分类筛选栏旁边
- 支持按标题和内容关键词搜索（MySQL `LIKE '%keyword%'`）
- 搜索结果以帖子列表形式展示，支持分页
- 空搜索词时不发起请求
- 搜索关键词在结果中高亮显示
- API：`GET /api/bbs/search?q=keyword&page=1&limit=20`

---

## API 设计规范

### 统一响应格式

```typescript
// 成功（单条数据）
{
  success: true,
  data: T,
  message?: string
}

// 成功（列表数据）
{
  success: true,
  data: T[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// 失败
{
  success: false,
  error: string,
  message: string
}
```

### HTTP 状态码

| 状态码 | 使用场景 |
|--------|---------|
| 200 | 请求成功 |
| 201 | 创建成功（发帖、回帖、打卡） |
| 400 | 参数错误、校验失败 |
| 401 | 未登录 |
| 403 | 无权限（如普通会员尝试发帖） |
| 404 | 帖子不存在 |
| 409 | 重复操作（如今日已打卡） |
| 500 | 服务器错误 |

### API 列表汇总

| 方法 | 路由 | 功能 | 权限 | Phase |
|------|------|------|------|-------|
| GET | `/api/bbs/posts` | 帖子列表 | 公开 | 1 |
| POST | `/api/bbs/posts` | 发帖 | vip+ | 1 |
| GET | `/api/bbs/posts/[id]` | 帖子详情 | 公开 | 1 |
| PUT | `/api/bbs/posts/[id]` | 编辑帖子 | 作者本人 | 1 |
| DELETE | `/api/bbs/posts/[id]` | 删除帖子（软删除） | 作者/moderator+ | 1 |
| GET | `/api/bbs/posts/[id]/replies` | 回复列表 | 公开 | 1 |
| POST | `/api/bbs/posts/[id]/replies` | 回帖 | member+ | 1 |
| GET | `/api/bbs/checkin` | 打卡状态 | 登录 | 1 |
| POST | `/api/bbs/checkin` | 打卡 | member+ | 1 |
| POST | `/api/bbs/upload` | 图片上传 | vip+ | 1 |
| GET | `/api/bbs/profile` | 社区档案 | 登录 | 1 |
| PUT | `/api/bbs/profile` | 更新档案 | 登录 | 1 |
| POST | `/api/bbs/likes` | 点赞/取消 | member+ | 2 |
| POST | `/api/bbs/bookmarks` | 收藏/取消 | member+ | 2 |
| GET | `/api/bbs/bookmarks` | 收藏列表 | 登录 | 2 |
| GET | `/api/bbs/search` | 搜索帖子 | 公开 | 2 |
| GET | `/api/bbs/ranking` | 排行榜 | 公开 | 2 |

---

## UI/UX 要求

1. **样式方案**：使用项目中已有的 CSS 方案（请先检查确认），保持与现有网站一致
2. **组件库**：如果项目使用了 UI 组件库（如 shadcn/ui），优先复用已有组件
3. **响应式**：所有页面必须支持移动端自适应
4. **加载状态**：所有 API 请求要显示 loading 状态（骨架屏或 spinner）
5. **错误处理**：API 错误要有友好的 toast 通知提示
6. **空状态**：没有帖子、没有回复、没有打卡记录时显示友好的空状态插图和文案
7. **配色建议**：
   - 打卡成功：绿色系
   - 分类标签：不同分类用不同颜色区分
   - 置顶帖子：带有醒目的置顶标记/角标
   - VIP 标识：金色
8. **BBS 导航**：在 BBS layout 中添加子导航：社区首页 / 打卡签到 / 我的收藏(Phase 2)
9. **与主站导航衔接**：在现有网站的主导航栏中预留一个"社区"入口指向 `/bbs`（告诉我需要在哪个文件添加，由我手动添加）

---

## 安全要求

1. 所有写操作 API 必须验证用户登录状态（`getServerSession`）
2. 所有写操作 API 必须验证用户权限（调用 `getUserBBSRole` + `getPermissions`）
3. 删除操作只允许作者本人或 moderator/admin
4. 所有用户输入必须做 XSS 防护（对 HTML 特殊字符转义）
5. 图片上传要验证文件类型（同时检查扩展名和 MIME type）
6. 帖子标题、内容、回复内容要做长度限制的 **服务端校验**
7. 分页参数做合法性校验（page >= 1, limit <= 50）

---

## 执行顺序

请严格按以下顺序开发，每完成一步都确保可以正常运行后再进入下一步：

### Step 1: 准备工作（先做这一步，不要写代码）
- 阅读项目现有代码结构
- 汇报以下信息：
  - Next.js 版本 + Router 类型
  - 用户表结构（表名、所有字段名和类型）
  - NextAuth 配置方式和 session 包含的字段
  - DB 连接实例的 import 路径
  - 现有 schema 导出方式
  - CSS 方案和 UI 组件库
  - 是否有角色/付费/订阅相关字段和表
- **等待我确认后再继续**

### Step 2: 数据库 Schema + 权限模块
- 创建 `src/db/schema/bbs.ts`（所有 BBS 表）
- 创建 `src/lib/bbs/permissions.ts`（权限逻辑）
- 创建 `src/lib/bbs/utils.ts`（工具函数）
- 更新 schema 导出文件（仅追加一行 export）
- 生成 migration 并告诉我如何执行
- 提供分类初始数据 seed 脚本

### Step 3: Phase 1 API
- 帖子 CRUD API（含权限校验）
- 回复 API
- 打卡 API
- 图片上传 API
- 用户社区档案 API
- 每个 API 提供 curl 测试命令

### Step 4: Phase 1 前端页面
- BBS layout（含子导航）
- 帖子列表页（含分类筛选、分页）
- 发帖页（含图片上传、权限校验）
- 帖子详情页（含回复列表、回帖表单）
- 打卡页（含日历热力图、打卡记录）
- 权限提示组件（升级提示弹窗）

### Step 5: Phase 2 API
- 点赞 API
- 收藏 API
- 搜索 API
- 排行榜 API

### Step 6: Phase 2 前端
- 点赞/收藏按钮集成到帖子卡片和详情页
- 我的收藏页面
- 搜索功能集成到列表页
- 打卡排行榜集成到打卡页
- @提醒输入框
- 月度热帖侧边栏

### Step 7: 收尾
- 提供分类 seed 脚本执行说明
- 告诉我需要在主站导航中添加"社区"入口的位置和代码
- 提供完整的测试检查清单

---

## 额外说明

- 如果项目使用了国际化 (i18n)，BBS 模块文案统一用 **中文**
- 时间显示统一使用相对时间（如"5分钟前"、"2小时前"、"3天前"），超过 30 天显示具体日期格式 `YYYY-MM-DD`
- 不需要实现管理后台，管理操作暂时通过数据库直接操作
- 不要安装任何新的重型依赖包。允许安装的轻量依赖仅限：`date-fns`（如果项目还没有时间处理库的话）
- 每完成一个 Step 后做一次小结，列出已创建的文件清单

---

**请先执行 Step 1，阅读项目代码后向我汇报，等我确认后再开始编码。**
```

---

> **使用方法**：将以上全部内容（从 `# BBS 社区模块开发需求文档` 开始到最后一行）完整复制粘贴到字节跳动编辑器的对话框中发送即可。AI 会先执行 Step 1 阅读你的项目，然后向你汇报发现的信息，你确认后它会逐步开始编码。