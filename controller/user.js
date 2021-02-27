
const {Response,request} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');

const usuariosGet =  async(req=request,res=response) =>{
    const {limite = 5 ,desde=0} = req.query;
    const query = {estado:true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
             .skip(Number(desde))
             .limit(Number(limite))
    ]
    )
    
    res.json({
        total,
        usuarios
    })

}


const usuariosPost = async(req,res=response) =>{

   

    //const  {nombre,...resto} = req.body;
    const  {nombre,correo,password,rol} = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

  
    //verificar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);
    //delete usuario.password
    await usuario.save();

    
    res.json({
        msg:'Post API',
        usuario
    })

    

}


const usuariosDelete = async(req,res=response) =>{
    const id = req.params.id
    const usuarioAuth = req.usuarioAuth
    const eliminar = {estado:false};
    const usuario = await Usuario.findByIdAndUpdate(id,eliminar);
   
    res.json({
        msg:'update API',
        usuario,
        usuarioAuth
        
    })

}


const usuariosPut = async(req,res=response) =>{

    const id = req.params.id;
    const {_id,password,google,correo, ...resto } = req.body;
    
    //validar contra la base de datos
    if(password){
         //verificar la contraseña
    const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
   
    res.json({
        msg:'update API',
        usuario
    })

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut

}