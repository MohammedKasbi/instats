// == Imports : npm
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// == Imports : local
// Styles

// == Component
const AddAccount = () => {
  const dispatch = useDispatch();
  const newAccountValue = useSelector((state) => state.addAccount.newAccountValue);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const idLoad = toast.loading('Création en cours, patiente...');
    dispatch({
      type: 'ADD_ACCOUNT',
      newAccountName: newAccountValue,
      idLoad: idLoad,
    });
  }

  const handleChange = (evt) => {
    dispatch({
      type: 'CHANGE_NEW_ACCOUNT_VALUE',
      value: evt.target.value
    });
  }

  return (
    <div className="add-account">
      <form className="add-accont__form" onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newAccountValue}/>
        <button type='submit'>Valider</button>
      </form>
    </div>
  );
}

// == Proptypes
AddAccount.propTypes = {

};

// == Export
export default AddAccount;
