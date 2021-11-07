import PropTypes from 'prop-types';

import './style.scss';

const Account = ({ img, name, value, percent, dollar}) => (
  <div className="account">
    <span className="account__img">{img}</span>
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
  </div>
);

Account.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  percent: PropTypes.string,
  dollar: PropTypes.string,
};

Account.defaultProps = {
  img: '',
  name: '',
  value: '',
  percent: '',
  dollar: '',
}

export default Account;
