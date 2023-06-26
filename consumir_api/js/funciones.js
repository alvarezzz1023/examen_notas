const url = 'http://localhost:8082/api/usuario'
const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.usuarios //Capturar el array devuelto por la api
        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta += `<tr><td>${usuario.documento}</td>`+
            `<td>${usuario.nombre}</td>`+
            `<td>${usuario.nota1}</td>`+
            `<td>${usuario.nota2}</td>`+
            `<td>${usuario.nota3}</td>`+
            `<td>${usuario.promedio}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red"  onclick='eliminar(${JSON.stringify(usuario)})'>Eliminar</a></td>`+
            `</tr>`
            body.innerHTML = respuesta
        })
    })

}


const registrar = async () => {
    let _documento = document.getElementById('documento').value;
    let _nombre = document.getElementById('nombre').value;
    let _nota1 = document.getElementById('nota1').value;
    let _nota2 = document.getElementById('nota2').value; 
    let _nota3 = document.getElementById('nota3').value;
    

      let usuario = {
        documento: _documento,
        nombre: _nombre,
        nota1: _nota1,
        nota2: _nota2,
        nota3: _nota3
        

      };

      console.log(usuario)
  
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(usuario), //Convertir el objeto usuario a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a JSON
        .then(json => {
          console.log(json);
          if (json.msg) {
            Swal.fire(
              json.msg,
              '',
              'success'
            );
          }
        });
    } 
      
    
const editar= (usuario)=>{
    document.getElementById('documento').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('nota1').value = ''
    document.getElementById('nota2').value = ''
    document.getElementById('nota3').value = ''
   


    document.getElementById('documento').value = usuario.documento
    document.getElementById('nombre').value = usuario.nombre
    document.getElementById('nota1').value = usuario.nota1
    document.getElementById('nota2').value = usuario.nota2
    document.getElementById('nota3').value = usuario.nota3
    

}


const eliminar= (id)=>{
    if(confirm('¿Está seguro que desea realizar la eliminación ')== true){
    
        let usuario = {
            _id : id        }

        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
}

const actualizar = async()=>{
    let _documento = document.getElementById('documento').value
    let _nombre = document.getElementById('nombre').value
    let _nota1 = document.getElementById('nota1').value
    let _nota2 = document.getElementById('nota2').value
    let _nota3 = document.getElementById('nota3').value
    console.log(_documento, _nombre, _nota1, _nota2, _nota3);

    if(_documento.trim() !== '' && _nombre.trim() !== '' && _nota1.trim() !== '' && _nota2.trim() !== '' && _nota3.trim() !== '' ){
        let usuario = {
            documento: _documento,
            nombre: _nombre,
            nota1: _nota1,
            nota2: _nota2,
            nota3: _nota3
            
        }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
        window.location.reload()
    }
    else{
        alert('Los campos están vacíos.')
    }
    
}


if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}


if(document.querySelector('#btnAEliminar')){
    document.querySelector('#btnAEliminar')
.addEventListener('click',eliminar)
}
