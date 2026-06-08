# Reglas de documentos por país

Este documento describe las reglas reales de cada tipo de documento y el estado de implementación en el generador.

---

## Argentina

### DNI (Documento Nacional de Identidad)
- **Formato**: 8 dígitos numéricos (ej: `28456789`)
- **Rango válido**: 1.000.000 a 99.999.999 (en la práctica hasta ~48.000.000 actualmente)
- **TODO**: Validar que no comience con cero

### CUIT / CUIL (Código Único de Identificación Tributaria/Laboral)
- **Formato**: `XX-XXXXXXXX-X` (prefijo-número-dígito verificador)
- **Prefijos**: 20 (hombre), 23 (hombre/mujer), 27 (mujer), 30 (empresa), 33 (empresa)
- **TODO**: Implementar algoritmo de dígito verificador con ponderadores `[5,4,3,2,7,6,5,4,3,2]`

---

## Chile

### RUT (Rol Único Tributario)
- **Formato**: `XX.XXX.XXX-X` donde X final puede ser dígito o 'K'
- **Rango personas**: ~5.000.000 a 26.000.000
- **Rango empresas**: ~60.000.000 a 99.000.000
- **TODO**: Implementar algoritmo Módulo 11:
  1. Multiplicar cada dígito por la serie `[2,3,4,5,6,7,2,3,4,5,6,7]` de derecha a izquierda
  2. Sumar productos, calcular `11 - (suma % 11)`
  3. Si resultado es 11 → dígito es 0; si es 10 → dígito es K; si no → ese mismo número

---

## México

### CURP (Clave Única de Registro de Población)
- **Formato**: 18 caracteres alfanuméricos
- **Estructura**: `AAAA-AAMMDD-HSSOOO-CC-N`
  - `AAAA`: iniciales del nombre y apellidos
  - `AAMMDD`: fecha de nacimiento
  - `H/M`: sexo
  - `SS`: clave de estado
  - `OOO`: consonantes internas
  - `CC`: diferenciador
  - `N`: dígito verificador
- **TODO**: Implementar generación con estructura real

### RFC (Registro Federal de Contribuyentes)
- **Formato persona**: 13 caracteres (`AAAA-AAMMDD-HHH`)
- **Formato empresa**: 12 caracteres (`AAA-AAMMDD-HHH`)
- **TODO**: Implementar con reglas de extracción de nombre y homoclave

---

## Honduras

### DNI (Documento Nacional de Identidad)
- **Formato**: 13 dígitos: `DDMMAAXXXSSSSV` (fecha + municipio + secuencia + verificador)
- **TODO**: Implementar con codificación de municipios hondureños

### RTN (Registro Tributario Nacional)
- **Formato**: 14 dígitos con dígito verificador Módulo 11
- **TODO**: Implementar algoritmo verificador

---

## Guatemala

### DPI (Documento Personal de Identificación)
- **Formato**: 13 dígitos: municipio (4) + año nacimiento (2) + correlativo (6) + verificador (1)
- **TODO**: Implementar con codificación de municipios guatemaltecos

### NIT (Número de Identificación Tributaria)
- **Formato**: `XXXXXXXX-X` (hasta 8 dígitos + dígito verificador)
- **TODO**: Implementar algoritmo de dígito verificador Módulo 11

---

## Ecuador

### Cédula de ciudadanía
- **Formato**: 10 dígitos
- **Estructura**: `PP-T-SSSSSSS-V`
  - `PP`: código de provincia (01-24)
  - `T`: tipo de identificación (0-5 personas naturales, 6 sociedad pública, 9 sociedad privada)
  - `SSSSSSS`: número de secuencia
  - `V`: dígito verificador
- **TODO**: Implementar algoritmo Módulo 10 con ponderadores `[2,1,2,1,2,1,2,1,2]`

### RUC (Registro Único de Contribuyentes)
- **Formato**: cédula + `001` (13 dígitos total para personas naturales)
- **TODO**: Implementar variantes para personas jurídicas privadas y entidades públicas

---

## El Salvador

### DUI (Documento Único de Identidad)
- **Formato**: `XXXXXXXX-X` (8 dígitos + dígito verificador)
- **TODO**: Implementar algoritmo de dígito verificador

### NIT (Número de Identificación Tributaria)
- **Formato empresa**: `XXXX-XXXXXX-XXX-X`
- **TODO**: Implementar con estructura real

---

## Costa Rica

### Cédula de identidad
- **Formato**: `X-XXXX-XXXX` (provincia + tomo + asiento)
- **Provincias**: 1=San José, 2=Alajuela, 3=Cartago, 4=Heredia, 5=Guanacaste, 6=Puntarenas, 7=Limón
- **TODO**: Implementar estructura real con rangos válidos por provincia

### Cédula jurídica
- **Formato**: `X-XXX-XXXXXX`
- **Tipos**: 3=SA, 4=SRL/LTDA, 5=Asociación, 8=Fideicomiso, etc.
- **TODO**: Implementar por tipo de sociedad
