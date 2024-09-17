<script setup>
import ClassItem from './ClassItem.vue';
import classList from '@/data/classList';

import { ref } from 'vue';
import axios from 'axios';
import { loggedInUser } from '@/services/authService';
import { onMounted } from 'vue';

const user = ref(null);
const tenants = ref([]);

// Function to get protected resource
const getProtectedResource = async () => {
  user.value = await loggedInUser();
  if (user.value) {
    try {
      const response = await axios.get('https://localhost:4000/tenants', {
        headers: {
          Authorization: `Bearer ${user.value.access_token}`,
        },
      });

      console.log(`Bearer ${user.value.access_token}`)
      console.log(response.data);
      tenants.value = Array.from(response.data)
        .map((tenant) => ({
          id: tenant._id,
          name: tenant.name,
          description: tenant.description
        }));

      console.log(tenants.value);

    } catch (error) {
      console.error('API call failed:', error);
    }
  }
};

onMounted(() => {
  getProtectedResource()
})

</script>

<template>
  <!--begin::Row-->
  <div class="row g-6 mb-6">
    <div class="col-12">
      <h1 class="fw-bold pt-6 m-0">Project 1: Frontend</h1>
    </div>
    <ClassItem v-for="(item, index) in classList" :item="item" :key="index"></ClassItem>
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div class="row g-6 mb-6">
    <div class="col-12">
      <h1 class="fw-bold pt-6 m-0">Project 2: Consuming API Resources (Express.js as a backend)</h1>
    </div>
    <ClassItem v-for="(item, index) in tenants" :item="item" :key="index"></ClassItem>
  </div>
  <!--end::Row-->
</template>