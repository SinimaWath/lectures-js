// Small helper to keep DOM creation readable in the demo.
export function createButton(className, label) {
  const button = document.createElement('button');
  button.className = className;
  button.type = 'button';
  button.textContent = label;

  return button;
}
