listenClick('.show-candidate-modal-btn', function (event) {
    ajaxCallInProgress();
    let reportedCandidateId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('reported.candidates.show', reportedCandidateId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showReportedCandidate').html('');
                $('#showReportedBy').html('');
                $('#showReportedWhen').html('');
                $('#showReportedNote').html('');
                $('#showImage').html('');

                $('#showReportedCandidate').
                append(result.data.candidate.user.full_name);
                $('#showReportedBy').append(result.data.user.first_name);
                $('#showReportedWhen').append(result.data.date);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.note))
                    ? result.data.note
                    : 'N/A';
                $('#showReportedNote').append(element.value);
                $('#showImage').append('<img src="' + result.data.candidate.candidate_url +
                    '" class="testimonial-modal-img" />');
                $('#showCandidateModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.reported-candidate-delete-btn', function (event) {
    let reportedCandidateId = $(event.currentTarget).attr('data-id');
    deleteItem(route('delete.reported.candidate', reportedCandidateId), Lang.get('js.reported_candidate'));
})
