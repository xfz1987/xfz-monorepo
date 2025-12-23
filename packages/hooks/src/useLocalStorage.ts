import { useState } from 'react';
import { tuplify } from './uitls';

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
