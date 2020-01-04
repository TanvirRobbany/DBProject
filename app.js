const express = require("express");
const app = express();
var session = require('express-session');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const managerRoutes = require('./routes/manager');
const cashierRoutes = require('./routes/cashier');
const waiterRoutes = require('./routes/waiter');
const customerRoutes = require('./routes/customer');

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
app.use(managerRoutes);
app.use(cashierRoutes);
app.use(waiterRoutes);
app.use(customerRoutes);


// customer registration route
app.get('/registration', function (req, res) {
    res.render("registration.ejs");
});


//Authenticating user || Login post
app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM manager WHERE email = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) { response.send(error) };
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.email = results[0].email;
                console.log(`Id:${results[0].email} & session Id:${  request.session.email }`)
                request.session.manager = true;
                request.session.cashier = false;
                response.redirect('/admin');
            } else {
                connection.query('SELECT * FROM cashier WHERE email = ? AND password = ?', [username, password], function (error, results, fields) {
                    // if(error) {response.send( error)};
                    if (results.length > 0) {
                        console.log(results[0].idCashier);
                        request.session.loggedin = true;
                        request.session.username = username;
                        request.session.email = results[0].email;
                        request.session.cashier = true;
                        request.session.manager = false;
                        console.log(request.session.cashier)
                        response.redirect('/sell');
                    } else {
                        if (error) { response.send(error) };
                        connection.query('SELECT * FROM customer WHERE email = ? AND password = ?', [username, password], function (error, results, fields) {
                            if (results.length > 0) {
                                request.session.loggedin = true;
                                request.session.username = username;
                                response.redirect('/menuC');
                            } else {
                                response.send('Incorrect Username and/or Password!');
                            }
                        }
                        )
                    }
                })
            }
            //if problem then comment out
            //response.end();
        });
    } else {
        //if problem then comment out
        //response.send('Please enter Username and Password!');
        //response.end();
    }
});
