/**
 * 用于管理、切换状态的钩子
 */
import { useState } from 'react';
export const useToggle = (initialState = false) => {
  const [toggle, setToggle] = useState(initialState);

  const reset = () => setToggle(initialState);

  const handleToggle = () => setToggle(prev => !prev);

  return {
    on: toggle,
    set: setToggle,
    reset,
    toggle: handleToggle,
  };
};

// 使用
// function App() {
//   const { on, set, reset, toggle } = useToggle()

//   return (
//     <div>
//       <p>On: {on ? 'true' : 'false'}</p>
//       <button onClick={() => set(true)}>Set to on</button>
//       <button onClick={reset}>Reset</button>
//       <button onClick={toggle}>Toggle</button>
//     </div>
//   )
// }
