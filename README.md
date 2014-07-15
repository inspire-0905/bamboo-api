# Backend

## Install Requirement
```
nodejs >= 0.10.25
mysql >= 5.5.6
```

## Initial database
```
cd bamboo-api/db
mysql -uuser -ppassword
create database test default charset utf8;
source db.sql
```

## Deploy
```
> git clone git@github.com:inspire-0905/bamboo-api.git
> cd bamboo-api
> npm install
> ln -s config/dev.json config/config.json
> node bin/www
```

## License
- - -
BSD-2-Clause