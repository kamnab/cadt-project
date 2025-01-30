<template>
    <iframe id="__update" ref="iframeEdit" :src="iframeEditSrc" style="width: 100%;height: 100%;"
        frameborder="0"></iframe>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { loggedInUser } from '@/services/authService';

import { useAppGlobalStore } from '@/stores/appGlobalStore'
const appGlobalStore = useAppGlobalStore()

const props = defineProps({
    itemId: String
});

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;

const iframeEdit = ref(null);
const iframeEditSrc = ref(null); // Change iframeEditSrc to a ref

// Watch for changes to prop and update local state
watch(() => props.itemId, async (newValue) => {
    const user = await loggedInUser();
    const token = user.access_token;
    appGlobalStore.setLoading(true)

    iframeEditSrc.value = `${host}/embed/article/edit/${newValue}?update=true&x_token=${encodeURIComponent(token)}`;
});

onMounted(async () => {
    // Add the event listener when the component is mounted
    window.addEventListener('message', handleMessage);
    const newIframe = iframeEdit.value;
    if (newIframe) {
        newIframe.onload = async () => {
            await handleIframeEditOnLoad();
        };
    }

    makeModalBodyFullHeight();

    // Call the function initially and on window resize
    //window.addEventListener('resize', handleIframeEditOnLoad);
    //document.getElementById('modal_article_edit').addEventListener('shown.bs.modal', handleIframeEditOnLoad);
});

async function handleIframeEditOnLoad() {
    const newIframe = iframeEdit.value;
    if (newIframe && newIframe.contentWindow) {

        postMessageToIframe(newIframe, await loggedInUser());
    } else {
        console.error('Iframe does not have contentWindow:', newIframe);
    }
}

const postMessageToIframe = async (iframe, user) => {
    if (iframe && iframe.contentWindow) {
        const modal = document.querySelector('#modal_article_edit');
        const modalBody = modal.querySelector('.modal-body');

        const modalBodyStyles = window.getComputedStyle(modalBody);
        const modalBodyHeight = modalBody.offsetHeight; // height including padding
        const marginTop = parseInt(modalBodyStyles.marginTop);
        const marginBottom = parseInt(modalBodyStyles.marginBottom);
        const totalHeight = modalBodyHeight + marginTop + marginBottom;

        const targetOrigin = '*';
        const message = {
            token: user.access_token,
            email: user.profile.name,
            userId: user.profile.sub,
            innerHeight: totalHeight,
            innerWidth: window.innerWidth,
        };

        iframe.contentWindow.postMessage(message, targetOrigin);
    } else {
        console.error('Iframe does not have contentWindow:', iframe);
    }
};

async function handleMessage(event) {
    //console.log(event.data);

    const iframeId = event.data.id;
    if (iframeId === '_update') {
        const iframe = document.getElementById('_' + iframeId);
        if (iframe && event.data.height) {
            iframe.style.height = '98%'; //event.data.height + 'px';

            //postMessageToIframe(iframe, await loggedInUser());
        }

        if (event.data.closeModal) {
            const modalElement = document.querySelector('#modal_article_edit');

            // Ensure the modal exists before attempting to dismiss it
            if (modalElement) {
                //const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                //modalInstance.hide();
                iframeEdit.value.contentWindow.postMessage({ id: '_update', reload: 'reload' }, '*')
            }
        }

        iframe.setAttribute('status', 'loaded'); // Add the status attribute
        appGlobalStore.setLoading(false)
    }
}

function makeModalBodyFullHeight() {
    const modal = document.querySelector('#modal_article_edit');
    const modalBody = modal.querySelector('.modal-body');

    // Apply full height to modal body
    modalBody.style.height = 'calc(100vh - 90px)';
    modalBody.style.overflowY = 'auto'; // Add scroll if needed
}

</script>