import type { TelefonoDato, PaisCodigo } from '../tipos';
import * as Argentina from '../paises/argentina';
import * as Chile from '../paises/chile';
import * as Mexico from '../paises/mexico';
import * as Honduras from '../paises/honduras';
import * as Guatemala from '../paises/guatemala';
import * as Ecuador from '../paises/ecuador';
import * as ElSalvador from '../paises/el-salvador';
import * as CostaRica from '../paises/costa-rica';

const generadoresPorPais: Record<PaisCodigo, () => TelefonoDato> = {
  AR: Argentina.generarTelefono,
  CL: Chile.generarTelefono,
  MX: Mexico.generarTelefono,
  HN: Honduras.generarTelefono,
  GT: Guatemala.generarTelefono,
  EC: Ecuador.generarTelefono,
  SV: ElSalvador.generarTelefono,
  CR: CostaRica.generarTelefono,
};

export function generarTelefono(pais: PaisCodigo): TelefonoDato {
  return generadoresPorPais[pais]();
}
