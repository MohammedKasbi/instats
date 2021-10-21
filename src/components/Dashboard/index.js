import './style.scss';

const Dashboard = () => (
  <div className="dashboard">
    <div className="dashboard__wallet">
      <div className="dashboard__wallet__dollars">
        <span>$45850.25</span>
      </div>
      <div className="dashboard__wallet__percentage">
      <span>+10.89%</span>
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
