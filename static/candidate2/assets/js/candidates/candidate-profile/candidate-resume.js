
 listenClick('.uploadResumeModal', function () {
        $('#candidateResumeModal').appendTo('body').modal('show');
    });

 listenSubmit('#addCandidateResumeForm', function (e) {
        let empty = $('#uploadResumeTitle').val().trim().replace(/ \r\n\t/g, '') === '';
        if (empty) {
            displayErrorMessage('The title field is not contain only white space');
            return false;
        }
        e.preventDefault();
        processingBtn('#addCandidateResumeForm', '#candidateSaveBtn', 'loading');
        $.ajax({
            url: route('candidate.resumes'),
            type: 'post',
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    resetModalForm('#addCandidateResumeForm', '#validationErrorsBox');
                    $('#candidateResumeModal').modal('hide');
                    setTimeout(function () {
                        processingBtn('#addCandidateResumeForm', '#candidateSaveBtn', 'reset');
                    }, 1000);
                    Livewire.dispatch('refreshDatatable');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
                setTimeout(function () {
                    processingBtn('#addCandidateResumeForm', '#candidateSaveBtn', 'reset');
                }, 1000);
            },
            complete: function () {
                setTimeout(function () {
                    processingBtn('#addCandidateResumeForm', '#candidateSaveBtn');
                }, 1000);
            },
        });
    });

   listenChange('#customFile', function () {
        let extension = isValidDocument($(this), '#validationErrorsBox');
        if (!isEmpty(extension) && extension != false) {
            $('#validationErrorsBox').html('').hide();
        }
    });

    window.isValidDocument = function (
        inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['jpg', 'jpeg', 'pdf', 'doc', 'docx']) ==
            -1) {
            $(inputSelector).val('');
            $(validationMessageSelector).removeClass('d-none');
            $(validationMessageSelector).
                html(
                    Lang.get('js.file_type')).
                show();
            $(validationMessageSelector).delay(5000).slideUp(300);

            return false;
        }
        $(validationMessageSelector).hide();

        return ext;
    };

    $('.custom-file-input').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        $(this).
            siblings('.custom-file-label').
            addClass('selected').
            html(fileName);
    });

  listenClick('.delete-resume', function (event) {

        let resumeId = $(event.currentTarget).attr('data-id');
        deleteItem(route('download.destroy', resumeId),
            Lang.get('js.resume'));
  });

 listen('hide.bs.modal', '#candidateResumeModal', function () {
     $('#customFile').siblings('.custom-file-label').addClass('selected').html('Choose file');
     resetModalForm('#addCandidateResumeForm', '#validationErrorsBox');
 });
