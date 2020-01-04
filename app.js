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
app.use(menuRoutes);
app.use(managerRoutes);
app.use(cashierRoutes);
app.use(waiterRoutes);
app.use(customerRoutes);


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
app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM manager WHERE email = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) { response.send(error) };
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.id = results[0].idManager;
                request.session.manager = true;
                response.redirect('/admin');
            } else {
                connection.query('SELECT * FROM cashier WHERE email = ? AND password = ?', [username, password], function (error, results, fields) {
                    // if(error) {response.send( error)};
                    if (results.length > 0) {
                        console.log(results[0].idCashier);
                        request.session.loggedin = true;
                        request.session.username = username;
                        request.session.id = results[0].idCashier
                        request.session.cashier = true;
                        response.redirect('/menu');
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
            response.end();
        });
    } else {
        //if problem then comment out
        response.send('Please enter Username and Password!');
        response.end();
    }
});


app.get('/balance', function (req, res) {
    res.render("balance.ejs");
});

//Selling Page
app.get('/sell', (req, res) => {
    if (!req.session.manager || !req.session.cashier) {
        res.redirect('/');
    }
    else {
        res.send('The Page')
    }
});
