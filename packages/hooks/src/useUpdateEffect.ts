/**
 * 如果你只想在特定值更改时而不是在初始渲染时运行某些逻辑，此钩子会很有用。
 * 例如，当你希望在用户从下拉菜单中选择特定选项后从 API 获取数据时，或者当你希望在窗口大小更改后更新元素在屏幕上的位置时
 */
import { useEffect, useRef } from 'react';

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
