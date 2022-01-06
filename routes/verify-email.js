const { Router } = require('express')
const mysql = require('../src/mysql_pool.js')
const jwt = require('jsonwebtoken')

module.exports.Router = class Routes extends Router {
    constructor() {
        super();

        this.get('/:token', async (req, res, next) => {
            try {
                const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET)
                mysql.createQuery('UPDATE users SET isVerified=1 WHERE id=?', [id], (err, resu) => {
                    if(err) res.send(err)
                    res.send(resu)
                })
            } catch (error) {
                res.status(500)
            }
            return res.redirect('/auth/login')
        })
        
    }
};

module.exports.page = '/verify-email';