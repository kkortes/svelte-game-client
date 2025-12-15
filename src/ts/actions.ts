import app from '@/app.svelte';

export const disableGameKeyboard = () => {
  app.gameKeyboardDisabled = true;
};
export const enableGameKeyboard = () => {
  app.gameKeyboardDisabled = false;
};
export const notify = (payload: any) => {
  const { error, warning, success, info } = payload;

  const message = error || warning || success || info;

  if (app.notifications.find((string) => string.includes(message))) {
    return true;
  }

  if (error) app.notifications.push(JSON.stringify({ type: 'error', message }));
  if (warning) app.notifications.push(JSON.stringify({ type: 'warning', message }));
  if (success) app.notifications.push(JSON.stringify({ type: 'success', message }));
  if (info) app.notifications.push(JSON.stringify({ type: 'info', message }));

  return true;
};
export const removeFirstNotification = () => {
  const [_first, ...rest] = app.notifications;
  app.notifications = [...rest];

  return true;
};
