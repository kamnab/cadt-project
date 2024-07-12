<script setup>
import { RouterLink, useRoute } from 'vue-router';
import classListService from '@/services/classListService';
import ClassItemToolbar from '@/components/classItem/ClassItemToolbar.vue'
import ClassItemContent from '@/components/classItem/ClassItemContent.vue';
import ClassItemContentNotFound from '@/components/classItem/ClassItemContentNotFound.vue';
const route = useRoute()
var id = route.params.id;
var selectedClass = classListService.getClassById(id);
var latestLesson = classListService.getLatestLesson(id);


</script>

<template>

  <div class="d-flex flex-column flex-column-fluid">

<!--begin::toolbar-->
<ClassItemToolbar>

</ClassItemToolbar>
						<!--end::toolbar-->

<!--begin::Content-->
 <!--begin::Container-->
 <ClassItemContent v-if="latestLesson != null"></ClassItemContent>
  <ClassItemContentNotFound v-else></ClassItemContentNotFound>
  <!--end::Container-->
<!--end::Content-->
</div>


      
</template>
