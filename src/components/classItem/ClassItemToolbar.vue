
<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import classListService from '@/services/classListService';

const route = useRoute()
var id = route.params.id;

var selectedClass = classListService.getClassById(id);
var latestLesson = classListService.getLatestLesson(id);

</script>
<template>

    <!--begin::toolbar-->
<div class="toolbar" id="kt_toolbar">
							<div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
								<!--begin::Info-->
								<div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">

									<!--begin::Breadcrumb-->
									<ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
										<li class="breadcrumb-item">
                      <RouterLink 
                      
                      onclick="" to="/" class="text-muted text-hover-primary">Home</RouterLink>
										</li>

										<li class="breadcrumb-item">{{ selectedClass.name }}</li>
										<li class="breadcrumb-item text-dark">View All Lessons</li>
									</ul>

									<!--begin::Title-->
									<h3 v-if="latestLesson != null" class="text-dark fw-bolder my-3">{{ latestLesson?.name }}</h3>
									<!--end::Title-->
									<!--end::Breadcrumb-->
								</div>
								<!--end::Info-->
								<!--begin::Nav-->
								<div v-if="latestLesson != null" class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1">
                  <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink>
									
								</div>
								<!--end::Nav-->
							</div>
						</div>
						<!--end::toolbar-->


</template>