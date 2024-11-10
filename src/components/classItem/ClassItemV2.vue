<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    id: String,
    name: String,
    timeFrom: String,
    timeTo: String,
    description: String,
    isOwner: Boolean,
    code: String
  },
});

const isHovered = ref(false);

function handleMouseLeave() {
  isHovered.value = false;

  const dropdown = document.querySelectorAll('ul.dropdown-menu.show');
  dropdown.forEach((e) => e.classList.remove('show'));
}

const displayCode = ref(false);
const btnCodeClick = () => displayCode.value = !displayCode.value;

</script>

<template>

  <div class="col-lg-4 col-md-4 col-sm-6" @mouseover="isHovered = true" @mouseleave="handleMouseLeave">
    <!--begin::Stats Widget 9-->
    <div class="card mb-0">
      <!--begin::Body-->
      <div class="card-body">
        <div id="kt_stats_widget_9_carousel" class="carousel carousel-custom slide" data-bs-ride="carousel"
          data-bs-interval="8000">
          <!--begin::Top-->
          <div v-if="item.isOwner" class="dropdown" style="position: absolute; right: -15px; top: -30px;">
            <button class="btn dropdown-toggle p-0 fs-1" :class="isHovered ? 'text-gray-800' : 'text-gray-300'"
              type="button" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul class="dropdown-menu dropdown-menu-end">

              <li>
                <button class="dropdown-item btn-sm" @click="btnCodeClick">Code</button>
              </li>
              <li class="separator my-1"></li>
              <li>
                <router-link class="dropdown-item btn-sm" :to="{ name: 'tenant-edit', params: { id: item.id } }"
                  :data-tenant-id="item.id" :data-tenant-name="item.name">Edit</router-link>
              </li>
              <li>
                <a class="dropdown-item btn-sm" href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_tenant"
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
                  <h3 class="text-dark text-hover-primary fw-bolder">
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
      <div class="card-footer border-0 pt-0" v-if="displayCode">
        <!--begin::Progress-->
        <div class="progress h-1px  bg-light-danger">
          <div class="progress-bar bg-danger" role="progressbar" style="width: 70%" aria-valuenow="1" aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <!--end::Progress-->

        <!--begin::Text-->
        <div class="d-flex align-items-center h-40px">
          <i class="bi bi-code-square me-2" style="font-size: .9rem; padding-top: 2px;"></i> <span class="fs-5"> {{
            props.item.code
            }}</span>
          <button class="btn btn-icon ms-auto text-muted" style="position:absolute; right: -14px;"
            @click="btnCodeClick">x</button>
        </div>
        <!--end::Text-->


      </div>
      <!--end::Footer-->
    </div>
    <!--end::Stats Widget 9-->
  </div>


</template>