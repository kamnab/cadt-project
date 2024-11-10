<template>
    <div>

        <div class="card" v-if="props.iframeList.length == 0 && allIframesLoaded">
            <div class="card-body" v-if="!appGlobalStore.globalLoading">
                <h4 class="text-danger">ស្វែងរកមិនឃើញ!</h4>
            </div>
        </div>

        <!-- Iframes -->
        <div v-for="(iframe, index) in props.iframeList" :key="index" class="iframe-wrapper">
            <div class="iframe-container">
                <iframe :id="`_${iframe.itemId}`" :src="iframe.src" style="width: 100%; min-height: 30vh;"
                    @error="onIframeError(index)" loading="lazy">
                </iframe>

                <!-- Show loading spinner while iframe is loading -->
                <div v-if="iframe.status === 'loading'" class="loading-spinner"></div>

                <!-- Show error message and retry button when loading fails after retries -->
                <div v-if="iframe.status === 'error' && iframe.hasOfferedRetry"
                    class="error-message d-flex justify-content-end">
                    <!-- Add debug logs -->
                    <!-- <p>Status: {{ iframe.status }} | Retry Offered: {{ iframe.hasOfferedRetry }}</p> -->
                    <div>
                        Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                        <button style="background-color: white; color: black;" :disabled="iframe.status === 'loading'"
                            @click="retryIframe(index)">Reload</button>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

import { useAppGlobalStore } from '@/stores/appGlobalStore'
const appGlobalStore = useAppGlobalStore()

import { onMounted, watch, computed, ref } from 'vue';
import { debounce } from 'lodash';
const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;

const props = defineProps({
    iframeList: {
        type: Array,
        required: true,
    },
});

// Maximum retries allowed
const MAX_RETRIES = 1;

// Timeout duration (0.1 seconds)
const TIMEOUT_DURATION = 100;

// Start timeout for each iframe
function startIframeTimeout(index) {
    // Ensure the iframe is not already loaded
    if (props.iframeList[index].status !== 'loaded') {
        // Clear any existing timeout before starting a new one
        clearIframeTimeout(index);

        console.log(`[startIframeTimeout]-1 Iframe ${index}, status: ${props.iframeList[index].status}, retry: ${props.iframeList[index].retryCount}`);
        props.iframeList[index].timeoutId = setTimeout(() => {
            if (props.iframeList[index].status === 'loading') {
                console.log(`[startIframeTimeout]-2 Iframe ${index} timed out with ${props.iframeList[index].retryCount} retries.`);
                if (props.iframeList[index].retryCount < MAX_RETRIES) {
                    console.log(`[startIframeTimeout]-3A Iframe ${index}, automatic retry.`);
                    retryIframe(index); // Automatic retry
                } else {
                    props.iframeList[index].status = 'error'; // Mark as error after max retries
                    props.iframeList[index].hasOfferedRetry = true; // Offer retry button
                    console.log(`[startIframeTimeout]-3B Iframe ${index} offered Retry button.`);
                }
            }
        }, TIMEOUT_DURATION);
    } else {
        console.log(`[startIframeTimeout] Iframe ${index} is already loaded. Timeout not started.`);
    }

    //updateGlobalLoadingState();  // Update the global loading state after starting a timeout
}

// Clear timeout for successful loads
function clearIframeTimeout(index) {
    if (props.iframeList[index].timeoutId) {
        console.log(`Clearing timeout for iframe ${index}, timeoutId: ${props.iframeList[index].timeoutId}, status: ${props.iframeList[index].status}`);
        clearTimeout(props.iframeList[index].timeoutId);
        props.iframeList[index].timeoutId = null;
        console.log(`Timeout cleared for iframe ${index}, timeoutId reset to null`);
    }
}

// Handle iframe errors
function onIframeError(index) {
    console.log(`Error loading iframe ${index}`);
    props.iframeList[index].status = 'error'; // Mark as error
    clearIframeTimeout(index);  // Clear timeout on error

    //updateGlobalLoadingState();  // Update global loading state on error
}

// Retry loading the iframe
function retryIframe(index) {
    props.iframeList[index].retryCount++; // Increment retry count
    props.iframeList[index].status = 'loading'; // Set back to loading
    props.iframeList[index].hasOfferedRetry = false; // Hide retry button during retry
    props.iframeList[index].src = `${host}/article/${props.iframeList[index].itemId}/embed?retry=${props.iframeList[index].retryCount}`;

    // Start a new timeout for the retry
    startIframeTimeout(index);

    console.log(`Retrying iframe ${index}...`);
}

// Initialize loading
onMounted(() => {
    props.iframeList.forEach((iframe, index) => {
        startIframeTimeout(index); // Start timeout for each iframe
    });
    //updateGlobalLoadingState(); // Update global loading state after mount
});

// Debounce the handler for prop updates
const debouncedUpdateIframeList = debounce((newIframeList) => {
    const updatedIframes = newIframeList.map(newIframe => {
        // Find if the iframe already exists in the current list
        const existingIframe = props.iframeList.find(iframe => iframe.itemId === newIframe.itemId);

        if (existingIframe) {
            // If iframe exists, preserve its status and retry count
            return {
                ...existingIframe,
                src: `${host}/article/${newIframe.itemId}/embed`, // Update src if needed
            };
        } else {
            // If iframe is new, initialize with default loading state
            return {
                ...newIframe,
                src: `${host}/article/${newIframe.itemId}/embed`, // Set the source URL
            };
        }
    });

    // Replace iframes list with updated data
    //props.iframeList = updatedIframes;

    // Start timeout for any newly added iframes
    updatedIframes.forEach((iframe, index) => {
        if (iframe.status === 'loading' && !iframe.timeoutId) {
            startIframeTimeout(index); // Only start timeout if it's still loading
        } else if (iframe.status === 'loaded') {
            clearIframeTimeout(index);
        }
    });

}, 300); // Adjust the delay as needed

// Computed property to check if all iframes are loaded
const allIframesLoaded = computed(() => {
    return props.iframeList.every(iframe => iframe.status === 'loaded');
});

// Watch for changes in iframe loading status and update global loading
watch(allIframesLoaded, (newValue) => {
    appGlobalStore.setLoading(!(newValue)); // If all are loaded, set global loading to false
});

// Debounced handler for prop updates
watch(() => props.iframeList, (newIframeList) => {
    debouncedUpdateIframeList(newIframeList);
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
    pointer-events: none;
    /* This ensures it doesn't block interactions */
}

.status-message {
    color: green;
}

.error-message {
    width: 100%;
    /* color: red; */
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
