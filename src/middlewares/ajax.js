import axios from "axios";

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
    })
    .catch((err) => {
      console.log(err);
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
    api.post(`/results/${action.bddId}`, {
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
  next(action);
};

export default ajax;
