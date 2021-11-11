$(function(){
    $(".owl-carousel.massasContainer, .owl-carousel.depoimentosContainer").owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        rows: 2,
        items: 1,
        dots: true,
        responsiveClass:true,
        infinity: false,
        responsive:{
            

            0:{
                items:1,
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                loop:false
            }

        }
    })   
    $(".owl-carousel.galeriaContainer").owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        rows: 2,
        items: 1,
        dots: true,
        slideBy: 'page',
        responsiveClass:true,
        infinity: false,
        responsive:{
            

            0:{
                items:1,
                rows: 2
            },
            600:{
                items:4,
                nav:false,
                rows: 2
            },
            1000:{
                items:7,
                loop:false
            }

        }
    })   
})