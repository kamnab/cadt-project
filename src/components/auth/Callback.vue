<template>
    <div class="d-flex flex-column flex-column-fluid">
        <!--begin::Content-->
        <div class="content fs-6 d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">

            <!--begin::Container-->
            <div class="container">
                <!--begin::Row-->
                <div class="row g-0 g-xl-5 g-xxl-8">
                    <!--begin::Stats Widget 9-->
                    <div class="card mb-0">
                        <!--begin::Body-->
                        <div class="card-body">
                            <div id="kt_stats_widget_9_carousel" class="carousel carousel-custom slide"
                                data-bs-ride="carousel" data-bs-interval="8000">
                                <!--begin::Top-->

                                <!--end::Top-->
                                <!--begin::Carousel-->
                                <div class="carousel-inner">
                                    <!--begin::Item-->
                                    <div class="carousel-item active">
                                        <!--begin::Section-->
                                        <div class="flex-grow-1">
                                            <!--begin::Title-->
                                            <router-link to="/class-content">
                                                <h3 class="text-dark text-hover-primary fs-2 fw-bolder">
                                                    Processing login...
                                                </h3>
                                            </router-link>
                                            <!--end::Title-->
                                            <!--begin::Text-->
                                            <p class="fs-4 text-muted fw-bold pt-2 mb-0">

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

                        <!--end::Footer-->
                    </div>
                    <!--end::Stats Widget 9-->


                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
import { loginCallback } from '@/services/authService'

onMounted(async () => {
    try {
        const user = await loginCallback();
        console.log('User authenticated:', user);

        // Redirect back to the home page or other route after successful login
        window.location.href = '/';
    } catch (err) {
        console.error('Login callback error:', err);
    }
});
</script>

<!-- add route callback -->
<!-- {
    path: '/callback',
    name: 'login-callback',
    component: LoginCallback,
  } -->