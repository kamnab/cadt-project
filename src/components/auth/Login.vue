<template>
    <div>
        <button @click="login" v-if="!isAuthenticated">Login</button>
        <button @click="logoutRedirect" v-else>Logout</button>
        <p v-if="user">Logged in as: {{ user.profile.name }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { login, logout, loggedInUser } from '@/services/authService'

// Reactive variables to track user info and authentication status
const user = ref(null);
const isAuthenticated = ref(false);

// Check if the current user is already authenticated 
const getUser = async () => {
    const currentUser = await loggedInUser();
    if (currentUser) {
        user.value = currentUser;
        isAuthenticated.value = true;
    } else {
        isAuthenticated.value = false;
    }
};

const logoutRedirect = async () => isAuthenticated.value = await logout();

onMounted(() => {
    getUser();
});
</script>