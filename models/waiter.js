const connection = require('../config/db');

exports.gatAllWaiters = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from waiter`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('waiter.ejs', { waiters: results });

            }
        });
    }
}

exports.getOneWaiter = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from waiter where idWaiter=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('waiterEdit.ejs', { waiters: results[0] })

            }
        });
    }
}

exports.updateOneWaiter = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`UPDATE waiter SET name = '${req.body.name}', phoneNumber='${req.body.number}', email='${req.body.email}', address='${req.body.address}', salary=${req.body.salary}, password='${req.body.password}' where idWaiter=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                // console.log(results);
                res.redirect('/waiter')

            }
        });
    }
}

exports.deleteOneWaiter = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Delete from waiter where idWaiter=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.redirect('/waiter');

            }
        });
    }
}