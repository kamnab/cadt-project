<template>
    <div>
        <!-- Global loading message with rotating circle -->
        <div v-if="globalLoading" class="global-loading-spinner text-muted">
            <div class="spinner-circle"></div>
            <!-- Loading -->
        </div>

        <!-- Iframes -->
        <div v-for="(iframe, index) in iframes" :key="index" class="iframe-wrapper">
            <div class="iframe-container">
                <!-- Iframe element with loading/error handlers -->
                <iframe :id="`_${iframe.itemId}`" :src="`${host}/article/${iframe.itemId}/embed`"
                    style="width: 100%;height: 50vh;" v-show="iframe.status !== 'error'"
                    :class="{ 'loading': iframe.status === 'loading', 'error': iframe.status === 'error' }"
                    @load="onIframeLoad(index)" @error="onIframeError(index)" loading="lazy" ref="iframe">
                </iframe>

                <!-- Loading indicator for individual iframe -->
                <div v-if="iframe.status === 'loading'" class="loading-spinner">
                    <!-- Loading... -->
                </div>

                <!-- Loaded status message -->
                <!-- <div v-if="iframe.status === 'loaded'" class="status-message">
                    Loaded successfully.
                </div> -->

                <!-- Error indicator and retry button -->
                <div v-if="iframe.status === 'error'" class="error-message">
                    Failed to load content.
                    <button :disabled="iframe.status === 'loading'" @click="retryIframe(index)">Retry</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;

const props = defineProps({
    iframeList: {
        type: Array,
        required: true,
    },
});

// Clone the iframeList prop to track each iframe's load status
const iframes = ref(
    props.iframeList.map((iframe) => ({
        ...iframe,
        status: 'loading', // Initially mark all as 'loading'
    }))
);

// Global loading state: true if any iframe is still loading
const globalLoading = computed(() => {
    return iframes.value.some(iframe => iframe.status === 'loading');
});

// Settings
const batchSize = 2; // Number of iframes to load per batch
let currentIndex = 0; // Keep track of the current batch index

// Load the next batch of iframes
function loadNextBatch() {
    const nextBatch = iframes.value.slice(currentIndex, currentIndex + batchSize);
    nextBatch.forEach((iframe, index) => {
        iframes.value[currentIndex + index].status = 'loading'; // Set status to loading
    });
    currentIndex += batchSize;

    // If there are more iframes to load, continue after a delay
    if (currentIndex < iframes.value.length) {
        setTimeout(loadNextBatch, 1000); // Adjust the delay if needed
    }
}

// Iframe load event handler
function onIframeLoad(index) {
    // iframes.value[index].style.height = '50vh';

    // const iframe = document.querySelectorAll('iframe')[index];

    // Check if it's cross-origin and handle accordingly
    try {
        // const iframeDocument = iframe.contentDocument;
        // if (iframeDocument.readyState === 'complete') {
        //     iframes.value[index].status = 'loaded'; // Mark as fully loaded
        //     console.log(`Iframe ${index} fully loaded with content.`);
        // }
    } catch (error) {
        // Cross-origin iframe handling
        //console.log('Cross-origin iframe loaded, cannot access content.');
        //iframes.value[index].status = 'loaded'; // Assume it's fully loaded for cross-origin iframes
    }
}

// Iframe error event handler
function onIframeError(index) {
    console.log(`Error loading iframe ${index}`);
    iframes.value[index].status = 'error'; // Mark as error
}

// Throttled retry mechanism with delay
let retryTimeout = null;

function retryIframe(index) {
    if (retryTimeout) {
        clearTimeout(retryTimeout);
    }

    retryTimeout = setTimeout(() => {
        iframes.value[index].status = 'loading'; // Set iframe to loading
        const iframe = document.querySelectorAll('iframe')[index];
        iframe.src = `${host}/article/${iframes.value[index].itemId}/embed`; // Reload iframe
    }, 1000); // Add a 1-second delay to avoid multiple retries in quick succession
}

// Start loading the first batch on mount
onMounted(() => {
    loadNextBatch();
});

// Watch for changes in the iframeList prop
watch(
    () => props.iframeList,
    (newIframeList) => {
        iframes.value = newIframeList.map((iframe) => ({
            ...iframe,
            status: 'loading',
        }));
        currentIndex = 0;
        loadNextBatch();
    },
    { deep: true }
);

// Listen for postMessages from the iframe (if it's same-origin)
window.addEventListener('message', (event) => {
    if (event.data.status === 'loaded') {
        const iframeIndex = iframes.value.findIndex((iframe) => iframe.itemId === `${event.data.id}`);
        if (iframeIndex !== -1) {
            iframes.value[iframeIndex].status = 'loaded';
            console.log(`[---] Cross-origin Iframe [${iframeIndex}] fully [${iframes.value[iframeIndex].status}] with content.`);
        }
    }
});
</script>

<style scoped>
.iframe-container {
    position: relative;
    width: 100%;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    margin-bottom: 20px;
}

.loading-spinner,
.status-message,
.error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #333;
    opacity: 0.3;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

.global-loading-spinner {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2em;
    color: #3498db;
}

.spinner-circle {
    width: 20px;
    height: 20px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    opacity: .5;
}

.status-message {
    color: green;
}

.error-message {
    color: red;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

button:hover {
    background-color: #d32f2f;
}

button:disabled {
    background-color: grey;
    cursor: not-allowed;
}

iframe.loading {
    opacity: 0.5;
}

iframe.error {
    /* display: none; */
}
</style>
