// $(document).ready(function(){
    // alert("hi")
    const perPage = 2;
    function load_data(currentPage, job_title, location, job_type, search_salary){
        if(!currentPage) {
            currentPage = 1;
        }
        if (location === "Select Location") {
            location = null;
        }
        if (job_type === "Job Type") {
            job_type = null;
        }
        if (search_salary  === "Salary Range") {
            search_salary = null;
        }
        // alert(currentPage)
        $.ajax({
            url: "/search",
            method: "POST",
            data: {
                currentPage: currentPage,
                job_title: job_title,
                location: location,
                job_type: job_type,
                search_salary: search_salary,
            },
            success: function(data){
                $('#filtered').html(data.htmlresponse);
                if (parseInt($('#currentPage').val(), 0) == 1) {
                    $('#prev').prop(
                        "disabled",
                        true
                    );
                    $('#prev').css({"background-color": "#ddd", "color": "black"})
                };

                if (parseInt($('#currentPage').val(), 0) == parseInt($('#total').val(), 0)) {
                    $('#next').prop(
                        "disabled",
                        true
                    );
                    $('#next').css({"background-color": "#ddd", "color": "black"})
                };
                
            }
        });
    }

    function fetch_results() {
        var job_title = $('#search_text').val();
        var location = $('#search_location').val()=="Select Location" ? $('#search_location2').val() : $('#search_location').val();
        var job_type = $('#search_category').val();
        var search_salary = $('#search_salary').val();
        var currentPage = 1;
        // alert(job_type)
        load_data(currentPage, job_title, location, job_type, search_salary);
    }

    $('#search_text').keyup(function(){
        fetch_results();
    });

    $('#search_location').change(function(){
        fetch_results();
    });

    $('#search_location2').change(function(){
        fetch_results();
    });

    $('#search_category').change(function(){
        fetch_results();
    });

    $('#search_salary').change(function(){
        fetch_results();
    });
    $('#curr').click(function(){
        let num = $(this).text();
        alert('hi')
    })

$(document).ready(function(){
    load_data();
    // $('#paginate').customPaginator({
    //     pageItems:  $('.job_item'),
    // });
});



function prev() {
    var job_title = $('#search_text').val();
    var location = $('#search_location').val()=="Select Location" ? $('#search_location2').val() : $('#search_location').val();
    var job_type = $('#search_category').val();
    var search_salary = $('#search_salary').val();
    var currentPage = parseInt($('#currentPage').val(), 0);
    // if (currentPage > 1) {
    //     load_data(currentPage - 1);
    // }
    currentPage -= 1;
    load_data(currentPage, job_title, location, job_type, search_salary);
};

function next() {
    var job_title = $('#search_text').val();
    var location = $('#search_location').val()=="Select Location" ? $('#search_location2').val() : $('#search_location').val();
    var job_type = $('#search_category').val();
    var search_salary = $('#search_salary').val();
    var currentPage = parseInt($('#currentPage').val(), 0);
    currentPage += 1
    load_data(currentPage, job_title, location, job_type, search_salary);
};
function pages(page_no){
    var job_title = $('#search_text').val();
    var location = $('#search_location').val()=="Select Location" ? $('#search_location2').val() : $('#search_location').val();
    var job_type = $('#search_category').val();
    var search_salary = $('#search_salary').val();
    load_data(page_no, job_title, location, job_type, search_salary);
}