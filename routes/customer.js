const express = require('express');
const router = express.Router();
const customerHelper = require('../models/customer');

//showing all customer
router.get('/customer', customerHelper.getAllCustomer);

//showing all menu to customer
router.get('/menuC', customerHelper.getAllMenu);

//go to regitration page
router.post('/registration', customerHelper.getRegistered);

module.exports = router;