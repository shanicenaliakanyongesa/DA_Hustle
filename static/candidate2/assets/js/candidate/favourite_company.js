
// document.addEventListener('livewire:load', function (event) {
//     window.livewire.hook('message.processed', () => {
//         setTimeout(function () { $('.alert').fadeOut('fast'); }, 4000);
//     });
// });

// $(document).on('click', '.delete-btn', function (event) {
//     let jobId = $(event.currentTarget).attr('data-id');
//     swal({
//             title: Lang.get('messages.common.delete') + ' !',
//             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.job.favourite_company') + '" ?',
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
//             Livewire.dispatch('removeFavouriteCompany', jobId);
//         });
// });
//
// document.addEventListener('deleted', function () {
//     swal({
//         title: Lang.get('messages.common.deleted') + ' !',
//         text: Lang.get('messages.job.favourite_company')+ Lang.get('messages.common.has_been_deleted'),
//         type: 'success',
//         confirmButtonColor: '#6777ef',
//         timer: 2000,
//     });
// });

    listenClick('.favourite-company-delete-btn', function (event) {
        let followingJobId = $(event.currentTarget).attr('data-id')
        deleteItem(route('favourite.companies.delete', followingJobId), Lang.get('js.favourite_company'))
    })
