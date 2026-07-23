<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ContactForm from '@/components/forms/ContactForm.vue'
import QualificationForm from '@/components/forms/QualificationForm.vue'
import { getAttribution, useLeadSession } from '@/composables/useLeadSession'
import { submitContact, submitQualification } from '@/services/leadConnector'
import type { ContactData, QualificationData } from '@/types/lead'

type Step = 'contact' | 'qualification' | 'complete'

const { session, setContact, reset, pageDuration } = useLeadSession()
const step = ref<Step>(session.value.contact ? 'qualification' : 'contact')
const loading = ref(false)
const error = ref('')

async function focusHeading() {
  await nextTick()
  document.querySelector<HTMLElement>('.contact-panel__title')?.focus()
}

async function handleContact(contact: ContactData) {
  loading.value = true
  error.value = ''
  try {
    await submitContact(contact, session.value.eventId, getAttribution(), pageDuration())
    setContact(contact)
    step.value = 'qualification'
    await focusHeading()
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'No pudimos enviar tus datos.'
  } finally {
    loading.value = false
  }
}

async function handleQualification(qualification: QualificationData) {
  if (!session.value.contact) {
    step.value = 'contact'
    return
  }

  loading.value = true
  error.value = ''
  try {
    await submitQualification(session.value.contact, qualification, session.value.eventId, getAttribution(), pageDuration())
    step.value = 'complete'
    await focusHeading()
    reset()
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'No pudimos enviar la información.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="contact-view">
    <div class="contact-view__inner page-shell">
      <aside class="contact-intro">
        <p class="eyebrow">Contacto</p>
        <h1 class="section-title">Cuéntanos qué espacio quieres transformar.</h1>
        <p>Déjanos tus datos y algunas respuestas sobre el proyecto. Un asesor revisará la información y se pondrá en contacto contigo.</p>
        <div class="contact-intro__steps" aria-label="Progreso del formulario">
          <span :class="{ active: step === 'contact' }">01 Contacto</span>
          <span :class="{ active: step === 'qualification' }">02 Proyecto</span>
          <span :class="{ active: step === 'complete' }">03 Listo</span>
        </div>
      </aside>

      <section class="contact-panel">
        <template v-if="step === 'contact'">
          <p class="eyebrow">Paso 1 de 2</p>
          <h2 class="contact-panel__title" tabindex="-1">Primero, tus datos.</h2>
          <ContactForm :initial-value="session.contact" :loading="loading" :error="error" @submit="handleContact" />
        </template>

        <template v-else-if="step === 'qualification'">
          <p class="eyebrow">Paso 2 de 2</p>
          <h2 class="contact-panel__title" tabindex="-1">Ahora, el contexto del proyecto.</h2>
          <QualificationForm :loading="loading" :error="error" @submit="handleQualification" @back="step = 'contact'" />
        </template>

        <div v-else class="contact-complete" aria-live="polite">
          <span aria-hidden="true"><i class="fa-solid fa-check" /></span>
          <p class="eyebrow">Información recibida</p>
          <h2 class="contact-panel__title" tabindex="-1">Gracias. En breve se contactará un asesor.</h2>
          <p>Hemos recibido los datos de tu proyecto. Nuestro equipo los revisará antes de comunicarse contigo.</p>
          <RouterLink class="button-primary" to="/proyectos">Ver proyectos</RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-view {
  display: flex;
  min-height: calc(100vh - var(--header-height, 76px));
  padding: 90px 0 120px;
  background: $gray-50;
}

.contact-view__inner {
  align-items: flex-start;
  gap: clamp(50px, 9vw, 140px);
}

.contact-intro {
  position: sticky;
  top: 40px;
  display: flex;
  width: 44%;
  flex-direction: column;
  gap: 24px;

  > p:not(.eyebrow) {
    max-width: 520px;
    color: $text-secondary;
  }
}

.contact-intro__steps {
  display: flex;
  margin-top: 18px;
  gap: 18px;

  span {
    color: $gray-400;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  span.active {
    color: $black;
  }
}

.contact-panel {
  display: flex;
  width: 56%;
  min-height: 620px;
  padding: clamp(28px, 5vw, 64px);
  flex-direction: column;
  gap: 18px;
  background: $white;
  box-shadow: 0 18px 60px rgba($black, 0.06);
}

.contact-panel__title {
  margin-bottom: 24px;
  font-family: $font-secondary;
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 400;
  line-height: 1.05;
  outline: 0;
}

.contact-complete {
  display: flex;
  min-height: 500px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 22px;

  > span {
    display: flex;
    width: 54px;
    height: 54px;
    align-items: center;
    justify-content: center;
    border: 1px solid $black;
    border-radius: 50%;
    font-size: 1.3rem;
  }

  > p:not(.eyebrow) {
    color: $text-secondary;
  }

  .contact-panel__title {
    margin-bottom: 0;
  }
}

@media (max-width: 900px) {
  .contact-view__inner {
    flex-direction: column;
  }

  .contact-intro,
  .contact-panel {
    position: static;
    width: 100%;
  }
}

@media (max-width: 560px) {
  .contact-view {
    padding: 60px 0 80px;
  }

  .contact-intro__steps {
    flex-direction: column;
    gap: 7px;
  }

  .contact-panel {
    min-height: 0;
  }
}
</style>
