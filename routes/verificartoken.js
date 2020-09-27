const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Accesso Negado');

    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verificar;
        next();
    } catch (err) {
        res.status(400).send('Token Invalido');
    }
}
