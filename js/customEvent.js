export default (event, detail) =>
  document.dispatchEvent(new CustomEvent(event, { detail }));
