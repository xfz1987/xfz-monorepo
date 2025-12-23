/**
 * 处理组件异步操作并跟踪loading、error和value状态
 * @
 */

import { useCallback, useEffect, useState } from 'react';

export function useAsync(callback: () => any, dependencies: any[]) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [value, setValue] = useState<any>();

	const callbackFn = useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false));
	}, dependencies || []);

	useEffect(() => {
		callbackFn();
	}, [callbackFn]);

	return { loading, error, value };
}

// const { loading, error, value } = useAsync(() => {
//   return new Promise((resolve, reject) => {
//     const success = false;
//     setTimeout(() => {
//       success ? resolve('Hi') : reject('Error');
//     }, 1000);
//   });
// });

// function AsyncComponent() {
//   const { loading, error, value } = useAsync(() => {
//     return new Promise((resolve, reject) => {
//       const success = false
//       setTimeout(() => {
//         success ? resolve("Hi") : reject("Error")
//       }, 1000)
//     })
//   })

//   return (
//     <div>
//       <div>Loading: {loading.toString()}</div>
//       <div>{error}</div>
//       <div>{value}</div>
//     </div>
//   )
// }
