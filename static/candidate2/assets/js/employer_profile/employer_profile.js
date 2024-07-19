document.addEventListener('turbo:load', loadEmployerProfileData);

let defaultImageUrl = $('#defaultImageUrl').val();

function loadEmployerProfileData() {
    if (!$('#indexEmployerProfileData').length) {
        return;
    }
    $('#employerLanguage').select2({
        width: '100%',
        dropdownParent: $('#changeEmployerLanguageModal'),
    });
    $('#editEmail').keypress(function (e) {
        return false;
    });


    // open edit user profile model
    listenClick('.editProfileModal', function (event) {
        renderProfileData();
    });

    function renderProfileData () {
        $.ajax({
            url: route('employer-edit-profile'),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let user = result.data.employer;
                    let company = result.data.company;
                    $('#editUserId').val(user.id);
                    $('#companyId').val(company.id);
                    $('#firstName').val(user.first_name);
                    $('#editEmail').val(user.email);
                    $('#editphoneNumber').val(user.phone);
                    if (isEmpty(company.company_url)) {
                        $('#profilePicturePreview').css('background-image',
                            'url("' + defaultImageUrl + '")');
                    } else {
                        $('#profilePicturePreview').css('background-image',
                            'url("' + company.company_url + '")');
                    }
                    $('#editEmployerProfileModal').appendTo('body').modal('show');
                }
            },
        });
    };

    listenHiddenBsModal('#editEmployerProfileModal', function () {
        resetModalForm('#editEmployerProfileForm', '#validationErrorsBox');
        $('#btnPrEditSave').prop('disabled', false);
    });
    listenHiddenBsModal('#changeEmployerLanguageModal', function () {
        resetModalForm('#changeEmployerLanguageForm',
            '#editProfileValidationErrorsBox');
        $('#employerLanguage').trigger('change.select2');
    });

    listenChange('#employerImage', function () {
        if (isValidFile($(this), '#validationErrorsBox')) {
            validatePhoto(this, '#previewImage');
        }
    });

    function validatePhoto (input, selector) {
        let displayPreview = true;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    if ((image.height / image.width) !== 1) {
                        $('#validationErrorsBox').
                            removeClass('d-none');
                        $('#validationErrorsBox').
                            html(
                                Lang.get('js.image_aspect_ratio')).
                            show();
                        $('#btnPrEditSave').prop('disabled', true);
                        return false;
                    }
                    $(selector).attr('src', e.target.result);
                    $('#btnPrEditSave').prop('disabled', false);
                    displayPreview = true;
                };
            };
            if (displayPreview) {
                reader.readAsDataURL(input.files[0]);
                $(selector).show();
            }
        }
    };

    listenHiddenBsModal('#changeEmployerPasswordModal', function () {
        resetModalForm('#changeEmployerPasswordForm',
            '#editPasswordValidationErrorsBox');
    });

    listenShowBsModal('#changeEmployerPasswordModal', function () {
        $(this).find('[autofocus]').focus();
    });

    listenClick('.changePasswordModal', function () {
        $('#changeEmployerPasswordModal').appendTo('body').modal('show');
    });

    listenClick('.changeLanguageModal', function () {
        $('#changeEmployerLanguageModal').appendTo('body').modal('show');
    });
}

listenSubmit('#editEmployerProfileForm', function (event) {
    event.preventDefault();
    let loadingButton = jQuery(this).find('#btnPrEditSave');
    loadingButton.button('loading');
    $.ajax({
        url: route('employer-profile-update'),
        type: 'post',
        data: new FormData($(this)[0]),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#editEmployerProfileModal').modal('hide');
            location.reload();
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            loadingButton.button('reset');
        },
    });
});

listenSubmit('#changeEmployerPasswordForm', function (event) {
    event.preventDefault();
    let isValidate = validateEmployerPassword();
    if (!isValidate) {
        return false;
    }
    let loadingButton = jQuery(this).find('#btnPrPasswordEditSave');
    loadingButton.button('loading');
    $.ajax({
        url: route('employer-change-password'),
        type: 'post',
        data: new FormData($(this)[0]),
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                $('#changeEmployerPasswordModal').modal('hide');
                displaySuccessMessage(result.message);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            loadingButton.button('reset');
        },
    });
});

function validateEmployerPassword() {
    let currentPassword = $('#pfCurrentPassword').val().trim();
    let password = $('#pfNewPassword').val().trim();
    let confirmPassword = $('#pfNewConfirmPassword').val().trim();

    if (currentPassword == '' || password == '' || confirmPassword == '') {
        $('#editPasswordValidationErrorsBox').show().html(Lang.get('js.required_field_messages'));
        return false;
    }
    return true;
}

listenSubmit('#changeEmployerLanguageForm', function (event) {
    event.preventDefault();
    let loadingButton = jQuery(this).find('#btnLanguageChange');
    loadingButton.button('loading');
    $.ajax({
        url: route('update-language'),
        type: 'post',
        data: new FormData($(this)[0]),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#changeEmployerPasswordModal').modal('hide');
            displaySuccessMessage(result.message);
            setTimeout(function () {
                location.reload();
            }, 1500);
        },
        error: function (result) {
            manageAjaxErrors(result, 'editProfileValidationErrorsBox');
        },
        complete: function () {
            loadingButton.button('reset');
        },
    });
});
