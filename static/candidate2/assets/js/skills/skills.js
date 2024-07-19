document.addEventListener('turbo:load', loadSkillData);

function loadSkillData() {
    if (!$('#indexSkillsData').length) {
        return;
    }
    if ($('#addSkillDescriptionQuillData').length) {
        window.addSkillDescriptionQuill = new Quill(
            '#addSkillDescriptionQuillData', {
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
    if ($('#editSkillDescriptionQuillData').length) {
        window.editSkillDescriptionQuill = new Quill(
            '#editSkillDescriptionQuillData', {
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

    listenClick('.skills-edit-btn', function (event) {
        let editSkillId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('skills.edit', editSkillId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.skill;
                    $('#skillId').val(result.data.id);
                    $('#editName').val(result.data.name);
                    element.innerHTML = result.data.description;
                    editSkillDescriptionQuill.root.innerHTML = element.value;
                    $('#editSkillsModal').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addSkillModal', function () {
        resetModalForm('#addSkillForm', '#skillValidationErrorsBox');
        addSkillDescriptionQuill.setContents([{insert: ''}]);
        editSkillDescriptionQuill.setContents([{insert: ''}]);
    })


    listenClick('.addSkillModal', function () {
        $('#addSkillModal').appendTo('body').modal('show');
    })
}
listenClick('.skills-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let salaryPeriodId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('skills.show', salaryPeriodId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showSkillName').html('');
                $('#showSkillDescription').html('');
                $('#showSkillName').append(result.data.name);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description))
                    ? result.data.description
                    : 'N/A';
                $('#showSkillDescription').append(element.value);
                $('#showSkillsModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.skills-delete-btn', function (event) {
    let deleteSkillId = $(event.currentTarget).attr('data-id');
    deleteItem(route('skills.destroy', deleteSkillId), Lang.get('js.show_skill'));
})

listenHiddenBsModal('#editSkillsModal', function () {
    resetModalForm('#editSkillsForm', '#editValidationErrorsBox');
})

listenSubmit('#addSkillForm', function (e) {
    e.preventDefault();
    let addSkillEditorContent = addSkillDescriptionQuill.root.innerHTML;

    if (addSkillDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addSkillEditorContent);
    $('#skill_desc').val(input.replace(/"/g, ''));
    processingBtn('#addSkillForm', '#skillBtnSave', 'loading');
    $.ajax({
        url: route('skills.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addSkillModal').modal('hide');
                $("#addSkillForm")[0].reset();
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addSkillForm', '#skillBtnSave');
        },
    });
})

listenSubmit('#editSkillsForm', function (event) {
    event.preventDefault();
    let editSkullEditorContent = editSkillDescriptionQuill.root.innerHTML;

    if (editSkillDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editSkullEditorContent);
    $('#edit_skill_desc').val(input.replace(/"/g, ""));
    processingBtn('#editSkillsForm', '#btnEditSave', 'loading');
    const updateSkillId = $('#skillId').val();
    $.ajax({
        url: route('skills.update', updateSkillId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editSkillsModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editSkillsForm', '#btnEditSave');
        },
    });
})
