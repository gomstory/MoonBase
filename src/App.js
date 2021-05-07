import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import React, { useEffect } from "react";
import HistoryPage from './pages/HistoryPage';
import Layout from './components/Layout/Layout'
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { updateMoon, updateUser } from './redux/actions';
const ENDPOINT = "http://127.0.0.1:3001";

function App(props) {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    
    socket.on("info", data => {
      props.dispatch(updateMoon(data));
    });

    socket.on("user", user => {
      props.dispatch(updateUser(user))
    })
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path='/buy' exact>
          <BuyPage />
        </Route>
        <Route path='/history'>
          <HistoryPage />
        </Route>
        <Route path='*'>
          <Redirect to='/buy' />
        </Route>
      </Switch>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
      ...state
  };
}

export default connect(mapStateToProps)(App);
