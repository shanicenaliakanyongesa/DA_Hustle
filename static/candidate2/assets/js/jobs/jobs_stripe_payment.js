$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    });

    listenClick('.featured-job', function () {
        let payloadData = {
            jobId: $(this).data('id'),
        };
        $(this).
            html(
                '<div class="spinner-border spinner-border-sm " role="status">\n' +
                '                                            <span class="sr-only">Loading...</span>\n' +
                '                                        </div>');
        $(this).tooltip('hide');
        $('#jobsTbl a.featured-job').addClass('disabled');

        $.post(route('job-stripe-charge'), payloadData).done((result) => {
            let sessionId = result.data.sessionId;
            stripe.redirectToCheckout({
                sessionId: sessionId,
            }).then(function (result) {
                $(this).html(Lang.get('js.make_featured')).removeClass('disabled');
                $('#jobsTbl a.featured-job').removeClass('disabled');
                manageAjaxErrors(result);
            });
        }).catch(error => {
            $(this).html(Lang.get('js.make_featured')).removeClass('disabled');
            $('#jobsTbl a.featured-job').removeClass('disabled');
            displayErrorMessage(error.responseJSON.message);
            manageAjaxErrors(error);
        });
    });
});
