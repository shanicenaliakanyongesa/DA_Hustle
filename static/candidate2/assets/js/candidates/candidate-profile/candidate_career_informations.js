'use strict';

document.addEventListener('turbo:load', loadCandidateCareerInformationData);
import "flatpickr/dist/l10n";

function loadCandidateCareerInformationData() {

    if (!$('#indexCareerInfoData').length) {
        return
    }
    if ($('#countryId').length) {
        $('#countryId').select2({
            dropdownParent: $('#addExperienceModal')
        });
    }
    // $('#educationCountryId').select2({
    //     dropdownParent: $('#addEducationModal')
    // });
    if($('#addEducationModal').length) {
        $('#educationYearId,#degreeLevelId,#educationCountryId').select2({
            dropdownParent: $('#addEducationModal')
        });

        $('#educationStateId').select2({
            'width': '100%',
            'placeholder': Lang.get('js.select_state'),
            dropdownParent: $('#addEducationModal')
        });
        $('#educationCityId').select2({
            'width': '100%',
            'placeholder': Lang.get('js.select_city'),
            dropdownParent: $('#addEducationModal')
        });
    }
    if($('#editEducationModal').length) {
        $('#editYear,#editDegreeLevel,#editEducationCountry, #editEducationState, #editEducationCity').select2({
            dropdownParent: $('#editEducationModal')
        });
    }

    if ($('#editExperienceModal').length) {
        $('#editCountry, #editState, #editCity').select2({
            dropdownParent: $('#editExperienceModal')
        });
    }

    if ($('#addExperienceModal').length) {
        $('#stateId').select2({
            'width': '100%',
            'placeholder': Lang.get('js.select_state'),
            dropdownParent: $('#addExperienceModal')
        });
        $('#cityId').select2({'width': '100%', 'placeholder': Lang.get('js.select_city'), dropdownParent: $('#addExperienceModal')});
    }
    // $('#editEducationCountry, #editEducationState, #editEducationCity').select2({
    //     dropdownParent: $('#editEducationModal')
    // });

    // $('#degreeLevelId').select2({
    //     'width': '100%',
    // });

    listenShowBsModal('#editExperienceModal', function () {
        let minDate = $('#editStartDate').val();
        setDatePicker('#editStartDate', '#editEndDate', minDate);
    });

    window.setDatePicker = function (
        startDateExperience, endDateExperience, minDate = null) {
        let startpicker = $(startDateExperience).flatpickr({
            format: 'YYYY-MM-DD',
            useCurrent: true,
            sideBySide: true,
            "locale": getLoggedInUserLang,
            maxDate: new Date(),
            onChange: function (selectedDates, dateStr, instance) {
                endpicker.clear();
                endpicker.set('minDate', dateStr);
            },
        });
        let endpicker = $(endDateExperience).flatpickr({
            format: 'YYYY-MM-DD',
            sideBySide: true,
            maxDate: new Date(),
            useCurrent: false,
            "locale": getLoggedInUserLang,
            minDate: minDate,
        });
    };
    //
    // window.setExperienceSelect2 = function () {
    //     $('#stateId').select2({
    //         'width': '100%',
    //         'placeholder': 'Select State',
    //         dropdownParent: $('#addExperienceModal')
    //     });
    //     $('#cityId').select2({'width': '100%', 'placeholder': 'Select City', dropdownParent: $('#addExperienceModal')});
    // };
    //
    // window.setEducationSelect2 = function () {
    //     $('#educationStateId').select2({
    //         'width': '100%',
    //         'placeholder': 'Select State',
    //         dropdownParent: $('#addEducationModal')
    //     });
    //     $('#educationCityId').select2({
    //         'width': '100%',
    //         'placeholder': 'Select City',
    //         dropdownParent: $('#addEducationModal')
    //     });
    // };

    $('#default').on('click', function () {
        if ($(this).prop('checked') == true) {
            $('#endDateExperience').prop('disabled', true);
            $('#endDateExperience').val('');
            $('#endDateExperience').val('').removeAttr('required', false);
            $('#requiredText').addClass('d-none');
        } else if ($(this).prop('checked') == false) {
            $('#endDateExperience').val('').attr('required', true);
            $('#requiredText').removeClass('d-none');
            $('#endDateExperience').prop('disabled', false);
        }
    });
    $('#editWorking').on('click', function () {
        if ($(this).prop('checked') == true) {
            $('#editEndDate').prop('disabled', true);
            $('#editEndDate').val('');
            $('#editEndDate').val('').removeAttr('required', false);
            $('#editRequiredText').addClass('d-none');
        } else if ($(this).prop('checked') == false) {
            $('#editEndDate').val('').attr('required', true);
            $('#editRequiredText').removeClass('d-none');
            $('#editEndDate').prop('disabled', false);
        }
    });

    listenClick('.addExperienceModal', function () {
        // setExperienceSelect2();
        $('#addExperienceModal').appendTo('body').modal('show');
    });

    listenClick('.addEducationModal', function () {
        // setEducationSelect2();
        $('#addEducationModal').appendTo('body').modal('show');
        $('#degreeLevelId').select2({
            dropdownParent: $('#addEducationModal')
        });
    });

    listenShowBsModal('#addEducationModal', function () {
        $(this).find('input:text').first().blur();
    });

    window.renderExperienceTemplate = function (experienceArray) {
        let candidateExperienceCount =
            $('.candidate-experience-container .candidate-experience:last').
                data('experience-id') != undefined ?
                $('.candidate-experience-container .candidate-experience:last').
                    data('experience-id') + 1 : 0;
        let template = $.templates('#candidateExperienceTemplate');
        let endDateExperience = experienceArray.currently_working == 1
            ? $('#candidatePresentMsg').val()
            : moment(experienceArray.end_date, 'YYYY-MM-DD').
                format('Do MMM, YYYY');
        let data = {
            candidateExperienceNumber: candidateExperienceCount,
            id: experienceArray.id,
            title: experienceArray.experience_title,
            company: experienceArray.company,
            startDateExperience: moment(experienceArray.start_date,
                'YYYY-MM-DD').
                format('Do MMM, YYYY'),
            endDateExperience: endDateExperience,
            description: experienceArray.description,
            country: experienceArray.country,
        };
        let stageTemplateHtml = template.render(data);
        $('.candidate-experience-container').prepend(stageTemplateHtml);
        $('#notfoundExperience').addClass('d-none');
    };


    listenClick('.edit-candidate-experience', function (event) {
        let experienceId = $(event.currentTarget).data('id');
        renderCandidateExperienceData(experienceId);
    });

    function renderCandidateExperienceData(experienceId) {
        $.ajax({
            url: route('candidate.edit-experience', experienceId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#experienceId').val(result.data.id);
                    $('#editTitle').val(result.data.experience_title);
                    $('#editCompany').val(result.data.company);
                    $('#editCountry').val(result.data.country_id).trigger('change');
                    setTimeout(function () {
                        $("#editState").val(result.data.state_id).trigger('change');
                    }, 1000);
                    // $("#editState").val(result.data.state_id).trigger('change');
                    $('#editStartDate').
                        val(moment(result.data.start_date).
                            format('YYYY-MM-DD'));
                    $('#editDescription').val(result.data.description);
                    if (result.data.currently_working == 1) {
                        $('#editWorking').
                            prop('checked', true);
                        $('#editEndDate').val('');
                    } else {
                        $('#editWorking').
                            prop('checked', false);
                        $('#editEndDate').
                            val(moment(result.data.end_date).
                                format('YYYY-MM-DD'));
                        $('#editRequiredText').removeClass('d-none');
                    }
                    if (result.data.currently_working == 1) {
                        $('#editEndDate').prop('disabled', true);
                    }

                    setTimeout(function () {
                        $("#editCity").val(result.data.city_id).trigger('change');
                    }, 2000);
                    // $("#editCity").val(result.data.city_id).trigger('change');
                    $('#editExperienceModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenHiddenBsModal('#addEducationModal', function () {
        resetModalForm('#addNewEducationForm', '#validationErrorsBox');
        $('#degreeLevelId').val('');
        $('#degreeLevelId').select2({'width': '100%', 'placeholder': Lang.get('js.select_state')});
        $('#educationYearId').val('');
        $('#educationYearId').select2({
            'width': '100%',
            'placeholder': Lang.get('js.select_year')
        });
        $('#educationCountryId, #educationStateId, #educationCityId').val('');
        $('#educationStateId, #educationCityId').empty();
        $('#educationCountryId').trigger('change.select2');
    });

    listenClick('.delete-experience', function (event) {
        let experienceId = $(event.currentTarget).data('id');
        deleteItem(route('experience.destroy', experienceId), Lang.get('js.experience'),
            '.candidate-experience-container', '.candidate-experience',
            '#notfoundExperience');
    });

    listenClick('.edit-candidate-education', function (event) {
        let educationId = $(event.currentTarget).data('id');
        renderCandidateEducationData(educationId);
    });

    function renderCandidateEducationData(educationId) {
        $.ajax({
            url: route('candidate.edit-education', educationId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    console.log(result.data)
                    $('#educationId').val(result.data.id);
                    $('#editDegreeLevel').val(result.data.degree_level.id).trigger('change');
                    $('#editDegreeTitle').val(result.data.degree_title);
                    $('#editInstitute').val(result.data.institute);

                    $('#editEducationCountry').
                        val(result.data.country_id).trigger('change');
                    setTimeout(function () {
                        $("#editEducationState").val(result.data.state_id).trigger('change');
                    }, 1000);
                    setTimeout(function () {
                        $("#editEducationCity").val(result.data.city_id).trigger('change');
                    }, 2000);
                    $('#editResult').val(result.data.result);
                    $('#editYear').val(result.data.year).trigger('change');
                    $('#editEducationModal').appendTo('body').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
   }

    listenChange('#educationStateId', function () {
        changeState('#educationCountryId', '#educationStateId', '#educationCityId');
    })
    listenChange('#editState', function () {
        changeState('#editCountry', '#editState', '#editCity');
    })
    listenChange('#editEducationState', function () {
        changeState('#editEducationCountry', '#editEducationState', '#editEducationCity');
    })

    listenClick('.delete-education', function (event) {
        let educationId = $(event.currentTarget).data('id');
        deleteItem(route('candidate.update-education', educationId), Lang.get('js.education'),
            '.candidate-education-container', '.candidate-education',
            '#notfoundEducation');
    });
    window.deleteItem = function (url, header, parent, child, selector) {
        swal({
            title: Lang.get('js.delete') + ' !',
            text: Lang.get('js.are_you_sure') + ' "' + header + '" ?',
            buttons: {
                confirm:Lang.get('js.yes_delete'),
                cancel: Lang.get('js.no_cancel'),
            },
            reverseButtons: true,
            icon: 'warning',
        }).then(function (willDelete) {
            if(willDelete){
                deleteItemAjax(url, header, parent, child, selector);
            }
        });
    };
    //  function deleteItem(url, header, parent, child, selector) {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-0',
    //             cancelButton: 'swal2-cancel btn fw-bold btn-bg-light btn-color-primary mt-0'
    //         },
    //         buttonsStyling: false
    //     })
    //     swalWithBootstrapButtons.fire({
    //         title: Lang.get('messages.common.delete') + ' !',
    //         text: Lang.get('messages.common.are_you_sure_want_to_delete') +
    //             '"' + header + '" ?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         closeOnConfirm: false,
    //         showLoaderOnConfirm: true,
    //         confirmButtonColor: '#6777ef',
    //         cancelButtonColor: '#d33',
    //         cancelButtonText: Lang.get('messages.common.no'),
    //         confirmButtonText: Lang.get('messages.common.yes'),
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deleteItemAjax(url, header, parent, child, selector);
    //         }
    //     });
    // };

    function deleteItemAjax (url, header, parent, child, selector) {
        $.ajax({
            url: url,
            type: 'DELETE',
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $(parent).children(child).each(function () {
                        let templateId = $(this).attr('data-id');
                        if (templateId == obj.data) {
                            $(this).remove();
                        }
                    });
                    if ($(parent).children(child).length <= 0) {
                        $(selector).removeClass('d-none');
                    }
                }
                swal({
                    icon: 'success',
                    title: Lang.get('js.deleted') + ' !',
                    text: header + Lang.get('js.has_been_deleted'),
                    type: 'success',
                    buttons: {
                        confirm:Lang.get('js.ok'),
                    },
                    reverseButtons: true,
                    confirmButtonColor: '#F62947',
                    timer: 2000,
                });
                // if (callFunction) {
                //     eval(callFunction);
                // }
            },
            error: function (data) {
                swal({
                    icon: 'error',
                    title: Lang.get('js.error'),
                    text: data.responseJSON.message,
                    type: 'error',
                    buttons: {
                        confirm:Lang.get('js.ok'),
                    },
                    reverseButtons: true,
                    confirmButtonColor: '#F62947',
                    timer: 5000,
                });
            },
        });
    }

    listenChange('#educationCountryId', function () {
        changeCountry('#educationCountryId', '#educationStateId');
    })
    listenChange('#editCountry', function () {
        changeCountry('#editCountry', '#editState');
    })
    listenChange('#editEducationCountry', function () {
        changeCountry('#editEducationCountry', '#editEducationState');
    })

    listenChange('#countryId', function () {
        changeCountry('#countryId', '#stateId');
    })

}

listenChange('#editCountry', function () {
    changeCountry('#editCountry', '#editState');
})

window.changeCountry = function (country, state) {
    $.ajax({
        url: route('states-list'),
        type: 'get',
        dataType: 'json',
        data: {postal: $(country).val()},
        success: function (data) {
            $(state).empty();
            if (data.data.length != 0) {
                $.each(data.data, function (i, v) {
                    $(state).append($('<option></option>').attr('value', i).text(v));
                });
            } else {
                $(state).append(
                    $('<option value=""></option>').text(Lang.get('js.select_state')));
            }
            $(state).trigger('change');
        },
    });
}
window.changeState = function (country, state, city) {
    $.ajax({
        url: route('cities-list'),
        type: 'get',
        dataType: 'json',
        data: {
            state: $(state).val(),
            country: $(country).val(),
        },
        success: function (data) {
            $(city).empty();
            if (data.data.length != 0) {
                $.each(data.data, function (i, v) {
                    $(city).append($('<option></option>').attr('value', i).text(v));
                });
            } else {
                $(city).append(
                    $('<option value=""></option>').text(Lang.get('js.select_city')));
            }
        },
    });
}

function renderEducationTemplate(educationArray) {
    let candidateEducationCount =
        $('.candidate-education-container .candidate-education:last').data('education-id') != undefined ?
            $('.candidate-education-container .candidate-education:last').data('experience-id') + 1 : 0;
    let template = $.templates('#candidateEducationTemplate');
    let data = {
        candidateEducationNumber: candidateEducationCount,
        id: educationArray.id,
        degreeLevel: educationArray.degree_level.name,
        degreeTitle: educationArray.degree_title,
        year: educationArray.year,
        country: educationArray.country,
        institute: educationArray.institute,
    };
    let stageTemplateHtml = template.render(data);
    $('.candidate-education-container').prepend(stageTemplateHtml);
    $('#notfoundEducation').addClass('d-none');
};

listenSubmit('#addNewEducationForm', function (e) {
    e.preventDefault();
    processingBtn('#addNewEducationForm', '#btnEducationSave', 'loading');
    $.ajax({
        url: route('candidate.create-education'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#notfoundEducation').addClass('d-none');
                displaySuccessMessage(result.message);
                $('#addEducationModal').modal('hide');
                renderEducationTemplate(result.data);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addNewEducationForm', '#btnEducationSave');
        },
    });
});

listenSubmit('#editCareerEducationForm', function (event) {
    event.preventDefault();
    processingBtn('#editCareerEducationForm', '#editEducationSave',
        'loading');
    const educationId = $('#educationId').val();
    $.ajax({
        url: route('candidate.update-education', educationId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editEducationModal').modal('hide');
                $('.candidate-education-container').load(location.href + " .candidate-education-container");
                $('.candidate-education-container').children('.candidate-education').each(function () {
                    let candidateEducationId = $(this).attr('data-id');
                    if (candidateEducationId == result.data.id) {
                        $(this).remove();
                    }
                });
                renderEducationTemplate(result.data.candidateEducation);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCareerEducationForm', '#editEducationSave');
        },
    });
});

listenSubmit('#addNewExperienceForm', function (e) {
    e.preventDefault();
    let startDateExperience = new Date($('#startDateExperience').val());
    let endDateExperience = new Date($('#endDateExperience').val());
    if (endDateExperience < startDateExperience) {
        displayErrorMessage(
            'The start date must be a date before end date.');
        return false;
    }
    processingBtn('#addNewExperienceForm', '#btnExperienceSave', 'loading');
    $.ajax({
        url: route('candidate.create-experience'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#notfoundExperience').addClass('d-none');
                displaySuccessMessage(result.message);
                $('#addExperienceModal').modal('hide');
                renderExperienceTemplate(result.data);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addNewExperienceForm', '#btnExperienceSave');
        },
    });
});

listenSubmit('#editExperienceForm', function (event) {
    event.preventDefault();
    let startDateExperience = new Date($('#editStartDate').val());
    let endDateExperience = new Date($('#editEndDate').val());
    if (endDateExperience < startDateExperience) {
        displayErrorMessage(
            'The start date must be a date before end date.');
        return false;
    }
    processingBtn('#editExperienceForm', '#btnExperienceSave',
        'loading');
    const id = $('#experienceId').val();
    $.ajax({
        url: route('candidate.update-experience', id),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editExperienceModal').modal('hide');
                // $('.candidate-experience-container').load(location.href + ' .candidate-experience-container');
                $('.candidate-experience-container').children('.candidate-experience').each(function () {
                    let candidateExperienceId = $(this).attr('data-id');
                    if (candidateExperienceId == result.data.id) {
                        $(this).remove();
                    }
                });
                renderExperienceTemplate(result.data.candidateExperience);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editExperienceForm', '#btnExperienceSave');
        },
    });
});

listenHiddenBsModal('#editEducationModal', function () {
    resetModalForm('#editCareerEducationForm', '#validationErrorsBox');
});

listenHiddenBsModal('#addExperienceModal', function () {
    resetModalForm('#addNewExperienceForm', '#validationErrorsBox');
    $('#countryId, #stateId, #cityId').val('');
    $('#stateId, #cityId').empty();
    $('#countryId').trigger('change.select2');
});

listenShowBsModal('#addExperienceModal', function () {
    $('#endDateExperience').prop('disabled', false);
    setDatePicker('#startDateExperience', '#endDateExperience');
});
