<script setup lang="ts">
import Activities from '@/shared/components/activities/activities.vue';
import type { Activity } from '@/shared/interfaces/activity.interface';
import type { Portfolio } from '@/shared/interfaces/portfolio.interface';
import { type Ref, inject, type ComputedRef, computed } from 'vue';

const portfolioData: Ref<Portfolio> | undefined = inject("portfolioData");
const worksData: ComputedRef<Activity[]> = computed<Activity[]>(() => portfolioData?.value?.works ?? []);

</script>

<template>
    <section class="p-4" data-testid="projects-section">
        <h2 class="text-2xl font-bold mb-6 text-foreground">PROJETS</h2>
        <Activities :activities="worksData" data-testid="work-activities" />
    </section>
</template>