const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length


const param = (p) => {
    const index = process.argv.indexOf(p)
    return process.argv[index + 1]
}
const MODO = param("--MODO") || 'FORK'

if (MODO === 'CLUSTER') {
    if (cluster.isMaster) {
        console.log(`soy el maestro ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork() 
        }
        cluster.on('listening', (worker, address) => {
            console.log(`${worker.process.pid} escuchando en el puerto ${address.port}`);
        })
    }else {
        http.createServer((req, res) => {
            res.writeHead(200)
            res.end('CLUSTER')
        })
        .listen(3001)
        // console.log(`soy el trabajador ${process.pid}`);
        console.log(`Worker ${process.pid} iniciado`);
    }
}else {
    console.log("FORK")
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('FORK')
    })
    .listen(3002)
    console.log(`Worker ${process.pid} iniciado`);
}