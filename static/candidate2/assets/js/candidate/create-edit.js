document.addEventListener('turbo:load', loadCandidateCreateEditData);
import "flatpickr/dist/l10n";

function loadCandidateCreateEditData () {
    if(!$('#createCandidatesForm').length && !$('#editCandidatesForm').length){
        return
    }
    $('#maritalStatusId, #countryId, #careerLevelId, #industryId, #functionalAreaId,#stateId,#cityId').
        select2({
            'width': 'calc(100% - 44px)',
        });

    $('#skillId').select2({
        width:'calc(100% - 44px)',
        placeholder: 'Select Skill',
    });

    $('#languageId').select2({
        width:'calc(100% - 44px)',
        placeholder: Lang.get('js.select_language'),
    });

    $('#countryID,#stateID,#salaryCurrencyId').select2({
        width: '100%',
    });
    $('#birthDate').flatpickr({
        format: 'YYYY-MM-DD',
        useCurrent: true,
        sideBySide: true,
        "locale": getLoggedInUserLang,
        maxDate: new Date(),
    });

    $('#availableAt').flatpickr({
        format: 'YYYY-MM-DD',
        useCurrent: true,
        sideBySide: true,
        "locale": getLoggedInUserLang,
        minDate: new Date(),
    });

    setTimeout(function () {
        $('input[type=radio][name=immediate_available]').trigger('change');
    }, 300);



    // if (isEdit & countryId) {
    //     $('#countryId').val(countryId).trigger('change');
    // }


    if ($('#addMartialDescriptionQuillData').length) {
        window.martialDescription = new Quill(
            '#addMartialDescriptionQuillData', {
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
    }

    if ($('#editMartialDescriptionQuillData').length) {
        window.martialDescription = new Quill(
            '#editMartialDescriptionQuillData', {
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
    }

    if ($('#addSkillDescriptionQuillData').length) {
        window.skillDescription = new Quill('#addSkillDescriptionQuillData', {
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

    if ($('#addIndustryDescriptionQuillData').length) {
        window.industryDescription = new Quill('#addIndustryDescriptionQuillData',
            {
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
}

listenChange('input[type=radio][name=immediate_available]', function () {
    let radioValue = $('input[name=\'immediate_available\']:checked').val();
    if (radioValue == 1) {
        $('.available-at').hide();
    } else {
        $('.available-at').show();
    }
})

listenClick('#available', function () {
    radio();
});

listenClick('#not_available', function () {
    radio();
});

function radio () {
    let radioValue = $('input[name=\'immediate_available\']:checked').val();
    if (radioValue == '0') {
        $('.available-at').show();
    } else {
        $('.available-at').hide();
    }
}

//marital status
listenClick('.createCandidateMaritalStatusModal', function () {
    $('#createCandidateMaritalStatusModal').appendTo('body').modal('show');
});

listenHiddenBsModal('#createCandidateMaritalStatusModal', function () {
    resetModalForm('#createCandidateMaritalStatusForm',
        '#maritalStatusValidationErrorsBox');
    // $('#martialDescription').summernote('code', '');
    martialDescription.setContents([{insert: ''}]);
});

$('#createCandidatesForm,#editCandidatesForm').submit(function () {
    if ($('#error-msg').text() !== '') {
        $('#phoneNumber').focus();
        return false;
    }
});

// $('#description, #skillDescription, #martialDescription').summernote({
//     minHeight: 200,
//     height: 200,
//     toolbar: [
//         ['style', ['bold', 'italic', 'underline', 'clear']],
//         ['font', ['strikethrough']],
//         ['para', ['paragraph']]],
// });
//skill
listenClick('.createCandidateSkillModal', function () {
    $('#createCandidateSkillModal').appendTo('body').modal('show');

});

$('#createCandidateSkillModal').on('hidden.bs.modal', function () {
    resetModalForm('#createCandidateSkillForm', '#skillValidationErrorsBox');
    skillDescription.setContents([{insert: ''}]);
    // $('#skillDescription').summernote('code', '');
});

listenClick('.createCandidateFunctionalAreaModal', function () {
    $('#createCandidateFunctionalModal').appendTo('body').modal('show');
});

listenHiddenBsModal('#createCandidateFunctionalModal', function () {
    resetModalForm('#createCandidateFunctionalForm', '#functionalValidationErrorsBox');
});

// industry
listenClick('.createCandidateIndustryModal', function () {
    $('#createCandidateIndustriesModal').appendTo('body').modal('show');
});

listenHiddenBsModal('#createCandidateIndustriesModal', function () {
    resetModalForm('#createCandidateNewIndustryForm', '#validationErrorsBox');
    industryDescription.setContents([{insert: ''}]);
});

listenSubmit('#createCandidatesForm,#editCandidatesForm', function () {

    $('#createCandidatesForm,#editCandidatesForm').find('input:text:visible:first').focus();

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
        displayErrorMessage('Please enter a valid Facebook URL');
        return false;
    }
    if (!urlValidation(twitterUrl, twitterExp)) {
        displayErrorMessage('Please enter a valid Twitter URL');
        return false;
    }
    if (!urlValidation(googlePlusUrl, googlePlusExp)) {
        displayErrorMessage('Please enter a valid Google Plus URL');
        return false;
    }
    if (!urlValidation(linkedInUrl, linkedInExp)) {
        displayErrorMessage('Please enter a valid Linkedin URL');
        return false;
    }
    if (!urlValidation(pinterestUrl, pinterestExp)) {
        displayErrorMessage('Please enter a valid Pinterest URL');
        return false;
    }

    return true;
});

//country
listenClick('.createCandidateCountryModal', function () {
    $('#createCandidateCountryModal').appendTo('body').modal('show');
});

listenHiddenBsModal('#createCandidateCountryModal', function () {
    resetModalForm('#createCandidateCountryForm', '#countryValidationErrorsBox');
});

// state
listenClick('.createCandidateStateModal', function () {
    let country = $('#countryId').val();
    $('#countryID').val(country).trigger('change');
    $('#createCandidateStateModal').appendTo('body').modal('show');
});

listenHiddenBsModal('#createCandidateStateModal', function () {
    $('#countryID').val('').trigger('change');
    resetModalForm('#createCandidateStateForm', '#StateValidationErrorsBox');
});
//city
listenClick('.createCandidateCityModal', function () {
    let state = $('#stateId').val();
    $('#stateID').val(state).trigger('change');
    $('#createCandidateCityModal').appendTo('body').modal('show');
});


listenHiddenBsModal('#createCandidateCityModal', function () {
    $('#stateID').val('').trigger('change');
    resetModalForm('#createCandidateCityForm', '#cityValidationErrorsBox');
});

$('#countryId').on('change', function () {
    $.ajax({
        url: route('states-list'),
        type: 'get',
        dataType: 'json',
        data: { postal: $(this).val() },
        success: function (data) {
            $('#cityId').empty();
            $('#cityId').append(
                $('<option value=""></option>').text(Lang.get('js.select_state')));
            $('#stateId').empty();
            $('#stateId').append(
                $('<option value=""></option>').text(Lang.get('js.select_city')));
            $.each(data.data, function (i, v) {
                $('#stateId').append($('<option></option>').attr('value', i).text(v));
            });

            // if (isEdit && stateId) {
            //     $('#stateId').val(stateId).trigger('change');
            // }
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
                $('#cityId').append($('<option></option>').attr('value', i).text(v));
            });

            // if (isEdit && cityId) {
            //     $('#cityId').val(cityId).trigger('change');
            // }
        },
    });
});


listenClick('.createCandidateLanguageModal', function () {
    $('#createCandidateLanguageModal').appendTo('body').modal('show');
});

$('#createCandidateLanguageModal').on('hidden.bs.modal', function () {
    resetModalForm('#createCandidateLanguageForm', '#languageValidationErrorsBox');
});

//career level
listenClick('.createCandidateCareerLevelModal', function () {
    $('#createCandidateCareerModal').appendTo('body').modal('show');
});

listenHiddenBsModal('#createCandidateCareerModal', function () {
    resetModalForm('#createCandidateCareerForm', '#careerValidationErrorsBox');
});

listenSubmit('#createCandidateCountryForm', function (e) {
    e.preventDefault();
    processingBtn('#createCandidateCountryForm', '#countryBtnSave', 'loading');
    $.ajax({
        url: route('countries.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateCountryModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#countryId').append(newOption).trigger('change');
                let newCountry = new Option(data.text, data.id, false, true);
                $('#countryID').append(newCountry).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateCountryForm', '#countryBtnSave');
        },
    });
});

listenSubmit('#createCandidateStateForm', function (e) {
    e.preventDefault();
    processingBtn('#createCandidateStateForm', '#stateBtnSave', 'loading');
    $.ajax({
        url: route('states.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateStateModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#stateId').append(newOption).trigger('change');
                let newState = new Option(data.text, data.id, false, true);
                $('#stateID').append(newState).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateStateForm', '#stateBtnSave');
        },
    });
});

listenSubmit('#createCandidateCityForm', function (e) {
    e.preventDefault();
    processingBtn('#createCandidateCityForm', '#cityBtnSave', 'loading');
    $.ajax({
        url: route('cities.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateCityModal').modal('hide');
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
            processingBtn('#createCandidateCityForm', '#cityBtnSave');
        },
    });
});

listenSubmit('#createCandidateMaritalStatusForm', function (e) {
    e.preventDefault();
    // if (!checkSummerNoteEmpty('#martialDescription',
    //     'Description field is required.', 1)) {
    //     return true;
    // }
    let editor_content = martialDescription.root.innerHTML;
    if (martialDescription.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $('#marital_desc').val(input.replace(/"/g, ''));
    processingBtn('#createCandidateMaritalStatusForm', '#maritalStatusBtnSave',
        'loading');
    $.ajax({
        url: route('maritalStatus.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateMaritalStatusModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.marital_status,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#maritalStatusId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateMaritalStatusForm', '#maritalStatusBtnSave');
        },
    });
});

listenSubmit('#createCandidateSkillForm', function (e) {
    e.preventDefault();
    // if (!checkSummerNoteEmpty('#skillDescription',
    //     'Description field is required.')) {
    //     return true;
    // }
    let editor_content = skillDescription.root.innerHTML;
    if (skillDescription.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $('#skill_desc').val(input.replace(/"/g, ''));
    processingBtn('#createCandidateSkillForm', '#skillBtnSave', 'loading');
    $.ajax({
        url: route('skills.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateSkillModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#skillId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateSkillForm', '#skillBtnSave');
        },
    });
});

listenSubmit('#createCandidateFunctionalForm', function (e) {
    e.preventDefault();
    processingBtn('#createCandidateFunctionalForm', '#functionalBtnSave', 'loading');
    $.ajax({
        url: route('functionalArea.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateFunctionalModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#functionalAreaId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateFunctionalForm', '#functionalBtnSave');
        },
    });
});

listenSubmit('#createCandidateLanguageForm', function (e) {
    e.preventDefault();
    processingBtn('#createCandidateLanguageForm', '#languageBtnSave', 'loading');
    $.ajax({
        url: route('languages.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateLanguageModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.language,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#languageId').append(newOption).trigger('change');
                setTimeout(function () {
                    $('#languageBtnSave').button('reset');
                }, 1000);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            setTimeout(function () {
                $('#languageBtnSave').button('reset');
            }, 1000);
        },
        complete: function () {
            setTimeout(function () {
                processingBtn('#createCandidateLanguageForm', '#languageBtnSave');
            }, 1000);
        },
    });
});

listenSubmit('#createCandidateCareerForm', function (e) {
    e.preventDefault();
    processingBtn('#createCandidateCareerForm', '#careerBtnSave', 'loading');
    $.ajax({
        url: route('careerLevel.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateCareerModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.level_name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#careerLevelId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateCareerForm', '#careerBtnSave');
        },
    });
});

listenSubmit('#createCandidateNewIndustryForm', function (e) {
    e.preventDefault();
    // if (!checkSummerNoteEmpty('#description',
    //     'Description field is required.', 1)) {
    //     return true;
    // }
    let editor_content = industryDescription.root.innerHTML;
    if (industryDescription.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $('#industry_desc').val(input.replace(/"/g, ''));
    processingBtn('#createCandidateNewIndustryForm', '#industriesSaveBtn', 'loading');
    $.ajax({
        url: route('industry.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#createCandidateIndustriesModal').modal('hide');
                let data = {
                    id: result.data.id,
                    text: result.data.name,
                };
                let newOption = new Option(data.text, data.id, false, true);
                $('#industryId').append(newOption).trigger('change');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#createCandidateNewIndustryForm', '#industriesSaveBtn');
        },
    });
});
