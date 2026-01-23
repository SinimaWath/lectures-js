// This module is loaded only after the user clicks the button.
export function createLazyCard() {
  const card = document.createElement('section');
  card.className = 'lazy-card';

  const title = document.createElement('h2');
  title.textContent = 'Dynamically loaded chunk';

  const text = document.createElement('p');
  text.textContent = 'This content lives in a separate JS chunk and is fetched on demand.';

  card.append(title, text);
  return card;
}
