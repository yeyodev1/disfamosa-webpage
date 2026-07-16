<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppPreloader from '@/components/layout/AppPreloader.vue'

const showPreloader = ref(sessionStorage.getItem('disfamosa_preloaded') !== 'true')

onMounted(async () => {
  if (!showPreloader.value) return
  await nextTick()
  window.setTimeout(() => {
    showPreloader.value = false
    sessionStorage.setItem('disfamosa_preloaded', 'true')
  }, 650)
})
</script>

<template>
  <AppPreloader :visible="showPreloader" />
  <div class="app-container">
    <AppHeader />
    <main class="app-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="route">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss">
.app-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.app-main {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.route-enter-active {
  transition: opacity 160ms ease, transform 180ms ease;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

</style>
