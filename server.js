// BASE SETUP
// ==========================================================

// call packages

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
mongoose.connect('mongodb://bob_db_user_0094:rocker64@ds015770.mlab.com:15770/ps-backend-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

});

var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Setup Routes
var router = express.Router();

router.use(function(req, res, next){
    console.log('Middleware is functioning!');
    next();
});

//test route to ensure everything is working
router.get('/', function(req, res){
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/bears')

    .post(function(req, res){
        var bear = new Bear();
        bear.name = req.body.name;


        bear.save(function(err) {
            console.log('inside bear save');

            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    });

//Register routes
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
