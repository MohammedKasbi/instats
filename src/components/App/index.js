// imports

// imports persos
import './style.scss';
import Menu from '../Menu';
import Dashboard from '../Dashboard';
import Wallet from '../Wallet';
import AddTransaction from '../AddTransaction';
import Statistics from '../Statistics';
import History from '../History';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/portefeuille">
          <Wallet />
        </Route>
        <Route path="/ajouter-transaction">
          <AddTransaction />
        </Route>
        <Route path="/statistiques">
          <Statistics />
        </Route>
        <Route path="/historique">
          <History />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
