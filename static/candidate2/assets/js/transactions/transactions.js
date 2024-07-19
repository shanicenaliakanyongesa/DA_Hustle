
    listenClick('.admin-view-invoice', function () {
        var invoiceId = $(this).attr('data-invoice-id');
        $.ajax({
            url: route('transaction-invoice', invoiceId),
            type: 'get',
            success: function (result) {
                window.open(result.data, '_blank');
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenChange('.transaction-approve', function () {
        let id = $(this).attr('data-id');
        let status = $(this).val();
        $.ajax({
            url: route('change-transaction-status', id),
            type: 'GET',
            data: { id: id, status: status },
            success: function (result) {
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });
