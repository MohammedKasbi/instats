import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const newType = useSelector((state) => state.addTransaction.newType);
  const newAccount = useSelector((state) => state.addTransaction.newAccount);
  const newDate = useSelector((state) => state.addTransaction.newDate);
  const newAmount = useSelector((state) => state.addTransaction.newAmount);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(newType);
    // console.log(newAccount);
    // console.log(newDate);
    // console.log(newAmount);
  }

  const handleChangeAmountValue = (evt) => {
    dispatch({
      type: 'CHANGE_AMOUNT_VALUE',
      newAmount: evt.target.value,
    })
  }

  const handleChangeTypeValue = (evt) => {
    dispatch({
      type: 'CHANGE_TYPE_VALUE',
      newType: evt.target.value,
    })
  }

  const handleChangeAccountValue = (evt) => {
    dispatch({
      type: 'CHANGE_ACCOUNT_VALUE',
      newAccount: evt.target.value,
    })
  }

  const handleChangeDate = (evt) => {
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
          <option value='deposit'>Dépôt</option>
          <option value='withdrawal'>Retrait</option>
          <option value='loss'>Perte</option>
          <option value='gain'>Gain</option>
        </select>
        <select name='compte' value={newAccount} id='compte' onChange={handleChangeAccountValue}>
          <option value=''>Choisir un compte</option>
          <option value='comptea'>Compte A</option>
          <option value='compteb'>Compte B</option>
          <option value='comptec'>Compte C</option>
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

export default AddTransaction;
