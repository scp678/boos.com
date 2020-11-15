const express = require('express');
const conn = require('../dao/conn');
const crypto = require('crypto');

const router = express.Router();

router.route('/reg')
    .post((req,res,next) => {
        let searchUser = `select * from reg where user_phone='${req.body.phone}'`;
        conn.query(searchUser,(err,results) =>{
            if (err) console.log(err);
            if (results.length) {
                res.json({
                    msg: "用户名已存在",
                    phone: req.body.phone,
                    error: 1
                });
            }else {
                let md5 = crypto.createHash('md5');
                let passResult = md5.update(req.body.password).digest('hex');
                let sql = `insert into reg(user_phone,user_password) values('${req.body.phone}','${passResult}')`;
                
                conn.query(sql,(err,result) => {
                    if (err) console.log(err);
                    if (result.insertId) {
                        res.cookie('phone',req.body.phone);
                        res.cookie('isLogined',true);
                        res.json({
                            msg: "注册成功",
                            phone: req.body.phone,
                            error: 0
                        });
                    }
                });
            }
        });


    });

    router.route('/login')
        .post((req,res,next) => {
            console.log(req.cookies);
        });

module.exports = router;