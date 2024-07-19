@extends('candidate.profile.index')
@push('css')
    <link rel="stylesheet" href="{{ asset('css/bootstrap-datetimepicker.css') }}">
@endpush
@section('section')
    <div class="mb-xl-8">
        <div class="border-0">
            <div class="d-md-flex align-items-center justify-content-between mb-5 mx-3">
                <h1 class="mb-0">{{ __('messages.candidate_profile.experience') }}</h1>
                <div class="text-end mt-4 mt-md-0">
                    <a
                            class="btn btn-primary form-btn addExperienceModal" data-bs-toggle="modal"
                            data-bs-target="#addExperienceModal">{{ __('messages.candidate_profile.add_experience') }}  </a>
                </div>
            </div>

            <div class="pt-0 fs-6 py-8 px-3 text-gray-700">
                {{Form::hidden(null,__('messages.candidate_profile.present'),['id' => 'candidatePresentMsg'])}}
                <div class="row">
                    <div class="candidate-experience-container">
                        <div class="col-12 {{ ($data['candidateExperiences']->count()) ? 'd-none' : '' }}"
                             id="notfoundExperience">
                            <h5 class="product-item pb-5 d-flex justify-content-center text-gray-600">
                                {{ __('messages.candidate.experience_not_found') }}
                            </h5>
                        </div>
                        @php
                            /** @var \App\Models\CandidateExperience $candidateExperience */
                        @endphp
                        @foreach($data['candidateExperiences'] as $candidateExperience)
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 candidate-experience rounded shadow p-5 mb-5 card"
                                 data-experience-id="{{ $loop->index }}" data-id="{{ $candidateExperience->id }}">
                                <article class="article article-style-b">
                                    <div class="article-details">
                                        <div class="d-flex justify-content-between">
                                            <div class="article-title">
                                                <h4 class="text-primary">{{ $candidateExperience->experience_title }}</h4>
                                                <h6 class="text-muted">{{ $candidateExperience->company }}</h6>
                                            </div>
                                            <div class="article-cta candidate-experience-edit-delete">
                                        <a href="javascript:void(0)"
                                           class="edit-candidate-experience btn px-2 text-primary fs-3 ps-0"
                                           title="{{__('messages.common.edit')}}" data-bs-toggle="tooltip"
                                           data-id="{{ $candidateExperience->id }}"><i
                                                    class="fa-solid fa-pen-to-square"></i></a>
                                        <a href="javascript:void(0)"
                                           class="delete-experience btn px-2 text-danger fs-3 pe-0"
                                           title="{{__('messages.common.delete')}}" data-bs-toggle="tooltip"
                                           data-id="{{ $candidateExperience->id }}"><i class="fa-solid fa-trash"></i></a>
                                    </div>
                                </div>
                                <span class="text-muted">{{ \Carbon\Carbon::parse($candidateExperience->start_date)->translatedFormat('jS M, Y')}} - </span>

                                @if($candidateExperience->currently_working)
                                    <span class="text-muted">{{ __('messages.candidate_profile.present') }}</span>
                                @else
                                    <span
                                            class="text-muted"> {{\Carbon\Carbon::parse($candidateExperience->end_date)->translatedFormat('jS M, Y')}} </span>
                                        @endif
                                        <span class="text-muted"> | {{ $candidateExperience->country }}</span>
                                        @if(!empty($candidateExperience->description))
                                            <p class="mb-0 pb-md-0 pb-4">{{ Str::limit($candidateExperience->description,225,'...') }}</p>
                                        @endif
                                    </div>
                                </article>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div class="border-0 pt-6">
            <div class="d-md-flex align-items-center justify-content-between mb-5 mx-3">
                <h1 class="mb-0">{{ __('messages.candidate_profile.education') }}</h1>
                <div class="text-end mt-4 mt-md-0">
                    <a
                            class="btn btn-primary form-btn addEducationModal" data-bs-toggle="modal"
                            data-bs-target="#addEducationModal">{{ __('messages.candidate_profile.add_education') }}
                    </a>
                </div>
            </div>
            <div class="pt-0 fs-6 py-8 px-3 text-gray-700">
                <div class="row">
                    <div class="candidate-education-container">
                        <div class="col-12 {{ ($data['candidateEducations']->count()) ? 'd-none' : '' }}"
                     id="notfoundEducation">
                    <h5 class="product-item pb-5 d-flex justify-content-center text-gray-600">
                        {{ __('messages.candidate.education_not_found') }}
                    </h5>
                </div>
                @php
                    /** @var \App\Models\CandidateEducation $candidateEducation */
                @endphp
                @foreach($data['candidateEducations'] as $candidateEducation)
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 candidate-education shadow rounded p-5 mb-5 card"
                         data-education-id="{{ $loop->index }}" data-id="{{ $candidateEducation->id }}">
                        <article class="article article-style-b">
                            <div class="article-details">
                                <div class="d-flex justify-content-between">
                                    <div class="article-title">
                                        <h4 class="text-primary education-degree-level">{{ $candidateEducation->degreeLevel->name }}</h4>
                                        <h6 class="text-muted">{{ $candidateEducation->degree_title }}</h6>
                                    </div>
                                    <div class="article-cta candidate-education-edit-delete">
                                        <a href="javascript:void(0)"
                                           class="btn px-2 text-primary fs-3 ps-0 edit-candidate-education"
                                           title="{{__('messages.common.edit')}}" data-bs-toggle="tooltip"
                                           data-id="{{ $candidateEducation->id }}"><i
                                                    class="fa-solid fa-pen-to-square"></i></a>
                                        <a href="javascript:void(0)"
                                           class="delete-education btn px-2 text-danger fs-3 pe-0"
                                           title="{{__('messages.common.delete')}}" data-bs-toggle="tooltip"
                                           data-id="{{ $candidateEducation->id }}"><i class="fa-solid fa-trash"></i></a>
                                    </div>
                                </div>
                                <span
                                    class="text-muted">{{ $candidateEducation->year }} | {{ $candidateEducation->country }}</span>
                                <p class="mb-0 pb-md-0 pb-4">{{ $candidateEducation->institute }}</p>
                            </div>
                        </article>
                    </div>
                @endforeach
                    </div>
                </div>
            </div>

        </div>
        {{--    <section class="section">--}}
    {{--        <div class="section-header candidate-experience-header">--}}
    {{--            <h1>{{ __('messages.candidate_profile.experience') }}</h1>--}}
    {{--            <div class="section-header-breadcrumb justify-content-end">--}}
    {{--                <a--}}
    {{--                   class="btn btn-primary form-btn addExperienceModal" data-bs-toggle="modal"--}}
    {{--                   data-bs-target="#addExperienceModal">{{ __('messages.candidate_profile.add_experience') }}--}}
    {{--                    <i class="fas fa-plus"></i></a>--}}
    {{--            </div>--}}
    {{--        </div>--}}
    {{--        <div class="section-body">--}}
    {{--            <div class="row candidate-experience-container">--}}
    {{--                <div class="col-12 {{ ($data['candidateExperiences']->count()) ? 'd-none' : '' }}" id="notfoundExperience">--}}
    {{--                    <h4 class="product-item pb-5 d-flex justify-content-center">--}}
    {{--                        {{ __('messages.candidate.experience_not_found') }}--}}
    {{--                    </h4>--}}
    {{--                </div>--}}
    {{--                @php--}}
    {{--                /** @var \App\Models\CandidateExperience $candidateExperience */--}}
    {{--                @endphp--}}
    {{--                @foreach($data['candidateExperiences'] as $candidateExperience)--}}
    {{--                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 candidate-experience"--}}
    {{--                         data-experience-id="{{ $loop->index }}" data-id="{{ $candidateExperience->id }}">--}}
    {{--                        <article class="article article-style-b">--}}
    {{--                            <div class="article-details">--}}
    {{--                                <div class="article-title">--}}
    {{--                                    <h4 class="text-primary">{{ $candidateExperience->experience_title }}</h4>--}}
    {{--                                    <h6 class="text-muted">{{ $candidateExperience->company }}</h6>--}}
    {{--                                </div>--}}
    {{--                                <span class="text-muted">{{ \Carbon\Carbon::parse($candidateExperience->start_date)->format('jS M, Y')}} - </span>--}}

    {{--                                @if($candidateExperience->currently_working)--}}
    {{--                                    <span class="text-muted">{{ __('messages.candidate_profile.present') }}</span>--}}
    {{--                                @else--}}
    {{--                                    <span class="text-muted"> {{\Carbon\Carbon::parse($candidateExperience->end_date)->format('jS M, Y')}} </span>--}}
    {{--                                @endif--}}
    {{--                                <span> | {{ $candidateExperience->country }}</span>--}}
    {{--                                @if(!empty($candidateExperience->description))--}}
    {{--                                    <p class="mb-0 pb-md-0 pb-4">{{ Str::limit($candidateExperience->description,225,'...') }}</p>--}}
    {{--                                @endif--}}

    {{--                                <div class="article-cta candidate-experience-edit-delete">--}}
    {{--                                    <a href="javascript:void(0)" class="btn btn-warning action-btn edit-experience" title="Edit"--}}
    {{--                                       data-id="{{ $candidateExperience->id }}"><i class="fa fa-edit p-1"></i></a>--}}
    {{--                                    <a href="javascript:void(0)" class="btn btn-danger action-btn delete-experience" title="Delete"--}}
    {{--                                       data-id="{{ $candidateExperience->id }}"><i class="fa fa-trash p-1"></i></a>--}}
    {{--                                </div>--}}
    {{--                            </div>--}}
    {{--                        </article>--}}
    {{--                    </div>--}}
    {{--                @endforeach--}}
    {{--            </div>--}}
    {{--        </div>--}}
    {{--    </section>--}}
    {{--    <br>--}}
    {{--    <section class="section">--}}
    {{--        <div class="section-header candidate-experience-header">--}}
    {{--            <h1>{{ __('messages.candidate_profile.education') }}</h1>--}}
    {{--            <div class="section-header-breadcrumb justify-content-end">--}}
    {{--                <a--}}
    {{--                   class="btn btn-primary form-btn addEducationModal" data-bs-toggle="modal"--}}
    {{--                   data-bs-target="#addEducationModal">{{ __('messages.candidate_profile.add_education') }}--}}
    {{--                    <i class="fas fa-plus"></i></a>--}}
    {{--            </div>--}}
    {{--        </div>--}}
    {{--        <div class="section-body">--}}
    {{--            <div class="row candidate-education-container">--}}
    {{--                <div class="col-12 {{ ($data['candidateEducations']->count()) ? 'd-none' : '' }}" id="notfoundEducation">--}}
    {{--                    <h4 class="product-item pb-5 d-flex justify-content-center">--}}
    {{--                        {{ __('messages.candidate.education_not_found') }}--}}
    {{--                    </h4>--}}
    {{--                </div>--}}
    {{--                @php--}}
    {{--                    /** @var \App\Models\CandidateEducation $candidateEducation */--}}
    {{--                @endphp--}}
    {{--                @foreach($data['candidateEducations'] as $candidateEducation)--}}
    {{--                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 candidate-education"--}}
    {{--                         data-education-id="{{ $loop->index }}" data-id="{{ $candidateEducation->id }}">--}}
    {{--                        <article class="article article-style-b">--}}
    {{--                            <div class="article-details">--}}
    {{--                                <div class="article-title">--}}
    {{--                                    <h4 class="text-primary education-degree-level">{{ $candidateEducation->degreeLevel->name }}</h4>--}}
    {{--                                    <h6 class="text-muted">{{ $candidateEducation->degree_title }}</h6>--}}
    {{--                                </div>--}}
    {{--                                <span class="text-muted">{{ $candidateEducation->year }} | {{ $candidateEducation->country }}</span>--}}
    {{--                                <p class="mb-0 pb-md-0 pb-4">{{ $candidateEducation->institute }}</p>--}}
    {{--                                <div class="article-cta candidate-education-edit-delete">--}}
    {{--                                    <a href="javascript:void(0)" class="btn btn-warning action-btn edit-education" title="Edit"--}}
    {{--                                       data-id="{{ $candidateEducation->id }}"><i class="fa fa-edit p-1"></i></a>--}}
    {{--                                    <a href="javascript:void(0)" class="btn btn-danger action-btn delete-education" title="Delete"--}}
    {{--                                       data-id="{{ $candidateEducation->id }}"><i class="fa fa-trash p-1"></i></a>--}}
    {{--                                </div>--}}
    {{--                            </div>--}}
    {{--                        </article>--}}
    {{--                    </div>--}}
    {{--                @endforeach--}}
    {{--            </div>--}}
    {{--        </div>--}}
    {{--    </section>--}}
    @include('candidate.profile.modals.add_experience_modal')
    @include('candidate.profile.modals.add_education_modal')
    @include('candidate.profile.modals.edit_experience_modal')
    @include('candidate.profile.modals.edit_education_modal')
    @include('candidate.profile.templates.templates')
    {{Form::hidden('indexCareerInfoData',true,['id'=>'indexCareerInfoData'])}}
@endsection
@push('scripts')
    <script>
        {{--let addExperienceUrl = "{{ route('candidate.create-experience') }}";--}}
        {{--let experienceUrl = "{{ url('candidate/candidate-experience') }}/";--}}
        {{--let addEducationUrl = "{{ route('candidate.create-education') }}";--}}
        {{--let candidateUrl = "{{ url('candidate') }}/";--}}
        {{--let educationUrl = "{{ url('candidate/candidate-education') }}/";--}}
        {{--let present = "{{ __('messages.candidate_profile.present') }}";--}}
        // let isEdit = false;
    </script>
{{--    <script src="{{ asset('assets/js/moment.min.js') }}"></script>--}}
    {{--    <script src="{{ asset('js/bootstrap-datetimepicker.min.js') }}"></script>--}}
    {{--    <script src="{{mix('assets/js/candidate-profile/candidate_career_informations.js')}}"></script>--}}
@endpush
