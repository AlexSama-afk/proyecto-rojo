window.addEventListener('load',()=>{
  if(!localStorage.getItem('Token')){
    alert('Para continuar, inicia sesión')
    window.location.replace('inicio.html')
  }  
  obtenerDeseados()
})
const url = "https://pure-peak-37709.herokuapp.com/"

function obtenerDeseados(){
  fetch(url,{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      "Authorization" :localStorage.getItem('Token'),
      'Accept': 'application/json',
  },
  "body": JSON.stringify({
      query :`{
        obtenerDeseados{
            nombre,
            usuario,
            tienda,
            precio,
            imagen,
            url,
            id
          }
        }`
      }
  )
})
  .then(r => r.json())
  .then(productos => renderProductos(productos.data.obtenerDeseados));
}


function eliminarProducto(elemento){
  id = elemento.getAttribute('id-data')
  fetch(url,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
"body": JSON.stringify({
    query :`
    mutation {
      eliminarProducto(
        id:"${id}"
        )
    } `
    })
})
  .then(r => r.json())
  .then(productos =>alerta() )
  .catch(error => console.log(error))
}

function alerta(){
  alert("El porducto se eliminó con éxito")
  obtenerDeseados()
}
let productoss
function renderProductos(productos) {    
  let htmlProducto = ''
  productosEncontrados = productos
  productos.forEach(producto => {             
    productoss = producto
      htmlProducto += `
          <div class="column is-10-mobile is-6-tablet is-3-desktop">                
              <div class="tile is-parent" name="btn-agregar">
                  <div class="btn-deseados" id-data="${producto.id}" onClick="eliminarProducto(this)">
                      <span >-</span>
                  </div>
              </div>
              <fugre class="image">
                  <img src="${producto.imagen}" alt="Imagen del producto equisde">
              </figure>
              <div class="producto-info">
                  <span class="title is-4">${producto.nombre}</span>
                  <span class="subtitle is-5">$ ${producto.precio}</span>
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