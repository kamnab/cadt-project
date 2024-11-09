<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import ClassList from '@/components/classItem/ClassList.vue';
import MyTask from '@/components/classItem/MyTask.vue';

import DeleteTenant from '@/components/tenants/Delete.vue';
import HomeToolbar from '@/components/HomeToolbar.vue';
import { loggedInUser } from '@/services/authService';

// State variables

const classListKey = ref(0);
const isModalOpen = ref(false);
const tenant = ref({
  id: String,
  name: String
});

// Reference to the child component (Delete.vue)
const deleteTenantRef = ref(null);

// Method to submit the form from the parent component
const triggerDeleteTenant = () => {
  // Trigger the submitForm method in the child component
  const success = deleteTenantRef.value.deleteTenant();
  if (success) {
    document.querySelector('#kt_modal_tenant button[data-bs-dismiss="modal"]').click();
  }
};

// Function to handle modal show event
const handleModalShow = (event) => {
  tenant.value.id = event.relatedTarget.dataset.tenantId;
  tenant.value.name = event.relatedTarget.dataset.tenantName;

  isModalOpen.value = true;
};

const reloadList = () => {
  classListKey.value += 1;
};

// const user = ref(null);
// onBeforeMount(async () => {
//   user.value = await loggedInUser();
// })
onMounted(() => {
  const myModalEl = document.getElementById('kt_modal_tenant');

  if (myModalEl) {
    myModalEl.addEventListener('show.bs.modal', handleModalShow);
  }
});

</script>

<template>
  <HomeToolbar></HomeToolbar>

  <div class="d-flex flex-column flex-column-fluid">

    <!--begin::Content-->
    <div class="content d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
      <!--begin::Container-->
      <div class="container">

        <!--begin::Row-->
        <div class="row g-0">
          <div class="col-xl-12">
            <ClassList :key="classListKey"></ClassList>
          </div>
          <!-- <div class="col-xl-4">
            <MyTask></MyTask>
          </div> -->
        </div>
        <!--end::Row-->

        <!--begin::Modal - Delete Tenant-->
        <div class="modal fade" id="kt_modal_tenant" data-backdrop="static" tabindex="-1" role="dialog"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Delete Tenant</h5>
                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                  <!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
                  <span class="svg-icon svg-icon-2x">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                      height="24px" viewBox="0 0 24 24" version="1.1">
                      <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                        fill="#000000">
                        <rect fill="#000000" x="0" y="7" width="16" height="2" rx="1" />
                        <rect fill="#000000" opacity="0.5"
                          transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
                          x="0" y="7" width="16" height="2" rx="1" />
                      </g>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </div>
                <!--end::Close-->
              </div>
              <div class="modal-body">
                <DeleteTenant ref="deleteTenantRef" v-if="isModalOpen" :tenant="tenant" @delete-success="reloadList"
                  @close="isModalOpen = false">
                </DeleteTenant>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-active-light active" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="btn btn-light-danger" @click="triggerDeleteTenant">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--end::Modal - Delete Tenant-->

      </div>
      <!--end::Container-->
    </div>
    <!--end::Content-->
  </div>


</template>
