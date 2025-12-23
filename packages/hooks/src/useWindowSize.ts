import { useState, useEffect } from 'react';

/**
 * 追踪浏览器窗口尺寸的Hook
 *
 * @returns 返回包含窗口尺寸信息的对象
 *
 * @example
 * ```tsx
 * function WindowSizeComponent() {
 *   const { innerWidth, innerHeight, outerWidth, outerHeight } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Inner Width: {innerWidth}px</p>
 *       <p>Inner Height: {innerHeight}px</p>
 *       <p>Outer Width: {outerWidth}px</p>
 *       <p>Outer Height: {outerHeight}px</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useWindowSize = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
    return { innerWidth, innerHeight, outerWidth, outerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleResize = () => setWindowSize(getWindowSize());

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

// 使用
// function App() {
//   const windowSize = useWindowSize()

//   return (
//     <div>{windowSize.innerWidth}</div>
//   )
// }
