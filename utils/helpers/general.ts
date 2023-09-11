import dayjs from "dayjs";

export const upperFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const generateCode = (len: number = 8): string => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const removeSeparators = (n: string): string => {
  return n.replace(/([.,])(\d\d\d\D|\d\d\d$)/g, "$2");
};

export const numberWithCommas = (x: number): string => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getDate = (date?: string): string =>
  date ? dayjs(date).format("DD/MM/YYYY") : dayjs().format("DD/MM/YYYY");

export const validateNumber = (num: number): number =>
  Math.round(num) <= Number.MAX_SAFE_INTEGER && Math.round(num) > 0 ? num : 0;
