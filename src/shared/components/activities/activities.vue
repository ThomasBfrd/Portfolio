<script setup lang="ts">
import { ref } from "vue";
import type { Activity } from "../../interfaces/activity.interface";
import ArrowRight from "../../../assets/svg/arrow-right.svg?component";

defineProps({
    activities: Array as () => Activity[]
})

const displayImg = ref({
    isOpened: false,
    currentImg: ""
});

const toggleImg = () => {
    displayImg.value.isOpened = !displayImg.value.isOpened;
}
</script>

<template>
    <section class="border-b border-border text-foreground" data-testid="actvity-section">
        <ul class="flex flex-col gap-8">
            <li v-for="experience in activities" :key="experience.company" data-testid="activity"
                class="flex flex-col gap-4 [&:not(:last-child)]:border-b border-border pb-6 text-foreground">

                <div v-if="displayImg.isOpened && displayImg.currentImg === experience.screen" class="w-screen h-screen fixed inset-0 z-50 top-0 left-0 bg-zinc-950/80 backdrop-blur-[4px] 
                flex items-center justify-center cursor-pointer" @click="toggleImg" data-testid="activity-screen-overlay">
                    <div class="w-[90%] overflow-hidden rounded-md border border-border">
                        <img :src="displayImg.currentImg" :alt="experience.title" />
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div class="rounded-md h-[80px] w-[80px] overflow-hidden flex-shrink-0">
                        <img :src="experience.image" class="object-cover h-full w-full" alt="company-logo">
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ experience.title }}</p>
                        <p class="text-md text-foreground italic">{{ experience.period }}</p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2 mt-2">
                    <span v-for="techno in experience.tools" :key="techno"
                        class="w-[90px] text-center text-[12px] border border-border rounded-full bg-background cursor-pointer hover:bg-border hover:text-foreground transition-colors duration-200 p-1">
                        {{ techno }}
                    </span>
                </div>

                <ul class="mt-4 ml-4 list-disc list-outside">
                    <p class="font-bold pb-4">Description</p>
                    <li v-for="task in experience.description" :key="task" class="text-wrap pb-2">
                        {{ task }}
                    </li>
                </ul>

                <ul class="mt-4 ml-4 list-disc list-outside" v-if="experience.toDo.length" data-testid="activity-todo">
                    <p class="font-bold pb-4">TODO</p>
                    <li v-for="task in experience.toDo" :key="task" class="text-wrap pb-2">
                        {{ task }}
                    </li>
                </ul>

                <div class="flex justify-start items-center" v-if="experience.website" data-testid="activity-url">
                    <ArrowRight class="h-5 w-5 inline-block mr-4 fill-primary" />
                    <a :href="experience.website" target="_blank"
                        class="text-white hover:underline inline-block bg-pink-500 p-2 rounded-md transition-colors duration-200">
                        Lien du projet
                    </a>
                </div>

                <div class="mt-4 rounded-md overflow-hidden border border-border" v-if="experience.screen">
                    <img :src="experience.screen" class="cursor-pointer" data-testid="activity-screen"
                        @click="() => { toggleImg(); displayImg.currentImg = experience.screen; }" />
                </div>
            </li>
        </ul>
    </section>
</template>