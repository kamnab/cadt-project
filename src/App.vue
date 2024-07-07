<script setup>
import HeaderNav from "./HeaderNav.vue";
</script>

<template>
  <!--begin::Header-->
  <HeaderNav />
  <!--end::Header-->

  <!--begin::Main-->

  <div class="d-flex flex-column flex-column-fluid">
    <!--begin::Content-->
    <div class="content fs-6 d-flex flex-column-fluid" id="kt_content">
      <!--begin::Container-->
      <div class="container">
        <router-view/>
      </div>
      <!--end::Container-->
    </div>
    <!--end::Content-->
  </div>

  <!--end::Main-->

  <!--begin::Footer-->
  <div class="footer py-4 d-flex flex-lg-column" id="kt_footer">
    <!--begin::Container-->
    <div class="container d-flex flex-column flex-md-row flex-stack">
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-bold me-2">2024©</span>
        <a href="/" class="text-gray-800 text-hover-primary"
          >Classroom Learning</a
        >
      </div>
      <!--end::Copyright-->
      <!--begin::Menu-->
      <ul class="menu menu-gray-600 menu-hover-primary fw-bold order-1">
        <li class="menu-item">
          <a href="/" class="menu-link px-2">About</a>
        </li>
        <li class="menu-item">
          <a href="/" class="menu-link px-2">Support</a>
        </li>
        <li class="menu-item"></li>
      </ul>
      <!--end::Menu-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Footer-->
</template>

