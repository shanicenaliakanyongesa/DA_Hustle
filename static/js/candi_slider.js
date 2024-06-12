var swiper = new Swiper(".slide-content", {
    slidesPerView: 6,
    spaceBetween: 5,
    loop: true,
    centerSlide:'true',
    fade: 'true',
    grabCursor: 'true',
    allowSlideNext:'true',
    allowSlidePrev:'true',
    // autoplay:{delay:1500},
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0:{
            slidesPerView: 2,
        },
        520:{
            slidesPerView: 4,
        },
        950:{
            slidesPerView: 5,
        }
    },
  });
