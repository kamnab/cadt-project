<script setup>
import { accessToken } from '@/services/authService';
import axios from 'axios';

const props = defineProps({
    tenant: {
        id: String,
        name: String
    }
});

const deleteTenant = async () => {
    const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}/${props.tenant.id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (response.status == 200) {
        const { name, description } = response.data;
        tenant.value = { name, description }
        console.log(response.data);
    }
}

// Expose the deleteTenant method to be accessible by HomeView.vue
defineExpose({
    deleteTenant
});
</script>

<template>
    <div class="row g-6 mb-6">
        <div class="col-xl-12">
            <div class="mb-6">
                <h4 class="text-danger">Are you sure to delete [{{ props.tenant.name }}]?</h4>
            </div>
        </div>
    </div>
</template>
