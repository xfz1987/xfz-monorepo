import { useRef, useState, useCallback } from 'react';
import { tuplify } from './uitls';

/**
 * 带有历史记录的状态管理Hook，支持撤销/重做操作
 *
 * @param defaultValue - 状态的初始值
 * @param options - 配置选项
 * @param options.capacity - 历史记录的最大容量，默认10
 * @returns 返回一个元组 [value, setValue, historyAPI]
 *
 * @example
 * ```tsx
 * function StateWithHistoryComponent() {
 *   const [count, setCount, { history, pointer, back, forward, go }] =
 *     useStateWithHistory(1);
 *
 *   return (
 *     <div>
 *       <div>Current: {count}</div>
 *       <div>History: {history.join(", ")}</div>
 *       <div>Pointer: {pointer}</div>
 *       <button onClick={() => setCount(count * 2)}>Double</button>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *       <button onClick={back}>Undo</button>
 *       <button onClick={forward}>Redo</button>
 *     </div>
 *   );
 * }
 * ```
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
