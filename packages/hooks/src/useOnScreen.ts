/**
 * 允许组件检测特定DOM元素何时在视口中可见并跟踪可见性状态
 * rootMargin是一个可选字符串，用于定义根元素周围的偏移量。它可用于在检查交叉点之前放大或缩小根元素的边界框。默认值为“0px”
 */
import { useEffect, useState, RefObject } from 'react';

/**
 * ref是对 DOM 元素的引用以检测可见性
 * @param ref
 * @param rootMarin
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
