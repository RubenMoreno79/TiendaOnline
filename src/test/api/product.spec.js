const request = require('supertest');
const mongoose = require('mongoose')

const app = require('../../app');
const Product = require('../../../src/models/product.model')

describe('Api de productos', () => {

    beforeAll(() => {
        mongoose.connect('mongodb://127.0.0.1:27017/tienda_online')
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    //Conexión a la BD
    describe('Prueba GET /api/products', () => {

        let response;

        beforeAll(async () => {
            response = await request(app).get('/api/products').send();

        });

        it('url /api/products existe', () => {

            expect(response.statusCode).toBe(200);
        });

        it('la respuesta debe ser en formato JSON', () => {

            expect(response.headers['content-type']).toContain('application/json')
        });

        it('la respuesta debe ser un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('Prueba POST /api/products', () => {

        const body = { name: 'Producto prueba', description: 'Esto es una prueba', price: 120, department: 'test', available: true, stock: 30 }
        let response;
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        })
        afterAll(async () => {
            //DELETE FROM products WHERE department = 'test'
            await Product.deleteMany({ departament: 'test' })
        })

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('debería incluir el _id en el body de la respuesta', () => {
            expect(response.body._id).toBeDefined();
        })
    });

    describe('Prueba PUT /api/products', () => {

        const body = { name: 'Producto prueba', description: 'Esto es una prueba', price: 120, department: 'test', available: true, stock: 30 }
        let response;
        let newProduct
        beforeAll(async () => {
            //En la BD creamos el producto a modificar
            newProduct = await Product.create(body);
            //Lanzamos la petición de PUT
            response = await request(app)
                .put(`/api/products/${newProduct._id}`)
                .send({
                    price: 300,
                    department: 'otro'
                });
        });
        afterAll(async () => {
            await Product.findByIdAndDelete(newProduct._id);
        })

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('debería responder con los cambios', () => {
            expect(response.body.price).toBe(300);
            expect(response.body.department).toBe('otro');

        })


    });


    describe('Prueba DELETE /api/products', () => {

        const body = { name: 'Producto prueba', description: 'Esto es una prueba', price: 120, department: 'test', available: true, stock: 30 }
        let response;
        let newProduct;

        beforeAll(async () => {
            //Crear el product a borrar
            newProduct = await Product.create(body)
            //Lanzo la petición
            response = await request(app).delete(`/api/products/${newProduct._id}`).send();

        })

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('debería desaparecer el product de la BD', async () => {
            const product = await Product.findById(newProduct._Id);
            expect(product).toBeNull();
        })
    });
});