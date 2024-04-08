# Creación de productos
- POST /api/products
- Body: name, description, price, department, available, stock
- La respuesta debe ser el nuevo producto creado (tiene _id, createdAt, updatedAt...)

- Url funciona:
   - Reciba un status 200
   - El contenido de la respuesta sea un JSON
- Comprobar si tiene el ID
- Comprobar si los datos insertados coinciden con los que enviamos en el BODY

# Edición de productos

- PUT /api/products/PRODUCTID
- Body: los campos a modificar
- La respuesta debe ser el objeto editado

- Si la URL funciona
- Si los datos que envío para modificar realmente se modifican

1. Crear la url en products.js
 - ¡¡Cuidado cómo le pasamos el productId!!
2. Recuperamos el id del producto a editar (req.params)
3. Ejecutamos la edición a través del model de Product (findByIdAndUpdate)
4. El objeto que nos devuelva el metodo lo retornamos como un json
5. ¿Funcionan las pruebas? SÍ / NO

# Borrado de producto

- DELETE - /api/products/PRODUCTID
- La respuesta debe ser el producto borrado

- Que la url funcione
- Comprobar si el producto sigue en la BD

# Productos por departamento

- GET /api/products/DEPARTAMENTO
- find(recibe un obj Clave: valor con la condición)

# Productos por rango de precio

- GET /api/products/price/10/max/100

# Buscar librerías de validación

- Joi
- Vinejs
- Zod
- Yup
- Express-validator

# Implentación del TOKEN 

- Instalar las liberías necesarias
- Coger la función **createToken**
- En el login, aparte del message, retornar también el token

- Implementar el middleware checkToken
- Estamos trabajando sobre MongoDB, ¿qué tengo que modificar?

# Carrito de la compra

- PUT /api/products/add_cart
- Body: {product_id}

- Crear la URL
- Dentro hacer un console.log para ver, el ID del producto y el ID del usuario que lo compra

# Recuperación del perfil de usuario

- GET /api/users/profile
- Responde en un JSON con todos los datos del usuario

# Middleware checkProductId

- Middleware que comprueba si el product_id recibido a través del body existe o no en la BD
   - existe => next
   - No existe => error

   # Productos activos

   - GET /api/products/activos
   - Recupera todos los productos cuya propiedad available sea true y además tengan más de 10 productos en stock
