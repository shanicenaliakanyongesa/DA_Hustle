{{ Form::open(['id'=>'addCVExperienceForm']) }}
<div class="alert alert-danger d-none" id="validationErrorsBox">
    <i class='fa-solid fa-face-frown me-4'></i>
</div>
<div class="row">
    <div class="col-sm-6 mb-5">
        {{ Form::label('experience_title',__('messages.candidate_profile.experience_title').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::text('experience_title', null, ['class' => 'form-control','required','placeholder'=>__('messages.candidate_profile.experience_title')]) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('company',__('messages.candidate_profile.company').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::text('company', null, ['class' => 'form-control','required','placeholder'=>__('messages.candidate_profile.company')]) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('country', __('messages.company.country').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::select('country_id', $data['countries'], null, ['id'=>'countryId','required','class' => 'form-select','placeholder' => __('messages.company.select_country'), 'data-modal-type' => 'experience']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('state', __('messages.company.state').':', ['class' => 'form-label']) }}
        {{ Form::select('state_id', [], null, ['id'=>'stateId','class' => 'form-select','placeholder' => __('messages.company.select_state'), 'data-modal-type' => 'experience']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('city', __('messages.company.city').':', ['class' => 'form-label']) }}
        {{ Form::select('city_id', [], null, ['id'=>'cityId','class' => 'form-select ','placeholder' => __('messages.company.select_city')]) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('start_date', __('messages.candidate_profile.start_date').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        <input type="text" name="start_date" id="startDate" class="form-control {{(getLoggedInUser()->theme_mode) ? 'bg-light' : 'bg-white'}}" autocomplete="off" placeholder="{{__('messages.candidate_profile.start_date')}}">
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('end_date', __('messages.candidate_profile.end_date').':', ['class' => 'form-label ']) }}
        <span
                class="required" id="requiredText"></span>

        <input type="text" name="end_date" id="endDate" class="form-control {{(getLoggedInUser()->theme_mode) ? 'bg-light' : 'bg-white'}}" autocomplete="off" placeholder="{{__('messages.candidate_profile.end_date')}}">
  
    </div>
    <div class="col-sm-6 mb-0 pt-3">
        <label
            class='form-label'>{{ __('messages.candidate_profile.currently_working') }}</label>
        <div class="col-6 pl-0">
            <label class="form-check form-switch form-switch-sm">
                <input type="checkbox" name="currently_working" class="form-check-input"
                       value="1" id="default">
            </label>
        </div>
    </div>
    <div class="col-sm-12 mb-5">
        {{ Form::label('description', __('messages.candidate_profile.description').':', ['class' => 'form-label ']) }}
        {{ Form::textarea('description', null, ['class' => 'form-control','rows'=>'5','placeholder'=>__('messages.candidate_profile.description')]) }}
    </div>
</div>
<div class="d-flex justify-content-end">
    {{ Form::button(__('messages.common.save'), ['type'=>'submit','class' => 'btn btn-primary me-3','id'=>'btnExperienceSave','data-loading-text'=>"<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
    <button type="button" id="btnCancel"
            class="btn btn-secondary me-2">{{ __('messages.common.cancel') }}</button>
</div>
{{ Form::close() }}
