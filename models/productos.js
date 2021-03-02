const {Schema,model} = require('mongoose')


const ProductosSchema = Schema({

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
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'categorias',
        required:true
    },
    descripcion : {type:String},
    disponible : {type:Boolean,default:true}


})

module.exports = model('productos', ProductosSchema)