<script setup>

</script>

<template>
  <!--begin::List Widget 1-->
  <div class="card mb-5 mb-xxl-8">
    <!--begin::Header-->
    <div class="card-header align-items-center border-0 mt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="fw-bolder text-dark fs-3">Latest Activities</span>
        <span class="text-muted mt-2 fw-bold fs-6">Class Participation Updates</span>
      </h3>

      <div class="card-toolbar">
        <!--begin::Dropdown-->

        <!--begin::Menu-->
        <div
          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px dropdown-menu"
          data-kt-menu="true"
        >
          <div class="menu-item px-3">
            <div class="menu-content fs-6 text-dark fw-bolder px-3 py-4">
              Manage
            </div>
          </div>
          <div class="separator mb-3 opacity-75"></div>
          <div class="menu-item px-3">
            <a href="#" class="menu-link px-3">Add User</a>
          </div>
          <div class="menu-item px-3">
            <a href="#" class="menu-link px-3">Add Role</a>
          </div>
          <div
            class="menu-item px-3"
            data-kt-menu-trigger="hover"
            data-kt-menu-placement="right-start"
            data-kt-menu-flip="left-start, top"
          >
            <a href="#" class="menu-link px-3">
              <span class="menu-title">Add Group</span>
              <span class="menu-arrow"></span>
            </a>
            <div class="menu-sub menu-sub-dropdown w-200px py-4">
              <div class="menu-item px-3">
                <a href="#" class="menu-link px-3">Admin Group</a>
              </div>
              <div class="menu-item px-3">
                <a href="#" class="menu-link px-3">Staff Group</a>
              </div>
              <div class="menu-item px-3">
                <a href="#" class="menu-link px-3">Member Group</a>
              </div>
            </div>
          </div>
          <div class="menu-item px-3">
            <a href="#" class="menu-link px-3">Reports</a>
          </div>
          <div class="separator mt-3 opacity-75"></div>
          <div class="menu-item px-3">
            <div class="menu-content px-3 py-3">
              <a class="btn btn-primary fw-bold btn-sm px-4" href="#"
                >Create New</a
              >
            </div>
          </div>
        </div>
        <!--end::Menu-->
        <!--end::Dropdown-->
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-3">
      <!--begin::Timeline-->
      <div class="timeline-label">
        <!--begin::Item-->
        <div class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bolder text-gray-800 fs-6">08:42</div>
          <!--end::Label-->
          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-warning fs-1"></i>
          </div>
          <!--end::Badge-->
          <!--begin::Text-->
          <div class="fw-mormal timeline-content text-muted ps-3">
            Math: 2nd degree equation.
          </div>
          <!--end::Text-->
        </div>
        <!--end::Item-->
        <!--begin::Item-->
        <div class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bolder text-gray-800 fs-6">10:00</div>
          <!--end::Label-->
          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-success fs-1"></i>
          </div>
          <!--end::Badge-->
          <!--begin::Content-->
          <div class="timeline-content d-flex">
            <span class="fw-bolder text-gray-800 ps-3">ICT: What is Computational Thinking?</span>
          </div>
          <!--end::Content-->
        </div>
        <!--end::Item-->
        <!--begin::Item-->
        <div class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bolder text-gray-800 fs-6">14:37</div>
          <!--end::Label-->
          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-danger fs-1"></i>
          </div>
          <!--end::Badge-->
          <!--begin::Desc-->
          <div class="timeline-content fw-bolder text-gray-800 ps-3">
            Make deposit
            <a href="#" class="text-primary">USD 700</a>. to ESL
          </div>
          <!--end::Desc-->
        </div>
        <!--end::Item-->
        <!--begin::Item-->
        <div class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bolder text-gray-800 fs-6">16:50</div>
          <!--end::Label-->
          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-primary fs-1"></i>
          </div>
          <!--end::Badge-->
          <!--begin::Text-->
          <div class="timeline-content fw-mormal text-muted ps-3">
            Indulging in poorly driving and keep structure keep great
          </div>
          <!--end::Text-->
        </div>
        <!--end::Item-->
        <!--begin::Item-->
        <div class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bolder text-gray-800 fs-6">21:03</div>
          <!--end::Label-->
          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-danger fs-1"></i>
          </div>
          <!--end::Badge-->
          <!--begin::Desc-->
          <div class="timeline-content fw-bold text-gray-800 ps-3">
            New order placed
            <a href="#" class="text-primary">#XF-2356</a>.
          </div>
          <!--end::Desc-->
        </div>
        <!--end::Item-->
        <!--begin::Item-->
        <div class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bolder text-gray-800 fs-6">16:50</div>
          <!--end::Label-->
          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-primary fs-1"></i>
          </div>
          <!--end::Badge-->
          <!--begin::Text-->
          <div class="timeline-content fw-mormal text-muted ps-3">
            Indulging in poorly driving and keep structure keep great
          </div>
          <!--end::Text-->
        </div>
        <!--end::Item-->

      </div>
      <!--end::Timeline-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end::List Widget 1-->
</template>