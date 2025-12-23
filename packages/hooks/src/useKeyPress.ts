/**
 * 检测何时按下特定键，可以根据按下的键触发事件。例如，关闭模态框、提交表单等键盘行为
 */
import { useState, useEffect } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [pressed, setPressed] = useState(false);

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setPressed(true);
    }
  };

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return pressed;
};

// 使用
// const closeModalKeyPress = useKeyPress("Escape");
