import { Draft } from 'immer';
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
export declare function useImmer<S = any>(initialState: S | (() => S)): ImmerHook<S>;
//# sourceMappingURL=useImmer.d.ts.map