const ajax = (store) => (next) => (action) => {
  next(action);
};

export default ajax;
