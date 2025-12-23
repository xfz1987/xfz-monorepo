import { useEffect, useRef, useCallback, useState } from 'react';
import { tuplify } from './uitls';

/**
 * 控制页面或元素的垂直滚动，提供滚动到顶部/底部的功能
 *
 * 可用于实现无限滚动（当isAtBottom为true时加载更多数据）或返回顶部按钮等功能
 *
 * @param options - 配置选项
 * @param options.threshold - 距离底部的阈值（像素），默认450px
 * @param options.isWindow - 是否监听window滚动，默认false
 * @param options.smooth - 是否使用平滑滚动，默认true
 * @returns 返回包含滚动状态和控制函数的对象
 *
 * @example
 * ```tsx
 * function ScrollComponent() {
 *   const { isAtBottom, goToTop, goToBottom } = useScroll({
 *     isWindow: true,
 *     threshold: 500,
 *   });
 *
 *   useEffect(() => {
 *     if (isAtBottom) {
 *       // 加载更多数据
 *     }
 *   }, [isAtBottom]);
 *
 *   return (
 *     <div>
 *       <button onClick={goToTop}>返回顶部</button>
 *       {isAtBottom && <div>Loading more...</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export const useScroll = ({ threshold = 450, isWindow = false, smooth = true } = {}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef<Window | HTMLElement | null>(isWindow ? window : null);

  const goToTop = useCallback(() => {
    ref.current?.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [smooth]);

  const goToBottom = useCallback(() => {
    const ele = ref.current instanceof Window ? document.documentElement : ref.current;

    ref.current?.scrollTo({
      top: ele?.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [smooth]);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      let isAtBottom;
      if (ref.current instanceof Window) {
        const currentScrollTop = window.innerHeight + window.scrollY;
        isAtBottom = currentScrollTop >= document.documentElement.offsetHeight - threshold;
      } else {
        const currentScrollTop = ref.current.offsetHeight + ref.current.scrollTop;
        isAtBottom = currentScrollTop >= ref.current.scrollHeight - threshold;
      }
      setIsAtBottom(isAtBottom);
    }
  }, [threshold]);

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return;
  }, [isWindow, handleScroll]);

  return { isAtBottom, handleScroll, goToTop, goToBottom, ref };
};

// function ScrollComponent({ children }) {
//   const { isAtBottom, goToTop } = useScroll({
//     isWindow: true,
//     threshold: 500,
//   });

//   return (
//     <>
//       {isAtBottom && <Footer />}
//       {children}
//       <button onClick={goTop}>返回顶部</button>
//     </>
//   );
// }
