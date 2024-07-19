document.addEventListener('turbo:load', loadCompanySizeData);

function loadCompanySizeData() {
    if (!$('#indexCompanySizeData').length) {
        return;
    }
    $('#size, #editCompanySize').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && String.fromCharCode(e.which) !=
            '-' && (e.which < 48 || e.which > 57)) {
            $('#errMsg, #errEditMsg').
                html('Digits Only').
                show().
                fadeOut('slow');
            return false;
        }
    });

    listenHiddenBsModal('#addCompanySizeModal', function () {
        resetModalForm('#addCompanySizeForm',
            '#companySizeValidationErrorsBox');
    });

    listenHiddenBsModal('#editCompanySizeModal', function () {
        resetModalForm('#editCompanySizeForm', '#editValidationErrorsBox');
    });

    // listenShowBsModal('#addCompanySizeModal', function () {
    //     $('#size').focus();
    // });
    //
    // listenShowBsModal('#editCompanySizeModal', function () {
    //     $('#editCompanySize').focus();
    // });

    listenClick('.addCompanySizeModal', function () {
        $('#addCompanySizeModal').appendTo('body').modal('show');
    });

    listenClick('.company-size-edit-btn', function (event) {
        let companySizeId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('companySize.edit', companySizeId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#companySizeId').val(result.data.id);
                    $('#editCompanySize').val(result.data.size);
                    $('#editCompanySizeModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenClick('.company-size-delete-btn', function (event) {
        let deleteCompanySizeId = $(event.currentTarget).attr('data-id');
        deleteItem(route('companySize.destroy', deleteCompanySizeId), Lang.get('js.company_size'));
    });
}

listenSubmit('#addCompanySizeForm', function (e) {
    e.preventDefault();
    processingBtn('#addCompanySizeForm', '#companySizeBtnSave', 'loading');
    $.ajax({
        url: route('companySize.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addCompanySizeModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            processingBtn('#addCompanySizeForm', '#companySizeBtnSave');
        },
        complete: function () {
            processingBtn('#addCompanySizeForm', '#companySizeBtnSave');
        },
    });
});

listenSubmit('#editCompanySizeForm', function (event) {
    event.preventDefault();
    processingBtn('#editCompanySizeForm', '#companySizeEditSaveBtn',
        'loading');
    var updateCompanySizeId = $('#companySizeId').val();
    $.ajax({
        url: route('companySize.update', updateCompanySizeId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editCompanySizeModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCompanySizeForm',
                '#companySizeEditSaveBtn');
        },
    });
});
