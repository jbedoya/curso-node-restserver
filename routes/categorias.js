const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()


//obtener todas las categorias
router.get('/', (req, res) => {
    res.json('get');
})

//obtener una categoria
router.get('/:id', (req, res) => {
    res.json('get - id');
})

//crear categoria - privado - cualquier con un token valido
router.post('/', (req, res) => {
    res.json('post');
})

//actualizar categoria - privado - cualquier con token valido
router.put('/:id', (req, res) => {
    res.json('put');
})

//borrar categorias - privado - Admin con token
router.delete('/:id', (req, res) => {
    res.json('delete');
})
module.exports = router