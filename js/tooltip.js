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
