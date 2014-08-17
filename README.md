# Backend

## Install Requirement
```
nodejs >= 0.10.25
mysql >= 5.5.6
```

## Initial database
```
> cd bamboo-api/db
> mysql -uuser -ppassword < db.sql
> cd ..
> node bin/initdb
```

## Development
```
> git clone git@github.com:inspire-0905/bamboo-api.git
> cd bamboo-api
> npm install
> ln -s config/dev.json config/config.json
> node bin/www
```

## Deploy
```
> cd bamboo-api
> fab -R production upload
> fab -R production restart
```

## License
- - -
BSD-2-Clause