
const Rol = require('../models/rol');
const {Usuario,Categoria,Productos} = require('../models');




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


//validar categoria
const validarExisteCategoria = async(id="") =>{
  const id_categoria = await Categoria.findById(id);
  if(!id_categoria){
      throw new Error("El id  de la categoria no existe");

  }


}

//validar producto
const validarExisteProducto = async(id="") =>{
  const id_producto = await Productos.findById(id);
  if(!id_producto){
      throw new Error("El id del producto no existe");

  }


}


 


  module.exports = {
    esRoleValido,
    validarExisteEmail,
    validarExisteUsuario,
    validarExisteCategoria,
    validarExisteProducto
  }