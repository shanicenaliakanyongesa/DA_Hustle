document.addEventListener('turbo:load', countryData);

function countryData() {
    if (!$('#indexCountriesData').length) {
        return;
    }
    listenClick('.addCountryModal', function () {
        $('#addCountryModal').appendTo('body').modal('show');
    });

    listenClick('.country-edit-btn', function (event) {
        let countryId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('countries.edit', countryId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#countryId').val(result.data.id);
                    $('#editName').val(result.data.name);
                    $('#editShortCode').val(result.data.short_code);
                    $('#editPhoneCode').val(result.data.phone_code);
                    $('#editCountryModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenClick('.country-delete-btn', function (event) {
        let countryId = $(event.currentTarget).attr('data-id');
        deleteItem(route('countries.destroy', countryId),
            Lang.get('js.country'));
    });

    listenHiddenBsModal('#addCountryModal', function () {
        resetModalForm('#addCountryForm', '#countryValidationErrorsBox');
    });

    listenHiddenBsModal('#editCountryModal', function () {
        resetModalForm('#editCountryForm', '#editValidationErrorsBox');
    });

}

listenSubmit('#addCountryForm', function (e) {
    e.preventDefault();
    processingBtn('#addCountryForm', '#countryBtnSave', 'loading');
    $.ajax({
        url: route('countries.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addCountryModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addCountryForm', '#countryBtnSave');
        },
    });
});

listenSubmit('#editCountryForm', function (event) {
    event.preventDefault();
    processingBtn('#editCountryForm', '#btnEditSave', 'loading');
    const countryId = $('#countryId').val();
    $.ajax({
        url: route('countries.update', countryId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editCountryModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCountryForm', '#btnEditSave');
        },
    });
});
