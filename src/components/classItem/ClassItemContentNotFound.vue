<script setup>
import { RouterLink, useRoute } from 'vue-router';
import classListService from '@/services/classListService';
const route = useRoute()
var id = route.params.id;
var selectedClass = classListService.getClassById(id);


</script>

<template>
  <!--begin::Content-->
  <div class="content fs-6 d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
    <!--begin::Container-->
    <div class="container">


      <!--begin::Row-->
      <div class="row g-0 g-xl-5 g-xxl-8">
        <div class="row g-0 g-xl-5 g-xxl-8">
          <!--begin::Stats Widget 9-->
          <div class="card mb-0">
            <!--begin::Body-->
            <div class="card-body">
              <div id="kt_stats_widget_9_carousel" class="carousel carousel-custom slide" data-bs-ride="carousel"
                data-bs-interval="8000">
                <!--begin::Top-->

                <!--end::Top-->
                <!--begin::Carousel-->
                <div class="carousel-inner">
                  <!--begin::Item-->
                  <div class="carousel-item active">
                    <!--begin::Section-->
                    <div class="flex-grow-1">
                      <!--begin::Title-->
                      <router-link to="/class-content">
                        <h3 class="text-dark text-hover-primary fs-2 fw-bolder">
                          No lesson has been found.
                        </h3>
                      </router-link>
                      <!--end::Title-->
                      <!--begin::Text-->
                      <p class="fs-4 text-muted fw-bold pt-2 mb-0">
                        Create new lesson.
                      </p>
                      <!--end::Text-->
                    </div>
                    <!--end::Section-->
                  </div>
                  <!--end::Item-->
                </div>
                <!--end::Carousel-->
              </div>
            </div>
            <!--end::Body-->
            <!--begin::Footer-->

            <!--end::Footer-->
          </div>
          <!--end::Stats Widget 9-->


        </div>
      </div>
      <!--end::Row-->
    </div>
    <!--end::Container-->
  </div>




</template>
