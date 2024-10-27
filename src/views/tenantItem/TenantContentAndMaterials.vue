<script setup>
import { RouterLink, useRoute } from 'vue-router';
import TenantItemToolbar from '@/components/tenantItem/TenantItemToolbar.vue'

import TenantItemContent from '@/components/tenantItem/TenantItemContent.vue';
import ClassItemContentNotFound from '@/components/classItem/ClassItemContentNotFound.vue';

const route = useRoute()
var id = route.params.id;


</script>

<template>

  <div class="d-flex flex-column flex-column-fluid">

    <!--begin::toolbar-->
    <TenantItemToolbar>

    </TenantItemToolbar>
    <!--end::toolbar-->

    <!-- begin::Content-->
    <!--begin::Container-->
    <TenantItemContent></TenantItemContent>
    <!-- <ClassItemContentNotFound v-else></ClassItemContentNotFound> -->
    <!--end::Container-->
    <!--end::Content -->
  </div>



</template>
