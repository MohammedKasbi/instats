import './style.scss';
import { Line  } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import fx from 'money';
import { numberToComma } from '../../selectors/numberToComma';
import { calculateTotalSum } from '../../selectors/calculateTotalSum';
// import moment from 'moment/dist/moment';
// import 'moment/dist/locale/fr';

const Dashboard = ({ accountsList }) => {
  const loading = useSelector((state) => state.dashboard.loading);
  
  console.log(accountsList);
  const accountsListTotal = [];

  if (accountsList) {
    function compare( a, b ) {
      if ( a.transaction_at < b.transaction_at ){
        return -1;
      }
      if ( a.transaction_at > b.transaction_at ){
        return 1;
      }
      return 0;
    }

    function arrayUnique2(array) {
        for(let i = 0; i < array.length; ++i) {
          for(let j = i + 1; j < array.length; ++j) {
            if(array[i].transaction_at === array[j].transaction_at) {
              console.log(array[i]);
              console.log(array[j]);
              array[i].dayResult += array[j].dayResult;
              // array[i].deposit += array[j].deposit;
              // array[i].withdrawal += array[j].withdrawal;
              array.splice(j--, 1);
            }
          }
        }
        return array;
    }
    
    accountsList.forEach(elem => {
      elem.results.forEach(el => {
        // el.transaction_at = moment(el.transaction_at).format("LL")
        el.dayTotal = el.dayResult + el.deposit - el.withdrawal
      })
    })

    accountsList.forEach(el => {
      // console.log(el);
      el.results.forEach(elem => {
        // console.log(elem);
        accountsListTotal.push(elem);
      })
      // accountsListTotal.push({});
      // el.results.reduce(function(a,b,i) {
      //   // for (let i = 0; i < el.results.length; i++) {
      //   // }
      //   // console.log(a);
      //   // console.log(b);
      //   // console.log('day',b.dayTotal);
      //   // console.log(i);
      //   return accountsListTotal[i] = a+b.dayTotal;
      // }, 0);
    });

    accountsList.forEach(elem => {
      elem.results.sort(compare);
    });

    arrayUnique2(accountsListTotal);

    console.log(accountsList);
    // console.log(accountsListTotal.sort(compare));
  }



  fx.base = 'USD';
  fx.rates = {
    'EUR': 0.88,
    'USD': 1,
  };
  fx.settings = {
    from: 'USD',
    to: 'EUR'
  };
  
  const totalWalletValue = calculateTotalSum(accountsList);
  const totalWalletValueConverted = fx.convert(totalWalletValue);

  // let lastDaysSliced = null;
  // let cumulatedValuesSliced = null;

  // if (lastDays) {
  //   lastDaysSliced = lastDays.slice(-7);
  //   cumulatedValuesSliced = cumulatedValues.slice(-7);
  // }

  const lineData = {
    // labels: lastDays ? lastDays.slice(-7) : [ 'bon', 'oui'],
    datasets: [{
      data: accountsListTotal ? accountsListTotal.slice(-7) : [ 1, 2],
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

  if (loading) {
    return <div>
      Chargement...
    </div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard__wallet">
        <div className="dashboard__wallet__dollars">
          <span className="dashboard__wallet__dollars__tag">Portefeuille</span>
          <span className="dashboard__wallet__dollars__value">${numberToComma(totalWalletValue.toFixed(2))}</span>
          <span className="dashboard__wallet__dollars__converted">{numberToComma(totalWalletValueConverted.toFixed(2))}€</span>
        </div>
        <div className="dashboard__wallet__percentage">
          <span className="dashboard__wallet__percentage__tag">Evolution dernières 24h</span>
          <span className="dashboard__wallet__percentage__value">+{numberToComma(25.6)}%</span>
          <span className="dashboard__wallet__percentage__converted">+ ${numberToComma(120.3)}</span>
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
