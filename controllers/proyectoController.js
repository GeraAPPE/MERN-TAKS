const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }    
    

    try {
        //Crear un nuevo proyecto.
        const proyecto = new Proyecto(req.body);

        //Guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        //Guardar el proyecto
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {

    try {

        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ proyectos });

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

//Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }  

    //Extraer la informacion de los proyectos
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {

        //REvisar el Id
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el creador existe o no
        if(!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Verificar el creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        //Actualizar proyecto
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProyecto }, { new : true });

        res.json({proyecto});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//Eliminar un proyecto por su Id
exports.eliminarProyecto = async (req, res) => {

    try {

        //REvisar el Id
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el creador existe o no
        if(!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Verificar el creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: "Proyecto Eliminado" });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error en el servidor" });
    }
}