document.addEventListener('turbo:load', loadFunctionalAreaData);

function loadFunctionalAreaData() {

    if (!$('#indexFunctionalAreas').length) {
        return;
    }
    listenClick('.addFunctionalAreaModal', function () {
        $('#addFunctionalModal').appendTo('body').modal('show');
    });
    listenClick('.functional-area-edit-btn', function (event) {
        let functionalAreaId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('functionalArea.edit', functionalAreaId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#functionalAreaId').val(result.data.id);
                    $('#editName').val(element.value);
                    $('#editFunctionalAreaModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenClick('.functional-area-delete-btn', function (event) {
        let deteteFunctionalAreaId = $(event.currentTarget).attr('data-id');
        deleteItem(route('functionalArea.destroy', deteteFunctionalAreaId),Lang.get('js.functional_area'));
    });

    listenHiddenBsModal('#addFunctionalModal', function () {
        $('#functionalBtnSave').attr('disabled', false);
        resetModalForm('#addFunctionalForm', '#validationErrorsBox');
    });

    listenHiddenBsModal('#editFunctionalAreaModal', function () {
        $('#editFunctionalAreaSaveBtn').attr('disabled', false);
        resetModalForm('#editFunctionalAreaForm', '#editValidationErrorsBox');
    });
}

listenSubmit('#addFunctionalForm', function (e) {
    e.preventDefault();
    processingBtn('#addFunctionalForm', '#functionalBtnSave', 'loading');
    $('#functionalBtnSave').attr('disabled', true);
    $.ajax({
        url: route('functionalArea.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addFunctionalModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            $('#functionalBtnSave').attr('disabled', false);
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addFunctionalForm', '#functionalBtnSave');
        },
    });
});

listenSubmit('#editFunctionalAreaForm', function (event) {
    event.preventDefault();
    processingBtn('#editFunctionalAreaForm', '#editFunctionalAreaSaveBtn',
        'loading');
    $('#editFunctionalAreaSaveBtn').attr('disabled', true);
    const editFunctionalAreaId = $('#functionalAreaId').val();
    $.ajax({
        url: route('functionalArea.update', editFunctionalAreaId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editFunctionalAreaModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            $('#editFunctionalAreaSaveBtn').attr('disabled', false);
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editFunctionalAreaForm',
                '#editFunctionalAreaSaveBtn');
        },
    });
});
