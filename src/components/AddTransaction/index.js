// == Imports : npm
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Imports : local
// Styles
import './style.scss';

// == Component
const AddTransaction = ({ accountsList }) => {
  const dispatch = useDispatch();
  const newType = useSelector((state) => state.addTransaction.newType);
  const newAccount = useSelector((state) => state.addTransaction.newAccount);
  const newDate = useSelector((state) => state.addTransaction.newDate);
  const newAmount = useSelector((state) => state.addTransaction.newAmount);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'ADD_TRANSACTION',
      dayResult: newType === 'gain' ? Number(newAmount) : newType === 'loss' ? Number(-newAmount) : 0,
      deposit: newType === 'deposit' ? Number(newAmount) : 0,
      withdrawal: newType === 'withdrawal' ? Number(newAmount) : 0,
      account: newAccount,
      transactionAt: newDate
    })
  }

  const handleChangeAmountValue = (evt) => {
    console.log('value', evt.target.value);
    dispatch({
      type: 'CHANGE_AMOUNT_VALUE',
      newAmount: evt.target.value,
    })
  }

  const handleChangeTypeValue = (evt) => {
    console.log('type', evt.target.value);
    dispatch({
      type: 'CHANGE_TYPE_VALUE',
      newType: evt.target.value,
    })
  }

  const handleChangeAccountValue = (evt) => {
    console.log('account', evt.target.value);
    dispatch({
      type: 'CHANGE_ACCOUNT_VALUE',
      newAccount: evt.target.value,
    })
  }

  const handleChangeDate = (evt) => {
    console.log('date', evt.target.value);
    dispatch({
      type: 'CHANGE_DATE',
      newDate: evt.target.value,
    })
  }

  const handleCancel = () => {
    dispatch({
      type: 'CANCEL_VALUES',
    })
  }

  return (
    <div className='add-transaction'>
      <form className='add-transaction__form' onSubmit={handleSubmit}>
        <select value={newType} name='transaction-type' id='transaction-type' onChange={handleChangeTypeValue}>
          <option value='gain'>Gain</option>
          <option value='loss'>Perte</option>
          <option value='deposit'>Dépôt</option>
          <option value='withdrawal'>Retrait</option>
        </select>
        <select name='compte' value={newAccount} id='compte' onChange={handleChangeAccountValue}>
          <option value=''>Choisir un compte</option>
          {accountsList.map((element) => (
            <option key={element.id} value={element.id}>{element.name}</option>
          ))}
        </select>
        <input type='date' onChange={handleChangeDate} value={newDate} />
        <input step='0.01' type='number' placeholder='Inserer un montant' value={newAmount} onChange={handleChangeAmountValue} />
        <div className='add-transaction__form__buttons'>
          <Link to='/' onClick={handleCancel}>Annuler</Link>
          <button type='submit'>Valider</button>
        </div>
        <Link to='/nouveau-compte'>Ajouter un nouveau compte</Link>
      </form>
    </div>
  );
};

// == Proptypes
AddTransaction.propTypes ={
  accountsList: PropTypes.array.isRequired,
}

// == Export
export default AddTransaction;
