import type { DocumentoDato, DireccionDato, TelefonoDato, NombreDato } from '../../tipos';
import type { TipoEntidad } from '../../tipos';
import { elegir, enteroAleatorio, rellenarCeros } from '../../utilidades/aleatorio';

export const CODIGO_PAIS = 'EC' as const;
export const PREFIJO_TELEFONO = '+593';

const NOMBRES = ['Sebastián', 'Valeria', 'Andrés', 'Gabriela', 'Fernando', 'Paola', 'Ricardo', 'Natalia'];
const APELLIDOS = ['Cevallos', 'Proaño', 'Andrade', 'Guerrero', 'Salazar', 'Vega', 'Ríos', 'Mora'];
const NOMBRES_EMPRESA = ['Exportadora del Pacífico SA', 'Comercial Quiteña CIA LTDA', 'Distribuidora Andina SA', 'Grupo Empresarial Ecuador SA'];
const CIUDADES = ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala'];
const CALLES = ['Av. Amazonas', 'Av. Patria', 'Av. 12 de Octubre', 'Av. González Suárez', 'Av. 10 de Agosto'];
const PROVINCIAS = ['Pichincha', 'Guayas', 'Azuay', 'Tungurahua', 'El Oro'];

// TODO: Implementar algoritmo real de validación de cédula ecuatoriana (10 dígitos, Módulo 10)
// TODO: Implementar RUC (13 dígitos: cédula + 001) con sus variantes para personas, empresas públicas y privadas
export function generarDocumento(tipoEntidad: TipoEntidad): DocumentoDato {
  const provincia = rellenarCeros(enteroAleatorio(1, 24), 2);
  const tipo = enteroAleatorio(0, 5);
  const secuencia = rellenarCeros(enteroAleatorio(0, 9999999), 7);

  if (tipoEntidad === 'persona') {
    return {
      tipo: 'CÉDULA',
      numero: `${provincia}${tipo}${secuencia}`,
      pais: CODIGO_PAIS,
    };
  }
  const secRuc = rellenarCeros(enteroAleatorio(0, 9999999), 7);
  return {
    tipo: 'RUC',
    numero: `${provincia}${tipo}${secRuc}001`,
    pais: CODIGO_PAIS,
  };
}

// TODO: Agregar códigos postales reales de Ecuador (6 dígitos, ej: 170150 para Quito)
export function generarDireccion(): DireccionDato {
  return {
    calle: elegir(CALLES),
    numero: `N${enteroAleatorio(10, 99)}-${enteroAleatorio(10, 999)}`,
    ciudad: elegir(CIUDADES),
    estado: elegir(PROVINCIAS),
    codigoPostal: rellenarCeros(enteroAleatorio(100000, 999999), 6),
    pais: CODIGO_PAIS,
  };
}

// TODO: Validar formato real: móviles tienen 9 dígitos y comienzan en 09
export function generarTelefono(): TelefonoDato {
  const esCelular = Math.random() > 0.3;
  if (esCelular) {
    const linea = rellenarCeros(enteroAleatorio(10000000, 99999999), 8);
    return {
      prefijoPais: PREFIJO_TELEFONO,
      numero: `09${linea}`,
      completo: `${PREFIJO_TELEFONO} 9${linea}`,
    };
  }
  const area = elegir(['2', '3', '4', '5', '6', '7']);
  const linea = rellenarCeros(enteroAleatorio(1000000, 9999999), 7);
  return {
    prefijoPais: PREFIJO_TELEFONO,
    numero: `0${area}${linea}`,
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
