const connection = require('../config/db');

exports.getAllCashiers = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from cashier`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                // console.log(results);
                res.render('cashier.ejs', { cashiers: results });

            }
        });
    }
}


exports.deleteOneCashier = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Delete from cashier where idCashier=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.redirect('/cashier');

            }
        });
    }
}

exports.getOneCashier = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from cashier where idCashier=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('cashierEdit.ejs', { cashiers: results[0] })

            }
        });
    }
}

exports.updateOneCashier = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`UPDATE cashier SET name = '${req.body.name}', phoneNumber='${req.body.number}', email='${req.body.email}', address='${req.body.address}', salary=${req.body.salary}, password='${req.body.password}' where idCashier=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                // console.log(results);
                res.redirect('/cashier')

            }
        });
    }
}