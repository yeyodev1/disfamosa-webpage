<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectCard from '@/components/gallery/ProjectCard.vue'
import { categoryPresentation, galleryCategories, getCategoryPresentation } from '@/config/gallery'

const route = useRoute()
const router = useRouter()
const presentation = computed(() => getCategoryPresentation(String(route.params.category)))
const category = computed(() => presentation.value ? galleryCategories[presentation.value.id] : undefined)
let transitionTimer: number | undefined

onMounted(() => {
  document.body.classList.add('category-transitioning')
  transitionTimer = window.setTimeout(() => document.body.classList.remove('category-transitioning'), 1400)
})

onBeforeUnmount(() => {
  window.clearTimeout(transitionTimer)
  document.body.classList.remove('category-transitioning')
})

function navigateCategory(path: string) {
  if (path === route.path) return
  const navigate = () => router.push(path).then(() => undefined)
  const transitionDocument = document as Document & {
    startViewTransition?: (callback: () => Promise<void>) => void
  }

  if (transitionDocument.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    transitionDocument.startViewTransition(navigate)
  } else {
    void navigate()
  }
}

watchEffect(() => {
  if (!presentation.value) router.replace('/proyectos')
  if (presentation.value) document.title = `${presentation.value.name} | Disfamosa`
})
</script>

<template>
  <div v-if="category && presentation" class="gallery-view">
    <div class="gallery-transition" aria-hidden="true">
      <small>Disfamosa / Portafolio</small>
      <span>{{ presentation.name }}</span>
    </div>

    <header class="gallery-view__header page-shell">
      <div>
        <p class="eyebrow">Galería / {{ category.projectCount }} proyectos</p>
        <h1 class="display-title">{{ presentation.name }}</h1>
      </div>
      <p>{{ presentation.description }}</p>
    </header>

    <nav class="gallery-view__nav page-shell" aria-label="Categorías de proyectos">
      <a
        v-for="item in categoryPresentation"
        :key="item.id"
        :href="item.route"
        :class="{ active: item.id === presentation.id }"
        @click.prevent="navigateCategory(item.route)"
      >
        {{ item.name }}
      </a>
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
  position: relative;
  display: flex;
  flex-direction: column;
}

.gallery-transition {
  position: fixed;
  z-index: 35;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  overflow: hidden;
  background: $black;
  color: $white;
  pointer-events: none;
  animation: gallery-curtain-exit 1400ms cubic-bezier(0.76, 0, 0.24, 1) forwards;

  small {
    color: $gray-400;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    animation: gallery-curtain-kicker 1250ms ease forwards;
  }

  span {
    font-family: $font-secondary;
    font-size: clamp(4rem, 12vw, 11rem);
    letter-spacing: -0.06em;
    line-height: 0.9;
    animation: gallery-curtain-title 1250ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  }
}

.gallery-view__header {
  padding: 100px 0 70px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 50px;
  animation: gallery-content-in 580ms 180ms ease both;

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
  animation: gallery-content-in 580ms 240ms ease both;

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

@keyframes gallery-curtain-exit {
  0%, 62% {
    transform: translateX(0);
  }

  100% {
    visibility: hidden;
    transform: translateX(-100%);
  }
}

@keyframes gallery-curtain-title {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }

  18%, 72% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-16px);
  }
}

@keyframes gallery-curtain-kicker {
  0%, 8% {
    opacity: 0;
    transform: translateY(8px);
  }

  18%, 74% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
  }
}

@keyframes gallery-content-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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
