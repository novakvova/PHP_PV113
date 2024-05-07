## Learning Laravel
```
php artisan serve
php artisan migrate
php artisan db:seed
```
[http://localhost:8000/api/documentation](http://localhost:8000/api/documentation)


## Run project docker
```
docker compose up -d
docker-compose up --build -d
```

## Create image to docker hub
```
docker build -t pv113_image .
docker login
docker tag pv113_image:latest novakvova/pv113_laravel:latest
docker push novakvova/pv113_laravel:latest
```

### Pull docker image in server
```
docker login
docker-compose pull
docker compose stop
docker compose up -d
docker ps -a
```

