document.addEventListener('turbo:load', loadGoogleRecaptchaData);

function loadGoogleRecaptchaData() {

}

window.checkGoogleReCaptcha = function checkGoogleReCaptcha(registerType) {
    let response = grecaptcha.getResponse();
    if (response.length == 0) {
        displayErrorMessage(Lang.get('js.verify_captcha'));
        processingBtn(
            registerType == 1
                ? '#addCandidateNewForm'
                : '#addEmployerNewForm',
            registerType == 1 ? '#btnCandidateSave' : '#btnEmployerSave');

        return false;
    }

    return true;
};
