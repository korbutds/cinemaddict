export const setUserRank = (data) => {
  let rank;
  switch (true) {
    case data <= 10:
      rank = `NOVICE`;
      break;
    case data > 10 && data <= 20:
      rank = `FAN`;
      break;
    case data > 20:
      rank = `MOVIE BUFF`;
      break;
    default:
      rank = `NO RANK YET`;
  }
  return rank;
};
