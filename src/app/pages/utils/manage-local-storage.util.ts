export function getLocalStorageKeyValuye(key: string): String | null {
  if (!key) console.error('Parâmetro inválido');
  const keyValue = localStorage.getItem(key);
  return keyValue;
}

export function setLocalStorageKeyValue(key: string, value: string): void {
  if (!key || !value) console.error('Parâmetros inválidos');
  localStorage.setItem(key, value);
}
