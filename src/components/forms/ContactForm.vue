<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ContactData } from '@/types/lead'

const props = defineProps<{ initialValue?: ContactData | null; loading: boolean; error: string }>()
const emit = defineEmits<{ submit: [data: ContactData] }>()
const accepted = ref(false)
const form = reactive<ContactData>({
  nombre: props.initialValue?.nombre ?? '',
  apellido: props.initialValue?.apellido ?? '',
  email: props.initialValue?.email ?? '',
  telefono: props.initialValue?.telefono ?? '+593 ',
})

function handleSubmit() {
  emit('submit', {
    nombre: form.nombre.trim(),
    apellido: form.apellido.trim(),
    email: form.email.trim().toLowerCase(),
    telefono: form.telefono.replace(/\s+/g, ''),
  })
}
</script>

<template>
  <form class="lead-form" @submit.prevent="handleSubmit">
    <div class="lead-form__row">
      <label><span>Nombre</span><input v-model="form.nombre" name="nombre" autocomplete="given-name" required minlength="2" /></label>
      <label><span>Apellido</span><input v-model="form.apellido" name="apellido" autocomplete="family-name" required minlength="2" /></label>
    </div>
    <label><span>Email</span><input v-model="form.email" name="email" type="email" autocomplete="email" required /></label>
    <label><span>Teléfono</span><input v-model="form.telefono" name="telefono" type="tel" autocomplete="tel" required pattern="\+?[0-9 ]{8,16}" /></label>
    <label class="lead-form__consent">
      <input v-model="accepted" type="checkbox" required />
      <span>Acepto que Disfamosa use estos datos para contactarme sobre mi proyecto.</span>
    </label>
    <p v-if="error" class="lead-form__error" role="alert">{{ error }}</p>
    <button class="button-primary" type="submit" :disabled="loading || !accepted">
      {{ loading ? 'Enviando…' : 'Continuar' }}
    </button>
  </form>
</template>

<style lang="scss" scoped>
.lead-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
}

.lead-form__row {
  display: flex;
  gap: 18px;

  label {
    width: 50%;
  }
}

.lead-form label:not(.lead-form__consent) {
  display: flex;
  flex-direction: column;
  gap: 7px;

  span {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}

.lead-form input:not([type='checkbox']) {
  width: 100%;
  height: 52px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid $border-strong;
  border-radius: 0;
  background: transparent;

  &:focus {
    border-color: $black;
    outline: 0;
  }
}

.lead-form__consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: $text-secondary;
  font-size: 0.75rem;

  input {
    width: 17px;
    height: 17px;
    margin: 3px 0 0;
    accent-color: $black;
  }
}

.lead-form__error {
  padding: 12px;
  border: 1px solid $black;
  background: $gray-100;
  font-size: 0.82rem;
}

.lead-form button {
  align-self: flex-start;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
}

@media (max-width: 560px) {
  .lead-form__row {
    flex-direction: column;
  }

  .lead-form__row label {
    width: 100%;
  }
}
</style>
