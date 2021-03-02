const {response} = require('express');
const {ObjectId} =require('mongoose').Types
const {Productos,Usuario,Categoria} = require('../models');

const coleccionesPermitidad=[
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino="",res=response)=>{

    const esMongoId =  ObjectId.isValid(termino);
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario no existe",
                results: []
            })
        }
         res.status(200).json({
            msg:"Usuario encontrado", 
            results: [usuario]
        })
    
    }
    const  regex = new RegExp(termino,'i');
    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });

    res.status(200).json({
        results:usuarios
    })



}

const buscarCategorias = async(termino,res=response)=>{

    const esMongoId =  ObjectId.isValid(termino);
    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        if(!categoria){
            return res.status(400).json({
                msg:"categoria no existe",
                results: []
            })
        }
         res.status(200).json({
            msg:"Categoria encontrada", 
            results: [categoria]
        })
    
    }
    const  regex = new RegExp(termino,'i');
    const categoria = await Categoria.find({nombre:regex,estado:true });

    res.status(200).json({
        results:categoria
    })

}

const buscarProductos = async(termino,res=response)=>{

    const esMongoId =  ObjectId.isValid(termino);
    if(esMongoId){
        const producto = await Productos.findById(termino)
        .populate('categoria','nombre');
        if(!producto){
            return res.status(400).json({
                msg:"producto no existe",
                results: []
            })
        }
         res.status(200).json({
            msg:"productos encontrada", 
            results: [producto]
        })
    
    }
    const  regex = new RegExp(termino,'i');
    const producto = await Productos.find({nombre:regex,estado:true })
    .populate('categoria','nombre');

    res.status(200).json({
        results:producto
    })

}


const buscar =  async(req=request,res=response) =>{

    const {coleccion,termino} = req.params;

    if(!coleccionesPermitidad.includes(coleccion)){
        return res.status(400).json({
            msg:"No es una colección permitida"
        })
    }
    switch (coleccion){
        case'usuarios':
        buscarUsuarios(termino,res);
        break;
        case'categoria':
        buscarCategorias(termino,res);
        break;
        case'productos':
        buscarProductos(termino,res);
        break;
        default:
            return res.status(500).json({
                msg:"Nusqueda no implementada"
            })
            break;

    }
   
}

module.exports = {
    buscar
}