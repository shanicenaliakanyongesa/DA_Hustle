const { log } = require("handlebars");

document.addEventListener('DOMContentLoaded', loadEmployerJobData);

function loadEmployerJobData() {
    if (!$('#indexEmployeeJobsData').length) {
        return;
    }

    $('#filter_featured').select2({
        width: '170px',
    });
    $('#filter_status').select2({
        width: '150px',
    });

}
    listenClick('.change-status', function (event) {
        let jobId = $(this).data('id');
        let statusArray = JSON.parse($('#employerJobStatusArray').val());
        let jobStatus = statusArray.indexOf($(this).attr('data-option'));;
        // const swalWithBootstrapButtons = swal.mixin({
        //     className: {
        //         confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-0',
        //         cancelButton: 'swal2-cancel btn fw-bold btn-bg-light btn-color-primary mt-0'
        //     },
        //     buttonsStyling: false
        // })

        swal({
            title: Lang.get('js.attention')+ '!',
            text: Lang.get('js.are_you_sure_to_change_status'),
            icon: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonColor: '#6777ef',
            cancelButtonColor: '#d33',
            buttons: {
                confirm: Lang.get('js.yes'),
                cancel: Lang.get('js.no'),
            },
        }).then((result) => {
            if (result) {
                changeStatus(jobId, jobStatus);
            }
        });
    });
    function changeStatus(jobId, jobStatus) {
        $.ajax({
            url: route('change-job-status', {'id' : jobId ,'status' : jobStatus} ),
            method: 'get',
            cache: false,
            success: function (result) {
                if (result.success) {
                  Livewire.dispatch('refreshDatatable')
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
            complete: function () {
                swal.close();
            },
        });
    };
listenClick('.employer-job-delete-btn', function (event) {
    let jobId = $(this).attr('data-id');
    deleteItem(route('job.destroy', jobId), Lang.get('js.job'));
    Livewire.dispatch('refreshDatatable');
});

listenClick('.copy-btn', function (event) {
    let copyUrlId = $(event.currentTarget).data('job-id');
    let copyUrl = route('front.job.details', copyUrlId);
    let $temp = $('<input>');
    $('body').append($temp);
    $temp.val(copyUrl).select();
    document.execCommand('copy');
    $temp.remove();
    displaySuccessMessage(Lang.get('js.link_copy'));
});
listenChange("#jobFeatured", function() {
         Livewire.dispatch("changeFeaturedFilter", { featured: $(this).val() });
     });
listenChange("#jobSuspended", function() {
         Livewire.dispatch("changeSuspendedFilter", { suspended: $(this).val() });
     });
listenChange("#Jobfreelance", function() {
         Livewire.dispatch("changeFreelanceFilter", { freelance: $(this).val() });
     });
listenChange("#JobStatus", function() {
         Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
     });

listenClick("#job-ResetFilter", function() {
         $("#jobFeatured,#jobSuspended,#Jobfreelance,#JobStatus").val(2).change();
         hideDropdownManually($('#jobsFilterBtn'), $('.dropdown-menu'));
     });
 listenChange("#employeeJobStatus", function() {
         Livewire.dispatch("employeeJobStatus", { employeeJobStatus: $(this).val() });
     });
listenClick("#employeeJob-ResetFilter", function() {
         $("#employeeJobStatus").val(4).change();
         $("#jobFeatured").val(2).change();
         hideDropdownManually($('#employeeFeaturedFilterBtn'), $('.dropdown-menu'));
     });
function hideDropdownManually(button, menu) {
         button.dropdown('toggle');
     }
