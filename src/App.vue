<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Aside from './shared/components/aside/aside.vue';
import ProfilePicture from './shared/components/profile-picture/profile-picture.vue';
import { PROFILE } from './shared/const/profile';
import { useDark, useToggle } from '@vueuse/core';

const sidebarOpen = ref(false);
const path = ref("");
const setSidebarOpened = (open: boolean) => sidebarOpen.value = open;
const setRouterPath = (newPath: string) => path.value = newPath;

const isDark = useDark();
const toggleDark = useToggle(isDark);

watch(sidebarOpen, (isOpen) => {
  if (window.innerWidth >= 640) return;
  document.documentElement.style.overflow = isOpen ? 'hidden' : 'auto';
})

const onResize = () => {
  if (window.innerWidth >= 640) {
    sidebarOpen.value = false;
    document.documentElement.style.overflow = 'auto';
  }
};

onMounted(() => {
  const handler = () => requestAnimationFrame(onResize);
  window.addEventListener('resize', handler);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', () => requestAnimationFrame(onResize));
});

</script>

<template>
  <div class="bg-background transition-colors duration-300">
    <div class="max-w-[1440px] flex flex-col mx-auto text-foreground">
      <div class="sm:hidden flex justify-between items-center border-b border-border">
        <div class="flex items-center gap-4 ml-6 p-6">
          <RouterLink :to="'/'" @click="setRouterPath('/')">
            <div class="h-[60px] w-[60px]">
              <ProfilePicture class="w-full h-full" />
            </div>
          </RouterLink>
          <div class="flex flex-col items-start">
            <h1 class="text-1xl font-bold text-foreground">{{ PROFILE.name }}</h1>
            <p class="text-xs text-foreground italic">{{ PROFILE.email }}</p>
          </div>
        </div>
        <button @click="sidebarOpen = !sidebarOpen" class="p-2 mr-6 border border-border rounded cursor-pointer">
          ☰
        </button>
      </div>

      <RouterLink :to="path"></RouterLink>
      <div class="grid sm:grid-cols-[280px_1fr]">
        <Aside :sidebar-open="sidebarOpen" :set-sidebar-open="setSidebarOpened" :set-router-path="setRouterPath" :path="path" :set-dark-mode="toggleDark" />
        <div class="min-h-screen max-w-screen w-full p-4 border-b border-border">
          <main class="flex flex-col" :class="sidebarOpen && 'overflow-hidden h-screen'">
            <div v-if="sidebarOpen" class="md:hidden bg-zinc-950/80 h-screen fixed inset-0 z-10 backdrop-blur-[3px]" @click="setSidebarOpened(!sidebarOpen)"></div>
            <RouterView v-slot="{ Component }">
              <Transition as="template" mode="out-in" enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-300" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4">
                <component :is="Component" :key="$route.path" class="p-4" />
              </Transition>
            </RouterView>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>