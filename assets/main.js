$(function(){
   
    var headerBottom = document.querySelector("header").offsetHeight;
    var massasBottom = document.querySelector("section#massas").offsetHeight;
    var cardapioBottom = document.querySelector("section#cardapio").offsetHeight;
    var galeriaBottom = document.querySelector("section#galeria").offsetHeight;


    document.querySelectorAll("a.massas").forEach((value)=>{
        value.addEventListener("click", (e)=>{
            e.preventDefault()
            window.scrollTo({top: (headerBottom) , behavior: 'smooth'});
        })
    })

    document.querySelectorAll("a.cardapio").forEach((value)=>{
        value.addEventListener("click", (e)=>{
            e.preventDefault()
            console.log(massasBottom)
            window.scrollTo({top: (headerBottom + massasBottom) , behavior: 'smooth'});
        })
    })

    document.querySelectorAll("a.galeria").forEach((value)=>{
        value.addEventListener("click", (e)=>{
            e.preventDefault()
            console.log(massasBottom)
            window.scrollTo({top: (headerBottom + massasBottom + cardapioBottom) , behavior: 'smooth'});
        })
    })

    document.querySelectorAll("a.depoimentos").forEach((value)=>{
        value.addEventListener("click", (e)=>{
            e.preventDefault()
            console.log(massasBottom)
            window.scrollTo({top: (headerBottom + massasBottom + cardapioBottom + galeriaBottom) , behavior: 'smooth'});
        })
    })

    document.querySelectorAll("a.depoimentos").forEach((value)=>{
        value.addEventListener("click", (e)=>{
            e.preventDefault()
            console.log(massasBottom)
            window.scrollTo({bottom: (0) , behavior: 'smooth'});
        })
    })



        
})