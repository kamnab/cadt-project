<script setup>
import { loggedInUser } from '@/services/authService';
import axios from 'axios';

const props = defineProps({
    category: {
        id: String,
        name: String
    }
});

// Invoke by parent component
const deleteCategory = async () => {
    var accessToken = (await loggedInUser()).access_token;
    const response = await axios.delete(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantCategories/${props.category.id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (response.status == 200) {
        //console.log(response.data);
        return true;
    }
    return false;
}

// Expose the deleteCategory method to be accessible by HomeView.vue
defineExpose({
    deleteCategory
});
</script>

<template>
    <div class="row g-6 mb-6">
        <div class="col-xl-12">
            <div class="mb-6">
                <h4 class="text-danger">Are you sure to delete [{{ props.category.name }}]?</h4>
            </div>
        </div>
    </div>
</template>
