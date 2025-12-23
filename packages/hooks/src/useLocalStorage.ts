import { useState } from 'react';
import { tuplify } from './uitls';

/**
 * 将状态持久化到localStorage的Hook
 *
 * @param keyName - localStorage中的键名
 * @param initialValue - 初始值，可以是字符串、数字或对象
 * @returns 返回一个元组 [value, setValue]，类似于 useState
 *
 * @example
 * ```tsx
 * function App() {
 *   const [name, setName] = useLocalStorage('userName', 'Guest');
 *
 *   return (
 *     <div>
 *       <p>Name: {name}</p>
 *       <input
 *         type="text"
 *         value={name}
 *         onChange={(e) => setName(e.target.value)}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export const useLocalStorage = (
  keyName: string,
  initialValue: string | number | Record<string, any>
) => {
  const [storeValue, setStoreValue] = useState(() => {
    try {
      const item = localStorage.getItem(keyName);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setValue = (value: string | number | Record<string, any>) => {
    try {
      setStoreValue(value);
      localStorage.setItem(keyName, JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  };

  return tuplify(storeValue, setValue);
};

// const [value, setValue] = useLocalStorage('name', 'Joe');

// function App() {
//   const [value, setValue] = useLocalStorage('name', 'Joe')

//   return (
//     <div>
//       <p>{value}</p>
//       <input type="text" onChange={(e) => setValue(e.currentTarget.value)} />
//     </div>
//   )
// }
