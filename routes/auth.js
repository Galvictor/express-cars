const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

    // Valido os campos
    const valido = await registerValidation(req.body);
    if (valido.error) return res.status(400).send(valido.detalhes);

    //Checar se o email já esta cadastrado
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email já existe');

    // Codificar a senha
    const salt = await bcrypt.genSalt(10);
    const hashSenha = await bcrypt.hash(req.body.senha, salt);

    // Criar novo usuario
    const user = new User({
        nome: req.body.nome,
        senha: hashSenha,
        email: req.body.email
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Valido os campos
    const valido = await loginValidation(req.body);
    if (valido.error) return res.status(400).send(valido.detalhes);
    //Checar se o email já esta cadastrado
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email não foi encontrado');

    const validPass = await bcrypt.compare(req.body.senha, user.senha);
    if (!validPass) return res.status(400).send('Senha invalida');

    res.send('Tudo ok!');

});

module.exports = router;
