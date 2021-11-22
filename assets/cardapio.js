$(function(){
    document.querySelectorAll('section.massas .massasContainer .massaSingle').forEach((massa)=>{
        
        massa.addEventListener('click', (e)=>{
            
            document.querySelectorAll('section.massas .massasContainer .massaSingle').forEach((massa)=>{
                massa.classList.remove("active")
            })
            e.currentTarget.classList.add('active')
            let titulo = e.currentTarget.querySelector('.massaMenu > p strong').innerHTML
            document.querySelector('section.cardapio h3').innerHTML = titulo.toUpperCase()
            document.querySelectorAll('.cardapioContainer').forEach((cardapioSingle)=>{
                console.log(titulo.replaceAll(' ','').toLowerCase())
                if(cardapioSingle.classList.contains(titulo.replaceAll(' ','').toLowerCase())){
                    cardapioSingle.classList.add('active')
                    console.log(cardapioSingle)
                }else{
                    cardapioSingle.classList.remove('active')
                    console.log(cardapioSingle)
                }
            })
        })
    })
})