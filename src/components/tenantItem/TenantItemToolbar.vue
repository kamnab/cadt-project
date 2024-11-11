<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useTenantItemStore } from '@/stores/tenantItemStore'
const tenantItemStore = useTenantItemStore()

const props = defineProps({
  selectedTenant: {
    id: String,
    name: String,
    description: String
  }
})

// Toggle function to show/hide the search box
const toggleSearch = () => {
  tenantItemStore.setToggleSearch(!tenantItemStore.toggleSearch)
};

</script>
<template>

  <!--begin::toolbar-->
  <div class="toolbar" id="kt_toolbar" style="padding-top: 20px">
    <div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
      <!--begin::Info-->
      <div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">

        <!--begin::Breadcrumb-->
        <ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
          <li class="breadcrumb-item">
            <RouterLink onclick="" to="/" class="text-gray-800 text-hover-primary">
              <i class="bi bi-house-fill fs-2"></i>
            </RouterLink>
          </li>

          <li class="breadcrumb-item" v-if="props.selectedTenant != null">{{ props.selectedTenant.name }}</li>
          <!-- <li class="breadcrumb-item text-dark">View All Lessons</li> -->
        </ul>

        <!--begin::Title-->
        <!-- <h3 v-if="latestLesson != null" class="text-dark fw-bolder my-3">{{ latestLesson?.name }}</h3> -->
        <!--end::Title-->
        <!--end::Breadcrumb-->
      </div>
      <!--end::Info-->
      <!--begin::Nav-->
      <div class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1 ms-auto">
        <!-- Icon button to toggle the search box, using Bootstrap button styles -->
        <button @click="toggleSearch" class="btn btn-sm btn-icon btn-active-accent me-3">
          <i class="fas fa-search"></i> </button>

        <a href="#" class="btn btn-sm btn-active-accent active fw-bolder" data-bs-toggle="modal"
          data-bs-target="#modal_tenant">Add New</a>
        <!-- <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink> -->

      </div>
      <!--end::Nav-->
    </div>
  </div>
  <!--end::toolbar-->

</template>