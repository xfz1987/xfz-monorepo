import { useAsync } from './useAsync';

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
