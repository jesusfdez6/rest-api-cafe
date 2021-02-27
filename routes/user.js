
const {Router} = require('express');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {esRoleValido,validarExisteEmail,validarExisteUsuario} = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
      } =require('../controller/user');

const router = Router();

  router.get('/',usuariosGet);

  router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min:6}),
 //   check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(validarExisteEmail),
    check('rol').custom(esRoleValido),
    validarCampos


  ],usuariosPost); 

  router.put('/:id',[
    check('id', "no es un Id valido").isMongoId(),
    check('id').custom(validarExisteUsuario),
    check('rol').custom(esRoleValido),



    validarCampos
  ],usuariosPut);

  router.delete('/:id',[
    check('id', "no es un Id valido").isMongoId(),
    check('id').custom(validarExisteUsuario),
    validarCampos
  ],usuariosDelete);

module.exports = router;