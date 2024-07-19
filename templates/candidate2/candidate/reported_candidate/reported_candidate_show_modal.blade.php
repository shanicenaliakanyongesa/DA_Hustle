<div id="showCandidateModal" class="modal fade" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">{{ __('messages.candidate.reported_candidate_detail') }}</h3>
                <button type="button" aria-label="Close" class="btn-close"
                        data-bs-dismiss="modal">
                </button>
            </div>
            {{ Form::open(['id' => 'showReportedCandidateForm']) }}
            <div class="modal-body">
                <div class="alert alert-danger  hide d-none" id="maritalStatusValidationErrorsBox">
                    <i class='fa-solid fa-face-frown me-4'></i>
                </div>
                <div class="mb-5">
                    <div class="col-sm-12 mb-5">
                        {{ Form::label('employer_name', __('messages.company.candidate_name').':', ['class' => 'pb-2 fs-5 text-gray-600']) }}
                        <p id="showReportedCandidate" class="fs-4 text-gray-800"></p>
                    </div>
                    <div class="col-sm- mb-5">
                        {{ Form::label('employer_name', __('messages.post.image').':', ['class' => 'pb-2 fs-5 text-gray-600']) }}
                        <br>
                        <p id="showImage" class="image image-medium me-3"></p>
                    </div>
                    <div class="col-sm-12 mb-5">
                        {{ Form::label('reported_by', __('messages.company.reported_by').':',['class' => 'pb-2 fs-5 text-gray-600']) }}
                        <p id="showReportedBy" class="fs-4 text-gray-800"></p>
                    </div>
                    <div class="col-sm-12 mb-5">
                        {{ Form::label('reported_on', __('messages.company.reported_on').':',['class' => 'pb-2 fs-5 text-gray-600']) }}
                        <br>
                        <p id="showReportedWhen" class="fs-4 text-gray-800"></p>
                    </div>
                    <div class="col-sm-12 mb-5">
                        {{ Form::label('notes', __('messages.company.notes').':',['class' => 'pb-2 fs-5 text-gray-600']) }}
                        <p id="showReportedNote" class="fs-4 text-gray-800" style="width:100%; word-wrap: break-word;"></p>
                    </div>
                </div>
            </div>
            {{ Form::close() }}
        </div>
    </div>
</div>
