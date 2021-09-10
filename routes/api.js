const router = require('express').Router();
const apiController = require('../controllers/apiController');
// const { upload } = require('../middlewares/multer');

router.get('/categories', apiController.categories);
router.get('/products', apiController.products);
router.get('/keranjangs', apiController.getlistKeranjang);
router.post('/keranjangs', apiController.masukKeranjang);
router.put('/keranjangs/:id', apiController.menuKeranjang);
router.delete('/keranjangs/:id', apiController.hapusPesanan);

module.exports = router;
