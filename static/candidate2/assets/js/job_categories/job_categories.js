document.addEventListener('turbo:load', loadJobCategoryData);

function loadJobCategoryData() {

    if (!$('#indexJobCategoryData').length) {
        return;
    }

    var defaultDocumentImageUrl = $('#defaultDocumentImageUrl').val();

    if ($('#addJobCategoryDescriptionQuillData').length) {
        window.addJobCategoryDescriptionQuill = new Quill(
            '#addJobCategoryDescriptionQuillData', {
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

    if($('#editJobCategoryDescriptionQuillData').length) {
        window.editJobCategoryDescriptionQuill = new Quill(
            '#editJobCategoryDescriptionQuillData', {
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

    listenClick('.addJobCategoryModal', function () {
        $('#addJobCategoryModal').appendTo('body').modal('show');
    })

    listenChange('#job_category_image', function () {
        if (isValidFile($(this), '#validationErrorsBox')) {
            displayPhoto(this, '#previewImage');
        }
    })

    listenChange('#editCustomerImage', function () {
        if (isValidFile($(this), '#editValidationErrorsBox')) {
            displayPhoto(this, '#editPreviewImage');
        }
    })

    listenClick('.job-category-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let editJobCategoryId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('job-categories.edit', editJobCategoryId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#jobCategoryId').val(result.data.id);
                    $('#editName').val(element.value);
                    element.innerHTML = result.data.description;
                    editJobCategoryDescriptionQuill.root.innerHTML = element.value;
                    (result.data.is_featured == 1) ? $('#editIsFeatured').
                        prop('checked', true) : $('#editIsFeatured').
                        prop('checked', false);
                    if (isEmpty(result.data.image_url)) {
                        $('#editPreviewImage').
                            css('background-image',
                                'url("' + defaultDocumentImageUrl + '")');
                    } else {
                        $('#editPreviewImage').
                            css('background-image',
                                'url("' + result.data.image_url + '")');
                    }
                    $('#jobCategoryEditModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenClick('.job-category-show-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let showJobCategoryId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('job-categories.show', showJobCategoryId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#showJobCategoryName').html('');
                    $('#showJobCategoryDescription').html('');
                    $('#showIsFeatured').html('');
                    $('#showJobCategoryName').append(result.data.name);
                    if (!isEmpty(result.data.description) ? $(
                        '#showJobCategoryDescription').
                        append(result.data.description) : $('#showJobCategoryDescription').
                        append('N/A'))
                        (result.data.is_featured == 1) ? $('#showIsFeatured').
                                append('Yes')
                            : $('#showIsFeatured').append('No');
                    $('#showModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addJobCategoryModal', function () {
        resetModalForm('#addJobCategoryForm',
            '#jobCategoryValidationErrorsBox');
        let defaultDocumentImageUrl = $('#defaultDocumentImageUrl').val();
        addJobCategoryDescriptionQuill.setContents([{insert: ''}]);
        $('#previewImage').css('background-image', 'url("' + defaultDocumentImageUrl + '")');
    })

    listenHiddenBsModal('#jobCategoryEditModal', function () {
        resetModalForm('#editJobCategoryForm', '#editValidationErrorsBox');
    })

    listenClick('#resetFilter', function () {
        $('#filterFeatured').val('').trigger('change');
    })

}
listenChange('.isFeaturedJobCategory', function (event) {
    let isFeaturedJobCategoryId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('change-status', isFeaturedJobCategoryId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch('refresh');
                Livewire.dispatch('refreshDatatable');
            }
        },
    });
})

listenSubmit('#addJobCategoryForm', function (e) {
    e.preventDefault();
    let add_job_category_editor_content = addJobCategoryDescriptionQuill.root.innerHTML;
    if (add_job_category_editor_content.length) {
        if (addJobCategoryDescriptionQuill.getText().trim().length === 0) {
            displayErrorMessage(Lang.get('js.description_required'));
            return false;
        }
    } else {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }

    let input = JSON.stringify(add_job_category_editor_content);
    $('#jobCategoryDescriptionValue').val(input.replace(/"/g, ''));
    processingBtn('#addJobCategoryForm', '#jobCategoryBtnSave', 'loading');

    $.ajax({
        url: route('job-categories.store'),
        type: 'POST',
        data: new FormData(this),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addJobCategoryModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addJobCategoryForm', '#jobCategoryBtnSave');
        },
    });
})

listenSubmit('#editJobCategoryForm', function (event) {
    event.preventDefault();
    let update_editor_content = editJobCategoryDescriptionQuill.root.innerHTML;

    if (editJobCategoryDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }

    let input = JSON.stringify(update_editor_content);
    $('#editJobCategoryDescriptionValue').val(input.replace(/"/g, ""));
    processingBtn('#editJobCategoryForm', '#editJobCategorySaveBtn', 'loading');
    const updateJobcategoryId = $('#jobCategoryId').val();
    $.ajax({
        url: route('job-categories.update', updateJobcategoryId),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#jobCategoryEditModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editJobCategoryForm', '#editJobCategorySaveBtn');
        },
    });
})

listenClick('.job-category-delete-btn', function (event) {
    let deleteJobCategoryId = $(event.currentTarget).attr('data-id');
    deleteItem(route('job-categories.destroy', deleteJobCategoryId),
        Lang.get('js.job_category'));
});

listenClick('#remove-image', function () {
    defaultImagePreview('#previewImage', 1);
});
listenChange("#jobCategoryFilter", function() {
         Livewire.dispatch("changeFeaturedFilter", { featured: $(this).val() });
});
listenClick("#jobCategory-ResetFilter", function() {
         $("#jobCategoryFilter").val(2).change();
         hideDropdownManually($('#jobCategoryFilterBtn'), $('.dropdown-menu'));
});
function hideDropdownManually(button, menu) {
    button.dropdown('toggle');
}
