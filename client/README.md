# React + TypeScript + Vite

```
docker build -t pv113-client . 
docker tag pv113-client:latest novakvova/pv113-client:latest
docker push novakvova/pv113-client:latest

docker-compose pull
docker compose up -d
```

## nginx options
```
/etc/nginx/sites-available/default

server {
server_name   pasxa.novakv.com *.pasxa.novakv.com;
location / {
        proxy_pass         http://localhost:5050;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}

sudo systemctl restart nginx
```
