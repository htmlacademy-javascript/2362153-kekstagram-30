// Делу - время, проверка: входит ли свтреча в рамки рабочего дня

const isDateInDay = (START_DAY, END_DAY, START_DATE, DURATION) => {
  const startDay = START_DAY.split(':');
  const startDayMinuts = startDay[0] * 60 + startDay[1];
  const endDay = END_DAY.split(':');
  const endDayMinuts = endDay[0] * 60 + endDay[1];
  const startDate = START_DATE.split(':');
  const startDateMinuts = startDate[0] * 60 + startDate[1];

  if(startDateMinuts > startDayMinuts && (startDateMinuts + DURATION) < endDayMinuts){
    return true;
  }

  return false;
};

console.log(isDateInDay('8:00', '17:30', '08:00', 900));
