<script setup lang="ts">
// BrandMark component displays the main logo of Disfamosa.
</script>

<template>
  <RouterLink class="brand-mark" to="/" aria-label="Disfamosa, ir al inicio">
    <img class="brand-mark__logo" src="@/assets/logo.png" alt="Disfamosa Logo" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
}

.brand-mark__logo {
  height: 38px;
  width: auto;
  display: block;
}
</style>
