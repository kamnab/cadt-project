<script setup>

import { RouterLink, useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const route = useRoute()
var id = route.params.id;

const props = defineProps({
	activeSection: Number
})

import { useClassItemStore } from '@/stores/classItemStore'
const store = useClassItemStore()

const handleClick = () => {
	var myModalEl = document.getElementById('kt_header_search_modal');
	var modal = bootstrap.Modal.getInstance(myModalEl)
	if (modal) {
		modal.hide();
	}
}

onMounted(async () => {
	store.setSection(props.activeSection)

});

</script>

<template>

	<!--begin::Stats Widget 5-->
	<div class="card mb-5 mb-xxl-8" :style="activeSection == 1 ? { backgroundColor: '#F9F2E7' } : {}">
		<!--begin::Body-->
		<div class="card-body">
			<!--begin::Section-->
			<div class="d-flex align-items-center">
				<!--begin::Symbol-->
				<div class="symbol symbol-50px me-5">
					<span class="symbol-label bg-light-warning">
						<!--begin::Svg Icon | path: icons/duotone/Layout/Layout-4-blocks.svg-->
						<span class="svg-icon svg-icon-2x svg-icon-warning">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<rect x="0" y="0" width="24" height="24" />
									<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
									<path
										d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
										fill="#000000" opacity="0.3" />
								</g>
							</svg>
						</span>
						<!--end::Svg Icon-->
					</span>
				</div>
				<!--end::Symbol-->
				<!--begin::Title-->
				<div>
					<RouterLink @click="handleClick" :to="{ name: 'tenant-content', params: { id } }"
						class="fs-4 text-gray-800 text-hover-primary fw-bolder">Activity</RouterLink>
					<div class="fs-7 text-muted fw-bold mt-1">3 Post</div>
				</div>
				<!--end::Title-->
			</div>
			<!--end::Section-->
			<!--begin::Info-->
			<div class="fw-bolder text-muted pt-7">
				<span class="d-block">4 Persons</span>
				<span class="d-block pt-2">2 Comments</span>
			</div>
			<!--end::Info-->
			<!--begin::Progress-->
			<div class="progress h-6px bg-light-warning mt-7">
				<div class="progress-bar bg-warning" role="progressbar" style="width: 100%;" aria-valuenow="0"
					aria-valuemin="0" aria-valuemax="100"></div>
			</div>
			<!--end::Progress-->
		</div>
		<!--end::Body-->
	</div>
	<!--end::Stats Widget 5-->

	<!--begin::Stats Widget 8-->
	<div class="card mb-5 mb-xxl-8">
		<!--begin::Body-->
		<div class="card-body">
			<div id="kt_stats_widget_8_carousel" class="carousel carousel-custom slide" data-bs-ride="carousel"
				data-bs-interval="8000">

				<!--begin::Carousel-->
				<div class="carousel-inner pt-8">
					<!--begin::Item-->
					<div class="carousel-item active">
						<!--begin::Section-->
						<div class="d-flex flex-column justify-content-between h-100">
							<!--begin::Title-->
							<h3 class="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">Homework 1</h3>
							<!--end::Title-->
							<!--begin::Text-->
							<p class="text-gray-600 fw-bold pt-3 mb-0">Task for your group discussion</p>
							<!--end::Text-->
						</div>
						<!--end::Section-->
					</div>
					<!--end::Item-->

				</div>
				<!--end::Carousel-->
			</div>
		</div>
		<!--end::Body-->
		<!--begin::Footer-->
		<div class="card-footer border-0 pt-0 pb-10">

		</div>
		<!--end::Footer-->
	</div>
	<!--end::Stats Widget 8-->


</template>