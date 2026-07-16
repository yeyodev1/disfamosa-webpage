<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuPreviews } from '@/config/menuPreviews'
import { cloudinaryImageUrl } from '@/services/cloudinaryImage'
import type { GalleryCategoryId } from '@/types/gallery'
import ProgressiveImage from '@/components/media/ProgressiveImage.vue'
import BrandMark from './BrandMark.vue'

interface MenuItem {
  label: string
  to: string
  preview: GalleryCategoryId
  context: string
}

const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)
const toggleButton = ref<HTMLButtonElement | null>(null)
const activeIndex = ref(0)

const menuItems: MenuItem[] = [
  { label: 'Inicio', to: '/', preview: 'cocinas', context: 'Disfamosa desde 1996' },
  { label: 'Nosotros', to: '/nosotros', preview: 'especiales', context: 'Historia y oficio' },
  { label: 'Proyectos', to: '/proyectos', preview: 'closets', context: 'Portafolio completo' },
  { label: 'Cocinas', to: '/proyectos/cocinas', preview: 'cocinas', context: '29 proyectos' },
  { label: 'Baños', to: '/proyectos/banos', preview: 'banos', context: '16 proyectos' },
  { label: 'Closets', to: '/proyectos/closets', preview: 'closets', context: '19 proyectos' },
  { label: 'Especiales', to: '/proyectos/especiales', preview: 'especiales', context: '17 proyectos' },
  { label: 'Lavanderías', to: '/proyectos/lavanderias', preview: 'lavanderias', context: '6 proyectos' },
  { label: 'Contacto', to: '/contacto', preview: 'banos', context: 'Inicia tu proyecto' },
]

const activeItem = computed(() => menuItems[activeIndex.value] ?? menuItems[0])
const activePreview = computed<GalleryCategoryId>(() => activeItem.value?.preview ?? 'cocinas')
const activeImage = computed(() => menuPreviews[activePreview.value])
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)')

function preloadMenuImages() {
  const loaded = new Set<string>()
  for (const item of menuItems) {
    const source = menuPreviews[item.preview].url
    if (loaded.has(source)) continue
    loaded.add(source)
    const image = new Image()
    image.src = cloudinaryImageUrl(source, { width: 1200, height: 1000, crop: 'fill', quality: 'auto:good' })
  }
}

function openMenu() {
  const routeIndex = menuItems.findIndex((item) => item.to === route.path)
  activeIndex.value = routeIndex >= 0 ? routeIndex : 0
  menuOpen.value = true
}

function closeMenu(returnFocus = false) {
  menuOpen.value = false
  if (returnFocus) nextTick(() => toggleButton.value?.focus())
}

function toggleMenu() {
  if (menuOpen.value) closeMenu()
  else openMenu()
}

function previewItem(index: number) {
  if (supportsHover.matches) activeIndex.value = index
}

function navigateFromMenu(path: string) {
  closeMenu()
  if (path !== route.path) void router.push(path)
}

function onKeydown(event: KeyboardEvent) {
  if (!menuOpen.value) return
  if (event.key === 'Escape') {
    closeMenu(true)
    return
  }

  if (event.key !== 'Tab') return
  const focusable = [...document.querySelectorAll<HTMLElement>('.menu-overlay a, .site-header__toggle')]
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

watch(() => route.fullPath, () => closeMenu())
watch(menuOpen, async (open) => {
  document.body.classList.toggle('menu-open', open)
  if (open) {
    preloadMenuImages()
    if (supportsHover.matches) {
      await nextTick()
      document.querySelector<HTMLElement>('.menu-overlay__link')?.focus()
    }
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--open': menuOpen }">
    <div class="site-header__inner page-shell">
      <BrandMark />

      <button
        ref="toggleButton"
        class="site-header__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="toggleMenu"
      >
        <span>{{ menuOpen ? 'Cerrar' : 'Menú' }}</span>
        <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'" aria-hidden="true" />
      </button>
    </div>

    <Transition name="menu-overlay">
      <div v-if="menuOpen" id="primary-navigation" class="menu-overlay">
        <div class="menu-overlay__content">
          <nav class="menu-overlay__nav" aria-label="Navegación principal">
            <p class="menu-overlay__eyebrow">Explorar Disfamosa</p>
            <div class="menu-overlay__links">
              <a
                v-for="(item, index) in menuItems"
                :key="item.to"
                class="menu-overlay__link"
                :class="{ 'menu-overlay__link--active': route.path === item.to }"
                :href="item.to"
                :style="{ '--item-index': index }"
                @pointerenter="previewItem(index)"
                @focus="previewItem(index)"
                @click.prevent="navigateFromMenu(item.to)"
              >
                <span class="menu-overlay__number">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="menu-overlay__label">{{ item.label }}</span>
                <i class="fa-solid fa-arrow-right-long" aria-hidden="true" />
              </a>
            </div>
            <div class="menu-overlay__footer">
              <span>Guayaquil, Ecuador</span>
              <span>Diseño y fabricación a medida</span>
            </div>
          </nav>

          <div class="menu-overlay__media" aria-live="polite">
            <Transition name="menu-photo">
              <div
                v-if="activeImage?.url"
                :key="activeItem?.to"
                class="menu-overlay__photo-frame"
              >
                <ProgressiveImage
                  class="menu-overlay__photo"
                  :src="activeImage.url"
                  :alt="activeImage.alt"
                  :width="1200"
                  :height="1000"
                  loading="eager"
                  priority="high"
                  :responsive="false"
                />
              </div>
            </Transition>
            <div class="menu-overlay__media-shade" />
            <div class="menu-overlay__caption">
              <span>{{ activeItem?.context }}</span>
              <strong>{{ activeItem?.label }}</strong>
              <span>{{ activeImage.imageCount }} imágenes</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: relative;
  z-index: 40;
  border-bottom: 1px solid $border;
  background: rgba($white, 0.96);
}

.site-header__inner {
  position: relative;
  z-index: 42;
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
}

.site-header__toggle {
  display: inline-flex;
  min-width: 108px;
  min-height: 44px;
  padding: 0 4px 0 16px;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  background: transparent;
  cursor: pointer;

  span {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  i {
    display: inline-flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    transition: transform 280ms ease;
  }

  &:hover i {
    transform: rotate(-8deg);
  }
}

.site-header--open {
  border-color: $gray-200;
  background: $white;
}

.menu-overlay {
  position: fixed;
  z-index: 40;
  inset: 0;
  padding-top: 76px;
  overflow: hidden;
  background: $white;
}

.menu-overlay__content {
  display: flex;
  width: 100%;
  height: 100%;
}

.menu-overlay__nav {
  display: flex;
  width: 46%;
  padding: clamp(28px, 4vw, 64px);
  flex-direction: column;
  background: $white;
}

.menu-overlay__eyebrow {
  margin-bottom: clamp(20px, 3vh, 38px);
  color: $gray-500;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.menu-overlay__links {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid $border;
}

.menu-overlay__link {
  display: flex;
  width: 50%;
  min-height: clamp(68px, 9vh, 92px);
  padding: 12px 14px;
  align-items: center;
  gap: 12px;
  border-right: 1px solid $border;
  border-bottom: 1px solid $border;
  opacity: 0;
  transform: translateY(16px);
  animation: menu-item-in 420ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  animation-delay: calc(100ms + (var(--item-index) * 38ms));

  &:nth-child(even) {
    border-right: 0;
  }

  &:focus-visible,
  &.menu-overlay__link--active {
    background: $black;
    color: $white;
  }

  > i {
    margin-left: auto;
    font-size: 0.72rem;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 180ms ease, transform 180ms ease;
  }

  &:focus-visible > i,
  &.menu-overlay__link--active > i {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (hover: hover) and (pointer: fine) {
  .menu-overlay__link:hover {
    background: $black;
    color: $white;
  }

  .menu-overlay__link:hover > i {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-overlay__number {
  align-self: flex-start;
  padding-top: 5px;
  color: $gray-500;
  font-size: 0.58rem;
}

.menu-overlay__label {
  font-family: $font-secondary;
  font-size: clamp(1.45rem, 2.3vw, 2.65rem);
  letter-spacing: -0.045em;
  line-height: 1;
}

.menu-overlay__footer {
  display: flex;
  margin-top: auto;
  padding-top: 22px;
  justify-content: space-between;
  gap: 20px;
  color: $gray-500;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-overlay__media {
  position: relative;
  display: flex;
  width: 54%;
  overflow: hidden;
  background: $gray-900;
}

.menu-overlay__photo-frame {
  position: absolute;
  inset: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.menu-overlay__photo {
  width: 100%;
  height: 100%;
}

.menu-overlay__media-shade {
  position: absolute;
  z-index: 2;
  inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba($black, 0.72) 100%);
  pointer-events: none;
}

.menu-overlay__caption {
  position: absolute;
  z-index: 3;
  right: clamp(24px, 4vw, 58px);
  bottom: clamp(24px, 4vw, 58px);
  left: clamp(24px, 4vw, 58px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  color: $white;

  span {
    max-width: 150px;
    font-size: 0.64rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  strong {
    font-family: $font-secondary;
    font-size: clamp(2.8rem, 5vw, 6rem);
    font-weight: 400;
    letter-spacing: -0.05em;
    line-height: 0.9;
  }
}

.menu-overlay-enter-active,
.menu-overlay-leave-active {
  transition: clip-path 580ms cubic-bezier(0.76, 0, 0.24, 1), visibility 580ms ease;
}

.menu-overlay-enter-from,
.menu-overlay-leave-to {
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
}

.menu-overlay-enter-to,
.menu-overlay-leave-from {
  clip-path: inset(0 0 0 0);
}

.menu-photo-enter-active,
.menu-photo-leave-active {
  transition: opacity 480ms ease, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.menu-photo-enter-from {
  opacity: 0;
  transform: scale(1.04);
}

.menu-photo-leave-to {
  opacity: 0;
  transform: scale(0.985);
}

@keyframes menu-item-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .menu-overlay {
    overflow-y: auto;
  }

  .menu-overlay__content {
    height: auto;
    min-height: 100%;
    flex-direction: column;
  }

  .menu-overlay__nav,
  .menu-overlay__media {
    width: 100%;
  }

  .menu-overlay__media {
    min-height: 36vh;
    order: -1;
  }

  .menu-overlay__nav {
    min-height: 64vh;
    padding: 28px 20px 32px;
  }

  .menu-overlay__eyebrow {
    margin-bottom: 18px;
  }

  .menu-overlay__link {
    min-height: 68px;
    padding: 10px;
  }

  .menu-overlay__caption {
    align-items: flex-end;

    span:last-child {
      display: none;
    }
  }

  .menu-overlay__footer {
    margin-top: 28px;
  }
}

@media (max-width: 520px) {
  .site-header__toggle {
    min-width: 92px;
  }

  .menu-overlay__media {
    min-height: 31vh;
  }

  .menu-overlay__nav {
    min-height: 69vh;
  }

  .menu-overlay__label {
    font-size: 1.35rem;
  }

  .menu-overlay__number {
    display: none;
  }

  .menu-overlay__footer {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
