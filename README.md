# Test Victor Utrera api for Toolbox

## Getting Started

### Clone repository

```
$ git clone
```

### Steps to run

```
$ npm start
```

default port is 8000. to change port, go to server.js file and change manually.

to run n develop mode with nodemon

```
npm run watch
```

### Steps to run with docker

- build docker container

```
$ docker build -t api-toolbox-test-vu .
```

- run the container

```
$ docker run -it -p 8000:8000 api-toolbox-test-vu
```

### Test

```
$ npm run test
```

## Author

Victor Utrera
````
