<template>
    <div class="mb-6">
        <form @submit.prevent method="post">
            <div class="d-flex align-items-center justify-content-between flex-nowrap text-nowrap py-1">
                <div class="flex-fill mb-6">
                    <label for="category_name" class="form-label">Category name</label>
                    <input class="form-control" type="text" v-model="category.name" id="category_name" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

import axios from 'axios';
import { ref, watch } from 'vue';
import { loggedInUser } from '@/services/authService';

const props = defineProps({
    category: {
        id: String,
        name: String
    }
});

// Initialize category with the prop value
const category = ref({
    name: props.category.name || ''
});

// Watch for changes to prop and update local state
watch(() => props.category.name, (newValue) => {
    category.value.name = newValue;
});

const editCategory = async () => {
    if (!category.value.name || category.value.name.trim() === '') {
        return { success: false, message: 'Category name cannot be empty.' };
    }

    const user = await loggedInUser();

    const response = await axios.put(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantCategories/${props.category.id}`, category.value, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        }
    });

    if (response.status == 200) {
        //console.log(response.data);
        category.value.name = '';
        return { success: true, message: 'Category created successfully.' };
    }
    return { success: false, message: 'Failed to create category.' };
}

defineExpose({
    editCategory
});
</script>