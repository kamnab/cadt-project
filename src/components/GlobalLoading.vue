<template>
    <!-- Global loading spinner (shown if any iframe is still loading) -->
    <div v-if="appGlobalStore.globalLoading" class="global-loading-spinner">
        <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
    </div>
</template>

<script setup>
import { useAppGlobalStore } from '@/stores/appGlobalStore'
const appGlobalStore = useAppGlobalStore()
</script>