const textoBuscar = document.querySelector('#textoBuscador');

textoBuscar.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        buscarProducto(textoBuscar.value)
    }
});

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
    .catch(err => console.log(err))
}

function renderProductos(productos) {
    console.log(productos)
    let htmlProducto = ''
    productos.forEach(producto => {
        console.log(producto)
        htmlProducto += `
            <div class="producto">
                <div class="producto-header">
                    <div class="btn-deseados">
                        <span>+</span>
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