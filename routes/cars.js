const router = require('express').Router();
const Car = require('../model/Cars');
const {registerCarValidation} = require("../validation");
const verificar = require('./verificartoken');

router.get('/', verificar, async (req, res) => {
    try {
        const car = await Car.find().limit(10);
        res.send(car);

    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/create', verificar, async (req, res) => {

    const valido = await registerCarValidation(req.body);
    if (valido.error) return res.status(400).send(valido.detalhes);

    const car = new Car({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        valor: req.body.valor
    });
    try {
        const savedCar = await car.save();
        res.send(savedCar);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
