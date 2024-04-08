const yup = require('yup');

const registerSchema = yup.object({
    name: yup.string()
        .min(3, 'El campo nombre debe tener mínimo 3 caracteres')
        .required('El campo nombre es requerido'),
    email: yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'El email es incorrecto')
        .required('El email es requerido'),
    password: yup.string().required('El password es requerida')
})

module.exports = registerSchema;