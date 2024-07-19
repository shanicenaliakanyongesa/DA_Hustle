document.addEventListener('turbo:load', loadwebCustomData);

function loadwebCustomData () {
    $('.alert').delay(5000).slideUp(300);
    $('#gRecaptchaContainerCompanyRegistration').empty()
    setTimeout(function () {
        loadCaptchaForCompanyRegistration()
    },500)
}

window.manageFrontAjaxErrors = function (data) {
    var errorDivId = arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : 'editValidationErrorsBox';
    if (data.status == 404) {
        iziToast.error({
            title: 'Error!',
            message: data.responseJSON.message,
            position: 'topRight',
        });
    } else {
        printErrorMessage('#' + errorDivId, data);
    }
};

window.deleteFrontItem = function (url, tableId, header, callFunction = null) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-0',
            cancelButton: 'swal2-cancel btn fw-bold btn-bg-light btn-color-primary mt-0'
        },
        buttonsStyling: false
    })


    swalWithBootstrapButtons.fire({
        title: Lang.get('js.delete') + ' !',
        text: Lang.get('js.are_you_sure_want_to_delete') + '"' + header + '" ?',
        icon: 'warning',
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#6777ef',
        cancelButtonColor: '#d33',
        cancelButtonText: Lang.get('js.no'),
        confirmButtonText: Lang.get('js.yes'),
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFrontItemAjax(url, tableId, header, callFunction = null);
        }
    });
};


function deleteFrontItemAjax(url, tableId, header, callFunction = null) {
    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
         Livewire.dispatch('refreshDatatable')
         Livewire.dispatch('resetPage')
            swal({
                title: Lang.get('js.deleted') + ' !',
                text: header + Lang.get('js.has_been_deleted'),
                type: 'success',
                confirmButtonColor: '#009ef7',
                timer: 2000,
            });
            if (callFunction) {
                eval(callFunction);
            }
        },
        error: function (data) {
            swal({
                title: '',
                text: data.responseJSON.message,
                type: 'error',
                confirmButtonColor: '#009ef7',
                timer: 5000,
            });
        },
    });
}

window.loadCaptchaForCompanyRegistration = function () {
    let captchaContainer = document.getElementById('gRecaptchaContainerCompanyRegistration');

    if (!captchaContainer) {
        return false;
    }

    captchaContainer.innerHTML = ''
    let recaptcha = document.createElement('div')

    // setTimeout(function () {
        grecaptcha.render(recaptcha, {
            'sitekey': siteKey,
            'callback': function (response) {
                $("#companyRegistrationBtn").attr("disabled", false);
            }
        })
        captchaContainer.appendChild(recaptcha)
    // }, 500)
}
