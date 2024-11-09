<script setup>
import ClassItem from './ClassItem.vue';
import ClassItemV2 from './ClassItemV2.vue';
import classList from '@/data/classList';
import axios from 'axios';
import { loggedInUser } from '@/services/authService';
import { ref, onMounted } from 'vue';

const user = ref(null);
const tenants = ref([]);
const isLoading = ref(true);  // Add a loading state

// Function to get protected resource
const getProtectedResource = async () => {
  user.value = await loggedInUser();
  if (user.value) {
    try {
      console.log(`Bearer ${user.value.access_token}`)

      const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}`, {
        headers: {
          Authorization: `Bearer ${user.value.access_token}`,
        },
      });

      //console.log(response.data);
      const responseData = Array.from(response.data)
        .map((tenant) => ({
          id: tenant._id,
          name: tenant.name,
          description: tenant.description,
          isOwner: tenant.createdByUserId == user.value.profile.sub,
          code: tenant.inviteCode
        }));

      // Function to remove duplicates with isOwner = false
      const uniqueData = responseData.reduce((tenant, obj) => {
        // Check if we've already seen this ID
        const existingObj = tenant.find(item => item.id === obj.id);

        // If ID doesn't exist in tenant, or the current object has isOwner true, add it
        if (!existingObj || obj.isOwner) {
          // If the object isOwner is true, replace the existing one
          if (existingObj) {
            tenant = tenant.filter(item => item.id !== obj.id);
          }
          tenant.push(obj);
        }

        return tenant;
      }, []);

      tenants.value = uniqueData;

      //console.log(tenants.value);
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      isLoading.value = false;  // Set loading to false after data is fetched
    }
  }
};

onMounted(async () => {
  await getProtectedResource()
})

</script>

<template>
  <!-- Show loading spinner while waiting for data -->
  <div class="global-loading-spinner" v-if="isLoading">
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
  <div class="card mb-5" v-if="!isLoading && tenants.length == 0">
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