/**
 * 跟踪组件状态的历史记录
 * @param defaultValue 状态的初始值
 * @param capacity 可选参数，用于设置应存储在历史记录中的最大状态数
 */
export declare const useStateWithHistory: (defaultValue: number, { capacity }?: {
    capacity?: number | undefined;
}) => [number, (v: (arg: number) => number | number) => void, {
    history: number[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
}];
//# sourceMappingURL=useStateWithHistory.d.ts.map