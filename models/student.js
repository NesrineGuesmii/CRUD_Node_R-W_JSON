
const Joi = require('joi');

const student_schema = Joi.object({
    nom : Joi.string().min(5).required(),
    classe : Joi.string().required(),
    modules: Joi.array().required()
});

const student_update_schema = Joi.object({
    name: Joi.string().min(5),
    classe: Joi.string(),
    modules: Joi.array() 
});

module.exports.student_schema=student_schema;
module.exports.student_update_schema=student_update_schema;