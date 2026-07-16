<script setup lang="ts">
import CategoryCard from '@/components/gallery/CategoryCard.vue'
import { categoryPresentation } from '@/config/gallery'
</script>

<template>
  <div class="projects-view page-shell">
    <header class="projects-view__header">
      <p class="eyebrow">Portafolio</p>
      <h1 class="display-title">Proyectos construidos alrededor de la vida real.</h1>
      <p>Explora una selección de cocinas, baños, closets y soluciones especiales diseñadas y fabricadas por Disfamosa.</p>
    </header>

    <div class="projects-view__categories">
      <CategoryCard v-for="(category, index) in categoryPresentation" :key="category.id" :category="category" :index="index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.projects-view {
  padding: 100px 0 130px;
  flex-direction: column;
  gap: 100px;
}

.projects-view__header {
  display: flex;
  max-width: 1050px;
  flex-direction: column;
  gap: 26px;

  > p:last-child {
    max-width: 620px;
    color: $text-secondary;
  }
}

.projects-view__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 76px 24px;
}

@media (max-width: 620px) {
  .projects-view {
    padding: 70px 0 90px;
    gap: 60px;
  }
}
</style>
