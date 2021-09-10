const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    id_product: [
      { 
        id:{type: ObjectId, ref: 'Products'}
      }
    ]
  }
);

module.exports = mongoose.model('Categories', categorySchema);