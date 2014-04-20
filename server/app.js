/**
 * Created by Dmitriy on 20.04.14.
 */
var express = require('express');
var path = require('path');
var mysql = require('mysql');

var app = express();
var router = express.Router();

app.use(require('body-parser')());
app.use(require('method-override')());

app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, '../bower_components')));

//app.use(router);


//db
function dbConnect() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database:'cashbalance'
    });
}


router.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../app/index.html'));
});

//api
router.get('/api/all', function (req, res) {
    dbConnect().query('SELECT * FROM balanceline', function (err, rows) {
        if (!err) {
            //success
            return res.send(rows);
        } else {
            res.statusCode = 500;
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
});


//run
app.listen(8080, function () {
    console.info('Express server listening on port ' + 8080);
});