<script setup lang="ts">
import type { Portfolio } from '@/shared/interfaces/portfolio.interface';
import type { Profile } from '@/shared/interfaces/profile.interface';
import { type Ref, inject, type ComputedRef, computed } from 'vue';

const portfolioData: Ref<Portfolio> | undefined = inject("portfolioData");
const profileData: ComputedRef<Profile | undefined> = computed<Profile | undefined>(() => portfolioData?.value?.profile);
</script>

<template>
    <div class="rounded-full h-[120px] w-[120px] mx-auto overflow-hidden border-3 border-border flex-shrink-0">
        <img class="object-cover h-full w-full" :src="profileData?.profileImg" alt="profile-picture"
            data-testid="profile-picture">
    </div>
</template>