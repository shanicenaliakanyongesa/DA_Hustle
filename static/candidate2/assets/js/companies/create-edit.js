document.addEventListener('turbo:load', loadCreateEditCompanyData);
function loadCreateEditCompanyData() {
    let countryId = $('#countryId').val();
    let stateId = $('#stateId').val();
    let cityId = $('#cityId').val();

    let companyStateUrl = $('#companyStateUrl').val();
    let companyCityUrl = $('#companyCityUrl').val();
    let employerPanel = $('.employerPanel').val();
    let isEdit = $('.isEdit').val();
    if (!$('#editCompanyForm').length && !$('#addCompanyForm').length) {
        return;
    }

    $('#industryId,#addEmployerIndustryId, #ownershipTypeId,#companySizeId').
        select2({
            width: (!employerPanel) ? 'calc(100% - 44px)' : '100%',
        });

    $('#countryId').select2({
        width: (!employerPanel) ? 'calc(100% - 44px)' : '100%',
    });
    $('#stateId').select2({
        width: (!employerPanel) ? 'calc(100% - 44px)' : '100%',
    });
    $('#cityId').select2({
        width: (!employerPanel) ? 'calc(100% - 44px)' : '100%',
    });
    $('#establishedIn').select2({
        width: '100%',
    });
    $('#stateID').select2({
        'width': '100%',
        dropdownParent: $('#createEmployerCityModal'),
    });
    $('#countryID').select2({
        width: '100%',
        dropdownParent: $('#createEmployerStateModal'),
    });


    if ($('#editEmployeeDetails').length) {
        window.editEmployeeDetail = new Quill('#editEmployeeDetails', {
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

        editEmployeeDetail.root.innerHTML = $('#editEmployerDetail').val();
    }


    if (isEdit) {
        if ($('#editAdminEmployerDescriptionQuillData').length) {
            window.editAdminEmployerDescriptionQuill = new Quill(
                '#editAdminEmployerDescriptionQuillData', {
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
                    placeholder: Lang.get('js.enter_employer_details'),
                    theme: 'snow',
                });
            editAdminEmployerDescriptionQuill.root.innerHTML = $(
                '#editAdminEmployerDetail').val();
        }
    }


    if ($('#addAdminEmployerDescriptionQuillData').length) {
        window.addAdminEmployerDescriptionQuill = new Quill(
            '#addAdminEmployerDescriptionQuillData', {
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
                theme: 'snow',
                placeholder: Lang.get('js.enter_employer_details'),
            });
    }


    if ($('#addIndustryDescriptionQuillData').length) {
        window.industry = new Quill('#addIndustryDescriptionQuillData', {
            placeholder: Lang.get('js.enter_industry_details'),
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
            theme: 'snow',
        });
    }


    if($('#ownershipDescription').length){
        window.ownership = new Quill('#ownershipDescription', {
            placeholder: Lang.get('js.enter_ownership_details'),
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
            theme: 'snow',
        });
    }

    $('#countryId').on('change', function () {
        $.ajax({
            url: route('states-list'),
            type: 'get',
            dataType: 'json',
            data: { postal: $(this).val() },
            success: function (data) {
                $('#cityId').empty();
                $('#cityId').append(
                    $('<option value=""></option>').text(Lang.get('js.select_city')));
                $('#stateId').empty();
                $('#stateId').append(
                    $('<option value=""></option>').text(Lang.get('js.select_state')));
                $.each(data.data, function (i, v) {
                    $('#stateId').append($('<option></option>').attr('value', i).text(v));
                });
            },
        });
    });

    $('#stateId').on('change', function () {
        $.ajax({
            url: route('cities-list'),
            type: 'get',
            dataType: 'json',
            data: {
                state: $(this).val(),
                country: $('#countryId').val(),
            },
            success: function (data) {
                $('#cityId').empty();
                $('#cityId').append(
                    $('<option value=""></option>').text(Lang.get('js.select_city')));
                $.each(data.data, function (i, v) {
                    $('#cityId').append(
                        $('<option ></option>').attr('value', i).text(v));
                });
            },
        });
    });

    listenChange('#logo', function () {
        let validFile = isValidFile($(this), '#validationErrorsBox');
        if (validFile) {
            displayPhoto(this, '#logoPreview');
            $('#btnSave').prop('disabled', false);
        } else {
            $('#btnSave').prop('disabled', true);
        }
    });

    $('#addCompanyForm,#editCompanyForm').submit(function () {
        if ($('#error-msg').text() !== '') {
            $('#phoneNumber').focus();
            return false;
        }
    });

   listenSubmit('#addCompanyForm,#editCompanyForm', function (e) {
       if (!$('#editEmployeeDetails').length) {

           if (isEdit) {
               let admin_employer_editor_content = editAdminEmployerDescriptionQuill.root.innerHTML;
               if (editAdminEmployerDescriptionQuill.getText().trim().length ===
                   0) {
                   displayErrorMessage(Lang.get('js.employer_details_field'));
                   e.preventDefault();
                   $('#btnSave').attr('disabled', false);
                   return false;
               }
               let inputDetail = JSON.stringify(admin_employer_editor_content);
               $('#editAdminEmployerDetail').val(inputDetail.replace(/"/g, ''));
           } else {
               let editor_content = addAdminEmployerDescriptionQuill.root.innerHTML;
               console.log(editor_content);
               if (addAdminEmployerDescriptionQuill.getText().trim().length ===
                   0) {
                   displayErrorMessage(Lang.get('js.employer_details_field'));
                   e.preventDefault();
                   $('#btnSave').attr('disabled', false);
                   return false;
               }
               let input = JSON.stringify(editor_content);
               $('#company_desc').val(input.replace(/"/g, ''));
           }
       } else {
           let employer_content = editEmployeeDetail.root.innerHTML;

           if (editEmployeeDetail.getText().trim().length ===
               0) {
               displayErrorMessage(Lang.get('js.employer_details_field'));
               e.preventDefault();
               $('#btnSave').attr('disabled', false);
               return false;
           }
           let input = JSON.stringify(employer_content);
           $('#editEmployerDetail').val(input.replace(/"/g, ''));
       }

        $('#addCompanyForm,#editCompanyForm').
            find('input:text:visible:first').
            focus();

        let facebookUrl = $('#facebookUrl').val();
        let twitterUrl = $('#twitterUrl').val();
        let linkedInUrl = $('#linkedInUrl').val();
        let googlePlusUrl = $('#googlePlusUrl').val();
        let pinterestUrl = $('#pinterestUrl').val();

        let facebookExp = new RegExp(
            /^(https?:\/\/)?((m{1}\.)?)?((w{3}\.)?)facebook.[a-z]{2,3}\/?.*/i);
        let twitterExp = new RegExp(
            /^(https?:\/\/)?((m{1}\.)?)?((w{3}\.)?)twitter\.[a-z]{2,3}\/?.*/i);
        let googlePlusExp = new RegExp(
            /^(https?:\/\/)?((w{3}\.)?)?(plus\.)?(google\.[a-z]{2,3})\/?(([a-zA-Z 0-9._])?).*/i);
        let linkedInExp = new RegExp(
            /^(https?:\/\/)?((w{3}\.)?)linkedin\.[a-z]{2,3}\/?.*/i);
        let pinterestExp = new RegExp(
            /^(https?:\/\/)?((w{3}\.)?)pinterest\.[a-z]{2,3}\/?.*/i);

        urlValidation(facebookUrl, facebookExp);
        urlValidation(twitterUrl, twitterExp);
        urlValidation(linkedInUrl, linkedInExp);
        urlValidation(googlePlusUrl, googlePlusExp);
        urlValidation(pinterestUrl, pinterestExp);

        if (!urlValidation(facebookUrl, facebookExp)) {
            displayErrorMessage(Lang.get('js.valid_facebook_url'));
            $('#btnSave').prop('disabled', false);
            return false;
        }
        if (!urlValidation(twitterUrl, twitterExp)) {
            displayErrorMessage(Lang.get('js.valid_twitter_url'));
            $('#btnSave').prop('disabled', false);
            return false;
        }
        if (!urlValidation(googlePlusUrl, googlePlusExp)) {
            displayErrorMessage(Lang.get('js.valid_google_plus_url'));
            $('#btnSave').prop('disabled', false);
            return false;
        }
        if (!urlValidation(linkedInUrl, linkedInExp)) {
            displayErrorMessage(Lang.get('js.valid_linkedin_url'));
            $('#btnSave').prop('disabled', false);
            return false;
        }
        if (!urlValidation(pinterestUrl, pinterestExp)) {
            displayErrorMessage(Lang.get('js.valid_pinterest_url'));
            $('#btnSave').prop('disabled', false);
            return false;
        }
       return true;
   });


// industry
    listenClick('.createEmployerIndustryModal', function () {
        $('#createEmployerIndustriesModal').appendTo('body').modal('show');
    });

    listenHiddenBsModal('#createEmployerIndustriesModal', function () {
        resetModalForm('#createEmployerNewIndustryForm', '#validationErrorsBox');
        industry.setContents([{insert: ''}]);
    });

//ownership type
    listenClick('.createEmployerOwnerShipTypeModal', function () {
        $('#createEmployerOwnershipModal').appendTo('body').modal('show');
    });

//country
    listenClick('.createEmployerCountryModal', function () {
        $('#createEmployerCountryModal').appendTo('body').modal('show');
    });
    listenHiddenBsModal('#createEmployerCountryModal', function () {
        resetModalForm('#createEmployerCountryForm', '#countryValidationErrorsBox');
    });
// state
    listenClick('.createEmployerStateModal', function () {
        let country = $('#countryId').val();
        $('#countryID').val(country).trigger('change');
        $('#createEmployerStateModal').appendTo('body').modal('show');
    });
    listenHiddenBsModal('#createEmployerStateModal', function () {
        $('#countryID').val('').trigger('change');
        resetModalForm('#createEmployerStateForm', '#StateValidationErrorsBox');
    });

//city
    listenClick('.createEmployerCityModal', function () {
        let state = $('#stateId').val();
        $('#stateID').val(state).trigger('change');
        $('#createEmployerCityModal').appendTo('body').modal('show');
    });

    listenHiddenBsModal('#createEmployerCityModal', function () {
        $('#stateID').val('').trigger('change');
        resetModalForm('#createEmployerCityForm', '#cityValidationErrorsBox');
    });

//company size
    listenClick('.createEmployerCompanySizeModal', function () {
        $('#createEmployerCompanySizeModal').appendTo('body').modal('show');
    });

    listenShowBsModal('#createEmployerCompanySizeModal', function () {
        $('#size').focus();
    });

    listenHiddenBsModal('#createEmployerCompanySizeModal', function () {
        resetModalForm('#createEmployerCompanySizeForm', '#companySizeValidationErrorsBox');
    });
}

listenSubmit('#createEmployerNewIndustryForm', function (e) {
    e.preventDefault();
    let add_admin_employer_editor_content = industry.root.innerHTML;

    if (industry.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(add_admin_employer_editor_content);
    $('#industry_desc').val(input.replace(/"/g, ""));
    processingBtn('#createEmployerNewIndustryForm', '#industriesSaveBtn', 'loading');
    $.ajax({
        url: route('industry.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createEmployerIndustriesModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let appendIndustryNewOption = new Option(data.text, data.id, false, true);
                $('#addEmployerIndustryId').append(appendIndustryNewOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createEmployerNewIndustryForm', '#industriesSaveBtn');
        },
    });
});

listenSubmit('#createEmployerOwnershipForm', function (e) {
    e.preventDefault();
    let editor_content = ownership.root.innerHTML;

    if (ownership.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $('#ownership_desc').val(input.replace(/"/g, ""));
    processingBtn('#createEmployerOwnershipForm', '#ownershipBtnSave', 'loading');
    $.ajax({
        url: route('ownerShipType.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createEmployerOwnershipModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#ownershipTypeId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createEmployerOwnershipForm', '#ownershipBtnSave');
        },
    });
});

listenSubmit('#createEmployerCountryForm', function (e) {
    e.preventDefault();
    processingBtn('#createEmployerCountryForm', '#countryBtnSave', 'loading');
    $.ajax({
        url: route('countries.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createEmployerCountryModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#countryId').append(newOption).trigger('change');
                let newCountry = new Option(data.text, data.id, false, false);
                $('#countryID').append(newCountry).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createEmployerCountryForm', '#countryBtnSave');
        },
    });
});

listenSubmit('#createEmployerStateForm', function (e) {
    e.preventDefault();
    processingBtn('#createEmployerStateForm', '#stateBtnSave', 'loading');
    $.ajax({
        url: route('states.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createEmployerStateModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#stateId').append(newOption).trigger('change');
                let newState = new Option(data.text, data.id, false, false);
                $('#stateID').append(newState).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createEmployerStateForm', '#stateBtnSave');
        },
    });
});

listenSubmit('#createEmployerCityForm', function (e) {
    e.preventDefault();
    processingBtn('#createEmployerCityForm', '#cityBtnSave', 'loading');
    $.ajax({
        url: route('cities.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createEmployerCityModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#cityId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createEmployerCityForm', '#cityBtnSave');
        },
    });
});

listenSubmit('#createEmployerCompanySizeForm', function (e) {
    e.preventDefault();
    processingBtn('#createEmployerCompanySizeForm', '#companySizeBtnSave', 'loading');
    $.ajax({
        url: route('companySize.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createEmployerCompanySizeModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.size,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#companySizeId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createEmployerCompanySizeForm', '#companySizeBtnSave');
        },
    });
});

    listenHiddenBsModal('#createEmployerOwnershipModal', function () {
        resetModalForm('#createEmployerOwnershipForm', '#ownershipValidationErrorsBox');
        ownership.setContents([{insert: ''}]);
    });
