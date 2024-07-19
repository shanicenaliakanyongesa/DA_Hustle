document.addEventListener('turbo:load', loadImageSliderData);

function loadImageSliderData () {
    if (!$('#imageSizeMessage').length) {
        return;
    }

    $('#image_filter_status').select2();

    let defaultDocumentImageUrl = $('#defaultDocumentImageUrl').val();
    let view = $('#view').val();
    let imageSizeMessage = $('#imageSizeMessage').val();
    let imageExtensionMessage = $('#imageExtensionMessage').val();

    window.addImageSliderDescriptionQuill = new Quill(
        '#addImageSliderDescriptionQuillData', {
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
            placeholder: Lang.get('js.description'),
            theme: 'snow', // or 'bubble'
        });
    addImageSliderDescriptionQuill.on('text-change',
        function (delta, oldDelta, source) {
            if (addImageSliderDescriptionQuill.getText().trim().length === 0) {
            addImageSliderDescriptionQuill.setContents([{ insert: '' }]);
        }
    });

    window.editImageSliderDescriptionQuill = new Quill('#editImageSliderDescriptionQuillData', {
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
        placeholder: 'Description',
        theme: 'snow', // or 'bubble'
    });
    editImageSliderDescriptionQuill.on('text-change', function (delta, oldDelta, source) {
        if (editImageSliderDescriptionQuill.getText().trim().length === 0) {
            editImageSliderDescriptionQuill.setContents([{ insert: '' }]);
        }
    });



// $(document).on('click', '.delete-btn', function (event) {
//     let imageSliderId = $(event.currentTarget).attr('data-id');
//     swal({
//             title: Lang.get('messages.common.delete') + ' !',
//             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.image_slider.image_slider') + '" ?',
//             type: 'warning',
//             showCancelButton: true,
//             closeOnConfirm: false,
//             showLoaderOnConfirm: true,
//             confirmButtonColor: '#6777ef',
//             cancelButtonColor: '#d33',
//             cancelButtonText: Lang.get('messages.common.no'),
//             confirmButtonText: Lang.get('messages.common.yes'),
//         },
//         function () {
//             window.livewire.emit('deleteImageSlider', imageSliderId);
//         });
// });
//
// document.addEventListener('delete', function () {
//     swal({
//         title: Lang.get('messages.common.deleted') + ' !',
//         text: Lang.get('messages.image_slider.image_slider') + Lang.get('messages.common.has_been_deleted'),
//         type: 'success',
//         confirmButtonColor: '#6777ef',
//         timer: 2000,
//     });
// });

listenHiddenBsModal('#addImageSlidersModal', function () {
        resetModalForm('#addImageSliderForm', '#validationErrorsBox');
        // $('#description').summernote('code', '');
        // $('#previewImage').attr('src', defaultDocumentImageUrl);
        $('#previewImage').css('background-image','url("' + defaultDocumentImageUrl + '")');

    });

listenHiddenBsModal('#editImageSlidersModal', function () {
    resetModalForm('#editImageSliderForm', '#editValidationErrorsBox');
    // $('#editDescription').summernote('code', '');
    $('#editPreviewImage').attr('src', defaultDocumentImageUrl);
});
// $('#description, #editDescription').summernote({
//     minHeight: 200,
//     height: 200,
//     toolbar: [
//         ['style', ['bold', 'italic', 'underline', 'clear']],
//         ['font', ['strikethrough']],
//         ['para', ['paragraph']]],
// });

    function displaySliderImage (input, selector, validationMessageSelector) {
        let displayPreview = true;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    if ((image.height < 500 || image.width < 1140)) {
                        $('#imageSlider').val('');
                        $(validationMessageSelector).removeClass('d-none');
                        $(validationMessageSelector).
                            html(imageSizeMessage).
                            show();
                        $(validationMessageSelector).delay(5000).slideUp(300);
                        return false;
                    }
                    $(selector).attr('src', e.target.result);
                    $(validationMessageSelector).hide();
                    displayPreview = true;
                };
            };
            if (displayPreview) {
                reader.readAsDataURL(input.files[0]);
                $(selector).show();
            }
        }
    };

    function isValidSliderImage (inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
            $(inputSelector).val('');
            $(validationMessageSelector).removeClass('d-none');
            $(validationMessageSelector).
                html(imageExtensionMessage).
                show();
            $(validationMessageSelector).delay(5000).slideUp(300);
            return false;
        }
        $(validationMessageSelector).hide();
        return true;
    };

    listenChange('#imageSlider', function () {
        $('#addImageSlidersModal #validationErrorsBox').addClass('d-none');
        if (isValidSliderImage($(this),
            '#addImageSlidersModal #validationErrorsBox')) {
            displaySliderImage(this, '#previewImage',
                '#addImageSlidersModal #validationErrorsBox');
        }
    });

listenChange('#editImageSlider', function () {
    $('#editImageSlidersModal #editValidationErrorsBox').addClass('d-none');
    if (isValidFile($(this), '#editImageSlidersModal #editValidationErrorsBox')) {
        displaySliderImage(this, '#editPreviewImage',
            '#editImageSlidersModal #editValidationErrorsBox');
    }
});

listenClick('.show-btn', function (event) {
    let imageSliderId = $(event.currentTarget).data('id');
    $.ajax({
        url: route('image-sliders.show', imageSliderId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showStatus').html('');
                $('#showDescription').html('');
                $('#documentUrl').html('');

                if (isEmpty(result.data.image_slider_url)) {
                    $('#documentUrl').hide();
                    $('#noDocument').show();
                } else {
                    $('#noDocument').hide();
                    $('#documentUrl').show();
                    $('#documentUrl').
                        attr('src', result.data.image_slider_url);
                }
                let status = result.data.is_active ? 'messages.common.active' : 'messages.common.de_active';
                $('#showStatus').append( Lang.get(status)  );
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description)
                    ? result.data.description
                    : 'N/A');
                $('#showDescription').append(element.value);
                $('#showModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

// $(document).ready(function () {
//     $('#image_filter_status').on('change', function (e) {
//         let data = $('#image_filter_status').select2('val');
//         window.livewire.emit('changeFilter', 'status', data);
//     });
// });

    listenClick('#resetFilter', function () {
        $('#image_filter_status').val('').trigger('change');
    });
}

window.changeIsActiveImageSliderRenderData = function (isActiveImageSliderId) {
    $.ajax({
        url: route('image-slider-change-is-active', isActiveImageSliderId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};

listenClick('.image-slider-delete-btn', function (event) {
    let deleteImageSliderId = $(event.currentTarget).attr('data-id');
    deleteItem(route('image-sliders.destroy', deleteImageSliderId), Lang.get('js.image_slider'));
});

listenSubmit('#addImageSliderForm', function (e) {
    e.preventDefault();
    processingBtn('#addImageSliderForm', '#imageSliderSaveBtn', 'loading');

    let element = document.createElement('textarea');
    let addImageSliderEditorContent = addImageSliderDescriptionQuill.root.innerHTML;
    element.innerHTML = addImageSliderEditorContent;
    let dataDesc = JSON.stringify(addImageSliderEditorContent);
    $('#descriptionData').val(dataDesc.replace(/"/g, ''));

    // if (!checkSummerNoteEmpty('#description',
    //     'Description field is required.')) {
    //     return true;
    // }
    let formData = new FormData($('#addImageSliderForm')[0]);
    $.ajax({
        url: route('image-sliders.store'),
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addImageSlidersModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addImageSliderForm', '#imageSliderSaveBtn');
        },
    });
});

listenSubmit('#editImageSliderForm', function (event) {
    event.preventDefault();
    // if (!checkSummerNoteEmpty('#editDescription',
    //     'Description field is required.')) {
    //     return true;
    // }
    let editImageSliderEditorContent = editImageSliderDescriptionQuill.root.innerHTML;

    let input = JSON.stringify(editImageSliderEditorContent);
    $('#editDescriptionData').val(input.replace(/"/g, ''));
    processingBtn('#editImageSliderForm', '#imageSliderEditSaveBtn', 'loading');
    const updateImageSliderId = $('#imageSliderId').val();
    $.ajax({
        url: route('image-sliders.update', updateImageSliderId),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editImageSlidersModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editImageSliderForm', '#imageSliderEditSaveBtn');
        },
    });
});

listenChange('.isActiveImageSlider', function (event) {
    let isActiveImageSliderId = $(this).attr('data-id');
    changeIsActiveImageSliderRenderData(isActiveImageSliderId);
});

listenChange('.isFullSlider', function () {
    $.ajax({
        url: route('image-sliders.change-full-slider'),
        method: 'post',
        data: $('#searchIsActive').serialize(),
        dataType: 'JSON',
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenChange('.isSliderActive', function () {
    $.ajax({
        url: route('image-sliders.change-slider-active'),
        method: 'post',
        dataType: 'JSON',
        success: function (result) {
            if (result.success) {
                // location.reload();
                displaySuccessMessage(result.message);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});
listenClick('.addImageSliderButton', function () {
    $('#previewImage').css('background-image', 'url(' + defaultDocumentImageUrl + ')');
    addImageSliderDescriptionQuill.setContents([{insert: ''}]);
    $('#addImageSlidersModal').appendTo('body').modal('show');
});


listenClick('.image-slider-edit-btn', function (event) {
    let editImageSliderId = $(event.currentTarget).attr('data-id');
    imageSliderRenderData(editImageSliderId);
});

function imageSliderRenderData(editImageSliderId) {
    $.ajax({
        url: route('image-sliders.edit', editImageSliderId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#imageSliderId').val(result.data.id);
                let element = document.createElement('textarea');
                if (isEmpty(result.data.image_slider_url)) {
                    $('#editPreviewImage').css('background-image',
                        'url("' + defaultDocumentImageUrl + '")');
                    // $('#editPreviewImage').attr('src', defaultDocumentImageUrl);
                } else {
                    $('#editPreviewImage').css('background-image',
                        'url("' + result.data.image_slider_url + '")');
                    // attr('src', result.data.image_slider_url);
                    $('#imageSliderUrl').css('background-image',
                        'url("' + result.data.image_slider_url + '")');
                    // attr('href', result.data.image_slider_url);
                    $('#imageSliderUrl').text(view);
                }
                element.innerHTML = result.data.description;
                editImageSliderDescriptionQuill.root.innerHTML = element.value;
                // $('#editDescription').summernote('code', result.data.description);
                (result.data.is_active == 1) ? $('#editIsActive').prop('checked', true) : $('#editIsActive').prop('checked', false);
                $('#editImageSlidersModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};
listenChange("#imageSlider", function() {
         Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
     });
listenClick("#imageSlider-ResetFilter", function() {
         $("#imageSlider").val(2).change();
         hideDropdownManually($('#imageSlider'), $('.dropdown-menu'));
});
function hideDropdownManually(button, menu) {
    button.dropdown('toggle');
}
