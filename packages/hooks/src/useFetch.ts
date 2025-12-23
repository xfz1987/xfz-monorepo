import { useAsync } from './useAsync';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};

/**
 * 封装fetch API的Hook，自动处理loading、error和data状态
 *
 * @param url - 请求的URL地址
 * @param options - fetch请求选项，会与默认选项合并
 * @param dependencies - 依赖数组，当依赖项变化时重新发起请求
 * @returns 包含loading、error和value三个状态的对象
 *
 * @example
 * ```tsx
 * function FetchComponent() {
 *   const [id, setId] = useState(1);
 *   const { loading, error, value } = useFetch(
 *     `https://jsonplaceholder.typicode.com/todos/${id}`,
 *     {},
 *     [id]
 *   );
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {JSON.stringify(error)}</div>;
 *   return <div>Data: {JSON.stringify(value)}</div>;
 * }
 * ```
 */
export const useFetch = (url: string, options = {}, dependencies = []) => {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    });
  }, dependencies);
};

// function FetchComponent() {
//   const [id, setId] = useState(1)
//   const { loading, error, value } = useFetch(
//     `https://jsonplaceholder.typicode.com/todos/${id}`,
//     {},
//     [id]
//   )

//   return (
//     <div>
//       <div>{id}</div>
//       <button onClick={() => setId(currentId => currentId + 1)}>
//         Increment ID
//       </button>
//       <div>Loading: {loading.toString()}</div>
//       <div>{JSON.stringify(error, null, 2)}</div>
//       <div>{JSON.stringify(value, null, 2)}</div>
//     </div>
//   )
// }
