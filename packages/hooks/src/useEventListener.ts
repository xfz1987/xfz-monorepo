import { useEffect, useRef } from 'react';

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
