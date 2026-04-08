export const init = () => {
  document.addEventListener('keydown', (e) => {
    const code = e.code.toLowerCase();
    if (code in $.keys) {
      $.keys[code] = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    const code = e.code.toLowerCase();
    if (code in $.keys) {
      $.keys[code] = false;
    }
  });
};
