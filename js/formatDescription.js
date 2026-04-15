// Normalize authoring-safe HTML-in-text to something Vibe's textContent
// binding can render: <br>/<br /> → \n. The target element needs
// `white-space: pre-line` so the \n renders as a visible line break.
//
// Temporary stopgap until we settle on a real HTML-binding strategy.
export default (text) => (text || '').replace(/<br\s*\/?>/gi, '\n').trim();
