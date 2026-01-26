<script setup lang="ts">
import Activities from '@/shared/components/activities/activities.vue';
import type { Activity } from '@/shared/interfaces/activity.interface';
import type { Portfolio } from '@/shared/interfaces/portfolio.interface';
import type { Profile } from '@/shared/interfaces/profile.interface';
import { computed, inject, type ComputedRef, type Ref } from 'vue';

const portfolioData: Ref<Portfolio> | undefined = inject("portfolioData");
const profileData: ComputedRef<Profile | undefined> = computed<Profile | undefined>(() => portfolioData?.value?.profile);
const experiencesData: ComputedRef<Activity[]> = computed<Activity[]>(() => portfolioData?.value?.experiences ?? []);
const worksData: ComputedRef<Activity[]> = computed<Activity[]>(() => portfolioData?.value?.works ?? []);

const recentActivities: ComputedRef<Activity[]> = computed(() => {
  const lastWork = worksData.value[worksData.value.length - 1];
  const lastExperience = experiencesData.value[experiencesData.value.length - 1];
  
  return [lastWork, lastExperience].filter((activity: Activity | undefined) => activity !== undefined);
  });
</script>

<template>
  <section class="p-4" data-testid="home-section">
    <h1 class="text-4xl font-bold hidden md:block" data-testid="profile-name">{{ profileData?.name }}</h1>
    <p class="text-md italic hidden md:block" data-testid="profile-email">{{ profileData?.email }}</p>
    <p class="md:mt-4 max-w-3xl leading-relaxed">{{profileData?.resume}}</p>
  </section>

  <section class="p-4 pb-6 border-b border-border">
    <h2 class="text-2xl font-bold mb-4">Skills</h2>
    <ul class="flex flex-wrap gap-4">
      <li v-for="skill in profileData?.skills ?? []" :key="skill.name" data-testid="skill-items"
        class="skill-hover text-center font-semibold p-3 border border-border rounded-full cursor-pointer transition-color duration-300 ease-out relative overflow-hidden hover:text-white group"
        :style="{'--hover-bg': skill.gradient}">
        <span class="group-hover:brightness-150">{{ skill.name }}</span>
      </li>
    </ul>
  </section>

  <section class="p-4">
    <h2 class="text-2xl font-bold mb-6">Expériences récentes</h2>
    <Activities :activities="recentActivities" data-testid="recent-activities" />
  </section>
</template>

<style scoped>
  .skill-hover:hover {
    background: var(--hover-bg);
  }
</style>
