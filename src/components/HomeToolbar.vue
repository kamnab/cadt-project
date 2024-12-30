<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getTenantById } from '@/services/tenantService'
import { loggedInUser } from '@/services/authService';
import Join from '@/components/tenants/Join.vue';

const route = useRoute()
var id = route.params.id;

import { useClassItemStore } from '@/stores/classItemStore'
import { useTenantItemStore } from '@/stores/tenantItemStore'
const store = useClassItemStore()
const tenantItemStore = useTenantItemStore()
const selectedClass = ref({})
const user = ref(null);

onBeforeMount(async () => {
  user.value = await loggedInUser();
})


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
            <RouterLink to="/" class="text-hover-primary" style="position: relative;">
              <i class="bi bi-house fs-2 text-gray-600"></i>
              <i class="bi bi-house fs-2 text-gray-600"
                style="position: absolute; left: 0; transform: scale(1.05);"></i>
            </RouterLink>
          </li>

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

        <a href="#" class="btn btn-sm btn-active-accent active fw-bolder me-3" v-if="user" data-bs-toggle="modal"
          data-bs-target="#modal_join_tenant">
          Join
        </a>

        <router-link :to="{ name: 'tenant-create' }" class="btn btn-sm btn-active-accent active fw-bolder" v-if="user">
          Add New
        </router-link>

      </div>
      <!--end::Nav-->
    </div>
  </div>
  <!--end::toolbar-->


  <!--begin::Modal - Join Tenant-->
  <div class="modal fade" id="modal_join_tenant" data-bs-backdrop="static" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Join Tenant</h5>
          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
            <!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
            <span class="svg-icon svg-icon-2x">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                height="24px" viewBox="0 0 24 24" version="1.1">
                <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                  fill="#000000">
                  <rect fill="#000000" x="0" y="7" width="16" height="2" rx="1" />
                  <rect fill="#000000" opacity="0.5"
                    transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)" x="0"
                    y="7" width="16" height="2" rx="1" />
                </g>
              </svg>
            </span>
            <!--end::Svg Icon-->
          </div>
          <!--end::Close-->
        </div>
        <div class="modal-body pt-2 pb-0">
          <Join></Join>
        </div>

      </div>
    </div>
  </div>
  <!--end::Modal - Join Tenant-->

</template>