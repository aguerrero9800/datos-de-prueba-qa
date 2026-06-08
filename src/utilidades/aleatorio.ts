export function elegir<T>(opciones: T[]): T {
  return opciones[Math.floor(Math.random() * opciones.length)];
}

export function enteroAleatorio(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function rellenarCeros(valor: number, longitud: number): string {
  return String(valor).padStart(longitud, '0');
}

export function sanitizarParaEmail(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function generarId(prefijo = 'CLT'): string {
  return `${prefijo}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}
