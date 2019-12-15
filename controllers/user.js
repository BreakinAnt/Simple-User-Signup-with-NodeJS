const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        message: false
    });
};

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findAll({where: { email: email }})
        .then(user => {
        const emailCheck = typeof user[0] === 'undefined' ? true : false;
        const passwordCheck = password.length > 4;

        //password auth
        if(req.body.password !== req.body.cPassword){
            return res.render('signup', {
                message: 'Senha não confere'
            });
        } else if (!passwordCheck) {
            return res.render('signup', {
                message: 'Senha muito curta'
            });
        }

        //email auth
        if(!emailCheck){
            return res.render('signup', {
                message: 'Email já existe'
            });
        }

        //user register
        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                User.create({
                    name: name,
                    email: email,
                    password: hashedPassword
                })
            })
            .then(result => {
                return res.render('signup', {
                    message: 'Usuário registrado!'
                })
            })
            .catch(err => console.log(err));
        });
}