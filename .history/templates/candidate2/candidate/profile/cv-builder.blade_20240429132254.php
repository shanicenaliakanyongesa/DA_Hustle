@extends('candidate.profile.index')
@push('css')
    <link rel="stylesheet" href="{{ asset('css/bootstrap-datetimepicker.css') }}">
@endpush
@section('section')
    
            <div class="row">
                <div class="d-flex justify-content-end">
                    <a href="#cvModal" role="button" class="btn btn-primary cv-preview"
                       data-bs-toggle="modal">{{ __('messages.common.preview') }}</a>
                </div>
                <div class="col-md-12 mt-5 shadow p-9 card">
                    {{-- General Section --}}
                    <div id="candidateGeneralDiv">
                        @include('candidate.profile.career_informations.show_general')
                    </div>
                    <div class="d-none" id="editGeneralDiv">
                        @include('candidate.profile.career_informations.edit_general')
                    </div>
                    {{-- Education Section --}}
                    <div class="border-bottom border-danger my-5 border-2 d-flex justify-content-between ">
                        <h5 class="mt-2 fs-2 text-info"><i
                                class="fas fa-user-graduate text-info p-3 border rounded-circle border-info me-3"></i>{{ __('messages.candidate_profile.education') }}
                        </h5>
                        <a href="javascript:void(0)" class="addEducationBtn">
                            <i class="fas fa-plus-circle fa-2x text-primary"></i>
                        </a>
                    </div>
                    <div class="section-body">
                        <div class="row candidate-education-container" id="candidateEducationsDiv">
                            @include('candidate.profile.career_informations.show_education')
                        </div>
                        <div class="d-none" id="createEducationsDiv">
                            @include('candidate.profile.career_informations.create_education')
                        </div>
                        <div class="d-none" id="editEducationsDiv">
                            @include('candidate.profile.career_informations.edit_education')
                        </div>
                    </div>
                    {{-- Experience Section --}}
                    <div class="border-bottom my-5 border-danger border-2 d-flex justify-content-between">
                        <h5 class="mt-2 fs-2 text-info"><i
                                class="fas fa-briefcase text-info p-3 border rounded-circle border-info me-3"></i>{{ __('messages.candidate_profile.experience') }}
                        </h5>
                        <a href="javascript:void(0)" class="addExperienceBtn">
                            <i class="fas fa-plus-circle fa-2x text-primary"></i>
                        </a>
                    </div>
                    <div class="section-body">
                        <div class="row candidate-experience-container" id="candidateExperienceDiv">
                            @include('candidate.profile.career_informations.show_experience')
                        </div>
                        <div class="d-none" id="createExperienceDiv">
                            @include('candidate.profile.career_informations.create_experience')
                        </div>
                        <div class="d-none" id="editExperienceDiv">
                            @include('candidate.profile.career_informations.edit_experience')
                        </div>
                    </div>
                    {{-- Online Profile Section --}}
                    <div class="border-bottom my-5 border-danger border-2 d-flex justify-content-between">
                        <h5 class="mt-2 fs-2 text-info"><i
                                class="fas fa-link text-info p-3 border rounded-circle border-info me-3"></i>{{ __('messages.candidate_profile.online_profile') }}
                        </h5>
                        <a href="javascript:void(0)" class="addOnlineProfileBtn">
                            <i class="fas fa-plus-circle fa-2x text-primary"></i>
                        </a>
                    </div>
                    <div class="section-body">
                        <div class="row" id="candidateOnlineProfileDiv">
                            @include('candidate.profile.career_informations.show_online_profile')
                        </div>
                        <div class="d-none" id="addOnlineProfileDiv">
                            @include('candidate.profile.career_informations.edit_online_profile')
                        </div>
                    </div>
                </div>
            </div>
            @include('candidate.profile.modals.cv_preview_model')
            @include('candidate.profile.templates.templates')
            {{ Form::hidden('plugin-url', asset('css/plugins.css'), ['id' => 'pluginUrl']) }}
            {{ Form::hidden('style-css-url', asset('assets/css/style.css'), ['id' => 'styleCssUrl']) }}
            {{ Form::hidden('font-css-url', asset('assets/css/font-awesome.min.css'), ['id' => 'fontCssUrl']) }}
            {{ Form::hidden('isEditProfile', true, ['id' => 'isEditProfile']) }}
            {{ Form::hidden('countryId', $user->country_id, ['id' => 'countryId']) }}
            {{ Form::hidden('stateId', $user->state_id, ['id' => 'stateId']) }}
            {{ Form::hidden('cityId', $user->city_id, ['id' => 'cityId']) }}
            {{ Form::hidden('present', __('messages.candidate_profile.present'), ['id' => 'cvPresent']) }}
            {{ Form::hidden('cvBuilderData',true, ['id' => 'indexCvBuilderData']) }}
@endsection
@push('scripts')
    <script>
        {{--let candidateProfileUrl = "{{ route('candidate.edit.profile') }}";--}}
        {{--let updateCandidateUrl = "{{ route('candidate.general.profile.update') }}";--}}
        {{--let updateonlineProfileUrl = "{{ route('candidate.online.profile.update') }}";--}}
        {{--        let addExperienceUrl = "{{ route('candidate.create-experience') }}";--}}
        {{--let experienceUrl = "{{ url('candidate/candidate-experience') }}/";--}}
        {{--        let addEducationUrl = "{{ route('candidate.create-education') }}";--}}
        {{--let candidateUrl = "{{ url('candidate') }}/";--}}
{{--        let educationUrl = "{{ url('candidate/candidate-education') }}/";--}}
{{--        let present = "{{ __('messages.candidate_profile.present') }}";--}}
        {{--let countryId = '{{$user->country_id}}';--}}
        {{--let stateId = '{{$user->state_id}}';--}}
        {{--let cityId = '{{$user->city_id}}';--}}
        // let isEditProfile = true;
        // let isEdit = false;
        {{--let pluginUrl = "{{ asset('assets/plugins/plugins.bundle.css') }}";--}}
        {{--        let styleCssUrl = "{{ asset('assets/css/style.bundle.css') }}";--}}
        {{--let styleCssUrl = "{{ asset('web/backend/css/style.css') }}";--}}
        {{--        let fontCssUrl = "{{ asset('assets/css/font-awesome.min.css') }}";--}}
        {{--        let cvTemplateUrl = "{{ route('candidate.cv.template') }}";--}}
    </script>
{{--    <script src="{{ asset('assets/js/moment.min.js') }}"></script>--}}
    {{--    <script src="{{ asset('js/bootstrap-datetimepicker.min.js') }}"></script>--}}
{{--    <script src="{{ asset('js/html2pdf.bundle.min.js') }}"></script>--}}
    {{--    <script src="{{mix('assets/js/candidate-profile/candidate-education-experience.js')}}"></script>--}}
    {{--    <script src="{{mix('assets/js/candidate-profile/cv-builder.js')}}"></script>--}}
@endpush
