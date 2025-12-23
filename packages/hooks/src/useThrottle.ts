import { useState, useEffect, useRef } from 'react';

/**
 * 节流Hook，限制回调函数在指定时间内只执行一次
 *
 * @param callback - 需要节流的回调函数
 * @param limit - 限制时间间隔（毫秒）
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [inputValue, setInputValue] = useState("");
 *
 *   useThrottle(() => {
 *     // 执行搜索API调用
 *     console.log('Searching for:', inputValue);
 *   }, 500);
 *
 *   return <input onChange={(e) => setInputValue(e.target.value)} />;
 * }
 * ```
 */
export const useThrottle = (callback: () => void, limit: number) => {
	const [throttling, setThrottling] = useState(false);
	const savedCallback = useRef<() => void>(null);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (throttling) {
			return;
		}

		savedCallback.current && savedCallback.current();
		setThrottling(true);
		setTimeout(() => setThrottling(false), limit);
	}, [throttling, limit]);
};

// 使用
// const [inputValue, setInputValue] = useState("");

// useThrottle(() => {
// // do somethings
// }, 500);
