<template>

    <!--begin::Modal - Create new category-->
    <div class="modal fade" id="modal_article_edit" data-bs-backdrop="static" tabindex="-1" role="dialog"
        aria-hidden="false">
        <div class="modal-dialog modal-fullscreen-lg-down mw-1000px" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Article</h5>
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
                    <ArticleEdit :item-id="props.itemId"></ArticleEdit>
                </div>

            </div>
        </div>
    </div>
    <!--end::Modal - Create new category-->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ArticleEdit from './ArticleEdit.vue';

const props = defineProps({
    itemId: String
})

onMounted(() => {

})

</script>