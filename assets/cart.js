$(function(){

    function setWindowRight(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').css('right', cartWidth * (-1))
        $(".bx.bxs-shopping-bag, p.cartNumber, .backArrow").click(function(){
            var cartWidth = document.querySelector('section.cart').offsetWidth;
            $('section.cart').toggleClass("active")
            if($( "section.cart" ).hasClass( "active" )){
                $('html').css('right', cartWidth)
            }else{
                $('html').css('right', 0)
            }
            
        })
    }
    setWindowRight()

    $(".comprarSingle").click(function(){
        var cartQtnTotal = Number($('.cartNumber').html())
        $('.cartNumber').html(cartQtnTotal+=1)
    })

    window.addEventListener('resize', setWindowRight())

    
})