const urlAPI = "https://pure-peak-37709.herokuapp.com/"
const textoBuscar = document.getElementById('formbusqueda');

window.addEventListener('load',()=>{
    if(localStorage.getItem('productosE')){
        // console.log(localStorage.getItem('productosE'))
        renderProductos(localStorage.getItem('productosE'))
    }
})
textoBuscar.addEventListener('submit', function(e){
    e.preventDefault();
    buscarProducto(textoBuscar['textoBuscador'].value)
    document.querySelector('#contenido').classList.toggle('no-display')
    document.querySelector('#resultados').classList.toggle('no-display')
});
let productosEncontrados ={}
function errores(response) {
    if (!response.ok) {
        NoEncontrado()
    }else{
        return response;
    }
}

function buscarProducto(nombre){
    buscar ='https://buscarapicalzado.herokuapp.com/?calzado="'+(nombre)+'"'
    fetch(buscar,{
        method: 'GET',
        dataType: 'json'
    })
    
    .then(r => r.json())
    .then(r => {
        renderProductos(r)
    })
    .catch(err => console.log(err))
    
}


function crearProducto(entrada){    
    if(!localStorage.getItem('Token')){
        alert('Para continuar, inicia sesión')
        window.location.replace('inicio.html')
    }
    encontrado =productosEncontrados.find(x => x.nombre === (entrada.getAttribute("nombre-data")))
    const {nombre,precio,imagen,tienda,url} = encontrado    
    fetch(urlAPI,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "Authorization" :localStorage.getItem('Token'),       
    },
    "body": JSON.stringify({
        query :`
        mutation {
        crearProducto(
            producto: {
            nombre: "${nombre}", 
            precio: ${parseFloat(precio.substring(1))}, 
            imagen: "${imagen}", 
            url: "${url}",
            tienda: "${tienda}",
            }){
            id
            nombre
            precio
        }
        } `
        })
    })
    .then(
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha agregado a deseados correctamente',
            showConfirmButton: false,
            timer: 1500
            })
    ).catch(NoEncontrado())
    ;
}

let $contendedor =document.querySelector('#productos')

function NoEncontrado(){
    const htmlProducto =` 
    <div class="column is-10-mobile is-6-tablet is-3-desktop bg-producto mr-2 mb-2"> 
        <h2 class="title is-danger">No se encontraron resultados</h2>
    </div>            
      `
    document.querySelector('#contenido').classList.remove('no-display')
    document.querySelector('#resultados').classList.remove('no-display')
    document.querySelector('#productos').innerHTML = htmlProducto
}
function renderProductos(productos) {    
    let htmlProducto = ''
    if(productos.length == 0){
        NoEncontrado()
    }else{        
        productosEncontrados = productos
        localStorage.setItem('productosE',productosEncontrados)
        productos.forEach(producto => {
            // console.log(producto)        
            htmlProducto += `
            <div class="column is-10-mobile is-6-tablet is-3-desktop bg-producto mr-2 mb-2">                
                <div class="tile is-parent" name="btn-agregar">
                    <div class="btn-deseados" nombre-data="${producto.nombre}" onClick="crearProducto(this)">
                        <span >+</span>
                    </div>
                </div>
                <fugre class="image">
                    <img src="${producto.imagen}" alt="Imagen del producto equisde">
                </figure>
                <div class="producto-info">
                    <span class="title is-5 mb-5">${producto.nombre}</span>
                    <span class="subtitle is-5 mb-2">${producto.precio}</span>
                    <span class="subtitle is-5 mb-2 is-uppercase">${producto.tienda}</span>
                </div>
                <a class="button bg-orange has-text-white" href='${producto.url}'>
                    Ver Producto
                </a>
            </div>  
        `        
        });
    }
    document.querySelector('#productos').innerHTML = htmlProducto
}