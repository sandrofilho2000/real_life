$(function(){

    function setWindowRight(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').css('right', cartWidth * (-1))
    }
    setWindowRight()

    

    function all(){

        function cartNumber(){
            let inputNum = document.querySelectorAll('.inputQtn')
            let number = 0
            inputNum.forEach((n)=>{
                number += Number(n.value)
            })
            document.querySelector('.cartNumber').innerHTML = number
            let num = document.querySelectorAll('.productSingle')
            document.querySelector('.cartNumber').innerHTML = num.length
            if(num.length == 0){
                $('section.cart h4').css('display', 'block')
            }else{
                $('section.cart h4').css('display', 'none')
            }

            return num.length
        }
        cartNumber()

        function totalAll(){
            var totais = document.querySelectorAll(".productPrice .number")
            var subtotal = 0
            totais.forEach((totalSingle)=>{
                subtotal += Number(totalSingle.innerHTML.replaceAll(',', '.'))
            })
            document.querySelector(".subtotal").innerHTML = `R$${String(subtotal.toFixed(2)).replaceAll(".", ',')}`

            if(document.querySelector(".subtotal").innerHTML != 'R$0,00'){
                document.querySelector(".total").innerHTML = `R$${String((subtotal + 6).toFixed(2)).replaceAll(".", ',')}`
            }else{
                document.querySelector(".total").innerHTML = `R$0,00`
            }
        }
        totalAll()

        function productTotal(e){
            let parent = ''
            if(e.currentTarget.getAttribute('class') == 'inputQtn'){
                parent = e.currentTarget.parentElement.parentElement
            }else{
                parent = e.currentTarget.parentElement
            }
    
            let qtn = parent.querySelector(".qtn input")
            
            let productSingle = parent.parentElement
            let realPrice = productSingle.querySelector('.productPrice .realNumber').innerHTML
            realPrice = Number(realPrice.replaceAll(',', '.'))
            let productSinglePrice = productSingle.querySelector('.productPrice .number').innerHTML
            productSinglePrice = Number(productSinglePrice.replaceAll(',', '.'))
            if(e.currentTarget.getAttribute('class') == 'plusQtn'){
                let htmlPrice = productSinglePrice+=realPrice
                htmlPrice = htmlPrice.toFixed(2)
                productSingle.querySelector('.productPrice .number').innerHTML = String(htmlPrice).replaceAll('.', ',') 
            }
    
            if(e.currentTarget.getAttribute('class') == 'minusQtn'){
                let htmlPrice = productSinglePrice-=realPrice
                productSinglePrice = productSinglePrice.toFixed(2)
    
                if(productSinglePrice >= 0){
                    productSingle.querySelector('.productPrice .number').innerHTML = String(productSinglePrice).replaceAll('.', ',')   
                }else{
                    productSingle.querySelector('.productPrice .number').innerHTML = "0,00"
                }
    
            }
    
            if(e.currentTarget.getAttribute('class') == 'inputQtn'){
                let htmlPrice = realPrice * e.currentTarget.value
                htmlPrice = htmlPrice.toFixed(2)
                productSingle.querySelector('.productPrice .number').innerHTML = String(htmlPrice).replaceAll('.', ',') 
            }
            

            totalAll()
    
        }

        document.querySelectorAll(".plusQtn").forEach((plusQtn)=>{
            plusQtn.onclick = (e)=>{
                let parent = e.currentTarget.parentElement
                let btn = parent.querySelector(".qtn input")
                btn.value = Number(btn.value) + 1
    
                productTotal(e)
            }
        })
    
        document.querySelectorAll(".minusQtn").forEach((minusQtn)=>{
            minusQtn.onclick = (e)=>{
                
                let parent = e.currentTarget.parentElement
                let btn = parent.querySelector(".qtn input")
                if(btn.value != 0){
                    btn.value = Number(btn.value) - 1
                }else{
                    btn.value = 0
                }
    
                productTotal(e)
                
            }
        })
    
        document.querySelectorAll(".qtn input").forEach((qtnInput)=>{
            qtnInput.addEventListener('keyup', function(e){
                
                productTotal(e)
                
            })
        })
    
        document.querySelectorAll(".productDelete p").forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function(e){
                let parent =  e.currentTarget.parentElement.parentElement
                parent.remove()

                totalAll()
                cartNumber()
            })
        })



    }

    window.addEventListener('resize', setWindowRight())

    $(".bx.bxs-shopping-bag, p.cartNumber, .backArrow").click(function(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').toggleClass("active")
        if($( "section.cart" ).hasClass( "active" )){
            $('html').css('right', cartWidth)
        }else{
            $('html').css('right', 0)
        }
        
    })

    $(".comprarSingle").click(function(e){

        let parent = e.currentTarget.parentElement
        let nome = parent.querySelector(".massaMenu .menuContainer p").innerText
        let preco = parent.querySelector(".massaMenu .menuContainer .precoSingle").innerText.replaceAll("R$ ", '')
        let image = parent.querySelector("img").getAttribute('src')
        let produtoSingle = document.createElement('div')
        produtoSingle.setAttribute("class", 'productSingle')
        let div = `
                    <div class='productDelete'><p>+</p></div>
                    <div class='productDescription'>
                        <div class='productImage'>
                            <img src='${image}' alt=''>
                        </div>
                        <div class='productText'>
                            <p class='productName' ><b>${nome}</b></p>
                        </div>
                    </div>
                    <div class='productQtn'>
                        <p class='plusQtn'>+</p>
                        <p class='qtn'><input type='number' min='0' name=''  class='inputQtn' value='1'></p>
                        <p class='minusQtn'>-</p>

                        
                    </div>
                    <div class='productPrice'>
                        <span class='currency'>R$</span><span class='number'>${preco}</span><span class='realNumber'>${preco}</span>
                    </div>`

        produtoSingle.innerHTML = div

        document.querySelector('.productWrapper').appendChild(produtoSingle)

        all()
    })



    

    all()

})
















































