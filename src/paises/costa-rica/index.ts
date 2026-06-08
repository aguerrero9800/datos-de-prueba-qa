import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'CR' as const;
export const PREFIJO_TELEFONO = '+506';

const NOMBRES = ['Daniela', 'Andrés', 'Valentina', 'Sebastián', 'Natalia', 'Diego', 'Sofía', 'Pablo'];
const APELLIDOS = ['Quesada', 'Vargas', 'Rodríguez', 'Jiménez', 'Mora', 'Rojas', 'Solís', 'Brenes'];
const NOMBRES_EMPRESA = ['Tecnología Costarricense SA', 'Comercial del Trópico SA', 'Distribuidora Central SA', 'Inversiones Ticas SRL'];
const CIUDADES = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia'];
const CALLES = ['Av. Central', 'Paseo Colón', 'Av. Segunda', 'Calle Blancos', 'Av. Escazú'];
const PROVINCIAS = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste'];

function formatearCedula(tipo: number, numero: number): string {
  return `${tipo}-${rellenarCeros(Math.floor(numero / 10000), 4)}-${rellenarCeros(numero % 10000, 4)}`;
}

// TODO: Implementar estructura real de cédula costarricense (1-XXXX-XXXX para personas)
// TODO: Implementar cédula jurídica real (X-XXX-XXXXXX) con dígito verificador
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  if (tipoEntidad === 'persona') {
    const tipo = enteroAleatorio(1, 9);
    const num = enteroAleatorio(10000000, 99999999);
    return {
      tipo: 'CÉDULA',
      numero: formatearCedula(tipo, num),
      pais: CODIGO_PAIS,
    };
  }
  const tipoJur = enteroAleatorio(3, 3);
  const serie = rellenarCeros(enteroAleatorio(100, 999), 3);
  const num = rellenarCeros(enteroAleatorio(100000, 999999), 6);
  return {
    tipo: 'CÉDULA JURÍDICA',
    numero: `${tipoJur}-${serie}-${num}`,
    pais: CODIGO_PAIS,
  };
}

// TODO: Agregar códigos postales reales de Costa Rica (5 dígitos, ej: 10101 para San José Centro)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(1, 999)),
    ciudad: elegir(CIUDADES),
    estado: elegir(PROVINCIAS),
    codigoPostal: rellenarCeros(enteroAleatorio(10100, 69999), 5),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar formato real: Costa Rica usa 8 dígitos, móviles comienzan en 6 o 7, fijos en 2
export function generarTelefono(): TelefonoDato {
  const prefijo = elegir(['6', '7', '8', '2']);
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
