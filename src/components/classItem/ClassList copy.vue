<script setup>
import ClassItem from './ClassItem.vue';
import ClassItemV2 from './ClassItemV2.vue';
import classList from '@/data/classList';
import axios from 'axios';
import { loggedInUser } from '@/services/authService';
import { ref, onMounted } from 'vue';
import Join from '../tenants/Join.vue';

const user = ref(null);
const tenants = ref([]);

// Function to get protected resource
const getProtectedResource = async () => {
  user.value = await loggedInUser();
  if (user.value) {
    try {
      console.log(`Bearer ${user.value.access_token}`)

      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}`, {
        headers: {
          Authorization: `Bearer ${user.value.access_token}`,
        },
      });

      //console.log(response.data);
      tenants.value = Array.from(response.data)
        .map((tenant) => ({
          id: tenant._id,
          name: tenant.name,
          description: tenant.description,
          isOwner: tenant.createdByUserId == user.value.profile.sub
        }));

      //console.log(tenants.value);
    } catch (error) {
      console.error('API call failed:', error);
    }
  }
};

onMounted(() => {
  getProtectedResource()
})

</script>

<template>
  <!--begin::Row-->
  <div class="row g-6 mb-6">
    <div class="col-12">
      <div class="d-flex align-items-center justify-content-between flex-nowrap text-nowrap overflow-auto py-1">
        <h1 class="fw-bold pt-6 m-0">Project 2: Backend </h1>
        <div>
          <router-link :to="{ name: 'tenant-create' }" class="btn btn-primary btn-sm mx-2" v-if="user">
            Add New
          </router-link>

          <a href="#" class="btn btn-primary btn-sm" v-if="user" data-bs-toggle="modal"
            data-bs-target="#modal_join_tenant">
            Join
          </a>
        </div>

      </div>
    </div>
    <ClassItemV2 v-for="(item, index) in tenants" :item="item" :key="index"></ClassItemV2>
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div class="row g-6 mb-6">
    <div class="col-12">
      <h1 class="fw-bold pt-6 m-0">Project 1: Frontend</h1>
    </div>
    <ClassItem v-for="(item, index) in classList" :item="item" :key="index"></ClassItem>
  </div>
  <!--end::Row-->

  <!--begin::Modal - Select Location-->
  <div class="modal fade" id="modal_join_tenant" data-bs-backdrop="static" tabindex="-1" role="dialog"
    aria-hidden="false">
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
  <!--end::Modal - Select Location-->

</template>