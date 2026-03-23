export const createElement = <T extends HTMLElement = HTMLElement>(html: string): T => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  const content = template.content.firstElementChild;

  if (!content) {
    throw new Error('Failed to create element from template');
  }

  return document.importNode(content, true) as T;
};
