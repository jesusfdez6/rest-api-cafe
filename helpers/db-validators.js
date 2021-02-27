
const Rol = require('../models/rol');
const Usuario = require('../models/user');


//Rol existente
const esRoleValido= async(rol='') =>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
      throw new Error("El rol no está registrado en la base de datos");
    }
  }

   //verificar el correo si existe
const validarExisteEmail = async(correo="") =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error("El correo ya está registrado");

    }


}

//validar usuario
const validarExisteUsuario = async(id="") =>{
    const id_user = await Usuario.findById(id);
    if(!id_user){
        throw new Error("El id no existe");

    }


}

 


  module.exports = {
    esRoleValido,
    validarExisteEmail,
    validarExisteUsuario
  }