const url = "https://pure-peak-37709.herokuapp.com/"

function registrarUsuario(nombre,apellido,password,correo){
    fetch(url,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'     
    },
    "body": JSON.stringify({
        query :`
        mutation {
            nuevoUsuario(
                input: {
                    email: "${correo}", 
                    password: "${password}", 
                    apellido: "${apellido}", 
                    nombre: "${nombre}",                    
                }){
                    id
                }
            } `
        }
    )
  })
  .then(r => r.json())//toma el resultado
  .then(data =>{
      autenticarUsuario(correo,password)
  })
  .catch(function(error){
      console.log(error.message)
  })
}
  
function autenticarUsuario(email,password){
    fetch(url,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',        
    },
    "body": JSON.stringify({
        query :`
        mutation {
            autenticarUsuario(input:{
                email:"${email}",
                password:"${password}"
            }){
              token
            }
          } `
        }
    )
  })
    .then(r => r.json())//toma el token resutlado
    .then(data => (verificado = almacenarToken(data.data.autenticarUsuario) ));   
}


function almacenarToken(resultado){
    //y lo pone en el almacenamiento local para ser llamado cuando se usan otras funciones que lo requieran       
    if (resultado) {
      localStorage.setItem('Token',resultado.token) //si se encotró manden el mensajito de que inició y con esta se agrega el token para manejar la sesión      
      window.location.replace("./productos.html")
    }else{
        form.elements['email'].classList.add('is-danger')
        form.elements['password'].classList.add('is-danger')
        let asd =document.getElementById('error');
        asd.classList.remove('is-hidden')
    }
}
let form  = document.getElementById('CuadroRegistro');
form.addEventListener('submit', (event)=>{  
    event.preventDefault();
    email = form.elements['email'].value;password= form.elements['password'].value;nombre=form.elements['nombre'].value;apellido=form.elements['apellido'].value
    console.log(email+password+apellido+nombre)
    // registrarUsuario(nombre,apellido,password,correo)  
  })
