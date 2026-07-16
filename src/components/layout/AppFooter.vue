<script setup lang="ts">
import BrandMark from './BrandMark.vue'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner page-shell">
      <div class="site-footer__statement">
        <BrandMark />
        <p>Mobiliario personalizado para espacios que merecen precisión.</p>
      </div>

      <div class="site-footer__links">
        <RouterLink to="/nosotros">Nosotros</RouterLink>
        <RouterLink to="/proyectos">Proyectos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </div>

      <p class="site-footer__legal">© {{ new Date().getFullYear() }} Disfamosa. Guayaquil, Ecuador.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  padding: 70px 0 32px;
  background: $black;
  color: $white;
}

.site-footer__inner {
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 54px;
}

.site-footer__statement {
  display: flex;
  max-width: 430px;
  flex-direction: column;
  gap: 22px;

  :deep(.brand-mark__logo) {
    filter: invert(1);
  }

  p {
    color: $gray-400;
    font-family: $font-secondary;
    font-size: clamp(1.7rem, 3vw, 2.6rem);
    line-height: 1.15;
  }
}

.site-footer__links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  a {
    color: $gray-300;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  a:hover {
    color: $white;
  }
}

.site-footer__legal {
  width: 100%;
  padding-top: 28px;
  border-top: 1px solid $gray-800;
  color: $gray-500;
  font-size: 0.72rem;
}
</style>
