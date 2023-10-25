// Делу - время, проверка: входит ли встреча в рамки рабочего дня
/**
 *
 * @param {${number}:${number}} START_DAY
 * @param {${number}:${number}} END_DAY
 * @param {${number}:${number}} START_DATE
 * @param {${number}} DURATION
 *
 * */

const isDateInDay = (START_DAY, END_DAY, START_DATE, DURATION) => {
  const startDay = START_DAY.split(':');
  const startDayMinutes = startDay[0] * 60 + startDay[1];
  const endDay = END_DAY.split(':');
  const endDayMinutes = endDay[0] * 60 + endDay[1];
  const startDate = START_DATE.split(':');
  const startDateMinutes = startDate[0] * 60 + startDate[1];

  if(startDateMinutes >= startDayMinutes && (startDateMinutes + DURATION) <= endDayMinutes){
    return true;
  }

  return false;
};

/**
 * @param {${number}:${number}} startDay
 * @param {${number}:${number}} endDay
 * @param {${number}:${number}} startMeet
 * @param {${number}} duration
 * @param {${number}:${number}} time
 */
const MINUTES_IN_HOUR = 60;

const getMinutes = (time) =>{
  const [hour, minutes] = startDay.split(':').map(Number);
  return hour * MINUTES_IN_HOUR + minutes;
};

const isMeetInDay = (startDay, endDay, startMeet, duration) => {
  const startDayMinutes = getMinutes(startDay);
  const endDayMinutes = getMinutes(endDay);
  const startMeetMinutes = getMinutes(startMeet);

  const isStartedInWorkShift = startDayMinutes >= startMeetMinutes;
  const isEndedInWorkShift = (startMeetMinutes + duration) <= endDayMinutes;

  return isStartedInWorkShift && isEndedInWorkShift;
};

isDateInDay('8:00', '17:30', '08:00', 900);
isMeetInDay('8:00', '17:30', '08:00', 900);
