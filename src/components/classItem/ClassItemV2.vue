<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    id: String,
    name: String,
    timeFrom: String,
    timeTo: String,
    description: String,
  },
});

const isHovered = ref(false);

function handleMouseLeave() {
  isHovered.value = false;

  const dropdown = document.querySelectorAll('ul.dropdown-menu.show');
  dropdown.forEach((e) => e.classList.remove('show'));
}

</script>

<template>

  <div class="col-xl-4" @mouseover="isHovered = true" @mouseleave="handleMouseLeave">
    <!--begin::Stats Widget 9-->
    <div class="card mb-0">
      <!--begin::Body-->
      <div class="card-body">
        <div id="kt_stats_widget_9_carousel" class="carousel carousel-custom slide" data-bs-ride="carousel"
          data-bs-interval="8000">
          <!--begin::Top-->
          <div class="dropdown" style="position: absolute; right: -15px; top: -30px;">
            <button class="btn dropdown-toggle p-0 fs-1" :class="isHovered ? 'text-gray-800' : 'text-gray-300'"
              type="button" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul class="dropdown-menu dropdown-menu-end fs-4">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'tenant-edit', params: { id: item.id } }"
                  :data-tenant-id="item.id" :data-tenant-name="item.name">Edit</router-link>
              </li>
              <li>
                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_tenant"
                  :data-tenant-id="item.id" :data-tenant-name="item.name">Delete</a>
              </li>
            </ul>
          </div>
          <!--end::Top-->
          <!--begin::Carousel-->
          <div class="carousel-inner">
            <!--begin::Item-->
            <div class="carousel-item active">
              <!--begin::Section-->
              <div class="flex-grow-1">
                <!--begin::Title-->
                <router-link :to="{ name: 'tenant-content', params: { id: item.id } }">
                  <h3 class="text-dark text-hover-primary fs-2 fw-bolder">
                    {{ props.item.name }}
                  </h3>
                  <span></span>
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