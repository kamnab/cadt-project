<template>
    <div>

        <div class="position-relative" v-for="(item, index) in iframeList" :key="index">
            <!-- <iframe :id="`_${item.itemId}`" :src="`${host}/article/${item.itemId}/embed`" :key="index"
                style="width: 100%;" frameborder="0" loading="lazy"></iframe> -->
            <!-- Render visible iframes -->
            <LazyIframe :postId="item.itemId" />

            <!-- Loading spinner (optional) -->
            <div v-if="loading" class="loading-spinner">Loading...</div>
            <!-- <div v-if="iframe.isPin" class="position-absolute top-0 end-0 pe-2">
                <i class="bi bi-pin-angle"></i>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import LazyIframe from './LazyIframe.vue';

// Define props to accept iframeList from the parent component
const props = defineProps({
    iframeList: []  // Array of iframes to be passed as a prop
});

const chunkSize = 20;  // Number of iframes to load per batch
const visibleIframes = ref([]);  // Store the currently visible iframes
const loading = ref(false);  // Control loading spinner visibility
let loadedChunks = 0;  // Track how many chunks have been loaded

const loadNextChunk = () => {
    const nextChunkStart = loadedChunks * chunkSize;
    const nextChunkEnd = nextChunkStart + chunkSize;

    if (nextChunkStart >= props.iframeList.length) {
        return;  // No more iframes to load
    }

    loading.value = true;  // Show loading spinner

    // Load the next chunk of iframes
    setTimeout(() => {
        visibleIframes.value.push(...props.iframeList.slice(nextChunkStart, nextChunkEnd));
        loadedChunks += 1;
        loading.value = false;  // Hide loading spinner after loading
    }, 300);  // Simulate async load with a timeout
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