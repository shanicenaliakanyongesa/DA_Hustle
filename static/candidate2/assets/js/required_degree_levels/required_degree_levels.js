document.addEventListener('turbo:load', loadRequiredDegreeData);

function loadRequiredDegreeData() {
    if (!$('#indexRequiredDegreeLevel').length) {
        return;
    }
    listenClick('.addRequiredDegreeLevelTypeModal', function () {
        $('#addDegreeLevelModal').appendTo('body').modal('show');
    });


    listenClick('.degree-level-edit-btn', function (event) {
        let requiredDegreeLevelId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('requiredDegreeLevel.edit', requiredDegreeLevelId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#requiredDegreeLevelId').val(result.data.id);
                    $('#editName').val(element.value);
                    $('#editDegreeLevelModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });


    listenClick('.degree-level-delete-btn', function (event) {
        let requiredDegreeLevelId = $(event.currentTarget).attr('data-id');
        deleteItem(route('requiredDegreeLevel.destroy', requiredDegreeLevelId), Lang.get('js.degree_level'));
    });

    listenHiddenBsModal('#addDegreeLevelModal', function () {
        resetModalForm('#addDegreeLevelForm',
            '#degreeLevelValidationErrorsBox');
    });

    listenHiddenBsModal('#editDegreeLevelModal', function () {
        resetModalForm('#editDegreeLevelForm', '#editValidationErrorsBox');
    });
}

listenSubmit('#addDegreeLevelForm', function (e) {
    e.preventDefault();
    processingBtn('#addDegreeLevelForm', '#degreeLevelBtnSave', 'loading');
    $.ajax({
        url: route('requiredDegreeLevel.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addDegreeLevelModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addDegreeLevelForm', '#degreeLevelBtnSave');
        },
    });
});

listenSubmit('#editDegreeLevelForm', function (event) {
    event.preventDefault();
    processingBtn('#editDegreeLevelForm', '#btnEditSave', 'loading');
    const id = $('#requiredDegreeLevelId').val();
    $.ajax({
        url: route('requiredDegreeLevel.update', id),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editDegreeLevelModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editDegreeLevelForm', '#btnEditSave');
        },
    });
});
