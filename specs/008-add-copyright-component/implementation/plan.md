# t-copyright 海外版权声明组件 实施计划

> **规范引用**: 本实施计划遵循 `../../.codebuddy/.rules/team-rule.md` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | add-copyright-component |
| 规格版本 | 0.1.0 |
| 计划版本 | 0.1.0 |
| 创建日期 | 2026-03-04 |
| 预计完成 | 2026-03-05 |

## 技术上下文

| 维度 | 详情 |
|------|------|
| 框架 | Vue 3.x + TypeScript 5.x |
| 构建工具 | Vite |
| 样式方案 | Less + 海外三层架构（overseas/） |
| 组件模式 | defineComponent + Composition API + TSX |
| 包管理 | pnpm workspace (Monorepo) |
| 测试框架 | Vitest |

## 宪法检查

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 遵循组件目录结构 | ✅ | 按 `component-name/` 标准结构创建 |
| 使用 withInstall 注册 | ✅ | 使用 `@tdesign/shared-utils` 的 withInstall |
| TypeScript 类型完整 | ✅ | 提供 CopyrightConfig、TdCopyrightProps 类型 |
| 海外样式三层架构 | ✅ | overseas/index.less → _index.less → _var.less |
| 文档中英文齐全 | ✅ | copyright.md + copyright.en-US.md |
| 示例代码完整 | ✅ | _example/base.vue |

## 实施概览

### 目标
在 TDesign Vue 3 海外版组件库中新增 `t-copyright` 版权声明组件，从 Vue 2 海外版迁移，遵循 Vue 3 架构规范。

### 范围
- 包含：组件实现、类型定义、样式、示例、文档、ConfigProvider 类型扩展、组件注册
- 不包含：单元测试（后续任务）、ConfigProvider locale 数据修改（已存在）

## 阶段划分

### 阶段 1: ConfigProvider 类型扩展 (0.5h)
**目标**: 在 GlobalConfigProvider 中添加 copyright 配置支持

**交付物**:
- [ ] 在 `packages/components/config-provider/type.ts` 中新增 `CopyrightConfig` 接口
- [ ] 在 `GlobalConfigProvider` 接口中添加 `copyright?: CopyrightConfig` 字段

### 阶段 2: 组件核心实现 (1h)
**目标**: 创建 copyright 组件核心文件

**交付物**:
- [ ] `packages/components/copyright/copyright.tsx` — 组件实现
- [ ] `packages/components/copyright/props.ts` — Props 定义
- [ ] `packages/components/copyright/type.ts` — 类型导出
- [ ] `packages/components/copyright/index.ts` — 入口文件（withInstall 包装）

### 阶段 3: 海外样式适配 (0.5h)
**目标**: 创建符合海外三层架构的样式文件

**交付物**:
- [ ] `packages/components/copyright/style/index.js` — Less 样式入口
- [ ] `packages/components/copyright/style/css.js` — CSS 样式入口
- [ ] `packages/components/copyright/style/overseas/index.less` — 海外样式入口
- [ ] `packages/components/copyright/style/overseas/_index.less` — 主样式
- [ ] `packages/components/copyright/style/overseas/_var.less` — 组件变量
- [ ] `packages/components/copyright/style/overseas/_mixin.less` — Mixin

### 阶段 4: 示例与文档 (0.5h)
**目标**: 提供基础示例和中英文文档

**交付物**:
- [ ] `packages/components/copyright/_example/base.vue` — 基础用法示例
- [ ] `packages/components/copyright/copyright.md` — 中文 API 文档
- [ ] `packages/components/copyright/copyright.en-US.md` — 英文 API 文档

### 阶段 5: 组件注册与集成 (0.5h)
**目标**: 将组件注册到主包

**交付物**:
- [ ] 在 `packages/components/components.ts` 添加导出
- [ ] 在 `packages/common/js/components.ts` 的 `WEB_COMPONENT_MAP` 添加映射

### 阶段 6: 验证 (0.5h)
**目标**: 确保组件正确集成

**交付物**:
- [ ] TypeScript 类型检查通过（`pnpm run lint:tsc`）
- [ ] ESLint 检查通过（`pnpm run lint`）
- [ ] 开发服务器可正常渲染组件（`pnpm run dev:vue`）

## 技术决策

### 决策 1: ConfigProvider 扩展方式
**背景**: Vue 3 的 GlobalConfigProvider 类型定义中缺少 copyright key，但 locale 数据已存在。
**选项**:
1. 仅扩展类型定义 — locale 数据已存在，只需添加类型
2. 同时修改 locale 数据和类型定义 — 完整但不必要

**决定**: 选择选项 1
**理由**: `packages/common/js/global-config/locale/zh_CN.ts` 已包含 `copyright: { deptText: '腾讯公司 财经线-财经IT管理部' }`，无需重复修改。

### 决策 2: Props 设计
**背景**: 是否需要为 copyright 组件提供自定义 props（如起始年份、公司名等）。
**选项**:
1. 无 props，纯展示 — 与 Vue 2 版本保持一致
2. 提供可配置 props — 更灵活但超出当前需求

**决定**: 选择选项 1
**理由**: 保持与 Vue 2 版本一致的极简设计，后续有需求可扩展。

### 决策 3: 样式入口引用
**背景**: `style/index.js` 应引用海外样式还是默认样式。
**选项**:
1. 直接引用海外样式 `./overseas/index.less`
2. 引用 `@tdesign/common-style` 的默认样式

**决定**: 选择选项 1
**理由**: 这是一个海外版专属组件，alert 和 button 等已适配组件也采用此模式。

## 风险管理

| 风险 | 缓解措施 | 负责人 |
|------|----------|--------|
| ConfigProvider type.ts 是脚本生成文件，手动修改可能被覆盖 | 确认修改方式是否与脚本生成兼容；必要时同步修改生成脚本 | @plutoqin |
| props.ts/type.ts 通常由脚本自动生成 | copyright 组件极简，手动创建即可；后续可通过脚本重新生成对齐 | @plutoqin |

## 资源需求

### 人力资源
- 开发: 0.5 人天
- 测试: 0.25 人天（后续）

### 技术资源
- 无额外服务器或第三方服务需求

## 里程碑

| 里程碑 | 日期 | 交付物 | 状态 |
|--------|------|--------|------|
| M1 | 2026-03-04 | ConfigProvider 类型扩展 + 组件核心实现 | 待开始 |
| M2 | 2026-03-04 | 海外样式 + 示例文档 | 待开始 |
| M3 | 2026-03-05 | 组件注册 + 验证通过 | 待开始 |

## 依赖文档

| 文档 | 路径 |
|------|------|
| 功能规格 | `specs/008-add-copyright-component/spec.md` |
| 研究报告 | `specs/008-add-copyright-component/implementation/research.md` |
| 数据模型 | `specs/008-add-copyright-component/implementation/data-model.md` |
| API 契约 | `specs/008-add-copyright-component/contracts/copyright-component-api.md` |
| 快速开始 | `specs/008-add-copyright-component/implementation/quickstart.md` |
| 需求检查清单 | `specs/008-add-copyright-component/checklists/requirements.md` |

## 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-03-04 | 初始版本 | @plutoqin |
