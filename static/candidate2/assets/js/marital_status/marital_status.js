document.addEventListener('turbo:load', loadMaritalStatusData);

function loadMaritalStatusData() {
    if (!$('#indexMaritalStatusData').length) {
        return;
    }
    if ($('#addMartialDescriptionQuillData').length) {
        window.addMartialDescriptionQuill = new Quill(
            '#addMartialDescriptionQuillData', {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['clean'],
                    ],
                    keyboard: {
                        bindings: {
                            tab: 'disabled',
                        }
                    }
                },
                placeholder: Lang.get('js.enter_description'),
                theme: 'snow',
            });
    }

    if($('#editMartialDescriptionQuillData').length) {
        window.editMartialDescriptionQuill = new Quill(
            '#editMartialDescriptionQuillData', {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['clean'],
                    ],
                    keyboard: {
                        bindings: {
                            tab: 'disabled',
                        }
                    }
                },
                placeholder: Lang.get('js.enter_description'),
                theme: 'snow',
            });
    }

    listenHiddenBsModal('#addMaritalStatusModal', function () {
        resetModalForm('#addMaritalStatusForm', '#maritalStatusValidationErrorsBox');
        addMartialDescriptionQuill.setContents([{insert: ''}]);
        editMartialDescriptionQuill.setContents([{insert: ''}]);
    })


    listenClick('.marital-status-edit-btn', function (event) {
        let editMaritalStatusId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('maritalStatus.edit', editMaritalStatusId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.marital_status;
                    $('#maritalStatusId').val(result.data.id);
                    $('#editMaritalStatus').val(element.value);
                    element.innerHTML = result.data.description;
                    editMartialDescriptionQuill.root.innerHTML = element.value;
                    $('#editMaritalStatusModal').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })
}

listenClick('.addMaritalStatusModal', function () {
    $('#addMaritalStatusModal').appendTo('body').modal('show');
})

listenClick('.marital-status-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let salaryPeriodId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('maritalStatus.show', salaryPeriodId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showMaritalStatus').html('');
                $('#showMaritalStatusDescription').html('');
                $('#showMaritalStatus').append(result.data.marital_status);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description))
                    ? result.data.description
                    : 'N/A';
                $('#showMaritalStatusDescription').append(element.value);
                $('#showMaritalStatusModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.marital-status-delete-btn', function (event) {
    let deleteMaritalStatusId = $(event.currentTarget).attr('data-id');
    deleteItem(route('maritalStatus.destroy', deleteMaritalStatusId), Lang.get('js.marital_status'));
})

listenHiddenBsModal('#editMaritalStatusModal', function () {
    resetModalForm('#editMaritalStatusForm', '#editValidationErrorsBox');
})

listenSubmit('#addMaritalStatusForm', function (e) {
    e.preventDefault();
    let addMaritalEditorContent = addMartialDescriptionQuill.root.innerHTML;

    if (addMartialDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addMaritalEditorContent);
    $('#marital_desc').val(input.replace(/"/g, ""));
    processingBtn('#addMaritalStatusForm', '#maritalStatusBtnSave', 'loading');
    $.ajax({
        url: route('maritalStatus.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addMaritalStatusModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addMaritalStatusForm', '#maritalStatusBtnSave');
        },
    });
})

listenSubmit('#editMaritalStatusForm', function (event) {
    event.preventDefault();
    let editMaritalStatusEditorContent = editMartialDescriptionQuill.root.innerHTML;

    if (editMartialDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editMaritalStatusEditorContent);
    $('#edit_marital_desc').val(input.replace(/"/g, ""));
    processingBtn('#editMaritalStatusForm', '#editMaritalSaveBtn', 'loading');
    const updateMaritalStatusId = $('#maritalStatusId').val();
    $.ajax({
        url: route('maritalStatus.update', updateMaritalStatusId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editMaritalStatusModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editMaritalStatusForm', '#editMaritalSaveBtn');
        },
    });
})
