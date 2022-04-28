import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

export const getDaysArray = (start) => {
  for(var arr=[],dt=new Date(start); dt<=new Date(); dt.setDate(dt.getDate()+1)){
    arr.push(moment(dt).format());
  }
  return arr;
};
