/**
 * Pagination 海外适配 - Props 契约（实际实现版）
 *
 * 本文件定义 Pagination 组件海外适配的 Props 类型变更。
 * 已合并到 packages/components/pagination/type.ts 和 props.ts 中。
 *
 * 更新日期: 2026-03-03
 * 状态: ✅ 已实现
 */

import { TNode } from '../../packages/components/common';
import { SelectProps } from '../../packages/components/select';

/**
 * 海外版 Pagination 新增属性
 * 已合并到 TdPaginationProps 接口中
 */
export interface PaginationOverseasExtendedProps {
  /**
   * 每一页数据量的描述文字。
   * 非空时在分页大小选择器左侧渲染标签（如 "Items per page"）。
   * 渲染为 `<div class="page-size-dsc">{pageSizeDsc}</div>` 元素。
   * @default ''
   */
  pageSizeDsc?: string;

  /**
   * 用于自定义总页数呈现内容。
   * 默认显示 "of {pageCount} pages"。
   * 值为 false 则不显示。
   * 使用 renderTNodeJSX('totalPage', ...) 渲染。
   * @default true
   */
  totalPage?: boolean | TNode;
}

/**
 * 海外版 Pagination 默认值变更
 * 已在 props.ts 中修改
 */
export interface PaginationOverseasDefaultChanges {
  /** 折叠时最多显示页码按钮数。原默认值 5，海外改为 3 */
  foldedMaxPageBtn: 3;
  /** 最多显示页码按钮数。原默认值 10，海外改为 3 */
  maxPageBtn: 3;
  /** 页码省略模式。原默认值 'mid'，海外改为 ''（空字符串，不使用省略号） */
  pageEllipsisMode: '';
}

/**
 * 海外版 Pagination 中 Select 的默认透传属性
 *
 * 当用户未通过 selectProps 传入自定义属性时，使用以下默认值。
 * 实际代码：`{...(props.selectProps || { singleUseTag: false, suffixIconOs: 'caret-down-small' })}`
 *
 * 额外在 JSX 中直接设置：
 * - clearable={false}
 * - autoWidth={true}
 * - style={{ width: '70px' }}
 */
export interface PaginationOverseasSelectDefaults {
  /** 单选时是否使用 Tag 标签样式展示选中值 */
  singleUseTag: false;
  /** 自定义后缀图标名称 */
  suffixIconOs: 'caret-down-small';
}

/**
 * 海外版总量统计计算接口
 *
 * 实际实现代码（pagination.tsx 第 211-215 行）：
 * ```typescript
 * const startIndex = (innerCurrent.value - 1) * innerPageSize.value + 1;
 * const endIndex = Math.min(innerCurrent.value * innerPageSize.value, total);
 * const currentItemsDetail =
 *   total === 0 ? '0' : startIndex >= total ? `${startIndex}` : `${startIndex}-${endIndex}`;
 * const totalDisplayText = total === 0 ? '0 of 0 items' : `${currentItemsDetail} of ${total} items`;
 * ```
 */
export interface PaginationTotalCalculation {
  /** 当前页起始条目索引: (current - 1) * pageSize + 1 */
  startIndex: number;
  /** 当前页结束条目索引: Math.min(current * pageSize, total) */
  endIndex: number;
  /** 总条数 */
  total: number;
  /** 当前条数详情文案: total === 0 ? '0' : startIndex >= total ? `${startIndex}` : `${startIndex}-${endIndex}` */
  currentItemsDetail: string;
  /** 最终显示文案: total === 0 ? '0 of 0 items' : `${currentItemsDetail} of ${total} items` */
  displayText: string;
}
