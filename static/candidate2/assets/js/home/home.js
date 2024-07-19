document.addEventListener('turbo:load', loadHomeData);

function loadHomeData() {
    if (!$('#indexHomeData').length) {
        return;
    }

    $('.search-categories').on('click', function () {
        $('.dropdown-menu').css('z-index', '100');
    });

    $('body').click(function () {
        $('#jobsSearchResults').fadeOut();
    });

    let availableLocation = [];
    let locationData = JSON.parse($('#indexHomeData').val());
    $.each(locationData, function (i, v) {
        availableLocation.push(v);
    });
    if ($('#search-location').length) {
        $('#search-location').autocomplete({
            source: availableLocation,
        });
    }

    let windowWidth = $(window).width();

    function brandItem () {
        if (windowWidth > 1200) {
            return 6;
        } else if (windowWidth > 576) {
            return 4;
        } else if (windowWidth > 0) {
            return 2;
        }
    }

    function brandSlider (item) {
        let itemLength = $('#brandingSlider .item:not(.cloned)').length;
        return itemLength > item ? true : false;
    }


    loadBrandSlider();
    loadTestimonialSlider();

    if (!$('.testimonial-carousel').length) {
        return;
    }


    $('.testimonial-carousel').slick({
        dots: true,
        autoplay:true,
        autoplayspeed:1600,
        centerPadding: '0',
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    $(".counter").each(function () {
        var $this = $(this),
            countTo = $this.attr("data-count");
        countDuration = parseInt($this.attr("data-duration"));
        $({ counter: $this.text() }).animate(
            {
                counter: countTo
            },
            {
                duration: countDuration,
                easing: "linear",
                step: function () {
                    $this.text(Math.floor(this.counter));
                },
                complete: function () {
                    $this.text(this.counter);
                }
            }
        );
    });

    if ($(window).width() > 1024) {
        // counting the number of classes named .item
        if ($('#brandingSlider .item').length < 6) {
            $('#brandingSlider.owl-carousel .owl-stage-outer').
                css('display', 'flex').
                css('justify-content', 'center');
        }
    }

    $('#brandingSlider .item').on('mouseover', function () {
        $(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
    });

    $('#brandingSlider .item').on('mouseout', function () {
        $(this).closest('.owl-carousel').trigger('play.owl.autoplay');
    });

    $('#notices').on('mouseover', function () {
        this.stop();
    });

    $('#notices').on('mouseout', function () {
        this.start();
    });

    // $('#search-keywords').on('keyup', function () {
    //     alert(123);
    //     let searchTerm = $(this).val();
    //     if (searchTerm != '') {
    //         $.ajax({
    //             url: route('get.jobs.search'),
    //             method: 'GET',
    //             data: { searchTerm: searchTerm },
    //             success: function (result) {
    //                 $('#jobsSearchResults').fadeIn();
    //                 $('#jobsSearchResults').empty();
    //                 result.results.forEach(function (record) {
    //                     $('#jobsSearchResults').append('<div>' + record + '</div>');
    //                 });
    //             },
    //         });
    //     } else {
    //         $('#jobsSearchResults').fadeOut();
    //     }
    // });

    // $('#jobsSearchResults').on('click', 'div', function() {
    //     $('#search-keywords').val($(this).text().trim());
    //     $('#jobsSearchResults').fadeOut();
    // });


    if (!$('.banner-carousel').length) {
        return;
    }


    //Banner Carousel
    $('.banner-carousel').slick({
        dots:false,
        autoplay:true,
        autoplayspeed:1600,
        centerPadding: '0',
        slidesToShow: 1,
        slidesToScroll: 1
    });
}

function loadBrandSlider() {
    if (!$('#brandSlider').length) {
        return;
    }

    $('#brandSlider').slick({
        dots:false,
        arrows:false,
        autoplay:true,
        autoplayspeed:1600,
        centerPadding: '0',
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
}

function loadTestimonialSlider() {
    if(!$('.testimonial-slider').length) {
        return;
    }


    $(".testimonial-slider").slick({
        centerMode: true,
        centerPadding: "20px",
        dots: true,
        slidesToShow: 3,
        infinite: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 1,
              centerPadding: "300px",
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              centerPadding: "200px",
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              centerPadding: "150px",
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerPadding: "80px",
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              centerPadding: "0",
            },
          },
        ],
    });
}
