<div id="editExperienceModal" class="modal fade" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h3>{{ __('messages.candidate_profile.edit_experience') }}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>
            {{ Form::open(['id'=>'editExperienceForm']) }}
            <div class="modal-body">
                <div class="alert alert-danger  hide d-none" id="editValidationErrorsBox">
                    <i class='fa-solid fa-face-frown me-4'></i>
                </div>
                {{ Form::hidden('experienceId',null,['id'=>'experienceId']) }}
                <div class="row">
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('experience_title',__('messages.candidate_profile.experience_title').(':'), ['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::text('experience_title', null, ['class' => 'form-control','required','id' => 'editTitle','placeholder'=>__('messages.candidate_profile.experience_title')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('company',__('messages.candidate_profile.company').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::text('company', null, ['class' => 'form-control','required', 'id' => 'editCompany','placeholder'=>__('messages.candidate_profile.company')]) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('country', __('messages.company.country').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        {{ Form::select('country_id',$data['countries'], null, ['id'=>'editCountry','class' => 'form-select countryId','placeholder' => __('messages.company.select_country'),'data-modal-type' => 'experience','data-is-edit' => 'true']) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('state', __('messages.company.state').(':'),['class' => 'form-label']) }}
                        {{ Form::select('state_id', [], null, ['id'=>'editState','class' => 'form-select stateId','placeholder' => __('messages.company.select_state'), 'data-modal-type' => 'experience','data-is-edit' => 'true']) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('city', __('messages.company.city').(':'),['class' => 'form-label']) }}
                        {{ Form::select('city_id', [],null, ['class' => 'form-select cityId','data-modal-type' => 'experience','id'=>'editCity','placeholder' => __('messages.company.select_city'),'data-is-edit' => 'true']) }}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('start_date', __('messages.candidate_profile.start_date').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        <input type="text" name="start_date" id="editStartDate" class="form-control {{(getLoggedInUser()->theme_mode) ? 'bg-light' : 'bg-white'}}" autocomplete="off" placeholder="{{__('messages.candidate_profile.start_date')}}">
{{--                        {{ Form::text('start_date', null,['class' => 'form-control','id' => 'editStartDate','autocomplete' => 'off','placeholder'=>'Start Date']) }}--}}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('end_date', __('messages.candidate_profile.end_date').(':'),['class' => 'form-label']) }}
                        <span class="required"></span>
                        <input type="text" name="end_date" id="editEndDate" class="form-control {{(getLoggedInUser()->theme_mode) ? 'bg-light' : 'bg-white'}}" autocomplete="off" placeholder="{{__('messages.candidate_profile.end_date')}}">
{{--                        {{ Form::text('end_date',  null, ['class' => 'form-control', 'data-modal-type' => 'experience','id' => 'editEndDate','autocomplete' => 'off','placeholder'=>'End Date']) }}--}}
                    </div>
                    <div class="col-sm-6 mb-5">
                        {{ Form::label('currently_working', __('messages.candidate_profile.currently_working').(':'),['class' => 'form-label']) }}
                        <div class="form-check form-switch">
                            <input class="form-check-input" name="currently_working" type="checkbox"
                                   value="1" id="editWorking">
                        </div>
                    </div>
                    <div class="col-sm-12">
                        {{ Form::label('description', __('messages.candidate_profile.description').':', ['class' => 'form-label']) }}
                        {{ Form::textarea('description',null, ['class' => 'form-control','rows'=>'5','id' => 'editDescription','placeholder'=>__('messages.candidate_profile.description')]) }}
                    </div>
                    {{--                    <div class="text-right">--}}
                    {{--                        {{ Form::button(__('messages.common.save'), ['type' => 'submit','class' => 'btn btn-primary me-3','id' => 'btnExperienceSave','data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}--}}
                    {{--                        <button type="button" class="btn btn-light btn-active-light-primary me-2"--}}
                    {{--                                id="btnCancel"--}}
                    {{--                                data-bs-dismiss="modal">{{ __('messages.common.cancel') }}</button>--}}
                    {{--                    </div>--}}
                </div>
            </div>
            <div class="modal-footer pt-0">
                {{ Form::button(__('messages.common.save'), ['type' => 'submit','class' => 'btn btn-primary m-0','id' => 'btnExperienceSave','data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> ".__('messages.common.process')]) }}
                <button type="button" class="btn btn-secondary my-0 ms-5 me-0"
                        data-bs-dismiss="modal">{{ __('messages.common.cancel') }}
                </button>
            </div>
            {{ Form::close() }}
        </div>
    </div>
</div>
