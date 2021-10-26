import './style.scss';

const Dashboard = () => (
  <div className="dashboard">
    <div className="dashboard__wallet">
      <div className="dashboard__wallet__dollars">
        <span className="dashboard__wallet__dollars__tag">Portefeuille</span>
        <span className="dashboard__wallet__dollars__value">$45,850.25</span>
        <span className="dashboard__wallet__dollars__converted">40,850.25€</span>
      </div>
      <div className="dashboard__wallet__percentage">
        <span className="dashboard__wallet__percentage__tag">Evolution dernières 24h</span>
        <span className="dashboard__wallet__percentage__value">+10.89%</span>
        <span className="dashboard__wallet__percentage__converted">+ $516.42</span>
      </div>
    </div>
    <div className="dashboard__transactions">
      <span>Transactions...</span>
    </div>
    <div className="dashboard__graphic">
      <span>Graphique...</span>
    </div>
  </div>
);

export default Dashboard;
