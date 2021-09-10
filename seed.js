const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://127.0.0.1:27017/db_rofafood',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Categories',
    './models/Products',
    './models/Keranjangs',
    // './models/Pesanans',
    './models/Users'
  ]);

  // Clear specified collections
  seeder.clearModels(['Categories','Products','Keranjangs', 'Users'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});


const data = [
  // start Categories
  {
    'model' : 'Categories',
    'documents' : [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
        nama: 'Maryam',
        id_product: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222') },
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223') },
        ]
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901112'),
        nama: 'Sambosa',
        id_product: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224') },
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225') },
        ]
      }
    ]
  },
  // end Categgories

  // start Products
  {
    'model': 'Products',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
        nama: 'Roti Maryam Coklat',
        kode: 'RM-01',
        harga: 6000,
        gambar: 'images/maryamCoklat.jpg',
        id_kategori: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
          nama: 'Maryam'
        }
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
        nama: 'Roti Maryam Keju',
        kode: 'RM-02',
        harga: 6000,
        gambar: 'images/maryamKejuSusu.jpg',
        id_kategori: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
          nama: 'Maryam'
        }
      },
      {
        id_product: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
        nama: 'Sambosa Daging',
        kode: 'SM-01',
        harga: 32500,
        gambar: 'images/sambosaDaging.jpg',
        id_kategori: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901112'),
          nama: 'Sambosa'
        }
      },
      {
        id_product: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
        nama: 'Sambosa Ayam',
        kode: 'SM-02',
        harga: 32500,
        gambar: 'images/sambosaAyam.jpg',
        id_kategori: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901112'),
          nama: 'Sambosa'
        }
      },
    ]
  },
  //end Products

  //Start Keranjangs
  {
    'model': 'Keranjangs',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee1'),
        jumlah: 2,
        total_harga: 12000,
        total_bayar: 24000,
        status: 'Proses',
        id_product: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
          nama: 'Roti Maryam Coklat',
          kode: 'RM-01',
          harga: 6000
        }
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee2'),
        jumlah: 1,
        total_harga: 6000,
        total_bayar: 24000,
        status: 'Proses',
        id_product: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
          nama: 'Roti Maryam Keju',
          kode: 'RM-02',
          harga: 6000
        }
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee3'),
        jumlah: 1,
        total_harga: 6000,
        total_bayar: 24000,
        status: 'Proses',
        id_product: {
          _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
          nama: 'Sambosa Ayam',
          kode: 'SM-02',
          harga: 32500
        }
      }
    ]
  },
  // End Keranjangs

  // Start Pesanans
  // {
  //   'model': 'Pesanans',
  //   'documents': [
  //     {
  //       _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90abc1'),
  //       total_bayar: 44500,
  //       id_keranjang: [
  //         {
  //           _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee1')
  //         },
  //         {
  //           _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee2')
  //         },
  //         {
  //           _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee3')
  //         }
  //       ]
  //     }
  //   ]
  // },
  // End Pesanans

  // Start Users
  {
    'model': 'Users',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903346'),
        username: 'superadmin',
        password: 'rahasia',
        role: 'admin'
      },
    ]
  }
  // End Users
]