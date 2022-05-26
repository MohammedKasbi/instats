import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  baseURL: 'http://localhost:8000/apip',
});

const ajax = (store) => (next) => (action) => {
  if (action.type === 'FETCH_ACCOUNTS_LIST') {
    api.get('/accounts')
    .then((res) => {
      // success
      // console.log(res.data);
      store.dispatch({
        type: 'SAVE_ACCOUNTS_LIST',
        accountsList: res.data,
      });
    })
    .catch((err) => {
      // error
      console.log(err);
    });
  };
  if (action.type === 'FETCH_ACCOUNT') {
    api.get(`/accounts/${action.id}`)
    .then((res) => {
      // success
      // console.log(res.data);
      store.dispatch({
        type: 'SAVE_ACCOUNT',
        account: res.data,
      });
    })
    .catch((err) => {
      // error
      console.log(err);
    });
  }
  if (action.type === 'ADD_ACCOUNT') {
    api.post('/accounts', {
      name: action.newAccountName
    })
    .then((res) => {
      console.log('success', action.newAccountName, res);
      store.dispatch({
        type: 'NEW_ACCOUNT_ADDED',
      })
      toast.update(action.idLoad, { render: "Compte créé, actualise la page", type: "success", isLoading: false });
    })
    .catch((err) => {
      console.log(err);
      toast.update(action.idLoad, { render: "Erreur lors de la création du compte", type: "error", isLoading: false });
    })
  }
  if (action.type === 'ADD_TRANSACTION') {
    api.post('/results', {
      dayResult: action.dayResult,
      deposit: action.deposit,
      withdrawal: action.withdrawal,
      account: `/apip/accounts/${action.account}`,
      transactionAt: action.transactionAt
    })
    .then((res) => {
      // success
      console.log(res.data);
    })
    .catch((err) => {
      // error
      console.log(err);
    });
  }
  if (action.type === 'UPDATE_TRANSACTION') {
    api.put(`/results/${action.bddId}`, {
      dayResult: action.dayResult,
      deposit: action.deposit,
      withdrawal: action.withdrawal,
      transactionAt: action.transactionAt
    })
    .then((res) => {
      // success
      console.log(res.data);
    })
    .catch((err) => {
      // error
      console.log(err);
    });
  }
  if (action.type === 'DELETE_TRANSACTION') {
    api.delete(`/results/${action.bddId}`)
    .then((res) => {
      // success
      console.log(res);
    })
    .catch((err) => {
      // error
      console.log(err);
    });
  }
  if (action.type === 'DELETE_ACCOUNT') {
    api.delete(`/accounts/${action.accountId}`)
    .then((res) => {
      // success
      window.location.replace('/portefeuille');
      console.log(res);
      toast.update(action.toastData, { render: "Compte supprimé", type: "success", isLoading: false });
    })
    .catch((err) => {
      // error
      console.log(err);
      toast.update(action.toastData, { render: "Erreur lors de la suppression", type: "error", isLoading: false });
    });
  }
  next(action);
};

export default ajax;
