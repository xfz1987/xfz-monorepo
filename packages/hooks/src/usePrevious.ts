/**
 * 跟踪组件变量的先前值
 */

import { useRef } from 'react';

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
