<template>
    <button type="button" class="btn btn-sm mx-0" aria-expanded="false" data-bs-toggle="modal"
        data-bs-target="#modal_tenant_categories">Add to Category</button>

    <!-- <ul class="dropdown-menu" aria-labelledby="">
        <li class="dropdown-search-item">
            <div class="input-group">
                <input type="text" class="form-control dropdown-search" id="dropdownSearch" autocomplete="off"
                    placeholder="Search..." v-model="searchInput" @input="handleSearch" ref="searchInputRef" />
                <button v-if="clearButtonVisible" @click="clearSearch" class="btn btn-outline-secondary clear-btn"
                    type="button">&times;</button>
            </div>
        </li>

        <li class="dropdown-items">
            <div class="dropdown-item-list">
                <a class="dropdown-item" href="#" v-for="(category, index) in filteredTenantCategories" :key="index"
                    @click.prevent="handleCategorySelection(category)">{{
                        category.name
                    }}</a>
            </div>
        </li>
    </ul> -->

</template>


<script setup>
import { RouterLink, stringifyQuery, useRouter, useRoute } from 'vue-router';
import { onBeforeMount, onMounted, ref, nextTick, computed, watch, onBeforeUnmount, onUnmounted } from 'vue';
import { getTenantCategories } from '@/services/tenantCategoryService';
import { useAppGlobalStore } from '@/stores/appGlobalStore';

const router = useRouter();
const route = useRoute();
const appStore = useAppGlobalStore();

const props = defineProps({
    categories: {
        type: Array,
        default: []
    },
    selectedCategoryId: String,
    iframeId: String
});

const filteredTenantCategories = ref([]);
const searchInput = ref(''); // The search term bound to input
const searchInputRef = ref(null); // Declare the reference for the search input
const clearButtonVisible = ref(false); // Control visibility of the clear button

// Handle search input change
const handleSearch = () => {
    const filter = searchInput.value.toLowerCase();
    filteredTenantCategories.value = props.categories.filter(category =>
        category.name.toLowerCase().includes(filter)
    );
    clearButtonVisible.value = filter.length > 0;
};

// Clear search input
const clearSearch = (event) => {
    event.stopPropagation(); // Prevent the dropdown from closing
    searchInput.value = ''; // Clear input value
    handleSearch(); // Filter tenants again after clearing
};

// Focus the search input when the dropdown is shown
const focusSearchInput = () => {
    // nextTick(() => {
    //   searchInputRef.value.focus();
    // });
};

const handleCategorySelection = (category) => {

    let route
    if (category._id === '') {
        route = { name: 'tenant-content', params: { id: category.tenantId } }
    } else {
        route = { name: 'tenant-content-by-categoryId', params: { id: category.tenantId, categoryId: category._id } }
    }

    // Perform navigation and track when it's finished
    router.push(route).then(() => {

    }).catch((err) => {
        console.log('Navigation failed:', err)
    })
}

// Watch for changes in categories
watch(
    () => props.categories,
    (newCategories) => {
        filteredTenantCategories.value = newCategories;
    },
    { immediate: true } // Trigger the watcher immediately on mount
);

onMounted(() => {
    // Bootstrap dropdown event to trigger the focus
    const dropdownButton = document.getElementById('dropdownMenuButton');
    dropdownButton.addEventListener('shown.bs.dropdown', focusSearchInput);

    filteredTenantCategories.value = props.categories;
});

</script>


<style scoped>
/* Dropdown menu container */
.dropdown-menu {
    min-width: 250px;
    /* Full width */
}

/* Input group containing the search input and clear button */
.dropdown-search-item {
    padding: 10px;
}

/* Make the input width full and create space for the "X" button */
.input-group {
    position: relative;
}

#dropdownSearch {
    padding-right: 30px;
    /* Space for the clear button */
}

/* "X" button styling */
.clear-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    color: #ccc;
    z-index: 10;
    /* Ensure it's above the input */
}

/* Scrollable list of items */
.dropdown-items {
    max-height: 250px;
    /* Set height limit for the item list */
    overflow-y: auto;
    /* Enable scrolling if items exceed the height */
    padding: 0;
    /* Remove default padding */
}

/* Optional: style for individual items */
.dropdown-item {
    padding: 8px 16px;
}
</style>
