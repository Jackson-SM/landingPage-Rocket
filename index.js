const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Usuario = require('./models/Usuario')
const session = require('express-session')
const flash = require('connect-flash')
const hash = require('crypto-js')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('src'))
app.use(session({secret: 'asufhasufap21924as90jasf82una'}))
app.use(flash())

app.get('/login', (req,res) => {
    if(!req.session.login){
        res.render('login', {
            title: 'Login',
            message: req.flash("error")
        })
    }else{
        res.redirect('/')
    }
})

app.get('/register', (req,res) => {
    if(!req.session.login){
        res.render('register', {
            title: 'Registro',
            message: req.flash("error")
        })
    }else{
        res.redirect('/')
    }
})


app.post('/confirm', (req,res) => {
    if(req.body.password == '' || req.body.login == '' || req.body.email == '' || req.body.name == ''){
        req.flash("error", "Preencha todos os campos")
        res.redirect('register')
    }else {
        Usuario.findAll({where: {'login': req.body.login}})
        .then(login => {
            if(login.length !== 0){
                req.flash("error", "Usuario já existente")
                res.redirect('register')
            }
            else{
                Usuario.findAll({where: {'email': req.body.email}})
                    .then(email => {
                        if(email.length !== 0){
                            req.flash("error", "Email já em Uso")
                            res.redirect('register')
                        }else {
                            Usuario.create({
                                login: req.body.login,
                                email: req.body.email,
                                name: req.body.name,
                                password: hash.MD5(req.body.password).toString()
                            }).then(function(){
                                req.session.login = req.body.login
                                res.redirect('/')
                            }).catch(err => {
                                res.redirect('register')
                                req.flash("error", "Erro ao se conectar ao banco de dados")
                            })
                        }
                    })
            }
        })
    }
})

app.post('/authenticate', (req,res) => {
    Usuario.findAll({where: {'login': req.body.login, 'password': hash.MD5(req.body.password).toString()}})
        .then(userid => {
            if(userid){
                req.session.login = userid[0].login
                res.redirect('/')
            }
        }).catch(err => {
            if(req.body.password == '' || req.body.login == ''){
                req.flash("error", "Preencha todos os campos")
                res.redirect('login')
            }else{
                req.flash("error", "Usuário ou senha inválidos.")
                res.redirect('login')
            }
        })
})

app.get('/', (req,res) => {
    if(req.session.login){
        Usuario.findAll({where: {'login': req.session.login}}).then(posts => {
            res.render('index', {
                posts: posts,
                session: req.session.login
            })
        })
    }else{
        res.render('index', {
            session: req.session.login
        })
    }
})

app.get('/delete/:id', (req,res) => {
    Usuario.destroy({where: {'id': req.params.id}}).then(function(){
        req.session.login = undefined
        res.redirect('/')
    }).catch(err => {
        res.redirect('/')
    })
})

app.get('/logout/:id', (req,res) => {
    Usuario.findAll({where: {'id': req.params.id}})
        .then(userlogout => {
            req.session.login = undefined
            res.redirect('/')
        }).catch(err => {
            res.redirect('/')
        })
})

app.listen(3001, function(){
    console.log('Servidor aberto na porta 3001')
})