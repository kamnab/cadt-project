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
        <button @click="toggleSearch" class="btn btn-icon btn-active-accent active me-3">
          <i class="fas fa-search"></i> </button>

        <a href="#" class="btn btn-active-accent active fw-bolder" data-bs-toggle="modal"
          data-bs-target="#modal_tenant">Add New</a>
        <!-- <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink> -->

      </div>
      <!--end::Nav-->
    </div>
  </div>
  <!--end::toolbar-->

</template>