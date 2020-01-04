const express = require('express');
const router = express.Router();
const waiterHelper = require('../models/waiter');

//showing all waiters
router.get('/waiter', waiterHelper.gatAllWaiters);

//editing one waiter
router.get('/waiterEdit/:id', waiterHelper.getOneWaiter);

router.post('/waiterEdit/:id', waiterHelper.updateOneWaiter);

//delete waiter
router.get('/waiterDelete/:id', waiterHelper.deleteOneWaiter);


module.exports = router;