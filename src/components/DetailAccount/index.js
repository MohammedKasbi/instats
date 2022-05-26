import './style.scss';
import { Line  } from 'react-chartjs-2';
import { getDaysArray } from '../../selectors/getDaysArray';
import { useEffect, useState } from 'react';
import { numberToComma } from '../../selectors/numberToComma';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDatesAccount } from '../../selectors/getDatesAccount';
import { accountDateCompare } from '../../selectors/accountDateCompare';
import { accountDateCompare2 } from '../../selectors/accountDateCompare2';
import MoreInfo from '../Modals/MoreInfo';
import Modify from '../Modals/Modify';
import { toast } from 'react-toastify';

// == Component
const DetailAccount = () => {
  const dispatch = useDispatch();
  const accountData = useSelector(state => state.account.accountData);
  const loading = useSelector(state => state.account.loading);
  const {id} = useParams();

  useEffect(() => {
    dispatch({
      type: 'FETCH_ACCOUNT',
      id: id
    })
  }, [dispatch, id]);
  
  const [duration, setDuration] = useState(30);
  const [openModal, setOpenModal] = useState(false);
  const [openModalModify, setOpenModalModify] = useState(false);
  const [infoId, setInfoId] = useState(undefined);
  
  if (loading) {
    return <div>Chargement ...</div>
  }

  // Array that contain all dates of all transactions on all of the accounts
  const dates = getDatesAccount(accountData);
  // Sorting dates
  dates.sort();
  // Array that contain all of dates from the first transaction to the last
  const allDates = getDaysArray(dates[0]);
  const allDatesGraph = getDaysArray(dates[0], true);

  const graphValues = accountDateCompare(allDates, accountData);
  const valuesList = accountDateCompare2(allDates, accountData);

  const handleChangeDuration = (evt) => {
    setDuration(evt.target.value);
  }

  const handleMoreInfos = (ev) => {
    setOpenModal(true);
    setInfoId(ev.target.id);
    console.log(ev.target.id);
    console.log(accountData[infoId]);
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

  const handleDeleteAccount = () => {
    const toastData = toast.loading('Suppression en cours, patiente...');
    dispatch({
      type: 'DELETE_ACCOUNT',
      accountId: id,
      toastData: toastData,
    })
  }

  // == Render
  return (
    <div className="detail-account">
      <div className="detail-account__data-select">
        <button value="7" onClick={handleChangeDuration}>S</button>
        <button value="30" onClick={handleChangeDuration}>M</button>
        <button value="90" onClick={handleChangeDuration}>3M</button>
        <button value="" onClick={handleChangeDuration}>Tout</button>
      </div>
      <div className='detail-account__graph'>
        <button onClick={handleDeleteAccount}>Supprimer le compte</button>
        <Line data={lineData} options={lineOptions} />
      </div>
      {openModal &&
        <MoreInfo
          closeModal={setOpenModal}
          idOfTransac={infoId}
          valuesList={valuesList}
          accountName={accountData.name}
          openModify={setOpenModalModify}
        />}
      {openModalModify &&
        <Modify 
          closeModal={setOpenModal}
          idOfTransac={infoId}
          valuesList={valuesList}
          accountName={accountData.name}
          openModify={setOpenModalModify}
        />}
      <div className="detail-account__results">
        <div className="detail-account__results__head">
            <div>Date</div>
            <div>Pourcentage</div>
            <div>Gain</div>
            <div>Capital</div>
            <div>Dépôts</div>
            <div>Retraits</div>
        </div>
        <div className="detail-account__results__body">
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
              <div onClick={handleMoreInfos} key={index} className={`detail-account__results__result${classNameResult}`}>
                <div id={index}>{moment(element.date).format('ddd D MMM Y')}</div>
                <div id={index}>{numberToComma(Math.round(percent * 10000) / 100)} %</div>
                <div id={index}>${numberToComma(element.dayResult)}</div>
                <div id={index}>${numberToComma(element.capital)}</div>
                <div id={index}>${numberToComma(element.deposit)}</div>
                <div id={index}>${numberToComma(element.withdrawal)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailAccount;
