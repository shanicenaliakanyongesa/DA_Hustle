

// $(document).on('click', '.delete-btn', function (event) {
//     let reportedCompanyId = $(event.currentTarget).attr('data-id');
//     swal({
//             title: Lang.get('messages.common.delete') + ' !',
//             text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.candidate.reported_employer') + '" ?',
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
//             window.livewire.emit('deleteReportedEmployee', reportedCompanyId);
//         });
// });
//
// document.addEventListener('delete', function () {
//     swal({
//         title: Lang.get('messages.common.deleted') + ' !',
//         text: Lang.get('messages.candidate.reported_employer')+ Lang.get('messages.common.has_been_deleted'),
//         type: 'success',
//         confirmButtonColor: '#6777ef',
//         timer: 2000,
//     });
// });

// $(document).on('click', '.view-note', function (event) {
//     if (ajaxCallIsRunning) {
//         return;
//     }
//     ajaxCallInProgress();
//     let reportedCompanyId = $(event.currentTarget).attr('data-id');
//     $.ajax({
//         url: reportedCompaniesUrl + '/' + reportedCompanyId,
//         type: 'GET',
//         success: function (result) {
//             if (result.success) {
//                 $('#showNote,#showName,#showReportedBy,#showReportedOn,#showImage').
//                     html('');
//                 if (!isEmpty(result.data.note) ? $('#showNote').
//                     append(result.data.note) : $('#showNote').append('N/A'))
//                     $('#showName').append(result.data.company.user.first_name);
//                 $('#showReportedBy').append(result.data.user.first_name);
//                 $('#showReportedOn').append(result.data.date);
//                 $('#showImage').
//                     append('<img src="' + result.data.company.company_url +
//                         '" class="img-responsive users-avatar-img employee-img mr-2" />');
//                 $('#showModal').appendTo('body').modal('show');
//                 ajaxCallCompleted();
//             }
//         },
//         error: function (result) {
//             displayErrorMessage(result.responseJSON.message);
//         },
//     });
// });
//
// $(document).ready(function () {
//     $('#filter_reported_date').select2();
// });
//
// $(document).ready(function () {
//     $('#filter_reported_date').on('change', function (e) {
//         var data = $('#filter_reported_date').select2('val');
//         window.livewire.emit('changeFilter', 'filterReportedDate', data);
//     });
// });
listenClick('.show-employer-detail-btn', function (event) {

    ajaxCallInProgress();
    let reportedCompanyId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('reported.companies.show',reportedCompanyId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showReportedCompany').html('');
                $('#showReportedBy').html('');
                $('#showReportedWhen').html('');
                $('#showReportedNote').html('');
                $('#showImage').html('');

                $('#showReportedCompany').
                    append(result.data.company.user.first_name);
                $('#showReportedBy').append(result.data.user.first_name);
                $('#showReportedWhen').append(result.data.date);
                let element = document.createElement('textarea');
                element.innerHTML = (!isEmpty(result.data.note))
                    ? result.data.note
                    : 'N/A';
                $('#showReportedNote').append(element.value);
                $('#showImage').append('<img src="' + result.data.company.company_url +
                    '" class="testimonial-modal-img" />');
                $('#showReportedCompaniesModel').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenClick('.reported-company-delete-btn', function (event) {
    let reportedCompanyId = $(event.currentTarget).attr('data-id');
    deleteItem(route('delete.reported.company',reportedCompanyId), Lang.get('js.reported_employer'));
});
//     swal({
//         title: Lang.get('messages.common.delete') + ' !',
//         text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' +
//             Lang.get('messages.candidate.reported_employer') + '" ?',
//         type: 'warning',
//         showCancelButton: true,
//         closeOnConfirm: false,
//         showLoaderOnConfirm: true,
//         confirmButtonColor: '#6777ef',
//         cancelButtonColor: '#d33',
//         cancelButtonText: Lang.get('messages.common.no'),
//         confirmButtonText: Lang.get('messages.common.yes'),
//     }, function () {
//         $.ajax({
//             url: reportedCompaniesUrl + '/' + reportedCompanyId,
//             type: 'DELETE',
//             success: function success (result) {
//                 if (result.success) {
//                     tbl.ajax.reload(null, false);
//                 }
//
//                 swal({
//                     title: Lang.get('messages.common.deleted') + ' !',
//                     text: Lang.get('messages.candidate.reported_employer') +
//                         Lang.get('messages.common.has_been_deleted'),
//                     type: 'success',
//                     confirmButtonColor: '#6777ef',
//                     timer: 2000,
//                 });
//             },
//             error: function error (data) {
//                 swal({
//                     title: '',
//                     text: data.responseJSON.message,
//                     type: 'error',
//                     confirmButtonColor: '#6777ef',
//                     timer: 2000,
//                 });
//             },
//         });
//     });
// });
