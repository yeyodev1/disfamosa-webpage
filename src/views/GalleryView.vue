<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectCard from '@/components/gallery/ProjectCard.vue'
import { categoryPresentation, galleryCategories, getCategoryPresentation } from '@/config/gallery'

const route = useRoute()
const router = useRouter()
const presentation = computed(() => getCategoryPresentation(String(route.params.category)))
const category = computed(() => presentation.value ? galleryCategories[presentation.value.id] : undefined)

watchEffect(() => {
  if (!presentation.value) router.replace('/proyectos')
  if (presentation.value) document.title = `${presentation.value.name} | Disfamosa`
})
</script>

<template>
  <div v-if="category && presentation" class="gallery-view">
    <header class="gallery-view__header page-shell">
      <div>
        <p class="eyebrow">Galería / {{ category.projectCount }} proyectos</p>
        <h1 class="display-title">{{ presentation.name }}</h1>
      </div>
      <p>{{ presentation.description }}</p>
    </header>

    <nav class="gallery-view__nav page-shell" aria-label="Categorías de proyectos">
      <RouterLink
        v-for="item in categoryPresentation"
        :key="item.id"
        :to="item.route"
        :class="{ active: item.id === presentation.id }"
      >
        {{ item.name }}
      </RouterLink>
    </nav>

    <section class="gallery-view__projects page-shell" :aria-label="`Proyectos de ${presentation.name}`">
      <ProjectCard
        v-for="(project, index) in category.projects"
        :key="project.id"
        :project="project"
        :category-name="presentation.name"
        :index="index"
      />
    </section>

    <section class="gallery-view__cta">
      <div class="page-shell">
        <p class="eyebrow">¿Tienes un espacio en mente?</p>
        <h2 class="section-title">Diseñemos una solución para ti.</h2>
        <RouterLink class="button-secondary" to="/contacto">Iniciar proyecto</RouterLink>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  display: flex;
  flex-direction: column;
}

.gallery-view__header {
  padding: 100px 0 70px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 50px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  > p {
    max-width: 400px;
    padding-bottom: 10px;
    color: $text-secondary;
  }
}

.gallery-view__nav {
  padding: 22px 0;
  overflow-x: auto;
  gap: 30px;
  border-top: 1px solid $border;
  border-bottom: 1px solid $border;

  a {
    flex: 0 0 auto;
    color: $gray-500;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  a.active {
    color: $black;
  }
}

.gallery-view__projects {
  padding: 90px 0 130px;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 70px 28px;
}

.gallery-view__cta {
  padding: 100px 0;
  background: $black;
  color: $white;

  .page-shell {
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }

  .eyebrow {
    color: $gray-400;
  }
}

@media (max-width: 760px) {
  .gallery-view__header {
    padding: 70px 0 50px;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }

  .gallery-view__projects {
    padding: 60px 0 90px;
    gap: 54px;
  }
}
</style>
