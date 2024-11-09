<script setup>
import Login from "@/components/auth/Login.vue";
</script>

<template>
  <div id="kt_header" class="header" data-kt-sticky="true" data-kt-sticky-name="header"
    data-kt-sticky-offset="{default: '200px', lg: '300px'}">
    <!--begin::Container-->
    <div class="container d-flex align-items-stretch justify-content-between">
      <!--begin::Left-->
      <div class="d-flex align-items-center">
        <!--begin::Mega Menu Toggler-->
        <!--  -->
        <!--end::Mega Menu Toggler-->
        <!--begin::Logo-->
        <a href="/">
          <img alt="Logo" src="/src/assets/media/logos/logo-v2.jpg" class="h-30px" />
        </a>
        <!--end::Logo-->
      </div>
      <!--end::Left-->
      <!--begin::Right-->
      <Login></Login>
      <!--end::Right-->
    </div>
    <!--end::Container-->
  </div>
</template>