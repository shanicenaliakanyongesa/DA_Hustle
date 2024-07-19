document.addEventListener('turbo:load', loadFrontSettings)

function loadFrontSettings () {
    if ($('#advertiseImage').length) {
        $('#currency').select2({
            width: '100%',
        });
    }
    listenChange('#advertiseImage', function () {
        $('#validationErrorsBox').addClass('d-none');
        if (isValidAdvertise($(this), '#validationErrorsBox')) {
            displayAdvertiseImage(this, '#advertisePreview');
        }
        $('#validationErrorsBox').delay(5000).slideUp(300);
    });

    function displayAdvertiseImage (input, selector) {
        let displayPreview = true;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    if ((image.height != 450 || image.width != 630)) {
                        $('#advertiseImage').val('');
                        $('#validationErrorsBox').removeClass('d-none');
                        $('#validationErrorsBox').
                            html('The image must be of pixel 450 x 630').
                            show();
                        return false;
                    }
                    $(selector).attr('src', e.target.result);
                    displayPreview = true;
                };
            };
            if (displayPreview) {
                reader.readAsDataURL(input.files[0]);
                $(selector).show();
            }
        }

    };

    function isValidAdvertise (
        inputSelector, validationMessageSelector) {
        let ext = $(inputSelector).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['jpg', 'jpeg', 'png']) == -1) {
            $(inputSelector).val('');
            $(validationMessageSelector).removeClass('d-none');
            $(validationMessageSelector).
                html('The image must be a file of type: jpg, jpeg, png.').
                show();
            return false;
        }
        $(validationMessageSelector).hide();
        return true;

    };

    listenChange('.featured-job-active', function () {
        let featuredJobId;
        if ($(this).prop('checked') == true) {
            featuredJobId = 1;
        } else {
            featuredJobId = 0;
        }
        changeFeaturedJob(featuredJobId);
    });

    function changeFeaturedJob (featuredJobId) {
        $.ajax({
            url: route('change-is-job-active', featuredJobId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                }
            },
            error: function (result) {
                displayErrorMessage(result.message);
            },
        });
    };

    listenChange('.featured-company-active', function () {
        let featuredCompanyId;
        if ($(this).prop('checked') == true) {
            featuredCompanyId = 1;
        } else {
            featuredCompanyId = 0;
        }
        changeFeaturedCompany(featuredCompanyId);
    });

    function changeFeaturedCompany (featuredCompanyId) {
        $.ajax({
            url: route('change-is-company-active', featuredCompanyId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                }
            },
            error: function (result) {
                displayErrorMessage(result.message);
            },
        });
    };

    listenChange('.job-country-active', function () {
        let jobCountryId;
        if ($(this).prop('checked') == true) {
            jobCountryId = 1;
        } else {
            jobCountryId = 0;
        }
        changeJobCountry(jobCountryId);
    });

    function changeJobCountry (jobCountryId) {
        $.ajax({
            url: route('change-is-job-country-active', jobCountryId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                }
            },
            error: function (result) {
                displayErrorMessage(result.message);
            },
        });
    };
}
