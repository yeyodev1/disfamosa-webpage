<script setup lang="ts">
import CategoryCard from '@/components/gallery/CategoryCard.vue'
import ProgressiveImage from '@/components/media/ProgressiveImage.vue'
import { categoryPresentation, getCategoryCover } from '@/config/gallery'

const heroImage = getCategoryCover('cocinas')
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero__inner page-shell">
        <div class="hero__copy">
          <p class="eyebrow">Diseño y fabricación desde 1996</p>
          <h1 class="display-title">Espacios hechos para vivirlos.</h1>
          <p class="hero__intro">Diseñamos y fabricamos mobiliario personalizado con precisión, funcionalidad y una atención rigurosa a cada detalle.</p>
          <RouterLink class="button-primary" to="/contacto">Cuéntanos tu proyecto</RouterLink>
        </div>
        <div class="hero__media">
          <ProgressiveImage
            v-if="heroImage?.secureUrl"
            :src="heroImage.secureUrl"
            :alt="heroImage.alt"
            :width="1400"
            :height="1100"
            sizes="(max-width: 900px) 100vw, 53vw"
            loading="eager"
            priority="high"
          />
          <div v-else class="hero__placeholder"><span>Disfamosa</span></div>
          <span class="hero__caption">Guayaquil · Ecuador</span>
        </div>
      </div>
    </section>

    <section class="categories page-shell">
      <div class="categories__heading">
        <p class="eyebrow">Nuestro trabajo</p>
        <h2 class="section-title">Soluciones a la medida de cada espacio.</h2>
      </div>
      <div class="categories__list">
        <CategoryCard v-for="(category, index) in categoryPresentation" :key="category.id" :category="category" :index="index" />
      </div>
    </section>

    <section class="legacy">
      <div class="legacy__inner page-shell">
        <p class="legacy__year">1996</p>
        <div class="legacy__copy">
          <p class="eyebrow">Una historia de oficio</p>
          <h2>Diseño que parte de escuchar y se concreta con precisión.</h2>
          <p>Laura Plaza y Manuel Mantilla fundaron Disfamosa combinando experiencia, conocimiento de fábrica y una visión clara: crear mobiliario que responda de verdad a quienes lo usan.</p>
          <RouterLink class="button-secondary" to="/nosotros">Conoce nuestra historia</RouterLink>
        </div>
      </div>
    </section>

    <section class="process page-shell">
      <div class="process__heading">
        <p class="eyebrow">Cómo trabajamos</p>
        <h2 class="section-title">Del espacio a la solución.</h2>
      </div>
      <div class="process__steps">
        <article><span>01</span><h3>Escuchamos</h3><p>Entendemos tus necesidades, tu espacio y la manera en que quieres vivirlo.</p></article>
        <article><span>02</span><h3>Diseñamos</h3><p>Convertimos cada requerimiento en una propuesta funcional y coherente.</p></article>
        <article><span>03</span><h3>Fabricamos</h3><p>Construimos cada pieza con control de calidad y atención al detalle.</p></article>
        <article><span>04</span><h3>Instalamos</h3><p>Entregamos la solución completa, cuidando el acabado final en obra.</p></article>
      </div>
    </section>

    <section class="home-cta">
      <div class="home-cta__inner page-shell">
        <p class="eyebrow">Tu proyecto puede empezar hoy</p>
        <h2 class="section-title">Hagamos que el espacio trabaje para ti.</h2>
        <RouterLink class="button-secondary" to="/contacto">Iniciar conversación</RouterLink>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
}

.hero {
  padding: 42px 0 96px;
}

.hero__inner {
  min-height: calc(100vh - 118px);
  align-items: stretch;
  gap: clamp(32px, 6vw, 90px);
}

.hero__copy {
  display: flex;
  width: 47%;
  padding: 7vh 0 3vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
}

.hero__intro {
  max-width: 530px;
  color: $text-secondary;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
}

.hero__media {
  position: relative;
  display: flex;
  width: 53%;
  min-height: 620px;
  overflow: hidden;
  background: $gray-100;

  :deep(.progressive-image) {
    min-height: 620px;
  }

  :deep(.progressive-image__image) {
    width: 100%;
    object-fit: cover;
  }
}

.hero__placeholder {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: $black;
  color: $white;

  span {
    font-family: $font-secondary;
    font-size: clamp(3rem, 7vw, 7rem);
    transform: rotate(-90deg);
  }
}

.hero__caption {
  position: absolute;
  right: 18px;
  bottom: 16px;
  padding: 6px 10px;
  background: $white;
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.categories,
.process {
  padding: 110px 0;
  flex-direction: column;
  gap: 64px;
}

.categories__heading,
.process__heading {
  display: flex;
  max-width: 820px;
  flex-direction: column;
  gap: 18px;
}

.categories__list {
  display: flex;
  flex-wrap: wrap;
  gap: 70px 24px;
}

.legacy {
  padding: 110px 0;
  background: $black;
  color: $white;
}

.legacy__inner {
  align-items: flex-start;
  gap: clamp(50px, 10vw, 170px);
}

.legacy__year {
  color: $gray-700;
  font-family: $font-secondary;
  font-size: clamp(5rem, 17vw, 14rem);
  line-height: 0.8;
  writing-mode: vertical-rl;
}

.legacy__copy {
  display: flex;
  max-width: 680px;
  padding-top: 35px;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;

  .eyebrow,
  > p {
    color: $gray-400;
  }

  h2 {
    font-family: $font-secondary;
    font-size: clamp(2.5rem, 5vw, 4.8rem);
    font-weight: 400;
    line-height: 1;
  }
}

.process__steps {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid $border;
}

.process__steps article {
  display: flex;
  width: 25%;
  min-height: 270px;
  padding: 24px;
  flex-direction: column;
  gap: 14px;
  border-right: 1px solid $border;
  border-bottom: 1px solid $border;

  span {
    color: $gray-500;
    font-size: 0.68rem;
  }

  h3 {
    margin-top: auto;
    font-family: $font-secondary;
    font-size: 2rem;
    font-weight: 400;
  }

  p {
    color: $text-secondary;
    font-size: 0.85rem;
  }
}

.home-cta {
  padding: 110px 0;
  background: $gray-950;
  color: $white;
}

.home-cta__inner {
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;

  .eyebrow {
    color: $gray-400;
  }

  h2 {
    max-width: 900px;
  }
}

@media (max-width: 900px) {
  .hero__inner {
    min-height: auto;
    flex-direction: column;
  }

  .hero__copy,
  .hero__media {
    width: 100%;
  }

  .hero__media {
    min-height: 520px;
  }

  .hero__media :deep(.progressive-image) {
    min-height: 520px;
  }

  .process__steps article {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 20px 0 56px;
  }

  .hero__copy {
    padding-top: 30px;
  }

  .hero__media {
    min-height: 390px;
  }

  .hero__media :deep(.progressive-image) {
    min-height: 390px;
  }

  .categories,
  .process {
    padding: 72px 0;
    gap: 42px;
  }

  .legacy {
    padding: 76px 0;
  }

  .legacy__inner {
    flex-direction: column;
    gap: 24px;
  }

  .legacy__year {
    writing-mode: initial;
  }

  .legacy__copy {
    padding-top: 0;
  }

  .process__steps article {
    width: 100%;
    min-height: 220px;
  }
}
</style>
