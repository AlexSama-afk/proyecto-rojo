let textoBuscar = document.querySelector('#textoBuscador');
textoBuscar.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        //Codigo para obtener los resultados de busqueda
    }
});

document.querySelector('#hamburguesa').addEventListener('click', function(){
    document.querySelector('#menu').classList.toggle('no-display');
    document.querySelector('#hamburguesa').classList.toggle('no-display');
})

document.querySelector('#menu').addEventListener('click', function(){
    document.querySelector('#menu').classList.toggle('no-display');
    document.querySelector('#hamburguesa').classList.toggle('no-display');
});