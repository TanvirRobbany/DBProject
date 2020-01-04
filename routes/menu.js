const express = require('express');
const router = express.Router();
const menuHelper = require('../models/menu')



// menu adding route
router.get('/manage', menuHelper.getMenuAdd);

// adding menu
router.post('/manage', menuHelper.addMenu);


// menu edit
router.get('/menuEdit/:id', menuHelper.getOneMenu)

router.post('/menuEdit/:id', menuHelper.updateOneMenu);


// showing menu details on webpage from database
router.get('/menu', menuHelper.getAllMenu);

// menu delete
router.get('/menuDelete/:id', menuHelper.deleteOneMenu);

module.exports = router;