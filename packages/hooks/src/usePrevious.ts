import { useRef } from 'react';

/**
 * 跟踪并返回变量的先前值
 *
 * @param value - 需要跟踪的值
 * @returns 返回该值在上一次渲染时的值
 *
 * @example
 * ```tsx
 * function CounterComponent() {
 *   const [count, setCount] = useState(0);
 *   const previousCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current: {count}</p>
 *       <p>Previous: {previousCount}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const usePrevious = (value: any) => {
	const currentRef = useRef<any>(value);
	const prevRef = useRef(null);

	if (currentRef.current !== value) {
		prevRef.current = currentRef.current;
		currentRef.current = value;
	}

	return prevRef.current;
};

// function PreviousComponent() {
//   const [count, setCount] = useState(0);
//   const previousCount = usePrevious(count);

//   return (
//     <div>
//       <div>
//         {count} - {previousCount}
//       </div>
//       <button onClick={() => setCount(x => x + 1)}>Increment</button>
//     </div>
//   );
// }
