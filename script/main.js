document.querySelector('#hamburguesa').addEventListener('click', function(){
    document.querySelector('#menu').classList.toggle('no-display');
    document.querySelector('#hamburguesa').classList.toggle('no-display');
    document.querySelector('#contenido').classList.toggle('no-display');
})

document.querySelector('#menu').addEventListener('click', function(){
    document.querySelector('#menu').classList.toggle('no-display');
    document.querySelector('#hamburguesa').classList.toggle('no-display');
    document.querySelector('#contenido').classList.toggle('no-display');
});