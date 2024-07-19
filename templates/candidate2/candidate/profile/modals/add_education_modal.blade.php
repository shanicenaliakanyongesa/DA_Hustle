<div id="addEducationModal" class="modal fade" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">{{ __('messages.candidate_profile.add_education')  }}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>
            {{ Form::open(['id'=>'addNewEducationForm']) }}
            <div class="modal-body">
                <div class="alert alert-danger  hide d-none" id="validationErrorsBox">
                    <i class='fa-solid fa-face-frown me-4'></i>
                </div>
                <div class="row">
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('degree_level_id', __('messages.candidate_profile.degree_level').(':'), ['class' => 'form-label ']) }}
                        <span class="required"></span>
                        {{ Form::select('degree_level_id', $data['degreeLevels'], null ,['class' => 'form-select','required','id' => 'degreeLevelId','placeholder'=>__('messages.company.select_degree_level')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('degree_title', __('messages.candidate_profile.degree_title').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::text('degree_title', null, ['class' => 'form-control','required', 'placeholder'=>__('messages.candidate_profile.degree_title')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('country', __('messages.company.country').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::select('country_id',$data['countries'], null, ['id'=>'educationCountryId','class' => 'form-select','data-modal-type' => 'education','placeholder' => __('messages.company.select_country')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('state', __('messages.company.state').(':'),['class' => 'form-label']) }}
                        {{ Form::select('state_id', [], null, ['id'=>'educationStateId','class' => 'form-select stateId','placeholder' => __('messages.company.select_state')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('city', __('messages.company.city').(':'),['class' => 'form-label']) }}
                        {{ Form::select('city_id', [], null, ['id'=>'educationCityId','class' => 'form-select cityId','placeholder' => __('messages.company.select_city')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('institute', __('messages.candidate_profile.institute').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::text('institute', null,['class' => 'form-control','placeholder'=>__('messages.candidate_profile.institute')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('result',__('messages.candidate_profile.result').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::text('result',  null, ['class' => 'form-control','placeholder'=>__('messages.candidate_profile.result')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('year', __('messages.candidate_profile.year').(':'),['class' => 'form-label  required']) }}
                        {{ Form::selectRange('year', date('Y'), 2000, null, ['id'=>'educationYearId','class' => 'form-select','data-modal-type' => 'education','placeholder' => __('messages.candidate_profile.select_year')])}}
                    </div>
                </div>
            </div>
            <div class="modal-footer pt-0">
                {{ Form::button(__('messages.common.save'), ['type' => 'submit','class' => 'btn btn-primary m-0','id' => 'btnEducationSave','data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> ".__('messages.common.process')]) }}
                <button type="button" class="btn btn-secondary my-0 ms-5 me-0"
                        data-bs-dismiss="modal">{{ __('messages.common.cancel') }}
                </button>
            </div>
            {{ Form::close() }}
        </div>
    </div>
</div>
