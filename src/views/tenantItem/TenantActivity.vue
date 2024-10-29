<script setup>
import TenantItemToolbar from '@/components/tenantItem/TenantItemToolbar.vue'
import TenantItemContentLeftSection from '@/components/tenantItem/TenantItemContentLeftSection.vue';
import { onMounted, onBeforeUnmount, ref, onBeforeMount } from 'vue';
import { loggedInUser } from '@/services/authService';
import { RouterLink, useRoute } from 'vue-router';
import { getTenantItems } from '@/services/tenantItemService';

const route = useRoute()

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;
const tenantId = route.params.id;
const iframeEdit = ref(null)
const iframeEditSrc = `${host}/embed/article/edit`;
const tenantItems = ref([])

onBeforeMount(async () => {
	await loadTenantItems();
})

onMounted(async () => {
	// Execute iframe handling on component mount
	//await handleIframes();

	// Add the event listener when the component is mounted
	window.addEventListener('message', handleMessage);

	const modalElement = document.querySelector('#modal_tenant');
	modalElement.addEventListener('show.bs.modal', handleIframeEditOnLoad);
});

onBeforeUnmount(() => {
	// Clean up the event listener when the component is unmounted
	window.removeEventListener('message', handleMessage);
});


// Function to post messages to the iframe
const postMessageToIframe = (iframe, user) => {
	if (iframe && iframe.contentWindow) {
		const targetOrigin = '*'; // Specify your target origin
		const message = {
			token: user.access_token,
			refreshToken: user.refresh_token,
			email: user.profile.name,
			userId: user.profile.sub,
			tenantId: tenantId,
		};
		//console.log('Posting message to iframe:', message);
		iframe.contentWindow.postMessage(message, targetOrigin);
	} else {
		console.error('Iframe does not have contentWindow:', iframe);
	}
};

async function handleMessage(event) {
	const url = event.data.url;
	if (url) {
		window.open(url, '_blank');  // Open the URL in a new tab
	} else {
		const iframe = document.getElementById('_' + event.data.id);

		if (iframe && event.data.height) {
			iframe.style.height = (event.data.height + 0) + 'px';

			postMessageToIframe(iframe, await loggedInUser());
		}

		if (event.data.closeModal) {

			const modalElement = document.querySelector('#modal_tenant');

			// Ensure the modal exists before attempting to dismiss it
			if (modalElement) {
				const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
				modalInstance.hide();
				iframeEdit.value.src = '';
				iframeEdit.value.src = iframeEditSrc;

				loadTenantItems();
			}
		}
		//console.log(event.data)
	}
}

async function handleIframeEditOnLoad() {
	const newIframe = iframeEdit.value;
	if (newIframe && newIframe.contentWindow) {
		const user = await loggedInUser();
		newIframe.contentWindow.postMessage({
			token: user.access_token,
			email: user.profile.name,
			tenantId: tenantId
		}, '*');
		console.log('send');
	} else {
		console.error('Iframe does not have contentWindow:', newIframe);
	}
}

async function loadTenantItems() {
	const items = await getTenantItems(tenantId);

	// Map to get only the desired fields (e.g., 'name' and 'id')
	tenantItems.value = items.map(item => ({
		id: item._id,
		itemId: item.itemId, // replace with the actual field name
	}));
}

async function handleIframes() {
	try {
		const user = await loggedInUser();
		var iframes = document.getElementsByTagName('iframe');

		for (let i = 0; i < iframes.length; i++) {
			const iframe = iframes[i];

			/* 
			// Add an event listener for the iframe load event
			1. Iframe Load Event: Listens for the load event to ensure that the iframe is fully loaded before attempting to send a message.
			*/
			iframe.addEventListener('load', () => {
				if (iframe.contentWindow) {
					iframe.contentWindow.postMessage({
						token: user.access_token,
						email: user.profile.name,
						tenantId: tenantId
					}, '*');
				} else {
					console.error('Iframe does not have contentWindow:', iframe);
				}
			});

			/* 
			// Optionally handle case where iframe is already loaded
			2. Already Loaded Iframe: Added a check for readyState === 'complete' to send the message to iframes that might already be fully loaded when the component is mounted.
			*/
			if (iframe.contentWindow && iframe.contentDocument.readyState === 'complete') {
				iframe.contentWindow.postMessage({
					token: user.access_token,
					email: user.profile.name,
					tenantId: tenantId
				}, '*');
			}
		}
	} catch (error) {
		console.error('Error fetching logged-in user or posting message to iframe:', error);
	}
}

</script>

<template>

	<div class="d-flex flex-column flex-column-fluid">
		<!--begin::toolbar-->
		<TenantItemToolbar>

		</TenantItemToolbar>
		<!--end::toolbar-->

		<!--begin::Content-->
		<div class="content fs-6 d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
			<!--begin::Container-->
			<div class="container">

				<!--begin::Row-->
				<div class="row g-0 g-xl-5 g-xxl-8">
					<div class="col-xl-4 d-none d-xl-block">

						<TenantItemContentLeftSection :active-section="1"></TenantItemContentLeftSection>

					</div>

					<div class="col-xl-8">
						<iframe v-for="(item, index) in tenantItems" :id="`_${item.itemId}`"
							:src="`${host}/article/${item.itemId}/embed`" :key="index" style="width: 100%;"
							frameborder="0" loading="lazy"></iframe>
					</div>
				</div>
				<!--end::Row-->

				<!--begin::Modal - Select Location-->
				<div class="modal fade" id="modal_tenant" data-bs-backdrop="static" tabindex="-1" role="dialog"
					aria-hidden="true">
					<div class="modal-dialog mw-800px modal-dialog-scrollable" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Add New</h5>
								<!--begin::Close-->
								<div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
									<!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
									<span class="svg-icon svg-icon-2x">
										<svg xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
											viewBox="0 0 24 24" version="1.1">
											<g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
												fill="#000000">
												<rect fill="#000000" x="0" y="7" width="16" height="2" rx="1" />
												<rect fill="#000000" opacity="0.5"
													transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
													x="0" y="7" width="16" height="2" rx="1" />
											</g>
										</svg>
									</span>
									<!--end::Svg Icon-->
								</div>
								<!--end::Close-->
							</div>
							<div class="modal-body pt-2 pb-0">
								<!-- <iframe :src="host" style="width: 100%;" frameborder="0" loading="lazy"></iframe> -->
								<iframe id="__edit" ref="iframeEdit" :src="iframeEditSrc" style="width: 100%;"
									frameborder="0" loading="lazy"></iframe>

							</div>

						</div>
					</div>
				</div>
				<!--end::Modal - Select Location-->
			</div>
			<!--end::Container-->
		</div>
		<!--end::Content-->
	</div>



</template>
