import type { ClienteDato, PaisCodigo, TipoEntidad } from '../tipos';
import { generarDocumento } from './documento.generador';
import { generarDireccion } from './direccion.generador';
import { generarTelefono } from './telefono.generador';
import { sanitizarParaEmail, generarId, enteroAleatorio } from '../utilidades/aleatorio';
import * as Argentina from '../paises/argentina';
import * as Chile from '../paises/chile';
import * as Mexico from '../paises/mexico';
import * as Honduras from '../paises/honduras';
import * as Guatemala from '../paises/guatemala';
import * as Ecuador from '../paises/ecuador';
import * as ElSalvador from '../paises/el-salvador';
import * as CostaRica from '../paises/costa-rica';

export interface OpcionesCliente {
  tipoEntidad?: TipoEntidad;
}

const generadoresNombrePorPais: Record<PaisCodigo, typeof Argentina.generarNombre> = {
  AR: Argentina.generarNombre,
  CL: Chile.generarNombre,
  MX: Mexico.generarNombre,
  HN: Honduras.generarNombre,
  GT: Guatemala.generarNombre,
  EC: Ecuador.generarNombre,
  SV: ElSalvador.generarNombre,
  CR: CostaRica.generarNombre,
};

function generarEmail(
  nombre: string,
  apellido: string | undefined,
  razonSocial: string | undefined,
  tipoEntidad: TipoEntidad,
): string {
  const n = enteroAleatorio(1, 99);
  if (tipoEntidad === 'empresa' && razonSocial) {
    return `contacto@${sanitizarParaEmail(razonSocial)}${n}.ejemplo.com`;
  }
  const nombreSan = sanitizarParaEmail(nombre);
  const apellidoSan = sanitizarParaEmail(apellido ?? '');
  return `${nombreSan}.${apellidoSan}${n}@ejemplo.com`;
}

export function crearCliente(pais: PaisCodigo, opciones?: OpcionesCliente): ClienteDato {
  const tipoEntidad = opciones?.tipoEntidad ?? 'persona';
  const datosNombre = generadoresNombrePorPais[pais](tipoEntidad);

  return {
    id: generarId('CLT'),
    tipoEntidad,
    nombre: datosNombre.nombre,
    apellido: datosNombre.apellido,
    razonSocial: datosNombre.razonSocial,
    email: generarEmail(datosNombre.nombre, datosNombre.apellido, datosNombre.razonSocial, tipoEntidad),
    documento: generarDocumento(pais, tipoEntidad),
    direccion: generarDireccion(pais),
    telefono: generarTelefono(pais),
    pais,
  };
}
