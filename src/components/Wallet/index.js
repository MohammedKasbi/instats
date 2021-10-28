import { useState } from 'react';
import { Doughnut  } from 'react-chartjs-2';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './style.scss';

const Wallet = () => {
  const [viewData, setViewData] = useState(true);

  const doughnutData = {
    labels: ['FIN888', 'EmpireX', 'Gold Robot', 'TTD', 'UAG Trade', 'Whalinvest'],
    datasets: [{
      data: [3000, 2500, 2000, 1500, 1000, 500],
      backgroundColor: [
        'rgba(252, 145, 65, 1)',
        'rgba(61, 255, 249, 1)',
        'rgba(240, 255, 109, 1)',
        'rgba(186, 66, 255, 1)',
        'rgba(254, 67, 144, 1)',
        'rgba(66, 147, 254, 1)',
      ],
      borderWidth: 0,
      hoverOffset: 4,
      cutout: '90%',
    }],
  }

  const doughnutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  }

  const handleShowData = (evt) => {
    evt.preventDefault();
    setViewData(!viewData);
  }

  return (
    <div className="wallet">
      <div className="wallet__doughnut">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="wallet__doughnut__data">
          <span className="wallet__doughnut__data__tag">Capital Total {viewData ? <AiOutlineEye className="wallet__doughnut__data__tag__eye" onClick={handleShowData} /> : <AiOutlineEyeInvisible className="wallet__doughnut__data__tag__eye" onClick={handleShowData} />}</span>
          <span className="wallet__doughnut__data__value">$109,455,850.25</span>
          <span className="wallet__doughnut__data__converted">109,440,850.25€</span>
        </div>
      </div>
      <div className="wallet__pie-accounts"></div>
      <div className="wallet__accounts-list"></div>
    </div>
  );
};

export default Wallet;
