import type { DocumentoDato, PaisCodigo, TipoEntidad } from '../tipos';
import * as Argentina from '../paises/argentina';
import * as Chile from '../paises/chile';
import * as Mexico from '../paises/mexico';
import * as Honduras from '../paises/honduras';
import * as Guatemala from '../paises/guatemala';
import * as Ecuador from '../paises/ecuador';
import * as ElSalvador from '../paises/el-salvador';
import * as CostaRica from '../paises/costa-rica';

const generadoresPorPais: Record<PaisCodigo, (tipoEntidad: TipoEntidad) => DocumentoDato> = {
  AR: Argentina.generarDocumento,
  CL: Chile.generarDocumento,
  MX: Mexico.generarDocumento,
  HN: Honduras.generarDocumento,
  GT: Guatemala.generarDocumento,
  EC: Ecuador.generarDocumento,
  SV: ElSalvador.generarDocumento,
  CR: CostaRica.generarDocumento,
};

export function generarDocumento(pais: PaisCodigo, tipoEntidad: TipoEntidad): DocumentoDato {
  return generadoresPorPais[pais](tipoEntidad);
}
