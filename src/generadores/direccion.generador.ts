import type { DireccionDato, PaisCodigo } from '../tipos';
import * as Argentina from '../paises/argentina';
import * as Chile from '../paises/chile';
import * as Mexico from '../paises/mexico';
import * as Honduras from '../paises/honduras';
import * as Guatemala from '../paises/guatemala';
import * as Ecuador from '../paises/ecuador';
import * as ElSalvador from '../paises/el-salvador';
import * as CostaRica from '../paises/costa-rica';

const generadoresPorPais: Record<PaisCodigo, () => DireccionDato> = {
  AR: Argentina.generarDireccion,
  CL: Chile.generarDireccion,
  MX: Mexico.generarDireccion,
  HN: Honduras.generarDireccion,
  GT: Guatemala.generarDireccion,
  EC: Ecuador.generarDireccion,
  SV: ElSalvador.generarDireccion,
  CR: CostaRica.generarDireccion,
};

export function generarDireccion(pais: PaisCodigo): DireccionDato {
  return generadoresPorPais[pais]();
}
