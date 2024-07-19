document.addEventListener('turbo:load', loadBlogCategoryData);

function loadBlogCategoryData() {
    if(!$('#amount').length){
        return
    }

    new AutoNumeric('#amount', {
        maximumValue: 99999,
        currencySymbol: '',
        digitGroupSeparator: '\,',
        decimalPlaces: 2,
        currencySymbolPlacement:
        AutoNumeric.options.currencySymbolPlacement.suffix,
    });

    let options = [];
    let currencies = JSON.parse($('#indexPlanCurrency').val());
    let currencySymbols = JSON.parse($('#indexPlanCurrencySymbols').val());
    $.each(currencies, function (index, currency) {
        options.push({
            id: index,
            text: currencySymbols['' + index + ''] + ' - ' + currency,
        });
    });
    $('#currency').select2({
        width: '100%',
        data: options,
        dropdownParent: $('#addSubscriptionModal'),
    });
    $('#editCurrency').select2({
        width: '100%',
        data: options,
        dropdownParent: $('#editSubscriptionModal'),
    });

    listenClick('.subscription-delete-btn', function (event) {
        let planId = $(this).attr('data-id');
        deleteItem(route('plans.destroy', planId), Lang.get('js.plan'));
    });
}

listenClick('.addPlanModal', function () {
    $('#addSubscriptionModal').appendTo('body').modal('show');
})

listenSubmit('#addSubscriptionForm', function (e) {
    e.preventDefault();
    processingBtn('#addSubscriptionForm', '#subscriptionSaveBtn', 'loading');
    e.preventDefault();
    $.ajax({
        url: route('plans.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addSubscriptionModal').modal('hide');
                Livewire.dispatch('refresh');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addSubscriptionForm', '#subscriptionSaveBtn');
        },
    });
});

listenClick('.subscription-edit-btn', function (event) {
    let planId = $(this).attr('data-id');
    planEditRenderData(planId);
});

function planEditRenderData (planId) {
    $.ajax({
        url: route('plans.edit', planId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                let element = document.createElement('textarea');
                element.innerHTML = result.data.name;
                $('#planId').val(result.data.id);
                $('#editName').val(element.value);
                $('#editAllowedJobs').val(result.data.allowed_jobs);
                $('#editAmount').val(result.data.amount);
                $('#editCurrency').
                    val(result.data.salary_currency_id).
                    trigger('change');
                $('#planAmount').addClass('d-none');
                if (result.data.stripe_plan_id == null) {
                    $('#editCurrency').attr('disabled', false);
                    $('#editAmount').attr('readonly', false);
                } else {
                    $('#editCurrency').attr('disabled', true);
                    $('#editAmount').attr('readonly', true);
                    $('#planAmount').removeClass('d-none');
                }
                $('#editSubscriptionModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};

listenSubmit('#editSubscriptionForm', function (event) {
    event.preventDefault();
    processingBtn('#editSubscriptionForm', '#editSubscriptionSaveBtn', 'loading');
    var editPlanId = $('#planId ').val();
    $.ajax({
        url: route('plans.update', editPlanId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editSubscriptionModal').modal('hide');
                Livewire.dispatch('refresh');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editSubscriptionForm', '#editSubscriptionSaveBtn');
        },
    });
});

listenHiddenBsModal('#addSubscriptionModal', function () {
    $('#functionalBtnSave').attr('disabled', false);
    resetModalForm('#addSubscriptionForm', '#validationErrorsBox');
})

listenHiddenBsModal('#editSubscriptionModal', function (){
    resetModalForm('#editSubscriptionForm', '#editValidationErrorsBox');
})

listenShowBsModal('#addSubscriptionModal', function (){
    $('#name').focus();
})
listenShowBsModal('#editSubscriptionModal', function (){
    $('#editName').focus();
})
