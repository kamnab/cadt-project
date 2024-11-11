<script setup>
import ClassItem from './ClassItem.vue';
import ClassItemV2 from './ClassItemV2.vue';
import classList from '@/data/classList';
import axios from 'axios';
import { loggedInUser } from '@/services/authService';
import { ref, onMounted } from 'vue';
import { getTenants } from '@/services/tenantService';
const user = ref(null);
const tenants = ref([]);
const isLoading = ref(true);  // Add a loading state

onMounted(async () => {
  user.value = await loggedInUser();

  tenants.value = await getTenants();
  isLoading.value = false;
})

</script>

<template>
  <!-- Show loading spinner while waiting for data -->
  <div class="global-loading-spinner" v-if="user && isLoading">
    <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
  </div>

  <!-- Show welcome message if user is not logged in -->
  <div class="card mb-5" v-if="!user">
    <div class="card-body">
      <h3>Welcome onboard!</h3>
      <p>
        An engaging space to collaborate with friends—empower your learning journey through shared discussions on
        projects, lessons, homework, and more!
      </p>
    </div>
  </div>

  <!-- Show "almost there" message if tenants is empty -->
  <div class="card mb-5" v-if="user && !isLoading && tenants.length == 0">
    <div class="card-body">
      <h3>You are almost there!</h3>
      <p>
        Get the most out of your learning experience by joining a group discussion or creating a new one.
        Collaborate with your team, share ideas, ask questions, and work on projects together!
      </p>
    </div>
  </div>

  <!-- Display tenants once data is loaded -->
  <div class="row g-6 mb-6" v-if="!isLoading">
    <ClassItemV2 v-for="(item, index) in tenants" :item="item" :key="index"></ClassItemV2>
  </div>
</template>