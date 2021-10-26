import { Doughnut  } from 'react-chartjs-2';
import './style.scss';

const Wallet = () => {
  const doughnutData = {
    labels: ['FIN888', 'EmpireX', 'Gold Robot', 'TTD', 'UAG Trade', 'Whalinvest'],
    datasets: [{
      data: [5347.76, 5974.09, 2106.80, 542.56, 489.36, 371.71],
      backgroundColor: [
        'rgba(252, 145, 65, 1)',
        'rgba(61, 255, 249, 1)',
        'rgba(240, 255, 109, 1)',
        'rgba(186, 66, 255, 1)',
        'rgba(254, 67, 144, 1)',
        'rgba(66, 147, 254, 1)',
      ],
      borderColor: '#282c34',
      borderWidth: 2,
      hoverOffset: 4,
      cutout: '90%',
    }],
  }

  const doughnutOptions = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom',
    },
  }

  return (
    <div className="wallet">
      <div className="wallet__pie">
        <Doughnut data={doughnutData} options={doughnutOptions} />

      </div>
      <div className="wallet__pie-accounts"></div>
      <div className="wallet__accounts-list"></div>
    </div>
  );
};

export default Wallet;
