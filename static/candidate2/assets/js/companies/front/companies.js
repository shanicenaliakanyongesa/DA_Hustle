document.addEventListener('turbo:load', loadFrontCompanyData);

function loadFrontCompanyData () {
    if ($('#industry').length) {
        $('#industry').on('change', function (e) {
            var data = $('#industry').select2('val');
            Livewire.dispatch('changeFilter', 'featured', data);
        });
    }

    if ($('#filter_status').length) {
        $('#filter_status').on('change', function (e) {
            var data = $('#filter_status').select2('val');
            Livewire.dispatch('changeFilter', 'status', data);
        });
    }

    if (!$('#searchByCompany').length) {
        return;
    }

    $('#searchByCompany').focus();

    listenChange('.isActive', function (event) {
        let isActiveId = $(event.currentTarget).data('id');
        changeIsActive(isActiveId);
    });

    listenClick('.adminMakeFeatured', function (event) {
        let adminMakeFeaturedId = $(event.currentTarget).data('id');
        makeFeatured(adminMakeFeaturedId);
    });

    function makeFeatured (adminMakeFeaturedId) {
        $.ajax({
            url: route('mark-as-featured', adminMakeFeaturedId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    $('[data-toggle="tooltip"]').tooltip('hide');
                    Livewire.dispatch('refresh');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenClick('.adminUnFeatured', function (event) {
        let adminUnFeaturedId = $(event.currentTarget).data('id');
        makeUnFeatured(adminUnFeaturedId);
    });

    function makeUnFeatured (adminUnFeaturedId) {
        $.ajax({
            url: route('mark-as-unfeatured', adminUnFeaturedId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    $('[data-toggle="tooltip"]').tooltip('hide');
                    Livewire.dispatch('refresh');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenClick('.delete-btn', function (event) {
        let companyId = $(event.currentTarget).attr('data-id');
        swal({
                title: Lang.get('js.delete') + ' !',
                text: Lang.get('js.are_you_sure_want_to_delete') +
                    '"' + Lang.get('js.employee') + '" ?',
                type: 'warning',
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonColor: '#6777ef',
                cancelButtonColor: '#d33',
                cancelButtonText: Lang.get('js.no'),
                confirmButtonText: Lang.get('no.yes'),
            },
            function () {
                  Livewire.dispatch('deleteEmployee', companyId);
            });
    });

    document.addEventListener('delete', function () {
        swal({
            title: Lang.get('js.deleted') + ' !',
            text: Lang.get('js.employee') +
                Lang.get('js.has_been_deleted'),
            type: 'success',
            confirmButtonColor: '#6777ef',
            timer: 2000,
        });
    });

    listenChange('.isFeatured', function (event) {
        let companyId = $(event.currentTarget).data('id');
        activeIsFeatured(companyId);
    });

    function changeIsActive (isActiveId) {
        $.ajax({
            url: route('change.company.status', isActiveId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    Livewire.dispatch('refresh');
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenChange('.is-email-verified', function (event) {
        if ($(this).is(':checked')) {
            let companyId = $(event.currentTarget).data('id');
            changeEmailVerified(companyId);
            $(this).attr('disabled', true);
        } else {
            return false;
        }
    });

    function changeEmailVerified (companyId) {
        $.ajax({
            url: route('company.verified.email', companyId),
            method: 'post',
            cache: false,
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    Livewire.dispatch('refresh');
                    return true;
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    };

    listenClick('.send-email-verification', function (event) {
        let companyId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: route('company.resendEmailVerification', companyId),
            type: 'post',
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message);
                    return true;
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

}
