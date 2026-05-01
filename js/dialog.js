export const confirmWithDialog = (text, confirm) => {
  $.overlay = { name: 'confirm', text, confirm };
};
