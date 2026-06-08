import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'MX' as const;
export const PREFIJO_TELEFONO = '+52';

const NOMBRES = ['Alejandro', 'Valentina', 'Ximena', 'Rodrigo', 'Fernanda', 'José', 'Daniela', 'Miguel'];
const APELLIDOS = ['Hernández', 'García', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez'];
const NOMBRES_EMPRESA = ['Soluciones Empresariales SA de CV', 'Comercializadora del Bajío SA de CV', 'Grupo Industrial del Norte SA', 'Tecnología Avanzada SAPI de CV'];
const CIUDADES = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'];
const CALLES = ['Av. Insurgentes Sur', 'Paseo de la Reforma', 'Av. Revolución', 'Av. Juárez', 'Blvd. Manuel Ávila Camacho'];
const ESTADOS = ['Ciudad de México', 'Jalisco', 'Nuevo León', 'Puebla', 'Baja California'];
const LETRAS_CURP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function letraAleatoria(): string {
  return LETRAS_CURP[enteroAleatorio(0, LETRAS_CURP.length - 1)];
}

// TODO: Implementar generación válida de CURP (18 caracteres con estructura real: nombre, apellidos, fecha, sexo, estado, consonantes)
// TODO: Implementar generación válida de RFC (12 chars empresa, 13 chars persona) con dígito verificador
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  if (tipoEntidad === 'persona') {
    const curp = [
      letraAleatoria(), letraAleatoria(), letraAleatoria(), letraAleatoria(),
      rellenarCeros(enteroAleatorio(60, 99), 2),
      rellenarCeros(enteroAleatorio(1, 12), 2),
      rellenarCeros(enteroAleatorio(1, 28), 2),
      elegir(['H', 'M']),
      letraAleatoria(), letraAleatoria(),
      letraAleatoria(), letraAleatoria(), letraAleatoria(),
      letraAleatoria(), letraAleatoria(), letraAleatoria(),
      String(enteroAleatorio(0, 9)),
      String(enteroAleatorio(0, 9)),
    ].join('');
    return { tipo: 'CURP', numero: curp, pais: CODIGO_PAIS };
  }
  const rfc = [
    letraAleatoria(), letraAleatoria(), letraAleatoria(),
    rellenarCeros(enteroAleatorio(80, 99), 2),
    rellenarCeros(enteroAleatorio(1, 12), 2),
    rellenarCeros(enteroAleatorio(1, 28), 2),
    letraAleatoria(), letraAleatoria(), letraAleatoria(),
  ].join('');
  return { tipo: 'RFC', numero: rfc, pais: CODIGO_PAIS };
}

// TODO: Agregar códigos postales reales por municipio (5 dígitos, ej: 06600 para Cuauhtémoc CDMX)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: String(enteroAleatorio(1, 999)),
    ciudad: elegir(CIUDADES),
    estado: elegir(ESTADOS),
    codigoPostal: rellenarCeros(enteroAleatorio(10000, 99999), 5),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar longitud correcta: móviles tienen 10 dígitos en México
export function generarTelefono(): TelefonoDato {
  const area = elegir(['55', '33', '81', '222', '664']);
  const linea = rellenarCeros(enteroAleatorio(10000000, 99999999), 8);
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
