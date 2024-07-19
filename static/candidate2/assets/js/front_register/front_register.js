document.addEventListener('turbo:load', loadFrontRegisterData);

function loadFrontRegisterData () {
    if (!$('#addEmployerNewForm').length && !$('#addCandidateNewForm').length) {
        return;
    }

    $('#loginTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
// store the currently selected tab in the hash value
    $('ul.nav-tabs > li > a').on('shown.bs.tab', function (e) {
        var id = $(e.target).attr('href').substr(1);
        window.location.hash = id;
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
// on load of the page: switch to the currently selected tab
    var hash = window.location.hash;
    // $('#loginTab a[href="' + hash + '"]').tab('show');

    $('#candidate').on('hidden.bs.tab', function () {
        resetModalForm('#candidateForm', '#candidateValidationErrBox');
    });
    $('#employer').on('hidden.bs.tab', function () {
        resetModalForm('#employeeForm', '#employerValidationErrBox');
    });
}

listenSubmit('#addCandidateNewForm', function (e) {
    e.preventDefault();
    // if ($('#isGoogleReCaptchaEnabled').val()) {
    //     if (!checkGoogleReCaptcha(1)) {
    //         return true;
    //     }
    // }
    processingBtn('#addCandidateNewForm', '#btnCandidateSave', 'loading');

    $.ajax({
        url: route('front.save.register'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                setTimeout(function () {
                    Turbo.visit(route('front.candidate.login'))
                }, 1500);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addCandidateNewForm', '#btnCandidateSave');
        },
    });
});

listenSubmit('#addEmployerNewForm', function (e) {
    e.preventDefault();
    processingBtn('#addEmployerNewForm', '#btnEmployerSave', 'loading');
    //
    // if ($('#isGoogleReCaptchaEnabled').val()) {
    //     if (!checkGoogleReCaptcha(2))
    //         return true;
    // }

    $.ajax({
        url: route('front.save.register'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                setTimeout(function () {
                    Turbo.visit(route('front.employee.login'))
                }, 1500);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#addEmployerNewForm', '#btnEmployerSave');
        },
    });
});
