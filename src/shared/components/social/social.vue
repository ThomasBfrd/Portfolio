<script setup lang="ts">
import type { Portfolio } from '@/shared/interfaces/portfolio.interface';
import type { Social } from '@/shared/interfaces/social.interface';
import GithubIcon from "../../../assets/svg/github-icon.svg?component";
import LinkedinIcon from "../../../assets/svg/linkedin-icon.svg?component";
import { computed, inject, markRaw, type Component, type ComputedRef, type Raw, type Ref } from 'vue';

defineProps<{
    isCentered: boolean;
}>();

const iconComponents: Raw<Component> = markRaw({
    github: GithubIcon,
    linkedin: LinkedinIcon
})

const portfolioData: Ref<Portfolio> | undefined = inject("portfolioData");
const socialsData: ComputedRef<Social[]> = computed<Social[]>(() => portfolioData?.value?.socials ?? []);

const getIconComponent = (iconName: string): Component => {
    return iconComponents[iconName as keyof typeof iconComponents];
}

</script>

<template>
    <div class="w-full">
        <div class="flex flex-col justify-start items-center gap-4 mb-4"
            :class="isCentered ? 'items-center' : 'items-start'">
            <p>thomas.bfrd@gmail.com</p>
            <ul class="flex gap-8">
                <li v-for="social in socialsData" :key="social.platform" data-testid="social">
                    <a :href="social.url" target="_blank" class="inline-block">
                        <component :is="getIconComponent(social.icon)"
                            class="h-12 w-12 fill-foreground hover:fill-foreground transition-all duration-300 hover:scale-110" />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>