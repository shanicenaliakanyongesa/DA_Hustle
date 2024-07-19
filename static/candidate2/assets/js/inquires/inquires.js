listenClick('.inquiry-delete-btn', function (event) {
    let deleteInqueryId =  $(this).attr('data-id');
    deleteItem(route('inquires.destroy', deleteInqueryId),
        Lang.get('js.inquiry'));
})

listenClick('.inquiry-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let inquiryId = $(event.currentTarget).data('id');
    $.ajax({
        url: route('inquires.show', inquiryId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showInquiresName').html('');
                $('#showInquiresEmail').html('');
                $('#showInquiresPhoneNo').html('');
                $('#showInquiresSubject').html('');
                $('#showInquiresCreatedAt').html('');
                $('#showUpdatedAt').html('');
                $('#showInquiresMessage').html('');

                $('#showInquiresName').append(result.data.name);
                $('#showInquiresEmail').append(result.data.email);
                if (isEmpty(result.data.phone_no)) {
                    $('#showInquiresPhoneNo').append('N/A');
                } else {
                    $('#showInquiresPhoneNo').append(result.data.phone_no);
                }
                $('#showInquiresSubject').append(result.data.subject);
                $('#showInquiresCreatedAt').text(moment(result.data.created_at, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY'));
                $('#showUpdatedAt').text(moment(result.data.updated_at, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY'));
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.message))
                    ? result.data.message
                    : 'N/A';
                $('#showInquiresMessage').append(element.value);
                $('#showInquiryModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})
