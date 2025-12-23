import { useState, useEffect, useRef } from 'react';

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
