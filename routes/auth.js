const router = require('express').Router();
const User = require('../model/User');

// todo Instalar o JOI para validação
// todo link de referencia de exemplo https://youtu.be/2jqok-WgelI?t=1541, tem que instalar a nova versão do joi @hapi/joi esta defazado

router.post('/register', async (req, res) => {
    const user = new User({
        nome: req.body.nome,
        senha: req.body.senha,
        email: req.body.email
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
