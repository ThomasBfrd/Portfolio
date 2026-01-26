<script setup lang="ts">
import Activities from '@/shared/components/activities/activities.vue';
import type { Activity } from '@/shared/interfaces/activity.interface';
import type { Portfolio } from '@/shared/interfaces/portfolio.interface';
import { computed, inject, type ComputedRef, type Ref } from 'vue';

const portfolioData: Ref<Portfolio> | undefined = inject("portfolioData");
const experiencesData: ComputedRef<Activity[]> = computed<Activity[]>(() => portfolioData?.value?.experiences ?? []);

</script>

<template>
    <section class="p-4" data-testid="experiences-section">
        <h2 class="text-2xl font-bold mb-6 text-foreground">EXPERIENCES</h2>
       <Activities :activities="experiencesData" data-testid="experiences-activity" />
    </section>
</template>