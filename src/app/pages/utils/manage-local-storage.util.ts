import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  sub: number;
  email: string;
}

const localStorage = globalThis.localStorage;

export function getLocalStorageKeyValue(key: string): string | null {
  if (!key) {
    console.error('Parâmetro inválido');
  }
  const keyValue = localStorage.getItem(key);

  return keyValue;
}

export function setLocalStorageKeyValue(key: string, value: string): void {
  if (!key || !value) {
    console.error('Parâmetros inválidos', {key, value});

  }
  localStorage.setItem(key, value);
}

export function removeLocalStorageKeyValue(key: string): string | null {
  if (!key) {
    console.error('Parâmetro inválido');
  }
  const keyValue = localStorage.getItem(key);

  return keyValue;
}

export function getUserIdFromToken(): number | undefined {
  const token = getLocalStorageKeyValue('access_token');

  if (!token) {
    return undefined;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.sub;
  } catch (error) {
    console.error('Erro ao decodificar o token', error);

    return undefined;
  }
}
