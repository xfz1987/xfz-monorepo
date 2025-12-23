import { useRef, useState, useCallback } from 'react';
import { tuplify } from './uitls';

/**
 * 跟踪组件状态的历史记录
 * @param defaultValue 状态的初始值
 * @param capacity 可选参数，用于设置应存储在历史记录中的最大状态数
 */
export const useStateWithHistory = (defaultValue: number, { capacity = 10 } = {}) => {
  const [value, setValue] = useState(defaultValue);
  const historyRef = useRef([value]);
  const pointerRef = useRef(0);

  const set = useCallback(
    (v: (arg: number) => number | number) => {
      const resolvedValue = typeof v === 'function' ? v(value) : v;
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return tuplify(value, set, {
    history: historyRef.current,
    pointer: pointerRef.current,
    back,
    forward,
    go,
  });
};

// function StateWithHistoryComponent() {
//   const [count, setCount, { history, pointer, back, forward, go }] =
//     useStateWithHistory(1)

//   return (
//     <div>
//       <div>{count}</div>
//       <div>{history.join(", ")}</div>
//       <div>Pointer - {pointer}</div>
//       <button onClick={() => setCount(currentCount => currentCount * 2)}>
//         Double
//       </button>
//       <button onClick={() => setCount(currentCount => currentCount + 1)}>
//         Increment
//       </button>
//       <button onClick={back}>Back</button>
//       <button onClick={forward}>Forward</button>
//       <button onClick={() => go(2)}>Go To Index 2</button>
//     </div>
//   )
// }
