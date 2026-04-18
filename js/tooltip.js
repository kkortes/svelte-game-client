const tooltip = (node, item) => {
  const mouseEnter = (event) => {
    const rect = node.getBoundingClientRect();

    let targetX = rect.left + rect.width / 2;
    let targetY = rect.top + rect.height / 2;

    if (item?.direction === 'up') targetY = rect.top;
    if (item?.direction === 'down') targetY = rect.top + rect.height;
    if (item?.direction === 'right') targetX = rect.left + rect.width;
    if (item?.direction === 'left') targetX = rect.left;

    const { clientX, clientY } = event;

    $.tooltip = {
      x: clientX,
      y: clientY,
      targetX,
      targetY,
      visible: item?.props?.visible !== undefined ? item.props.visible : true,
      ...item,
      props: { ...item.props }
    };

    document.addEventListener('mousemove', mouseMove);
  };

  const mouseMove = (event) => {
    if (!$.tooltip) return;
    $.tooltip.x = event.clientX;
    $.tooltip.y = event.clientY;
  };

  const mouseLeave = () => {
    if (!$.tooltip) return;
    $.tooltip.visible = false;
  };

  node.addEventListener('mouseenter', mouseEnter);
  node.addEventListener('mouseleave', mouseLeave);

  return {
    destroy: () => {
      node.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mousemove', mouseMove);
      node.removeEventListener('mouseleave', mouseLeave);
    }
  };
};

export { tooltip };

export const equipmentTooltipProps = (item) => ({
  name: item.name,
  level: item.level,
  combatStats: item.combatStats,
  slotsIn: item.slotsIn,
  description: item.description
});

export const abilityTooltipProps = (ability) => ({
  name: ability.name,
  ticks: ability.ticks,
  basic: ability.basic,
  description: ability.description
});

export const delegateTooltip = (container, selector, mapper, anchor) => {
  if (!container) return;

  const onEnter = (e) => {
    if (!e.target?.closest) return;
    const row = e.target.closest(selector);
    if (!row || !container.contains(row)) return;

    const rows = [...container.querySelectorAll(selector)];
    const idx = rows.indexOf(row);
    const props = mapper(row, idx);
    if (!props) return;

    const anchorEl = anchor ? anchor(row) : row;
    const rect = anchorEl.getBoundingClientRect();
    $.tooltip = {
      x: rect.left + rect.width / 2,
      y: rect.top,
      visible: true,
      props
    };
  };

  const onLeave = (e) => {
    if (e.target?.closest?.(selector) && $.tooltip) $.tooltip.visible = false;
  };

  container.addEventListener('mouseenter', onEnter, true);
  container.addEventListener('mouseleave', onLeave, true);
};
