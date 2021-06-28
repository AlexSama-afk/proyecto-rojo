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
        alert("Se agregó el producto con exito")//tal vez algo más bonito
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
          <div class="column is-10-mobile is-6-tablet is-3-desktop">                
              <div class="tile is-parent" name="btn-agregar">
                  <div class="btn-deseados" nombre-data="${producto.nombre}" onClick="crearProducto(this)">
                      <span >+</span>
                  </div>
              </div>
              <fugre class="image">
                  <img src="${producto.imagen}" alt="Imagen del producto equisde">
              </figure>
              <div class="producto-info">
                  <span class="title is-4">${producto.nombre}</span>
                  <span class="subtitle is-5">${producto.precio}</span>
                  <span class="subtitle is-6">${producto.tienda}</span>
              </div>
              <span class="button">
                  <a class="button" href='${producto.url}'>
                      Ver Producto
                  </a>
              </span>
          </div>  
      `        
    });    
    document.querySelector('#productos').innerHTML = htmlProducto
}