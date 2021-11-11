// imports

// imports persos
import './style.scss';
import logo from '../../assets/img/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { BiHomeAlt, BiWalletAlt } from 'react-icons/bi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdQueryStats } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';

const Menu = () => (
  <div className="menu">
    <Link className="menu__logo__link" to="/"><img src={logo} alt="Logo InStats" className="menu__logo" /></Link>
    <div className="menu__nav">
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" exact to='/'><BiHomeAlt className="menu__nav__link__logo" size="1.5em" />Tableau de bord</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/portefeuille'><BiWalletAlt className="menu__nav__link__logo" size="1.5em" />Portefeuille</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/ajouter-transaction'><AiOutlinePlusCircle className="menu__nav__link__logo" size="1.5em" />Ajouter transaction</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/historique'><RiHistoryLine className="menu__nav__link__logo" size="1.5em" />Historique</NavLink>
      <NavLink className="menu__nav__link" activeClassName="menu__nav__link--active" to='/statistiques'><MdQueryStats className="menu__nav__link__logo" size="1.5em" />Statistiques</NavLink>
    </div>
    <Link className="menu__profile" to='/profil'>
      <img
        src="https://media.comicbook.com/2021/01/one-piece-wano-luffy-cosplay-1252700.jpeg?auto=webp&width=1200&height=627&crop=1200:627,smart"
        alt="Profil"
        className="menu__profile__avatar"
      />
      <div className="menu__profile__data">
        <span className="menu__profile__data__name">Nom d'utilisateur</span>
        <span className="menu__profile__data__email">examplemail@gmail.com</span>
      </div>
    </Link>
  </div>
);

export default Menu;
