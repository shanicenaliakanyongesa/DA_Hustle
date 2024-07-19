document.addEventListener('turbo:load', loadCandidateProfileData);

function loadCandidateProfileData () {
    if ($('#updateLanguageData').length) {
        return;
    }
    $('#language').select2({
        width: '100%',
        dropdownParent: $('#changeLanguageModal'),
    });
    $('#editEmail').keypress(function (e) {
        return false;
    });
}

// open edit user profile model
listenClick('.editCandidateProfileModal', function (event) {
    renderCandidateProfileData();
});

function renderCandidateProfileData () {
    $.ajax({
        url: route('candidate.edit.profile'),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                let user = result.data;
                let candidate = result.data.candidate;
                $('#editUserId').val(user.id);
                $('#firstName').val(user.first_name);
                $('#lastName').val(user.last_name);
                $('#editEmail').val(user.email);
                $('#editphoneNumber').val(user.phone);
                if (isEmpty(candidate.candidate_url)) {
                    $('#profilePicturePreview').css('background-image',
                        'url("' + defaultImageUrl + '")');
                } else {
                    $('#profilePicturePreview').css('background-image',
                        'url("' + candidate.candidate_url + '")');
                }
                $('#editProfileModal').appendTo('body').modal('show');
            }
        },
    });
};

listenChange('#editprofile', function () {
    if (isValidFile($(this), '#validationErrorsBoxCandidate')) {
        validatePhoto(this, '#editpreviewImage');
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
                    $('#validationErrorsBoxCandidate').
                        removeClass('d-none');
                    $('#validationErrorsBoxCandidate').
                        html(
                            Lang.get('js.image_aspect_ratio')).
                        show();
                    $('#btnPrEditSave').prop('disabled', true);
                    return false;
                }
                $('#validationErrorsBoxCandidate').
                    addClass('d-none');
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

listenShowBsModal('#changePasswordModal', function () {
    $(this).find('[autofocus]').focus();
});

listenHiddenBsModal('#editProfileModal', function () {
    resetModalForm('#editCandidateProfileForm', '#validationErrorsBoxCandidate');
    $('#btnPrEditSave').prop('disabled', false);
});

listenHiddenBsModal('#changePasswordModal', function () {
    resetModalForm('#changeCandidatePasswordForm',
        '#editPasswordValidationErrorsBox');
});

listenClick('.changePasswordModal', function () {
    $('#changePasswordModal').appendTo('body').modal('show');
});

listenClick('.changeLanguageModal', function () {
    $('#changeLanguageModal').appendTo('body').modal('show');
});
listenHiddenBsModal('#changeLanguageModal', function () {
    resetModalForm('#changeCandidateLanguageForm',
        '#editProfileValidationErrorsBox');
    $('#language').trigger('change.select2');
});

function validateCandidatePassword() {
    let currentPassword = $('#pfCurrentPassword').val().trim();
    let password = $('#pfNewPassword').val().trim();
    let confirmPassword = $('#pfNewConfirmPassword').val().trim();

    if (currentPassword == '' || password == '' || confirmPassword == '') {
        $('#editPasswordValidationErrorsBox').show().html(Lang.get('js.required_field_messages'));
        return false;
    }
    return true;
}

listenSubmit('#editCandidateProfileForm', function (event) {
    event.preventDefault();
    let loadingButton = jQuery(this).find('#btnPrEditSave');
    loadingButton.button('loading');
    $.ajax({
        url: route('candidate.update.profile'),
        type: 'post',
        data: new FormData($(this)[0]),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#editProfileModal').modal('hide');
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

listenSubmit('#changeCandidatePasswordForm', function (event) {
    event.preventDefault();
    let isValidate = validateCandidatePassword();
    if (!isValidate) {
        return false;
    }
    let loadingButton = jQuery(this).find('#btnPrPasswordEditSave');
    loadingButton.button('loading');
    $.ajax({
        url: route('candidate.change-password'),
        type: 'post',
        data: new FormData($(this)[0]),
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                $('#changePasswordModal').modal('hide');
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

listenSubmit('#changeCandidateLanguageForm', function (event) {
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
            $('#changePasswordModal').modal('hide');
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
