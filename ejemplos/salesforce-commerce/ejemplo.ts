/**
 * Ejemplo de integración con Salesforce Commerce Cloud (SFCC).
 *
 * Patrón de uso: generar un cliente de prueba y mapearlo al esquema
 * de registro de SFCC (CustomerRegistration) antes de enviarlo via OCAPI o SCAPI.
 *
 * TODO: Ajustar los nombres de campos según el esquema real de la org.
 * TODO: Configurar las credenciales de la org en variables de entorno.
 */
import { crearCliente } from '../../src/index';
import type { ClienteDato } from '../../src/index';

interface SfccRegistroCliente {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
  };
  password: string;
  // Atributos custom de la org
  c_documentoTipo?: string;
  c_documentoNumero?: string;
  c_telefonoCompleto?: string;
  c_pais?: string;
  c_tipoEntidad?: string;
}

function mapearARegistroSfcc(cliente: ClienteDato): SfccRegistroCliente {
  return {
    customer: {
      firstName: cliente.nombre,
      lastName: cliente.apellido ?? cliente.razonSocial ?? '',
      email: cliente.email,
      login: cliente.email,
    },
    // TODO: Usar contraseñas seguras reales en el entorno de staging
    password: `Test@${Math.floor(Math.random() * 9000 + 1000)}!`,
    c_documentoTipo: cliente.documento.tipo,
    c_documentoNumero: cliente.documento.numero,
    c_telefonoCompleto: cliente.telefono.completo,
    c_pais: cliente.pais,
    c_tipoEntidad: cliente.tipoEntidad,
  };
}

// Uso de ejemplo
const clienteAR = crearCliente('AR', { tipoEntidad: 'persona' });
const clienteCL = crearCliente('CL', { tipoEntidad: 'empresa' });
const clienteMX = crearCliente('MX', { tipoEntidad: 'persona' });

console.log('=== Cliente Argentina (persona) ===');
console.log(JSON.stringify(mapearARegistroSfcc(clienteAR), null, 2));

console.log('\n=== Cliente Chile (empresa) ===');
console.log(JSON.stringify(mapearARegistroSfcc(clienteCL), null, 2));

console.log('\n=== Cliente México (persona) ===');
console.log(JSON.stringify(mapearARegistroSfcc(clienteMX), null, 2));

export { mapearARegistroSfcc };
