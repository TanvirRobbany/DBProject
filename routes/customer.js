const express = require('express');
const router = express.Router();
const customerHelper = require('../models/customer');

//showing all customer
router.get('/customer', customerHelper.getAllCustomer);

//showing all menu to customer
router.get('/menuC', customerHelper.getAllMenu);

module.exports = router;