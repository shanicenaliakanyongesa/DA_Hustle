document.addEventListener("turbo:load", loadEmployeeCreateEditData);
import "flatpickr/dist/l10n";

function loadEmployeeCreateEditData() {
    if (!$(".jobEmployeePanel").length) {
        return;
    }
    if ($("#editDetails").length) {
        window.editJobDescription = new Quill("#editDetails", {
            modules: {
                toolbar: [["bold", "italic", "underline", "strike"], ["clean"]],
                keyboard: {
                    bindings: {
                        tab: "disabled"
                    }
                }
            },
            placeholder: Lang.get("js.enter_description"),
            theme: "snow"
        });
        if ($("#editResponse").length) {
            // Initialize Quill editor for key responsibilities
            window.editResponse = new Quill("#editResponse", {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["clean"]
                    ],
                    keyboard: {
                        bindings: {
                            tab: "disabled"
                        }
                    }
                },
                placeholder: Lang.get(
                    "js.enter_key_responsibilities"
                ),
                theme: "snow"
            });

            editJobDescription.root.innerHTML = $("#editJobDescription").val();
            editResponse.root.innerHTML = $("#edit_responsibilities").val();
        }
    }

    if ($("#details").length) {
        window.details = new Quill("#details", {
            modules: {
                toolbar: [["bold", "italic", "underline", "strike"], ["clean"]],
                keyboard: {
                    bindings: {
                        tab: "disabled"
                    }
                }
            },
            placeholder: Lang.get("js.enter_description"),
            theme: "snow"
        });
        if ($("#response").length) {
            window.response = new Quill("#response", {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["clean"]
                    ],
                    keyboard: {
                        bindings: {
                            tab: "disabled"
                        }
                    }
                },
                placeholder: Lang.get(
                    "js.enter_key_responsibilities"
                ),
                theme: "snow"
            });
        }

        listenClick("#jobsSaveBtn, #saveDraft", function(e) {
            if ($(this).val() == "draft") {
                $("#saveAsDraft").attr("value", "1");
            }
            processingBtn("#createJobForm", $(this), "loading");
            let editor_content1 = details.root.innerHTML;
            let input = JSON.stringify(editor_content1);
            if (details.getText().trim().length === 0) {
                displayErrorMessage(
                    Lang.get("js.description_required")
                );
                processingBtn("#createJobForm", $(this));
                return false;
            }
            $("#job_desc").val(input.replace(/"/g, ""));
            // if (!checkSummerNoteEmpty('#details',
            //     'Job Description field is required.', 1)) {
            //     e.preventDefault();
            //     $('#saveJob,#draftJob').attr('disabled', false);
            //     return false;
            // }
            let keyResponsibilitiesContent = response.root.innerHTML;
            let respose = JSON.stringify(keyResponsibilitiesContent);
            if (response.getText().trim().length === 0) {
                displayErrorMessage(
                    Lang.get("js.key_responsibilities_required")
                );
                processingBtn("#createJobForm", $(this));
                return false;
            }
            $("#key_responsibilities").val(respose.replace(/"/g, ""));

            if ($("#salaryToErrorMsg").text() !== "") {
                $("#toSalary").focus();
                $("#saveJob,#draftJob").attr("disabled", false);
                processingBtn("#createJobForm", $(this));
                return false;
            }
            $("#createJobForm")[0].submit();
        });
    }
    if (!$("#createJobForm").length && !$("#editJobForm").length) {
        return;
    }
    if ($("#toSalary").length) {
        new AutoNumeric("#toSalary", {
            maximumValue: 9999999999,
            currencySymbol: "",
            digitGroupSeparator: ",",
            decimalPlaces: 1,
            currencySymbolPlacement:
                AutoNumeric.options.currencySymbolPlacement.suffix
        });
    }
    if ($("#fromSalary").length) {
        new AutoNumeric("#fromSalary", {
            maximumValue: 9999999999,
            currencySymbol: "",
            digitGroupSeparator: ",",
            decimalPlaces: 1,
            currencySymbolPlacement:
                AutoNumeric.options.currencySymbolPlacement.suffix
        });
    }
    $("#toSalary").on("keyup", function() {
        let fromSalary = parseInt(
            Math.trunc(removeCommas($("#fromSalary").val()))
        );
        let toSalary = parseInt(Math.trunc(removeCommas($("#toSalary").val())));
        if (toSalary < fromSalary) {
            $("#toSalary").focus();
            $("#salaryToErrorMsg").text(
                Lang.get(
                    "js.please_enter_salary_range_to_greater_than_salary_range_from"
                )
            );
            $(".actions [href='#next']").css({
                opacity: "0.7",
                "pointer-events": "none"
            });
            $("#saveJob").attr("disabled", true);
        } else {
            $("#salaryToErrorMsg").text("");
            $(".actions [href='#next']").css({
                opacity: "1",
                "pointer-events": "inherit"
            });
            $("#saveJob").attr("disabled", false);
        }
    });

    $("#toSalary").on("wheel", function(e) {
        $(this).trigger("keyup");
    });

    $("#fromSalary").on("keyup", function() {
        let fromSalary = parseInt(
            Math.trunc(removeCommas($("#fromSalary").val()))
        );
        let toSalary = parseInt(Math.trunc(removeCommas($("#toSalary").val())));
        if (toSalary < fromSalary) {
            $("#fromSalary").focus();
            $("#salaryToErrorMsg").text(
                Lang.get(
                    "js.please_enter_salary_range_to_greater_than_salary_range_from"
                )
            );
            $(".actions [href='#next']").css({
                opacity: "0.7",
                "pointer-events": "none"
            });
            $("#saveJob").attr("disabled", true);
        } else {
            $("#salaryToErrorMsg").text("");
            $(".actions [href='#next']").css({
                opacity: "1",
                "pointer-events": "inherit"
            });
            $("#saveJob").attr("disabled", false);
        }
    });

    $("#fromSalary").on("wheel", function(e) {
        $(this).trigger("keyup");
    });

    $(
        "#jobTypeId,#jobCategoryId,#careerLevelsId,#jobShiftId,#countryId,#stateId,#cityId,#salaryPeriodsId,#requiredDegreeLevelId,#functionalAreaId"
    ).select2({
        width: !$(".jobEmployeePanel").val() ? "calc(100% - 44px)" : "100%"
    });

    $("#preferenceId,#currencyId,#createCityStateID").select2({
        width: "100%"
    });

    $("#jobCountryID").select2({
        width: "100%",
        dropdownParent: $("#createStateModal")
    });

    $("#createCityStateID").select2({
        width: "100%",
        dropdownParent: $("#createCityModal")
    });

    $("#SkillId").select2({
        width: !$(".jobEmployeePanel").val() ? "calc(100% - 44px)" : "100%",
        placeholder: Lang.get("js.select_job_skill")
    });
    $("#tagId").select2({
        width: !$(".jobEmployeePanel").val() ? "calc(100% - 44px)" : "100%",
        placeholder: Lang.get("js.select_job_tag")
    });
    if (
        !$("#companyId").hasClass(".select2-hidden-accessible") &&
        $("#companyId").is("select")
    ) {
        $("#companyId").select2({
            width: "100%"
        });
    }
    var date = new Date();
    date.setDate(date.getDate() + 1);
    $(".expiryDatepicker").flatpickr({
        format: "YYYY-MM-DD",
        useCurrent: false,
        locale: getLoggedInUserLang,
        minDate: new Date(new Date().valueOf() + 1000 * 3600 * 24)
    });
    window.autoNumeric = function(formId, validationBox) {
        $(formId)[0].reset();
        $("select.select2Selector").each(function(index, element) {
            let drpSelector = "#" + $(this).attr("id");
            $(drpSelector).val("");
            $(drpSelector).trigger("change");
        });
        $(validationBox).hide();
    };

    //degree level
    listenClick(".createRequiredDegreeLevelTypeModal", function() {
        $("#createDegreeLevelModal")
            .appendTo("body")
            .modal("show");
    });

    $("#createDegreeLevelModal").on("hidden.bs.modal", function() {
        resetModalForm(
            "#createDegreeLevelForm",
            "#degreeLevelValidationErrorsBox"
        );
    });

    //country
    listenClick(".createCountryModal", function() {
        $("#createCountryModal")
            .appendTo("body")
            .modal("show");
    });
    $("#createCountryModal").on("hidden.bs.modal", function() {
        resetModalForm("#createCountryForm", "#countryValidationErrorsBox");
    });

    // state
    listenClick(".createStateModal", function() {
        let country = $("#countryId").val();
        $("#jobCountryID")
            .val(country)
            .trigger("change");
        $("#createStateModal")
            .appendTo("body")
            .modal("show");
    });

    $("#createStateModal").on("hidden.bs.modal", function() {
        $("#jobCountryID")
            .val("")
            .trigger("change");
        resetModalForm("#createStateForm", "#StateValidationErrorsBox");
    });

    //city
    listenClick(".createCityModal", function() {
        let state = $("#stateId").val();
        $("#createCityStateID")
            .val(state)
            .trigger("change");
        $("#createCityModal")
            .appendTo("body")
            .modal("show");
    });

    $("#createCityModal").on("hidden.bs.modal", function() {
        $("#createCityStateID")
            .val("")
            .trigger("change");
        resetModalForm("#createCityForm", "#cityValidationErrorsBox");
    });

    //functional area
    listenClick(".createFunctionalAreaModal", function() {
        $("#createFunctionalModal")
            .appendTo("body")
            .modal("show");
    });

    $("#createFunctionalModal").on("hidden.bs.modal", function() {
        resetModalForm(
            "#createFunctionalForm",
            "#functionalValidationErrorsBox"
        );
    });

    //career level
    listenClick(".createCareerLevelModal", function() {
        $("#createCareerModal")
            .appendTo("body")
            .modal("show");
    });

    $("#createCareerModal").on("hidden.bs.modal", function() {
        resetModalForm("#createCareerForm", "#careerValidationErrorsBox");
    });
    // $('#details').summernote({
    //     minHeight: 200,
    //     height: 200,
    //     placeholder: 'Enter Job Details...',
    //     toolbar: [
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['font', ['strikethrough']],
    //         ['para', ['paragraph']]],
    // });

    // $('#jobCategoryDescription, #skillDescription, #salaryPeriodDescription, #jobShiftDescription, #jobTagDescription').summernote({
    //     minHeight: 200,
    //     height: 200,
    //     toolbar: [
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['font', ['strikethrough']],
    //         ['para', ['paragraph']]],
    // });

    // $('#editDetails').summernote({
    //     minHeight: 200,
    //     height: 200,
    //     placeholder: 'Enter Job Details...',
    //     toolbar: [
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['font', ['strikethrough']],
    //         ['para', ['paragraph']]],
    // });

    // $('#countryId').on('change', function () {
    //     $.ajax({
    //         url: route('states-list'),
    //         type: 'get',
    //         dataType: 'json',
    //         data: { postal: $(this).val() },
    //         success: function (data) {
    //             $('#cityId').empty();
    //             $('#cityId').append(
    //                 $('<option value=""></option>').text('Select City'));
    //             $('#stateId').empty();
    //             $('#stateId').
    //                 append(
    //                     $('<option value=""></option>').text('Select State'));
    //             $.each(data.data, function (i, v) {
    //                 $('#stateId').
    //                     append($('<option></option>').attr('value', i).text(v));
    //             });
    //         },
    //     });
    // });

    // $('#stateId').on('change', function () {
    //     $.ajax({
    //         url: route('cities-list'),
    //         type: 'get',
    //         dataType: 'json',
    //         data: {
    //             state: $(this).val(),
    //             country: $('#countryId').val(),
    //         },
    //         success: function (data) {
    //             $('#cityId').empty();
    //             $('#cityId').append(
    //                 $('<option value=""></option>').text('Select City'));
    //             $.each(data.data, function (i, v) {
    //                 $('#cityId').append(
    //                     $('<option ></option>').attr('value', i).text(v));
    //             });
    //         },
    //     });
    // });
    if ($("#addJobTypeDescriptionQuillData").length) {
        window.jobTypeDescription = new Quill(
            "#addJobTypeDescriptionQuillData",
            {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["clean"]
                    ]
                },
                theme: "snow"
            }
        );

        $("#createJobTypeModal").on("hidden.bs.modal", function() {
            resetModalForm("#createJobTypeForm", "#jobTypeValidationErrorsBox");
            jobTypeDescription.setContents([{ insert: "" }]);
        });
    }

    if ($("#addJobCategoryDescriptionQuillData").length) {
        window.jobCategoryDescription = new Quill(
            "#addJobCategoryDescriptionQuillData",
            {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["clean"]
                    ],
                    keyboard: {
                        bindings: {
                            tab: "disabled"
                        }
                    }
                },
                theme: "snow"
            }
        );

        $("#createJobCategoryModal").on("hidden.bs.modal", function() {
            resetModalForm(
                "#createJobCategoryForm",
                "#jobCategoryValidationErrorsBox"
            );
            jobCategoryDescription.setContents([{ insert: "" }]);
            let defaultDocumentImageUrl = $("#defaultDocumentImageUrl").val();
            $("#previewImage").css(
                "background-image",
                'url("' + defaultDocumentImageUrl + '")'
            );
        });
    }
    if ($("#addSkillDescriptionQuillData").length) {
        $("#createSkillModal").on("hidden.bs.modal", function() {
            resetModalForm("#createSkillForm", "#skillValidationErrorsBox");
            skillDescription.setContents([{ insert: "" }]);
            // $('#skillDescription').summernote('code', '');
        });

        window.skillDescription = new Quill("#addSkillDescriptionQuillData", {
            modules: {
                toolbar: [["bold", "italic", "underline", "strike"], ["clean"]],
                keyboard: {
                    bindings: {
                        tab: "disabled"
                    }
                }
            },
            theme: "snow"
        });
        $("#createSkillForm").on("submit", function(e) {
            let editor_content1 = skillDescription.root.innerHTML;
            let input = JSON.stringify(editor_content1);
            if (skillDescription.getText().trim().length === 0) {
                displayErrorMessage(
                    Lang.get("js.description_required")
                );
                return false;
            }
            $("#skill_desc").val(input.replace(/"/g, ""));
            // if (!checkSummerNoteEmpty('#details',
            //     'Job Description field is required.', 1)) {
            //     e.preventDefault();
            //     $('#saveJob,#draftJob').attr('disabled', false);
            //     return false;
            // }

            if ($("#salaryToErrorMsg").text() !== "") {
                $("#toSalary").focus();
                $("#skillBtnSave").attr("disabled", false);
                return false;
            }
        });
    }

    if ($("#addJobTagDescriptionQuillData").length) {
        window.jobTagDescription = new Quill("#addJobTagDescriptionQuillData", {
            modules: {
                toolbar: [["bold", "italic", "underline", "strike"], ["clean"]],
                keyboard: {
                    bindings: {
                        tab: "disabled"
                    }
                }
            },
            theme: "snow"
        });

        $("#createJobTagModal").on("hidden.bs.modal", function() {
            resetModalForm("#createJobTagForm", "#jobTagValidationErrorsBox");
            // $('#jobTagDescription').summernote('code', '');
            jobTagDescription.setContents([{ insert: "" }]);
        });
    }

    $("#createJobShiftModal").on("hidden.bs.modal", function() {
        resetModalForm("#createJobShiftForm", "#jobShiftValidationErrorsBox");
        // $('#jobShiftDescription').summernote('code', '');
        jobShiftDescription.setContents([{ insert: "" }]);
    });

    if ($("#addJobShiftDescriptionQuillData").length) {
        window.jobShiftDescription = new Quill(
            "#addJobShiftDescriptionQuillData",
            {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["clean"]
                    ],
                    keyboard: {
                        bindings: {
                            tab: "disabled"
                        }
                    }
                },
                theme: "snow"
            }
        );
    }
    if ($("#createSalaryPeriodModal").length) {
        window.salaryPeriodDescription = new Quill(
            "#addSalaryPeriodDescriptionQuillData",
            {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["clean"]
                    ],
                    keyboard: {
                        bindings: {
                            tab: "disabled"
                        }
                    }
                },
                theme: "snow"
            }
        );

        $("#createSalaryPeriodModal").on("hidden.bs.modal", function() {
            resetModalForm(
                "#createSalaryPeriodForm",
                "#salaryPeriodValidationErrorsBox"
            );
            salaryPeriodDescription.setContents([{ insert: "" }]);
            // $('#salaryPeriodDescription').summernote('code', '');
        });
    }

    //job Type
    listenClick(".createJobTypeModal", function() {
        $("#createJobTypeModal")
            .appendTo("body")
            .modal("show");
    });

    //job category
    listenClick(".createJobCategoryModal", function() {
        $("#createJobCategoryModal")
            .appendTo("body")
            .modal("show");
    });

    //skill
    listenClick(".createSkillModal", function() {
        $("#createSkillModal")
            .appendTo("body")
            .modal("show");
    });
    //salary period
    listenClick(".createSalaryPeriodModal", function() {
        $("#createSalaryPeriodModal")
            .appendTo("body")
            .modal("show");
    });

    //job shift
    listenClick(".createJobShiftModal", function() {
        $("#createJobShiftModal")
            .appendTo("body")
            .modal("show");
    });

    //job tag
    listenClick(".createJobTagModal", function() {
        $("#createJobTagModal")
            .appendTo("body")
            .modal("show");
    });
}

listenSubmit("#createDegreeLevelForm", function() {
    processingBtn("#createDegreeLevelForm", "#degreeLevelBtnSave", "loading");
    $.ajax({
        url: route("requiredDegreeLevel.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createDegreeLevelModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#requiredDegreeLevelId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createDegreeLevelForm", "#degreeLevelBtnSave");
        }
    });
    return false;
});

listenSubmit("#createCountryForm", function() {
    processingBtn("#createCountryForm", "#countryBtnSave", "loading");
    $.ajax({
        url: route("countries.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createCountryModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#countryId")
                    .append(newOption)
                    .trigger("change");
                let newCountry = new Option(data.text, data.id, false, true);
                $("#jobCountryID")
                    .append(newCountry)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createCountryForm", "#countryBtnSave");
        }
    });
    return false;
});

listenSubmit("#createStateForm", function() {
    processingBtn("#createStateForm", "#stateBtnSave", "loading");
    $.ajax({
        url: route("states.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createStateModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#stateId")
                    .append(newOption)
                    .trigger("change");
                let newState = new Option(data.text, data.id, false, true);
                $("#createCityStateID")
                    .append(newState)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createStateForm", "#stateBtnSave");
        }
    });
    return false;
});

listenSubmit("#createCityForm", function() {
    processingBtn("#createCityForm", "#cityBtnSave", "loading");
    $.ajax({
        url: route("cities.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createCityModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#cityId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createCityForm", "#cityBtnSave");
        }
    });
    return false;
});

listenSubmit("#createFunctionalForm", function() {
    processingBtn("#createFunctionalForm", "#functionalBtnSave", "loading");
    $.ajax({
        url: route("functionalArea.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createFunctionalModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#functionalAreaId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createFunctionalForm", "#functionalBtnSave");
        }
    });
    return false;
});

listenSubmit("#createCareerForm", function() {
    processingBtn("#createCareerForm", "#careerBtnSave", "loading");
    $.ajax({
        url: route("careerLevel.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createCareerModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.level_name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#careerLevelsId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createCareerForm", "#careerBtnSave");
        }
    });
    return false;
});

listenSubmit("#createJobTypeForm", function() {
    let editor_content = jobTypeDescription.root.innerHTML;
    if (editor_content.length) {
        if (jobTypeDescription.getText().trim().length === 0) {
            displayErrorMessage(
                Lang.get("js.description_required")
            );
            return false;
        }
    } else {
        displayErrorMessage(Lang.get("js.description_required"));
        return false;
    }
    processingBtn("#createJobTypeForm", "#jobTypeBtnSave", "loading");
    let input = JSON.stringify(editor_content);
    $("#job_type_desc").val(input.replace(/"/g, ""));
    $.ajax({
        url: route("jobType.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createJobTypeModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#jobTypeId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createJobTypeForm", "#jobTypeBtnSave");
        }
    });
    return false;
});

listenSubmit("#createJobCategoryForm", function() {
    processingBtn("#createJobCategoryForm", "#jobCategoryBtnSave", "loading");
    // if (!checkSummerNoteEmpty('#jobCategoryDescription',
    //     'Description field is required.')) {
    //     processingBtn('#addJobCategoryForm', '#jobCategoryBtnSave');
    //     return true;
    // }
    var editor_content = jobCategoryDescription.root.innerHTML;
    if (jobCategoryDescription.getText().trim().length === 0) {
        displayErrorMessage(Lang.get("js.description_required"));
        processingBtn("#createJobCategoryForm", "#jobCategoryBtnSave");
        return false;
    }
    let input = JSON.stringify(editor_content);
    $("#jobCategoryDescriptionValue").val(input.replace(/"/g, ""));

    $.ajax({
        url: route("job-categories.store"),
        type: "POST",
        data: new FormData($(this)[0]),
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createJobCategoryModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#jobCategoryId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createJobCategoryForm", "#jobCategoryBtnSave");
        }
    });
    return false;
});

listenSubmit("#createSkillForm", function() {
    let editor_content = skillDescription.root.innerHTML;
    if (skillDescription.getText().trim().length === 0) {
        displayErrorMessage(Lang.get("js.description_required"));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $("#skill_desc").val(input.replace(/"/g, ""));
    // if (!checkSummerNoteEmpty('#skillDescription',
    //     'Description field is required.')) {
    //     return true;
    // }
    processingBtn("#createSkillForm", "#skillBtnSave", "loading");
    $.ajax({
        url: route("skills.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createSkillModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#SkillId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createSkillForm", "#skillBtnSave");
        }
    });
    return false;
});

listenSubmit("#createJobTagForm", function() {
    let editor_content = jobTagDescription.root.innerHTML;
    if (editor_content.length) {
        if (jobTagDescription.getText().trim().length === 0) {
            displayErrorMessage(
                Lang.get("js.description_required")
            );
            return false;
        }
    } else {
        displayErrorMessage(Lang.get("js.description_required"));
        return false;
    }
    processingBtn("#createJobTagForm", "#jobTagBtnSave", "loading");
    let input = JSON.stringify(editor_content);
    $("#job_tag_desc").val(input.replace(/"/g, ""));
    $.ajax({
        url: route("jobTag.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createJobTagModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.name
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#tagId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createJobTagForm", "#jobTagBtnSave");
        }
    });
    return false;
});

listenSubmit("#createJobShiftForm", function() {
    // if (!checkSummerNoteEmpty('#jobShiftDescription',
    //     'Description field is required.', 1)) {
    //     processingBtn('#addJobShiftForm', '#jobShiftBtnSave');
    //     return true;
    // }
    let editor_content = jobShiftDescription.root.innerHTML;
    if (editor_content.length) {
        if (jobShiftDescription.getText().trim().length === 0) {
            displayErrorMessage(
                Lang.get("js.description_required")
            );
            return false;
        }
    } else {
        displayErrorMessage(Lang.get("js.description_required"));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $("#job_shift_desc").val(input.replace(/"/g, ""));
    processingBtn("#createJobShiftForm", "#jobShiftBtnSave", "loading");
    $.ajax({
        url: route("jobShift.store"),
        type: "post",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createJobShiftModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.shift
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#jobShiftId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createJobShiftForm", "#jobShiftBtnSave");
        }
    });
    return false;
});

listenSubmit("#createSalaryPeriodForm", function() {
    // if (!checkSummerNoteEmpty('#salaryPeriodDescription',
    //     'Description field is required.', 1)) {
    //     return true;
    // }
    let editor_content = salaryPeriodDescription.root.innerHTML;
    if (salaryPeriodDescription.getText().trim().length === 0) {
        displayErrorMessage(Lang.get("js.description_required"));
        return false;
    }
    let input = JSON.stringify(editor_content);
    $("#salary_period_desc").val(input.replace(/"/g, ""));
    processingBtn("#createSalaryPeriodForm", "#salaryPeriodBtnSave", "loading");
    $.ajax({
        url: route("salaryPeriod.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#createSalaryPeriodModal").modal("hide");
                let data = {
                    id: result.data.id,
                    text: result.data.period
                };
                let newOption = new Option(data.text, data.id, false, true);
                $("#salaryPeriodsId")
                    .append(newOption)
                    .trigger("change");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#createSalaryPeriodForm", "#salaryPeriodBtnSave");
        }
    });
    return false;
});

listenClick("#editJobsSaveBtn, #saveDraft", function(e) {
    processingBtn("#editJobForm", $(this), "loading");
    let editor_content2 = editJobDescription.root.innerHTML;
    let input2 = JSON.stringify(editor_content2);
    if (editJobDescription.getText().trim().length === 0) {
        displayErrorMessage(
            Lang.get("js.description_required")
        );
        processingBtn("#editJobForm", "#editJobsSaveBtn");
        return false;
    }
    $("#editJobDescription").val(input2.replace(/"/g, ""));
    let editor_content3 = editResponse.root.innerHTML;
    let input3 = JSON.stringify(editor_content3);
    if (editResponse.getText().trim().length === 0) {
        displayErrorMessage(
            Lang.get("js.key_responsibilities_required")
        );
        processingBtn("#editJobForm", "#editJobsSaveBtn");
        return false;
    }
    $("#edit_responsibilities").val(input3.replace(/"/g, ""));

    if ($("#salaryToErrorMsg").text() !== "") {
        $("#toSalary").focus();
        $("#saveJob,#draftJob").attr("disabled", false);
        processingBtn("#editJobForm", "#editJobsSaveBtn");
        return false;
    }

    $("#editJobForm")[0].submit();
});
