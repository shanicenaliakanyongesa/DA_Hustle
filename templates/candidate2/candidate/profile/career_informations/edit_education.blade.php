{{ Form::open(['id'=>'editCVEducationForm']) }}
<div class="alert alert-danger d-none" id="editValidationErrorsBox">
    <i class='fa-solid fa-face-frown me-4'></i>
</div>
<input type="hidden" id="educationId">
<div class="row">
    <div class="col-sm-6 mb-5">
        {{ Form::label('degree_level_id', __('messages.candidate_profile.degree_level').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::select('degree_level_id', $data['degreeLevels'], null, ['class' => 'form-select','required','id' => 'degreeLevelId','placeholder'=> __('messages.company.select_degree_level'),'id' => 'editDegreeLevel']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('degree_title', __('messages.candidate_profile.degree_title').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::text('degree_title', null, ['class' => 'form-control','id' => 'editDegreeTitle']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('country', __('messages.company.country').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::select('country_id', $data['countries'], null, ['id'=>'editCvEducationCountry','class' => 'form-select','placeholder' => __('messages.company.select_country'), 'data-modal-type' => 'education', 'data-is-edit' => 'true']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('state', __('messages.company.state').':', ['class' => 'form-label']) }}
        {{ Form::select('state_id', [], null, ['id'=>'editCvEducationState','class' => 'form-select','placeholder' => __('messages.company.select_state'), 'data-modal-type' => 'education', 'data-is-edit' => 'true']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('city', __('messages.company.city').':', ['class' => 'form-label']) }}
        {{ Form::select('city_id', [], null, ['id'=>'editCvEducationCity','class' => 'form-select','placeholder' => __('messages.company.select_city'), 'data-is-edit' => 'true']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('institute',__('messages.candidate_profile.institute').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::text('institute', null, ['class' => 'form-control ','required', 'id' => 'editInstitute']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('result', __('messages.candidate_profile.result').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::text('result', null, ['class' => 'form-control ', 'required', 'id' => 'editResult']) }}
    </div>
    <div class="col-sm-6 mb-5">
        {{ Form::label('year', __('messages.candidate_profile.year').':', ['class' => 'form-label ']) }}
        <span class="required"></span>
        {{ Form::selectYear('year', date('Y'), 2000, null, ['class' => 'form-select', 'id' => 'editYear']) }}
    </div>
</div>
<div class="d-flex justify-content-end">
    {{ Form::button(__('messages.common.save'), ['type'=>'submit','class' => 'btn btn-primary me-3','id'=>'btnEditEducationSave','data-loading-text'=>"<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
    <button type="button" id="btnEditEducationCancel"
            class="btn btn-secondary me-2">{{ __('messages.common.cancel') }}</button>
</div>
{{ Form::close() }}
