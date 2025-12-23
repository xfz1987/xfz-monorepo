import { useEffect, useRef } from 'react';

/**
 * 防抖Hook，延迟执行回调函数直到指定时间后没有新的调用
 *
 * @param callback - 需要防抖的回调函数
 * @param delay - 延迟时间（毫秒）
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [inputValue, setInputValue] = useState("");
 *
 *   useDebounce(() => {
 *     // 执行搜索API调用
 *     console.log('Searching for:', inputValue);
 *   }, 500);
 *
 *   return <input onChange={(e) => setInputValue(e.target.value)} />;
 * }
 * ```
 */
export const useDebounce = (callback: () => void, delay: number) => {
	const saveCallback = useRef<() => void>(null);
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		saveCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}
		timeoutId.current = setTimeout(() => {
			saveCallback.current && saveCallback.current();
			timeoutId.current = null;
		}, delay);
	}, [delay]);
};

// 用法
// const [inputValue, setInputValue] = useState("");

// useDebounce(() => {
//   // do somethings
// }, 500);
