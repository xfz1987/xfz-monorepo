import { useCallback, useState } from 'react';
import { produce, Draft, freeze } from 'immer';

/**
 * 定义函数的签名
 * initialState 可以是一个数据，也可以是一个函数
 * useImmer 返回元组，类似 [state, setState] = useImmer(data);
 * Draft 中间状态
 * (() => S) 自执行函数
 */
export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];
export function useImmer<S = any>(initialState: S | (() => S)): ImmerHook<S>;

/**
 * 实现
 * @param initialState
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
