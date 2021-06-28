window.addEventListener('load',()=>{
    var nav= document.querySelector('#navUsuario')
    var sesion= document.querySelector('#navCerrar')    
    
    if(localStorage.getItem('Token')){
        nav.classList.add('is-hidden')
        sesion.classList.remove('is-hidden')
    }    
})
(function () {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();