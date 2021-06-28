window.addEventListener('load',()=>{
    botones()
       
})
var sesion= document.querySelector('#navCerrar')    
var nav= document.querySelector('#navUsuario')
function botones (){
    if(localStorage.getItem('Token')){
        nav.classList.add('is-hidden')
        sesion.classList.remove('is-hidden')
    } 
}
sesion.addEventListener('click',()=>{
    localStorage.removeItem('Token')  
    botones()  
})