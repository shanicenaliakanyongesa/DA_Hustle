document.addEventListener("turbo:load", loadCustom);

let Handlebars = "";
let source = null;
let jsrender = require("jsrender");
let csrfToken = $('meta[name="csrf-token"]').attr("content");

$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": csrfToken
    }
});

document.addEventListener("turbo:load", initAllComponents);

function initAllComponents() {
    select2initialize();
    refreshCsrfToken();
    alertInitialize();
    modalInputFocus();
    inputFocus();
    IOInitImageComponent();
    IOInitSidebar();
    tooltip();
    inputAutoFocus();
}
$(function() {
    $(document).on("shown.bs.modal", ".modal", function() {
        if ($(this).find("input:text")[0]) {
            $(this)
                .find("input:text")[0]
                .focus();
        }
    });
});

const inputAutoFocus = () => {
    $(
        'input:text:not([readonly="readonly"]):not([name="search"]):not(.front-input)'
    )
        .first()
        .focus();
};
function tooltip() {
    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function alertInitialize() {
    $(".alert")
        .delay(5000)
        .slideUp(300);
}

let firstTime = true;

function refreshCsrfToken() {
    csrfToken = $('meta[name="csrf-token"]').attr("content");

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": csrfToken
        }
    });
}

function select2initialize() {
    $('[data-control="select2"]').each(function() {
        $(this).select2();
    });
}

document.addEventListener("livewire:load", function() {
    window.livewire.hook("message.processed", () => {
        $('[data-control="select2"]').each(function() {
            $(this).select2();
        });
    });
});

document.addEventListener("turbo:before-cache", function() {
    let currentSelect2 = ".select2-hidden-accessible";
    let currentQuill = ".ql-container";
    $(currentSelect2).each(function() {
        $(this).select2("destroy");
    });

    $(currentSelect2).each(function() {
        $(this).select2();
    });

    if ($(currentQuill).length) {
        $(currentQuill).each(function() {
            let quill = "#" + $(this).attr("id");
            resetQuill(quill);
        });
    }
    $("#toast-container").empty();
});

window.resetQuill = function(quill) {
    if ($(quill)[0]) {
        var content = $(quill)
            .find(".ql-editor")
            .html();
        $(quill).html(content);

        $(quill)
            .siblings(".ql-toolbar")
            .remove();
        $(quill + " *[class*='ql-']").removeClass(function(index, class_name) {
            return (class_name.match(/(^|\s)ql-\S+/g) || []).join(" ");
        });

        $(quill + "[class*='ql-']").removeClass(function(index, class_name) {
            return (class_name.match(/(^|\s)ql-\S+/g) || []).join(" ");
        });
    }
};

const modalInputFocus = () => {
    $(function() {
        $(".modal").on("shown.bs.modal", function() {
            $(this)
                .find("input:text")
                .first()
                .focus();
        });
    });
};

const inputFocus = () => {
    $('input:text:not([readonly="readonly"]):not([name="search"])')
        .first()
        .focus();
};

function loadCustom() {
    Handlebars = require("handlebars");
    source = null;
    jsrender = require("jsrender");

    $('input:text:not([readonly="readonly"])')
        .first()
        .focus();

    // infy loader js
    stopLoader();

    // script to active parent menu if sub menu has currently active
    let hasActiveMenu = $(document)
        .find(".nav-item.dropdown ul li")
        .hasClass("active");
    if (hasActiveMenu) {
        $(document)
            .find(".nav-item.dropdown ul li.active")
            .parent("ul")
            .css("display", "block");
        $(document)
            .find(".nav-item.dropdown ul li.active")
            .parent("ul")
            .parent("li")
            .addClass("active");
        $(".dropdown-toggle").dropdown();
    }

    if ($(window).width() > 992) {
        $(".no-hover").on("click", function() {
            $(this).toggleClass("open");
        });
    }
}

window.startLoader = function() {
    $(".infy-loader").show();
};

window.stopLoader = function() {
    $(".infy-loader").hide();
};

$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
});

// $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
//     // $(this).closest('.select2-container').siblings('select:enabled').select2('open');
//     document.querySelector(".select2-container--open .select2-search__field").focus();
// });

// $(document).on('select2:open', () => {
//     document.querySelector('.select2-search__field').focus();
// });
listenWithOutTarget("select2:open", () => {
    let allFound = document.querySelectorAll(
        ".select2-container--open .select2-search__field"
    );
    allFound[allFound.length - 1].focus();
});

listen("focus", ".select2.select2-container", function(e) {
    let isOriginalEvent = e.originalEvent; // don't re-open on closing focus event
    let isSingleSelect = $(this).find(".select2-selection--single").length > 0; // multi-select will pass focus to input

    if (isOriginalEvent && isSingleSelect) {
        $(this)
            .siblings("select:enabled")
            .select2("open");
    }
});

listen("shown.bs.modal", ".modal", function() {
    $(this)
        .find("input:text")
        .first()
        .focus();
});

window.resetModalForm = function(formId, validationBox) {
    $(formId)[0].reset();
    $("select.select2Selector").each(function(index, element) {
        let drpSelector = "#" + $(this).attr("id");
        $(drpSelector).val("");
        $(drpSelector).trigger("change");
    });
    $(validationBox).hide();
};

window.printErrorMessage = function(selector, errorResult) {
    $(selector).show();
    $(selector).html(
        "<i class='fa-solid fa-face-frown me-4'></i>" +
            errorResult.responseJSON.message
    );
    $(selector).removeClass("hide d-none");
};

window.manageAjaxErrors = function(data) {
    var errorDivId =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "editValidationErrorsBox";
    if (data.status == 404) {
        toastr.error({
            title: "Error!",
            message: data.responseJSON.message,
            position: "topRight"
        });
    } else {
        printErrorMessage("#" + errorDivId, data);
    }
};

window.displaySuccessMessage = function(message) {
    toastr.success(message, Lang.get("js.success"));
};

window.displayErrorMessage = function(message) {
    toastr.error(message, Lang.get("js.error"));
};

window.deleteItem = function(url, header) {
    var callFunction =
        arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
    swal({
        title: Lang.get("js.delete") + " !",
        text: Lang.get("js.are_you_sure") + ' "' + header + '" ?',
        buttons: {
            confirm: Lang.get("js.yes_delete"),
            cancel: Lang.get("js.no_cancel")
        },
        reverseButtons: true,
        confirmButtonColor: "#F62947",
        cancelButtonColor: "#ADB5BD",
        icon: "warning"
    }).then(function(willDelete) {
        if (willDelete) {
            deleteItemAjax(url, header, callFunction);
        }
    });
};

function deleteItemAjax(url, header, callFunction = null) {
    $.ajax({
        url: url,
        type: "DELETE",
        dataType: "json",
        success: function(obj) {
            if (obj.success) {
                Livewire.dispatch("refreshDatatable");
                Livewire.dispatch("refresh");
                Livewire.dispatch('resetPage');
            }
            swal({
                icon: "success",
                title: Lang.get("js.deleted") + " !",
                text: header + " " + Lang.get("js.has_been_deleted"),
                buttons: {
                    confirm: Lang.get("js.ok")
                },
                reverseButtons: true,
                confirmButtonColor: "#F62947",
                timer: 2000
            });
            if (callFunction) {
                eval(callFunction);
            }
        },
        error: function(data) {
            swal({
                title: Lang.get("js.error"),
                icon: "error",
                text: data.responseJSON.message,
                type: "error",
                buttons: {
                    confirm: Lang.get("js.ok")
                },
                reverseButtons: true,
                confirmButtonColor: "#F62947",
                timer: 4000
            });
        }
    });
}

window.format = function(dateTime) {
    var format =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "DD-MMM-YYYY";
    return moment(dateTime).format(format);
};

window.processingBtn = function(selecter, btnId, state = null) {
    let loadingButton = $(selecter).find(btnId);
    if (state == "loading") {
        loadingButton
            .data("original-text", loadingButton.html())
            .html(loadingButton.data("loading-text"))
            .prop("disabled", true);
    } else {
        loadingButton
            .html(loadingButton.data("original-text"))
            .prop("disabled", false);
    }
};
window.setAdminBtnLoader = function(btnLoader) {
    if (btnLoader.attr("data-loading-text")) {
        btnLoader
            .html(btnLoader.attr("data-loading-text"))
            .prop("disabled", true);
        btnLoader.removeAttr("data-loading-text");
        return;
    }
    btnLoader.attr("data-old-text", btnLoader.text());
    btnLoader.html(btnLoader.attr("data-new-text")).prop("disabled", false);
};

window.prepareTemplateRender = function(templateSelector, data) {
    let template = jsrender.templates(templateSelector);
    return template.render(data);
};

window.isValidFile = function(inputSelector, validationMessageSelector) {
    let ext = $(inputSelector)
        .val()
        .split(".")
        .pop()
        .toLowerCase();
    if ($.inArray(ext, ["gif", "png", "jpg", "jpeg"]) == -1) {
        $(inputSelector).val("");
        $(validationMessageSelector).removeClass("d-none");
        $(validationMessageSelector)
            .html("The image must be a file of type: jpeg, jpg, png.")
            .show();
        $(validationMessageSelector)
            .delay(5000)
            .slideUp(300);

        return false;
    }
    $(validationMessageSelector).hide();
    return true;
};

window.displayPhoto = function(input, selector) {
    let displayPreview = true;
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                $(selector).attr("src", e.target.result);
                displayPreview = true;
            };
        };
        if (displayPreview) {
            reader.readAsDataURL(input.files[0]);
            $(selector).show();
        }
    }
};
window.removeCommas = function(str) {
    return str.replace(/,/g, "");
};

// window.DatetimepickerDefaults = function (opts) {
//     return $.extend({}, {
//         sideBySide: true,
//         ignoreReadonly: true,
//         icons: {
//             close: 'fa fa-times',
//             time: 'fa fa-clock-o',
//             date: 'fa fa-calendar',
//             up: 'fa fa-arrow-up',
//             down: 'fa fa-arrow-down',
//             previous: 'fa fa-chevron-left',
//             next: 'fa fa-chevron-right',
//             today: 'fa fa-clock-o',
//             clear: 'fa fa-trash-o',
//         },
//     }, opts);
// };

window.isEmpty = value => {
    return value === undefined || value === null || value === "";
};

window.screenLock = function() {
    $("#overlay-screen-lock").show();
    $("body").css({ "pointer-events": "none", opacity: "0.6" });
};

window.screenUnLock = function() {
    $("body").css({ "pointer-events": "auto", opacity: "1" });
    $("#overlay-screen-lock").hide();
};

window.urlValidation = function(value, regex) {
    let urlCheck = value == "" ? true : value.match(regex) ? true : false;
    if (!urlCheck) {
        return false;
    }

    return true;
};

listenClick(".languageSelection", function() {
    let languageName = $(this).data("prefix-value");
    refreshCsrfToken();
    $.ajax({
        type: "POST",
        url: "/change-language",
        data: { languageName: languageName },
        success: function() {
            location.reload();
        }
    });
});

listenClick("#readNotification", function(e) {
    e.preventDefault();
    let notificationId = $(this).data("id");
    let notification = $(this);
    $.ajax({
        type: "POST",
        url: route("read-notification", notificationId),
        data: { notificationId: notificationId },
        success: function() {
            displaySuccessMessage(Lang.get("js.notification_read"));
            notification.remove();
            let notificationCounter = document.getElementsByClassName(
                "readNotification"
            ).length;
            $("#counter").text(notificationCounter);
            if (notificationCounter == 0) {
                $(".empty-state").removeClass("d-none");
                $(".notification-count").addClass("d-none");
                $("#counter").text(notificationCounter);
                $("#readAllNotification")
                    .parents("div")
                    .first()
                    .remove();
            }
        },
        error: function(error) {
            manageAjaxErrors(error);
        }
    });
});

listenClick("#readAllNotification", function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: route("read-all-notification"),
        success: function() {
            displaySuccessMessage(Lang.get("js.all_notification_read"));
            $(".readNotification").remove();
            let notificationCounter = document.getElementsByClassName(
                "notification"
            ).length;
            $(".empty-state").removeClass("d-none");
            $(".notification-count").addClass("d-none");
            $("#counter").text(notificationCounter);
            $("#readAllNotification")
                .parents("div")
                .first()
                .remove();
        },
        error: function(error) {
            manageAjaxErrors(error);
        }
    });
});

listenClick("#register", function(e) {
    e.preventDefault();
    $(".open #dropdownLanguage").trigger("click");
    $(".open #dropdownLogin").trigger("click");
});

listenClick("#language", function(e) {
    e.preventDefault();
    $(".open #dropdownRegister").trigger("click");
    $(".open #dropdownLogin").trigger("click");
});

listenClick("#login", function(e) {
    e.preventDefault();
    $(".open #dropdownRegister").trigger("click");
    $(".open #dropdownLanguage").trigger("click");
});

window.checkSummerNoteEmpty = function(
    selectorElement,
    errorMessage,
    isRequired = 0
) {
    if ($(selectorElement).summernote("isEmpty") && isRequired === 1) {
        displayErrorMessage(errorMessage);
        $(document)
            .find(".note-editable")
            .html("<p><br></p>");
        return false;
    } else if (!$(selectorElement).summernote("isEmpty")) {
        $(document)
            .find(".note-editable")
            .contents()
            .each(function() {
                if (this.nodeType === 3) {
                    // text node
                    this.textContent = this.textContent.replace(/\u00A0/g, "");
                }
            });
        if (
            $(document)
                .find(".note-editable")
                .text()
                .trim().length == 0
        ) {
            $(document)
                .find(".note-editable")
                .html("<p><br></p>");
            $(selectorElement).val(null);
            if (isRequired === 1) {
                displayErrorMessage(errorMessage);

                return false;
            }
        }
    } else if (
        $(document)
            .find(".note-editable")
            .html() == "<p><br></p>"
    ) {
        $(selectorElement).summernote("code", "");
    }

    return true;
};

window.preparedTemplate = function() {
    let source = $("#actionTemplate").html();
    window.preparedTemplate = Handlebars.compile(source);
};

window.ajaxCallInProgress = function() {
    ajaxCallIsRunning = true;
};

window.ajaxCallCompleted = function() {
    ajaxCallIsRunning = false;
};

window.avoidSpace = function(event) {
    let k = event ? event.which : window.event.keyCode;
    if (k == 32 && event.path[0].value.length <= 0) {
        return false;
    }
};
window.isOnlyContainWhiteSpace = function(value) {
    return value.trim().replace(/ \r\n\t/g, "") === "";
};

let defaultAvatarImageUrl = "asset('assets/img/infyom-logo.png')";
window.defaultImagePreview = function(imagePreviewSelector, id = null) {
    if (id == 1) {
        $(imagePreviewSelector).css(
            "background-image",
            'url("' + defaultAvatarImageUrl + '")'
        );
    } else {
        $(imagePreviewSelector).css(
            "background-image",
            'url("' + $("#defaultDocumentImageUrl").val() + '")'
        );
    }
};

window.isEmpty = (value) => {
    return value === undefined || value === null || value === '';
};

$(document).on('click', '.change-type', function (e) {
    let inputField = $(this).siblings()
    let oldType = inputField.attr('type')
    let type = !isEmpty(oldType) ? oldType : 'password'
    if (type == 'password') {
        $(this).children().addClass('fa-eye')
        $(this).children().removeClass('fa-eye-slash')
        inputField.attr('type', 'text')
    } else {
        $(this).children().removeClass('fa-eye')
        $(this).children().addClass('fa-eye-slash')
        inputField.attr('type', 'password')
    }
})
