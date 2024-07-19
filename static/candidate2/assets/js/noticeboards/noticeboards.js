document.addEventListener('turbo:load', loadNoticeboardData);

function loadNoticeboardData () {
    if (!$('#addNoticeboardDescriptionQuillData').length &&
        !$('#editNoticeboardDescriptionQuillData').length) {
        return;
    }

    if ($('#addNoticeboardDescriptionQuillData').length) {
        window.addNoticeboardDescriptionQuill = new Quill(
            '#addNoticeboardDescriptionQuillData', {
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
                placeholder: Lang.get('js.description'),
                theme: 'snow', // or 'bubble'
            });

        addNoticeboardDescriptionQuill.on('text-change',
            function (delta, oldDelta, source) {
                if (addNoticeboardDescriptionQuill.getText().trim().length ===
                    0) {
                    addNoticeboardDescriptionQuill.setContents(
                        [{ insert: '' }]);
                }
            });
    }
    if ($('#editNoticeboardDescriptionQuillData').length) {
        window.editNoticeboardDescriptionQuill = new Quill(
            '#editNoticeboardDescriptionQuillData', {
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
                placeholder: 'Description',
                theme: 'snow', // or 'bubble'
            });

        editNoticeboardDescriptionQuill.on('text-change',
            function (delta, oldDelta, source) {
                if (editNoticeboardDescriptionQuill.getText().trim().length ===
                    0) {
                    editNoticeboardDescriptionQuill.setContents(
                        [{ insert: '' }]);
                }
            });
    }

    listenClick('.board-edit-btn', function (event) {
        // if (ajaxCallIsRunning) {
//            return;
//        }
        ajaxCallInProgress();
        let noticeboardId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('noticeboards.edit', noticeboardId),
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    let element = document.createElement('textarea');
                    element.innerHTML = result.data.title;
                    $('#noticeboardId').val(result.data.id);
                    $('#editTitle').val(element.value);
                    element.innerHTML = result.data.description;
                    editNoticeboardDescriptionQuill.root.innerHTML = element.value;
                    (result.data.is_active == 1) ? $('#editIsActive').
                    prop('checked', true) : $('#editIsActive').
                    prop('checked', false);
                    $('#editBoardModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    })

    listenHiddenBsModal('#addNoticeboardModal', function () {
        resetModalForm('#addNoticeboardForm', '#validationErrorsBox');
        addNoticeboardDescriptionQuill.setContents([{ insert: '' }]);
    })
}

listenClick('.addNoticeboardButton', function () {
    $('#addNoticeboardModal').appendTo('body').modal('show');
})

listenClick('.noticeboard-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    ajaxCallInProgress();
    let showNoticeboardId = $(this).attr('data-id');
    $.ajax({
        url: route('noticeboards.show', showNoticeboardId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showNoticeboardTitle').html('');
                $('#showNoticeboardDescription').html('');
                $('#showNoticeboardTitle').append(result.data.title);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.description))
                    ? result.data.description
                    : 'N/A';
                $('#showNoticeboardDescription').append(element.value);
                (result.data.is_active === 1)
                    ? $('#showIsActive').html('Active')
                    : $('#showIsActive').html('Deactive');
                $('#showNoticeboardModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick('.board-delete-btn', function (event) {
    let deleteNoticeboardId = $(event.currentTarget).attr('data-id');
    deleteItem(route('noticeboards.destroy', deleteNoticeboardId),
        Lang.get('js.noticeboard'));
})

listenChange('.isActiveNoticeboard', function (event) {
    let isActiveNoticeboardId = $(this).attr('data-id');
    $.ajax({
        url: route('noticeboard.status', isActiveNoticeboardId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
            }
        },
    });
})

listenHiddenBsModal('#editBoardModal', function () {
    resetModalForm('#editBoardForm', '#editValidationErrorsBox');
})

listenSubmit('#addNoticeboardForm', function (e) {
    e.preventDefault();
    let element = document.createElement('textarea');
    let addNoticeboardEditorContent = addNoticeboardDescriptionQuill.root.innerHTML;
    element.innerHTML = addNoticeboardEditorContent;

    if (addNoticeboardDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage('The description is required.');
        return false;
    }

    let input = JSON.stringify(addNoticeboardEditorContent);
    $('#termData').val(input.replace(/"/g, ''));

    processingBtn('#addNoticeboardForm', '#noticeboardSaveBtn', 'loading');
    $.ajax({
        url: route('noticeboards.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addNoticeboardModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addNoticeboardForm', '#noticeboardSaveBtn');
        },
    });
})

listenSubmit('#editBoardForm', function (event) {
    event.preventDefault();
    let editNoticeboardEditorContent = editNoticeboardDescriptionQuill.root.innerHTML;

    if (editNoticeboardDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage(Lang.get('js.description_required'));
        return false;
    }
    let input = JSON.stringify(editNoticeboardEditorContent);
    $('#editBoardDescription').val(input.replace(/"/g, ''));
    processingBtn('#editBoardForm', '#btnEditSave', 'loading');
    const updateNoticeBoardId = $('#noticeboardId').val();
    $.ajax({
        url: route('noticeboards.update', updateNoticeBoardId),
        type: 'put',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editBoardModal').modal('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editBoardForm', '#btnEditSave');
        },
    });
})
