<script setup lang="ts">
import { reactive } from 'vue'
import { budgetOptions, challengeOptions, profileOptions, stageOptions } from '@/config/qualification'
import type { QualificationData } from '@/types/lead'

defineProps<{ loading: boolean; error: string }>()
const emit = defineEmits<{ submit: [data: QualificationData]; back: [] }>()
const form = reactive<QualificationData>({ perfil: '', etapa: '', presupuesto: '', reto: '' })
</script>

<template>
  <form class="qualification-form" @submit.prevent="emit('submit', { ...form })">
    <fieldset>
      <legend>¿Qué describe mejor tu búsqueda?</legend>
      <label v-for="option in profileOptions" :key="option.value"><input v-model="form.perfil" type="radio" name="perfil" :value="option.value" required /><span>{{ option.label }}</span></label>
    </fieldset>
    <fieldset>
      <legend>¿En qué etapa está el espacio?</legend>
      <label v-for="option in stageOptions" :key="option.value"><input v-model="form.etapa" type="radio" name="etapa" :value="option.value" required /><span>{{ option.label }}</span></label>
    </fieldset>
    <fieldset>
      <legend>¿Cuál es tu enfoque de inversión?</legend>
      <label v-for="option in budgetOptions" :key="option.value"><input v-model="form.presupuesto" type="radio" name="presupuesto" :value="option.value" required /><span>{{ option.label }}</span></label>
    </fieldset>
    <fieldset>
      <legend>¿Cuál es tu principal preocupación?</legend>
      <label v-for="option in challengeOptions" :key="option.value"><input v-model="form.reto" type="radio" name="reto" :value="option.value" required /><span>{{ option.label }}</span></label>
    </fieldset>
    <p v-if="error" class="qualification-form__error" role="alert">{{ error }}</p>
    <div class="qualification-form__actions">
      <button class="button-secondary" type="button" :disabled="loading" @click="emit('back')">Atrás</button>
      <button class="button-primary" type="submit" :disabled="loading">{{ loading ? 'Enviando…' : 'Finalizar' }}</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.qualification-form {
  display: flex;
  flex-direction: column;
  gap: 38px;
}

.qualification-form fieldset {
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  gap: 10px;
  border: 0;
}

.qualification-form legend {
  margin-bottom: 13px;
  font-family: $font-secondary;
  font-size: 1.5rem;
}

.qualification-form label {
  display: flex;
  padding: 14px 16px;
  align-items: center;
  gap: 12px;
  border: 1px solid $border;
  cursor: pointer;
  font-size: 0.86rem;
  transition: border-color 160ms ease, background-color 160ms ease;

  &:has(input:checked) {
    border-color: $black;
    background: $gray-100;
  }

  input {
    accent-color: $black;
  }
}

.qualification-form__error {
  padding: 12px;
  border: 1px solid $black;
  background: $gray-100;
  font-size: 0.82rem;
}

.qualification-form__actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;

  button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
}
</style>
