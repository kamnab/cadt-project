<template>
    <div :aria-label="`Iframe for article ${props.itemId}`" tabindex="0" class="iframe-wrapper" role="region">
        <iframe tabindex="-1" :id="`_${props.itemId}`" ref="iframeElement" class="lazy-iframe" style="width: 100%;"
            frameborder="0" loading="lazy" @load="handleLoad" @error="handleError">
        </iframe>

        <div v-if="props.isPin" class="position-absolute top-0 end-0 pe-2">
            <i class="bi bi-pin-angle"></i>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;

const props = defineProps({
    itemId: String,
    isPin: Boolean
});

// Declare the custom events the component can emit
const emit = defineEmits(['iframe-loaded', 'iframe-error']);

const iframeElement = ref(null);
let observer;

// Function to set the iframe src when it is in the viewport
const loadIframe = () => {
    if (iframeElement.value) {
        iframeElement.value.src = `${host}/embed/article/${props.itemId}`;
    }
};

// Event handler for iframe load
const handleLoad = () => {
    console.log('Iframe loaded:', props.itemId);
    emit('iframe-loaded'); // Emit the loaded event
};

// Event handler for iframe error
const handleError = () => {
    console.log('Error loading iframe:', props.itemId);
    emit('iframe-error'); // Emit error event
};

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadIframe(); // Load iframe when it's in the viewport
                observer.unobserve(iframeElement.value); // Stop observing once loaded
            }
        });
    });

    if (iframeElement.value) {
        observer.observe(iframeElement.value);
    }
});

onBeforeUnmount(() => {
    if (observer && iframeElement.value) {
        observer.unobserve(iframeElement.value);
    }
});
</script>

<style scoped>
.lazy-iframe {
    margin-bottom: 20px;
}
</style>
