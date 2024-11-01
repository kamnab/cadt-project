<template>
    <div>
        <div class="position-relative" v-for="(item, index) in visibleIframes" :key="index">
            <!-- Render visible iframes lazily -->
            <LazyIframe :itemId="item.itemId" :isPin="item.isPin" />

            <!-- Loading spinner (optional) -->
            <div v-if="loading" class="loading-spinner">Loading...</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import LazyIframe from './LazyIframe.vue';

// Define props to accept iframeList from the parent component
const props = defineProps({
    iframeList: Array  // Array of iframes to be passed as a prop
});

const chunkSize = 1;  // Number of iframes to load per batch
const visibleIframes = ref([]);  // Store the currently visible iframes
const loading = ref(false);  // Control loading spinner visibility
let loadedChunks = 0;  // Track how many chunks have been loaded
let allLoaded = ref(false);  // Track if all iframes have been loaded

const loadNextChunk = () => {
    if (loading.value || allLoaded.value) return;  // Prevent loading if already loading or all items are loaded

    const nextChunkStart = loadedChunks * chunkSize;
    const nextChunkEnd = nextChunkStart + chunkSize;

    if (nextChunkStart >= props.iframeList.length) {
        allLoaded.value = true;  // No more iframes to load
        return;
    }

    loading.value = true;  // Show loading spinner

    // Load the next chunk of iframes
    setTimeout(() => {
        visibleIframes.value.push(...props.iframeList.slice(nextChunkStart, nextChunkEnd));
        loadedChunks += 1;
        loading.value = false;  // Hide loading spinner after loading

        // Check if all iframes are loaded
        if (visibleIframes.value.length >= props.iframeList.length) {
            allLoaded.value = true;
        }
    }, 500);  // Simulate async load with a timeout
};

const handleScroll = () => {
    // Check if user has scrolled near the bottom of the page
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If user is near the bottom of the page, load the next batch of iframes
    if (scrollTop + viewportHeight >= documentHeight - 100) {
        loadNextChunk();
    }
};

// Watch for changes in the iframeList prop (in case the parent updates it)
watch(() => props.iframeList, () => {
    loadedChunks = 0;  // Reset loadedChunks if the list changes
    visibleIframes.value = [];  // Clear visibleIframes
    allLoaded.value = false;  // Reset allLoaded flag
    loadNextChunk();  // Load first chunk of new iframes
}, { immediate: true });

onMounted(() => {
    // Initially load the first batch of iframes
    loadNextChunk();

    // Add scroll event listener to detect when to load more iframes
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    // Remove scroll event listener when component is destroyed
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Optional loading spinner styles */
.loading-spinner {
    text-align: center;
    margin: 20px 0;
    font-size: 16px;
}
</style>
