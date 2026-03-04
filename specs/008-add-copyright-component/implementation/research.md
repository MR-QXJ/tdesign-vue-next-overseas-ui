# t-copyright 组件研究报告

## 研究概要

本文档记录了在 TDesign Vue 3 海外版组件库中新增 `t-copyright` 组件的技术调研结果。

---

## 研究项 1：ConfigProvider 对 copyright 的支持

### 决策：需扩展 ConfigProvider 类型定义，locale 数据已就绪

### 调研结果

| 维度 | Vue 2 Overseas | Vue 3 当前状态 |
|------|---------------|----------------|
| locale 数据 | 有 `copyright.deptText` | **公共 locale `zh_CN.ts` 中已有** |
| 类型定义 | `CopyrightConfig { deptText?: string }` | **缺失**，`GlobalConfigProvider` 无 `copyright` key |
| 组件消费 | `configReceiverMixins('copyright')` | 应使用 `useConfig('copyright')` |

### 关键发现

1. **Vue 3 公共 locale 已包含 copyright 配置**：
   - 文件：`packages/common/js/global-config/locale/zh_CN.ts`
   - 内容：`copyright: { deptText: '腾讯公司 财经线-财经IT管理部' }`

2. **Vue 3 类型定义缺失**：
   - 文件：`packages/components/config-provider/type.ts`
   - `GlobalConfigProvider` 接口中不存在 `copyright` key
   - 需要新增 `CopyrightConfig` 接口和在 `GlobalConfigProvider` 中添加 `copyright?: CopyrightConfig`

3. **Vue 3 组件消费模式**：
   - 使用 `useConfig('copyright')` hook 获取全局配置
   - 返回 `{ t, global, globalConfig, classPrefix }`
   - 通过 `global.value.deptText` 访问部门文本

### 理由
复用已有的 locale 数据，仅需补充类型定义即可，最小化改动。

### 考虑的替代方案
- 通过 props 传入部门文本：不推荐，破坏了全局统一配置的设计理念
- 硬编码部门文本：不推荐，缺乏灵活性

---

## 研究项 2：withInstall 注册机制

### 决策：直接使用现有 `withInstall` 工具函数

### 调研结果

- **位置**：`packages/shared/utils/withInstall.ts`
- **功能**：为组件添加 `install` 方法，支持 `app.use()` 全局注册
- **签名**：`withInstall<T>(comp: T, alias?: string, directive?: {...}): T & Plugin`

### 使用模式
```typescript
import { withInstall } from '@tdesign/shared-utils';
import _Copyright from './copyright';
export const Copyright = withInstall(_Copyright);
export default Copyright;
```

### 理由
所有现有组件（alert、button、loading 等）均使用此模式，保持一致性。

---

## 研究项 3：海外样式变量可用性

### 决策：所有需要的样式变量均已存在，可直接使用

### 调研结果

| 变量名 | 定义位置 | 值 |
|--------|----------|-----|
| `@font-size-s` | `overseas/style/_variables.less` 第 317 行 | `var(--td-font-size-body-small)` |
| `@text-line-height-s` | `overseas/style/_variables.less` 第 309 行 | `var(--td-line-height-body-small)` |
| `@text-color-disabled` | `overseas/style/_variables.less` 第 186 行 | `var(--td-text-color-disabled)` |

### 理由
与 Vue 2 版本完全一致，alert、button 等组件已验证可用。

---

## 研究项 4：组件文件结构和注册流程

### 决策：遵循现有组件标准结构

### 调研结果 - 新增组件需修改的文件

| 步骤 | 文件 | 操作 |
|------|------|------|
| 1 | `packages/components/copyright/` | 创建组件目录及所有文件 |
| 2 | `packages/components/copyright/index.ts` | `withInstall` 包装导出 |
| 3 | `packages/components/components.ts` | 添加 `export * from './copyright'` |
| 4 | `packages/common/js/components.ts` | `WEB_COMPONENT_MAP` 添加 `copyright: ['Copyright']` |
| 5 | `packages/components/config-provider/type.ts` | 添加 `CopyrightConfig` 类型和 `copyright` key |

### 组件目录结构

```
packages/components/copyright/
├── copyright.tsx              # 组件主文件（defineComponent + setup + TSX）
├── index.ts                   # 入口（withInstall 包装导出）
├── props.ts                   # Props 定义
├── type.ts                    # 类型定义
├── copyright.md               # 中文 API 文档
├── copyright.en-US.md         # 英文 API 文档
├── style/
│   ├── index.js               # Less 样式入口
│   ├── css.js                 # CSS 样式入口
│   └── overseas/
│       ├── index.less         # 海外样式入口
│       ├── _index.less        # 主样式文件
│       ├── _var.less          # 组件专用变量
│       └── _mixin.less        # Mixin（可为空）
└── _example/
    └── base.vue               # 基础用法示例
```

### 理由
完全对齐 alert、button 等已完成海外适配的组件结构。

---

## 研究项 5：Vue 3 组件实现模式

### 决策：使用 defineComponent + setup + TSX

### 调研结果 - Alert 组件模式参考

```typescript
import { defineComponent } from 'vue';
import { useConfig, usePrefixClass } from '@tdesign/shared-hooks';
import props from './props';

export default defineComponent({
  name: 'TComponentName',
  props,
  setup(props) {
    const { globalConfig } = useConfig('componentName');
    const COMPONENT_NAME = usePrefixClass('component-name');
    
    return () => (
      <div class={COMPONENT_NAME.value}>
        {/* 渲染逻辑 */}
      </div>
    );
  },
});
```

### 理由
遵循项目约定的 Vue 3 Composition API + TSX 模式。

---

## 未解决项

无。所有假设均已通过调研验证。
