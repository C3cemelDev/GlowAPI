const { Router } = require('express')
const mysql = require('../src/mysql_pool.js')
const jwt = require('jsonwebtoken')

module.exports.Router = class Routes extends Router {
    constructor() {
        super();

        this.get('/:token', async (req, res, next) => {
            try {
                const { user} = jwt.verify(req.params.token, process.env.EMAIL_SECRET)
                await mysql.createQuery('UPDATE users SET isVerified=1 WHERE id=?', [user.id], (err, resu) => {
                    if(err) res.send(err)
                    console.log(user.id)
                    res.send(user.id)
                })
            } catch (error) {
                res.status(500)
            }
            // return res.redirect('/auth/login')
        })
        
    }
};

module.exports.page = '/verify-email';