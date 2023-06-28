//Importar paquetes requeridos de node
const {response}= require('express')


//Importacion de los modelos 
const Usuario=require('../models/usuario')


//insercion, modificacion de datos

//consultar
const usuarioGet = async(req, res = response)=>{
    const{usuario}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const usuarios = await Usuario.find()
    res.json({
        usuarios
    })
}


const usuarioPost = async(req,res = response) => {
    const body = req.body//Captura de atributos
    let mensaje=''
    console.log(body)

    try {
        const usuario= new Usuario(body)

        //guardar objeto
        await usuario.save()
        mensaje='La inserción se realizó exitosamente'
        mensaje = 'La inserción se realizó exitosamente';
  
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.error(Object.values(error.errors).map(val => val.message));
          mensaje = Object.values(error.errors).map(val => val.message);
        } else {
          // Manejar otros errores aquí si es necesario
          mensaje = 'Hubo un error en el servidor';
          console.log(error)
        }
      }

    res.json({
        msg: mensaje
    })

}



const usuarioPut = async (req, res = response) => {
    // Captura atributos o parámetros
    const { documento, nombre, nota1, nota2, nota3, observacion } = req.body;
    let mensaje = '';
  
    try {
      // Verificar si el usuario existe antes de la actualización
      const usuarioExistente = await Usuario.findOne({ documento: documento });
  
      if (!usuarioExistente) {
        mensaje = 'No se encontró el usuario especificado.';
      } else {
        const usuario = await Usuario.findOneAndUpdate(
          { documento: documento },
          { nombre, nota1, nota2, nota3, observacion },
          { new: true }
        );
        mensaje = 'La modificación se efectuó correctamente.';
      }
    } catch (error) {
      mensaje = 'Se presentaron problemas en la modificación: ' + error.message;
    }
  
    res.json({
      msg: mensaje,
    })
  }
  
  
  

const usuarioDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
   try{
    const usuario= await Usuario.deleteOne({_id:_id})
    mensaje='La eliminacion se efectuo correctamente.'

}
catch(error){
    mensaje='Se presentaron problemas en  la eliminacion.'

}



res.json({
    msg: mensaje 
})

}


module.exports={
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}