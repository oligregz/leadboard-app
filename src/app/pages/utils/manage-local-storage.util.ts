const localStorage = globalThis.localStorage;

export function getLocalStorageKeyValuye(key: string): string | null {
  if (!key) {
    console.error('Parâmetro inválido');
  }
  const keyValue = localStorage.getItem(key);

  return keyValue;
}

export function setLocalStorageKeyValue(key: string, value: string): void {
  if (!key || !value) {
    console.error('Parâmetros inválidos');
  }
  localStorage.setItem(key, value);
}

export function removeLocalStorageKeyValuye(key: string): string | null {
  if (!key) {
    console.error('Parâmetro inválido');
  }
  const keyValue = localStorage.getItem(key);

  return keyValue;
}
