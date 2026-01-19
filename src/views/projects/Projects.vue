<script setup lang="ts">
import Activities from '@/shared/components/activities/activities.vue';
import { WORKS } from '@/shared/const/works';
</script>

<template>
    <section class="p-4" data-testid="projects-section">
        <h2 class="text-2xl font-bold mb-6 text-foreground">PROJETS</h2>
        <Activities :activities="WORKS" data-testid="work-activities" />
    </section>
</template>