import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'AR' as const;
export const PREFIJO_TELEFONO = '+54';

const NOMBRES = ['Carlos', 'María', 'Juan', 'Ana', 'Luis', 'Laura', 'Pedro', 'Sofía', 'Diego', 'Valentina'];
const APELLIDOS = ['García', 'López', 'Martínez', 'González', 'Pérez', 'Rodríguez', 'Fernández', 'Torres'];
const NOMBRES_EMPRESA = ['Tech Solutions SA', 'Comercial del Sur SRL', 'Distribuidora Patagónica', 'Grupo Andino SA'];
const CIUDADES = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán'];
const CALLES = ['Av. Corrientes', 'Av. Santa Fe', 'Calle Florida', 'Av. Belgrano', 'San Martín'];
const PROVINCIAS = ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán'];
const AREAS = ['11', '351', '341', '261', '381'];

// TODO: Implementar algoritmo de verificación del CUIT/CUIL (dígito verificador Mod 11)
// TODO: Validar que el DNI tenga exactamente 8 dígitos y no comience en 0
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  if (tipoEntidad === 'persona') {
    return {
      tipo: 'DNI',
      numero: String(enteroAleatorio(10000000, 49999999)),
      pais: CODIGO_PAIS,
    };
  }
  const base = enteroAleatorio(10000000, 49999999);
  return {
    tipo: 'CUIT',
    numero: `30-${base}-${enteroAleatorio(1, 9)}`,
    pais: CODIGO_PAIS,
  };
}

// TODO: Agregar códigos postales reales por ciudad (formato argentino: 4 dígitos o alfanumérico C1234ABC)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(100, 9999)),
    ciudad: elegir(CIUDADES),
    estado: elegir(PROVINCIAS),
    codigoPostal: rellenarCeros(enteroAleatorio(1000, 9999), 4),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar prefijos de área reales de Argentina (ej: 11 para CABA, 351 para Córdoba)
export function generarTelefono(): TelefonoDato {
  const area = elegir(AREAS);
  const linea = rellenarCeros(enteroAleatorio(40000000, 99999999), 8);
  return {
    prefijoPais: PREFIJO_TELEFONO,
    numero: `${area}-${linea}`,
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
