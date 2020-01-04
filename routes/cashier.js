const express = require('express');
const router = express.Router();
const cashierHelper = require('../models/cashier');

//get all cashiers
router.get('/cashier', cashierHelper.getAllCashiers);

//edit one cashier
router.get('/cashierEdit/:id', cashierHelper.getOneCashier);

router.post('/cashierEdit/:id', cashierHelper.updateOneCashier);

//delete one cashier
router.get('/cashierDelete/:id', cashierHelper.deleteOneCashier);

//get sell menu
// router.get('/sell', cashierHelper.getSellMenu);


module.exports = router;