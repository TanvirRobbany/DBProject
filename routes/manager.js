const express = require('express');
const router = express.Router();
const managerHelper = require('../models/manager');

//admin panel route
router.get('/admin', managerHelper.getAdminPanel);

//adding employee
router.get('/employee', managerHelper.getEmployeeAdd);

router.post('/employee', managerHelper.addEmployee);

//showing all managers
router.get('/manager', managerHelper.getAllManagers);

//edit manager
router.get('/managerEdit/:id', managerHelper.getOneManager);

router.post('/managerEdit/:id', managerHelper.updateOneManager);

//delete one manager
router.get('/managerDelete/:id', managerHelper.deleteOneManager);

// //get sell menu
  router.get('/sell', managerHelper.getSellMenu);

// // //get statement
router.get('/sellstatements', managerHelper.getSellStatements);

router.get('/sell/:id', managerHelper.postSellStatements);
router.get('/sellstatements/:id', managerHelper.postSellStatements);


module.exports = router;