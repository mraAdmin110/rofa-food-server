const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const keranjangSchema = new mongoose.Schema(
  {
    jumlah: { type: Number, required: true },
    total_harga: { type: Number, required: true },
    total_bayar: {type: Number, required: true},
    status: { type: String, default: 'Proses'},
    id_product: {
      _id: {
        type: ObjectId,
        ref: 'Products',
        required: true
      },
      nama: {
        type: String,
        required: true
      },
      kode: {
        type: String,
        required: true
      },
      harga: {
        type: Number,
        required: true
      }
    }
  }
);

module.exports = mongoose.model('Keranjangs', keranjangSchema);