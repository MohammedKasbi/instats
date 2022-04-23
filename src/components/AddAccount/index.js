// == Imports : npm
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// == Imports : local
// Styles

// == Component
const AddAccount = () => {
  const dispatch = useDispatch();
  const newAccountValue = useSelector((state) => state.addAccount.newAccountValue);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'ADD_ACCOUNT',
      newAccountName: newAccountValue,
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
