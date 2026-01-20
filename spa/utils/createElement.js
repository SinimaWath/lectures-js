export function createElement(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.firstElementChild;
}
