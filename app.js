const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'rms'
});

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

// adding menu route
app.get('/manage', function (req, res) {
    res.render("manage.ejs");
});

// adding menu
app.post('/manage', function (req, res) {
    console.log(req.body);
    connection.query(`INSERT INTO menu(catagory, itemName, price) VALUES('${req.body.catagory}', '${req.body.name}', ${req.body.price})`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log('Done');
            res.redirect('/manage')

        }
    });
});


// app.get('/employee', function (req, res) {
//     res.render("employee.ejs");
// });

// adding employee
app.post('/employee', function(req,res){
    console.log(req.body);
    if(req.body.type === "manager"){
        connection.query(`INSERT INTO manager(name, phoneNumber, email, address, salary, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.address}', ${req.body.salary}, '${req.body.password}')`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log('Done');
                res.redirect('/employee')
    
            }
        });
    }
    else if(req.body.type === "cashier"){
        connection.query(`INSERT INTO cashier(name, phoneNumber, email, address, salary, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.address}', ${req.body.salary}, '${req.body.password}')`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log('Done');
                res.redirect('/employee')
    
            }
        });
    }

    else if(req.body.type === "waiter"){
        connection.query(`INSERT INTO waiter(name, phoneNumber, email, address, salary, password) VALUES('${req.body.name}', '${req.body.number}', '${req.body.email}', '${req.body.address}', ${req.body.salary}, '${req.body.password}')`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log('Done');
                res.redirect('/employee')
    
            }
        });
    }

    else{
        console.log("None of the type is selected...");
    }
});

app.get('/employee', async function (req, res) {
    let mangers;
    let cashier;
    let waiter;
    connection.query(`Select * from manager`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
        
            this.managers = results;
        connection.query(`Select * from cashier`, function (error, results, fields) {
            if (error) throw error;
            if (results) {
           
                this.cashier = results;
                connection.query(`Select * from waiter`, function (error, results, fields) {
                    if (error) throw error;
                    if (results) {
            
                        this.waiter = results;
                        console.log('Data: $$$'+this.cashier)
                        res.render('employee.ejs',{managers:this.managers,waiters:this.waiter,cashiers:this.cashier});
                    }
                });
           
            }
        });
    
    }
  
})   
}) 


app.get('/manager', function (req, res) {
    res.render("manager.ejs");
});

app.get('/waiter', function (req, res) {
    res.render("waiter.ejs");
});

app.get('/cashier', function (req, res) {
    res.render("cashier.ejs");
});

app.get('/balance', function (req, res) {
    res.render("balance.ejs");
});

app.get('/login2', function (req, res) {
    res.render("login2.ejs");
});

// showing menu details on webpage from database
app.get('/menu',  function (req, res) {
    connection.query(`Select * from menu`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('menu.ejs',{menus:results})

        }
    });

});

// showing customer details on webpage from database
app.get('/customer', function (req, res) {
    connection.query(`Select * from customer`, function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            res.render('customer.ejs',{customers:results});

        }
    });
});
