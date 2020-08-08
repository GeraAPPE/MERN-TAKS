const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Leer el Token del header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if(!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }

    //Validar Token
    try {

        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {

        res.status(401).json({ msg: 'Token no valido' });
        
    }

}