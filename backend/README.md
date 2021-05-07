# API for MoonBase Application

This API will provides data to BoonBase Application, This API constructed by using Express (Node.js) and Socket.io

## Run App

For running app let use following commands in terminal:

```
npm install
npm run start
```

These command will be install node_modules and start API in [http://localhost:3001](http://localhost:3001)

## Available APIs
 
(POST) `/exchange`

Uses to exchange THBT curency to MOON coin.


(GET) `/history/:id`

Uses to get buying history from given user id.