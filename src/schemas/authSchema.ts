import joi from "joi";

const createUser = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required()
})

const loginUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})

export { createUser, loginUser }