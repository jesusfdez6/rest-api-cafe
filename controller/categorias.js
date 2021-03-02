const {response,request} = require('express');
const {Categoria} = require('../models')

const categoriasGet =  async(req=request,res=response) =>{
   
    const {limite = 5 ,desde=0} = req.query;
    const query = {estado:true};
  

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
             .populate('usuario','nombre')
             .skip(Number(desde))
             .limit(Number(limite))
    ]
    )
    
    res.json({
        total,
        categorias
    })
}
const categoriasPost =  async(req=request,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB){
       return res.status(400).json({
            msg:"La categoria ya existe",

        })
    }
    const {_id} =req.usuarioAuth
    const data = {
        nombre,
        usuario : _id
    }
    const categoria = new Categoria(data);
   await categoria.save();
    
    res.status(201).json({
    categoria})
    }
const categoriasDelete =  async(req=request,res=response) =>{

    const id = req.params.id
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});


    res.json({
        msg:"delete categoria",
        categoria
    })
}
const categoriasPut =  async(req=request,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();
    const id = req.params.id

    const categoria = await Categoria.findByIdAndUpdate(id,{nombre});

    
    res.status(200).json({
        msg:'update categoria',
        categoria
    })
}





module.exports = {
    categoriasGet,
    categoriasPost,
    categoriasDelete,
    categoriasPut
}