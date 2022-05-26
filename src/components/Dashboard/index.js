// == Imports : npm
import { Line  } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import fx from 'money';
import PropTypes from 'prop-types';
import moment from "moment";

// == Imports : local
// Styles
import './style.scss';

// Functions
import { numberToComma } from '../../selectors/numberToComma';
import { calculateTotalSum } from '../../selectors/calculateTotalSum';
import { calculateProfits } from '../../selectors/calculateProfits';
import { calculateDeposits } from '../../selectors/calculateDeposits';
import { getDates } from '../../selectors/getDates';
import { getDaysArray } from '../../selectors/getDaysArray';
import { dateCompare } from '../../selectors/dateCompare';
import { useState } from 'react';
import { dateCompare2 } from '../../selectors/dateCompare2';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// == Component
const Dashboard = ({ accountsList }) => {
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

  // Calculation of total percentage of all accounts
  // The variable that will contain the total percentage of all accounts
  // let totalPercent = 0;
  // The variable that will contain the sum of benefit of all account
  // let totalProfit = 0;
  // The variable that will contain the sum of deposits of all account
  // let totalDeposits = 0;

  // The function that calculate all profits from all accounts
  let totalProfit = calculateProfits(accountsList);
  // The function that calculate all deposits from all accounts
  let totalDeposits = calculateDeposits(accountsList);

  // Calculation of the percentage using the variables 'totalDeposits' and 'totalProfit'
  let totalPercent = totalProfit / totalDeposits;

  // Array that contain all dates of all transactions on all of the accounts
  const dates = getDates(accountsList);
  // Sorting dates
  dates.sort();
  // Array that contain all of dates from the first transaction to the last
  const allDates = getDaysArray(dates[0]);
  const allDatesGraph = getDaysArray(dates[0], true);
  const allDatesForCompare = getDaysArray(dates[0]);

  const graphValues = dateCompare(allDatesForCompare, accountsList);
  const valuesList = dateCompare2(allDates, accountsList);

  const [duration, setDuration] = useState(7);
  const handleChangeDuration = (evt) => {
    setDuration(evt.target.value);
  }

  // State for the closing/opening eye to see or hide the wallet value
  const viewHide = localStorage.getItem('viewData');
  const [viewData, setViewData] = useState(viewHide);
  const handleShowData = () => {
    localStorage.setItem('viewData', !viewData);
    setViewData(!viewData);
  }

  // Data for the graph
  const lineData = {
    labels: allDatesGraph.slice(-duration),
    datasets: [{
      data: graphValues.slice(-duration),
      // backgroundColor: 'linear-gradient(90deg, rgba(0,113,255,1) 0%, rgba(0,113,255,0) 100%);',
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      // borderWidth: 9,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: 'rgb(75, 192, 192)',
      tension: 0.15,
    }],
  }

  // Options for the graph
  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  }

  // Loader
  if (loading) {
    return <div>
      Chargement...
    </div>
  }

  // == Render
  return (
    <div className="dashboard">
      <div className="dashboard__wallet">
        <div className="dashboard__wallet__dollars">
          <span className="dashboard__wallet__dollars__tag">Portefeuille
            {viewHide === 'true'
            ? <AiOutlineEye className="dashboard__wallet__dollars__tag__eye" onClick={handleShowData} />
            : <AiOutlineEyeInvisible className="dashboard__wallet__dollars__tag__eye" onClick={handleShowData} />}
          </span>
          <span className="dashboard__wallet__dollars__value">
            {viewHide === 'true'
            ? `${numberToComma(totalWalletValue.toFixed(2))}$`
            : `${numberToComma(totalWalletValue.toFixed(2)).replaceAll(/[0123456789]/g, '*')}$`}
          </span>
          <span className="dashboard__wallet__dollars__converted">
            {viewHide === 'true'
            ? `${numberToComma(totalWalletValueConverted.toFixed(2))}€`
            : `${numberToComma(totalWalletValueConverted.toFixed(2)).replaceAll(/[0123456789]/g, '*')}€`}
          </span>
        </div>
        <div className="dashboard__wallet__percentage">
          <span className="dashboard__wallet__percentage__tag">Evolution du portefeuille</span>
          <span className="dashboard__wallet__percentage__value">
            {viewHide === 'true'
            ? `${totalPercent > 0 ? '+' : ''}${Math.round(totalPercent * 10000) / 100}%`
            : `${totalPercent > 0 ? '+' : ''}${Math.round(totalPercent * 10000) / 100}%`.replaceAll(/[0123456789]/g, '*')}
          </span>
          <span className="dashboard__wallet__percentage__converted">
            {viewHide === 'true'
            ? `${totalProfit > 0 ? '+' : ''}${numberToComma(totalProfit)}$`
            : `${totalProfit > 0 ? '+' : ''}${numberToComma(totalProfit).replaceAll(/[0123456789]/g, '*')}$`}
          </span>
        </div>
      </div>
      <div className="dashboard__transactions">
        <h2 className="dashboard__transactions__title">Derniers mouvements</h2>
        {valuesList.slice(-7).map((element) => (
          <div key={element.id} className={'dashboard__transactions__results'}>
            <div>{moment(element.date).format('dddd D')}</div>
            <div>{viewHide === 'true' ? numberToComma(element.dayResult) : numberToComma(element.dayResult).replaceAll(/[0123456789]/g, '*')}$</div>
          </div>
        ))}
      </div>
      <div className="dashboard__graphic">
        <Line data={lineData} options={lineOptions} />
      </div>
      <div>
        <button value="7" onClick={handleChangeDuration}>Semaine dernière</button>
        <button value="30" onClick={handleChangeDuration}>30 derniers jours</button>
        <button value="90" onClick={handleChangeDuration}>3 derniers mois</button>
        <button value="reset" onClick={handleChangeDuration}>Depuis le début</button>
      </div>
    </div>
  );
};

// == Proptypes
Dashboard.propTypes ={
  accountsList: PropTypes.array.isRequired,
}

// == Export
export default Dashboard;
