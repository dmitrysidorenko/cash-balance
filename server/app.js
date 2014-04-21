/**
 * Created by Dmitriy on 20.04.14.
 */
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var sqlQueries = require('./sql-queries');

var app = express();
var router = express.Router();

app.use(require('body-parser')());
app.use(require('method-override')());

app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, '../bower_components')));

app.use(router);


//db
function dbConnect() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'cashbalance'
    });
}


router.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../app/index.html'));
});

//api
router.get('/api/balanceLine', function (req, res) {
    var query = null;
    if (req.query['categoryId']) {
        query = sqlQueries.getAllBalanceLinesWithCategoriesAndFilterByGroup.replace('{{categoryId}}', req.query['categoryId']);
    } else {
        query = sqlQueries.getAllBalanceLinesWithCategories;
    }
    dbConnect().query(query, function (err, rows) {
        if (!err) {
            //success
            res.statusCode = 200;
            return res.send(rows);
        } else {
            res.statusCode = 500;
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
});
router.post('/api/balanceLine', function (req, res) {
    var query = sqlQueries.createBalanceLine.replace('{{sum}}', req.body.Sum).replace('{{date}}', req.body.Date).replace('{{categoryId}}', req.body.Category.Id).replace('{{note}}', req.body.Note || '');
    dbConnect().query(query, function (err, result) {
        if (!err) {
            //success
            res.statusCode = 200;
            return res.send(result.insertId);
        } else {
            res.statusCode = 500;
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.get('/api/category', function (req, res) {
    dbConnect().query(sqlQueries.getAllCategories, function (err, rows) {
        if (!err) {
            //success
            res.statusCode = 200;
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