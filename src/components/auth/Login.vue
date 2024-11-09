<template>
    <!-- <div>
        <button @click="login" v-if="!isAuthenticated">Login</button>
        <button @click="logoutRedirect" v-else>Logout</button>
        <p v-if="user">Logged in as: {{ user.profile.name }}</p>
    </div> -->

    <div class="d-flex align-items-center">
        <!--begin::Notifications-->
        <div v-if="!user" class="ms-1 ms-lg-6">
            <button @click="login" class="btn btn-icon btn-sm btn-active-bg-accent">
                <!--begin::Svg Icon | path: icons/duotone/General/User.svg-->
                <span class="svg-icon svg-icon-1 svg-icon-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <polygon points="0 0 24 0 24 24 0 24" />
                            <path
                                d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                                fill="#000000" fill-rule="nonzero" opacity="0.3" />
                            <path
                                d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                                fill="#000000" fill-rule="nonzero" />
                        </g>
                    </svg>
                </span>
                <!--end::Svg Icon-->
            </button>
        </div>

        <!--begin::Notifications-->
        <div v-if="user" class="ms-1 ms-lg-6">
            <!--begin::Dropdown-->
            <button class="btn btn-icon btn-sm btn-accent" style="opacity: .8;" data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end" id="kt_activities_toggle">
                <span class="position-absolute fs-6"></span>
                <!--begin::Svg Icon | path: icons/duotone/General/User.svg-->
                <span class="svg-icon svg-icon-1 svg-icon-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <polygon points="0 0 24 0 24 24 0 24" />
                            <path
                                d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                                fill="#000000" fill-rule="nonzero" opacity="0.3" />
                            <path
                                d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                                fill="#000000" fill-rule="nonzero" />
                        </g>
                    </svg>
                </span>
                <!--end::Svg Icon-->
            </button>
            <!--begin::Menu-->
            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded fw-semibold menu-title-gray-800 menu-hover-bg menu-state-title-primary w-300px w-md-350px"
                data-kt-menu="true">
                <div class="menu-item mx-3">
                    <div class="menu-content fs-6 text-dark fw-bold py-6">
                        <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/keenthemes/start/docs/core/html/src/media/icons/duotune/technology/teh002.svg-->
                        <span class="svg-icon svg-icon-muted svg-icon-2hx">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3"
                                    d="M3 6C2.4 6 2 5.6 2 5V3C2 2.4 2.4 2 3 2H5C5.6 2 6 2.4 6 3C6 3.6 5.6 4 5 4H4V5C4 5.6 3.6 6 3 6ZM22 5V3C22 2.4 21.6 2 21 2H19C18.4 2 18 2.4 18 3C18 3.6 18.4 4 19 4H20V5C20 5.6 20.4 6 21 6C21.6 6 22 5.6 22 5ZM6 21C6 20.4 5.6 20 5 20H4V19C4 18.4 3.6 18 3 18C2.4 18 2 18.4 2 19V21C2 21.6 2.4 22 3 22H5C5.6 22 6 21.6 6 21ZM22 21V19C22 18.4 21.6 18 21 18C20.4 18 20 18.4 20 19V20H19C18.4 20 18 20.4 18 21C18 21.6 18.4 22 19 22H21C21.6 22 22 21.6 22 21ZM16 11V9C16 6.8 14.2 5 12 5C9.8 5 8 6.8 8 9V11C7.2 11 6.5 11.7 6.5 12.5C6.5 13.3 7.2 14 8 14V15C8 17.2 9.8 19 12 19C14.2 19 16 17.2 16 15V14C16.8 14 17.5 13.3 17.5 12.5C17.5 11.7 16.8 11 16 11ZM13.4 15C13.7 15 14 15.3 13.9 15.6C13.6 16.4 12.9 17 12 17C11.1 17 10.4 16.5 10.1 15.7C10 15.4 10.2 15 10.6 15H13.4Z"
                                    fill="currentColor" />
                                <path
                                    d="M9.2 12.9C9.1 12.8 9.10001 12.7 9.10001 12.6C9.00001 12.2 9.3 11.7 9.7 11.6C10.1 11.5 10.6 11.8 10.7 12.2C10.7 12.3 10.7 12.4 10.7 12.5L9.2 12.9ZM14.8 12.9C14.9 12.8 14.9 12.7 14.9 12.6C15 12.2 14.7 11.7 14.3 11.6C13.9 11.5 13.4 11.8 13.3 12.2C13.3 12.3 13.3 12.4 13.3 12.5L14.8 12.9ZM16 7.29998C16.3 6.99998 16.5 6.69998 16.7 6.29998C16.3 6.29998 15.8 6.30001 15.4 6.20001C15 6.10001 14.7 5.90001 14.4 5.70001C13.8 5.20001 13 5.00002 12.2 4.90002C9.9 4.80002 8.10001 6.79997 8.10001 9.09997V11.4C8.90001 10.7 9.40001 9.8 9.60001 9C11 9.1 13.4 8.69998 14.5 8.29998C14.7 9.39998 15.3 10.5 16.1 11.4V9C16.1 8.5 16 8 15.8 7.5C15.8 7.5 15.9 7.39998 16 7.29998Z"
                                    fill="currentColor" />
                            </svg>
                        </span>
                        <!--end::Svg Icon-->
                        <span class="mx-3">{{ user.profile.name }}</span>

                    </div>
                </div>

                <div class="separator mb-3"></div>

                <div class="menu-item mx-3">
                    <a href="https://my.codemie.dev" class="menu-link px-4 py-3">
                        <div class="symbol symbol-35px">
                            <span class="symbol-label bg-light-info">
                                <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/keenthemes/start/docs/core/html/src/media/icons/duotune/files/fil003.svg-->
                                <span class="svg-icon svg-icon-muted svg-icon-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.3"
                                            d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z"
                                            fill="currentColor" />
                                        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->
                            </span>
                        </div>

                        <div class="ps-4">
                            <span class="menu-title fw-semibold mb-1">Multimedia</span>
                            <span class="text-muted fw-semibold d-block fs-7"></span>
                        </div>
                    </a>
                </div>

                <div class="menu-item mx-3">
                    <a href="https://blog.codemie.dev" class="menu-link px-4 py-3">
                        <div class="symbol symbol-35px">
                            <span class="symbol-label bg-light-info">
                                <img style="" alt="Logo" src="@/assets/media/logos/logo-default.png" class="h-30px" />
                            </span>
                        </div>

                        <div class="ps-4">
                            <span class="menu-title fw-semibold mb-1">Article</span>
                            <span class="text-muted fw-semibold d-block fs-7"></span>
                        </div>
                    </a>
                </div>

                <div class="separator mt-3"></div>
                <div class="menu-item mx-3">
                    <a href="https://classroom-learning.netlify.app" class="menu-link px-4 py-3">
                        <div class="symbol symbol-35px">
                            <span class="symbol-label bg-light-info">
                                <img style="" alt="Logo" src="@/assets/media/logos/logo-forum.png" class="h-30px" />
                            </span>
                        </div>

                        <div class="ps-4">
                            <span class="menu-title fw-semibold mb-1">Forum</span>
                            <span class="text-muted fw-semibold d-block fs-7"></span>
                        </div>
                    </a>
                </div>

                <div class="separator mt-3"></div>
                <div class="menu-item mx-2">
                    <div class="menu-content py-5 d-flex justify-content-center">
                        <button @click="logoutRedirect" v-if="user" class="btn btn-light-danger btn-sm">Logout</button>
                    </div>
                </div>
            </div>
            <!--end::Menu-->
            <!--end::Dropdown-->
        </div>
        <!--end::Notifications-->

        <!--begin::Aside Toggler-->
        <!--end::Aside Toggler-->



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