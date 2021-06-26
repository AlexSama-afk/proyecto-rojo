const url = "https://pure-peak-37709.herokuapp.com/"

function obtenerDeseados(){
    var query = `query obtenerDeseados {
        id,
        usuario,
        nombre,
        precio,
        imagen,
        url,
        tienda
      }`;
       
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" :localStorage.getItem('Token'),
        },
        body: JSON.stringify({
          query,
          variables: { Authorization },
        })
      })
      .then(r => r.json())
    .then(productos => console.log({productos})); //regresa un objeto que contiene:  id,usuario,nombre,precio,imagen,url,tienda
}

function eliminarProducto(idProducto){
  var query = `mutation{
    eliminarProducto(id:${idProducto}){
    }
    }`;
     
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    .then(r => r.json())
  .then(productos => console.log({productos})); //regresa un objeto que contiene:  id,usuario,nombre,precio,imagen,url,tienda
}