document.addEventListener('turbo:load', loadSalaryPeriodData);

function loadSalaryPeriodData() {
    if (!$('#indexSalaryPeriodData').length) {
        return;
    }

    if ($('#addSalaryPeriodDescriptionQuillData').length) {
        window.addSalaryPeriodDescriptionQuill = new Quill(
            '#addSalaryPeriodDescriptionQuillData', {
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

    if($('#editSalaryPeriodDescriptionQuillData').length) {
        window.editSalaryPeriodDescriptionQuill = new Quill(
            '#editSalaryPeriodDescriptionQuillData', {
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

    listenClick('.salary-period-edit-btn', function (event) {
        let editSalaryPeriodId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('salaryPeriod.edit', editSalaryPeriodId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.period;
                    $('#salaryPeriodId').val(result.data.id);
                    $('#editSalaryPeriod').val(element.value);
                    element.innerHTML = result.data.description;
                    editSalaryPeriodDescriptionQuill.root.innerHTML = element.value;
                    $('#editSalaryPeriodModal').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addSalaryPeriodModal', function () {
        resetModalForm('#addSalaryPeriodForm', '#salaryPeriodValidationErrorsBox');
        addSalaryPeriodDescriptionQuill.setContents([{insert: ''}]);
        editSalaryPeriodDescriptionQuill.setContents([{insert: ''}]);
    })
}

listenClick('.addSalaryPeriodModal', function () {
    $('#addSalaryPeriodModal').appendTo('body').modal('show');
})

listenClick('.salary-period-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let salaryPeriodId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('salaryPeriod.show', salaryPeriodId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showSalaryPeriod').html('');
                $('#showSalaryPeriodDescription').html('');
                $('#showSalaryPeriod').append(result.data.period);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description))
                    ? result.data.description
                    : 'N/A';
                $('#showSalaryPeriodDescription').append(element.value);
                $('#showSalaryPeriodModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.salary-period-delete-btn', function (event) {
    let deleteSalaryPeriodId = $(event.currentTarget).attr('data-id');
    deleteItem(route('salaryPeriod.destroy', deleteSalaryPeriodId), Lang.get('js.salary_period'));
})

listenHiddenBsModal('#editSalaryPeriodModal', function () {
    resetModalForm('#editSalaryPeriodForm', '#editValidationErrorsBox');
})

listenSubmit('#addSalaryPeriodForm', function (e) {
    e.preventDefault();
    let addSalaryPeriodEditorContent = addSalaryPeriodDescriptionQuill.root.innerHTML;

    if (addSalaryPeriodDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage('Description field is required.');
        return false;
    }

    let input = JSON.stringify(addSalaryPeriodEditorContent);
    $('#salary_period_desc').val(input.replace(/"/g, ""));
    processingBtn('#addSalaryPeriodForm', '#salaryPeriodBtnSave', 'loading');
    $.ajax({
        url: route('salaryPeriod.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addSalaryPeriodModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addSalaryPeriodForm', '#salaryPeriodBtnSave');
        },
    });
})

listenSubmit('#editSalaryPeriodForm', function (event) {
    event.preventDefault();
    let editSalaryPeriodEditorContent = editSalaryPeriodDescriptionQuill.root.innerHTML;

    if (editSalaryPeriodDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage('Description field is required.');
        return false;
    }
    let input = JSON.stringify(editSalaryPeriodEditorContent);
    $('#edit_salary_period_desc').val(input.replace(/"/g, ""));
    processingBtn('#editSalaryPeriodForm', '#editSalaryPeriodSaveBtn', 'loading');
    const updateSalarayPeriodId = $('#salaryPeriodId').val();
    $.ajax({
        url: route('salaryPeriod.update', updateSalarayPeriodId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editSalaryPeriodModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editSalaryPeriodForm', '#editSalaryPeriodSaveBtn');
        },
    });
})
