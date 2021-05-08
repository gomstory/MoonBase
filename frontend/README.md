# MoonBase Application


MoonBase is cryptocurrency exchange website that help user exchange THBT to MOON coin.
MoonBase was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


> **Note: System will work properly when API for MoonBase Application is running, See /backend/README.md for installing.**


## Run App

For running app let use following commands in terminal:

```
npm install
npm run start
````

These command will runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deploy App

Run these command will generate build folder:

```
npm install
npm run build
```

The command will builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## How to use MoonBase

#### `Buy Tab`

1. Click `buy` tab.
2. Add amount to buy in `Amount to buy (THBT)` input.
3. Application will automatic callculate MOON coin in `Amount MOON` input, coin is depend on current MOON rate.
4. Press `buy` button to buy coin, the history will be shown in history tab
5. if complete, Application will redirect to Success page.
6. if not, Application will redirect to Error page.

#### `History Tab`
1. Click to `history` tab
2. Buying history will be shown in table, history order by Date and Time descending.
