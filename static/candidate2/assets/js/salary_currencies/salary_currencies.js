listenClick('.addCurrency', function () {
    $('#addCurrencyModal').appendTo('body').modal('show');
});


listenSubmit('#addCurrencyForm', function (e) {
    e.preventDefault();
    $.ajax({
        url: route('salaryCurrency.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#addCurrencyModal').modal('hide');
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
                Livewire.dispatch('resetPageTable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenClick('.salary-currency-edit-btn', function (event) {
    let currencyId = $(event.currentTarget).attr('data-id');
    currencyRenderData(currencyId);
});

function currencyRenderData(currencyId) {
    $.ajax({
        url: route('salaryCurrency.edit', currencyId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#editCurrencyName').val(result.data.currency_name);
                $('#editCurrencyIcon').val(result.data.currency_icon);
                $('#editCurrencyCode').val(result.data.currency_code);
                $('#currencyId').val(result.data.id);
                $('#editCurrencyModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};

listenHiddenBsModal('#addCurrencyModal', function () {
    resetModalForm('#addCurrencyForm', '#validationErrorsBox');
});

listenSubmit('#editCurrencyForm', function (event) {
    event.preventDefault();
    const id = $('#currencyId').val();
    $.ajax({
        url: route('salaryCurrency.update', {currency: id}),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#editCurrencyModal').modal('hide');
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
                Livewire.dispatch('resetPageTable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenKeyup('.currency-code', function () {
    return $('.currency-code').val(this.value.toUpperCase());
});

listenClick('.salary-currency-delete-btn', function (event) {
    let currencyId = $(event.currentTarget).attr('data-id');
    deleteItem(route('salaryCurrency.destroy', currencyId),
        Lang.get('js.salary_currency'));
});
