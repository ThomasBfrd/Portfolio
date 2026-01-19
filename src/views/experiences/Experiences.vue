<script setup lang="ts">
import Activities from '@/shared/components/activities/activities.vue';
import { EXPERIENCES } from '@/shared/const/experiences';
</script>

<template>
    <section class="p-4" data-testid="experiences-section">
        <h2 class="text-2xl font-bold mb-6 text-foreground">EXPERIENCES</h2>
        <Activities :activities="EXPERIENCES" data-testid="experiences-activity"/>
    </section>
</template>