<template>
    <div>
        <!-- Global loading spinner (shown if any iframe is still loading) -->
        <div v-if="globalLoading" class="global-loading-spinner">
            <!-- <span>Loading</span> -->
            <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
        </div>

        <!-- Iframes -->
        <div v-for="(iframe, index) in iframes" :key="index" class="iframe-wrapper">
            <div class="iframe-container">
                <iframe :id="`_${iframe.itemId}`" :src="iframe.src" style="width: 100%; min-height: 30vh;"
                    @error="onIframeError(index)" loading="lazy">
                </iframe>

                <div v-if="iframe.status === 'loading'" class="loading-spinner"></div>
                <div v-if="iframe.status === 'error'" class="error-message">
                    Loading content<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                    <button :disabled="iframe.status === 'loading'" @click="retryIframe(index)">Reload</button>
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

// Initialize iframes with default statuses
const iframes = ref(props.iframeList.map(iframe => ({
    ...iframe,
    status: 'loading',
    hasRetried: false,
    timeoutId: null,
})));

// Global loading state: true if any iframe is still loading
const globalLoading = computed(() => iframes.value.some(iframe => iframe.status === 'loading'));

// Timeout duration (10 seconds)
const TIMEOUT_DURATION = 30000;

// Start timeout for each iframe
function startIframeTimeout(index) {
    iframes.value[index].timeoutId = setTimeout(() => {
        if (iframes.value[index].status === 'loading') {
            console.log(`Iframe ${index} timed out.`);
            iframes.value[index].status = 'error'; // Mark as error if still loading
        }
    }, TIMEOUT_DURATION);
}

// Clear timeout for successful loads
function clearIframeTimeout(index) {
    if (iframes.value[index].timeoutId) {
        clearTimeout(iframes.value[index].timeoutId);
        iframes.value[index].timeoutId = null; // Reset timeoutId after clearing
    }
}

// Handle messages from iframes
function handlePostMessage(event) {
    if (event.data.status === 'loaded') {
        const iframeIndex = iframes.value.findIndex((iframe) => iframe.itemId === `${event.data.id}`);
        if (iframeIndex !== -1) {
            iframes.value[iframeIndex].status = 'loaded';  // Mark as loaded
            clearIframeTimeout(iframeIndex);  // Clear the timeout on successful load
            console.log(`[---] Cross-origin Iframe [${iframeIndex}] fully [${iframes.value[iframeIndex].status}].`);
        }
    }
}

// Handle iframe error
function onIframeError(index) {
    console.log(`Error loading iframe ${index}`);
    iframes.value[index].status = 'error'; // Mark as error
    clearIframeTimeout(index);  // Clear timeout on error
}

// Retry loading the iframe
function retryIframe(index) {
    if (!iframes.value[index].hasRetried) {
        iframes.value[index].hasRetried = true; // Mark as retried
        iframes.value[index].status = 'loading'; // Set to loading
        startIframeTimeout(index); // Start new timeout
        // Reload the iframe
        iframes.value[index].src = `${host}/article/${iframes.value[index].itemId}/embed`;
    }
}

// Initialize loading
onMounted(() => {
    iframes.value.forEach((iframe, index) => {
        startIframeTimeout(index); // Start timeout for each iframe
    });

    // Listen for postMessages from the iframe
    window.addEventListener('message', handlePostMessage);
});

// Watch for changes in iframeList prop
watch(() => props.iframeList, (newIframeList) => {
    iframes.value = newIframeList.map(iframe => ({
        ...iframe,
        status: 'loading',
        hasRetried: false,
        timeoutId: null,
        src: `${host}/article/${iframe.itemId}/embed`, // Set the source URL
    }));
});

</script>

<style scoped>
.iframe-container {
    position: relative;
    width: 100%;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    margin-bottom: 20px;
    min-height: 30vh;
}

.loading-spinner,
.status-message,
.error-message {
    position: absolute;
    top: 20px;
    left: 47%;
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
</style>

<style scoped>
.global-loading-spinner {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2em;
    color: #3498db;
}

.dot {
    animation: blink 1.2s infinite;
    font-size: 1.2em;
    /* color: #3498db; */
}

@keyframes blink {
    0% {
        opacity: 0.2;
    }

    20% {
        opacity: 1;
    }

    100% {
        opacity: 0.2;
    }
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}
</style>