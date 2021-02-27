const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');



const validarJWT = async (req,res,next) =>{
    const token = req.header('token');
    if(!token){
        return res.status(400).json({msg:"No hay token en la petición"})
    }
    try{
       const {uid} =  jwt.verify(token,process.env.SECRETORPRIVATEKEY);
    
       const usuarioAuth = await Usuario.findById(uid);
       
       if(!usuarioAuth){
        return res.status(400).json(
        { msg:"Usuario no existe"
        })
       }

       if(!usuarioAuth.estado){
        return res.status(400).json(
        { msg:"Usuario con estado false"
        })
       }


       req.usuarioAuth = usuarioAuth;
       
       
       next();

    }catch(err){
        return res.status(400).json(
            {msg:"Token no valido"}
            );

    }
}


module.exports = {
    validarJWT
}