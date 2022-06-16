COMANDOS 

MODO FORK O CLUSTER 
npm run dev1  (nodemon src/server1.js --MODO CLUSTER o nodemon src/server1.js --MODO FORK)

FOREVER 
npm run start (forever start src/index.js)
npm run stop (forever stop src/index.js )
npm run list (forever list)

<!-- PM2 -->
npm run pstart (pm2 start src/index.js )
npm run pstop ( pm2 stop src/index.js)
npm run pwatch (pm2 start src/index.js --watch)
npm run pcluster (pm2 start src/index.js --watch -i max)
npm run pstopall (pm2 stop src/index.js)
npm run pdeleteall (pm2 delete all)
npm run prestart (pm2 restart src/index.js)
