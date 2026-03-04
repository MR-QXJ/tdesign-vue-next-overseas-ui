# t-copyright 数据模型

## 实体定义

### CopyrightConfig（全局配置）

copyright 组件通过 ConfigProvider 全局配置注入数据，不通过 props 接收业务数据。

```typescript
/**
 * Copyright 组件全局配置
 */
export interface CopyrightConfig {
  /**
   * 版权声明的部门文本
   * @default '腾讯公司 财经线-财经IT管理部'
   */
  deptText?: string;
}
```

### Copyright Props（组件属性）

copyright 是一个极简组件，当前无需自定义 props。保留空的 props 定义以符合组件库规范。

```typescript
/**
 * Copyright 组件 Props
 * 当前无自定义属性，所有配置通过 ConfigProvider 全局注入
 */
export interface TdCopyrightProps {
  // 预留，当前无自定义 props
}
```

### GlobalConfigProvider 扩展

需要在现有 `GlobalConfigProvider` 接口中新增 `copyright` 字段：

```typescript
export interface GlobalConfigProvider {
  // ... 现有字段 ...
  /** Copyright 版权声明全局配置 */
  copyright?: CopyrightConfig;
}
```

## 数据流

```
ConfigProvider (globalConfig.copyright)
        │
        ▼
  useConfig('copyright')
        │
        ▼
  Copyright 组件
        │
        ├── 固定文本: "Copyright © 1998 - {year} TENCENT. All Rights Reserved."
        └── 配置文本: global.deptText
```

## 默认值

| 字段 | 默认值 | 来源 |
|------|--------|------|
| `deptText` | `'腾讯公司 财经线-财经IT管理部'` | `packages/common/js/global-config/locale/zh_CN.ts` |

## 状态管理

copyright 组件为纯展示组件，无内部状态，无状态转换。
