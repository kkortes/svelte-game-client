export const disableGameKeyboard = () => {
  $.gameKeyboardDisabled = true;
};

export const enableGameKeyboard = () => {
  $.gameKeyboardDisabled = false;
};

export const notify = (payload) => {
  const { error, warning, success, info } = payload;
  const message = error || warning || success || info;

  if (!$.notifications) return true;
  if ($.notifications.find(n => n.message === message)) {
    return true;
  }

  const type = error ? 'error' : warning ? 'warning' : success ? 'success' : 'info';
  $.notifications.push({ type, message });

  // Auto-dismiss after 3s
  setTimeout(() => {
    removeFirstNotification();
  }, 3000);

  return true;
};

export const removeFirstNotification = () => {
  if (!$.notifications || $.notifications.length === 0) return true;
  $.notifications = JSON.parse(JSON.stringify($.notifications)).slice(1);
  return true;
};
