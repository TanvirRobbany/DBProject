const connection = require('../config/db');

exports.getMenuAdd = function (req, res) {
    res.render("addmenu.ejs");
}

exports.addMenu = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        console.log(req.body);
        connection.query(`INSERT INTO menu(catagory, itemName, price) VALUES('${req.body.catagory}', '${req.body.name}', ${req.body.price})`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log('Done');
                res.redirect('/menu')

            }
        });
    }
}
exports.getOneMenu = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from menu where idMenu=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('menuedit.ejs', { menus: results[0] })

            }
        });
    }
}

exports.updateOneMenu = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`UPDATE menu SET catagory = '${req.body.catagory}', itemName='${req.body.name}', price=${req.body.price} WHERE idMenu = ${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.redirect('/menu')

            }
        });
    }

}

exports.getAllMenu = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from menu`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('menu.ejs', { menus: results })

            }
        });
    }
}

exports.deleteOneMenu = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Delete from menu where idMenu=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.redirect('/menu');

            }
        });
    }
}