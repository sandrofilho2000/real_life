$(function(){

    function setCartWidth(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').css('right', cartWidth * (-1))
    }
    setCartWidth()

    function fillCart(){
        var pedidos = JSON.parse(localStorage.getItem("pedidos"))
        if(pedidos){
            pedidos.forEach((p, index)=>{
                obj = Object.entries(p)
                console.log(obj)
                let nome = obj[0][1]
                let img = obj[1][1]
                let preco = obj[2][1]
                let realPreco = obj[3][1]
                let qtn =  obj[4][1]
                
                let produtoSingle = document.createElement('div')
                produtoSingle.setAttribute("class", 'productSingle')
                let div = `
                            <div class='productDelete'><p>+</p></div>
                            <div class='productDescription'>
                                <div class='productImage'>
                                    <img src='${img}' alt=''>
                                </div>
                                <div class='productText'>
                                    <p class='productName' ><b>${nome}</b></p>
                                </div>
                            </div>
                            <div class='productQtn'>
                                <p class='plusQtn'>+</p>
                                <p class='qtn'><input type='number' min='0' name=''  class='inputQtn' value='${qtn}'></p>
                                <p class='minusQtn'>-</p>
    
                                
                            </div>
                            <div class='productPrice'>
                                <span class='currency'>R$</span><span class='number'>${preco}</span><span class='realNumber'>${realPreco}</span>
                            </div>`
    
                produtoSingle.innerHTML = div
    
                document.querySelector('.productWrapper').appendChild(produtoSingle)
            })
        }
        
    }
    fillCart()

    function all(){
        function currentCart(){
            const currentOrder = []
            const pedidoAll = document.
            querySelectorAll('.productSingle')
            pedidoAll.forEach((pedido, index)=>{
                const pedidoSingle = {}
                let nome = pedido.querySelector(".productName b").innerText
                let img = pedido.querySelector("img").getAttribute('src')
                let preco = pedido.querySelector("span.number").innerHTML
                let realPreco = pedido.querySelector("span.realNumber").innerHTML
                let qtn = pedido.querySelector('.inputQtn').value
                pedidoSingle["nome"] = nome
                pedidoSingle["img"] = img
                pedidoSingle["preco"] = preco
                pedidoSingle["realPreco"] = realPreco
                pedidoSingle["qtn"] = qtn
                currentOrder.push(pedidoSingle)
            })

            return currentOrder
        }
        
        function addOrderToMemory(){
            

            currentCart()
            
            localStorage.setItem("pedidos", JSON.stringify(currentCart()));
        }

        function finalizarPedido(){
            var produtos = ''
            const pedidoAll = currentCart()
            pedidoAll.forEach((obj)=>{
                pedido = Object.entries(obj)
                let nome = pedido[0][1]
                let img = pedido[1][1]
                let preco = pedido[2][1]
                let qtn =  pedido[4][1]

                produtos += `*${qtn}x* _${nome}_ *(R$${preco})* 
                `
                
                
            })
            produtos = produtos.replaceAll('  ', '')
            
            pedidoFinal =  `
                NOVO PEDIDO 
                -----------------------------
                ▶ RESUMO DO PEDIDO 

                Pedido 19

                Link para acompanhar status do pedido:
                https://pedir.delivery/app/varandaodochef/track?token=86a4499c0294cb8cf431c2a415f18609192f1cf128d16e9f749f247e52293255 

                1x Monte sua quentinha (R$ 12,00)
                (1x) arroz
                (1x) Feijão
                (1x) Macarrão
                (1x) Frango Grelhado

                
                Subtotal do item: R$ 12,00
                -  -  -  -  -  -  -  -  -  -  -

                SUBTOTAL: R$ 12,00

                ------------------------------------------
                ▶ Dados para entrega 
                
                Nome: Sandro
                Endereço: Marli Ferreira, nº: 32
                Bairro: Apollo III
                Ponto de Referência: Creche
                Telefone: 21984238879

                Taxa de Entrega: R$ 3,00

                🕙 Tempo de Entrega: aprox. 13:37 a 14:07

                ------------------------------- 
                ▶ TOTAL = R$ 15,00
                ------------------------------ 

                ▶ PAGAMENTO 
                
                Pagamento em Dinheiro
            `

            return pedidoFinal
        }

        console.log(finalizarPedido())
        $('h2.finalizarPedido').click(function(){
            var yourNumber = "+55 32 8411 6088 "
            var yourMessage = finalizarPedido()
            
    
            // %20 mean space in link
            // If you already had an array then you just join them with '%20'
            // easy right
    
            function getLinkWhastapp(number, message) {
                number = yourNumber
                message = yourMessage
                message = window.encodeURIComponent(message)
                console.log(yourMessage)
                window.open(`https://wa.me/553284116088?text=${message}`)
            }
    
            getLinkWhastapp("+55 32 8411 6088", "Olá, WhatsApp")
        })



        finalizarPedido()
        

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

            addOrderToMemory()
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

    
    window.addEventListener('resize', setCartWidth())

    $(".bx.bxs-shopping-bag, p.cartNumber, .backArrow").click(function(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').toggleClass("active")
        $('.overlayCart').css('width', `calc( 100vw - ${cartWidth} )`)
        $('.overlayCart').toggleClass("active")
        
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
















































