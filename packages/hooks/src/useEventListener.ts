import { useEffect, useRef } from 'react';

/**
 * 为DOM元素添加事件监听器的Hook，自动处理清理逻辑
 *
 * @param eventType - 事件类型（如 'click', 'keydown', 'scroll' 等）
 * @param callback - 事件处理函数
 * @param element - 要监听的DOM元素，默认为window
 *
 * @example
 * ```tsx
 * function EventListenerComponent() {
 *   const [key, setKey] = useState("");
 *
 *   useEventListener("keydown", (e) => {
 *     setKey(e.key);
 *   });
 *
 *   return <div>Last Key: {key}</div>;
 * }
 * ```
 */
export const useEventListener = (
  eventType: string,
  callback: (e: Event) => void,
  element = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler, false);

    return () => {
      element.removeEventListener(eventType, handler, false);
    };
  }, [eventType, element]);
};

// function EventListenerComponent() {
//   const [key, setKey] = useState("")
//   useEventListener("keydown", e => {
//     setKey(e.key)
//   })

//   return <div>Last Key: {key}</div>
// }
