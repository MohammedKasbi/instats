import './style.scss';
import { Line  } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const dates = useSelector((state) => state.dashboard.dates);
  const dailyGains = useSelector((state) => state.dashboard.dailyGains);
  const accountValue = useSelector((state) => state.dashboard.accountValue);
  const accountValueConverted = useSelector((state) => state.dashboard.accountValueConverted);
  const accountPercent = useSelector((state) => state.dashboard.accountPercent);
  const accountPercentConverted = useSelector((state) => state.dashboard.accountPercentConverted);

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
          <span className="dashboard__wallet__dollars__value">${accountValue}</span>
          <span className="dashboard__wallet__dollars__converted">€{accountValueConverted}</span>
        </div>
        <div className="dashboard__wallet__percentage">
          <span className="dashboard__wallet__percentage__tag">Evolution dernières 24h</span>
          <span className="dashboard__wallet__percentage__value">+{accountPercent}%</span>
          <span className="dashboard__wallet__percentage__converted">+ ${accountPercentConverted}</span>
        </div>
      </div>
      <div className="dashboard__transactions">
        <h2 className="dashboard__transactions__title">Derniers mouvements</h2>
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
