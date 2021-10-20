// imports

// imports persos
import './style.scss';
import logo from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import { BiHomeAlt, BiWalletAlt } from 'react-icons/bi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdQueryStats } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';

const Menu = () => (
  <div className="menu">
    <img src={logo} alt="Logo InStats" className="menu__logo" />
    <div className="menu__nav">
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" exact to='/'><BiHomeAlt className="menu__nav__link__logo" size="1.5em" />Tableau de bord</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/portefeuille'><BiWalletAlt className="menu__nav__link__logo" size="1.5em" />Portefeuille</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/ajouter-transaction'><AiOutlinePlusCircle className="menu__nav__link__logo" size="1.5em" />Ajouter transaction</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/statistiques'><MdQueryStats className="menu__nav__link__logo" size="1.5em" />Statistiques</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/historique'><RiHistoryLine className="menu__nav__link__logo" size="1.5em" />Historique</NavLink>
    </div>
  </div>
);

export default Menu;
