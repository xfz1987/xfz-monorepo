import { useCallback, useEffect, useState } from 'react';

/**
 * 处理组件异步操作并跟踪loading、error和value状态
 *
 * @param callback - 返回Promise的异步函数
 * @param dependencies - 依赖数组，当依赖项变化时重新执行异步操作
 * @returns 包含loading、error和value三个状态的对象
 *
 * @example
 * ```tsx
 * function AsyncComponent() {
 *   const { loading, error, value } = useAsync(() => {
 *     return fetch('/api/data').then(res => res.json());
 *   }, []);
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   return <div>Data: {JSON.stringify(value)}</div>;
 * }
 * ```
 */
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
