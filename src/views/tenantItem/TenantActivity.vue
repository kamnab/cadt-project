<script setup>
import TenantItemToolbar from '@/components/tenantItem/TenantItemToolbar.vue'
import TenantItemContentLeftSection from '@/components/tenantItem/TenantItemContentLeftSection.vue';
import { onMounted, onBeforeUnmount, ref, onBeforeMount } from 'vue';
import { loggedInUser } from '@/services/authService';
import { RouterLink, useRoute } from 'vue-router';
import { getTenantItems, getTenantItemIdsByTerm } from '@/services/tenantItemService';
import IframeBatchLoader from '@/components/tenantItem/IframeBatchLoader.vue'

import { useTenantItemStore } from '@/stores/tenantItemStore'
const tenantItemStore = useTenantItemStore()

const route = useRoute()

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;
const tenantId = route.params.id;
const iframeEdit = ref(null)
const iframeEditSrc = `${host}/embed/article/edit`;
const tenantItems = ref([])

onBeforeMount(async () => {
	await loadTenantItems();

	// Set iframe src early
	iframeEdit.value.src = iframeEditSrc;
})

onMounted(() => {
	// Execute iframe handling on component mount
	//await handleIframes();

	// Add the event listener when the component is mounted
	window.addEventListener('message', handleMessage);

	const modalElement = document.querySelector('#modal_tenant');
	modalElement.addEventListener('show.bs.modal', handleIframeEditOnLoad);

	// Ensure iframe is ready by posting message as soon as the DOM is ready
	window.addEventListener('DOMContentLoaded', async () => {
		handleIframeEditOnLoad();
	});
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
		postMessageToIframe(newIframe, await loggedInUser());
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
		isPin: item.isPin,
		sortPin: item.sortPin
	}))
		/*
			a.isPin === b.isPin ? 0: 
			_ If both isPin values are the same, they stay in the same order.
			
			a.isPin ? -1 : 1: 
			_ If a.isPin is true, it comes before b.isPin. 
				If a.isPin is false, it comes after b.isPin.
		*/
		// Sort with true first (even though it's called ascending)
		.sort((a, b) => a.isPin === b.isPin ? 0 : a.isPin ? -1 : 1);

	console.log(tenantItems.value)
}

const searchQuery = ref('');

// Function to perform search action
const performSearch = async () => {
	if (searchQuery.value === '') {
		loadTenantItems();
	} else {
		const postIds = tenantItems.value.map((x) => x.itemId);
		const items = await getTenantItemIdsByTerm(postIds, searchQuery.value);

		console.log('items for:', itemIds);
		console.log('items for:', items);
		console.log('Searching for:', searchQuery.value);
		// You can implement the actual search logic here

		// Map to get only the desired fields (e.g., 'name' and 'id')
		tenantItems.value = items.map(item => ({
			id: item._id,
			itemId: item.itemId, // replace with the actual field name
			isPin: item.isPin,
			sortPin: item.sortPin
		}))
			/*
				a.isPin === b.isPin ? 0: 
				_ If both isPin values are the same, they stay in the same order.
				
				a.isPin ? -1 : 1: 
				_ If a.isPin is true, it comes before b.isPin. 
					If a.isPin is false, it comes after b.isPin.
			*/
			// Sort with true first (even though it's called ascending)
			.sort((a, b) => a.isPin === b.isPin ? 0 : a.isPin ? -1 : 1);
	}

};

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

						<div>
							<!-- Search box with a search button -->
							<div v-if="tenantItemStore.toggleSearch" class="input-group mt-3 mb-6">
								<input type="text" v-model="searchQuery" class="form-control" placeholder="Search..." />
								<button @click="performSearch" class="btn btn-primary">Search</button>
							</div>
						</div>

						<IframeBatchLoader :iframe-list="tenantItems"></IframeBatchLoader>

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
