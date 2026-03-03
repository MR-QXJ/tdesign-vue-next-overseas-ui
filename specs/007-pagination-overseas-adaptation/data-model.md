# Pagination 海外适配 数据模型

> **功能名称**: Pagination 分页组件海外样式适配  
> **创建日期**: 2026-03-02  
> **更新日期**: 2026-03-03  
> **状态**: ✅ 已完成

---

## 1. Props 变更

### 1.1 新增 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `pageSizeDsc` | `string` | `''` | 每一页数据量的描述文字。非空时在分页大小选择器左侧渲染标签（如 "Items per page"） |
| `totalPage` | `boolean \| TNode` | `true` | 用于自定义总页数呈现内容。默认显示 "of X pages"，值为 false 则不显示 |

### 1.2 默认值变更的 Props

| 属性名 | 类型 | 原默认值 | 海外默认值 | 说明 |
|--------|------|----------|-----------|------|
| `foldedMaxPageBtn` | `number` | `5` | `3` | 折叠时最多显示 3 个页码按钮 |
| `maxPageBtn` | `number` | `10` | `3` | 最多显示 3 个页码按钮 |
| `pageEllipsisMode` | `string` | `'mid'` | `''`（空字符串） | 海外组件不需要折叠省略号 |

### 1.3 现有 Props（无变更，仅列出受逻辑影响的）

| 属性名 | 类型 | 说明 | 海外影响 |
|--------|------|------|----------|
| `total` | `number` | 数据总量 | 用于计算 "X-Y of Z items" 文案 |
| `current` | `number` | 当前页码 | 用于计算 startIndex/endIndex |
| `pageSize` | `number` | 每页条数 | 用于计算 startIndex/endIndex |
| `pageSizeOptions` | `Array<number \| object>` | 分页大小选项 | label 从国际化模板改为纯数字 `String(option)` |
| `showFirstAndLastPageBtn` | `boolean` | 是否显示首尾页按钮 | 图标从竖线箭头改为双箭头 `ChevronLeftDoubleIcon`/`ChevronRightDoubleIcon` |
| `showJumper` | `boolean` | 是否显示跳转输入框 | 去掉"跳至"前缀，使用 `TInputAdornment` 包裹 |
| `totalContent` | `TNode` | 自定义总量内容 | 默认文案格式改为 "X-Y of Z items" |
| `selectProps` | `object` | Select 透传属性 | 默认值 `{ singleUseTag: false, suffixIconOs: 'caret-down-small' }` |

---

## 2. 总量统计计算模型

### 2.1 计算公式（实际实现）

```typescript
// pagination.tsx 第 211-215 行
const startIndex = (innerCurrent.value - 1) * innerPageSize.value + 1;
const endIndex = Math.min(innerCurrent.value * innerPageSize.value, total);
const currentItemsDetail =
  total === 0 ? '0' : startIndex >= total ? `${startIndex}` : `${startIndex}-${endIndex}`;
const totalDisplayText = total === 0 ? '0 of 0 items' : `${currentItemsDetail} of ${total} items`;
```

### 2.2 边界场景

| 场景 | current | pageSize | total | startIndex | endIndex | 显示文案 |
|------|---------|----------|-------|------------|----------|----------|
| 第一页 | 1 | 20 | 101 | 1 | 20 | "1-20 of 101 items" |
| 中间页 | 3 | 20 | 101 | 41 | 60 | "41-60 of 101 items" |
| 最后一页（不满） | 6 | 20 | 101 | 101 | 101 | "101 of 101 items" |
| 仅一条数据 | 1 | 20 | 1 | 1 | 1 | "1 of 1 items" |
| 无数据 | 1 | 20 | 0 | 1 | 0 | "0 of 0 items"（需特殊处理） |

### 2.3 零数据特殊处理

当 `total === 0` 时，`currentItemsDetail` 直接为 `'0'`，`totalDisplayText` 为 `'0 of 0 items'`。已在实际代码中实现。

---

## 3. 样式状态映射表

### 3.1 页码按钮状态

| 状态 | CSS 类名 | 海外样式 |
|------|----------|----------|
| 默认 | `.t-pagination__number` | 无边框、透明背景、圆角矩形、28px 高度 |
| Hover | `.t-pagination__number:hover` | 浅色圆角背景 |
| Active | `.t-pagination__number:active` | 品牌色背景 |
| 选中 | `.t-pagination__number.t-is-current` | 品牌色圆角矩形填充、白色文字 |
| 禁用 | `.t-pagination__number.t-is-disabled` | 灰色文字 `#9a9a9a`、不可点击 |

### 3.2 导航按钮状态

| 状态 | CSS 类名 | 海外样式 |
|------|----------|----------|
| 默认 | `.t-pagination__btn` | 无背景、无边框 |
| Hover | `.t-pagination__btn:hover` | 圆角浅色背景 |
| Active | `.t-pagination__btn:active` | 背景色加深 |
| 禁用 | `.t-pagination__btn.t-is-disabled` | 图标灰色 `#9a9a9a`、不可点击 |

### 3.3 Select 在 Pagination 内的状态

| 属性 | 标准值（Select 全局默认） | Pagination 内海外值 |
|------|--------------------------|---------------------|
| `singleUseTag` | `true` | `false` |
| `suffixIconOs` | `'bulletpoint'` | `'caret-down-small'` |
| `clearable` | `true` | `false` |
| `autoWidth` | `false` | `true` |
| 宽度 | 自适应 | `70px` |

---

## 4. 图标映射

| 按钮 | 原图标 | 海外图标 |
|------|--------|----------|
| 首页 | `PageFirstIcon` (`\|<`) | `ChevronLeftDoubleIcon` (`«`) |
| 末页 | `PageLastIcon` (`>\|`) | `ChevronRightDoubleIcon` (`»`) |
| 上一页 | `ChevronLeftIcon` (`<`) | 不变 |
| 下一页 | `ChevronRightIcon` (`>`) | 不变 |

---

## 5. 文案格式映射

| 区域 | 原格式（中文） | 海外格式（英文） |
|------|----------------|------------------|
| 总量统计 | `共 {count} 条数据` | `{startIndex}-{endIndex} of {total} items` |
| 分页大小选项 | `{size} 条/页` | `{size}`（纯数字，`String(option)`） |
| 分页大小描述 | 无 | `pageSizeDsc`（如 "Items per page"） |
| 跳转前缀 | `跳至` | 无（去掉） |
| 跳转后缀 | `/ {pageCount} 页` | 无（改为独立 `totalPage` 渲染插槽） |
| 总页数 | 无（内嵌在跳转区域） | `of {pageCount} pages`（独立 `totalPage` 渲染插槽） |

---

## 6. 页码折叠逻辑

### 6.1 海外版折叠策略

海外版 `pageEllipsisMode` 默认为空字符串，`isMidEllipsis` 为 false，因此：
- **不渲染**省略号按钮
- **不渲染**首尾固定页码（第 1 页和最后一页固定显示）
- 始终保持最多 `foldedMaxPageBtn`（默认 3）个页码按钮

### 6.2 折叠逻辑伪代码

```
if (pageCount > maxPageBtn) {
  // 折叠模式
  if (isPrevMoreShow && isNextMoreShow) {
    // 当前页在中间
    start = current - curPageLeftCount
    end = current + curPageRightCount
  } else {
    // 当前页靠近首页或末页
    start = isPrevMoreShow ? pageCount - foldedMaxPageBtn + 1 : 1
    end = isPrevMoreShow ? pageCount : foldedMaxPageBtn
  }
} else {
  start = 1
  end = pageCount
}
```

---

## 7. 渲染布局顺序

从左到右的渲染顺序：

1. `pageSizeDsc` — 描述文字（新增）
2. `Select` — 分页大小选择器（`width: 70px`、`autoWidth: true`、`clearable: false`）
3. `totalContent` — 总量统计（"X-Y of Z items"）
4. 首页按钮（`ChevronLeftDoubleIcon`）
5. 上一页按钮（`ChevronLeftIcon`）
6. 页码列表
7. Simple 模式跳转框
8. 下一页按钮（`ChevronRightIcon`）
9. 末页按钮（`ChevronRightDoubleIcon`）
10. Default 模式跳转框
11. `totalPage` — 总页数（"of X pages"）
