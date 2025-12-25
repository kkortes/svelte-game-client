export default (event: string, detail: any) =>
  document.dispatchEvent(
    new CustomEvent(event, {
      detail
    })
  );
