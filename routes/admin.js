const router = require('express').Router();
const adminController = require('../controllers/adminController');
const {upload} = require('../middlewares/multer');
const auth = require('../middlewares/auth')

router.get('/signin', adminController.viewSignin);
router.post('/signin', adminController.actionSignin);
router.use(auth);
router.get('/logout', adminController.actionLogout);
router.get('/dashboard', adminController.viewDashboard);
// endpoint Kategori
router.get('/kategori', adminController.viewKategori );
router.post('/kategori', adminController.addKategori);
router.put('/kategori', adminController.editKategori);
router.delete('/kategori/:id', adminController.deleteKategori);

// endpoint Product
router.get('/product', adminController.viewItem);
router.post('/product', upload, adminController.addItem);
router.get('/product/:id', adminController.showEditItem);
router.put('/product/:id', upload, adminController.editItem);
router.delete('/product/:id/delete', adminController.deleteItem);

// endpoint keranjang
router.get('/keranjang', adminController.viewKeranjang);
router.put('/keranjang/:id/confirmation', adminController.actionConfirmation);
router.put('/keranjang/:id/reject', adminController.actionReject);


// endpoint Pesanans
// router.get('/pesanan', adminController.viewPesanan);
// router.get('/pesanan/:id', adminController.showDetailPesanan);

module.exports = router;
