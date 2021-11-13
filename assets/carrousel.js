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
            
            550:{
                items: 1,
                loop:false
            },

            
           
            750:{
                items:2,
                loop:false
            },
            1200:{
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
            },
            550:{
                items: 2,
            },
            770:{
                items: 3,
            },
            1010:{
                items: 4,
            },
            1240:{
                items: 5,
            },
            1440:{
                items: 6,
            },
  

        }
    })   
})