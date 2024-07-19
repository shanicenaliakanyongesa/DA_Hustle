document.addEventListener('turbo:load', loadFrontCompanyDetailsData);

function loadFrontCompanyDetailsData () {
    if (!$('#isCompanyAddedToFavourite').length) {
        return;
    }
    let isCompanyAddedToFavourite = $('#isCompanyAddedToFavourite').val();
    let followText = $('#followText').val();
    let unfollowText = $('#unfollowText').val();

    if ($('.favouriteText').length) {
        if(isCompanyAddedToFavourite)
        {
            $('.favouriteIcon').addClass('fa fa-star')
            $('.favouriteText').text(unfollowText)
        } else {
            $('.favouriteIcon').addClass('fa-regular fa-star')
            $('.favouriteText').text(followText);
        }
    }

    $('#addToFavourite').on('click', function () {
        let userId = $(this).data('favorite-user-id');
        let companyId = $(this).data('favorite-company_id');

        $.ajax({
            url: route('save.favourite.company'),
            type: 'POST',
            data: {
                '_token': $('meta[name="csrf-token"]').attr('content'),
                'userId': userId,
                'companyId': companyId,
            },
            success: function (result) {
                if (result.success) {
                    if(result.data) {
                        $('.favouriteIcon').removeClass('fa-regular fa-star')
                        $('.favouriteIcon').addClass('fa fa-star')
                        $('.favouriteText').text(unfollowText)
                    } else{
                        $('.favouriteIcon').removeClass('fa fa-star')
                        $('.favouriteIcon').addClass('fa-regular fa-star')
                        $('.favouriteText').text(followText);
                    }
                    displaySuccessMessage(result.message);
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });
}

listenSubmit('#reportToCompany', function (e) {
    e.preventDefault();
    // processingBtn('#reportToCompany', '#btnSave', 'loading');
    $.ajax({
        url: route('report.to.company'),
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#reportToCompanyModal').modal('hide');
                // $(".reportToCompanyBtn").attr("style", "pointer-events:none;");
                $(".reportToCompanyBtn").attr('disabled', true);
                $(".reportToCompanyBtn").text(Lang.get('js.already_reported'));
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        // complete: function () {
        //     processingBtn('#reportToCompany', '#btnSave');
        // },
    });
});

listenHiddenBsModal('#reportToCompanyModal', function () {
    $('#reportToCompany')[0].reset();
})
