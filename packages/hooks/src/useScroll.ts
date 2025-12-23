/**
 * 控制页面垂直方向的滚动并通过平滑滚动返回顶部/底部
 * 创建一个无限scroll（当isAtBottom为true的时候fetch()）
 */
import { useEffect, useRef, useCallback, useState } from 'react';
import { tuplify } from './uitls';

// type ParamsType = {
//   threshold?: number; //
//   isWindow?: boolean;
//   smooth?: boolean;
// };

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
