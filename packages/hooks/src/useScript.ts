import { useAsync } from './useAsync';

/**
 * 动态加载外部JavaScript脚本
 *
 * @param url - 要加载的脚本URL
 * @returns 返回包含loading和error状态的对象
 *
 * @example
 * ```tsx
 * function ScriptComponent() {
 *   const { loading, error } = useScript(
 *     "https://code.jquery.com/jquery-3.6.0.min.js"
 *   );
 *
 *   if (loading) return <div>Loading script...</div>;
 *   if (error) return <div>Error loading script</div>;
 *   return <div>Script loaded successfully</div>;
 * }
 * ```
 */
export const useScript = (url: string) => {
  return useAsync(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    return new Promise((resolve, reject) => {
      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);
      document.body.appendChild(script);
    });
  }, [url]);
};

// function ScriptComponent() {
//   const { loading, error } = useScript(
//     "https://code.jquery.com/jquery-3.6.0.min.js"
//   )

//   if (loading) return <div>Loading</div>
//   if (error) return <div>Error</div>
//   return <div>{window.$(window).width()}</div>
// }
