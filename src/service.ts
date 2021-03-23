import axios from 'axios';

interface Tushare {
  request_id: string;
  code: number;
  msg: string;
  data: {
    fields: string[];
    has_more: boolean;
    items: any[];
  };
}

export const getDailyHistoryDataFromTushare = (
  ts_code: string,
  start_date: string,
  end_date: string,
) => {
  return axios.post<Tushare>(process.env.TUSHARE_API_URL, {
    api_name: 'daily',
    token: process.env.TUSHARE_API_TOKEN,
    params: {
      ts_code,
      start_date,
      end_date,
    },
    fields:
      'ts_code,trade_date,open,high,low,close,vol,amount,change,pre_close',
  });
};
