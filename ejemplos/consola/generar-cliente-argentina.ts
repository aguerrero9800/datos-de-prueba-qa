import { crearCliente } from '../../src/index';

const cliente = crearCliente('AR', { tipoEntidad: 'persona' });

console.log(JSON.stringify(cliente, null, 2));
