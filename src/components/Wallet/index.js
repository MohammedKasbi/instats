import fx from 'money';
import { useEffect, useState } from 'react';
import { Doughnut  } from 'react-chartjs-2';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalSum } from '../../selectors/calculateTotalSum';
import { numberToComma } from '../../selectors/numberToComma';
import Account from '../Account';
import './style.scss';

const Wallet = () => {
  const dispatch = useDispatch();

  const [viewData, setViewData] = useState(true);

  const loading = useSelector((state) => state.wallet.loading);
  const accountsList = useSelector((state) => state.wallet.accountsList);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ACCOUNTS_LIST',
    });
  }, [dispatch]);

  const totalWalletValue = calculateTotalSum(accountsList);

  fx.base = 'USD';
  fx.rates = {
    'EUR': 0.88,
    'USD': 1,
  };
  fx.settings = {
    from: 'USD',
    to: 'EUR'
  };

  const totalWalletValueConverted = fx.convert(totalWalletValue);

  const accountsSum = [];

  const accountsNames = [];

  if (accountsList) {
    for (let i = 0; i < accountsList.length; i++) {
      const depositSum = accountsList[i].deposit.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
      const withdrawalSum = accountsList[i].withdrawal.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
      const resultSum = accountsList[i].result.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
      const sum = (depositSum - withdrawalSum) + resultSum;
      accountsSum[i] = sum;
    }

    for (let i = 0; i < accountsList.length; i++) {
      accountsNames[i] = accountsList[i].name;
    }
  }

  const doughnutData = {
    labels: accountsNames,
    datasets: [{
      data: accountsSum,
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

  const handleShowData = () => {
    setViewData(!viewData);
  }

  if (loading) {
    return <div>
      Chargement...
    </div>
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
            ? `$${numberToComma(totalWalletValue.toFixed(2))}`
            : `$${numberToComma(totalWalletValue.toFixed(2)).replaceAll(/[0123456789]/g, '*')}`
            }
          </span>
          <span className="wallet__doughnut__data__converted">
            {viewData
            ? `${numberToComma(totalWalletValueConverted.toFixed(2))}€`
            : `${numberToComma(totalWalletValueConverted.toFixed(2)).replaceAll(/[0123456789]/g, '*')}€`
            }
          </span>
        </div>
      </div>
      {/* <div className="wallet__links">ajouter ici des étiquettes cliquables</div> */}
      <span className="wallet__title__account">Comptes</span>
      <div className="wallet__accounts">
        {accountsList.map((elem) => {
          const deposits = elem.deposit.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
          const withdrawals = elem.withdrawal.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
          const results = elem.result.map(item => item.value).reduce((prev, curr) => prev + curr, 0);

          const total = (deposits - withdrawals) + results;
          const totalInvest = deposits - withdrawals;
          const percent = (total - totalInvest) / totalInvest;

          return (
            <Account
              key={elem.id}
              id={elem.id}
              name={elem.name}
              value={total}
              percent={percent}
              dollar={results}
            />
        )})}
      </div>
    </div>
  );
};

export default Wallet;
