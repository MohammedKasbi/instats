import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const Account = ({ id, img, name, value, percent, dollar}) => (
  <Link className="account" to={`/compte/${id}`}>
    {img
    ? <img className="account__img" src={img} alt={`Compte ${name}`} />
    : <div className='account__img'></div>}
    <div className="account__container">
      <div className="account__container__left">
        <span className="account__name">{name}</span>
        <span className="account__value">$ {value}</span>
      </div>
      <div className="account__container__right">
        <span className="account__percent">+ {percent} %</span>
        <span className="account__dollar">+ $ {dollar}</span>
      </div>
    </div>
  </Link>
);

Account.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  percent: PropTypes.number,
  dollar: PropTypes.number,
};

Account.defaultProps = {
  img: '',
  value: '',
  percent: '',
  dollar: '',
}

export default Account;
