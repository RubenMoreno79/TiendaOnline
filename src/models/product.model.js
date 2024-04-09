const { model, Schema } = require('mongoose');

const productSchema = new Schema({

    name: String,
    descripcion: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number,
    creator: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    versionKey: false,
    timestamps: true
});


module.exports = model('product', productSchema);

