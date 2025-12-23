import { useState, useEffect } from 'react';

/**
 * 检测特定按键的按下状态
 *
 * 可以根据按下的键触发事件，例如关闭模态框、提交表单等键盘行为
 *
 * @param targetKey - 要监听的键名（如 'Escape', 'Enter', 'a' 等）
 * @returns 返回一个布尔值，表示目标键是否被按下
 *
 * @example
 * ```tsx
 * function ModalComponent() {
 *   const [isOpen, setIsOpen] = useState(true);
 *   const escapePressed = useKeyPress("Escape");
 *
 *   useEffect(() => {
 *     if (escapePressed) {
 *       setIsOpen(false);
 *     }
 *   }, [escapePressed]);
 *
 *   return isOpen ? <div>Modal Content</div> : null;
 * }
 * ```
 */
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
