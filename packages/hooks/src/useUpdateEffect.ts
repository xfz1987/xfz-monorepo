import { useEffect, useRef } from 'react';

/**
 * 类似useEffect，但跳过首次渲染，仅在依赖项更新时执行
 *
 * 适用于只想在特定值变化时而非初始渲染时执行逻辑的场景。
 * 例如：监听用户选择变化后获取API数据，或窗口大小变化后更新元素位置
 *
 * @param callback - 副作用函数
 * @param dependencies - 依赖数组
 *
 * @example
 * ```tsx
 * function UpdateEffectComponent() {
 *   const [count, setCount] = useState(10);
 *
 *   useUpdateEffect(() => {
 *     alert(`Count changed to: ${count}`);
 *   }, [count]);
 *
 *   return (
 *     <div>
 *       <div>Count: {count}</div>
 *       <button onClick={() => setCount(c => c + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useUpdateEffect = (callback: () => void, dependencies = []) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    return callback();
  }, dependencies);
};

// function UpdateEffectComponent() {
//   const [count, setCount] = useState(10)
//   useUpdateEffect(() => alert(count), [count])

//   return (
//     <div>
//       <div>{count}</div>
//       <button onClick={() => setCount(c => c + 1)}>Increment</button>
//     </div>
//   )
// }
