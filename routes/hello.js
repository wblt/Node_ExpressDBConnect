/**
 * Created by mac on 16/12/4.
 */
var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('hello-world', server);

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    db.open(function(err) {
        /* Select 'contact' collection */
        if(!err) {
            console.log("We are connected");
            db.collection('users', function(err, collection) {
                if(!err) {
                    //插入一条数据
                    //collection.insert({
                    //    userid: 'FredChien',
                    //    password: '123456'
                    //}, function(err, data) {
                    //    if (data) {
                    //        console.log('Successfully Insert');
                    //    } else {
                    //        console.log('Failed to Insert');
                    //    }
                    //});

                    //查询数据
                    var whereStr = {'userid':'admin'};
                    collection.find(whereStr).toArray(function(err, result) {
                        if(err)
                        {
                            console.log('Error:'+ err);
                            return;
                        }
                        console.log(result);

                        res.send(result);

                    });
                }else {
                    console.log(err);
                }
            });
        }
        else {
            console.log(err);
        }
        db.close();


    });
});

module.exports = router;
