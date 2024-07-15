<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import classListService from '@/services/classListService';
import ClassItemContentLeftSection from '@/components/classItem/ClassItemContentLeftSection.vue';
const route = useRoute()
var id = route.params.id;

var selectedClass = classListService.getClassById(id);
var latestLesson = classListService.getLatestLesson(id);
import { useClassItemStore } from '@/stores/classItemStore'
const store = useClassItemStore()

</script>
<template>
  :: {{ store.activeSection }}
  <!--begin::toolbar-->
  <div class="toolbar" id="kt_toolbar">
    <div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
      <!--begin::Info-->
      <div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">

        <!--begin::Breadcrumb-->
        <ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
          <li class="breadcrumb-item">
            <RouterLink onclick="" to="/" class="text-muted text-hover-primary">Home</RouterLink>
          </li>

          <li class="breadcrumb-item">{{ selectedClass.name }}</li>
          <li class="breadcrumb-item text-dark">View All Lessons</li>
        </ul>

        <!--begin::Title-->
        <h3 v-if="latestLesson != null" class="text-dark fw-bolder my-3">{{ latestLesson?.name }}</h3>
        <!--end::Title-->
        <!--end::Breadcrumb-->
      </div>
      <!--end::Info-->
      <!--begin::Nav-->
      <div v-if="latestLesson != null" class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1">
        <!-- <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink> -->

        <!--begin::Search-->
        <button class="btn btn-icon btn-sm btn-active-bg-accent ms-1 ms-lg-6 py-2 d-xl-none" data-bs-toggle="modal"
          data-bs-target="#kt_header_search_modal" id="kt_header_search_toggle">
          <!--begin::Svg Icon | path: icons/duotone/General/Search.svg-->
          <span class="svg-icon svg-icon-muted svg-icon-2hx"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.3"
                d="M2 21V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V21C22 21.6 21.6 22 21 22H3C2.4 22 2 21.6 2 21Z"
                fill="currentColor" />
              <path d="M2 10V3C2 2.4 2.4 2 3 2H21C21.6 2 22 2.4 22 3V10C22 10.6 21.6 11 21 11H3C2.4 11 2 10.6 2 10Z"
                fill="currentColor" />
            </svg>
          </span>
          <!--end::Svg Icon-->
        </button>
        <!--end::Search-->

      </div>
      <!--end::Nav-->
    </div>
  </div>
  <!--end::toolbar-->



  <!--begin::Header Search-->
  <div class="modal fade" id="kt_header_search_modal" aria-hidden="true" style="background-color: #FBF9F6;">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content shadow-none" style="background-color: #FBF9F6;">
        <div class="container w-lg-800px">
          <div class="modal-header d-flex justify-content-end border-0">
            <!--begin::Close-->
            <div class="btn btn-icon btn-sm btn-light-primary ms-2" data-bs-dismiss="modal">
              <!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
              <span class="svg-icon svg-icon-1">
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
            <!--begin::Search-->

            <!--end::Search-->
            <!--begin::Shop Goods-->

            <!--end::Shop Goods-->
            <!--begin::Framework Users-->
            <div>
              <h3 class="text-dark fw-bolder fs-1 mb-6">Section</h3>

              <ClassItemContentLeftSection :active-section="store.activeSection"></ClassItemContentLeftSection>


            </div>
            <!--end::Framework Users-->

          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Header Search-->

</template>