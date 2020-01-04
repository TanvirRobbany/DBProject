const connection = require('../config/db');

exports.getAdminPanel = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        res.render("admin.ejs");
    }
}

exports.getEmployeeAdd = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        res.render("employeeReg.ejs");
    }
}

exports.addEmployee = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        console.log(req.body);
        if (req.body.type === "manager") {
            connection.query(`INSERT INTO manager(name, phoneNumber, email, address, salary, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.address}', ${req.body.salary}, '${req.body.password}')`, function (error, results, fields) {
                if (error) throw error;
                if (results) {
                    console.log('Done');
                    res.redirect('/employee')

                }
            });
        }
        else if (req.body.type === "cashier") {
            connection.query(`INSERT INTO cashier(name, phoneNumber, email, address, salary, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.address}', ${req.body.salary}, '${req.body.password}')`, function (error, results, fields) {
                if (error) throw error;
                if (results) {
                    // console.log('Done');
                    res.redirect('/employee')

                }
            });
        }

        else if (req.body.type === "waiter") {
            connection.query(`INSERT INTO waiter(name, phoneNumber, email, address, salary, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.address}', ${req.body.salary}, '${req.body.password}')`, function (error, results, fields) {
                if (error) throw error;
                if (results) {
                    console.log('Done');
                    res.redirect('/employee')

                }
            });
        }

        else {
            console.log("None of the type is selected...");
        }
    }
}

exports.getAllManagers = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from manager`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('manager.ejs', { managers: results });

            }
        });
    }
}

exports.getOneManager = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Select * from manager where idManager=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.render('managerEdit.ejs', { managers: results[0] })

            }
        });
    }
}

exports.updateOneManager = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`UPDATE manager SET name = '${req.body.name}', phoneNumber='${req.body.number}', email='${req.body.email}', address='${req.body.address}', salary=${req.body.salary}, password='${req.body.password}' where idManager=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                // console.log(results);
                res.redirect('/manager')

            }
        });
    }
}

exports.deleteOneManager = function (req, res) {
    if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        connection.query(`Delete from manager where idManager=${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                res.redirect('/manager');

            }
        });
    }
}