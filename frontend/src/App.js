import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import React, { useEffect } from "react";
import HistoryPage from './pages/HistoryPage';
import Layout from './components/Layout/Layout'
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { updateMoon, updateUser } from './redux/actions';
import { ENDPOINT } from './config';

function App(props) {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      socket.emit('current_user', userId)
    } else {
      socket.emit('new_user')
    }
    
    socket.on("info", data => {
      props.dispatch(updateMoon(data));
    })

    socket.on("user", user => {
      console.log('User ID:', user.id, 'Socket:', user.socket)
      props.dispatch(updateUser(user))
      sessionStorage.setItem('userId', user.id)
    })

    socket.on("clear", () => {
      sessionStorage.removeItem('userId')
      socket.emit('new_user')
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
