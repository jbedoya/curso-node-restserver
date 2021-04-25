const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignin } = require('../controllers/auth')
const { emailExiste } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    validarCampos
]
,login )

router.post('/google', [
    check('id_token', 'El ID_TOKEN es obligatorio').not().isEmpty(),
    validarCampos
]
, googleSignin )

module.exports = router