import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'CL' as const;
export const PREFIJO_TELEFONO = '+56';

const NOMBRES = ['Camila', 'Sebastián', 'Valentina', 'Matías', 'Javiera', 'Diego', 'Isidora', 'Felipe'];
const APELLIDOS = ['Muñoz', 'Rojas', 'Álvarez', 'Torres', 'Fuentes', 'Vargas', 'Castro', 'Mora'];
const NOMBRES_EMPRESA = ['Soluciones Digitales SpA', 'Comercial Pacífico Ltda', 'Inversiones Andinas SA', 'Servicios del Norte SpA'];
const CIUDADES = ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'];
const CALLES = ['Av. Providencia', 'Av. Apoquindo', 'Av. Libertador Bernardo O\'Higgins', 'Calle Ahumada', 'Av. Vitacura'];
const REGIONES = ['Metropolitana', 'Valparaíso', 'Biobío', 'Coquimbo', 'Antofagasta'];
const AREAS = ['2', '32', '41', '51', '55'];

function calcularDV(num: number): string {
  const s = String(num);
  let suma = 0;
  let factor = 2;
  for (let i = s.length - 1; i >= 0; i--) {
    suma += parseInt(s[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const dv = 11 - (suma % 11);
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return String(dv);
}

function formatearRut(num: number, dv: string): string {
  const s = String(num);
  const grupos: string[] = [];
  for (let i = s.length; i > 0; i -= 3) {
    grupos.unshift(s.slice(Math.max(0, i - 3), i));
  }
  return `${grupos.join('.')}-${dv}`;
}

export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  const [min, max] = tipoEntidad === 'persona' ? [5000000, 25999999] : [60000000, 99999999];
  const num = enteroAleatorio(min, max);
  const dv = calcularDV(num);
  return {
    tipo: 'RUT',
    numero: formatearRut(num, dv),
    pais: CODIGO_PAIS,
  };
}

// TODO: Agregar códigos postales reales (formato chileno: 7 dígitos, ej: 8320000 para Santiago)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(100, 9999)),
    ciudad: elegir(CIUDADES),
    estado: elegir(REGIONES),
    codigoPostal: rellenarCeros(enteroAleatorio(1000000, 9999999), 7),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar que los números de teléfono tengan 9 dígitos (móvil comienza en 9)
export function generarTelefono(): TelefonoDato {
  const esCelular = Math.random() > 0.4;
  const area = esCelular ? '9' : elegir(AREAS);
  const linea = rellenarCeros(enteroAleatorio(10000000, 99999999), 8);
  return {
    prefijoPais: PREFIJO_TELEFONO,
    numero: `${area}${linea}`,
    completo: `${PREFIJO_TELEFONO} ${area} ${linea}`,
  };
}

export function generarNombre(tipoEntidad: TipoEntidad): NombreDato {
  if (tipoEntidad === 'empresa') {
    const rs = elegir(NOMBRES_EMPRESA);
    return { nombre: rs, razonSocial: rs };
  }
  return { nombre: elegir(NOMBRES), apellido: elegir(APELLIDOS) };
}
