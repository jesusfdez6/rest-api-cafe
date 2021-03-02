const {Router} = require('express');
const {check} = require('express-validator');

const {productosGet,productosPost,productosPut,productosDelete} = require('../controller/productos');
const {validarExisteProducto,validarExisteCategoria} = require('../helpers/db-validators')
       
const {
    validarCampos,
    validarJWT,
    esAdminRoles,
    tieneRole
    
    } = require('../middlewares');

const router = Router();


router.get('/',productosGet);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','No es un número').isNumeric(),
    check('categoria', "no es un Id de categoria valido").isMongoId(),
    check('categoria').custom(validarExisteCategoria),
    validarCampos


],
productosPost);

router.put('/:id',[
    validarJWT,
    check('id', "no es un Id valido").isMongoId(),
    check('id').custom(validarExisteProducto),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','No es un número').isNumeric(),
    check('categoria', "no es un Id de categoria valido").isMongoId(),
    check('categoria').custom(validarExisteCategoria),
    validarCampos

],productosPut);
router.delete('/:id',[
    validarJWT,
    esAdminRoles,
    check('id', "no es un Id valido").isMongoId(),
    check('id').custom(validarExisteProducto),
    validarCampos
],
productosDelete);

module.exports =  router

