document.addEventListener('turbo:load', loadCityData);

function loadCityData() {
    if (!$('#indexCitiesData').length) {
        return;
    }
    $('#filter_state').select2();

    $('#stateID').select2({
        'width': '100%',
        dropdownParent: $('#addCityModal'),
    });

    $('#editStateId').select2({
        'width': '100%',
        dropdownParent: $('#editCityModal'),
    });

    listenClick('.addCityModal', function () {
        $('#addCityModal').appendTo('body').modal('show');
    });

    listenClick('.cities-edit-btn', function (event) {
        let cityId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('cities.edit', cityId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#cityId').val(result.data.id);
                    $('#editName').val(result.data.name);
                    $('#editStateId').
                        val(result.data.state_id).
                        trigger('change');
                    $('#editCityModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenClick('.cities-delete-btn', function (event) {
        let deleteCityId = $(event.currentTarget).attr('data-id');
        deleteItem(route('cities.destroy', deleteCityId),
            Lang.get('js.city'));
    });

    listenHiddenBsModal('#addCityModal', function () {
        $('#stateID').val('').trigger('change');
        resetModalForm('#addCityForm', '#cityValidationErrorsBox');
    });

    listenHiddenBsModal('#editCityModal', function () {
        resetModalForm('#editCityForm', '#editValidationErrorsBox');
    });

    listenClick('#resetFilter', function () {
        $('#filter_state').val('').trigger('change');
    });

}

listenSubmit('#addCityForm', function (e) {
    e.preventDefault();
    processingBtn('#addCityForm', '#cityBtnSave', 'loading');
    $.ajax({
        url: route('cities.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addCityModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addCityForm', '#cityBtnSave');
        },
    });
});

listenSubmit('#editCityForm', function (event) {
    event.preventDefault();
    processingBtn('#editCityForm', '#btnEditSave', 'loading');
    const updateCityId = $('#cityId').val();
    $.ajax({
        url: route('cities.update', updateCityId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editCityModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCityForm', '#btnEditSave');
        },
    });
});
listenChange("#selectState", function() {
         Livewire.dispatch("changeStateFilter", { state: $(this).val() });
     });

listenClick("#state-ResetFilter", function() {
         $("#selectState").val(0).change();
         hideDropdownManually($('#selectStateBtn'), $('.dropdown-menu'));
});
function hideDropdownManually(button, menu) {
    button.dropdown('toggle');
}
