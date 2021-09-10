const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    kode: { type: String, required: true},
    harga: { type: String, required: true },
    gambar: { type: String, required: true },
    id_kategori: {
      type: ObjectId, ref: 'Categories'
    }
  }
)

module.exports = mongoose.model('Products', productSchema);