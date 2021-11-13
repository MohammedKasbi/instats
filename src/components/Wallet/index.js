import { useState } from 'react';
import { Doughnut  } from 'react-chartjs-2';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { numberToComma } from '../../selectors/numberToComma';
import Account from '../Account';
import './style.scss';

const Wallet = () => {
  const [viewData, setViewData] = useState(true);
  const accountsNames = useSelector((state) => state.wallet.accountsNames);
  const capitals = useSelector((state) => state.wallet.capitals);
  const accountsData = useSelector((state) => state.wallet.accountsData);
  const accountValue = useSelector((state) => state.wallet.accountValue);
  const accountValueConverted = useSelector((state) => state.wallet.accountValueConverted);

  const doughnutData = {
    labels: accountsNames,
    datasets: [{
      data: capitals,
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
          <span className="wallet__doughnut__data__tag">Capital Total
            {viewData
            ? <AiOutlineEye className="wallet__doughnut__data__tag__eye" onClick={handleShowData} />
            : <AiOutlineEyeInvisible className="wallet__doughnut__data__tag__eye" onClick={handleShowData} />}
          </span>
          <span className="wallet__doughnut__data__value">
            {viewData
            ? numberToComma(accountValue)
            : numberToComma(accountValue).replaceAll(/[0123456789]/g, '*')}
          </span>
          <span className="wallet__doughnut__data__converted">
            {viewData
            ? numberToComma(accountValueConverted)
            : numberToComma(accountValueConverted).replaceAll(/[0123456789]/g, '*')}
          </span>
        </div>
      </div>
      {/* <div className="wallet__links">ajouter ici des étiquettes cliquables</div> */}
      <span className="wallet__title__account">Comptes</span>
      <div className="wallet__accounts">
        {accountsData.map((elem) => (
          <Account
            key={elem.id}
            id={elem.id}
            img={elem.image}
            name={elem.name}
            value={elem.capital}
            percent={elem.percent}
            dollar={elem.percentConverted}
          />
        ))}
      </div>
    </div>
  );
};

export default Wallet;
