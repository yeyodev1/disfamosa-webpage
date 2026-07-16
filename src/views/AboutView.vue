<script setup lang="ts">
import ProgressiveImage from '@/components/media/ProgressiveImage.vue'
import { menuPreviews } from '@/config/menuPreviews'

const specialties = [
  {
    number: '01',
    title: 'Cocinas',
    text: 'Espacios donde el diseño, la circulación y el almacenamiento funcionan como una sola solución.',
    image: menuPreviews.cocinas,
  },
  {
    number: '02',
    title: 'Baños',
    text: 'Mobiliario preciso para ambientes íntimos que exigen resistencia, orden y cuidado por el detalle.',
    image: menuPreviews.banos,
  },
  {
    number: '03',
    title: 'Closets',
    text: 'Organización personalizada que aprovecha el espacio y responde a la vida cotidiana.',
    image: menuPreviews.closets,
  },
]
</script>

<template>
  <div class="about-view">
    <section class="about-hero page-shell">
      <div class="about-hero__copy">
        <p class="eyebrow">Disfamosa / Guayaquil</p>
        <h1 class="display-title">El oficio de transformar espacios.</h1>
        <p class="about-hero__intro">Diseño, fabricación e instalación de mobiliario personalizado desde 1996.</p>
        <a class="about-hero__scroll" href="#historia">
          <span>Descubre nuestra historia</span>
          <i class="fa-solid fa-arrow-down-long" aria-hidden="true" />
        </a>
      </div>

      <div class="about-hero__media">
        <ProgressiveImage
          :src="menuPreviews.especiales.url"
          :alt="menuPreviews.especiales.alt"
          :width="1400"
          :height="1500"
          sizes="(max-width: 860px) 100vw, 54vw"
          loading="eager"
          priority="high"
        />
        <div class="about-hero__stamp">
          <span>Desde</span>
          <strong>1996</strong>
        </div>
      </div>
    </section>

    <section id="historia" class="about-story page-shell">
      <div class="about-story__rail">
        <span>01</span>
        <span>Nuestra historia</span>
      </div>
      <div class="about-story__content">
        <p class="about-story__lead">Una empresa familiar construida sobre experiencia, curiosidad y conocimiento directo de fábrica.</p>
        <div class="about-story__columns">
          <p>Laura Plaza y Manuel Mantilla crearon Disfamosa en 1996. A lo largo de sus vidas habían conocido fábricas, visitado ferias y adquirido la experiencia necesaria para iniciar este negocio en Guayaquil.</p>
          <p>Desde entonces, Disfamosa ha trabajado responsablemente en proyectos de todo tipo, colaborando con algunas de las constructoras más reconocidas del país y participando en proyectos importantes.</p>
        </div>
        <div class="about-story__founders">
          <span>Fundadores</span>
          <strong>Laura Plaza</strong>
          <span class="about-story__divider" />
          <strong>Manuel Mantilla</strong>
        </div>
      </div>
    </section>

    <section class="about-manifesto">
      <div class="about-manifesto__inner page-shell">
        <p class="eyebrow">Lo que hacemos</p>
        <div class="about-manifesto__statement">
          <span>Diseño</span>
          <span>Calidad</span>
          <span>Funcionalidad</span>
        </div>
        <p class="about-manifesto__text">Creamos soluciones innovadoras y personalizadas para espacios residenciales y comerciales. Cada producto se adapta a las necesidades del cliente, combinando estilo y funcionalidad.</p>
      </div>
    </section>

    <section class="about-specialties page-shell">
      <div class="about-specialties__heading">
        <p class="eyebrow">Especialidades</p>
        <h2 class="section-title">Tres espacios.<br />Una misma precisión.</h2>
      </div>

      <div class="about-specialties__list">
        <article v-for="specialty in specialties" :key="specialty.title" class="specialty-card">
          <div class="specialty-card__media">
            <ProgressiveImage
              :src="specialty.image.url"
              :alt="specialty.image.alt"
              :width="900"
              :height="1100"
              sizes="(max-width: 760px) 100vw, 33vw"
            />
          </div>
          <div class="specialty-card__copy">
            <span>{{ specialty.number }}</span>
            <h3>{{ specialty.title }}</h3>
            <p>{{ specialty.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="about-legacy">
      <div class="about-legacy__inner page-shell">
        <div class="about-legacy__media">
          <ProgressiveImage
            :src="menuPreviews.closets.url"
            :alt="menuPreviews.closets.alt"
            :width="1200"
            :height="900"
            sizes="(max-width: 780px) 100vw, 52vw"
          />
        </div>
        <div class="about-legacy__copy">
          <p class="eyebrow">Casi tres décadas</p>
          <h2>Responsabilidad en cada etapa del proyecto.</h2>
          <p>Escuchamos, diseñamos, fabricamos e instalamos con una visión integral. El resultado debe verse bien, funcionar bien y permanecer en el tiempo.</p>
          <RouterLink class="button-secondary" to="/proyectos">Explorar proyectos</RouterLink>
        </div>
      </div>
    </section>

    <section class="about-cta page-shell">
      <p class="eyebrow">Empecemos</p>
      <h2 class="section-title">Tu espacio merece una solución propia.</h2>
      <RouterLink class="button-primary" to="/contacto">Cuéntanos tu proyecto</RouterLink>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  display: flex;
  flex-direction: column;
}

.about-hero {
  min-height: calc(100vh - 76px);
  padding: 42px 0 86px;
  align-items: stretch;
  gap: clamp(32px, 6vw, 86px);
}

.about-hero__copy {
  display: flex;
  width: 46%;
  padding: 7vh 0 3vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;
  animation: about-copy-in 700ms ease both;
}

.about-hero__intro {
  max-width: 490px;
  color: $text-secondary;
  font-size: clamp(1rem, 1.4vw, 1.18rem);
}

.about-hero__scroll {
  display: inline-flex;
  margin-top: 16px;
  padding-bottom: 8px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid $black;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  i {
    transition: transform 180ms ease;
  }

  &:hover i {
    transform: translateY(4px);
  }
}

.about-hero__media {
  position: relative;
  display: flex;
  width: 54%;
  min-height: 650px;
  overflow: hidden;
  animation: about-media-in 800ms 100ms cubic-bezier(0.2, 0.7, 0.2, 1) both;

  :deep(.progressive-image) {
    min-height: 650px;
  }
}

.about-hero__stamp {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  width: 160px;
  height: 160px;
  padding: 20px;
  flex-direction: column;
  justify-content: flex-end;
  background: $black;
  color: $white;

  span {
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  strong {
    font-family: $font-secondary;
    font-size: 3.2rem;
    font-weight: 400;
    line-height: 1;
  }
}

.about-story {
  padding: 130px 0;
  align-items: flex-start;
  gap: clamp(50px, 10vw, 150px);
  border-top: 1px solid $border;
}

.about-story__rail {
  display: flex;
  width: 150px;
  flex: 0 0 150px;
  flex-direction: column;
  gap: 12px;
  color: $gray-500;
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-story__content {
  display: flex;
  max-width: 900px;
  flex: 1;
  flex-direction: column;
  gap: 50px;
}

.about-story__lead {
  font-family: $font-secondary;
  font-size: clamp(2.5rem, 5vw, 5rem);
  letter-spacing: -0.045em;
  line-height: 1.02;
}

.about-story__columns {
  display: flex;
  gap: clamp(28px, 5vw, 70px);

  p {
    width: 50%;
    color: $text-secondary;
  }
}

.about-story__founders {
  display: flex;
  padding-top: 24px;
  align-items: center;
  gap: 18px;
  border-top: 1px solid $border;

  > span:first-child {
    margin-right: auto;
    color: $gray-500;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  strong {
    font-family: $font-secondary;
    font-size: 1.35rem;
    font-weight: 400;
  }
}

.about-story__divider {
  width: 34px;
  height: 1px;
  background: $gray-400;
}

.about-manifesto {
  padding: 120px 0;
  background: $black;
  color: $white;
}

.about-manifesto__inner {
  flex-direction: column;
  gap: 50px;

  .eyebrow {
    color: $gray-400;
  }
}

.about-manifesto__statement {
  display: flex;
  flex-direction: column;

  span {
    padding: 14px 0;
    border-bottom: 1px solid $gray-800;
    font-family: $font-secondary;
    font-size: clamp(3.5rem, 9vw, 8.5rem);
    letter-spacing: -0.06em;
    line-height: 0.9;
    transition: padding-left 260ms ease, color 260ms ease;
  }

  span:hover {
    padding-left: 4vw;
    color: $gray-400;
  }
}

.about-manifesto__text {
  max-width: 620px;
  align-self: flex-end;
  color: $gray-400;
  font-size: 1.05rem;
}

.about-specialties {
  padding: 130px 0;
  flex-direction: column;
  gap: 70px;
}

.about-specialties__heading {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-specialties__list {
  display: flex;
  gap: 20px;
}

.specialty-card {
  display: flex;
  width: 33.333%;
  flex-direction: column;
  gap: 20px;
}

.specialty-card__media {
  display: flex;
  min-height: 480px;
  overflow: hidden;

  :deep(.progressive-image) {
    min-height: 480px;
  }

  :deep(.progressive-image__image) {
    transition: opacity 500ms ease, transform 700ms ease;
  }
}

.specialty-card:hover :deep(.progressive-image__image) {
  transform: scale(1.03);
}

.specialty-card__copy {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 14px;

  > span {
    color: $gray-500;
    font-size: 0.62rem;
  }

  h3 {
    font-family: $font-secondary;
    font-size: 2rem;
    font-weight: 400;
  }

  p {
    width: 100%;
    color: $text-secondary;
    font-size: 0.84rem;
  }
}

.about-legacy {
  padding: 110px 0;
  background: $gray-100;
}

.about-legacy__inner {
  align-items: stretch;
  gap: clamp(40px, 8vw, 120px);
}

.about-legacy__media {
  display: flex;
  width: 55%;
  min-height: 540px;

  :deep(.progressive-image) {
    min-height: 540px;
  }
}

.about-legacy__copy {
  display: flex;
  width: 45%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;

  h2 {
    font-family: $font-secondary;
    font-size: clamp(2.5rem, 4.5vw, 4.6rem);
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  > p:not(.eyebrow) {
    color: $text-secondary;
  }
}

.about-cta {
  padding: 130px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;

  h2 {
    max-width: 900px;
  }
}

@keyframes about-copy-in {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes about-media-in {
  from { opacity: 0; clip-path: inset(0 0 100% 0); }
  to { opacity: 1; clip-path: inset(0); }
}

@media (max-width: 860px) {
  .about-hero {
    min-height: auto;
    flex-direction: column;
  }

  .about-hero__copy,
  .about-hero__media {
    width: 100%;
  }

  .about-hero__copy {
    padding: 50px 0 10px;
  }

  .about-hero__media,
  .about-hero__media :deep(.progressive-image) {
    min-height: 560px;
  }

  .about-story {
    flex-direction: column;
  }

  .about-story__rail {
    width: auto;
    flex: none;
    flex-direction: row;
  }

  .about-specialties__list {
    flex-wrap: wrap;
  }

  .specialty-card {
    width: calc(50% - 10px);
  }

  .about-legacy__inner {
    flex-direction: column;
  }

  .about-legacy__media,
  .about-legacy__copy {
    width: 100%;
  }

  .about-legacy__copy {
    padding: 30px 0;
  }
}

@media (max-width: 600px) {
  .about-hero {
    padding: 20px 0 60px;
  }

  .about-hero__media,
  .about-hero__media :deep(.progressive-image) {
    min-height: 430px;
  }

  .about-hero__stamp {
    width: 124px;
    height: 124px;

    strong {
      font-size: 2.5rem;
    }
  }

  .about-story,
  .about-specialties,
  .about-cta {
    padding: 82px 0;
  }

  .about-story__columns {
    flex-direction: column;

    p {
      width: 100%;
    }
  }

  .about-story__founders {
    flex-wrap: wrap;

    > span:first-child {
      width: 100%;
    }
  }

  .about-manifesto {
    padding: 82px 0;
  }

  .about-specialties__list {
    flex-direction: column;
  }

  .specialty-card {
    width: 100%;
  }

  .specialty-card__media,
  .specialty-card__media :deep(.progressive-image) {
    min-height: 420px;
  }

  .about-legacy {
    padding: 70px 0;
  }

  .about-legacy__media,
  .about-legacy__media :deep(.progressive-image) {
    min-height: 390px;
  }
}
</style>
