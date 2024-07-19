document.addEventListener('turbo:load', loadCreateEditBlogData);

function loadCreateEditBlogData() {

    if(!$('#blog_category_id').length){
        return
    }

    $('#blog_category_id').select2({
        width: '100%',
        placeholder: Lang.get('js.select_post_category'),
    });

    // $('#description').summernote({
    //     minHeight: 200,
    //     height: 200,
    //     placeholder: 'Enter Post Details',
    //     toolbar: [
    //         // [groupName, [list of button]]
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['font', ['strikethrough']],
    //         ['para', ['paragraph']],
    //     ],
    // });
    let quill = new Quill('#details', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['clean']
            ],
            keyboard: {
                bindings: {
                    tab:'disabled',
                }
            }
        },
        placeholder: Lang.get('js.enter_post_description'),
        theme: 'snow'
    });
    quill.root.innerHTML = $('#postDescription').val();

    if (typeof blogDescription != 'undefined') {
        let element = document.createElement('textarea');
        element.innerHTML = blogDescription;
        quill.root.innerHTML = element.value;
    }

    listenSubmit('#editBlogForm, #createBlogForm', (e) => {
        // if (!checkSummerNoteEmpty('#description',
        //     'Description field is required.', 1)) {
        //     e.preventDefault();
        //     return true;
        // }

        let editor_content1 = quill.root.innerHTML;
        let input = JSON.stringify(editor_content1);

        if (quill.getText().trim().length === 0) {
            displayErrorMessage(Lang.get('js.description_required'));
            return false;
        }

        $('#postDescription').val(input.replace(/"/g, ""));

    });
}

    listenChange('#image', function () {
        let validFile = isValidFile($(this), '#validationErrorsBox');
        if (validFile) {
            displayPhoto(this, '#previewImage');
            $('#btnSave').prop('disabled', false);
        } else {
            $('#btnSave').prop('disabled', true);
        }
    });
