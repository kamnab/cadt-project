<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onBeforeMount, onMounted, ref, nextTick, computed, watch, onBeforeUnmount } from 'vue';
import { useTenantItemStore } from '@/stores/tenantItemStore';
import { useAppGlobalStore } from '@/stores/appGlobalStore';
import { getTenants } from '@/services/tenantService';

const router = useRouter();
const tenantItemStore = useTenantItemStore();
const appStore = useAppGlobalStore();

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
  // nextTick(() => {
  //   searchInputRef.value.focus();
  // });
};

const handleToggleSearch = () => {
  tenantItemStore.setToggleSearch(!tenantItemStore.toggleSearch)
}

onMounted(() => {
  // Bootstrap dropdown event to trigger the focus
  const dropdownButton = document.getElementById('dropdownMenuButton');
  dropdownButton.addEventListener('shown.bs.dropdown', focusSearchInput);
});

onBeforeUnmount(() => appStore.setTenantName(props.selectedTenant.name))

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

<template>
  <div class="toolbar" id="kt_toolbar" style="padding-top: 20px">
    <div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
      <div class="w-425px d-flex flex-column align-items-start justify-content-center flex-wrap me-1">
        <ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-hover-primary" style="position: relative;">
              <i class="bi bi-house fs-2 text-gray-600"></i>
              <i class="bi bi-house fs-2 text-gray-600"
                style="position: absolute; left: 0; transform: scale(1.05);"></i>
            </RouterLink>
          </li>
          <li class="breadcrumb-item">
            <div class="dropdown">
              <button
                :class="`btn btn-sm ${props.selectedTenant?.name ? 'dropdown-toggle' : ''} m-0 p-0 text-gray-600 text-hover-primary`"
                type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <span v-if="props.selectedTenant?.name">{{ props.selectedTenant?.name }}</span>
                <span v-else>
                  {{ appStore.tenantName }}<span v-for="dot in 3" class="dot" style="font-size: inherit;">.</span>
                </span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
        <button @click="handleToggleSearch" class="btn btn-sm btn-icon btn-active-accent me-3">
          <i class="fas fa-search"></i> </button>

        <!-- <a href="#" class="btn btn-sm btn-active-accent active fw-bolder" data-bs-toggle="modal"
          data-bs-target="#modal_tenant">Add New</a> -->

        <!--begin::Radio group-->
        <div class="btn-group w-100" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button]">
          <a href="#" class="btn btn-sm btn-active-accent active fw-bolder px-3" data-bs-toggle="modal"
            data-bs-target="#modal_tenant">Add New</a>
          <div style="border: 1px solid gainsboro;">
          </div>
          <a href="#" class="btn btn-sm btn-active-accent active fw-bolder px-0 ps-1" data-bs-toggle="modal"
            data-bs-target="#modal_tenant">
            <i class="bi bi-three-dots-vertical"></i>
          </a>



        </div>
        <!--end::Radio group-->

      </div>
    </div>
  </div>
</template>
