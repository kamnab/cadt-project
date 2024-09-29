<template>

    <!--begin::Row-->
    <div class="row g-6 mb-6">
        <div class="col-xl-12">
            <!--begin::Table Widget 1-->
            <div class="card card-stretch mb-5 mb-xxl-8">
                <!--begin::Header-->
                <div class="card-header border-0 pt-5">
                    <h3 class="card-title align-items-start flex-column">
                        <span class="card-label fw-bolder text-dark fs-3">Edit Tenant</span>
                        <span class="text-muted mt-2 fw-bold fs-6">

                        </span>
                    </h3>
                    <div class="card-toolbar">
                    </div>
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="card-body pt-2">
                    <form @submit.prevent="updateTenant" id="frmUpload" method="post" enctype="multipart/form-data">

                        <div class="mb-6">
                            <label for="tenant_name" class="form-label">File Name</label>
                            <input class="form-control" type="text" v-model="tenant.name" id="tenant_name" />
                        </div>

                        <div class="mb-6">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" v-model="tenant.description" id="exampleFormControlTextarea1"
                                rows="3"></textarea>
                        </div>

                        <!-- <div class="mb-6">
                            <div class="form-check form-check-custom form-check-solid">
                                <input class="form-check-input me-3" name="isPublicAccess" type="checkbox" value="true"
                                    id="kt_modal_update_role_option_0">
                                <label class="form-check-label" for="kt_modal_update_role_option_0">
                                    <div class="fw-bold text-gray-800">Public Access</div>
                                </label>
                            </div>
                        </div> -->



                        <div class="d-flex flex-row">
                            <div class="d-flex flex-column flex-row-fluid">
                                <div class="d-flex flex-row flex-column-fluid">
                                    <div class="d-flex flex-row-fluid flex-center">
                                        <div id="percent" class="me-3"></div>
                                        <div id="status"></div>
                                    </div>

                                    <div class="d-flex flex-row-auto w-200px justify-content-end">

                                        <router-link to="/">
                                            <a class="btn btn-active-light px-4 active fw-bolder me-3">Back</a>
                                        </router-link>

                                        <button class="btn btn-primary" type="submit">
                                            <span role="spinner" class="spinner-border spinner-border-sm d-none"
                                                aria-hidden="true"></span>
                                            <span role="status">Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>

                </div>
            </div>
            <!--end::Table Widget 1-->
        </div>
    </div>
    <!--end::Row-->
</template>

<script setup>

import axios from 'axios';
import { ref, onMounted, onBeforeMount } from 'vue';
import { loggedInUser } from '@/services/authService';

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const id = ref(null);
const user = ref(null);
const tenant = ref({
    name: '',
    description: '',
});

const editTenant = async () => {
    user.value = await loggedInUser();

    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}/${route.params.id}`, {
        headers: {
            Authorization: `Bearer ${user.value.access_token}`,
        }
    });

    if (response.status == 200) {
        const { name, description } = response.data;
        tenant.value = { name, description }
        console.log(response.data);
    }
}

const updateTenant = async () => {
    user.value = await loggedInUser();

    const response = await axios.put(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}/${route.params.id}`,
        tenant.value, {
        headers: {
            Authorization: `Bearer ${user.value.access_token}`,
        }
    });

    if (response.status == 200) {
        console.log(response.data);

        router.push('/'); // 
    }
}
// Fetch query param (id) on component mount
onBeforeMount(() => {
    editTenant();

    id.value = route.params.id || null; // Get the `id` from the query string
    console.log("ID from query string:", id.value);
});

</script>