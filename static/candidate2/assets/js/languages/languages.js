document.addEventListener('turbo:load', loadSetLanguageData);

function loadSetLanguageData() {
    if (!$('#indexSetLanguageData').length) {
        return;
    }

    listenClick('.addLanguageModal', function () {
        $('#addLanguageModal').appendTo('body').modal('show');
    });

    listenClick('.languages-edit-btn', function (event) {
        let languageId = $(event.currentTarget).data('id');
        $.ajax({
            url: route('languages.edit', languageId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.language;
                    $('#languageId').val(result.data.id);
                    $('#editLanguage').val(element.value);
                    $('#editNative').val(result.data.native);
                    $('#editIso').val(result.data.iso_code);
                    $('#editLanguageModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenClick('.languages-delete-btn', function (event) {
        let deleteLanguageId = $(event.currentTarget).attr('data-id');
        deleteItem(route('languages.destroy', deleteLanguageId), Lang.get('js.language'));
    });

    listenHiddenBsModal('#addLanguageModal', function () {
        resetModalForm('#addLanguageForm', '#languageValidationErrorsBox');
    });

    listenHiddenBsModal('#editLanguageModal', function () {
        resetModalForm('#editLanguageForm', '#editValidationErrorsBox');
    });
}

listenSubmit('#addLanguageForm', function (e) {
    e.preventDefault();
    processingBtn('#addLanguageForm', '#languageBtnSave', 'loading');
    $.ajax({
        url: route('languages.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addLanguageModal').modal('hide');
                Livewire.dispatch('refresh');
                setTimeout(function () {
                    $('#languageBtnSave').button('reset');
                }, 1000);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            setTimeout(function () {
                $('#languageBtnSave').button('reset');
            }, 1000);
        },
        complete: function () {
            setTimeout(function () {
                processingBtn('#addLanguageForm', '#languageBtnSave');
            }, 1000);
        },
    });
});

listenSubmit('#editLanguageForm', function (event) {
    event.preventDefault();
    processingBtn('#editLanguageForm', '#btnEditSave', 'loading');
    const updateLanguageId = $('#languageId').val();
    $.ajax({
        url: route('languages.update', updateLanguageId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editLanguageModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editLanguageForm', '#btnEditSave');
        },
    });
});
