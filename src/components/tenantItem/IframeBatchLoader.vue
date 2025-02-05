<template>
    <div>

        <div class="card mb-8" v-if="appGlobalStore.globalLoading && !appGlobalStore.iframeEditModalOpen">
            <div class="card-body">
                <h5 class="text-muted">កំពុងទាញទិន្នន័យ<span class="dot">.</span><span class="dot">.</span><span
                        class="dot">.</span></h5>
            </div>
        </div>

        <div class="card mb-5" v-if="!appGlobalStore.globalLoading && props.iframeList.length == 0">
            <div class="card-body">
                <h5 class="">មិនមានទិន្នន័យ!</h5>
            </div>
        </div>

        <!-- Iframes -->
        <div v-for="(iframe, index) in props.iframeList" :key="index" :id="`__${iframe.itemId}`" class="iframe-wrapper">
            <div class="iframe-container">
                <iframe :id="`_${iframe.itemId}`" :src="iframe.src" loading="eager" scrolling="no"
                    style="width: 100%; min-height: 30vh;opacity: 0.15;" @error="onIframeError(index)"
                    @load="setupMessageListener">
                </iframe>

                <!-- Show loading spinner while iframe is loading -->
                <div v-if="iframe.status === 'loading'" class="loading-spinner"></div>

                <!-- Show error message and retry button when loading fails after retries -->
                <div class="error-message d-flex justify-content-end">
                    <!-- Add debug logs -->
                    <!-- <p>Status: {{ iframe.status }} | Retry Offered: {{ iframe.hasOfferedRetry }}</p> -->
                    <div class="d-flex align-items-center">
                        <div v-if="iframe.status === 'error' && iframe.hasOfferedRetry" class="me-10">
                            Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                        </div>

                    </div>

                </div>
                <div style="position: absolute;right: 0; top: -10px;">
                    <div class="dropdown">
                        <button class="dropdown-toggle p-2"
                            style="background-color: transparent; color: blue; opacity: 0.3;" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <button
                                    v-if="(iframe.status === 'error' && iframe.hasOfferedRetry) || iframe.status === 'loaded'"
                                    class="btn btn-sm btn-active-accent"
                                    style="background-color: white; color: black;display: flex; align-items: center; padding-left: 20px;"
                                    :disabled="iframe.status === 'loading'" @click="manualRetryIframe(index)">
                                    <i class="bi bi-arrow-clockwise" style="transform: scale(1.2);"></i>
                                    Retry</button>
                            </li>
                            <li>
                                <button class="btn btn-sm btn-active-accent"
                                    style="background-color: white; color: black;display: flex;align-items: center;padding-left: 20px;"
                                    aria-expanded="false" data-bs-toggle="modal"
                                    data-bs-target="#modal_tenant_categories" :data-my-item-id="iframe.itemId">
                                    <i class="bi bi-plus-circle" style="transform: scale(1);"></i>
                                    Add to</button>
                                <!-- <TenantItemDropdownMenu :categories="props.categories"
                                    :selected-category-id="props.selectedCategoryId" :iframe-id="iframe.id">
                                </TenantItemDropdownMenu> -->
                            </li>
                            <li>
                                <button class="btn btn-sm btn-active-accent"
                                    style="background-color: white; color: black;display: flex;align-items: center;padding-left: 20px;"
                                    aria-expanded="false" data-bs-toggle="modal" data-bs-target="#modal_article_edit"
                                    :data-my-item-id="iframe.itemId">
                                    <i class="bi bi-plus-circle" style="transform: scale(1);"></i>
                                    Edit</button>
                            </li>
                        </ul>
                    </div>
                </div>


                <div style="position: absolute; bottom: 350px;" :id="`goto_${iframe.itemId}`"></div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useAppGlobalStore } from '@/stores/appGlobalStore'
const appGlobalStore = useAppGlobalStore()

import { onMounted, watch, computed, ref, onBeforeMount } from 'vue';
import { debounce } from 'lodash';
const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;

const props = defineProps({
    iframeList: {
        type: Array,
        required: true,
    },
    categories: {
        type: Array,
        default: []
    },
    selectedCategoryId: String
});

// Maximum retries allowed
const MAX_RETRIES = 1;

// Timeout duration (15 seconds)
const TIMEOUT_DURATION = 15000;

// Update global loading state based on iframe loading status
const updateGlobalLoadingState = () => {
    const anyIframeLoading = props.iframeList.length == 0 || props.iframeList.some(iframe => iframe.status === 'loading' || iframe.status === 'error');

    appGlobalStore.setLoading(!(anyIframeLoading));
};

// Start timeout for each iframe
function startIframeTimeout(index) {
    // Ensure the iframe is not already loaded
    if (props.iframeList[index].status !== 'loaded') {
        // Clear any existing timeout before starting a new one
        clearIframeTimeout(index);

        // Start loading the iframe immediately
        props.iframeList[index].status = 'loading';
        props.iframeList[index].src = `${host}/embed/article/${props.iframeList[index].itemId}?retry=${props.iframeList[index].retryCount}`;

        //console.log(`[startIframeTimeout] Iframe ${index} loading started, retry: ${props.iframeList[index].retryCount}`);

        // Start a timeout to detect loading failure after TIMEOUT_DURATION
        props.iframeList[index].timeoutId = setTimeout(() => {
            if (props.iframeList[index].status === 'loading') {
                // Iframe is still in loading state after TIMEOUT_DURATION, mark as error
                //console.log(`[startIframeTimeout]-2 Iframe ${index} timed out with ${props.iframeList[index].retryCount} retries.`);
                if (props.iframeList[index].retryCount < MAX_RETRIES) {
                    //console.log(`[startIframeTimeout]-3A Iframe ${index}, automatic retry.`);
                    retryIframe(index); // Automatic retry
                } else {
                    props.iframeList[index].status = 'error'; // Mark as error after max retries
                    props.iframeList[index].hasOfferedRetry = true; // Offer retry button
                    //console.log(`[startIframeTimeout]-3B Iframe ${index} offered Retry button.`);
                }
            }
        }, TIMEOUT_DURATION); // Check for load failure after 5 seconds (5000ms)
    } else {
        console.log(`[startIframeTimeout] Iframe ${index} is already loaded. Timeout not started.`);
    }

    updateGlobalLoadingState();  // Update the global loading state after starting a timeout
}

// Clear timeout for successful loads
function clearIframeTimeout(index) {
    if (props.iframeList[index].timeoutId) {
        //console.log(`Clearing timeout for iframe ${index}, timeoutId: ${props.iframeList[index].timeoutId}, status: ${props.iframeList[index].status}`);
        clearTimeout(props.iframeList[index].timeoutId);
        props.iframeList[index].timeoutId = null;
        //console.log(`Timeout cleared for iframe ${index}, timeoutId reset to null`);

    }
}

// Handle iframe errors
function onIframeError(index) {
    console.log(`Error loading iframe ${index}`);
    props.iframeList[index].status = 'error'; // Mark as error
    clearIframeTimeout(index);  // Clear timeout on error

    updateGlobalLoadingState();  // Update global loading state on error
}

// Retry loading the iframe
function manualRetryIframe(index) {
    // this is do the trick to balance between service worker
    // network request first then fetch the update
    props.iframeList[index].retryCount = props.iframeList[index].retryCount == 0 ? 1 : 0;


    props.iframeList[index].status = 'loading'; // Set back to loading
    props.iframeList[index].hasOfferedRetry = false; // Hide retry button during retry
    props.iframeList[index].src = `${host}/embed/article/${props.iframeList[index].itemId}?retry=${props.iframeList[index].retryCount}`;

    // Start a new timeout for the retry
    startIframeTimeout(index);

    //console.log(`Retrying iframe ${index}...`);

}

// Retry loading the iframe
function retryIframe(index) {
    props.iframeList[index].retryCount++; // Increment retry count
    props.iframeList[index].status = 'loading'; // Set back to loading
    props.iframeList[index].hasOfferedRetry = false; // Hide retry button during retry
    props.iframeList[index].src = `${host}/embed/article/${props.iframeList[index].itemId}?retry=${props.iframeList[index].retryCount}`;

    // Start a new timeout for the retry
    startIframeTimeout(index);

    //console.log(`Retrying iframe ${index}...`);
}

// Debounce the handler for prop updates
const debouncedUpdateIframeList = debounce((newIframeList) => {
    const updatedIframes = newIframeList.map(newIframe => {
        // Find if the iframe already exists in the current list
        const existingIframe = props.iframeList.find(iframe => iframe.itemId === newIframe.itemId);

        if (existingIframe) {
            // If iframe exists, preserve its status and retry count
            return {
                ...existingIframe,
                src: `${host}/embed/article/${newIframe.itemId}`, // Update src if needed
            };
        } else {
            // If iframe is new, initialize with default loading state
            return {
                ...newIframe,
                src: `${host}/embed/article/${newIframe.itemId}`, // Set the source URL
                // ------ 
                status: 'loading',
                retryCount: 0, // Track retries
                hasOfferedRetry: false, // Control if retry button is shown
                timeoutId: null,
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

// Debounced handler for prop updates
watch(() => props.iframeList, (newIframeList) => {
    debouncedUpdateIframeList(newIframeList);
    updateGlobalLoadingState(); // Update global loading state when prop changes
});


const setupMessageListener = () => {
    window.addEventListener('message', (event) => {
        // Ensure the message is coming from the correct iframe domain
        //if (event.origin !== 'https://blog.codemie.dev') return;

        const { action, top, id } = event.data;

        if (action === 'scrollTo' && typeof top === 'number') {
            // Scroll the parent window based on the position of the element in the iframe
            // window.scrollTo({
            //     top: window.scrollY + top,  // Adjusting the scroll position
            //     behavior: 'smooth',
            // });

            scrollToSection(id)
        }
    });
};

const scrollToSection = (sectionId, offset = 90) => {
    const element = document.getElementById('goto' + sectionId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        // Smooth scroll with offset
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};

// Initialize loading
onMounted(() => {
    // props.iframeList.forEach((iframe, index) => {
    //     startIframeTimeout(index); // Start timeout for each iframe
    // });
    //updateGlobalLoadingState(); // Update global loading state after mount

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
.status-message {
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
    position: absolute;
    top: -10px;
    left: 0px;
    /* transform: translate(-50%, -50%); */
    font-weight: bold;
    color: #333;
    opacity: 0.3;

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