import './style.scss';
import { Line  } from 'react-chartjs-2';
import Account from '../Account';

const History = () => {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  const handleClick = (evt) => {
    console.log(evt.target.value);
  }

  return (
    <div className="history">
      <div className="history__data-select">
        <form onSubmit={handleSubmit}>
          <button value='day' onClick={handleClick}>Jour</button>
          <button value='week' onClick={handleClick}>S</button>
          <button value='month' onClick={handleClick}>M</button>
          <button value='year' onClick={handleClick}>A</button>
          <select name="select-account" id="select-account">
            <option value="all-accounts">Tous les comptes</option>
            <option value="comptea">Compte A</option>
            <option value="compteb">Compte B</option>
            <option value="comptec">Compte C</option>
          </select>
        </form>
      </div>
      <div className='history__graph'>
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="history__account-list">
        <Account
          img='A'
          name='Compte A'
          value='3,034.24'
          percent='10.58'
          dollar='511.95'
        />
        <Account
          img='B'
          name='Compte B'
          value='3,034.24'
          percent='10.58'
          dollar='511.95'
        />
        <Account
          img='C'
          name='Compte C'
          value='3,034.24'
          percent='10.58'
          dollar='511.95'
        />
      </div>
    </div>
  );
};

export default History;
