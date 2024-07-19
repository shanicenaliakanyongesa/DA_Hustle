document.addEventListener('turbo:load', loadJobSlotData);
import "flatpickr/dist/l10n";

function loadJobSlotData () {

    if (!$('#indexEmployerJobSlot').length) {
        return;
    }

    // $(document.getElementById('.scheduleInterviewTime')).flatpickr();
    // $(document.getElementById('.scheduleInterviewDate')).flatpickr();

    timePickerFunction('time[' + 1 +']');
    dateTimePickerFunction('date[' + 1 +']');
    timePickerFunction('time');
    dateTimePickerFunction('date');
    timePickerFunction('editTime');
    dateTimePickerFunction('editDate');

    $('#stages').select2({
        width: '100%',
    });
    let data = $('#stages').select2('val');
    $('#stages').on('change', function (e) {
        data = $('#stages').select2('val');
        Livewire.dispatch('changeFilter', 'stage', data);
    });
    Livewire.dispatch('changeFilter', 'stage', data);
    Livewire.dispatch('stageFilter', 'jobApplicationId', JobApplicationId);

    listenClick('.edit-slot-btn', function (event) {
        //  if (ajaxCallIsRunning) {
        //     return;
        // }
        ajaxCallInProgress();
        let slotId = $(event.currentTarget).attr('data-id');
        $.ajax({
            url: jobApplicationUrl + '/slots/' + slotId + '/edit',
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    $('#editSlotId').val(result.data.id);
                    // $('#editDate').val(moment(result.data.date).
                    // format('YYYY-MM-DD'));
                    document.querySelector('#editDate').
                        _flatpickr.
                        setDate(moment(result.data.date).format());
                    document.querySelector('#editTime').
                        _flatpickr.
                        setDate(result.data.time);
                    $('#editNotes').val(result.data.notes);
                    $('#editSlotModal').appendTo('body').modal('show');
                    ajaxCallCompleted();
                }
            },
            error: function (result) {
                displayErrorMessage(result.responseJSON.message);
            },
        });
    });

    $('#editSlotModal').on('hidden.bs.modal', function () {
        $('#editSlotForm')[0].reset();
    });

    $('#batchSlotModal').on('hidden.bs.modal', function () {
        processingBtn('#batchSlotForm', '#batchSlotBtnSave');
        resetModalForm('#batchSlotForm', '#batchSlotValidationErrorsBox');
    });

    $(document).on('click', '.delete-btn', function (event) {
        let slotId = $(event.currentTarget).attr('data-id');
        swal({
            title: Lang.get('js.delete') + ' !',
            text: Lang.get('js.are_you_sure_want_to_delete') +
                '"' + Lang.get('js.slot') + '" ?',
            icon: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonColor: '#6777ef',
            cancelButtonColor: '#d33',
            buttons: {
                confirm: Lang.get('js.yes'),
                cancel: Lang.get('js.no')
            }
        }).then((result) => {
            if (result) {
                $.ajax({
                    url: jobApplicationUrl + '/slots/' + slotId,
                    type: 'DELETE',
                    success: function success(result) {
                        if (result.success) {
                            displaySuccessMessage(result.message);
                            Livewire.dispatch('refresh');
                            setTimeout(function () {
                                if ($('.slot-data').length == 0) {
                                    location.reload();
                                }
                            }, 3000);
                        }

                        swal({
                            icon: 'success',
                            title: Lang.get('js.deleted') + ' !',
                            text: Lang.get('js.slot') +
                                  Lang.get('js.has_been_deleted'),
                            type: 'success',
                            buttons: {
                                confirm:Lang.get('js.ok'),
                            },
                            reverseButtons: true,
                            confirmButtonColor: '#F62947',
                            timer: 2000,
                        });
                    },
                    error: function error (data) {
                        swal({
                            title: '',
                            icon: 'error',
                            text: data.responseJSON.message,
                            type: 'error',
                            buttons: {
                                confirm:Lang.get('js.ok'),
                            },
                            reverseButtons: true,
                            confirmButtonColor: '#F62947',
                            timer: 2000,
                        });
                    },
                });
            }
        });
        // swal({
        //     title: Lang.get('messages.common.delete') + ' !',
        //     text: Lang.get('messages.common.are_you_sure_want_to_delete') + '"' + Lang.get('messages.job_stage.slot') + '" ?',
        //     type: 'warning',
        //     showCancelButton: true,
        //     closeOnConfirm: false,
        //     showLoaderOnConfirm: true,
        //     confirmButtonColor: '#6777ef',
        //     cancelButtonColor: '#d33',
        //     cancelButtonText: Lang.get('messages.common.no'),
        //     confirmButtonText: Lang.get('messages.common.yes')
        // }, function () {
        //     $.ajax({
        //         url: jobApplicationUrl + '/slots/'+slotId,
        //         type: 'DELETE',
        //         success: function success(result) {
        //             if (result.success) {
        //                 displaySuccessMessage(result.message);
        //                 Livewire.dispatch('refresh');
        //                 setTimeout(function (){
        //                     if ($('.slot-data').length == 0) {
        //                         location.reload();
        //                     }
        //                 }, 3000);
        //             }
        //
        //             swal({
        //                 title: Lang.get('messages.common.deleted') + ' !',
        //                 text: Lang.get('messages.job_stage.slot') + Lang.get('messages.common.has_been_deleted'),
        //                 type: 'success',
        //                 confirmButtonColor: '#6777ef',
        //                 timer: 2000
        //             });
        //         },
        //         error: function error(data) {
        //             swal({
        //                 title: '',
        //                 text: data.responseJSON.message,
        //                 type: 'error',
        //                 confirmButtonColor: '#6777ef',
        //                 timer: 2000
        //             });
        //         }
        //     });
        // });
    });
}

listenClick('.add-slot', function () {
    uniqueId++;
    let data = {
        'uniqueId': uniqueId,
    };
    $('.slot-main-div').append(prepareTemplateRender('#interviewSlotHtmlTemplate', data));
    timePickerFunction('time[' + uniqueId + ']');
    dateTimePickerFunction('date[' + uniqueId + ']');
    resetScheduleSlotIndex();
});


listenSubmit('#editSlotForm', function (event) {
    event.preventDefault();
    processingBtn('#editSlotForm', '#editSlotBtnSave', 'loading');
    const slotId = $('#editSlotId').val();
    let formData = new FormData($(this)[0]);
    formData.append('job_application_id', JobApplicationId);
    $.ajax({
        url: jobApplicationUrl + '/slots/' + slotId + '/update',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#editSlotModal').modal('hide');
                Livewire.dispatch('refresh');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#editSlotForm', '#editSlotBtnSave');
        },
    });
});

listenSubmit('#batchSlotForm', function (e) {
    e.preventDefault();
    processingBtn('#batchSlotForm', '#batchSlotBtnSave', 'loading');
    let formData = new FormData($(this)[0]);
    formData.append('job_application_id', JobApplicationId);
    formData.append('batch', $('#batchSlotId').val());
    $.ajax({
        url: batchSlotStoreUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#batchSlotModal').modal('hide');
                Livewire.dispatch('refresh');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#batchSlotForm', '#batchSlotBtnSave');
        },
    });
});

listenClick('.schedule-interview', function () {
    $('#scheduleInterviewModal').appendTo('body').modal('show');
});

listenClick('.batch-slot', function (event) {
    $('#batchSlotId').val($(event.currentTarget).attr('data-batch'));
    $('#batchSlotModal').appendTo('body').modal('show');
});


$(document).on('click', '.cancel-slot', function (e) {
    e.preventDefault();

    let cancelSlotNote = $('.cancel-slot-notes').map(function () {
        if ($(this).val() != ''){
            return $(this).val();
        }
    }).get();

    // if (cancelSlotNote == '') {
    //     displayErrorMessage('Cancel Reason field is required');
    //     return false;
    // }

    let slotID = $(this).data('schedule');
    $.ajax({
        url: cancelSlotUrl,
        type: 'POST',
        data: {
            '_token': $('meta[name="csrf-token"]').attr('content'),
            'jobApplicationId': JobApplicationId,
            'cancelSlotNote': cancelSlotNote,
            'slotId': slotID,
        },
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                if(! $('.schedule-interview')[0]) {
                    $('.slot-screen > div:eq(0)').after(
                        '<a href="javascript:void(0)" class="ml-4 btn btn-primary form-btn float-right schedule-interview">' +
                           Lang.get('js.add') +
                        '</a>'
                    );
                } else {
                    $('.schedule-interview').removeClass('d-none');
                }
                $(this).parent('.choose-slot-textarea').find('textarea.cancel-slot-notes').val('');
                Livewire.dispatch('refresh');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

const resetScheduleSlotIndex = () => {
    let data = {
        'uniqueId': uniqueId,
    }
    let index = 1;
    $('.slot-main-div .slot-box').each(function () {
        index++;
    });
    if (index - 1 == 0) {
        $('.slot-main-div').append(prepareTemplateRender('#interviewSlotHtmlTemplate', data));
    }
};

$(document).on('click', '.delete-schedule-slot', function () {
    $(this).parents('.slot-box').remove();
    resetScheduleSlotIndex();
    timePickerFunction('time['+uniqueId+']');
    dateTimePickerFunction('date['+uniqueId+']');
    if (!uniqueId == 1) {
        uniqueId--;

    }
});

$('#scheduleInterviewModal').on('hidden.bs.modal', function () {
    $('#historyDiv').html('');
    $('.slot-main-div').html('');
    $('.add-slot').trigger('click');
    processingBtn('#scheduleInterviewForm', '#scheduleInterviewBtnSave');
});


$(document).on('submit', '#scheduleInterviewForm', function (e) {
    e.preventDefault();
    processingBtn('#scheduleInterviewForm', '#scheduleInterviewBtnSave', 'loading');
    let formData = new FormData($(this)[0]);
    formData.append('scheduleSlotCount', uniqueId);
    formData.append('job_application_id', JobApplicationId);
    $.ajax({
        url: interviewSlotStoreUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#scheduleInterviewModal').modal('hide');
                $('.schedule-interview').addClass('d-none');
                Livewire.dispatch('refresh');
                location.reload();
                // setTimeout(function () {
                //     location.reload();
                //     }, 3000);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#scheduleInterviewForm', '#scheduleInterviewBtnSave');
        },
    });
});

const timePickerFunction = (selector) => {
    $(document.getElementById(selector)).flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        "locale": getLoggedInUserLang,
        minuteIncrement: 1,
        // defaultHour:0
    });
};

const dateTimePickerFunction = (selector) => {
    $(document.getElementById(selector)).flatpickr({
        format: 'DD-MM-YYYY',
        useCurrent: true,
        sideBySide: true,
        "locale": getLoggedInUserLang,
        minDate: moment(new Date()).format('YYYY-MM-DD'),
        defaultDate: moment(new Date()).format('YYYY-MM-DD'),
    });
};
