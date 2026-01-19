<script setup lang="ts">
import Activities from '@/shared/components/activities/activities.vue';
import { PROFILE } from '@/shared/const/profile';
import { RECENT_ACTIVITIES } from '@/shared/const/recent-activities';
</script>

<template>
  <section class="p-4" data-testid="home-section">
    <h1 class="text-4xl font-bold hidden md:block" data-testid="profile-name">{{ PROFILE.name }}</h1>
    <p class="text-md italic hidden md:block" data-testid="profile-email">{{ PROFILE.email }}</p>
    <p class="md:mt-4 max-w-3xl leading-relaxed">
      Développeur web fullstack avec 2 ans d’expérience sur des SaaS en production,
      j’aime concevoir des interfaces claires et durables en React et Angular,
      tout en portant une attention particulière à la qualité du code et à l’architecture des API REST.
    </p>
  </section>

  <section class="p-4 pb-6 border-b border-border">
    <h2 class="text-2xl font-bold mb-4">Skills</h2>
    <ul class="flex flex-wrap gap-4">
      <li v-for="skill in PROFILE.skills" :key="skill.name" data-testid="skill-items"
        class="text-center p-3 border border-border rounded-full cursor-pointer transition-all duration-300 ease-out relative overflow-hidden hover:font-semibold hover:scale-105 group"
        :class="skill.background">
        <span class="group-hover:text-primary group-hover:brightness-150 hover:text-white">{{ skill.name }}</span>
      </li>
    </ul>
  </section>

  <section class="p-4">
    <h2 class="text-2xl font-bold mb-6">Expériences récentes</h2>
    <Activities :activities="RECENT_ACTIVITIES" data-testid="recent-activities" />
  </section>
</template>
