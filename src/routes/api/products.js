const router = require('express').Router();

const { validate, checkProductId } = require('../../helpers/midleware');
const Product = require('../../models/product.model');
const User = require('../../models/user.model')
const productSchema = require('../../schemas/product.schema');


router.get('/', async (req, res) => {

    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/active', async (req, res) => {
    const products = await Product.find({
        available: true, stock: { $gte: 10 }
    });
    res.json(products)
});

router.get('/:department', async (req, res) => {
    const { department } = req.params
    try {
        const products = await Product.find({ department: department })
    } catch (error) {
        res.json({ fatal: error.message })

    }
});

router.get('/price/:minPrice/max/:maxPrice', async (req, res) => {
    const { minPrice, maxPrice } = req.params;

    const products = await Product.find({
        price: { $gt: minPrice, $lt: maxPrice }
    });
    res.json(products)
});



router.post('/', validate(productSchema), async (req, res) => {
    //req.body: name, description, price, department, available, stock
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
});

router.put('/add_cart', checkProductId, async (req, res) => {
    //Comprobar si el id del artículo recibido es correcto

    //1. Recupero el usuario por ID y actualizo su propiedad cart
    // const user = await User.findByIdAndUpdate(req.user._id, {
    //     $push: { cart: req.body.product_id }
    // }, { new: true }).populate('cart');

    //2. Directamente sobre el usuario obtenido en el middleware modifico su propiedad cart y lo guardo
    req.user.cart.push(req.body.product_id)
    await req.user.save()
    res.json(req.user);
});

router.put('/:productId', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.json(updatedProduct)
});



router.delete('/:productId', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    res.json(deletedProduct)
});




module.exports = router;