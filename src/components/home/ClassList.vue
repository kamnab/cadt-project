<template>
  <!--begin::Row-->
  <div class="row g-6 mb-6">
    <div v-for="i in 10" :key="i" class="col-xl-4">
      <!--begin::Stats Widget 9-->
      <div class="card mb-0">
        <!--begin::Body-->
        <div class="card-body">
          <div
            id="kt_stats_widget_9_carousel"
            class="carousel carousel-custom slide"
            data-bs-ride="carousel"
            data-bs-interval="8000"
          >
            <!--begin::Top-->
            <div class="d-flex flex-stack flex-wrap">
              <!--begin::Label-->
              <span class="text-muted fw-bolder pe-2">Today’s Schedule</span>
              <!--end::Label-->
              <!--begin::Carousel Indicators-->
              <ol class="p-0 m-0 carousel-indicators carousel-indicators-dots">
                <li
                  data-bs-target="#kt_stats_widget_9_carousel"
                  data-bs-slide-to="0"
                  class="ms-1 active"
                ></li>
              </ol>
              <!--end::Carousel Indicators-->
            </div>
            <!--end::Top-->
            <!--begin::Carousel-->
            <div class="carousel-inner pt-9">
              <!--begin::Item-->
              <div class="carousel-item active">
                <!--begin::Section-->
                <div class="flex-grow-1">
                  <!--begin::Title-->
                  <router-link to="/class-activity">
                    <h3
                      class="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer"
                    >
                      Subject {{ i }}
                    </h3>
                  </router-link>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <p class="text-primary fs-1 fw-bolder pt-3 mb-0">
                    11:15AM - 12:30PM
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
        <div class="card-footer border-0 d-flex flex-stack pt-0 pb-10">
          <!--begin::Label-->
          <span class="text-muted fs-6 fw-bold pe-2"
            >256 R St. Manhattan NY..</span
          >
          <!--end::Label-->
          <a
            href="#"
            class="btn btn-sm btn-primary fw-bolder px-6"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_select_location"
            >Map</a
          >
        </div>
        <!--end::Footer-->
      </div>
      <!--end::Stats Widget 9-->
    </div>
  </div>
  <!--end::Row-->
</template>