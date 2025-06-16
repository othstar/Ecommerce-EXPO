import moment from "moment";

export const getDateFromFireStoreTimeStampObject = (fireStoreDateObject) => {
  const date = new Date(fireStoreDateObject.seconds * 1000);

  return moment(date).format("Do MMMM, hh:mm A");
};
