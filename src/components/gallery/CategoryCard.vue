<script setup lang="ts">
import { getCategoryCover } from '@/config/gallery'
import type { CategoryPresentation } from '@/types/gallery'
import ProgressiveImage from '@/components/media/ProgressiveImage.vue'

const props = defineProps<{ category: CategoryPresentation; index: number }>()
const cover = getCategoryCover(props.category.id)
</script>

<template>
  <RouterLink class="category-card" :to="category.route">
    <div class="category-card__media">
      <ProgressiveImage
        v-if="cover?.secureUrl"
        :src="cover.secureUrl"
        :alt="cover.alt"
        :width="960"
        :height="720"
        sizes="(max-width: 820px) 100vw, 50vw"
      />
      <span v-else class="category-card__placeholder">0{{ index + 1 }}</span>
    </div>
    <div class="category-card__copy">
      <span class="category-card__number">0{{ index + 1 }}</span>
      <div>
        <h2>{{ category.name }}</h2>
        <p>{{ category.description }}</p>
      </div>
      <span class="category-card__arrow" aria-hidden="true"><i class="fa-solid fa-arrow-up-right-from-square" /></span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.category-card {
  display: flex;
  width: calc(50% - 12px);
  flex-direction: column;
  gap: 18px;
}

.category-card__media {
  position: relative;
  display: flex;
  min-height: 430px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background: $gray-100;

  :deep(.progressive-image) {
    min-height: 430px;
  }

  :deep(.progressive-image__image) {
    width: 100%;
    height: 100%;
    min-height: 430px;
    object-fit: cover;
    transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
}

.category-card:hover :deep(.progressive-image__image) {
  transform: scale(1.025);
}

.category-card__placeholder {
  color: $gray-300;
  font-family: $font-secondary;
  font-size: 7rem;
}

.category-card__copy {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.category-card__number {
  padding-top: 8px;
  color: $gray-500;
  font-size: 0.68rem;
}

.category-card__copy div {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 7px;
}

.category-card h2 {
  font-family: $font-secondary;
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 1;
}

.category-card p {
  max-width: 440px;
  color: $text-secondary;
  font-size: 0.88rem;
}

.category-card__arrow {
  font-size: 1.4rem;
  transition: transform 180ms ease;
}

.category-card:hover .category-card__arrow {
  transform: translate(3px, -3px);
}

@media (max-width: 820px) {
  .category-card {
    width: 100%;
  }

  .category-card__media,
  .category-card__media :deep(.progressive-image),
  .category-card__media :deep(.progressive-image__image) {
    min-height: 360px;
  }
}

@media (max-width: 520px) {
  .category-card__media,
  .category-card__media :deep(.progressive-image),
  .category-card__media :deep(.progressive-image__image) {
    min-height: 270px;
  }
}
</style>
