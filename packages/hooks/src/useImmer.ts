import { useCallback, useState } from 'react';
import { produce, Draft, freeze } from 'immer';

/**
 * Draft函数类型，接收一个draft状态并进行修改
 */
export type DraftFunction<S> = (draft: Draft<S>) => void;

/**
 * Updater函数类型，可以传入新状态或draft函数
 */
export type Updater<S> = (arg: S | DraftFunction<S>) => void;

/**
 * useImmer Hook返回的元组类型
 */
export type ImmerHook<S> = [S, Updater<S>];

/**
 * useImmer函数签名
 */
export function useImmer<S = any>(initialState: S | (() => S)): ImmerHook<S>;

/**
 * 基于Immer的状态管理Hook，允许使用可变的方式更新不可变状态
 *
 * @param initialState - 初始状态，可以是一个值或返回初始状态的函数
 * @returns 返回一个元组 [state, setState]，类似于 useState
 *
 * @example
 * ```tsx
 * function TodoList() {
 *   const [todos, setTodos] = useImmer([
 *     { id: 1, text: 'Learn React', done: false }
 *   ]);
 *
 *   const toggleTodo = (id: number) => {
 *     setTodos(draft => {
 *       const todo = draft.find(t => t.id === id);
 *       if (todo) todo.done = !todo.done;
 *     });
 *   };
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useImmer<T>(initialState: T) {
  // const [state, setState] = useState(initialState);
  // 冻结 state，第二参数 true，表示深度冻结，对象不能修改了
  const [value, updateValue] = useState(() =>
    freeze(typeof initialState === 'function' ? initialState() : initialState, true)
  );

  // 使用 useCallback，放置组件间传递，产生句柄
  return [
    value,
    useCallback((updater: Updater<T>) => {
      if (typeof updater === 'function') {
        updateValue(produce(updater));
      } else {
        updateValue(freeze(updater));
      }
    }, []),
  ];
}
