<script setup lang="ts">
import { MENU_ITEMS } from '../../const/menu-items';
import About from '../social/social.vue';
import ProfilePicture from '../profile-picture/profile-picture.vue';
import ArrowRight from "../../../assets/svg/arrow-right.svg?component";

defineProps<{
    path: string;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    setRouterPath: (path: string) => void;
    setDarkMode: () => void;
}>();
</script>

<template>
    <aside class="border-border bg-background p-4 flex flex-col items-center justify-evenly min-h-dvh h-dvh md:sticky
            sm:flex-col sm:relative sm:translate-x-0 overflow-y-hidden" :class="{
                'fixed z-20 top-0 left-0 min-h-dvh w-[280px] transform transition-transform duration-300': true,
                '-translate-x-full': !sidebarOpen,
                'translate-x-0': sidebarOpen
            }" data-testid="aside">
        <button class="self-end sm:hidden p-2 border border-border rounded cursor-pointer fixed top-4 right-4"
            @click="setSidebarOpen(false)" data-testid="toggle-aside-btn">
            ✕
        </button>

        <section class="flex flex-col items-center gap-2 border-border pb-4">
            <ProfilePicture data-testid="profile-picture" />
            <span class="text-foreground text-center font-light" data-testid="pseudo">@thomasbfrd</span>
        </section>

        <div class="w-full">
            <ul class="flex flex-col gap-4 mb-4">
                <li v-for="item in MENU_ITEMS" :key="item.label" data-testid="menu-item">
                    <RouterLink :to="item.route" @click="setSidebarOpen(false); setRouterPath(item.route)"
                        class="cursor-pointer flex justify-between px-4 items-center p-2 hover:text-secondary-foreground border border-border rounded-[8px] hover:bg-secondary transition-all duration-200 group" data-testid="menu-action">
                        <component :is="item.icon"
                            class="h-5 w-5 fill-primary group-hover:fill-primary group-hover:-rotate-15 transition-all duration-200" />
                        <span>{{ item.label }}</span>
                        <ArrowRight class="h-5 w-5"
                            :class="path === item.route ? 'fill-primary group-hover:fill-primary transition-all duration-200' : 'opacity-0'" />
                    </RouterLink>
                </li>
            </ul>
        </div>

        <div>
            <button @click="setDarkMode()"
                class="h-12 w-12 rounded-lg p-2 cursor-pointer bg-background hover:bg-background transition-all duration-200" data-testid="toggle-theme">
                <svg class="fill-black-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg class="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>

        <div class="w-full flex flex-col items-center mb-6" data-testid="socials">
            <h2 class="text-2xl font-bold mb-4">Contact</h2>
            <About :is-centered="true" />
        </div>
    </aside>
</template>