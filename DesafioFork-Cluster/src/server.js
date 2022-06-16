const express = require('express')
const cookieParser = require("cookie-parser")
const handlebars = require('express-handlebars')
const path =  require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require("connect-mongo")
// const parseArgs = require('minimist')
// const { fork } = require('child_process')
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length


const advancedOptions = {
    useNewUrlParser: true,
    useunifiedTopology: true
}

const Producto = require('./models/Producto')
const Usuario = require('./models/Usuario')
const { isAuthenticated } = require('./middlewares/auth')
const { NAME, NAME_DATABASE, PASSWORD } = process.env

// Inicializacion
const app = express()
require('./config/passport')

// PUERTO
// const param = (p) => {
//     const index = process.argv.indexOf(p)
//     return process.argv[index + 1]
// }

// const MODO = param("--MODO") || 'FORK'

// if (MODO === 'CLUSTER') {
//     if (cluster.isMaster) {
//         console.log(`soy el maestro ${process.pid}`);
//         // Fork workers.
//         for (let i = 0; i < numCPUs; i++) {
//            cluster.fork();
//         }
//         cluster.on('listening', (worker, address) => {
//             console.log(`${worker.process.pid} escuchando en el puerto ${address.port}`);
//         })
//     }else {
//         http.createServer((req, res) => {
//             res.writeHead(200)
//             res.end('Prueba')
//         })
//         .listen(3001)
//         console.log(`Worker ${process.pid} iniciado`);
//         // process.exit(0)
//     }
// }else {
//     console.log("FORK")
// }

// const cluster = require('cluster')
// const http = require('http')
// const numCPUs = require('os').cpus().length

// Configuraciones
app.set('port', process.env.PORT || 8080)
app.set("views", path.join(__dirname, "views"));

// Motor de Plantilla (Handlebars)
app.engine(
    ".hbs",
    handlebars.engine({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${NAME}:${PASSWORD}@cluster0.9xnml.mongodb.net/${NAME_DATABASE}?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions,
        ttl: 60
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Variables Globales
app.use((req, res, next) => {
  res.locals.mensaje = req.flash('mensaje')
  res.locals.error = req.flash('error')
  // res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next()
})

app.get('/productos',isAuthenticated, async (req, res) => {
    const user = req.user
    const usuario = await Usuario.findById(user).lean()
    const productos = await Producto.find().lean()
    res.render('products/list-products', {usuario, productos})
})

app.get('/usuario/salir', async (req, res) => {
    const user = req.user
    const usuario = await Usuario.findById(user).lean()
    req.logout()
    req.flash('mensaje', `Hasta Luego ${usuario.nombre}`)
    res.redirect('/usuario/login')
})


app.get('/info', async (req, res) => {
    const util = require('util');
    const directorio = process.cwd()
    const ruta = process.execPath
    const procesoId = process.pid
    const nombrePlataforma = process.platform
    const versionNode = process.version
    const argumentoEntrada = process.argv
    const memoriaReservada = util.inspect(process.memoryUsage().rss)
    const totalCPUs = require('os').cpus().length

    res.render('process/info',{directorio,ruta,procesoId,nombrePlataforma,versionNode,argumentoEntrada,memoriaReservada,totalCPUs})
})

// Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/productos.routes'))
app.use(require('./routes/usuarios.routes'))
app.use(require('./routes/random.routes'))

// Archivos Estaticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = { app }
