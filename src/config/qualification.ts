import type { QualificationData } from '@/types/lead'

export const profileOptions = [
  { value: 'listo', label: 'Quiero avanzar con el diseño y la fabricación' },
  { value: 'comparando', label: 'Estoy comparando opciones y proveedores' },
  { value: 'curioso', label: 'Solo busco precios económicos o gangas' },
]

export const stageOptions = [
  { value: 'planos', label: 'En planos o diseño arquitectónico' },
  { value: 'construccion', label: 'En construcción' },
  { value: 'remodelacion', label: 'En remodelación' },
  { value: 'listo', label: 'El espacio está listo para intervenir' },
]

export const budgetOptions = [
  { value: 'calidad', label: 'Busco calidad y precisión, con presupuesto' },
  { value: 'equilibrio', label: 'Busco equilibrio entre inversión y acabado' },
  { value: 'economico', label: 'Mi prioridad es conseguir el precio más bajo' },
]

export const challengeOptions = [
  { value: 'incumplimiento', label: 'Me preocupa que no cumplan tiempos o acuerdos' },
  { value: 'calidad', label: 'Me preocupa la calidad de materiales y acabados' },
  { value: 'diseno', label: 'Necesito ayuda para aprovechar mejor el espacio' },
  { value: 'primera-vez', label: 'Es mi primer proyecto de mobiliario a medida' },
]

export function qualifies(data: QualificationData): boolean {
  return data.perfil !== 'curioso' && data.presupuesto !== 'economico'
}

export function optionLabel(options: Array<{ value: string; label: string }>, value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}
