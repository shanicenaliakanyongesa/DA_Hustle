document.addEventListener('turbo:load', loadFaqsData);

function loadFaqsData () {
    if (!$('#addFaqDescriptionQuillData').length &&
        !$('#editFaqDescriptionQuillData').length) {
        return;
    }
    if ($('#addFaqDescriptionQuillData').length) {
        window.addFaqDescriptionQuill = new Quill('#addFaqDescriptionQuillData', {
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
    if ($('#editFaqDescriptionQuillData').length) {
        window.editFaqDescriptionQuill = new Quill('#editFaqDescriptionQuillData',
            {
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
    listenClick('.faqs-edit-btn', function (event) {
        let editFaqId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('faqs.edit', editFaqId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.title;
                    $('#faqId').val(result.data.id);
                    $('#editFaqTitle').val(element.value);
                    element.innerHTML = result.data.description;
                    editFaqDescriptionQuill.root.innerHTML = element.value;
                    $('#editFAQsModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addFAQsModal', function () {
        resetModalForm('#addFAQsForm', '#validationErrorsBox');
        addFaqDescriptionQuill.setContents([{ insert: '' }]);
        editFaqDescriptionQuill.setContents([{ insert: '' }]);
    })
}

listenClick('.addFaqModal', function () {
    $('#addFAQsModal').appendTo('body').modal('show');
})

listenClick('.faq-show-btn', function (event) {
    let showFaqId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('faqs.show', showFaqId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showFaqName').html('');
                $('#showFaqDescription').html('');
                $('#showFaqName').append(result.data.title);
                let element = document.createElement('textarea');
                element.innerHTML = result.data.description;
                $('#showFaqDescription').append(element.value);
                $('#showFaqModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.faqs-delete-btn', function (event) {
    let deleteFaqId = $(event.currentTarget).attr('data-id');
    deleteItem(route('faqs.destroy', deleteFaqId),
        Lang.get('js.faq'));
})

listenHiddenBsModal('#editFAQsModal', function () {
    resetModalForm('#editFAQsForm', '#editValidationErrorsBox');
})

listenSubmit('#addFAQsForm', function (e) {
    e.preventDefault();
    let addFaqEditorContent = addFaqDescriptionQuill.root.innerHTML;

    if (addFaqDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addFaqEditorContent);
    $('#faqs_desc').val(input.replace(/"/g, ''));
    processingBtn('#addFAQsForm', '#addFaqSaveBtn', 'loading');
    $.ajax({
        url: route('faqs.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addFAQsModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addFAQsForm', '#addFaqSaveBtn');
        },
    });
})

listenSubmit('#editFAQsForm', function (event) {
    event.preventDefault();
    let editFaqEditorContent = editFaqDescriptionQuill.root.innerHTML;

    if (editFaqDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editFaqEditorContent);
    $('#edit_faqs_desc').val(input.replace(/"/g, ""));
    processingBtn('#editFAQsForm', '#editFaqSaveBtn', 'loading');
    const updateFaqId = $('#faqId').val();
    $.ajax({
        url: route('faqs.update', updateFaqId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editFAQsModal').modal('hide');
                Livewire.dispatch('refreshDatatable');

            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editFAQsForm', '#editFaqSaveBtn');
        },
    });
});
