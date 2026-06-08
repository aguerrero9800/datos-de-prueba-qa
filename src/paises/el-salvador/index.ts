import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'SV' as const;
export const PREFIJO_TELEFONO = '+503';

const NOMBRES = ['José', 'María', 'Carlos', 'Rosa', 'Juan', 'Ana', 'Luis', 'Elena'];
const APELLIDOS = ['García', 'López', 'Martínez', 'Hernández', 'González', 'Pérez', 'Ramírez', 'Flores'];
const NOMBRES_EMPRESA = ['Importadora Salvadoreña SA de CV', 'Comercial del Pacífico SA', 'Distribuidora Nacional SA de CV', 'Grupo Industrial Centroam SA'];
const CIUDADES = ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango', 'Mejicanos'];
const CALLES = ['Av. Roosevelt', 'Blvd. del Hipódromo', 'Calle Arce', 'Av. España', 'Blvd. Venezuela'];
const DEPARTAMENTOS = ['San Salvador', 'Santa Ana', 'San Miguel', 'La Libertad', 'Sonsonate'];

// TODO: Implementar formato real del DUI salvadoreño (8 dígitos + dígito verificador: XXXXXXXX-X)
// TODO: Implementar NIT empresarial (formato: XXXX-XXXXXX-XXX-X)
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  if (tipoEntidad === 'persona') {
    const base = rellenarCeros(enteroAleatorio(0, 99999999), 8);
    const dv = enteroAleatorio(0, 9);
    return { tipo: 'DUI', numero: `${base}-${dv}`, pais: CODIGO_PAIS };
  }
  const part1 = rellenarCeros(enteroAleatorio(0, 9999), 4);
  const part2 = rellenarCeros(enteroAleatorio(0, 999999), 6);
  const part3 = rellenarCeros(enteroAleatorio(0, 999), 3);
  const dv = enteroAleatorio(0, 9);
  return { tipo: 'NIT', numero: `${part1}-${part2}-${part3}-${dv}`, pais: CODIGO_PAIS };
}

// TODO: Agregar códigos postales reales de El Salvador (4 dígitos, ej: 1101 para San Salvador)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(1, 999)),
    ciudad: elegir(CIUDADES),
    estado: elegir(DEPARTAMENTOS),
    codigoPostal: rellenarCeros(enteroAleatorio(1100, 3199), 4),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar formato real: El Salvador usa 8 dígitos, móviles comienzan en 6, 7 o 2
export function generarTelefono(): TelefonoDato {
  const prefijo = elegir(['6', '7', '2']);
  const linea = rellenarCeros(enteroAleatorio(1000000, 9999999), 7);
  const numero = `${prefijo}${linea}`;
  return {
    prefijoPais: PREFIJO_TELEFONO,
    numero,
    completo: `${PREFIJO_TELEFONO} ${numero}`,
  };
}

export function generarNombre(tipoEntidad: TipoEntidad): NombreDato {
  if (tipoEntidad === 'empresa') {
    const rs = elegir(NOMBRES_EMPRESA);
    return { nombre: rs, razonSocial: rs };
  }
  return { nombre: elegir(NOMBRES), apellido: elegir(APELLIDOS) };
}
