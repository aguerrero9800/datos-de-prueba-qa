import { crearCliente } from '../../src/index';
import { generarReportePDF } from '../../src/utilidades/reporte.generador';

async function main(): Promise<void> {
  const cliente = crearCliente('MX', { tipoEntidad: 'persona' });

  console.log(JSON.stringify(cliente, null, 2));

  const rutaPDF = await generarReportePDF(cliente);
  console.log(`\nPDF generado: ${rutaPDF}`);
}

main().catch(console.error);
