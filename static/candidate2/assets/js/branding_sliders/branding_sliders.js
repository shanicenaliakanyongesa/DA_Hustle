document.addEventListener('turbo:load', loadBrandingSliderData);

function loadBrandingSliderData () {

    // window.livewire.restart();

    if (!$('#addBrandingSliderNewForm').length && !$('#editBrandingSlidersForm').length){
        return
    }

    $('#branding_filter_status').select2()

    let defaultDocumentImageUrl = $('#defaultDocumentImageUrl').val()
    let view = $('#view').val()
    let brandingExtensionMessage = $('#brandingExtensionMessage').val()

    listenClick('.branding-slider-edit-btn', function (event) {
        let editBrandingSliderId = $(event.currentTarget).attr('data-id')
        brandingSliderRenderData(editBrandingSliderId)
    });

    function brandingSliderRenderData (editBrandingSliderId) {
        $.ajax({
            url: route('branding.sliders.edit', editBrandingSliderId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea')
                    element.innerHTML = result.data.title
                    $('#brandingSliderId').val(result.data.id)
                    if (isEmpty(result.data.branding_slider_url)) {
                        $('#editPreviewImage').
                            attr('src', defaultDocumentImageUrl)
                    } else {
                        $('#editPreviewImage').css('background-image',
                            'url("' + result.data.branding_slider_url + '")')
                        $('#brandingSliderUrl').
                            attr('href', result.data.branding_slider_url)
                        $('#brandingSliderUrl').text(view)
                    }
                    $('#editTitle').val(element.value);
                    (result.data.is_active == 1) ? $('#editIsActive').
                        prop('checked', true) : $('#editIsActive').
                        prop('checked', false)
                    $('#editBrandingsSlidersModal').
                        appendTo('body').
                        modal('show')
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message)
            },
        })
    }

// $(document).on('click', '.delete-btn', function (event) {
//     let brandingSliderId = $(event.currentTarget).attr('data-id');
//     swal({
//             title: Lang.get('messages.common.delete') + ' !',
//             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.branding_slider.brand') + '" ?',
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
//             Livewire.dispatch('deleteBrandingSlider', brandingSliderId);
//         });
// });
//
// document.addEventListener('delete', function () {
//     swal({
//         title: Lang.get('messages.common.deleted') + ' !',
//         text: Lang.get('messages.branding_slider.brand') + Lang.get('messages.common.has_been_deleted'),
//         type: 'success',
//         confirmButtonColor: '#6777ef',
//         timer: 2000,
//     });
// });

    listenHiddenBsModal('#addBrandingsSlidersModal', function () {
        resetModalForm('#addBrandingSliderNewForm', '#validationErrorsBox')
        // $('#previewImage').attr('src', defaultDocumentImageUrl);
        $('#previewImage').
            css('background-image', 'url("' + defaultDocumentImageUrl + '")')

    })

    listenHiddenBsModal('#editBrandingsSlidersModal', function () {
        resetModalForm('#editBrandingSlidersForm', '#editValidationErrorsBox')
        $('#editPreviewImage').
            css('background-image', 'url("' + defaultDocumentImageUrl + '")')
        // $('#editPreviewImage').attr('src', defaultDocumentImageUrl);
    })

    window.displayBrandingSliderImage = function (input, selector) {
        let displayPreview = true
        if (input.files && input.files[0]) {
            let reader = new FileReader()
            reader.onload = function (e) {
                let image = new Image()
                image.src = e.target.result
                image.onload = function () {
                    $(selector).attr('src', e.target.result)
                    displayPreview = true
                }
            }
            if (displayPreview) {
                reader.readAsDataURL(input.files[0])
                $(selector).show()
            }
        }
    }

    window.isValidBrandingSliderImage = function (inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase()
        if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
            $(inputSelector).val('')
            $(validationMessageSelector).removeClass('d-none')
            $(validationMessageSelector).
                html(brandingExtensionMessage).
                show()
            $(validationMessageSelector).delay(5000).slideUp(300)
            return false
        }
        $(validationMessageSelector).hide()
        return true
    }

    listenChange('#brandingSlider', function () {
        $('#addBrandingsSlidersModal #validationErrorsBox').addClass('d-none')
        if (isValidBrandingSliderImage($(this),
            '#addBrandingsSlidersModal #validationErrorsBox')) {
            displayBrandingSliderImage(this, '#previewImage',
                '#addBrandingsSlidersModal #validationErrorsBox')
        }
    })

    listenChange('#editBrandingSlider', function () {
        $('#editBrandingsSlidersModal #editValidationErrorsBox').
            addClass('d-none')
        if (isValidFile($(this),
            '#editBrandingsSlidersModal #editValidationErrorsBox')) {
            displayBrandingSliderImage(this, '#editPreviewImage',
                '#editBrandingsSlidersModal #editValidationErrorsBox')
        }
    })

    listenClick('#resetFilter', function () {
        $('#branding_filter_status').val('').trigger('change')
    })


    listenClick('.branding-slider-delete-btn', function (event) {
        let deleteBrandingSliderId = $(event.currentTarget).attr('data-id')
        deleteItem(route('branding.sliders.destroy', deleteBrandingSliderId),
            Lang.get('js.brand'))
    })
}
listenSubmit('#addBrandingSliderNewForm', function (e) {
    e.preventDefault()
    processingBtn('#addBrandingSliderNewForm', '#brandingSliderSaveBtn', 'loading')
    $.ajax({
        url: route('branding.sliders.store'),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message)
                $('#addBrandingsSlidersModal').modal('hide')
                // $('.livewire-table').load(location.href + ' .livewire-table')
                Livewire.dispatch('refreshDatatable')
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            processingBtn('#addBrandingSliderNewForm',
                '#brandingSliderSaveBtn');
        },
        complete: function () {
            processingBtn('#addBrandingSliderNewForm', '#brandingSliderSaveBtn')
        },
    })
})

listenSubmit('#editBrandingSlidersForm', function (event) {
    event.preventDefault()
    processingBtn('#editBrandingSlidersForm', '#editBrandingSliderSaveBtn',
        'loading')
    const brandingSliderUpdateId = $('#brandingSliderId').val()
    $.ajax({
        url: route('branding.sliders.update', brandingSliderUpdateId),
        type: 'POST',
        data: new FormData($(this)[0]),
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                // window.livewire.restart();
                displaySuccessMessage(result.message)
                $('#editBrandingsSlidersModal').modal('hide')
                // $('.livewire-table').load(location.href + ' .livewire-table')
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            processingBtn('#editBrandingSlidersForm',
                '#editBrandingSliderSaveBtn');
        },
        complete: function () {
            processingBtn('#editBrandingSlidersForm',
                '#editBrandingSliderSaveBtn')
        },
    })
})

listenClick('.addBrandingSliderModal', function () {
    $('#addBrandingsSlidersModal').appendTo('body').modal('show')
})

// $(document).ready(function () {
//     $('#branding_filter_status').on('change', function (e) {
//         let data = $('#branding_filter_status').select2('val');
//         Livewire.dispatch('changeFilter', 'status', data);
//     });
// });

listenChange('.isActiveBrandingSlider', function (event) {
    let isActiveBrandingSliderId = $(this).attr('data-id');
    changeIsActiveBrandingSliderRenderData(isActiveBrandingSliderId)
})

function changeIsActiveBrandingSliderRenderData(isActiveBrandingSliderId) {
    $.ajax({
        url: route('branding-slider-change-is-active', isActiveBrandingSliderId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message)
                Livewire.dispatch('refreshDatatable')
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message)
        },
    })
}
listenChange("#brandingSlider", function() {
         Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
     });
listenClick("#brandingSlider-ResetFilter", function() {
         $("#brandingSlider").val(2).change();
         hideDropdownManually($('#brandingSliderBtn'), $('.dropdown-menu'));
});
function hideDropdownManually(button, menu) {
    button.dropdown('toggle');
}
