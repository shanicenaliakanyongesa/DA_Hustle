
listenChange('#countryId', function (){
    $.ajax({
        url: route('states-list'),
        type: 'get',
        dataType: 'json',
        data: { postal: $(this).val() },
        success: function (data) {
            $('#stateId').empty();
            if (data.data.length != 0) {
                $.each(data.data, function (i, v) {
                    $('#stateId').
                        append($('<option></option>').attr('value', i).text(v));
                });
            } else {
                $('#stateId').
                    append(
                        $('<option value=""></option>').text(Lang.get('js.select_state')));
            }
            $('#stateId').trigger('change');
        },
    });
})

listenChange('#stateId', function (){
        $.ajax({
            url: route('cities-list'),
            type: 'get',
            dataType: 'json',
            data: {
                state: $(this).val(),
                country: $('#countryId').val(),
            },
            success: function (data) {
                $('#cityId').empty();
                if (data.data.length != 0) {
                    $.each(data.data, function (i, v) {
                        $('#cityId').
                            append($('<option></option>').
                                attr('value', i).
                                text(v));
                    });
                } else {
                    $('#cityId').
                        append(
                            $('<option value=""></option>').
                                text(Lang.get('js.select_city')));
                }
            },
        });
    })
