import { ref } from 'vue'
import type { AttributionData, ContactData, LeadSession } from '@/types/lead'

const SESSION_KEY = 'disfamosa_lead_session'
const ATTRIBUTION_KEY = 'disfamosa_attribution'

function createEventId(): string {
  const random = typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)
  return `lead_${Date.now()}_${random}`
}

function loadSession(): LeadSession {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) return JSON.parse(stored) as LeadSession
  } catch {}

  return { eventId: createEventId(), startedAt: Date.now(), contact: null }
}

const session = ref<LeadSession>(loadSession())

function persist() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session.value))
  } catch {}
}

function readCookie(name: string): string {
  const prefix = `${name}=`
  return document.cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(prefix))?.slice(prefix.length) ?? ''
}

function currentAttribution(): AttributionData {
  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid') ?? ''
  const fbc = readCookie('_fbc') || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : '')

  return {
    fbclid,
    fbc,
    fbp: readCookie('_fbp'),
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_id: params.get('utm_id') ?? '',
  }
}

export function captureAttribution(): AttributionData {
  const current = currentAttribution()
  let stored = {} as Partial<AttributionData>
  try {
    stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? '{}') as Partial<AttributionData>
  } catch {}

  const merged = Object.fromEntries(
    Object.entries(current).map(([key, value]) => [key, value || stored[key as keyof AttributionData] || '']),
  ) as unknown as AttributionData

  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(merged))
  } catch {}
  return merged
}

export function getAttribution(): AttributionData {
  return captureAttribution()
}

export function useLeadSession() {
  function setContact(contact: ContactData) {
    session.value = { ...session.value, contact }
    persist()
  }

  function reset() {
    session.value = { eventId: createEventId(), startedAt: Date.now(), contact: null }
    persist()
  }

  function pageDuration(): string {
    return String(Math.max(0, Math.round((Date.now() - session.value.startedAt) / 1000)))
  }

  persist()
  return { session, setContact, reset, pageDuration }
}
