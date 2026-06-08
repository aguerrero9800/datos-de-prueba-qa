export type PaisCodigo = 'AR' | 'CL' | 'MX' | 'HN' | 'GT' | 'EC' | 'SV' | 'CR';

export const PAISES_SOPORTADOS: PaisCodigo[] = ['AR', 'CL', 'MX', 'HN', 'GT', 'EC', 'SV', 'CR'];

export const NOMBRE_PAIS: Record<PaisCodigo, string> = {
  AR: 'Argentina',
  CL: 'Chile',
  MX: 'México',
  HN: 'Honduras',
  GT: 'Guatemala',
  EC: 'Ecuador',
  SV: 'El Salvador',
  CR: 'Costa Rica',
};
