// import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Field from "../../Field";

import './style.scss';

const Modify = ({ closeModal, idOfTransac, valuesList, accountName, openModify }) => {
  const dispatch = useDispatch();
  const newDayResult = useSelector(state => state.account.newDayResult);
  const newDeposit = useSelector(state => state.account.newDeposit);
  const newWithdrawal = useSelector(state => state.account.newWithdrawal);
  const newDate = useSelector(state => state.account.newDate);
  const {id} = useParams();

  console.log('gain', newDayResult);
  console.log('depo', newDeposit);
  console.log('retr', newWithdrawal);
  console.log('date', newDate);

  const dayTransaction = valuesList[idOfTransac];

  useEffect(() => {
    dispatch({
      type: 'DEFAULT_VALUES_TRANSACTION',
      newDayResult: dayTransaction.dayResult,
      newDeposit: dayTransaction.deposit,
      newWithdrawal: dayTransaction.withdrawal,
      newDate: dayTransaction.date.slice(0, 10)
    })
  }, [dayTransaction.date, dayTransaction.dayResult, dayTransaction.deposit, dayTransaction.withdrawal, dispatch])

  const changeField = (value, key) => {
    dispatch({
      type: 'CHANGE_VALUE',
      value: value,
      key: key,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (dayTransaction.idBdd) {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        dayResult: newDayResult,
        deposit: newDeposit,
        withdrawal: newWithdrawal,
        transactionAt: newDate,
        bddId: dayTransaction.idBdd,
        account: id
      });
    } else {
      dispatch({
        type: 'ADD_TRANSACTION',
        dayResult: newDayResult,
        deposit: newDeposit,
        withdrawal: newWithdrawal,
        transactionAt: newDate,
        account: id
      });
    }
  }

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      bddId: dayTransaction.idBdd
    })
  }
  
  return (
    <div className="modify">
      <div className="modify__container">
        <form className="modify__body__foot" onSubmit={handleSubmit}>
          <h1 className="modify__head__title">{accountName}</h1>
          <Field
            name="newDayResult"
            key={dayTransaction.dayResult}
            placeholder="Gain/Perte"
            value={newDayResult}
            onChange={changeField}
            type='number'
          />
          <Field
            name="newDeposit"
            placeholder="Dépôt"
            value={newDeposit}
            onChange={changeField}
            type='number'
          />
          <Field
            name="newWithdrawal"
            placeholder="Retrait"
            value={newWithdrawal}
            onChange={changeField}
            type='number'
          />
          <Field
            name="newDate"
            placeholder="Date"
            value={newDate}
            onChange={changeField}
            type='date'
          />
          <div className="modify__foot">
            <button type="submit">Valider</button>
          </div>
        </form>
        <button onClick={() => {
          openModify(false)
          closeModal(true)
        }}>Retour</button>
        {dayTransaction.idBdd ? <button onClick={handleDelete}>Supprimer</button> : ''}
      </div>
    </div>
  );
};

// Modify.propTypes = {

// };

export default Modify;
