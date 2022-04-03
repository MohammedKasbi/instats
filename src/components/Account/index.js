import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { numberToComma } from '../../selectors/numberToComma';

import './style.scss';

const Account = ({ id, name, value, percent, dollar}) => (
  <div className="account" to={`/compte/${id}`}>
    <div className="account__container">
      <div className="account__container__left">
        <span className="account__name">{name}</span>
        <span className="account__value">$ {numberToComma(value.toFixed(2))}</span>
      </div>
      <div className="account__container__right">
        <span className="account__percent">{percent > 0 ? '+' : ''}{numberToComma(percent ? Math.round(percent * 10000) / 100 : 0)} %</span>
        <span className="account__dollar">{dollar > 0 ? '+' : ''}{numberToComma(dollar ? Math.round(dollar * 100) / 100 : 0)} $</span>
      </div>
    </div>
  </div>
);

Account.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  percent: PropTypes.number,
  dollar: PropTypes.number,
};

Account.defaultProps = {
  value: 0,
  percent: 0,
  dollar: 0,
}

export default Account;
