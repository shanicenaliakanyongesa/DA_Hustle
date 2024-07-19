document.addEventListener('turbo:load', loadCVBuilderData);

function loadCVBuilderData() {
    if (!$('#candidateCityId').length) {
        return;
    }

    var pluginUrl = $('#pluginUrl').val();
    var styleCssUrl = $('#styleCssUrl').val();
    var fontCssUrl = $('#fontCssUrl').val();
    var isEditProfile = $('#isEditProfile').val();
    var countryId = $('#countryId').val();
    var stateId = $('#stateId').val();
    var cityId = $('#cityId').val();

    renderCandidateData();
    randerCVTemplate();

    $('#candidateCountryId,#candidateStateId,#cvBuilderYearId,#candidateCityId').
        select2({
            width: '100%',
        });
    $('#skillId').select2({
        width: 'calc(100% - 44px)',
        placeholder: 'Select Skill',
    });

    $('#candidateCountryId').on('change', function () {
        $.ajax({
            url: route('states-list'),
            type: 'get',
            dataType: 'json',
            data: { postal: $(this).val() },
            success: function (data) {
                $('#candidateStateId').empty();
                $('#candidateStateId').append(
                    $(`<option value="" selected>${Lang.get('js.select_state')}</option>`));
                $.each(data.data, function (i, v) {
                    $('#candidateStateId').
                        append($('<option></option>').attr('value', i).text(v));
                });
                if (isEditProfile && stateId != '') {
                    $('#candidateStateId').val(stateId).trigger('change');
                }
                if ($('#candidateStateId').val() == null) {
                    $('#candidateStateId').find('option[value=""]').remove();
                    $('#candidateStateId').
                        prepend(
                            $(`<option value="" selected>${Lang.get('js.select_state')}</option>`));
                }
                if ($('#candidateCityId').val() == null) {
                    $('#candidateCityId').
                        prepend(
                            $(`<option value="" selected>${Lang.get('js.select_city')}</option>`));
                }
            },
        });
    });

    $('#candidateStateId').on('change', function () {
        $.ajax({
            url: route('cities-list'),
            type: 'get',
            dataType: 'json',
            data: {
                state: $(this).val(),
                country: $('#candidateCountryId').val(),
            },
            success: function (data) {
                $('#candidateCityId').empty();
                $.each(data.data, function (i, v) {
                    $('#candidateCityId').
                        append(
                            $('<option ></option>').attr('value', i).text(v));
                });
                if (isEditProfile && cityId != '') {
                    $('#candidateCityId').val(cityId).trigger('change');
                }
                if ($('#candidateCityId').val() == null) {
                    $('#candidateCityId').
                        prepend(
                            $(`<option value="" selected>${Lang.get('js.select_city')}</option>`));
                }
            },
        });
    });

    if (isEditProfile & countryId) {
        $('#candidateCountryId').val(countryId).trigger('change');
    }

    listenSubmit('#editGeneralForm', function (e) {
        e.preventDefault();
        processingBtn('#editGeneralForm', '#btnEditGeneralSave', 'loading');
        $.ajax({
            url: route('candidate.general.profile.update'),
            type: 'post',
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    hideAddGeneralDiv();
                    randerCVTemplate();
                    $('#candidateName').text(result.data.full_name);
                    $('#candidateLocation').
                        text(result.data.candidate.full_location);
                    $('#candidatePhone').text(result.data.phone);
                    let skills = result.data.candidateSkill;
                    let skillHtml = '<ul class="pl-3">';
                    skills.forEach(function (item) {
                        skillHtml = skillHtml +
                            '<li class="font-weight-bold">' + item + '</li>';
                    });
                    skillHtml = skillHtml + '</ul>';
                    $('#candidateSkillDiv').html(skillHtml);
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
            complete: function () {
                processingBtn('#editGeneralForm', '#btnEditGeneralSave');
            },
        });
    });

    listenKeyup('#facebookId', function () {
        this.value = this.value.toLowerCase();
    });
    listenKeyup('#twitterId', function () {
        this.value = this.value.toLowerCase();
    });
    listenKeyup('#linkedinId', function () {
        this.value = this.value.toLowerCase();
    });
    listenKeyup('#googlePlusId', function () {
        this.value = this.value.toLowerCase();
    });
    listenKeyup('#pinterestId', function () {
        this.value = this.value.toLowerCase();
    });

    listenClick('.editGeneralBtn', function () {
        showEditGeneralDiv();
    });
    listenClick('#btnGeneralCancel', function () {
        hideAddGeneralDiv();
    });
    listenClick('.addOnlineProfileBtn', function () {
        showAddOnlineProfileDiv();
        $('#facebookId').focus()

    });
    listenClick('#btnOnlineProfileCancel', function () {
        hideAddOnlineProfileDiv();
    });
    listenClick('.cv-preview', function () {
        $('#cvModal').appendTo('body').modal('show');
    });
    listenClick('#downloadPDF', function () {
        makeCVPDF();
    });
    listenClick('.printCV', function () {
        let divToPrint = document.getElementById('cvTemplate');
        let newWin = window.open('', 'Print-Window');
        newWin.document.open();
        newWin.document.write(
            '<html>' +
            '<link href="' + pluginUrl +
            '" rel="stylesheet" type="text/css"/>' +
            '<link href="' + styleCssUrl +
            '" rel="stylesheet" type="text/css"/>' +
            // '<link href="' + customCssUrl +
            // '" rel="stylesheet" type="text/css"/>' +
            '<link href="' + fontCssUrl +
            '" rel="stylesheet" type="text/css"/>' +
            '<body onload="window.print()">' + divToPrint.innerHTML +
            '</body></html>');
        newWin.document.close();
        setTimeout(function () {
            newWin.close();
        }, 10);
    });
}

listenSubmit('#editOnlineProfileForm', function (e) {
    e.preventDefault();
    processingBtn('#editOnlineProfileForm', '#btnOnlineProfileSave',
        'loading');
    let facebookUrl = $('#facebookId').val();
    let twitterUrl = $('#twitterId').val();
    let linkedInUrl = $('#linkedinId').val();
    let googlePlusUrl = $('#googlePlusId').val();
    let pinterestUrl = $('#pinterestId').val();

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
    urlValidation(linkedInUrl, googlePlusExp);
    urlValidation(googlePlusUrl, linkedInExp);
    urlValidation(pinterestUrl, pinterestExp);

    if (!urlValidation(facebookUrl, facebookExp)) {
        displayErrorMessage('Please enter a valid Facebook URL');
        processingBtn('#editOnlineProfileForm',
            '#btnOnlineProfileSave');
        return false;
    }
    if (!urlValidation(twitterUrl, twitterExp)) {
        displayErrorMessage('Please enter a valid Twitter URL');
        processingBtn('#editOnlineProfileForm',
            '#btnOnlineProfileSave');
        return false;
    }
    if (!urlValidation(linkedInUrl, linkedInExp)) {
        displayErrorMessage('Please enter a valid Linkedin URL');
        processingBtn('#editOnlineProfileForm',
            '#btnOnlineProfileSave');
        return false;
    }
    if (!urlValidation(googlePlusUrl, googlePlusExp)) {
        displayErrorMessage('Please enter a valid Google Plus URL');
        processingBtn('#editOnlineProfileForm',
            '#btnOnlineProfileSave');
        return false;
    }
    if (!urlValidation(pinterestUrl, pinterestExp)) {
        displayErrorMessage('Please enter a valid Pinterest URL');
        processingBtn('#editOnlineProfileForm',
            '#btnOnlineProfileSave');
        return false;
    }

    $.ajax({
        url: route('candidate.online.profile.update'),
        type: 'post',
        data: new FormData(this),
        dataType: 'JSON',
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                hideAddOnlineProfileDiv();
                $('#candidateOnlineProfileDiv').html(result.data.onlineProfileLayout);
                $('#addOnlineProfileDiv').html(result.data.editonlineProfileLayout);
                randerCVTemplate();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editOnlineProfileForm',
                '#btnOnlineProfileSave');
        },
    });
});

window.renderCandidateData = function () {
    $.ajax({
        url: route('candidate.edit.profile'),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#first_name').val(result.data.first_name);
                $('#last_name').val(result.data.last_name);
                $('#email').val(result.data.email);
                $('#phone').val(result.data.phone);
                $('#candidateCountryId').
                    val(result.data.country_id).
                    trigger('change');
                stateId = result.data.state_id;
                cityId = result.data.city_id;
                setTimeout(function () {
                    $("#candidateStateId").val(result.data.state_id).trigger('change');
                }, 1000);
                setTimeout(function () {
                    $("#candidateCityId").val(result.data.city_id).trigger('change');
                }, 2000);

            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};
window.randerCVTemplate = function () {
    $('#btnEditGeneralSave').attr('disabled', true);
    $.ajax({
        url: route('candidate.cv.template'),
        type: 'GET',
        success: function (result) {
            if (result) {
                $('#cvTemplate').html(result);
                $('#btnEditGeneralSave').attr('disabled', false);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};
window.showEditGeneralDiv = function () {
    hideAddExperienceDiv();
    hideEditExperienceDiv();
    hideAddEducationDiv();
    hideEditEducationDiv();
    hideAddOnlineProfileDiv();
    $('#candidateGeneralDiv').hide();
    $('#editGeneralDiv').removeClass('d-none');
    resetModalForm('#editGeneralForm');
    renderCandidateData();
};
window.hideAddGeneralDiv = function () {
    $('#candidateGeneralDiv').show();
    $('#editGeneralDiv').addClass('d-none');
};
window.showAddOnlineProfileDiv = function () {
    hideAddExperienceDiv();
    hideEditExperienceDiv();
    hideAddEducationDiv();
    hideEditEducationDiv();
    hideAddGeneralDiv();
    $('#candidateOnlineProfileDiv').hide();
    $('#addOnlineProfileDiv').removeClass('d-none');
    resetModalForm('#editOnlineProfileForm');
};
window.hideAddOnlineProfileDiv = function () {
    $('#candidateOnlineProfileDiv').show();
    $('#addOnlineProfileDiv').addClass('d-none');
};
function makeCVPDF () {
    var element = document.getElementById('cvTemplate');
    html2pdf(element);
    return;
}
