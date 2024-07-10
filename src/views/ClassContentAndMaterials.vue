<script setup>
import ClassList from '@/components/home/ClassList.vue';
import MyTask from '@/components/home/MyTask.vue';
import { RouterLink } from 'vue-router';
import imageHelper from '@/utilities/imageHelper';
import { onMounted } from 'vue';

const imgUrl = new URL('/src/assets/media/stock/900x600/3.jpg', import.meta.url).href
const styleObject = {
	backgroundImage: `url(${imgUrl})`
}

</script>

<template>

  <div class="d-flex flex-column flex-column-fluid">

<!--begin::toolbar-->
<div class="toolbar" id="kt_toolbar">
							<div class="container d-flex flex-stack flex-wrap flex-sm-nowrap">
								<!--begin::Info-->
								<div class="d-flex flex-column align-items-start justify-content-center flex-wrap me-1">

									<!--begin::Breadcrumb-->
									<ul class="breadcrumb breadcrumb-line bg-transparent text-muted fw-bold my-1 fs-7">
										<li class="breadcrumb-item">
                      <RouterLink to="/" class="text-muted text-hover-primary">Home</RouterLink>
										</li>

										<li class="breadcrumb-item">ICT</li>
										<li class="breadcrumb-item text-dark">View All Lessons</li>
									</ul>
									<!--begin::Title-->
									<h3 class="text-dark fw-bolder my-3">Lesson 2: Computational Thinking </h3>
									<!--end::Title-->
									<!--end::Breadcrumb-->
								</div>
								<!--end::Info-->
								<!--begin::Nav-->
								<div class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1">
                  <RouterLink to="/class-activity" class="btn btn-active-accent active fw-bolder"> Activity Feed</RouterLink>
									
								</div>
								<!--end::Nav-->
							</div>
						</div>
						<!--end::toolbar-->

<!--begin::Content-->
<div class="content fs-6 d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
  <!--begin::Container-->
  <div class="container">
    

  <!--begin::Row-->
	<div class="row g-0 g-xl-5 g-xxl-8">
		<div class="col-xl-4">

		<!--begin::Stats Widget 4-->
			<div class="card mb-5 mb-xxl-8">
				<!--begin::Body-->
				<div class="card-body">
					<!--begin::Section-->
					<div class="d-flex align-items-center">
						<!--begin::Symbol-->
						<div class="symbol symbol-50px me-5">
							<span class="symbol-label bg-light-success">
								<!--begin::Svg Icon | path: icons/duotone/Home/Library.svg-->
								<span class="svg-icon svg-icon-2x svg-icon-success">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
										<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24" />
											<path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000" />
											<rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1" />
										</g>
									</svg>
								</span>
								<!--end::Svg Icon-->
							</span>
						</div>
						<!--end::Symbol-->
						<!--begin::Title-->
						<div>
							<RouterLink to="/class-content" class="fs-4 text-gray-800 text-hover-primary fw-bolder">Content and Materials</RouterLink>
							<div class="fs-7 text-muted fw-bold mt-1">2 Posts</div>
						</div>
						<!--end::Title-->
					</div>
					<!--end::Section-->
					<!--begin::Info-->
					<div class="fw-bolder text-muted pt-7">
						<span class="d-block">2 Persons</span>
						<span class="d-block pt-2">10 Comments</span>
					</div>
					<!--end::Info-->
					<!--begin::Progress-->
					<div class="progress h-6px bg-light-success mt-7">
						<div class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
					<!--end::Progress-->
				</div>
				<!--end::Body-->
			</div>
			<!--end::Stats Widget 4-->

		<!--begin::Stats Widget 5-->
		<div class="card mb-5 mb-xxl-8">
				<!--begin::Body-->
				<div class="card-body">
					<!--begin::Section-->
					<div class="d-flex align-items-center">
						<!--begin::Symbol-->
						<div class="symbol symbol-50px me-5">
							<span class="symbol-label bg-light-warning">
								<!--begin::Svg Icon | path: icons/duotone/Layout/Layout-4-blocks.svg-->
								<span class="svg-icon svg-icon-2x svg-icon-warning">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
										<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24" />
											<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
											<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
										</g>
									</svg>
								</span>
								<!--end::Svg Icon-->
							</span>
						</div>
						<!--end::Symbol-->
						<!--begin::Title-->
						<div>
							<RouterLink to="/class-activity" class="fs-4 text-gray-800 text-hover-primary fw-bolder">Activity</RouterLink>
							<div class="fs-7 text-muted fw-bold mt-1">3 Post</div>
						</div>
						<!--end::Title-->
					</div>
					<!--end::Section-->
					<!--begin::Info-->
					<div class="fw-bolder text-muted pt-7">
						<span class="d-block">4 Persons</span>
						<span class="d-block pt-2">2 Comments</span>
					</div>
					<!--end::Info-->
					<!--begin::Progress-->
					<div class="progress h-6px bg-light-warning mt-7">
						<div class="progress-bar bg-warning" role="progressbar" style="width: 100%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
					<!--end::Progress-->
				</div>
				<!--end::Body-->
			</div>
			<!--end::Stats Widget 5-->

			<!--begin::Stats Widget 8-->
			<div class="card mb-5 mb-xxl-8">
				<!--begin::Body-->
				<div class="card-body">
					<div id="kt_stats_widget_8_carousel" class="carousel carousel-custom slide" data-bs-ride="carousel" data-bs-interval="8000">
						<!--begin::Heading-->
						<div class="d-flex flex-stack flex-wrap">
							<!--begin::Label-->
							<span class="fs-6 text-muted fw-bolder pe-2">Homework</span>
							<!--end::Label-->
							<!--begin::Carousel Indicators-->
							<ol class="p-0 m-0 carousel-indicators carousel-indicators-dots">
								<li data-bs-target="#kt_stats_widget_8_carousel" data-bs-slide-to="0" class="ms-1 active"></li>
								<li data-bs-target="#kt_stats_widget_8_carousel" data-bs-slide-to="1" class="ms-1"></li>
							</ol>
							<!--end::Carousel Indicators-->
						</div>
						<!--end::Heading-->
						<!--begin::Carousel-->
						<div class="carousel-inner pt-8">
							<!--begin::Item-->
							<div class="carousel-item active">
								<!--begin::Section-->
								<div class="d-flex flex-column justify-content-between h-100">
									<!--begin::Title-->
									<h3 class="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">Homework 1</h3>
									<!--end::Title-->
									<!--begin::Text-->
									<p class="text-gray-600 fw-bold pt-3 mb-0">To start a blog, think of a topic about and first brainstorm ways to write details</p>
									<!--end::Text-->
								</div>
								<!--end::Section-->
							</div>
							<!--end::Item-->
							<!--begin::Item-->
							<div class="carousel-item">
								<!--begin::Section-->
								<div class="d-flex flex-column justify-content-between h-100">
									<!--begin::Title-->
									<h3 class="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">Homework 2</h3>
									<!--end::Title-->
									<!--begin::Text-->
									<p class="text-gray-600 fw-bold pt-3 mb-0">To start a blog, think of a topic about and first brainstorm ways to write details</p>
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
				<div class="card-footer border-0 pt-0 pb-10">
					
				</div>
				<!--end::Footer-->
			</div>
			<!--end::Stats Widget 8-->

		</div>

		<div class="col-xl-8">
			<div class="card">
            <div class="card-body py-10">
                <h2 class="text-gray-900 fw-bold fs-1 mb-5">Lesson Articles</h2>

                <!--begin::Accordion-->
                <div class="accordion accordion-icon-toggle" id="kt_accordion_1">
                    <!--begin::Item-->
                    <div class="mb-5">
                        <!--begin::Header-->
                        <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse" data-bs-target="#kt_accordion_1_item_1" aria-expanded="true">
                            <span class="accordion-icon"><i class="ki-duotone ki-arrow-right fs-4"><span class="path1"></span><span class="path2"></span></i></span>
                            <h3 class="fs-4 text-gray-800 fw-semibold mb-0 ms-4">1. Decomposition</h3>
                        </div>
                        <!--end::Header-->

                        <!--begin::Body-->
                        <div id="kt_accordion_1_item_1" class="fs-6 ps-10 collapse show" data-bs-parent="#kt_accordion_1" style="">
                            <div class="mb-5">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </div>

                            <div>
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Item-->

                    <!--begin::Item-->
                    <div class="mb-5">
                        <!--begin::Header-->
                        <div class="accordion-header py-3 d-flex collapsed" data-bs-toggle="collapse" data-bs-target="#kt_accordion_1_item_2" aria-expanded="false">
                            <span class="accordion-icon"><i class="ki-duotone ki-arrow-right fs-4"><span class="path1"></span><span class="path2"></span></i></span>
                            <h3 class="fs-4 text-gray-800 fw-semibold mb-0 ms-4">2. Pattern Recognition</h3>
                        </div>
                        <!--end::Header-->

                        <!--begin::Body-->
                        <div id="kt_accordion_1_item_2" class="collapse fs-6 ps-10" data-bs-parent="#kt_accordion_1">
                            <div class="mb-5">
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                            </div>

                            <div class="mb-5">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </div>
                            
                            <div>
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Item-->

                    <!--begin::Item-->
                    <div class="mb-5">
                        <!--begin::Header-->
                        <div class="accordion-header py-3 d-flex collapsed" data-bs-toggle="collapse" data-bs-target="#kt_accordion_1_item_3" aria-expanded="false">
                            <span class="accordion-icon"><i class="ki-duotone ki-arrow-right fs-4"><span class="path1"></span><span class="path2"></span></i></span>
                            <h3 class="fs-4 text-gray-800 fw-semibold mb-0 ms-4">3. Abstraction</h3>
                        </div>
                        <!--end::Header-->

                        <!--begin::Body-->
                        <div id="kt_accordion_1_item_3" class="collapse fs-6 ps-10" data-bs-parent="#kt_accordion_1">
                            Some plugins may ask for a purchase code for registration/activation once installed,
                            however, you can simply ignore these messages as bundled plugins do not require activation or registration.
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Item-->

                </div>
                <!--end::Accordion-->
            </div>
        </div>
		</div>
  	</div>
  <!--end::Row-->

      <!--begin::Modal - Select Location-->
      <div class="modal fade" id="kt_modal_select_location" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Individual Question</h5>
              <!--begin::Close-->
              <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <!--begin::Svg Icon | path: icons/duotone/Navigation/Close.svg-->
                <span class="svg-icon svg-icon-2x">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                    height="24px" viewBox="0 0 24 24" version="1.1">
                    <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                      fill="#000000">
                      <rect fill="#000000" x="0" y="7" width="16" height="2" rx="1" />
                      <rect fill="#000000" opacity="0.5"
                        transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
                        x="0" y="7" width="16" height="2" rx="1" />
                    </g>
                  </svg>
                </span>
                <!--end::Svg Icon-->
              </div>
              <!--end::Close-->
            </div>
            <div class="modal-body">
              <!--begin::Feeds Widget 4-->
              <div class="card mb-0 mb-xxl-8">
                <!--begin::Body-->
                <div class="card-body p-0">
                  <!--begin::Container-->
                  <div class="">
                    <!--begin::Header-->
                    <div class="d-flex align-items-center pb-4">
                      <!--begin::Symbol-->
                      <div class="symbol symbol-45px symbol-light me-5">
                        <span class="symbol-label align-items-end">
                          <img alt="Logo" src="/src/assets/media/svg/avatars/018-girl-9.svg" class="mh-40px" />
                        </span>
                      </div>
                      <!--end::Symbol-->
                      <!--begin::Info-->
                      <div class="d-flex flex-column flex-grow-1">
                        <a href="#" class="text-gray-800 text-hover-primary mb-1 fs-6 fw-bolder">Grace Logan</a>
                        <span class="text-muted fw-bold">Yestarday at 5:06 PM</span>
                      </div>
                      <!--end::Info-->

                    </div>
                    <!--end::Header-->
                    <!--begin::Body-->
                    <div>
                      <!--begin::Text-->
                      <p class="text-gray-800 fs-6 fw-normal">Outlines keep you honest. They stop you from indulging in
                        poorly thought-out metaphors about driving and keep you focused on the overall structure of your
                        post</p>
                      <!--end::Text-->
                      <!--begin::Action-->
                      <div class="d-flex align-items-center">
                        <a href="#" class="btn btn-sm btn-color-muted btn-active-light-primary fw-bolder">
                          <!--begin::Svg Icon | path: icons/duotone/Communication/Group-chat.svg-->
                          <span class="svg-icon svg-icon-3 pe-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                              version="1.1">
                              <path
                                d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z"
                                fill="#000000" />
                              <path
                                d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z"
                                fill="#000000" opacity="0.3" />
                            </svg>
                          </span>
                          <!--end::Svg Icon-->24</a>
                        <a href="#" class="btn btn-sm btn-color-muted btn-active-light-danger fw-bolder">
                          <!--begin::Svg Icon | path: icons/duotone/General/Heart.svg-->
                          <span class="svg-icon svg-icon-3 pe-1">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24" />
                                <path
                                  d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z"
                                  fill="#000000" fill-rule="nonzero" />
                              </g>
                            </svg>
                          </span>
                          <!--end::Svg Icon-->75</a>
                      </div>
                      <!--end::Action-->

                    </div>
                    <!--end::Body-->
                  </div>
                  <!--end::Container-->
                  <!--begin::Separator-->
                  <div class="separator mt-5"></div>
                  <!--end::Separator-->
                  <!--begin::Editor-->
                  <form class="position-relative py-4 d-flex align-items-center pb-5">
                    <textarea data-kt-autosize="true" class="form-control min-h-auto border-0 p-0 pe-10 resize-none"
                      rows="3" placeholder="Reply3..."></textarea>
                    <div class="position-absolute top-0 end-0 mt-2 me-n3">
                      <span class="btn btn-icon btn-sm btn-active-color-primary">
                        <i class="fas fa-paperclip fs-6"></i>
                      </span>
                      
                    </div>
                  </form>
                  <!--edit::Editor-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Feeds Widget 4-->

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light-primary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button id="submit" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--end::Modal - Select Location-->
  </div>
  <!--end::Container-->
</div>
<!--end::Content-->
</div>


      
</template>
