// $(document).ready(function(){
    // alert("hi")
    // const perPage = 2;
    function load_data(currentPage, job_title, location, tag){
        if(!currentPage) {
            currentPage = 1;
        }
        if (location === "Select Location") {
            location = null;
        }
        alert(tag)
        alert(job_title)
        $.ajax({
            url: "/search_talent",
            method: "POST",
            data: {
                currentPage: currentPage,
                job_title: job_title,
                location: location,
                tag:tag
            },
            success: function(data){
                $('#filtered_talents').html(data.htmlresponse);
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
        var location = $('#search_location').val()
        var currentPage = 1;
        // alert(job_type)
        load_data(currentPage, job_title, location);
    }

    $('#search_text').keyup(function(){
        fetch_results();
    });

    $('#search_location').change(function(){
        fetch_results();
    });

$(document).ready(function(){
    load_data();
    // $('#paginate').customPaginator({
    //     pageItems:  $('.job_item'),
    // });
});



function prev() {
    var job_title = $('#search_text').val();
    var location = $('#search_location').val();
    var currentPage = parseInt($('#currentPage').val(), 0);
    // if (currentPage > 1) {
    //     load_data(currentPage - 1);
    // }
    currentPage -= 1;
    load_data(currentPage, job_title, location);
};

function next() {
    var job_title = $('#search_text').val();
    var location = $('#search_location').val()
    var currentPage = parseInt($('#currentPage').val(), 0);
    currentPage += 1
    load_data(currentPage, job_title, location);
};
function pages(page_no){
    var job_title = $('#search_text').val();
    var location = $('#search_location').val()
    load_data(page_no, job_title, location);
}

function devtags(tagd) {
    alert(tagd)
    load_data(1, "None", "None", tagd)
}