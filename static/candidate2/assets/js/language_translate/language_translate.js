document.addEventListener('turbo:load', loadLanguageTranslateData);

function loadLanguageTranslateData () {
    if ($('.translateLanguage') && $('#subFolderFiles').length) {
        $('.translateLanguage,#subFolderFiles').select2();
    }

    let lang = $('#languageName').val();
    let file = $('#fileName').val();
    let url = 'admin/translation-manager?';
    listenChange('.translateLanguage', function () {
        lang = $(this).val();
        if (lang == '') {
            window.location.href = url;
        } else {
            window.location.href = url + 'name=' + lang + '&file=' + file;
        }
    });

    listenChange('#subFolderFiles', function () {
        file = $(this).val();
        if (file == '') {
            location.href = url;
        } else {
            window.location.href = url + 'name=' + lang + '&file=' + file;
        }
    });
}

listenClick('.addLanguageModal', function () {
    $('#addLanguageTranslateModal').appendTo('body').modal('show');
});

listenSubmit('#addLanguageTranslateForm', function (e) {
    e.preventDefault();
    processingBtn('#addLanguageTranslateForm', '#langSaveBtn', 'loading');
    $.ajax({
        url: route('translation-manager.store'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#addLanguageTranslateModal').modal('hide');
                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addLanguageTranslateForm', '#langSaveBtn');
        },
    });
});

listenHiddenBsModal('#addLanguageTranslateModal', function () {
    resetModalForm('#addLanguageTranslateForm', '#validationErrorsBox');
});
