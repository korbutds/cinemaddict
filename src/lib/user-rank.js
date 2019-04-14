const NOVICE_RANK_MAX_VALUE = 10;
const MOVIEBUFF_RANK_MIN_VALUE = 20;

export const setUserRank = (data) => {
  let rank;
  switch (true) {
    case data <= NOVICE_RANK_MAX_VALUE:
      rank = `NOVICE`;
      break;
    case data > NOVICE_RANK_MAX_VALUE && data < MOVIEBUFF_RANK_MIN_VALUE:
      rank = `FAN`;
      break;
    case data >= MOVIEBUFF_RANK_MIN_VALUE:
      rank = `MOVIE BUFF`;
      break;
    default:
      rank = `NO RANK YET`;
  }
  return rank;
};
