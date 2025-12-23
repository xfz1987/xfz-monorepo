/**
 * 允许组件检测特定DOM元素何时在视口中可见并跟踪可见性状态
 * rootMargin是一个可选字符串，用于定义根元素周围的偏移量。它可用于在检查交叉点之前放大或缩小根元素的边界框。默认值为“0px”
 */
import { RefObject } from 'react';
/**
 * ref是对 DOM 元素的引用以检测可见性
 * @param ref
 * @param rootMarin
 */
export declare function useOnScreen<S>(ref: RefObject<Element>, rootMargin?: string): boolean;
//# sourceMappingURL=useOnScreen.d.ts.map