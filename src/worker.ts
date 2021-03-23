import * as moment from 'moment';
import { getDailyHistoryDataFromTushare } from './service';
import { createStockData, updateStockInfo } from './model';
enum SyncStatus {
  LOADING = 'LOADING',
  COMPELETE = 'COMPLETE',
}

interface SyncHistoryStockData {
  ts_code: string;
  start: string;
  end: string;
}

export const syncHistoryStockData = async ({
  ts_code,
  start,
  end,
}: SyncHistoryStockData) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startDateStr = moment(startDate).format('YYYYMMDD');
  const endDateStr = moment(endDate).format('YYYYMMDD');

  const result = await getDailyHistoryDataFromTushare(
    ts_code,
    startDateStr,
    endDateStr,
  );
  const historyData = result.data;
  await createStockData(historyData.data.items);

  await updateStockInfo([
    {
      history_data_start_date: startDate,
      history_data_end_date: endDate,
      status: SyncStatus.COMPELETE,
    },
    { ts_code },
  ]);
};
