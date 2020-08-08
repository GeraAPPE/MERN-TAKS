const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el Servidor
const app = express();

//Conectar a la Base de Datos
conectarDB();

//Habilitar Cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la APP
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Definir la pagina principal
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

//Arrancar la APP
app.listen(PORT, () => {
    console.log(`El Servidor esta funcionando desde el puerto ${PORT}`);
})
