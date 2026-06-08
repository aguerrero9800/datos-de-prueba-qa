# datos-de-prueba-qa

Generador reutilizable de datos de prueba para QA. Soporta 8 países de Latinoamérica.

## Países soportados

`AR` Argentina · `CL` Chile · `MX` México · `HN` Honduras · `GT` Guatemala · `EC` Ecuador · `SV` El Salvador · `CR` Costa Rica

## Instalación

```bash
npm install
npm run compilar
```

## Uso rápido

```typescript
import { crearCliente } from './src/index';

// Persona natural en Argentina
const persona = crearCliente('AR', { tipoEntidad: 'persona' });

// Empresa en Chile
const empresa = crearCliente('CL', { tipoEntidad: 'empresa' });
```

### Ejemplo de salida

```json
{
  "id": "CLT-K7M2X9PQ",
  "tipoEntidad": "persona",
  "nombre": "Carlos",
  "apellido": "García",
  "email": "carlos.garcia42@ejemplo.com",
  "documento": { "tipo": "DNI", "numero": "28456789", "pais": "AR" },
  "direccion": {
    "calle": "Av. Corrientes",
    "numero": "1234",
    "ciudad": "Buenos Aires",
    "estado": "Buenos Aires",
    "codigoPostal": "1043",
    "pais": "AR"
  },
  "telefono": {
    "prefijoPais": "+54",
    "numero": "11-56789012",
    "completo": "+54 11 56789012"
  },
  "pais": "AR"
}
```

## Estructura del proyecto

```
src/
  paises/          # Datos y reglas por país
    argentina/
    chile/
    mexico/
    honduras/
    guatemala/
    ecuador/
    el-salvador/
    costa-rica/
  generadores/     # Orquestación de generación
    cliente.generador.ts
    documento.generador.ts
    direccion.generador.ts
    telefono.generador.ts
  tipos/           # Interfaces y tipos TypeScript
  utilidades/      # Funciones auxiliares (aleatorio)
  index.ts

ejemplos/
  playwright/      # Tests de UI con Playwright
  postman/         # Colección importable en Postman
  salesforce-commerce/  # Integración con SFCC

docs/
  paises-soportados.md   # Tabla de estados de implementación
  uso.md                 # Guía de uso detallada
  reglas-documentos.md   # Reglas reales de documentos por país
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run compilar` | Compila TypeScript a `dist/` |
| `npm run compilar:vigilar` | Compila en modo watch |
| `npm run construir` | Limpia y recompila |
| `npm run ejemplo` | Ejecuta un ejemplo rápido en consola |

## Tipos principales

```typescript
type PaisCodigo = 'AR' | 'CL' | 'MX' | 'HN' | 'GT' | 'EC' | 'SV' | 'CR';
type TipoEntidad = 'persona' | 'empresa';

crearCliente(pais: PaisCodigo, opciones?: { tipoEntidad?: TipoEntidad }): ClienteDato
```

## Estado actual y TODOs

Los datos generados tienen el **formato correcto** por país, pero las reglas de validación reales (dígitos verificadores, algoritmos Mod 11, CURP, etc.) están marcadas como `TODO` en cada archivo de país. Ver [docs/reglas-documentos.md](docs/reglas-documentos.md) para el detalle completo.

Los datos **no son reales** y no deben usarse fuera de entornos de prueba.

## Agregar un nuevo país

1. Crear `src/paises/{codigo-pais}/index.ts` siguiendo la estructura de los existentes
2. Agregar el código al tipo `PaisCodigo` en `src/tipos/pais.tipo.ts`
3. Registrar el nuevo módulo en cada generador dentro de `src/generadores/`
