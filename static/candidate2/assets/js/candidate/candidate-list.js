document.addEventListener("turbo:load", loadCandidateData);

function loadCandidateData() {
    const candidateFilterStatus = "#filter_status";
    const immediateAvailable = "#immediateAvailable";
    const jobSkills = "#jobSkills";
    if (!$("#indexCandidateData").length) {
        return;
    }
    $(candidateFilterStatus).select2({
        width: "100%"
    });

    $(immediateAvailable).select2({
        width: "100%"
    });

    $(jobSkills).select2({
        width: "100%"
    });

    $(candidateFilterStatus).on("change", function(e) {
        var data = $("#filter_status").select2("val");
        $(tableName)
            .DataTable()
            .ajax.reload(null, true);
    });

    $(immediateAvailable).on("change", function(e) {
        var data = $("#immediateAvailable").select2("val");
        $(tableName)
            .DataTable()
            .ajax.reload(null, true);
    });

    $(jobSkills).on("change", function(e) {
        var data = $("#jobSkills").select2("val");
        $(tableName)
            .DataTable()
            .ajax.reload(null, true);
    });

    listenClick("#resetFilter", function() {
        $("#filter_status")
            .val("")
            .trigger("change");
        $("#immediateAvailable")
            .val("")
            .trigger("change");
        $("#jobSkills")
            .val("")
            .trigger("change");
    });
}

listenChange(".isCandidateActive", function(event) {
    let candidateId = $(this).attr("data-id");
    $.ajax({
        url: route("candidate.changeStatus", candidateId),
        method: "post",
        cache: false,
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch("refreshDatatable");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        }
    });
});

listenClick(".send-email-verification", function(event) {
    let candidateId = $(event.currentTarget).attr("data-id");
    let isDisabled = $(this);
    isDisabled.addClass("disabled");
    $.ajax({
        url: route("candidate.resendEmailVerification", candidateId),
        type: "post",
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch("refreshDatatable");
                isDisabled.removeClass("disabled");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        }
    });
});

listenClick(".candidates-delete-btn", function(event) {
    let candidateId = $(this).attr("data-id");
    deleteItem(
        route("candidates.destroy", candidateId),
        Lang.get("js.candidate")
    );
});

listenChange(".is-candidate-email-verified", function(event) {
    if ($(this).is(":checked")) {
        let candidateId = $(event.currentTarget).data("id");
        $.ajax({
            url: route("candidate.changeIsEmailVerified", candidateId),
            method: "post",
            cache: false,
            success: function(result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    Livewire.dispatch("refreshDatatable");
                }
            },
            error: function(result) {
                displayErrorMessage(result.responseJSON.message);
            }
        });
        $(this).attr("disabled", true);
    } else {
        let candidateId = $(event.currentTarget).data("id");
        $.ajax({
            url: route("candidates.resend.email", candidateId),
            method: "post",
            cache: false,
            success: function(result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    Livewire.dispatch("refreshDatatable");
                }
            },
            error: function(result) {
                displayErrorMessage(result.responseJSON.message);
            }
        });
    }
});

listenClick("#candidateFilters", function() {
    $("#candidateFiltersForm").toggleClass("d-block d-none");
});

listenClick("#action_dropdown", function() {
    $("#candidateFiltersForm")
        .removeClass("d-block")
        .addClass("d-none");
});

listenClick("#reset-filter", function() {
    $("#jobSkills,#immediateAvailable,#filter_status")
        .val("")
        .change();
});

listenClick(function(event) {
    if (
        $(event.target).closest("#candidateFilters,#candidateFiltersForm")
            .length === 0
    ) {
        $("#candidateFiltersForm")
            .removeClass("d-block")
            .addClass("d-none");
    }
});

listenChange("#candidateStatus", function() {
    Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
});
listenChange("#immediatAvailable", function() {
         Livewire.dispatch("changeImmediateFilter", { immediate: $(this).val() });
     });
listenClick("#candidate-ResetFilter", function() {
         $("#candidateStatus,#immediatAvailable").val(2).change();
         hideDropdownManually($('#candidateFilterBtn'), $('.dropdown-menu'));
     });
function hideDropdownManually(button, menu) {
         button.dropdown('toggle');
     }
