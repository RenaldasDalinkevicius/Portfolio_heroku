import Joi from "joi"

export const registrationValidation = formData => {
    const schema = Joi.object({
        firstName: Joi.string().required().max(20),
        lastName: Joi.string().required().max(20),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5)
    })
    return schema.validate(formData)
}
export const loginValidation = formData => {
    const schema =  Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5)
    })
    return schema.validate(formData)
}
export const newProjectValidation = formData => {
    const schema = Joi.object({
        title: Joi.string().required().max(40),
        text: Joi.string().required().max(100),
        github: Joi.string().required().max(100),
        live: Joi.string().required().max(100),
        img: Joi.string().required(),
        about: Joi.string().required().max(400),
        aboutOther: Joi.string().max(400)
    })
    return schema.validate(formData)
}