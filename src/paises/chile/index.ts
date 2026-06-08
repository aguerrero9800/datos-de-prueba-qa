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

function formatearRut(num: number, dv: string): string {
  const s = String(num);
  const grupos: string[] = [];
  for (let i = s.length; i > 0; i -= 3) {
    grupos.unshift(s.slice(Math.max(0, i - 3), i));
  }
  return `${grupos.join('.')}-${dv}`;
}

// TODO: Reemplazar dígito verificador con el algoritmo Módulo 11 real
// TODO: Usar rangos de RUT vigentes (personas: 5.000.000 a 26.000.000, empresas: 60.000.000 a 99.999.999)
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  const [min, max] = tipoEntidad === 'persona' ? [5000000, 25999999] : [60000000, 99999999];
  const num = enteroAleatorio(min, max);
  const dv = elegir(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'K']);
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
