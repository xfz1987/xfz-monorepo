import { useEffect, useRef } from 'react';

/**
 * 设置定时器的Hook，按指定间隔执行回调函数
 *
 * @param callback - 需要定时执行的回调函数
 * @param delay - 执行间隔时间（毫秒）。如果为0或负数，则立即执行一次
 *
 * @example
 * ```tsx
 * function CountdownComponent() {
 *   const [count, setCount] = useState(10);
 *
 *   useInterval(() => {
 *     setCount(c => c - 1);
 *   }, 1000);
 *
 *   return <div>Countdown: {count}</div>;
 * }
 * ```
 */
export const useInterval = (callback: () => void, delay: number) => {
	const savedCallback = useRef<() => void>(null);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current && savedCallback.current();
		}

		if (delay && delay > 0) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		} else {
			tick();
			return () => {};
		}
	}, [delay]);
};
