<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onBeforeMount, onMounted, ref, nextTick } from 'vue';
import { useTenantItemStore } from '@/stores/tenantItemStore';
import { useAppGlobalStore } from '@/stores/appGlobalStore';
import { getTenants } from '@/services/tenantService';

const router = useRouter();
const tenantItemStore = useTenantItemStore();
const appGlobalStore = useAppGlobalStore();

const props = defineProps({
  selectedTenant: {
    id: String,
    name: String,
    description: String
  }
});

const allTenants = ref([]);
const searchInput = ref(''); // The search term bound to input
const filteredTenants = ref([]); // The filtered tenants list
const clearButtonVisible = ref(false); // Control visibility of the clear button
const searchInputRef = ref(null); // Declare the reference for the search input

// Fetch tenants before mounting
onBeforeMount(async () => {
  allTenants.value = await getTenants();
  filteredTenants.value = allTenants.value; // Initially, all tenants are shown
});

// Handle search input change
const handleSearch = () => {
  const filter = searchInput.value.toLowerCase();
  filteredTenants.value = allTenants.value.filter(tenant =>
    tenant.name.toLowerCase().includes(filter)
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
  nextTick(() => {
    searchInputRef.value.focus();
  });
};

onMounted(() => {
  // Bootstrap dropdown event to trigger the focus
  const dropdownButton = document.getElementById('dropdownMenuButton');
  dropdownButton.addEventListener('shown.bs.dropdown', focusSearchInput);
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
  max-height: 200px;
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

<template>
  <div class="toolbar" id="kt_toolbar" style="padding-top: 20px">
    <div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
      <div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">
        <ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-gray-800 text-hover-primary">
              <i class="bi bi-house-fill fs-2"></i>
            </RouterLink>
          </li>
          <li class="breadcrumb-item" v-if="!appGlobalStore.globalLoading">
            <div class="dropdown">
              <button class="btn btn-sm dropdown-toggle m-0 p-0 text-gray-600 text-hover-primary" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {{ props.selectedTenant.name }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="dropdown-search-item">
                  <div class="input-group">
                    <input type="text" class="form-control dropdown-search" id="dropdownSearch" placeholder="Search..."
                      v-model="searchInput" @input="handleSearch" ref="searchInputRef" />
                    <button v-if="clearButtonVisible" @click="clearSearch" class="btn btn-outline-secondary clear-btn"
                      type="button">&times;</button>
                  </div>
                </li>
                <li class="dropdown-items">
                  <div class="dropdown-item-list">
                    <a class="dropdown-item" href="#"
                      @click.prevent="router.push({ name: 'tenant-content', params: { id: tenant.id } })"
                      v-for="(tenant) in filteredTenants" :key="tenant.id">{{ tenant.name }}</a>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1 ms-auto">
        <button @click="toggleSearch" class="btn btn-sm btn-icon btn-active-accent me-3">
          <i class="fas fa-search"></i> </button>

        <a href="#" class="btn btn-sm btn-active-accent active fw-bolder" data-bs-toggle="modal"
          data-bs-target="#modal_tenant">Add New</a>
      </div>
    </div>
  </div>
</template>
