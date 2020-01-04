const connection = require('../config/db')

exports.getAllCustomer = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from customer`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('customer.ejs', { customers: results });

            }
        });
    }
}

exports.getAllMenu = function(req,res){
    if(!req.session.loggedin){
        res.redirect('/');
    }
    else{
        connection.query(`Select * from menu`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('menuC.ejs', { menus: results });
    
            }
        });
    }
}