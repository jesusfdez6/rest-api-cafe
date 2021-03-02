const {Router} = require('express');
const {check} = require('express-validator');

const {categoriasGet,categoriasPost,categoriasPut,categoriasDelete} = require('../controller/categorias');
const {validarExisteCategoria} = require('../helpers/db-validators')

const {
    validarCampos,
    validarJWT,
    esAdminRoles,
    tieneRole
    
    } = require('../middlewares');


const router = Router();

router.get('/',categoriasGet);
router.get('/:id',categoriasGet);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
categoriasPost);
router.put('/:id',[
    validarJWT,
    check('id', "no es un Id valido").isMongoId(),
    check('id').custom(validarExisteCategoria),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos



],categoriasPut);

router.delete('/:id',[
    validarJWT,
    esAdminRoles,
    check('id', "no es un Id valido").isMongoId(),
    check('id').custom(validarExisteCategoria)
],categoriasDelete);

module.exports = router;