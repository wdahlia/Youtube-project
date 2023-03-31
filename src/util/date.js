const dayjs = require('dayjs');

let relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/ko');

dayjs.extend(relativeTime);
dayjs.locale('ko');

export function changeDateFormat(date) {
  let day = dayjs(date).fromNow();
  return day
}
