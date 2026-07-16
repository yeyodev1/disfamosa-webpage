export interface ContactData {
  nombre: string
  apellido: string
  email: string
  telefono: string
}

export interface QualificationData {
  perfil: string
  etapa: string
  presupuesto: string
  reto: string
}

export interface AttributionData {
  fbclid: string
  fbc: string
  fbp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  utm_id: string
}

export interface LeadSession {
  eventId: string
  startedAt: number
  contact: ContactData | null
}
