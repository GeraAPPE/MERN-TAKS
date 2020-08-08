const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


//Crear una tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//Obtener las tareas por proyectos
router.get('/',
    auth,
    tareaController.obtenerTareas
)

//Actualizar una tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

//Eliminar una tarea 
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;