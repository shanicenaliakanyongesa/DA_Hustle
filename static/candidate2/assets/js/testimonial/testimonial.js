document.addEventListener('turbo:load', loadTestimonialData);

function loadTestimonialData() {

    let defaultDocumentImageUrl = $('#defaultDocumentImageUrl').val();
    if (!$('#addTestimonialDescriptionQuillData').length &&
        !$('#editTestimonialDescriptionQuillData').length) {
        return;
    }
    window.addTestimonialDescriptionQuill = new Quill(
        '#addTestimonialDescriptionQuillData', {
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

    window.editTestimonialDescriptionQuill = new Quill(
        '#editTestimonialDescriptionQuillData', {
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

    listenClick('.testimonial-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let testimonialId = $(event.currentTarget).attr('data-id');
        renderTestimonialData(testimonialId);
    });

    function renderTestimonialData (testimonialId) {
        $.ajax({
            url: route('testimonials.edit', testimonialId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.customer_name;
                    $('#testimonialId').val(result.data.id);
                    $('#editCustomerName').val(element.value);
                    if (isEmpty(result.data.customer_image_url)) {
                        $('#editPreviewImage').css('background-image',
                            'url("' + defaultDocumentImageUrl + '")');
                    } else {
                        $('#editPreviewImage').css('background-image',
                            'url("' + result.data.customer_image_url + '")');
                    }
                    element.innerHTML = result.data.description;
                    editTestimonialDescriptionQuill.root.innerHTML = element.value;
                    $('#editTestimonialModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    // $(document).on('click', '.delete-btn', function (event) {
    //     let testimonialId = $(event.currentTarget).attr('data-id');
    //     swal({
    //             title: Lang.get('messages.common.delete') + ' !',
    //             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.testimonial.testimonial') + '" ?',
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
    //             window.livewire.emit('deleteTestimonial', testimonialId);
    //         });
    // });
    //
    // document.addEventListener('delete', function () {
    //     swal({
    //         title: Lang.get('messages.common.deleted') + ' !',
    //         text: Lang.get('messages.testimonial.testimonial') + Lang.get('messages.common.has_been_deleted'),
    //         type: 'success',
    //         confirmButtonColor: '#6777ef',
    //         timer: 2000,
    //     });
    // });

    listenHiddenBsModal('#addTestimonialsModal', function () {
        resetModalForm('#addTestimonialForm', '#validationErrorsBox');
        addTestimonialDescriptionQuill.setContents([{ insert: '' }]);
        // $('#previewImage').attr('src', defaultDocumentImageUrl);
        $('#previewImage').
            css('background-image', 'url("' + defaultDocumentImageUrl + '")');

    });

    listenChange('#customerImage', function () {
        if (isValidFile($(this), '#validationErrorsBox')) {
            displayPhoto(this, '#previewImage');
        }
    });

    listenChange('#editCustomerImage', function () {
        if (isValidFile($(this), '#editValidationErrorsBox')) {
            displayPhoto(this, '#editPreviewImage');
        }
    });
}

listenClick('.testimonial-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let showTestimonialId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('testimonials.show', showTestimonialId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showCustomerName').html('');
                $('#showTestimonialDescription').html('');
                $('#documentUrl').html('');

                $('#showCustomerName').append(result.data.customer_name);
                if (isEmpty(result.data.customer_image_url)) {
                    $('#documentUrl').hide();
                    $('#noDocument').show();
                } else {
                    $('#noDocument').hide();
                    $('#documentUrl').show();
                    $('#documentUrl').
                        attr('src', result.data.customer_image_url);
                }
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description))
                    ? result.data.description
                    : 'N/A';
                $('#showTestimonialDescription').append(element.value);
                $('#showTestimonialModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenClick('.addTestimonialModal', function () {
    $('#addTestimonialsModal').appendTo('body').modal('show');
});

listenClick('.testimonial-delete-btn', function (event) {
    var deleteTestimonialId = $(event.currentTarget).attr('data-id');
    deleteItem(route('testimonials.destroy', deleteTestimonialId), Lang.get('js.testimonial'));
});
listenHiddenBsModal('#editTestimonialModal', function () {
    resetModalForm('#editTestimonialForm', '#editValidationErrorsBox');
    // $('#editForm')[0].reset();
});
// let source = $('#actionTemplate')[0].innerHTML;
// window.actionTemplate = Handlebars.compile(source);
listenSubmit('#addTestimonialForm', function (e) {
    e.preventDefault();
    let addTestimonialEditorContent = addTestimonialDescriptionQuill.root.innerHTML;

    if (addTestimonialDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addTestimonialEditorContent);
    $('#testimonial_desc').val(input.replace(/"/g, ""));

    processingBtn('#addTestimonialForm', '#testimonialSaveBtn', 'loading');
    if ($('#customerName').val().length > 50) {
        displayErrorMessage('Customer Name may not be greater than 50 character.');
        setTimeout(function () {
            processingBtn('#addTestimonialForm', '#testimonialSaveBtn');
        }, 1000)
        return false;
    }
    $.ajax({
        url: route('testimonials.store'),
        type: 'POST',
        data: new FormData(this),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addTestimonialsModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addTestimonialForm', '#testimonialSaveBtn');
        },
    });
});

listenSubmit('#editTestimonialForm', function (event) {
    event.preventDefault();
    let editTestimonialEditorContent = editTestimonialDescriptionQuill.root.innerHTML;

    if (editTestimonialDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editTestimonialEditorContent);
    $('#testimonial_edit_desc').val(input.replace(/"/g, ""));
    processingBtn('#editTestimonialForm', '#testimonialEditBtn', 'loading');
    if ($('#editCustomerName').val().length > 50) {
        displayErrorMessage(
            'Customer Name may not be greater than 50 character.');
        setTimeout(function () {
            processingBtn('#editTestimonialForm', '#testimonialEditBtn');
        }, 1000)
        return false;
    }
    const updateTestimnialId = $('#testimonialId').val();
    $.ajax({
        url: route('testimonials.update', updateTestimnialId),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editTestimonialModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editTestimonialForm', '#testimonialEditBtn');
        },
    });
});
