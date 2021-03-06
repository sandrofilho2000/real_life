$(function(){

    function setCartWidth(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').css('right', cartWidth * (-1))
        $('section.finalizarPedido').css('right', cartWidth * (-1))
    }
    setCartWidth()

    function fillCart(){
        var pedidos = JSON.parse(localStorage.getItem("pedidos"))
        if(pedidos){
            pedidos.forEach((p, index)=>{
                obj = Object.entries(p)
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

        function atualizarPedido(){
            var produtos = ''
            const pedidoAll = currentCart()
            pedidoAll.forEach((obj)=>{
                pedido = Object.entries(obj)
                let nome = pedido[0][1]
                let img = pedido[1][1]
                let preco = pedido[2][1]
                let qtn =  pedido[4][1]

                produtos += `*${qtn}x* _${nome}_ *(R$${preco})*\n` 
                
                
                
            })
            produtos = produtos.replaceAll('  ', '')

            pedidoFinal =  
`*NOVO PEDIDO* 
-----------------------------
RESUMO DO PEDIDO 

${produtos}


OBSERVA????ES

${document.querySelector('.productObservation textarea').value}


 -  -  -  -  -  -  -  -  -  -  -

SUBTOTAL: ${document.querySelector('span.subtotal').innerText}

 ------------------------------------------
*->* Dados para entrega 
 
${dadosEntrega()}

Taxa de Entrega: ${document.querySelector('span.spanEntrega').innerText}

*->* Tempo de Entrega: ?? combinar

 ------------------------------- 

*->* TOTAL = ${document.querySelector('span.total').innerText}
 ------------------------------ 

*->* PAGAMENTO 
 
${pagamento()}`
            
        document.querySelector('#copiarAqui').value = pedidoFinal
        document.querySelector(".hiddenOrder").innerHTML = pedidoFinal
        return pedidoFinal
        
        }

        function taxaDeEntrega(){
            if(document.querySelector('#entrega').checked){
                document.querySelector('.spanEntrega').innerText = "R$0,00"
                return 0
            }else{
                document.querySelector('.spanEntrega').innerText = "R$6,00"
                return 6
            }
        }

        atualizarPedido()
        

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
                document.querySelector(".total").innerHTML = `R$${String((subtotal + taxaDeEntrega()).toFixed(2)).replaceAll(".", ',')}`
            }else{
                document.querySelector(".total").innerHTML = `R$0,00`
            }

            addOrderToMemory()
            atualizarPedido()
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

        function verificarEntrega(){
            if(document.querySelector('#entrega').checked){
                document.querySelectorAll('.addressToggle').forEach((single)=>{
                    single.classList.add('unabled')
                    document.querySelector('section.finalizarPedido h4').innerText = "?? RETIRAR"
                    
                })
                return false
            }else{
                document.querySelectorAll('.addressToggle').forEach((single)=>{
                    single.classList.remove('unabled')
                    document.querySelector('section.finalizarPedido h4').innerText = "?? ENTREGAR"  
                     
                })
                return true 
            } 
        }
        verificarEntrega()
        function dadosEntrega(){
            if(verificarEntrega() == true){
                return `Nome: ${document.querySelector('[name=nome]').value}
Telefone: ${document.querySelector('[name=telefone]').value}
Endere??o: ${document.querySelector('[name=endereco]').value}
Bairro: ${document.querySelector('[name=bairro]').value}
Complemento: ${document.querySelector('[name=complemento]').value}
Ponto de Refer??ncia: ${document.querySelector('[name=referencia]').value}` 
            }else{
                return `Nome: ${document.querySelector('[name=nome]').value}
Telefone: ${document.querySelector('[name=telefone]').value}`
            }

            
        }

        function pagamento(){
            
            if(!document.querySelector("#dinheiro").checked){
                document.querySelector(".troco").style.display = 'none'
                if(document.querySelector("#credito").checked){
                    return "Pagamento no cr??dito"
                }else if(document.querySelector("#debito").checked){
                    return "Pagamento no d??bito"
                }
                
            }else{
                document.querySelector(".troco").style.display = 'flex'

                if(document.querySelector("#troco").value.length != 0){
                    return `Pagamento no dinheiro \nTroco para R$${Number(document.querySelector("#troco").value).toFixed(2)}`
                }else{
                    return `Pagamento no dinheiro \nSem troco`
                }

            }
            
        }

        function liberarPedidoBtn(){
            let nomeLength = document.querySelector('[name=nome]').value.length
            let telefoneLength = document.querySelector('[name=telefone]').value.length
            let enderecoLength = document.querySelector('[name=endereco]').value.length
            let bairroLength = document.querySelector('[name=bairro]').value.length
            let referenciaLength = document.querySelector('[name=referencia]').value.length

            let dinheiro = document.querySelector("#dinheiro")
            let credito = document.querySelector("#credito")
            let debito = document.querySelector("#debito")
        
            if(dinheiro.checked == true || credito.checked == true || debito.checked == true){
                if(!document.querySelector('#entrega').checked){
                    if(nomeLength, telefoneLength, enderecoLength, bairroLength, referenciaLength != 0){
                        document.querySelector(".pedir h2").classList.add("active")
                    }else{
                        document.querySelector(".pedir h2").classList.remove("active")
                    }
                }else{
                    if(nomeLength, telefoneLength != 0){
                        document.querySelector(".pedir h2").classList.add("active")
                    }else{
                        document.querySelector(".pedir h2").classList.remove("active")
                    }
                }
            }else{
                console.log("CHECKED")
                document.querySelector(".pedir h2").classList.remove("active")
            }
            

            pagamento()
            
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

        document.querySelector('#entrega').addEventListener('click', function(){
            taxaDeEntrega()
            totalAll()
        })

        document.querySelectorAll("form div input").forEach(input=>{
            input.addEventListener("keyup", function(){
                atualizarPedido()
                liberarPedidoBtn()
            })
            input.addEventListener("blur", function(){
                atualizarPedido()
                liberarPedidoBtn()
            })
        })

        document.querySelector('.productObservation textarea').addEventListener('keyup', function(){
            atualizarPedido()
        })

        document.querySelectorAll("[name=payment]").forEach((radio)=>{
            radio.addEventListener('click', function(){
                atualizarPedido()
                liberarPedidoBtn()
            })
        })

        document.querySelector("#troco").addEventListener('keyup', function(){
            atualizarPedido()
        })

        $('.seuPedido p').click(function(){
            $('.seuPedido p').html('COPIADO <i class="bx bx-check"></i>')
    
            var copiar = document.getElementById("copiarAqui")
            copiar.select();
            document.execCommand("copy");
            setTimeout(() => {
                $('.seuPedido .container').css('height', '100%')
                $(this).css('bottom', '-20px')
                $(this).html('COPIAR PEDIDO <i class="bx bx-copy" ></i>')
            }, 3000);
            
    
            
        })

        $('.pedir h2').click(function(){
            var yourMessage = atualizarPedido()
            function getLinkWhastapp(number) {
                message = window.encodeURIComponent(yourMessage)
                console.log(yourMessage)
                window.open(`https://wa.me/553284116088?text=${message}`)
            }
    
            getLinkWhastapp("+55 32 8411 6088")
        })

        $('#entrega').change(function(){
            verificarEntrega()
        })

    }
    

   
    
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

    $(".bx.bxs-shopping-bag, p.cartNumber, .cart .backArrow").click(function(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.cart').toggleClass("active")
        $('.overlayCart').css('width', `calc( 100vw - ${cartWidth} )`)
        $('.overlayCart').toggleClass("active")
        
    })

    $("h2.finalizarPedido, .finalizarPedido .backArrow").click(function(){
        var cartWidth = document.querySelector('section.cart').offsetWidth;
        $('section.finalizarPedido').toggleClass("active")
    })

    

    
    
    window.addEventListener('resize', setCartWidth())
    all()

})

