import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { numberToComma } from '../../selectors/numberToComma';

import './style.scss';

const Account = ({ id, name, value, percent, dollar, viewHide}) => (
  <Link className="account" to={`/compte/${id}`}>
    <div className="account__container">
      <div className="account__container__left">
        <span className="account__name">{name}</span>
        <span className="account__value">
          {viewHide === 'true'
          ? numberToComma(value.toFixed(2))
          : numberToComma(value.toFixed(2)).replaceAll(/[0123456789]/g, '*')}$
        </span>
      </div>
      <div className="account__container__right">
        <span className="account__percent">{percent > 0 ? '+' : ''}
          {viewHide === 'true'
          ? numberToComma(percent ? Math.round(percent * 10000) / 100 : 0)
          : numberToComma(percent ? Math.round(percent * 10000) / 100 : 0).replaceAll(/[0123456789]/g, '*')} %
        </span>
        <span className="account__dollar">{dollar > 0 ? '+' : ''}
          {viewHide === 'true'
          ? numberToComma(dollar ? Math.round(dollar * 100) / 100 : 0)
          : numberToComma(dollar ? Math.round(dollar * 100) / 100 : 0).replaceAll(/[0123456789]/g, '*')} $
        </span>
      </div>
    </div>
  </Link>
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
