document.addEventListener('turbo:load', loadApplyJobData);

function loadApplyJobData() {

    $('#resumeId').select2();

    listenClick('.save-draft', function (e) {
        e.preventDefault();
        submitForm('#applyJobForm', 'draft', '#draftJobSave', '#applyJobSave', '#g-recaptcha');
    });

   listenClick('.apply-job', function (e) {
        e.preventDefault();
        submitForm('#applyJobForm', 'apply', '#applyJobSave', '#draftJobSave', '#g-recaptcha');
    });

    window.submitForm = function (formId, applicationType, loadingBtnId, disabledBtnId) {
        processingBtn(formId, loadingBtnId, 'loading');
        $(disabledBtnId).prop('disabled', true);
        var data = new FormData($(document).find(formId)[0]);
        data.append('application_type', applicationType);
        $.ajax({
            url: route('apply-job'),
            type: 'post',
            data: data,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    setTimeout(function () {
                        window.location = route('front.job.details', result.data);
                    }, 3000);
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
                processingBtn(formId, loadingBtnId, 'reset');
                $(disabledBtnId).prop('disabled', false);
            },
        });
    };
}
