export function createElement(template: string): HTMLElement {
  const element = document.createElement("template");
  element.innerHTML = template.trim();
  const firstElementChild = element.content.firstElementChild;
  if (!firstElementChild) {
    throw new Error("Invalid rendering");
  }

  // doument.importNode()
  return firstElementChild as HTMLElement;
}

const lol = 1;
export default lol;
