import { Link } from 'react-router-dom';
import './style.scss';

const AddTransaction = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  const handleClick = () => {
    console.log('c\'est walid');
  }

  return (
    <div className="add-transaction">
      <form className="add-transaction__form" onSubmit={handleSubmit}>
        <select name="transaction-type" id="transaction-type">
          <option value="depot">Dépôt</option>
          <option value="retrait">Retrait</option>
          <option value="perte">Perte</option>
          <option value="gain">Gain</option>
        </select>
        <select name="compte" id="compte">
          <option value="comptea">Compte A</option>
          <option value="compteb">Compte B</option>
          <option value="comptec">Compte C</option>
        </select>
        <input type="date" />
        <input type="text" placeholder='Inserer un montant' />
        <div className="add-transaction__form__buttons">
          <Link to='/'>Annuler</Link>
          <button onClick={handleClick}>Valider</button>
        </div>
        <Link to='/nouveau-compte'>Ajouter un nouveau compte</Link>
      </form>
    </div>
  );
};

export default AddTransaction;
