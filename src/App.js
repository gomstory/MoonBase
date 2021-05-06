import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import HistoryPage from './pages/HistoryPage';
import Layout from './components/Layout/Layout'

function App() {
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

export default App;
