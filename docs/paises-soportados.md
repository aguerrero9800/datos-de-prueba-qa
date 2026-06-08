# Países Soportados

| Código | País | Documento Persona | Documento Empresa | Prefijo Tel. |
|--------|------|-------------------|-------------------|--------------|
| AR | Argentina | DNI (8 dígitos) | CUIT (XX-XXXXXXXX-X) | +54 |
| CL | Chile | RUT (XX.XXX.XXX-X) | RUT empresa | +56 |
| MX | México | CURP (18 chars) | RFC (12 chars) | +52 |
| HN | Honduras | DNI (13 dígitos) | RTN (14 dígitos) | +504 |
| GT | Guatemala | DPI (13 dígitos) | NIT (XXXXXXXX-X) | +502 |
| EC | Ecuador | Cédula (10 dígitos) | RUC (13 dígitos) | +593 |
| SV | El Salvador | DUI (XXXXXXXX-X) | NIT (XXXX-XXXXXX-XXX-X) | +503 |
| CR | Costa Rica | Cédula (X-XXXX-XXXX) | Cédula Jurídica (X-XXX-XXXXXX) | +506 |

## Estado de implementación

| País | Formato doc. | Validación real | Cód. postales reales | Áreas tel. reales |
|------|:---:|:---:|:---:|:---:|
| AR | ✅ | ❌ TODO | ❌ TODO | ❌ TODO |
| CL | ✅ | ❌ TODO (Mod 11) | ❌ TODO | ❌ TODO |
| MX | ✅ | ❌ TODO | ❌ TODO | ❌ TODO |
| HN | ✅ | ❌ TODO | ❌ TODO | ❌ TODO |
| GT | ✅ | ❌ TODO | ❌ TODO | ❌ TODO |
| EC | ✅ | ❌ TODO (Mod 10) | ❌ TODO | ❌ TODO |
| SV | ✅ | ❌ TODO | ❌ TODO | ❌ TODO |
| CR | ✅ | ❌ TODO | ❌ TODO | ❌ TODO |

> ✅ = implementado · ❌ TODO = pendiente

## Notas de implementación futura

- **Argentina**: El CUIT requiere dígito verificador con algoritmo ponderado específico.
- **Chile**: El RUT requiere algoritmo Módulo 11 para calcular el dígito verificador (puede dar 'K').
- **México**: CURP y RFC tienen estructura que incluye nombre, fecha de nacimiento y estado.
- **Ecuador**: La cédula tiene validación Módulo 10 con ponderadores específicos.
- **Costa Rica**: La cédula física incluye provincia, cantón, consecutivo y verificador.
