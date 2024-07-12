<script setup>
import { RouterLink, useRoute } from 'vue-router';
import classListService from '@/services/classListService';
import ClassItemToolbar from '@/components/classItem/ClassItemToolbar.vue'

import ClassItemContentLeftSection from '@/components/classItem/ClassItemContentLeftSection.vue';

const imgUrl = new URL('/src/assets/media/stock/900x600/3.jpg', import.meta.url).href
const styleObject = {
	backgroundImage: `url(${imgUrl})`
}

const route = useRoute()
var id = route.params.id;
var selectedClass = classListService.getClassById(id);

</script>

<template>

  <div class="d-flex flex-column flex-column-fluid">


<!--begin::toolbar-->
<ClassItemToolbar>

</ClassItemToolbar>
						<!--end::toolbar-->

<!--begin::Content-->
<div class="content fs-6 d-flex flex-column-fluid" id="kt_content" style="padding: 20px 0;">
  <!--begin::Container-->
  <div class="container">
    

  <!--begin::Row-->
  <div class="row g-0 g-xl-5 g-xxl-8">
									<div class="col-xl-4">

                    <ClassItemContentLeftSection :active-section="1"></ClassItemContentLeftSection>

	</div>

									<div class="col-xl-8">
                    


										<!--begin::Feeds Widget 4-->
										<div class="card mb-5 mb-xxl-8">
											<!--begin::Body-->
											<div class="card-body pb-0">
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
														<!--begin::Dropdown-->
														<button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
															<!--begin::Svg Icon | path: icons/duotone/Layout/Layout-4-blocks-2.svg-->
															<span class="svg-icon svg-icon-1">
																<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																		<rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
																		<rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
																		<rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
																		<rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
																	</g>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</button>
														<!--begin::Menu-->
														<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px" data-kt-menu="true">
															<div class="menu-item px-3">
																<div class="menu-content fs-6 text-dark fw-bolder px-3 py-4">Manage</div>
															</div>
															<div class="separator mb-3 opacity-75"></div>
															<div class="menu-item px-3">
																<a href="#" class="menu-link px-3">Add User</a>
															</div>
															<div class="menu-item px-3">
																<a href="#" class="menu-link px-3">Add Role</a>
															</div>
															<div class="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start" data-kt-menu-flip="left-start, top">
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
																	<a class="btn btn-primary fw-bold btn-sm px-4" href="#">Create New</a>
																</div>
															</div>
														</div>
														<!--end::Menu-->
														<!--end::Dropdown-->
													</div>
													<!--end::Header-->
													<!--begin::Body-->
													<div>
														<!--begin::Text-->
														<p class="text-gray-800 fs-6 fw-normal">What are Components of Computational Thinking?</p>
														<!--end::Text-->
														<!--begin::Action-->
														<div class="d-flex align-items-center">
															<a href="#" class="btn btn-sm btn-color-muted btn-active-light-primary fw-bolder">
															<!--begin::Svg Icon | path: icons/duotone/Communication/Group-chat.svg-->
															<span class="svg-icon svg-icon-3 pe-2">
																<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000" />
																	<path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3" />
																</svg>
															</span>
															<!--end::Svg Icon-->2</a>
															<a href="#" class="btn btn-sm btn-color-muted btn-active-light-danger fw-bolder">
															<!--begin::Svg Icon | path: icons/duotone/General/Heart.svg-->
															<span class="svg-icon svg-icon-3 pe-1">
																<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																		<polygon points="0 0 24 0 24 24 0 24" />
																		<path d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z" fill="#000000" fill-rule="nonzero" />
																	</g>
																</svg>
															</span>
															<!--end::Svg Icon-->10</a>
														</div>
														<!--end::Action-->
														<!--begin::Item-->
														<div class="d-flex py-5">
															<!--begin::Symbol-->
															<div class="symbol symbol-40px me-5">
																<span class="symbol-label bg-light align-items-end">
																	<img alt="Logo" src="/src/assets/media/svg/avatars/009-boy-4.svg" class="mh-35px" />
																</span>
															</div>
															<!--end::Symbol-->
															<!--begin::Info-->
															<div class="d-flex flex-column flex-row-fluid">
																<!--begin::Info-->
																<div class="d-flex align-items-center flex-wrap">
																	<a href="#" class="text-gray-800 text-hover-primary mb-1 fs-6 fw-bolder pe-6">Mr. Anderson</a>
																	<span class="text-muted fw-normal flex-grow-1 fs-7">1 Day ago</span>
																	<!-- <a href="#" class="text-muted text-hover-primary fw-normal fs-7">Reply</a> -->
																</div>
																<span class="text-gray-800 fs-7 fw-normal pt-1">
                                  <pre>
There are 4 Components of Computational Thinking:

1. Decomposition:
Breaking down complex problems into smaller, more manageable parts.
Example: Splitting a large software project into individual modules or tasks.

2. Pattern Recognition:
Identifying similarities or patterns within problems.
Example: Noticing that a sorting problem can be approached with the same algorithm used for another similar dataset.

3. Abstraction:
Focusing on the important information only, and ignoring irrelevant detail.
Example: Creating a model or representation of a real-world problem that captures its essential features while omitting unnecessary details.

4. Algorithm Design:
Developing a step-by-step solution to the problem or a set of rules to follow in order to solve the problem.
Example: Writing a procedure or code that systematically addresses each aspect of the problem.
                                  </pre>
                                </span>
																<!--end::Info-->
															</div>
															<!--end::Info-->
														</div>
														<!--end::Item-->
														<!--begin::Item-->
														<div class="d-flex">
															<!--begin::Symbol-->
															<div class="symbol symbol-40px me-5">
																<span class="symbol-label bg-light align-items-end">
																	<img alt="Logo" src="/src/assets/media/svg/avatars/003-girl-1.svg" class="mh-35px" />
																</span>
															</div>
															<!--end::Symbol-->
															<!--begin::Info-->
															<div class="d-flex flex-column flex-row-fluid">
																<!--begin::Info-->
																<div class="d-flex align-items-center flex-wrap">
																	<a href="#" class="text-gray-800 text-hover-primary mb-1 fs-6 fw-bolder pe-6">Mrs. Anderson</a>
																	<span class="text-muted fw-normal flex-grow-1 fs-7">2 Days ago</span>
																	<!-- <a href="#" class="text-muted text-hover-primary fw-normal fs-7">Reply</a> -->
																</div>
																<span class="text-gray-800 fs-7 fw-normal pt-1">
                                  Developing Computational Thinking Skills by Practice Coding,
Engage in Problem-Solving Activities, Collaborate with Others, Learn and Use Computational Tools.

Utilizing tools and software designed to aid in computational tasks, such as spreadsheets, databases, and programming languages.

                                </span>
																<!--end::Info-->
															</div>
															<!--end::Info-->
														</div>
														<!--end::Item-->
													</div>
													<!--end::Body-->
												</div>
												<!--end::Container-->
												<!--begin::Separator-->
												<div class="separator mt-5"></div>
												<!--end::Separator-->
												<!--begin::Editor-->
												<form class="position-relative py-4 d-flex align-items-center pb-5">
													<textarea data-kt-autosize="true" class="form-control min-h-auto border-0 p-0 pe-10 resize-none" rows="1" placeholder="Reply2..."></textarea>
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

										<!--begin::Feeds Widget 2-->
										<div class="card mb-5 mb-xxl-8">
											<!--begin::Body-->
											<div class="card-body pb-0">
												<!--begin::Header-->
												<div class="d-flex align-items-center">
													<!--begin::Symbol-->
													<div class="symbol symbol-45px me-5">
														<span class="symbol-label bg-light align-items-end">
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
													<!--begin::Dropdown-->
													<button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
														<!--begin::Svg Icon | path: icons/duotone/Layout/Layout-4-blocks-2.svg-->
														<span class="svg-icon svg-icon-1">
															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																	<rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
																	<rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
																	<rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
																	<rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
																</g>
															</svg>
														</span>
														<!--end::Svg Icon-->
													</button>
													<!--begin::Menu-->
													<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px" data-kt-menu="true">
														<div class="menu-item px-3">
															<div class="menu-content fs-6 text-dark fw-bolder px-3 py-4">Manage</div>
														</div>
														<div class="separator mb-3 opacity-75"></div>
														<div class="menu-item px-3">
															<a href="#" class="menu-link px-3">Add User</a>
														</div>
														<div class="menu-item px-3">
															<a href="#" class="menu-link px-3">Add Role</a>
														</div>
														<div class="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start" data-kt-menu-flip="left-start, top">
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
																<a class="btn btn-primary fw-bold btn-sm px-4" href="#">Create New</a>
															</div>
														</div>
													</div>
													<!--end::Menu-->
													<!--end::Dropdown-->
												</div>
												<!--end::Header-->
												<!--begin::Body-->
												<div class="pt-5">
													<!--begin::Text-->
													<p class="text-gray-800 fs-6 fw-normal mb-2">Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors about driving and keep you focused on the overall structure of your post</p>
													<!--end::Text-->
													<!--begin::Action-->
													<div class="d-flex align-items-center">
														<a href="#" class="btn btn-sm btn-color-muted btn-active-light-primary fw-bolder">
														<!--begin::Svg Icon | path: icons/duotone/Communication/Group-chat.svg-->
														<span class="svg-icon svg-icon-3 pe-2">
															<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																<path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000" />
																<path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3" />
															</svg>
														</span>
														<!--end::Svg Icon-->5</a>
														<a href="#" class="btn btn-sm btn-color-muted btn-active-light-danger fw-bolder">
														<!--begin::Svg Icon | path: icons/duotone/General/Heart.svg-->
														<span class="svg-icon svg-icon-3 pe-1">
															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																	<polygon points="0 0 24 0 24 24 0 24" />
																	<path d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z" fill="#000000" fill-rule="nonzero" />
																</g>
															</svg>
														</span>
														<!--end::Svg Icon-->5</a>
													</div>
													<!--end::Action-->
												</div>
												<!--end::Body-->
												<!--begin::Separator-->
												<div class="separator pt-4"></div>
												<!--end::Separator-->
												<!--begin::Editor-->
                        <div class="d-flex align-items-center flex-nowrap text-nowrap overflow-auto py-1">
                          <a href="#" class="btn btn-primary btn-sm"
                          data-bs-toggle="modal" data-bs-target="#kt_modal_select_location">Submit Your Answer                                    </a>
                        </div>

												
												<!--edit::Editor-->
											</div>
											<!--end::Body-->
										</div>
										<!--end::Feeds Widget 2-->

                    										<!--begin::Feeds Widget 3-->
										<div class="card mb-5 mb-xxl-8">
											<!--begin::Body-->
											<div class="card-body pb-0">
												<!--begin::Top-->
												<div class="d-flex align-items-center">
													<!--begin::Symbol-->
													<div class="symbol symbol-45px me-5">
														<span class="symbol-label bg-light align-items-end">
															<img alt="Logo" src="/src/assets/media/svg/avatars/047-girl-25.svg" class="mh-40px" />
														</span>
													</div>
													<!--end::Symbol-->
													<!--begin::Info-->
													<div class="d-flex flex-column flex-grow-1">
														<a href="#" class="text-gray-800 text-hover-primary mb-1 fs-6 fw-bolder">Ruby Liam</a>
														<span class="text-muted fw-bold">Yestarday at 5:06 PM</span>
													</div>
													<!--end::Info-->
													<!--begin::Dropdown Menu-->
													<div class="dropdown dropdown-inline">
														<button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-bs-toggle="dropdown">
															<!--begin::Svg Icon | path: icons/duotone/Text/Dots.svg-->
															<span class="svg-icon svg-icon-4">
																<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																	<g stroke="none" stroke-width="1">
																		<rect x="14" y="9" width="6" height="6" rx="3" fill="black" />
																		<rect x="3" y="9" width="6" height="6" rx="3" fill="black" fill-opacity="0.7" />
																	</g>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</button>
														<div class="dropdown-menu dropdown-menu-end w-md-325px p-0 m-0">
															<!--begin::Form-->
															<div class="menu menu-sub menu-sub-dropdown menu-column w-300px w-lg-350px p-5" data-kt-menu="true">
																<!--begin::Input-->
																<div class="input-group input-group-solid mb-5">
																	<div class="input-group-prepend">
																		<span class="input-group-text">
																			<!--begin::Svg Icon | path: icons/duotone/General/Search.svg-->
																			<span class="svg-icon svg-icon-4">
																				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																						<rect x="0" y="0" width="24" height="24" />
																						<path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
																						<path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero" />
																					</g>
																				</svg>
																			</span>
																			<!--end::Svg Icon-->
																		</span>
																	</div>
																	<input type="text" class="form-control ps-0" name="search" value="" placeholder="Filter reports" />
																</div>
																<!--end::Input-->
																<!--begin::Tabs-->
																<ul class="nav nav-line-tabs nav-line-tabs-2x border-light fw-bold mb-5">
																	<li class="nav-item">
																		<a class="nav-link active" data-bs-toggle="tab" href="#kt_dropdown_2_tab_1">Today</a>
																	</li>
																	<li class="nav-item">
																		<a class="nav-link" data-bs-toggle="tab" href="#kt_dropdown_2_tab_2">Last Week</a>
																	</li>
																</ul>
																<!--end::Tabs-->
																<!--begin::Tab Content-->
																<div class="tab-content">
																	<!--begin::Tab Pane-->
																	<div class="tab-pane active" id="kt_dropdown_2_tab_1">
																		<ul class="menu menu-custom menu-column menu-rounded menu-title-gray-600 menu-icon-muted menu-hover-bg-light-primary menu-active-bg-light-primary fw-bold">
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Files/Media.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																									<polygon points="0 0 24 0 24 24 0 24" />
																									<path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
																									<path d="M10.782158,15.8052934 L15.1856088,12.7952868 C15.4135806,12.6394552 15.4720618,12.3283211 15.3162302,12.1003494 C15.2814587,12.0494808 15.2375842,12.0054775 15.1868178,11.970557 L10.783367,8.94156929 C10.5558531,8.78507001 10.2445489,8.84263875 10.0880496,9.07015268 C10.0307022,9.15352258 10,9.25233045 10,9.35351969 L10,15.392514 C10,15.6686564 10.2238576,15.892514 10.5,15.892514 C10.6006894,15.892514 10.699033,15.8621141 10.782158,15.8052934 Z" fill="#000000" />
																								</g>
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Web &amp; App History</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Communication/Mail-heart.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<path d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,13 C19,13.5522847 18.5522847,14 18,14 L6,14 C5.44771525,14 5,13.5522847 5,13 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M13.8,4 C13.1562,4 12.4033,4.72985286 12,5.2 C11.5967,4.72985286 10.8438,4 10.2,4 C9.0604,4 8.4,4.88887193 8.4,6.02016349 C8.4,7.27338783 9.6,8.6 12,10 C14.4,8.6 15.6,7.3 15.6,6.1 C15.6,4.96870845 14.9396,4 13.8,4 Z" fill="#000000" opacity="0.3" />
																								<path d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z" fill="#000000" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Activity and Timeline</span>
																					<span class="menu-badge badge badge-light-danger fw-bold">new</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Communication/Incoming-box.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<path d="M22,17 L22,21 C22,22.1045695 21.1045695,23 20,23 L4,23 C2.8954305,23 2,22.1045695 2,21 L2,17 L6.27924078,17 L6.82339262,18.6324555 C7.09562072,19.4491398 7.8598984,20 8.72075922,20 L15.381966,20 C16.1395101,20 16.8320364,19.5719952 17.1708204,18.8944272 L18.118034,17 L22,17 Z" fill="#000000" />
																								<path d="M2.5625,15 L5.92654389,9.01947752 C6.2807805,8.38972356 6.94714834,8 7.66969497,8 L16.330305,8 C17.0528517,8 17.7192195,8.38972356 18.0734561,9.01947752 L21.4375,15 L18.118034,15 C17.3604899,15 16.6679636,15.4280048 16.3291796,16.1055728 L15.381966,18 L8.72075922,18 L8.17660738,16.3675445 C7.90437928,15.5508602 7.1401016,15 6.27924078,15 L2.5625,15 Z" fill="#000000" opacity="0.3" />
																								<path d="M11.1288761,0.733697713 L11.1288761,2.69017121 L9.12120481,2.69017121 C8.84506244,2.69017121 8.62120481,2.91402884 8.62120481,3.19017121 L8.62120481,4.21346991 C8.62120481,4.48961229 8.84506244,4.71346991 9.12120481,4.71346991 L11.1288761,4.71346991 L11.1288761,6.66994341 C11.1288761,6.94608579 11.3527337,7.16994341 11.6288761,7.16994341 C11.7471877,7.16994341 11.8616664,7.12798964 11.951961,7.05154023 L15.4576222,4.08341738 C15.6683723,3.90498251 15.6945689,3.58948575 15.5161341,3.37873564 C15.4982803,3.35764848 15.4787093,3.33807751 15.4576222,3.32022374 L11.951961,0.352100892 C11.7412109,0.173666017 11.4257142,0.199862688 11.2472793,0.410612793 C11.1708299,0.500907473 11.1288761,0.615386087 11.1288761,0.733697713 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.959697, 3.661508) rotate(-270.000000) translate(-11.959697, -3.661508)" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Business Features</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Design/Flatten.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<circle fill="#000000" cx="9" cy="15" r="6" />
																								<path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Accessibility Settings</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Design/Saturation.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<path d="M7,14 C7,16.7614237 9.23857625,19 12,19 C14.7614237,19 17,16.7614237 17,14 C17,12.3742163 15.3702913,9.86852817 12,6.69922982 C8.62970872,9.86852817 7,12.3742163 7,14 Z M12,21 C8.13400675,21 5,17.8659932 5,14 C5,11.4226712 7.33333333,8.08933783 12,4 C16.6666667,8.08933783 19,11.4226712 19,14 C19,17.8659932 15.8659932,21 12,21 Z" fill="#000000" fill-rule="nonzero" />
																								<path d="M12,4 C16.6666667,8.08933783 19,11.4226712 19,14 C19,17.8659932 15.8659932,21 12,21 L12,4 Z" fill="#000000" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Data &amp; Personalisation</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/General/Notification2.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																									<rect x="0" y="0" width="24" height="24" />
																									<path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#000000" />
																									<circle fill="#000000" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
																								</g>
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">General Preference</span>
																				</a>
																			</li>
																		</ul>
																	</div>
																	<!--end::Tab Pane-->
																	<!--begin::Tab Pane-->
																	<div class="tab-pane" id="kt_dropdown_2_tab_2">
																		<ul class="menu menu-custom menu-column menu-rounded menu-title-gray-600 menu-icon-muted menu-hover-bg-light-primary menu-active-bg-light-primary fw-bold">
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link active px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Communication/Mail-heart.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<path d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,13 C19,13.5522847 18.5522847,14 18,14 L6,14 C5.44771525,14 5,13.5522847 5,13 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M13.8,4 C13.1562,4 12.4033,4.72985286 12,5.2 C11.5967,4.72985286 10.8438,4 10.2,4 C9.0604,4 8.4,4.88887193 8.4,6.02016349 C8.4,7.27338783 9.6,8.6 12,10 C14.4,8.6 15.6,7.3 15.6,6.1 C15.6,4.96870845 14.9396,4 13.8,4 Z" fill="#000000" opacity="0.3" />
																								<path d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z" fill="#000000" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Activity and Timeline</span>
																					<span class="menu-badge badge badge-danger fw-bold">new</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Communication/Incoming-box.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<path d="M22,17 L22,21 C22,22.1045695 21.1045695,23 20,23 L4,23 C2.8954305,23 2,22.1045695 2,21 L2,17 L6.27924078,17 L6.82339262,18.6324555 C7.09562072,19.4491398 7.8598984,20 8.72075922,20 L15.381966,20 C16.1395101,20 16.8320364,19.5719952 17.1708204,18.8944272 L18.118034,17 L22,17 Z" fill="#000000" />
																								<path d="M2.5625,15 L5.92654389,9.01947752 C6.2807805,8.38972356 6.94714834,8 7.66969497,8 L16.330305,8 C17.0528517,8 17.7192195,8.38972356 18.0734561,9.01947752 L21.4375,15 L18.118034,15 C17.3604899,15 16.6679636,15.4280048 16.3291796,16.1055728 L15.381966,18 L8.72075922,18 L8.17660738,16.3675445 C7.90437928,15.5508602 7.1401016,15 6.27924078,15 L2.5625,15 Z" fill="#000000" opacity="0.3" />
																								<path d="M11.1288761,0.733697713 L11.1288761,2.69017121 L9.12120481,2.69017121 C8.84506244,2.69017121 8.62120481,2.91402884 8.62120481,3.19017121 L8.62120481,4.21346991 C8.62120481,4.48961229 8.84506244,4.71346991 9.12120481,4.71346991 L11.1288761,4.71346991 L11.1288761,6.66994341 C11.1288761,6.94608579 11.3527337,7.16994341 11.6288761,7.16994341 C11.7471877,7.16994341 11.8616664,7.12798964 11.951961,7.05154023 L15.4576222,4.08341738 C15.6683723,3.90498251 15.6945689,3.58948575 15.5161341,3.37873564 C15.4982803,3.35764848 15.4787093,3.33807751 15.4576222,3.32022374 L11.951961,0.352100892 C11.7412109,0.173666017 11.4257142,0.199862688 11.2472793,0.410612793 C11.1708299,0.500907473 11.1288761,0.615386087 11.1288761,0.733697713 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.959697, 3.661508) rotate(-270.000000) translate(-11.959697, -3.661508)" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Business Features</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Design/Flatten.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<circle fill="#000000" cx="9" cy="15" r="6" />
																								<path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Accessibility Settings</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Design/Saturation.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<path d="M7,14 C7,16.7614237 9.23857625,19 12,19 C14.7614237,19 17,16.7614237 17,14 C17,12.3742163 15.3702913,9.86852817 12,6.69922982 C8.62970872,9.86852817 7,12.3742163 7,14 Z M12,21 C8.13400675,21 5,17.8659932 5,14 C5,11.4226712 7.33333333,8.08933783 12,4 C16.6666667,8.08933783 19,11.4226712 19,14 C19,17.8659932 15.8659932,21 12,21 Z" fill="#000000" fill-rule="nonzero" />
																								<path d="M12,4 C16.6666667,8.08933783 19,11.4226712 19,14 C19,17.8659932 15.8659932,21 12,21 L12,4 Z" fill="#000000" />
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Data &amp; Personalisation</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/General/Notification2.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																									<rect x="0" y="0" width="24" height="24" />
																									<path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#000000" />
																									<circle fill="#000000" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
																								</g>
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">General Preference</span>
																				</a>
																			</li>
																			<li class="menu-item py-1">
																				<a href="#" class="menu-link px-3">
																					<span class="menu-icon">
																						<!--begin::Svg Icon | path: icons/duotone/Files/Media.svg-->
																						<span class="svg-icon svg-icon-1">
																							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																									<polygon points="0 0 24 0 24 24 0 24" />
																									<path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
																									<path d="M10.782158,15.8052934 L15.1856088,12.7952868 C15.4135806,12.6394552 15.4720618,12.3283211 15.3162302,12.1003494 C15.2814587,12.0494808 15.2375842,12.0054775 15.1868178,11.970557 L10.783367,8.94156929 C10.5558531,8.78507001 10.2445489,8.84263875 10.0880496,9.07015268 C10.0307022,9.15352258 10,9.25233045 10,9.35351969 L10,15.392514 C10,15.6686564 10.2238576,15.892514 10.5,15.892514 C10.6006894,15.892514 10.699033,15.8621141 10.782158,15.8052934 Z" fill="#000000" />
																								</g>
																							</svg>
																						</span>
																						<!--end::Svg Icon-->
																					</span>
																					<span class="menu-title">Web &amp; App History</span>
																				</a>
																			</li>
																		</ul>
																	</div>
																	<!--end::Tab Pane-->
																</div>
																<!--end::Tab Content-->
															</div>
															<!--end::Form-->
														</div>
													</div>
													<!--end::Dropdown Menu-->
												</div>
												<!--end::Top-->
												<!--begin::Bottom-->
												<div class="pt-4">
													<!-- :style="{backgroundImage: `url({{ imgUrl }})`}" -->
													<!--begin::Image-->
													<div class="bgi-no-repeat bgi-size-cover rounded min-h-250px" :style="styleObject"></div>
													<!--end::Image-->
													<!--begin::Text-->
													<p class="text-gray-800 fs-6 fw-normal pt-5 mb-2">Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors about driving and keep you focused on the overall structure of your post</p>
													<!--end::Text-->
													<!--begin::Action-->
													<div class="d-flex align-items-center">
														<a href="#" class="btn btn-sm btn-color-muted btn-active-light-primary fw-bolder">
														<!--begin::Svg Icon | path: icons/duotone/Communication/Group-chat.svg-->
														<span class="svg-icon svg-icon-4">
															<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																<path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000" />
																<path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3" />
															</svg>
														</span>
														<!--end::Svg Icon-->0</a>
														<a href="#" class="btn btn-sm btn-color-muted btn-active-light-danger fw-bolder">
														<!--begin::Svg Icon | path: icons/duotone/General/Heart.svg-->
														<span class="svg-icon svg-icon-3 pe-1">
															<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																	<polygon points="0 0 24 0 24 24 0 24" />
																	<path d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z" fill="#000000" fill-rule="nonzero" />
																</g>
															</svg>
														</span>
														<!--end::Svg Icon-->1</a>
													</div>
													<!--end::Action-->
												</div>
												<!--end::Bottom-->
												<!--begin::Separator-->
												<div class="separator mt-2"></div>
												<!--end::Separator-->
												<!--begin::Editor-->
												<form class="position-relative py-4 d-flex align-items-center pb-5">
													<textarea data-kt-autosize="true" class="form-control min-h-auto border-0 p-0 pe-10 resize-none" rows="1" placeholder="Reply..."></textarea>
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
										<!--end::Feeds Widget 3-->
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
