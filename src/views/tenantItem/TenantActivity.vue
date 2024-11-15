<script setup>
import TenantItemToolbar from '@/components/tenantItem/TenantItemToolbar.vue'
import TenantItemContentLeftSection from '@/components/tenantItem/TenantItemContentLeftSection.vue';
import { onMounted, onBeforeUnmount, ref, onBeforeMount, watch } from 'vue';
import { loggedInUser } from '@/services/authService';
import { RouterLink, useRoute } from 'vue-router';
import { getTenantById } from '@/services/tenantService'
import { getTenantItems, getTenantItemIdsByTerm, getTenantItemList } from '@/services/tenantItemService';
import IframeBatchLoader from '@/components/tenantItem/IframeBatchLoader.vue'

import { useTenantItemStore } from '@/stores/tenantItemStore'
const tenantItemStore = useTenantItemStore()
import { useAppGlobalStore } from '@/stores/appGlobalStore'
const appGlobalStore = useAppGlobalStore()

const route = useRoute()

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;
const tenantId = route.params.id;
const selectedTenant = ref({})
const iframeEdit = ref(null)
const iframeEditSrc = `${host}/embed/article/edit`;
const tenantItems = ref([])
const searchQuery = ref('');
const tenantItemList = ref([]); // The filtered tenants list

onBeforeMount(async () => {
	selectedTenant.value = await getTenantById(tenantId);

	// 
	if (iframeEdit.value) {
		iframeEdit.value.src = iframeEditSrc;
	}

	await loadTenantItems();
})

onMounted(async () => {
	appGlobalStore.setLoading(true);

	// Set iframe src early
	iframeEdit.value.src = iframeEditSrc;

	// Execute iframe handling on component mount
	//await handleIframes();

	// Add the event listener when the component is mounted
	window.addEventListener('message', handleMessage);

	const modalElement = document.querySelector('#modal_tenant');
	modalElement.addEventListener('show.bs.modal', async () => {
		appGlobalStore.setIframeEditModalOpen(true);
		appGlobalStore.setLoading(true);
		await handleIframeEditOnLoad()
	});
	modalElement.addEventListener('shown.bs.modal', async () => {
		const status = iframeEdit.value.getAttribute('status');
		if (status && status === 'loaded') {
			appGlobalStore.setLoading(false);
			appGlobalStore.setIframeEditModalOpen(false);
		}
	});

	/*
		Instead of relying on DOMContentLoaded, 
		it might be better to attach the onload event directly to the iframe in the modal, 
		to ensure that you interact with it only after it's completely loaded.
	*/
	const newIframe = iframeEdit.value;
	if (newIframe) {
		newIframe.onload = async () => {
			await handleIframeEditOnLoad();
		};
	}


	// for content listing
	const items = await getTenantItems(tenantId);
	const postIds = items.map((x) => x.itemId);
	console.log(postIds);
	tenantItemList.value = [...await getTenantItemList(postIds, tenantId)];

});

onBeforeUnmount(() => {
	window.removeEventListener('message', handleMessage);
	window.removeEventListener('DOMContentLoaded', handleIframeEditOnLoad);

	const modalElement = document.querySelector('#modal_tenant');
	modalElement.removeEventListener('show.bs.modal', handleIframeEditOnLoad);
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

	const iframeId = event.data.id;
	if (iframeId) {
		const iframe = document.getElementById('_' + iframeId);
		if (iframe && event.data.height) {
			iframe.style.height = event.data.height + 'px';
			var foundIframe = tenantItems.value.find((i) => i.itemId == iframeId);
			if (foundIframe) {
				foundIframe.status = 'loaded';
				//console.log(`[1-] ${foundIframe.id}` + event.data.status);
			}
			postMessageToIframe(iframe, await loggedInUser());
		}

		if (iframeId === '_edit') {
			iframeEdit.value.setAttribute('status', 'loaded'); // Add the status attribute
			appGlobalStore.setLoading(false)
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
		sortPin: item.sortPin,
		// ------------------------
		status: 'loading',
		retryCount: 0, // Track retries
		hasOfferedRetry: false, // Control if retry button is shown
		timeoutId: null,
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

	//console.log(tenantItems.value)
}

// Function to perform search action
const performSearch = async () => {
	appGlobalStore.setLoading(true);

	const items = await getTenantItems(tenantId);

	if (searchQuery.value === '') {
		// Map to get only the desired fields (e.g., 'name' and 'id')
		tenantItems.value = items.map(item => ({
			id: item._id,
			itemId: item.itemId, // replace with the actual field name
			isPin: item.isPin,
			sortPin: item.sortPin,
			// ------------------------
			status: 'loading',
			retryCount: 0, // Track retries
			hasOfferedRetry: false, // Control if retry button is shown
			timeoutId: null,
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

		//console.log(tenantItems.value)
	} else if (items.length > 0) {
		const postIds = items.map((x) => x.itemId);
		const filteredItems = await getTenantItemIdsByTerm(postIds, tenantId, searchQuery.value);

		// console.log('postIds for:', postIds);
		// console.log('items for:', filteredItems);
		// console.log('Searching for:', searchQuery.value);
		// You can implement the actual search logic here

		// Map to get only the desired fields (e.g., 'name' and 'id')
		tenantItems.value = items.filter(x => filteredItems.includes(x.itemId)).map(item => ({
			id: item._id,
			itemId: item.itemId, // replace with the actual field name
			isPin: item.isPin,
			sortPin: item.sortPin,
			// ------------------------
			status: 'loading',
			retryCount: 0, // Track retries
			hasOfferedRetry: false, // Control if retry button is shown
			timeoutId: null,
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


const scrollToSection = (sectionId, offset = 90) => {
	const element = document.getElementById(sectionId);
	if (element) {
		const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
		const offsetPosition = elementPosition - offset;

		// Smooth scroll with offset
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	}
};



</script>

<template>

	<div class="d-flex flex-column flex-column-fluid">
		<!--begin::toolbar-->
		<TenantItemToolbar :selected-tenant="selectedTenant">

		</TenantItemToolbar>
		<!--end::toolbar-->

		<!--begin::Content-->
		<div class="content d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
			<!--begin::Container-->
			<div class="container">

				<!--begin::Row-->
				<div class="row g-0 g-xl-5 g-xxl-8">
					<div class="col-xl-4 d-none d-xl-block">

						<TenantItemContentLeftSection :active-section="1"></TenantItemContentLeftSection>

						<!--begin::Stats Widget 8-->
						<div id="tenant-content" class="card mb-5 mb-xxl-8"
							style="position: sticky; top: 80px; max-height: 85vh; overflow-y: auto;">
							<div class="card-header">
								<h3 class="my-6 mb-0 text-gray-700">ចំណងជើងមាតិកា</h3>
							</div>
							<!--begin::Body-->
							<div class="card-body pt-0">
								<div class="table table-sm">
									<tbody>
										<tr v-for="(item, index) in tenantItemList">
											<td style="width:1%;" class="px-0">{{ index + 1 }}.</td>
											<td class="border-bottom ps-1">
												<button @click="scrollToSection(`__${item.id}`)"
													class="fw-normal text-gray-800 btn btn-link p-0 text-start">{{
														item.title
													}}</button>
											</td>
										</tr>
									</tbody>
								</div>

							</div>
							<!--end::Body-->
							<!--begin::Footer-->
							<!-- <div class="card-footer border-0 pt-0 pb-10">

							</div> -->
							<!--end::Footer-->
						</div>
						<!--end::Stats Widget 8-->

					</div>

					<div class="col-xl-8">

						<div>
							<!-- Smooth Transition for Search Input -->
							<transition name="fade">
								<div v-if="tenantItemStore.toggleSearch" class="input-group mt-3 mb-6">
									<input type="text" v-model="searchQuery" @keyup.enter="performSearch"
										class="form-control py-1 py-2" placeholder="..." />
									<button @click="performSearch" class="btn btn-primary">
										ស្វែងរក
									</button>
								</div>
							</transition>
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
								<iframe id="__edit" ref="iframeEdit" style="width: 100%;" frameborder="0"
									loading="lazy"></iframe>

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

<style scoped>
/* Smooth fade transition */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>