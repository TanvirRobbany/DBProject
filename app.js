const express = require("express");
const app = express();
var session = require('express-session');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');

//For Login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'rms'
});

// database connection
connection.connect();



connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

// connection.end();

//local server 
app.listen(3000, function () {
    console.log("Server Is Up...");
});


//main route
app.get('/', function (req, res) {
    res.render("login.ejs");
});

app.use(menuRoutes);

// customer registration route
app.get('/registration', function (req, res) {
    res.render("registration.ejs");
});


// customer registration
app.post('/registration', function (req, res) {
    console.log(req.body);
    connection.query(`INSERT INTO customer(name, phoneNumber, email, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.password}')`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log('Done');
            res.redirect('/registration')

        }
    });
});

//Authenticating user || Login post
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM manager WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
            if(error) {response.send(error)};
            if (results.length > 0) {
				request.session.loggedin = true;
                request.session.username = username;
                request.session.id = results[0].idManager;
                request.session.manager = true;
				response.redirect('/manager');
			} else {
				connection.query('SELECT * FROM cashier WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
                    // if(error) {response.send( error)};
                    if (results.length > 0) {
                        console.log(results[0].idCashier);
                        request.session.loggedin = true;
                        request.session.username = username;
                        request.session.id = results[0].idCashier
                        request.session.cashier = true; 
                        response.redirect('/menu');
                    } else {
                        if(error) {response.send(error)};
                        connection.query('SELECT * FROM customer WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
                            if (results.length > 0) {
                                request.session.loggedin = true;
                                request.session.username = username;
                                response.redirect('/rms');
                            } else {
                                response.send('Incorrect Username and/or Password!');
                            }			
                        }
                        )}
                })			
			}			
			// response.end();
		});
	} else {
		// response.send('Please enter Username and Password!');
		// response.end();
	}
});


// employee adding route
app.get('/employee', function (req, res) {
    // console.log(req.session.manager);
    if(!req.session.manager){
        res.redirect('/');
    }
    else{
    res.render("employeeReg.ejs");
    }
});

// adding employee
app.post('/employee', function (req, res) {
    if(!req.session.manager){
        res.redirect('/');
    }
    else{
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
});

// app.get('/employee', async function (req, res) {
//     let mangers;
//     let cashier;
//     let waiter;
//     connection.query(`Select * from manager`, function (error, results, fields) {
//         if (error) throw error;
//         if (results) {

//             managers = results;
//         connection.query(`Select * from cashier`, function (error, results, fields) {
//             if (error) throw error;
//             if (results) {

//                 this.cashier = results;
//                 connection.query(`Select * from waiter`, function (error, results, fields) {
//                     if (error) throw error;
//                     if (results) {

//                         this.waiter = results;
//                         console.log('Data: $$$'+this.cashier)
//                         res.render('employee.ejs',{managers:this.managers,waiters:this.waiter,cashiers:this.cashier});
//                     }
//                 });

//             }
//         });

//     }

// })   
// }) 

// showing manager details on webpage from database
app.get('/manager', function (req, res) {
    if(!req.session.manager){
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
});

//Selling Page
app.get('/sell',(req,res)=>{
    if(!req.session.manager || !req.session.cashier){
        res.redirect('/');
    }
    else{
        res.send('The Page')
    }
});

//Customer Page
app.get('/rms',function (req,res){
    if(!req.session.loggedin){
    res.redirect('/');
}
else{
    res.send('RMS Page')
}
});

// showing waiter details on webpage from database
app.get('/waiter', function (req, res) {
    connection.query(`Select * from waiter`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('waiter.ejs', { waiters: results });

        }
    });
});

// showing cashier details on webpage from database
app.get('/cashier', function (req, res) {
    connection.query(`Select * from cashier`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            // console.log(results);
            res.render('cashier.ejs', { cashiers: results });

        }
    });
});

app.get('/balance', function (req, res) {
    res.render("balance.ejs");
});


// showing customer details on webpage from database
app.get('/customer', function (req, res) {
    connection.query(`Select * from customer`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('customer.ejs', { customers: results });

        }
    });
});
function deleteMenu(id){
    console.log("Id Number: "+id);
    // connection.query(`Delete from customer where idMenu=${id}`, function (error, results, fields) {
        // if (error) throw error;
        // if (results) {
        //     console.log(results);


        // }
    // });
}



// cashier delete
app.get('/cashierDelete/:id',function(req,res){
    connection.query(`Delete from cashier where idCashier=${req.params.id}`, function (error, results, fields) {
       if (error) throw error;
       if (results) {
           console.log(results);
           res.redirect('/cashier');

       }
   });
});

// customer delete
app.get('/customerDelete/:id',function(req,res){
    connection.query(`Delete from customer where idCustomer=${req.params.id}`, function (error, results, fields) {
       if (error) throw error;
       if (results) {
           console.log(results);
           res.redirect('/customer');

       }
   });
});

//waiter delete
app.get('/waiterDelete/:id',function(req,res){
    connection.query(`Delete from waiter where idWaiter=${req.params.id}`, function (error, results, fields) {
       if (error) throw error;
       if (results) {
           console.log(results);
           res.redirect('/waiter');

       }
   });
});

// manager delete
app.get('/managerDelete/:id',function(req,res){
    connection.query(`Delete from manager where idManager=${req.params.id}`, function (error, results, fields) {
       if (error) throw error;
       if (results) {
           console.log(results);
           res.redirect('/manager');

       }
   });
});

//manager edit
app.get('/managerEdit/:id',function (req,res){
    connection.query(`Select * from manager where idManager=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('managerEdit.ejs', { managers: results[0] })

        }
    });


})

app.post('/managerEdit/:id',function (req,res){
    connection.query(`UPDATE manager SET name = '${req.body.name}', phoneNumber='${req.body.number}', email='${req.body.email}', address='${req.body.address}', salary=${req.body.salary}, password='${req.body.password}' where idManager=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            // console.log(results);
            res.redirect('/manager')

        }
    });
    console.log('Post');

})

//cashier edit
app.get('/cashierEdit/:id',function (req,res){
    connection.query(`Select * from cashier where idCashier=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('cashierEdit.ejs', { cashiers: results[0] })

        }
    });


})

app.post('/cashierEdit/:id',function (req,res){
    connection.query(`UPDATE cashier SET name = '${req.body.name}', phoneNumber='${req.body.number}', email='${req.body.email}', address='${req.body.address}', salary=${req.body.salary}, password='${req.body.password}' where idCashier=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            // console.log(results);
            res.redirect('/cashier')

        }
    });
    console.log('Post');

})

//waiter edit
app.get('/waiterEdit/:id',function (req,res){
    connection.query(`Select * from waiter where idWaiter=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('waiterEdit.ejs', { waiters: results[0] })

        }
    });


})

app.post('/waiterEdit/:id',function (req,res){
    connection.query(`UPDATE waiter SET name = '${req.body.name}', phoneNumber='${req.body.number}', email='${req.body.email}', address='${req.body.address}', salary=${req.body.salary}, password='${req.body.password}' where idWaiter=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            // console.log(results);
            res.redirect('/waiter')

        }
    });
    console.log('Post');

})