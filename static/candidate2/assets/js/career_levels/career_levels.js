document.addEventListener('turbo:load', loadCareerLevelData);

function loadCareerLevelData() {
    if (!$('#indexCareerLevelData').length) {
        return;
    }

    listenClick('.addCareerLevelModal', function () {
        $('#addCareerModal').appendTo('body').modal('show');
    });

    listenClick('.career-level-edit-btn', function (event) {
        let careerLevelId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('careerLevel.edit', careerLevelId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.level_name;
                    $('#careerLevelId').val(result.data.id);
                    $('#editCareerLevel').val(element.value);
                    $('#editCareerLevelModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenClick('.career-level-delete-btn', function (event) {
        let careerLevelId = $(event.currentTarget).attr('data-id');
        deleteItem(route('careerLevel.destroy', careerLevelId),
            Lang.get('js.career_level'));
    })

    listenHiddenBsModal('#addCareerModal', function () {
        $('#careerBtnSave, #editCareerLevelBtnSave').attr('disabled', false);
        resetModalForm('#addCareerForm', '#careerValidationErrorsBox');
    })

    listenHiddenBsModal('#editCareerLevelModal', function () {
        $('#careerBtnSave, #editCareerLevelBtnSave').attr('disabled', false);
        resetModalForm('#editCareerLevelForm', '#editValidationErrorsBox');
    })
}

listenSubmit('#addCareerForm', function (e) {
    e.preventDefault();
    processingBtn('#addCareerForm', '#careerBtnSave', 'loading');
    $('#careerBtnSave').attr('disabled', true);
    $.ajax({
        url: route('careerLevel.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addCareerModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            $('#careerBtnSave').attr('disabled', false);
        },
        complete: function () {
            processingBtn('#addCareerForm', '#careerBtnSave');
        },
    });
})

listenSubmit('#editCareerLevelForm', function (event) {
    event.preventDefault();
    processingBtn('#editCareerLevelForm', '#editCareerLevelBtnSave', 'loading');
    $('#editCareerLevelBtnSave').attr('disabled', true);
    const editCareerLevelId = $('#careerLevelId').val();
    $.ajax({
        url: route('careerLevel.update', editCareerLevelId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editCareerLevelModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            $('#editCareerLevelBtnSave').attr('disabled', false);
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCareerLevelForm', '#editCareerLevelBtnSave');
        },
    });
})
