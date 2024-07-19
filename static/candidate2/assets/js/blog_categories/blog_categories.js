document.addEventListener('turbo:load', loadBlogCategoryData);

function loadBlogCategoryData() {
    if (!$('#addBlogCategoryDescriptionQuillData').length &&
        !$('#editBlogCategoryDescriptionQuillData').length) {
        return;
    }
    if ($('#addBlogCategoryDescriptionQuillData').length) {
        window.addBlogCategoryDescriptionQuill = new Quill(
            '#addBlogCategoryDescriptionQuillData', {
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
    if ($('#editBlogCategoryDescriptionQuillData').length) {
        window.editBlogCategoryDescriptionQuill = new Quill(
            '#editBlogCategoryDescriptionQuillData', {
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

    listenClick('.post-category-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
        //     return;
        // }
        ajaxCallInProgress();
        let editBlogCategoryId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('post-categories.edit', editBlogCategoryId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#blogCategoryId').val(result.data.id);
                    $('#editPostCategoryName').val(element.value);
                    element.innerHTML = result.data.description;
                    editBlogCategoryDescriptionQuill.root.innerHTML = element.value;
                    $('#editPostCategoryModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addBlogCategoryModal', function () {
        resetModalForm('#addPostCategoryForm', '#validationErrorsBox');
        addBlogCategoryDescriptionQuill.setContents([{ insert: '' }]);
        editBlogCategoryDescriptionQuill.setContents([{ insert: '' }]);
    })

}
listenClick('.post-category-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let showBlogCategoryId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('post-categories.show', showBlogCategoryId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showBlogCategoryName').html('');
                $('#showBlogCategoryDescription').html('');
                $('#showBlogCategoryName').append(result.data.name);
                let element = document.createElement('textarea');
                if (!isEmpty(result.data.description)) {
                    element.innerHTML = result.data.description;
                } else {
                    element.innerHTML = 'N/A';
                }
                $('#showBlogCategoryDescription').append(element.value);
                $('#showBlogCategoryModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenHiddenBsModal('#editPostCategoryModal', function () {
    resetModalForm('#editPostCategoryForm', '#editValidationErrorsBox');
})

listenClick('.addBlogCategoryModalName', function () {
    $('#addBlogCategoryModal').appendTo('body').modal('show');
})

listenClick('.post-category-delete-btn', function (event) {
    let deleteBlogCategoryId = $(event.currentTarget).attr('data-id');
    deleteItem(route('post-categories.destroy', deleteBlogCategoryId), Lang.get('js.blog_category'));
})

listenSubmit('#addPostCategoryForm', function (e) {
    e.preventDefault();
    let addBlogCategoryEditorContent = addBlogCategoryDescriptionQuill.root.innerHTML;

    if (addBlogCategoryDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addBlogCategoryEditorContent);
    $('#post_category_desc').val(input.replace(/"/g, ''));

    processingBtn('#addPostCategoryForm', '#addBlogCategorySaveBtn', 'loading');
    $.ajax({
        url: route('post-categories.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addBlogCategoryModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addPostCategoryForm', '#addBlogCategorySaveBtn');
        },
    });
});

listenSubmit('#editPostCategoryForm', function (event) {
    event.preventDefault();
    let editBlogCategoryEditorContent = editBlogCategoryDescriptionQuill.root.innerHTML;

    if (editBlogCategoryDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editBlogCategoryEditorContent);
    $('#edit_post_category_desc').val(input.replace(/"/g, ""));
    processingBtn('#editPostCategoryForm', '#postCategoryEditSaveBtn', 'loading');
    const updateBlogCategoryId = $('#blogCategoryId').val();
    $.ajax({
        url: route('post-categories.update', updateBlogCategoryId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editPostCategoryModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editPostCategoryForm', '#postCategoryEditSaveBtn');
        },
    });
});
