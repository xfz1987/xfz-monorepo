import { useEffect, useRef } from 'react';

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
