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

						<TenantItemContentLeftSection :active-section="1" :number-of-post="tenantFilteredItems.length"
							:members="tenantUsers" :admin-user-id="selectedTenant.createdByUserId">
						</TenantItemContentLeftSection>

						<!--begin::Stats Widget 8-->
						<div class="card mb-5 mb-xxl-8"
							style="position: sticky; top: 80px; max-height: 85vh; overflow-y: auto;">
							<div class="card-header">
								<h4 class="my-6 mb-0 text-gray-800">ចំណងជើងមាតិកា</h4>
							</div>
							<!--begin::Body-->
							<div class="card-body pt-0">
								<div class="table table-sm">
									<tbody>
										<tr v-for="(item, index) in tenantFilteredItems">
											<td style="width:1%;" class="px-0">{{ index + 1 }}.</td>
											<td class="border-bottom ps-1">

												<div v-if="!tenantItems.some(x => x.itemId ==
													item.id)" class="fw-normal text-gray-600 p-0 text-start fs-7">
													{{
														item.title
													}}
												</div>

												<button v-else @click="scrollToSection(`__${item.id}`)"
													:class="`fw-normal text-gray-900 btn btn-link p-0 text-start fs-7`">{{
														item.title
													}}<span style="font-size: inherit;" class="dot" v-if="!tenantItems.some(x => x.itemId ==
														item.id && x.status == 'loaded')" v-for="i in 3">.</span>
												</button>
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

						<!-- <ArticleEdit :item-id="`638719096920158290`">

						</ArticleEdit> -->

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

						<TenantCategory @reload-categories="reloadCategories" :tenant-id="tenantId"
							:categories="tenantCategories" :selected-category-id="selectedCategoryId">
						</TenantCategory>
						<IframeBatchLoader :iframe-list="tenantItems" :categories="tenantCategories"
							:selected-category-id="selectedCategoryId"></IframeBatchLoader>
						<ArticleEditModel :item-id="selectedItem"></ArticleEditModel>
					</div>
				</div>
				<!--end::Row-->

				<!--begin::Modal - Select Location-->
				<div class="modal fade" id="modal_tenant" data-bs-backdrop="static" tabindex="-1" role="dialog">
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


	<!-- custom aside -->
	<div class="d-xl-none">
		<!-- Drawer aside -->
		<aside :class="['drawer', { 'drawer-active': appGlobalStore.tenantActivityDrawerOpen }]">
			<div class="drawer-content">
				<div class="d-flex justify-content-end border-0 h-50px">
					<!--begin::Close-->
					<div style="position: absolute; top: 0; right: 5px;" class="btn btn-icon btn-sm btn-light"
						@click="appGlobalStore.setTenantActivityDrawerOpen(!appGlobalStore.tenantActivityDrawerOpen)">
						<!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
						<span class="svg-icon svg-icon-1">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
								<g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
									fill="#000000">
									<rect fill="#000000" x="0" y="7" width="16" height="2" rx="1"></rect>
									<rect fill="#000000" opacity="0.5"
										transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
										x="0" y="7" width="16" height="2" rx="1"></rect>
								</g>
							</svg>
						</span>
						<!--end::Svg Icon-->
					</div>
					<!--end::Close-->
				</div>

				<TenantItemContentLeftSection :active-section="1" :number-of-post="tenantFilteredItems.length"
					:members="tenantUsers" :admin-user-id="selectedTenant.createdByUserId">
				</TenantItemContentLeftSection>

				<!--begin::Stats Widget 8-->
				<div class="card mb-5 mb-xxl-8"
					style="position: sticky; top: 80px; max-height: 85vh; overflow-y: auto;">
					<div class="card-header">
						<h4 class="my-6 mb-0 text-gray-800">ចំណងជើងមាតិកា</h4>
					</div>
					<!--begin::Body-->
					<div class="card-body pt-0">
						<div class="table table-sm">
							<tbody>
								<tr v-for="(item, index) in tenantFilteredItems">
									<td style="width:1%;" class="px-0">{{ index + 1 }}.</td>
									<td class="border-bottom ps-1">

										<div v-if="!tenantItems.some(x => x.itemId ==
											item.id)" class="fw-normal text-gray-600 p-0 text-start fs-7">
											{{
												item.title
											}}
										</div>

										<button v-else @click="scrollToSection(`__${item.id}`)"
											:class="`fw-normal text-gray-900 btn btn-link p-0 text-start fs-7`">{{
												item.title
											}}<span style="font-size: inherit;" class="dot" v-if="!tenantItems.some(x => x.itemId ==
												item.id && x.status == 'loaded')" v-for="i in 3">.</span>
										</button>
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
		</aside>

		<!-- Overlay to close the drawer by clicking outside -->
		<div v-if="appGlobalStore.tenantActivityDrawerOpen" class="drawer-overlay"
			@click="appGlobalStore.setTenantActivityDrawerOpen(!appGlobalStore.tenantActivityDrawerOpen)"></div>
	</div>
	<!-- custom aside -->


	<!--begin::Modal - Tenant Members-->
	<div class="modal fade" id="modal_tenant_members" data-bs-backdrop="static" tabindex="-1" role="dialog"
		aria-hidden="false">
		<div class="modal-dialog modal-dialog-scrollable" role="document" style="z-index: 2000;">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Members</h5>
					<!--begin::Close-->
					<div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
						<!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
						<span class="svg-icon svg-icon-2x">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
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
					<!--begin::Table-->
					<div class="table-responsive">
						<table class="table table-borderless align-middle">
							<thead>
								<tr>
									<th class="p-0 w-50px">No.</th>
									<th class="p-0 min-w-150px">Email</th>
								</tr>
							</thead>
							<tbody>
								<!-- .sort((a, b) => a.createdOn === b.createdOn ? 0 : a.createdOn ? -1 : 1) -->
								<tr v-for="(member, index) in tenantUsers
									// Sort alphabetically, case-insensitive
									.sort((a, b) => a.userName.toLowerCase().localeCompare(b.userName.toLowerCase()))">
									<td class="px-0 py-3">
										<div class="symbol symbol-55px mt-1 me-5">
											<span class="symbol-label bg-light-primary align-items-center ">
												<!-- <img alt="Logo" src="" class="mh-40px" /> -->
												{{ index + 1 }}
											</span>
										</div>
									</td>
									<td class="px-0">
										<a href="#" class="text-gray-800 fw-bolder text-hover-primary">{{
											member.userName }}</a>
										<div class="d-flex justify-content-between">
											<span class="text-muted fw-bold d-block mt-1" style="width: 100%;">{{
												formatDate(member.createdOn)
											}} </span>
											<span class="text-primary fw-bold"
												v-if="selectedTenant.createdByUserId === member.createdByUserId">admin</span>
										</div>
									</td>
								</tr>

							</tbody>
						</table>
					</div>
					<!--end::Table-->
				</div>

			</div>
		</div>
	</div>
	<!--end::Modal - Tenant Members-->

	<!--begin::Modal - Tenant Categories-->
	<div class="modal fade" id="modal_tenant_categories" data-bs-backdrop="static" tabindex="-1" role="dialog"
		aria-hidden="false" :item="selectedItem" @close="closeModal">
		<div class="modal-dialog modal-dialog-scrollable" role="document" style="z-index: 2000;">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Categories</h5>
					<!--begin::Close-->
					<div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
						<!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
						<span class="svg-icon svg-icon-2x">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
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
					<!-- <multiselect v-model="selectedCategories" :options="tenantCategories" :multiple="true"
						:searchable="true" placeholder="Select categories" label="name" track-by="_id" /> -->

					<!--begin::Table-->
					<div class="table-responsive">
						<table class="table table-sm align-middle">
							<thead>
								<tr>
									<th class="pe-5 py-0 text-center" style="width: 1%;">No.</th>
									<th class="p-0 min-w-150px">Name</th>
								</tr>
							</thead>
							<tbody>
								<!-- .sort((a, b) => a.createdOn === b.createdOn ? 0 : a.createdOn ? -1 : 1) -->
								<tr v-for="(category, index) in tenantCategories
									// Sort alphabetically, case-insensitive
									.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))">
									<td class="pe-5 py-0 text-center">
										{{ index + 1 }}
									</td>
									<td class="px-0 border-bottom ps-1">
										<!-- Anchor tag that sends data -->
										<a href="#" @click.prevent="makePostRequest(category._id)"
											class="text-gray-800 fw-bolder">{{
												category.name }}</a>

									</td>
								</tr>

							</tbody>
						</table>
					</div>
					<!--end::Table-->
				</div>

			</div>
		</div>
	</div>
	<!--end::Modal - Tenant Categories-->

</template>

<script setup>
import TenantItemToolbar from '@/components/tenantItem/TenantItemToolbar.vue'
import TenantItemContentLeftSection from '@/components/tenantItem/TenantItemContentLeftSection.vue';
import { onMounted, onBeforeUnmount, ref, onBeforeMount, watch } from 'vue';
import { loggedInUser } from '@/services/authService';
import { RouterLink, useRoute } from 'vue-router';
import { getTenantById } from '@/services/tenantService'
import { getTenantItems, getTenantItemIdsByTerm, getTenantFilteredItems } from '@/services/tenantItemService';
import { getTenantUsers } from '@/services/tenantUserService';
import IframeBatchLoader from '@/components/tenantItem/IframeBatchLoader.vue'
import formatDate from '@/utilities/dateHelper';

import { useTenantItemStore } from '@/stores/tenantItemStore'
const tenantItemStore = useTenantItemStore()
import { useAppGlobalStore } from '@/stores/appGlobalStore'
import TenantCategory from '@/components/tenantCategory/TenantCategory.vue';
import { getTenantCategories } from '@/services/tenantCategoryService';
import { addTenantItemToCategory, getTenantCategoryItems } from '@/services/tenantCategoryItemService';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import ArticleEditModel from '@/components/tenantItem/articlePost/ArticleEditModel.vue';

const appGlobalStore = useAppGlobalStore()

const route = useRoute()

const host = import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT;
const tenantId = route.params.id;
const selectedCategoryId = route.params.categoryId;

const selectedTenant = ref({})
const iframeEdit = ref(null)
const iframeEditSrc = ref(`${host}/embed/article/edit`);
const tenantItems = ref([])
const searchQuery = ref('');
const tenantFilteredItems = ref([]); // The filtered tenants list
const tenantUsers = ref([])
const tenantCategories = ref([])
const selectedCategories = ref([]);
const selectedItem = ref(null);

// // Reference to the child component (Delete.vue)
// const deleteCategoryRef = ref(null);
// // Method to submit the form from the parent component
// const triggerDeleteCategory = () => {
// 	// Trigger the submitForm method in the child component
// 	const success = deleteCategoryRef.value.deleteCategory();
// 	if (success) {
// 		document.querySelector('#kt_modal_tenant button[data-bs-dismiss="modal"]').click();
// 	}
// };

// Function to make the post request
const makePostRequest = async (categoryId) => {
	//const response = await addTenantItemToCategory(tenantId, categoryId, selectedItem.value);

	const modalCategoryElement = document.querySelector('#modal_tenant_categories');
	var modal = bootstrap.Modal.getInstance(modalCategoryElement)
	if (modal) {
		modal.hide();
	}
};

const reloadCategories = async () => {
	const newCategories = await getTenantCategories(tenantId);
	tenantCategories.value = [{ _id: '', name: 'ទាំងអស់', tenantId: tenantId }, ...newCategories];
}

onBeforeMount(async () => {
	selectedTenant.value = await getTenantById(tenantId);
	tenantUsers.value = await getTenantUsers(tenantId);
	tenantCategories.value = [{ _id: '', name: 'ទាំងអស់', tenantId: tenantId }, ...await getTenantCategories(tenantId)];
	if (selectedCategoryId) {
		await loadTenantItemsByCategoryId()
	} else {
		await loadTenantItems();
	}

	// 
	if (iframeEdit.value) {
		iframeEdit.value.src = iframeEditSrc.value;
	}

})

onMounted(async () => {
	appGlobalStore.setLoading(true);

	// Set iframe src early
	iframeEdit.value.src = iframeEditSrc.value;

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
	//console.log(postIds);
	tenantFilteredItems.value = await getTenantFilteredItems(postIds, tenantId);

	const modalCategoryElement = document.querySelector('#modal_tenant_categories');
	modalCategoryElement.addEventListener('show.bs.modal', (event) => {
		selectedItem.value = event.relatedTarget.dataset.myItemId;
	});

	const modalArticleEditElement = document.querySelector('#modal_article_edit');
	modalArticleEditElement.addEventListener('show.bs.modal', (event) => {
		selectedItem.value = event.relatedTarget.dataset.myItemId;
	});
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
	console.log(event.data);

	const url = event.data.url;
	if (url) {
		window.open(url, '_blank');  // Open the URL in a new tab
	}

	const iframeId = event.data.id;
	if (iframeId) {
		const iframe = document.getElementById('_' + iframeId);
		if (iframe && event.data.height) {
			iframe.style.height = event.data.height + 'px';
			var foundIframe = tenantItems.value.find((i) => i.itemId == iframeId);
			if (foundIframe) {
				foundIframe.status = 'loaded';
				setTimeout(() => {
					iframe.style.opacity = '1';
					iframe.style.transition = 'all 300ms ease-in';
				}, 100);

				//console.log(`[1-] ${foundIframe.id}` + event.data.status);
			}
		}

		if (iframeId === '_edit') {
			//postMessageToIframe(iframe, await loggedInUser());

			iframeEdit.value.setAttribute('status', 'loaded'); // Add the status attribute
			appGlobalStore.setLoading(false)
		}

		//console.log(event.data)
	}

	if (event.data.closeModal && iframeId === '_edit') {
		const modalElement = document.querySelector('#modal_tenant');

		// Ensure the modal exists before attempting to dismiss it
		if (modalElement) {
			const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

			/* begin::reload the modal after saved */
			iframeEdit.value.contentWindow.postMessage({ id: '_edit', reload: 'reload' }, '*')
			// iframeEdit.value.src = '';
			// setTimeout(() => {
			// 	iframeEdit.value.src = iframeEditSrc.value
			// }, 100);
			/* end::reload the modal after saved */

			await loadTenantItems();
			modalInstance.toggle();
		}
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

async function loadTenantItemsByCategoryId() {
	const items = await getTenantCategoryItems(tenantId, selectedCategoryId);


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
		const elementPosition = element.getBoundingClientRect().top + window.scrollY;
		const offsetPosition = elementPosition - offset;

		// Smooth scroll with offset
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	}
};

</script>

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

<style scoped>
/* Drawer styles */
.drawer {
	position: fixed;
	top: 0;
	left: -330px;
	/* Initially hidden on the left side */
	width: 325px;
	height: 100%;
	background-color: #f8f9fa;
	box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
	transition: left 0.3s ease;
	/* Smooth transition */
	z-index: 1000;
}

.drawer-active {
	left: 0;
	/* Drawer slides in when active */
}

.drawer-content {
	padding-left: 20px;
	padding-right: 20px;
	width: 100%;
}

.drawer-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	/* Semi-transparent overlay */
	z-index: 999;
	/* Ensure overlay is below the drawer */
	transition: opacity 0.3s ease;
}
</style>