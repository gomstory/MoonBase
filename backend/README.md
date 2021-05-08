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


(GET) `/ask`

Uses to get Moon rate, 
If set param `thb` will calculate to `moon` rate
If set param `moon` will calculate to `thb` rate


## Available Socket

Socket.io uses to control realtime data such as `moonRate`, `history`.

#### `new_user`

Fire from client to request to generate new user

#### `current_user`

Fire from client to request existing user id, system will return existing user.

#### `info`

Fire from server to all users when `moonRate` and `history` is updated
