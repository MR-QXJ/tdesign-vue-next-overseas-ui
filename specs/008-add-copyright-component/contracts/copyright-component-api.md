# t-copyright 组件 API 契约

## 组件基本信息

| 属性 | 值 |
|------|-----|
| 组件名 | `TCopyright` |
| 标签名 | `<t-copyright />` |
| 分类 | 基础 (base) |
| 前缀 | `t-copyright` |

## Props

当前版本无自定义 Props。所有配置通过 `ConfigProvider` 全局注入。

```typescript
export interface TdCopyrightProps {
  // 预留扩展
}
```

## 全局配置 (ConfigProvider)

通过 `<t-config-provider :globalConfig="{ copyright: { ... } }">` 配置。

### CopyrightConfig

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `deptText` | `string` | `'腾讯公司 财经线-财经IT管理部'` | 版权声明的部门文本 |

## Slots

无。

## Events

无。

## CSS 类名

| 类名 | 说明 |
|------|------|
| `.t-copyright` | 组件根元素 |

## CSS 变量依赖

| 变量 | 说明 | 映射 |
|------|------|------|
| `@font-size-s` | 字体大小 | `--td-font-size-body-small` |
| `@text-line-height-s` | 行高 | `--td-line-height-body-small` |
| `@text-color-disabled` | 文字颜色 | `--td-text-color-disabled` |

## DOM 结构

```html
<div class="t-copyright">
  <div>Copyright © 1998 - 2026 TENCENT. All Rights Reserved.</div>
  <div>腾讯公司 财经线-财经IT管理部</div>
</div>
```

## 使用示例

### 基础用法

```vue
<template>
  <t-copyright />
</template>
```

### 自定义部门文本

```vue
<template>
  <t-config-provider :globalConfig="copyrightConfig">
    <t-copyright />
  </t-config-provider>
</template>

<script setup>
const copyrightConfig = {
  copyright: {
    deptText: 'Custom Department Text',
  },
};
</script>
```

## 导出

```typescript
import { Copyright } from 'tdesign-vue-next';
// 或
import Copyright from 'tdesign-vue-next/es/copyright';
```
