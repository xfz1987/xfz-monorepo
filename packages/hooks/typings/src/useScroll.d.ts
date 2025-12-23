/// <reference types="react" />
export declare const useScroll: ({ threshold, isWindow, smooth }?: {
    threshold?: number | undefined;
    isWindow?: boolean | undefined;
    smooth?: boolean | undefined;
}) => {
    isAtBottom: boolean;
    handleScroll: () => void;
    goToTop: () => void;
    goToBottom: () => void;
    ref: import("react").RefObject<Window | HTMLElement | null>;
};
//# sourceMappingURL=useScroll.d.ts.map