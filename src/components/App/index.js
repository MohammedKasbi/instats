// == Imports : npm
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment/dist/moment';
import 'moment/dist/locale/fr';

// == Imports : local
// Styles
import './style.scss';

// Components
import Menu from '../Menu';
import Dashboard from '../Dashboard';
import Wallet from '../Wallet';
import AddTransaction from '../AddTransaction';
import Statistics from '../Statistics';
import History from '../History';
import Profile from '../Profile';
import DetailAccount from '../DetailAccount';
import AddAccount from '../AddAccount';
import { ToastContainer } from 'react-toastify';

// Set moment local to french
moment.locale('fr');

// == Component
const App = () => {
  const dispatch = useDispatch();
  const accountsList = useSelector((state) => state.accounts.accountsList);
  const loading = useSelector((state) => state.accounts.loading);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ACCOUNTS_LIST',
    });
  }, [dispatch]);

  if (loading) {
    return <div>
      Chargement...
    </div>
  }

  // == Render
  return (
    <div className="App">
      <ToastContainer />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Dashboard accountsList={accountsList} />
        </Route>
        <Route path="/portefeuille">
          <Wallet accountsList={accountsList} />
        </Route>
        <Route path="/ajouter-transaction">
          <AddTransaction accountsList={accountsList} />
        </Route>
        <Route path="/statistiques">
          <Statistics />
        </Route>
        <Route path="/historique">
          <History accountsList={accountsList} />
        </Route>
        <Route path="/compte/:id">
          <DetailAccount accountsList={accountsList} />
        </Route>
        <Route path="/profil">
          <Profile />
        </Route>
        <Route path="/nouveau-compte">
          <AddAccount />
        </Route>
      </Switch>
    </div>
  );
}

// == Export
export default App;
