COMANDOS 

<!-- MODO FORK O CLUSTER -->
<!-- nodemon src/server1.js --MODO CLUSTER -->
npm run dev1 

<!-- FOREVER -->
<!-- forever start src/index.js -->
npm run start
<!-- forever stop src/index.js -->
npm run stop
<!-- forever list -->
npm run list

<!-- PM2 -->
<!-- pm2 start src/index.js -->
npm run pstart
<!-- pm2 stop src/index.js -->
npm run pstop
<!-- pm2 start src/index.js --watch -->
npm run pwatch
<!-- pm2 start src/index.js --watch -i max -->
npm run pcluster
<!-- pm2 stop src/index.js -->
npm run pstopall
<!-- pm2 delete all -->
npm run pdeleteall
<!-- pm2 restart src/index.js -->
npm run prestart
