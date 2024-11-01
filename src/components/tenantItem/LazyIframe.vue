<template>
    <iframe v-bind="iframeAttrs" ref="iframeElement" class="lazy-iframe" style="width: 100%;" frameborder="0"
        loading="lazy"></iframe>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    iframeList: []
});

const iframeElement = ref(null);
let observer;

const loadIframe = () => {
    if (iframeElement.value) {
        iframeElement.value.src = props.src;
    }
};

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadIframe();
                observer.unobserve(iframeElement.value);  // Stop observing once loaded
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