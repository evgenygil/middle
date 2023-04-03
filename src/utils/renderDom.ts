import BaseBlock from "./BaseBlock";

export function renderDOM(rootSelector: string, component: BaseBlock) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error("Root element not found!");
  }

  component.dispatchComponentDidMount();

  root.innerHTML = "";

  root.append(component.getContent());
}