import { useState } from 'react';

/**
 * 管理布尔状态的切换Hook
 *
 * @param initialState - 初始状态，默认false
 * @returns 返回包含状态和控制函数的对象
 *
 * @example
 * ```tsx
 * function ToggleComponent() {
 *   const { on, set, reset, toggle } = useToggle();
 *
 *   return (
 *     <div>
 *       <p>State: {on ? 'ON' : 'OFF'}</p>
 *       <button onClick={() => set(true)}>Set to ON</button>
 *       <button onClick={toggle}>Toggle</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */
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
