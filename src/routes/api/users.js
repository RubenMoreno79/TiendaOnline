const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const { validate, checkToken } = require('../../helpers/midleware');
const registerSchema = require('../../schemas/register.schema');
const { createToken } = require('../../helpers/util');


router.get('/profile', checkToken, (req, res) => {
    res.json(req.user);
});

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId).populate('cart');
    res.json(user)
});

router.post('/register', validate(registerSchema), async (req, res) => {
    //Body: name, email, password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.post('/login', async (req, res) => {
    //Body: email, password
    const { email, password } = req.body;

    // ¿Existe el email en la BD?
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(403).json({ fatal: 'Error email y/o contraseña' })
    }

    //Comprobar si las password coinciden
    const iguales = bcrypt.compareSync(password, user.password);
    if (!iguales) {
        return res.status(403).json({ fatal: 'Error email y/o constraseña' })
    }

    res.json({
        message: 'Login correcto',
        token: createToken(user)

    })
});



module.exports = router;