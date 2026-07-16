import {
  budgetOptions,
  challengeOptions,
  optionLabel,
  profileOptions,
  qualifies,
  stageOptions,
} from '@/config/qualification'
import type { AttributionData, ContactData, QualificationData } from '@/types/lead'

const contactWebhook = import.meta.env.VITE_CONTACT_WEBHOOK_URL as string | undefined
const qualificationWebhook = import.meta.env.VITE_QUALIFICATION_WEBHOOK_URL as string | undefined

async function submit(url: string | undefined, payload: Record<string, unknown>): Promise<void> {
  if (!url) throw new Error('El formulario no está configurado. Inténtalo más tarde.')

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error('No pudimos enviar tus datos. Revisa tu conexión e inténtalo otra vez.')
}

function basePayload(contact: ContactData, eventId: string, attribution: AttributionData, pageDuration: string) {
  return {
    ...contact,
    phone: contact.telefono,
    event_id: eventId,
    pageDuration,
    ...attribution,
  }
}

export async function submitContact(
  contact: ContactData,
  eventId: string,
  attribution: AttributionData,
  pageDuration: string,
): Promise<void> {
  const tags = 'funnel-DISFAMOSA, step-1-contacto'
  await submit(contactWebhook, {
    ...basePayload(contact, eventId, attribution, pageDuration),
    paso: '1-contacto',
    etiquetas: tags,
    tags,
  })
}

export async function submitQualification(
  contact: ContactData,
  qualification: QualificationData,
  eventId: string,
  attribution: AttributionData,
  pageDuration: string,
): Promise<void> {
  const isQualified = qualifies(qualification)
  const statusTag = isQualified ? 'califica-DISFAMOSA' : 'no-califica-DISFAMOSA'
  const tags = [
    'funnel-DISFAMOSA',
    'step-2-cualificacion',
    statusTag,
    `perfil-${qualification.perfil}`,
    `etapa-${qualification.etapa}`,
    `presupuesto-${qualification.presupuesto}`,
  ].join(', ')
  const notes = [
    'DISFAMOSA - Cualificacion',
    '--------------------------------',
    `${contact.nombre} ${contact.apellido}`,
    contact.email,
    contact.telefono,
    '--------------------------------',
    `Perfil: ${optionLabel(profileOptions, qualification.perfil)}`,
    `Etapa: ${optionLabel(stageOptions, qualification.etapa)}`,
    `Enfoque: ${optionLabel(budgetOptions, qualification.presupuesto)}`,
    `Reto: ${optionLabel(challengeOptions, qualification.reto)}`,
    '--------------------------------',
    isQualified ? 'CALIFICA' : 'NO CALIFICA',
    `Tiempo total en pagina: ${pageDuration}s`,
  ].join('\n')

  await submit(qualificationWebhook, {
    ...basePayload(contact, eventId, attribution, pageDuration),
    ...qualification,
    paso: '2-cualificacion',
    cualifica: String(isQualified),
    etiquetas: tags,
    tags,
    notas: notes,
    nota: notes,
  })
}
