document.addEventListener('turbo:load', loadPrivacyPolicy);

function loadPrivacyPolicy () {
    if(!$('#addTermConditionDescriptionQuillData').length) {
        return
    }

    let termConditionData = $('#termConditionData').val();
    let privacyPolicyData = $('#privacyPolicyData').val();
    // $('#descriptionTerms').summernote({
    //     minHeight: 200,
    //     height: 200,
    //     toolbar: [
    //         // [groupName, [list of button]]
    //         ['style', ['bold', 'italic', 'underline', 'clear']],
    //         ['font', ['strikethrough']],
    //         ['para', ['paragraph']],
    //     ],
    // });

    window.addTermConditionDescriptionQuill = new Quill('#addTermConditionDescriptionQuillData', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['clean']
            ],
            keyboard: {
                bindings: {
                    tab: 'disabled',
                }
            }
        },
        placeholder: Lang.get('js.terms_conditions'),
        theme: 'snow', // or 'bubble'
    });
    addTermConditionDescriptionQuill.on('text-change', function (delta, oldDelta, source) {
        if (addTermConditionDescriptionQuill.getText().trim().length === 0) {
            addTermConditionDescriptionQuill.setContents([{ insert: '' }]);
        }
    });

    window.addPrivacyPolicyDescriptionQuill = new Quill('#addPrivacyPolicyDescriptionQuillData', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['clean']
            ],
            keyboard: {
                bindings: {
                    tab: 'disabled',
                }
            }
        },
        placeholder: Lang.get('js.privacy_policy'),
        theme: 'snow', // or 'bubble'
    });
    addPrivacyPolicyDescriptionQuill.on('text-change', function (delta, oldDelta, source) {
        if (addPrivacyPolicyDescriptionQuill.getText().trim().length === 0) {
            addPrivacyPolicyDescriptionQuill.setContents([{ insert: '' }]);
        }
    });

    let element = document.createElement('textarea');
    element.innerHTML = termConditionData;
    addTermConditionDescriptionQuill.root.innerHTML = element.value;

    element.innerHTML = privacyPolicyData;
    addPrivacyPolicyDescriptionQuill.root.innerHTML = element.value;

    // $('#privacyPolicy').submit(function (e) {
    //     if (!checkSummerNoteEmpty('#description',
    //         'Privacy Policy field is required.', 1)) {
    //         e.preventDefault();
    //
    //         return true;
    //     }
    // });
    //
    // $('#termsConditions').submit(function (e) {
    //     if (!checkSummerNoteEmpty('#description',
    //         'Terms Conditions field is required.', 1)) {
    //         e.preventDefault();
    //
    //         return true;
    //     }
    // });

    // $('#policyTerms').submit(function (e) {
    //     if (!checkSummerNoteEmpty('#descriptionPolicy',
    //         'Privacy Policy field is required.', 1)) {
    //         e.preventDefault();
    //
    //         return true;
    //     }
    //
    //     if (!checkSummerNoteEmpty('#descriptionTerms',
    //         'Terms Conditions field is required.', 1)) {
    //         e.preventDefault();
    //
    //         return true;
    //     }
    // });
}

listenSubmit('#policyTerms', function () {
    let element = document.createElement('textarea');
    let addTermConditionsEditorContent = addTermConditionDescriptionQuill.root.innerHTML;
    element.innerHTML = addTermConditionsEditorContent;
    let addPrivacyEditorContent = addPrivacyPolicyDescriptionQuill.root.innerHTML;

    if (addTermConditionDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage('The Terms & Conditions is required.');
        return false;
    }

    if (addPrivacyPolicyDescriptionQuill.getText().trim().length === 0) {
        displayErrorMessage('The Privacy Policy is required.');
        return false;
    }
    let dataTerm = JSON.stringify(addTermConditionsEditorContent);
    let dataPrivacy = JSON.stringify(addPrivacyEditorContent);
    $('#termData').val(dataTerm.replace(/"/g, ''));
    $('#privacyData').val(dataPrivacy.replace(/"/g, ''));
});
