import { useEffect, useState, RefObject } from 'react';

/**
 * 检测DOM元素是否在视口中可见
 *
 * 使用IntersectionObserver API来跟踪元素的可见性状态。
 * rootMargin参数用于定义根元素周围的偏移量，可以在检查交叉点之前放大或缩小根元素的边界框。
 *
 * @param ref - 对DOM元素的引用，用于检测可见性
 * @param rootMargin - 根元素周围的偏移量，默认为"0px"
 * @returns 返回一个布尔值，表示元素是否在视口中可见
 *
 * @example
 * ```tsx
 * function LazyLoadComponent() {
 *   const elementRef = useRef(null);
 *   const isVisible = useOnScreen(elementRef, '-100px');
 *
 *   return (
 *     <div ref={elementRef}>
 *       {isVisible ? '✓ Visible' : '✗ Not visible'}
 *     </div>
 *   );
 * }
 * ```
 */
export function useOnScreen<S>(ref: RefObject<Element>, rootMargin = '0px'): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin,
    });
    observer.observe(ref.current);

    return () => {
      if (!ref.current) return;
      observer.unobserve(ref.current);
    };
  }, [ref.current, rootMargin]);

  return visible;
}

// export default function OnScreenComponentComponent() {
//   const headerTwoRef = useRef(null!);
//   const visible = useOnScreen(headerTwoRef, '-100px');

//   return (
//     <div>
//       <h1>Header</h1>
//       <div>
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt, nam id itaque error
//         dicta? Numquam earum iusto optio officia, molestias debitis illum facilis nemo asperiores
//         eaque voluptates modi? Dicta mollitia fugit doloremque vitae, dolores sequi fuga quas vel
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//         incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate dolorem
//       </div>
//       <h1 ref={headerTwoRef}>Header 2 {visible && '(Visible)'}</h1>
//       <div>
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt, nam id itaque error
//         dicta? Numquam earum iusto optio officia, molestias debitis illum facilis nemo asperiores
//         eaque voluptates modi? Dicta mollitia fugit doloremque vitae, dolores sequi fuga quas vel
//       </div>
//     </div>
//   );
// }
