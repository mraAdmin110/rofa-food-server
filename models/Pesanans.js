const mongoose = require('mongoose');
const Keranjangs = require('./Keranjangs');
const { ObjectId } = mongoose.Schema;

const pesananSchema = new mongoose.Schema(
  {
    total_bayar: { type: Number, required: true },
    id_keranjang: [
      { 
        type: ObjectId,
        ref: 'Keranjangs'
      }
    ]
    // id_keranjang: {
    //   _id: {
    //     type: ObjectId,
    //     ref: 'Products',
    //     required: true
    //   },
    //   id_product: {
    //     _id: {
    //       type: ObjectId,
    //       ref: 'Products',
    //       required: true
    //     },
    //     nama: {
    //       type: String,
    //       required: true
    //     },
    //     kode: {
    //       type: String,
    //       required: true
    //     },
    //     harga: {
    //       type: Number,
    //       required: true
    //     }
    //   }
    // }
  }
);

module.exports = mongoose.model('Pesanans', pesananSchema);