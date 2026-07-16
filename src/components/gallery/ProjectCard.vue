<script setup lang="ts">
import { ref } from 'vue'
import type { GalleryProject } from '@/types/gallery'
import ProgressiveImage from '@/components/media/ProgressiveImage.vue'
import ProjectLightbox from './ProjectLightbox.vue'

const props = defineProps<{ project: GalleryProject; categoryName: string; index: number }>()
const publishedImages = props.project.images.filter((image) => image.published && image.secureUrl)
const lightboxIndex = ref<number | null>(null)
</script>

<template>
  <article class="project-card">
    <button v-if="publishedImages[0]" class="project-card__image" type="button" @click="lightboxIndex = 0">
      <ProgressiveImage
        :src="publishedImages[0].secureUrl ?? ''"
        :alt="publishedImages[0].alt"
        :width="1100"
        :height="820"
        sizes="(max-width: 820px) 100vw, 58vw"
      />
      <span v-if="publishedImages.length > 1">{{ publishedImages.length }} vistas</span>
    </button>
    <div v-else class="project-card__image project-card__image--empty">
      <span>Imagen en preparación</span>
    </div>
    <div class="project-card__caption">
      <span>{{ String(index + 1).padStart(2, '0') }}</span>
      <h2>{{ categoryName }} {{ project.name }}</h2>
    </div>
    <ProjectLightbox
      v-if="lightboxIndex !== null"
      :images="publishedImages"
      :active-index="lightboxIndex"
      @close="lightboxIndex = null"
      @change="lightboxIndex = $event"
    />
  </article>
</template>

<style lang="scss" scoped>
.project-card {
  display: flex;
  width: calc(50% - 14px);
  flex-direction: column;
  gap: 14px;
}

.project-card:nth-child(4n + 2),
.project-card:nth-child(4n + 3) {
  width: calc(42% - 14px);
}

.project-card:nth-child(4n + 1),
.project-card:nth-child(4n + 4) {
  width: calc(58% - 14px);
}

.project-card__image {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 420px;
  padding: 0;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: $gray-100;
  cursor: zoom-in;

  :deep(.progressive-image) {
    min-height: 420px;
  }

  :deep(.progressive-image__image) {
    width: 100%;
    height: 100%;
    min-height: 420px;
    object-fit: cover;
    transition: transform 450ms ease;
  }

  > span {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 7px 10px;
    background: $black;
    color: $white;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

.project-card__image:hover :deep(.progressive-image__image) {
  transform: scale(1.02);
}

.project-card__image--empty {
  color: $gray-500;
  cursor: default;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-card__caption {
  display: flex;
  align-items: baseline;
  gap: 12px;

  span {
    color: $gray-500;
    font-size: 0.65rem;
  }

  h2 {
    font-family: $font-secondary;
    font-size: 1.65rem;
    font-weight: 400;
  }
}

@media (max-width: 820px) {
  .project-card,
  .project-card:nth-child(n) {
    width: 100%;
  }
}

@media (max-width: 540px) {
  .project-card__image,
  .project-card__image :deep(.progressive-image),
  .project-card__image :deep(.progressive-image__image) {
    min-height: 290px;
  }
}
</style>
