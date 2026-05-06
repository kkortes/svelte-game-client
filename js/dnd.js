// Custom drag-and-drop engine
// Game-feel: snappy bezier animations, pointer events for desktop+mobile
// FLIP technique for smooth reordering

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const SNAP_DURATION = 180;
const SHIFT_DURATION = 150;

const zones = new Map();
let activeZone = null;
let dragState = null;

const getItemRects = (el) => {
  const items = [...el.children].filter(c => !c.hasAttribute('dnd-ghost'));
  return items.map(child => ({
    el: child,
    rect: child.getBoundingClientRect()
  }));
};

const animateFLIP = (entries, duration = SHIFT_DURATION) => {
  entries.forEach(({ el, rect: oldRect }) => {
    const newRect = el.getBoundingClientRect();
    const dx = oldRect.left - newRect.left;
    const dy = oldRect.top - newRect.top;
    if (dx === 0 && dy === 0) return;

    el.animate([
      { transform: `translate(${dx}px, ${dy}px)` },
      { transform: 'translate(0, 0)' }
    ], {
      duration,
      easing: EASE,
      fill: 'none'
    });
  });
};

const getInsertIndex = (zoneEl, x, y, direction) => {
  const children = [...zoneEl.children].filter(c =>
    !c.hasAttribute('dnd-ghost') && !c.hasAttribute('dnd-placeholder')
  );
  if (!children.length) return 0;

  for (let i = 0; i < children.length; i++) {
    const rect = children[i].getBoundingClientRect();
    const mid = direction === 'horizontal'
      ? rect.left + rect.width / 2
      : rect.top + rect.height / 2;
    const pos = direction === 'horizontal' ? x : y;
    if (pos < mid) return i;
  }
  return children.length;
};

const createGhost = (sourceEl) => {
  const ghost = sourceEl.cloneNode(true);
  ghost.setAttribute('dnd-ghost', '');
  ghost.style.cssText = `
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    transition: transform 50ms ${EASE};
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    opacity: 0.95;
  `;
  const rect = sourceEl.getBoundingClientRect();
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  document.body.appendChild(ghost);
  return ghost;
};

const createPlaceholder = (sourceEl) => {
  const ph = document.createElement('div');
  ph.setAttribute('dnd-placeholder', '');
  const rect = sourceEl.getBoundingClientRect();
  ph.style.cssText = `
    width: ${rect.width}px;
    height: ${rect.height}px;
    border: 2px dashed var(--border, #ccc);
    border-radius: var(--radius, 4px);
    opacity: 0.5;
    transition: all ${SHIFT_DURATION}ms ${EASE};
  `;
  return ph;
};

const positionGhost = (ghost, x, y, sourceRect) => {
  ghost.style.left = `${x - sourceRect.width / 2}px`;
  ghost.style.top = `${y - sourceRect.height / 2}px`;
};

const findZoneUnder = (x, y) => {
  for (const [el, config] of zones) {
    const rect = el.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return { el, config };
    }
  }
  return null;
};

const startDrag = (e, itemEl, zoneEl) => {
  const config = zones.get(zoneEl);
  if (!config) return;

  const items = config.items();
  const children = [...zoneEl.children].filter(c =>
    !c.hasAttribute('dnd-ghost') && !c.hasAttribute('dnd-placeholder')
  );
  const itemIndex = children.indexOf(itemEl);
  if (itemIndex === -1) return;

  const touch = e.touches ? e.touches[0] : e;
  const rect = itemEl.getBoundingClientRect();

  const ghost = createGhost(itemEl);
  const placeholder = createPlaceholder(itemEl);

  positionGhost(ghost, touch.clientX, touch.clientY, rect);

  // Record positions before DOM change
  const rects = getItemRects(zoneEl);

  // Replace item with placeholder
  itemEl.style.display = 'none';
  zoneEl.insertBefore(placeholder, itemEl);

  // FLIP animate the shift
  animateFLIP(rects);

  dragState = {
    ghost,
    placeholder,
    sourceEl: itemEl,
    sourceZone: zoneEl,
    sourceConfig: config,
    sourceIndex: itemIndex,
    item: items[itemIndex],
    sourceRect: rect,
    currentZone: zoneEl,
    currentIndex: itemIndex
  };

  activeZone = { el: zoneEl, config };
};

const moveDrag = (e) => {
  if (!dragState) return;
  e.preventDefault();

  const touch = e.touches ? e.touches[0] : e;
  const { ghost, placeholder, sourceRect, sourceConfig } = dragState;

  positionGhost(ghost, touch.clientX, touch.clientY, sourceRect);

  // Find which zone we're over
  const zoneUnder = findZoneUnder(touch.clientX, touch.clientY);

  if (zoneUnder && zoneUnder.config.group === sourceConfig.group) {
    const targetZone = zoneUnder.el;
    const direction = zoneUnder.config.direction || 'horizontal';
    const newIndex = getInsertIndex(targetZone, touch.clientX, touch.clientY, direction);

    // Move placeholder to target zone if needed
    if (targetZone !== dragState.currentZone || newIndex !== dragState.currentIndex) {
      const rects = getItemRects(targetZone);

      // Remove placeholder from current zone
      if (dragState.placeholder.parentNode) {
        dragState.placeholder.parentNode.removeChild(dragState.placeholder);
      }

      // Insert in new position
      const visibleChildren = [...targetZone.children].filter(c =>
        !c.hasAttribute('dnd-ghost') && !c.hasAttribute('dnd-placeholder') && c.style.display !== 'none'
      );

      if (newIndex >= visibleChildren.length) {
        targetZone.appendChild(placeholder);
      } else {
        targetZone.insertBefore(placeholder, visibleChildren[newIndex]);
      }

      animateFLIP(rects);

      dragState.currentZone = targetZone;
      dragState.currentIndex = newIndex;
    }
  }
};

const endDrag = () => {
  if (!dragState) return;

  const {
    ghost, placeholder, sourceEl, sourceZone, sourceConfig,
    sourceIndex, item, currentZone, currentIndex
  } = dragState;

  // Snap ghost to placeholder position
  const phRect = placeholder.getBoundingClientRect();
  ghost.style.transition = `all ${SNAP_DURATION}ms ${EASE}`;
  ghost.style.left = `${phRect.left}px`;
  ghost.style.top = `${phRect.top}px`;
  ghost.style.transform = 'scale(1)';
  ghost.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

  setTimeout(() => {
    // Clean up DOM
    ghost.remove();
    placeholder.remove();
    sourceEl.style.display = '';

    const targetConfig = zones.get(currentZone);

    if (currentZone === sourceZone) {
      // Reorder within same zone
      if (currentIndex !== sourceIndex && targetConfig?.onReorder) {
        const items = [...sourceConfig.items()];
        const [moved] = items.splice(sourceIndex, 1);
        items.splice(currentIndex > sourceIndex ? currentIndex - 1 : currentIndex, 0, moved);
        targetConfig.onReorder(items);
      }
    } else if (targetConfig) {
      // Transfer between zones
      if (sourceConfig.onSend) sourceConfig.onSend(item, currentZone);
      if (targetConfig.onReceive) targetConfig.onReceive(item, sourceZone, currentIndex);
    }

    dragState = null;
    activeZone = null;
  }, SNAP_DURATION);
};

const handlePointerDown = (e) => {
  const itemEl = e.target.closest('[dnd-item]:not([dnd-item="false"])');
  if (!itemEl) return;
  const zoneEl = itemEl.closest('[dnd-zone]');
  if (!zoneEl || !zones.has(zoneEl)) return;

  // Long press on mobile, immediate on desktop
  if (e.pointerType === 'touch') {
    const timer = setTimeout(() => {
      startDrag(e, itemEl, zoneEl);
      bindMoveEnd();
    }, 200);

    const cancel = () => {
      clearTimeout(timer);
      document.removeEventListener('pointermove', cancel);
      document.removeEventListener('pointerup', cancel);
    };
    document.addEventListener('pointermove', cancel, { once: true });
    document.addEventListener('pointerup', cancel, { once: true });
  } else {
    e.preventDefault();
    startDrag(e, itemEl, zoneEl);
    bindMoveEnd();
  }
};

const bindMoveEnd = () => {
  document.addEventListener('pointermove', moveDrag);
  document.addEventListener('pointerup', () => {
    endDrag();
    document.removeEventListener('pointermove', moveDrag);
  }, { once: true });
};

// Public API
const dnd = {
  zone(element, config) {
    zones.set(element, config);
    element.setAttribute('dnd-zone', '');
    element.style.touchAction = 'none';

    return () => {
      zones.delete(element);
      element.removeAttribute('dnd-zone');
    };
  },

  init() {
    document.addEventListener('pointerdown', handlePointerDown);
  },

  destroy() {
    document.removeEventListener('pointerdown', handlePointerDown);
    zones.clear();
  }
};

export default dnd;
