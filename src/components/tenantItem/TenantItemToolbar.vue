<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useTenantItemStore } from '@/stores/tenantItemStore'
import { onBeforeMount, onMounted, ref } from 'vue';
import { useAppGlobalStore } from '@/stores/appGlobalStore';
import { getTenants } from '@/services/tenantService';
const router = useRouter();
const tenantItemStore = useTenantItemStore()
const appGlobalStore = useAppGlobalStore();

const props = defineProps({
  selectedTenant: {
    id: String,
    name: String,
    description: String
  }
})
const allTenants = ref([])

// Toggle function to show/hide the search box
const toggleSearch = () => {
  tenantItemStore.setToggleSearch(!tenantItemStore.toggleSearch)
};

onBeforeMount(async () => {
  allTenants.value = await getTenants();
})

onMounted(() => {

  const searchInput = document.getElementById('dropdownSearch');
  const clearButton = document.getElementById('clearSearch');

  // Event listener to focus on the search input when the dropdown opens
  document.getElementById('dropdownMenuButton').addEventListener('shown.bs.dropdown', function () {
    searchInput.focus(); // Set focus on the search input
  });

  // Search input event listener
  searchInput.addEventListener('keyup', function () {
    let filter = this.value.toLowerCase();
    let dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

    // Show or hide clear button based on input value
    clearButton.style.display = this.value ? 'block' : 'none'; // Toggle visibility

    let found = false; // Track if any item matches the search

    // Filter dropdown items
    dropdownItems.forEach(function (item) {
      let text = item.textContent.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = ''; // Show matching item
        found = true;
      } else {
        item.style.display = 'none'; // Hide non-matching item
      }
    });

    if (!found) {
      // Optionally, add a "No results found" message here
      console.log("No items found");
    }
  });

  // Clear button event listener
  clearButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the dropdown from closing when clicking the "X"

    searchInput.value = ''; // Clear the input value
    clearButton.style.display = 'none'; // Hide the clear button

    // Reset the dropdown items to be visible
    let dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    dropdownItems.forEach(function (item) {
      item.style.display = ''; // Show all items
    });

    // Focus back on the search input after clearing
    searchInput.focus();
  });

})
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
  <!--begin::toolbar-->
  <div class="toolbar" id="kt_toolbar" style="padding-top: 20px">
    <div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
      <!--begin::Info-->
      <div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">

        <!--begin::Breadcrumb-->
        <ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
          <li class="breadcrumb-item">
            <RouterLink onclick="" to="/" class="text-gray-800 text-hover-primary">
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
                <!-- Fixed Search Input with Clear Button -->
                <li class="dropdown-search-item">
                  <div class="input-group">
                    <input type="text" class="form-control dropdown-search" id="dropdownSearch" placeholder="Search...">
                    <button class="btn btn-outline-secondary clear-btn" id="clearSearch" type="button"
                      style="display: none;">&times;</button>
                  </div>
                </li>
                <!-- Scrollable Dropdown Items -->
                <li class="dropdown-items">
                  <div class="dropdown-item-list">
                    <a class="dropdown-item" href="#"
                      @click.prevent="router.push({ name: 'tenant-content', params: { id: tenant.id } })"
                      v-for="(tenant) in allTenants">{{ tenant.name }}</a>
                  </div>
                </li>
              </ul>
            </div>

          </li>
          <!-- <li class="breadcrumb-item text-dark">View All Lessons</li> -->
        </ul>

        <!--begin::Title-->
        <!-- <h3 v-if="latestLesson != null" class="text-dark fw-bolder my-3">{{ latestLesson?.name }}</h3> -->
        <!--end::Title-->
        <!--end::Breadcrumb-->
      </div>
      <!--end::Info-->
      <!--begin::Nav-->
      <div class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1 ms-auto">
        <!-- Icon button to toggle the search box, using Bootstrap button styles -->
        <button @click="toggleSearch" class="btn btn-sm btn-icon btn-active-accent me-3">
          <i class="fas fa-search"></i> </button>

        <a href="#" class="btn btn-sm btn-active-accent active fw-bolder" data-bs-toggle="modal"
          data-bs-target="#modal_tenant">Add New</a>
        <!-- <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink> -->

      </div>
      <!--end::Nav-->
    </div>
  </div>
  <!--end::toolbar-->

</template>