import './style.scss';
import { Line  } from 'react-chartjs-2';

const Dashboard = () => {
  const dates = ['31/10', '01/11', '02/11', '03/11', '04/11', '05/11', '06/11', '07/11', '08/11', '09/11',];
  const dailyGains = [3, 20, 5, 12, 15, 16, 20, 19, 22, 27];
  
  const lineData = {
    labels: dates,
    datasets: [{
      data: dailyGains,
      // backgroundColor: 'linear-gradient(90deg, rgba(0,113,255,1) 0%, rgba(0,113,255,0) 100%);',
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      // borderWidth: 9,
      pointRadius: 4,
      pointHoverRadius: 7,
      pointBackgroundColor: 'rgb(75, 192, 192)',
      tension: 0.15,
    }],
  }

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  }

  return (
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
        <h2 className="dashboard__transactions__title">Dernièrs mouvements</h2>
        <span>Transaction 1</span>
        <span>Transaction 2</span>
        <span>Transaction 3</span>
        <span>Transaction 4</span>
        <span>Transaction 5</span>
        <span>Transaction 6</span>
      </div>
      <div className="dashboard__graphic">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
