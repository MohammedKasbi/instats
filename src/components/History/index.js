import './style.scss';
import { Line  } from 'react-chartjs-2';
import { getDates } from '../../selectors/getDates';
import { getDaysArray } from '../../selectors/getDaysArray';
import { dateCompare } from '../../selectors/dateCompare';
import { dateCompare2 } from '../../selectors/dateCompare2';
import { useState } from 'react';
import { numberToComma } from '../../selectors/numberToComma';
import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

const History = ({ accountsList }) => {
  // Array that contain all dates of all transactions on all of the accounts
  const dates = getDates(accountsList);
  // Sorting dates
  dates.sort();
  // Array that contain all of dates from the first transaction to the last
  const allDates = getDaysArray(dates[0]);
  const allDatesGraph = getDaysArray(dates[0], true);

  const graphValues = dateCompare(allDates, accountsList);
  const valuesList = dateCompare2(allDates, accountsList);

  const [duration, setDuration] = useState(30);
  const handleChangeDuration = (evt) => {
    setDuration(evt.target.value);
  }

  const lineData = {
    labels: allDatesGraph.slice(-duration),
    datasets: [{
      data: graphValues.slice(-duration),
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
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutElastic',
      }
    },
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
    <div className="history">
      <div className="history__data-select">
        <button value="7" onClick={handleChangeDuration}>S</button>
        <button value="30" onClick={handleChangeDuration}>M</button>
        <button value="90" onClick={handleChangeDuration}>3M</button>
        <button value="" onClick={handleChangeDuration}>Tout</button>
          {/* <select name="select-account" id="select-account" onChange={handleChange}>
            <option value="all-accounts">Tous les comptes</option>
            {accountsList.map((elem) => (
              <option key={elem.id} value={elem.id}>{elem.name}</option>
            ))}
          </select> */}
      </div>
      <div className='history__graph'>
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="history__account-list">
        <div className="history__account-list__head">
            <div>Date</div>
            <div>Pourcentage</div>
            <div>Gain</div>
            <div>Capital</div>
            <div>Dépôts</div>
            <div>Retraits</div>
        </div>
        <div className="history__account-list__body">
        {valuesList.map((element, index, array) => {
          let percent = 0;
          if(array[index-1]) {
            percent = element.dayResult / array[index-1].capital
          } else {
            percent = element.dayResult / element.deposit
          }

          let classNameResult = '';
          if(element.dayResult > 0) {
            classNameResult = '--positive';
          } else if (element.dayResult < 0) {
            classNameResult = '--negative';
          }
          return (
            <div key={element.id} className={`history__account-list__result${classNameResult}`}>
              <div>{moment(element.date).format('ddd D MMM Y')}</div>
              <div>{numberToComma(Math.round(percent * 10000) / 100)} %</div>
              <div>${numberToComma(element.dayResult)}</div>
              <div>${numberToComma(element.capital)}</div>
              <div>${numberToComma(element.deposit)}</div>
              <div>${numberToComma(element.withdrawal)}</div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  );
};

export default History;
