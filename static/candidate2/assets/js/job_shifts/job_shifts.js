document.addEventListener('turbo:load', loadJobShiftData);

function loadJobShiftData() {
    if (!$('#indexJobShiftData').length) {
        return;
    }

    if ($('#addJobShiftDescriptionQuillData').length) {
        window.addJobShiftDescriptionQuill = new Quill(
            '#addJobShiftDescriptionQuillData', {
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
    if ($('#editJobShiftDescriptionQuillData').length) {
        window.editJobShiftDescriptionQuill = new Quill(
            '#editJobShiftDescriptionQuillData', {
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
    listenClick('.addJobShiftButton', function () {
        $('#addJobShiftModal').appendTo('body').modal('show');
    })

    listenClick('.job-shift-edit-btn', function (event) {
        //  if (ajaxCallIsRunning) {
        //     return;
        // }
        ajaxCallInProgress();
        let editJobShiftId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('jobShift.edit', editJobShiftId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.shift;
                    $('#jobShiftId').val(result.data.id);
                    $('#editShift').val(element.value);
                    element.innerHTML = result.data.description;
                    editJobShiftDescriptionQuill.root.innerHTML = element.value;
                    $('#jobShiftEditModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenClick('.job-shift-show-btn', function (event) {
        //  if (ajaxCallIsRunning) {
        //     return;
        // }
        ajaxCallInProgress();
        let showJobShiftId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('jobShift.show', showJobShiftId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#showShift').html('');
                    $('#showJobShiftDescription').html('');
                    $('#showShift').append(result.data.shift);
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.description;
                    $('#showJobShiftDescription').append(element.value);
                    $('#showJobShiftModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addJobShiftModal', function () {
        resetModalForm('#addJobShiftForm', '#jobShiftValidationErrorsBox');
        addJobShiftDescriptionQuill.setContents([{ insert: '' }]);
        editJobShiftDescriptionQuill.setContents([{ insert: '' }]);
    })
}

listenClick('.job-shift-delete-btn', function (event) {
    let deleteJobShiftId = $(event.currentTarget).attr('data-id');
    deleteItem(route('jobShift.destroy', deleteJobShiftId), Lang.get('js.job_shift'));
})

listenHiddenBsModal('#jobShiftEditModal', function () {
    resetModalForm('#editJobShiftForm', '#editValidationErrorsBox');
})

listenSubmit('#addJobShiftForm', function (e) {
    e.preventDefault();
    let add_job_shift_editor_content = addJobShiftDescriptionQuill.root.innerHTML;
    if (add_job_shift_editor_content.length) {
        if (addJobShiftDescriptionQuill.getText().trim().length === 0) {
            displayErrorMessage(Lang.get('js.description_required'));
            return false;
        }
    } else {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(add_job_shift_editor_content);
    $('#job_shift_desc').val(input.replace(/"/g, ''));
    processingBtn('#addJobShiftForm', '#jobShiftBtnSave', 'loading');
    $.ajax({
        url: route('jobShift.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addJobShiftModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addJobShiftForm', '#jobShiftBtnSave');
        },
    });
})

listenSubmit('#editJobShiftForm', function (event) {
    event.preventDefault();
    let editJobShiftDescriptionQuillData = editJobShiftDescriptionQuill.root.innerHTML;

    if (editJobShiftDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editJobShiftDescriptionQuillData);
    $('#edit_job_shift_desc').val(input.replace(/"/g, ''));
    processingBtn('#editJobShiftForm', '#jobShiftEditSaveBtn', 'loading');
    const updateJobShiftId = $('#jobShiftId').val();
    $.ajax({
        url: route('jobShift.update', updateJobShiftId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#jobShiftEditModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editJobShiftForm', '#jobShiftEditSaveBtn');
        },
    });
})
