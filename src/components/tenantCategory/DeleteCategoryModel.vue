<template>
    <!--begin::Modal - Delete category-->
    <div class="modal fade" ref="deleteModal" id="modal_delete_category" data-bs-backdrop="static" tabindex="-1"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete Category</h5>
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
                    <Delete ref="deleteModalRef" :category="props.category">
                    </Delete>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-active-light active" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-light-danger" @click="triggerDeleteCategory">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--end::Modal - Delete category-->
</template>

<script setup>
import Delete from './Delete.vue';
import { ref } from 'vue';

const props = defineProps({
    category: { id: String, name: String },
});

const emit = defineEmits(['operation-success', 'operation-fail']);

const deleteModal = ref(null);
const deleteModalRef = ref(null);

// Method to submit the form from the parent component
const triggerDeleteCategory = async () => {
    // Trigger the submitForm method in the child component
    const success = await deleteModalRef.value.deleteCategory();
    if (success) {
        document.querySelector('#modal_delete_category button[data-bs-dismiss="modal"]').click();
        emit('operation-success', 'Category deleted successfully');
    } else {
        emit('operation-fail', 'Failed to delete category');
    }
};

// Invoke by parent component
// Function to toggle the modal
const toggleModal = (action) => {
    const modal = new bootstrap.Modal(deleteModal.value);
    if (action === 'show') {
        modal.show();
    } else if (action === 'hide') {
        modal.hide();
    }
}

// Expose toggleModal to parent
defineExpose({
    toggleModal,
});
</script>
