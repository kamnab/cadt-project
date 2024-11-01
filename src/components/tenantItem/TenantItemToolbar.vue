<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getTenantById } from '@/services/tenantService'

const route = useRoute()
var id = route.params.id;

import { useClassItemStore } from '@/stores/classItemStore'
import { useTenantItemStore } from '@/stores/tenantItemStore'
const store = useClassItemStore()
const tenantItemStore = useTenantItemStore()
const selectedClass = ref({})

onBeforeMount(async () => {
  selectedClass.value = await getTenantById(id);

})

// Toggle function to show/hide the search box
const toggleSearch = () => {
  tenantItemStore.setToggleSearch(!tenantItemStore.toggleSearch)
};

</script>
<template>

  <!--begin::toolbar-->
  <div class="toolbar" id="kt_toolbar">
    <div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
      <!--begin::Info-->
      <div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">

        <!--begin::Breadcrumb-->
        <ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
          <li class="breadcrumb-item">
            <RouterLink onclick="" to="/" class="text-gray-800 text-hover-primary">Home</RouterLink>
          </li>

          <li class="breadcrumb-item">{{ selectedClass.name }}</li>
          <!-- <li class="breadcrumb-item text-dark">View All Lessons</li> -->
        </ul>

        <!--begin::Title-->
        <!-- <h3 v-if="latestLesson != null" class="text-dark fw-bolder my-3">{{ latestLesson?.name }}</h3> -->
        <!--end::Title-->
        <!--end::Breadcrumb-->
      </div>
      <!--end::Info-->
      <!--begin::Nav-->
      <div class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1">
        <!-- Icon button to toggle the search box, using Bootstrap button styles -->
        <button @click="toggleSearch" class="btn btn-outline-secondary active me-3">
          <i class="fas fa-search"></i>
        </button>
        <a href="#" class="btn btn-active-accent active fw-bolder" data-bs-toggle="modal"
          data-bs-target="#modal_tenant">Add New</a>
        <!-- <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink> -->

        <!--begin::Search-->
        <button class="btn btn-icon btn-sm btn-active-bg-accent ms-1 ms-lg-6 py-2 d-xl-none" data-bs-toggle="modal"
          data-bs-target="#kt_header_search_modal" id="kt_header_search_toggle">
          <!--begin::Svg Icon | path: icons/duotone/General/Search.svg-->
          <span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.3"
                d="M2 21V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V21C22 21.6 21.6 22 21 22H3C2.4 22 2 21.6 2 21Z"
                fill="currentColor" />
              <path d="M2 10V3C2 2.4 2.4 2 3 2H21C21.6 2 22 2.4 22 3V10C22 10.6 21.6 11 21 11H3C2.4 11 2 10.6 2 10Z"
                fill="currentColor" />
            </svg>
          </span>
          <!--end::Svg Icon-->
        </button>
        <!--end::Search-->

      </div>
      <!--end::Nav-->
    </div>
  </div>
  <!--end::toolbar-->

</template>