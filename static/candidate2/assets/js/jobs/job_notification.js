document.addEventListener('turbo:load', loadJobNotificationtData);

function loadJobNotificationtData() {
    if (!$('#createJobNotificationForm').length) {
        return;
    }

    $('#candidateId').select2();

    $('#filter_employers').select2();

    checkBoxSelect();


}
listenSubmit('#createJobNotificationForm', function () {
    if ($('.jobCheck:checked').length === 0) {
        displayErrorMessage(Lang.get('js.select_job'));
        return false;
    }
    screenLock();
    startLoader();
});

listenClick('#resetJobNotificationFilter', function () {
    $('#filter_employers').val('').trigger('change');
    const url = $('#indexGetEmployerJobs').val();

    $.ajax({
        url: url,
        type: 'get',
        success: function (result) {
            if (result.success) {
                let jobNotification = '';
                let noJobsAvailable = `<li class="no-job-available"><h4 class="text-center mt-9">${Lang.get('js.no_jobs_available')}</h4></li>`;
                let index;

                if (result.data.length > 0) {
                    for (index = 0; index <
                    result.data.length ; index++) {
                        let jobs = [
                            {
                                'job_id': result.data[index].id,
                                'job_title': result.data[index].job_title,
                                'created_by': humanReadableFormatDate(
                                    result.data[index].created_at),
                                'jobDetails': $('#indexJobDetails').
                                        val() + '/' +
                                    result.data[index].id,
                            }];

                        let jobNotificationLi = prepareTemplateRender(
                            '#jobNotificationTemplate', jobs);
                        jobNotification += jobNotificationLi;
                    }
                }

                $('.job-notification-ul').
                    append(jobNotification != ''
                        ? jobNotification
                        : noJobsAvailable);
                checkBoxSelect();

            }
        },
        error: function (result) {
            manageAjaxErrors(result);
        },
    });
});

//employer
listenChange('#filter_employers', function () {
    $('.job-notification-ul').empty();
    $('#ckbCheckAll').prop('checked', false);
    let url = '';

    let employerId = $(this).val();
    if (!isEmpty(employerId)) {
        url = $('#indexGetEmployerJobs').val() + '/' + employerId;
    } else {
        url = $('#indexJobNotification').val();
    }
    $.ajax({
        url: url,
        type: 'get',
        success: function (result) {
            if (result.success) {
                let jobNotification = '';
                let noJobsAvailable = `<li class="no-job-available"><h4 class="text-center mt-9">${Lang.get('js.no_jobs_available')}</h4></li>`;
                if (!isEmpty(employerId)) {
                    let index;
                    if (result.data.jobs.length > 0) {
                        for (index = 0; index <
                        result.data.jobs.length; ++index) {
                            let data = [
                                {
                                    'job_id': result.data.jobs[index].id,
                                    'job_title': result.data.jobs[index].job_title,
                                    'created_by': humanReadableFormatDate(
                                        result.data.jobs[index].created_at),
                                    'jobDetails': $('#indexJobDetails').
                                        val() + '/' +
                                        result.data.jobs[index].id,
                                }];
                            let jobNotificationLi = prepareTemplateRender(
                                '#jobNotificationTemplate', data);
                            jobNotification += jobNotificationLi;
                        }
                    }
                } else {
                    if (result.data.length > 0) {
                        let count;
                        for (count = 0; count <
                        result.data.length; ++count) {
                            let data = [
                                {
                                    'job_id': result.data[count].id,
                                    'job_title': result.data[count].job_title,
                                    'created_by': humanReadableFormatDate(
                                        result.data[count].created_at),
                                    'jobDetails': $('#indexJobDetails').
                                        val() + '/' +
                                        result.data[count].id,
                                }];
                            let jobLi = prepareTemplateRender(
                                '#jobNotificationTemplate', data);
                            jobNotification += jobLi;
                        }
                    }
                }
                $('.job-notification-ul').
                append(jobNotification != ''
                    ? jobNotification
                    : noJobsAvailable);
                checkBoxSelect();
            }
        },
        error: function (result) {
            manageAjaxErrors(result);
        },
    });
});

function humanReadableFormatDate (date) {
    return moment(date).fromNow();
};

//select all checkbox
function checkBoxSelect () {
    $('#ckbCheckAll').click(function () {
        $('.jobCheck').prop('checked', $(this).prop('checked'));
    });

    $('.jobCheck').on('click', function () {
        if ($('.jobCheck:checked').length == $('.jobCheck').length) {
            $('#ckbCheckAll').prop('checked', true);
        } else {
            $('#ckbCheckAll').prop('checked', false);
        }
    });
}
