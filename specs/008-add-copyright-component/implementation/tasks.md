# t-copyright 海外版权声明组件 任务清单

> **规范引用**: 本任务清单遵循 `../../.codebuddy/.rules/team-rule.mdc` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | add-copyright-component |
| 计划版本 | 0.1.0 |
| 任务版本 | 0.1.0 |
| 创建日期 | 2026-03-04 |
| 总任务数 | 12 |
| 完成进度 | 0% |

## 任务状态说明

- 🔴 **待开始** - 任务尚未开始
- 🟡 **进行中** - 任务正在进行
- 🟢 **已完成** - 任务已完成
- ⚫ **已取消** - 任务已取消
- 🔵 **已阻塞** - 任务被阻塞

## 用户故事映射

| 故事 | 规格需求 | 优先级 | 描述 |
|------|----------|--------|------|
| US1 | FR-001 | P0 | 基础版权声明展示（动态年份 + 部门文本） |
| US2 | FR-002 | P0 | 海外样式适配（三层样式架构） |
| US3 | FR-003 | P0 | 组件注册与导出（withInstall 包装） |
| US4 | FR-004 | P1 | 示例与文档（中英文 API 文档 + 基础示例） |

## 任务列表

### 阶段 1: 设置（项目初始化）

- [X] T001 创建组件目录结构 `packages/components/copyright/`，包含 `style/overseas/` 和 `_example/` 子目录

### 阶段 2: 基础（阻塞前提条件）

- [X] T002 在 `packages/components/config-provider/type.ts` 中新增 `CopyrightConfig` 接口定义（`deptText?: string`），并在 `GlobalConfigProvider` 接口中添加 `copyright?: CopyrightConfig` 字段
- [X] T003 [P] 在 `packages/components/copyright/props.ts` 中创建 Props 定义（空 props，符合组件库规范）
- [X] T004 [P] 在 `packages/components/copyright/type.ts` 中创建类型导出文件，导出 `TdCopyrightProps` 类型

### 阶段 3: US1 — 基础版权声明展示

**故事目标**: 用户可以通过 `<t-copyright />` 渲染出包含动态年份和部门文本的版权声明

**独立测试标准**: 组件可在隔离环境中渲染，显示 "Copyright © 1998 - {当前年份} TENCENT. All Rights Reserved." 和部门文本

- [X] T005 [US1] 在 `packages/components/copyright/copyright.tsx` 中实现组件核心逻辑：使用 `defineComponent` + `setup` + TSX，通过 `useConfig('copyright')` 获取全局配置，动态获取当前年份，渲染版权行和部门行
- [X] T006 [US1] 在 `packages/components/copyright/index.ts` 中创建入口文件，使用 `withInstall` 包装组件并导出 `Copyright`、`default`、及类型

### 阶段 4: US2 — 海外样式适配

**故事目标**: 组件样式符合海外版视觉规范，使用三层样式架构

**独立测试标准**: 组件文字使用 `@font-size-s`（12px）、`@text-line-height-s`（20px）、`@text-color-disabled` 颜色，文本居中

- [X] T007 [P] [US2] 在 `packages/components/copyright/style/overseas/_var.less` 中定义组件专用样式变量，引用海外全局变量 `@font-size-s`、`@text-line-height-s`、`@text-color-disabled`
- [X] T008 [P] [US2] 在 `packages/components/copyright/style/overseas/_mixin.less` 中创建 Mixin 文件（可为空，保持结构完整）
- [X] T009 [US2] 在 `packages/components/copyright/style/overseas/_index.less` 中编写主样式：`.t-copyright` 居中对齐、字体大小、行高、颜色；在 `overseas/index.less` 中作为入口引入
- [X] T010 [US2] 在 `packages/components/copyright/style/index.js` 和 `packages/components/copyright/style/css.js` 中创建样式入口文件，引用海外样式

### 阶段 5: US3 — 组件注册与导出

**故事目标**: 组件可通过全局 `app.use()` 或按需 `import` 使用

**独立测试标准**: `import { Copyright } from 'tdesign-vue-next'` 可正常导入，`app.use(Copyright)` 可全局注册

- [X] T011 [US3] 在 `packages/components/components.ts` 中添加 `export * from './copyright';`，在 `packages/common/js/components.ts` 的 `WEB_COMPONENT_MAP` 中添加 `copyright: ['Copyright']` 映射

### 阶段 6: US4 — 示例与文档

**故事目标**: 开发者可通过文档和示例快速了解并使用该组件

**独立测试标准**: 中英文文档包含 API 说明和示例引用，基础示例可正常渲染

- [X] T012 [P] [US4] 在 `packages/components/copyright/_example/base.vue` 中创建基础用法示例（使用 `<t-copyright />`），在 `packages/components/copyright/copyright.md` 中编写中文 API 文档，在 `packages/components/copyright/copyright.en-US.md` 中编写英文 API 文档

## 依赖图

```
阶段 1 (T001 设置)
    │
    ▼
阶段 2 (T002 ConfigProvider 类型, T003 Props [P], T004 Type [P])
    │
    ├──────────────┬──────────────┐
    ▼              ▼              ▼
阶段 3 (US1)   阶段 4 (US2)   阶段 6 (US4)
T005 组件实现   T007 _var [P]   T012 文档+示例 [P]
    │           T008 _mixin [P]     (依赖 T005)
    ▼           T009 主样式
T006 入口       T010 样式入口
    │              │
    └──────┬───────┘
           ▼
      阶段 5 (US3)
      T011 注册导出
```

**故事完成顺序**: US1 → US2 ≈ US4（可并行） → US3（最后集成）

## 并行执行示例

### 批次 1（阶段 1 + 2）
```
并行执行:
  ├── T001 创建目录结构
  └── T002 ConfigProvider 类型扩展

T001 完成后并行:
  ├── T003 [P] Props 定义
  └── T004 [P] Type 定义
```

### 批次 2（阶段 3 + 4 + 6 部分并行）
```
T002-T004 完成后并行:
  ├── T005 [US1] 组件核心实现
  ├── T007 [P] [US2] _var.less
  └── T008 [P] [US2] _mixin.less

T007/T008 完成后:
  └── T009 [US2] 主样式 _index.less

T005 完成后并行:
  ├── T006 [US1] 入口文件
  ├── T010 [US2] 样式入口
  └── T012 [P] [US4] 文档+示例
```

### 批次 3（阶段 5 集成）
```
所有前序完成后:
  └── T011 [US3] 组件注册导出
```

## 实现策略

### MVP 范围
**MVP = US1（基础版权声明展示）**
- 完成 T001-T006 即可获得一个可运行的 copyright 组件
- 后续 US2（样式）、US4（文档）、US3（注册）为增量交付

### 增量交付顺序
1. **增量 1**: US1 — 组件可渲染，显示正确的版权信息
2. **增量 2**: US2 — 样式符合海外版规范
3. **增量 3**: US4 — 文档和示例完善
4. **增量 4**: US3 — 集成注册，可通过主包使用

## 进度统计

| 阶段 | 总任务 | 已完成 | 进行中 | 待开始 | 完成率 |
|------|--------|--------|--------|--------|--------|
| 阶段 1: 设置 | 1 | 1 | 0 | 0 | 100% |
| 阶段 2: 基础 | 3 | 3 | 0 | 0 | 100% |
| 阶段 3: US1 | 2 | 2 | 0 | 0 | 100% |
| 阶段 4: US2 | 4 | 4 | 0 | 0 | 100% |
| 阶段 5: US3 | 1 | 1 | 0 | 0 | 100% |
| 阶段 6: US4 | 1 | 1 | 0 | 0 | 100% |
| **总计** | **12** | **12** | **0** | **0** | **100%** |

## 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-03-04 | 初始版本 | @plutoqin |
