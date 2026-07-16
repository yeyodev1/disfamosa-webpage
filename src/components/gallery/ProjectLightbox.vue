<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { GalleryImage } from '@/types/gallery'
import ProgressiveImage from '@/components/media/ProgressiveImage.vue'

const props = defineProps<{ images: GalleryImage[]; activeIndex: number }>()
const emit = defineEmits<{ close: []; change: [index: number] }>()

function change(offset: number) {
  const next = (props.activeIndex + offset + props.images.length) % props.images.length
  emit('change', next)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') change(-1)
  if (event.key === 'ArrowRight') change(1)
}

watch(() => props.activeIndex, () => {
  document.querySelector<HTMLElement>('.lightbox__close')?.focus()
})

onMounted(() => {
  document.body.classList.add('modal-open')
  window.addEventListener('keydown', onKeydown)
  document.querySelector<HTMLElement>('.lightbox__close')?.focus()
})

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="lightbox" role="dialog" aria-modal="true" :aria-label="images[activeIndex]?.alt">
    <button class="lightbox__close" type="button" aria-label="Cerrar imagen" @click="emit('close')">Cerrar</button>
    <div class="lightbox__stage">
      <button v-if="images.length > 1" class="lightbox__control lightbox__control--previous" type="button" aria-label="Imagen anterior" @click="change(-1)"><i class="fa-solid fa-arrow-left" aria-hidden="true" /></button>
      <ProgressiveImage
        :src="images[activeIndex]?.secureUrl ?? ''"
        :alt="images[activeIndex]?.alt ?? ''"
        :width="1800"
        sizes="(max-width: 640px) 100vw, 85vw"
        loading="eager"
        priority="high"
        fit="contain"
      />
      <button v-if="images.length > 1" class="lightbox__control lightbox__control--next" type="button" aria-label="Imagen siguiente" @click="change(1)"><i class="fa-solid fa-arrow-right" aria-hidden="true" /></button>
    </div>
    <p>{{ activeIndex + 1 }} / {{ images.length }}</p>
  </div>
</template>

<style lang="scss" scoped>
.lightbox {
  position: fixed;
  z-index: 50;
  inset: 0;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba($black, 0.96);
  color: $white;
}

.lightbox__close {
  position: absolute;
  top: 22px;
  right: 24px;
  padding: 10px;
  background: transparent;
  color: $white;
  cursor: pointer;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lightbox__stage {
  display: flex;
  width: 100%;
  min-height: 0;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  :deep(.progressive-image) {
    width: auto;
    max-width: calc(100% - 140px);
    height: auto;
    max-height: calc(100vh - 120px);
    background: $black;
  }

  :deep(.progressive-image__image) {
    max-height: calc(100vh - 120px);
  }
}

.lightbox__control {
  display: flex;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid $gray-700;
  background: transparent;
  color: $white;
  cursor: pointer;
  font-size: 1.2rem;
}

.lightbox p {
  color: $gray-400;
  font-size: 0.75rem;
}

@media (max-width: 640px) {
  .lightbox {
    padding: 14px;
  }

  .lightbox__stage {
    position: relative;
    justify-content: center;

    :deep(.progressive-image) {
      max-width: 100%;
    }
  }

  .lightbox__control {
    position: absolute;
    z-index: 1;
    bottom: 12px;
    background: rgba($black, 0.75);
  }

  .lightbox__control--previous {
    left: 12px;
  }

  .lightbox__control--next {
    right: 12px;
  }
}
</style>
