import hasWindow from "./hasWindow";

export function setCSSVar(key: string, value: string) {
  if (hasWindow()) document.documentElement.style.setProperty(key, value);
  }