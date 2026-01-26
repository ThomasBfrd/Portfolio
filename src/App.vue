<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch, type ComputedRef, type Ref, type WritableComputedRef } from 'vue';
import Aside from './shared/components/aside/aside.vue';
import ProfilePicture from './shared/components/profile-picture/profile-picture.vue';
import { useDark, useFetch, useToggle } from '@vueuse/core';
import type { Profile } from './shared/interfaces/profile.interface';

const sidebarOpen: Ref<boolean> = ref(false);
const path: Ref<string> = ref("");
const setSidebarOpened = (open: boolean) => sidebarOpen.value = open;
const setRouterPath = (newPath: string) => path.value = newPath;

const isDark: WritableComputedRef<boolean> = useDark();
const toggleDark: () => boolean = useToggle(isDark);

const { data, error, isFetching } = useFetch('https://res.cloudinary.com/de7kgkvgt/raw/upload/portfolio-data.json', { immediate: true }).json();

provide('portfolioData', data);

const profileData: ComputedRef<Profile> = computed<Profile>(() => data?.value?.profile ?? "");

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

const handler = () => requestAnimationFrame(onResize);

onMounted(() => {
  window.addEventListener('resize', handler);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handler);
});

if (error.value) throw new Error("Erreur lors de la récupération des données");

</script>

<template>
  <div v-if="isFetching" class="fixed inset-0 absolute backdrop-blur-xs bg-zinc-950/80 z-[99]">
    <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
      <svg aria-hidden="true" class="w-8 h-8 w-8 h-8 text-secondary animate-spin fill-primary" viewBox="0 0 100 101"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span class="sr-only">Chargement...</span>
    </div>
  </div>
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
            <h1 class="text-1xl font-bold text-foreground">{{ profileData.name }}</h1>
            <p class="text-xs text-foreground italic">{{ profileData.email }}</p>
          </div>
        </div>
        <button @click="sidebarOpen = !sidebarOpen" class="p-2 mr-6 border border-border rounded cursor-pointer">
          ☰
        </button>
      </div>

      <RouterLink :to="path"></RouterLink>
      <div class="grid sm:grid-cols-[280px_1fr]">
        <Aside :sidebar-open="sidebarOpen" :set-sidebar-open="setSidebarOpened" :set-router-path="setRouterPath"
          :path="path" :set-dark-mode="toggleDark" />
        <div class="min-h-screen max-w-screen w-full p-4 border-b border-border">
          <main class="flex flex-col" :class="sidebarOpen && 'overflow-hidden h-screen'">
            <div v-if="sidebarOpen" class="md:hidden bg-zinc-950/80 h-screen fixed inset-0 z-10 backdrop-blur-[3px]"
              @click="setSidebarOpened(!sidebarOpen)"></div>
            <RouterView v-slot="{ Component }">
              <Transition mode="out-in" enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-300" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4">
                <div :key="$route.path" class="p-4">
                  <component :is="Component" />
                </div>
              </Transition>
            </RouterView>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>