listenSubmit('#reportToCandidate', function (e) {
        e.preventDefault();
        processingBtn('#reportToCandidate', '#btnReportCandidate', 'loading');
        $.ajax({
            url: route('report.to.candidate'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    $('#reportToCandidateModal').modal('hide');
                    $('.reportToCandidate').attr('disabled',true);
                    $('.reportToCandidate').text(Lang.get('js.already_reported'));
                    $('.close-modal').click();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
            complete: function () {
                processingBtn('#reportToCandidate', '#btnReportCandidate');
            },
        });
    });

listenHiddenBsModal('#reportToCandidateModal', function () {
    $('#noteForReportToCompany').val('');
})
