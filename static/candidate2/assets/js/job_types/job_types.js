document.addEventListener('turbo:load', loadJobTypeData);

function loadJobTypeData() {
    if (!$('#indexJobTypeData').length) {
        return;
    }
    if ($('#addJobTypeDescriptionQuillData').length) {
        window.addJobTypeDescriptionQuill = new Quill(
            '#addJobTypeDescriptionQuillData', {
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
    if ($('#editJobTypeDescriptionQuillData').length) {
        window.editJobTypeDescriptionQuill = new Quill(
            '#editJobTypeDescriptionQuillData', {
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
    listenClick('.addJobTypeModalButton', function () {
        $('#addJobTypeModal').appendTo('body').modal('show');
    });

    listenClick('.job-type-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let editJobTypeId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('jobType.edit', editJobTypeId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#jobTypeId').val(result.data.id);
                    $('#editJobTypeName').val(element.value);
                    element.innerHTML = result.data.description;
                    editJobTypeDescriptionQuill.root.innerHTML = element.value;
                    $('#editJobTypeModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenClick('.job-type-show-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let jobTypeId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('jobType.show', jobTypeId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#showName').html('');
                    $('#showDescription').html('');
                    $('#showName').append(result.data.name);
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.description;
                    $('#showDescription').append(element.value);
                    $('#showModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })
    listenHiddenBsModal('#addJobTypeModal', function () {
        resetModalForm('#addJobTypeForm', '#editValidationErrorsBox');
        addJobTypeDescriptionQuill.setContents([{ insert: '' }]);
        editJobTypeDescriptionQuill.setContents([{ insert: '' }]);
    });

    listenHiddenBsModal('#editJobTypeModal', function () {
        resetModalForm('#editJobTypeForm', '#editValidationErrorsBox');
    });

    listenClick('.job-type-delete-btn', function (event) {
        let jobTypeId = $(event.currentTarget).attr('data-id');
        deleteItem(route('jobType.destroy', jobTypeId), Lang.get('js.job_type'));
    });
}

listenSubmit('#addJobTypeForm', function (e) {
    e.preventDefault();
    let add_job_type_editor_content = addJobTypeDescriptionQuill.root.innerHTML;
    if (add_job_type_editor_content.length) {
        if (addJobTypeDescriptionQuill.getText().trim().length === 0) {
            displayErrorMessage(Lang.get('js.description_required'));
            return false;
        }
    } else {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(add_job_type_editor_content);
    $('#job_type_desc').val(input.replace(/"/g, ''));
    processingBtn('#addJobTypeForm', '#jobTypeBtnSave', 'loading');
    $.ajax({
        url: route('jobType.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addJobTypeModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addJobTypeForm', '#jobTypeBtnSave');
        },
    });
});

listenSubmit('#editJobTypeForm', function (event) {
    event.preventDefault();
    let edit_job_type_editor_content = editJobTypeDescriptionQuill.root.innerHTML;

    if (editJobTypeDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(edit_job_type_editor_content);
    $('#edit_job_type_desc').val(input.replace(/"/g, ""));
    processingBtn('#editJobTypeForm', '#jobTypeEditSaveBtn', 'loading');
    const updateJobTypeId = $('#jobTypeId').val();
    $.ajax({
        url: route('jobType.update', updateJobTypeId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editJobTypeModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editJobTypeForm', '#jobTypeEditSaveBtn');
        },
    });
});
