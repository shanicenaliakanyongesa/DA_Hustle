<div id="candidateResumeModal" class="modal fade" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h3>{{ __('messages.candidate_profile.upload_resume') }}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>
            {{ Form::open(['id'=>'addCandidateResumeForm']) }}
            <div class="modal-body">
                <div class="alert alert-danger hide d-none" id="validationErrorsBox">
                    <i class='fa-solid fa-face-frown me-4'></i>
                </div>
                <div class="mb-5">
                    {{ Form::label('title',__('messages.candidate_profile.title').(':'), ['class' => 'form-label']) }}
                    <span class="required"></span>
                    {{ Form::text('title', null, [ 'id'=>"uploadResumeTitle",'class' => 'form-control','required','maxlength'=>'150','placeholder'=>__('messages.candidate_profile.title')]) }}
                </div>
                <div class="mb-5">
                    <div>
                        {{ Form::label('customFile',__('messages.common.choose_file').(':'), ['class' => 'form-label']) }}
                        <span class="required"></span>
                        <input type="file" class="form-control custom-file-input" id="customFile" name="file" required>
                    </div>
                </div>
                <div>
                    {{ Form::label('is_default', __('messages.job_experience.is_default').':', ['class' => 'form-label']) }}
                    <br>
                    <div class="form-check form-switch">
                        <input class="form-check-input" name="is_default" type="checkbox"
                               value="1" id="default">
                    </div>
                </div>
            </div>
            <div class="modal-footer pt-0">
                {{ Form::button(__('messages.common.save'), ['type' => 'submit','class' => 'btn btn-primary m-0','id' => 'candidateSaveBtn','data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> ".__('messages.common.process')]) }}
                <button type="button" class="btn btn-secondary my-0 ms-5 me-0"
                        data-bs-dismiss="modal">{{ __('messages.common.cancel') }}
                </button>
            </div>
        </div>
    </div>
</div>
{{ Form::close() }}

