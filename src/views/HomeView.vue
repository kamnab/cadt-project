<script setup>
import ClassList from '@/components/classItem/ClassList.vue';
import MyTask from '@/components/classItem/MyTask.vue';
</script>

<template>


<div class="d-flex flex-column flex-column-fluid">

<!--begin::Content-->
<div class="content fs-6 d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
  <!--begin::Container-->
  <div class="container">
    

  <!--begin::Row-->
  <div class="row g-0 g-xl-5 g-xxl-8">
    <div class="col-xl-8">
<ClassList></ClassList>
    </div>
    <div class="col-xl-4">
<MyTask></MyTask>
    </div>
  </div>
  <!--end::Row-->


    
  </div>
  <!--end::Container-->
</div>
<!--end::Content-->
</div>


</template>
