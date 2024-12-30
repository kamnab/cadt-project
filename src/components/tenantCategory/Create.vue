<template>
    <div class="mb-6">

        <form @submit.prevent="createCategory" id="frmCreateCategory" method="post">
            <div class="d-flex align-items-center justify-content-between flex-nowrap text-nowrap py-1">
                <div class="flex-fill mb-11 me-5">
                    <label for="category_name" class="form-label">Category name</label>
                    <input class="form-control" type="text" v-model="category.name" id="category_name" />
                </div>

                <button class="btn btn-primary" type="submit">
                    <span role="spinner" class="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>
                    <span role="status">Save</span>
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

const props = defineProps({ tenantId: String });

const router = useRouter();
const user = ref(null);
const category = ref({
    name: ''
});

const createCategory = async () => {
    if (category.value.code === '') {
        alert('Category name can not empty.');
        return;
    }

    user.value = await loggedInUser();

    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantCategories/${props.tenantId}`, category.value, {
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