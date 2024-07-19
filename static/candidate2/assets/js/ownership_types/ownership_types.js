document.addEventListener('turbo:load', loadOwnershipTypesData);

function loadOwnershipTypesData() {

    if (!$('#indexOwnershipTypeData').length) {
        return;
    }

    if ($('#ownershipDescription').length) {
        window.ownershipDescriptionQuill = new Quill('#ownershipDescription', {
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

    if($('#editOwnershipDescription').length) {
        window.editOwnershipDescriptionQuill = new Quill(
            '#editOwnershipDescription', {
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

    document.addEventListener('delete', function () {
        swal({
            title: Lang.get('messages.common.deleted') + ' !',
            text: Lang.get('js.ownership_type') + Lang.get('js.has_been_deleted'),
            type: 'success',
            confirmButtonColor: '#6777ef',
            timer: 2000,
        });
    });

    listenClick('.ownership-type-edit-btn', function (event) {
        let editOwnerShipTypeId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('ownerShipType.edit', editOwnerShipTypeId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.name;
                    $('#ownerShipTypeId').val(result.data.id);
                    $('#editName').val(element.value);
                    element.innerHTML = result.data.description;
                    editOwnershipDescriptionQuill.root.innerHTML = element.value;
                    $('#editOwnershipTypeModal').modal('show');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addOwnershipModal', function () {
        resetModalForm('#addOwnershipForm', '#ownershipValidationErrorsBox');
        ownershipDescriptionQuill.setContents([{insert: ''}]);
        editOwnershipDescriptionQuill.setContents([{insert: ''}]);
    })

    listenHiddenBsModal('#editOwnershipTypeModal', function () {
        resetModalForm('#editOwnerShipForm', '#editValidationErrorsBox');
    })

}

listenClick('.addOwnerShipTypeModal', function () {
    $('#addOwnershipModal').appendTo('body').modal('show');
})

listenClick('.ownership-type-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let showOwnerShipTypeId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('ownership-types.show', showOwnerShipTypeId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showOwnershipName').html('');
                $('#showOwnershipDescription').html('');
                $('#showOwnershipName').append(result.data.name);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description)
                    ? result.data.description
                    : 'N/A');
                $('#showOwnershipDescription').append(element.value);
                $('#showOwnershipModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.ownership-type-delete-btn', function (event) {
    let deleteOwnerShipTypeId = $(event.currentTarget).attr('data-id');
    deleteItem(route('ownerShipType.destroy', deleteOwnerShipTypeId), Lang.get('js.ownership_type'));
})

listenSubmit('#addOwnershipForm', function (e) {
    e.preventDefault();
    let addOwnershipEditorContent = ownershipDescriptionQuill.root.innerHTML;

    if (ownershipDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(addOwnershipEditorContent);
    $('#ownership_desc').val(input.replace(/"/g, ""));
    processingBtn('#addOwnershipForm', '#ownershipBtnSave', 'loading');
    $.ajax({
        url: route('ownerShipType.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addOwnershipModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addOwnershipForm', '#ownershipBtnSave');
        },
    });
})

listenSubmit('#editOwnerShipForm', function (event) {
    event.preventDefault();
    let editOwnershipEditorContent = editOwnershipDescriptionQuill.root.innerHTML;

    if (editOwnershipDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editOwnershipEditorContent);
    $('#edit_ownership_desc').val(input.replace(/"/g, ""));
    processingBtn('#editOwnerShipForm', '#btnEditSave', 'loading');
    const updateOwnershipId = $('#ownerShipTypeId').val();
    $.ajax({
        url: route('ownerShipType.update', updateOwnershipId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editOwnershipTypeModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editOwnerShipForm', '#btnEditSave');
        },
    });
})
