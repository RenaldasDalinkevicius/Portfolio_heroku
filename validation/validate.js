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