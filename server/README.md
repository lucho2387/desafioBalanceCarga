COMANDOS 

PM2 
(fork) 

pm2 start server.js --name="Servidor1" --watch -- 8081

(cluster) 

pm2 start server.js --name="Servidor2" --watch -i 2 -- 8082s
pm2 start server.js --name="Servidor3" --watch -i max -- 8083
pm2 start server.js --name="Servidor4" --watch -i 1 -- 8084
pm2 start server.js --name="Servidor5" --watch -i 1 -- 8085

shell

./nginx.exe -s reload
tasklist /fi "imagename eq nginx.exe"
./nginx.exe -s stop
