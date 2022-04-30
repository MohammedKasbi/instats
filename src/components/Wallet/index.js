// == Imports : npm
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import fx from 'money';

// == Imports : local
// Styles
import './style.scss';

// Components
import Account from '../Account';

// Functions
import { calculateSum } from '../../selectors/calculateSum';
import { calculateTotalSum } from '../../selectors/calculateTotalSum';
import { getAccountsName } from '../../selectors/getAccountsName';
import { numberToComma } from '../../selectors/numberToComma';

// == Component
const Wallet = ({ accountsList }) => {
  const loading = useSelector((state) => state.accounts.loading);

  // Money converter
  fx.base = 'USD';
  fx.rates = {
    'EUR': 0.88,
    'USD': 1,
  };
  fx.settings = {
    from: 'USD',
    to: 'EUR'
  };
  
  // Total sum of accounts
  const totalWalletValue = calculateTotalSum(accountsList);
  // Convert total usd into eur
  const totalWalletValueConverted = fx.convert(totalWalletValue);

  // Total sum of each account in an array
  const accountsSum = calculateSum(accountsList);
  // Accounts names in an array
  const accountsNames = getAccountsName(accountsList);

  // Data for the doughnut
  const doughnutData = {
    labels: accountsNames,
    datasets: [{
      data: accountsSum,
      backgroundColor: [
        'rgb(252, 145, 65)',
        'rgb(61, 255, 249)',
        'rgb(240, 255, 109)',
        'rgb(186, 66, 255)',
        'rgb(254, 67, 144)',
        'rgb(66, 147, 254)',
      ],
      borderWidth: 0,
      hoverOffset: 4,
      cutout: '90%',
    }],
  }

  // Options for the doughnut
  const doughnutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        // display: false,
        position: 'bottom',
      },
    },
  }

  const viewHide = localStorage.getItem('viewData');
  console.log(viewHide);

  // State for the closing/opening eye to see or hide the wallet value
  const [viewData, setViewData] = useState(viewHide);
  const handleShowData = () => {
    localStorage.setItem('viewData', !viewData);
    setViewData(!viewData);
  }

  // Loader
  if (loading) {
    return <div>
      Chargement...
    </div>
  }

  // == Render
  return (
    <div className="wallet">
      <div className="wallet__doughnut">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        <div className="wallet__doughnut__data">
          <span className="wallet__doughnut__data__tag">Capital Total
            {viewHide === 'true'
            ? <AiOutlineEye className="wallet__doughnut__data__tag__eye" onClick={handleShowData} />
            : <AiOutlineEyeInvisible className="wallet__doughnut__data__tag__eye" onClick={handleShowData} />}
          </span>
          <span className="wallet__doughnut__data__value">
            {viewHide === 'true'
            ? `$${numberToComma(totalWalletValue.toFixed(2))}`
            : `$${numberToComma(totalWalletValue.toFixed(2)).replaceAll(/[0123456789]/g, '*')}`
            }
          </span>
          <span className="wallet__doughnut__data__converted">
            {viewHide === 'true'
            ? `${numberToComma(totalWalletValueConverted.toFixed(2))}€`
            : `${numberToComma(totalWalletValueConverted.toFixed(2)).replaceAll(/[0123456789]/g, '*')}€`
            }
          </span>
        </div>
      </div>
      {/* <div className="wallet__links">Add clickable labels here to replace the actual react-chart labels</div> */}
      <span className="wallet__title__account">Comptes</span>
      <div className="wallet__accounts">
        {/* Check if 'accountsList' exist to prevent from errors*/}
        {accountsList ?
          accountsList.map((elem) => {
            // The variable that will contain the sum of each account
            let tempSum = 0;
            // The variable that will contain the sum of benefit of each account
            let tempProfit = 0;
            // The variable that will contain the sum of deposits of each account
            // and will be used to calculate the percent of the account
            let tempDeposits = 0;

            // For each element in 'results' arrays
            elem.results.forEach(element => {
              // Increment the sum of daily earnings, deposits, minus withdrawals in 'tempsSum' variable
              tempSum += (element.dayResult + element.deposit - element.withdrawal);
              // Increment the sum of daily earnings in 'tempProfit' variable
              tempProfit += element.dayResult;
              // Increment the sum of deposits in 'tempDeposits' variable
              tempDeposits += element.deposit;
            })

            return (
              <Account
                key={elem.id}
                id={elem.id}
                name={elem.name}
                value={tempSum}
                // Calculation of the percentage using the variables 'tempDeposits' and 'tempProfit'
                percent={tempProfit / tempDeposits}
                dollar={tempProfit}
              />)

          }) : ''}
      </div>
    </div>
  );
};

// == Proptypes
Wallet.propTypes ={
  accountsList: PropTypes.array.isRequired,
}

// == Export
export default Wallet;
