document.addEventListener('turbo:load', loadCandidateEducationData);
import "flatpickr/dist/l10n";

function loadCandidateEducationData() {
    if (!$('#indexCvBuilderData').length) {
        return;
    }

    $('#countryId').select2({
        'width': '100%',
    });
    $('#cvEducationCountryId,#editCvEducationCountry,#educationYearId,#editYear, #editCvCountry').select2({
        'width': '100%',
    });

    if ($('#editCvState').length && $('#editCvEducationState').length) {
        $('#editCvState, #editCvEducationState').select2({
            'width': '100%',
        });
    }
    if ($('#editCvCity').length && $('#editCvEducationCity').length) {
        $('#editCvCity,#editCvEducationCity').select2({
            'width': '100%',
        });
    }
    if ($('#degreeLevelId').length) {
        $('#degreeLevelId').select2({
            'width': '100%',
        });
    }
    if ($('#editDegreeLevel').length) {
        $('#editDegreeLevel').select2({
            'width': '100%',
        });
    }

    $('.addExperienceBtn').on('click', function () {
        showAddExperienceDiv();
        $('#experience_title').focus()
    });
    $('.addEducationBtn').on('click', function () {
        showAddEducationDiv();
        $('#degree_title').focus()
    });

    $('#btnEducationCancel').on('click', function () {
        $('#degreeLevelId').val('');
        $('#degreeLevelId').
            select2({ 'width': '100%', 'placeholder': Lang.get('js.select_degree_level') });
        hideAddEducationDiv();
    });
    $('#btnEditEducationCancel').on('click', function () {
        hideEditEducationDiv();
    });
    $('#btnCancel').on('click', function () {
        hideAddExperienceDiv();
    });
    $('#btnEditExperienceCancel').on('click', function () {
        hideEditExperienceDiv();
    });

    window.setDatePicker = function (startDate, endDate, minDate = null) {
        let startpicker = $(startDate).flatpickr({
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
        let endpicker = $(endDate).flatpickr({
            format: 'YYYY-MM-DD',
            sideBySide: true,
            maxDate: new Date(),
            useCurrent: false,
            "locale": getLoggedInUserLang,
            minDate: minDate,
        });
    };

    $('#default').on('click', function () {
        if ($(this).prop('checked') == true) {
            $('#endDate').prop('disabled', true);
            $('#endDate').val('');
            $('#endDate').val('').removeAttr('required', false);
            $('#requiredText').addClass('d-none');
        } else if ($(this).prop('checked') == false) {
            $('#endDate').val('').attr('required', true);
            $('#requiredText').removeClass('d-none');
            $('#endDate').prop('disabled', false);
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


    listenClick('.edit-experience', function (event) {
        let experienceId = $(event.currentTarget).attr('data-id');
        renderExperienceData(experienceId);
        $('#editTitle').focus()
    });

    function renderExperienceData (experienceId) {
        showEditExperienceDiv();
        startLoader();
        $('#btnEditExperienceCancel').attr('disabled', true);
        $.ajax({
            url: route('candidate.edit-experience', experienceId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    stopLoader();
                    $('#experienceId').val(result.data.id);
                    $('#editTitle').val(result.data.experience_title);
                    $('#editCompany').val(result.data.company);
                    $('#editCvCountry').val(result.data.country_id).
                        trigger('change');
                    setTimeout(function () {
                        $("#editCvState").val(result.data.state_id).trigger('change');
                    }, 1000);
                    setTimeout(function () {
                        $("#editCvCity").val(result.data.city_id).trigger('change');
                    }, 2000);
                    $('#editStartDate').
                        val(moment(result.data.start_date).
                            format('YYYY-MM-DD'));
                    let minDate = $('#editStartDate').val();
                    setDatePicker('#editStartDate', '#editEndDate', minDate);
                    $('#editDescription').val(result.data.description);
                    if (result.data.currently_working == 1) {
                        $('#editWorking').prop('checked', true);
                        $('#editEndDate').val('');
                    } else {
                        $('#editWorking').prop('checked', false);
                        $('#editEndDate').
                            val(moment(result.data.end_date).
                                format('YYYY-MM-DD'));
                        $('#editRequiredText').removeClass('d-none');
                    }
                    if (result.data.currently_working == 1) {
                        $('#editEndDate').prop('disabled', true);
                    }
                    $('#btnEditExperienceCancel').attr('disabled', false);
                }
            },
            error: function (result) {
                stopLoader();
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenClick('.delete-experience', function (event) {
        let experienceDeleteId = $(event.currentTarget).data('id');
        deleteItem(route('experience.destroy', experienceDeleteId), Lang.get('js.experience'),
            '.candidate-experience-container', '.candidate-experience',
            '#notfoundExperience');
        // $('#startDate')[0]._flatpickr.clear();
        // $('#endDate')[0]._flatpickr.clear();
    });

    function renderEducationData (educationId) {
        showEditEducationDiv();
        startLoader();
        $('#btnEditEducationSave').attr('disabled', true);
        $.ajax({
            url: route('candidate.edit-education', educationId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    stopLoader();
                    $('#educationId').val(result.data.id);
                    $('#editDegreeLevel').
                        val(result.data.degree_level.id).
                        trigger('change');
                    $('#editDegreeTitle').val(result.data.degree_title);
                    $('#editCvEducationCountry').val(result.data.country_id).
                        trigger('change');
                    setTimeout(function () {
                        $("#editCvEducationState").val(result.data.state_id).trigger('change');
                    }, 1000);
                    setTimeout(function () {
                        $("#editCvEducationCity").val(result.data.city_id).trigger('change');
                    }, 2000);
                    $('#editInstitute').val(result.data.institute);
                    $('#editResult').val(result.data.result);
                    $('#editYear').val(result.data.year).trigger('change');
                    $('#btnEditEducationSave').attr('disabled', false);
                }
            },
            error: function (result) {
                stopLoader();
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenClick('.edit-education', function (event) {
        let educationId = $(event.currentTarget).attr('data-id');
        renderEducationData(educationId);
        $('#editDegreeTitle').focus()
    });

    listenChange('#cvEducationStateId', function () {
        changeState('#cvEducationCountryId', '#cvEducationStateId', '#cvEducationCityId');
    })
    listenChange('#editCvState', function () {
        changeState('#editCvCountry', '#editCvState', '#editCvCity');
    })
    listenChange('#editCvEducationState', function () {
        changeState('#editCvEducationCountry', '#editCvEducationState', '#editCvEducationCity');
    })

    listenClick('.delete-education', function (event) {
        let educationId = $(event.currentTarget).data('id');
        deleteItem(route('education.destroy', educationId),
            Lang.get('js.education'),
            '.candidate-education-container', '.candidate-education',
            '#notfoundEducation');
        $('#degreeLevelId').find('option[value=""]').remove();
        $('#degreeLevelId').prepend(
            $(`<option value="" selected>${Lang.get('js.select_degree_level')}</option>`));
    });


    // function deleteItem(url, header, parent, child, selector) {
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
    //
    // function deleteItemAjax (url, header, parent, child, selector) {
    //     $.ajax({
    //         url: url,
    //         type: 'DELETE',
    //         dataType: 'json',
    //         success: function (obj) {
    //             if (obj.success) {
    //                 $(parent).children(child).each(function () {
    //                     let templateId = $(this).attr('data-id');
    //                     if (templateId == obj.data) {
    //                         $(this).remove();
    //                     }
    //                 });
    //                 if ($(parent).children(child).length <= 0) {
    //                     $(selector).removeClass('d-none');
    //                 }
    //                 randerCVTemplate();
    //             }
    //             swal({
    //                 title: Lang.get('messages.common.deleted') + ' !',
    //                 text: header + Lang.get('messages.common.has_been_deleted'),
    //                 type: 'success',
    //                 confirmButtonColor: '#009ef7',
    //                 timer: 2000,
    //             });
    //             // if (callFunction) {
    //             //     eval(callFunction);
    //             // }
    //         },
    //         error: function (data) {
    //             swal({
    //                 title: '',
    //                 text: data.responseJSON.message,
    //                 type: 'error',
    //                 confirmButtonColor: '#009ef7',
    //                 timer: 5000,
    //             });
    //         },
    //     });
    // }
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
            if (willDelete) {
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

    function deleteItemAjax(url, header, parent, child, selector) {
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

    listenChange('#cvEducationCountryId', function () {
        changeCountry('#cvEducationCountryId', '#cvEducationStateId');
    })
    listenChange('#editCvCountry', function () {
        changeCountry('#editCvCountry', '#editCvState');
    })
    listenChange('#editCvEducationCountry', function () {
        changeCountry('#editCvEducationCountry', '#editCvEducationState');
    })
    window.showAddEducationDiv = function () {
        hideAddExperienceDiv();
        hideEditExperienceDiv();
        hideAddOnlineProfileDiv();
        hideAddGeneralDiv();
        $('#candidateEducationsDiv').hide();
        $('#createEducationsDiv').removeClass('d-none');
        resetModalForm('#addCVEducationForm', '#validationErrorsBox');
        $('#cvEducationCountryId, #cvEducationStateId, #cvEducationCityId').val('');
        $('#cvEducationStateId, #cvEducationCityId').empty();
        $('#cvEducationStateId').select2({'width': '100%', 'placeholder': Lang.get('js.select_state')});
        $('#cvEducationCityId').select2({'width': '100%', 'placeholder': Lang.get('js.select_city')});
        $('#cvEducationCountryId').trigger('change.select2');
    };
    window.showEditEducationDiv = function () {
        hideAddExperienceDiv();
        hideEditExperienceDiv();
        hideAddOnlineProfileDiv();
        hideAddGeneralDiv();
        $('#candidateEducationsDiv').hide();
        $('#editEducationsDiv').removeClass('d-none');
        resetModalForm('#editCVEducationForm', '#editValidationErrorsBox');
        $('#editCvEducationCountry, #editCvEducationState, #editCvEducationCity').val('');
        $('#editCvEducationState, #editCvEducationCity').empty();
        $('#editCvEducationCountry').trigger('change.select2');
    };
    window.hideAddEducationDiv = function () {
        $('#candidateEducationsDiv').show();
        $('#createEducationsDiv').addClass('d-none');
    };
    window.hideEditEducationDiv = function () {
        $('#candidateEducationsDiv').show();
        $('#editEducationsDiv').addClass('d-none');
    };
    window.showAddExperienceDiv = function () {
        hideAddEducationDiv();
        hideEditEducationDiv();
        hideAddOnlineProfileDiv();
        hideAddGeneralDiv();
        $('#candidateExperienceDiv').hide();
        $('#createExperienceDiv').removeClass('d-none');
        setDatePicker('#startDate', '#endDate');
        resetModalForm('#addCVExperienceForm', '#validationErrorsBox');
        $('#countryId, #stateId, #cityId').val('');
        $('#stateId, #cityId').empty();
        $('#stateId').
            select2({ 'width': '100%', 'placeholder': Lang.get('js.select_state') });
        $('#cityId').select2({ 'width': '100%', 'placeholder': Lang.get('js.select_city') });
        $('#countryId').trigger('change.select2');
    };
    window.showEditExperienceDiv = function () {
        hideAddEducationDiv();
        hideEditEducationDiv();
        hideAddOnlineProfileDiv();
        hideAddGeneralDiv();
        $('#candidateExperienceDiv').hide();
        $('#editExperienceDiv').removeClass('d-none');
        resetModalForm('#editCVExperienceForm', '#editValidationErrorsBox');
        setDatePicker('#editStartDate', '#editEndDate');
        $('#editExperienceCountry, #editExperienceState, #editExperienceCity').
            val('');
        $('#editExperienceState, #editExperienceCity').empty();
        $('#editExperienceCountry').trigger('change.select2');
    };
    window.hideAddExperienceDiv = function () {
        $('#candidateExperienceDiv').show();
        $('#createExperienceDiv').addClass('d-none');
    };
    window.hideEditExperienceDiv = function () {
        $('#candidateExperienceDiv').show();
        $('#editExperienceDiv').addClass('d-none');
    };
    window.renderEducationTemplate = function (educationArray) {
        let candidateEducationCount =
            $('.candidate-education-container .candidate-education:last').
                data('education-id') != undefined ?
                $('.candidate-education-container .candidate-education:last').
                    data('experience-id') + 1 : 0;
        let template = $.templates('#CVcandidateEducationTemplate');
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
    window.renderExperienceTemplate = function (experienceArray) {
        let candidateExperienceCount =
            $('.candidate-experience-container .candidate-experience:last').
                data('experience-id') != undefined ?
                $('.candidate-experience-container .candidate-experience:last').
                    data('experience-id') + 1 : 0;
        let template = $.templates('#CVcandidateExperienceTemplate');
        let endDate = experienceArray.currently_working == 1
            ? $('#cvPresent').val()
            : moment(experienceArray.end_date, 'YYYY-MM-DD').format('Do MMM, YYYY');
        let data = {
            candidateExperienceNumber: candidateExperienceCount,
            id: experienceArray.id,
            title: experienceArray.experience_title,
            company: experienceArray.company,
            startDate: moment(experienceArray.start_date, 'YYYY-MM-DD').
                format('Do MMM, YYYY'),
            endDate: endDate,
            description: experienceArray.description,
            country: experienceArray.country,
        };
        let stageTemplateHtml = template.render(data);
        $('.candidate-experience-container').prepend(stageTemplateHtml);
        $('#notfoundExperience').addClass('d-none');
    };

}

listenSubmit('#addCVEducationForm', function (e) {
    e.preventDefault();
    processingBtn('#addCVEducationForm', '#btnEducationSave', 'loading');
    $.ajax({
        url: route('candidate.create-education'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                renderEducationTemplate(result.data);
                $('#candidateEducationsDiv').show();
                $('#createEducationsDiv').addClass('d-none');
                randerCVTemplate();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addCVEducationForm', '#btnEducationSave');
        },
    });
});

listenSubmit('#editCVEducationForm', function (event) {
    event.preventDefault();
    processingBtn('#editCVEducationForm', '#btnEditEducationSave',
        'loading');
    const educationId = $('#educationId').val();
    $.ajax({
        url: route('candidate.update-education', educationId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                hideEditEducationDiv();
                $('.candidate-education-container').children('.candidate-education').each(function () {
                    let candidateEducationId = $(this).attr('data-id');
                    if (candidateEducationId == result.data.id) {
                        $(this).remove();
                    }
                });
                renderEducationTemplate(result.data.candidateEducation);
                randerCVTemplate();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCVEducationForm', '#btnEditEducationSave');
        },
    });
});

listenSubmit('#addCVExperienceForm', function (e) {
    e.preventDefault();
    processingBtn('#addCVExperienceForm', '#btnExperienceSave', 'loading');
    $.ajax({
        url: route('candidate.create-experience'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#notfoundExperience').addClass('d-none');
                displaySuccessMessage(result.message);
                hideAddExperienceDiv();
                renderExperienceTemplate(result.data);
                randerCVTemplate();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addCVExperienceForm', '#btnExperienceSave');
        },
    });
});

listenSubmit('#editCVExperienceForm', function (event) {
    event.preventDefault();
    processingBtn('#editCVExperienceForm', '#btnEditExperienceSave',
        'loading');
    const experienceId = $('#experienceId').val();
    $.ajax({
        url: route('candidate.update-experience', experienceId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                hideEditExperienceDiv();
                $('.candidate-experience-container').children('.candidate-experience').each(function () {
                    let candidateExperienceId = $(this).attr('data-id');
                    if (candidateExperienceId == result.data.id) {
                        $(this).remove();
                    }
                });

                renderExperienceTemplate(result.data.candidateExperience);
                randerCVTemplate();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editCVExperienceForm', '#btnEditExperienceSave');
        },
    });
});
