document.addEventListener('turbo:load', loadEmailTemplatesData);

function loadEmailTemplatesData () {
    if (!$('#emailTemplateEditBodyQuillData').length) {
        return;
    }
    /* summernote modal label */
    $('.note-modal .form-group label').
        append(' <span class="text-danger">*</span>');

    let emailTemplateEditBodyQuill = new Quill(
        '#emailTemplateEditBodyQuillData', {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['clean'],
                ],
                keyboard: {
                    bindings: {
                        tab:'disabled',
                    }
                }
        },
        placeholder: 'Enter Body',
        theme: 'snow'
    });
    emailTemplateEditBodyQuill.on('text-change', function (delta, oldDelta, source) {
        if (emailTemplateEditBodyQuill.getText().trim().length === 0) {
            emailTemplateEditBodyQuill.setContents([{ insert: '' }]);
        }
    });
    // $('#body').summernote({
    //     minHeight: 200,
    //     height: 200,
    //     dialogsInBody: true,
    //     toolbar: [
    //         ['style', ['style']],
    //         ['font', ['bold', 'underline', 'clear']],
    //         ['color', ['color']],
    //         ['para', ['ul', 'ol', 'paragraph']],
    //         ['table', ['table']],
    //         ['insert', ['link', 'picture']],
    //         ['view', ['codeview']]
    //     ]
    // });

    let element = document.createElement('textarea');
    element.innerHTML = JSON.parse($('#editEmailBody').val());
    emailTemplateEditBodyQuill.root.innerHTML = element.value;

    // let element = document.createElement('textarea');
    // element.innerHTML = termConditionData;
    // quill1.root.innerHTML = element.value;
    listenSubmit('#editEmailTemplateForm', (e) => {
        // if (!checkSummerNoteEmpty('#body',
        //     'Body field is required.', 1)) {
        //     e.preventDefault();
        //     return true;
        // }

        let addEmailTemplateEditorContent = emailTemplateEditBodyQuill.root.innerHTML;
        if (emailTemplateEditBodyQuill.getText().trim().length === 0) {
            displayErrorMessage('Body field is required.');
            return false;
        }
        // let input = JSON.stringify(editor_content1);

        $('#editTemplateDescription').val(addEmailTemplateEditorContent);
    });

    listenClick('.note-link-btn', (e) => {
        e.preventDefault();
        let text = $('.note-form-group .note-link-text').val().trim().length;
        let url = $('.note-form-group .note-link-url').val().trim().length;
        if (text == 0) {
            displayErrorMessage('Text Field is required.')
            $('.link-dialog').modal("show");
            return false;
        }

        if (url == 0) {
            displayErrorMessage('Url Field is required.');
            $('.link-dialog').modal("show");

            return false;
        }

        return true;
    });

    listenClick('.note-image-btn', (e) => {
        let imageUrl = $('.note-group-image-url .note-image-url').
            val().
            trim().length;
        let imageModal = $('.note-modal:eq(1)');
        if (imageUrl == 0) {
            imageModal.show();
            imageModal.addClass('show');
            displayErrorMessage('Url Field is required.');

            return false;
        }
        imageModal.hide();
        imageModal.removeClass('show');

        return true;
    });
}
