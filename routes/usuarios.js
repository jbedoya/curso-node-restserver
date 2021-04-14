const { Router } = require('express')
const { check } = require('express-validator')

// const { validarCampos } = require('../middleware/validar-campos')
// const { validarJWT } = require('../middleware/validar-jwt')
// const { esAdminRole, tieneRole } = require('../middleware/validar-roles')
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middleware')

const { esRoleValido, emailExiste, existeusuarioPorId } = require('../helpers/db-validators')
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGet )

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeusuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria y debe tener mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(), 
    check('correo').custom( emailExiste ), 
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    validarJWT,
//    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeusuarioPorId ),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)




module.exports = router