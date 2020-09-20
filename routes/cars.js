const router = require('express').Router();
const Car = require('../model/Cars');

router.get('/', async (req, res) => {
    try {
        const car = await Car.find().limit(10);
        res.send(car);

    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/create', async (req, res) => {
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
