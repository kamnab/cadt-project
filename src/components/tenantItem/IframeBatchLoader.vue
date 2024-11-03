<template>
    <div>
        <div v-if="initialLoading" class="loading-overlay">
            Loading...
        </div>

        <div v-else-if="props.iframeList.length === 0" class="no-content" role="alert">
            No content available.
        </div>

        <div v-else>
            <div v-for="(item, index) in visibleIframes" :key="index" class="iframe-container" :data-index="index">
                <LazyIframe v-if="!error[index] && !loading[index]" :itemId="item.itemId" :isPin="item.isPin"
                    aria-label="Loaded iframe" tabindex="0" @iframe-loaded="handleIframeLoad(index)"
                    @iframe-error="handleIframeError(index)" />

                <div v-else-if="error[index]" class="error-message" role="alert">
                    <div>Error loading iframe.</div>
                    <div>Attempts left: {{ maxRetries - loadAttempts[index] }}</div>
                    <button v-if="loadAttempts[index] < maxRetries" @click="retryLoadingIframe(index)"
                        aria-label="Retry loading the iframe">
                        Retry
                    </button>
                    <span v-else>Max retries reached</span>
                </div>

                <div v-if="loading[index]" class="loading-spinner" role="status" aria-live="polite">
                    Loading iframe at index {{ index }}...
                </div>
            </div>

            <div v-if="allLoaded && !initialLoading" class="loading-complete" role="alert">
                All loaded!
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import LazyIframe from './LazyIframe.vue';

const props = defineProps({
    iframeList: {
        type: Array,
        required: true
    }
});

const chunkSize = ref(2); // Number of iframes to load at once
const visibleIframes = ref([]);
const loading = ref([]);
const error = ref([]);
const loadAttempts = ref([]);
const allLoaded = ref(false);
const initialLoading = ref(true);
const maxRetries = 3;
const iframeTimeoutDuration = 5000;

let loadedChunks = 0;

// Load a chunk of iframes
const loadIframeChunk = (startIndex) => {
    const endIndex = Math.min(props.iframeList.length, startIndex + chunkSize.value);

    for (let i = startIndex; i < endIndex; i++) {
        // Check if this iframe has already been loaded or has an error
        if (loading.value[i] === undefined && error.value[i] === undefined) {
            loading.value[i] = true; // Mark as loading
            loadAttempts.value[i] = 0; // Reset attempts
            visibleIframes.value.push(props.iframeList[i]); // Prepare to display
            loadIframeWithTimeout(i); // Start loading
        }
    }
};

// Handle successful iframe load
const handleIframeLoad = (index) => {
    loading.value[index] = false; // Mark as loaded
    error.value[index] = false; // No error
    console.log(`Iframe at index ${index} loaded successfully`); // Debug log
    loadNextChunk(); // Load the next chunk if available
};

// Handle iframe error
const handleIframeError = (index) => {
    loading.value[index] = false; // Mark as not loading
    error.value[index] = true; // Mark as error
    console.log(`Error loading iframe at index ${index}`); // Debug log

    if (loadAttempts.value[index] < maxRetries) {
        loadAttempts.value[index]++;
        const waitTime = Math.pow(2, loadAttempts.value[index]) * 100; // Exponential backoff
        setTimeout(() => {
            loadIframeWithTimeout(index); // Retry loading
        }, waitTime);
    } else {
        // If max retries reached, no further attempts
        console.log(`Max retries reached for iframe at index ${index}`);
    }
};

// Load iframes with timeout
const loadIframeWithTimeout = (index) => {
    const timeoutId = setTimeout(() => {
        handleIframeError(index); // Call error handler on timeout
    }, iframeTimeoutDuration);

    // Simulate loading time (you may replace this with actual loading logic)
    setTimeout(() => {
        clearTimeout(timeoutId);
        handleIframeLoad(index); // Simulate successful load
    }, 100);
};

const loadNextChunk = () => {
    if (loadedChunks * chunkSize.value >= props.iframeList.length) {
        allLoaded.value = true; // All iframes have been loaded
        initialLoading.value = false; // Stop initial loading message
        console.log('All iframes have been loaded.'); // Debug log
        return;
    }

    const nextChunkStart = loadedChunks * chunkSize.value;
    loadIframeChunk(nextChunkStart); // Load the next chunk
    loadedChunks++; // Increment the loaded chunk counter
};

onMounted(() => {
    chunkSize.value = Math.ceil(window.innerHeight / 300); // Adjust chunk size based on viewport

    if (props.iframeList.length > 0) {
        loadNextChunk(); // Start loading the first chunk
    }
});

watch(() => props.iframeList, (newList) => {
    // Reset state when iframeList changes
    visibleIframes.value = [];
    loading.value = [];
    error.value = [];
    loadAttempts.value = [];
    allLoaded.value = false;
    initialLoading.value = true;
    loadedChunks = 0; // Reset chunk counter

    if (newList.length > 0) {
        loadNextChunk(); // Start loading new iframes
    }
}, { immediate: true });
</script>

<style scoped>
.no-content {
    text-align: center;
    font-size: 1.2rem;
    margin: 20px 0;
}

.loading-overlay {
    text-align: center;
    font-size: 1.2rem;
    margin: 20px 0;
}

.loading-complete {
    text-align: center;
    font-size: 1.2rem;
    margin: 20px 0;
}

.loading-spinner {
    font-size: 1rem;
    color: #888;
}

.error-message {
    color: red;
    margin-top: 10px;
}

.iframe-container {
    margin-bottom: 20px;
}
</style>
