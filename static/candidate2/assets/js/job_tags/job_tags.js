document.addEventListener('turbo:load', loadJobtageData);

function loadJobtageData() {
    if (!$('#indexJobTagData').length) {
        return;
    }

    if ($('#addJobTagDescriptionQuillData').length) {
        window.addJobTagDescriptionQuill = new Quill(
            '#addJobTagDescriptionQuillData', {
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
    if ($('#editJobTagDescriptionQuillData').length) {
        window.editJobTagDescriptionQuill = new Quill(
            '#editJobTagDescriptionQuillData', {
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
    listen('click', '.addJobTagModalButton', function () {
        $('#addJobTagModal').appendTo('body').modal('show');
    });

    listenClick('.job-tag-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let updateJobTagId = $(event.currentTarget).attr('data-id');
        renderJobTagData(updateJobTagId);
    });

    function renderJobTagData(updateJobTagId) {
        $.ajax({
            url: route('jobTag.edit', updateJobTagId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#jobTagId').val(result.data.id);
                    $('#editJobTagName').val(element.value);
                    element.innerHTML = result.data.description;
                    editJobTagDescriptionQuill.root.innerHTML = element.value;
                    // $('#editDescription').
                    //     summernote('code', result.data.description);
                    $('#editJobTagModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenClick('.job-tag-show-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let showJobTagId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('jobTag.show', showJobTagId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#showJobTagName').html('');
                    $('#showJobTagDescription').html('');
                    $('#showJobTagName').append(result.data.name);
                    if (!isEmpty(result.data.description) ? $(
                        '#showJobTagDescription').
                        append(result.data.description) : $(
                        '#showJobTagDescription').
                        append('N/A'))
                        $('#showJobTagModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listen('hidden.bs.modal', '#addJobTagModal', function () {
        resetModalForm('#addJobTagForm', '#jobTagValidationErrorsBox')
        addJobTagDescriptionQuill.setContents([{ insert: '' }]);
        editJobTagDescriptionQuill.setContents([{ insert: '' }]);
    })
}

listen('click', '.job-tag-delete-btn', function (event) {
    let deleteBobTagId = $(event.currentTarget).attr('data-id');
    deleteItem(route('jobTag.destroy', deleteBobTagId), Lang.get('js.job_tag'));
});

listen('hidden.bs.modal', '#editJobTagModal', function () {
    resetModalForm('#editJobTagForm', '#editValidationErrorsBox')
})

listenSubmit('#addJobTagForm', function (e) {
    e.preventDefault();

    let add_job_tag_editor_content = addJobTagDescriptionQuill.root.innerHTML;
    if (add_job_tag_editor_content.length) {
        if (addJobTagDescriptionQuill.getText().trim().length === 0) {
            displayErrorMessage(Lang.get('js.description_required'));
            return false;
        }
    } else {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(add_job_tag_editor_content);
    $('#job_tag_desc').val(input.replace(/"/g, ''));
    processingBtn('#addJobTagForm', '#jobTagBtnSave', 'loading');
    $.ajax({
        url: route('jobTag.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addJobTagModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addJobTagForm', '#jobTagBtnSave');
        },
    });
});

listenSubmit('#editJobTagForm', function (event) {
    event.preventDefault();
    var edit_job_tag_editor_content = editJobTagDescriptionQuill.root.innerHTML;
    if (edit_job_tag_editor_content.length) {
        if (editJobTagDescriptionQuill.getText().trim().length === 0) {
            displayErrorMessage(Lang.get('js.description_required'));
            return false;
        }
    } else {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(edit_job_tag_editor_content);
    $('#edit_job_tag_desc').val(input.replace(/"/g, ''));
    processingBtn('#editJobTagForm', '#JobTagEditSaveBtn', 'loading');
    const updateJobTagId = $('#jobTagId').val();

    $.ajax({
        url: route('jobTag.update', updateJobTagId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editJobTagModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editJobTagForm', '#JobTagEditSaveBtn');
        },
    });
});
