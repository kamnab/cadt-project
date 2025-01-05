<template>

    <!--begin::Modal - Create new category-->
    <div class="modal fade" ref="createModal" id="modal_create_category" data-bs-backdrop="static" tabindex="-1"
        role="dialog" aria-hidden="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Category</h5>
                    <!--begin::Close-->
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                        <!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
                        <span class="svg-icon svg-icon-2x">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
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
                <div class="modal-body pt-2 pb-0">
                    <Create ref="frmCreateCategory" :tenant-id="props.tenantId"></Create>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-active-light active" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-primary" @click="triggerCreateCategory">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--end::Modal - Create new category-->
</template>

<script setup>
import { ref } from 'vue';
import Create from './Create.vue';

const props = defineProps({
    tenantId: String
});

const emit = defineEmits(['operation-success', 'operation-fail']);
const frmCreateCategory = ref(null);

// Method to submit the form from the parent component
const triggerCreateCategory = async () => {
    // Trigger the submitForm method in the child component
    const { success, message } = await frmCreateCategory.value.createCategory();
    if (success) {
        document.querySelector('#modal_create_category button[data-bs-dismiss="modal"]').click();
        emit('operation-success', message);
    } else {
        emit('operation-fail', message);
    }
};

</script>