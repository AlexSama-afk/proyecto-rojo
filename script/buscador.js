window.addEventListener('load',()=>{
   
})
const urlAPI = "https://pure-peak-37709.herokuapp.com/"
const textoBuscar = document.getElementById('formbusqueda');

textoBuscar.addEventListener('submit', function(e){
    e.preventDefault();
    buscarProducto(textoBuscar['textoBuscador'].value)
    
});
let productosEncontrados ={}
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
        console.log("Se agregó el producto con exito")
    ).catch(err => console.log(err))
    ;
  }
  
let $contendedor =document.querySelector('#productos')

function renderProductos(productos) {    
    let htmlProducto = ''
    productosEncontrados = productos
    productos.forEach(producto => {
        // console.log(producto)        
        htmlProducto += `
            <div class="producto">                
                <div class="producto-header" name="btn-agregar">
                    <div class="btn-deseados" nombre-data="${producto.nombre}" onClick="crearProducto(this)">
                        <span >+</span>
                    </div>
                </div>
                <span class="img-producto">
                    <img src="${producto.imagen}" alt="Imagen del producto equisde">
                </span>
                <div class="producto-info">
                    <span class="nombre">${producto.nombre}</span>
                    <span class="precio ">${producto.precio}</span>
                    <span class="tienda">${producto.tienda}</span>
                </div>
                <span class="btn">
                    <a class="btn-producto" href='${producto.url}'>
                        Ver Producto
                    </a>
                </span>
            </div>  
        `
        
    });    
    document.querySelector('#productos').innerHTML = htmlProducto
}