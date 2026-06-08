import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import type { ClienteDato } from '../tipos';
import { NOMBRE_PAIS } from '../tipos';

function nombreArchivoDesdeCliente(cliente: ClienteDato): string {
  const pais = NOMBRE_PAIS[cliente.pais]
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-');
  return `cliente-${pais}-${cliente.tipoEntidad}.pdf`;
}

export function generarReportePDF(
  cliente: ClienteDato,
  carpetaDestino = 'reportes',
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }

    const rutaCompleta = path.resolve(carpetaDestino, nombreArchivoDesdeCliente(cliente));
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(rutaCompleta);

    stream.on('finish', () => resolve(rutaCompleta));
    stream.on('error', reject);
    doc.pipe(stream);

    doc.fontSize(18).font('Helvetica-Bold').text('Dato de Prueba QA', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).font('Helvetica');
    doc.text(`Pais: ${NOMBRE_PAIS[cliente.pais]} (${cliente.pais})`);
    doc.text(`Tipo de entidad: ${cliente.tipoEntidad}`);
    doc.text(`Fecha de generacion: ${new Date().toLocaleString('es-MX')}`);
    doc.moveDown();

    doc.font('Helvetica-Bold').text('Datos generados:');
    doc.moveDown(0.5);
    doc.fontSize(9).font('Courier').text(JSON.stringify(cliente, null, 2));

    doc.end();
  });
}
