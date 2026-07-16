<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cloudinaryImageUrl, cloudinarySrcset } from '@/services/cloudinaryImage'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  loading?: 'eager' | 'lazy'
  fit?: 'cover' | 'contain'
  priority?: 'high' | 'low' | 'auto'
}>(), {
  width: 960,
  height: undefined,
  sizes: '100vw',
  loading: 'lazy',
  fit: 'cover',
  priority: 'auto',
})

const loaded = ref(false)
const failed = ref(false)
const optimizedSrc = computed(() => cloudinaryImageUrl(props.src, {
  width: props.width,
  height: props.height,
  crop: props.fit === 'contain' ? 'limit' : 'fill',
  quality: props.loading === 'eager' ? 'auto:good' : 'auto:eco',
}))
const srcset = computed(() => cloudinarySrcset(
  props.src,
  [480, 720, 960, 1280, 1600].filter((width) => width <= Math.max(props.width * 2, 960)),
  { crop: props.fit === 'contain' ? 'limit' : 'fill', quality: props.loading === 'eager' ? 'auto:good' : 'auto:eco' },
))

watch(() => props.src, () => {
  loaded.value = false
  failed.value = false
})
</script>

<template>
  <span
    class="progressive-image"
    :class="{
      'progressive-image--loaded': loaded,
      'progressive-image--failed': failed,
      'progressive-image--contain': fit === 'contain',
    }"
  >
    <span class="progressive-image__skeleton" aria-hidden="true">
      <span>Disfamosa</span>
    </span>
    <img
      class="progressive-image__image"
      :src="optimizedSrc"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :loading="loading"
      :fetchpriority="priority"
      decoding="async"
      @load="loaded = true"
      @error="failed = true"
    />
  </span>
</template>

<style lang="scss" scoped>
.progressive-image {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: inherit;
  overflow: hidden;
  flex: 1;
  align-self: stretch;
  background: $gray-100;
}

.progressive-image__skeleton {
  position: absolute;
  z-index: 0;
  inset: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: $gray-100;
  color: $gray-300;
  transition: opacity 350ms ease;

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 25%, rgba($white, 0.75) 48%, transparent 72%);
    content: '';
    transform: translateX(-100%);
    animation: image-shimmer 1.4s ease-in-out infinite;
  }

  span {
    font-family: $font-secondary;
    font-size: clamp(1.4rem, 3vw, 2.8rem);
    letter-spacing: -0.04em;
  }
}

.progressive-image__image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: inherit;
  opacity: 0;
  object-fit: cover;
  transform: scale(1.025);
  transition: opacity 500ms ease, transform 850ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.progressive-image--contain .progressive-image__image {
  object-fit: contain;
}

.progressive-image--loaded .progressive-image__image {
  opacity: 1;
  transform: scale(1);
}

.progressive-image--loaded .progressive-image__skeleton {
  opacity: 0;
  pointer-events: none;
}

.progressive-image--failed .progressive-image__skeleton::after {
  animation: none;
}

@keyframes image-shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
