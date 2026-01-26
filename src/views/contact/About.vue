<script setup lang="ts">
import type { Portfolio } from '@/shared/interfaces/portfolio.interface';
import type { Profile } from '@/shared/interfaces/profile.interface';
import { type Ref, inject, type ComputedRef, computed } from 'vue';

const portfolioData: Ref<Portfolio> | undefined = inject("portfolioData");
const profileData: ComputedRef<Profile | undefined> = computed<Profile | undefined>(() => portfolioData?.value?.profile);

</script>

<template>
    <div>
        <section class="p-4" data-testid="about-section">
            <h2 class="text-2xl font-bold mb-4">A propos</h2>
            <div class="flex flex-col justify-start items-start gap-4 mb-4">
                <p v-for="bio in profileData?.bio">{{ bio }}</p>
            </div>
        </section>
    </div>
</template>