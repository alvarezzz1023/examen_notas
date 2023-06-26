//Migracion 
const {Schema, model}=require('mongoose')

const UsuarioSchema= Schema({
    //se define tipos de datos
    documento: {
      unique: [true, 'El documento ya existe'],
      type: String,
      required: [true, 'El campo documento es obligatorio']
    },
    nombre: {
      type: String,
      required: [true, 'El campo nombre es obligatorio']
    },
    nota1: {
      type: Number,
      required: [true, 'El campo nota1 es obligatorio'],
      min: [0, 'La nota1 debe ser mayor o igual a 0'],
      max: [5, 'La nota1 debe ser menor o igual a 5']
    },
    nota2: {
      type: Number,
      required: [true, 'El campo nota2 es obligatorio'],
      min: [0, 'La nota2 debe ser mayor o igual a 0'],
      max: [5, 'La nota2 debe ser menor o igual a 5']
    },
    nota3: {
      type: Number,
      required: [true, 'El campo nota3 es obligatorio'],
      min: [0, 'La nota3 debe ser mayor o igual a 0'],
      max: [5, 'La nota3 debe ser menor o igual a 5'] 
    },
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  
  UsuarioSchema.virtual('promedio').get(function() {
    return (this.nota1 + this.nota2 + this.nota3) / 3;
  });
//este es el nombre del objeto Usuario
module.exports = model('Usuario', UsuarioSchema)//Exportar el modelo

