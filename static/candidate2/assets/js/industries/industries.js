document.addEventListener('turbo:load', loadIndustriesData);

function loadIndustriesData() {
    if (!$('#indexIndustriesData').length) {
        return;
    }
    if ($('#addIndustryDescriptionQuillData').length) {
        window.addIndustryDescriptionQuill = new Quill(
            '#addIndustryDescriptionQuillData', {
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
    if ($('#editIndustryDescriptionQuillData').length) {
        window.editIndustryDescriptionQuill = new Quill(
            '#editIndustryDescriptionQuillData', {
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
    listenClick('.industries-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
        //     return;
        // }
        ajaxCallInProgress();
        let editIndustryId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('industry.edit', editIndustryId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#industryId').val(result.data.id);
                    $('#editName').val(element.value);
                    element.innerHTML = result.data.description;
                    editIndustryDescriptionQuill.root.innerHTML = element.value;
                    $('#editIndustriesModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addIndustriesModal', function () {
        resetModalForm('#addNewIndustryForm', '#validationErrorsBox');
        addIndustryDescriptionQuill.setContents([{ insert: '' }]);
        editIndustryDescriptionQuill.setContents([{ insert: '' }]);
    });

    listenHiddenBsModal('#editIndustriesModal', function () {
        resetModalForm('#editIndustryForm', '#editValidationErrorsBox');
    });

    listenClick('.addIndustryModal', function () {
        $('#addIndustriesModal').appendTo('body').modal('show');
    });

    listenClick('.industries-show-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let showIndustryId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('industry.show', showIndustryId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#showIndustryName').html('');
                    $('#showIndustryDescription').html('');
                    $('#showIndustryName').append(result.data.name);
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.description;
                    $('#showIndustryDescription').append(element.value);
                    $('#showIndustriesModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    listenClick('.industries-delete-btn', function (event) {
        let deleteIndustryId = $(event.currentTarget).attr('data-id');
        deleteItem(route('industry.destroy', deleteIndustryId), Lang.get('js.industry'));
    });

}

listenSubmit('#addNewIndustryForm', function (e) {
    e.preventDefault();
    let addIndustriesEditorContent = addIndustryDescriptionQuill.root.innerHTML;

    if (addIndustryDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addIndustriesEditorContent);
    $('#industry_desc').val(input.replace(/"/g, ""));
    processingBtn('#addNewIndustryForm', '#industriesSaveBtn', 'loading');
    $.ajax({
        url: route('industry.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addIndustriesModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addNewIndustryForm', '#industriesSaveBtn');
        },
    });
})

listenSubmit('#editIndustryForm', function (event) {
    event.preventDefault();
    let editIndustriesEditorContent = editIndustryDescriptionQuill.root.innerHTML;

    if (editIndustryDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editIndustriesEditorContent);
    $('#edit_industry_desc').val(input.replace(/"/g, ""));
    processingBtn('#editIndustryForm', '#industriesSaveBtn', 'loading');
    const updateIndustryId = $('#industryId').val();
    $.ajax({
        url: route('industry.update', updateIndustryId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editIndustriesModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editIndustryForm', '#industriesSaveBtn');
        },
    });
})
