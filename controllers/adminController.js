const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Keranjangs = require('../models/Keranjangs');
// const Pesanans = require('../models/Pesanans');
const Users = require('../models/Users');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');


module.exports = {

  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render('index', {
          alert,
          title: "Rofa Food | Login"
        });
      } else {
        res.redirect('/admin/dashboard');
      }
    } catch (error) {
      res.redirect('/admin/signin');
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      if (!user) {
        req.flash('alertMessage', 'User yang anda masukan tidak ada!!');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
      }
      const isPasswordMatch =  await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash('alertMessage', 'Password yang anda masukan tidak cocok!!');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role
      }

      res.redirect('/admin/dashboard');

    } catch (error) {
      res.redirect('/admin/signin');
    }
  },

  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin');
  },

  viewDashboard: async (req, res) => {
    try {
      const kategori = await Categories.find();
      const product =  await Products.find();
      const keranjang = await Keranjangs.find();
      res.render('admin/dashboard/view_dashboard', {
        title: 'Rofa Food | Dashboard',
        kategori,
        product,
        keranjang,
        user: req.session.user
      });  
    } catch (error) {
      res.redirect('/admin/dashboard')
    }
  },

  viewKategori: async (req, res) => {
    try {
      const kategori = await Categories.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus};
      res.render('admin/kategori/view_kategori', { kategori, alert, title: 'Rofa Food | Kategori', user: req.session.user});
    } catch (error) {
      res.redirect('/admin/kategori');
    }
  },

  addKategori: async (req, res) => {
    try {
      const {nama} = req.body;
      await Categories.create({nama});
      req.flash('alertMessage', 'Berhasil menambahkan kategori');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/kategori');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },

  editKategori: async (req, res) => {
    try {
      const {id, nama} = req.body;
      const kategori = await Categories.findOne({_id: id});
      kategori.nama = nama;
      await kategori.save();
      req.flash('alertMessage', 'Berhasil mengubah kategori');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/kategori')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },

  deleteKategori: async (req, res) => {
    try {
      const {id} = req.params;
      const kategori = await Categories.findOne({_id: id});
      await kategori.remove();
      req.flash('alertMessage', 'Berhasil menghapus kategori');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/kategori');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/kategori');
    }
  },


  viewItem: async (req, res) => {
    try {
      const product = await Products.find().populate({path: 'id_kategori', select: 'id nama'});
      console.log(product);
      const kategori = await Categories.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/product/view_item', {
        title: 'Rofa Food | Item',
        kategori,
        alert,
        product,
        action: 'view',
        user: req.session.user
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/product');
    }
  },

  addItem: async (req,res)=> {
    try {
      const {id_kategori, nama, kode, harga } = req.body;
      const kategori = await Categories.findOne({_id: id_kategori});
      const newProduct = {
        id_kategori,
        nama,
        kode,
        harga,
        gambar: `images/${req.file.filename}`,
      }
      const product = await Products.create(newProduct);
      kategori.id_product.push({_id: product._id});
      await kategori.save();
      req.flash('alertMessage', 'Berhasil menambahkan Item');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/product');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/product');
    }
  },

  showEditItem: async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Products.findOne({ _id: id }).populate({ path: 'id_kategori', select: 'id nama' });
      const kategori = await Categories.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/product/view_item', {
        title: 'Rofa Food | Edit Product',
        alert,
        product,
        kategori,
        action: 'edit',
        user: req.session.user
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/product');
    }
  },

  editItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_kategori, nama, harga, kode } = req.body;
      const product = await Products.findOne({ _id: id }).populate({path: 'id_kategori', select: 'id nama'});
      if (req.file == undefined) {
        product.nama = nama;
        product.kode = kode;
        product.harga = harga;
        product.id_kategori = id_kategori;
        await product.save();
        req.flash('alertMessage', 'Berhasil mengubah product');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/product');
      } else {
        await fs.unlink(path.join(`public/${product.gambar}`));
        product.nama = nama;
        product.kode = kode;
        product.harga = harga;
        product.id_kategori = id_kategori;
        product.gambar = `images/${req.file.filename}`;
        await product.save();
        req.flash('alertMessage', 'Berhasil mengubah product');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/product');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/product');
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findOne({ _id: id }).populate({ path: 'id_kategori', select: 'id nama' });
      await fs.unlink(path.join(`public/${product.gambar}`));
      await product.remove();
      req.flash('alertMessage', 'Berhasil menghapus product');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/product');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/product');
    }
  },

  viewKeranjang: async (req, res) => {
    try {
      const keranjang = await Keranjangs.find();
      console.log(keranjang);
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/keranjang/view_keranjang', {
        title: "Staycation | keranjang",
        user: req.session.user,
        keranjang,
        alert,
        user: req.session.user
      });
    } catch (error) {
      res.redirect('/admin/keranjang');
    }
  },

  actionConfirmation: async (req, res) => {
    const { id } = req.params;
    try {
      const keranjang = await Keranjangs.findOne({ _id: id });
      keranjang.status = 'Accept';
      await keranjang.save();
      req.flash('alertMessage', 'Success Confirmation Pembayaran');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/keranjang');
    } catch (error) {
      res.redirect('/admin/keranjang');
    }
  },

  actionReject: async (req, res) => {
    const { id } = req.params;
    try {
      const keranjang = await Keranjangs.findOne({ _id: id });
      keranjang.status = 'Reject';
      await keranjang.save();
      req.flash('alertMessage', 'Success Reject Pembayaran');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/keranjang');
    } catch (error) {
      res.redirect('/admin/keranjang');
    }
  }
}