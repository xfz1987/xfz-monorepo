import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
    return { innerWidth, innerHeight, outerWidth, outerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleResize = () => setWindowSize(getWindowSize());

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

// 使用
// function App() {
//   const windowSize = useWindowSize()

//   return (
//     <div>{windowSize.innerWidth}</div>
//   )
// }
