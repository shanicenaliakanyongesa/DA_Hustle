document.addEventListener('turbo:load', loadSettingsData);

function loadSettingsData () {

    let enableEditText = $('#enableEditText').val();
    let disableEditText = $('#disableEditText').val();
    let enableCookie = $('#enableCookie').val();
    let disableCookie = $('#disableCookie').val();
    listenChange('#logo', function () {
        if (isValidFile($(this), '#validationErrorsBox')) {
            displayPhoto(this, '#logoPreview');
        }
        $('#validationErrorsBox').delay(5000).slideUp(300);
    });

    listenChange('#footerLogo', function () {
        if (isValidFile($(this), '#validationErrorsBox')) {
            displayPhoto(this, '#footerLogoPreview');
        }
        $('#validationErrorsBox').delay(5000).slideUp(300);
    });

    function displayFavicon (input, selector) {
        let displayPreview = true;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    if ((image.height != 16 || image.width != 16) &&
                        (image.height != 32 || image.width != 32)) {
                        $('#favicon').val('');
                        $('#validationErrorsBox').removeClass('d-none');
                        $('#validationErrorsBox').
                            html(
                                'The image must be of pixel 16 x 16 and 32 x 32.').
                            show();
                        return false;
                    }
                    $(selector).attr('src', e.target.result);
                    displayPreview = true;
                };
            };
            if (displayPreview) {
                reader.readAsDataURL(input.files[0]);
                $(selector).show();
            }
        }
    };

    function isValidFavicon (inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'ico']) == -1) {
            $(inputSelector).val('');
            $(validationMessageSelector).removeClass('d-none');
            $(validationMessageSelector).
                html('The image must be a file of type: gif, ico, png.').
                show();
            return false;
        }
        $(validationMessageSelector).hide();
        return true;
    };

    listenChange('#favicon', function () {
        $('#validationErrorsBox').addClass('d-none');
        if (isValidFavicon($(this), '#validationErrorsBox')) {
            displayFavicon(this, '#faviconPreview');
        }
        $('#validationErrorsBox').delay(5000).slideUp(300);
    });

    $('#facebookUrl').keyup(function () {
        this.value = this.value.toLowerCase();
    });
    $('#twitterUrl').keyup(function () {
        this.value = this.value.toLowerCase();
    });
    $('#googleUrl').keyup(function () {
        this.value = this.value.toLowerCase();
    });
    $('#linkedInUrl').keyup(function () {
        this.value = this.value.toLowerCase();
    });
    $('#editFrontSettingForm').submit(function () {
        if ($('#error-msg').text() !== '') {
            $('#phoneNumber').focus();
            return false;
        }
    });

// $('#aboutUs').summernote({
//     minHeight: 200,
//     height: 200,
//     toolbar: [
//         ['style', ['bold', 'italic', 'underline', 'clear']],
//         ['font', ['strikethrough']],
//         ['para', ['paragraph']]],
// });

    listenClick('#btnSaveEnvData', function (event) {
        event.preventDefault();
        // const swalWithBootstrapButtons = Swal.mixin({
        //     customClass: {
        //         confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-0',
        //         cancelButton: 'swal2-cancel btn fw-bold btn-bg-light btn-color-primary mt-0',
        //     },
        //     buttonsStyling: false,
        // });
        swal({
            title: Lang.get('js.configuration_update') + ' !',
            text: Lang.get('js.update_application_configuration'),
            icon: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonColor: '#6777ef',
            cancelButtonColor: '#d33',
            cancelButtonText: Lang.get('js.no'),
            confirmButtonText: Lang.get('js.yes'),
        }).then(function (willDelete) {
            if(willDelete){
                $('#envUpdateForm')[0].submit();
            }
        });
        // swal({
        //         title: Lang.get('messages.setting.configuration_update') + ' !',
        //         text: Lang.get('messages.setting.update_application_configuration'),
        //         type: 'warning',
        //         showCancelButton: true,
        //         closeOnConfirm: false,
        //         showLoaderOnConfirm: true,
        //         confirmButtonColor: '#6777ef',
        //         cancelButtonColor: '#d33',
        //         cancelButtonText: Lang.get('messages.common.no'),
        //         confirmButtonText: Lang.get('messages.common.yes'),
        //     },
        //     function () {
        //         $('#envUpdateForm')[0].submit();
        //     });
    });

    listenChange('#enableEdit', function () {
        if ($(this).prop('checked')) {
            $('#envUpdateForm').find('input:text').attr('disabled', false);
            $('#enableCookie').attr('disabled', false);
            $('#btnSaveEnvData').attr('disabled', false);
            $('#envUpdateText').text(disableEditText);
        } else {
            $('#envUpdateForm').find('input:text').attr('disabled', true);
            $('#enableCookie').attr('disabled', true);
            $('#btnSaveEnvData').attr('disabled', true);
            $('#envUpdateText').text(enableEditText);
        }
    });

    listenChange('#enableCookie', function () {
        if ($(this).prop('checked'))
            $('#enableCookieText').text(disableCookie);
        else
            $('#enableCookieText').text(enableCookie);
    });
    if ($('#aboutUs').length) {
        window.aboutUsQuill = new Quill('#aboutUs', {
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
            placeholder: 'About US',
            theme: 'snow', // or 'bubble'
        });

        aboutUsQuill.on('text-change', function (delta, oldDelta, source) {
            if (aboutUsQuill.getText().trim().length === 0) {
                aboutUsQuill.setContents([{ insert: '' }]);
            }
        });
        let element = document.createElement('textarea');
        element.innerHTML = $('#aboutUsData').val();
        aboutUsQuill.root.innerHTML = element.value;
    }

    if ($('#defaultCountryData').length)
    {
        let input = document.querySelector('#defaultCountryData')
        let intl = window.intlTelInput(input, {
            initialCountry: defaultCountryCodeValue,
            separateDialCode: true,
            geoIpLookup: function (success, failure) {
                $.get('https://ipinfo.io', function () {
                }, 'jsonp').always(function (resp) {
                    var countryCode = (resp && resp.country)
                        ? resp.country
                        : ''
                    success(countryCode)
                })
            },
            utilsScript: '../../public/assets/js/inttel/js/utils.min.js',
        })
        let getCode = intl.selectedCountryData['name']+'+'+ intl.selectedCountryData['dialCode']
        $('#defaultCountryData').val(getCode)
    }
}

listenKeyup('#defaultCountryData', function () {
    let str2 = $(this).val().slice(0, -1) + ''
    return $(this).val(str2)
});

listenClick( '.iti__standard', function () {
    $('#defaultCountryData').val($(this).text())
    $(this).attr('data-country-code');
    $('#defaultCountryCode').val($(this).attr('data-country-code'));
});

listenSubmit('#editSocialSettingForm', function () {

    $('#editSocialSettingForm').find('input:text:visible:first').focus();

    let facebookUrl = $('#facebookUrl').val();
    let twitterUrl = $('#twitterUrl').val();
    let googlePlusUrl = $('#googlePlusUrl').val();
    let linkedInUrl = $('#linkedInUrl').val();

    let facebookExp = new RegExp(
        /^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)facebook.[a-z]{2,3}\/?.*/i);
    let twitterExp = new RegExp(
        /^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)twitter\.[a-z]{2,3}\/?.*/i);
    let googlePlusExp = new RegExp(
        /^(https?:\/\/)?(plus\.)?(google\.[a-z]{2,3})\/?(([a-zA-Z 0-9._])?).*/i);
    let linkedInExp = new RegExp(
        /^(https?:\/\/)?((w{2,3}\.)?)linkedin\.[a-z]{2,3}\/?.*/i);

    let facebookCheck = (facebookUrl == '' ? true : (facebookUrl.match(
        facebookExp) ? true : false));
    if (!facebookCheck) {
        displayErrorMessage('Please enter a valid Facebook URL');
        return false;
    }
    let twitterCheck = (twitterUrl == '' ? true : (twitterUrl.match(
        twitterExp)
        ? true
        : false));
    if (!twitterCheck) {
        displayErrorMessage('Please enter a valid Twitter URL');
        return false;
    }
    let googlePlusCheck = (googlePlusUrl == ''
        ? true
        : (googlePlusUrl.match(
            googlePlusExp) ? true : false));
    if (!googlePlusCheck) {
        displayErrorMessage('Please enter a valid Google Plus URL');
        return false;
    }
    let linkedInCheck = (linkedInUrl == '' ? true : (linkedInUrl.match(
        linkedInExp) ? true : false));
    if (!linkedInCheck) {
        displayErrorMessage('Please enter a valid Linkedin URL');
        return false;
    }
    return true;
});
listenSubmit('#aboutUsForm', function () {
    let element = document.createElement('textarea');
    let editor_content_1 = aboutUsQuill.root.innerHTML;
    element.innerHTML = editor_content_1;

    if (aboutUsQuill.getText().trim().length === 0) {
        displayErrorMessage('The about us field is required.');
        return false;
    }

    $('#aboutUsData').val(editor_content_1.replace(/"/g, ''));


    // if (!checkSummerNoteEmpty('#aboutUs', 'About Us field is required.')) {
    //     return false;
    // }
    return true;
});

listenSubmit('#editGeneralSettingForm', function () {

    $('#companyUrl').focus();

    let companyUrl = $('#companyUrl').val();

    let companyUrlExp = new RegExp(
        /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/);

    let companyUrlCheck = (companyUrl == '' ? true : (companyUrl.match(
        companyUrlExp) ? true : false));
    if (!companyUrlCheck) {
        displayErrorMessage('Please enter a valid Company URL');
        return false;
    }
    if($('#defaultCountryCode').val() != defaultCountryCodeValue)
    {
        $("#editGeneralSettingForm")[0].submit()
    }
    return true;
});
