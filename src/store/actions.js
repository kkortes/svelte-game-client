export default {
  setOverlay: ([to], { keyLock, overlay }) => ({ overlay: keyLock ? overlay : to }),
  lockKeys: () => ({ keyLock: true }),
  unlockKeys: () => ({ keyLock: false }),
  notify: ([payload], { notifications }) => {
    const { error, warning, success, information } = payload;

    if (error) notifications.add(JSON.stringify({ type: 'error', message: error }));
    if (warning) notifications.add(JSON.stringify({ type: 'warning', message: warning }));
    if (success) notifications.add(JSON.stringify({ type: 'success', message: success }));
    if (information)
      notifications.add(JSON.stringify({ type: 'information', message: information }));

    return {
      notifications
    };
  },
  removeFirstNotification: (_, { notifications: [_first, ...notifications] }) => ({
    notifications: new Set(notifications)
  }),
  showTooltip: ([tip, direction = 'up', props = {}]) => ({
    tooltip: {
      tip,
      props,
      direction,
      visible: true
    }
  }),
  hideTooltip: (_, { tooltip }) => ({ tooltip: { ...tooltip, visible: false } })
};
