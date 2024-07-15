<script setup>
import ClassItem from './ClassItem.vue';
import classList from '@/data/classList';

</script>

<template>
  <!--begin::Row-->
  <div class="row g-6 mb-6">
    <ClassItem v-for="(item, index) in classList" :item="item" :key="index"></ClassItem>
  </div>
  <!--end::Row-->
</template>