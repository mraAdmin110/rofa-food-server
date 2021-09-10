const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Keranjangs = require('../models/Keranjangs');

module.exports = {
  categories: async (req, res) => {
    try {
      const category = await Categories.find()
        .select('_id nama')
        .limit(4)

      res.status(200).json({
        category
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  products: async (req, res) => {
    try {
      const product = await Products.find()
        .select('_id nama kode harga gambar')
        .populate({path:'id_kategori', select: '_id nama'})

      res.status(200).json({
        product
      })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getlistKeranjang: async (req, res) => {
    try {
      const keranjangs = await Keranjangs.find()
        .select('_id jumlah total_bayar total_harga id_product')
    
      res.status(200).json({
        keranjangs
      })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  masukKeranjang: async (req, res) => {
    const {id_product, jumlah, status} = req.body;
    try {
      if(
        id_product === undefined ||
        jumlah === undefined 
      ){
        res.status(404).json({message: "Lengkapi aja lur"})
      }
      const product = await Products.findOne({_id: id_product});
      
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }

      await product.save();

      let total_harga = product.harga * jumlah;
      let total_bayar =+ total_harga;
      const pesanan = {
        jumlah,
        total_harga,
        total_bayar,
        status,
        id_product: {
          _id: product.id,
          nama: product.nama,
          kode: product.kode,
          harga: product.harga
        }
      }

      const pesanans = await Keranjangs.create(pesanan);

      res.status(201).json({message: "sukses pesan", pesanans});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  menuKeranjang: async (req, res) => {
    const cekId = await Keranjangs.findById(req.params.id);
    if (!cekId) return res.status(404).json({ message: "Data tidak ditemukan" });
    try {
      const updatedKeranjang = await Keranjangs.updateOne({ _id: req.params.id }, { $set: req.body });
      // updatedKeranjang.jumlah = jumlah;
      // updatedKeranjang.total_harga = total_harga;
      res.status(200).json(updatedKeranjang);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    // const cekId = await Keranjangs.findById(req.params.id);
    // if (!cekId) return res.status(404).json({ message: "Data tidak ditemukan" });
    // try {
    //   const {jumlah,total_harga} = req.body;
    //   const keranjangDetail = await Keranjangs.updateOne({ _id: req.params.id }, { $set: req.body });
    //   const product = await Products.find();
      
    //   // await keranjangDetail.save();
    //   return res.status(200).json(keranjangDetail);
    // } catch (error) {
    //   res.status(400).json({ message: error.message });
    // }
  },

  hapusPesanan: async (req, res) => {
    const cekId = await Keranjangs.findById(req.params.id);
    if (!cekId) return res.status(404).json({ message: "Data tidak ditemukan" });
    try {
      const deletedKeranjangs = await Keranjangs.deleteOne({ _id: req.params.id });
      res.status(200).json(deletedKeranjangs);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}