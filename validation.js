const Joi = require('joi');

const registerValidation = async (data) => {
    const schema = Joi.object({
        nome: Joi.string()
            .min(6)
            .required(),
        senha: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required()
    });

    // VAMOS VALIDAR
    try {
        await schema.validateAsync(data, {abortEarly: false});
        return {error: false, detalhes: null};
    } catch (err) {
        return {error: true, detalhes: err};
    }

}

const loginValidation = async (data) => {
    const schema = Joi.object({
        senha: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required()
    });

    // VAMOS VALIDAR
    try {
        await schema.validateAsync(data, {abortEarly: false});
        return {error: false, detalhes: null};
    } catch (err) {
        return {error: true, detalhes: err};
    }

}

const registerCarValidation = async (data) => {

    const today = new Date();
    const year = today.getFullYear() + 1;

    const schema = Joi.object({
        marca: Joi.string()
            .min(2)
            .required(),
        modelo: Joi.string()
            .min(2)
            .required(),
        ano: Joi.number()
            .min(1900)
            .max(year)
            .required(),
        valor: Joi.number()
            .min(1)
            .required()
    });

    // VAMOS VALIDAR
    try {
        await schema.validateAsync(data, {abortEarly: false});
        return {error: false, detalhes: null};
    } catch (err) {
        return {error: true, detalhes: err};
    }

}

module.exports.registerValidation = registerValidation;
module.exports.registerCarValidation = registerCarValidation;
module.exports.loginValidation = loginValidation;
