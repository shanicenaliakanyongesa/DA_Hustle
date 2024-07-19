document.addEventListener('DOMContentLoaded', loadAdminJobData);

function loadAdminJobData() {
    if(!$('#filter_job_active_expire').length){
        return
    }

    $('#filter_featured,#filter_suspended,#filter_freelancer,#filter_expiry_date,#filter_job_active_expire').
        select2();
}

listenClick('.delete-btn', function (event) {
    let jobId = $(this).attr('data-id');
    deleteItem(route('admin.jobs.destroy', jobId), Lang.get('js.job'));
})

listenClick(' .adminJobMakeFeatured ', function (event) {
    let jobId = $(event.currentTarget).data('id');
    $.ajax({
        url : route('job.make.featured',jobId),
        method: 'post',
        cache: false,
        success: function (result) {
            if (result.success) {
                  Livewire.dispatch('refreshDatatable');
                displaySuccessMessage(result.message);
                $('[data-toggle="tooltip"]').tooltip('hide');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
})

listenClick(' .adminJobUnFeatured ', function (event) {
    let jobId = $(event.currentTarget).data('id');
    $.ajax({
        url: route('job.make.unfeatured',jobId),
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
})

listenChange('.isSuspended', function (event) {
    let jobId = $(this).attr('data-id');
    $.ajax({
        url:route('job.is-suspend',jobId),
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
})

listenClick('#jobsFilters', function () {
    $('#jobsFiltersForm').toggleClass('d-block d-none');
})

listenClick('#reset-filter', function () {
    $('#filter_featured,#filter_suspended,#filter_freelancer,#filter_expiry_date,#filter_job_active_expire').
    val('').
    change();
})
