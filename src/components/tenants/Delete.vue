<script setup>
import { loggedInUser } from '@/services/authService';
import axios from 'axios';

const emit = defineEmits();
const props = defineProps({
    tenant: {
        id: String,
        name: String
    }
});

const deleteTenant = async () => {
    var accessToken = (await loggedInUser()).access_token;
    const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}/${props.tenant.id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (response.status == 200) {
        const { name, description, isDeleted } = response.data;
        console.log(response.data);

        emit('delete-success'); // Emit event to notify parent
        emit('close'); // Close the modal

        return true;
    }
    return false;
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
