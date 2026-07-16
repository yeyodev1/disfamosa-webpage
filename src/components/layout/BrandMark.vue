<template>
  <RouterLink class="brand-mark" to="/" aria-label="Disfamosa, ir al inicio">
    <span class="brand-mark__symbol" aria-hidden="true">
      <span v-for="square in 4" :key="square" class="brand-mark__square" />
    </span>
    <span class="brand-mark__name">Disfamosa</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-mark__symbol {
  display: flex;
  width: 25px;
  flex-wrap: wrap;
  gap: 3px;
}

.brand-mark__square {
  width: 11px;
  height: 11px;
  border: 3px solid $black;
}

.brand-mark__name {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}
</style>
