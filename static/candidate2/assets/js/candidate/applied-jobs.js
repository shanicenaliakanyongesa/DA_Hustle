document.addEventListener('turbo:load', loadAppliedJobsData);

let filterJobId = null;
function loadAppliedJobsData() {
    // window.livewire.restart();

    if(!$('#jobApplicationStatus').length){
        return
    }

    $('#jobApplicationStatus').on('change', function () {
        Livewire.dispatch('changeFilter',{value:$(this).val()});
         // Livewire.dispatch('changeFilter', 'jobApplicationStatus',
         // $(this).val());
    });

    $('#jobApplicationStatus').select2({
        width: '100%',
    });

    // document.addEventListener('livewire:load', function (event) {
        window.livewire.hook('message.processed', () => {
            $('#jobApplicationStatus').select2({
                width: '100%',
            });
            $('#jobApplicationStatus').val(filterJobId).trigger('change.select2');
            setTimeout(function () { $('.alert').fadeOut('fast'); }, 4000);
        });
    // });
}

    document.addEventListener('deleted', function () {
        swal({
            icon: 'success',
            title: Lang.get('js.deleted') + ' !',
            text: Lang.get('js.applied_jobs') + Lang.get('js.has_been_deleted'),
            type: 'success',
            buttons: {
                confirm:Lang.get('js.ok'),
            },
            reverseButtons: true,
            confirmButtonColor: '#F62947',
            timer: 2000,
        });
        // displaySuccessMessage(Lang.get('messages.applied_job.applied_jobs') + Lang.get('messages.common.has_been_deleted'));
    });

    document.addEventListener('notDeleted', function () {
        swal({
            icon: 'error',
            type: 'error',
            title: Lang.get('js.error'),
            text: Lang.get('js.seems_message'),
            buttons: {
                confirm:Lang.get('js.ok'),
            },
            reverseButtons: true,
            confirmButtonColor: '#F62947',
        });
        // displayErrorMessage(Lang.get('messages.flash.job_cant_delete'));
    });



listenClick('.apply-job-note', function (event) {
    let appliedJobId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('candidate.applied.job.show',appliedJobId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#showNote').html('');
                if (!isEmpty(result.data.notes) ? $('#showNote').
                    append(result.data.notes) : $('#showNote').append('N/A'))
                    $('#showModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenClick('.remove-applied-jobs', function (event) {
    let jobId = $(event.currentTarget).attr('data-id');
    swal({
        title: Lang.get('js.delete') + ' !',
        text: Lang.get('js.are_you_sure_want_to_delete') + '"' + Lang.get('js.applied_jobs') + '" ?',
        icon: 'warning',
        showCancelButton: true,
        closeOnConfirm: false,
        buttons: {
            confirm: Lang.get('js.yes'),
            cancel: Lang.get('js.no')
        },
    }).then((result) => {
        if (result) {
         Livewire.dispatch('removeAppliedJob', {id:jobId});
        }
    });
});
document.addEventListener('appliedJob:error', function (){
    swal({
        icon: 'error',
        type: 'error',
        title: Lang.get('js.error'),
        text: Lang.get('js.seems_message'),
        buttons: {
            confirm:Lang.get('js.ok'),
        },
        reverseButtons: true,
        confirmButtonColor: '#F62947',
    });
    // displayErrorMessage(Lang.get('messages.common.seems_message'));
})

listenClick('.schedule-slot-book', function (event) {
    let appliedJobId = $(event.currentTarget).attr('data-id');
    $.ajax({
        url: route('show.schedule.slot',appliedJobId),
        type: 'POST',
        success: function (result) {
            if (result.success) {
                if (!isEmpty(result.data)){
                    //slot rejected
                    if (result.data.rejectedSlot) {
                        if (!isEmpty(result.data.employer_cancel_note)) {
                            $('#scheduleSlotBookValidationErrorsBox').removeClass('d-none')
                                .html(result.data.company_fullName + Lang.get('js.cancel_your_selected_slot') + '<br>' + '<b>Reason</b>:- ' + result.data.employer_cancel_note);
                            $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').addClass('d-none');
                        } else {
                            $('#scheduleSlotBookValidationErrorsBox').removeClass('d-none').html(Lang.get('js.you_have_rejected_all_slot'));
                            $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').addClass('d-none');
                        }
                        $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').addClass('d-none');
                    }

                    if (result.data.scheduleSelect >= 0) {
                        $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').addClass('d-none');
                    }

                    if (!result.data.rejectedSlot) {
                        $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').removeClass('d-none');
                        let index = 0;
                        $.each(result.data, function (i, v) {
                            if (!isEmpty(v.job_Schedule_Id)) {
                                index++;
                                let data = {
                                    'index': index,
                                    'notes': v.notes,
                                    'schedule_date': v.schedule_date,
                                    'schedule_time': v.schedule_time,
                                    'schedule_id': v.job_Schedule_Id,
                                }
                                $('.slot-main-div').append(prepareTemplateRender('#scheduleSlotBookHtmlTemplate', data));
                                $('.choose-slot-textarea').removeClass('d-none');
                                $('#scheduleSlotBookValidationErrorsBox').addClass('d-none');
                            }
                        });
                    }

                    //display selected slot
                    if (result.data.selectSlot.length != 0) {
                        $.each(result.data.selectSlot, function (i, v) {
                            let data = {
                                'notes': !isEmpty(v.notes) ? v.notes : 'New Slot Send.',
                                'schedule_date': v.date,
                                'schedule_time': v.time,
                            };
                            $('.slot-main-div').append(prepareTemplateRender('#selectedSlotBookHtmlTemplate', data));
                        });
                        $('#selectedSlotBookValidationErrorsBox').removeClass('d-none')
                        .html(Lang.get('js.you_have_selected_this_slot'));
                    }

                    //history
                    if (!isEmpty(result.data)){
                        $('#historyMainDiv').removeClass('d-none');
                        $.each(result.data, function (i, v) {
                            if ($.type(v) == 'object' && isEmpty(v.job_Schedule_Id)) {
                                if (!isEmpty(v.notes)) {
                                    const data = {
                                        'notes': v.notes,
                                        'companyName': v.company_name,
                                        'schedule_created_at': v.schedule_created_at,
                                    };
                                    $('#historyDiv').prepend(prepareTemplateRender('#chooseSlotHistoryHtmlTemplate', data));
                                }
                            }
                        });
                    } else {
                        $('#historyMainDiv').addClass('d-none');
                    }
                    if (result.data.scheduleSelect == 1) {
                        $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').addClass('d-none');
                    }
                }
                $('#scheduleSlotBookModal').appendTo('body').modal('show');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});

listenHiddenBsModal('#scheduleSlotBookModal', function () {
    $('.slot-main-div').html('');
    $('.choose-slot-textarea textarea').val('');
    $('.choose-slot-textarea').addClass('d-none');
    $('#selectedSlotBookValidationErrorsBox').addClass('d-none')
    $('#historyDiv').html('');
    $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').attr('disabled', false);
    $('#rejectSlotBtnSave').val('');
});

listenClick('#rejectSlotBtnSave', function () {
    $(this).val('rejectSlot');
});

listenClick('#scheduleInterviewBtnSave', function () {
    $('#rejectSlotBtnSave').val('');
});
listenSubmit('#scheduleSlotBookForm', function (e) {
    e.preventDefault();
    $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').attr('disabled', true);
    let appliedJobId = $('.schedule-slot-book').attr('data-id');
    let scheduleId;
    let formData = new FormData($(this)[0]);
    $.each($('.slot-book'), function (i) {
        if ($(this).prop('checked')) {
            scheduleId = $(this).data('schedule');
        }
    });
    formData.append('rejectSlot', $('#rejectSlotBtnSave').val());
    formData.append('schedule_id', scheduleId);
    $.ajax({
        url: route('choose.preference',appliedJobId),
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.success) {
                displaySuccessMessage(result.message);
                $('#scheduleSlotBookModal').modal('hide');
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
            $('#scheduleInterviewBtnSave,#rejectSlotBtnSave').attr('disabled', false);
        },
        complete: function () {
            processingBtn('#scheduleSlotBookForm', '#scheduleInterviewBtnSave');
        },
    });
});
