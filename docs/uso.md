# Guía de uso

## Instalación

```bash
npm install
npm run compilar
```

## Uso básico

```typescript
import { crearCliente } from 'datos-de-prueba-qa';

// Persona natural en Argentina
const persona = crearCliente('AR', { tipoEntidad: 'persona' });

// Empresa en Chile
const empresa = crearCliente('CL', { tipoEntidad: 'empresa' });

// Sin opciones: por defecto genera persona
const cliente = crearCliente('MX');
```

## Estructura del objeto ClienteDato

```typescript
{
  id: "CLT-K7M2X9PQ",
  tipoEntidad: "persona",
  nombre: "Carlos",
  apellido: "García",
  razonSocial: undefined,         // solo en empresa
  email: "carlos.garcia42@ejemplo.com",
  documento: {
    tipo: "DNI",
    numero: "28456789",
    pais: "AR"
  },
  direccion: {
    calle: "Av. Corrientes",
    numero: "1234",
    ciudad: "Buenos Aires",
    estado: "Buenos Aires",
    codigoPostal: "1043",
    pais: "AR"
  },
  telefono: {
    prefijoPais: "+54",
    numero: "11-56789012",
    completo: "+54 11 56789012"
  },
  pais: "AR"
}
```

## Países y entidades disponibles

```typescript
import { PAISES_SOPORTADOS, NOMBRE_PAIS } from 'datos-de-prueba-qa';

console.log(PAISES_SOPORTADOS);
// ['AR', 'CL', 'MX', 'HN', 'GT', 'EC', 'SV', 'CR']

console.log(NOMBRE_PAIS['AR']);
// 'Argentina'
```

## Uso en Playwright

Ver `ejemplos/playwright/ejemplo.spec.ts`.

## Uso en Postman

Ver `ejemplos/postman/coleccion.json` — importar como colección en Postman.

## Uso en Salesforce Commerce

Ver `ejemplos/salesforce-commerce/ejemplo.ts`.

## Compilar y publicar como paquete

```bash
npm run construir
# El paquete compilado queda en dist/
```
