import app from '@/app.svelte';

export type Tooltip = {
  children: () => any;
  props: any;
  x: number;
  y: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  lockInPlace: boolean;
  targetX: number;
  targetY: number;
  visible: boolean;
};

const tooltip = (node: Node, item: any) => {
  const mouseEnter = (event: MouseEvent) => {
    const rect = (node as HTMLElement).getBoundingClientRect();

    let targetX = rect.left + rect.width / 2;
    let targetY = rect.top + rect.height / 2;

    if (item?.direction === 'up') targetY = rect.top;
    if (item?.direction === 'down') targetY = rect.top + rect.height;
    if (item?.direction === 'right') targetX = rect.left + rect.width;
    if (item?.direction === 'left') targetX = rect.left;

    const { clientX, clientY } = event;

    app.tooltip = {
      x: clientX,
      y: clientY,
      targetX,
      targetY,
      visible: item?.props?.visible !== undefined ? item.props.visible : true,
      ...item,
      props: { ...item.props } // strip reference
    };

    document.addEventListener('mousemove', mouseMove as EventListener);
  };

  const mouseMove = (event: MouseEvent) => {
    if (!app.tooltip) return;
    app.tooltip.x = event.clientX;
    app.tooltip.y = event.clientY;
  };

  const mouseLeave = () => {
    if (!app.tooltip) return;
    app.tooltip.visible = false;
  };

  node.addEventListener('mouseenter', mouseEnter as EventListener);
  node.addEventListener('mouseleave', mouseLeave as EventListener);

  return {
    destroy: () => {
      node.removeEventListener('mouseenter', mouseEnter as EventListener);
      document.removeEventListener('mousemove', mouseMove as EventListener);
      node.removeEventListener('mouseleave', mouseLeave as EventListener);
    }
  };
};

// let itemBeingDragged;
// let clone;
// const drops = [];
// let x, y;

// const drag = (node, item) => {
//   if (!item?.dragFrom) return;

//   node.style.touchAction = 'none';

//   const end = (event) => {
//     const { which, type } = event;
//     if (which !== 1 && type !== 'touchend') return;

//     node.style.pointerEvents = 'auto';

//     if (itemBeingDragged) {
//       let failed = true;
//       drops.forEach((drop) => {
//         const { left, top, width, height } = drop.getBoundingClientRect();
//         if (
//           x > left &&
//           x < left + width &&
//           y > top &&
//           y < top + height &&
//           !itemBeingDragged?.dropped
//         ) {
//           drop.dispatchEvent(new CustomEvent('attemptDrop'));
//           failed = false;
//           itemBeingDragged.dropped = true;
//         } else {
//           drop.dispatchEvent(new CustomEvent('outside'));
//         }
//       });

//       if (failed) {
//         // TODO: remove this in the future if no bug seems to be related to it
//         // requestAnimationFrame(() =>
//         // );
//         node.dispatchEvent(
//           new CustomEvent('dropOutside', {
//             detail: document.elementFromPoint(x, y)
//           })
//         );
//       }

//       itemBeingDragged = undefined;
//       document.body.removeChild(clone);
//       node.style.opacity = 1;
//     }

//     node.dispatchEvent(
//       new CustomEvent('dragging', {
//         detail: {
//           dragging: false,
//           dragTarget: undefined,
//           dragType: type
//         }
//       })
//     );

//     window.removeEventListener('mousemove', move);
//     window.removeEventListener('mouseup', end);
//     window.removeEventListener('touchmove', move);
//     window.removeEventListener('touchend', end, true);
//   };

//   const move = (event) => {
//     const { type, touches, clientX, clientY, which } = event;
//     if (which !== 1 && type !== 'touchmove') return;
//     event.preventDefault();

//     x = type === 'mousemove' ? clientX : touches[0].clientX;
//     y = type === 'mousemove' ? clientY : touches[0].clientY;

//     node.style.pointerEvents = 'none';
//     node.dispatchEvent(
//       new CustomEvent('dragging', {
//         detail: {
//           dragging: true,
//           dragTarget: document.elementFromPoint(x, y),
//           dragType: type
//         }
//       })
//     );

//     if (!itemBeingDragged) {
//       itemBeingDragged = { ...item }; // Clone it otherwise `itemBeingDragged.dropped` won't reset on `itemBeingDragged = undefined`
//       clone = node.cloneNode(true);
//       document.body.appendChild(clone);
//       node.style.opacity = 0;
//       clone.style.position = 'fixed';
//       const { top, left } = node.getBoundingClientRect();
//       clone.style.top = `${top - y}px`;
//       clone.style.left = `${left - x}px`;
//       clone.style.zIndex = 25;
//     }

//     clone.style.transform = `translate(${x}px, ${y}px)`;

//     drops.forEach((drop) => {
//       const { left, top, width, height } = drop.getBoundingClientRect();
//       if (x > left && x < left + width && y > top && y < top + height) {
//         drop.dispatchEvent(new CustomEvent('inside'));
//       } else {
//         drop.dispatchEvent(new CustomEvent('outside'));
//       }
//     });
//   };

//   const start = (event) => {
//     const { which, ctrlKey, type } = event;

//     if ((which !== 1 || ctrlKey) && type !== 'touchstart') return;
//     if (type !== 'touchstart') event.preventDefault(); // TODO: figure out if we need this for smartphone aswell?
//     node.dispatchEvent(
//       new CustomEvent('dragging', {
//         detail: {
//           dragging: true,
//           dragTarget: undefined,
//           dragType: type
//         }
//       })
//     );
//     window.addEventListener('mousemove', move);
//     window.addEventListener('mouseup', end);
//     window.addEventListener('touchmove', move);
//     window.addEventListener('touchend', end, true); // useCapture = true to make sure this events fires before any local `touchend`'s
//   };

//   node.addEventListener('touchstart', start);
//   node.addEventListener('mousedown', start);

//   return {
//     destroy: () => {
//       node.removeEventListener('touchstart', start);
//       node.removeEventListener('mousedown', start);
//     }
//   };
// };

// const drop = (node, droppable) => {
//   drops.push(node);

//   const inside = () =>
//     node.dispatchEvent(
//       new CustomEvent('hover', {
//         detail: {
//           canDrop: droppable(itemBeingDragged),
//         },
//       }),
//     );

//   const outside = () =>
//     node.dispatchEvent(
//       new CustomEvent('hover', {
//         detail: {
//           canDrop: undefined,
//         },
//       }),
//     );

//   const attemptDrop = () => {
//     if (droppable(itemBeingDragged)) {
//       node.dispatchEvent(
//         new CustomEvent('dropped', {
//           detail: {
//             item: itemBeingDragged,
//           },
//         }),
//       );
//     } else {
//       node.dispatchEvent(
//         new CustomEvent('hover', {
//           detail: {
//             canDrop: undefined,
//           },
//         }),
//       );
//     }
//   };

//   node.addEventListener('inside', inside);
//   node.addEventListener('outside', outside);
//   node.addEventListener('attemptDrop', attemptDrop);
//   return {
//     destroy: () => {
//       node.removeEventListener('inside', inside);
//       node.removeEventListener('outside', outside);
//       node.removeEventListener('attemptDrop', attemptDrop);
//     },
//   };
// };

export { tooltip };
