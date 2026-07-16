<template>
  <div class="about-view">
    <header class="about-hero page-shell">
      <p class="eyebrow">Nosotros</p>
      <h1 class="display-title">Treinta años convirtiendo ideas en espacios.</h1>
    </header>

    <section class="about-story page-shell">
      <div class="about-story__index"><span>Desde</span><strong>1996</strong></div>
      <div class="about-story__copy">
        <p class="about-story__lead">Disfamosa nació en Guayaquil de la experiencia y visión de Laura Plaza y Manuel Mantilla.</p>
        <p>Después de años de conocer fábricas, visitar ferias y aprender directamente del oficio, decidieron crear una empresa dedicada a producir mobiliario con una combinación clara de diseño, calidad y funcionalidad.</p>
        <p>Desde entonces hemos trabajado responsablemente en proyectos residenciales y comerciales, colaborando con constructoras reconocidas y atendiendo necesidades muy distintas con soluciones hechas a la medida.</p>
      </div>
    </section>

    <section class="about-principles">
      <div class="about-principles__inner page-shell">
        <div class="about-principles__heading">
          <p class="eyebrow">Nuestra manera de hacer</p>
          <h2 class="section-title">Calidad visible. Funcionalidad que se siente.</h2>
        </div>
        <div class="about-principles__items">
          <article><span>01</span><h3>Personalización</h3><p>Cada proyecto responde a un espacio, una necesidad y una forma de vivir diferente.</p></article>
          <article><span>02</span><h3>Precisión</h3><p>Diseñamos, fabricamos e instalamos con atención consistente a medidas y acabados.</p></article>
          <article><span>03</span><h3>Responsabilidad</h3><p>Acompañamos cada etapa con comunicación clara y compromiso con el resultado.</p></article>
        </div>
      </div>
    </section>

    <section class="about-cta page-shell">
      <h2 class="section-title">Tu espacio también puede contar una historia.</h2>
      <RouterLink class="button-primary" to="/contacto">Conversemos</RouterLink>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  display: flex;
  flex-direction: column;
}

.about-hero {
  min-height: 70vh;
  padding: 100px 0;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;

  h1 {
    max-width: 1050px;
  }
}

.about-story {
  padding: 110px 0;
  align-items: flex-start;
  gap: clamp(50px, 12vw, 190px);
  border-top: 1px solid $border;
}

.about-story__index {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: $gray-500;

  span {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  strong {
    color: $black;
    font-family: $font-secondary;
    font-size: 4rem;
    font-weight: 400;
  }
}

.about-story__copy {
  display: flex;
  max-width: 700px;
  flex-direction: column;
  gap: 24px;
  color: $text-secondary;
  font-size: 1.05rem;
}

.about-story__lead {
  color: $black;
  font-family: $font-secondary;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
}

.about-principles {
  padding: 110px 0;
  background: $gray-950;
  color: $white;
}

.about-principles__inner,
.about-principles__heading {
  flex-direction: column;
}

.about-principles__inner {
  gap: 70px;
}

.about-principles__heading {
  display: flex;
  max-width: 820px;
  gap: 18px;

  .eyebrow {
    color: $gray-400;
  }
}

.about-principles__items {
  display: flex;
  border-top: 1px solid $gray-700;
}

.about-principles article {
  display: flex;
  width: 33.333%;
  min-height: 300px;
  padding: 28px;
  flex-direction: column;
  gap: 14px;
  border-right: 1px solid $gray-700;

  span,
  p {
    color: $gray-400;
  }

  span {
    font-size: 0.68rem;
  }

  h3 {
    margin-top: auto;
    font-family: $font-secondary;
    font-size: 2rem;
    font-weight: 400;
  }
}

.about-cta {
  padding: 120px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 34px;

  h2 {
    max-width: 850px;
  }
}

@media (max-width: 720px) {
  .about-hero {
    min-height: 60vh;
    padding: 70px 0;
  }

  .about-story {
    padding: 72px 0;
    flex-direction: column;
    gap: 32px;
  }

  .about-principles {
    padding: 76px 0;
  }

  .about-principles__items {
    flex-direction: column;
  }

  .about-principles article {
    width: 100%;
    min-height: 230px;
    border-right: 0;
    border-bottom: 1px solid $gray-700;
  }
}
</style>
