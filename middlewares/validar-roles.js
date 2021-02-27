

const esAdminRoles = (req,res,next) =>{

        if(!req.usuarioAuth){
            return res.status(500).json({
                msg : "Se tiene que validar el web token primero"
            })
        }  

    const rol = req.usuarioAuth.rol;

    if(rol !=='ADMIN_ROLE'){
        return res.status(400).json({
            msg : "No tiene permisos de administrador"
        })
    }

    next();
}

const tieneRole = (...roles) =>{

        return (req,res,next) =>{

            if(!req.usuarioAuth){
                return res.status(500).json({
                    msg : "Se tiene que validar el web token primero"
                })
            }  
    

            const rol = req.usuarioAuth.rol;

            if(!roles.includes(rol)){
                return res.status(400).json({
                    msg : "El servicio requiere uno de estos roles"
                })
            }


            next();

        }



}


module.exports = {
    esAdminRoles,
    tieneRole
}