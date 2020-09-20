const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation');

router.post('/register', async (req, res) => {

    // Valido os campos
    const valido = await registerValidation(req.body);
    if (valido.error) return res.status(400).send(valido.detalhes);

    //Checar se o email já esta cadastrado
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email já existe');

    // Criar novo usuario
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
