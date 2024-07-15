
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  item: {
    id: Number,
    name: String,
    timeFrom: String,
    timeTo: String,
    description: String,
  },
});

</script>
<template>

    <div class="col-xl-4">
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
            
            <!--end::Top-->
            <!--begin::Carousel-->
            <div class="carousel-inner">
              <!--begin::Item-->
              <div class="carousel-item active">
                <!--begin::Section-->
                <div class="flex-grow-1">
                  <!--begin::Title-->
                  <router-link :to="{ name: 'class-content', params:{ id: item.id } }">
                    <h3
                      class="text-dark text-hover-primary fs-2 fw-bolder">
                      {{ props.item.name }}
                    </h3>
                  </router-link>
                  <!--end::Title-->
                  <!--begin::Text-->
                  <p class="fs-4 text-muted fw-bold pt-2 mb-0">
                    {{ props.item.description }}
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


</template>