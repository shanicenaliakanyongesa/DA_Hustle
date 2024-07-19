
    listenClick('.view-invoice', function () {
        let invoiceId = $(this).data('invoice-id');
        $.ajax({
            url: route('get-transaction-invoice', invoiceId),
            type: 'get',
            success: function (result) {
                window.open(result.data, '_blank');
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
    });
});

