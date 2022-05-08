// import PropTypes from 'prop-types';
import moment from "moment";

import './style.scss';

const Modify = ({ closeModal, idOfTransac, valuesList, accountName, openModify }) => {
  const dayTransaction = valuesList[idOfTransac];
  console.log(dayTransaction);
  
  return (
    <div className="modify">
      <div className="modify__container">
        <div className="modify__head">
          <h1 className="modify__head__title">{accountName}</h1>
          <h2 className="modify__head__date">{moment(dayTransaction.date).format('dddd D MMMM Y')}</h2>
        </div>
        <div className="modify__body">
          <div className="modify__body__head">
            <div className="modify__body__head__day-result">Gain/Perte</div>
            <div className="modify__body__head__day-result">Dépôt</div>
            <div className="modify__body__head__day-result">Retrait</div>
          </div>
          <div className="modify__body__foot">
            <input type="number" value={dayTransaction.dayResult} />
            <input type="number" value={dayTransaction.deposit} />
            <input type="number" value={dayTransaction.withdrawal} />
          </div>
        </div>
        <div className="modify__foot">
          <button onClick={() => {
            openModify(false)
            closeModal(true)
          }}>Retour</button>
          <button>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

// Modify.propTypes = {

// };

export default Modify;
