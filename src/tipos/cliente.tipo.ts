import type { PaisCodigo } from './pais.tipo';
import type { TipoEntidad } from './entidad.tipo';

export interface DocumentoDato {
  tipo: string;
  numero: string;
  pais: PaisCodigo;
}

export interface DireccionDato {
  calle: string;
  numero: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: PaisCodigo;
}

export interface TelefonoDato {
  prefijoPais: string;
  numero: string;
  completo: string;
}

export interface NombreDato {
  nombre: string;
  apellido?: string;
  razonSocial?: string;
}

export interface ClienteDato {
  id: string;
  tipoEntidad: TipoEntidad;
  nombre: string;
  apellido?: string;
  razonSocial?: string;
  email: string;
  documento: DocumentoDato;
  direccion: DireccionDato;
  telefono: TelefonoDato;
  pais: PaisCodigo;
}
