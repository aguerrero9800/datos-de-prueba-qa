import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'HN' as const;
export const PREFIJO_TELEFONO = '+504';

const NOMBRES = ['José', 'María', 'Juan', 'Ana', 'Carlos', 'Rosa', 'Luis', 'Elena'];
const APELLIDOS = ['Hernández', 'García', 'Martínez', 'Mejía', 'Reyes', 'Flores', 'Cruz', 'Espinal'];
const NOMBRES_EMPRESA = ['Importadora del Caribe SA', 'Comercial Tegucigalpa SRL', 'Distribuidora Atlántida SA', 'Inversiones del Valle SA'];
const CIUDADES = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choloma', 'El Progreso'];
const CALLES = ['Blvd. Morazán', 'Av. La Paz', 'Calle República', 'Av. Juan Pablo II', 'Blvd. Fuerzas Armadas'];
const DEPARTAMENTOS = ['Francisco Morazán', 'Cortés', 'Atlántida', 'Yoro', 'Olancho'];

// TODO: Implementar estructura real del DNI hondureño (13 dígitos: fecha nacimiento + municipio + número + verificador)
// TODO: Implementar RTN empresarial (14 dígitos con dígito verificador Mod 11)
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  if (tipoEntidad === 'persona') {
    const dni = rellenarCeros(enteroAleatorio(0, 9999999999999), 13);
    return { tipo: 'DNI', numero: dni, pais: CODIGO_PAIS };
  }
  const rtn = rellenarCeros(enteroAleatorio(0, 99999999999999), 14);
  return { tipo: 'RTN', numero: rtn, pais: CODIGO_PAIS };
}

// TODO: Agregar códigos postales reales de Honduras (5 dígitos, ej: 11101 para Tegucigalpa)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(1, 999)),
    ciudad: elegir(CIUDADES),
    estado: elegir(DEPARTAMENTOS),
    codigoPostal: rellenarCeros(enteroAleatorio(11000, 39999), 5),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar formato real: Honduras usa 8 dígitos, móviles comienzan en 9 o 3
export function generarTelefono(): TelefonoDato {
  const prefijo = elegir(['9', '3', '2']);
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
