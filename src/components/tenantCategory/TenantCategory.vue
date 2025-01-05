<template>
    <div class="card mb-5">

        <div class="card-body">
            <div class="mb-០">
                <div class="dropdown">
                    <p class="text-muted mb-0 fs-8">Category</p>
                    <button
                        :class="`btn btn-sm btn-link dropdown-toggle mx-0 pb-1 pt-1 text-gray-600 text-hover-primary`"
                        style="border-bottom: .5px solid grey;" type="button" id="categoryDropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span style="display: inline-flex; min-width: 75px;">{{ props.categories.find(x => x._id ==
                            props.selectedCategoryId)?.name || ' ទាំងអស់'
                            }}<span v-if="appStore.globalLoading" v-for="dot in 3" class="dot"
                                style="font-size: inherit;">.</span>
                        </span>

                    </button>

                    <ul class="dropdown-menu" aria-labelledby="categoryDropdownMenuButton">
                        <li class="dropdown-search-item">
                            <div class="input-group">
                                <input type="text" class="form-control dropdown-search" id="dropdownSearch"
                                    autocomplete="off" placeholder="Search..." v-model="searchInput"
                                    @input="handleSearch" ref="searchInputRef" />
                                <button v-if="clearButtonVisible" @click="clearSearch"
                                    class="btn btn-outline-secondary clear-btn" type="button">&times;</button>
                            </div>
                        </li>

                        <li class="dropdown-items">
                            <div class="dropdown-item-list">
                                <div v-for="(category, index) in filteredTenantCategories"
                                    style="display: flex; justify-content: space-between;">
                                    <a class="dropdown-item d-flex align-items-center" href="#" :key="index"
                                        @click.prevent="handleCategorySelection(category)">{{
                                            category.name
                                        }}</a>

                                    <!-- Sub Dropdown Button for Edit/Delete actions -->
                                    <div class="dropdown" v-if="category._id !== ''">
                                        <button
                                            class="btn btn-sm btn-link text-gray-600 text-hover-primary subDropdownButton"
                                            type="button" data-bs-toggle="dropdown" :id="'subDropdownButton' + index"
                                            aria-expanded="false" @click.stop="toggleSubDropdown(index)">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </button>

                                        <!-- Sub Dropdown Menu with Edit/Delete -->
                                        <ul class="dropdown-menu dropdown-submenu subDropdownButton"
                                            :aria-labelledby="'subDropdownButton' + index">
                                            <li>
                                                <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                                    data-bs-target="#modal_edit_category"
                                                    @click.prevent="editCategory(category)">
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item text-danger" href="#"
                                                    @click.prevent="deleteCategory(category)">
                                                    Delete
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </li>

                        <li class="dropdown-items border-top mt-2">
                            <div class="dropdown-item-list">
                                <a class="dropdown-item text-gray-600 py-3 mt-2" href="#" data-bs-toggle="modal"
                                    data-bs-target="#modal_create_category">Create new</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <DeleteCategoryModel ref="deleteModalRef" :category="{
        id: selectedCategoryToDelete._id,
        name: selectedCategoryToDelete.name
    }" @operation-success="handleSuccess" @operation-fail="handleFailure">
    </DeleteCategoryModel>

    <CreateCategoryModel :tenant-id="props.tenantId" @operation-success="handleSuccess" @operation-fail="handleFailure">
    </CreateCategoryModel>

    <EditCategoryModel :category="{
        id: selectedCategoryToDelete._id,
        name: selectedCategoryToDelete.name
    }" @operation-success="handleSuccess" @operation-fail="handleFailure">
    </EditCategoryModel>
</template>

<script setup>
import { RouterLink, stringifyQuery, useRouter, useRoute } from 'vue-router';
import { onBeforeMount, onMounted, ref, nextTick, computed, watch, onBeforeUnmount, onUnmounted } from 'vue';
import { getTenantCategories } from '@/services/tenantCategoryService';
import { useAppGlobalStore } from '@/stores/appGlobalStore';
import DeleteCategoryModel from './DeleteCategoryModel.vue';
import CreateCategoryModel from './CreateCategoryModel.vue';
import EditCategoryModel from './EditCategoryModel.vue';

const emit = defineEmits(['reload-categories']);

const router = useRouter();
const route = useRoute();
const appStore = useAppGlobalStore();

const props = defineProps({
    tenantId: String,
    categories: {
        type: Array,
        default: []
    },
    selectedCategoryId: String
});

const filteredTenantCategories = ref([]);
const searchInput = ref(''); // The search term bound to input
const searchInputRef = ref(null); // Declare the reference for the search input
const clearButtonVisible = ref(false); // Control visibility of the clear button
const selectedCategoryToDelete = ref({});

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

function toggleSubDropdown(index) {
    const dropdown = document.querySelectorAll('ul.subDropdownButton.show');
    dropdown.forEach((e) => {
        e.classList.remove('show');
        setTimeout(() => {
            const btn = document.querySelector('button.subDropdownButton.show');
            if (btn) {
                btn.classList.remove('show');
            }
        }, 1)
    });
}

/* Begin handle category CRUD */
// Edit category
const editCategory = (category) => {
    console.log('Edit category:', category.name);
    // Add your edit logic here
    selectedCategoryToDelete.value = category;
};

const deleteModalRef = ref(null);
// Delete category
const deleteCategory = (category) => {
    //console.log('Delete category:', category);
    selectedCategoryToDelete.value = category;

    // trigger modal
    deleteModalRef.value.toggleModal('show');
};

// Handle success event
const handleSuccess = (message) => {
    //alert(message); // Or any other logic you want
    // Example: reload data, show notification, etc.
    emit('reload-categories')
}

// Handle failure event
const handleFailure = (message) => {
    alert(message); // Or any other logic you want
    // Example: log error, show error message, etc.
}

/* end handle category CRUD */

// Watch for changes in categories and call the reload function
watch(
    () => props.categories,
    (newCategories) => {
        filteredTenantCategories.value = newCategories;
    },
    { immediate: true }
);


onMounted(() => {
    // Bootstrap dropdown event to trigger the focus
    const dropdownButton = document.getElementById('dropdownMenuButton');
    dropdownButton.addEventListener('shown.bs.dropdown', focusSearchInput);

    filteredTenantCategories.value = props.categories;
});

</script>


<style scoped>
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
</style>
