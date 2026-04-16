export const confirmWithDialog = (text, confirm) => {
  $.dialogProps = { text, confirm };
  $.overlay = 'confirm';
};
