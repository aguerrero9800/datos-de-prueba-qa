import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'GT' as const;
export const PREFIJO_TELEFONO = '+502';

const NOMBRES = ['Luis', 'María', 'Pedro', 'Ana', 'José', 'Claudia', 'Diego', 'Sandra'];
const APELLIDOS = ['López', 'García', 'Rodríguez', 'Pérez', 'Hernández', 'Morales', 'Leiva', 'Juárez'];
const NOMBRES_EMPRESA = ['Exportadora Guatemalteca SA', 'Comercial del Altiplano SA', 'Distribuidora Central SA', 'Inversiones Mayas SA'];
const CIUDADES = ['Ciudad de Guatemala', 'Quetzaltenango', 'Escuintla', 'Mixco', 'Villa Nueva'];
const CALLES = ['Av. Reforma', 'Blvd. Vista Hermosa', 'Calzada Roosevelt', 'Av. Las Américas', 'Ruta Nacional 1'];
const DEPARTAMENTOS = ['Guatemala', 'Quetzaltenango', 'Escuintla', 'Sacatepéquez', 'Chimaltenango'];

// TODO: Implementar estructura real del DPI guatemalteco (13 dígitos con municipio y dígito verificador)
// TODO: Implementar NIT empresarial con dígito verificador Mod 11
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  if (tipoEntidad === 'persona') {
    const dpi = rellenarCeros(enteroAleatorio(0, 9999999999999), 13);
    return { tipo: 'DPI', numero: dpi, pais: CODIGO_PAIS };
  }
  const base = enteroAleatorio(1000000, 99999999);
  const dv = enteroAleatorio(0, 9);
  return { tipo: 'NIT', numero: `${base}-${dv}`, pais: CODIGO_PAIS };
}

// TODO: Agregar códigos postales reales de Guatemala (5 dígitos, ej: 01001 para Ciudad de Guatemala zona 1)
export function generarDireccion(): DireccionDato {
  const zona = enteroAleatorio(1, 25);
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(1, 99)),
    ciudad: elegir(CIUDADES),
    estado: elegir(DEPARTAMENTOS),
    codigoPostal: rellenarCeros(enteroAleatorio(1000, 99999), 5),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar formato real: Guatemala usa 8 dígitos, móviles comienzan en 3, 4, 5 o 6
export function generarTelefono(): TelefonoDato {
  const prefijo = elegir(['3', '4', '5', '6']);
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
