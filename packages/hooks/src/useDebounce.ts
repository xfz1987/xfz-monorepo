import { useEffect, useRef } from 'react';

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
