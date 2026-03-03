# Pagination 海外适配 CSS 变量契约

> **功能名称**: Pagination 分页组件海外样式适配  
> **创建日期**: 2026-03-02  
> **更新日期**: 2026-03-03（反映实际实现）  
> **状态**: ✅ 已实现

---

## 1. 全局 Token 引用

以下变量从 `overseas/style/_variables.less` 引用，在 `_var.less` 中使用：

| 变量名 | 用途 | 实际引用 |
|--------|------|----------|
| `@text-color-secondary` | 分页文字色 | `@pagination-text-color` |
| `@text-color-anti` | 选中/active 文字色 | `@pagination-text-color-active` |
| `@text-color-primary` | 按钮文字色 | `@pagination-text-color-btn` |
| `@brand-color` | 选中背景色 / active 背景色 | `@pagination-bg-color-current` / `@pagination-bg-color-active` |
| `@brand-color-hover` | hover 文字色 | `@pagination-bg-color-hover` |
| `@brand-color-focus` | 选中禁用背景色 | `@pagination-bg-color-current-disabled` |
| `@bg-color-component-disabled` | 禁用背景色 | `@pagination-bg-color-disabled` |
| `@bg-color-secondarycontainer-hover` | 按钮 hover 背景色 | `@pagination-bg-color-btn-hover` |
| `@bg-color-secondarycontainer-active` | 按钮 active 背景色 | `@pagination-bg-color-btn-active` |
| `@bg-color-container` | 页码默认背景色 | `@pagination-bg-color-default` |
| `@component-border` | 边框色 | `@pagination-border-color` |
| `@border-radius-default` | 按钮圆角 | `@pagination-border-radius-base` |
| `@comp-size-xs` | small 尺寸高度 | `@pagination-height-s` |
| `@comp-size-s` | 默认尺寸高度（28px） | `@pagination-height-default` |
| `@font-body-small` | small 字号 | `@pagination-font-s` |
| `@font-body-medium` | 默认字号 | `@pagination-font-default` |
| `@font-body-large` | 按钮字号 | `@pagination-btn-font-size` |
| `@comp-paddingLR-xxs` | small padding | `@pagination-padding-horizontal-s` |
| `@comp-paddingLR-xs` | 默认 padding | `@pagination-padding-horizontal-default` |
| `@comp-margin-xs` | 按钮间距 / 跳转间距 | `@pagination-btn-margin` / `@pagination-jump-margin` |
| `@comp-margin-l` | Select 间距 | `@pagination-select-margin` |
| `@comp-margin-s` | 页码间距 / 跳转内间距 | `@pagination-pager-margin` / `@pagination-jump-padding-left` |
| `@comp-size-m` | 跳转区域高度 | `@pagination-jump-height` |
| `@comp-size-xl` | 跳转内高度基准 | `@pagination-jump-inner-height`（calc(@comp-size-xl - 4px)） |
| `@anim-duration-base` | 过渡动画时长 | `@pagination-hover-transition` |
| `@anim-time-fn-ease-in` | 过渡缓动函数 | `@pagination-hover-transition` |
| `@font-gray-4` | 总计区域/跳转区域文字色 | `index.less` 直接引用 |
| `@gray-color-6` | 输入框边框色 | `index.less` 直接引用 |

---

## 2. 组件局部变量（`_var.less` 实际定义）

### 2.1 颜色变量（15个）

| 变量名 | 值 | 说明 |
|--------|------|------|
| `@pagination-text-color` | `@text-color-secondary` | 分页文字色 |
| `@pagination-text-color-disabled` | `#9a9a9a` | 禁用文字色（硬编码） |
| `@pagination-text-color-active` | `@text-color-anti` | 选中/active 文字色 |
| `@pagination-text-color-btn` | `@text-color-primary` | 按钮文字色 |
| `@pagination-bg-color-current` | `@brand-color` | 选中背景色 |
| `@pagination-bg-color-hover` | `@brand-color-hover` | hover 色 |
| `@pagination-bg-color-active` | `@brand-color` | active 背景色 |
| `@pagination-bg-color-disabled` | `@bg-color-component-disabled` | 禁用背景色 |
| `@pagination-bg-color-current-disabled` | `@brand-color-focus` | 选中禁用背景色 |
| `@pagination-bg-color-btn-hover` | `@bg-color-secondarycontainer-hover` | 按钮 hover 背景 |
| `@pagination-bg-color-btn-active` | `@bg-color-secondarycontainer-active` | 按钮 active 背景 |
| `@pagination-bg-color-default` | `@bg-color-container` | 页码默认背景 |
| `@pagination-icon-color-disabled` | `#9a9a9a` | 禁用图标色（硬编码） |
| `@pagination-border-color` | `@component-border` | 边框色 |
| `@pagination-border-radius-base` | `@border-radius-default` | 按钮圆角 |

### 2.2 尺寸变量

| 变量名 | 值 | 说明 |
|--------|------|------|
| `@pagination-height-s` | `@comp-size-xs` | small 尺寸高度 |
| `@pagination-height-default` | `@comp-size-s`（28px） | 默认尺寸高度 |
| `@pagination-input-width` | `70px` | 跳转输入框宽度 |

### 2.3 字号变量

| 变量名 | 值 | 说明 |
|--------|------|------|
| `@pagination-font-s` | `@font-body-small` | small 字号 |
| `@pagination-font-default` | `@font-body-medium` | 默认字号 |
| `@pagination-btn-font-size` | `@font-body-large` | 按钮字号 |

### 2.4 间距变量

| 变量名 | 值 | 说明 |
|--------|------|------|
| `@pagination-padding-horizontal-s` | `@comp-paddingLR-xxs` | small 水平内边距 |
| `@pagination-padding-horizontal-default` | `@comp-paddingLR-xs` | 默认水平内边距 |
| `@pagination-btn-margin` | `@comp-margin-xs` | 按钮外间距 |
| `@pagination-jump-margin` | `@comp-margin-xs` | 跳转区域外间距 |
| `@pagination-select-margin` | `@comp-margin-l` | Select 右间距 |
| `@pagination-pager-margin` | `@comp-margin-s` | 页码间距 |
| `@pagination-jump-height` | `@comp-size-m` | 跳转区域高度 |
| `@pagination-jump-padding-left` | `@comp-margin-s` | 跳转区域左内边距 |
| `@pagination-jump-inner-height` | `calc(@comp-size-xl - 4px)` | 跳转输入框内高度 |
| `@pagination-jump-height-small` | `@comp-size-xs` | small 跳转区域高度 |
| `@pagination-jump-inner-height-small` | `calc(@comp-size-xs - 4px)` | small 跳转输入框内高度 |

### 2.5 过渡变量

| 变量名 | 值 | 说明 |
|--------|------|------|
| `@pagination-hover-transition` | `all @anim-duration-base @anim-time-fn-ease-in` | hover 过渡动画 |

---

## 3. Mixin 定义（`_mixin.less`）

### 3.1 `.pagination-number--size(@height, @font-size, @padding-horizontal, @line-height)`

设置页码按钮的尺寸：`height`、`min-width`（= height）、`line-height`、`font-size`、`padding-left/right`。

### 3.2 `.pagination-number--color(@bg-color, @text-color)`

设置页码按钮的颜色：`background-color`、`color`、`border-color`。

### 3.3 `.pagination-btn(@height)`

设置导航按钮的尺寸和交互状态：`width`/`height`/`line-height`（均等于 @height），以及 hover（`@pagination-bg-color-btn-hover`）、active（`@pagination-bg-color-btn-active`）、disabled（`background: none; color: @pagination-icon-color-disabled`）状态。

---

## 4. 样式差异对照表

### 4.1 页码按钮 `.t-pagination__number`

| CSS 属性 | 海外值 | 说明 |
|----------|--------|------|
| `height` | `@comp-size-s`（28px） | 使用 `.pagination-number--size` mixin |
| `min-width` | `28px` | 同高度 |
| `line-height` | `28px` | |
| `font-size` | `@font-body-medium` | |
| `background-color` | `@bg-color-container` | 默认背景 |
| `border-radius` | `@border-radius-default` | |
| `border` | 无（未设置） | 无边框 |

### 4.2 跳转区域 `.t-pagination__jump`

| CSS 属性 | 海外值 | 说明 |
|----------|--------|------|
| `display` | `inline-flex` | flex 布局 |
| `margin-left` | `6px` | |
| `margin-right` | `12px` | |
| `gap` | `@comp-margin-s` | 内部元素间距 |
| `height` | `@comp-size-m` | |
| `background-color` | 无（去除） | 无背景色 |

### 4.3 总计区域 `.t-pagination__total`

| CSS 属性 | 海外值 | 说明 |
|----------|--------|------|
| `color` | `@font-gray-4` | |
| `font` | `@font-body-medium` | |
| `overflow` | `hidden` | 溢出隐藏 |
| `text-overflow` | `ellipsis` | 省略号 |
| `white-space` | `nowrap` | 不换行 |
| `margin-right` | `10px` | |

### 4.4 Select 区域 `.t-pagination__select`

| CSS 属性 | 海外值 | 说明 |
|----------|--------|------|
| `margin-right` | `@comp-margin-l` | Select 右间距 |
| `.t-input` min-height | `@comp-size-l !important` | |
| `.t-icon` font-size | `20px !important` | |
| `.t-input__suffix` right | `0 !important` | |
| `.t-input__suffix` top | `-2px !important` | |
| `.t-input--auto-width` | `max-width: 100% !important; min-width: 100% !important` | |

### 4.5 新增 `.page-size-dsc`

| CSS 属性 | 值 |
|----------|----|
| `font-weight` | `bold` |
