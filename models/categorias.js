const {Schema,model} = require('mongoose')


const CategoriasSchema = Schema({

    nombre:{
        type :String,
        required : [true,"El nombre es obligatorio"]
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'usuarios',
        required:true
    }


})

module.exports = model('categorias', CategoriasSchema)