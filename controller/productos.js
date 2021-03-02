const {response,request} = require('express');
const {Productos} = require('../models');


const productosGet =  async(req=request,res=response) =>{
   
    const {limite = 5 ,desde=0} = req.query;
    const query = {estado:true};
  

    const [total,productos] = await Promise.all([
        Productos.countDocuments(query),
        Productos.find(query)
             .populate('usuario','nombre')
             .populate('categoria','nombre')
             .skip(Number(desde))
             .limit(Number(limite))
    ]
    )
    
    res.json({
        total,
        productos
    })
}
const productosPost =  async(req=request,res=response) =>{

    let {nombre,categoria,descripcion,precio} = req.body;
    nombre = nombre.toUpperCase();
    const ProductosDB = await Productos.findOne({nombre,categoria})
    if(ProductosDB){
       return res.status(400).json({
            msg:"El producto ya existe",

        })
    }
    const {_id} =req.usuarioAuth
    const data = {
        nombre,
        categoria,
        descripcion,
        precio,
        usuario : _id,

    }
    const productos = new Productos(data);
    await productos.save();
    
    res.status(201).json({
        productos})
    }
const productosDelete =  async(req=request,res=response) =>{

    const id = req.params.id
    const productos = await Productos.findByIdAndUpdate(id,{estado:false});


    res.json({
        msg:"delete productos",
        productos
    })
}
const productosPut =  async(req=request,res=response) =>{
    
    let {nombre,...resto} = req.body;
    resto.nombre = req.body.nombre.toUpperCase();
    const id = req.params.id

    const ProductosDB = await Productos.findOne({nombre:resto.nombre,categoria:resto.categoria})
    if(ProductosDB && id!=ProductosDB._id){
        return res.status(400).json({
             msg:"El producto ya existe en esa categoria, no se puede actualizar",
         })
     }

    const producto = await Productos.findByIdAndUpdate(id,resto);

    
    res.status(200).json({
        msg:'update categoria',
        producto
    })
}





module.exports = {
    productosGet,
    productosPost,
    productosDelete,
    productosPut
}