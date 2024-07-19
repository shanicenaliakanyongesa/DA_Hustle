document.addEventListener('turbo:load', loadCompanyData);

function loadCompanyData() {
    if (!$('#indexCompanyData').length) {
        return;
    }
    $('#featured_company').select2();
    $('#filter_status').select2();

    listenClick('#resetFilter', function () {
        $('#featured_company').val('').trigger('change');
        $('#filter-status').val('').trigger('change');
    });


    // $(document).on('click', '.delete-btn', function (event) {
    //     let companyId = $(event.currentTarget).attr('data-id');
    //     swal({
    //             title: Lang.get('messages.common.delete') + ' !',
    //             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' +
    //                 Lang.get('messages.company.employer') + '" ?',
    //             type: 'warning',
    //             showCancelButton: true,
    //             closeOnConfirm: false,
    //             showLoaderOnConfirm: true,
    //             confirmButtonColor: '#6777ef',
    //             cancelButtonColor: '#d33',
    //             cancelButtonText: Lang.get('messages.common.no'),
    //             confirmButtonText: Lang.get('messages.common.yes'),
    //         },
    //         function () {
    //             window.livewire.emit('deleteEmployee', companyId);
    //         });
    // });
    //
    // document.addEventListener('delete', function () {
    //     swal({
    //         title: Lang.get('messages.common.deleted') + ' !',
    //         text: Lang.get('messages.company.employer') +
    //             Lang.get('messages.common.has_been_deleted'),
    //         type: 'success',
    //         confirmButtonColor: '#6777ef',
    //         timer: 2000,
    //     });
    // });

    listenClick('.employer-delete-btn', function (event) {
        let employerDeleteId = $(this).attr('data-id');
        deleteItem(route('company.destroy', employerDeleteId), Lang.get('js.employer'));
    });

    // listenChange('.isFeatured', function (event) {
    //     let companyId = $(event.currentTarget).data('id');
    //     activeIsFeatured(companyId);
    // });

}

listenChange('.is-employer-email-verified', function (event) {
    if ($(this).is(':checked')) {
        let isEmailVerifiedId = $(event.currentTarget).data('id');
        changeEmailVerifiedRender(isEmailVerifiedId);
        $(this).attr('disabled', true);
    } else {
        return false;
    }
});

function changeEmailVerifiedRender(isEmailVerifiedId) {
    $.ajax({
        url: route('company.verified.email', isEmailVerifiedId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
                return true;
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
}

listenChange('.isEmployerActive', function () {
    let companyIsActiveId = $(this).attr('data-id');
    changeIsActiveRender(companyIsActiveId);
});
listenClick('.send-email-company-verification', function (event) {
    let sendEmailVerificationId = $(event.currentTarget).attr('data-id');
    let isDisabled = $(this);
    isDisabled.addClass('disabled');

    $.ajax({
        url: route('company.resendEmailVerification',
            sendEmailVerificationId),
        type: 'post',
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                isDisabled.removeClass('disabled');
                Livewire.dispatch('refreshDatatable');
                return true;
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

function changeIsActiveRender (companyIsActiveId) {
    $.ajax({
        url: route('change.company.status', companyIsActiveId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};
    // $(document).ready(function () {
    //     $('#filter_featured').on('change', function (e) {
//         var data = $('#filter_featured').select2('val');
//         window.livewire.emit('changeFilter', 'featured', data);
//     });
//
//     $('#filter_status').on('change', function (e) {
//         var data = $('#filter_status').select2('val');
//         window.livewire.emit('changeFilter', 'status', data);
//     });
// });

listenClick('.adminMakeFeatured', function (event) {
    let adminMakeFeaturedId = $(event.currentTarget).data('id');
    makeFeaturedRender(adminMakeFeaturedId);
});

function makeFeaturedRender(adminMakeFeaturedId) {
    $.ajax({
        url: route('mark-as-featured', adminMakeFeaturedId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('[data-toggle="tooltip"]').tooltip('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};

listenClick('.adminUnFeatured', function (event) {
    let adminUnFeaturedId = $(event.currentTarget).data('id');
    makeUnFeaturedRender(adminUnFeaturedId);
});

function makeUnFeaturedRender(adminUnFeaturedId) {
    $.ajax({
        url: route('mark-as-unfeatured', adminUnFeaturedId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('[data-toggle="tooltip"]').tooltip('hide');
                Livewire.dispatch('refreshDatatable');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
};
listenChange("#featuredCompany", function() {
         Livewire.dispatch("changeFeaturedCompany", { featured: $(this).val() });
     });
listenChange("#companyStatus", function() {
         Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
     });
function hideDropdownManually(button, menu) {
         button.dropdown('toggle');
     }
listenClick("#company-ResetFilter", function() {
         $("#featuredCompany,#companyStatus").val(2).change();
         hideDropdownManually($('#companiesFilterBtn'), $('.dropdown-menu'));
     });
