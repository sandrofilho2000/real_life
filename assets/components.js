
document.querySelectorAll("p.ingredientesToggle").forEach(ingrediente => {
    ingrediente.addEventListener('click', function(e){
        let parent =  e.currentTarget.parentElement.parentElement.parentElement
        if(parent.classList.contains('active')){
            parent.classList.remove('active')
        }else{
            parent.classList.add('active')
        }
    })
})

$(function(){
    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(stateCheck);
          $('.overlayLoad').fadeOut()
        }
      }, 100);
})


