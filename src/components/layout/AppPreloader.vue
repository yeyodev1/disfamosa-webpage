<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<template>
  <Transition name="preloader">
    <div v-if="visible" class="app-preloader" aria-label="Cargando Disfamosa" role="status">
      <div class="app-preloader__mark" aria-hidden="true">
        <span v-for="square in 4" :key="square" />
      </div>
      <p>Disfamosa</p>
      <div class="app-preloader__line"><span /></div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.app-preloader {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: $black;
  color: $white;
}

.app-preloader__mark {
  display: flex;
  width: 42px;
  flex-wrap: wrap;
  gap: 5px;

  span {
    width: 18px;
    height: 18px;
    border: 4px solid $white;
    animation: mark-pulse 900ms ease-in-out infinite alternate;
  }

  span:nth-child(2),
  span:nth-child(3) {
    animation-delay: 180ms;
  }
}

.app-preloader p {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.app-preloader__line {
  width: 130px;
  height: 1px;
  overflow: hidden;
  background: $gray-800;

  span {
    display: block;
    width: 50%;
    height: 100%;
    background: $white;
    animation: line-travel 850ms ease-in-out infinite;
  }
}

.preloader-leave-active {
  transition: opacity 380ms ease, visibility 380ms ease;
}

.preloader-leave-to {
  opacity: 0;
  visibility: hidden;
}

@keyframes mark-pulse {
  from { opacity: 0.35; }
  to { opacity: 1; }
}

@keyframes line-travel {
  from { transform: translateX(-100%); }
  to { transform: translateX(200%); }
}
</style>
