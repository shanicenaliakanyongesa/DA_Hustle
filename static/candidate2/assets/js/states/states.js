document.addEventListener("turbo:load", loadStateData);

function loadStateData() {
    if (!$("#indexStateData").length) {
        return;
    }
    $("#filter_country").select2({
        width: "100%",
        placeholder: Lang.get("js.select_country")
    });

    $("#countryID").select2({
        width: "100%",
        dropdownParent: $("#addStateModal")
    });

    $("#editCountryId").select2({
        width: "100%",
        dropdownParent: $("#editStateModal")
    });

    listenClick(".addStateModal", function() {
        $("#addStateModal")
            .appendTo("body")
            .modal("show");
    });

    listenClick(".state-edit-btn", function(event) {
        let stateId = $(event.currentTarget).attr("data-id");
        $.ajax({
            url: route("states.edit", stateId),
            type: "GET",
            success: function(result) {
                if (result.success) {
                    $("#stateId").val(result.data.id);
                    $("#editName").val(result.data.name);
                    $("#editCountryId")
                        .val(result.data.country_id)
                        .trigger("change");
                    $("#editStateModal")
                        .appendTo("body")
                        .modal("show");
                }
            },
            error: function(result) {
                displayErrorMessage(result.responseJSON.message);
            }
        });
    });

    listenClick(".state-delete-btn", function(event) {
        let stateDeleteId = $(event.currentTarget).attr("data-id");
        deleteItem(
            route("states.destroy", stateDeleteId),
            Lang.get("js.state")
        );
    });

    listenHiddenBsModal("#addStateModal", function() {
        $("#countryID")
            .val("")
            .trigger("change");
        resetModalForm("#addStateForm", "#StateValidationErrorsBox");
    });

    listenHiddenBsModal("#editStateModal", function() {
        resetModalForm("#editStateForm", "#editValidationErrorsBox");
    });

    listenClick("#resetFilter", function() {
        $("#filter_country")
            .val("")
            .trigger("change");
    });
}

listenSubmit("#addStateForm", function(e) {
    e.preventDefault();
    processingBtn("#addStateForm", "#stateBtnSave", "loading");
    $.ajax({
        url: route("states.store"),
        type: "POST",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#addStateModal").modal("hide");
                Livewire.dispatch("refreshDatatable");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#addStateForm", "#stateBtnSave");
        }
    });
});

listenSubmit("#editStateForm", function(event) {
    event.preventDefault();
    processingBtn("#editStateForm", "#editStateBtnSave", "loading");
    const stateUpdateId = $("#stateId").val();
    $.ajax({
        url: route("states.update", stateUpdateId),
        type: "put",
        data: $(this).serialize(),
        success: function(result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $("#editStateModal").modal("hide");
                Livewire.dispatch("refreshDatatable");
            }
        },
        error: function(result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function() {
            processingBtn("#editStateForm", "#editStateBtnSave");
        }
    });
});

listenChange("#country", function() {
    Livewire.dispatch("changeCountryFilter", { country: $(this).val() });
});

listenClick("#country-ResetFilter", function() {
    $("#country").val(0).trigger('change');
    hideDropdownManually($('#countryFilterBtn'), $('.dropdown-menu'));
});
function hideDropdownManually(button, menu) {
    button.dropdown('toggle');
}
