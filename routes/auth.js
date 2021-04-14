const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth')
const { emailExiste } = require('../helpers/db-validators')
const { validarCampos } = require('../middleware/validar-campos')

const router = Router()

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('clave', 'La clave es obligatoria').not().isEmpty(),
    validarCampos
]
,login )

module.exports = router