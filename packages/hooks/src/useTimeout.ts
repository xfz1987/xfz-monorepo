import { useEffect, useRef } from 'react';

/**
 * 设置延迟执行的定时器Hook
 *
 * 当delay变化时会重置定时器，但callback变化时不会重置
 *
 * @param callback - 延迟执行的回调函数
 * @param delay - 延迟时间（毫秒）
 *
 * @example
 * ```tsx
 * function TimeoutComponent() {
 *   const [count, setCount] = useState(0);
 *
 *   useTimeout(() => {
 *     console.log('Executed after delay');
 *     setCount(c => c + 1);
 *   }, 2000);
 *
 *   return <div>Count: {count}</div>;
 * }
 * ```
 */
export function useTimeout(callback: () => void, delay: number): void;

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef<() => void>(null!);
  callbackRef.current = callback;

  useEffect(() => {
    const id = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);
}

// 用法
// const [count, setCount] = useState(0);
// useInterval(() => {
//   setCount(count + 1);
// }, 1000);
