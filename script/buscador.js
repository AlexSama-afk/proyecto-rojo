const urlAPI = "https://pure-peak-37709.herokuapp.com/"
const textoBuscar = document.getElementById('formbusqueda');

textoBuscar.addEventListener('submit', function(e){
    e.preventDefault();
    buscarProducto(textoBuscar['textoBuscador'].value)
    document.querySelector('#contenido').classList.toggle('no-display')
    document.querySelector('#resultados').classList.toggle('no-display')
});
let productosEncontrados = {}
function buscarProducto(nombre){
    buscar = "https://buscarapicalzado.herokuapp.com/?calzado="+(nombre)
    fetch(buscar,{
        method: 'GET',
        dataType: 'json'
    })
    .then(r => r.json())
    .then(r => {
        renderProductos(r)
    })
    .then(        
    )
    .catch(err => console.log(err))
}


function crearProducto(entrada){    
    if(!localStorage.getItem('Token')){
        alert('Para continuar, inicia sesión')
        window.location.replace('login.html')
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
            title: 'Se ha agregado a la lista de deseados',
            showConfirmButton: false,
            timer: 1500
        })
    ).catch(err => console.log(err))
    ;
  }
  
let $contendedor = document.querySelector('#productos')

function renderProductos(productos) {    
    let htmlProducto = ''
    productosEncontrados = productos
    productos.forEach(producto => {
        // console.log(producto)        
        htmlProducto += `
          <div class="column is-10-mobile is-6-tablet is-3-desktop bg-orange-01 mr-2">                
            <div class="btn-deseados mb-1" nombre-data="${producto.nombre}" onClick="crearProducto(this)">
                <span>+</span>
            </div>
            <figure class="image">
                <img src="${producto.imagen}" alt="Imagen del producto equisde">
            </figure>
            <div class="producto-info">
                <span class="title is-5 mb-5">${producto.nombre}</span>
                <span class="subtitle is-5 mb-1">${producto.precio}</span>
                <span class="subtitle is-5 is-uppercase mb-1">${producto.tienda}</span>
            </div>
            <a class="button is-orange has-text-white" href='${producto.url}'>
                Ver Producto
            </a>
          </div>  
      `        
    });    
    document.querySelector('#productos').innerHTML = htmlProducto
}