/**
 * reset the timer if delay changes
 * DO NOT reset the timer if only callback changes
 */
import { useEffect, useRef } from 'react';

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
