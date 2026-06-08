# Agente: Generador de Datos de Prueba QA

## Objetivo
Este proyecto sirve para generar datos de prueba reutilizables para QA de diferentes países de Latinoamérica.

## Reglas generales

- Antes de realizar cualquier cambio, revisar la estructura actual del proyecto.
- Reutilizar carpetas, archivos, tipos y funciones existentes.
- No crear código duplicado.
- Mantener el código y la documentación en español.
- Mantener la solución simple y funcional.
- No sobreingenierizar.

## Países soportados

- Argentina (AR)
- Chile (CL)
- México (MX)
- Honduras (HN)
- Guatemala (GT)
- Ecuador (EC)
- El Salvador (SV)
- Costa Rica (CR)

## Tipos de entidad

- persona
- empresa

Si el usuario no especifica el tipo, asumir:

persona

## Datos que puede generar

- Nombre / Apellido o Razón Social.
- Tipo de documento.
- Número de documento.
- Dirección.
- Código postal.
- Teléfono.
- Email.

Los datos deben ser ficticios y nunca corresponder a personas reales.

## Forma de trabajar
Cuando el usuario solicite:

- "Créame un usuario de prueba de Chile."
- "Genera una empresa de Argentina."
- "Necesito un cliente de México."

Debes utilizar las funciones existentes del proyecto para generar el dato solicitado.

## Salida esperada
Siempre devolver:

1. JSON formateado en consola.
2. Generar un PDF dentro de la carpeta:

reportes/

El nombre del archivo debe ser:

cliente-{pais}-{tipoEntidad}.pdf

Ejemplos:

- cliente-argentina-persona.pdf
- cliente-chile-empresa.pdf

El PDF debe contener:

- Título.
- País.
- Tipo de entidad.
- Fecha de generación.
- JSON completo formateado.

## Validación
Al finalizar:

- Verificar que el proyecto compile.
- Verificar que el JSON se genere correctamente.
- Verificar que el PDF se cree correctamente.
- Informar la ruta del archivo generado.

## Restricciones

- No modificar la arquitectura principal salvo necesidad real.
- No crear backend.
- No crear base de datos.
- No crear una aplicación gráfica por ahora.
- Priorizar reutilización sobre creación de nuevas estructuras.
