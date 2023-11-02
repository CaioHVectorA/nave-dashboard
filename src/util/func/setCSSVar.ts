export function setCSSVar(key: string, value: string) {
    document.documentElement.style.setProperty(key, value);
  }