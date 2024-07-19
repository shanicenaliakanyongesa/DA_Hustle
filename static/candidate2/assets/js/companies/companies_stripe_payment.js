document.addEventListener('turbo:load', loadCompaniesStripePaymentsData);

function loadCompaniesStripePaymentsData () {
    if (!$('#companyID').length) {
        return;
    }

    let companyID = $('#companyID').val();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    });

}
listenClick('#makeFeatured', function () {
    let payloadData = {
        companyId: $('#employerCompanyId').val(),
    };
    $(this).html(
        '<div class="spinner-border spinner-border-sm " role="status">\n' +
        '                                            <span class="sr-only">Loading...</span>\n' +
        '                                        </div>');

    $(this).addClass('disabled');

    $.post(route('company-stripe-charge'), payloadData).done((result) => {
        let sessionId = result.data.sessionId;
        stripe.redirectToCheckout({
            sessionId: sessionId,
        }).then(function (result) {
            $(this).html('Make Featured').removeClass('disabled');
            manageAjaxErrors(result);
        });
    }).catch(error => {
        $(this).html('Make Featured').removeClass('disabled');
        manageAjaxErrors(error);
    });
});
