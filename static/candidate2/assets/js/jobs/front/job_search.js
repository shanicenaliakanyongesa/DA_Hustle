$(window).scrollTop(0);

document.addEventListener('turbo:load', loadJobSearchData);

function loadJobSearchData() {
    let salaryFromSlider = $('#salaryFrom');
    let salaryToSlider = $('#salaryTo');
    if(!$('#salaryFrom').length && !$('#salaryTo').length) {
        return
    }
    let jobExperienceSlider = $('#jobExperience');
    if (!salaryFromSlider.length && !salaryToSlider.length &&
        !jobExperienceSlider.length) {
        return;
    }

    $('#searchCategories').select2()
    $('#searchSkill').select2()
    $('#searchGender').select2()
    $('#searchCareerLevel').select2()
    $('#searchFunctionalArea').select2()
    let input = JSON.parse($('#input').val())

    $('input[name=job-type]').prop('checked', false);
    if ($('#jobExperience').length) {
        var rangEle = $('#jobExperience').siblings()[1]
        if (typeof rangEle !== "undefined"){
            rangEle.remove()
        }
        $('#jobExperience').ionRangeSlider({
            type: 'single',
            min: 0,
            step: 1,
            max: 30,
            max_postfix: '+',
            onFinish: function (data) {
                Livewire.dispatch('changeFilter', {
                    param: 'jobExperience',
                    value: data.from
                });
            },
        });
        $('#jobExperience').addClass('irs-hidden-input')
    }
    // $("#salaryFrom").ionRangeSlider({
    //     min: 0,
    //     max: 150000,
    //     from: 0,
    // });
    if (salaryFromSlider.length) {
        var rangEle = $('#salaryFrom').siblings()[1]
        if (typeof rangEle !== "undefined"){
            rangEle.remove()
        }
        $("#salaryFrom").ionRangeSlider({
            type: 'single',
            min: 0,
            step: 100,
            max: 150000,
            max_postfix: '+',
            onFinish: function (data) {
                Livewire.dispatch('changeFilter', {
                    param: 'salaryFrom',
                    value: data.from
                });
            },
        })
        $('#salaryFrom').addClass('irs-hidden-input')
    }

    if (salaryToSlider.length) {
        var rangEle = salaryToSlider.siblings()[1]
        if (typeof rangEle !== "undefined"){
            rangEle.remove()
        }
        salaryToSlider.ionRangeSlider({
            type: 'single',
            min: 0,
            step: 100,
            max: 150000,
            max_postfix: '+',
            onFinish: function (data) {
                Livewire.dispatch('changeFilter', {
                    param: 'salaryTo',
                    value: data.from
                });
            },
        });
        salaryToSlider.addClass('irs-hidden-input')
    }


    if (input.length > 0 && input.location != '') {
        $('#searchByLocation').val(input.location);
        Livewire.dispatch('changeFilter', {
            param: 'searchByLocation',
            value: input.location
        });
    }

    if (input.length > 0 && input.keywords != '') {
        Livewire.dispatch('changeFilter', {
            param: 'title',
            value: input.keywords
        });
    }

    // $(document).on('change', '.jobType',function () {
    if ($(window).width() > 991) {
        $('#search-jobs-filter').show();
        $('#collapseBtn').hide();
    } else {
        $('.job-post-sidebar').hide();
        $('#collapseBtn').click(function () {
            $('.job-post-sidebar').show();
        });
    }

    listenClick('.reset-filter',function (event) {
        event.preventDefault();
        Livewire.dispatch('resetFilter');
        salaryFromSlider.data('ionRangeSlider').update({
            from: 0,
            to: 0,
        });
        salaryToSlider.data('ionRangeSlider').update({
            from: 0,
            to: 0,
        });
        jobExperienceSlider.data('ionRangeSlider').update({
            from: 0,
            to: 0,
        });
        $('#searchByLocation').val("");
        $('#searchFunctionalArea').val('').trigger("change");
        $('#searchCareerLevel').val('').trigger("change");
        $('#searchGender').val('').val('').trigger("change");
        $('#searchSkill').val('').val('').trigger("change");
        $("#searchCategories").val('').trigger("change");
        $('.jobType').prop('checked', false);
    });
}

listenChange('.jobType', function () {
    let jobType = [];
    $('input:checkbox[name=job-type]:checked').each(function () {
        jobType.push($(this).val());
    });
    if (jobType.length > 0) {
    Livewire.dispatch('changeFilter', {
        param: 'types',
        value: jobType
    });
    } else {
     Livewire.dispatch('resetFilter');
    }
});

document.addEventListener('livewire:load', function () {
    window.livewire.hook('message.processed', () => {
        $(window).scrollTop(0);
        $(document).on('click', '#jobsSearchResults ul li', function () {
            $('#searchByLocation').val($(this).text());
            $('#jobsSearchResults').fadeOut();
        });
    });
});


listenChange('#searchCategories', function () {
    Livewire.dispatch('changeFilter', {
        param: 'category',
        value: $(this).val()
    });
})

listenChange('#searchSkill', function () {
    Livewire.dispatch('changeFilter', {
        param: 'skill',
        value: $(this).val()
    });
})

listenChange('#searchGender', function () {
    Livewire.dispatch('changeFilter', {
        param: 'gender',
        value: $(this).val()
    });
})

listenChange('#searchCareerLevel', function () {
    Livewire.dispatch('changeFilter', {
        param: 'careerLevel',
        value: $(this).val()
    });
})

listenChange('#searchFunctionalArea', function () {
    Livewire.dispatch('changeFilter', {
        param: 'functionalArea',
        value: $(this).val()
    });
})

listenKeyup('#searchByLocation', function () {
    Livewire.dispatch('changeFilter', {
        param: 'searchByLocation',
        value: $(this).val(),
    });
});


