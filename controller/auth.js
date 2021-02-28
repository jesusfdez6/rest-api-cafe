const {Response,request} = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async(req,res=response) =>{
    const {password,correo} = req.body;
    try{

        //verificar si existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg :'Usuario * y Password no son correctos'
            });
        }
        // si el usuario es activo
        if(!usuario.estado){
            return res.status(400).json({
                msg :'Usuario no activo'
            });
        }
        //verificar la contraseña

        const validarPass = bcrypt.compareSync(password,usuario.password);

        if(!validarPass){
            return res.status(400).json({
                msg :'Pass incorrecto'
            });
        }
        //generar el awt 

        const token = await generarJWT(usuario.id);

        res.json({
        msg:"logueado",
        usuario,
        token
        });

    }catch(err){
        return res.status(500).json({
            msg :'Hable con el administrador'
        });
    }

}


const googleSignIn = async(req,res=response) =>{
    try{
    const {id_token} = req.body;
    const {nombre,correo,img} = await googleVerify(id_token);
    let usuario = await Usuario.findOne({correo});
    if(!usuario){

        const google = true;
        const password = ':)';
        const data = {
            nombre,
            correo,
            img,
            google,
            password
        }

        const usuario = new Usuario(data);
        await usuario.save();

    
    }

    if(!usuario.estado){
        return  res.status(400).json({
            msg:"Usuario inactivo",
            
        });
    }

    const token = await generarJWT(usuario.id);

    res.status(200).json({
        msg:"Usuario logueado",
        usuario,
        token
        
    });

      
    }catch{
        res.status(400).json({
            msg:"token no es valido",
        });
    }
   
}


module.exports = {
    login,
    googleSignIn
}
