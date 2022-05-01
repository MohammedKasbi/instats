// import PropTypes from 'prop-types';
import moment from "moment";

import './style.scss';

const MoreInfo = ({ closeModal, idOfTransac, valuesList, accountName }) => {
  const dayTransaction = valuesList[idOfTransac];
  
  return (
    <div className="more-info">
      <div className="more-info__container">
        <div className="more-info__head">
          <h1 className="more-info__head__title">{accountName}</h1>
          <h2 className="more-info__head__date">{moment(dayTransaction.date).format('dddd D MMMM Y')}</h2>
        </div>
        <div className="more-info__body">
          <div className="more-info__body__head">
            <div className="more-info__body__head__day-result">Transaction</div>
          </div>
          <div className="more-info__body__foot">
            <div className="more-info__body__foot__day-result">{dayTransaction.dayResult}$</div>
          </div>
          <input type="number" value={dayTransaction.dayResult} />
        </div>
        <div className="more-info__foot">
          <button onClick={() => closeModal(false)}>Retour</button>
          <button>Modifier</button>
          <button>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

// MoreInfo.propTypes = {

// };

export default MoreInfo;