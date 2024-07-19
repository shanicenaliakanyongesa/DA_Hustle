document.addEventListener('turbo:load', loadHeaderSliderData);

function loadHeaderSliderData () {
    if (!$('#headerSizeMessage').length) {
        return;
    }

    $('#headerFilterStatus').select2();

    let defaultDocumentImageUrl = $('#defaultDocumentImageUrl').val();
    let view = $('#view').val();
    let headerSizeMessage = $('#headerSizeMessage').val();
    let headerExtensionMessage = $('#headerExtensionMessage').val();

    listenClick('.header-slider-edit-btn', function (event) {
        let editHeaderSliderId = $(event.currentTarget).attr('data-id');
        headerSliderRenderData(editHeaderSliderId);
    });

    function headerSliderRenderData (editHeaderSliderId) {
        $.ajax({
            url: route('header.sliders.edit', editHeaderSliderId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#headerSliderId').val(result.data.id);
                    if (isEmpty(result.data.header_slider_url)) {

                        $('#editPreviewImage').
                            css('background-image',
                                'url("' + defaultDocumentImageUrl + '")');
                        // $('#editPreviewImage').attr('src', defaultDocumentImageUrl);
                    } else {
                        $('#editPreviewImage').
                            css('background-image',
                                'url("' + result.data.header_slider_url + '")');
                        // attr('src', result.data.header_slider_url);
                        $('#imageSliderUrl').
                            css('background-image',
                                'url("' + result.data.header_slider_url + '")');
                        // attr('href', result.data.header_slider_url);
                        $('#imageSliderUrl').text(view);
                    }
                    (result.data.is_active == 1) ? $('#editIsActive').
                        prop('checked', true) : $('#editIsActive').
                        prop('checked', false);
                    $('#editHeaderSlidersModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    }

    listenClick('.addHeaderSliderModal', function () {
        $('#previewImage').
            css('background-image', 'url(' + defaultDocumentImageUrl + ')');
        $('#addHeaderSlidersModal').appendTo('body').modal('show');
    });

// $(document).on('click', '.delete-btn', function (event) {
//     let headerSliderId = $(event.currentTarget).attr('data-id');
//     swal({
//             title: Lang.get('messages.common.delete') + ' !',
//             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.header_slider.header_slider') + '" ?',
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
//             window.livewire.emit('deleteHeaderSlider', headerSliderId);
//         });
// });
//
// document.addEventListener('delete', function () {
//     swal({
//         title: Lang.get('messages.common.deleted') + ' !',
//         text: Lang.get('messages.header_slider.header_slider') + Lang.get('messages.common.has_been_deleted'),
//         type: 'success',
//         confirmButtonColor: '#6777ef',
//         timer: 2000,
//     });
// });

    listenHiddenBsModal('#addHeaderSlidersModal', function () {
        resetModalForm('#addHeaderSliderForm', '#validationErrorsBox');
        // $('#previewImage').attr('src', defaultDocumentImageUrl);
        $('#previewImage').
            css('background-image', 'url("' + defaultDocumentImageUrl + '")');
    });

    listenHiddenBsModal('#editHeaderSlidersModal', function () {
        resetModalForm('#editHeaderSliderForm', '#editValidationErrorsBox');
        $('#editPreviewImage').attr('src', defaultDocumentImageUrl);
    });

    function displayHeaderSliderImage (
        input, selector, validationMessageSelector) {
        let displayPreview = true;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    if ((image.height < 1080 || image.width < 1920)) {
                        $('#imageSlider').val('');
                        $(validationMessageSelector).removeClass('d-none');
                        $(validationMessageSelector).
                            html(headerSizeMessage).
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

    function isValidHeaderSliderImage (
        inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
            $(inputSelector).val('');
            $(validationMessageSelector).removeClass('d-none');
            $(validationMessageSelector).
                html(headerSizeMessage).
                show();
            $(validationMessageSelector).delay(5000).slideUp(300);
            return false;
        }
        $(validationMessageSelector).hide();
        return true;
    };

    listenChange('#headerSlider', function () {
        $('#addHeaderSlidersModal #validationErrorsBox').addClass('d-none');
        if (isValidHeaderSliderImage($(this),
            '#addHeaderSlidersModal #validationErrorsBox')) {
            displayHeaderSliderImage(this, '#previewImage',
                '#addHeaderSlidersModal #validationErrorsBox');
        }
    });

    listenChange('#editHeaderSlider', function () {
        $('#editHeaderSlidersModal #editValidationErrorsBox').
            addClass('d-none');
        if (isValidFile($(this),
            '#editHeaderSlidersModal #editValidationErrorsBox')) {
            displayHeaderSliderImage(this, '#editPreviewImage',
                '#editHeaderSlidersModal #editValidationErrorsBox');
        }
    });

// $(document).ready(function () {
//     $('#headerFilterStatus').on('change', function (e) {
//         let data = $('#headerFilterStatus').select2('val');
//         window.livewire.emit('changeFilter', 'status', data);
//     });
// });
    listenClick('#resetFilter', function () {
        $('#headerFilterStatus').val('').trigger('change');
    });
}

listenSubmit('#addHeaderSliderForm', function (e) {
    e.preventDefault();
    processingBtn('#addHeaderSliderForm', '#headerSliderSaveBtn',
        'loading');
    // if ($('#description').summernote('isEmpty')) {
    //     $('#description').val('');
    // }
    $.ajax({
        url: route('header.sliders.store'),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addHeaderSlidersModal').modal('hide');
                $('#addHeaderSliderForm')[0].reset();
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addHeaderSliderForm', '#headerSliderSaveBtn');
        },
    });
});

listenSubmit('#editHeaderSliderForm', function (event) {
    event.preventDefault();
    processingBtn('#editHeaderSliderForm', '#headerSliderEditBtn',
        'loading');
    const headerSliderUpdateId = $('#headerSliderId').val();
    $.ajax({
        url: route('header.sliders.update', headerSliderUpdateId),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editHeaderSlidersModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editHeaderSliderForm', '#headerSliderEditBtn');
        },
    });
});

listenClick('.header-delete-delete-btn', function (event) {
    let deleteHeaderSliderId = $(event.currentTarget).attr('data-id');
    deleteItem(route('header.sliders.destroy', deleteHeaderSliderId),Lang.get('js.header_slider'));
});

function changeIsActiveHeaderSliderRenderData(isActiveHeaderSliderId) {
    $.ajax({
        url: route('header-slider-change-is-active',
            isActiveHeaderSliderId),
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

listenChange('.isHeaderActive', function (event) {
    let isActiveHeaderSliderId = $(this).attr('data-id');
    changeIsActiveHeaderSliderRenderData(isActiveHeaderSliderId);
});

listenChange('.searchIsActiveHeaderSlider', function () {
    $.ajax({
        url: route('header.sliders.change-search-disable'),
        method: 'post',
        data: $('#searchIsActiveHeaderSlider').serialize(),
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
listenChange("#headerSlider", function() {
         Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
     });
listenClick("#headerSlider-ResetFilter", function() {
         $("#headerSlider").val(2).change();
         hideDropdownManually($('#headerSliderBtn'), $('.dropdown-menu'));
});
function hideDropdownManually(button, menu) {
    button.dropdown('toggle');
}
