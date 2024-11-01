<template>
    <div class="mb-6">

        <form @submit.prevent="joinTenant" id="frmJoinTenant" method="post">
            <div class="d-flex align-items-center justify-content-between flex-nowrap text-nowrap py-1">
                <div class="flex-fill mb-8 me-5">
                    <label for="tenant_code" class="form-label">Code</label>
                    <input class="form-control" type="text" v-model="tenant.code" id="tenant_code" />
                </div>

                <button class="btn btn-primary" type="submit">
                    <span role="spinner" class="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>
                    <span role="status">Join</span>
                </button>

            </div>
        </form>
    </div>
</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';
import { loggedInUser } from '@/services/authService';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);
const tenant = ref({
    code: ''
});

const joinTenant = async () => {
    if (tenant.value.code === '') {
        alert('Code can not empty.');
        return;
    }

    user.value = await loggedInUser();

    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenants/join`, tenant.value, {
        headers: {
            Authorization: `Bearer ${user.value.access_token}`,
        }
    });

    if (response.status == 200) {
        console.log(response.data);
        window.location.reload();
        router.push('/'); // 
    }
}

</script>